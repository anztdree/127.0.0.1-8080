/**
 * handlers/userMsg/delFriendMsg.js
 *
 * Client request (line 186907-186911):
 *   type: 'userMsg', action: 'delFriendMsg', userId, friendId, version: '1.0'
 *
 * Client response handler (line 186912-186914):
 *   t.friendId → used as key for MailInfoManager.clearOneFriendMessage(t.friendId)
 *   clearOneFriendMessage deletes both messageFriendAll[friendId] and messageFriendSimpleItemList[friendId]
 */

var db = require('../../db');

module.exports = {
    execute: function (data, socket, ctx) {
        return new Promise(function (resolve) {
            try {
                var userId = data.userId;
                var friendId = data.friendId;
                if (!userId || !friendId) return resolve(ctx.buildErrorResponse(1));

                // Delete all messages between the two users
                db.dbRun(
                    'DELETE FROM friend_messages WHERE (senderId = ? AND receiverId = ?) OR (senderId = ? AND receiverId = ?)',
                    [userId, friendId, friendId, userId]
                );

                // Clean up read time
                db.dbRun(
                    'DELETE FROM friend_read_time WHERE userId = ? AND friendId = ?',
                    [userId, friendId]
                );

                // Response MUST include friendId — client uses it as key (line 186913)
                resolve(ctx.buildResponse({
                    friendId: friendId
                }));

            } catch (err) {
                console.error('  [delFriendMsg] Error: ' + err.message);
                console.error('  [delFriendMsg] Stack: ' + err.stack);
                resolve(ctx.buildErrorResponse(1));
            }
        });
    }
};
