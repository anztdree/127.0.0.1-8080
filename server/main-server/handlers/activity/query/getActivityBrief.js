'use strict';

/**
 * =====================================================
 *  activity/query/getActivityBrief.js — Get Activity Brief List
 *  Super Warrior Z Game Server — Main Server
 *
 *  ACTION: getActivityBrief — Return brief list of all active activities.
 *
 *  STATUS: IMPLEMENTED — 100% verified against HAR + main.min.js client code
 *
 *  ═══════════════════════════════════════════════════
 *  CLIENT REQUEST (HAR + main.min.js line 168092-168096):
 *    { type:"activity", action:"getActivityBrief", userId, version:"1.0" }
 *
 *  CLIENT CALLBACKS (2 call sites):
 *    1. Home.setActs (line 168087) — main entry, populates activity bar
 *    2. backToActivityPage (line 57528) — returning from activity detail
 *
 *  RESPONSE FORMAT (verified from HAR, 28 identical responses):
 *    {
 *      type: "activity",
 *      action: "getActivityBrief",
 *      userId: "...",
 *      version: "1.0",
 *      _acts: {
 *        "<uuid>": {
 *          id: "<uuid>",           // Activity UUID (matches key)
 *          templateName: "...",    // Chinese template name
 *          name: "...",            // English display name
 *          icon: "/activity/...",  // Icon path (some have ?rnd= cache buster)
 *          displayIndex: number,   // Sort order within cycle group
 *          showRed: boolean,       // Red dot notification flag
 *          actCycle: number,       // ACTIVITY_CYCLE enum value
 *          actType: number,        // ACTIVITY_TYPE enum value
 *          [haveExReward]: boolean // OPTIONAL — only on actType=1001 (LOGIN)
 *        }
 *      }
 *    }
 *
 *  ═══════════════════════════════════════════════════
 *  CLIENT PROCESSING (Home.setActs, line 168098-168111):
 *
 *  for(var a in t._acts) {
 *    var r = t._acts[a];
 *    r.endTime → sets regressionActEndtime (only for REGRESSION type)
 *    r.id → activity UUID
 *    r.actType → routing switch:
 *      101  NEW_USER_MAIL    → sets FB share flag (o = true)
 *      5025 FB_SHARE         → checkLikeIsOn(id, actType, cycleType, poolId)
 *      5023 FBGIVELIKE       → checkLikeIsOn(id, actType, cycleType, poolId)
 *      5024 IOSGIVELIKE      → checkLikeIsOn(id, actType, cycleType, poolId)
 *      100  ITEM_DROP        → hasHangupActivityDrop=true, setHangupReward(r.hangupReward)
 *      102  FREE_INHERIT     → hasFreeInherit=true, push to inheritHeroerActBriefDataList
 *      5031 OFFLINE_ACT      → offLineActCycle=r.actCycle
 *      5033 OFFLINE_ACT_TWO  → offLineActCycleTwo=r.actCycle
 *      ALL OTHERS            → group by r.actCycle into actCycleList[r.actCycle][]
 *  }
 *
 *  After loop, unconditionally pushes these cycles if conditions met:
 *    ACTIVITY_CYCLE.FBSDKSHARE (90)  — if window.giveLikeSdk && o
 *    ACTIVITY_CYCLE.QUESTION (60)    — if user has quest data
 *    ACTIVITY_CYCLE.DOWNLOADREWARD (84) — if download award active
 *    ACTIVITY_CYCLE.YouTubeRecruit (93) — if YouTuberModel exists
 *    ACTIVITY_CYCLE.RedFoxCommunity (94) — if within time window
 *
 *  ═══════════════════════════════════════════════════
 *  CLIENT PROCESSING (backToActivityPage, line 57528-57551):
 *    Reads l.id and l.actCycle from _acts to match activity by cycle and ID.
 *    Passes matched activities as actsData to BaseActivity scene.
 *
 *  ═══════════════════════════════════════════════════
 *  ACTIVITY_CYCLE enum (client line 79710):
 *    0=UNKNOWN, 1=NEW_USER, 2=SERVER_OPEN, 3=WEEK, 4=RANK,
 *    5=SUMMON, 6=BE_STRONG, 7=LIMIT_HERO, 8=HOLIDAY,
 *    9=EQUIPTOTALACTIVITY, 10=SIGNTOTALACTIVITY, 11=SUMARRYGIFT,
 *    12=MERGESERVER, 13=SPECIALHOLIDY, 14=BUDOPEAK, 15=SUPERLEGEND,
 *    16=OLDUSERBACK, 17=REGRESSION, 18=ULTRA_INSTINCT, 19=WEEKEND_SIGNIN,
 *    20=WELFARE_ACCOUNT, 60=QUESTION, 84=DOWNLOADREWARD,
 *    88=FBGIVELIKE, 89=IOSGIVELIKE, 90=FBSDKSHARE,
 *    91=OFFLINEACT, 92=OFFLINEACT_TWO, 93=YouTubeRecruit,
 *    94=RedFoxCommunity, 5041=NEW_HERO_CHALLENGE
 *
 *  ACTIVITY_TYPE enum (client line 79722):
 *    0=UNKNOWN, 100=ITEM_DROP, 101=NEW_USER_MAIL, 102=FREE_INHERIT,
 *    1001=LOGIN, 1002=GROW, 1003=RECHARGE_3,
 *    2001=HERO_GIFT, 2002=HERO_ORANGE, 2003=NEW_SERVER_GIFT,
 *    2004=RECHARGE_GIFT, 2005=POWER_RANK, 2006=RECHARGE_7,
 *    2007=RECHARGE_DAILY,
 *    3001-3016 (various luck/gift/task types),
 *    4001=HERO_IMAGE_RANK, 4002=LESSON_RANK, 4003=TEMPLE_RANK,
 *    5001-5041 (various shop/equip/activity types),
 *    5037=HERO_SUPER_GIFT, 99999999=RECHARGE_MERGESERVER
 * =====================================================
 */

var RH = require('../../../../shared/responseHelper');
var logger = require('../../../../shared/utils/logger');
var activityConfig = require('../_config');

/**
 * Deep clone activity data to prevent config mutation.
 *
 * Creates a fresh copy of ACTS_MAP for each response so that:
 *   1. No handler can accidentally mutate the shared config
 *   2. Each user gets an independent snapshot
 *   3. Future dynamic per-user fields can be safely added
 *
 * Uses JSON.parse(JSON.stringify()) for reliability (no circular refs in activity data).
 *
 * @returns {Object} Deep cloned _acts map
 */
function cloneActsMap() {
    var source = activityConfig.ACTS_MAP;
    var cloned = {};
    var keys = Object.keys(source);
    for (var i = 0; i < keys.length; i++) {
        cloned[keys[i]] = JSON.parse(JSON.stringify(source[keys[i]]));
    }
    return cloned;
}

/**
 * Handle getActivityBrief request.
 *
 * Returns the complete list of active activities as a brief/catalog.
 * This is a READ-ONLY endpoint — no user state is modified.
 *
 * The response is identical for all users (static activity config).
 * Per-user state (progress, rewards claimed, etc.) is handled by
 * getActivityDetail and individual activity action handlers.
 *
 * @param {Object} socket - Socket.IO socket instance
 * @param {Object} parsed - Parsed request from client
 *   @param {string} parsed.type - "activity"
 *   @param {string} parsed.action - "getActivityBrief"
 *   @param {string} parsed.userId - User UUID
 *   @param {string} parsed.version - Protocol version (always "1.0")
 * @param {function} callback - Socket.IO acknowledgment callback
 */
function handle(socket, parsed, callback) {
    var userId = parsed.userId;
    logger.info('ACTIVITY', 'getActivityBrief userId=' + userId);

    // Build response with deep-cloned activity data
    // Deep clone prevents accidental mutation of shared config
    var actsData = cloneActsMap();

    callback(RH.success({
        type: parsed.type || 'activity',
        action: parsed.action || 'getActivityBrief',
        userId: userId || '',
        version: parsed.version || '1.0',
        _acts: actsData
    }));
}

module.exports = { handle: handle };
