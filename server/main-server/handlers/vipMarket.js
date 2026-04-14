'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'buy':
            // TODO: Purchase item from VIP market
            // REQ: goodsId, count
            // RES: purchased items, updated currency
            logger.info('VIPMARKET', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'refresh':
            // TODO: Refresh VIP market goods list
            // REQ: -
            // RES: new goods list
            logger.info('VIPMARKET', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getShopList':
            // TODO: Get current VIP market shop list
            // REQ: -
            // RES: VIP shop goods with prices
            logger.info('VIPMARKET', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('VIPMARKET', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
