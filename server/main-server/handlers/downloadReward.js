'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'clickDownload': // TODO: WRITE — Record a download link click event
            // REQ: userId
            // RES: click tracking result
            callback(RH.success({})); break;
        case 'getDownloadReward': // TODO: WRITE — Claim download promotional reward
            // REQ: userId
            // RES: download reward data
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
