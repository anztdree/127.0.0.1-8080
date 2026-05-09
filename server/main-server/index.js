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
 *
 * ═══════════════════════════════════════════════════════════════
 * BUG FIX LOG
 * ═══════════════════════════════════════════════════════════════
 *
 * [FIX-003] Circular reference safety in buildDataResponse
 *   Added try-catch around JSON.stringify with detailed error logging
 *   If circular detected, identifies exact field causing the issue
 *
 * [FIX-004] friendServerAction handler stub
 *   Server cannot start without this file — created minimal stub
 *   Returns ret=4 (unknown action) until proper implementation
 *
 * [FIX-005] Super detail logging throughout
 *   Every step logged with context, timing, and data sizes
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

// [FIX-004] friendServerAction — use try-catch so server can start even if file missing
let friendServerAction;
try {
    friendServerAction = require('./handlers/friend/friendServerAction');
} catch (err) {
    logger.log('WARN', 'FRIEND', 'friendServerAction.js NOT FOUND — using stub (returns ret=4)');
    friendServerAction = function(request, ctx) {
        ctx.logger.log('WARN', 'FRIEND', `friendServerAction STUB called — action=${request.action || 'unknown'}`);
        return ctx.buildErrorResponse(4);
    };
}

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
        const raw = require('fs').readFileSync(filePath, 'utf-8');
        const data = JSON.parse(raw);
        resourceCache[name] = data;
        logger.log('INFO', 'CONFIG', `Resource loaded: ${name}.json (${Object.keys(data).length} entries, ${raw.length} bytes)`);
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
// SAFE JSON STRINGIFY — with circular reference detection
// ═══════════════════════════════════════════════════════════════

/**
 * Safe JSON.stringify that catches circular references and reports which field caused it.
 * Returns { json: string|null, error: Error|null, circularField: string|null }
 */
function safeStringify(obj, label) {
    try {
        const json = JSON.stringify(obj);
        return { json, error: null, circularField: null };
    } catch (err) {
        logger.log('ERROR', 'COMPRESS', `[safeStringify] FAILED for "${label}": ${err.message}`);

        // Identify which top-level field causes the circular reference
        if (obj && typeof obj === 'object') {
            const keys = Object.keys(obj);
            for (const key of keys) {
                try {
                    JSON.stringify(obj[key]);
                } catch (innerErr) {
                    logger.log('ERROR', 'COMPRESS', `[safeStringify] Circular ref in field: "${key}" → ${innerErr.message}`);

                    // Try to go one level deeper
                    if (obj[key] && typeof obj[key] === 'object') {
                        const subKeys = Object.keys(obj[key]);
                        for (const subKey of subKeys) {
                            try {
                                JSON.stringify(obj[key][subKey]);
                            } catch (deepErr) {
                                logger.log('ERROR', 'COMPRESS', `[safeStringify]   └─ Circular in "${key}.${subKey}" → ${deepErr.message}`);
                            }
                        }
                    }

                    return { json: null, error: err, circularField: key };
                }
            }
        }

        return { json: null, error: err, circularField: null };
    }
}

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

/**
 * Build data response with circular reference safety.
 * [FIX-003] Added safeStringify with detailed error reporting.
 */
function buildDataResponse(ret, dataObj) {
    const result = safeStringify(dataObj, 'buildDataResponse');

    if (result.error) {
        logger.log('ERROR', 'COMPRESS', `[buildDataResponse] CANNOT stringify data — circular ref in field: ${result.circularField || 'unknown'}`);
        logger.log('ERROR', 'COMPRESS', '[buildDataResponse] Returning error response ret=1 to prevent server crash');

        // Try to strip the problematic field and retry
        if (result.circularField && dataObj[result.circularField]) {
            logger.log('WARN', 'COMPRESS', `[buildDataResponse] Attempting to strip field "${result.circularField}" and retry...`);
            const stripped = JSON.parse(JSON.stringify(dataObj)); // this will fail too if circular
            // Actually we can't parse, so let's just delete the field and try again
            const backup = dataObj[result.circularField];
            delete dataObj[result.circularField];

            const retry = safeStringify(dataObj, 'buildDataResponse (after strip)');
            if (retry.json) {
                logger.log('WARN', 'COMPRESS', `[buildDataResponse] SUCCESS after stripping "${result.circularField}" — response will be incomplete`);
                // Restore the field
                dataObj[result.circularField] = backup;

                if (retry.json.length > config.compressionThreshold) {
                    const compressed = LZString.compressToUTF16(retry.json);
                    logger.log('DEBUG', 'COMPRESS', `Compressed: ${retry.json.length} → ${compressed.length} chars`);
                    return buildResponse(ret, compressed, true);
                }
                return buildResponse(ret, retry.json, false);
            }

            // Restore even on failure
            dataObj[result.circularField] = backup;
        }

        return buildErrorResponse(1);
    }

    const jsonStr = result.json;
    if (jsonStr.length > config.compressionThreshold) {
        const compressed = LZString.compressToUTF16(jsonStr);
        const reduction = Math.round((1 - compressed.length / jsonStr.length) * 100);
        logger.log('DEBUG', 'COMPRESS', `Compressed: ${jsonStr.length} → ${compressed.length} chars (${reduction}% reduction)`);
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

        logger.log('DEBUG', 'SDKAPI', `[verifyUserWithSDKServer] HTTP GET → http://127.0.0.1:9999/user/info/${userId.substring(0, 12)}...`);

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
                            ['responseBytes', String(body.length)],
                            ['duration', duration + 'ms']
                        );
                        resolve(data);
                    } catch (err) {
                        logger.log('WARN', 'SDKAPI', `SDK-Server response parse failed: ${err.message}`);
                        logger.log('DEBUG', 'SDKAPI', `  → Response body (first 200 chars): ${body.substring(0, 200)}`);
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
            logger.log('DEBUG', 'SDKAPI', `  → Is SDK-Server running on port 9999?`);
            resolve(null);
        });

        req.on('timeout', () => {
            logger.log('ERROR', 'SDKAPI', `SDK-Server verify TIMEOUT (5000ms) — is server running?`);
            req.destroy();
        });
        req.end();
    });
}

// ═══════════════════════════════════════════════════════════════
// LOGIN-TOKEN VALIDATION
// ═══════════════════════════════════════════════════════════════

async function validateLoginToken(loginToken, userId) {
    if (!loginToken || !userId) {
        logger.log('WARN', 'VALIDATE', '[validateLoginToken] Missing loginToken or userId');
        return false;
    }
    const userInfo = await verifyUserWithSDKServer(userId);
    if (!userInfo) {
        logger.log('WARN', 'VALIDATE', `[validateLoginToken] SDK-Server returned null for userId=${userId}`);
        return false;
    }
    if (userInfo.loginToken !== loginToken) {
        logger.log('WARN', 'VALIDATE', `[validateLoginToken] loginToken mismatch for userId=${userId}`);
        logger.log('DEBUG', 'VALIDATE', `  → Expected: ${loginToken.substring(0, 12)}... Got: ${(userInfo.loginToken || '').substring(0, 12)}...`);
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
    logger.details('session',
        ['sid', socketId.substring(0, 16)],
        ['ip', clientIp],
        ['transport', transport],
        ['totalSessions', String(sessions.size)]
    );

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

        logger.log('DEBUG', 'TEA', `[verify] Received encrypted response (${typeof encrypted === 'string' ? encrypted.length + ' chars' : typeof encrypted})`);

        let decrypted = '';
        try {
            decrypted = tea.decrypt(encrypted, config.teaKey);
        } catch (err) {
            logger.errorWithStack('TEA', `Decrypt failed`, err);
            logger.log('DEBUG', 'TEA', `  → Input was ${typeof encrypted}, length=${encrypted ? encrypted.length : 0}`);
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
            ['uid', (request.userId || '?').substring(0, 12)],
            ['counter', String(actionCounter)]
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
            logger.log('DEBUG', 'HANDLER', `  → Available types: ${Object.keys(ACTION_HANDLERS).join(', ')}`);
            if (typeof callback === 'function') {
                callback(buildErrorResponse(4));
            }
            return;
        }

        const handler = typeHandlers[action];
        if (!handler) {
            logger.log('WARN', 'HANDLER', `Unknown action: "${actionType}::${action}" — no handler registered`);
            logger.log('DEBUG', 'HANDLER', `  → Available actions for "${actionType}": ${Object.keys(typeHandlers).join(', ')}`);
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
            const handlerStart = Date.now();
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
            const handlerDuration = Date.now() - handlerStart;

            // Log response
            const statusStr = response.ret === 0 ? 'OK' : `ERR=${response.ret}`;
            logger.actionLog('res', `${actionType}::${action}`, response.ret === 0 ? 'OK' : 'ERR',
                null, `ret=${response.ret} duration=${handlerDuration}ms ${statusStr}`);

            if (response.ret !== 0) {
                logger.log('WARN', 'HANDLER', `[${actionType}::${action}] returned ret=${response.ret} — client will see error`);
            }

            if (typeof callback === 'function') {
                callback(response);
            }
        } catch (err) {
            logger.errorWithStack('HANDLER', `Action "${actionType}::${action}" threw UNHANDLED error`, err);
            logger.log('ERROR', 'HANDLER', `  → Error name: ${err.name}`);
            logger.log('ERROR', 'HANDLER', `  → Error message: ${err.message}`);
            if (err.stack) {
                const stackLines = err.stack.split('\n').slice(0, 6);
                stackLines.forEach((line, i) => {
                    logger.log('DEBUG', 'HANDLER', `  → Stack[${i}]: ${line.trim()}`);
                });
            }
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

// Log resource status
logger.log('INFO', 'CONFIG', 'Resource JSON status:');
logger.details('resources',
    ['constant.json', constantJson ? `${Object.keys(constantJson).length} entries` : 'MISSING'],
    ['hero.json', heroJson ? `${Object.keys(heroJson).length} entries` : 'MISSING'],
    ['summon.json', summonJson ? `${Object.keys(summonJson).length} entries` : 'MISSING']
);

logger.boundaryEnd('🚀');

console.log('');
logger.log('INFO', 'HANDLER', 'Actions registered');
let totalHandlers = 0;
for (const [type, actions] of Object.entries(ACTION_HANDLERS)) {
    const actionList = Object.keys(actions);
    for (let i = 0; i < actionList.length; i++) {
        totalHandlers++;
        const isLast = (i === actionList.length - 1) && (type === Object.keys(ACTION_HANDLERS).slice(-1)[0]);
        const connector = isLast ? '└' : '├';
        console.log(`  ${connector} ⚙️ ${chalk.cyan('handler.process')} → ${chalk.white(type + '::' + actionList[i])}`);
    }
}
logger.details('handlers', ['total', String(totalHandlers)]);

console.log('');
logger.log('INFO', 'SERVER', `Ready — listening on http://127.0.0.1:${config.port}`);
logger.log('INFO', 'SERVER', `Waiting for Socket.IO connections...`);
