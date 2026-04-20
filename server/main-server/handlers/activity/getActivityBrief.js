'use strict';

/**
 * =====================================================
 *  activity/getActivityBrief.js — Get Activity Brief List
 *  Super Warrior Z Game Server — Main Server
 *
 *  Client: Home.setActs() → type:"activity", action:"getActivityBrief"
 *
 *  Response: { type, action, userId, version, _acts }
 *  _acts = map { [id]: brief entry }
 *
 *  SOURCE: main.min.js line 234743 + HAR (28 responses)
 * =====================================================
 */

var RH = require('../../../shared/responseHelper');
var logger = require('../../../shared/utils/logger');
var GameData = require('../../../shared/gameData/loader');
var ActivityManager = require('../../../shared/activityManager');

function handle(socket, parsed, callback) {
    var userId = parsed.userId;
    var openDays = ActivityManager.getOpenServerDays();

    var activityDefine = GameData.get('activityDefine');
    var actsMap = {};

    if (activityDefine && Array.isArray(activityDefine)) {
        var serverOpenDate = ActivityManager.getServerOpenDate();

        for (var i = 0; i < activityDefine.length; i++) {
            var def = activityDefine[i];
            if (!def.id) continue;
            if (!ActivityManager.isAvailableByDay(def)) continue;

            var entry = {};
            entry.id = def.id;
            if (def.templateName != null) entry.templateName = def.templateName;
            if (def.name != null) entry.name = def.name;
            if (def.icon != null) entry.icon = def.icon;
            if (def.displayIndex != null) entry.displayIndex = def.displayIndex;
            if (def.showRed != null) entry.showRed = def.showRed;
            if (def.actCycle != null) entry.actCycle = def.actCycle;
            if (def.actType != null) entry.actType = def.actType;

            // Conditional fields
            if (def.cycleType != null && def.cycleType !== def.actCycle) {
                entry.cycleType = def.cycleType;
            }
            if (def.poolId != null && def.poolId > 0) {
                entry.poolId = def.poolId;
            }
            if (def.actType === 1001 && def.haveExReward != null) {
                entry.haveExReward = def.haveExReward;
            }
            if (def.actType === 100 && def.hangupReward != null) {
                entry.hangupReward = def.hangupReward;
            }
            // endTime hanya REGRESSION (actCycle=17, timeType=1)
            if (def.actCycle === 17 && def.timeType === 1 && serverOpenDate) {
                entry.endTime = serverOpenDate + ((def.startDay || 0) + (def.durationDay || 7)) * 86400000 - 1;
            }

            actsMap[entry.id] = entry;
        }
    }

    logger.info('ACTIVITY', 'getActivityBrief userId=' + userId +
        ' openDays=' + openDays + ' count=' + Object.keys(actsMap).length);

    callback(RH.success({
        type: parsed.type || 'activity',
        action: parsed.action || 'getActivityBrief',
        userId: userId || '',
        version: parsed.version || '1.0',
        _acts: actsMap
    }));
}

module.exports = { handle: handle };
