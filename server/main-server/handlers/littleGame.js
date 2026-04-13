'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'click': // TODO: WRITE — Record a click interaction in the little game
            // REQ: userId, version
            // RES: click result and game state update
            callback(RH.success({})); break;
        case 'getBattleReward': // TODO: WRITE — Claim battle reward for a little game chapter
            // REQ: chapterId, userId
            // RES: battle reward data
            callback(RH.success({})); break;
        case 'getChapterReward': // TODO: WRITE — Claim completion reward for a little game chapter
            // REQ: chapterId, userId
            // RES: chapter reward data
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
