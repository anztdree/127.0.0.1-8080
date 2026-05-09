/**
 * index.js — MAIN-SERVER Main Entry Point
 * Deep-traced from main.min.js
 *
 * Port: 8001
 * Transport: Socket.IO 2.5.1
 * TEA: ON (verifyEnable = true)
 * Database: Pure LocalStorage API (db.js)
 * Protocol: handler.process (single event for all actions)
 *
 * Handlers: user/enterGame, user/registChat, user/getBulletinBrief,
 *           friend/friendServerAction, heroImage/getAll
 */

const path = require('path');
const chalk = require('chalk');
const LZString = require('lz-string');
const logger = require('./logger');
const config = require('./config');
const db = require('./db');
const tea = require('./tea');
const enterGame = require('./handlers/user/enterGame');
const registChat = require('./handlers/user/registChat');
const getBulletinBrief = require('./handlers/user/getBulletinBrief');
const friendServerAction = require('./handlers/friend/friendServerAction');
const heroImageGetAll = require('./handlers/heroImage/getAll');

// ─── Socket.IO 2.5.1 Setup ───
const io = require('socket.io')(config.port, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    },
    transports: ['websocket', 'polling']
});

// ─── Session Tracking ───
const sessions = new Map();
const actionCounters = new Map();

// ─── Initialize serverOpenDate ───
if (!config.serverOpenDate) {
    config.serverOpenDate = Date.now();
    logger.log('INFO', 'CONFIG', `serverOpenDate initialized: ${config.serverOpenDate}`);
}

// ─── Resource JSON Loader ───
const resourceCache = {};

function loadResource(name) {
    if (resourceCache[name]) return resourceCache[name];
    try {
        const filePath = path.join(config.resourcePath, name + '.json');
        const data = JSON.parse(require('fs').readFileSync(filePath, 'utf-8'));
        resourceCache[name] = data;
        logger.log('INFO', 'CONFIG', `Resource loaded: ${name}.json (${Object.keys(data).length} entries)`);
        return data;
    } catch (err) {
        logger.log('WARN', 'CONFIG', `Resource not found: ${name}.json — ${err.message}`);
        logger.log('DEBUG', 'CONFIG', `  → resourcePath=${config.resourcePath}`);
        return null;
    }
}

// Pre-load critical resources
const constantJson = loadResource('constant');
const heroJson = loadResource('hero');
const summonJson = loadResource('summon');

// Warn if critical resources are missing
if (!constantJson) {
    logger.log('ERROR', 'CONFIG', 'constant.json is MISSING — default values will be used for new users');
    logger.log('ERROR', 'CONFIG', '  → Resource path searched: ' + config.resourcePath);
}
if (!heroJson) {
    logger.log('ERROR', 'CONFIG', 'hero.json is MISSING — starter hero will use minimal defaults');
}
if (!summonJson) {
    logger.log('ERROR', 'CONFIG', 'summon.json is MISSING — summon defaults will be used');
}

// ─── UUID Generator ───
const { v4: uuidv4 } = require('uuid');

// ═══════════════════════════════════════════════════════════════
// RESPONSE BUILDER
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
    const jsonStr = JSON.stringify(dataObj);
    if (jsonStr.length > config.compressionThreshold) {
        const compressed = LZString.compressToUTF16(jsonStr);
        logger.log('DEBUG', 'COMPRESS', `Compressed: ${jsonStr.length} → ${compressed.length} chars (${Math.round((1 - compressed.length / jsonStr.length) * 100)}% reduction)`);
        return buildResponse(ret, compressed, true);
    }
    return buildResponse(ret, jsonStr, false);
}

// ═══════════════════════════════════════════════════════════════
// SDK-SERVER API HELPERS
// ═══════════════════════════════════════════════════════════════

const http = require('http');

function verifyUserWithSDKServer(userId) {
    return new Promise((resolve) => {
        const startTime = Date.now();
        const options = {
            hostname: '127.0.0.1',
            port: 9999,
            path: `/user/info/${userId}`,
            method: 'GET',
            timeout: 5000
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                const duration = Date.now() - startTime;
                if (res.statusCode === 200) {
                    try {
                        const data = JSON.parse(body);
                        logger.log('INFO', 'SDKAPI', `SDK-Server user verified`);
                        logger.details('verify',
                            ['userId', userId],
                            ['httpStatus', String(res.statusCode)],
                            ['duration', duration + 'ms']
                        );
                        resolve(data);
                    } catch (err) {
                        logger.log('WARN', 'SDKAPI', `SDK-Server response parse failed: ${err.message}`);
                        resolve(null);
                    }
                } else {
                    logger.log('WARN', 'SDKAPI', `SDK-Server user not found: HTTP ${res.statusCode}`);
                    logger.details('verify',
                        ['userId', userId],
                        ['httpStatus', String(res.statusCode)],
                        ['duration', duration + 'ms']
                    );
                    resolve(null);
                }
            });
        });

        req.on('error', (err) => {
            logger.log('ERROR', 'SDKAPI', `SDK-Server verify failed: ${err.message}`);
            resolve(null);
        });

        req.on('timeout', () => { req.destroy(); });
        req.end();
    });
}

// ═══════════════════════════════════════════════════════════════
// LOGIN-TOKEN VALIDATION
// ═══════════════════════════════════════════════════════════════

async function validateLoginToken(loginToken, userId) {
    if (!loginToken || !userId) return false;
    const userInfo = await verifyUserWithSDKServer(userId);
    if (!userInfo) return false;
    if (userInfo.loginToken !== loginToken) {
        logger.log('WARN', 'VALIDATE', `loginToken mismatch for userId=${userId}`);
        return false;
    }
    return true;
}

// ═══════════════════════════════════════════════════════════════
// ACTION ROUTER — Multi-type support
// ═══════════════════════════════════════════════════════════════

// Handler registry: { type: { action: handlerFn } }
const ACTION_HANDLERS = {
    user: {
        enterGame: enterGame,
        registChat: registChat,
        getBulletinBrief: getBulletinBrief
    },
    friend: {
        friendServerAction: friendServerAction
    },
    heroImage: {
        getAll: heroImageGetAll
    }
};

// ═══════════════════════════════════════════════════════════════
// SOCKET.IO CONNECTION HANDLER
// ═══════════════════════════════════════════════════════════════

io.on('connection', (socket) => {
    const socketId = socket.id;
    const clientIp = socket.handshake.address || 'unknown';
    const transport = socket.conn.transport.name || socket.handshake.query.transport || 'polling';

    // Initialize session
    sessions.set(socketId, {
        userId: null,
        verified: false,
        challenge: null,
        connectedAt: Date.now(),
        ip: clientIp,
        transport: transport
    });
    actionCounters.set(socketId, 0);

    logger.log('INFO', 'SOCKET', `Client connected`);
    logger.socketEvent('connect', socketId, clientIp, transport);

    // ─── TEA HANDSHAKE ───
    const challenge = uuidv4();
    const session = sessions.get(socketId);
    session.challenge = challenge;

    logger.log('INFO', 'TEA', `Sending verify challenge`);
    logger.details('challenge',
        ['sid', socketId.substring(0, 8)],
        ['challenge', challenge.substring(0, 16) + '...']
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
            logger.log('INFO', 'TEA', `TEA verification SUCCESS`);
            logger.details('verify',
                ['sid', socketId.substring(0, 8)],
                ['duration', duration + 'ms'],
                ['transport', socket.conn.transport.name]
            );
            callback({ ret: 0 });
        } else {
            logger.log('WARN', 'TEA', `TEA verification FAILED — challenge mismatch`);
            logger.details('verify',
                ['expected', currentSession.challenge.substring(0, 16) + '...'],
                ['got', decrypted.substring(0, 16) + '...'],
                ['duration', duration + 'ms']
            );
            callback({ ret: 38 });
            socket.disconnect();
        }
    });

    // ─── handler.process ───
    socket.on('handler.process', async (request, callback) => {
        const actionCounter = (actionCounters.get(socketId) || 0) + 1;
        actionCounters.set(socketId, actionCounter);

        const action = request.action || 'UNKNOWN';
        const actionType = request.type || '';

        logger.log('INFO', 'HANDLER', `[${actionCounter}] handler.process → ${actionType}::${action}`);
        logger.details('request',
            ['action', action],
            ['type', actionType],
            ['uid', (request.userId || '?').substring(0, 12)]
        );

        // Validate: socket must be TEA-verified
        const currentSession = sessions.get(socketId);
        if (!currentSession || !currentSession.verified) {
            logger.log('WARN', 'HANDLER', `Socket not TEA-verified → ret=38`);
            if (typeof callback === 'function') {
                callback(buildErrorResponse(38));
            }
            return;
        }

        // Find handler by type + action
        const typeHandlers = ACTION_HANDLERS[actionType];
        if (!typeHandlers) {
            logger.log('WARN', 'HANDLER', `Unknown type: "${actionType}" — no handlers registered`);
            if (typeof callback === 'function') {
                callback(buildErrorResponse(4));
            }
            return;
        }

        const handler = typeHandlers[action];
        if (!handler) {
            logger.log('WARN', 'HANDLER', `Unknown action: "${actionType}::${action}" — no handler registered`);
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
                db,
                config,
                logger,
                socket,
                session: currentSession,
                validateLoginToken,
                verifyUserWithSDKServer,
                uuidv4,
                loadResource,
                constantJson,
                heroJson,
                summonJson,
                buildDataResponse,
                buildErrorResponse
            };

            const response = await handler(request, ctx);

            // Log response
            const statusStr = response.ret === 0 ? '✅' : `❌ ERR=${response.ret}`;
            logger.actionLog('res', `${actionType}::${action}`, response.ret === 0 ? 'OK' : 'ERR',
                null, `ret=${response.ret} ${statusStr}`);

            if (typeof callback === 'function') {
                callback(response);
            }
        } catch (err) {
            logger.errorWithStack('HANDLER', `Action "${actionType}::${action}" threw error`, err);
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

        logger.log('INFO', 'SOCKET', `Client disconnected`);
        logger.socketEvent('disconnect', socketId, s ? s.ip : '?', s ? s.transport : '?',
            `uid=${userId.substring(0, 12)} alive=${aliveMs}ms actions=${actionCount} verified=${verified} reason=${reason}`);

        sessions.delete(socketId);
        actionCounters.delete(socketId);
    });

    // ─── Transport upgrade ───
    socket.conn.on('upgrade', (transport) => {
        const s = sessions.get(socketId);
        if (s) {
            s.transport = transport.name;
        }
        logger.log('DEBUG', 'SOCKET', `Transport upgraded → ${transport.name}`);
        logger.details('upgrade',
            ['sid', socketId.substring(0, 8)],
            ['transport', transport.name]
        );
    });
});

// ═══════════════════════════════════════════════════════════════
// SERVER STARTUP
// ═══════════════════════════════════════════════════════════════

logger.boundary('🚀', 'SUPER WARRIOR Z — MAIN SERVER');
logger.details('server',
    ['Port', String(config.port)],
    ['Socket.IO', '2.5.1'],
    ['TEA', 'ON (key=verification)'],
    ['DB', path.join(__dirname, 'data', 'main_server.json')],
    ['SDK API', config.sdkServerUrl],
    ['server0Time', String(config.server0Time)],
    ['serverOpenDate', String(config.serverOpenDate)],
    ['resourcePath', config.resourcePath],
    ['chatUrl', config.chatUrl],
    ['dungeonUrl', config.dungeonUrl]
);
logger.boundaryEnd('🚀');

console.log('');
logger.log('INFO', 'HANDLER', 'Actions registered');
let totalHandlers = 0;
for (const [type, actions] of Object.entries(ACTION_HANDLERS)) {
    const actionList = Object.keys(actions);
    for (let i = 0; i < actionList.length; i++) {
        totalHandlers++;
        const connector = '├';
        console.log(`  ${connector} ⚙️ ${chalk.cyan('handler.process')} → ${chalk.white(type + '::' + actionList[i])}`);
    }
}
logger.details('handlers', ['total', String(totalHandlers)]);

console.log('');
logger.log('INFO', 'SERVER', `Ready — listening on http://127.0.0.1:${config.port}`);
logger.log('INFO', 'SERVER', `Waiting for Socket.IO connections...`);
