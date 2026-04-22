/**
 * ============================================================================
 * Login Server — saveLanguage Handler  [FIXED v2.1]
 * ============================================================================
 *
 * Client request (main.min.js ts.saveLanguage()):
 *   { type:"User", action:"SaveLanguage", userid, sdk, appid, language }
 *
 * HAR-verified response:
 *   { errorCode: 0 }
 *
 * FIXES:
 *   - forceCompress=false (matches HAR, small payload)
 *   - Added errorCode: 0 to response
 *
 * ============================================================================
 */

const { success } = require('../utils/responseHelper');
const logger = require('../utils/logger');
const UserManager = require('../services/userManager');

/**
 * Handle SaveLanguage action
 *
 * @param {Object}   payload  - Request payload
 * @param {Function} callback - Socket.IO callback
 */
async function saveLanguage(payload, callback) {
  const userid   = payload.userid;
  const sdk      = payload.sdk;
  const appid    = payload.appid;
  const language = payload.language;

  logger.debug('saveLanguage', `userid=${userid}, language=${language}`);

  // Save language preference (non-blocking — failure doesn't affect client)
  if (userid && language) {
    try {
      await UserManager.saveLanguage(userid, language, sdk || '', appid || '');
      logger.info('saveLanguage', `Saved: ${userid} → ${language}`);
    } catch (err) {
      logger.warn('saveLanguage', `Failed to save: ${err.message}`);
      // Non-critical — still return success
    }
  }

  if (callback) {
    callback(success({ errorCode: 0 }, false));
  }
}

module.exports = { saveLanguage };
