'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'setTeam':
            // TODO: Set hangup team formation
            // REQ: team lineup (hero positions)
            // RES: updated team data
            logger.info('HANGUP', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'startHangup':
            // TODO: Start AFK/hangup farming
            // REQ: -
            // RES: hangup started, timer info
            logger.info('HANGUP', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getHangupReward':
            // TODO: Claim accumulated hangup rewards
            // REQ: -
            // RES: reward items, exp, gold
            logger.info('HANGUP', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRecord':
            // TODO: Get hangup progress record
            // REQ: -
            // RES: hangup duration, rewards pending
            logger.info('HANGUP', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('HANGUP', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
