'use strict';
var RH = require('../../shared/responseHelper');

/**
 * Combat Handler — battle
 * 1 action — WRITE: 1 | READ: 0
 */
function handle(socket, parsed, callback) {
    var action = parsed.action;
    switch (action) {
        case 'getRandom':
            // TODO: WRITE — Retrieve random battle data or generate a random battle encounter
            // REQ: battleId, count, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        default:
            callback(RH.success({}));
    }
}
module.exports = { handle: handle };
