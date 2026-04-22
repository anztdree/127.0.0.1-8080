/**
 * ============================================================================
 * Chat Server — Super Warrior Z v1.0
 * Port 8002 — Socket.IO v2, TEA verification ENABLED
 * ============================================================================
 *
 * CLIENT CONNECTION FLOW (from main.min.js):
 * ─────────────────────────────────────────
 *  1.  After login, client calls ts.registChat() → polls main-server every 3s
 *  2.  Main-server returns chat URL + room IDs (world, guild, team, tdungeon)
 *  3.  ts.clientStartChat(false, broadcastRecords)
 *  4.  TSSocketClient('chat-server', verifyEnable=true) connects
 *  5.  TEA verify handshake (same as main-server)
 *  6.  chat.login { userId, serverId } → load user profile
 *  7.  chat.joinRoom × N (world, guild, team, tdungeon — parallel)
 *  8.  Client starts sending/receiving messages
 *
 * TEA VERIFICATION PROTOCOL (identical to main-server):
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
 * HANDLER ROUTING:
 * ────────────────
 *  All requests have type="chat", routed by action field:
 *    chat.login     → handlers/login.js
 *    chat.sendMsg   → handlers/sendMsg.js
 *    chat.joinRoom  → handlers/joinRoom.js
 *    chat.leaveRoom → handlers/leaveRoom.js
 *    chat.getRecord → handlers/getRecord.js
 *
 * ============================================================================
 */

'use strict';

var http = require('http');
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
var RoomManager    = require('./services/roomManager');
var ChatNotify     = require('./notifications');

// ============================================
// 2. LOAD HANDLERS
// ============================================

var chatHandlers = {};

(function loadHandlers() {
  var handlerFiles = {
    'login':     path.join(__dirname, 'handlers', 'login.js'),
    'sendMsg':   path.join(__dirname, 'handlers', 'sendMsg.js'),
    'joinRoom':  path.join(__dirname, 'handlers', 'joinRoom.js'),
    'leaveRoom': path.join(__dirname, 'handlers', 'leaveRoom.js'),
    'getRecord': path.join(__dirname, 'handlers', 'getRecord.js'),
  };

  var loaded  = 0;
  var failed  = [];

  var actions = Object.keys(handlerFiles);
  for (var i = 0; i < actions.length; i++) {
    var action = actions[i];
    var filePath = handlerFiles[action];

    try {
      var mod = require(filePath);
      if (typeof mod.handle === 'function') {
        chatHandlers[action] = mod;
        loaded++;
      }
    } catch (err) {
      logger.error('Handler', 'Failed to load ' + action + ': ' + err.message);
      failed.push(action);
    }
  }

  logger.info('Handler', 'Loaded ' + loaded + ' handler(s)');
  if (failed.length > 0) {
    logger.warn('Handler', 'Failed: ' + failed.join(', '));
  }
})();

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
      service:          'chat-server',
      version:          '1.0.0',
      port:             CONSTANTS.PORT,
      dbReady:          DB.isReady(),
      connectedClients: Object.keys(connectedClients).length,
      totalConnections: totalConnections,
      activeConnections: activeConnections,
      handlersLoaded:   Object.keys(chatHandlers).length,
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
//    Same pattern as main-server (standalone)
// ============================================

var io = require('socket.io')(httpServer, {
  serveClient: false,

  // Polling first matches Egret client default behaviour
  transports: ['polling', 'websocket'],

  cookie: false,

  pingInterval:   CONSTANTS.PING_INTERVAL,
  pingTimeout:    CONSTANTS.PING_TIMEOUT,
  allowUpgrades:  true,
  upgradeTimeout: CONSTANTS.UPGRADE_TIMEOUT,

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

  // Allow all connections (auth happens in TEA verify + chat.login)
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
  socket._user          = null;
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
  // Protocol (same as main-server):
  //   Server emits  "verify" <challenge>
  //   Client emits  "verify" <Base64(TEA.encrypt(challenge, "verification"))>, callback
  //   Server: callback({ ret:0 })  → verified
  //           callback({ ret:4 })  → invalid, may retry
  //           callback({ ret:38 }) → failed, disconnect
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
    // Guard: already verified
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
        _sendResult(38);
        socket.disconnect(true);
      } else {
        _sendResult(4);
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
        _sendResult(4);
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
        _sendResult(38);
        socket.disconnect(true);
      } else {
        _sendResult(4);
      }
    }
  });

  // ------------------------------------------
  // 6.2 MAIN REQUEST HANDLER — "handler.process"
  // ------------------------------------------
  //
  // All chat actions have type="chat", routed by action field.
  // Actions: login, sendMsg, joinRoom, leaveRoom, getRecord
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

    logger.info('Request', 'chat.' + action + ' | userId=' + userId);

    // Validate type — chat-server only accepts type="chat"
    if (type.toLowerCase() !== 'chat') {
      logger.warn('Request', 'Invalid type: ' + type + ' (expected "chat")');
      ResponseHelper.sendResponse(socket, 'handler.process',
        ResponseHelper.error(ResponseHelper.ErrorCode.INVALID_COMMAND), callback);
      return;
    }

    // Single-session enforcement: kick old socket if same user reconnects
    if (parsed.userId) {
      var existing = connectedClients[parsed.userId];
      if (existing && existing !== socket && existing.connected) {
        logger.info('Session', 'Duplicate userId=' + parsed.userId + ' — kicking old session');
        try { existing.disconnect(true); } catch (e) { /* ignore */ }
      }
      connectedClients[parsed.userId] = socket;
    }

    // Route to action handler
    var handler = chatHandlers[action];

    if (handler && typeof handler.handle === 'function') {
      try {
        handler.handle(socket, parsed, callback);
      } catch (err) {
        logger.error('Request',
          'Handler error (chat.' + action + '): ' + err.message);
        ResponseHelper.sendResponse(socket, 'handler.process',
          ResponseHelper.error(ResponseHelper.ErrorCode.UNKNOWN), callback);
      }
    } else {
      logger.warn('Request', 'No handler for action: ' + action);
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

    // Leave all chat rooms
    RoomManager.leaveAllRooms(socket);

    // Remove from connected clients map
    if (socket._userId && connectedClients[socket._userId] === socket) {
      delete connectedClients[socket._userId];
    }

    // Clear user data
    socket._user = null;

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
  logger.info('Server', 'Starting Chat Server v1.0...');

  // 1. Database
  try {
    await DB.init();
    logger.info('Server', 'Database initialized');
  } catch (err) {
    logger.error('Server', 'DB failed: ' + err.message);
    process.exit(1);
  }

  // 2. Init notification system
  ChatNotify.init(io);

  // 3. Listen
  httpServer.listen(CONSTANTS.PORT, CONSTANTS.HOST, function () {
    _printBanner();
    logger.info('Server', 'Listening on ' + CONSTANTS.HOST + ':' + CONSTANTS.PORT);
  });
}

// ============================================
// BANNER
// ============================================

function _printBanner() {
  console.log('');
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║       Super Warrior Z — Chat Server v1.0                    ║');
  console.log('╠══════════════════════════════════════════════════════════════╣');
  console.log('║ Port:         ' + String(CONSTANTS.PORT).padEnd(46) + '║');
  console.log('║ Host:         ' + String(CONSTANTS.HOST).padEnd(46) + '║');
  console.log('║ TEA:          ON (key: "' + CONSTANTS.TEA_KEY + '")' + ''.padEnd(33) + '║');
  console.log('║ CORS:         Natural Socket.IO configuration             ║');
  console.log('║ Transports:   polling, websocket                          ║');
  console.log('║ DB:           ' +
    (CONSTANTS.DB.host + ':' + CONSTANTS.DB.port + '/' + CONSTANTS.DB.database).padEnd(46) + '║');
  console.log('║ server0Time:  ' + String(CONSTANTS.SERVER_UTC_OFFSET_MS).padEnd(46) + '║');
  console.log('║ Handlers:     ' + String(Object.keys(chatHandlers).length + ' loaded').padEnd(46) + '║');
  console.log('╠══════════════════════════════════════════════════════════════╣');
  console.log('║ Chat Actions: login, sendMsg, joinRoom, leaveRoom, getRecord║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log('');
}

start();
