'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'buy':
            // TODO: Purchase arena entry or battle attempt
            // REQ: buyType, count
            // RES: updated resources, remaining buy count
            logger.info('ARENA', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getBattleRecord':
            // TODO: Get arena battle history records
            // REQ: page, pageSize
            // RES: battle record list
            logger.info('ARENA', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getDailyReward':
            // TODO: Claim daily arena ranking reward
            // REQ: -
            // RES: reward items
            logger.info('ARENA', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRank':
            // TODO: Get arena leaderboard ranking data
            // REQ: page, pageSize
            // RES: rank list with player info
            logger.info('ARENA', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRecord':
            // TODO: Get personal arena record/score
            // REQ: -
            // RES: arena score, rank, wins, losses
            logger.info('ARENA', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'join':
            // TODO: Join arena matchmaking queue
            // REQ: -
            // RES: match result or queue status
            logger.info('ARENA', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'select':
            // TODO: Select arena opponent or season rewards
            // REQ: targetId or selection info
            // RES: selection result
            logger.info('ARENA', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'setTeam':
            // TODO: Set arena defense team formation
            // REQ: team lineup (hero positions)
            // RES: updated team data
            logger.info('ARENA', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'startBattle':
            // TODO: Start arena battle against opponent
            // REQ: opponentId
            // RES: battle result data
            logger.info('ARENA', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'topAward':
            // TODO: Claim top rank season award
            // REQ: -
            // RES: reward items list
            logger.info('ARENA', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('ARENA', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
