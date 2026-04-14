'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'create':
            // TODO: Create a team dungeon room
            // REQ: dungeonId, difficulty
            // RES: room info, roomId
            logger.info('TEAMDUNGEONGAME', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'join':
            // TODO: Join a team dungeon room
            // REQ: roomId
            // RES: room info, member list
            logger.info('TEAMDUNGEONGAME', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'startBattle':
            // TODO: Start team dungeon battle
            // REQ: roomId, team lineup
            // RES: battle result, rewards
            logger.info('TEAMDUNGEONGAME', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getRecord':
            // TODO: Get team dungeon clear records
            // REQ: -
            // RES: cleared dungeons, history
            logger.info('TEAMDUNGEONGAME', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getDailyReward':
            // TODO: Claim team dungeon daily reward
            // REQ: -
            // RES: reward items
            logger.info('TEAMDUNGEONGAME', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('TEAMDUNGEONGAME', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
