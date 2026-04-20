'use strict';

/**
 * =====================================================
 *  activity/getActivityDetail.js — Get Activity Detail
 *  Super Warrior Z Game Server — Main Server
 *
 *  Client: BaseActivity.changeDetalActivityView()
 *          → type:"activity", action:"getActivityDetail"
 *          params: { actId, cycleType?, poolId? }
 *
 *  Response: { type, action, userId, actId, cycleType, version,
 *              forceEndTime, certificationLevel, act, uact }
 *
 *  ACT COMMON FIELDS (HAR verified):
 *    _id, _templateId, _templateName, _name, __name, _des, __des,
 *    _icon, _image, _displayIndex, _showRed, _activityType, _cycleType,
 *    _enable, _timeType, _newUserUsing, _isloop, _loopInterval, _loopCount,
 *    _loopTag, _startDay, _durationDay, _oldUserVip, _oldUserServerOpenDay,
 *    _oldUserServerOpenDayEnd, _oldUserOfflineDay, _startTime, _endTime,
 *    _timestamp, _hideos, _limitReward:{_items:{}}, __ruleDes,
 *    _displayAdvance, _displayExtend
 *
 *  UACT COMMON FIELDS (HAR verified):
 *    _activityType, _activityId, _startTime, _endTime, _loopTag,
 *    _haveClick, _gotRewards:{_items:{}}
 *
 *  END TIME PRIORITY (client getActEndTime line 57976):
 *    1. act._endTime → 2. uact._endTime → 3. act._nextRefreshTime
 *    → 4. Math.min(t, forceEndTime)
 *
 *  SOURCE: main.min.js + HAR (10 detail responses)
 * =====================================================
 */

var RH = require('../../../shared/responseHelper');
var logger = require('../../../shared/utils/logger');
var GameData = require('../../../shared/gameData/loader');
var ActivityManager = require('../../../shared/activityManager');
var ActState = require('../../../shared/activityState');

function handle(socket, parsed, callback) {
    var userId = parsed.userId;
    var actId = parsed.actId;
    var cycleType = parsed.cycleType;
    var version = parsed.version || '1.0';

    logger.info('ACTIVITY', 'getActivityDetail userId=' + userId +
        ' actId=' + actId + ' cycleType=' + cycleType);

    // Step 1: Cari activity config dari activityDefine
    var activityDefine = GameData.get('activityDefine');
    var def = null;
    if (activityDefine && Array.isArray(activityDefine)) {
        for (var i = 0; i < activityDefine.length; i++) {
            if (activityDefine[i].id === actId) { def = activityDefine[i]; break; }
        }
    }

    if (!def) {
        callback(RH.success({
            type: 'activity', action: 'getActivityDetail',
            userId: userId, actId: actId,
            cycleType: cycleType || 0, version: version,
            forceEndTime: 0, certificationLevel: 0,
            act: {}, uact: {}
        }));
        return;
    }

    // Step 2: Build act (ActivityBase detail format)
    var act = _buildAct(def);
    ActivityManager.computeTimes(act);

    // Step 3: Get or create uact
    var uact = ActState.get(userId, actId);
    if (!uact) {
        uact = ActState.createDefault(act);
        ActState.set(userId, actId, uact);
        logger.info('ACTIVITY', 'Created uact userId=' + userId + ' actId=' + actId);
    }

    // Step 4: Response
    callback(RH.success({
        type: 'activity', action: 'getActivityDetail',
        userId: userId, actId: actId,
        cycleType: cycleType || act._cycleType || 0,
        version: version,
        forceEndTime: 0, certificationLevel: 0,
        act: act,
        uact: JSON.parse(JSON.stringify(uact))
    }));
}

/**
 * Convert brief definition → ActivityBase detail format.
 * Harus match HAR structure 100%.
 */
function _buildAct(def) {
    var act = {
        _id: def.id || '',
        _templateId: '',
        _templateName: def.templateName || '',
        _name: def.name || '',
        __name: '',
        _des: def.des || '',
        __des: '',
        _icon: def.icon || '',
        _image: def.image || '',
        _displayIndex: def.displayIndex || 0,
        _showRed: def.showRed === true,
        _activityType: def.actType || 0,
        _cycleType: def.actCycle || def.cycleType || 0,
        _enable: true,
        _timeType: def.timeType || 0,
        _newUserUsing: true,
        _isloop: false,
        _loopInterval: 0,
        _loopCount: 0,
        _loopTag: '',
        _startDay: def.startDay || 0,
        _durationDay: def.durationDay || 7,
        _oldUserVip: 0,
        _oldUserServerOpenDay: 0,
        _oldUserServerOpenDayEnd: 0,
        _oldUserOfflineDay: 0,
        _startTime: 0,
        _endTime: 0,
        _timestamp: 0,
        _hideos: '',
        _limitReward: { _items: {} },
        __ruleDes: null,
        _displayAdvance: 0,
        _displayExtend: 0
    };

    // Copy detail fields dari def jika ada (e.g. _items, _days, _rewards)
    var skip = { id:1, templateName:1, name:1, icon:1, image:1,
        displayIndex:1, showRed:1, actType:1, actCycle:1,
        cycleType:1, timeType:1, durationDay:1, startDay:1,
        minDay:1, maxDay:1, poolId:1, haveExReward:1, des:1 };
    for (var k in def) {
        if (def.hasOwnProperty(k) && !skip[k] && !(k in act)) {
            act[k] = def[k];
        }
    }

    return act;
}

function updateUserState(userId, actId, updates) {
    return ActState.update(userId, actId, updates);
}

function getUserState(userId, actId) {
    return ActState.get(userId, actId);
}

module.exports = { handle: handle, updateUserState: updateUserState, getUserState: getUserState };
