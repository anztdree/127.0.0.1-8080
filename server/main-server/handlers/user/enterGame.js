/**
 * handlers/enterGame.js — user.enterGame Handler
 * Referensi: main-server.md v4.0 Section 3.3, 8.1, 10
 *
 * Handler terpenting di Main-Server.
 * Response berisi SEMUA data game state user (76 field).
 *
 * PRINSIP:
 * - Semua field WAJIB dikirim — tidak ada opsional
 * - Jika field tidak dikirim, singleton tidak init → silent error
 * - Default value dari constant.json (bukan hardcode)
 * - Struktur response mengikuti client parser UserDataParser.saveUserData()
 *
 * Request: { type:'user', action:'enterGame', loginToken, userId, serverId, version, language, gameVersion }
 * Response: Full user data via responseHelper.buildSuccess()
 */

const http = require('http');
const db = require('../db');
const jsonLoader = require('../jsonLoader');
const responseHelper = require('../responseHelper');
const logger = require('../logger');

// ═══════════════════════════════════════════════════════════════
// SDK-SERVER API HELPER
// ═══════════════════════════════════════════════════════════════

/**
 * Validate loginToken via SDK-Server /auth/validate
 * @param {string} loginToken
 * @param {string} userId
 * @returns {Promise<object>} { valid, sign, securityCode, loginToken }
 */
function validateWithSDKServer(loginToken, userId) {
    return new Promise((resolve) => {
        const payload = JSON.stringify({ loginToken, userId });
        const startTime = Date.now();

        const options = {
            hostname: '127.0.0.1',
            port: 9999,
            path: '/auth/validate',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload)
            },
            timeout: 5000
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                const duration = Date.now() - startTime;
                try {
                    const data = JSON.parse(body);
                    logger.log('INFO', 'SDKAPI', 'SDK-Server /auth/validate response');
                    logger.details('data',
                        ['userId', userId],
                        ['valid', String(data.valid)],
                        ['duration', duration + 'ms']
                    );
                    resolve(data);
                } catch (err) {
                    logger.log('ERROR', 'SDKAPI', 'SDK-Server response parse error');
                    resolve({ valid: false, loginToken: '', securityCode: '' });
                }
            });
        });

        req.on('error', (err) => {
            logger.log('ERROR', 'SDKAPI', 'SDK-Server /auth/validate failed');
            logger.detail('important', ['error', err.message]);
            resolve({ valid: false, loginToken: '', securityCode: '' });
        });

        req.on('timeout', () => {
            req.destroy();
        });

        req.write(payload);
        req.end();
    });
}

// ═══════════════════════════════════════════════════════════════
// HELPER: Safe JSON parse
// ═══════════════════════════════════════════════════════════════

function safeParse(str, fallback) {
    try {
        return JSON.parse(str || '{}');
    } catch (e) {
        return fallback;
    }
}

// ═══════════════════════════════════════════════════════════════
// HELPER: Build totalProps._items dari item_data
// Referensi: main-server.md Section 2.3, 10.6
// STRUKTUR: { "0": { _id: 104, _num: 1 }, "1": { _id: 103, _num: 0 }, ... }
// ═══════════════════════════════════════════════════════════════

function buildItemsDict(items) {
    const _items = {};
    items.forEach((item, index) => {
        _items[String(index)] = { _id: item.itemId, _num: item.num };
    });
    return _items;
}

// ═══════════════════════════════════════════════════════════════
// HELPER: Build heros._heros dari hero_data
// Referensi: main-server.md Section 10.8
// STRUKTUR: { _heros: { [id]: { ...heroData } } }
// ═══════════════════════════════════════════════════════════════

function buildHerosDict(heroes) {
    const _heros = {};
    heroes.forEach((h) => {
        const heroKey = String(h.id);
        _heros[heroKey] = {
            _heroId: String(h.id),
            _heroDisplayId: h.displayId,
            _heroLevel: h.level,
            _heroQuality: h.quality,
            _heroEvolveLevel: h.evolveLevel,
            _heroStar: h.star,
            _heroSkinId: h.skinId,
            _heroActiveSkill: safeParse(h.activeSkill, {}),
            _heroQigongLevel: h.qigongLevel,
            _heroSelfBreakLevel: h.selfBreakLevel,
            _heroSelfBreakType: h.selfBreakType,
            _heroConnectHeroId: h.connectHeroId,
            _heroPosition: h.position,
            _heroPower: h.power
        };
    });
    return _heros;
}

// ═══════════════════════════════════════════════════════════════
// HELPER: Build equip._suits dari equip_data
// Referensi: main-server.md Section 10 (field #11)
// STRUKTUR: { _suits: { [id]: { ...equipData } } }
// ═══════════════════════════════════════════════════════════════

function buildEquipSuits(equips) {
    const _suits = {};
    equips.forEach((e) => {
        _suits[String(e.id)] = {
            _equipId: e.equipId,
            _level: e.level,
            _quality: e.quality,
            _heroId: e.heroId,
            _position: e.position
        };
    });
    return _suits;
}

// ═══════════════════════════════════════════════════════════════
// HELPER: Build weapon._items dari weapon_data
// Referensi: main-server.md Section 10 (field #12)
// STRUKTUR: { _items: { [id]: { ...weaponData } } }
// ═══════════════════════════════════════════════════════════════

function buildWeaponItems(weapons) {
    const _items = {};
    weapons.forEach((w) => {
        _items[String(w.id)] = {
            _weaponId: w.weaponId,
            _level: w.level,
            _quality: w.quality,
            _heroId: w.heroId,
            _haloLevel: w.haloLevel
        };
    });
    return _items;
}

// ═══════════════════════════════════════════════════════════════
// HELPER: Build imprint._items dari imprint_data
// Referensi: main-server.md Section 10 (field #10)
// STRUKTUR: { _items: { [id]: { ...imprintData } } }
// ═══════════════════════════════════════════════════════════════

function buildImprintItems(imprints) {
    const _items = {};
    imprints.forEach((imp) => {
        _items[String(imp.id)] = {
            _imprintId: imp.imprintId,
            _level: imp.level,
            _star: imp.star,
            _quality: imp.quality,
            _part: imp.part,
            _heroId: imp.heroId,
            _viceAttrId: imp.viceAttrId
        };
    });
    return _items;
}

// ═══════════════════════════════════════════════════════════════
// HELPER: Build genki dari genki_data
// Referensi: main-server.md Section 10 (field #13)
// STRUKTUR: { _items: [], _curSmeltNormalExp: 0, _curSmeltSuperExp: 0 }
// ═══════════════════════════════════════════════════════════════

function buildGenkiModel(genkis) {
    const _items = genkis.map(g => ({
        _genkiId: g.genkiId,
        _heroId: g.heroId,
        _pos: g.pos
    }));
    return {
        _items: _items,
        _curSmeltNormalExp: 0,
        _curSmeltSuperExp: 0
    };
}

// ═══════════════════════════════════════════════════════════════
// HELPER: Build dungeon._dungeons dari dungeon_data
// Referensi: main-server.md Section 10 (field #14)
// STRUKTUR: { _dungeons: { [dungeonType]: { ...dungeonData } } }
// ═══════════════════════════════════════════════════════════════

function buildDungeonModel(dungeons) {
    const _dungeons = {};
    dungeons.forEach((d) => {
        _dungeons[String(d.dungeonType)] = {
            _dungeonType: d.dungeonType,
            _level: d.level,
            _sweepLevel: d.sweepLevel,
            _times: d.times,
            _buyTimes: d.buyTimes
        };
    });
    return { _dungeons: _dungeons };
}

// ═══════════════════════════════════════════════════════════════
// HELPER: Build superSkill dari super_skill_data
// Referensi: main-server.md Section 10 (field #15)
// STRUKTUR: array of skill objects (plain array, bukan dict)
// ═══════════════════════════════════════════════════════════════

function buildSuperSkillModel(superSkills) {
    const _skills = {};
    superSkills.forEach((s) => {
        _skills[String(s.id)] = {
            _skillId: s.skillId,
            _level: s.level,
            _evolveLevel: s.evolveLevel
        };
    });
    return { _skills: _skills };
}

// ═══════════════════════════════════════════════════════════════
// HELPER: Build gemstone._items dari gemstone_data
// Referensi: main-server.md Section 10 (field #62)
// STRUKTUR: { _items: { [id]: { ...gemstoneData } } }
// ═══════════════════════════════════════════════════════════════

function buildGemstoneModel(gemstones) {
    const _items = {};
    gemstones.forEach((g) => {
        _items[String(g.id)] = {
            _stoneId: g.stoneId,
            _displayId: g.displayId,
            _level: g.level,
            _heroId: g.heroId
        };
    });
    return { _items: _items };
}

// ═══════════════════════════════════════════════════════════════
// HELPER: Build resonance dari resonance_data
// Referensi: main-server.md Section 10 (field #64)
// STRUKTUR: { _id: '', _diamondCabin: 0, _cabins: {}, _buySeatCount: 0, _totalTalent: 0, _unlockSpecial: false }
// ═══════════════════════════════════════════════════════════════

function buildResonanceModel(resonances) {
    const _cabins = {};
    resonances.forEach((r) => {
        const cabinKey = String(r.cabinId);
        if (!_cabins[cabinKey]) {
            _cabins[cabinKey] = {};
        }
        _cabins[cabinKey][String(r.seatId)] = r.heroId;
    });
    return {
        _id: '',
        _diamondCabin: 0,
        _cabins: _cabins,
        _buySeatCount: 0,
        _totalTalent: 0,
        _unlockSpecial: false
    };
}

// ═══════════════════════════════════════════════════════════════
// HELPER: Build default scheduleInfo dari constant.json
// Referensi: main-server.md Section 10.7
// Default values dibaca dari constant.json key "1"
// ═══════════════════════════════════════════════════════════════

function buildScheduleInfo(storedSchedule) {
    const c1 = (jsonLoader.get('constant') || {})['1'] || {};

    // Jika ada stored scheduleData dari DB, merge dengan default
    // Stored data = data yang sudah di-save sebelumnya
    if (storedSchedule && Object.keys(storedSchedule).length > 0) {
        return storedSchedule;
    }

    // Default new user scheduleInfo dari constant.json
    return {
        _marketDiamondRefreshCount: 0,
        _vipMarketDiamondRefreshCount: 0,
        _arenaAttackTimes: Number(c1.arenaAttackTimes || 5),
        _arenaBuyTimesCount: 0,
        _snakeResetTimes: 0,
        _snakeSweepCount: 0,
        _cellGameHaveGotReward: false,
        _cellGameHaveTimes: Number(c1.cellGameTimes || 1),
        _cellgameHaveSetHero: false,
        _strongEnemyTimes: Number(c1.bossAttackTimes || 6),
        _strongEnemyBuyCount: 0,
        _karinBattleTimes: Number(c1.karinTowerBattleTimes || 10),
        _karinBuyBattleTimesCount: 0,
        _karinBuyFeetCount: 0,
        _monthCardHaveGotReward: {},
        _entrustResetTimes: 0,
        _mineResetTimes: 0,
        _mineBuyResetTimesCount: 0,
        _mineBuyStepCount: 0,
        _guildBossTimes: Number(c1.guildBOSSTimes || 2),
        _guildBossTimesBuyCount: 0,
        _treasureTimes: Number(c1.guildGrabTimes || 3),
        _guildCheckInType: 0,
        _dragonExchangeSSPoolId: 0,
        _dragonExchangeSSSPoolId: 0,
        _teamDugeonUsedRobots: [],
        _timeTrialBuyTimesCount: 0,
        _goldBuyCount: 0,
        _likeRank: {},
        _mahaAttackTimes: Number(c1.mahaAdventureTimesMax || 5),
        _mahaBuyTimesCount: 0,
        _bossCptTimes: Number(c1.bossFightTimesMax || 3),
        _bossCptBuyCount: 0,
        _ballWarBuyCount: 0,
        _mergeBossBuyCount: 0,
        _topBattleTimes: 0,
        _topBattleBuyCount: 0,
        _gravityTrialBuyTimesCount: 0,
        _trainingBuyCount: 0,
        _templeBuyCount: 0,
        _expeditionEvents: {},
        _clickExpedition: false,
        _expeditionSpeedUpCost: 0,
        _templeDailyReward: false,
        _templeYesterdayLess: 0,
        _dungeonTimes: {},
        _dungeonBuyTimesCount: {}
    };
}

// ═══════════════════════════════════════════════════════════════
// MAIN HANDLER
// ═══════════════════════════════════════════════════════════════

/**
 * Handler: user.enterGame
 * Referensi: main-server.md v4.0 Section 3.3, 8.1, 10
 *
 * Request: { type:'user', action:'enterGame', loginToken, userId, serverId, version, language, gameVersion }
 * Response: Full user data (76 field) via UserDataParser.saveUserData()
 */
async function handleEnterGame(request, session) {
    const startTime = Date.now();
    const { loginToken, userId, serverId, version, language } = request;

    logger.log('INFO', 'ENTER', 'enterGame request');
    logger.details('request',
        ['userId', userId],
        ['serverId', serverId],
        ['version', version || ''],
        ['language', language || '']
    );

    // ── 1. Validate required fields ──
    if (!loginToken || !userId || !serverId) {
        logger.log('WARN', 'ENTER', 'Missing required fields');
        return responseHelper.buildError(responseHelper.ErrorCodes.ERROR_LACK_PARAM);
    }

    // ── 2. Validate loginToken via SDK-Server ──
    const validation = await validateWithSDKServer(loginToken, userId);
    if (!validation.valid) {
        logger.log('WARN', 'ENTER', 'loginToken validation failed');
        return responseHelper.buildError(responseHelper.ErrorCodes.ERROR_NO_LOGIN_CLIENT);
    }

    // ── 3. Check if user exists in main_server.db ──
    let user = db.getUser(userId);
    let isNewUser = false;

    if (!user) {
        // New user — create complete user data
        logger.log('INFO', 'ENTER', `Creating new user: ${userId}`);

        const nickName = 'Guest_' + userId.slice(-4);
        user = db.createCompleteUser(userId, nickName, loginToken, serverId, language);
        isNewUser = true;

        logger.log('INFO', 'ENTER', `New user created: ${userId}`);
        logger.details('data', ['nickName', nickName]);
    } else {
        // Existing user — update login info
        db.updateUserFields(userId, {
            loginToken: loginToken,
            lastLoginTime: Date.now(),
            online: 1,
            language: language || user.language || 'en',
            serverId: serverId
        });
    }

    // ── 4. Set user online ──
    db.setUserOnline(userId, 1);

    // ── 5. Track userId in session ──
    session.userId = userId;
    session.verified = true;

    // ── 6. Load ALL relational data dari DB ──
    const heroes = db.getHeroes(userId);
    const items = db.getItems(userId);
    const equips = db.getEquips(userId);
    const weapons = db.getWeapons(userId);
    const imprints = db.getImprints(userId);
    const genkis = db.getGenkis(userId);
    const superSkills = db.getSuperSkills(userId);
    const gemstones = db.getGemstones(userId);
    const resonances = db.getResonance(userId);
    const expeditions = db.getExpedition(userId);
    const dungeonProgress = db.getDungeonProgress(userId);
    const friends = db.getFriends(userId);
    const blacklist = db.getBlacklist(userId);
    const mails = db.getMails(userId);
    const shopData = db.getShopData(userId);

    // Guild
    const guildInfo = db.getGuildByUser(userId);

    // Arena
    const arenaData = db.getArenaData(userId);

    // Tower
    const towerData = db.getTowerData(userId);

    // Ball War
    const ballWarData = db.getBallWarData(userId);

    // ── 7. Parse JSON fields dari user_data ──
    const scheduleInfo = safeParse(user.scheduleData, {});
    const timesInfo = safeParse(user.timesData, {});
    const battleMedalInfo = safeParse(user.battleMedalData, {});
    const giftInfoData = safeParse(user.giftInfoData, {});
    const ballWarDataParsed = safeParse(user.ballWarData, {});
    const expeditionDataParsed = safeParse(user.expeditionData, []);
    const entrustDataParsed = safeParse(user.entrustData, []);

    // ── 8. Read constants dari constant.json ──
    const c1 = (jsonLoader.get('constant') || {})['1'] || {};

    // ── 9. Build complete enterGame response — SEMUA 76 FIELD ──
    // Referensi: main-server.md v4.0 Section 10.2, 10.13
    const enterGameData = {

        // ═══════════════════════════════════════════
        // CORE (9 field, #1-#7 + sub)
        // ═══════════════════════════════════════════

        // #1 currency
        currency: 'USD',

        // #2 newUser
        newUser: isNewUser,

        // #3 user (UserInfoSingleton)
        user: {
            _id: user.userId,
            _pwd: '',
            _nickName: user.nickName,
            _headImage: String(user.headImageId),
            _lastLoginTime: user.lastLoginTime || 0,
            _createTime: user.createTime || 0,
            _bulletinVersions: {},
            _oriServerId: Number(user.serverId) || 1,
            _nickChangeTimes: 0
        },

        // #4 hangup (OnHookSingleton)
        hangup: {
            _curLess: 0,
            _maxPassLesson: 0,
            _haveGotChapterReward: {},
            _maxPassChapter: 0,
            _clickGlobalWarBuffTag: '',
            _buyFund: false,
            _haveGotFundReward: {}
        },

        // #5 summon (SummonSingleton)
        summon: {
            _energy: 0,
            _wishList: [],
            _wishVersion: 0,
            _canCommonFreeTime: 0,
            _canSuperFreeTime: 0,
            _summonTimes: {}
        },

        // #6 totalProps (ItemsCommonSingleton)
        // KRITIS: _items EKSPLISIT, bukan kosong! (cascade failure jika kosong)
        totalProps: {
            _items: buildItemsDict(items)
        },

        // #7 backpackLevel
        backpackLevel: user.backpackLevel || 1,

        // ═══════════════════════════════════════════
        // HEROES & EQUIPMENT (8 field, #8-#15)
        // ═══════════════════════════════════════════

        // #8 heros (HerosManager)
        heros: {
            _heros: buildHerosDict(heroes)
        },

        // #9 scheduleInfo (AllRefreshCount)
        scheduleInfo: buildScheduleInfo(scheduleInfo),

        // #10 imprint (SignInfoManager)
        imprint: {
            _items: buildImprintItems(imprints)
        },

        // #11 equip (EquipInfoManager)
        equip: {
            _suits: buildEquipSuits(equips)
        },

        // #12 weapon (EquipInfoManager)
        weapon: {
            _items: buildWeaponItems(weapons)
        },

        // #13 genki (EquipInfoManager)
        genki: buildGenkiModel(genkis),

        // #14 dungeon (CounterpartSingleton)
        dungeon: buildDungeonModel(dungeonProgress),

        // #15 superSkill (SuperSkillSingleton)
        superSkill: buildSuperSkillModel(superSkills),

        // ═══════════════════════════════════════════
        // PROGRESS & SKINS (3 field, #16-#18)
        // ═══════════════════════════════════════════

        // #16 heroSkin (HerosManager)
        heroSkin: { _skins: {}, _curSkin: {} },

        // #17 summonLog (SummonSingleton)
        summonLog: [],

        // #18 curMainTask (UserInfoSingleton)
        curMainTask: {},

        // ═══════════════════════════════════════════
        // WELFARE (8 field, #19-#26)
        // ═══════════════════════════════════════════

        // #19 checkin (WelfareInfoManager)
        checkin: { _id: '', _activeItem: [], _curCycle: 1, _maxActiveDay: 0, _lastActiveDate: 0 },

        // #20 channelSpecial (WelfareInfoManager)
        channelSpecial: {},

        // #21 dragonEquiped (ItemsCommonSingleton)
        dragonEquiped: {},

        // #22 vipLog (WelfareInfoManager)
        vipLog: [],

        // #23 cardLog (WelfareInfoManager)
        cardLog: [],

        // #24 guide (GuideInfoManager)
        guide: { _id: '', _steps: safeParse(user.guideStep, {}) },

        // #25 guildName (TeamInfoManager)
        guildName: guildInfo ? guildInfo.guildName : '',

        // #26 clickSystem (UserClickSingleton)
        clickSystem: { _clickSys: safeParse(user.clickSystem, { '1': false, '2': false }) },

        // ═══════════════════════════════════════════
        // GIFT & CARDS (3 field, #27-#29)
        // ═══════════════════════════════════════════

        // #27 giftInfo (WelfareInfoManager)
        giftInfo: {
            _fristRecharge: {},
            _haveGotVipRewrd: {},
            _buyVipGiftCount: {},
            _onlineGift: { _curId: 0, _nextTime: 0 },
            _gotBSAddToHomeReward: false,
            _clickHonghuUrlTime: 0,
            _gotChannelWeeklyRewardTag: ''
        },

        // #28 monthCard (WelfareInfoManager)
        monthCard: { _id: '', _card: {} },

        // #29 recharge (WelfareInfoManager)
        recharge: { _id: '', _haveBought: {} },

        // ═══════════════════════════════════════════
        // TIMES & RECOVERY — KRITIS (1 field, #30)
        // ═══════════════════════════════════════════

        // #30 timesInfo (TimesInfoSingleton) — ⚠️ KRITIS: NaN BUG jika tidak dikirim
        timesInfo: {
            marketRefreshTimes: Number(timesInfo._marketRefreshTimes || timesInfo.marketRefreshTimes || 0),
            marketRefreshTimesRecover: Number(timesInfo._marketRefreshTimesRecover || timesInfo.marketRefreshTimesRecover || 0),
            vipMarketRefreshTimes: Number(timesInfo._vipMarketRefreshTimes || timesInfo.vipMarketRefreshTimes || 0),
            vipMarketRefreshTimesRecover: Number(timesInfo._vipMarketRefreshTimesRecover || timesInfo.vipMarketRefreshTimesRecover || 0),
            templeTimes: Number(timesInfo._templeTimes || timesInfo.templeTimes || 0),
            templeTimesRecover: Number(timesInfo._templeTimesRecover || timesInfo.templeTimesRecover || 0),
            mahaTimes: Number(timesInfo._mahaTimes || timesInfo.mahaTimes || 0),
            mahaTimesRecover: Number(timesInfo._mahaTimesRecover || timesInfo.mahaTimesRecover || 0),
            mineSteps: Number(timesInfo._mineSteps || timesInfo.mineSteps || 0),
            mineStepsRecover: Number(timesInfo._mineStepsRecover || timesInfo.mineStepsRecover || 0),
            karinFeet: Number(timesInfo._karinFeet || timesInfo.karinFeet || 0),
            karinFeetRecover: Number(timesInfo._karinFeetRecover || timesInfo.karinFeetRecover || 0)
        },

        // ═══════════════════════════════════════════
        // USER EXTRAS (5 field, #31-#35)
        // ═══════════════════════════════════════════

        // #31 userDownloadReward (UserInfoSingleton)
        userDownloadReward: { _isClick: false, _haveGotDlReward: false, _isBind: false, _haveGotBindReward: false },

        // #32 timeMachine (TimeLeapSingleton)
        timeMachine: { _items: {} },

        // #33 _arenaTeam (AltarInfoManger)
        _arenaTeam: safeParse(arenaData ? arenaData.team : '{}', []),

        // #34 _arenaSuper (AltarInfoManger)
        _arenaSuper: [],

        // #35 timeBonusInfo (TimeLimitGiftBagManager)
        timeBonusInfo: { _id: '', _timeBonus: {} },

        // ═══════════════════════════════════════════
        // SERVER INFO (5 field, #36-#40)
        // ═══════════════════════════════════════════

        // #36 onlineBulletin (BulletinSingleton)
        onlineBulletin: [],

        // #37 karinStartTime (TowerDataManager)
        karinStartTime: 0,

        // #38 karinEndTime (TowerDataManager)
        karinEndTime: 0,

        // #39 serverVersion (UserInfoSingleton)
        serverVersion: '1.0',

        // #40 serverOpenDate (UserInfoSingleton)
        serverOpenDate: 0,

        // ═══════════════════════════════════════════
        // TEAM & TRAINING (3 field, #41-#43)
        // ═══════════════════════════════════════════

        // #41 lastTeam (UserInfoSingleton)
        lastTeam: { _lastTeamInfo: {} },

        // #42 training (PadipataInfoManager)
        training: { _id: '', _type: 0, _times: 0, _timesStartRecover: 0, _cfgId: 0 },

        // #43 warInfo (GlobalWarManager)
        warInfo: {},

        // ═══════════════════════════════════════════
        // WAR (5 field, #44-#48)
        // ═══════════════════════════════════════════

        // #44 userWar (GlobalWarManager)
        userWar: {},

        // #45 serverId — ⚠️ WAJIB kirim nilai asli
        serverId: Number(user.serverId) || 1,

        // #46 headEffect (UserInfoSingleton)
        headEffect: { _effects: [] },

        // #47 userBallWar (TeamInfoManager)
        userBallWar: {},

        // #48 ballWarState (TeamInfoManager)
        ballWarState: ballWarData ? ballWarData.state : 0,

        // ═══════════════════════════════════════════
        // BALL WAR (3 field, #49-#51)
        // ═══════════════════════════════════════════

        // #49 ballBroadcast (TeamInfoManager)
        ballBroadcast: [],

        // #50 ballWarInfo (TeamInfoManager)
        ballWarInfo: { _topMsg: '', _point: 0, _signed: false, _fieldId: '' },

        // #51 guildActivePoints (TeamInfoManager)
        guildActivePoints: {},

        // ═══════════════════════════════════════════
        // EXPEDITION & TRIAL (4 field, #52-#55)
        // ═══════════════════════════════════════════

        // #52 expedition (ExpeditionManager)
        expedition: {},

        // #53 timeTrial (SpaceTrialManager)
        timeTrial: {
            _levelStars: {},
            _level: 1,
            _totalStars: 0,
            _gotStarReward: {},
            _haveTimes: 0,
            _timesStartRecover: 0,
            _lastRefreshTime: 0
        },

        // #54 timeTrialNextOpenTime (SpaceTrialManager)
        timeTrialNextOpenTime: 0,

        // #55 retrieve (GetBackReourceManager)
        retrieve: null,

        // ═══════════════════════════════════════════
        // BATTLE MEDAL — KRITIS (1 field, #56)
        // ═══════════════════════════════════════════

        // #56 battleMedal — ⚠️ CRASH jika _nextRefreshTime tidak ada
        battleMedal: {
            _id: String(battleMedalInfo._id || ''),
            _battleMedalId: String(battleMedalInfo._battleMedalId || ''),
            _cycle: Number(battleMedalInfo._cycle || 0),
            _nextRefreshTime: Number(battleMedalInfo._nextRefreshTime || 0),
            _level: Number(battleMedalInfo._level || 0),
            _curExp: Number(battleMedalInfo._curExp || 0),
            _openSuper: Boolean(battleMedalInfo._openSuper || false),
            _task: battleMedalInfo._task || {},
            _levelReward: battleMedalInfo._levelReward || {},
            _shopBuyTimes: battleMedalInfo._shopBuyTimes || {},
            _buyLevelCount: Number(battleMedalInfo._buyLevelCount || 0)
        },

        // ═══════════════════════════════════════════
        // SHOP (1 field, #57)
        // ═══════════════════════════════════════════

        // #57 shopNewHeroes (ShopInfoManager)
        shopNewHeroes: {},

        // ═══════════════════════════════════════════
        // TEAM DUNGEON (4 field, #58-#61)
        // ═══════════════════════════════════════════

        // #58 teamDungeon (TeamworkManager)
        teamDungeon: { _myTeam: '', _canCreateTeamTime: 0, _nextCanJoinTime: 0 },

        // #59 teamServerHttpUrl (TeamworkManager)
        teamServerHttpUrl: '',

        // #60 teamDungeonOpenTime (TeamworkManager)
        teamDungeonOpenTime: 0,

        // #61 teamDungeonTask (TeamworkManager)
        teamDungeonTask: { _achievement: {}, _dailyRefreshTime: 0, _daily: {} },

        // ═══════════════════════════════════════════
        // GEMSTONE & MISC (6 field, #62-#67)
        // ═══════════════════════════════════════════

        // #62 gemstone (EquipInfoManager)
        gemstone: buildGemstoneModel(gemstones),

        // #63 questionnaires (UserInfoSingleton)
        questionnaires: {},

        // #64 resonance (HerosManager)
        resonance: buildResonanceModel(resonances),

        // #65 fastTeam (HerosManager)
        fastTeam: { _teamInfo: safeParse(user.fastTeams, {}) },

        // #66 blacklist (BroadcastSingleton)
        blacklist: [],

        // #67 forbiddenChat (BroadcastSingleton)
        forbiddenChat: { users: [], finishTime: {} },

        // ═══════════════════════════════════════════
        // GRAVITY & MINI-GAME (2 field, #68-#69)
        // ═══════════════════════════════════════════

        // #68 gravity (TrialManager)
        gravity: {
            gravity: {
                _id: '',
                _haveTimes: 0,
                _timesStartRecover: 0,
                _lastLess: 0,
                _lastTime: 0
            }
        },

        // #69 littleGame (LittleGameManager)
        littleGame: { _gotBattleReward: {}, _gotChapterReward: {}, _clickTime: 0 },

        // ═══════════════════════════════════════════
        // TOP BATTLE (2 field, #70-#71)
        // ═══════════════════════════════════════════

        // #70 userTopBattle (TopBattleManager)
        userTopBattle: { _id: '', _teams: {}, _teamTag: '', _records: [], _history: [], _gotRankReward: [] },

        // #71 topBattleInfo (TopBattleManager)
        topBattleInfo: {},

        // ═══════════════════════════════════════════
        // GLOBAL WAR (4 field, #72-#75)
        // ═══════════════════════════════════════════

        // #72 globalWarBuffTag (OnHookSingleton)
        globalWarBuffTag: '',

        // #73 globalWarLastRank (OnHookSingleton)
        globalWarLastRank: {},

        // #74 globalWarBuff (OnHookSingleton)
        globalWarBuff: 0,

        // #75 globalWarBuffEndTime (OnHookSingleton)
        globalWarBuffEndTime: 0,

        // ═══════════════════════════════════════════
        // BROADCAST (1 field, #76)
        // ═══════════════════════════════════════════

        // #76 broadcastRecord (ts.chatJoinRecord)
        broadcastRecord: []
    };

    const duration = Date.now() - startTime;
    logger.log('INFO', 'ENTER', 'enterGame success');
    logger.details('data',
        ['userId', userId],
        ['isNewUser', String(isNewUser)],
        ['level', String(user.level)],
        ['heroes', String(heroes.length)],
        ['items', String(items.length)],
        ['fields', '76'],
        ['duration', duration + 'ms']
    );

    // Mark firstEnter = 0 setelah pertama kali
    if (user.firstEnter === 1) {
        db.updateUserFields(userId, { firstEnter: 0 });
    }

    return responseHelper.buildSuccess(enterGameData);
}

module.exports = handleEnterGame;
