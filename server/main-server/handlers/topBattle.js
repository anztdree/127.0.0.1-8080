'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'join':
            // TODO: Join top battle tournament
            // REQ: -
            // RES: tournament info, queue status
            logger.info('TOPBATTLE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'setTeam':
            // TODO: Set top battle team formation
            // REQ: team lineup (hero positions)
            // RES: updated team data
            logger.info('TOPBATTLE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'startBattle':
            // TODO: Start top battle match
            // REQ: opponentId, team lineup
            // RES: battle result
            logger.info('TOPBATTLE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRecord':
            // TODO: Get top battle match records
            // REQ: -
            // RES: match history, wins, losses
            logger.info('TOPBATTLE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getDailyReward':
            // TODO: Claim top battle daily reward
            // REQ: -
            // RES: reward items
            logger.info('TOPBATTLE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRank':
            // TODO: Get top battle leaderboard
            // REQ: page, pageSize
            // RES: rank list
            logger.info('TOPBATTLE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'buy':
            // TODO: Purchase top battle entry or attempt
            // REQ: count
            // RES: updated resources, remaining attempts
            logger.info('TOPBATTLE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('TOPBATTLE', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
