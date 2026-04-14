'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'equip':
            // TODO: Equip a gemstone onto equipment slot
            // REQ: equipId, gemstoneId, slotId
            // RES: updated equipment
            logger.info('GEMSTONE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'unequip':
            // TODO: Unequip a gemstone from equipment
            // REQ: equipId, slotId
            // RES: updated equipment
            logger.info('GEMSTONE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'upgrade':
            // TODO: Upgrade gemstone level
            // REQ: gemstoneId, materials
            // RES: upgraded gemstone stats
            logger.info('GEMSTONE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'compose':
            // TODO: Compose higher grade gemstone from lower ones
            // REQ: targetGemstoneId, materials
            // RES: composed gemstone
            logger.info('GEMSTONE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('GEMSTONE', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
