'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'getRank': // TODO: READ — Get leaderboard rankings by type
            // REQ: rankType, userId
            // RES: rank list data
            callback(RH.success({})); break;
        case 'like': // TODO: WRITE — Like a player on the leaderboard
            // REQ: rankType, userId
            // RES: like result
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
