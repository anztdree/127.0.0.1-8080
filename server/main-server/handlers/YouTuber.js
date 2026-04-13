'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'getYouTuberRecruitReward': // TODO: WRITE — Claim YouTuber recruitment reward
            // REQ: userId
            // RES: YouTuber recruit reward data
            callback(RH.success({})); break;
        case 'joinYouTuberPlan': // TODO: WRITE — Join the YouTuber partnership plan
            // REQ: mailAddr, userId
            // RES: join plan result
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
