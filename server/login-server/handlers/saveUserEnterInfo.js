/**
 * ============================================================================
 * Login Server — saveUserEnterInfo Handler  [FIXED v2.1]
 * ============================================================================
 *
 * Client request — called AFTER enterGame succeeds on main-server:
 *   {
 *     type:         "User",
 *     action:       "SaveUserEnterInfo",
 *     accountToken: userId,
 *     channelCode:  string,
 *     subChannel:   string,
 *     createTime:   number,
 *     userLevel:    number,
 *     version:      "1.0"
 *   }
 *
 * HAR-verified response:
 *   41:433[{"ret":0,"data":"{\"errorCode\":0}"}]
 *
 * Callback behaviour:
 *   After this callback fires, client calls ts.loginClient.destroy()
 *   → disconnects login socket (so this is the LAST action on login-server).
 *
 * FIXES:
 *   - Added errorCode: 0 to response data (matches HAR)
 *   - forceCompress=false (small payload)
 *
 * ============================================================================
 */

const { success } = require('../utils/responseHelper');
const logger = require('../utils/logger');

/**
 * Handle SaveUserEnterInfo action
 *
 * @param {Object}   payload  - Request payload
 * @param {Function} callback - Socket.IO callback (may be null)
 */
function saveUserEnterInfo(payload, callback) {
  const accountToken = payload.accountToken;
  const userLevel    = payload.userLevel;
  const heroLevel    = payload.heroLevel;
  const channelCode  = payload.channelCode;
  const subChannel   = payload.subChannel;
  const createTime   = payload.createTime;

  logger.info('saveUserEnterInfo',
    `accountToken=${accountToken}, level=${userLevel}, heroLevel=${heroLevel || '-'}, ` +
    `channel=${channelCode}, sub=${subChannel}`
  );

  // Analytics only — log to console/DB if needed
  // After this response, client destroys the login socket

  if (callback) {
    // HAR: {"errorCode":0}
    callback(success({ errorCode: 0 }, false));
  }
}

module.exports = { saveUserEnterInfo };
