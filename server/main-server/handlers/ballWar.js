'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'buyTimes': // TODO: WRITE — Purchase additional ball war battle times
            // REQ: times, userId, version
            // RES: updated ball war times
            callback(RH.success({})); break;
        case 'checkHaveDefence': // TODO: READ — Check if a player has defence set up
            // REQ: heroDisplayIds, userId
            // RES: defence check result
            callback(RH.success({})); break;
        case 'getAreaInfo': // TODO: READ — Get ball war area info
            // REQ: areaId, userId, version
            // RES: area info data
            callback(RH.success({})); break;
        case 'getBriefInfo': // TODO: READ — Get ball war brief summary info
            // REQ: userId
            // RES: brief info data
            callback(RH.success({})); break;
        case 'getFinishInfo': // TODO: READ — Get ball war completion/finish info
            // REQ: userId
            // RES: finish info data
            callback(RH.success({})); break;
        case 'getFlagOwnerInfo': // TODO: READ — Get flag/tower owner info in ball war
            // REQ: areaId, flagId, isTower, ownerTag, userId, version
            // RES: flag owner data
            callback(RH.success({})); break;
        case 'getGuildMemberHonours': // TODO: READ — Get guild member honours in ball war
            // REQ: userId
            // RES: guild member honours list
            callback(RH.success({})); break;
        case 'getPointRank': // TODO: READ — Get ball war point rankings
            // REQ: userId
            // RES: point rank list data
            callback(RH.success({})); break;
        case 'getRecord': // TODO: READ — Get ball war battle records
            // REQ: timeStart, userId
            // RES: battle record list
            callback(RH.success({})); break;
        case 'removeDefence': // TODO: WRITE — Remove defence from a flag/tower
            // REQ: areaId, flagId, isTower, userId, version
            // RES: defence removal result
            callback(RH.success({})); break;
        case 'setDefence': // TODO: WRITE — Set defence on a flag/tower
            // REQ: defence, userId, version
            // RES: defence set result
            callback(RH.success({})); break;
        case 'setTopMsg': // TODO: WRITE — Set top broadcast message in ball war
            // REQ: msg, userId
            // RES: message set result
            callback(RH.success({})); break;
        case 'signUpBallWar': // TODO: WRITE — Sign up for ball war
            // REQ: userId
            // RES: sign-up result
            callback(RH.success({})); break;
        case 'startBattle': // TODO: WRITE — Start a ball war battle for a flag/tower
            // REQ: areaId, battleField(GameFieldType.DRAGONBALL), flagId, isTower, ownerTag, setDefence, team, userId, version
            // RES: battle initiation result
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
