'use strict';
var RH = require('../../shared/responseHelper');

/**
 * Time Machine Handler
 * 4 actions — WRITE: 4 | READ: 0
 */
function handle(socket, parsed, callback) {
    var action = parsed.action;
    switch (action) {
        case 'checkBattleResult': // TODO: WRITE — Check and record time machine battle result
            // REQ: battleField(GameFieldType.TIMETRAVEL), battleId, checkResult, machineId, userId, version
            callback(RH.success({}));
            break;
        case 'getReward': // TODO: WRITE — Claim time machine stage reward
            // REQ: machineId, userId
            callback(RH.success({}));
            break;
        case 'start': // TODO: WRITE — Start a time machine level/stage
            // REQ: heroId, level, machineId, timeType, userId
            callback(RH.success({}));
            break;
        case 'startBoss': // TODO: WRITE — Start a time machine boss battle
            // REQ: battleField(GameFieldType.TIMETRAVEL), machineId, team, userId
            callback(RH.success({}));
            break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
