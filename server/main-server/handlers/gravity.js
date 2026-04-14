'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'startBattle':
            // TODO: Start gravity dungeon battle
            // REQ: stageId, team lineup
            // RES: battle result, rewards
            logger.info('GRAVITY', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRecord':
            // TODO: Get gravity dungeon progress record
            // REQ: -
            // RES: cleared stages, scores
            logger.info('GRAVITY', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getDailyReward':
            // TODO: Claim gravity dungeon daily reward
            // REQ: -
            // RES: reward items
            logger.info('GRAVITY', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'buy':
            // TODO: Purchase gravity dungeon attempt
            // REQ: count
            // RES: updated resources, remaining attempts
            logger.info('GRAVITY', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('GRAVITY', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
