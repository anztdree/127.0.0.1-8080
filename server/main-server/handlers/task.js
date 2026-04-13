'use strict';
var RH = require('../../shared/responseHelper');

/**
 * Task Handler
 * 2 actions — WRITE: 1 | READ: 1
 */
function handle(socket, parsed, callback) {
    var action = parsed.action;
    switch (action) {
        case 'getReward': // TODO: WRITE — Claim task reward(s) by class and IDs
            // REQ: taskClass, taskIds, userId
            callback(RH.success({}));
            break;
        case 'queryTask': // TODO: READ — Query task progress list for a task class
            // REQ: taskClass, userId
            callback(RH.success({}));
            break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
