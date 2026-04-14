'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'useItem':
            // TODO: Use a single item from backpack
            // REQ: itemId, count
            // RES: item effect result, updated inventory
            logger.info('BACKPACK', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'sellItem':
            // TODO: Sell a single item from backpack
            // REQ: itemId, count
            // RES: gold received, updated inventory
            logger.info('BACKPACK', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'composeItem':
            // TODO: Compose/craft an item from materials
            // REQ: targetItemId, material list
            // RES: composed item, updated inventory
            logger.info('BACKPACK', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'batchUseItem':
            // TODO: Use multiple items at once from backpack
            // REQ: items array [{itemId, count}]
            // RES: effects result, updated inventory
            logger.info('BACKPACK', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'batchSellItem':
            // TODO: Sell multiple items at once from backpack
            // REQ: items array [{itemId, count}]
            // RES: gold received, updated inventory
            logger.info('BACKPACK', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('BACKPACK', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
