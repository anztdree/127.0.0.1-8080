'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'recharge': // TODO: WRITE — Process a recharge/payment transaction
            // REQ: goodsId, userId, version
            // RES: recharge result and item delivery
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
