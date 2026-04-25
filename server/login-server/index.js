/**
 * Login Server - Super Warrior Z (超级战士Z)
 *
 * Protocol : Socket.IO ~2.3.x  (engine.io protocol 3, parser protocol 4)
 * Port     : 8000
 * HTDOCS   : serve static files from parent directory (game client)
 *
 * Client flow (Origin/Manual login):
 *   1. HTTP GET  resource/properties/serversetting.json  → login server URL
 *   2. Socket.IO connect  → verifyEnable = false (no TEA)
 *   3. handler.process  → loginGame
 *   4. handler.process  → GetServerList  (parallel with getNotice)
 *   5. handler.process  → getNotice
 *   6. User selects server
 *   7. handler.process  → SaveHistory  → get loginToken
 *   8. Client connects to main-server with loginToken
 *   9. (After main-server enterGame success)
 *  10. handler.process  → SaveUserEnterInfo  → then login socket destroyed
 */

var http = require('http');
var fs   = require('fs');
var path = require('path');
var io   = require('socket.io');
var handlers = require('./handlers');

var PORT   = 8000;
var HTDOCS = path.resolve(__dirname, '../..');

// ── MIME Types ─────────────────────────────────────────────────────────────
var MIME = {
    '.html': 'text/html; charset=utf-8',
    '.htm' : 'text/html; charset=utf-8',
    '.js'  : 'application/javascript',
    '.json': 'application/json',
    '.css' : 'text/css; charset=utf-8',
    '.png' : 'image/png',
    '.jpg' : 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif' : 'image/gif',
    '.webp': 'image/webp',
    '.svg' : 'image/svg+xml',
    '.ico' : 'image/x-icon',
    '.wasm': 'application/wasm',
    '.mp3' : 'audio/mpeg',
    '.wav' : 'audio/wav',
    '.ogg' : 'audio/ogg',
    '.mp4' : 'video/mp4',
    '.webm': 'video/webm',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf' : 'font/ttf',
    '.eot' : 'application/vnd.ms-fontobject',
    '.txt' : 'text/plain; charset=utf-8',
    '.xml' : 'application/xml',
    '.zip' : 'application/zip',
    '.bin' : 'application/octet-stream',
    '.db'  : 'application/octet-stream'
};

// ── HTTP Server (static file serving) ──────────────────────────────────────
var server = http.createServer(function (req, res) {
    // Decode URL, strip query string
    var urlPath = decodeURIComponent(req.url);
    var qi = urlPath.indexOf('?');
    if (qi !== -1) urlPath = urlPath.substring(0, qi);

    // Resolve file path — security: prevent directory traversal
    var filePath = path.join(HTDOCS, urlPath);
    if (filePath.indexOf(HTDOCS) !== 0) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    // If directory, try index.html
    try {
        var st = fs.statSync(filePath);
        if (st.isDirectory()) filePath = path.join(filePath, 'index.html');
    } catch (e) {
        // file not found handled below
    }

    fs.readFile(filePath, function (err, data) {
        if (err) {
            res.writeHead(err.code === 'ENOENT' ? 404 : 500);
            res.end();
            return;
        }
        var ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, {
            'Content-Type': MIME[ext] || 'application/octet-stream',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Credentials': 'true'
        });
        res.end(data);
    });
});

// ── Socket.IO v2.x ─────────────────────────────────────────────────────────
// API: socket.io v2.x uses module.exports = io function (NOT new Server)
// Config:
//   - origins: '*:*'           — client uses withCredentials=true (line 39657)
//   - serveClient: false       — game client bundles socket.io-client internally
//   - path: '/socket.io'       — default (line 38830)
var socketIO = io(server, {
    origins: '*:*',
    serveClient: false
});

socketIO.on('connection', function (socket) {
    var ip = _getClientIp(socket);
    console.log('[CONNECT] ' + socket.id + ' | transport: ' + socket.conn.transport.name + ' | ip: ' + ip);

    // ── handler.process — ALL game client messages come through this event ──
    // Evidence: line 82528 — this.socket.emit('handler.process', e, t);
    // Evidence: line 82527-82528 — sendToServer(msg, callback)
    socket.on('handler.process', function (msg, callback) {
        handlers.process(socket, msg, callback);
    });

    // ── disconnect ─────────────────────────────────────────────────────────
    socket.on('disconnect', function (reason) {
        console.log('[DISCONNECT] ' + socket.id + ' | reason: ' + reason);
        handlers.onDisconnect(socket);
    });
});

// ── Start ──────────────────────────────────────────────────────────────────
server.listen(PORT, '0.0.0.0', function () {
    console.log('==========================================');
    console.log('  Super Warrior Z - Login Server');
    console.log('  Port  : ' + PORT);
    console.log('  URL   : http://0.0.0.0:' + PORT);
    console.log('  HTDOCS: ' + HTDOCS);
    console.log('==========================================');
    console.log('');
    console.log('Actions:');
    console.log('  loginGame          — Login / Register');
    console.log('  GetServerList      — Server list + history');
    console.log('  SaveHistory        — Save history, get loginToken');
    console.log('  SaveLanguage       — Save language preference');
    console.log('  SaveUserEnterInfo  — Log entry info');
    console.log('  getNotice          — Bulletin board');
    console.log('');
});

// ── Helpers ────────────────────────────────────────────────────────────────
function _getClientIp(socket) {
    var h = socket.handshake && socket.handshake.headers;
    if (h) {
        var xff = h['x-forwarded-for'] || h['X-Forwarded-For'];
        if (xff) return xff.split(',')[0].trim();
    }
    return socket.handshake ? socket.handshake.address : 'unknown';
}
