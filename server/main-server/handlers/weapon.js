'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'equip':
            // TODO: Equip a weapon onto hero
            // REQ: heroId, weaponId
            // RES: updated hero weapon
            logger.info('WEAPON', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'unequip':
            // TODO: Unequip a weapon from hero
            // REQ: heroId
            // RES: updated hero weapon
            logger.info('WEAPON', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'upgrade':
            // TODO: Upgrade weapon level
            // REQ: weaponId, materials
            // RES: upgraded weapon stats
            logger.info('WEAPON', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'refine':
            // TODO: Refine weapon to improve sub-stats
            // REQ: weaponId, refine materials
            // RES: refined weapon stats
            logger.info('WEAPON', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'compose':
            // TODO: Compose/craft weapon from materials
            // REQ: targetWeaponId, materials
            // RES: composed weapon
            logger.info('WEAPON', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'sell':
            // TODO: Sell weapon for gold
            // REQ: weaponId
            // RES: gold received
            logger.info('WEAPON', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('WEAPON', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
