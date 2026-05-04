/**
 * index.js — MAIN-SERVER Main Entry Point
 * Referensi: main-server.md v4.0 Section 1, 2, 3
 *
 * Port: 8001
 * Transport: Socket.IO 2.5.1
 * TEA: ON (verifyEnable = true, key = 'verification')
 * Database: better-sqlite3 — ./data/main_server.db
 * Protocol: handler.process (single event for all actions)
 * JSON Loader: 471 files loaded to memory at startup
 *
 * Startup sequence:
 * 1. Load all 471 JSON resource files to memory
 * 2. Initialize database
 * 3. Start Socket.IO server
 * 4. Wait for connections
 */

const http = require('http');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const logger = require('./logger');
const config = require('./config');
const db = require('./db');
const tea = require('./tea');
const jsonLoader = require('./jsonLoader');
const responseHelper = require('./responseHelper');

// ─── Phase 1: Load JSON Resources ───
logger.boundary('📄', 'LOADING JSON RESOURCES');
const jsonStatus = jsonLoader.loadAll();
logger.boundaryEnd('📄');

if (jsonStatus.failedFiles > 0) {
    logger.log('WARN', 'SERVER', `Some JSON files failed to load — proceed with caution`);
}

// ─── Socket.IO 2.5.1 Setup ───
const io = require('socket.io')(config.port, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    },
    transports: ['websocket', 'polling']
});

// ─── Session Tracking ───
// Map socketId → { userId, verified, nonce, connectedAt, ip, transport }
const sessions = new Map();

// ─── Action Counter (per socket) ───
const actionCounters = new Map();

// ═══════════════════════════════════════════════════════════════
// SDK-SERVER API HELPER
// Referensi: main-server.md v4.0 Section 3
// ═══════════════════════════════════════════════════════════════

/**
 * Validate loginToken via SDK-Server /auth/validate
 * @param {string} loginToken
 * @param {string} userId
 * @returns {Promise<object>} { valid, sign, securityCode, loginToken }
 */
function validateWithSDKServer(loginToken, userId) {
    return new Promise((resolve) => {
        const payload = JSON.stringify({ loginToken, userId });
        const startTime = Date.now();

        const options = {
            hostname: '127.0.0.1',
            port: 9999,
            path: '/auth/validate',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload)
            },
            timeout: 5000
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                const duration = Date.now() - startTime;
                try {
                    const data = JSON.parse(body);
                    logger.log('INFO', 'SDKAPI', 'SDK-Server /auth/validate response');
                    logger.details('data',
                        ['userId', userId],
                        ['valid', String(data.valid)],
                        ['duration', duration + 'ms']
                    );
                    resolve(data);
                } catch (err) {
                    logger.log('ERROR', 'SDKAPI', 'SDK-Server response parse error');
                    resolve({ valid: false, loginToken: '', securityCode: '' });
                }
            });
        });

        req.on('error', (err) => {
            logger.log('ERROR', 'SDKAPI', 'SDK-Server /auth/validate failed');
            logger.detail('important', ['error', err.message]);
            resolve({ valid: false, loginToken: '', securityCode: '' });
        });

        req.on('timeout', () => {
            req.destroy();
        });

        req.write(payload);
        req.end();
    });
}

// ═══════════════════════════════════════════════════════════════
// HANDLER REGISTRY
// Referensi: main-server.md v4.0 Section 8
// ═══════════════════════════════════════════════════════════════

/**
 * Handler registry — maps "type.action" to handler function
 * Handlers akan dimuat dari handlers/ folder secara bertahap
 * Saat ini hanya skeleton — handler ditambahkan per 1 action = 1 file
 */
const ACTION_HANDLERS = {};

/**
 * Register handler function
 * @param {string} type - Handler type (e.g. 'user', 'hero', 'summon')
 * @param {string} action - Handler action (e.g. 'enterGame', 'levelUp')
 * @param {function} handlerFn - Handler function(request, session) → response
 */
function registerHandler(type, action, handlerFn) {
    const key = `${type}.${action}`;
    ACTION_HANDLERS[key] = handlerFn;
    logger.log('INFO', 'HANDLER', `Registered: ${key}`);
}

// ═══════════════════════════════════════════════════════════════
// HANDLER AUTO-LOADER
// Setiap file di handlers/ → 1 action = 1 file
// Filename convention: handlers/<actionName>.js
// Contoh: handlers/enterGame.js → registerHandler('user', 'enterGame', handlerFn)
// ═══════════════════════════════════════════════════════════════

const HANDLERS_DIR = path.join(__dirname, 'handlers');

/**
 * Auto-load semua handler dari handlers/ folder
 * Setiap file export satu async function(request, session) → response
 */
function loadHandlers() {
    if (!fs.existsSync(HANDLERS_DIR)) {
        logger.log('WARN', 'HANDLER', 'handlers/ directory not found');
        return;
    }

    const files = fs.readdirSync(HANDLERS_DIR).filter(f => f.endsWith('.js'));

    for (const file of files) {
        const actionName = path.basename(file, '.js');
        const handlerFn = require(path.join(HANDLERS_DIR, file));

        if (typeof handlerFn !== 'function') {
            logger.log('WARN', 'HANDLER', `Skipping ${file} — not a function export`);
            continue;
        }

        // Default: register sebagai 'user.<actionName>'
        // Handler file bisa specify custom type via handlerFn.handlerType
        const type = handlerFn.handlerType || 'user';
        registerHandler(type, actionName, handlerFn);
    }
}

// Load semua handlers
loadHandlers();

/**
 * Handler: user.registChat
 * Referensi: main-server.md v4.0 Section 3.1a, 8.1
 */
function handleRegistChat(request, session) {
    const { userId } = request;

    logger.log('INFO', 'REGCHAT', 'registChat request');
    logger.detail('data', ['userId', userId]);

    // Client membaca response fields (main.min.js Line 114462-114471):
    //   n._success → truthy check
    //   n._chatServerUrl → chat server URL
    //   n._worldRoomId → world chat room ID
    //   n._guildRoomId → guild chat room ID prefix
    //   n._teamDungeonChatRoom → team dungeon chat room prefix
    //   n._teamChatRoom → team chat room prefix
    return responseHelper.buildSuccess({
        _success: 1,
        _chatServerUrl: config.chatServerUrl,
        _worldRoomId: config.chatWorldRoomId,
        _guildRoomId: config.chatGuildRoomIdPrefix + (session.userId || userId),
        _teamDungeonChatRoom: config.chatTeamDungeonRoomPrefix,
        _teamChatRoom: config.chatTeamRoomPrefix
    });
}

/**
 * Handler: user.getBulletinBrief
 * Referensi: main-server.md v4.0 Section 3.1a, 8.1
 */
function handleGetBulletinBrief(request, session) {
    const userId = request.userId;

    logger.log('INFO', 'ENTER', 'getBulletinBrief request');
    logger.detail('data', ['userId', userId]);

    // Client membaca n._brief[o].title, n._brief[o].version, n._brief[o].order
    // (main.min.js Line 121084-121102)
    const noticeContent = jsonLoader.get('noticeContent');

    // Wrap dalam _brief jika belum ada
    let brief = {};
    if (noticeContent) {
        if (noticeContent._brief) {
            brief = noticeContent;
        } else {
            brief._brief = noticeContent;
        }
    }

    return responseHelper.buildSuccess(brief);
}

// Register built-in handlers (simple handlers yang belum perlu file terpisah)
registerHandler('user', 'registChat', handleRegistChat);
registerHandler('user', 'getBulletinBrief', handleGetBulletinBrief);

// ═══════════════════════════════════════════════════════════════
// SOCKET.IO CONNECTION HANDLER
// Referensi: main-server.md v4.0 Section 1.5-1.8, 2.4
// ═══════════════════════════════════════════════════════════════

io.on('connection', (socket) => {
    const socketId = socket.id;
    const clientIp = socket.handshake.address || 'unknown';
    const transport = socket.handshake.query.transport || socket.conn.transport.name || 'websocket';

    // Check online user limit
    const onlineCount = db.getOnlineCount();
    if (onlineCount >= config.maxOnlineUsers) {
        logger.log('WARN', 'SOCKET', 'Max online users reached — rejecting');
        socket.emit('handler.process', responseHelper.buildError(responseHelper.ErrorCodes.ONLINE_USER_MAX));
        socket.disconnect(true);
        return;
    }

    // Initialize session — NOT verified yet (TEA handshake pending)
    sessions.set(socketId, {
        userId: null,
        verified: false,
        nonce: null,
        connectedAt: Date.now(),
        ip: clientIp,
        transport: transport
    });
    actionCounters.set(socketId, 0);

    logger.log('INFO', 'SOCKET', 'Client connected (TEA handshake pending)');
    logger.socketEvent('connect', socketId, clientIp, transport);

    // ─── TEA Handshake ───
    // Referensi: main-server.md v4.0 Section 2.4
    if (config.teaEnabled) {
        const nonce = tea.generateNonce();
        const session = sessions.get(socketId);
        if (session) {
            session.nonce = nonce;
        }

        // Send challenge ke client
        socket.emit('verify', nonce);

        // Listen for client response
        socket.on('verify', (encryptedNonce, callback) => {
            const session = sessions.get(socketId);

            if (!session) {
                if (typeof callback === 'function') {
                    callback({ ret: 1 });
                }
                return;
            }

            logger.log('INFO', 'TEA', 'TEA handshake response received');

            if (tea.verifyHandshake(encryptedNonce, session.nonce)) {
                session.verified = true;

                logger.log('INFO', 'TEA', 'TEA handshake SUCCESS');
                logger.details('data',
                    ['socketId', socketId.substring(0, 8)],
                    ['clientIp', clientIp]
                );

                if (typeof callback === 'function') {
                    callback({ ret: 0 });
                }
            } else {
                session.verified = false;

                logger.log('WARN', 'TEA', 'TEA handshake FAILED');
                logger.details('important',
                    ['socketId', socketId.substring(0, 8)],
                    ['clientIp', clientIp]
                );

                if (typeof callback === 'function') {
                    callback({ ret: 1 });
                }

                // Destroy socket on failed handshake
                socket.disconnect(true);
            }
        });
    }

    // ─── Handle handler.process ───
    // Referensi: main-server.md v4.0 Section 2.1, 2.2
    socket.on('handler.process', async (request, callback) => {
        const actionCounter = (actionCounters.get(socketId) || 0) + 1;
        actionCounters.set(socketId, actionCounter);

        const action = request.action || 'UNKNOWN';
        const actionType = request.type || '';

        // Log request
        logger.log('INFO', 'HANDLER', `[${actionCounter}] handler.process → ${actionType}.${action}`);
        logger.actionLog('req', action, 'REQ', null,
            `uid=${(request.userId || '?').substring(0, 12)}`);

        // Validate: TEA handshake must be completed first
        if (config.teaEnabled) {
            const session = sessions.get(socketId);
            if (!session || !session.verified) {
                logger.log('WARN', 'HANDLER', 'Request rejected — TEA not verified');
                if (typeof callback === 'function') {
                    callback(responseHelper.buildError(responseHelper.ErrorCodes.FORBIDDEN_LOGIN));
                }
                return;
            }
        }

        // Validate: action must exist
        if (!action) {
            logger.log('WARN', 'HANDLER', 'Missing action field');
            if (typeof callback === 'function') {
                callback(responseHelper.buildError(responseHelper.ErrorCodes.ERROR_LACK_PARAM));
            }
            return;
        }

        // Find handler — try "type.action" first, then just "action"
        const handlerKey = actionType ? `${actionType}.${action}` : action;
        const handler = ACTION_HANDLERS[handlerKey] || ACTION_HANDLERS[action];

        if (!handler) {
            logger.log('WARN', 'HANDLER', `Unknown action: "${handlerKey}"`);
            if (typeof callback === 'function') {
                callback(responseHelper.buildError(responseHelper.ErrorCodes.ERROR_INVALID));
            }
            return;
        }

        // Track userId in session
        const reqUserId = request.userId;
        if (reqUserId) {
            const session = sessions.get(socketId);
            if (session) {
                session.userId = reqUserId;
            }
        }

        try {
            // Dispatch ke handler
            const session = sessions.get(socketId);
            const response = await handler(request, session || {});

            // Log response
            const status = response.ret === 0 ? 'OK' : `ERR=${response.ret}`;
            logger.actionLog('res', action, response.ret === 0 ? 'OK' : 'ERR',
                null, `ret=${response.ret} ${response.ret === 0 ? '✅' : '❌'}`);

            if (typeof callback === 'function') {
                callback(response);
            }
        } catch (err) {
            logger.log('ERROR', 'HANDLER', `Action "${action}" threw error`);
            logger.details('important',
                ['error', err.message],
                ['stack', err.stack ? err.stack.split('\n')[1] : '']
            );

            if (typeof callback === 'function') {
                callback(responseHelper.buildError(responseHelper.ErrorCodes.ERROR_UNKNOWN));
            }
        }
    });

    // ─── Socket Disconnect ───
    // Bug fix: userId bisa null jika TEA handshake gagal sebelum enterGame
    // Di client, UserInfoSingleton.userId hanya di-set setelah enterGame berhasil
    // Jadi socket yang belum auth TIDAK punya userId → jangan akses .substring()
    socket.on('disconnect', (reason) => {
        const session = sessions.get(socketId);
        const userId = session ? session.userId : null;
        const aliveMs = session ? Date.now() - session.connectedAt : 0;

        // Set user offline in DB — hanya jika userId ada (user sudah pernah enterGame)
        if (userId) {
            db.setUserOnline(userId, 0);
        }

        logger.log('INFO', 'SOCKET', 'Client disconnected');
        const uidDisplay = userId ? userId.substring(0, 12) : 'N/A';
        logger.socketEvent('disconnect', socketId, session ? session.ip : '?', session ? session.transport : '?',
            `uid=${uidDisplay} alive=${aliveMs}ms reason=${reason}`);

        // Cleanup
        sessions.delete(socketId);
        actionCounters.delete(socketId);
    });

    // ─── Transport upgrade ───
    socket.conn.on('upgrade', (transport) => {
        const session = sessions.get(socketId);
        if (session) {
            session.transport = transport.name;
        }
        logger.log('DEBUG', 'SOCKET', `Transport upgraded → ${transport.name}`);
        logger.detail('data', ['socketId', socketId.substring(0, 8)], ['transport', transport.name]);
    });
});

// ═══════════════════════════════════════════════════════════════
// KICKOUT / DUPLICATE LOGIN HANDLER
// Client membaca Notify action='Kickout' → destroy semua sockets → back to login
// (main.min.js Line 114216-114227)
// ═══════════════════════════════════════════════════════════════

/**
 * Kick user — send Kickout notify dan disconnect socket
 * Digunakan saat duplicate login atau admin kick
 * @param {string} userId
 */
function kickUser(userId) {
    for (const [socketId, session] of sessions.entries()) {
        if (session.userId === userId) {
            const socket = io.sockets.connected[socketId];
            if (socket) {
                // Send Kickout notify sebelum disconnect
                socket.emit('Notify', { action: 'Kickout' });
                logger.log('INFO', 'SOCKET', `Kickout notify sent → ${userId}`);

                // Delay disconnect sedikit agar notify sampai
                setTimeout(() => {
                    socket.disconnect(true);
                }, 100);
            }
        }
    }
}

// ═══════════════════════════════════════════════════════════════
// DAILY RESET SCHEDULER
// Referensi: main-server.md v4.0 Section 12
// ═══════════════════════════════════════════════════════════════

/**
 * Schedule daily reset at resetTime (06:00 UTC+7)
 * Push scheduleModelRefresh notify ke semua online users
 */
function scheduleDailyReset() {
    // Read resetTime from constant.json via jsonLoader
    const constantData = jsonLoader.get('constant');
    const resetTimeStr = (constantData && constantData['1'] && constantData['1'].resetTime) || '6:00:00';
    const [hours, minutes] = resetTimeStr.split(':').map(Number);

    // Calculate next reset time in UTC+7
    const now = new Date();
    const jakartaOffset = 7 * 60;  // UTC+7 in minutes
    const nowUTC7 = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (jakartaOffset * 60000));

    let nextReset = new Date(nowUTC7);
    nextReset.setHours(hours, minutes, 0, 0);

    // If already past reset time today, schedule for tomorrow
    if (nextReset <= nowUTC7) {
        nextReset.setDate(nextReset.getDate() + 1);
    }

    const msUntilReset = nextReset.getTime() - nowUTC7.getTime();

    logger.log('INFO', 'SCHEDULE', `Daily reset scheduled`);
    logger.details('config',
        ['resetTime', resetTimeStr],
        ['nextReset', nextReset.toISOString()],
        ['msUntilReset', String(msUntilReset)]
    );

    setTimeout(() => {
        logger.log('INFO', 'SCHEDULE', 'Daily reset triggered!');

        // Get all online users
        const onlineUsers = db.getOnlineUserIds();

        // Build reset scheduleInfo — read from constant.json
        const c1 = (jsonLoader.get('constant') || {})['1'] || {};
        const resetModel = {
            _arenaAttackTimes: Number(c1.arenaAttackTimes || 5),
            _arenaBuyTimesCount: 0,
            _strongEnemyTimes: Number(c1.bossAttackTimes || 6),
            _strongEnemyBuyCount: 0,
            _karinTowerBattleTimes: Number(c1.karinTowerBattleTimes || 10),
            _karinTowerBuyTimesCount: 0,
            _cellGameTimes: Number(c1.cellGameTimes || 1),
            _cellGameBuyTimesCount: 0,
            _templeTestTimes: Number(c1.templeTestTimes || 10),
            _templeTestBuyTimesCount: 0,
            _expDungeonTimes: Number(c1.expDungeonTimes || 2),
            _expDungeonBuyTimes: 0,
            _evolveDungeonTimes: Number(c1.evolveDungeonTimes || 2),
            _evolveDungeonBuyTimes: 0,
            _energyDungeonTimes: Number(c1.energyDungeonTimes || 2),
            _energyDungeonBuyTimes: 0,
            _metalDungeonTimes: Number(c1.metalDungeonTimes || 2),
            _metalDungeonBuyTimes: 0,
            _zStoneDungeonTimes: Number(c1.zStoneDungeonTimes || 2),
            _zStoneDungeonBuyTimes: 0,
            _equipDungeonTimes: Number(c1.equipDungeonTimes || 2),
            _equipDungeonBuyTimes: 0,
            _signDungeonTimes: Number(c1.signDungeonTimes || 2),
            _signDungeonBuyTimes: 0,
            _bossFightTimes: Number(c1.bossFightTimesMax || 3),
            _bossFightBuyTimes: 0,
            _mahaAdventureTimes: Number(c1.mahaAdventureTimesMax || 5),
            _mahaAdventureBuyTimes: 0,
            _trainingTimes: Number(c1.trainingTimesMax || 10),
            _trainingBuyTimes: 0,
            _guildBOSSTimes: Number(c1.guildBOSSTimes || 2),
            _guildBOSSBuyTimes: 0,
            _guildGrabTimes: Number(c1.guildGrabTimes || 3),
            _mineActionPoint: Number(c1.mineActionPointMax || 50),
            _dragonBallWarTimes: Number(c1.dragonBallWarTimesMax || 3),
            _dragonBallWarBuyTimes: 0,
            _expeditionTimes: Number(c1.expeditionBattleTimes || 10),
            _snakeDungeonTimes: Number(c1.snakeTimes || 1),
            _topBattleTimes: 0,
            _topBattleBuyTimes: 0,
            _gravityTestTimes: Number(c1.gravityTestRewardpreview || 50),
            _timeTrainTimes: 0,
            _timeTrainBuyTimes: 0,
            _marketRefreshTimes: Number(c1.marketRefreshTimeMax || 5),
            _vipMarketRefreshTimes: Number(c1.vipMarketRefreshTimeMax || 5),
            _rewardHelpTimes: Number(c1.rewardHelpRewardEveryday || 10),
            _goldBuyTimes: Number(c1.goldBuyFree || 20)
        };

        // Push notify ke semua online sockets
        for (const [socketId, session] of sessions.entries()) {
            if (session.verified && session.userId) {
                const socket = io.sockets.connected[socketId];
                if (socket) {
                    socket.emit('Notify', {
                        action: 'scheduleModelRefresh',
                        _model: resetModel
                    });
                }
            }
        }

        // Schedule next reset
        scheduleDailyReset();
    }, msUntilReset);
}

// Start daily reset scheduler
scheduleDailyReset();

// ═══════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════

module.exports = {
    io,
    sessions,
    registerHandler,
    ACTION_HANDLERS,
    kickUser
};

// ═══════════════════════════════════════════════════════════════
// SERVER STARTUP
// ═══════════════════════════════════════════════════════════════

logger.boundary('🚀', 'SUPER WARRIOR Z — MAIN SERVER');
logger.details('location',
    ['Port', config.port],
    ['Socket.IO', '2.5.1'],
    ['TEA', config.teaEnabled ? 'ON' : 'OFF'],
    ['TEA Key', config.teaKey],
    ['DB', path.join(__dirname, 'data', 'main_server.db')],
    ['JSON Files', String(jsonStatus.loadedFiles) + '/' + String(jsonStatus.totalFiles)],
    ['JSON Size', (jsonStatus.totalBytes / 1024 / 1024).toFixed(2) + ' MB'],
    ['server0Time', String(config.server0Time)]
);
logger.boundaryEnd('🚀');

console.log('');
logger.log('INFO', 'HANDLER', 'Actions registered');
const handlerKeys = Object.keys(ACTION_HANDLERS);
handlerKeys.forEach((key, i) => {
    const connector = i < handlerKeys.length - 1 ? '├' : '└';
    console.log(`  ${connector} ⚙️ ${chalk.cyan('handler.process')} → ${chalk.white(key)}`);
});

console.log('');
logger.log('INFO', 'SERVER', `Ready — listening on http://127.0.0.1:${config.port}`);
logger.log('INFO', 'SERVER', 'Waiting for Socket.IO connections...');
logger.log('INFO', 'SERVER', 'TEA handshake REQUIRED before any action');
