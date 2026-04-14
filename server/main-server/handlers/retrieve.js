'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'getRetrieveList':
            // TODO: Get list of items available for retrieval
            // REQ: -
            // RES: retrievable items list
            logger.info('RETRIEVE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'retrieve':
            // TODO: Retrieve a specific item back to inventory
            // REQ: retrieveId
            // RES: retrieved item, updated inventory
            logger.info('RETRIEVE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('RETRIEVE', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
