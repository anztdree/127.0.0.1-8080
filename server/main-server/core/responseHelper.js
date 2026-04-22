/**
 * ============================================================================
 * Response Helper — Main Server
 * ============================================================================
 *
 * Client response format (main.min.js):
 *   { ret: 0, data: "JSON_STRING", compress: boolean, serverTime, server0Time }
 *
 * Push/Notify format:
 *   { ret: "SUCCESS", data: "JSON_STRING", compress: boolean, serverTime }
 *
 * Success detection : 0 === e.ret
 * Error detection   : else → ErrorHandler.ShowErrorTips(e.ret)
 * Data parsing      : JSON.parse(e.data)
 *                     if (e.compress) → LZString.decompressFromUTF16(e.data)
 *
 * HAR-verified compression behaviour:
 *   compress: true  → data is LZString.compressToUTF16(JSON.stringify(obj))
 *   compress: false → data is plain JSON.stringify(obj)
 *   Auto threshold  → compress when serialised JSON > 200 chars
 *                     (confirmed by HAR: small responses like empty arrays
 *                      use compress:false, large game data use compress:true)
 *
 * HAR-verified server0Time: 25200000 (POSITIVE, UTC+7)
 * ============================================================================
 */

var lzHelper  = require('./lzHelper');
var CONSTANTS = require('../config/constants');

// ============================================
// SUCCESS
// ============================================

/**
 * Build success response
 *
 * @param {object}  dataObj       - Data object (will be JSON.stringify'd)
 * @param {boolean} [forceCompress] - true=always compress, false=never,
 *                                    undefined=auto (>200 chars)
 * @returns {object} { ret:0, data, compress, serverTime, server0Time }
 */
function success(dataObj, forceCompress) {
  var now     = Date.now();
  var dataStr = '';
  var shouldCompress = false;   // ← named differently from lzHelper.compress()

  if (dataObj !== undefined && dataObj !== null) {
    dataStr = JSON.stringify(dataObj);

    if (forceCompress === true) {
      shouldCompress = true;
    } else if (forceCompress === false) {
      shouldCompress = false;
    } else {
      // Auto: compress when data is large enough to benefit
      // HAR shows threshold is roughly 200 chars serialised JSON
      shouldCompress = dataStr.length > 200;
    }

    if (shouldCompress) {
      dataStr = lzHelper.compress(dataStr);   // ← safe: different name
    }
  }

  return {
    ret:         0,
    data:        dataStr,
    compress:    shouldCompress,
    serverTime:  now,
    server0Time: CONSTANTS.SERVER_UTC_OFFSET_MS,  // 25200000
  };
}

// ============================================
// ERROR
// ============================================

/**
 * Build error response
 *
 * @param {number} code  - Error code from ErrorCode
 * @param {string} [msg] - Optional message string
 * @returns {object} { ret:code, data:'', compress:false, serverTime, server0Time }
 */
function error(code, msg) {
  return {
    ret:         code,
    data:        msg || '',
    compress:    false,
    serverTime:  Date.now(),
    server0Time: CONSTANTS.SERVER_UTC_OFFSET_MS,
  };
}

// ============================================
// PUSH / NOTIFY
// ============================================

/**
 * Build server-push (Notify event) response
 *
 * Client listens:
 *   socket.on("Notify", function(t) {
 *     if ("SUCCESS" == t.ret) {
 *       var n = t.compress
 *             ? LZString.decompressFromUTF16(t.data)
 *             : t.data;
 *       var o = JSON.parse(n);
 *       if ("Kickout" == o.action) { ... }
 *       ts.notifyData(o);
 *     }
 *   })
 *
 * HAR evidence: Notify pushes use compress:true for large payloads,
 * compress:false for small ones — same auto threshold as success().
 *
 * @param {object} dataObj - Notification payload
 * @returns {object} { ret:"SUCCESS", data, compress, serverTime }
 */
function push(dataObj) {
  var dataStr        = JSON.stringify(dataObj || {});
  var shouldCompress = dataStr.length > 200;

  if (shouldCompress) {
    dataStr = lzHelper.compress(dataStr);
  }

  return {
    ret:        'SUCCESS',
    data:       dataStr,
    compress:   shouldCompress,
    serverTime: Date.now(),
  };
}

// ============================================
// HELPERS
// ============================================

/**
 * Send response via Socket.IO callback (ACK)
 *
 * @param {object}   socket   - Socket.IO socket (unused, kept for API compat)
 * @param {string}   event    - Event name (for logging)
 * @param {object}   response - Response object
 * @param {function} callback - Socket.IO acknowledgment callback
 */
function sendResponse(socket, event, response, callback) {
  if (typeof callback === 'function') {
    callback(response);
  }
}

/**
 * Parse and validate incoming handler.process request
 *
 * @param {object} request - Raw Socket.IO payload
 * @returns {object|null}  - Validated request or null
 */
function parseRequest(request) {
  if (!request || typeof request !== 'object') return null;
  if (!request.type || !request.action)        return null;
  return request;
}

// ============================================
// ERROR CODES (from errorDefine.json)
// ============================================

var ErrorCode = {
  UNKNOWN:               1,
  STATE_ERROR:           2,
  DATA_ERROR:            3,
  INVALID:               4,
  INVALID_COMMAND:       5,
  SESSION_EXPIRED:       6,
  LACK_PARAM:            8,
  USER_LOGIN_BEFORE:     12,
  USER_NOT_LOGIN_BEFORE: 13,
  USER_NOT_LOGOUT:       14,
  LOGIN_CHECK_FAILED:    38,
  FORBIDDEN_LOGIN:       45,
  NOT_ENABLE_REGIST:     47,
  GAME_SERVER_OFFLINE:   51,
  CLIENT_VERSION_ERR:    62,
  MAINTAIN:              65,
  USER_NOT_REGIST:       57003,
};

// ============================================
// EXPORT
// ============================================

module.exports = {
  success:      success,
  error:        error,
  push:         push,
  sendResponse: sendResponse,
  parseRequest: parseRequest,
  ErrorCode:    ErrorCode,
};
