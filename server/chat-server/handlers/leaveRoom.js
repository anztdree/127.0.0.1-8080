/**
 * chat-server/handlers/leaveRoom.js — Leave Chat Room
 *
 * Client call (line 114623):
 *   ts.chatLeaveRequest(roomId, callback)
 *   → ts.processHandlerWithChat({
 *       type:'chat', action:'leaveRoom',
 *       userId: UserInfoSingleton.getInstance().userId,
 *       roomId: e,
 *       version:'1.0'
 *     }, callback)
 *
 * Response: {} kosong (acknowledgment only)
 */

var rooms = require('../rooms');

function execute(data, socket, ctx) {
    var buildResponse = ctx.buildResponse;
    var userId = (data.userId || '').trim();
    var roomId = (data.roomId || '').trim();

    rooms.leave(roomId, socket.id);

    console.log('[leaveRoom] ' + (userId || socket.id) + ' left ' + roomId);

    return Promise.resolve(buildResponse({}));
}

module.exports = { execute: execute };
