'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'queryGenki': // TODO: WRITE — Query genki details for a player // REQ: genkiId, queryUserId, serverId, userId, version // RES: genki detail data
            callback(RH.success({})); break;
        case 'smelt': // TODO: WRITE — Smelt genki items into materials // REQ: genkiIds, smeltType, userId // RES: smelted materials result
            callback(RH.success({})); break;
        case 'takeOff': // TODO: WRITE — Take off a genki from a hero // REQ: genkiId, heroId, userId // RES: updated hero without genki
            callback(RH.success({})); break;
        case 'wear': // TODO: WRITE — Wear a genki onto a hero slot // REQ: genkiId, heroId, pos, userId // RES: updated hero with genki equipped
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
