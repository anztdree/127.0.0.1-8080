'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'bet': // TODO: WRITE — Place a bet on a top battle match
            // REQ: groupId, stage, subGroupId, userId, version, win
            // RES: bet placement result
            callback(RH.success({})); break;
        case 'buyTimes': // TODO: WRITE — Purchase additional top battle times
            // REQ: times, userId, version
            // RES: updated top battle times
            callback(RH.success({})); break;
        case 'getBattleRecord': // TODO: READ — Get a top battle record by ID
            // REQ: battleId, userId, version
            // RES: battle record data
            callback(RH.success({})); break;
        case 'getBetReward': // TODO: WRITE — Claim bet winnings from a top battle match
            // REQ: groupId, stage, subGroupId, userId, version
            // RES: bet reward data
            callback(RH.success({})); break;
        case 'getRankReward': // TODO: WRITE — Claim seasonal rank reward
            // REQ: cfgId, userId
            // RES: rank reward data
            callback(RH.success({})); break;
        case 'getTeamInfo': // TODO: READ — Get team info for top battle
            // REQ: areaId, queryUserIds, userId
            // RES: team info data
            callback(RH.success({})); break;
        case 'getTopBattleRecord': // TODO: READ — Get top battle record with area context
            // REQ: areaId, battleId, userId
            // RES: top battle record data
            callback(RH.success({})); break;
        case 'like': // TODO: WRITE — Like a player in top battle
            // REQ: userId, version
            // RES: like result
            callback(RH.success({})); break;
        case 'queryBackupTeam': // TODO: READ — Query a user backup team in top battle
            // REQ: queryUserId, serverId, userId, version
            // RES: backup team data
            callback(RH.success({})); break;
        case 'queryBackupTeamEquip': // TODO: READ — Query a user backup team equipment
            // REQ: heroId, queryUserId, serverId, userId, version, withAttr
            // RES: backup team equipment data
            callback(RH.success({})); break;
        case 'queryHistory': // TODO: READ — Query top battle history for an area/season
            // REQ: areaId, season, userId
            // RES: history list data
            callback(RH.success({})); break;
        case 'queryHistoryList': // TODO: READ — Query available top battle history seasons
            // REQ: userId
            // RES: history season list
            callback(RH.success({})); break;
        case 'queryRank': // TODO: READ — Query current top battle rankings
            // REQ: userId
            // RES: rank list data
            callback(RH.success({})); break;
        case 'queryUserHistory': // TODO: READ — Query a specific user top battle history
            // REQ: queryUserId, serverId, userId, version
            // RES: user history data
            callback(RH.success({})); break;
        case 'setTeam': // TODO: WRITE — Set top battle team composition
            // REQ: teams, userId
            // RES: team set result
            callback(RH.success({})); break;
        case 'startBattle': // TODO: WRITE — Start a top battle match
            // REQ: battleField(GameFieldType.TOPBATTLE), enemyTeamTag, enemyUserId, selfPoint, supers, teams, userId
            // RES: battle initiation result
            callback(RH.success({})); break;
        case 'startSeason': // TODO: WRITE — Start a new top battle season (admin)
            // REQ: userId
            // RES: season start result
            callback(RH.success({})); break;
        case 'tryMatch': // TODO: WRITE — Attempt to matchmake for a top battle
            // REQ: forceMatch, userId, withTeamInfo
            // RES: match result with opponent info
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
