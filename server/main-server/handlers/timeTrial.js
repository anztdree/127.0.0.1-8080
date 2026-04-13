'use strict';
var RH = require('../../shared/responseHelper');

/**
 * Time Trial Handler
 * 6 actions — WRITE: 4 | READ: 2
 */
function handle(socket, parsed, callback) {
    var action = parsed.action;
    switch (action) {
        case 'buyTimes': // TODO: WRITE — Purchase extra time trial challenge attempts
            // REQ: times, userId, version
            callback(RH.success({}));
            break;
        case 'checkBattleResult': // TODO: WRITE — Check and record time trial battle result
            // REQ: battleField(GameFieldType.TIMETRAIN), battleId, checkResult, runaway, userId, version
            callback(RH.success({}));
            break;
        case 'getPassRank': // TODO: READ — Get the pass rank for a time trial level
            // REQ: level, userId, version
            callback(RH.success({}));
            break;
        case 'getStarReward': // TODO: WRITE — Claim star reward for time trial level completion
            // REQ: cfgId, userId, version
            callback(RH.success({}));
            break;
        case 'getTimeTrialHeroPower': // TODO: READ — Get the user's hero power score for time trial
            // REQ: userId, version
            callback(RH.success({}));
            break;
        case 'startBattle': // TODO: WRITE — Start a time trial challenge battle
            // REQ: battleField(GameFieldType.TIMETRAIN), chooseStar, level, superSkill, team, userId, version
            callback(RH.success({}));
            break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
