'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'startBattle':
            // TODO: Start a PVE or PVP battle
            // REQ: battleType, enemyId, team lineup
            // RES: battle result, rewards
            logger.info('BATTLE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getBattleRecord':
            // TODO: Get detailed battle replay record
            // REQ: recordId
            // RES: battle replay data
            logger.info('BATTLE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'battleResult':
            // TODO: Report and confirm battle result
            // REQ: battleId, result data
            // RES: confirmed rewards
            logger.info('BATTLE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getDailyReward':
            // TODO: Claim battle daily reward
            // REQ: -
            // RES: reward items
            logger.info('BATTLE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRecord':
            // TODO: Get battle history records
            // REQ: page, pageSize
            // RES: battle record list
            logger.info('BATTLE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('BATTLE', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
