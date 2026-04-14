'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'getMailList':
            // TODO: Get player mail list
            // REQ: page, pageSize
            // RES: mail list with read/claim status
            logger.info('MAIL', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'readMail':
            // TODO: Mark a mail as read
            // REQ: mailId
            // RES: updated mail status
            logger.info('MAIL', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'claimAttachment':
            // TODO: Claim attachment from a specific mail
            // REQ: mailId
            // RES: claimed items
            logger.info('MAIL', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'claimAll':
            // TODO: Claim attachments from all mails at once
            // REQ: -
            // RES: claimed items list
            logger.info('MAIL', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'deleteMail':
            // TODO: Delete a mail
            // REQ: mailId
            // RES: deletion confirmation
            logger.info('MAIL', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('MAIL', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
