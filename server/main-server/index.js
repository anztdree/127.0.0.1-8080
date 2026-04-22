/**
 * ============================================================================
 * Main Server — Super Warrior Z Game Server v1.1
 * Port 8001 — Socket.IO v2, TEA verification ENABLED
 * ============================================================================
 *
 * CLIENT CONNECTION FLOW (from main.min.js):
 * ─────────────────────────────────────────
 *  1.  After login, client calls ts.clientStartGame()
 *  2.  mainClient.connectToServer(serverUrl, successCb, errorCb)
 *  3.  TSSocketClient: verifyEnable=true → socket connects, waits for "verify"
 *  4.  Server emits  "verify" with random hex challenge string
 *  5.  Client: var o = (new TEA).encrypt(challenge, "verification") → Base64
 *  6.  Client emits  "verify" with Base64 encrypted + ACK callback
 *  7.  Server: TEA.decrypt(response, "verification") → compare → ACK({ret:0})
 *  8.  Client sends  "handler.process" {type:"user", action:"enterGame", ...}
 *  9.  Server responds with full game state (compressed JSON)
 * 10.  Client: UserDataParser.saveUserData() → runScene("OverScene")
 * 11.  Client: registChat → connect chat/dungeon servers
 * 12.  Server: can push "Notify" events anytime after verify
 *
 * TEA VERIFICATION PROTOCOL:
 * ─────────────────────────
 *  Challenge : random 32-char hex string (16 bytes)
 *  Key       : "verification" (literal, from main.min.js)
 *  Algorithm : XXTEA (see core/tea.js — 100% ported from client)
 *  Transport : Base64
 *
 *  Retry logic:
 *    attempt < MAX_ATTEMPTS → ret:4  (INVALID — client may retry)
 *    attempt >= MAX_ATTEMPTS → ret:38 (LOGIN_CHECK_FAILED — disconnect)
 *
 * CORS:
 * ─────
 *  Natural Socket.IO configuration via handlePreflightRequest + origins:'*'
 *  NO monkey-patching of http.ServerResponse.prototype.writeHead
 *
 * HANDLER ROUTING:
 * ────────────────
 *  Dynamic load from handlers/ directory.
 *  File handler   : handlers/arena.js       → exports { handle(socket, req, cb) }
 *  Folder handler : handlers/hero/index.js  → exports { handle(socket, req, cb) }
 *  Key = filename/dirname lowercased = request.type lowercased
 * ============================================================================
 */

'use strict';

var http = require('http');
var fs   = require('fs');
var path = require('path');

// ============================================
// 1. LOAD MODULES
// ============================================

var CONSTANTS      = require('./config/constants');
var ResponseHelper = require('./core/responseHelper');
var TEA            = require('./core/tea');
var logger         = require('./utils/logger');
var helpers        = require('./utils/helpers');
var DB             = require('./services/db');
var Notifications  = require('./notifications');
var Scheduler      = require('./scheduler');
var GameData       = require('./gameData/loader');

// ============================================
// 2. LOAD HANDLERS DYNAMICALLY
// ============================================

var handlers = {};

(function loadHandlers() {
  var handlersDir = path.join(__dirname, 'handlers');

  if (!fs.existsSync(handlersDir)) {
    logger.warn('Handler', 'handlers/ directory not found — no handlers loaded');
    return;
  }

  var entries = fs.readdirSync(handlersDir);
  var loaded  = 0;
  var failed  = [];

  for (var i = 0; i < entries.length; i++) {
    var entry    = entries[i];
    var fullPath = path.join(handlersDir, entry);
    var stat;

    try {
      stat = fs.statSync(fullPath);
    } catch (e) {
      continue;
    }

    if (stat.isDirectory()) {
      // Folder handler: handlers/hero/index.js
      var indexPath = path.join(fullPath, 'index.js');
      if (fs.existsSync(indexPath)) {
        try {
          var mod = require(indexPath);
          if (typeof mod.handle === 'function') {
            handlers[entry.toLowerCase()] = mod;
            loaded++;
          }
          // else: placeholder file without handle() — skip silently
        } catch (err) {
          logger.error('Handler', 'Failed to load ' + entry + '/index.js: ' + err.message);
          failed.push(entry);
        }
      }

    } else if (stat.isFile() && entry.endsWith('.js')) {
      // Single-file handler: handlers/arena.js
      var handlerName = entry.slice(0, -3); // remove .js
      try {
        var mod = require(fullPath);
        if (typeof mod.handle === 'function') {
          handlers[handlerName.toLowerCase()] = mod;
          loaded++;
        }
        // else: placeholder — skip silently
      } catch (err) {
        logger.error('Handler', 'Failed to load ' + entry + ': ' + err.message);
        failed.push(handlerName);
      }
    }
  }

  logger.info('Handler', 'Loaded ' + loaded + ' handler(s)');
  if (failed.length > 0) {
    logger.warn('Handler', 'Failed: ' + failed.join(', '));
  }
}());

// ============================================
// 3. CONNECTION TRACKING
// ============================================

var connectedClients = {}; // userId → socket
var totalConnections  = 0;
var activeConnections = 0;

// ============================================
// 4. HTTP SERVER
// ============================================

var httpServer = http.createServer(function (req, res) {
  // Health endpoint
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status:           'ok',
      service:          'main-server',
      version:          '1.1.0',
      port:             CONSTANTS.PORT,
      dbReady:          DB.isReady(),
      dataLoaded:       GameData.isLoaded(),
      connectedClients: Object.keys(connectedClients).length,
      totalConnections: totalConnections,
      activeConnections: activeConnections,
      handlersLoaded:   Object.keys(handlers).length,
      uptime:           process.uptime(),
      timestamp:        new Date().toISOString(),
    }));
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

// ============================================
// 5. SOCKET.IO — Natural configuration
//    NO monkey-patch on http.ServerResponse
// ============================================

var io = require('socket.io')(httpServer, {
  // Do not serve client JS bundle (API-only server)
  serveClient: false,

  // Transports — polling first matches Egret client default behaviour
  transports: ['polling', 'websocket'],

  // Disable cookies (not needed, avoids CORS complexity)
  cookie: false,

  // Socket ping/pong timings
  pingInterval:   CONSTANTS.PING_INTERVAL,
  pingTimeout:    CONSTANTS.PING_TIMEOUT,
  allowUpgrades:  true,
  upgradeTimeout: CONSTANTS.UPGRADE_TIMEOUT,

  // Allow all origins — natural Socket.IO v2 configuration
  origins: '*',

  // Preflight CORS handler for Engine.IO v3 OPTIONS requests
  handlePreflightRequest: function (req, res) {
    var origin = req.headers.origin || '*';
    res.writeHead(200, {
      'Access-Control-Allow-Origin':      origin,
      'Access-Control-Allow-Methods':     'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers':     'Content-Type',
      'Access-Control-Allow-Credentials': 'true',
    });
    res.end();
  },

  // Allow all connections (auth happens in TEA verify + enterGame)
  allowRequest: function (req, callback) {
    callback(null, true);
  },
});

// ============================================
// 6. SOCKET.IO CONNECTION HANDLER
// ============================================

io.on('connection', function (socket) {
  totalConnections++;
  activeConnections++;

  var clientIp = (socket.handshake && socket.handshake.address) || 'unknown';
  var transport = (socket.conn && socket.conn.transport)
    ? socket.conn.transport.name
    : 'unknown';

  logger.info('Socket', 'Connected: ' + socket.id +
    ' | IP=' + clientIp + ' | transport=' + transport);

  // Per-socket state
  socket._verified      = false;
  socket._userId        = null;
  socket._verifyAttempts = 0;

  // Log transport upgrades (polling → websocket)
  if (socket.conn) {
    socket.conn.on('upgrade', function (tr) {
      logger.info('Socket', 'Upgrade: ' + socket.id + ' → ' + tr.name);
    });
  }

  // ------------------------------------------
  // 6.1 TEA VERIFICATION HANDSHAKE
  // ------------------------------------------
  //
  // Protocol:
  //   Server emits  "verify" <challenge>
  //   Client emits  "verify" <Base64(TEA.encrypt(challenge, "verification"))>, callback
  //   Server: callback({ ret:0 })  → verified
  //           callback({ ret:4 })  → invalid, may retry (attempt < max)
  //           callback({ ret:38 }) → failed, disconnect (attempt >= max)
  //
  // CRITICAL: callback MUST always be called or client hangs forever.
  // ------------------------------------------

  var challenge = helpers.randomHex(16);
  logger.info('Verify', 'Challenge sent to ' + socket.id);
  socket.emit('verify', challenge);

  // Timeout: disconnect if client never responds
  var verifyTimer = setTimeout(function () {
    if (!socket._verified && socket.connected) {
      logger.warn('Verify', 'Timeout — disconnecting ' + socket.id);
      socket.disconnect(true);
    }
  }, CONSTANTS.VERIFY_TIMEOUT_MS);

  socket.on('verify', function (encryptedResponse, callback) {
    // Guard: already verified (duplicate event)
    if (socket._verified) {
      if (typeof callback === 'function') {
        callback({ ret: 0, compress: false,
          serverTime: Date.now(), server0Time: CONSTANTS.SERVER_UTC_OFFSET_MS });
      }
      return;
    }

    socket._verifyAttempts++;
    var attempt   = socket._verifyAttempts;
    var maxAttempt = CONSTANTS.VERIFY_MAX_ATTEMPTS;

    function _sendResult(retCode) {
      if (typeof callback === 'function') {
        callback({
          ret:         retCode,
          compress:    false,
          serverTime:  Date.now(),
          server0Time: CONSTANTS.SERVER_UTC_OFFSET_MS,
        });
      }
    }

    // Empty response
    if (!encryptedResponse) {
      logger.warn('Verify', socket.id + ' sent empty response (attempt ' + attempt + ')');
      if (attempt >= maxAttempt) {
        clearTimeout(verifyTimer);
        _sendResult(38); // LOGIN_CHECK_FAILED
        socket.disconnect(true);
      } else {
        _sendResult(4);  // INVALID — client may retry
      }
      return;
    }

    // Decrypt and compare
    var decrypted;
    try {
      decrypted = TEA.decrypt(encryptedResponse, CONSTANTS.TEA_KEY);
    } catch (err) {
      logger.error('Verify', socket.id + ' decrypt error: ' + err.message);
      if (attempt >= maxAttempt) {
        clearTimeout(verifyTimer);
        _sendResult(38);
        socket.disconnect(true);
      } else {
        _sendResult(4);  // INVALID — client may retry
      }
      return;
    }

    if (decrypted === challenge) {
      // ✅ Verified
      socket._verified = true;
      clearTimeout(verifyTimer);
      logger.info('Verify', socket.id + ' verified OK (attempt ' + attempt + ')');
      _sendResult(0);

    } else {
      // ❌ Wrong
      logger.warn('Verify', socket.id + ' wrong response (attempt ' +
        attempt + '/' + maxAttempt + ')');

      if (attempt >= maxAttempt) {
        clearTimeout(verifyTimer);
        _sendResult(38); // LOGIN_CHECK_FAILED — hard fail
        socket.disconnect(true);
      } else {
        _sendResult(4);  // INVALID — client may retry
      }
    }
  });

  // ------------------------------------------
  // 6.2 MAIN REQUEST HANDLER — "handler.process"
  // ------------------------------------------

  socket.on('handler.process', function (request, callback) {
    // Must be verified first
    if (!socket._verified) {
      ResponseHelper.sendResponse(socket, 'handler.process',
        ResponseHelper.error(ResponseHelper.ErrorCode.SESSION_EXPIRED), callback);
      return;
    }

    if (!request) {
      ResponseHelper.sendResponse(socket, 'handler.process',
        ResponseHelper.error(ResponseHelper.ErrorCode.DATA_ERROR), callback);
      return;
    }

    var parsed = ResponseHelper.parseRequest(request);
    if (!parsed) {
      ResponseHelper.sendResponse(socket, 'handler.process',
        ResponseHelper.error(ResponseHelper.ErrorCode.INVALID), callback);
      return;
    }

    var type   = parsed.type;
    var action = parsed.action;
    var userId = parsed.userId || '-';

    logger.info('Request', type + '.' + action + ' | userId=' + userId);

    // Single-session enforcement: kick old socket if same user reconnects
    if (parsed.userId) {
      var existing = connectedClients[parsed.userId];
      if (existing && existing !== socket && existing.connected) {
        logger.info('Session', 'Duplicate userId=' + parsed.userId + ' — kicking old session');
        Notifications.kickUser(existing, 'Logged in from another device');
      }
      connectedClients[parsed.userId] = socket;
      socket._userId = parsed.userId;
    }

    // Route to type handler
    var handler = handlers[type.toLowerCase()];

    if (handler && typeof handler.handle === 'function') {
      try {
        handler.handle(socket, parsed, callback);
      } catch (err) {
        logger.error('Request',
          'Handler error (' + type + '.' + action + '): ' + err.message);
        ResponseHelper.sendResponse(socket, 'handler.process',
          ResponseHelper.error(ResponseHelper.ErrorCode.UNKNOWN), callback);
      }
    } else {
      logger.warn('Request', 'No handler for type: ' + type);
      ResponseHelper.sendResponse(socket, 'handler.process',
        ResponseHelper.error(ResponseHelper.ErrorCode.INVALID_COMMAND), callback);
    }
  });

  // ------------------------------------------
  // 6.3 DISCONNECT
  // ------------------------------------------

  socket.on('disconnect', function (reason) {
    activeConnections--;
    clearTimeout(verifyTimer);

    if (socket._userId && connectedClients[socket._userId] === socket) {
      delete connectedClients[socket._userId];
    }

    logger.info('Socket', 'Disconnected: ' + socket.id +
      ' | reason=' + reason +
      ' | verified=' + (socket._verified ? 'yes' : 'no') +
      ' | active=' + activeConnections);
  });

  socket.on('error', function (err) {
    logger.error('Socket', socket.id + ' error: ' + err.message);
  });
});

// ============================================
// 7. GRACEFUL SHUTDOWN
// ============================================

function gracefulShutdown(signal) {
  logger.info('Shutdown', signal + ' received...');

  // Stop scheduler first
  Scheduler.shutdown();

  // Disconnect all clients
  var userIds = Object.keys(connectedClients);
  for (var i = 0; i < userIds.length; i++) {
    try { connectedClients[userIds[i]].disconnect(true); } catch (e) { /* ignore */ }
  }

  // Close Socket.IO, then DB, then HTTP server
  io.close(function () {
    DB.close().then(function () {
      httpServer.close(function () {
        logger.info('Shutdown', 'Done');
        process.exit(0);
      });
    }).catch(function () {
      httpServer.close(function () { process.exit(0); });
    });
  });

  // Force exit after 10s
  setTimeout(function () {
    logger.warn('Shutdown', 'Forced exit after timeout');
    process.exit(1);
  }, 10000);
}

process.on('SIGINT',  function () { gracefulShutdown('SIGINT');  });
process.on('SIGTERM', function () { gracefulShutdown('SIGTERM'); });

process.on('uncaughtException', function (err) {
  logger.error('Error', 'Uncaught: ' + err.message);
  console.error(err.stack);
  // Do NOT exit — let graceful shutdown handle it
});

process.on('unhandledRejection', function (reason) {
  logger.error('Error', 'Unhandled rejection: ' + (reason && reason.message ? reason.message : reason));
});

// ============================================
// 8. STARTUP
// ============================================

httpServer.on('error', function (err) {
  if (err.code === 'EADDRINUSE') {
    logger.error('Start', 'Port ' + CONSTANTS.PORT + ' already in use!');
  } else {
    logger.error('Start', err.message);
  }
  process.exit(1);
});

async function start() {
  logger.info('Server', 'Starting Main Server v1.1...');

  // 1. Database
  try {
    await DB.init();
    logger.info('Server', 'Database initialized');
  } catch (err) {
    logger.error('Server', 'DB failed: ' + err.message);
    process.exit(1);
  }

  // 2. Game data (non-fatal if missing)
  try {
    await GameData.load();
  } catch (err) {
    logger.warn('Server', 'GameData load warning: ' + err.message);
  }

  // 3. Init notification system
  Notifications.init(connectedClients);

  // 4. Start scheduler
  Scheduler.initAll(connectedClients);

  // 5. Listen
  httpServer.listen(CONSTANTS.PORT, CONSTANTS.HOST, function () {
    _printBanner();
    logger.info('Server', 'Listening on ' + CONSTANTS.HOST + ':' + CONSTANTS.PORT);
  });
}

// ============================================
// BANNER
// ============================================

function _printBanner() {
  var dataStats = GameData.getStats();
  console.log('');
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║       Super Warrior Z — Main Server v1.1                  ║');
  console.log('╠══════════════════════════════════════════════════════════════╣');
  console.log('║ Port:         ' + String(CONSTANTS.PORT).padEnd(46) + '║');
  console.log('║ Host:         ' + String(CONSTANTS.HOST).padEnd(46) + '║');
  console.log('║ TEA:          ON (key: "' + CONSTANTS.TEA_KEY + '")' + ''.padEnd(33) + '║');
  console.log('║ CORS:         Natural Socket.IO configuration             ║');
  console.log('║ Transports:   polling, websocket                          ║');
  console.log('║ DB:           ' +
    (CONSTANTS.DB.host + ':' + CONSTANTS.DB.port + '/' + CONSTANTS.DB.database).padEnd(46) + '║');
  console.log('║ server0Time:  ' + String(CONSTANTS.SERVER_UTC_OFFSET_MS).padEnd(46) + '║');
  console.log('║ Handlers:     ' + String(Object.keys(handlers).length + ' loaded').padEnd(46) + '║');
  console.log('║ GameData:     ' +
    (GameData.isLoaded() ? dataStats.fileCount + ' files (' + dataStats.loadTimeMs + 'ms)' : 'NOT LOADED').padEnd(46) + '║');
  console.log('╠══════════════════════════════════════════════════════════════╣');
  console.log('║ Notify actions: ' + String(Object.keys(Notifications.ActionTypes).length).padEnd(44) + '║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log('');
}

start();
