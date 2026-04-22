/**
 * ============================================================================
 * Login Server — getServerList Handler
 * ============================================================================
 *
 * Client request (main.min.js line 77332-77340):
 * { type:"User", action:"GetServerList", userId, subChannel, channel }
 *
 * Client response handler selectNewServer (line 88652-88660):
 * t.serverList → matchServerUrl → onLoginSuccess
 *
 * NATURAL IMPLEMENTATION:
 * - Configurable server list
 * - Dynamic URL generation
 *
 * ============================================================================
 */

const { success } = require('../utils/responseHelper');
const logger = require('../utils/logger');
const CONSTANTS = require('../config/constants');

/**
 * Handle GetServerList action
 * 
 * @param {Object} payload - Request payload
 * @param {Function} callback - Socket.IO callback
 */
function getServerList(payload, callback) {
    const host = CONSTANTS.SERVER_PUBLIC_HOST;

    // Build server list
    // Client expects: serverId, name, url, dungeonurl, chaturl, online, hot, "new"
    const serverList = [{
        serverId: CONSTANTS.DEFAULT_SERVER_ID,
        name: CONSTANTS.DEFAULT_SERVER_NAME,
        url: `http://${host}:${CONSTANTS.MAIN_SERVER_PORT}`,
        dungeonurl: `http://${host}:${CONSTANTS.DUNGEON_SERVER_PORT}`,
        chaturl: `http://${host}:${CONSTANTS.CHAT_SERVER_PORT}`,
        online: true,
        hot: false,
        "new": true
    }];

    const responseData = {
        serverList: serverList,
        history: [],
        offlineReason: ''
    };

    logger.info('getServerList', `Returning ${serverList.length} server(s) (host: ${host})`);

    if (callback) {
        callback(success(responseData));
    }
}

module.exports = { getServerList };