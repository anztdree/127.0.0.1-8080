'use strict';

var RH = require('../../shared/responseHelper');

/**
 * User Message Handler
 * Port 8001 — Main Server
 *
 * Actions: 5 total
 * WRITE: 3 | READ: 2
 *
 * Source: main.min.js client analysis
 */

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        // === WRITE ACTIONS ===

        case 'delFriendMsg':
            // TODO: WRITE — Delete a friend-to-friend private message from the user's mailbox
            // REQ: msgId
            // RES: _changeInfo._mailList (message removed)
            callback(RH.success({}));
            break;

        case 'readMsg':
            // TODO: WRITE — Mark a message as read (update read status flag)
            // REQ: msgId
            // RES: _changeInfo._mailList (message marked as read),
            //      _changeInfo._redPointData (mail red dot cleared)
            callback(RH.success({}));
            break;

        case 'sendMsg':
            // TODO: WRITE — Send a private message to another player (friend-to-friend mail)
            // REQ: targetUserId, content, attachmentItems[] (optional)
            // RES: _changeInfo._mailList (sent message stored in outbox),
            //      _changeInfo._items (attachments deducted if any)
            callback(RH.success({}));
            break;

        // === READ ACTIONS ===

        case 'getMsg':
            // TODO: READ — Get the full content of a specific message
            // REQ: msgId
            // RES: _msgDetail { _msgId, _fromUserId, _fromName, _content, _timestamp,
            //                   _isRead, _hasAttachment, _attachmentItems[], _expireTime }
            callback(RH.success({}));
            break;

        case 'getMsgList':
            // TODO: READ — Get paginated list of the user's mailbox messages (system + friend)
            // REQ: pageIndex, pageSize, msgType (optional filter: system/friend/all)
            // RES: _msgList [{ _msgId, _fromUserId, _fromName, _title, _summary,
            //                 _timestamp, _isRead, _hasAttachment }],
            //      _totalMsg, _unreadCount
            callback(RH.success({}));
            break;

        default:
            console.warn('[USER_MSG] Unknown action: ' + action);
            callback(RH.success({}));
    }
}

module.exports = { handle: handle };
