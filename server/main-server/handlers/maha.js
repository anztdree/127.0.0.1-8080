'use strict';
var RH = require('../../shared/responseHelper');

/**
 * Maha Handler
 * 6 actions — WRITE: 4 | READ: 2
 */
function handle(socket, parsed, callback) {
    var action = parsed.action;
    switch (action) {
        case 'buyTimes': // TODO: WRITE — Purchase extra Maha adventure challenge attempts
            // REQ: userId, version
            callback(RH.success({}));
            break;
        case 'friendBattle': // TODO: WRITE — Start a friend battle in Maha adventure against a boss
            // REQ: battleField(GameFieldType.MAHAADVENTURE), bossId, team, userId, version
            callback(RH.success({}));
            break;
        case 'getFriend': // TODO: READ — Get the user's friend list for Maha adventure co-op
            // REQ: userId, version
            callback(RH.success({}));
            break;
        case 'join': // TODO: WRITE — Join the Maha adventure event
            // REQ: userId, version
            callback(RH.success({}));
            break;
        case 'risk': // TODO: WRITE — Perform a Maha risk/gamble action
            // REQ: userId, version
            callback(RH.success({}));
            break;
        case 'startBattle': // TODO: WRITE — Start a Maha adventure battle
            // REQ: battleField(GameFieldType.MAHAADVENTURE), team, userId, version
            callback(RH.success({}));
            break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
