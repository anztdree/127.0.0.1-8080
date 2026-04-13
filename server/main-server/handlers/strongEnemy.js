'use strict';
var RH = require('../../shared/responseHelper');

/**
 * Combat Handler — strongEnemy
 * 5 actions — WRITE: 3 | READ: 2
 */
function handle(socket, parsed, callback) {
    var action = parsed.action;
    switch (action) {
        case 'buyTimes':
            // TODO: WRITE — Purchase additional strong enemy challenge attempts
            // REQ: times, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'checkBattleResult':
            // TODO: WRITE — Verify and record the result of a strong enemy battle
            // REQ: battleField(GameFieldType.BOSSATTACK), battleId, checkResult, seuuid, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'getInfo':
            // TODO: READ — Retrieve the player's strong enemy challenge state and info
            // REQ: userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'getRankInfo':
            // TODO: READ — Fetch strong enemy leaderboard rankings with pagination
            // REQ: limit, order, seuuid, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'startBattle':
            // TODO: WRITE — Initiate a strong enemy boss attack battle
            // REQ: battleField(GameFieldType.BOSSATTACK), order, seuuid, team, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        default:
            callback(RH.success({}));
    }
}
module.exports = { handle: handle };
