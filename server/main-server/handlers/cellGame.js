'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'setTeam':
            // TODO: Set cell game team formation
            // REQ: team lineup (hero positions)
            // RES: updated team data
            logger.info('CELLGAME', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'startBattle':
            // TODO: Start cell game battle
            // REQ: stageId or level
            // RES: battle result, rewards
            logger.info('CELLGAME', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRecord':
            // TODO: Get cell game progress record
            // REQ: -
            // RES: highest level, scores
            logger.info('CELLGAME', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getDailyReward':
            // TODO: Claim cell game daily reward
            // REQ: -
            // RES: reward items
            logger.info('CELLGAME', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'buy':
            // TODO: Purchase cell game attempt
            // REQ: count
            // RES: updated resources, remaining attempts
            logger.info('CELLGAME', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('CELLGAME', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
