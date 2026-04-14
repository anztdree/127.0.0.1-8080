'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'startBattle':
            // TODO: Start maha (ultimate) battle
            // REQ: stageId, team lineup
            // RES: battle result, rewards
            logger.info('MAHA', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRecord':
            // TODO: Get maha battle progress record
            // REQ: -
            // RES: cleared stages, scores
            logger.info('MAHA', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getDailyReward':
            // TODO: Claim maha daily reward
            // REQ: -
            // RES: reward items
            logger.info('MAHA', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'buy':
            // TODO: Purchase maha battle attempt
            // REQ: count
            // RES: updated resources, remaining attempts
            logger.info('MAHA', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRank':
            // TODO: Get maha leaderboard
            // REQ: page, pageSize
            // RES: rank list
            logger.info('MAHA', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('MAHA', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
