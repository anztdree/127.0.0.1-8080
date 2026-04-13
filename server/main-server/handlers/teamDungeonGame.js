'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'addRobot': // TODO: WRITE — add a robot/AI member to a dungeon team // REQ: robotId, teamId, userId // RES: updatedTeam
            callback(RH.success({})); break;
        case 'apply': // TODO: WRITE — apply to join an existing dungeon team // REQ: teamId, teamUserType, userId // RES: applyResult
            callback(RH.success({})); break;
        case 'autoApply': // TODO: WRITE — automatically apply to a matching dungeon team // REQ: dtype, stars, teamUserType, userId // RES: teamInfo
            callback(RH.success({})); break;
        case 'createTeam': // TODO: WRITE — create a new team dungeon team // REQ: dungeonId, teamUserType, userId // RES: team
            callback(RH.success({})); break;
        case 'getAchReward': // TODO: WRITE — claim a team dungeon achievement reward // REQ: dungeonType, taskId, userId // RES: reward
            callback(RH.success({})); break;
        case 'getAllReward': // TODO: WRITE — claim all pending team dungeon rewards // REQ: userId // RES: rewards
            callback(RH.success({})); break;
        case 'getDailyTaskReward': // TODO: WRITE — claim a daily team dungeon task reward // REQ: taskId, userId // RES: reward
            callback(RH.success({})); break;
        case 'getReward': // TODO: WRITE — claim team dungeon completion reward // REQ: captainReward, teamId, userId // RES: reward
            callback(RH.success({})); break;
        case 'queryKillRank': // TODO: READ — query the team dungeon kill ranking leaderboard // REQ: dtype, userId // RES: rankings
            callback(RH.success({})); break;
        case 'queryMyApplyList': // TODO: READ — query the user's pending team dungeon applications // REQ: userId // RES: applyList
            callback(RH.success({})); break;
        case 'queryMyRecord': // TODO: READ — query the user's team dungeon history records // REQ: userId // RES: records
            callback(RH.success({})); break;
        case 'queryTeam': // TODO: READ — search/list available dungeon teams with filters // REQ: count, dungeonType, myTeamId, star, startOfCloseTime, userId // RES: teams
            callback(RH.success({})); break;
        case 'queryTeamByDisplayId': // TODO: READ — lookup a dungeon team by its display ID // REQ: displayId, userId // RES: team
            callback(RH.success({})); break;
        case 'queryTeamById': // TODO: READ — lookup a dungeon team by its team ID // REQ: teamId, userId, version // RES: team
            callback(RH.success({})); break;
        case 'queryTeamMembers': // TODO: READ — get members of a specific dungeon team // REQ: teamId, userId // RES: members
            callback(RH.success({})); break;
        case 'queryTeamsMember': // TODO: READ — get members for multiple teams by team IDs // REQ: teamIds, userId // RES: teamsMembers
            callback(RH.success({})); break;
        case 'queryUserTeam': // TODO: READ — query a specific user's team dungeon team // REQ: queryUserId, teamId, userId // RES: userTeam
            callback(RH.success({})); break;
        case 'quitTeam': // TODO: WRITE — leave the current dungeon team // REQ: teamId, userId // RES: success
            callback(RH.success({})); break;
        case 'setTeamDungeonTeam': // TODO: WRITE — set the team lineup for a team dungeon // REQ: superSkill, teamInfo, userId, version // RES: updatedTeam
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
