'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'equip':
            // TODO: Equip a dragon item/ornament
            // REQ: dragonId, equipId
            // RES: updated dragon equipment
            logger.info('DRAGON', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'unequip':
            // TODO: Unequip a dragon item/ornament
            // REQ: dragonId, equipSlotId
            // RES: updated dragon equipment
            logger.info('DRAGON', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getEquipInfo':
            // TODO: Get dragon equipment info
            // REQ: dragonId
            // RES: dragon equip list and details
            logger.info('DRAGON', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'compose':
            // TODO: Compose/craft dragon equipment
            // REQ: targetEquipId, materials
            // RES: composed equipment
            logger.info('DRAGON', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'upgrade':
            // TODO: Upgrade dragon equipment level
            // REQ: equipId, materials
            // RES: upgraded equipment stats
            logger.info('DRAGON', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('DRAGON', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
