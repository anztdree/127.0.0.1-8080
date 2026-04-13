'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'bet': // TODO: WRITE — Place a bet on a war match
            // REQ: groupId, stage, subGroupId, userId, version, win
            // RES: bet placement result
            callback(RH.success({})); break;
        case 'getAuditionInfo': // TODO: READ — Get audition phase info for global war
            // REQ: userId, version
            // RES: audition info data
            callback(RH.success({})); break;
        case 'getAuditionRank': // TODO: READ — Get audition rankings
            // REQ: userId, version
            // RES: audition rank list data
            callback(RH.success({})); break;
        case 'getAuditionReward': // TODO: WRITE — Claim audition phase reward
            // REQ: cfgId, userId, version
            // RES: audition reward data
            callback(RH.success({})); break;
        case 'getBattleRecord': // TODO: READ — Get a war battle record by ID
            // REQ: battleField(GameFieldType.GLOBALWAR), battleId, userId, version
            // RES: battle record data
            callback(RH.success({})); break;
        case 'getBetReward': // TODO: WRITE — Claim bet winnings from a war match
            // REQ: groupId, stage, subGroupId, userId, version
            // RES: bet reward data
            callback(RH.success({})); break;
        case 'getChampionRank': // TODO: READ — Get champion phase rankings
            // REQ: userId, version, worldId
            // RES: champion rank list data
            callback(RH.success({})); break;
        case 'getSignUpInfo': // TODO: READ — Get global war sign-up info
            // REQ: userId, version
            // RES: sign-up info data
            callback(RH.success({})); break;
        case 'getTeamInfo': // TODO: READ — Get team info for a war group
            // REQ: groupId, stage, subGroupId, userId, version
            // RES: team info data
            callback(RH.success({})); break;
        case 'getUserTeam': // TODO: READ — Get a specific user war team composition
            // REQ: queryUserId, userId, version
            // RES: user team data
            callback(RH.success({})); break;
        case 'like': // TODO: WRITE — Like a player in global war
            // REQ: userId, version
            // RES: like result
            callback(RH.success({})); break;
        case 'signUp': // TODO: WRITE — Sign up for global war
            // REQ: userId, version
            // RES: sign-up result
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
