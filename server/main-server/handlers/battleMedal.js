'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'get':
            // TODO: Get battle medal collection info
            // REQ: -
            // RES: medal list, progress
            logger.info('BATTLEMEDAL', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'claim':
            // TODO: Claim battle medal reward
            // REQ: medalId
            // RES: reward items
            logger.info('BATTLEMEDAL', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'compose':
            // TODO: Compose a battle medal from fragments
            // REQ: medalId
            // RES: composed medal data
            logger.info('BATTLEMEDAL', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('BATTLEMEDAL', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
