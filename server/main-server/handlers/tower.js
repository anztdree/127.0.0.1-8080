'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'startBattle':
            // TODO: Start tower floor battle
            // REQ: floorId, team lineup
            // RES: battle result, rewards
            logger.info('TOWER', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRecord':
            // TODO: Get tower climb records
            // REQ: -
            // RES: highest floor, floor history
            logger.info('TOWER', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'sweep':
            // TODO: Quick sweep cleared tower floors
            // REQ: sweepCount
            // RES: sweep rewards
            logger.info('TOWER', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'reset':
            // TODO: Reset tower progress
            // REQ: -
            // RES: reset confirmation
            logger.info('TOWER', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getDailyReward':
            // TODO: Claim tower daily reward
            // REQ: -
            // RES: reward items
            logger.info('TOWER', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'buy':
            // TODO: Purchase tower battle attempt
            // REQ: count
            // RES: updated resources, remaining attempts
            logger.info('TOWER', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('TOWER', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
