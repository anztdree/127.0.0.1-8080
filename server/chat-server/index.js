/**
 * index.js — Chat-Server Entry Point
 *
 * Socket.IO 2.5.1 + TEA Verification + In-Memory Message Storage
 * Port: 8002
 *
 * Flow:
 *   1. Client connect → TEA verify
 *   2. chat.login → register userId
 *   3. chat.joinRoom (world, guild, teamDungeon, team) → get chat history
 *   4. chat.sendMsg → broadcast ke semua member di room
 *   5. chat.leaveRoom → leave room
 *   6. chat.getRecord → get older messages (pagination)
 *
 * Design Decisions:
 *   - Guild room ID: HARDCODE (config.guildRoomId = 'guild_1')
 *   - Message storage: IN-MEMORY ONLY (no SQLite)
 *   - Rate limiting: DISABLED
 */

const http = require('http');
const path = require('path');
const chalk = require('chalk');
const io = require('socket.io');
const config = require('./config');
const logger = require('./logger');
const tea = require('./tea');
const responseBuilder = require('./responseBuilder');

const { buildSuccess, buildError, buildChatNotify } = responseBuilder;

// ═══════════════════════════════════════════════════════════════
//  STARTUP SEQUENCE
// ═══════════════════════════════════════════════════════════════

logger.boundary('💬', 'SUPER WARRIOR Z — CHAT SERVER');
logger.details('location',
    ['Port', String(config.port)],
    ['TEA', config.verifyEnable ? 'ON' : 'OFF'],
    ['Storage', 'In-Memory'],
    ['Rate Limit', 'OFF'],
    ['server0Time', String(config.server0Time)],
    ['DB', 'None (In-Memory)']
);
logger.boundaryEnd('💬');

// ═══════════════════════════════════════════════════════════════
//  IN-MEMORY DATA STORE
// ═══════════════════════════════════════════════════════════════

/**
 * rooms: Map<roomId, { messages: [], members: Set<socketId> }>
 * - messages: array of chat message objects (max config.maxMessagesPerRoom)
 * - members: set of socket IDs currently in this room
 */
const rooms = new Map();

/**
 * socketUserMap: Map<socketId, { userId, serverId, userName, headImage, headEffect, headBox, joinedRooms: Set<roomId> }>
 * Tracks which user is behind each socket + their rooms
 */
const socketUserMap = new Map();

/**
 * userSocketMap: Map<userId, socketId>
 * Quick lookup: userId → current socket
 */
const userSocketMap = new Map();

// ─── Room Helper Functions ───

function getRoom(roomId) {
    if (!rooms.has(roomId)) {
        rooms.set(roomId, { messages: [], members: new Set() });
    }
    return rooms.get(roomId);
}

function addMessageToRoom(roomId, msg) {
    const room = getRoom(roomId);
    room.messages.push(msg);
    // Trim to max capacity
    if (room.messages.length > config.maxMessagesPerRoom) {
        room.messages.shift();
    }
}

function getRoomMessages(roomId, startTime) {
    const room = getRoom(roomId);
    if (!startTime || startTime === 0) {
        // Return latest messages
        return room.messages.slice(-config.maxRecordReturn);
    }
    // Return messages after startTime
    return room.messages
        .filter(m => m._time > startTime)
        .slice(0, config.maxRecordReturn);
}

function joinRoomInternal(roomId, socketId) {
    const room = getRoom(roomId);
    room.members.add(socketId);
}

function leaveRoomInternal(roomId, socketId) {
    const room = rooms.get(roomId);
    if (room) {
        room.members.delete(socketId);
        // Clean up empty rooms (except default rooms)
        if (room.members.size === 0 &&
            roomId !== config.worldRoomId &&
            roomId !== config.guildRoomId &&
            roomId !== config.teamDungeonChatRoom &&
            roomId !== config.teamChatRoomId) {
            rooms.delete(roomId);
            logger.log('DEBUG', 'ROOM', `Empty room deleted: ${roomId}`);
        }
    }
}

// Pre-create default rooms
getRoom(config.worldRoomId);
getRoom(config.guildRoomId);
getRoom(config.teamDungeonChatRoom);
getRoom(config.teamChatRoomId);

logger.log('INFO', 'ROOM', `Default rooms pre-created`);
logger.details('room',
    ['world', config.worldRoomId],
    ['guild', config.guildRoomId],
    ['teamDungeon', config.teamDungeonChatRoom],
    ['team', config.teamChatRoomId]
);

// ═══════════════════════════════════════════════════════════════
//  SOCKET STATE MANAGEMENT
// ═══════════════════════════════════════════════════════════════

// socketId → { verified, userId, nonce, loginTime, ip, transport, chatRegistered }
const socketStates = new Map();

// Action counter per socket
const actionCounters = new Map();

// ═══════════════════════════════════════════════════════════════
//  MESSAGE_KIND & SYSTEM_MESSAGE_TYPE — Reference Enums
// ═══════════════════════════════════════════════════════════════

const MESSAGE_KIND = {
    MK_NULL: 0,
    SYSTEM: 1,
    WORLD: 2,
    GUILD: 3,
    PRIVATE: 4,      // ⚠️ Enum ada tapi TIDAK dipakai! Private via friend server
    WORLD_TEAM: 5,
    TEAM: 6
};

const KIND_NAMES = {
    0: 'NULL', 1: 'SYSTEM', 2: 'WORLD', 3: 'GUILD',
    4: 'PRIVATE', 5: 'WORLD_TEAM', 6: 'TEAM'
};

function kindName(kind) {
    return KIND_NAMES[kind] || `UNKNOWN(${kind})`;
}

// ═══════════════════════════════════════════════════════════════
//  CHAT HANDLER ACTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * chat.login — Register userId on chat-server
 *
 * Request: { type: 'chat', action: 'login', userId, serverId, version }
 * Response: {} (kosong, ret=0) — Client TIDAK membaca data dari login response
 *
 * Client code (line 114550-114611): success callback langsung mulai Promise.all joinRoom.
 */
function handleLogin(request, socket) {
    const { userId, serverId, version } = request;

    if (!userId) {
        logger.log('WARN', 'USER', `Chat login FAILED — missing userId`);
        return buildError(8);  // ERROR_LACK_PARAM
    }

    const state = socketStates.get(socket.id);
    if (!state) {
        logger.log('WARN', 'USER', `Chat login FAILED — no socket state for sid=${socket.id.substring(0, 8)}`);
        return buildError(37);  // ERROR_NO_LOGIN_CLIENT
    }

    // Check duplicate login — kick existing socket if same userId reconnects
    const existingSid = userSocketMap.get(userId);
    if (existingSid && existingSid !== socket.id) {
        const existingSocket = socketIO.sockets.connected[existingSid];
        if (existingSocket) {
            logger.log('INFO', 'USER', `Duplicate chat login — kicking old socket sid=${existingSid.substring(0, 8)}`);
            existingSocket.disconnect(true);
        }
    }

    // Register user on this socket
    socketUserMap.set(socket.id, {
        userId: userId,
        serverId: serverId || config.serverId,
        userName: '',       // Will be populated when they send a message
        headImage: '',
        headEffect: '0',
        headBox: '0',
        joinedRooms: new Set()
    });
    userSocketMap.set(userId, socket.id);

    // Update socket state
    state.userId = userId;
    state.chatRegistered = true;

    logger.log('INFO', 'USER', `Chat login OK`);
    logger.details('user',
        ['uid', String(userId).substring(0, 16)],
        ['server', serverId || config.serverId],
        ['version', version || '?'],
        ['online', String(userSocketMap.size)]
    );

    // Client TIDAK membaca data dari login response — return kosong
    return buildSuccess({});
}

/**
 * chat.joinRoom — Join a chat room, get message history
 *
 * Request: { type: 'chat', action: 'joinRoom', userId, roomId, version }
 * Response: { _record: [...] }
 *
 * CRITICAL: Setiap message WAJIB punya _type field! Jika undefined → message DROPPED oleh client!
 * Untuk chat biasa: _type = 0 (CT_NULL)
 */
function handleJoinRoom(request, socket) {
    const { userId, roomId } = request;

    if (!userId || !roomId) {
        logger.log('WARN', 'ROOM', `joinRoom FAILED — missing params uid=${userId || 'MISSING'} room=${roomId || 'MISSING'}`);
        return buildError(8);  // ERROR_LACK_PARAM
    }

    // Join the room
    joinRoomInternal(roomId, socket.id);

    // Track in user map
    const userInfo = socketUserMap.get(socket.id);
    if (userInfo) {
        userInfo.joinedRooms.add(roomId);
    }

    // Get chat history for this room
    const messages = getRoomMessages(roomId, 0);

    const room = getRoom(roomId);
    logger.log('INFO', 'ROOM', `joinRoom OK`);
    logger.details('room',
        ['uid', String(userId).substring(0, 16)],
        ['roomId', roomId],
        ['history', `${messages.length} msgs`],
        ['members', String(room.members.size)]
    );

    // DEBUG: Log first few messages for debugging
    if (messages.length > 0 && logger.LOG_LEVEL === 'DEBUG') {
        logger.detail('message', ['sample', `${messages.length} messages, first kind=${messages[0]._kind} type=${messages[0]._type}`]);
    }

    return buildSuccess({ _record: messages });
}

/**
 * chat.leaveRoom — Leave a chat room
 *
 * Request: { type: 'chat', action: 'leaveRoom', userId, roomId, version }
 * Response: {} (kosong, ret=0)
 */
function handleLeaveRoom(request, socket) {
    const { userId, roomId } = request;

    if (!userId || !roomId) {
        logger.log('WARN', 'ROOM', `leaveRoom FAILED — missing params`);
        return buildError(8);
    }

    leaveRoomInternal(roomId, socket.id);

    const userInfo = socketUserMap.get(socket.id);
    if (userInfo) {
        userInfo.joinedRooms.delete(roomId);
    }

    const room = rooms.get(roomId);
    logger.log('INFO', 'ROOM', `leaveRoom OK`);
    logger.details('room',
        ['uid', String(userId).substring(0, 16)],
        ['roomId', roomId],
        ['members', room ? String(room.members.size) : '0']
    );

    return buildSuccess({});
}

/**
 * chat.sendMsg — Send a message to a room
 *
 * Request: { type: 'chat', action: 'sendMsg', userId, kind, content, msgType, param, roomId, version }
 * Response: { _time: timestamp }
 *
 * After storing, broadcast to all members in the room via Notify push.
 * Notify format: { ret: 'SUCCESS', data: JSON.stringify({ _msg: {...} }), compress: false }
 *
 * CRITICAL:
 *   - _type WAJIB! Jika undefined → message DROPPED oleh client!
 *   - _type = 0 untuk chat biasa (CT_NULL)
 *   - _type > 0 untuk system broadcast (gunakan msgType dari request)
 *   - kind = MESSAGE_KIND enum: 2=WORLD, 3=GUILD, 5=WORLD_TEAM, 6=TEAM
 */
function handleSendMsg(request, socket) {
    const { userId, kind, content, msgType, param, roomId } = request;

    if (!userId || !roomId || content === undefined || content === null) {
        logger.log('WARN', 'CHAT', `sendMsg FAILED — missing params uid=${userId || 'MISSING'} room=${roomId || 'MISSING'} content=${content !== undefined ? 'OK' : 'MISSING'}`);
        return buildError(8);
    }

    // Build the message object — ALL fields required by ChatDataBaseClass
    const now = Date.now();
    const userInfo = socketUserMap.get(socket.id);

    const message = {
        _time: now,
        _kind: kind || 0,
        _name: (userInfo && userInfo.userName) || String(userId),
        _content: String(content),
        _id: String(userId),
        _image: (userInfo && userInfo.headImage) || '',
        _param: param || [],
        _type: msgType !== null && msgType !== undefined ? msgType : 0,   // ⚠️ CRITICAL! 0 = CT_NULL (normal chat)
        _headEffect: (userInfo && userInfo.headEffect) || '0',
        _headBox: (userInfo && userInfo.headBox) || '0',
        _oriServerId: (userInfo && userInfo.serverId) || config.serverId,
        _serverId: (userInfo && userInfo.serverId) || config.serverId,
        _showMain: false
    };

    // Store message in room
    addMessageToRoom(roomId, message);

    // Broadcast to all members in the room via Notify push
    const room = getRoom(roomId);
    const notifyPayload = buildChatNotify(message);

    let broadcastCount = 0;
    let selfNotified = false;
    room.members.forEach(memberSocketId => {
        const memberSocket = socketIO.sockets.connected[memberSocketId];
        if (memberSocket) {
            memberSocket.emit('Notify', notifyPayload);
            broadcastCount++;
            if (memberSocketId === socket.id) selfNotified = true;
        }
    });

    logger.log('INFO', 'CHAT', `sendMsg OK`);
    logger.details('message',
        ['uid', String(userId).substring(0, 16)],
        ['room', roomId],
        ['kind', `${kind} (${kindName(kind)})`],
        ['type', String(message._type)],
        ['content', String(content).length > 40 ? String(content).substring(0, 40) + '...' : String(content)],
        ['broadcast', `${broadcastCount}/${room.members.size}`],
        ['self', selfNotified ? 'YES' : 'NO']
    );

    // Return _time untuk client timestamp consistency
    return buildSuccess({ _time: now });
}

/**
 * chat.getRecord — Get older messages (pagination)
 *
 * Request: { type: 'chat', action: 'getRecord', userId, roomId, startTime, version }
 * Response: { _record: [...] }
 *
 * startTime = timestamp terakhir yang diterima client.
 * Server return messages SETELAH waktu tersebut.
 */
function handleGetRecord(request, socket) {
    const { userId, roomId, startTime } = request;

    if (!userId || !roomId) {
        logger.log('WARN', 'CHAT', `getRecord FAILED — missing params`);
        return buildError(8);
    }

    const messages = getRoomMessages(roomId, startTime || 0);

    logger.log('INFO', 'CHAT', `getRecord OK`);
    logger.details('message',
        ['uid', String(userId).substring(0, 16)],
        ['room', roomId],
        ['startTime', startTime ? String(startTime) : '0 (all)'],
        ['returned', `${messages.length} msgs`]
    );

    return buildSuccess({ _record: messages });
}

// ═══════════════════════════════════════════════════════════════
//  HANDLER ROUTER
// ═══════════════════════════════════════════════════════════════

const CHAT_HANDLERS = {
    login: handleLogin,
    joinRoom: handleJoinRoom,
    leaveRoom: handleLeaveRoom,
    sendMsg: handleSendMsg,
    getRecord: handleGetRecord
};

logger.log('INFO', 'HANDLER', `Chat handlers registered — ${Object.keys(CHAT_HANDLERS).length} actions`);
logger.handlerRegistry({ chat: CHAT_HANDLERS });

// ═══════════════════════════════════════════════════════════════
//  SOCKET.IO SERVER
// ═══════════════════════════════════════════════════════════════

const server = http.createServer();
const socketIO = io(server, {
    pingInterval: 10000,
    pingTimeout: 5000
});

socketIO.on('connection', (socket) => {
    const connectTime = Date.now();
    const clientIp = socket.handshake.address || 'unknown';
    const transport = socket.handshake.query.transport || socket.conn.transport.name || 'websocket';

    // Initialize state
    const nonce = tea.generateNonce();
    socketStates.set(socket.id, {
        verified: false,
        userId: null,
        nonce: nonce,
        loginTime: connectTime,
        ip: clientIp,
        transport: transport,
        chatRegistered: false
    });
    actionCounters.set(socket.id, 0);

    logger.log('INFO', 'SOCKET', 'Client connected');
    logger.socketEvent('connect', socket.id, clientIp, transport);
    logger.details('session',
        ['total', String(socketStates.size)],
        ['transport', transport]
    );

    // ─── TEA VERIFICATION HANDSHAKE ───
    socket.emit('verify', nonce);
    logger.log('DEBUG', 'TEA', `Challenge sent → sid=${socket.id.substring(0, 8)}`);

    // Listen for verify response
    socket.on('verify', (encrypted, callback) => {
        if (typeof callback !== 'function') return;

        const state = socketStates.get(socket.id);
        if (!state) {
            logger.log('WARN', 'TEA', `Verify FAILED — no state for sid=${socket.id.substring(0, 8)}`);
            callback({ ret: 55 });
            return;
        }

        const verifyStart = Date.now();
        const verified = tea.verify(state.nonce, encrypted, config.teaKey);

        if (verified) {
            state.verified = true;
            logger.log('INFO', 'TEA', 'Client verified ✓');
            logger.details('session',
                ['sid', socket.id.substring(0, 8)],
                ['duration', (Date.now() - verifyStart) + 'ms'],
                ['verified', 'true']
            );
            callback({ ret: 0 });
        } else {
            logger.log('WARN', 'TEA', 'Verification FAILED ✗ — disconnecting');
            logger.details('session',
                ['sid', socket.id.substring(0, 8)],
                ['duration', (Date.now() - verifyStart) + 'ms'],
                ['verified', 'false']
            );
            callback({ ret: 55 });
            socket.disconnect();
        }
    });

    // ─── HANDLER.PROCESS — ROUTER UTAMA ───
    socket.on('handler.process', async (request, callback) => {
        if (typeof callback !== 'function') return;

        const handlerStart = Date.now();

        // 1. Cek verified
        const state = socketStates.get(socket.id);
        if (!state || !state.verified) {
            logger.log('WARN', 'HANDLER', `Unverified request from sid=${socket.id.substring(0, 8)}`);
            return callback(buildError(37));  // ERROR_NO_LOGIN_CLIENT
        }

        // 2. Increment action counter
        const actionCounter = (actionCounters.get(socket.id) || 0) + 1;
        actionCounters.set(socket.id, actionCounter);

        // 3. Parse request
        const { type, action } = request;
        const userId = state.userId || request.userId || '?';
        const shortUserId = String(userId).substring(0, 16);

        // 4. Log request with detail
        logger.log('INFO', 'HANDLER', `[${actionCounter}] ${type}.${action}`);
        logger.actionLog('req', `${type}.${action}`, 'REQ', null, `uid=${shortUserId}`);

        // DEBUG: Log full request payload
        if (logger.LOG_LEVEL === 'DEBUG') {
            const debugPayload = { ...request };
            // Truncate long content for debug log
            if (debugPayload.content && String(debugPayload.content).length > 80) {
                debugPayload.content = String(debugPayload.content).substring(0, 80) + '...';
            }
            logger.detail('request', ['payload', JSON.stringify(debugPayload)]);
        }

        // 5. Chat-server hanya handle type='chat'
        if (type !== 'chat') {
            logger.log('WARN', 'HANDLER', `Unknown type: ${type} (chat-server only handles 'chat')`);
            logger.actionLog('res', `${type}.${action}`, 'ERR', Date.now() - handlerStart, `ret=4`);
            return callback(buildError(4));  // ERROR_INVALID
        }

        // 6. Route ke handler
        const handlerFn = CHAT_HANDLERS[action];
        if (!handlerFn) {
            logger.log('WARN', 'HANDLER', `Unknown chat action: ${action}`);
            logger.actionLog('res', `chat.${action}`, 'ERR', Date.now() - handlerStart, `ret=4`);
            return callback(buildError(4));  // ERROR_INVALID
        }

        // 7. Execute handler
        try {
            const response = await handlerFn(request, socket);

            const duration = Date.now() - handlerStart;
            const status = response.ret === 0 ? 'OK' : 'ERR';

            logger.log(response.ret === 0 ? 'INFO' : 'WARN', 'HANDLER',
                `[${actionCounter}] chat.${action} → ${status} (${duration}ms)`);
            logger.actionLog('res', `chat.${action}`, status, duration,
                `ret=${response.ret} ${response.ret === 0 ? '✅' : '❌'}`);

            callback(response);
        } catch (err) {
            const duration = Date.now() - handlerStart;
            logger.log('ERROR', 'HANDLER', `[${actionCounter}] chat.${action} threw error (${duration}ms)`);
            logger.details('important',
                ['error', err.message],
                ['stack', err.stack ? err.stack.split('\n')[1] : ''],
                ['duration', duration + 'ms']
            );
            logger.actionLog('res', `chat.${action}`, 'ERR', duration, `ret=1 ${err.message.substring(0, 40)}`);
            callback(buildError(1));  // ERROR_UNKNOWN
        }
    });

    // ─── DISCONNECT ───
    socket.on('disconnect', (reason) => {
        const state = socketStates.get(socket.id);
        const userInfo = socketUserMap.get(socket.id);
        const userId = userInfo ? userInfo.userId : (state ? state.userId : 'unknown');
        const aliveMs = state ? Date.now() - state.loginTime : 0;
        const roomCount = userInfo ? userInfo.joinedRooms.size : 0;

        logger.log('INFO', 'SOCKET', 'Client disconnected');
        logger.socketEvent('disconnect', socket.id, state ? state.ip : '?', state ? state.transport : '?',
            `uid=${String(userId).substring(0, 12)} alive=${aliveMs}ms reason=${reason}`);
        logger.details('session',
            ['rooms', String(roomCount)],
            ['online', String(socketStates.size - 1)],
            ['registered', state && state.chatRegistered ? 'YES' : 'NO']
        );

        // Leave all rooms
        if (userInfo) {
            if (userInfo.joinedRooms.size > 0) {
                logger.log('DEBUG', 'ROOM', `Auto-leave ${userInfo.joinedRooms.size} rooms for uid=${String(userId).substring(0, 12)}`);
                userInfo.joinedRooms.forEach(roomId => {
                    leaveRoomInternal(roomId, socket.id);
                });
            }

            // Remove from userSocketMap
            if (userSocketMap.get(userInfo.userId) === socket.id) {
                userSocketMap.delete(userInfo.userId);
            }
        }

        // Clean up
        socketUserMap.delete(socket.id);
        socketStates.delete(socket.id);
        actionCounters.delete(socket.id);
    });

    // ─── Transport upgrade ───
    socket.conn.on('upgrade', (transport) => {
        const state = socketStates.get(socket.id);
        if (state) {
            state.transport = transport.name;
        }
        logger.log('DEBUG', 'SOCKET', `Transport upgraded → ${transport.name}`);
        logger.detail('data', ['socketId', socket.id.substring(0, 8)], ['transport', transport.name]);
    });
});

// ═══════════════════════════════════════════════════════════════
//  PERIODIC STATUS — Debug snapshot setiap 60 detik
// ═══════════════════════════════════════════════════════════════

setInterval(() => {
    let totalMessages = 0;
    let totalMembers = 0;
    rooms.forEach(room => {
        totalMessages += room.messages.length;
        totalMembers += room.members.size;
    });

    logger.log('DEBUG', 'SERVER', `Status snapshot`);
    logger.details('status',
        ['sockets', String(socketStates.size)],
        ['users', String(userSocketMap.size)],
        ['rooms', String(rooms.size)],
        ['messages', String(totalMessages)],
        ['roomMembers', String(totalMembers)]
    );
}, 60000);

// ═══════════════════════════════════════════════════════════════
//  START SERVER
// ═══════════════════════════════════════════════════════════════

server.listen(config.port, () => {
    logger.boundary('💬', 'CHAT-SERVER READY');
    logger.details('config',
        ['Port', String(config.port)],
        ['TEA Verify', config.verifyEnable ? 'ON' : 'OFF'],
        ['Storage', 'In-Memory'],
        ['Rooms', `${rooms.size} pre-created`],
        ['Handlers', `${Object.keys(CHAT_HANDLERS).length} actions`],
        ['LOG_LEVEL', logger.LOG_LEVEL]
    );
    logger.boundaryEnd('💬');

    logger.log('INFO', 'SERVER', `Ready — listening on http://127.0.0.1:${config.port}`);
    logger.log('INFO', 'SERVER', 'Waiting for Socket.IO connections...');
});

// Expose LOG_LEVEL
const LOG_LEVEL = (process.env.LOG_LEVEL || 'INFO').toUpperCase();
