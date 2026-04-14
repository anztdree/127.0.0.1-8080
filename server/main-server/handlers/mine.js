'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'dig':
            // TODO: Dig in mine for resources
            // REQ: mineId
            // RES: dig result, found resources
            logger.info('MINE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRecord':
            // TODO: Get mine dig records
            // REQ: -
            // RES: dig history, total resources
            logger.info('MINE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getDailyReward':
            // TODO: Claim mine daily reward
            // REQ: -
            // RES: reward items
            logger.info('MINE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'buy':
            // TODO: Purchase mine dig attempt
            // REQ: count
            // RES: updated resources, remaining attempts
            logger.info('MINE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'reset':
            // TODO: Reset mine daily progress
            // REQ: -
            // RES: reset confirmation
            logger.info('MINE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('MINE', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
