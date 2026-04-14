'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'startBattle':
            // TODO: Start snake game battle stage
            // REQ: stageId, team lineup
            // RES: battle result, rewards
            logger.info('SNAKE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRecord':
            // TODO: Get snake game progress record
            // REQ: -
            // RES: cleared stages, scores
            logger.info('SNAKE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getDailyReward':
            // TODO: Claim snake game daily reward
            // REQ: -
            // RES: reward items
            logger.info('SNAKE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'sweep':
            // TODO: Quick sweep cleared snake game stage
            // REQ: stageId, sweepCount
            // RES: sweep rewards
            logger.info('SNAKE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'buy':
            // TODO: Purchase snake game attempt
            // REQ: count
            // RES: updated resources, remaining attempts
            logger.info('SNAKE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'reset':
            // TODO: Reset snake game progress or attempts
            // REQ: -
            // RES: reset confirmation
            logger.info('SNAKE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('SNAKE', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
