/**
 * handlers/userMsg/readMsg.js
 *
 * Client request (line 90619-90624, 186928-186933):
 *   type: 'userMsg', action: 'readMsg', userId, friendId, version: '1.0'
 *
 * Client response (line 90626, 186935):
 *   { _readTime: timestamp }
 *
 * Used by:
 *   - Opening friend message detail view (line 90619) — marks messages as read
 *   - Receiving userMessage push notification (line 186928) — marks incoming msg as read
 *
 * Client stores: MailInfoManager.setMessageReadWithFriendId(friendId, readTime)
 *   → updates messageFriendSimpleItemList[friendId].lastReadTime = readTime
 */

var db = require('../../db');

module.exports = {
    execute: function (data, socket, ctx) {
        return new Promise(function (resolve) {
            try {
                var userId = data.userId;
                var friendId = data.friendId;
                if (!userId || !friendId) return resolve(ctx.buildErrorResponse(1));

                var now = Date.now();

                // Upsert read time
                db.dbRun(
                    'INSERT OR REPLACE INTO friend_read_time (userId, friendId, readTime) VALUES (?, ?, ?)',
                    [userId, friendId, now]
                );

                resolve(ctx.buildResponse({ _readTime: now }));

            } catch (err) {
                console.error('  [readMsg] Error: ' + err.message);
                console.error('  [readMsg] Stack: ' + err.stack);
                resolve(ctx.buildErrorResponse(1));
            }
        });
    }
};
