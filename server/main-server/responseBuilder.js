/**
 * responseBuilder.js — Response Envelope Builder
 *
 * Client expects EXACTLY this format from main.min.js:
 *
 * handler.process response:
 *   { ret: Number, data: String, compress: Boolean, serverTime: Number, server0Time: Number }
 *
 * Notify push:
 *   { ret: 'SUCCESS', data: String, compress: Boolean }
 *
 * CRITICAL:
 *   - ret = 0 (NUMBER) for response success
 *   - ret = 'SUCCESS' (STRING) for notify
 *   - serverTime & server0Time WAJIB di setiap handler.process response
 *   - data selalu STRING (JSON.stringify)
 */

const config = require('./config');

/**
 * Build success response
 * @param {number} ret - 0 for success, error code for failure
 * @param {object|string} data - Response data (will be JSON.stringify if object)
 * @param {boolean} compress - LZString compression flag
 * @returns {object} Response envelope
 */
function buildResponse(ret, data, compress) {
    return {
        ret: ret,
        data: typeof data === 'string' ? data : JSON.stringify(data),
        compress: compress || false,
        serverTime: Date.now(),
        server0Time: config.server0Time
    };
}

/**
 * Build error response
 * @param {number} errorCode - Error code (see errorDefine.json)
 * @returns {object} Error envelope
 */
function buildError(errorCode) {
    return {
        ret: errorCode,
        data: '',
        compress: false,
        serverTime: Date.now(),
        server0Time: config.server0Time
    };
}

/**
 * Build success data response (shortcut for ret=0)
 * @param {object|string} data - Response data
 * @param {boolean} compress - LZString compression flag
 * @returns {object} Success envelope
 */
function buildSuccess(data, compress) {
    return buildResponse(0, data, compress);
}

/**
 * Build notify push
 * @param {string} action - Notify action type
 * @param {object|string} data - Notify data
 * @param {boolean} compress - LZString compression flag
 * @returns {object} Notify envelope
 */
function buildNotify(action, data, compress) {
    const payload = typeof data === 'object' ? { action, ...data } : { action, value: data };
    return {
        ret: 'SUCCESS',  // STRING, bukan number!
        data: JSON.stringify(payload),
        compress: compress || false
    };
}

module.exports = {
    buildResponse,
    buildError,
    buildSuccess,
    buildNotify
};
