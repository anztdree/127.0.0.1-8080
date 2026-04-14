'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'getUserMsgList':
        case 'getMsgList':
            // Get user system message list
            // REQ: page, pageSize
            // RES: _userMsgList array
            logger.info('USERMSG', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({ _userMsgList: [] }));
            break;

        case 'readUserMsg':
            // TODO: Mark a user message as read
            // REQ: msgId
            // RES: updated read status
            logger.info('USERMSG', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('USERMSG', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
