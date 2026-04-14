'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'join':
            // TODO: Join ball war matchmaking
            // REQ: -
            // RES: match result or queue status
            logger.info('BALLWAR', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'setTeam':
            // TODO: Set ball war team formation
            // REQ: team lineup (hero positions)
            // RES: updated team data
            logger.info('BALLWAR', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'startBattle':
            // TODO: Start ball war battle
            // REQ: opponentId or battle config
            // RES: battle result data
            logger.info('BALLWAR', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRecord':
            // TODO: Get ball war personal record
            // REQ: -
            // RES: ball war stats, score, history
            logger.info('BALLWAR', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getDailyReward':
            // TODO: Claim ball war daily reward
            // REQ: -
            // RES: reward items
            logger.info('BALLWAR', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRank':
            // TODO: Get ball war leaderboard
            // REQ: page, pageSize
            // RES: rank list
            logger.info('BALLWAR', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'buy':
            // TODO: Purchase ball war entry or battle attempt
            // REQ: buyType, count
            // RES: updated resources, remaining buy count
            logger.info('BALLWAR', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('BALLWAR', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
