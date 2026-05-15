/**
 * activity/getActivityBrief.js — Handler: activity/getActivityBrief
 *
 * ═══════════════════════════════════════════════════════════════════
 * DEEP TRACE — main.min(unminfy).js (100% verified)
 * ═══════════════════════════════════════════════════════════════════
 *
 * CALLER #1: Home.setActs() L234743 — called every Home screen entry
 *   ts.processHandler({
 *       type: 'activity', action: 'getActivityBrief',
 *       userId: UserInfoSingleton.getInstance().userId,
 *       version: '1.0'
 *   }, callback);
 *
 * CALLER #2: backToActivityPage() L90691 — returning from detail page
 *   Same request structure, same callback pattern.
 *
 * RESPONSE CONSUMED BY CLIENT:
 *   setActs() L234752: iterates t._acts[] — each item is a plain object (NO Serializable)
 *   Field names in _acts items have NO underscore prefix (raw: id, actType, actCycle, etc.)
 *   The _acts KEY itself has underscore: { _acts: [...] }
 *
 * CLIENT ROUTING (setActs L234755-234770):
 *   actType 101 (NEW_USER_MAIL)  → SKIPPED, never displayed
 *   actType 100 (ITEM_DROP)       → setHangupReward(r.hangupReward), no UI
 *   actType 102 (FREE_INHERIT)    → push to inheritHeroerActBriefDataList
 *   actType 5023/5024 (FB_LIKE)   → checkLikeIsOn() → getActivityDetail
 *   actType 5025 (FB_SHARE)       → set flag, add FBSDKSHARE tab
 *   actType 5031 (OFFLINE_ACT)    → store in ACTIVITY_CYCLE.OFFLINEACT(91) slot
 *   actType 5033 (OFFLINE_ACT_TWO)→ store in ACTIVITY_CYCLE.OFFLINEACT_TWO(92) slot
 *   ALL OTHER actTypes            → push to actCycleList[r.actCycle][]
 *
 * HOME ICONS: ActivityCycleInfoMap[cycle].homeIcon — NOT from brief data
 *   Exception: OFFLINE_ACT, OFFLINE_ACT_TWO, NEW_HERO_CHALLENGE use brief .icon
 * TAB ICONS: brief item .icon field → activityIconBg
 *
 * RESPONSE FORMAT:
 *   { _acts: [
 *       {
 *           id:           string   — Activity ID (passed to getActivityDetail as actId)
 *           actType:      number   — ACTIVITY_TYPE enum (determines client routing)
 *           actCycle:     number   — ACTIVITY_CYCLE enum (tab grouping)
 *           cycleType:    number   — Same as actCycle for normal acts
 *           poolId:       number   — Passed to getActivityDetail (reward config lookup)
 *           icon:         string   — Tab icon resource key or URL
 *           showRed:      boolean  — Red dot on detail view (false = no dot)
 *           displayIndex: number   — Sort within cycle tab (higher = first)
 *           name:         string   — Activity name (optional, from ActivityBase)
 *           endTime:      number   — Only for REGRESSION countdown (L234757)
 *           hangupReward: object   — Only for ITEM_DROP(100), RandGroupItems structure
 *       }
 *   ]}
 *
 * DATA SOURCE: 100% SERVER-DRIVEN
 *   - No config JSON, no userData field stores activity data
 *   - Server decides which activities are active based on conditions
 *   - Auto-generated from templates + condition evaluation
 *
 * CONDITIONS (evaluated per user per request):
 *   K1: userData.user._createTime  → user account age (days since creation)
 *   K2: config.serverOpenDate       → server age (days since first start)
 *   K3: userData.user._attribute._items[104]._num → player level
 *   K4: dayOfWeek                   → weekend detection (Sat/Sun)
 *
 * STRICT RULES: NO STUB, OVERRIDE, FORCE, BYPASS, DUMMY, ASUMSI
 */

// ═══════════════════════════════════════════════════════════════
// CLIENT CONSTANTS — Verified from main.min(unminfy).js
// ═══════════════════════════════════════════════════════════════

/**
 * ACTIVITY_TYPE enum — L127063-127145
 * Maps to actType field in brief items. Determines client routing in setActs().
 */
var ACTIVITY_TYPE = {
    ITEM_DROP:              100,
    NEW_USER_MAIL:          101,   // Skipped by client — never displayed
    FREE_INHERIT:           102,
    LOGIN:                  1001,
    GROW:                   1002,
    RECHARGE_3:             1003,
    HERO_GIFT:              2001,
    HERO_ORANGE:            2002,
    NEW_SERVER_GIFT:        2003,
    RECHARGE_GIFT:          2004,
    POWER_RANK:             2005,
    RECHARGE_7:             2006,
    RECHARGE_DAILY:         2007,
    NORMAL_LUCK:            3001,
    LUXURY_LUCK:            3002,
    SUPER_GIFT:             3003,
    LUCKY_FEEDBACK:         3004,
    DAILY_DISCOUNT:         3005,
    DAILY_BIG_GIFT:         3006,
    CUMULATIVE_RECHARGE:    3007,
    ENTRUST_ACT:            3008,
    FRIEND_BATTLE_ACT:      3009,
    MARKET_ACT:             3010,
    KARIN_ACT:              3011,
    BULMA_PARTY:            3012,
    HERO_HELP:              3013,
    SIGN_ACT:               3014,
    HERO_ARRIVAL:           3015,
    BE_STRONG:              3016,
    HERO_IMAGE_RANK:        4001,
    LESSON_RANK:            4002,
    TEMPLE_RANK:            4003,
    RK_POWER_RANK:          4004,
    CELL_GAME_RANK:         4005,
    HERO_POWER_RANK:        4006,
    IMPRINT_STAR_RANK:      4007,
    TALENT_RANK:            4008,
    LUCKY_EQUIP:            5001,
    IMPRINT_UP:             5002,
    TODAY_DISCOUNT:         5003,
    REFRESH_IMPRINT:        5004,
    SUMMON_GIFT:            5005,
    EQUIP_UP:               5006,
    COST_FEEDBACK:          5007,
    MERGE_SERVER_BOSS:      5008,
    GOOD_HARVESTS:          5009,
    TURNTABLE:              5010,
    SINGLE_RECHARGE:        5011,
    SHOP:                   5012,
    HERO_REWARD:            5013,
    WHIS_FEAST:             5014,
    NEW_HERO_REWARD:        5015,
    DOUBLE_ELEVEN:          5016,
    OLD_USER_CERTIFICATION: 5017,
    TIME_LIMIT_EXCHANGR:    5018,
    NIENBEAST:              5019,
    EXCHANGE_MERCHANT:      5020,
    IMPRINT_EXTRACTION:     5022,
    RECHARGE_MERGESERVER:   99999999,
    FBGIVELIKE:             5023,
    IOSGIVELIKE:            5024,
    FB_SHARE:               5025,
    BUGGY_TREASURE:         5026,
    DIAMOND_SHOP:           5027,
    EQUIP_CAST:             5028,
    KARIN_RICH:             5029,
    LUCKY_WHEEL:            5030,
    OFFLINE_ACT:            5031,
    BLIND_BOX:              5032,
    OFFLINE_ACT_TWO:        5033,
    FUND:                   5034,
    LANTENBLESSING:         5035,
    CROSS_SERVER_RANK:      5036,
    HERO_SUPER_GIFT:        5037,
    WELFARE_ACCOUNT:        5038,
    GALAXY_ADEVNTURE:       5039,
    GLEANING:               5040,
    NEW_HERO_CHALLENGE:     5041
};

/**
 * ACTIVITY_CYCLE enum — L127000-127034
 * Maps to actCycle field in brief items. Determines tab grouping in UI.
 */
var ACTIVITY_CYCLE = {
    UNKNOWN:            0,
    NEW_USER:           1,
    SERVER_OPEN:        2,
    WEEK:               3,   // NOT in ActivityCycleInfoMap (no home icon)
    RANK:               4,
    SUMMON:             5,
    BE_STRONG:          6,
    LIMIT_HERO:         7,
    HOLIDAY:            8,
    EQUIPTOTALACTIVITY: 9,
    SIGNTOTALACTIVITY:  10,
    SUMARRYGIFT:        11,
    MERGESERVER:        12,
    SPECIALHOLIDY:      13,
    BUDOPEAK:           14,
    SUPERLEGEND:        15,
    OLDUSERBACK:        16,
    REGRESSION:         17,
    ULTRA_INSTINCT:     18,
    WEEKEND_SIGNIN:     19,
    WELFARE_ACCOUNT:    20,
    FBSDKSHARE:         90,
    QUESTION:           60,
    DOWNLOADREWARD:     84,
    OFFLINEACT:         91,
    OFFLINEACT_TWO:     92,
    YouTubeRecruit:     93,
    RedFoxCommunity:    94,
    NEW_HERO_CHALLENGE: 5041
};

/**
 * ActivityCycleInfoMap — L116349-116494
 * Used by client for home screen icon rendering and sort order.
 * Included here for reference and for generating tab icons.
 * homeIcon: resource key for the activity cycle's home screen button
 * titleImg: resource key for the activity page title banner
 * sort: display priority on home screen (higher = shown first), negative = hidden special buttons
 */
var ACTIVITY_CYCLE_INFO = {
    1:    { titleImg: 'huodongnew6_png',     homeIcon: 'zhujiemiannew87_png',  sort: 79  },
    2:    { titleImg: 'huodongnew53_png',    homeIcon: 'zhujiemiannew88_png',  sort: 69  },
    4:    { titleImg: 'huodongnew176_png',   homeIcon: 'zhujiemiannew101_png', sort: 89  },
    5:    { titleImg: 'huodongnew175_png',   homeIcon: 'zhujiemiannew106_png', sort: 58  },
    6:    { titleImg: 'huodongnew174_png',   homeIcon: 'zhujiemiannew105_png', sort: 49  },
    7:    { titleImg: 'huodongnew193_png',   homeIcon: 'zhujiemiannew108_png', sort: 59  },
    8:    { titleImg: 'huodongnew219_png',   homeIcon: 'zhujiemiannew125_png', sort: 99  },
    9:    { titleImg: 'huodongnew236_png',   homeIcon: 'zhujiemiannew112_png', sort: 38  },
    10:   { titleImg: 'huodongnew237_png',   homeIcon: 'zhujiemiannew111_png', sort: 37  },
    11:   { titleImg: 'huodongnew235_png',   homeIcon: 'zhujiemiannew110_png', sort: 39  },
    12:   { titleImg: 'huodongnew268_png',   homeIcon: 'zhujiemiannew124_png', sort: 68  },
    13:   { titleImg: 'huodongnew349_png',   homeIcon: 'zhujiemiannew126_png', sort: 98  },
    14:   { titleImg: 'huodongnew385_png',   homeIcon: 'zhujiemiannew129_png', sort: 48  },
    15:   { titleImg: 'huodongnew384_png',   homeIcon: 'zhujiemiannew128_png', sort: 47  },
    16:   { titleImg: 'zhujiemiannew134_png',homeIcon: 'zhujiemiannew133_png', sort: 95  },
    17:   { titleImg: 'huodonghuiguihaoli49_png', homeIcon: 'zhujiemiannew151_png', sort: 50 },
    18:   { titleImg: 'huodongnew856_png',   homeIcon: 'zhujiemiannew152_png', sort: 60  },
    19:   { titleImg: 'huodongnew892_png',   homeIcon: 'zhujiemiannew153_png', sort: 62  },
    20:   { titleImg: 'huodongnew983_png',   homeIcon: 'zhujiemiannew154_png', sort: 64  },
    60:   { titleImg: '',                    homeIcon: 'zhujiemiannew141_png', sort: -1  },
    84:   { titleImg: '',                    homeIcon: 'zhujiemiannew148_png', sort: -2  },
    88:   { titleImg: '',                    homeIcon: 'zhujiemiannew142_language_png', sort: -3 },
    89:   { titleImg: '',                    homeIcon: 'zhujiemiannew136_language_png', sort: -3 },
    90:   { titleImg: '',                    homeIcon: 'zhujiemiannew137_language_png', sort: -3 },
    91:   { titleImg: '',                    homeIcon: 'zhujiemiannew149_png', sort: -4  },
    92:   { titleImg: '',                    homeIcon: 'zhujiemiannew150_png', sort: -4  },
    93:   { titleImg: '',                    homeIcon: 'youtobe_6_png',        sort: -5  },
    94:   { titleImg: '',                    homeIcon: 'honghushequ_png',      sort: -5  },
    5041: { titleImg: '',                    homeIcon: 'honghushequ_png',      sort: 65  }
};

// ═══════════════════════════════════════════════════════════════
// ACTIVITY TEMPLATES — Server-side activity catalog
// ═══════════════════════════════════════════════════════════════
//
// Each template defines one activity with activation conditions.
// Conditions are evaluated at request time against user data + server state.
// If ALL conditions pass → activity is included in the brief response.
//
// poolId: identifier passed to getActivityDetail for reward config lookup.
//   - Acts as a key into the activity's reward/resource configuration.
//   - Must be consistent across requests so the client can match brief ↔ detail.
//   - The actual reward logic is in getActivityDetail (built separately).
//
// displayIndex: sort order WITHIN a cycle tab (higher = shown first).
//   Client sorts by displayIndex DESC at L155535.
//
// icon: resource key for the small tab icon inside the activity page.
//   Client uses t[o].icon as activityIconBg at L155541.
//   Home button icons come from ActivityCycleInfoMap[cycle].homeIcon (NOT from brief).
//   Empty string → no background image on tab item (safe fallback).

var MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Generate a deterministic activity ID based on template properties.
 * Same template always produces the same ID → client can track showRed state.
 */
function generateActId(actType, actCycle, poolId) {
    return 'act_' + actType + '_' + actCycle + '_' + poolId;
}

/**
 * Activity template definitions.
 * Each object = one activity that can appear in the brief response.
 * Add new activities here to extend the system (100+ possible).
 */
var ACTIVITY_TEMPLATES = [

    // ─── NEW USER (cycle 1) ───────────────────────────────────
    // Active for users within 7 days of account creation.
    // Uses userData.user._createTime for age calculation.
    // Two activities in this cycle: LOGIN + GROW.

    {
        // Daily login reward — claim once per day for 7 days
        name:        '7-Day Login Reward',
        actType:     ACTIVITY_TYPE.LOGIN,
        actCycle:    ACTIVITY_CYCLE.NEW_USER,
        poolId:      'login_7day',
        displayIndex: 100,
        icon:        'huodongnew6_png',
        showRed:     false,
        conditions: [
            { check: 'userAge', maxDays: 7 }
        ]
    },
    {
        // Growth target — reach level milestones for rewards
        name:        'Growth Target',
        actType:     ACTIVITY_TYPE.GROW,
        actCycle:    ACTIVITY_CYCLE.NEW_USER,
        poolId:      'grow_target',
        displayIndex: 90,
        icon:        'huodongnew6_png',
        showRed:     false,
        conditions: [
            { check: 'userAge', maxDays: 7 }
        ]
    },

    // ─── SERVER OPEN (cycle 2) ────────────────────────────────
    // Active within first 14 days of server launch.
    // Uses config.serverOpenDate for age calculation.
    // One activity: new server celebration gift.

    {
        name:        'New Server Gift',
        actType:     ACTIVITY_TYPE.NEW_SERVER_GIFT,
        actCycle:    ACTIVITY_CYCLE.SERVER_OPEN,
        poolId:      'new_server_gift',
        displayIndex: 100,
        icon:        'huodongnew53_png',
        showRed:     false,
        conditions: [
            { check: 'serverAge', maxDays: 14 }
        ]
    },

    // ─── RANK (cycle 4) ───────────────────────────────────────
    // Always active. Shows power ranking leaderboard.
    // Detail handler will provide actual ranking data when built.

    {
        name:        'Power Rank',
        actType:     ACTIVITY_TYPE.POWER_RANK,
        actCycle:    ACTIVITY_CYCLE.RANK,
        poolId:      'power_rank',
        displayIndex: 100,
        icon:        'huodongnew176_png',
        showRed:     false,
        conditions: [
            { check: 'always' }
        ]
    },

    // ─── SUMMON (cycle 5) ─────────────────────────────────────
    // Active when user reaches level 5.
    // Summon-related gift/bonus events.

    {
        name:        'Summon Gift',
        actType:     ACTIVITY_TYPE.SUMMON_GIFT,
        actCycle:    ACTIVITY_CYCLE.SUMMON,
        poolId:      'summon_gift',
        displayIndex: 100,
        icon:        'huodongnew175_png',
        showRed:     false,
        conditions: [
            { check: 'userLevel', minLevel: 5 }
        ]
    },

    // ─── BE STRONG (cycle 6) ──────────────────────────────────
    // Active when user reaches level 10.
    // Progression-focused activities (reach target power, clear dungeons, etc.)

    {
        name:        'Be Strong',
        actType:     ACTIVITY_TYPE.BE_STRONG,
        actCycle:    ACTIVITY_CYCLE.BE_STRONG,
        poolId:      'be_strong',
        displayIndex: 100,
        icon:        'huodongnew174_png',
        showRed:     false,
        conditions: [
            { check: 'userLevel', minLevel: 10 }
        ]
    },

    // ─── LIMIT HERO (cycle 7) ─────────────────────────────────
    // Active when user reaches level 20.
    // Limited-time hero challenges and recruitments.

    {
        name:        'Limit Hero',
        actType:     ACTIVITY_TYPE.HERO_ARRIVAL,
        actCycle:    ACTIVITY_CYCLE.LIMIT_HERO,
        poolId:      'limit_hero',
        displayIndex: 100,
        icon:        'huodongnew193_png',
        showRed:     false,
        conditions: [
            { check: 'userLevel', minLevel: 20 }
        ]
    },

    // ─── WEEKEND SIGN-IN (cycle 19) ───────────────────────────
    // Only active on Saturday and Sunday (UTC+7 timezone).
    // Weekend-only sign-in bonus event.

    {
        name:        'Weekend Sign-in',
        actType:     ACTIVITY_TYPE.SIGN_ACT,
        actCycle:    ACTIVITY_CYCLE.WEEKEND_SIGNIN,
        poolId:      'weekend_signin',
        displayIndex: 100,
        icon:        'huodongnew892_png',
        showRed:     false,
        conditions: [
            { check: 'weekend' }
        ]
    },

    // ─── WELFARE ACCOUNT (cycle 20) ───────────────────────────
    // Always active for all users. Welfare/reward center.
    // Gateway to various bonus features (fund, codes, etc.)

    {
        name:        'Welfare Account',
        actType:     ACTIVITY_TYPE.WELFARE_ACCOUNT,
        actCycle:    ACTIVITY_CYCLE.WELFARE_ACCOUNT,
        poolId:      'welfare',
        displayIndex: 100,
        icon:        'huodongnew983_png',
        showRed:     false,
        conditions: [
            { check: 'always' }
        ]
    },

    // ─── ULTRA INSTINCT (cycle 18) ────────────────────────────
    // Active when user reaches level 30.
    // High-level progression content.

    {
        name:        'Ultra Instinct',
        actType:     ACTIVITY_TYPE.FUND,
        actCycle:    ACTIVITY_CYCLE.ULTRA_INSTINCT,
        poolId:      'ultra_instinct',
        displayIndex: 100,
        icon:        'huodongnew856_png',
        showRed:     false,
        conditions: [
            { check: 'userLevel', minLevel: 30 }
        ]
    }
];

// ═══════════════════════════════════════════════════════════════
// CONDITION EVALUATORS
// ═══════════════════════════════════════════════════════════════

/**
 * Evaluate a single condition against user data and server config.
 * Returns true if the condition is met.
 *
 * @param {object} cond    - Condition object { check: string, ...params }
 * @param {object} context - { userData, serverOpenDate, userLevel, userAgeDays, serverAgeDays, dayOfWeek }
 * @returns {boolean}
 */
function evaluateCondition(cond, context) {
    switch (cond.check) {

        case 'always':
            return true;

        case 'userAge':
            // Active if user account age is within maxDays
            // Uses userData.user._createTime (write-once, set at account creation)
            return context.userAgeDays >= 0 && context.userAgeDays <= (cond.maxDays || 999);

        case 'serverAge':
            // Active if server age is within maxDays
            // Uses config.serverOpenDate (auto-set on first server start)
            return context.serverAgeDays >= 0 && context.serverAgeDays <= (cond.maxDays || 999);

        case 'userLevel':
            // Active if user level meets minimum requirement
            // Level path: userData.user._attribute._items[104]._num
            return context.userLevel >= (cond.minLevel || 0);

        case 'weekend':
            // Active on Saturday (6) or Sunday (0) in UTC+7 timezone
            return context.dayOfWeek === 0 || context.dayOfWeek === 6;

        default:
            return false;
    }
}

/**
 * Evaluate ALL conditions for a template. All must pass (AND logic).
 * @param {object} template - Activity template with .conditions array
 * @param {object} context  - Same context passed to evaluateCondition
 * @returns {boolean}
 */
function evaluateTemplate(template, context) {
    if (!template.conditions || template.conditions.length === 0) {
        return true;
    }
    for (var i = 0; i < template.conditions.length; i++) {
        if (!evaluateCondition(template.conditions[i], context)) {
            return false;
        }
    }
    return true;
}

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

var PLAYERLEVELID = 104;

/**
 * Extract user level from userData.
 * Path: userData.user._attribute._items[104]._num
 * Falls back to 0 if path is missing (should not happen for valid accounts).
 */
function getUserLevel(userData) {
    try {
        return userData.user._attribute._items[PLAYERLEVELID]._num || 0;
    } catch (e) {
        return 0;
    }
}

/**
 * Get current day of week in UTC+7 timezone.
 * Returns 0 (Sunday) through 6 (Saturday).
 */
function getDayOfWeekUTC7() {
    var now = new Date();
    // UTC+7 = UTC + 7 hours
    var utc7 = new Date(now.getTime() + 7 * 60 * 60 * 1000);
    return utc7.getDay();
}

// ═══════════════════════════════════════════════════════════════
// MAIN HANDLER
// ═══════════════════════════════════════════════════════════════

function handleGetActivityBrief(request, ctx) {
    var userId = request.userId;

    // ─── STEP 1: Validate request ───
    ctx.logger.phase('ACTIVITY_GETBRIEF');
    ctx.logger.step(1, 3, 'Validate request', 'running');
    ctx.logger.details('request',
        ['userId', userId ? userId.substring(0, 20) + '...' : 'MISSING']
    );

    if (!userId) {
        ctx.logger.step(1, 3, 'Validate request', 'fail', 'userId MISSING');
        return ctx.buildErrorResponse(8);
    }
    ctx.logger.step(1, 3, 'Validate request', 'pass');

    // ─── STEP 2: Load user data ───
    ctx.logger.step(2, 3, 'Load user data', 'running');
    var userData = ctx.db.getUser(userId);
    if (!userData) {
        ctx.logger.step(2, 3, 'Load user data', 'fail', 'User not found in DB');
        return ctx.buildErrorResponse(8);
    }

    // Extract condition inputs from userData
    var userLevel = getUserLevel(userData);
    var userCreateTime = (userData.user && userData.user._createTime) || 0;
    var userAgeDays = userCreateTime > 0 ? (Date.now() - userCreateTime) / MS_PER_DAY : -1;
    var serverOpenDate = ctx.config.serverOpenDate || 0;
    var serverAgeDays = serverOpenDate > 0 ? (Date.now() - serverOpenDate) / MS_PER_DAY : -1;
    var dayOfWeek = getDayOfWeekUTC7();

    ctx.logger.step(2, 3, 'Load user data', 'pass');
    ctx.logger.details('userData',
        ['userLevel', String(userLevel)],
        ['userCreateTime', userCreateTime > 0 ? new Date(userCreateTime).toISOString() : 'N/A'],
        ['userAgeDays', userAgeDays >= 0 ? userAgeDays.toFixed(1) + ' days' : 'N/A'],
        ['serverOpenDate', serverOpenDate > 0 ? new Date(serverOpenDate).toISOString() : 'N/A'],
        ['serverAgeDays', serverAgeDays >= 0 ? serverAgeDays.toFixed(1) + ' days' : 'N/A'],
        ['dayOfWeek(UTC+7)', String(dayOfWeek) + ' (' + (dayOfWeek === 0 ? 'Sun' : dayOfWeek === 6 ? 'Sat' : 'Weekday') + ')'],
        ['newUser', String(userData.newUser)]
    );

    // ─── STEP 3: Evaluate activity templates ───
    ctx.logger.step(3, 3, 'Generate activity list', 'running');

    var context = {
        userData:     userData,
        serverOpenDate: serverOpenDate,
        userLevel:    userLevel,
        userAgeDays:  userAgeDays,
        serverAgeDays: serverAgeDays,
        dayOfWeek:    dayOfWeek
    };

    var acts = [];
    var evaluatedCount = 0;
    var activatedCount = 0;

    for (var i = 0; i < ACTIVITY_TEMPLATES.length; i++) {
        var tpl = ACTIVITY_TEMPLATES[i];
        evaluatedCount++;

        if (evaluateTemplate(tpl, context)) {
            activatedCount++;
            acts.push({
                id:           generateActId(tpl.actType, tpl.actCycle, tpl.poolId),
                actType:      tpl.actType,
                actCycle:     tpl.actCycle,
                cycleType:    tpl.actCycle,
                poolId:       tpl.poolId,
                icon:         tpl.icon || '',
                showRed:      tpl.showRed || false,
                displayIndex: tpl.displayIndex || 0,
                name:         tpl.name || '',
                endTime:      undefined,
                hangupReward: undefined
            });

            ctx.logger.details('activated',
                ['name', tpl.name],
                ['actType', String(tpl.actType)],
                ['actCycle', String(tpl.actCycle)],
                ['poolId', String(tpl.poolId)],
                ['displayIndex', String(tpl.displayIndex)]
            );
        }
    }

    ctx.logger.step(3, 3, 'Generate activity list', 'pass');
    ctx.logger.details('summary',
        ['templates', String(evaluatedCount)],
        ['activated', String(activatedCount)],
        ['returned', String(acts.length)]
    );

    // Log cycle summary
    var cycleSummary = {};
    for (var j = 0; j < acts.length; j++) {
        var cycle = acts[j].actCycle;
        if (!cycleSummary[cycle]) {
            cycleSummary[cycle] = 0;
        }
        cycleSummary[cycle]++;
    }
    var cycleKeys = Object.keys(cycleSummary);
    for (var k = 0; k < cycleKeys.length; k++) {
        var c = cycleKeys[k];
        var info = ACTIVITY_CYCLE_INFO[c];
        ctx.logger.details('cycle_' + c,
            ['count', String(cycleSummary[c])],
            ['homeIcon', info ? info.homeIcon : 'N/A'],
            ['sort', info ? String(info.sort) : 'N/A']
        );
    }

    ctx.logger.phaseEnd('ACTIVITY_GETBRIEF');

    // ─── Build response ───
    return ctx.buildDataResponse(0, { _acts: acts });
}

module.exports = handleGetActivityBrief;
