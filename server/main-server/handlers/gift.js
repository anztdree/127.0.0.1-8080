'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'getGiftList':
            // TODO: Get available gift/reward list
            // REQ: -
            // RES: gift list with claim status
            logger.info('GIFT', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'claim':
            // TODO: Claim a specific gift reward
            // REQ: giftId
            // RES: reward items
            logger.info('GIFT', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getCDKeyReward':
            // TODO: Redeem CD key / gift code for reward
            // REQ: cdKey
            // RES: reward items
            logger.info('GIFT', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('GIFT', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
