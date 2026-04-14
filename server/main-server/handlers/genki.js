'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'get':
            // TODO: Get genki (energy/stamina) info
            // REQ: -
            // RES: current genki, max genki, regen timer
            logger.info('GENKI', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'upgrade':
            // TODO: Upgrade genki capacity/limit
            // REQ: -
            // RES: new max genki
            logger.info('GENKI', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'reset':
            // TODO: Reset genki (buy refill)
            // REQ: -
            // RES: updated genki
            logger.info('GENKI', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('GENKI', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
