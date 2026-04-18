'use strict';

/**
 * =====================================================
 *  Gift Handler — handlers/gift.js
 *  Port 8001 — Main Server
 *
 *  Actions: 4 total
 *    - getGiftList: Get available gift list (stub)
 *    - claim: Claim a specific gift (stub)
 *    - getCDKeyReward: Redeem CD key (stub)
 *    - getOnlineGift: Claim online time-based reward ★ NEW
 *
 *  CLIENT CODE for getOnlineGift (Home.getOnLineGift, line ~167406):
 *    ts.processHandler({
 *        type: "gift",
 *        action: "getOnlineGift",
 *        userId: o,
 *        version: "1.0"
 *    }, function(t) {
 *        UIWindowManager.openCongratulationObtain(t),
 *        WelfareInfoManager.getInstance().setOnlineGift(t._onlineGift),
 *        e.setOnLineGift()
 *    })
 *
 *  CLIENT EXPECTED RESPONSE:
 *    { _onlineGift: { _curId: number, _nextTime: number } }
 *    Plus any reward items for UIWindowManager.openCongratulationObtain(t)
 *
 *  DATA FLOW:
 *    1. Client sends type:"gift", action:"getOnlineGift"
 *    2. Server reads playerData.giftInfo._onlineGift
 *    3. Server looks up current tier in onlineBonus.json
 *    4. Server gives reward items (awardID + num)
 *    5. Server advances _onlineGift._curId to nextID (or stays if last tier)
 *    6. Server sets _onlineGift._nextTime = now + nextTier.time (or 0 if done)
 *    7. Server returns { _onlineGift: { _curId, _nextTime }, ...reward items }
 *    8. Client calls WelfareInfoManager.getInstance().setOnlineGift(t._onlineGift)
 *       which reads t._onlineGift._curId and t._onlineGift._nextTime
 *    9. Client calls Home.setOnLineGift() which re-renders the UI
 *
 *  onlineBonus.json structure:
 *    {
 *      "1": { "id": 1, "time": 300,   "awardID": 122,  "num": 3,    "nextID": 2 },
 *      "2": { "id": 2, "time": 600,   "awardID": 541,  "num": 1,    "nextID": 3 },
 *      "3": { "id": 3, "time": 1800,  "awardID": 1310, "num": 1,    "nextID": 4 },
 *      "4": { "id": 4, "time": 3600,  "awardID": 123,  "num": 1,    "nextID": 5 },
 *      "5": { "id": 5, "time": 7200,  "awardID": 101,  "num": 100,  "nextID": 6 },
 *      "6": { "id": 6, "time": 18000, "awardID": 4201, "num": 1,    "nextID": 7 },
 *      "7": { "id": 7, "time": 43200, "awardID": 132,  "num": 3000 }
 *    }
 *    Entry 7 has NO nextID — it's the final tier.
 *    time = seconds the player must be online before claiming.
 *
 * =====================================================
 */

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');
var GameData = require('../../shared/gameData/loader');
var UserDataService = require('../services/userDataService');

/**
 * getOnlineGift — Claim the current online time reward.
 *
 * Client checks if enough time has passed (client-side timer countdown).
 * If timer reaches 0, player taps the gift icon, client sends this request.
 *
 * @param {object} socket - Socket.IO socket
 * @param {object} parsed - { type, action, userId, version }
 * @param {function} callback - Socket.IO ack callback
 */
async function getOnlineGift(socket, parsed, callback) {
    var userId = parsed.userId;

    if (!userId) {
        logger.warn('GIFT', 'getOnlineGift: missing userId');
        return callback(RH.error(RH.ErrorCode.LACK_PARAM, 'Missing userId'));
    }

    logger.info('GIFT', 'getOnlineGift: userId=' + userId);

    try {
        // Load player data
        var playerData = await UserDataService.loadUserData(userId);

        if (!playerData || !playerData.giftInfo) {
            logger.warn('GIFT', 'getOnlineGift: no player data for userId=' + userId);
            return callback(RH.error(RH.ErrorCode.DATA_ERROR, 'Player data not found'));
        }

        // Get current online gift state
        var onlineGift = playerData.giftInfo._onlineGift;

        // Safety: ensure _onlineGift is a valid object
        if (!onlineGift || typeof onlineGift !== 'object' || typeof onlineGift._curId !== 'number') {
            logger.warn('GIFT', 'getOnlineGift: invalid _onlineGift format for userId=' + userId +
                ', resetting to default');
            onlineGift = { _curId: 0, _nextTime: 0 };
            playerData.giftInfo._onlineGift = onlineGift;
        }

        var curId = onlineGift._curId;

        // If _curId is 0, the player hasn't started claiming yet.
        // The first tier should be set when the player enters the game.
        // This shouldn't normally happen, but handle it gracefully.
        if (curId === 0) {
            // Set to first tier (id=1) with its time requirement
            var firstTier = getOnlineBonusConfig('1');
            if (firstTier) {
                onlineGift._curId = 0; // Keep at 0 — first claim will advance to 1
                onlineGift._nextTime = Date.now() + (firstTier.time * 1000);

                // Save and return — player hasn't waited long enough yet
                await UserDataService.saveUserData(userId, playerData);
                callback(RH.success({ _onlineGift: onlineGift }));
                return;
            } else {
                logger.error('GIFT', 'getOnlineGift: onlineBonus.json not loaded!');
                return callback(RH.error(RH.ErrorCode.DATA_ERROR, 'Server config error'));
            }
        }

        // Look up the current tier config
        var currentTier = getOnlineBonusConfig(String(curId));

        if (!currentTier) {
            // Current tier doesn't exist in config — reset to 0 (all done or corrupted)
            logger.warn('GIFT', 'getOnlineGift: curId=' + curId + ' not found in onlineBonus.json' +
                ' for userId=' + userId + ', resetting');
            onlineGift._curId = 0;
            onlineGift._nextTime = 0;
            await UserDataService.saveUserData(userId, playerData);
            callback(RH.success({ _onlineGift: onlineGift }));
            return;
        }

        // Build reward items for the congratulation popup
        // Client: UIWindowManager.openCongratulationObtain(t)
        // This function expects an array of reward objects: [{ _id, _num }, ...]
        var rewardItems = [{
            _id: currentTier.awardID,
            _num: currentTier.num,
        }];

        // Advance to next tier
        var nextId = currentTier.nextID;
        if (nextId) {
            // There is a next tier
            var nextTier = getOnlineBonusConfig(String(nextId));
            if (nextTier) {
                onlineGift._curId = nextId;
                onlineGift._nextTime = Date.now() + (nextTier.time * 1000);
            } else {
                // nextID points to a non-existent tier — stop here
                onlineGift._curId = curId;
                onlineGift._nextTime = 0;
            }
        } else {
            // No nextID — this was the last tier (entry 7)
            // Set _nextTime to 0 so client hides the online gift UI
            onlineGift._curId = curId;
            onlineGift._nextTime = 0;
        }

        // Save updated player data
        await UserDataService.saveUserData(userId, playerData);

        logger.info('GIFT', 'getOnlineGift: userId=' + userId +
            ' claimed tier=' + curId +
            ' nextTier=' + onlineGift._curId +
            ' reward=' + JSON.stringify(rewardItems));

        // Return response with _onlineGift and reward items
        callback(RH.success({
            _onlineGift: onlineGift,
            _items: rewardItems,
        }));

    } catch (err) {
        logger.error('GIFT', 'getOnlineGift: error for userId=' + userId + ': ' + err.message);
        logger.error('GIFT', 'Stack: ' + err.stack);
        callback(RH.error(RH.ErrorCode.UNKNOWN, 'Internal server error'));
    }
}

/**
 * Get online bonus config entry by ID string.
 * @param {string} id - The tier ID as string ("1" to "7")
 * @returns {object|null} The config entry or null if not found
 */
function getOnlineBonusConfig(id) {
    try {
        var configs = GameData.get('onlineBonus');
        if (configs && configs[id]) {
            return configs[id];
        }
    } catch (e) {
        // Config not loaded
    }
    return null;
}

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'getGiftList':
            // TODO: Get available gift/reward list
            // REQ: -
            // RES: gift list with claim status
            logger.info('GIFT', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'claim':
            // TODO: Claim a specific gift reward
            // REQ: giftId
            // RES: reward items
            logger.info('GIFT', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getCDKeyReward':
            // TODO: Redeem CD key / gift code for reward
            // REQ: cdKey
            // RES: reward items
            logger.info('GIFT', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        // ★ NEW: Claim online time-based reward
        case 'getOnlineGift':
            getOnlineGift(socket, parsed, callback);
            break;

        default:
            logger.warn('GIFT', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
