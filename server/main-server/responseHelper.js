/**
 * responseHelper.js — Response Envelope Builder
 * Referensi: main-server.md v4.0 Section 2.6, 2.7
 *
 * Format response envelope:
 * {
 *     ret: number,          // 0 = sukses, lainnya = error code
 *     data: string,         // String JSON (mungkin LZString compressed)
 *     compress: boolean,    // true = data di-encode LZString.decompressFromUTF16
 *     serverTime: number,   // Timestamp server (Date.now())
 *     server0Time: number   // Offset timezone (25200000 untuk UTC+7)
 * }
 *
 * serverTime dan server0Time WAJIB ada di SETIAP response — sukses maupun error
 */

const LZString = require('lz-string');
const config = require('./config');
const logger = require('./logger');

/**
 * Build standard response envelope
 * @param {number} ret - 0 for success, error code for failure
 * @param {object|string} data - Data object (will be JSON.stringified) or string
 * @param {boolean} compress - LZString compression flag
 * @returns {object}
 */
function buildResponse(ret, data, compress) {
    const dataStr = typeof data === 'string' ? data : JSON.stringify(data);

    let finalData = dataStr;
    let finalCompress = false;

    // Auto-compress jika data melebihi threshold
    if (compress || dataStr.length > config.compressThreshold) {
        finalData = LZString.compressToUTF16(dataStr);
        finalCompress = true;
    }

    return {
        ret: ret,
        data: finalData,
        compress: finalCompress,
        serverTime: Date.now(),
        server0Time: config.server0Time
    };
}

/**
 * Build success response
 * @param {object} data - Data to send
 * @param {boolean} compress - Whether to compress
 * @returns {object}
 */
function buildSuccess(data, compress) {
    return buildResponse(0, data, compress || false);
}

/**
 * Build error response
 * @param {number} errorCode - Error code (dari errorDefine.json)
 * @returns {object}
 */
function buildError(errorCode) {
    return buildResponse(errorCode, '', false);
}

/**
 * Build response dengan string data yang sudah di-serialize
 * Untuk kasus dimana data sudah dalam bentuk JSON string
 * @param {number} ret
 * @param {string} jsonString - Already serialized JSON string
 * @param {boolean} compress
 * @returns {object}
 */
function buildRawResponse(ret, jsonString, compress) {
    let finalData = jsonString;
    let finalCompress = false;

    if (compress) {
        finalData = LZString.compressToUTF16(jsonString);
        finalCompress = true;
    }

    return {
        ret: ret,
        data: finalData,
        compress: finalCompress,
        serverTime: Date.now(),
        server0Time: config.server0Time
    };
}

/**
 * Build Notify push response
 * Notify menggunakan format yang sama dengan reguler response
 * tapi dikirim via socket.emit('Notify', ...) bukan callback
 *
 * @param {string} action - Notify action type
 * @param {object} notifyData - Data untuk notify
 * @returns {object}
 */
function buildNotify(action, notifyData) {
    const data = {
        action: action,
        ...notifyData
    };
    return buildResponse(0, data, false);
}

/**
 * Common error codes dari errorDefine.json
 * Digunakan oleh handler untuk return error yang konsisten
 */
const ErrorCodes = {
    SUCCESS: 0,
    ERROR_UNKNOWN: 1,
    ERROR_DATA_ERROR: 3,
    ERROR_INVALID: 4,
    ERROR_LACK_PARAM: 8,
    BATTLE_REPORT: 22,
    IP_NOT_IN_WHITE_LIST: 29,
    ERROR_NO_LOGIN_CLIENT: 37,
    FORCE_RELOAD: 38,
    PARAM_ERR: 41,
    FORBIDDEN_LOGIN: 45,
    SIGN_ERROR: 55,
    ONLINE_USER_MAX: 61,
    CLIENT_VERSION_ERR: 62,
    MAINTAIN: 65
};

module.exports = {
    buildResponse,
    buildSuccess,
    buildError,
    buildRawResponse,
    buildNotify,
    ErrorCodes
};
