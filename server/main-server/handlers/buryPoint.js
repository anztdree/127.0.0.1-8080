'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'guideBattle': // TODO: READ — Get guide battle analytics/bury point data
            // REQ: passLesson, point, userId, version
            // RES: guide battle tracking data
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
