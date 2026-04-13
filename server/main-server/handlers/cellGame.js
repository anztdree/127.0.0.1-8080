'use strict';
var RH = require('../../shared/responseHelper');

/**
 * Combat Handler — cellGame
 * 8 actions — WRITE: 7 | READ: 1
 */
function handle(socket, parsed, callback) {
    var action = parsed.action;
    switch (action) {
        case 'checkBattleResult':
            // TODO: WRITE — Verify and process the outcome of a cell game battle
            // REQ: battleField(GameFieldType.CELLGAME), battleId, checkResult, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'getChest':
            // TODO: WRITE — Open and claim a cell game chest reward
            // REQ: userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'getInfo':
            // TODO: READ — Retrieve the player's current cell game progress and state
            // REQ: userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'recoverHero':
            // TODO: WRITE — Revive/recover heroes after cell game battles
            // REQ: heroIds, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'reset':
            // TODO: WRITE — Reset the current cell game run progress
            // REQ: userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'resetCellGame':
            // TODO: WRITE — Full reset of the cell game (daily or forced)
            // REQ: userId
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'setTeam':
            // TODO: WRITE — Set the team composition for cell game battles
            // REQ: team, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'startBattle':
            // TODO: WRITE — Begin a cell game battle encounter
            // REQ: team, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        default:
            callback(RH.success({}));
    }
}
module.exports = { handle: handle };
