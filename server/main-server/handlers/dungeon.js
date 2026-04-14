'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'startBattle':
            // TODO: Start dungeon battle
            // REQ: dungeonId, stageId, team lineup
            // RES: battle result, rewards
            logger.info('DUNGEON', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRecord':
            // TODO: Get dungeon clear records
            // REQ: -
            // RES: cleared stages, star ratings
            logger.info('DUNGEON', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getDailyReward':
            // TODO: Claim dungeon daily reward
            // REQ: -
            // RES: reward items
            logger.info('DUNGEON', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'sweep':
            // TODO: Quick sweep cleared dungeon stage
            // REQ: dungeonId, stageId, sweepCount
            // RES: sweep rewards
            logger.info('DUNGEON', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'buy':
            // TODO: Purchase dungeon attempt
            // REQ: count
            // RES: updated resources, remaining attempts
            logger.info('DUNGEON', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'reset':
            // TODO: Reset dungeon progress or daily attempts
            // REQ: -
            // RES: reset confirmation
            logger.info('DUNGEON', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('DUNGEON', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
