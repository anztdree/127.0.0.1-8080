'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'buy':
            // TODO: Purchase item from shop
            // REQ: goodsId, count
            // RES: purchased items, updated currency
            logger.info('SHOP', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'refresh':
            // TODO: Refresh shop goods list
            // REQ: -
            // RES: new goods list, refresh count
            logger.info('SHOP', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getShopList':
            // TODO: Get current shop goods list
            // REQ: -
            // RES: shop goods with prices and stock
            logger.info('SHOP', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getDailyDiscount':
            // TODO: Get daily discount items in shop
            // REQ: -
            // RES: discount goods list
            logger.info('SHOP', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getVipShopList':
            // TODO: Get VIP exclusive shop list
            // REQ: -
            // RES: VIP shop goods list
            logger.info('SHOP', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('SHOP', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
