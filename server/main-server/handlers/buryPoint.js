'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'get':
            // TODO: Get bury point dig site info
            // REQ: -
            // RES: bury point locations, status
            logger.info('BURYPOINT', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'dig':
            // TODO: Dig at a bury point for treasure
            // REQ: pointId
            // RES: dig result, found items
            logger.info('BURYPOINT', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'reward':
            // TODO: Claim bury point accumulated reward
            // REQ: pointId
            // RES: reward items
            logger.info('BURYPOINT', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('BURYPOINT', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
