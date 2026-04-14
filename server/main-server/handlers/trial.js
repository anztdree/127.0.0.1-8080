'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'startBattle':
            // TODO: Start trial battle stage
            // REQ: stageId, team lineup
            // RES: battle result, rewards
            logger.info('TRIAL', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRecord':
            // TODO: Get trial clear records
            // REQ: -
            // RES: cleared stages, scores
            logger.info('TRIAL', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'sweep':
            // TODO: Quick sweep cleared trial stage
            // REQ: stageId, sweepCount
            // RES: sweep rewards
            logger.info('TRIAL', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'reset':
            // TODO: Reset trial progress or attempts
            // REQ: -
            // RES: reset confirmation
            logger.info('TRIAL', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getDailyReward':
            // TODO: Claim trial daily reward
            // REQ: -
            // RES: reward items
            logger.info('TRIAL', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('TRIAL', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
