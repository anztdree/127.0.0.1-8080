'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'startTraining':
            // TODO: Start team training session
            // REQ: team lineup, training type
            // RES: training started, timer info
            logger.info('TEAMTRAINING', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getTrainingReward':
            // TODO: Claim team training rewards
            // REQ: -
            // RES: training rewards, exp, items
            logger.info('TEAMTRAINING', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRecord':
            // TODO: Get team training records
            // REQ: -
            // RES: training history, progress
            logger.info('TEAMTRAINING', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'buy':
            // TODO: Purchase team training slot or speedup
            // REQ: buyType
            // RES: updated resources
            logger.info('TEAMTRAINING', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('TEAMTRAINING', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
