/**
 * responseBuilder.js — Chat-Server Response Envelope Builder
 *
 * Client expects EXACTLY this format:
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

function buildResponse(ret, data, compress) {
    return {
        ret: ret,
        data: typeof data === 'string' ? data : JSON.stringify(data),
        compress: compress || false,
        serverTime: Date.now(),
        server0Time: config.server0Time
    };
}

function buildError(errorCode) {
    return {
        ret: errorCode,
        data: '',
        compress: false,
        serverTime: Date.now(),
        server0Time: config.server0Time
    };
}

function buildSuccess(data, compress) {
    return buildResponse(0, data, compress);
}

/**
 * Build notify push for chat messages
 * Format: { ret: 'SUCCESS', data: JSON.stringify({ _msg: {...} }), compress: false }
 *
 * @param {object} msgData - Chat message object (_time, _kind, _name, _content, _id, _image, _param, _type, _headEffect, _headBox, _oriServerId, _serverId, _showMain)
 * @param {boolean} compress - LZString compression flag
 * @returns {object} Notify envelope
 */
function buildChatNotify(msgData, compress) {
    return {
        ret: 'SUCCESS',  // STRING, bukan number!
        data: JSON.stringify({ _msg: msgData }),
        compress: compress || false
    };
}

module.exports = {
    buildResponse,
    buildError,
    buildSuccess,
    buildChatNotify
};
