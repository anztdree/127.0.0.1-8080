'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'getRechargeList':
            // TODO: Get available recharge/payment items list
            // REQ: -
            // RES: recharge product list with prices
            logger.info('RECHARGE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'recharge':
            // TODO: Process recharge/payment request
            // REQ: productId, paymentInfo
            // RES: payment order info
            logger.info('RECHARGE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRechargeReward':
            // TODO: Claim cumulative recharge reward
            // REQ: rewardId
            // RES: reward items
            logger.info('RECHARGE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('RECHARGE', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
