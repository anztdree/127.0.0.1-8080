'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'upgrade':
            // TODO: Upgrade super skill level
            // REQ: skillId, materials
            // RES: upgraded skill data
            logger.info('SUPERSKILL', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getSkillList':
            // TODO: Get all super skill list
            // REQ: -
            // RES: super skill list with levels
            logger.info('SUPERSKILL', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getSkillInfo':
            // TODO: Get specific super skill details
            // REQ: skillId
            // RES: skill details, level, effects
            logger.info('SUPERSKILL', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('SUPERSKILL', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
