/**
 * handlers/userMsg/getMsg.js
 *
 * Client request (line 90593-90599, 186776-186782):
 *   type: 'userMsg', action: 'getMsg', userId, friendId, time, version: '1.0'
 *
 * Client response (line 90601, 186785):
 *   { _msgs: [{ _time, _isSelf, _context }] }
 *
 * Used by:
 *   - Opening friend message detail view (line 90593)
 *   - Scrolling to load more messages (line 186776, uses data.maxOldTime as time threshold)
 *
 * _msgs is concatenated into messageFriendAll[friendId] via setMessageDetalListByFriendId
 */

var db = require('../../db');

module.exports = {
    execute: function (data, socket, ctx) {
        return new Promise(function (resolve) {
            try {
                var userId = data.userId;
                var friendId = data.friendId;
                if (!userId || !friendId) return resolve(ctx.buildErrorResponse(1));

                var time = data.time || 0;
                var msgs = db.dbAll(
                    'SELECT * FROM friend_messages WHERE ((senderId = ? AND receiverId = ?) OR (senderId = ? AND receiverId = ?)) AND time > ? ORDER BY time ASC',
                    [userId, friendId, friendId, userId, time]
                );

                var _msgs = [];
                for (var i = 0; i < msgs.length; i++) {
                    _msgs.push({
                        _time: msgs[i].time,
                        _isSelf: msgs[i].senderId === userId,
                        _context: msgs[i].content || ''
                    });
                }

                resolve(ctx.buildResponse({ _msgs: _msgs }));

            } catch (err) {
                console.error('  [getMsg] Error: ' + err.message);
                console.error('  [getMsg] Stack: ' + err.stack);
                resolve(ctx.buildResponse({ _msgs: [] }));
            }
        });
    }
};
