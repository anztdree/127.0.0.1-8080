'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'commonSummon':
            // TODO: Perform common (normal) hero summon
            // REQ: count (single/10x)
            // RES: summoned heroes, updated currency
            logger.info('SUMMON', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'superSummon':
            // TODO: Perform super (premium) hero summon
            // REQ: count (single/10x)
            // RES: summoned heroes, updated currency
            logger.info('SUMMON', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getSummonInfo':
            // TODO: Get summon pool info and rates
            // REQ: -
            // RES: summon pools, rates, pity counts
            logger.info('SUMMON', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getWishList':
            // TODO: Get current summon wish list
            // REQ: -
            // RES: wish list with selected heroes
            logger.info('SUMMON', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'setWishList':
            // TODO: Set summon wish list target heroes
            // REQ: wishHeroIds array
            // RES: updated wish list
            logger.info('SUMMON', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('SUMMON', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
