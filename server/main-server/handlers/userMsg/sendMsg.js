/**
 * handlers/userMsg/sendMsg.js
 *
 * Client request (line 186847-186853, 187130-187138):
 *   type: 'userMsg', action: 'sendMsg', userId, friendId, msg, version: '1.0'
 *
 * Client response handler (line 186854-186862):
 *   e.friendId           → used as key for setMessageDetalListByFriendId + addSimpleOrChangeSimple
 *   e._selfMsg           → { _time, _isSelf: true, _context }
 *     → setMessageDetalListByFriendId(e.friendId, [e._selfMsg])  (line 186857)
 *     → addSimpleOrChangeSimple(e.friendId, true, e._selfMsg, userInfo)  (line 186858)
 *
 * Push notification to receiver (client line 114053-114060):
 *   { action: 'userMessage', friendId, msg: { _time, _context }, userInfo: { _userId, _nickName, ... } }
 *   Delivered via socket.emit('Notify', { ret: 'SUCCESS', data: LZString(...), compress: true })
 *   Client: addSimpleOrChangeSimple(friendId, false, msg, userInfo)  → isSelf=false
 */

var db = require('../../db');

module.exports = {
    execute: function (data, socket, ctx) {
        return new Promise(function (resolve) {
            try {
                var userId = data.userId;
                var friendId = data.friendId;
                var msg = data.msg || '';
                if (!userId || !friendId) return resolve(ctx.buildErrorResponse(1));

                var now = Date.now();

                // Insert message into DB
                db.dbRun(
                    'INSERT INTO friend_messages (senderId, receiverId, content, time) VALUES (?, ?, ?, ?)',
                    [userId, friendId, msg, now]
                );

                // Build _selfMsg for sender's response (client needs _time, _isSelf, _context)
                var selfMsg = {
                    _time: now,
                    _isSelf: true,
                    _context: msg
                };

                // Response to sender: { friendId, _selfMsg }
                resolve(ctx.buildResponse({
                    friendId: friendId,
                    _selfMsg: selfMsg
                }));

                // Push notification to receiver if online
                // Client expects: { action: 'userMessage', friendId, msg, userInfo }
                // userInfo must have _-prefixed keys (UserSimpleInfo.deserialize strips the _)
                var senderUser = db.getUser(userId);
                if (senderUser && ctx.notifyUser) {
                    var pushed = ctx.notifyUser(friendId, {
                        action: 'userMessage',
                        friendId: userId,
                        msg: {
                            _time: now,
                            _context: msg
                        },
                        userInfo: {
                            _serverId: parseInt(senderUser.oriServerId) || parseInt(ctx.config.serverId) || 1,
                            _oriServerId: parseInt(senderUser.oriServerId) || parseInt(ctx.config.serverId) || 1,
                            _userId: userId,
                            _nickName: senderUser.nickName || '',
                            _headImage: senderUser.headImage || 'hero_icon_1205',
                            _headEffect: 0,
                            _headBox: 0,
                            _guildName: '',
                            _level: senderUser.level || 1,
                            _vip: senderUser.vipLevel || 0,
                            _totalPower: 0
                        }
                    });
                    if (pushed) {
                        console.log('  [sendMsg] Notify → user ' + friendId);
                    }
                }

            } catch (err) {
                console.error('  [sendMsg] Error: ' + err.message);
                console.error('  [sendMsg] Stack: ' + err.stack);
                resolve(ctx.buildErrorResponse(1));
            }
        });
    }
};
