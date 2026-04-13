'use strict';
var RH = require('../../shared/responseHelper');

/**
 * Combat Handler — bossCompetition
 * 6 actions — WRITE: 4 | READ: 2
 */
function handle(socket, parsed, callback) {
    var action = parsed.action;
    switch (action) {
        case 'attackBoss':
            // TODO: WRITE — Launch an attack on a world boss in the competition
            // REQ: battleField(GameFieldType.BOSSSNATCH), bossId, isDouble, team, userId
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'attackOwner':
            // TODO: WRITE — Challenge the current boss owner to steal/snatch ownership
            // REQ: battleField(GameFieldType.BOSSSNATCH), bossId, ownerId, team, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'autoFight':
            // TODO: WRITE — Toggle auto-fight mode for a world boss
            // REQ: autoFight, bossId, userId
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'buyTimes':
            // TODO: WRITE — Purchase additional boss competition attack attempts
            // REQ: times, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'getBossList':
            // TODO: READ — Retrieve the list of active world bosses in competition
            // REQ: userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'getDetail':
            // TODO: READ — Get detailed info about a specific world boss and damage rankings
            // REQ: bossId, damageStartTime, userId
            // RES: _fields
            callback(RH.success({}));
            break;
        default:
            callback(RH.success({}));
    }
}
module.exports = { handle: handle };
