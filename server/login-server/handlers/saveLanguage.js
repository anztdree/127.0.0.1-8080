/**
 * ============================================================================
 * Login Server — saveLanguage Handler
 * ============================================================================
 *
 * Client code (main.min.js line 77240-77254):
 * ts.saveLanguage() sends:
 * { type:"User", action:"SaveLanguage", userid, sdk, appid, language }
 *
 * NATURAL IMPLEMENTATION:
 * - Non-critical operation
 * - Always return success
 * - Store in MariaDB
 *
 * ============================================================================
 */

const { success } = require('../utils/responseHelper');
const logger = require('../utils/logger');
const UserManager = require('../services/userManager');

/**
 * Handle SaveLanguage action
 * 
 * @param {Object} payload - Request payload
 * @param {Function} callback - Socket.IO callback
 */
async function saveLanguage(payload, callback) {
    const userid = payload.userid;
    const sdk = payload.sdk;
    const appid = payload.appid;
    const language = payload.language;

    logger.debug('saveLanguage', `userid=${userid}, language=${language}`);

    // Save language preference (non-blocking)
    if (userid && language) {
        try {
            await UserManager.saveLanguage(userid, language, sdk || '', appid || '');
            logger.info('saveLanguage', `Saved: ${userid} → ${language}`);
        } catch (err) {
            logger.warn('saveLanguage', `Failed to save: ${err.message}`);
            // Non-critical - don't fail the request
        }
    }

    if (callback) {
        callback(success({ errorCode: 0 }));
    }
}

module.exports = { saveLanguage };