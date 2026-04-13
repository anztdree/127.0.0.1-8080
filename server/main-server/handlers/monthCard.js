'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'buyCard': // TODO: WRITE — Purchase a monthly card
            // REQ: cardType, userId, version
            // RES: card purchase result
            callback(RH.success({})); break;
        case 'getReward': // TODO: WRITE — Claim daily monthly card reward
            // REQ: cardType, userId, version
            // RES: card reward data
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
