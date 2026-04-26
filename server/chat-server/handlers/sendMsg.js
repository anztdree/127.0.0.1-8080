/**
 * chat-server/handlers/sendMsg.js — Send Message
 *
 * Client call (line 83836):
 *   ts.processHandlerWithChat({
 *     type:'chat', action:'sendMsg',
 *     userId, kind, content, msgType, param, roomId, version:'1.0'
 *   }, callback)
 *
 * Room mapping by kind (line 83835):
 *   kind=2 (WORLD)  → worldRoomId
 *   kind=3 (GUILD)  → guildRoomId
 *   kind=5 (WORLD_TEAM) → teamDungeonChatRoom
 *   kind=6 (TEAM)   → teamChatRoomId
 *
 * Client callback (line 83846):
 *   e._time → server timestamp untuk local echo
 *
 * Error: 36001 = chat forbidden/cooldown
 *
 * Notify push ke room members: {ret:'SUCCESS', data:LZString({_msg: msgObj}), compress:true}
 *
 * Message fields (ChatDataBaseClass.getData line 92098):
 *   _time, _kind, _name, _content, _id, _image, _param, _type,
 *   _headEffect, _headBoxId, _oriServerId, _serverId, _showMain
 */

var rooms = require('../rooms');

function execute(data, socket, ctx) {
    var db = ctx.db;
    var buildResponse = ctx.buildResponse;
    var io = ctx.io;

    var userId = (data.userId || '').trim();
    var kind = data.kind || 2;
    var content = (data.content || '').trim();
    var msgType = data.msgType || 0;
    var param = data.param || null;
    var roomId = (data.roomId || '').trim();

    if (!userId || !roomId || !content) {
        return Promise.resolve(ctx.buildErrorResponse(1));
    }

    return db.queryOne(
        'SELECT user_id, nick_name, head_image, head_box, level FROM users WHERE user_id = ?',
        [userId]
    ).then(function (user) {
        var nickName = (user && user.nick_name) || userId;
        var headImage = (user && user.head_image) || '';
        var headBoxId = (user && user.head_box) || 0;
        var now = Date.now();

        // Build message object
        var msg = {
            _time: now,
            _kind: kind,
            _name: nickName,
            _content: content,
            _id: userId,
            _image: headImage,
            _param: param,
            _type: msgType,
            _headEffect: 0,
            _headBoxId: headBoxId,
            _oriServerId: String(socket._chatServerId || ''),
            _serverId: String(socket._chatServerId || ''),
            _showMain: false
        };

        // Save to room memory
        rooms.addMessage(roomId, msg);

        // Save to DB (async, don't block)
        db.query(
            'INSERT INTO chat_logs (room_id, user_id, content, kind, created_at) VALUES (?, ?, ?, ?, FROM_UNIXTIME(?/1000))',
            [roomId, userId, content, kind, now]
        ).catch(function (err) {
            console.error('[sendMsg] DB save error:', err.message);
        });

        // Broadcast ke room (kecuali sender)
        var count = rooms.broadcast(io, roomId, msg, socket.id);

        console.log('[sendMsg] ' + userId + ' → ' + roomId + ' kind=' + kind + ' broadcast=' + count);

        // Response: client butuh _time untuk local echo
        return buildResponse({ _time: now });
    });
}

module.exports = { execute: execute };
