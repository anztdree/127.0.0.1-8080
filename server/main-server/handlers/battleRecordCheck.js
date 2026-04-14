'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'check':
            // TODO: Check battle record conditions
            // REQ: checkType, recordId
            // RES: check result, qualification status
            logger.info('BATTLERECORDCHECK', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'reward':
            // TODO: Claim battle record check reward
            // REQ: checkType, recordId
            // RES: reward items
            logger.info('BATTLERECORDCHECK', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('BATTLERECORDCHECK', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
