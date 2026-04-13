'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'addAttr': // TODO: WRITE — Add a vice attribute to an imprint // REQ: high, imprintId, userId, viceAttrId // RES: updated imprint with new attribute
            callback(RH.success({})); break;
        case 'autoTakeOff': // TODO: WRITE — Auto take off all imprints from a hero // REQ: heroId, userId, version // RES: hero with cleared imprint slots
            callback(RH.success({})); break;
        case 'autoWear': // TODO: WRITE — Auto wear best imprints onto a hero // REQ: heroId, imprintIds, userId, version // RES: hero with auto-equipped imprints
            callback(RH.success({})); break;
        case 'decompose': // TODO: WRITE — Decompose imprints into materials // REQ: imprintIds, userId, version // RES: decomposed materials
            callback(RH.success({})); break;
        case 'merge': // TODO: WRITE — Merge imprint pieces into a full imprint // REQ: num, pieces[{id}], userId, version // RES: merged imprint info
            callback(RH.success({})); break;
        case 'queryImprint': // TODO: READ — Query imprint details for a player // REQ: imprintId, queryUserId, serverId, userId, version // RES: imprint detail data
            callback(RH.success({})); break;
        case 'reborn': // TODO: WRITE — Reborn imprints, optionally keeping star level // REQ: imprintIds, keepStar, userId, version // RES: reborn imprint results
            callback(RH.success({})); break;
        case 'starUp': // TODO: WRITE — Star up an imprint on a hero // REQ: costImprintIds, heroId, imprintId, userId, version // RES: starred up imprint data
            callback(RH.success({})); break;
        case 'takeOff': // TODO: WRITE — Take off an imprint from a hero // REQ: heroId, imprintId, userId, version // RES: updated hero without imprint
            callback(RH.success({})); break;
        case 'wear': // TODO: WRITE — Wear an imprint onto a hero // REQ: heroId, imprintId, userId, version // RES: updated hero with imprint
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
