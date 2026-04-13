'use strict';
var RH = require('../../shared/responseHelper');

/**
 * Combat Handler — dungeon
 * 4 actions — WRITE: 4 | READ: 0
 */
function handle(socket, parsed, callback) {
    var action = parsed.action;
    switch (action) {
        case 'buyCount':
            // TODO: WRITE — Purchase additional dungeon entry counts
            // REQ: dungeonType, times, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'checkBattleResult':
            // TODO: WRITE — Verify and process the outcome of a dungeon battle
            // REQ: battleField(GameFieldType.EQUIPDUNGEON), battleId, checkResult, dungeonLevel, dungeonType, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'startBattle':
            // TODO: WRITE — Initiate an equipment dungeon battle
            // REQ: battleField(GameFieldType.EQUIPDUNGEON), dungeonLevel, dungeonType, team, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'sweep':
            // TODO: WRITE — Quick-clear a dungeon level multiple times (sweep)
            // REQ: dungeonLevel, dungeonType, times, userId
            // RES: _fields
            callback(RH.success({}));
            break;
        default:
            callback(RH.success({}));
    }
}
module.exports = { handle: handle };
