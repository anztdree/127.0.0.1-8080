/**
 * index.js — CHAT-SERVER Main Entry Point
 * Deep-traced from main.min.js
 *
 * Port: 8002
 * Transport: Socket.IO 2.5.1
 * TEA: ON (verifyEnable = true) — L113445: chatClient = new TSSocketClient('chat-server', true)
 * Database: In-memory (no persistence needed — chat is ephemeral)
 * Protocol: handler.process (same as main-server)
 *
 * ═══════════════════════════════════════════════════════════════
 * CLIENT CONNECTION FLOW
 * ═══════════════════════════════════════════════════════════════
 *
 * 1. registChat (main-server) → returns chatServerUrl + worldRoomId
 * 2. clientStartChat → chatClient.connectToServer(chatServerUrl, callback)
 *    L114479: a = ts.loginInfo.serverItem.chaturl
 *    L114480: this.chatClient.connectToServer(a, o)
 *    L82537: io.connect(chatServerUrl, { reconnectionAttempts: 10 })
 *
 * 3. TEA verify handshake — L82579-82587:
 *    socket.on('verify', function(n) {
 *        var o = new TEA().encrypt(n, 'verification');
 *        socket.emit('verify', o, function(n) {
 *            0 == n.ret ? e() : ErrorHandler.ShowErrorTips(n.ret), t.destroy()
 *        });
 *    });
 *
 * 4. startChatListenNotify — L114240-114261:
 *    chatClient.listenNotify(function(e) {
 *        if ('SUCCESS' == e.ret) {
 *            t = e.data;
 *            e.compress && (t = LZString.decompressFromUTF16(t));
 *            n = JSON.parse(t);
 *            ChatDataBaseClass.getData(n._msg);
 *        }
 *    });
 *    L82522: this.socket.on('Notify', e);
 *
 * 5. chatLoginRequest — L114550-114557:
 *    processHandlerWithChat({type:'chat', action:'login', userId, serverId, version})
 *    → callback starts joining rooms (world, guild?, teamDungeon?, team?)
 *
 * ═══════════════════════════════════════════════════════════════
 * HANDLERS
 * ═══════════════════════════════════════════════════════════════
 *
 * chat::login     — Register userId→socket mapping
 * chat::joinRoom  — Join Socket.IO room, return message history {_record}
 * chat::leaveRoom — Leave Socket.IO room
 * chat::sendMsg   — Store + broadcast message via Notify, return {_time}
 * chat::getRecord — Return filtered message history since startTime
 *
 * ═══════════════════════════════════════════════════════════════
 * NOTIFY FORMAT
 * ═══════════════════════════════════════════════════════════════
 *
 * socket.emit('Notify', {
 *     ret: 'SUCCESS',         ← STRING, not number
 *     data: JSON.stringify({ _msg: msgObj }),
 *     compress: boolean
 * })
 *
 * STRICT RULES: NO STUB, OVERRIDE, FORCE, BYPASS, DUMMY, ASUMSI
 */

const chalk = require('chalk');
const LZString = require('lz-string');
const logger = require('./logger');
const config = require('./config');
const tea = require('./tea');

// ─── Chat Handlers ───
const chatLogin = require('./handlers/chat/login');
const chatJoinRoom = require('./handlers/chat/joinRoom');
const chatLeaveRoom = require('./handlers/chat/leaveRoom');
const chatSendMsg = require('./handlers/chat/sendMsg');
const chatGetRecord = require('./handlers/chat/getRecord');

// ─── Socket.IO 2.5.1 Setup ───
const io = require('socket.io')(config.port, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    },
    transports: ['websocket', 'polling']
});

// ─── Session & Room Storage (in-memory) ───
const sessions = new Map();       // socketId → { userId, serverId, rooms[], connectedAt }
const userSockets = new Map();    // userId → socketId (latest connection)
const roomStore = new Map();      // roomId → [ msgObj, msgObj, ... ]
const actionCounters = new Map();

// ═══════════════════════════════════════════════════════════════
// SAFE JSON STRINGIFY — with circular reference detection
// ═══════════════════════════════════════════════════════════════

function safeStringify(obj, label) {
    try {
        return { json: JSON.stringify(obj), error: null, circularField: null };
    } catch (err) {
        logger.log('ERROR', 'COMPRESS', `[safeStringify] FAILED for "${label}": ${err.message}`);
        if (obj && typeof obj === 'object') {
            for (const key of Object.keys(obj)) {
                try { JSON.stringify(obj[key]); }
                catch (innerErr) {
                    logger.log('ERROR', 'COMPRESS', `[safeStringify] Circular ref in field: "${key}"`);
                    return { json: null, error: err, circularField: key };
                }
            }
        }
        return { json: null, error: err, circularField: null };
    }
}

// ═══════════════════════════════════════════════════════════════
// RESPONSE BUILDER — same protocol as main-server
// ═══════════════════════════════════════════════════════════════

function buildResponse(ret, data, compress) {
    return {
        ret: ret,
        data: typeof data === 'string' ? data : JSON.stringify(data),
        compress: compress || false,
        serverTime: Date.now(),
        server0Time: config.server0Time
    };
}

function buildErrorResponse(errorCode) {
    return buildResponse(errorCode, '', false);
}

function buildDataResponse(ret, dataObj) {
    const result = safeStringify(dataObj, 'buildDataResponse');
    if (result.error) {
        logger.log('ERROR', 'COMPRESS', chalk.red(`CANNOT stringify — circular ref in: ${result.circularField || 'unknown'}`));
        return buildErrorResponse(1);
    }

    const jsonStr = result.json;
    if (jsonStr.length > config.compressionThreshold) {
        const compressed = LZString.compressToUTF16(jsonStr);
        const reduction = Math.round((1 - compressed.length / jsonStr.length) * 100);
        logger.log('DEBUG', 'COMPRESS', `Compressing response data...`);
        logger.details('compress',
            ['original', jsonStr.length + ' chars'],
            ['compressed', compressed.length + ' chars'],
            ['reduction', reduction + '%']
        );
        return buildResponse(ret, compressed, true);
    }
    return buildResponse(ret, jsonStr, false);
}

// ═══════════════════════════════════════════════════════════════
// ACTION ROUTER — chat type handlers
// ═══════════════════════════════════════════════════════════════

// Handler registry: { type: { action: handlerFn } }
const ACTION_HANDLERS = {
    chat: {
        login: chatLogin,
        joinRoom: chatJoinRoom,
        leaveRoom: chatLeaveRoom,
        sendMsg: chatSendMsg,
        getRecord: chatGetRecord
    }
};

// ═══════════════════════════════════════════════════════════════
// SOCKET.IO CONNECTION HANDLER
// ═══════════════════════════════════════════════════════════════

io.on('connection', (socket) => {
    const socketId = socket.id;
    const clientIp = socket.handshake.address || 'unknown';
    const transport = socket.conn.transport.name || 'polling';

    // Initialize session
    sessions.set(socketId, {
        userId: null,
        serverId: null,
        rooms: [],
        connectedAt: Date.now(),
        ip: clientIp,
        transport: transport
    });
    actionCounters.set(socketId, 0);

    logger.socketEvent('connect', socketId, clientIp, transport);
    logger.details('session',
        ['socketId', socketId],
        ['ip', clientIp],
        ['transport', transport],
        ['totalSessions', String(sessions.size)]
    );

    // ─── TEA HANDSHAKE ───
    // L82579-82587: socketOnVerify
    // Server emits challenge, client encrypts with TEA key 'verification'
    const challenge = require('uuid').v4();
    const session = sessions.get(socketId);
    session.challenge = challenge;

    logger.log('INFO', 'TEA', `Sending verify challenge`);
    logger.details('challenge',
        ['challenge', challenge],
        ['socketId', socketId.substring(0, 16) + '...']
    );

    socket.emit('verify', challenge);

    // Handle TEA verify response
    socket.on('verify', (encrypted, callback) => {
        const startTime = Date.now();

        if (typeof callback !== 'function') {
            logger.log('WARN', 'TEA', `Verify callback missing — disconnecting`);
            socket.disconnect();
            return;
        }

        logger.log('DEBUG', 'TEA', `[verify] Received encrypted response`);

        let decrypted = '';
        try {
            decrypted = tea.decrypt(encrypted, config.teaKey);
        } catch (err) {
            logger.errorWithStack('TEA', `Decrypt failed`, err);
            callback({ ret: 38 });
            socket.disconnect();
            return;
        }

        const currentSession = sessions.get(socketId);
        const duration = Date.now() - startTime;

        if (decrypted === currentSession.challenge) {
            currentSession.verified = true;
            logger.log('INFO', 'TEA', chalk.green.bold('TEA verification SUCCESS'));
            logger.details('result',
                ['socketId', socketId.substring(0, 16) + '...'],
                ['duration', duration + 'ms']
            );
            callback({ ret: 0 });
        } else {
            logger.log('WARN', 'TEA', chalk.red.bold('TEA verification FAILED — challenge mismatch'));
            logger.details('compare',
                ['expected', currentSession.challenge.substring(0, 24) + '...'],
                ['got', decrypted.substring(0, 24) + '...'],
                ['duration', duration + 'ms']
            );
            callback({ ret: 38 });
            socket.disconnect();
        }
    });

    // ─── handler.process ───
    // L82527-82528: sendToServer → socket.emit('handler.process', request, callback)
    // L113885-113899: processHandlerWithChat parses response same as main-server
    socket.on('handler.process', async (request, callback) => {
        const handlerStart = Date.now();
        const actionCounter = (actionCounters.get(socketId) || 0) + 1;
        actionCounters.set(socketId, actionCounter);

        const action = request.action || 'UNKNOWN';
        const actionType = request.type || '';
        const fullAction = actionType ? `${actionType}::${action}` : action;

        // ─── REQUEST LOG ───
        logger.actionLog('req', fullAction, 'OK');
        logger.details('request',
            ['action', action],
            ['type', actionType],
            ['userId', (request.userId || '?').substring(0, 20)],
            ['counter', String(actionCounter)]
        );

        // Validate: socket must be TEA-verified
        const currentSession = sessions.get(socketId);
        if (!currentSession || !currentSession.verified) {
            logger.log('WARN', 'HANDLER', chalk.red('Socket not TEA-verified') + ' → ret=38');
            if (typeof callback === 'function') {
                callback(buildErrorResponse(38));
            }
            return;
        }

        // Find handler by type + action
        const typeHandlers = ACTION_HANDLERS[actionType];
        if (!typeHandlers) {
            logger.log('WARN', 'HANDLER', chalk.yellow(`Unknown type`) + ` "${actionType}"`);
            logger.details('registered',
                ['types', Object.keys(ACTION_HANDLERS).join(', ')],
                ['action', action]
            );
            if (typeof callback === 'function') {
                callback(buildErrorResponse(4));
            }
            return;
        }

        const handler = typeHandlers[action];
        if (!handler) {
            logger.log('WARN', 'HANDLER', chalk.yellow(`Unknown action`) + ` "${actionType}::${action}"`);
            logger.details('available',
                ['actions', Object.keys(typeHandlers).join(', ')],
                ['requested', action]
            );
            if (typeof callback === 'function') {
                callback(buildErrorResponse(4));
            }
            return;
        }

        // Track userId in session
        if (request.userId) {
            currentSession.userId = request.userId;
        }

        try {
            const ctx = {
                config,
                logger,
                socket,
                io,
                session: currentSession,
                sessions,
                userSockets,
                roomStore,
                buildDataResponse,
                buildErrorResponse
            };

            const response = await handler(request, ctx);
            const handlerDuration = Date.now() - handlerStart;

            // ─── RESPONSE LOG ───
            const dataLen = typeof response.data === 'string' ? response.data.length : 0;
            const isCompressed = response.compress || false;
            logger.actionLog('res', fullAction, response.ret === 0 ? 'OK' : 'ERR', null,
                `ret=${response.ret} ${dataLen} chars ${isCompressed ? '(LZ)' : '(raw)'} ${handlerDuration}ms`);

            if (typeof callback === 'function') {
                callback(response);
            }
        } catch (err) {
            const handlerDuration = Date.now() - handlerStart;
            logger.errorWithStack('HANDLER', `Action "${fullAction}" threw UNHANDLED error`, err);
            logger.details('error',
                ['name', err.name],
                ['message', err.message],
                ['duration', handlerDuration + 'ms']
            );
            if (typeof callback === 'function') {
                callback(buildErrorResponse(1));
            }
        }
    });

    // ─── Socket Disconnect ───
    socket.on('disconnect', (reason) => {
        const s = sessions.get(socketId);
        const userId = (s && s.userId) ? s.userId : 'unknown';
        const aliveMs = s ? Date.now() - s.connectedAt : 0;
        const verified = s ? s.verified : false;
        const actionCount = actionCounters.get(socketId) || 0;

        logger.socketEvent('disconnect', socketId, s ? s.ip : '?', s ? s.transport : '?',
            `reason=${reason}`);
        logger.details('session',
            ['userId', userId.substring(0, 20)],
            ['alive', aliveMs + 'ms'],
            ['actions', String(actionCount)],
            ['rooms', s ? String(s.rooms.length) : '0'],
            ['reason', reason]
        );

        // Clean up userSockets mapping
        if (s && s.userId && userSockets.get(s.userId) === socketId) {
            userSockets.delete(s.userId);
        }

        sessions.delete(socketId);
        actionCounters.delete(socketId);
    });

    // ─── Transport upgrade ───
    socket.conn.on('upgrade', (transport) => {
        const s = sessions.get(socketId);
        if (s) {
            s.transport = transport.name;
        }
        logger.log('DEBUG', 'SOCKET', `Transport upgraded → ${chalk.cyan(transport.name)}`);
    });
});

// ═══════════════════════════════════════════════════════════════
// SERVER STARTUP
// ═══════════════════════════════════════════════════════════════

logger.header('SUPER WARRIOR Z — CHAT SERVER');

console.log('');
logger.table([
    ['Port', String(config.port)],
    ['Socket.IO', '2.5.1'],
    ['TEA', 'ON (verification)'],
    ['Storage', 'In-memory (ephemeral)'],
    ['maxRoomMessages', String(config.maxRoomMessages)],
    ['maxMessageLength', String(config.maxMessageLength)],
    ['compressionThreshold', String(config.compressionThreshold) + ' chars'],
    ['LOG_LEVEL', process.env.LOG_LEVEL || 'INFO']
]);

logger.headerEnd();

// Log registered handlers
console.log('');
logger.log('INFO', 'HANDLER', chalk.bold('Registered action handlers:'));
console.log('');
let totalHandlers = 0;
const types = Object.keys(ACTION_HANDLERS);
for (let t = 0; t < types.length; t++) {
    const type = types[t];
    const actions = Object.keys(ACTION_HANDLERS[type]);
    for (let a = 0; a < actions.length; a++) {
        totalHandlers++;
        const isLastAction = (a === actions.length - 1);
        const isLastType = (t === types.length - 1);
        const isVeryLast = isLastAction && isLastType;
        const connector = isVeryLast ? '└' : '├';
        const icon = isVeryLast ? chalk.green('>>') : chalk.cyan('>>');
        const typeStr = chalk.magenta(type);
        const actionStr = chalk.white(actions[a]);
        const handlerPath = chalk.gray('handlers/' + type + '/' + actions[a] + '.js');
        console.log(`  ${connector} ${icon} ${typeStr}::${actionStr}  ${handlerPath}`);
    }
}
console.log('');
logger.details('handlers', ['total', String(totalHandlers)]);

logger.headerEnd();

console.log('');
logger.log('INFO', 'SERVER', chalk.green.bold(`Ready — listening on http://127.0.0.1:${config.port}`));
logger.log('INFO', 'SERVER', `Waiting for Socket.IO connections...`);
console.log('');
