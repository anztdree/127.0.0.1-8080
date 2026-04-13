'use strict';
var RH = require('../../shared/responseHelper');

/**
 * Combat Handler — arena
 * 10 actions — WRITE: 7 | READ: 3
 */
function handle(socket, parsed, callback) {
    var action = parsed.action;
    switch (action) {
        case 'buy':
            // TODO: WRITE — Purchase arena challenge entries
            // REQ: userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'getBattleRecord':
            // TODO: READ — Retrieve a specific arena battle replay record
            // REQ: battleField(GameFieldType.ARENA), battleId, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'getDailyReward':
            // TODO: WRITE — Claim the daily arena ranking reward
            // REQ: userId
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'getRank':
            // TODO: READ — Fetch arena leaderboard rankings within a range
            // REQ: start, end, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'getRecord':
            // TODO: READ — Get the player's own arena battle history
            // REQ: userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'join':
            // TODO: WRITE — Enter/join the arena season
            // REQ: userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'select':
            // TODO: WRITE — Select a target opponent in the arena
            // REQ: userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'setTeam':
            // TODO: WRITE — Set the defense team used in arena
            // REQ: team, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'startBattle':
            // TODO: WRITE — Start an arena PvP battle against a ranked opponent
            // REQ: battleField(GameFieldType.ARENA), enemyRank, selUser, selfRank, team, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        case 'topAward':
            // TODO: WRITE — Claim a tier-based top ranking arena reward
            // REQ: rewardId, userId, version
            // RES: _fields
            callback(RH.success({}));
            break;
        default:
            callback(RH.success({}));
    }
}
module.exports = { handle: handle };
