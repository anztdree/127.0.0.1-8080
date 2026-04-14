'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'startTraining':
            // TODO: Start hero training session
            // REQ: heroId, slotId
            // RES: training started, timer info
            logger.info('TRAINING', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getTrainingReward':
            // TODO: Claim completed training rewards
            // REQ: heroId, slotId
            // RES: training rewards, exp gained
            logger.info('TRAINING', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRecord':
            // TODO: Get training history records
            // REQ: -
            // RES: training history, active sessions
            logger.info('TRAINING', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'buy':
            // TODO: Purchase training slot or speedup
            // REQ: buyType
            // RES: updated resources
            logger.info('TRAINING', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'reset':
            // TODO: Reset training progress
            // REQ: heroId, slotId
            // RES: reset confirmation
            logger.info('TRAINING', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('TRAINING', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
