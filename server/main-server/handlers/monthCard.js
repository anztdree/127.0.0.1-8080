'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'buy':
            // TODO: Purchase monthly card
            // REQ: cardId
            // RES: purchased card, activated status
            logger.info('MONTHCARD', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getReward':
            // TODO: Claim monthly card daily reward
            // REQ: cardId
            // RES: reward items
            logger.info('MONTHCARD', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getInfo':
            // TODO: Get monthly card info and status
            // REQ: -
            // RES: card list, active status, days remaining
            logger.info('MONTHCARD', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('MONTHCARD', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
