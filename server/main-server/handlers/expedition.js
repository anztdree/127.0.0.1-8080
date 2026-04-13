'use strict';
var RH = require('../../shared/responseHelper');

/**
 * Expedition Handler
 * 12 actions — WRITE: 8 | READ: 0 | MIXED: 4
 */
function handle(socket, parsed, callback) {
    var action = parsed.action;
    switch (action) {
        case 'checkBattleResult': // TODO: WRITE — Check and record the result of an expedition battle
            // REQ: battleField(GameFieldType.EXPEDITION), battleId, checkResult, runaway, userId, version
            callback(RH.success({}));
            break;
        case 'clickExpedition': // TODO: WRITE — Enter or interact with the expedition map
            // REQ: userId, version
            callback(RH.success({}));
            break;
        case 'collection': // TODO: WRITE — Collect rewards from an expedition lesson
            // REQ: add, lessonId, userId, version
            callback(RH.success({}));
            break;
        case 'delTeam': // TODO: WRITE — Delete a saved expedition team
            // REQ: teamId, userId
            callback(RH.success({}));
            break;
        case 'finishEvent': // TODO: WRITE — Finish an expedition event (mark complete)
            // REQ: lessonIds, userId
            callback(RH.success({}));
            break;
        case 'investigation': // TODO: WRITE — Start investigation on expedition lesson nodes
            // REQ: lessonIds, userId
            callback(RH.success({}));
            break;
        case 'putInMachine': // TODO: WRITE — Place a hero into the expedition training machine
            // REQ: heroId, machineId, userId, version
            callback(RH.success({}));
            break;
        case 'quickFinishEvent': // TODO: WRITE — Instantly finish an expedition event (premium)
            // REQ: lessonId, userId
            callback(RH.success({}));
            break;
        case 'saveTeam': // TODO: WRITE — Save expedition team composition
            // REQ: heroIds, userId
            callback(RH.success({}));
            break;
        case 'startBattle': // TODO: WRITE — Start an expedition battle
            // REQ: battleField(GameFieldType.EXPEDITION), difficulty, team, userId, version
            callback(RH.success({}));
            break;
        case 'startEvent': // TODO: WRITE — Begin an expedition event with assigned heroes
            // REQ: heroIds, lessonId, userId
            callback(RH.success({}));
            break;
        case 'takeOutMachine': // TODO: WRITE — Remove a hero from the expedition training machine
            // REQ: machineId, userId, version
            callback(RH.success({}));
            break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
