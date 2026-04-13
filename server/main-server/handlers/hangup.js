'use strict';
var RH = require('../../shared/responseHelper');

/**
 * Combat Handler — hangup
 * 6 actions — WRITE: 6 | READ: 0
 */
function handle(socket, parsed, callback) {
    var action = parsed.action;
    switch (action) {
        case 'checkBattleResult':
            // TODO: WRITE — Check and record the result of a hangup battle
            // REQ: battleField(GameFieldType.LESSON), battleId, checkResult, runaway, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'gain':
            // TODO: WRITE — Collect accumulated hangup battle rewards
            // REQ: userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'getChapterReward':
            // TODO: WRITE — Claim the completion reward for a specific chapter
            // REQ: chapterId, userId
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'nextChapter':
            // TODO: WRITE — Advance to the next chapter in the hangup campaign
            // REQ: userId
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'saveGuideTeam':
            // TODO: WRITE — Save the team composition used for hangup/guide battles
            // REQ: supers, team, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'startGeneral':
            // TODO: WRITE — Start a general hangup battle session
            // REQ: battleField(GameFieldType.LESSON), team, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        default:
            callback(RH.success({}));
    }
}
module.exports = { handle: handle };
