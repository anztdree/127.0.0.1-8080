'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'buyStep': // TODO: WRITE — Purchase additional mine exploration steps
            // REQ: userId, version
            // RES: updated step count and cost info
            callback(RH.success({})); break;
        case 'getChest': // TODO: WRITE — Collect a chest at a target position in the mine
            // REQ: targetX, targetY, userId, version
            // RES: chest reward data
            callback(RH.success({})); break;
        case 'getInfo': // TODO: READ — Get mine info for the user
            // REQ: userId, version
            // RES: mine level, position, steps remaining
            callback(RH.success({})); break;
        case 'move': // TODO: WRITE — Move the character to a target position in the mine
            // REQ: targetX, targetY, userId, version
            // RES: new position and triggered events
            callback(RH.success({})); break;
        case 'openAll': // TODO: WRITE — Open all available chests in the current mine
            // REQ: userId, version
            // RES: combined chest rewards
            callback(RH.success({})); break;
        case 'resetCurLevel': // TODO: WRITE — Reset the current mine level
            // REQ: userId, version
            // RES: reset mine level result
            callback(RH.success({})); break;
        case 'startBattle': // TODO: WRITE — Start a mine battle at a position
            // REQ: battleField(GameFieldType.MINE), targetX, targetY, team, userId, version
            // RES: battle initiation result
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
