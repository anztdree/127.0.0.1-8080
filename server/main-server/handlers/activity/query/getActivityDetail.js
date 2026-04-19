'use strict';

/**
 * =====================================================
 *  activity/query/getActivityDetail.js
 *  Super Warrior Z Game Server — Main Server
 *
 *  ACTION: getActivityDetail
 *  DESC: Get full config and user state for a specific activity
 *  TYPE: READ
 *
 *  CLIENT REQUEST:
 *    { type:"activity", action:"getActivityDetail", userId, actId, cycleType?, poolId?, version? }
 *
 *  CLIENT SOURCE: BaseActivity.changeDetalActivityView() (line 96437)
 *    Called when user taps an activity in the list.
 *
 *  RESPONSE (Custom — verified against HAR):
 *    {
 *      type: "activity",
 *      action: "getActivityDetail",
 *      userId: <string>,
 *      actId: <string>,
 *      cycleType: <number>,
 *      version: <string>,
 *      forceEndTime: <number>,          // 0 if no override
 *      act: {                            // Full activity config
 *        _id, _templateId, _templateName, _name, __name,
 *        _des, __des, _icon, _image,
 *        _displayIndex, _showRed,
 *        _activityType, _cycleType,
 *        _enable, _timeType, _newUserUsing,
 *        _isloop, _loopInterval, _loopCount, _loopTag,
 *        _startDay, _durationDay,
 *        _oldUserVip, _oldUserServerOpenDay, _oldUserServerOpenDayEnd, _oldUserOfflineDay,
 *        _startTime, _endTime,
 *        _timestamp, _hideos,
 *        _limitReward: { _items: {} },
 *        __ruleDes, _ruleDes,
 *        _displayAdvance, _displayExtend,
 *        // Type-specific config fields:
 *        _days, _items, _rewards, _cost, _costs,
 *        _rewardOdds, _rateDes, _rankReward, _tasks,
 *        _timesWeight, _freeTimes, _randDiamonds,
 *        _rechargeTask, _top8, _showItems,
 *        _rankFirst, _rankSecondThird, _disableRank,
 *        _showType, _advanceEndReward, _finalItem,
 *        _resignCost, _maxResignTimes,
 *        ...
 *      },
 *      uact: {                           // Per-user activity state
 *        _activityType, _activityId,
 *        _startTime, _endTime, _loopTag,
 *        _haveClick, _gotRewards: { _items: {} },
 *        // Type-specific user state:
 *        _days, _items, _buyTimes, _curCount,
 *        _haveGotReward, _gotExRewards,
 *        _signedDay, _maxActiveDay, _lastActiveDate, _activeItem,
 *        _batchId, _lastRefreshTime,
 *        _rechargeTime, _resignCount, _haveGotFinalReward,
 *        ...
 *      }
 *    }
 *
 *  VERIFIED: 10 HAR responses decoded (LZString UTF-16 compressed)
 *    - actType 2007 (RECHARGE_DAILY): actId=8df2ff74...
 *    - actType 2004 (CUMULATIVE_RECHARGE): actId=f4f2041a...
 *    - actType 5003 (TODAY_DISCOUNT): actId=d02c4167...
 *    - actType 2003 (NEW_SERVER_GIFT): actId=93a2ebab...
 *    - actType 5037 (HERO_SUPER_GIFT): actId=a0d76656...
 *    - actType 2001 (HERO_GIFT): actId=ee7c49ba...
 *    - actType 1003 (RECHARGE_3): actId=99c3b0c4...
 *
 *  DATA SOURCE:
 *    - Activity config: ACTIVITY_DETAIL_CONFIG from _config.js (HAR-verified)
 *    - User state: In-memory _userActivityState map (init on first request)
 *    - Times: ActivityManager for server open day calculation
 *
 *  STATUS: SEMPURNA
 * =====================================================
 */

var RH = require('../../../../shared/responseHelper');
var logger = require('../../../../shared/utils/logger');
var activityConfig = require('../_config');
var ActivityManager = require('../../../activity');

// ─────────────────────────────────────────────
// In-memory user activity state store
// Key: userId + "|" + actId → uact state object
// ─────────────────────────────────────────────
var _userActivityStates = {};

/**
 * Get or create user activity state for a specific activity.
 *
 * Based on HAR analysis, uact always has these common fields:
 *   _activityType, _activityId, _startTime, _endTime,
 *   _loopTag, _haveClick, _gotRewards: { _items: {} }
 *
 * Plus type-specific fields that vary by _activityType.
 *
 * @param {string} userId - User UUID
 * @param {object} actConfig - Activity config object from ACTIVITY_DETAIL_CONFIG
 * @returns {object} User activity state object
 */
function getOrCreateUserState(userId, actConfig) {
    var actId = actConfig._id;
    var stateKey = userId + '|' + actId;

    // Return existing state if present
    if (_userActivityStates[stateKey]) {
        return _userActivityStates[stateKey];
    }

    // Create new default state based on activity type
    var activityType = actConfig._activityType;
    var now = Date.now();
    var startTime = actConfig._startTime || now;
    var endTime = actConfig._endTime || 0;

    var uact = {
        _activityType: activityType,
        _activityId: actId,
        _startTime: startTime,
        _endTime: endTime,
        _loopTag: actConfig._loopTag || '',
        _haveClick: true,    // HAR shows true for all seen activities
        _gotRewards: { _items: {} }
    };

    // ── Type-specific user state initialization ──

    // RECHARGE_DAILY (2007): per-day recharge tracking
    if (activityType === 2007 && actConfig._days) {
        var days = {};
        var dayKeys = Object.keys(actConfig._days);
        for (var i = 0; i < dayKeys.length; i++) {
            days[dayKeys[i]] = { _curCount: 0, _haveGotReward: {} };
        }
        uact._days = days;
    }

    // CUMULATIVE_RECHARGE (2004): cumulative recharge count + per-tier rewards
    if (activityType === 2004 && actConfig._items) {
        var haveGotReward = {};
        var itemKeys = Object.keys(actConfig._items);
        for (var i = 0; i < itemKeys.length; i++) {
            haveGotReward[itemKeys[i]] = false;
        }
        uact._curCount = 0;
        uact._haveGotReward = haveGotReward;
        uact._rechargeTime = 0;
    }

    // TODAY_DISCOUNT (5003): daily discount items + batch tracking
    if (activityType === 5003 && actConfig._items) {
        var items = {};
        var itemKeys = Object.keys(actConfig._items);
        for (var i = 0; i < itemKeys.length; i++) {
            items[itemKeys[i]] = { _goodId: 0, _haveBrought: false };
        }
        uact._items = items;
        uact._batchId = generateUUID();
        uact._lastRefreshTime = now;
    }

    // NEW_SERVER_GIFT (2003): per-item buy times
    if (activityType === 2003 && actConfig._items) {
        var buyTimes = {};
        var itemKeys = Object.keys(actConfig._items);
        for (var i = 0; i < itemKeys.length; i++) {
            buyTimes[itemKeys[i]] = 0;
        }
        uact._buyTimes = buyTimes;
    }

    // HERO_SUPER_GIFT (5037): per-item buy times
    if (activityType === 5037 && actConfig._items) {
        var buyTimes = {};
        var itemKeys = Object.keys(actConfig._items);
        for (var i = 0; i < itemKeys.length; i++) {
            buyTimes[itemKeys[i]] = 0;
        }
        uact._buyTimes = buyTimes;
    }

    // HERO_GIFT (2001): per-item left times + cur count
    if (activityType === 2001 && actConfig._items) {
        var items = {};
        var itemKeys = Object.keys(actConfig._items);
        for (var i = 0; i < itemKeys.length; i++) {
            items[itemKeys[i]] = { _leftTimes: 5, _curCount: 0 };
        }
        uact._items = items;
    }

    // RECHARGE_3 / 7-DAY TOP-UP (1003): per-day sign + resign tracking
    if (activityType === 1003 && actConfig._items) {
        var items = {};
        var itemKeys = Object.keys(actConfig._items);
        for (var i = 0; i < itemKeys.length; i++) {
            items[itemKeys[i]] = { _canGetReward: false, _haveGotReward: false };
        }
        uact._items = items;
        uact._haveGotFinalReward = false;
        uact._resignCount = 0;
    }

    // Default for other types: empty _items
    if (!uact._items && !uact._days && !uact._buyTimes && !uact._haveGotReward) {
        uact._items = {};
    }

    // Cache the state
    _userActivityStates[stateKey] = uact;

    logger.info('ACTIVITY', 'Created new uact state for userId=' + userId +
        ' actId=' + actId + ' type=' + activityType);

    return uact;
}

/**
 * Generate a simple UUID v4 for internal use (batchId etc.)
 * @returns {string} UUID string
 */
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        var v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Handle getActivityDetail request.
 *
 * Flow:
 *   1. Look up activity config by actId from ACTIVITY_DETAIL_CONFIG
 *   2. Get or create user activity state (uact)
 *   3. Build response matching HAR-verified format
 *   4. Return { type, action, userId, actId, cycleType, version, forceEndTime, act, uact }
 *
 * @param {Object} socket - Socket.IO socket instance
 * @param {Object} parsed - Parsed request from client
 * @param {function} callback - Socket.IO acknowledgment callback
 */
function handle(socket, parsed, callback) {
    var userId = parsed.userId;
    var actId = parsed.actId;
    var cycleType = parsed.cycleType;
    var version = parsed.version || '1.0';

    logger.info('ACTIVITY', 'getActivityDetail userId=' + userId +
        ' actId=' + actId + ' cycleType=' + cycleType);

    // ── Step 1: Find activity config ──
    var actConfig = activityConfig.ACTIVITY_DETAIL_CONFIG[actId];

    if (!actConfig) {
        // Activity not found in config — return empty success
        // This matches the original server behavior for unknown/invalid actIds
        logger.warn('ACTIVITY', 'getActivityDetail: actId not found: ' + actId);
        callback(RH.success({
            type: 'activity',
            action: 'getActivityDetail',
            userId: userId,
            actId: actId,
            cycleType: cycleType || 0,
            version: version,
            forceEndTime: 0,
            act: {},
            uact: {}
        }));
        return;
    }

    // Deep clone to prevent mutation
    var actData = JSON.parse(JSON.stringify(actConfig));

    // ── Step 2: Get or create user activity state ──
    var uactData = getOrCreateUserState(userId, actData);

    // Deep clone uact to prevent mutation
    var uactClone = JSON.parse(JSON.stringify(uactData));

    // ── Step 3: Build response matching HAR format ──
    var response = {
        type: 'activity',
        action: 'getActivityDetail',
        userId: userId,
        actId: actId,
        cycleType: cycleType || actData._cycleType || 0,
        version: version,
        forceEndTime: 0,     // HAR always shows 0 for normal activities
        act: actData,
        uact: uactClone
    };

    logger.info('ACTIVITY', 'getActivityDetail returning actType=' + actData._activityType +
        ' name=' + (actData._name || '') +
        ' uactKeys=' + Object.keys(uactClone).join(','));

    callback(RH.success(response));
}

/**
 * Update user activity state (called by other activity action handlers).
 *
 * @param {string} userId - User UUID
 * @param {string} actId - Activity UUID
 * @param {object} updates - Partial uact fields to merge
 */
function updateUserState(userId, actId, updates) {
    var stateKey = userId + '|' + actId;
    var existing = _userActivityStates[stateKey];

    if (!existing) {
        logger.warn('ACTIVITY', 'updateUserState: no state found for userId=' +
            userId + ' actId=' + actId);
        return;
    }

    // Merge updates into existing state
    for (var key in updates) {
        if (updates.hasOwnProperty(key)) {
            existing[key] = updates[key];
        }
    }
}

/**
 * Get user activity state (called by other activity action handlers).
 *
 * @param {string} userId - User UUID
 * @param {string} actId - Activity UUID
 * @returns {object|null} User activity state, or null if not found
 */
function getUserState(userId, actId) {
    var stateKey = userId + '|' + actId;
    return _userActivityStates[stateKey] || null;
}

/**
 * Clear all cached user activity states.
 * Called on server shutdown or for testing.
 */
function clearAllStates() {
    _userActivityStates = {};
    logger.info('ACTIVITY', 'All user activity states cleared');
}

module.exports = {
    handle: handle,
    updateUserState: updateUserState,
    getUserState: getUserState,
    clearAllStates: clearAllStates
};
