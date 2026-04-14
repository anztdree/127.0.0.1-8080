'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'accept':
            // TODO: Accept an entrust/commission task
            // REQ: taskId
            // RES: accepted task data
            logger.info('ENTRUST', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'complete':
            // TODO: Complete an accepted entrust task
            // REQ: taskId
            // RES: completion rewards
            logger.info('ENTRUST', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getTaskList':
            // TODO: Get available entrust task list
            // REQ: -
            // RES: task list with requirements and rewards
            logger.info('ENTRUST', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'refresh':
            // TODO: Refresh entrust task list
            // REQ: -
            // RES: new task list
            logger.info('ENTRUST', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'reward':
            // TODO: Claim entrust task reward
            // REQ: taskId
            // RES: reward items
            logger.info('ENTRUST', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('ENTRUST', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
