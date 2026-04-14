'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'checkin':
            // TODO: Perform daily check-in
            // REQ: -
            // RES: check-in result, streak info
            logger.info('CHECKIN', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getReward':
            // TODO: Claim check-in milestone reward
            // REQ: rewardId
            // RES: reward items
            logger.info('CHECKIN', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getSignData':
            // TODO: Get check-in sign data and status
            // REQ: -
            // RES: sign calendar, checked days, streak
            logger.info('CHECKIN', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('CHECKIN', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
