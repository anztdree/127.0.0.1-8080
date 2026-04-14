'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'activate':
            // TODO: Activate a resonance node
            // REQ: resonanceId
            // RES: activated resonance, stat bonuses
            logger.info('RESONANCE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getResonanceInfo':
            // TODO: Get resonance system info and status
            // REQ: -
            // RES: resonance nodes, activation status, bonuses
            logger.info('RESONANCE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getResonanceReward':
            // TODO: Claim resonance milestone reward
            // REQ: resonanceId
            // RES: reward items
            logger.info('RESONANCE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('RESONANCE', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
