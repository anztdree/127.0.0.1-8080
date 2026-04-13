'use strict';
var RH = require('../../shared/responseHelper');

/**
 * Combat Handler — trial
 * 5 actions — WRITE: 4 | READ: 1
 */
function handle(socket, parsed, callback) {
    var action = parsed.action;
    switch (action) {
        case 'checkBattleResult':
            // TODO: WRITE — Verify and record the result of a trial/temple test battle
            // REQ: battleField(GameFieldType.TEMPLETEST), battleId, checkResult, runaway, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'getDailyReward':
            // TODO: WRITE — Claim the daily trial completion reward
            // REQ: userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'getState':
            // TODO: READ — Retrieve the player's current trial state and progress
            // REQ: userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'startBattle':
            // TODO: WRITE — Begin a trial/temple test battle encounter
            // REQ: battleField(GameFieldType.TEMPLETEST), team, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'vipBuy':
            // TODO: WRITE — Purchase additional trial entries via VIP privilege
            // REQ: userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        default:
            callback(RH.success({}));
    }
}
module.exports = { handle: handle };
