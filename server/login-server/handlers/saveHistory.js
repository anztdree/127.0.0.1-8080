/**
 * ============================================================================
 * Login Server — saveHistory Handler  [FIXED v2.1]
 * ============================================================================
 *
 * Client request (triggered on "Start Game" button):
 *   {
 *     type:          "User",
 *     action:        "SaveHistory",
 *     accountToken:  userId,
 *     channelCode:   "BSNative",
 *     serverId:      "2079",
 *     subChannel:    "",
 *     version:       "1.0"
 *   }
 *
 * HAR-verified response:
 *   63:432[{"ret":0,"data":"{\"errorCode\":0,\"todayLoginCount\":3}"}]
 *
 *   Client reads:
 *     e.loginToken      → REFRESHES ts.loginInfo.userInfo.loginToken (critical!)
 *     e.todayLoginCount → triggers analytics events at count 4 and 6
 *     e.errorCode       → 0 = OK
 *
 * FIXES:
 *   1. Added errorCode: 0 to response (HAR-verified)
 *   2. Daily count now persisted in DB (not in-memory) so it survives restarts
 *      and works correctly in multi-process setups
 *   3. forceCompress=false to match HAR (small payload)
 *
 * ============================================================================
 */

const { success, error, ErrorCode } = require('../utils/responseHelper');
const logger = require('../utils/logger');
const TokenManager = require('../services/tokenManager');
const DB = require('../services/db');
const CONSTANTS = require('../config/constants');

/**
 * Handle SaveHistory action
 *
 * @param {Object}   payload  - Request payload
 * @param {Function} callback - Socket.IO callback
 */
async function saveHistory(payload, callback) {
  const accountToken = payload.accountToken;
  const serverId     = payload.serverId;

  // =============================================
  // VALIDATION
  // =============================================

  if (!accountToken) {
    logger.warn('saveHistory', 'Missing accountToken');
    return callback(error(ErrorCode.LACK_PARAM));
  }

  const userId      = accountToken;
  const serverIdNum = parseInt(serverId) || CONSTANTS.DEFAULT_SERVER_ID;

  logger.info('saveHistory', `userId=${userId}, serverId=${serverIdNum}`);

  try {
    // =============================================
    // GENERATE NEW TOKEN
    // =============================================
    // This fresh token is what main-server validates on enterGame

    const newToken = TokenManager.generate(userId);
    await TokenManager.save(userId, newToken, serverIdNum);

    // =============================================
    // TRACK DAILY LOGIN COUNT (DB-backed)
    // =============================================
    // Uses the login_tokens table: count rows created today for this user.
    // This is already there — we just inserted one above.

    const todayStart = _getTodayStartMs();
    const rows = await DB.query(
      `SELECT COUNT(*) AS cnt FROM login_tokens
       WHERE user_id = ? AND created_at >= ?`,
      [userId, todayStart]
    );

    const todayLoginCount = (rows && rows[0]) ? Number(rows[0].cnt) : 1;

    // =============================================
    // RESPONSE
    // =============================================
    // HAR: {"errorCode":0,"todayLoginCount":3}
    // Note: loginToken is also included so client can refresh it

    const responseData = {
      errorCode:       0,
      loginToken:      newToken,
      todayLoginCount: todayLoginCount
    };

    logger.info('saveHistory',
      `Token refreshed for ${userId}, dailyCount=${todayLoginCount}`);

    if (callback) {
      callback(success(responseData, false));
    }

  } catch (err) {
    logger.error('saveHistory', `Error: ${err.message}`);
    if (callback) {
      callback(error(ErrorCode.UNKNOWN));
    }
  }
}

/**
 * Get start of today in milliseconds (UTC midnight)
 * @returns {number}
 */
function _getTodayStartMs() {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d.getTime();
}

module.exports = { saveHistory };
