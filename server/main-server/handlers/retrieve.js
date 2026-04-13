'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'dungeonReward': // TODO: WRITE — Retrieve dungeon battle rewards
            // REQ: backType, userId, version
            // RES: dungeon reward data
            callback(RH.success({})); break;
        case 'hangupReward': // TODO: WRITE — Retrieve hangup/idle rewards
            // REQ: userId, version
            // RES: hangup reward data
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
