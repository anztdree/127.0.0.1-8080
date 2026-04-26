/**
 * chat-server/handlers/login.js — Auth Chat Session
 *
 * Client call (line 114551):
 *   ts.processHandlerWithChat({
 *     type:'chat', action:'login',
 *     userId: UserInfoSingleton.getInstance().userId,
 *     serverId: UserInfoSingleton.getInstance().getServerId(),
 *     version:'1.0'
 *   }, callback)
 *
 * Setelah login sukses, client join 4 rooms:
 *   1. worldRoomId (always)
 *   2. guildRoomId (if exists)
 *   3. teamDungeonChatRoom (if exists)
 *   4. teamChatRoomId (if exists)
 *
 * Response: {} kosong — client tidak pakai data dari login response,
 *           room records didapat dari joinRoom response.
 */

var rooms = require('../rooms');

function execute(data, socket, ctx) {
    var buildResponse = ctx.buildResponse;
    var userId = (data.userId || '').trim();
    var serverId = data.serverId;

    if (!userId) {
        return Promise.resolve(ctx.buildErrorResponse(1));
    }

    // Store userId on socket for later use
    socket._chatUserId = userId;
    socket._chatServerId = serverId;

    console.log('[chat.login] userId=' + userId + ' serverId=' + serverId);

    return Promise.resolve(buildResponse({}));
}

module.exports = { execute: execute };
