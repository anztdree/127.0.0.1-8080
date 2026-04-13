'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'appointmentViceCaptain': // TODO: WRITE — appoint a member as vice captain // REQ: guildUUID, memberUserId, userId, version // RES: updatedGuild
            callback(RH.success({})); break;
        case 'buyBossTimes': // TODO: WRITE — purchase additional guild boss challenge times // REQ: times, userId, version // RES: remainTimes, updatedBoss
            callback(RH.success({})); break;
        case 'changeGuildName': // TODO: WRITE — rename the guild // REQ: guildName, guildUUID, userId, version // RES: updatedGuild
            callback(RH.success({})); break;
        case 'checkPropaganda': // TODO: READ — check guild propaganda/recruitment status // REQ: guildUUID, userId, version // RES: propagandaInfo
            callback(RH.success({})); break;
        case 'createGuild': // TODO: WRITE — create a new guild // REQ: guildName, userId, version // RES: guild
            callback(RH.success({})); break;
        case 'getGuildBossInfo': // TODO: READ — retrieve guild boss battle information // REQ: guildUUID, userId, version // RES: bossInfo
            callback(RH.success({})); break;
        case 'getGuildByIdOrName': // TODO: READ — lookup a guild by its ID or name // REQ: idOrName, userId, version // RES: guild
            callback(RH.success({})); break;
        case 'getGuildDetail': // TODO: READ — get full guild detail by UUID // REQ: guildUUID, userId, version // RES: guildDetail
            callback(RH.success({})); break;
        case 'getGuildList': // TODO: READ — fetch paginated guild list // REQ: curPage, isAll, pageLen, userId, version // RES: guildList, total, curPage
            callback(RH.success({})); break;
        case 'getGuildLog': // TODO: READ — retrieve guild activity log // REQ: guildUUID, userId, version // RES: logs
            callback(RH.success({})); break;
        case 'getMembers': // TODO: READ — list all guild members // REQ: guildUUID, userId, version // RES: members
            callback(RH.success({})); break;
        case 'getRequestMembers': // TODO: READ — list pending join requests // REQ: guildUUID, userId, version // RES: requestMembers
            callback(RH.success({})); break;
        case 'getSatanGift': // TODO: WRITE — claim a satan gift reward for the guild // REQ: giftId, guildUUID, userId, version // RES: reward
            callback(RH.success({})); break;
        case 'getTreasureInfo': // TODO: READ — retrieve guild treasure chest information // REQ: guildUUID, userId, version // RES: treasureInfo
            callback(RH.success({})); break;
        case 'getTreasurePoint': // TODO: READ — get guild treasure points // REQ: guildUUID, userId, version // RES: treasurePoint
            callback(RH.success({})); break;
        case 'guildSign': // TODO: WRITE — perform daily guild sign-in // REQ: guildUUID, signType, userId, version // RES: signReward, signStatus
            callback(RH.success({})); break;
        case 'handleRequest': // TODO: WRITE — approve or reject a guild join request // REQ: agree, guildUUID, memberUserId, userId, version // RES: updatedMembers
            callback(RH.success({})); break;
        case 'impeachCaptain': // TODO: WRITE — initiate impeachment against the guild captain // REQ: captainUserId, guildUUID, userId, version // RES: impeachResult
            callback(RH.success({})); break;
        case 'kickOut': // TODO: WRITE — kick a member from the guild // REQ: guildUUID, memberUserId, userId, version // RES: updatedMembers
            callback(RH.success({})); break;
        case 'quitGuild': // TODO: WRITE — leave the guild // REQ: guildUUID, memberUserId, userId, version // RES: success
            callback(RH.success({})); break;
        case 'readBulletin': // TODO: READ — read the guild bulletin // REQ: userId, version // RES: bulletin
            callback(RH.success({})); break;
        case 'relieveViceCaptain': // TODO: WRITE — remove vice captain role from a member // REQ: guildUUID, memberUserId, userId, version // RES: updatedGuild
            callback(RH.success({})); break;
        case 'requestGuild': // TODO: WRITE — send join request to one or more guilds // REQ: guildUUIDs, userId, version // RES: requestResults
            callback(RH.success({})); break;
        case 'resetTech': // TODO: WRITE — reset a guild technology // REQ: techType, userId, version // RES: updatedTech
            callback(RH.success({})); break;
        case 'startBoss': // TODO: WRITE — start a guild boss battle // REQ: battleField(GameFieldType.GUILDBOSS), bossId, guildUUID, team, userId, version // RES: battleResult
            callback(RH.success({})); break;
        case 'transferCaptain': // TODO: WRITE — transfer captain role to another member // REQ: guildUUID, memberUserId, userId, version // RES: updatedGuild
            callback(RH.success({})); break;
        case 'treasureStartBattle': // TODO: WRITE — start a guild treasure loot battle // REQ: battleField(GameFieldType.GUILDLOOT), enemyGuildId, enemyUserId, guildUUID, team, userId, version // RES: battleResult
            callback(RH.success({})); break;
        case 'updateBulletin': // TODO: WRITE — update the guild bulletin // REQ: bulletin, guildUUID, userId, version // RES: updatedBulletin
            callback(RH.success({})); break;
        case 'updateDes': // TODO: WRITE — update the guild description // REQ: guildDes, guildUUID, userId, version // RES: updatedGuild
            callback(RH.success({})); break;
        case 'updateGuildIcon': // TODO: WRITE — change the guild icon // REQ: guildUUID, iconId, userId, version // RES: updatedGuild
            callback(RH.success({})); break;
        case 'updateRequestCondition': // TODO: WRITE — update guild join request conditions // REQ: guildUUID, limitLevel, needAgree, userId, version // RES: updatedConditions
            callback(RH.success({})); break;
        case 'updateTreasureDefenceTeam': // TODO: WRITE — set the guild treasure defence team lineup // REQ: guildUUID, memberUids, userId, version // RES: updatedDefenceTeam
            callback(RH.success({})); break;
        case 'upgradeTech': // TODO: WRITE — upgrade a guild technology // REQ: techId, techType, times, userId, version // RES: updatedTech
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
