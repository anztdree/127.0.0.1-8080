/**
 * ============================================================================
 * Login Server — getServerList Handler  [FIXED v2.1]
 * ============================================================================
 *
 * Client request (main.min.js):
 *   { type:"User", action:"GetServerList", userId, subChannel, channel }
 *
 * HAR-verified response format:
 *   GET /socket.io/... response body:
 *   56:431[{"ret":0,"data":"{\"data\":[],\"errorCode\":0}"}]
 *   (LoginAnnounce - empty list example)
 *
 *   For GetServerList, client reads:
 *     t.serverList   → array of server objects
 *     t.history      → last played server IDs
 *     t.offlineReason → maintenance message
 *
 *   Each server object:
 *     { serverId, name, url, dungeonurl, chaturl, online, hot, "new" }
 *
 * FIX: Previously called callback(success(responseData)) but success()
 *      crashed on compress bug. Fixed by responseHelper fix.
 *      Also: force compress=false for small responses (matches HAR).
 *
 * ============================================================================
 */

const { success } = require('../utils/responseHelper');
const logger = require('../utils/logger');
const CONSTANTS = require('../config/constants');

/**
 * Handle GetServerList action
 *
 * @param {Object} payload  - Request payload
 * @param {Function} callback - Socket.IO callback
 */
function getServerList(payload, callback) {
  const host = CONSTANTS.SERVER_PUBLIC_HOST;

  // Build server list
  // Client expects: serverId, name, url, dungeonurl, chaturl, online, hot, "new"
  const serverList = [{
    serverId:   CONSTANTS.DEFAULT_SERVER_ID,
    name:       CONSTANTS.DEFAULT_SERVER_NAME,
    url:        `http://${host}:${CONSTANTS.MAIN_SERVER_PORT}`,
    dungeonurl: `http://${host}:${CONSTANTS.DUNGEON_SERVER_PORT}`,
    chaturl:    `http://${host}:${CONSTANTS.CHAT_SERVER_PORT}`,
    online: true,
    hot:    false,
    'new':  true
  }];

  const responseData = {
    serverList:    serverList,
    history:       [],
    offlineReason: ''
  };

  logger.info('getServerList', `Returning ${serverList.length} server(s) (host: ${host})`);

  if (callback) {
    // forceCompress=false → small payload, no need to compress (matches HAR behaviour)
    callback(success(responseData, false));
  }
}

module.exports = { getServerList };
