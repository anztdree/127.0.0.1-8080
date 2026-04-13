'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'buySeat': // TODO: WRITE — Buy a resonance cabin seat // REQ: cabinId, isSpecial, userId // RES: purchased seat info
            callback(RH.success({})); break;
        case 'clearSeatCD': // TODO: WRITE — Clear cooldown on a resonance cabin seat // REQ: cabinId, seatId, userId // RES: cleared seat cooldown
            callback(RH.success({})); break;
        case 'putChild': // TODO: WRITE — Place a hero child into a resonance seat // REQ: cabinId, heroId, seatId, userId // RES: updated cabin seat with child
            callback(RH.success({})); break;
        case 'removeChild': // TODO: WRITE — Remove a hero child from a resonance seat // REQ: cabinId, seatId, userId // RES: updated cabin seat without child
            callback(RH.success({})); break;
        case 'setMainHero': // TODO: WRITE — Set the main hero for a resonance cabin // REQ: cabinId, heroId, userId // RES: updated cabin with main hero
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
