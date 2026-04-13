'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'appraisal': // TODO: WRITE — Appraise a gemstone to reveal its attributes // REQ: stoneId, userId // RES: appraised gemstone attributes
            callback(RH.success({})); break;
        case 'levelUp': // TODO: WRITE — Level up a gemstone using cost materials // REQ: costStack, costUnique, displayId, stoneId, userId // RES: leveled up gemstone data
            callback(RH.success({})); break;
        case 'takeOff': // TODO: WRITE — Take off a gemstone from a hero // REQ: stoneId, userId // RES: updated hero without gemstone
            callback(RH.success({})); break;
        case 'wear': // TODO: WRITE — Wear gemstones onto a hero // REQ: displayIds, heroId, stoneIds, userId // RES: updated hero with gemstones
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
