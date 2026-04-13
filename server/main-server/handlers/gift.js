'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'bsAddToHomeReward': // TODO: WRITE — Add BS home reward to the user
            // REQ: userId
            // RES: reward result
            callback(RH.success({})); break;
        case 'buyFund': // TODO: WRITE — Purchase a fund pack
            // REQ: userId, version
            // RES: fund purchase result
            callback(RH.success({})); break;
        case 'buyGold': // TODO: WRITE — Purchase gold
            // REQ: userId, version
            // RES: gold purchase result
            callback(RH.success({})); break;
        case 'buyVipGift': // TODO: WRITE — Purchase a VIP gift
            // REQ: buyNum, itemId, userId, version
            // RES: VIP gift purchase result
            callback(RH.success({})); break;
        case 'clickHonghuUrl': // TODO: READ — Track click on Honghu URL
            // REQ: userId, version
            // RES: click tracking result
            callback(RH.success({})); break;
        case 'getChannelWeeklyRewrd': // TODO: WRITE — Claim channel weekly reward
            // REQ: userId, version
            // RES: weekly reward result
            callback(RH.success({})); break;
        case 'getFrisetRechargeReward': // TODO: WRITE — Claim first recharge reward
            // REQ: userId, version
            // RES: first recharge reward result
            callback(RH.success({})); break;
        case 'getLevelReward': // TODO: WRITE — Claim a level-based gift reward
            // REQ: giftId, userId, version
            // RES: level reward result
            callback(RH.success({})); break;
        case 'getOnlineGift': // TODO: WRITE — Claim online time gift
            // REQ: userId, version
            // RES: online gift result
            callback(RH.success({})); break;
        case 'getRewardInfo': // TODO: READ — Get all available reward info for the user
            // REQ: userId, version
            // RES: reward info data
            callback(RH.success({})); break;
        case 'getVipReward': // TODO: WRITE — Claim a VIP-level gift reward
            // REQ: giftId, userId, version
            // RES: VIP reward result
            callback(RH.success({})); break;
        case 'useActiveCode': // TODO: WRITE — Redeem an activation/promo code
            // REQ: code, userId, version
            // RES: activation code result
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
