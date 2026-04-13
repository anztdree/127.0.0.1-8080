'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'saveGuide': // TODO: WRITE — Save player tutorial guide progress
            // REQ: guideType, step, userId, version
            // RES: save result
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
