/**
 * ============================================================================
 * Login Server — saveUserEnterInfo Handler
 * ============================================================================
 *
 * Client code (main.min.js line 77373-77389):
 * reportToLoginEnterInfo() — called AFTER enterGame succeeds on main-server
 * Callback: ts.loginClient.destroy() — disconnects login socket
 *
 * Request:
 * { type:"User", action:"SaveUserEnterInfo",
 *   accountToken: userId, channelCode, subChannel, version:"1.0",
 *   createTime, userLevel, heroLevel }
 *
 * NATURAL IMPLEMENTATION:
 * - Analytics only
 * - Always return success (client disconnects socket on response)
 * - Callback can be null (no response expected)
 *
 * ============================================================================
 */

const { success } = require('../utils/responseHelper');
const logger = require('../utils/logger');

/**
 * Handle SaveUserEnterInfo action
 * 
 * @param {Object} payload - Request payload
 * @param {Function} callback - Socket.IO callback (can be null)
 */
function saveUserEnterInfo(payload, callback) {
    const accountToken = payload.accountToken;
    const userLevel = payload.userLevel;
    const heroLevel = payload.heroLevel;
    const channelCode = payload.channelCode;
    const subChannel = payload.subChannel;

    logger.info('saveUserEnterInfo', 
        `accountToken=${accountToken}, level=${userLevel}, heroLevel=${heroLevel}`);

    // Analytics logging (could be extended to DB)
    // For now, just log the data

    if (callback) {
        callback(success({}));
    }
}

module.exports = { saveUserEnterInfo };