'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'join':
            // TODO: Join guild war
            // REQ: -
            // RES: war participation status
            logger.info('WAR', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getWarInfo':
            // TODO: Get current war information
            // REQ: -
            // RES: war details, opponent guild, scores
            logger.info('WAR', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'attack':
            // TODO: Attack enemy guild target in war
            // REQ: targetId, team lineup
            // RES: battle result, war points
            logger.info('WAR', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRecord':
            // TODO: Get guild war history records
            // REQ: -
            // RES: war history, participation records
            logger.info('WAR', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getDailyReward':
            // TODO: Claim guild war daily reward
            // REQ: -
            // RES: reward items
            logger.info('WAR', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRank':
            // TODO: Get guild war leaderboard
            // REQ: page, pageSize
            // RES: guild war rank list
            logger.info('WAR', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('WAR', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
