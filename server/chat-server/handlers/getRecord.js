/**
 * chat-server/handlers/getRecord.js — Get Chat History (Pagination)
 *
 * Client call (line 91699):
 *   ts.processHandlerWithChat({
 *     type:'chat', action:'getRecord',
 *     userId: o,
 *     roomId: n,
 *     startTime: t.teamDungeonInfoStartTime,
 *     version:'1.0'
 *   }, callback)
 *
 * Pagination: startTime = timestamp pesan terakhir yang dilihat.
 * Server kirim pesan sebelum startTime.
 *
 * Client callback (line 91706):
 *   t._record → iterate, ChatDataBaseClass.getData(), ts.chatNotifyData()
 *
 * Response: { _record: [message1, message2, ...] }
 */

var rooms = require('../rooms');

function execute(data, socket, ctx) {
    var db = ctx.db;
    var buildResponse = ctx.buildResponse;
    var userId = (data.userId || '').trim();
    var roomId = (data.roomId || '').trim();
    var startTime = data.startTime || 0;

    if (!roomId) {
        return Promise.resolve(ctx.buildErrorResponse(1));
    }

    var startTimeSec = startTime > 0 ? (startTime / 1000) : 0;

    return db.query(
        'SELECT cl.user_id, cl.content, cl.kind, UNIX_TIMESTAMP(cl.created_at)*1000 as _time, u.nick_name as _name, u.head_image as _image, u.head_box as _headBoxId FROM chat_logs cl LEFT JOIN users u ON cl.user_id = u.user_id WHERE cl.room_id = ? AND UNIX_TIMESTAMP(cl.created_at) < ? ORDER BY cl.created_at DESC LIMIT 50',
        [roomId, startTimeSec]
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

module.exports = { execute: execute };
