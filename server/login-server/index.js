/**
 * login-server/index.js — Entry Point
 *
 * Super Warrior Z Login Server
 * Port: 8000 | Socket.IO 2.5.1 | TANPA TEA
 *
 * Protocol:
 *   socket.emit('handler.process', {type, action, ...params, version:"1.0"}, callback)
 *
 * Response (client line 113900):
 *   if (ret === 0) → decompress data → JSON.parse → callback(parsed)
 *   else → show error
 *
 * Response format:
 *   {ret: 0, data: "<LZString compressToUTF16>", compress: true, serverTime, server0Time}
 *   {ret: errorCode, data: "", compress: false, serverTime, server0Time}
 */

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

var http = require('http');
var path = require('path');
var LZString = require('lz-string');
var crypto = require('crypto');
var mysql = require('mysql2/promise');
var createDB = require(path.join(__dirname, '..', 'database', 'db'));

var PORT = process.env.PORT || 8000;

// === MariaDB Connection Config ===
var dbConfig = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'super_warrior_z',
    waitForConnections: true,
    connectionLimit: 50,
    queueLimit: 0,
    charset: 'utf8mb4'
};

// === Response Builders ===
function buildResponse(data) {
    return {
        ret: 0,
        data: LZString.compressToUTF16(JSON.stringify(data)),
        compress: true,
        serverTime: Date.now(),
        server0Time: Date.now()
    };
}

function buildErrorResponse(errorCode) {
    return {
        ret: errorCode || 1,
        data: '',
        compress: false,
        serverTime: Date.now(),
        server0Time: Date.now()
    };
}

// === Handler Action → File Mapping ===
// Key = action name dari client (exactly as sent)
// Value = path ke handler file
var actionMap = {
    'loginGame':        path.join(__dirname, 'handlers', 'loginGame'),
    'GetServerList':    path.join(__dirname, 'handlers', 'getServerList'),
    'SaveHistory':      path.join(__dirname, 'handlers', 'saveHistory'),
    'SaveUserEnterInfo': path.join(__dirname, 'handlers', 'saveUserEnterInfo'),
    'SaveLanguage':     path.join(__dirname, 'handlers', 'saveLanguage'),
    'LoginAnnounce':    path.join(__dirname, 'handlers', 'loginAnnounce')
};

var handlers = {};

function loadHandler(action) {
    if (handlers[action]) return handlers[action];
    var modPath = actionMap[action];
    if (!modPath) return null;
    handlers[action] = require(modPath);
    return handlers[action];
}

// === Socket.IO Server ===
var server = http.createServer();
var io = require('socket.io')(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
    transports: ['websocket', 'polling']
});

// === Database Pool ===
var db = createDB(mysql, dbConfig);

// === Connection Handler ===
io.on('connection', function (socket) {
    console.log('[LOGIN] Connected: ' + socket.id);

    socket.on('handler.process', function (data, callback) {
        if (!callback || typeof callback !== 'function') return;

        var action = data.action;

        if (!action || !actionMap[action]) {
            console.warn('[LOGIN] Unknown action: ' + action);
            return callback(buildErrorResponse(1));
        }

        var handler = loadHandler(action);
        if (!handler) {
            console.error('[LOGIN] Failed to load handler: ' + action);
            return callback(buildErrorResponse(1));
        }

        var ctx = {
            db: db,
            buildResponse: buildResponse,
            buildErrorResponse: buildErrorResponse,
            crypto: crypto
        };

        handler.execute(data, socket, ctx)
            .then(function (result) {
                callback(result);
            })
            .catch(function (err) {
                console.error('[LOGIN] Handler error [' + action + ']:', err.message);
                callback(buildErrorResponse(err.code || 1));
            });
    });

    socket.on('disconnect', function () {
        console.log('[LOGIN] Disconnected: ' + socket.id);
    });
});

// === Start ===
db.initDatabase().then(function () {
    server.listen(PORT, function () {
        console.log('========================================');
        console.log('  Super Warrior Z — Login Server');
        console.log('  Port: ' + PORT);
        console.log('  Socket.IO: 2.5.1 | TEA: OFF');
        console.log('  DB: ' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.database);
        console.log('========================================');
    });
}).catch(function () {
    server.listen(PORT, function () {
        console.log('[LOGIN] Started on port ' + PORT + ' (DB not ready)');
    });
});
