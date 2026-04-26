/**
 * chat-server/handlers/joinRoom.js — Join Chat Room
 *
 * Client call (line 114613):
 *   ts.chatJoinRequest(roomId, callback)
 *   → ts.processHandlerWithChat({
 *       type:'chat', action:'joinRoom',
 *       userId: UserInfoSingleton.getInstance().userId,
 *       roomId: e,
 *       version:'1.0'
 *     }, callback)
 *
 * Client callback (line 114619):
 *   e._record → array of recent messages
 *   chatJoinRecord(e) → ts.chatNotifyData() per message
 *
 * Response: { _record: [message1, message2, ...] }
 */

var rooms = require('../rooms');

function execute(data, socket, ctx) {
    var db = ctx.db;
    var buildResponse = ctx.buildResponse;
    var userId = (data.userId || '').trim();
    var roomId = (data.roomId || '').trim();

    if (!userId || !roomId) {
        return Promise.resolve(ctx.buildErrorResponse(1));
    }

    // Join room
    rooms.join(roomId, socket.id, userId);

    // Load user info untuk setiap message
    var messages = rooms.getMessages(roomId, 0, 50);

    if (messages.length === 0) {
        // Load dari DB
        return db.query(
            'SELECT cl.user_id, cl.content, cl.kind, UNIX_TIMESTAMP(cl.created_at)*1000 as _time, u.nick_name as _name, u.head_image as _image, u.head_box as _headBoxId FROM chat_logs cl LEFT JOIN users u ON cl.user_id = u.user_id WHERE cl.room_id = ? ORDER BY cl.created_at DESC LIMIT 50',
            [roomId]
        ).then(function (rows) {
            var record = rows.reverse().map(function (r) {
                return {
                    _time: r._time,
                    _kind: r.kind,
                    _name: r._name || r.user_id,
                    _content: r.content,
                    _id: r.user_id,
                    _image: r._image || '',
                    _param: null,
                    _type: 0,
                    _headEffect: 0,
                    _headBoxId: r._headBoxId || 0,
                    _oriServerId: '',
                    _serverId: '',
                    _showMain: false
                };
            });
            return buildResponse({ _record: record });
        });
    }

    return Promise.resolve(buildResponse({ _record: messages }));
}

module.exports = { execute: execute };
