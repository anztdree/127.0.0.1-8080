'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'getRank':
            // TODO: Get leaderboard ranking data
            // REQ: rankType, page, pageSize
            // RES: rank list with player info
            logger.info('RANK', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getMyRank':
            // TODO: Get player's own ranking info
            // REQ: rankType
            // RES: my rank, score, percentile
            logger.info('RANK', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRankReward':
            // TODO: Claim ranking season reward
            // REQ: rankType
            // RES: reward items based on rank
            logger.info('RANK', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('RANK', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
