/**
 * index.js — Main-Server Entry Point
 *
 * Socket.IO 2.5.1 + TEA Verification + Handler Router
 * Port: 8001
 *
 * Flow:
 *   1. Load JSON resources (471 file → memory)
 *   2. Init database (scan handlers → auto CREATE TABLE → auto CRUD)
 *   3. Start Socket.IO server
 *   4. Client connect → TEA verify → handler.process
 */

const http = require('http');
const io = require('socket.io');
const config = require('./config');
const logger = require('./logger');
const tea = require('./tea');
const jsonLoader = require('./jsonLoader');
const responseBuilder = require('./responseBuilder');
const db = require('./db');

const { buildResponse, buildError, buildSuccess, buildNotify } = responseBuilder;

// ╔══════════════════════════════════════════════════════════════╗
// ║  STARTUP SEQUENCE                                           ║
// ╚══════════════════════════════════════════════════════════════╝

logger.block('MAIN-SERVER FASE 1', [
    'Super Warrior Z — Main-Server',
    'Port: 8001 | TEA: ON | DB: WAL',
    'Handler-Driven Database',
    'Starting...'
]);

// 1. Load JSON resources
logger.log('INFO', 'JSON', 'Loading resource files...');
jsonLoader.load(config.jsonPath);

// 2. Database sudah init via db.js require (auto scan handlers)
logger.log('INFO', 'DB', 'Database ready');

// ╔══════════════════════════════════════════════════════════════╗
// ║  HANDLER REGISTRY                                           ║
// ╚══════════════════════════════════════════════════════════════╝

const HANDLER_REGISTRY = {};  // type → { action → handlerModule }

function registerHandlers() {
    const handlersDir = require('path').join(__dirname, 'handlers');
    if (!require('fs').existsSync(handlersDir)) {
        logger.log('WARNING', 'HANDLER', 'No handlers directory');
        return;
    }

    function scanDir(dir, typePrefix) {
        const fs = require('fs');
        const path = require('path');
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                // Folder name = handler type (misal: handlers/user/ → type: 'user')
                const typeName = entry.name;
                scanDir(fullPath, typeName);
            } else if (entry.name.endsWith('.js')) {
                // File name = action name (misal: enterGame.js → action: 'enterGame')
                const actionName = entry.name.replace('.js', '');

                try {
                    delete require.cache[require.resolve(fullPath)];
                    const handler = require(fullPath);

                    if (!typePrefix) continue;  // Skip files directly in handlers/ (no type folder)

                    if (!HANDLER_REGISTRY[typePrefix]) {
                        HANDLER_REGISTRY[typePrefix] = {};
                    }
                    HANDLER_REGISTRY[typePrefix][actionName] = handler;

                } catch (e) {
                    logger.log('ERROR', 'HANDLER', `Failed to load ${typePrefix}/${actionName}: ${e.message}`);
                }
            }
        }
    }

    scanDir(handlersDir, '');

    const typeCount = Object.keys(HANDLER_REGISTRY).length;
    let actionCount = 0;
    for (const type of Object.keys(HANDLER_REGISTRY)) {
        actionCount += Object.keys(HANDLER_REGISTRY[type]).length;
    }

    logger.details('HANDLER',
        ['types', typeCount],
        ['actions', actionCount],
        ['registry', Object.entries(HANDLER_REGISTRY).map(([t, a]) => `${t}(${Object.keys(a).length})`).join(', ')]
    );
}

registerHandlers();

// ╔══════════════════════════════════════════════════════════════╗
// ║  SOCKET STATE MANAGEMENT                                    ║
// ╚══════════════════════════════════════════════════════════════╝

// socketId → { verified, userId, nonce, loginTime }
const socketStates = new Map();

// userId → socketId (untuk kick duplikat login)
const userSockets = new Map();

// ╔══════════════════════════════════════════════════════════════╗
// ║  SOCKET.IO SERVER                                            ║
// ╚══════════════════════════════════════════════════════════════╝

const server = http.createServer();
const socketIO = io(server, {
    pingInterval: 10000,
    pingTimeout: 5000
});

// Set socketIO reference for handlers that need it (e.g., enterGame Kickout)
const enterGameHandler = HANDLER_REGISTRY['user'] && HANDLER_REGISTRY['user']['enterGame'];
if (enterGameHandler && enterGameHandler.setSocketIO) {
    enterGameHandler.setSocketIO(socketIO);
}

socketIO.on('connection', (socket) => {
    const connectTime = Date.now();
    logger.log('INFO', 'SOCKET', `Client connected: ${socket.id}`);

    // ─── TEA VERIFICATION HANDSHAKE ───
    const nonce = tea.generateNonce();
    socketStates.set(socket.id, {
        verified: false,
        userId: null,
        nonce: nonce,
        loginTime: connectTime
    });

    // Emit verify challenge ke client
    socket.emit('verify', nonce);
    logger.log('INFO', 'TEA', `Challenge sent to ${socket.id}`);

    // Listen for verify response
    socket.on('verify', (encrypted, callback) => {
        if (typeof callback !== 'function') return;

        const state = socketStates.get(socket.id);
        if (!state) {
            callback({ ret: 55 });
            return;
        }

        // Decrypt dan cocokkan nonce
        const verified = tea.verify(state.nonce, encrypted, config.teaKey);

        if (verified) {
            state.verified = true;
            logger.log('SUCCESS', 'TEA', `Client verified: ${socket.id}`);
            callback({ ret: 0 });
        } else {
            logger.log('ERROR', 'TEA', `Verification failed: ${socket.id}`);
            callback({ ret: 55 });
            socket.disconnect();
        }
    });

    // ─── HANDLER.PROCESS — ROUTER UTAMA ───
    socket.on('handler.process', async (request, callback) => {
        if (typeof callback !== 'function') return;

        // 1. Cek verified
        const state = socketStates.get(socket.id);
        if (!state || !state.verified) {
            return callback(buildError(37));  // ERROR_NO_LOGIN_CLIENT
        }

        // 2. Log request
        const { type, action } = request;
        logger.log('INFO', 'HANDLER', `${type}.${action} ← ${state.userId || 'unknown'}`);

        // 3. Route ke handler
        const typeHandlers = HANDLER_REGISTRY[type];
        if (!typeHandlers) {
            logger.log('WARNING', 'HANDLER', `Unknown type: ${type}`);
            return callback(buildError(4));  // ERROR_INVALID
        }

        const handlerModule = typeHandlers[action];
        if (!handlerModule || !handlerModule.execute) {
            logger.log('WARNING', 'HANDLER', `Unknown action: ${type}.${action}`);
            return callback(buildError(4));  // ERROR_INVALID
        }

        // 4. Execute handler
        try {
            const response = await handlerModule.execute(request, socket, { db, jsonLoader, responseBuilder, config, socketStates, userSockets });
            callback(response);
        } catch (err) {
            logger.log('ERROR', 'HANDLER', `${type}.${action} error: ${err.message}`);
            callback(buildError(1));  // ERROR_UNKNOWN
        }
    });

    // ─── NOTIFY — SERVER PUSH KE CLIENT ───
    // Helper function untuk push notify
    socket.notifyPush = function(action, data) {
        socket.emit('Notify', buildNotify(action, data));
    };

    // ─── DISCONNECT ───
    socket.on('disconnect', (reason) => {
        const state = socketStates.get(socket.id);
        if (state && state.userId) {
            // Remove from userSockets mapping
            if (userSockets.get(state.userId) === socket.id) {
                userSockets.delete(state.userId);
            }
            logger.log('INFO', 'SOCKET', `User ${state.userId} disconnected (${reason})`);
        }
        socketStates.delete(socket.id);
    });
});

// ╔══════════════════════════════════════════════════════════════╗
// ║  START SERVER                                                ║
// ╚══════════════════════════════════════════════════════════════╝

server.listen(config.port, () => {
    logger.block('MAIN-SERVER READY', [
        `Port: ${config.port}`,
        `TEA Verify: ${config.verifyEnable ? 'ON' : 'OFF'}`,
        `JSON Files: ${jsonLoader.list().length} loaded`,
        `Handlers: ${Object.keys(HANDLER_REGISTRY).length} types`,
        `Database: WAL mode`,
        'Waiting for connections...'
    ]);
});
