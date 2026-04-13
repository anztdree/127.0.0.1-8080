'use strict';
var RH = require('../../shared/responseHelper');

/**
 * Time Bonus Handler
 * 2 actions — WRITE: 2 | READ: 0
 */
function handle(socket, parsed, callback) {
    var action = parsed.action;
    switch (action) {
        case 'buyBonus': // TODO: WRITE — Purchase a time-limited bonus pack
            // REQ: bonusId, price, times, userId, version
            callback(RH.success({}));
            break;
        case 'triggerLackOfGoldBonus': // TODO: WRITE — Trigger a lack-of-gold bonus popup/reward
            // REQ: userId
            callback(RH.success({}));
            break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
