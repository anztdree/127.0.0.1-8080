/**
 * Login Server — Response Helper
 *
 * Client response format (main.min.js line 76925-76935):
 *   { ret: 0, data: "JSON_STRING", compress: boolean, serverTime, server0Time }
 *
 * Success detection: 0 === e.ret
 * Error detection:  else → ErrorHandler.ShowErrorTips(e.ret)
 * Data parsing: JSON.parse(e.data), optional LZString.decompressFromUTF16
 *
 * Push format (line 77182): ret = "SUCCESS" (string literal)
 *
 * Error codes from errorDefine.json:
 *   1 = UNKNOWN, 8 = LACK_PARAM, 12 = USER_LOGIN_BEFORE,
 *   38 = LOGIN_CHECK_FAILED (triggers reload), 45 = FORBIDDEN_LOGIN,
 *   51 = GAME_SERVER_OFFLINE, 65 = MAINTAIN
 */

var lzHelper = require('./lzHelper');
var CONSTANTS = require('../config/constants');

/**
 * Build success response
 * @param {object} dataObj - Data to return (JSON.stringify'd)
 * @param {boolean} [forceCompress] - Force compress (default: auto when >200 chars)
 * @returns {object} { ret:0, data:string, compress:bool, serverTime, server0Time }
 */
function success(dataObj, forceCompress) {
    var now = Date.now();
    var dataStr;
    var compress = false;

    if (dataObj !== undefined && dataObj !== null) {
        dataStr = JSON.stringify(dataObj);
        // Auto-compress when data is large
        if (forceCompress === true) {
            compress = true;
        } else if (forceCompress === undefined && dataStr.length > 200) {
            compress = true;
        }
        if (compress) {
            dataStr = lzHelper.compress(dataStr);
        }
    } else {
        dataStr = '';
    }

    return {
        ret: 0,
        data: dataStr,
        compress: compress,
        serverTime: now,
        server0Time: CONSTANTS.SERVER_UTC_OFFSET_MS,
    };
}

/**
 * Build error response
 * @param {number} code - Error code from errorDefine.json
 * @param {string} [msg] - Optional error message
 * @returns {object} { ret:code, data:'', compress:false, serverTime, server0Time }
 */
function error(code, msg) {
    return {
        ret: code,
        data: msg || '',
        compress: false,
        serverTime: Date.now(),
        server0Time: CONSTANTS.SERVER_UTC_OFFSET_MS,
    };
}

/**
 * Build push/notify response
 * Client: if("SUCCESS" == t.ret) { ... }
 * @param {object} dataObj
 * @returns {object} { ret:"SUCCESS", data:JSON_string, ... }
 */
function push(dataObj) {
    return {
        ret: 'SUCCESS',
        data: JSON.stringify(dataObj || {}),
        compress: false,
        serverTime: Date.now(),
        server0Time: CONSTANTS.SERVER_UTC_OFFSET_MS,
    };
}

// Error codes (from errorDefine.json, 365 codes total)
var ErrorCode = {
    UNKNOWN: 1,
    STATE_ERROR: 2,
    DATA_ERROR: 3,
    INVALID: 4,
    INVALID_COMMAND: 5,
    SESSION_EXPIRED: 6,
    LACK_PARAM: 8,
    USER_LOGIN_BEFORE: 12,
    USER_NOT_LOGIN_BEFORE: 13,
    USER_NOT_LOGOUT: 14,
    LOGIN_CHECK_FAILED: 38,
    FORBIDDEN_LOGIN: 45,
    NOT_ENABLE_REGIST: 47,
    GAME_SERVER_OFFLINE: 51,
    CLIENT_VERSION_ERR: 62,
    MAINTAIN: 65,
    USER_NOT_REGIST: 57003,
};

module.exports = {
    success: success,
    error: error,
    push: push,
    ErrorCode: ErrorCode,
};
