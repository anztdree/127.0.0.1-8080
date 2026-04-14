'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'equip':
            // TODO: Equip an imprint onto hero
            // REQ: heroId, imprintId, slotId
            // RES: updated hero imprint
            logger.info('IMPRINT', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'unequip':
            // TODO: Unequip an imprint from hero
            // REQ: heroId, slotId
            // RES: updated hero imprint
            logger.info('IMPRINT', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'upgrade':
            // TODO: Upgrade imprint level
            // REQ: imprintId, materials
            // RES: upgraded imprint stats
            logger.info('IMPRINT', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'compose':
            // TODO: Compose/craft imprint from materials
            // REQ: targetImprintId, materials
            // RES: composed imprint
            logger.info('IMPRINT', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getImprintList':
            // TODO: Get all imprint inventory list
            // REQ: -
            // RES: imprint list with stats
            logger.info('IMPRINT', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('IMPRINT', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
