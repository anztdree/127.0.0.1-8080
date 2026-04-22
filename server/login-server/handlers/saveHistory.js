/**
 * ============================================================================
 * Login Server — saveHistory Handler
 * ============================================================================
 *
 * Client request (main.min.js line 88590-88598 startBtnTap):
 * {
 *   type: "User",
 *   action: "SaveHistory",
 *   accountToken: ts.loginInfo.userInfo.userId,
 *   channelCode: ts.loginInfo.userInfo.channelCode,
 *   serverId: ts.loginInfo.serverItem.serverId,
 *   securityCode: ts.loginInfo.userInfo.securityCode,
 *   subChannel: string,
 *   version: "1.0"
 * }
 *
 * Client response handler (line 88605-88611):
 * e.loginToken → REFRESHES ts.loginInfo.userInfo.loginToken (critical!)
 * e.todayLoginCount → triggers analytics at count 4 and 6
 *
 * NATURAL IMPLEMENTATION:
 * - Generates new token for main-server validation
 * - Tracks daily login count (in-memory for simplicity)
 * - Note: Token is validated by main-server enterGame action
 *
 * ============================================================================
 */

const { success, error, ErrorCode } = require('../utils/responseHelper');
const logger = require('../utils/logger');
const TokenManager = require('../services/tokenManager');
const CONSTANTS = require('../config/constants');

// In-memory daily login count
// Key: "userId_YYYY-MM-DD", Value: count
const _loginCounts = {};

/**
 * Get today's date string
 * @returns {string} YYYY-MM-DD
 */
function getTodayKey() {
    return new Date().toISOString().slice(0, 10);
}

/**
 * Handle SaveHistory action
 * 
 * @param {Object} payload - Request payload
 * @param {Function} callback - Socket.IO callback
 */
async function saveHistory(payload, callback) {
    const accountToken = payload.accountToken;
    const serverId = payload.serverId;

    // =============================================
    // VALIDATION
    // =============================================

    if (!accountToken) {
        logger.warn('saveHistory', 'Missing accountToken');
        return callback(error(ErrorCode.LACK_PARAM));
    }

    const userId = accountToken;
    const serverIdNum = parseInt(serverId) || CONSTANTS.DEFAULT_SERVER_ID;

    logger.info('saveHistory', `userId=${userId}, serverId=${serverIdNum}`);

    try {
        // =============================================
        // GENERATE NEW TOKEN
        // =============================================
        // This token will be validated by main-server enterGame

        const newToken = TokenManager.generate(userId);
        await TokenManager.save(userId, newToken, serverIdNum);

        // =============================================
        // TRACK DAILY LOGIN COUNT
        // =============================================
        // Note: In-memory for simplicity
        // For production with multiple servers, use DB table

        const today = getTodayKey();
        const countKey = `${userId}_${today}`;
        _loginCounts[countKey] = (_loginCounts[countKey] || 0) + 1;

        const responseData = {
            loginToken: newToken,
            todayLoginCount: _loginCounts[countKey]
        };

        logger.info('saveHistory', 
            `Token refreshed for ${userId}, dailyCount=${_loginCounts[countKey]}`);

        if (callback) {
            callback(success(responseData));
        }

    } catch (err) {
        logger.error('saveHistory', `Error: ${err.message}`);
        if (callback) {
            callback(error(ErrorCode.UNKNOWN));
        }
    }
}

/**
 * Get daily login count (for testing/debug)
 * @param {string} userId
 * @returns {number}
 */
function getDailyCount(userId) {
    const today = getTodayKey();
    const countKey = `${userId}_${today}`;
    return _loginCounts[countKey] || 0;
}

module.exports = { saveHistory, getDailyCount };