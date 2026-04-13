'use strict';
var RH = require('../../shared/responseHelper');

/**
 * Combat Handler — snake
 * 8 actions — WRITE: 5 | READ: 3
 */
function handle(socket, parsed, callback) {
    var action = parsed.action;
    switch (action) {
        case 'awardBox':
            // TODO: WRITE — Open and claim a specific snake dungeon reward box
            // REQ: boxId, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'getAllBoxReward':
            // TODO: WRITE — Claim all available snake dungeon box rewards at once
            // REQ: userId
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'getEnemyInfo':
            // TODO: READ — Retrieve enemy information for a specific snake dungeon lesson
            // REQ: lessId, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'getSnakeInfo':
            // TODO: READ — Get the player's current snake dungeon progress and state
            // REQ: userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'recoverHero':
            // TODO: WRITE — Revive/recover heroes after snake dungeon battles
            // REQ: heroIds, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'reset':
            // TODO: WRITE — Reset the snake dungeon progress for a fresh run
            // REQ: userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'startBattle':
            // TODO: WRITE — Begin a snake dungeon battle encounter
            // REQ: battleField(GameFieldType.SNAKEDUNGEON), team, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'sweep':
            // TODO: WRITE — Quick-clear a snake dungeon stage (sweep)
            // REQ: userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        default:
            callback(RH.success({}));
    }
}
module.exports = { handle: handle };
