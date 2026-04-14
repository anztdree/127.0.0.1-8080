'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'startBattle':
            // TODO: Start expedition battle stage
            // REQ: stageId, team lineup
            // RES: battle result, rewards
            logger.info('EXPEDITION', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRecord':
            // TODO: Get expedition progress record
            // REQ: -
            // RES: expedition stage progress, rewards
            logger.info('EXPEDITION', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getDailyReward':
            // TODO: Claim expedition daily reward
            // REQ: -
            // RES: reward items
            logger.info('EXPEDITION', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'reset':
            // TODO: Reset expedition progress
            // REQ: -
            // RES: reset confirmation
            logger.info('EXPEDITION', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'reward':
            // TODO: Claim expedition stage reward
            // REQ: stageId
            // RES: reward items
            logger.info('EXPEDITION', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('EXPEDITION', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
