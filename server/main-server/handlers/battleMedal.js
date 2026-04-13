'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'buyLevel': // TODO: WRITE — Purchase battle medal level upgrade // REQ: userId, uuid, version // RES: updated battle medal level
            callback(RH.success({})); break;
        case 'buySuper': // TODO: WRITE — Purchase super battle medal tier // REQ: userId, uuid, version // RES: updated super battle medal data
            callback(RH.success({})); break;
        case 'getAllLevelReward': // TODO: WRITE — Claim all pending battle medal level rewards // REQ: userId, uuid, version // RES: all claimed level rewards
            callback(RH.success({})); break;
        case 'getAllTaskReward': // TODO: WRITE — Claim all pending battle medal task rewards // REQ: userId, uuid, version // RES: all claimed task rewards
            callback(RH.success({})); break;
        case 'getLevelReward': // TODO: WRITE — Claim a specific battle medal level reward // REQ: isSuper, level, userId, uuid, version // RES: claimed level reward items
            callback(RH.success({})); break;
        case 'shop': // TODO: WRITE — Purchase an item from the battle medal shop // REQ: itemId, num, userId, uuid, version // RES: purchased shop item
            callback(RH.success({})); break;
        case 'taskReward': // TODO: WRITE — Claim a battle medal task reward // REQ: taskId, userId, uuid, version // RES: claimed task reward items
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
