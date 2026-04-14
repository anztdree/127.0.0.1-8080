'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'attack':
            // TODO: Attack the boss in competition
            // REQ: bossId, team lineup
            // RES: battle result, damage dealt
            logger.info('BOSSCOMPETITION', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRank':
            // TODO: Get boss competition leaderboard
            // REQ: page, pageSize
            // RES: rank list with damage scores
            logger.info('BOSSCOMPETITION', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getDailyReward':
            // TODO: Claim boss competition daily reward
            // REQ: -
            // RES: reward items
            logger.info('BOSSCOMPETITION', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'buy':
            // TODO: Purchase boss competition attack attempt
            // REQ: count
            // RES: updated resources, remaining attempts
            logger.info('BOSSCOMPETITION', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRecord':
            // TODO: Get boss competition personal record
            // REQ: -
            // RES: attack history, damage records
            logger.info('BOSSCOMPETITION', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('BOSSCOMPETITION', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
