'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'getTaskList':
            // TODO: Get main task/achievement list
            // REQ: -
            // RES: task list with progress and rewards
            logger.info('TASK', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'claimReward':
            // TODO: Claim task completion reward
            // REQ: taskId
            // RES: reward items
            logger.info('TASK', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getDailyTask':
            // TODO: Get daily task list
            // REQ: -
            // RES: daily task list with progress
            logger.info('TASK', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('TASK', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
