'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'levelUpHalo': // TODO: WRITE — Level up a weapon halo skill // REQ: chooseHalo, costWeaponIds, heroId, userId, version, weaponId // RES: updated weapon halo data
            callback(RH.success({})); break;
        case 'merge': // TODO: WRITE — Merge weapon pieces into a full weapon // REQ: num, pieces[{id}], userId, version // RES: merged weapon info
            callback(RH.success({})); break;
        case 'reborn': // TODO: WRITE — Reborn weapons, optionally keeping star level // REQ: keepStar, userId, version, weaponIds // RES: reborn weapon results
            callback(RH.success({})); break;
        case 'resolve': // TODO: WRITE — Resolve/decompose weapons into materials // REQ: userId, version, weaponIds // RES: resolved materials
            callback(RH.success({})); break;
        case 'takeOff': // TODO: WRITE — Take off a weapon from a hero // REQ: heroId, userId, version, weaponId // RES: updated hero without weapon
            callback(RH.success({})); break;
        case 'upgrade': // TODO: WRITE — Upgrade a weapon's level // REQ: heroId, userId, version, weaponId // RES: upgraded weapon data
            callback(RH.success({})); break;
        case 'wear': // TODO: WRITE — Wear a weapon onto a hero // REQ: heroId, userId, version, weaponId // RES: updated hero with weapon
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
