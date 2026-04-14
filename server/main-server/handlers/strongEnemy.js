'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'startBattle':
            // TODO: Start strong enemy battle
            // REQ: enemyId, team lineup
            // RES: battle result, damage dealt
            logger.info('STRONGENEMY', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRecord':
            // TODO: Get strong enemy battle records
            // REQ: -
            // RES: battle history, highest damage
            logger.info('STRONGENEMY', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getDailyReward':
            // TODO: Claim strong enemy daily reward
            // REQ: -
            // RES: reward items
            logger.info('STRONGENEMY', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'buy':
            // TODO: Purchase strong enemy attack attempt
            // REQ: count
            // RES: updated resources, remaining attempts
            logger.info('STRONGENEMY', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'reset':
            // TODO: Reset strong enemy daily attempts
            // REQ: -
            // RES: reset confirmation
            logger.info('STRONGENEMY', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('STRONGENEMY', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
