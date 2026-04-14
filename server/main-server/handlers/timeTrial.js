'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'startBattle':
            // TODO: Start time trial battle stage
            // REQ: stageId, team lineup
            // RES: battle result, completion time
            logger.info('TIMETRIAL', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRecord':
            // TODO: Get time trial records and best times
            // REQ: -
            // RES: stage records, best times
            logger.info('TIMETRIAL', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getDailyReward':
            // TODO: Claim time trial daily reward
            // REQ: -
            // RES: reward items
            logger.info('TIMETRIAL', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'buy':
            // TODO: Purchase time trial attempt
            // REQ: count
            // RES: updated resources, remaining attempts
            logger.info('TIMETRIAL', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('TIMETRIAL', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
