'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'equip': // TODO: WRITE — Equip a dragon item
            // REQ: itemId, userId, version
            // RES: updated dragon equipment data
            callback(RH.success({})); break;
        case 'handleExchangeResult': // TODO: WRITE — Process dragon exchange result with optional save
            // REQ: save, userId
            // RES: exchange result data
            callback(RH.success({})); break;
        case 'wish': // TODO: WRITE — Perform a dragon wish (gacha pull)
            // REQ: index, isVip, userId, version
            // RES: wish result and obtained items
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
