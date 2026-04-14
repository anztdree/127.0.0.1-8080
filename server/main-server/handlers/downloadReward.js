'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'claim':
            // TODO: Claim a download reward
            // REQ: rewardId
            // RES: reward items
            logger.info('DOWNLOADREWARD', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getList':
            // TODO: Get list of available download rewards
            // REQ: -
            // RES: reward list with claim status
            logger.info('DOWNLOADREWARD', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('DOWNLOADREWARD', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
