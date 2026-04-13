'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'checkBattleRecord': // TODO: READ — Check and verify a battle record // REQ: battleId, battleResult, notSetReward, userId // RES: verified battle record data
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
