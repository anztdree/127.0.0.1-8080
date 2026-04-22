/**
 * ============================================================================
 * Login Server — loginAnnounce Handler
 * ============================================================================
 *
 * Client request (main.min.js line 88769-88772):
 * { type: "User", action: "LoginAnnounce" }
 *
 * Client response handler (line 88773-88790):
 * t.data = parsed response.data → array of notices
 * Each notice: { text: {lang: string}, title: {lang: string}, version, orderNo, alwaysPopup }
 *
 * NATURAL IMPLEMENTATION:
 * - Returns empty array by default (disabled)
 * - Can be extended to load from JSON file or database
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
            callback(success({ data: [] }));
        }
        return;
    }

    // TODO: Load announces from JSON file or database
    // For now, return empty
    const announces = [];

    logger.info('loginAnnounce', `Returning ${announces.length} announce(s)`);

    if (callback) {
        callback(success({ data: announces }));
    }
}

module.exports = { loginAnnounce };