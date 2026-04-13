'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'buyTimes': // TODO: WRITE — Purchase additional gravity test battle times
            // REQ: userId, version
            // RES: updated gravity test times
            callback(RH.success({})); break;
        case 'checkBattleResult': // TODO: WRITE — Verify gravity test battle result
            // REQ: battleField(GameFieldType.GRAVITYTEST), battleId, checkResult, runaway, userId, version
            // RES: battle verification result
            callback(RH.success({})); break;
        case 'startBattle': // TODO: WRITE — Start a gravity test battle
            // REQ: battleField(GameFieldType.GRAVITYTEST), superSkill, team, userId, version
            // RES: battle initiation result
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
