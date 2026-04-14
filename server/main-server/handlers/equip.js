'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'equip':
            // TODO: Equip an item onto hero
            // REQ: heroId, equipId, slotId
            // RES: updated hero equipment
            logger.info('EQUIP', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'unequip':
            // TODO: Unequip an item from hero
            // REQ: heroId, slotId
            // RES: updated hero equipment
            logger.info('EQUIP', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'upgrade':
            // TODO: Upgrade equipment level
            // REQ: equipId, materials
            // RES: upgraded equipment stats
            logger.info('EQUIP', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'refine':
            // TODO: Refine equipment to improve sub-stats
            // REQ: equipId, refine materials
            // RES: refined equipment stats
            logger.info('EQUIP', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'compose':
            // TODO: Compose/craft equipment from materials
            // REQ: targetEquipId, materials
            // RES: composed equipment
            logger.info('EQUIP', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'sell':
            // TODO: Sell equipment for gold
            // REQ: equipId
            // RES: gold received
            logger.info('EQUIP', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('EQUIP', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
