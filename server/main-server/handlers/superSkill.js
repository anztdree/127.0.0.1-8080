'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'activeSuperSkill': // TODO: WRITE — Activate a super skill for use
            // REQ: skillId, userId, version
            // RES: activation result
            callback(RH.success({})); break;
        case 'autoLevelUpSuperSkill': // TODO: WRITE — Auto level up a super skill multiple times
            // REQ: skillId, times, userId, version
            // RES: auto level up result with new skill level
            callback(RH.success({})); break;
        case 'evolveSuperSkill': // TODO: WRITE — Evolve a super skill to next tier
            // REQ: skillId, userId, version
            // RES: evolution result with new skill data
            callback(RH.success({})); break;
        case 'levelUpSuperSkill': // TODO: WRITE — Level up a super skill by one
            // REQ: skillId, userId, version
            // RES: level up result with new skill level
            callback(RH.success({})); break;
        case 'resetSuperSkill': // TODO: WRITE — Reset a super skill to base state
            // REQ: skillId, userId, version
            // RES: reset result with refunded resources
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
