'use strict';
var RH = require('../../shared/responseHelper');

/**
 * Checkin Handler
 * 1 action — WRITE: 1 | READ: 0
 */
function handle(socket, parsed, callback) {
    var action = parsed.action;
    switch (action) {
        case 'checkin': // TODO: WRITE — Perform daily check-in for the specified day
            // REQ: day, userId, version
            callback(RH.success({}));
            break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
