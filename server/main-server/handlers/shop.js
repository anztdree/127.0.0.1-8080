'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'buy': // TODO: WRITE — Purchase a good from the shop
            // REQ: goodId, marketType, times, userId, version
            // RES: shop data after purchase
            callback(RH.success({})); break;
        case 'getInfo': // TODO: READ — Get shop info for the user
            // REQ: userId, version
            // RES: shop info data
            callback(RH.success({})); break;
        case 'readNew': // TODO: WRITE — Mark new shop items as read
            // REQ: marketType, userId, version
            // RES: updated read status
            callback(RH.success({})); break;
        case 'refresh': // TODO: WRITE — Refresh shop listings
            // REQ: marketType, userId, version
            // RES: refreshed shop data
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
