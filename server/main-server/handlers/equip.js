'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'activeRing': // TODO: WRITE — Activate a ring on a hero // REQ: heroId, userId, version // RES: updated hero equip data
            callback(RH.success({})); break;
        case 'activeWeapon': // TODO: WRITE — Activate a weapon on a hero // REQ: heroId, userId, version // RES: updated hero weapon data
            callback(RH.success({})); break;
        case 'autoMerge': // TODO: WRITE — Auto merge equipment pieces // REQ: equipType, isRed, userId // RES: merged equip result
            callback(RH.success({})); break;
        case 'autoRingLevelUp': // TODO: WRITE — Auto level up a ring multiple times // REQ: heroId, times, userId, version // RES: ring level up results
            callback(RH.success({})); break;
        case 'merge': // TODO: WRITE — Merge equipment pieces into a full equip // REQ: count, equipId, userId, version // RES: merged equip info
            callback(RH.success({})); break;
        case 'ringEvolve': // TODO: WRITE — Evolve a hero's ring to next tier // REQ: heroId, userId, version // RES: evolved ring data
            callback(RH.success({})); break;
        case 'takeOff': // TODO: WRITE — Take off an equipment from a hero slot // REQ: equipId, heroId, pos, stoneId, userId, version // RES: updated hero and inventory
            callback(RH.success({})); break;
        case 'takeOffAuto': // TODO: WRITE — Auto take off all equipment from a hero // REQ: heroId, userId, version // RES: hero with cleared equip slots
            callback(RH.success({})); break;
        case 'wear': // TODO: WRITE — Wear an equipment onto a hero slot // REQ: equipId, heroId, pos, stoneId, userId, version // RES: updated hero equip slot
            callback(RH.success({})); break;
        case 'wearAuto': // TODO: WRITE — Auto wear best equipment onto a hero // REQ: equipInfo, heroId, userId, version, weaponId // RES: hero with auto-equipped gear
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
