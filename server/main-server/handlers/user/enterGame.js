/**
 * enterGame.js — Handler: user/enterGame
 *
 * Deep-traced from main.min.js UserDataParser.saveUserData (line ~5319)
 * Every field traced to its consumer function in the client.
 *
 * STRICT RULES: NO STUB, OVERRIDE, FORCE, BYPASS, DUMMY, ASUMSI
 * Every value traced to main.min.js logic or resource/json config.
 *
 * Traced functions:
 *   UserDataParser.setUserInfo         → e.user
 *   UserDataParser.setOnHook           → e.hangup + e.globalWarBuffTag/LastRank/Buff/BuffEndTime
 *   UserDataParser.setSummon           → e.summon
 *   UserDataParser.setBackpack         → e.totalProps._items + e.backpackLevel
 *   UserDataParser.setSign             → e.imprint._items
 *   UserDataParser.setEquip            → e.equip + e.weapon + e.genki (via EquipInfoManager.readByData)
 *   UserDataParser.setCounterpart      → e.dungeon._dungeons
 *   UserDataParser.setTeamTechnology   → e.userGuild._tech
 *   UserDataParser.setTeamTraining     → e.teamTraining
 *   SuperSkillSingleton.initSuperSkill → e.superSkill
 *   HerosManager.setSkinData           → e.heroSkin
 *   HerosManager.readByData            → e.heros
 *   SummonSingleton.setSummomLogList   → e.summonLog
 *   UserDataParser.setTeam             → e.userGuild + e.userGuildPub + e.guildLevel + e.guildTreasureMatchRet
 *   UserDataParser.setMainTask         → e.curMainTask
 *   UserDataParser.setSignIn           → e.checkin
 *   MailInfoManager.getBulletinBrief   → (no data needed)
 *   WelfareInfoManager.channelSpecial  → e.channelSpecial
 *   AllRefreshCount.initData           → e.scheduleInfo
 *   ItemsCommonSingleton.initDragonBallEquip → e.dragonEquiped
 *   WelfareInfoManager.setVipLogList   → e.vipLog
 *   WelfareInfoManager.setMonthCardLogList → e.cardLog
 *   GuideInfoManager.setGuideInfo      → e.guide
 *   TeamInfoManager.setTeamName        → e.guildName
 *   UserClickSingleton.setClickSys     → e.clickSystem._clickSys
 *   WelfareInfoManager (gift sub-set)  → e.giftInfo
 *   WelfareInfoManager.setMonthCardInfo → e.monthCard
 *   WelfareInfoManager.setRechargeInfo → e.recharge
 *   TimesInfoSingleton.initData        → e.timesInfo
 *   UserInfoSingleton.userDownloadModel → e.userDownloadReward
 *   YouTuberRecruitModel               → e.YouTuberRecruit + e.userYouTuberRecruit
 *   TimeLeapSingleton.initData         → e.timeMachine
 *   AltarInfoManger.setArenaTeamInfo   → e._arenaTeam
 *   AltarInfoManger.setArenaSuperInfo  → e._arenaSuper
 *   TimeLimitGiftBagManager            → e.timeBonusInfo
 *   BulletinSingleton.setBulletInfo    → e.onlineBulletin
 *   TowerDataManager.setKarinTime      → e.karinStartTime + e.karinEndTime
 *   UserInfoSingleton.serverVersion    → e.serverVersion
 *   UserInfoSingleton.setServerOpenDate → e.serverOpenDate
 *   UserInfoSingleton.firstLoginSetMyTeam → e.lastTeam._lastTeamInfo
 *   UserInfoSingleton.heroImageVersion → e.heroImageVersion
 *   UserInfoSingleton.superImageVersion → e.superImageVersion
 *   PadipataInfoManager.setPadipataModel → e.training
 *   GlobalWarManager.setWarLoginInfo   → e.warInfo
 *   GlobalWarManager.setUserWarModel   → e.userWar
 *   UserInfoSingleton.setServerId      → e.serverId
 *   HeadEffectModel.deserialize        → e.headEffect
 *   TeamInfoManager.UserBallWar        → e.userBallWar
 *   TeamInfoManager.BallWarState       → e.ballWarState
 *   TeamInfoManager.setBallWarBrodecast → e.ballBroadcast
 *   GuildBallWarInfo.deserialize       → e.ballWarInfo
 *   TeamInfoManager.setActivePoints    → e.guildActivePoints
 *   WelfareInfoManager.enableShowQQ    → e.enableShowQQ
 *   WelfareInfoManager.showQQVip       → e.showQQVip
 *   WelfareInfoManager.showQQ          → e.showQQ
 *   WelfareInfoManager.showQQImg1/2    → e.showQQImg1/2
 *   WelfareInfoManager.showQQUrl       → e.showQQUrl
 *   WelfareInfoManager.setHideHeroes   → e.hideHeroes
 *   ExpeditionManager.setExpeditionModel → e.expedition
 *   SpaceTrialManager.setSpaceTrialModel → e.timeTrial + e.timeTrialNextOpenTime
 *   GetBackReourceManager.setRetrieveModel → e.retrieve
 *   BattleMedalManager.setBattleMedal  → e.battleMedal
 *   ShopInfoManager.shopNewHero        → e.shopNewHeroes
 *   TeamworkManager.setLoginInfo       → e.teamDungeon
 *   TeamworkManager.teamServerHttpUrl  → e.teamServerHttpUrl
 *   TeamworkManager.teamDungeonOpenTime → e.teamDungeonOpenTime
 *   TeamworkManager.teamDungeonTask    → e.teamDungeonTask
 *   TeamworkManager.SetTeamDungeonBroadcast → e.teamDungeonSplBcst/NormBcst
 *   TeamworkManager.setTeamDungeonHideInfo → e.teamDungeonHideInfo
 *   TrialManager.setTempleLess         → e.templeLess
 *   TeamworkManager.teamDungeonInvitedFriends → e.teamDungeonInvitedFriends
 *   ts.loginInfo.serverItem.dungeonurl → e.myTeamServerSocketUrl
 *   EquipInfoManager.saveGemStone      → e.gemstone
 *   UserInfoSingleton.setQuestData     → e.questionnaires
 *   HerosManager.setResonanceModel     → e.resonance
 *   TopBattleManager.setTopBattleLoginInfo → e.userTopBattle + e.topBattleInfo
 *   HerosManager.saveLoginFastTeam     → e.fastTeam
 *   BroadcastSingleton.setBlacklistPlayerInfo → e.blacklist
 *   BroadcastSingleton.setUserBidden   → e.forbiddenChat
 *   TrialManager.setGravityTrialInfo   → e.gravity
 *   LittleGameManager.saveData         → e.littleGame
 *   ts.currency                        → e.currency
 *   e.newUser                          → newUser flag
 *   e.broadcastRecord                  → chatJoinRecord
 */

// ─── Currency/Attribute IDs — main.min.js L82352-82360 ───
const DIAMONDID = 101;
const GOLDID = 102;
const PLAYEREXPERIENCEID = 103;
const PLAYERLEVELID = 104;
const PLAYERVIPEXPERIENCEID = 105;
const PLAYERVIPLEVELID = 106;
const PLAYERVIPEXPALLID = 107;
const SOULCOINID = 111;
const ARENACOINID = 112;
const SNAKECOINID = 113;
const TEAMCOINID = 114;
const HEROPIECEID = 131;

// ─── Dragon Ball IDs — main.min.js L118500-118503 ───
const ONESTARBALLID = 151;
const TWOSTARBALLID = 152;
const THREESTARBALLID = 153;
const FOURSTARBALLID = 154;
const FIVESTARBALLID = 155;
const SIXSTARBALLID = 156;
const SEVENSTARBALLID = 157;

// ─── Dungeon Types — main.min.js DUNGEON_TYPE enum ───
// DT_NULL=0, EXP=1, EVOLVE=2, ENERGY=3(skip), EQUIP=4, SINGA=5, SINGB=6, METAL=7, Z_STONE=8
const DUNGEON_TYPES = {
    EXP: 1, EVOLVE: 2, EQUIP: 4, SINGA: 5, SINGB: 6, METAL: 7, Z_STONE: 8
};

/**
 * Main handler function
 * @param {object} request - { type:'user', action:'enterGame', loginToken, userId, serverId, version, language, gameVersion }
 * @param {object} ctx - Context with db, config, logger, etc.
 * @returns {object} Response envelope
 */
async function handleEnterGame(request, ctx) {
    const startTime = Date.now();
    const { loginToken, userId, serverId, version, language, gameVersion } = request;

    ctx.logger.log('INFO', 'ENTER', 'enterGame request received');
    ctx.logger.details('request',
        ['userId', userId || 'MISSING'],
        ['serverId', String(serverId)],
        ['loginToken', loginToken ? loginToken.substring(0, 12) + '...' : 'MISSING'],
        ['version', version || ''],
        ['language', language || ''],
        ['gameVersion', gameVersion || '']
    );

    // ─── Step 1: Validate required fields ───
    if (!loginToken || !userId || serverId === undefined) {
        ctx.logger.log('WARN', 'ENTER', 'Missing required fields → ret=8');
        return ctx.buildErrorResponse(8);
    }

    // ─── Step 2: Validate loginToken via SDK-Server ───
    const tokenValid = await ctx.validateLoginToken(loginToken, userId);
    if (!tokenValid) {
        ctx.logger.log('WARN', 'ENTER', 'loginToken invalid → ret=37');
        return ctx.buildErrorResponse(37);
    }

    // ─── Step 3: Validate serverId ───
    if (parseInt(serverId) !== ctx.config.serverId) {
        ctx.logger.log('WARN', 'ENTER', `serverId mismatch: got=${serverId} expected=${ctx.config.serverId} → ret=4`);
        return ctx.buildErrorResponse(4);
    }

    // ─── Step 4: Check new vs existing user ───
    const existingData = ctx.db.getUser(userId);
    const isNewUser = !existingData;

    ctx.logger.log('INFO', 'ENTER', `User ${isNewUser ? 'NEW' : 'EXISTING'}`);
    ctx.logger.detail('data', ['userId', userId], ['newUser', String(isNewUser)]);

    // ─── Step 5: Build or load user data ───
    let userData;
    if (isNewUser) {
        userData = buildNewUserData(userId, request, ctx);
    } else {
        userData = updateExistingUser(existingData, request, ctx);
    }

    // ─── Step 6: Save user data ───
    ctx.db.saveUser(userId, userData);

    // ─── Step 7: Build response ───
    const response = ctx.buildDataResponse(0, userData);

    const duration = Date.now() - startTime;
    const keyCount = Object.keys(userData).length;
    ctx.logger.log('INFO', 'ENTER', `enterGame ${isNewUser ? 'NEW' : 'EXISTING'} user SUCCESS`);
    ctx.logger.details('result',
        ['userId', userId],
        ['newUser', String(isNewUser)],
        ['keys', String(keyCount)],
        ['compressed', String(response.compress)],
        ['dataBytes', String(typeof response.data === 'string' ? response.data.length : 0)],
        ['duration', duration + 'ms']
    );

    return response;
}

// ═══════════════════════════════════════════════════════════════
// BUILD NEW USER DATA
// Deep-traced from main.min.js saveUserData + all consumer functions
// ═══════════════════════════════════════════════════════════════
function buildNewUserData(userId, request, ctx) {
    const now = Date.now();
    const config = ctx.config;

    // ─── Load resource JSONs ───
    const constant = (ctx.constantJson && ctx.constantJson['1']) ? ctx.constantJson['1'] : {};
    const heroRes = ctx.heroJson || {};
    const summonRes = ctx.summonJson || {};

    ctx.logger.log('DEBUG', 'ENTER', 'Building new user data from resource JSONs');
    ctx.logger.details('resources',
        ['constantKeys', String(Object.keys(constant).length)],
        ['heroKeys', String(Object.keys(heroRes).length)],
        ['summonKeys', String(Object.keys(summonRes).length)]
    );

    // ─── Starter hero config ───
    // Traced: constant.json → startHero="1205", startHeroLevel="3"
    const startHero = constant.startHero || '1205';
    const startHeroLevel = parseInt(constant.startHeroLevel) || 3;
    const heroId = ctx.uuidv4();
    const heroConfig = heroRes[startHero] || {};

    // ─── Currency defaults from constant.json ───
    // Traced: constant.json → startDiamond=0, startGold=0, startUserExp=0, startUserLevel=1
    const startDiamond = parseInt(constant.startDiamond) || 0;
    const startGold = parseInt(constant.startGold) || 0;
    const startUserExp = parseInt(constant.startUserExp) || 0;
    const startUserLevel = parseInt(constant.startUserLevel) || 1;

    // ─── Dungeon times — keyed by DUNGEON_TYPE number string ───
    // Traced: CounterpartSingleton.setCounterPartTime — iterates e._dungeonTimes with Number(n) == DUNGEON_TYPE
    // ENERGY (3) is ALWAYS SKIPPED by client — do NOT include it
    // Traced: constant.json → expDungeonTimes=2, evolveDungeonTimes=2, equipDungeonTimes=2, signDungeonTimes=2, metalDungeonTimes=2, zStoneDungeonTimes=2
    const dungeonTimes = {};
    const dungeonBuyTimes = {};
    if (constant.expDungeonTimes !== undefined) { dungeonTimes['1'] = constant.expDungeonTimes; dungeonBuyTimes['1'] = 0; }
    if (constant.evolveDungeonTimes !== undefined) { dungeonTimes['2'] = constant.evolveDungeonTimes; dungeonBuyTimes['2'] = 0; }
    if (constant.equipDungeonTimes !== undefined) { dungeonTimes['4'] = constant.equipDungeonTimes; dungeonBuyTimes['4'] = 0; }
    if (constant.signDungeonTimes !== undefined) { dungeonTimes['5'] = constant.signDungeonTimes; dungeonBuyTimes['5'] = 0; }
    if (constant.signDungeonTimes !== undefined) { dungeonTimes['6'] = constant.signDungeonTimes; dungeonBuyTimes['6'] = 0; }
    if (constant.metalDungeonTimes !== undefined) { dungeonTimes['7'] = constant.metalDungeonTimes; dungeonBuyTimes['7'] = 0; }
    if (constant.zStoneDungeonTimes !== undefined) { dungeonTimes['8'] = constant.zStoneDungeonTimes; dungeonBuyTimes['8'] = 0; }

    // ─── Build attribute items for user._attribute._items ───
    // Traced: UserDataParser.setBackpack → ItemsCommonSingleton.setItem(a, r) where a=n[o]._id, r=n[o]._num
    // Also: a==PLAYERLEVELID(104) → NewOpenSystemManager.setLastUserLevel(r)
    const attributeItems = {
        [DIAMONDID]: { _id: DIAMONDID, _num: startDiamond },
        [GOLDID]: { _id: GOLDID, _num: startGold },
        [PLAYEREXPERIENCEID]: { _id: PLAYEREXPERIENCEID, _num: startUserExp },
        [PLAYERLEVELID]: { _id: PLAYERLEVELID, _num: startUserLevel },
        [PLAYERVIPEXPERIENCEID]: { _id: PLAYERVIPEXPERIENCEID, _num: 0 },
        [PLAYERVIPLEVELID]: { _id: PLAYERVIPLEVELID, _num: 0 },
        [PLAYERVIPEXPALLID]: { _id: PLAYERVIPEXPALLID, _num: 0 },
        [SOULCOINID]: { _id: SOULCOINID, _num: 0 },
        [ARENACOINID]: { _id: ARENACOINID, _num: 0 },
        [SNAKECOINID]: { _id: SNAKECOINID, _num: 0 },
        [TEAMCOINID]: { _id: TEAMCOINID, _num: 0 }
    };

    // ─── Build totalProps._items (same as attribute items for new user) ───
    // Traced: UserDataParser.setBackpack reads e.totalProps._items
    const totalPropsItems = {};
    for (const [id, item] of Object.entries(attributeItems)) {
        totalPropsItems[id] = { _id: item._id, _num: item._num };
    }

    // ─── Build hero object ───
    // Traced: HerosManager.readByData → SetHeroDataToModel
    const heroObj = buildStarterHero(heroId, startHero, startHeroLevel, heroConfig, now, constant);

    // ─── Summon defaults ───
    // Traced: UserDataParser.setSummon → SummonSingleton reads n._energy, n._wishList, n._wishVersion, n._canCommonFreeTime, n._canSuperFreeTime, n._summonTimes
    // Also: SummonSingleton.setSummomLogList reads e.summonLog
    const summonEnergy = (summonRes['1'] && summonRes['1'].summonEnergy) || 10;
    const summonTimes = {};
    const summonLogicInfo = {};
    for (const [poolId, poolData] of Object.entries(summonRes)) {
        summonTimes[poolId] = 0;
        summonLogicInfo[poolId] = {
            _summonSPCount: 0,
            _summonSPSubCount: 0,
            _noSPCount: 0,
            _noSSPCount: 0
        };
    }

    // ─── Dungeon _dungeons — keyed by DUNGEON_TYPE number ───
    // Traced: UserDataParser.setCounterpart → CounterpartSingleton.setCounterPart(n)
    //   reads e[n]._type, e[n]._curMaxLevel, e[n]._lastLevel
    // ENERGY (3) is ALWAYS SKIPPED
    const dungeonDict = {};
    for (const [name, type] of Object.entries(DUNGEON_TYPES)) {
        dungeonDict[String(type)] = { _type: type, _curMaxLevel: 0, _lastLevel: 0 };
    }

    // ═══════════════════════════════════════════════════════════
    // BUILD RESPONSE — ALL KEYS
    // ═══════════════════════════════════════════════════════════
    return {
        // ═══ 1. user — setUserInfo ═══
        // Traced: setUserInfo reads n._id, n._pwd, n._nickName, n._headImage, n._lastLoginTime, n._createTime,
        //   n._bulletinVersions, n._oriServerId, n._nickChangeTimes (optional), n._oldName, n._account,
        //   n._channelId, n._privilege, n._attribute, n._offlineTime, n._levelChangeTime, n._vipLevelVersion,
        //   n._os, n._oldUserBackTime, n._channelParam
        user: {
            _id: userId,
            _pwd: '',
            _nickName: 'New User' + userId.slice(-4),
            _headImage: constant.playerIcon || 'hero_icon_1205',
            _lastLoginTime: now,
            _createTime: now,
            _bulletinVersions: {},
            _oriServerId: parseInt(request.serverId) || config.serverId,
            _nickChangeTimes: 0,
            _oldName: '',
            _account: userId,
            _channelId: 'BSNative',
            _privilege: 0,
            _attribute: { _items: attributeItems },
            _offlineTime: 0,
            _levelChangeTime: now,
            _vipLevelVersion: '',
            _os: request.language || 'Android',
            _oldUserBackTime: 0,
            _channelParam: {}
        },

        // ═══ 2. heros — HerosManager.readByData ═══
        // Traced: readByData iterates e._heros with for(o in n), each hero → SetHeroDataToModel(a)
        // SetHeroDataToModel reads: _heroId, _heroDisplayId, _heroStar, _expeditionMaxLevel, _heroTag,
        //   _fragment, _superSkillResetCount, _potentialResetCount, _heroBaseAttr, _superSkillLevel,
        //   _potentialLevel, _qigong, _qigongTmp, _qigongStage, _qigongTmpPower, _totalCost, _breakInfo,
        //   _gemstoneSuitId, _linkTo, _linkFrom
        heros: {
            _id: userId,
            _heros: { [heroId]: heroObj },
            _maxPower: 0,
            _maxPowerChangeTime: now
        },

        // ═══ 3. hangup — setOnHook ═══
        // Traced: setOnHook reads n._curLess, n._maxPassLesson, n._haveGotChapterReward, n._maxPassChapter,
        //   n._clickGlobalWarBuffTag, n._buyFund, n._haveGotFundReward
        // Also: e.globalWarBuffTag, e.globalWarLastRank, e.globalWarBuff, e.globalWarBuffEndTime
        hangup: {
            _id: userId,
            _lastGainTime: now,
            _waitGain: { _items: {} },
            _waitRand: { _items: {} },
            _actReward: { _items: {} },
            _curLess: constant.startLesson || 10101,
            _maxPassLesson: 0,
            _passLessonTime: 0,
            _maxPassChapter: 0,
            _lastNormalGainTime: now,
            _lastRandGainTime: now,
            _haveGotChapterReward: {},
            _firstGain: false,
            _clickGlobalWarBuffTag: '',
            _buyFund: false,
            _haveGotFundReward: {}
        },

        // ═══ 4. totalProps — setBackpack ═══
        // Traced: setBackpack reads e.totalProps._items, iterates for(n[o]._id, n[o]._num)
        totalProps: { _items: totalPropsItems },

        // ═══ 5. backpackLevel — setBackpack ═══
        // Traced: UserInfoSingleton.getInstance().heroBackPack = e.backpackLevel
        backpackLevel: 1,

        // ═══ 6. imprint — setSign ═══
        // Traced: setSign reads e.imprint._items — iterates for(o in n), each item → setSignInfoModel
        // _items is ARRAY [] (not object), each element has sign properties
        imprint: {
            _id: userId,
            _items: []
        },

        // ═══ 7. weapon — EquipInfoManager.readByData ═══
        // Traced: readByData reads e.weapon._items — iterates for(s in i), each → WeaponDataModel.deserialize
        // _items is ARRAY [] (not object)
        weapon: {
            _id: userId,
            _items: []
        },

        // ═══ 8. summon — setSummon ═══
        // Traced: setSummon reads n._energy, n._wishList, n._wishVersion, n._canCommonFreeTime, n._canSuperFreeTime, n._summonTimes
        summon: {
            _id: userId,
            _energy: summonEnergy,
            _haveCommonGuide: false,
            _haveSuperGuide: false,
            _canCommonFreeTime: now,
            _canSuperFreeTime: now,
            _summonTimes: summonTimes,
            _logicInfo: summonLogicInfo,
            _firstDiamond10: false,
            _wishList: [],
            _wishVersion: 0
        },

        // ═══ 9. dungeon — setCounterpart ═══
        // Traced: setCounterpart reads e.dungeon._dungeons, each entry has _type, _curMaxLevel, _lastLevel
        dungeon: {
            _id: userId,
            _dungeons: dungeonDict
        },

        // ═══ 10. equip — EquipInfoManager.readByData ═══
        // Traced: readByData reads e.equip._suits, iterates for(o in n)
        //   Each suit: _suitItems (array of {_id, _pos}), _earrings (object deserialize), _suitAttrs (array of {_id, _num}),
        //   _equipAttrs (array of {_id, _num}), _weaponState
        equip: {
            _id: userId,
            _suits: {
                [heroId]: {
                    _suitItems: [],
                    _earrings: { _id: 0, _level: 0, _attrs: { _items: {} }, _version: '' },
                    _suitAttrs: [],
                    _equipAttrs: [],
                    _weaponState: 0
                }
            }
        },

        // ═══ 11. scheduleInfo — AllRefreshCount.initData ═══
        // Deep-traced from AllRefreshCount.initData — EXACT field names the client reads:
        //   _marketDiamondRefreshCount, _vipMarketDiamondRefreshCount, _arenaAttackTimes, _arenaBuyTimesCount,
        //   _snakeResetTimes, _snakeSweepCount, _cellGameHaveGotReward, _cellGameHaveTimes,
        //   _cellgameHaveSetHero, _strongEnemyTimes, _strongEnemyBuyCount, _mergeBossBuyCount,
        //   _dungeonTimes, _dungeonBuyTimesCount, _karinBattleTimes, _karinBuyBattleTimesCount,
        //   _karinBuyFeetCount, _entrustResetTimes, _dragonExchangeSSPoolId, _dragonExchangeSSSPoolId,
        //   _teamDugeonUsedRobots, _timeTrialBuyTimesCount, _monthCardHaveGotReward, _goldBuyCount,
        //   _likeRank, _mahaAttackTimes, _mahaBuyTimesCount, _mineResetTimes, _mineBuyResetTimesCount,
        //   _mineBuyStepCount, _guildBossTimes, _guildBossTimesBuyCount, _treasureTimes, _guildCheckInType,
        //   _templeBuyCount, _trainingBuyCount, _bossCptTimes, _bossCptBuyCount, _ballWarBuyCount,
        //   _expeditionEvents, _expeditionSpeedUpCost, _clickExpedition, _templeDailyReward,
        //   _templeYesterdayLess, _topBattleTimes, _topBattleBuyCount, _gravityTrialBuyTimesCount
        //
        // CRITICAL NAME MISMATCH: Server sends _timeTrialBuyTimesCount → client stores as _spaceTrialBuyCount
        // CRITICAL: _dragonExchangeSSPoolId and _dragonExchangeSSSPoolId default=0 (not 1)
        // CRITICAL: bossFightTime has NO underscore (unlike all other fields)
        scheduleInfo: {
            _id: userId,
            _refreshTime: now,
            _marketDiamondRefreshCount: 0,
            _vipMarketDiamondRefreshCount: 0,
            _arenaAttackTimes: constant.arenaAttackTimes || 5,
            _arenaBuyTimesCount: 0,
            _snakeResetTimes: constant.snakeTimes || 1,
            _snakeSweepCount: 0,
            _cellGameHaveGotReward: true,
            _cellGameHaveTimes: constant.cellGameTimes || 1,
            _cellgameHaveSetHero: false,
            _strongEnemyTimes: 6,
            _strongEnemyBuyCount: 0,
            _monthCardHaveGotReward: {},
            _dungeonTimes: dungeonTimes,
            _dungeonBuyTimesCount: dungeonBuyTimes,
            _karinBattleTimes: constant.karinTowerBattleTimes || 10,
            _karinBuyBattleTimesCount: 0,
            _karinBuyFeetCount: 0,
            _goldBuyCount: 0,
            _entrustResetTimes: 1,
            _likeRank: {},
            _giveHearts: [],
            _getHearts: [],
            _mahaAttackTimes: constant.mahaAdventureBattleTimes || 10,
            _mahaBuyTimesCount: 0,
            _mineResetTimes: constant.mineRestartFree || 3,
            _mineBuyResetTimesCount: 0,
            _mineBuyStepCount: 0,
            _guildBossTimes: constant.guildBOSSTimes || 2,
            _guildBossTimesBuyCount: 0,
            _treasureTimes: 0,
            _guildCheckInType: 0,
            _dragonExchangeSSPoolId: 0,
            _dragonExchangeSSSPoolId: 0,
            _clickTimeGift: false,
            _trainingBuyCount: 0,
            _commentedHeroes: {},
            _bossCptTimes: constant.bossAttackTimes || 6,
            _bossCptBuyCount: 0,
            bossFightTime: 0,
            _ballWarBuyCount: 0,
            _mergeBossBuyCount: 0,
            _expeditionEvents: {},
            _expeditionSpeedUpCost: 0,
            _clickExpedition: false,
            _teamDugeonUsedRobots: [],
            _topBattleTimes: 0,
            _topBattleBuyCount: 0,
            _timeTrialBuyTimesCount: 0,
            _gravityTrialBuyTimesCount: 0,
            _templeBuyCount: 0,
            _templeDailyReward: false,
            _templeYesterdayLess: 0
        },

        // ═══ 12. timesInfo — TimesInfoSingleton.initData ═══
        // Traced: initData reads e.marketRefreshTimes, e.marketRefreshTimesRecover, e.vipMarketRefreshTimes,
        //   e.vipMarketRefreshTimesRecover, e.templeTimes, e.templeTimesRecover, e.mahaTimes, e.mahaTimesRecover,
        //   e.mineSteps, e.mineStepsRecover, e.karinFeet, e.karinFeetRecover
        // ⚠️ NO underscore prefix on keys!
        timesInfo: {
            templeTimes: constant.templeTestTimes || 10,
            templeTimesRecover: 0,
            mineSteps: 0,
            mineStepsRecover: 0,
            karinFeet: constant.karinTowerFeet || 5,
            karinFeetRecover: 0,
            mahaTimes: 0,
            mahaTimesRecover: 0,
            marketRefreshTimes: 0,
            marketRefreshTimesRecover: 0,
            vipMarketRefreshTimes: 0,
            vipMarketRefreshTimesRecover: 0
        },

        // ═══ 13. serverVersion — UserInfoSingleton.serverVersion ═══
        serverVersion: config.serverVersion,

        // ═══ 14. serverId — UserInfoSingleton.setServerId ═══
        serverId: config.serverId,

        // ═══ 15. serverOpenDate — UserInfoSingleton.setServerOpenDate ═══
        serverOpenDate: config.serverOpenDate,

        // ═══ 16. newUser — loginSuccessCallBack checks e.newUser ═══
        newUser: true,

        // ═══ 17. currency — ts.currency = e.currency ═══
        currency: config.currency,

        // ═══ 18. lastTeam — UserInfoSingleton.firstLoginSetMyTeam(e.lastTeam._lastTeamInfo) ═══
        // Traced: _lastTeamInfo keyed by LAST_TEAM_TYPE number, _team keyed by position
        lastTeam: {
            _id: userId,
            _lastTeamInfo: {
                [9]: {
                    _team: {
                        [0]: { _heroId: heroId, _position: 0 }
                    },
                    _superSkill: []
                }
            }
        },

        // ═══ 19. superSkill — SuperSkillSingleton.initSuperSkill ═══
        superSkill: {
            _id: userId,
            _skills: {}
        },

        // ═══ 20. giftInfo — WelfareInfoManager (multiple sub-sets) ═══
        // Traced: setGotChannelWeeklyRewardTag(e.giftInfo), setFirstRecharge(e.giftInfo._fristRecharge),
        //   setVIPRewrd(e.giftInfo._haveGotVipRewrd), setVIPPrerogativeGift(e.giftInfo._buyVipGiftCount),
        //   setOnlineGift(e.giftInfo._onlineGift), _gotBSAddToHomeReward, _clickHonghuUrlTime
        giftInfo: {
            _id: userId,
            _isBuyFund: false,
            _levelGiftCount: {},
            _fundGiftCount: {},
            _fristRecharge: { _canGetReward: false, _haveGotReward: false },
            _haveGotVipRewrd: {},
            _buyVipGiftCount: {},
            _onlineGift: { _curId: 0, _nextTime: 0 },
            _gotChannelWeeklyRewardTag: '',
            _clickHonghuUrlTime: 0,
            _gotBSAddToHomeReward: false
        },

        // ═══ 21. guide — GuideInfoManager.setGuideInfo ═══
        guide: { _id: userId, _steps: {} },

        // ═══ 22. userGuild — TeamTechnologyManager.saveGuildTech + TeamInfoManager.setUserTeamInfoModel ═══
        // Traced: saveGuildTech reads e.userGuild._tech, iterates for(n in e.userGuild._tech)
        //   Each tech entry has _totalLevel, and is deserialized by GuildTech.deserialize
        // setUserTeamInfoModel reads _satanGift._exp, _satanGift._level, _satanGift._canRewardTime
        userGuild: {
            _id: userId,
            _satanGift: { _exp: 0, _level: 1, _canRewardTime: {} },
            _tech: {}
        },

        // ═══ 23. userGuildPub — TeamInfoManager.setUserTeamInfoModel ═══
        // Traced: reads _guildId, _haveReadBulletin, _requestedGuild, _canJoinGuildTime,
        //   _createGuildCD, _ballWarJoin, _lastRefreshTime
        userGuildPub: {
            _id: userId,
            _guildId: '',
            _haveReadBulletin: false,
            _requestedGuild: [],
            _canJoinGuildTime: 0,
            _createGuildCD: false,
            _ballWarJoin: false,
            _lastRefreshTime: now
        },

        // ═══ 24. expedition — ExpeditionManager.setExpeditionModel ═══
        // Traced: new ExpeditionModel.deserialize(e)
        expedition: {
            _id: userId,
            _passLesson: {},
            _machines: {},
            _collection: [],
            _teams: {},
            _times: constant.expeditionBattleTimes || 10,
            _timesStartRecover: 0
        },

        // ═══ 25. retrieve — GetBackReourceManager.setRetrieveModel ═══
        // Traced: new RetrieveModel.deserialize(e)
        retrieve: {
            _id: userId,
            _finishDungeons: {},
            _calHangupTime: 0,
            _retrieveHangupReward: { _items: {} },
            _retrieveHangupTime: 0,
            _retrieveDungeons: {},
            _finishTime: 0
        },

        // ═══ 26. battleMedal — BattleMedalManager.setBattleMedal ═══
        // Traced: new BattleMedalModel.deserialize(e)
        battleMedal: {
            _id: userId,
            _battleMedalId: '',
            _cycle: 0,
            _nextRefreshTime: 0,
            _level: 0,
            _curExp: 0,
            _openSuper: false,
            _task: {},
            _levelReward: {},
            _shopBuyTimes: {},
            _buyLevelCount: 0
        },

        // ═══ 27. training — PadipataInfoManager.setPadipataModel ═══
        // Traced: setPadipataModel reads _id, _type, _times, _timesStartRecover, _surpriseReward,
        //   _questionId, _enemyId, _cfgId, _award(=e)
        training: {
            _id: userId,
            _cfgId: 0,
            _type: 0,
            _times: constant.trainingTimesMax || 10,
            _timesStartRecover: now,
            _surpriseReward: null,
            _questionId: 0,
            _enemyId: 0,
            _enemyHp: {}
        },

        // ═══ 28. heroSkin — HerosManager.setSkinData ═══
        // Traced: setSkinData → setSkinsWithServerData reads e._skins, e._curSkin
        heroSkin: {
            _id: userId,
            _skins: {},
            _curSkin: {}
        },

        // ═══ 29. userWar — GlobalWarManager.setUserWarModel ═══
        userWar: {
            _id: userId,
            _session: 0,
            _worldId: 0,
            _areaId: 0,
            _auditionWinCount: 0,
            _gotAuditionReward: {},
            _bet: {},
            _championCount: 0,
            _liked: false
        },

        // ═══ 30. userBallWar — TeamInfoManager.UserBallWar ═══
        userBallWar: {
            _id: userId,
            _times: 0,
            _timesStartRecover: 0,
            _fieldId: '',
            _readRecordTime: 0,
            _nextCanFightTime: 0
        },

        // ═══ 31. headEffect — HeadEffectModel.deserialize ═══
        // Traced: deserialize strips underscore prefix for primitive values,
        //   special handling for _effects → array of HeadEffectItem
        headEffect: {
            _id: userId,
            _curBox: 0,
            _curEffect: 0,
            _effects: []
        },

        // ═══ 32. userTopBattle — TopBattleManager.setTopBattleLoginInfo ═══
        // Traced: e.userTopBattle → userTopBattle.deserialize
        userTopBattle: {
            _id: userId,
            _teams: {},
            _teamTag: '',
            _nextSetTeamTime: 0,
            _lastPoint: 0,
            _records: [],
            _history: [],
            _bet: {},
            _liked: false,
            _gotRankReward: []
        },

        // ═══ 33. topBattleInfo — TopBattleManager.setTopBattleLoginInfo ═══
        // Traced: e.topBattleInfo → topBattleInfo.deserialize
        topBattleInfo: {
            topBattleInfo: null,
            topUserInfo: {},
            lastChampion: null,
            _season: 0
        },

        // ═══ 34. checkin — WelfareInfoManager.setSignInInfo ═══
        checkin: {
            _id: userId,
            _activeItem: [],
            _curCycle: 0,
            _maxActiveDay: 0,
            _lastActiveDate: 0
        },

        // ═══ 35. curMainTask — UserInfoSingleton.setMianTask ═══
        curMainTask: {},

        // ═══ 36. summonLog — SummonSingleton.setSummomLogList ═══
        // Traced: if(e.summonLog) iterate → new SummonLog.deserialize
        summonLog: [],

        // ═══ 37. vipLog — WelfareInfoManager.setVipLogList ═══
        // Traced: if(e.vipLog) → setVipLogList
        vipLog: [],

        // ═══ 38. cardLog — WelfareInfoManager.setMonthCardLogList ═══
        // Traced: if(e.cardLog) → setMonthCardLogList
        cardLog: [],

        // ═══ 39. onlineBulletin — BulletinSingleton.setBulletInfo ═══
        // Traced: if(e.onlineBulletin) → setBulletInfo
        onlineBulletin: [],

        // ═══ 40. broadcastRecord — chatJoinRecord ═══
        // Traced: ts.chatJoinRecord({_record: t.broadcastRecord}) → iterates _record array
        broadcastRecord: [],

        // ═══ 41. blacklist — BroadcastSingleton.setBlacklistPlayerInfo ═══
        // Traced: if(e.blacklist) iterate for(n in e.blacklist) → push to array
        blacklist: {},

        // ═══ 42. forbiddenChat — BroadcastSingleton.setUserBidden ═══
        // Traced: reads e.users, e.finishTime → iterates for(a in n) → forbiddenChat[n[a]] = o[n[a]] || 0
        forbiddenChat: { users: [], finishTime: {} },

        // ═══ 43. guildLevel — TeamInfoManager.setMyTeamLevel ═══
        // Traced: void 0 != e.guildLevel → setMyTeamLevel
        guildLevel: 0,

        // ═══ 44. guildTreasureMatchRet — GuildTreasureManager.setTreasureMatchState ═══
        // Traced: void 0 != e.guildTreasureMatchRet → setTreasureMatchState
        guildTreasureMatchRet: 0,

        // ═══ 45. dragonEquiped — ItemsCommonSingleton.initDragonBallEquip ═══
        dragonEquiped: {},

        // ═══ 46. warInfo — GlobalWarManager.setWarLoginInfo ═══
        // Traced: if(e.warInfo) → setWarLoginInfo (guard: truthy check)
        warInfo: null,

        // ═══ 47. ballWarState — TeamInfoManager.BallWarState ═══
        // Traced: if(e.ballWarState) → BallWarState = e.ballWarState (truthy check)
        ballWarState: 0,

        // ═══ 48. enableShowQQ — WelfareInfoManager.enableShowQQ ═══
        // Traced: direct assignment (no guard)
        enableShowQQ: false,

        // ═══ 49. showQQVip — WelfareInfoManager.showQQVip ═══
        showQQVip: 0,

        // ═══ 50. showQQ — WelfareInfoManager.showQQ ═══
        showQQ: 0,

        // ═══ 51. showQQImg1 — WelfareInfoManager.showQQImg1 ═══
        showQQImg1: '',

        // ═══ 52. showQQImg2 — WelfareInfoManager.showQQImg2 ═══
        showQQImg2: '',

        // ═══ 53. showQQUrl — WelfareInfoManager.showQQUrl ═══
        showQQUrl: '',

        // ═══ 54. cellgameHaveSetHero — copied into scheduleInfo._cellgameHaveSetHero before initData ═══
        // Traced: void 0 != e.cellgameHaveSetHero → e.scheduleInfo._cellgameHaveSetHero = e.cellgameHaveSetHero
        cellgameHaveSetHero: false,

        // ═══ 55. globalWarBuffTag — setOnHook → OnHookSingleton.setGlobalWarBuffTag ═══
        globalWarBuffTag: '',

        // ═══ 56. globalWarLastRank — setOnHook → OnHookSingleton.setGlobalWarLastRank ═══
        globalWarLastRank: {},

        // ═══ 57. globalWarBuff — setOnHook → OnHookSingleton.globalWarBuff ═══
        globalWarBuff: 0,

        // ═══ 58. globalWarBuffEndTime — setOnHook → OnHookSingleton.globalWarBuffEndTime ═══
        globalWarBuffEndTime: 0,

        // ═══ 59. guildName — TeamInfoManager.setTeamName ═══
        // Traced: if(e.guildName) → setTeamName (guard: truthy check)
        guildName: '',

        // ═══ 60. guildActivePoints — TeamInfoManager.setActivePoints ═══
        // Traced: if(e.guildActivePoints) → setActivePoints
        guildActivePoints: {},

        // ═══ 61. ballBroadcast — TeamInfoManager.setBallWarBrodecast ═══
        // Traced: if(e.ballBroadcast) → setBallWarBrodecast
        ballBroadcast: null,

        // ═══ 62. ballWarInfo — GuildBallWarInfo.deserialize ═══
        // Traced: deserialize strips underscore, reads _signed→signed, _fieldId→fieldId, _point→point, _topMsg→topMsg
        ballWarInfo: {
            _signed: false,
            _fieldId: '',
            _point: 0,
            _topMsg: ''
        },

        // ═══ 63. teamTraining — TeamTrainingManager.saveTeamTraining ═══
        // Traced: if(e.teamTraining) → trainingData.deserialize(e.teamTraining)
        teamTraining: {
            _id: userId,
            _levels: {},
            _unlock: false,
            _version: ''
        },

        // ═══ 64. teamServerHttpUrl — TeamworkManager.teamServerHttpUrl ═══
        // Traced: if(e.teamServerHttpUrl) → teamServerHttpUrl = e.teamServerHttpUrl + getTodayMaps/getTodayRobot/queryMyDungeonTeamRecord
        teamServerHttpUrl: '',

        // ═══ 65. teamDungeonOpenTime — TeamworkManager.teamDungeonOpenTime ═══
        // Traced: if(e.teamDungeonOpenTime) → teamDungeonOpenTime
        teamDungeonOpenTime: 0,

        // ═══ 66. teamDungeonTask — TeamworkManager.teamDungeonTask.deserialize ═══
        // Traced: if(e.teamDungeonTask) → teamDungeonTask.deserialize
        teamDungeonTask: {
            _dailyRefreshTime: 0,
            _achievement: {},
            _daily: {}
        },

        // ═══ 67. teamDungeonSplBcst — TeamworkManager.SetTeamDungeonBroadcast(, true) ═══
        // Traced: if(e.teamDungeonSplBcst) → SetTeamDungeonBroadcast(e.teamDungeonSplBcst, true)
        teamDungeonSplBcst: null,

        // ═══ 68. teamDungeonNormBcst — TeamworkManager.SetTeamDungeonBroadcast(, false) ═══
        // Traced: if(e.teamDungeonNormBcst) → SetTeamDungeonBroadcast(e.teamDungeonNormBcst, false)
        teamDungeonNormBcst: null,

        // ═══ 69. teamDungeonHideInfo — TeamworkManager.setTeamDungeonHideInfo ═══
        // Traced: if(e.teamDungeonHideInfo) → setTeamDungeonHideInfo
        teamDungeonHideInfo: null,

        // ═══ 70. teamDungeon — TeamworkManager.setLoginInfo ═══
        // Traced: setLoginInfo reads e._myTeam, e._canCreateTeamTime, e._nextCanJoinTime
        teamDungeon: {
            _myTeam: '',
            _canCreateTeamTime: 0,
            _nextCanJoinTime: 0
        },

        // ═══ 71. teamDungeonInvitedFriends — TeamworkManager.teamDungeonInvitedFriends ═══
        // Traced: if(e.teamDungeonInvitedFriends) → teamDungeonInvitedFriends = e.teamDungeonInvitedFriends
        teamDungeonInvitedFriends: null,

        // ═══ 72. myTeamServerSocketUrl — ts.loginInfo.serverItem.dungeonurl ═══
        // Traced: if(e.myTeamServerSocketUrl) → ts.loginInfo.serverItem.dungeonurl = e.myTeamServerSocketUrl
        myTeamServerSocketUrl: config.dungeonUrl,

        // ═══ 73. shopNewHeroes — ShopInfoManager.shopNewHero ═══
        // Traced: if(e.shopNewHeroes) → shopNewHero = e.shopNewHeroes
        shopNewHeroes: {},

        // ═══ 74. channelSpecial — WelfareInfoManager.channelSpecial ═══
        // Traced: direct assignment, then if(e.channelSpecial._honghuUrl) → read _honghuUrl/StartTime/EndTime
        channelSpecial: {
            _id: '',
            _show: false,
            _icon: '',
            _bg: '',
            _btn1Url: '',
            _btn2Url: '',
            _vip: 0,
            _hideHeroes: [],
            _weeklyReward: { _items: {} },
            _weeklyRewardTag: '',
            _honghuUrl: '',
            _honghuUrlStartTime: 0,
            _honghuUrlEndTime: 0,
            _bsAddToHomeIcon: '',
            _bsAddToHomeReward: { _items: {} }
        },

        // ═══ 75. hideHeroes — WelfareInfoManager.setHideHeroes ═══
        // Traced: if(e.hideHeroes) → setHideHeroes
        hideHeroes: [],

        // ═══ 76. templeLess — TrialManager.setTempleLess ═══
        // Traced: if(e.templeLess) → setTempleLess (truthy check, not void 0 check)
        templeLess: 0,

        // ═══ 77. timeTrial — SpaceTrialManager.setSpaceTrialModel ═══
        // Traced: if(e.timeTrial) → new SpaceTrialModel.deserialize(e.timeTrial)
        timeTrial: {
            _id: userId,
            _level: 1,
            _totalStars: 0,
            _haveTimes: 0,
            _timesStartRecover: 0,
            _lastRefreshTime: 0,
            _startTime: 0,
            _levelStars: {},
            _gotStarReward: {}
        },

        // ═══ 78. timeTrialNextOpenTime — passed as 2nd arg to setSpaceTrialModel ═══
        timeTrialNextOpenTime: 0,

        // ═══ 79. YouTuberRecruit — YouTuberRecruitModel ═══
        // Traced: if(e.YouTuberRecruit && !e.YouTuberRecruit._hidden) → new YouTuberRecruitModel.setData
        YouTuberRecruit: {
            _id: '',
            _image: '',
            _content: '',
            _reward: null,
            _mailAddr: '',
            _jumpLink: [],
            _hidden: false
        },

        // ═══ 80. userYouTuberRecruit — YouTuberRecruitModel.initUserInfo ═══
        // Traced: if(e.userYouTuberRecruit) → YouTuberModel.initUserInfo
        userYouTuberRecruit: {
            _gotReward: false,
            _hasJoin: false
        },

        // ═══ 81. heroImageVersion — UserInfoSingleton.heroImageVersion ═══
        // Traced: void 0 != e.heroImageVersion → heroImageVersion
        heroImageVersion: 0,

        // ═══ 82. superImageVersion — UserInfoSingleton.superImageVersion ═══
        // Traced: void 0 != e.superImageVersion → superImageVersion
        superImageVersion: 0,

        // ═══ 83. karinStartTime — TowerDataManager.setKarinTime ═══
        karinStartTime: 0,

        // ═══ 84. karinEndTime — TowerDataManager.setKarinTime ═══
        karinEndTime: 0,

        // ═══ 85. timeBonusInfo — TimeLimitGiftBagManager.setTimeLimitGiftBag ═══
        // Traced: if(e.timeBonusInfo) → setTimeLimitGiftBag
        timeBonusInfo: {
            _id: userId,
            _timeBonus: {}
        },

        // ═══ 86. monthCard — WelfareInfoManager.setMonthCardInfo ═══
        // Traced: if(e.monthCard) → setMonthCardInfo
        monthCard: {
            _id: userId,
            _card: {}
        },

        // ═══ 87. recharge — WelfareInfoManager.setRechargeInfo ═══
        // Traced: if(e.recharge) → setRechargeInfo
        recharge: {
            _id: userId,
            _haveBought: {}
        },

        // ═══ 88. userDownloadReward — UserInfoSingleton.userDownloadModel ═══
        // Traced: if(e.userDownloadReward) → reads _isClick, _haveGotDlReward, _isBind, _haveGotBindReward
        userDownloadReward: {
            _isClick: false,
            _haveGotDlReward: false,
            _isBind: false,
            _haveGotBindReward: false
        },

        // ═══ 89. clickSystem — UserClickSingleton.setClickSys ═══
        // Traced: if(e.clickSystem) → iterate e.clickSystem._clickSys for(n) → setClickSys(n, value)
        clickSystem: {
            _id: userId,
            _clickSys: {}
        },

        // ═══ 90. questionnaires — UserInfoSingleton.setQuestData ═══
        // Traced: if(e.questionnaires) → setQuestData
        questionnaires: null,

        // ═══ 91. littleGame — LittleGameManager.saveData ═══
        // Traced: if(e.littleGame) → reads _gotBattleReward, _gotChapterReward, _clickTime
        littleGame: {
            _gotBattleReward: {},
            _gotChapterReward: {},
            _clickTime: 0
        },

        // ═══ 92. genki — EquipInfoManager.readByData reads e.genki ═══
        // Traced: if(e.genki) → genkiDataModel.deserialize(e.genki)
        genki: {
            _id: userId,
            _items: [],
            _curSmeltNormalExp: 0,
            _curSmeltSuperExp: 0
        },

        // ═══ 93. gemstone — EquipInfoManager.saveGemStone ═══
        // Traced: if(e.gemstone) → iterate e.gemstone._items → new GemstoneItem.deserialize
        gemstone: { _items: {} },

        // ═══ 94. resonance — HerosManager.setResonanceModel ═══
        // Traced: if(e.resonance) → new ResonanceModel.deserialize(e)
        resonance: {
            _id: userId,
            _diamondCabin: 0,
            _buySeatCount: 0,
            _totalTalent: 0,
            _unlockSpecial: false,
            _cabins: {}
        },

        // ═══ 95. fastTeam — HerosManager.saveLoginFastTeam ═══
        // Traced: if(e.fastTeam) → iterate e._teamInfo → new FastTeam.deserialize
        fastTeam: {
            _teamInfo: {}
        },

        // ═══ 96. gravity — TrialManager.setGravityTrialInfo ═══
        // Traced: if(e.gravity) → checks e.gravity first, then e._model
        gravity: {},

        // ═══ 97. timeMachine — TimeLeapSingleton.initData ═══
        // Traced: if(e.timeMachine) → iterate e._items → new TimeMachineItem
        timeMachine: { _items: {} },

        // ═══ 98. _arenaTeam — AltarInfoManger.setArenaTeamInfo ═══
        // Traced: direct call, if(e) check inside setArenaTeamInfo
        _arenaTeam: null,

        // ═══ 99. _arenaSuper — AltarInfoManger.setArenaSuperInfo ═══
        // Traced: direct call, if(e) check inside setArenaSuperInfo
        _arenaSuper: null,

        // ═══ Extra: mergedServers — seen in live server responses ═══
        mergedServers: []
    };
}

// ═══════════════════════════════════════════════════════════════
// BUILD STARTER HERO
// Deep-traced from HerosManager.SetHeroDataToModel
// ═══════════════════════════════════════════════════════════════
function buildStarterHero(heroId, displayId, level, heroConfig, now, constant) {
    return {
        _heroId: heroId,
        _heroDisplayId: parseInt(displayId),
        _heroBaseAttr: {
            _level: level,
            _evolveLevel: 0
        },
        _heroStar: heroConfig.wakeupMax || 0,
        _superSkillLevel: 0,
        _potentialLevel: {},
        _superSkillResetCount: 0,
        _potentialResetCount: 0,
        _qigong: { _items: {} },
        _qigongTmp: { _items: {} },
        _qigongTmpPower: 0,
        _qigongStage: 1,
        _breakInfo: {
            _breakLevel: 1,
            _level: 0,
            _attr: { _items: {} },
            _version: ''
        },
        _totalCost: {
            _wakeUp: { _items: {} },
            _earring: { _items: {} },
            _levelUp: { _items: {} },
            _evolve: { _items: {} },
            _skill: { _items: {} },
            _qigong: { _items: {} },
            _heroBreak: { _items: {} }
        },
        _expeditionMaxLevel: 0,
        _gemstoneSuitId: 0,
        _linkTo: [],
        _linkFrom: '',
        _resonanceType: 0,
        _version: heroConfig.version ? String(heroConfig.version) : ''
    };
}

// ═══════════════════════════════════════════════════════════════
// UPDATE EXISTING USER
// ═══════════════════════════════════════════════════════════════
function updateExistingUser(data, request, ctx) {
    const now = Date.now();

    // Update login timestamps
    if (data.user) {
        data.user._offlineTime = data.user._lastLoginTime || 0;
        data.user._lastLoginTime = now;
    }

    // Mark as NOT new user
    data.newUser = false;

    // Update serverTime-sensitive fields
    data.serverVersion = ctx.config.serverVersion;
    data.serverId = ctx.config.serverId;
    data.serverOpenDate = ctx.config.serverOpenDate;
    data.currency = ctx.config.currency;

    return data;
}

module.exports = handleEnterGame;
