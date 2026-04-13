'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'answer': // TODO: WRITE — Submit an answer in the training quiz
            // REQ: choose, userId, version
            // RES: answer result and reward
            callback(RH.success({})); break;
        case 'buyTimes': // TODO: WRITE — Purchase additional training battle times
            // REQ: userId, version
            // RES: updated training times
            callback(RH.success({})); break;
        case 'checkBattleResult': // TODO: WRITE — Verify training battle result
            // REQ: battleField(GameFieldType.TRAINING), battleId, checkResult, userId, version
            // RES: battle verification result
            callback(RH.success({})); break;
        case 'getLog': // TODO: READ — Get training battle log history
            // REQ: userId, version
            // RES: training log data
            callback(RH.success({})); break;
        case 'move': // TODO: WRITE — Move to a new training stage or position
            // REQ: userId, version
            // RES: new training position data
            callback(RH.success({})); break;
        case 'runAway': // TODO: WRITE — Flee from a training battle
            // REQ: userId, version
            // RES: escape result
            callback(RH.success({})); break;
        case 'startBattle': // TODO: WRITE — Start a training battle
            // REQ: battleField(GameFieldType.TRAINING), team, userId, version
            // RES: battle initiation result
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
