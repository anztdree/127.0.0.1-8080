/**
 * ============================================================================
 * Login Server — loginAnnounce Handler  [FIXED v2.1]
 * ============================================================================
 *
 * Client request:
 *   { type: "User", action: "LoginAnnounce" }
 *
 * HAR-verified response:
 *   53:431[{"ret":0,"data":"{\"data\":[],\"errorCode\":0}"}]
 *
 *   So data object must be: { data: [], errorCode: 0 }
 *   (previously was { data: [] } — missing errorCode)
 *
 * Client response handler:
 *   t.data = parsed response.data → array of notices
 *   Each notice: { text: {lang: string}, title: {lang: string},
 *                  version, orderNo, alwaysPopup }
 *
 * ============================================================================
 */

const { success } = require('../utils/responseHelper');
const logger = require('../utils/logger');
const CONSTANTS = require('../config/constants');

/**
 * Handle LoginAnnounce action
 *
 * @param {Function} callback - Socket.IO callback
 */
function loginAnnounce(callback) {
  if (!CONSTANTS.ANNOUNCE_ENABLED) {
    logger.debug('loginAnnounce', 'Disabled, returning empty');

    if (callback) {
      // HAR shows: {"data":[],"errorCode":0}
      callback(success({ data: [], errorCode: 0 }, false));
    }
    return;
  }

  // TODO: Load announces from JSON file or database
  // Format: [{ text: { en: "msg" }, title: { en: "title" }, version: 1, orderNo: 1, alwaysPopup: false }]
  const announces = [];

  logger.info('loginAnnounce', `Returning ${announces.length} announce(s)`);

  if (callback) {
    callback(success({ data: announces, errorCode: 0 }, false));
  }
}

module.exports = { loginAnnounce };
