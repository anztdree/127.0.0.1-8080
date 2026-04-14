'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'buy':
            // TODO: Purchase item from market
            // REQ: goodsId, count
            // RES: purchased items, updated currency
            logger.info('MARKET', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'refresh':
            // TODO: Refresh market goods list
            // REQ: -
            // RES: new goods list
            logger.info('MARKET', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getShopList':
            // TODO: Get current market shop list
            // REQ: -
            // RES: shop goods list with prices
            logger.info('MARKET', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getDailyDiscount':
            // TODO: Get daily discount items
            // REQ: -
            // RES: discount goods list
            logger.info('MARKET', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('MARKET', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
