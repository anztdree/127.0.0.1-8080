'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'autoTraining': // TODO: WRITE — perform automatic team training iterations // REQ: times, userId, version // RES: trainingResults, updatedTraining
            callback(RH.success({})); break;
        case 'reborn': // TODO: WRITE — reborn/reset team training progress // REQ: userId, version // RES: rebornResult, updatedTraining
            callback(RH.success({})); break;
        case 'training': // TODO: WRITE — execute a single team training session // REQ: userId, version // RES: trainingResult, updatedTraining
            callback(RH.success({})); break;
        case 'unlock': // TODO: WRITE — unlock a new team training slot or feature // REQ: userId, version // RES: unlockedTraining, updatedTraining
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
