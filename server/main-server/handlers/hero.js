'use strict';

/**
 * =====================================================
 *  hero.js — Hero Management Handler
 *  Super Warrior Z Game Server — Main Server
 *
 *  CORE GAMEPLAY HANDLER — 20 actions managing heroes.
 *
 *  Actions (all verified from client code):
 *    1.  getAttrs           — Calculate hero attributes (called 8+ times)
 *    2.  autoLevelUp        — Level up hero (single/bulk)
 *    3.  evolve             — Star up / evolve hero
 *    4.  resolve            — Decompose hero into soul coins
 *    5.  reborn             — Rebirth hero (reset, reclaim resources)
 *    6.  splitHero          — Split duplicate hero into fragments
 *    7.  inherit            — Transfer stats from one hero to another
 *    8.  qigong             — Start qigong (meditation) training
 *    9.  saveQigong         — Save qigong training results
 *   10.  cancelQigong       — Cancel ongoing qigong
 *   11.  heroBreak          — Perform hero breakthrough
 *   12.  activeHeroBreak    — Activate breakthrough level
 *   13.  autoHeroBreak      — Auto breakthrough (one-key)
 *   14.  rebornSelfBreak    — Rebirth self-breakthrough
 *   15.  wakeUp             — Awaken hero (upgrade quality tier)
 *   16.  activeSkill        — Activate potential skill
 *   17.  useSkin            — Equip/unequip hero skin
 *   18.  activeSkin         — Activate/unlock new skin
 *   19.  queryHeroEquipInfo — Query hero equipment (social view)
 *   20.  queryArenaHeroEquipInfo — Query arena hero equipment
 *
 *  ATTRIBUTE CALCULATION ENGINE:
 *    Base:   heroLevelAttr[level] (hp, attack, armor from level)
 *    Type:   heroTypeParam[type] (body/skill/strength multipliers)
 *    Quality: heroQualityParam[quality] (white/green/etc multipliers)
 *    Evolve: heroLevelUpMul[qualityIdx][evolveStep] (evolve multiplier)
 *    Evolve Bonus: heroEvolve[displayId][step] (flat stat bonuses per evolve)
 *    Qigong: qigong bonuses added on top
 *    Break:  selfBreak bonuses added on top
 *
 *  CONFIG FILES USED:
 *    hero.json, heroLevelAttr.json, heroLevelUpMul.json,
 *    heroTypeParam.json, heroQualityParam.json, heroEvolve.json,
 *    heroLevelUp{White,Green,Blue,Purple,Orange,...}.json,
 *    heroResolve.json, heroRebirth.json, heroPiece.json,
 *    heroWakeUp.json, heroSkin.json, heroConnect.json,
 *    selfBreak.json, selfBreakCost.json, selfBreakQuality.json,
 *    selfBreakDefault.json, potentialLevel.json, qigong.json,
 *    heroPower.json, constant.json
 *
 *  CLIENT CODE SOURCES (line numbers from unminified main.min.js):
 *    getAttrs: 53614, 85422, 169699
 *    autoLevelUp: 123101
 *    evolve: 121132
 *    resolve: 106158
 *    reborn: 106280
 *    splitHero: 123180
 *    inherit: 106792
 *    qigong: 52881, saveQigong: 52893, cancelQigong: 52904
 *    heroBreak: 123684, activeHeroBreak: 123627, autoHeroBreak: 123613
 *    rebornSelfBreak: 123751
 *    wakeUp: 124446
 *    activeSkill: 120796
 *    useSkin: 119497, activeSkin: 119527
 *    queryHeroEquipInfo: 86188, queryArenaHeroEquipInfo: 86213
 * =====================================================
 */

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');
var DB = require('../../database/connection');
var userDataService = require('../services/userDataService');
var GameData = require('../../shared/gameData/loader');

// =============================================
// CONSTANTS
// =============================================

/** Quality tier index mapping (used in heroLevelUpMul.json) */
var QUALITY_INDEX = {
    'white': 1,
    'green': 2,
    'blue': 3,
    'purple': 4,
    'orange': 5,
    'flickerOrange': 6,
    'superOrange': 7,
    'red': 8
};

/** Quality tier from star number (star = evolveLevel / 20 typically) */
var STAR_QUALITY = ['white', 'green', 'blue', 'purple', 'orange', 'flickerOrange', 'superOrange', 'red'];

/** Level up config file names per quality */
var LEVEL_UP_CONFIG = {
    'white': 'heroLevelUpWhite',
    'green': 'heroLevelUpGreen',
    'blue': 'heroLevelUpBlue',
    'purple': 'heroLevelUpPurple',
    'orange': 'heroLevelUpOrange',
    'flickerOrange': 'heroLevelUpFlickerOrange',
    'superOrange': 'heroLevelUpSuperOrange',
    'red': 'heroLevelUpRed'
};

/** Item IDs from defaultData.js */
var ITEM = {
    DIAMOND: 101,
    GOLD: 102,
    PLAYER_EXP: 103,
    PLAYER_LEVEL: 104,
    EXP_CAPSULE: 131,
    EVOLVE_CAPSULE: 132,
    SOUL_COIN: 111,
    ENERGY_STONE: 136,
    POTENTIAL_EXP: 133,
    SUPER_EXP: 134
};

/** 31 attribute names for hero base attrs (from HeroAttribute constructor line 84951) */
var ATTR_NAMES = [
    'hp', 'attack', 'armor', 'speed',
    'hit', 'dodge', 'block', 'blockEffect',
    'skillDamage', 'critical', 'criticalResist',
    'criticalDamage', 'armorBreak', 'damageReduce',
    'controlResist', 'trueDamage', 'energy',
    'power', 'extraArmor', 'hpPercent',
    'armorPercent', 'attackPercent', 'speedPercent',
    'orghp', 'superDamage', 'healPlus',
    'healerPlus', 'damageDown', 'shielderPlus',
    'damageUp'
];

/** _openType values for insufficient resources */
var OPEN_TYPE = {
    SUCCESS: 0,
    TIME_BONUS: 1,
    TIPS: 2
};

// =============================================
// UTILITY: Quality & Attribute Helpers
// =============================================

/**
 * Get quality string from evolveLevel.
 * evolveLevel 0-19 = white, 20-39 = green, 40-59 = blue, etc.
 * @param {number} evolveLevel
 * @returns {string}
 */
function getQualityFromEvolve(evolveLevel) {
    var idx = Math.min(Math.floor(evolveLevel / 20), STAR_QUALITY.length - 1);
    return STAR_QUALITY[idx];
}

/**
 * Get quality index for heroLevelUpMul lookup.
 * @param {string} quality
 * @returns {number}
 */
function getQualityIndex(quality) {
    return QUALITY_INDEX[quality] || 1;
}

/**
 * Get hero info from hero.json config.
 * @param {string|number} heroDisplayId
 * @returns {object|null}
 */
function getHeroInfo(heroDisplayId) {
    var heroConfig = GameData.get('hero');
    return heroConfig ? heroConfig[heroDisplayId] : null;
}

/**
 * Get hero type parameters from heroTypeParam.json.
 * @param {string} heroType - "body", "skill", "strength"
 * @returns {object|null}
 */
function getHeroTypeParam(heroType) {
    var config = GameData.get('heroTypeParam');
    return config ? config[heroType] : null;
}

/**
 * Get quality parameters from heroQualityParam.json.
 * @param {string} quality
 * @returns {object|null}
 */
function getQualityParam(quality) {
    var config = GameData.get('heroQualityParam');
    return config ? config[quality] : null;
}

/**
 * Get level-up multiplier for given quality and evolveLevel.
 * From heroLevelUpMul.json: keys are "1"-"7" (quality index).
 * Each is array of { evolveLevel, quality, hpMul, attackMul, armorMul }.
 * @param {string} quality
 * @param {number} evolveLevel
 * @returns {object} { hpMul, attackMul, armorMul } (default 1)
 */
function getLevelUpMul(quality, evolveLevel) {
    var config = GameData.get('heroLevelUpMul');
    if (!config) return { hpMul: 1, attackMul: 1, armorMul: 1 };

    var qIdx = String(getQualityIndex(quality));
    var entries = config[qIdx];
    if (!entries || !entries.length) return { hpMul: 1, attackMul: 1, armorMul: 1 };

    // Find the entry with evolveLevel <= current evolveLevel (highest match)
    var best = { hpMul: 1, attackMul: 1, armorMul: 1 };
    for (var i = 0; i < entries.length; i++) {
        if (entries[i].evolveLevel <= evolveLevel) {
            best = entries[i];
        } else {
            break;
        }
    }
    return best;
}

/**
 * Get base attributes for a hero level from heroLevelAttr.json.
 * @param {number} level
 * @returns {object} { hp, attack, armor } or zeros
 */
function getLevelBaseAttr(level) {
    level = level || 1;
    var config = GameData.get('heroLevelAttr');
    if (!config) return { hp: 0, attack: 0, armor: 0 };

    var entry = config[String(level)];
    if (!entry) return { hp: 0, attack: 0, armor: 0 };

    return {
        hp: entry.hp || 0,
        attack: entry.attack || 0,
        armor: entry.armor || 0
    };
}

// =============================================
// ATTRIBUTE CALCULATION ENGINE
// =============================================

/**
 * Calculate base and total attributes for a hero.
 *
 * Formula:
 *   baseHP = levelBaseHP * typeParam.hpParam * qualityParam.hpParam
 *   baseAttack = levelBaseAttack * typeParam.attackParam * qualityParam.attackParam
 *   baseArmor = levelBaseArmor * typeParam.armorParam * qualityParam.armorParam
 *
 *   totalHP = baseHP * levelUpMul.hpMul + evolveBonus.hp + qigong.hp + break.hp
 *   totalAttack = baseAttack * levelUpMul.attackMul + evolveBonus.attack + qigong.attack + break.attack
 *   totalArmor = baseArmor * levelUpMul.armorMul + evolveBonus.armor + qigong.armor + break.armor
 *
 * @param {object} heroData - Hero instance from user_data.heros._heros[heroId]
 * @returns {object} { _baseAttr: { _items }, _totalAttr: { _items } }
 */
function calculateHeroAttrs(heroData) {
    if (!heroData) return emptyAttrs();

    var displayId = heroData._heroDisplayId;
    var level = heroData._heroBaseAttr ? heroData._heroBaseAttr._level || 1 : 1;
    var evolveLevel = heroData._heroBaseAttr ? heroData._heroBaseAttr._evolveLevel || 0 : 0;

    // Get config data
    var heroInfo = getHeroInfo(displayId);
    var heroType = heroInfo ? heroInfo.type : 'body';
    var quality = getQualityFromEvolve(evolveLevel);

    var typeParam = getHeroTypeParam(heroType) || { hpParam: 1, attackParam: 1, armorParam: 1, hpBais: 0, attackBais: 0, armorBais: 0 };
    var qualParam = getQualityParam(quality) || { hpParam: 1, attackParam: 1, armorParam: 1 };
    var levelUpMul = getLevelUpMul(quality, evolveLevel);
    var levelBase = getLevelBaseAttr(level);

    // Base attributes: level base * type param * quality param + type bias
    var baseHP = (levelBase.hp * typeParam.hpParam * qualParam.hpParam) + (typeParam.hpBais || 0);
    var baseAttack = (levelBase.attack * typeParam.attackParam * qualParam.attackParam) + (typeParam.attackBais || 0);
    var baseArmor = (levelBase.armor * typeParam.armorParam * qualParam.armorParam) + (typeParam.armorBais || 0);

    // Get evolve bonuses from heroEvolve.json
    var evolveHP = 0, evolveAttack = 0, evolveArmor = 0;
    var evolveConfig = GameData.get('heroEvolve');
    if (evolveConfig && evolveConfig[displayId]) {
        var evolveEntries = evolveConfig[displayId];
        for (var i = 0; i < evolveEntries.length; i++) {
            if (evolveEntries[i].level <= evolveLevel) {
                evolveHP += evolveEntries[i].hp || 0;
                evolveAttack += evolveEntries[i].attack || 0;
                evolveArmor += evolveEntries[i].armor || 0;
            }
        }
    }

    // Get qigong bonuses
    var qigongHP = 0, qigongAttack = 0, qigongArmor = 0;
    if (heroData._qigong && heroData._qigong._items) {
        for (var q in heroData._qigong._items) {
            var qi = heroData._qigong._items[q];
            if (qi._id === 'hp') qigongHP += qi._num || 0;
            else if (qi._id === 'attack') qigongAttack += qi._num || 0;
            else if (qi._id === 'armor') qigongArmor += qi._num || 0;
        }
    }

    // Get break bonuses
    var breakHP = 0, breakAttack = 0, breakArmor = 0;
    if (heroData._breakInfo && heroData._breakInfo._attrs) {
        for (var b = 0; b < heroData._breakInfo._attrs.length; b++) {
            var ba = heroData._breakInfo._attrs[b];
            if (ba._ability === 'hp') breakHP += ba._value || 0;
            else if (ba._ability === 'attack') breakAttack += ba._value || 0;
            else if (ba._ability === 'armor') breakArmor += ba._value || 0;
        }
    }

    // Total attributes: base * evolve mul + evolve bonus + qigong + break
    var totalHP = Math.floor(baseHP * (levelUpMul.hpMul || 1)) + evolveHP + qigongHP + breakHP;
    var totalAttack = Math.floor(baseAttack * (levelUpMul.attackMul || 1)) + evolveAttack + qigongAttack + breakAttack;
    var totalArmor = Math.floor(baseArmor * (levelUpMul.armorMul || 1)) + evolveArmor + qigongArmor + breakArmor;

    // Round to integers
    totalHP = Math.round(totalHP);
    totalAttack = Math.round(totalAttack);
    totalArmor = Math.round(totalArmor);

    return {
        _baseAttr: {
            _items: [
                { _id: 'hp', _num: Math.round(baseHP) },
                { _id: 'attack', _num: Math.round(baseAttack) },
                { _id: 'armor', _num: Math.round(baseArmor) }
            ]
        },
        _totalAttr: {
            _items: [
                { _id: 'hp', _num: totalHP },
                { _id: 'attack', _num: totalAttack },
                { _id: 'armor', _num: totalArmor }
            ]
        }
    };
}

/**
 * Generate empty attribute response.
 * @returns {object}
 */
function emptyAttrs() {
    return {
        _baseAttr: { _items: [] },
        _totalAttr: { _items: [] }
    };
}

// =============================================
// UTILITY: Inventory Management
// =============================================

/**
 * Get item count from user's totalProps.
 * @param {object} gameData
 * @param {number|string} itemId
 * @returns {number}
 */
function getItemCount(gameData, itemId) {
    if (!gameData || !gameData.totalProps || !gameData.totalProps._items) return 0;
    var item = gameData.totalProps._items[itemId];
    return item ? (item._num || 0) : 0;
}

/**
 * Set item count in user's totalProps.
 * @param {object} gameData
 * @param {number|string} itemId
 * @param {number} newCount
 * @returns {object} change info entry { _id, _num }
 */
function setItemCount(gameData, itemId, newCount) {
    if (!gameData.totalProps._items[itemId]) {
        gameData.totalProps._items[itemId] = { _id: itemId, _num: 0 };
    }
    gameData.totalProps._items[itemId]._num = Math.max(0, Math.floor(newCount));
    return { _id: itemId, _num: gameData.totalProps._items[itemId]._num };
}

/**
 * Add items to inventory.
 * @param {object} gameData
 * @param {number|string} itemId
 * @param {number} amount - positive to add, negative to remove
 * @returns {object} change info entry
 */
function addItem(gameData, itemId, amount) {
    var current = getItemCount(gameData, itemId);
    return setItemCount(gameData, itemId, current + amount);
}

/**
 * Check if user has enough of an item.
 * @param {object} gameData
 * @param {number|string} itemId
 * @param {number} amount
 * @returns {boolean}
 */
function hasItem(gameData, itemId, amount) {
    return getItemCount(gameData, itemId) >= amount;
}

/**
 * Build _changeInfo from array of changed items.
 * @param {Array} changes - array of { _id, _num } entries
 * @returns {object} { _items: [...] }
 */
function buildChangeInfo(changes) {
    return { _items: changes || [] };
}

// =============================================
// UTILITY: Hero Data Helpers
// =============================================

/**
 * Get hero instance from user data.
 * @param {object} gameData
 * @param {string|number} heroId - Instance heroId (NOT displayId)
 * @returns {object|null}
 */
function getHero(gameData, heroId) {
    if (!gameData || !gameData.heros || !gameData.heros._heros) return null;
    return gameData.heros._heros[heroId] || null;
}

/**
 * Remove hero from user's roster.
 * @param {object} gameData
 * @param {string|number} heroId
 * @returns {boolean}
 */
function removeHero(gameData, heroId) {
    if (!gameData.heros || !gameData.heros._heros) return false;
    if (gameData.heros._heros[heroId]) {
        delete gameData.heros._heros[heroId];
        return true;
    }
    return false;
}

/**
 * Add a new hero to user's roster.
 * @param {object} gameData
 * @param {string} heroId - New instance ID
 * @param {string} heroDisplayId - Template ID
 * @param {number} level - Starting level
 * @returns {object} The created hero data
 */
function addHero(gameData, heroId, heroDisplayId, level) {
    if (!gameData.heros._heros) gameData.heros._heros = {};

    gameData.heros._heros[heroId] = {
        _heroId: heroId,
        _heroDisplayId: String(heroDisplayId),
        _heroStar: 0,
        _heroTag: [0],
        _fragment: 0,
        _superSkillResetCount: 0,
        _potentialResetCount: 0,
        _expeditionMaxLevel: 0,
        _heroBaseAttr: {
            _level: level || 1,
            _evolveLevel: 0,
            _hp: 0, _attack: 0, _armor: 0, _speed: 0,
            _hit: 0, _dodge: 0, _block: 0, _blockEffect: 0,
            _skillDamage: 0, _critical: 0, _criticalResist: 0,
            _criticalDamage: 0, _armorBreak: 0, _damageReduce: 0,
            _controlResist: 0, _trueDamage: 0, _energy: 0,
            _power: 0, _extraArmor: 0, _hpPercent: 0,
            _armorPercent: 0, _attackPercent: 0, _speedPercent: 0,
            _orghp: 0, _superDamage: 0, _healPlus: 0,
            _healerPlus: 0, _damageDown: 0, _shielderPlus: 0,
            _damageUp: 0
        },
        _superSkillLevel: {},
        _potentialLevel: {},
        _qigong: null,
        _qigongTmp: null,
        _qigongStage: 1,
        _qigongTmpPower: 0,
        _totalCost: null,
        _breakInfo: null,
        _gemstoneSuitId: null,
        _linkTo: null,
        _linkFrom: null
    };

    return gameData.heros._heros[heroId];
}

/**
 * Find first hero instance matching a displayId.
 * @param {object} gameData
 * @param {string|number} heroDisplayId
 * @returns {object|null} { heroId, heroData }
 */
function findHeroByDisplayId(gameData, heroDisplayId) {
    if (!gameData.heros || !gameData.heros._heros) return null;
    var keys = Object.keys(gameData.heros._heros);
    for (var i = 0; i < keys.length; i++) {
        var hid = keys[i];
        if (String(gameData.heros._heros[hid]._heroDisplayId) === String(heroDisplayId)) {
            return { heroId: hid, heroData: gameData.heros._heros[hid] };
        }
    }
    return null;
}

/**
 * Get next available hero instance ID.
 * @param {object} gameData
 * @returns {string}
 */
function getNextHeroId(gameData) {
    if (!gameData.heros || !gameData.heros._heros) return '1';
    var keys = Object.keys(gameData.heros._heros);
    var maxId = 0;
    for (var i = 0; i < keys.length; i++) {
        var id = parseInt(keys[i]);
        if (id > maxId) maxId = id;
    }
    return String(maxId + 1);
}

/**
 * Get max level for hero based on evolveLevel and quality.
 * From heroEvolve.json: each entry has a `level` (evolveLevel) that determines the cap.
 * Max level = highest evolveLevel entry's level value (typically 100 base + evolveLevel * 10).
 * Simplified: maxLevel = 100 + evolveLevel * 10 (capped at 300 from constant.json).
 * @param {number} evolveLevel
 * @returns {number}
 */
function getMaxLevel(evolveLevel) {
    var constantConfig = GameData.get('constant');
    var maxPlayerLevel = constantConfig && constantConfig[1] ? constantConfig[1].maxUserLevel || 300 : 300;
    return Math.min(100 + evolveLevel * 10, maxPlayerLevel);
}

// =============================================
// UTILITY: Total Cost Calculation
// =============================================

/**
 * Calculate total cost for a hero (all level ups + evolve + qigong etc).
 * Used in _totalCost response field. Simplified: just level up costs.
 * @param {object} heroData
 * @param {object} gameData
 * @returns {object} { _items: [{ _id, _num }] }
 */
function calculateTotalCost(heroData, gameData) {
    // Simplified: return empty total cost
    // Full implementation would sum all historical costs
    return { _items: [] };
}

// =============================================
// ACTION: getAttrs
// =============================================

/**
 * Calculate and return attributes for requested heroes.
 *
 * Client sends: { type:"hero", action:"getAttrs", userId, heros:[heroId,...], version:"1.0" }
 * Client callback: HerosManager.getInstance().getAttrsCallBack(heroIdList, response)
 *   - Reads response._attrs[heroId]._items and response._baseAttrs[heroId]._items
 *
 * Response: {
 *   _attrs: { [heroId]: { _items: [{ _id, _num }] } },
 *   _baseAttrs: { [heroId]: { _items: [{ _id, _num }] } }
 * }
 *
 * @param {object} parsed
 * @param {function} callback
 */
function actionGetAttrs(parsed, callback) {
    var userId = parsed.userId;
    var heroIds = parsed.heros;

    if (!heroIds || !Array.isArray(heroIds) || heroIds.length === 0) {
        callback(RH.success({ _attrs: {}, _baseAttrs: {} }));
        return;
    }

    logger.info('HERO', 'getAttrs userId=' + userId + ' heroCount=' + heroIds.length);

    userDataService.loadUserData(userId)
        .then(function (gameData) {
            if (!gameData) {
                callback(RH.success({ _attrs: {}, _baseAttrs: {} }));
                return;
            }

            var attrs = {};
            var baseAttrs = {};

            for (var i = 0; i < heroIds.length; i++) {
                var hid = heroIds[i];
                var heroData = getHero(gameData, hid);
                var calculated = calculateHeroAttrs(heroData);
                attrs[hid] = calculated._totalAttr;
                baseAttrs[hid] = calculated._baseAttr;
            }

            callback(RH.success({ _attrs: attrs, _baseAttrs: baseAttrs }));
        })
        .catch(function (err) {
            logger.info('HERO', 'getAttrs error: ' + err.message);
            callback(RH.success({ _attrs: {}, _baseAttrs: {} }));
        });
}

// =============================================
// ACTION: autoLevelUp
// =============================================

/**
 * Level up a hero. Can do single (times=1) or bulk (times=100).
 *
 * Client sends: { heroId, times: 1|100, version:"1.0" }
 * Client callback: levelUpCallBack(response)
 *   - Reads heroId, _evolveLevel, _heroLevel, _baseAttr, _totalAttr, _changeInfo, _totalCost, _earringTotalCost, _equip
 *
 * @param {object} parsed
 * @param {function} callback
 */
function actionAutoLevelUp(parsed, callback) {
    var userId = parsed.userId;
    var heroId = parsed.heroId;
    var times = parseInt(parsed.times) || 1;

    logger.info('HERO', 'autoLevelUp userId=' + userId + ' heroId=' + heroId + ' times=' + times);

    if (!heroId) { callback(RH.error(RH.ErrorCode.LACK_PARAM, 'Missing heroId')); return; }

    userDataService.loadUserData(userId).then(function (gameData) {
        if (!gameData) { callback(RH.error(RH.ErrorCode.DATA_ERROR, 'User not found')); return; }

        var heroData = getHero(gameData, heroId);
        if (!heroData) { callback(RH.error(RH.ErrorCode.DATA_ERROR, 'Hero not found')); return; }

        var evolveLevel = heroData._heroBaseAttr._evolveLevel || 0;
        var level = heroData._heroBaseAttr._level || 1;
        var maxLevel = getMaxLevel(evolveLevel);
        var quality = getQualityFromEvolve(evolveLevel);

        // Get level up config
        var configName = LEVEL_UP_CONFIG[quality];
        var levelUpConfig = GameData.get(configName);
        if (!levelUpConfig) {
            callback(RH.error(RH.ErrorCode.DATA_ERROR, 'No level up config for quality: ' + quality));
            return;
        }

        var changes = [];
        var levelsGained = 0;

        for (var t = 0; t < times; t++) {
            if (level >= maxLevel) break;

            var nextLevel = level + 1;
            var costEntry = levelUpConfig[String(nextLevel)];
            if (!costEntry) break;

            // Check and consume costs
            var costId1 = costEntry.costID1;
            var costNum1 = costEntry.num1 || 0;
            var costId2 = costEntry.costID2;
            var costNum2 = costEntry.num2 || 0;

            if (costNum1 > 0 && !hasItem(gameData, costId1, costNum1)) {
                // Not enough resources
                var response = buildLevelUpResponse(heroId, heroData, gameData, changes, evolveLevel);
                response._openType = hasItem(gameData, costId1, 1) ? OPEN_TYPE.TIME_BONUS : OPEN_TYPE.TIPS;
                response._totalCost = calculateTotalCost(heroData, gameData);
                callback(RH.success(response));
                return;
            }
            if (costNum2 > 0 && !hasItem(gameData, costId2, costNum2)) {
                var response = buildLevelUpResponse(heroId, heroData, gameData, changes, evolveLevel);
                response._openType = OPEN_TYPE.TIPS;
                response._totalCost = calculateTotalCost(heroData, gameData);
                callback(RH.success(response));
                return;
            }

            // Consume costs
            if (costNum1 > 0) changes.push(addItem(gameData, costId1, -costNum1));
            if (costNum2 > 0) changes.push(addItem(gameData, costId2, -costNum2));

            level = nextLevel;
            levelsGained++;
        }

        if (levelsGained === 0) {
            // Already at max level
            var response = buildLevelUpResponse(heroId, heroData, gameData, changes, evolveLevel);
            response._totalCost = calculateTotalCost(heroData, gameData);
            callback(RH.success(response));
            return;
        }

        // Update hero level
        heroData._heroBaseAttr._level = level;

        var response = buildLevelUpResponse(heroId, heroData, gameData, changes, evolveLevel);
        response._totalCost = calculateTotalCost(heroData, gameData);

        // Save
        userDataService.saveUserData(userId, gameData).then(function () {
            logger.info('HERO', 'autoLevelUp userId=' + userId + ' heroId=' + heroId + ' +' + levelsGained + ' levels');
            callback(RH.success(response));
        });
    }).catch(function (err) {
        logger.info('HERO', 'autoLevelUp error: ' + err.message);
        callback(RH.error(RH.ErrorCode.UNKNOWN_ERROR, 'Level up failed'));
    });
}

/**
 * Build level up response.
 * @param {string} heroId
 * @param {object} heroData
 * @param {object} gameData
 * @param {Array} changes
 * @param {number} evolveLevel
 * @returns {object}
 */
function buildLevelUpResponse(heroId, heroData, gameData, changes, evolveLevel) {
    var attrs = calculateHeroAttrs(heroData);
    return {
        heroId: heroId,
        _evolveLevel: evolveLevel,
        _heroLevel: heroData._heroBaseAttr._level,
        _baseAttr: attrs._baseAttr,
        _totalAttr: attrs._totalAttr,
        _changeInfo: buildChangeInfo(changes)
    };
}

// =============================================
// ACTION: evolve
// =============================================

/**
 * Evolve (star up) a hero.
 *
 * Client sends: { heroId, version:"1.0" }
 * Client callback: levelUpCallBack(response) — same as autoLevelUp
 *
 * @param {object} parsed
 * @param {function} callback
 */
function actionEvolve(parsed, callback) {
    var userId = parsed.userId;
    var heroId = parsed.heroId;

    logger.info('HERO', 'evolve userId=' + userId + ' heroId=' + heroId);

    if (!heroId) { callback(RH.error(RH.ErrorCode.LACK_PARAM, 'Missing heroId')); return; }

    userDataService.loadUserData(userId).then(function (gameData) {
        if (!gameData) { callback(RH.error(RH.ErrorCode.DATA_ERROR, 'User not found')); return; }

        var heroData = getHero(gameData, heroId);
        if (!heroData) { callback(RH.error(RH.ErrorCode.DATA_ERROR, 'Hero not found')); return; }

        var displayId = heroData._heroDisplayId;
        var currentEvolve = heroData._heroBaseAttr._evolveLevel || 0;
        var level = heroData._heroBaseAttr._level || 1;

        // Find next evolve entry from heroEvolve.json
        var evolveConfig = GameData.get('heroEvolve');
        if (!evolveConfig || !evolveConfig[displayId]) {
            callback(RH.error(RH.ErrorCode.DATA_ERROR, 'No evolve config'));
            return;
        }

        var entries = evolveConfig[displayId];
        var nextEntry = null;
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].level === currentEvolve + 20) {
                nextEntry = entries[i];
                break;
            }
        }

        if (!nextEntry) {
            // Already at max evolve
            var attrs = calculateHeroAttrs(heroData);
            callback(RH.success({
                heroId: heroId,
                _evolveLevel: currentEvolve,
                _heroLevel: level,
                _baseAttr: attrs._baseAttr,
                _totalAttr: attrs._totalAttr,
                _changeInfo: buildChangeInfo([])
            }));
            return;
        }

        // Check level requirement
        if (level < (nextEntry.level || 0)) {
            var attrs = calculateHeroAttrs(heroData);
            var resp = {
                heroId: heroId,
                _evolveLevel: currentEvolve,
                _heroLevel: level,
                _baseAttr: attrs._baseAttr,
                _totalAttr: attrs._totalAttr,
                _changeInfo: buildChangeInfo([]),
                _openType: OPEN_TYPE.TIPS
            };
            callback(RH.success(resp));
            return;
        }

        // Check costs
        var changes = [];
        var costId1 = nextEntry.costID1;
        var costNum1 = nextEntry.num1 || 0;
        var costId2 = nextEntry.costID2;
        var costNum2 = nextEntry.num2 || 0;

        if (costNum1 > 0 && !hasItem(gameData, costId1, costNum1)) {
            var attrs = calculateHeroAttrs(heroData);
            callback(RH.success({
                heroId: heroId, _evolveLevel: currentEvolve, _heroLevel: level,
                _baseAttr: attrs._baseAttr, _totalAttr: attrs._totalAttr,
                _changeInfo: buildChangeInfo([]), _openType: OPEN_TYPE.TIPS
            }));
            return;
        }
        if (costNum2 > 0 && !hasItem(gameData, costId2, costNum2)) {
            var attrs = calculateHeroAttrs(heroData);
            callback(RH.success({
                heroId: heroId, _evolveLevel: currentEvolve, _heroLevel: level,
                _baseAttr: attrs._baseAttr, _totalAttr: attrs._totalAttr,
                _changeInfo: buildChangeInfo([]), _openType: OPEN_TYPE.TIPS
            }));
            return;
        }

        // Consume costs
        if (costNum1 > 0) changes.push(addItem(gameData, costId1, -costNum1));
        if (costNum2 > 0) changes.push(addItem(gameData, costId2, -costNum2));

        // Evolve
        var newEvolve = currentEvolve + 20;
        heroData._heroBaseAttr._evolveLevel = newEvolve;
        heroData._heroStar = (heroData._heroStar || 0) + 1;

        // Update max level
        heroData._heroBaseAttr.maxlevel = getMaxLevel(newEvolve);

        // Check if new level exceeds new max
        var newMaxLevel = getMaxLevel(newEvolve);
        if (level > newMaxLevel) {
            heroData._heroBaseAttr._level = newMaxLevel;
        }

        var attrs = calculateHeroAttrs(heroData);
        var resp = {
            heroId: heroId,
            _evolveLevel: newEvolve,
            _heroLevel: heroData._heroBaseAttr._level,
            _baseAttr: attrs._baseAttr,
            _totalAttr: attrs._totalAttr,
            _changeInfo: buildChangeInfo(changes),
            _totalCost: calculateTotalCost(heroData, gameData),
            _earringTotalCost: { _items: [] }
        };

        userDataService.saveUserData(userId, gameData).then(function () {
            logger.info('HERO', 'evolve userId=' + userId + ' heroId=' + heroId + ' evolveLevel=' + newEvolve);
            callback(RH.success(resp));
        });
    }).catch(function (err) {
        logger.info('HERO', 'evolve error: ' + err.message);
        callback(RH.error(RH.ErrorCode.UNKNOWN_ERROR, 'Evolve failed'));
    });
}

// =============================================
// ACTION: resolve (decompose hero)
// =============================================

/**
 * Decompose heroes into soul coins.
 *
 * Client sends: { heros: [heroId, ...], version:"1.0" }
 * Response: { _changeInfo, _linkHeroes }
 *
 * @param {object} parsed
 * @param {function} callback
 */
function actionResolve(parsed, callback) {
    var userId = parsed.userId;
    var heroIds = parsed.heros;

    logger.info('HERO', 'resolve userId=' + userId + ' heroes=' + JSON.stringify(heroIds));

    if (!heroIds || !Array.isArray(heroIds) || heroIds.length === 0) {
        callback(RH.error(RH.ErrorCode.LACK_PARAM, 'Missing heros'));
        return;
    }

    userDataService.loadUserData(userId).then(function (gameData) {
        if (!gameData) { callback(RH.error(RH.ErrorCode.DATA_ERROR, 'User not found')); return; }

        var changes = [];

        for (var i = 0; i < heroIds.length; i++) {
            var hid = heroIds[i];
            var heroData = getHero(gameData, hid);
            if (!heroData) continue;

            var quality = getQualityFromEvolve(heroData._heroBaseAttr._evolveLevel || 0);

            // Get resolve reward from heroResolve.json
            var resolveConfig = GameData.get('heroResolve');
            var qIdx = getQualityIndex(quality);
            var resolveEntry = resolveConfig ? resolveConfig[String(qIdx)] : null;

            if (resolveEntry && resolveEntry.num > 0) {
                changes.push(addItem(gameData, resolveEntry.resolveTo, resolveEntry.num));
            }

            removeHero(gameData, hid);
        }

        var resp = {
            _changeInfo: buildChangeInfo(changes),
            _linkHeroes: null
        };

        userDataService.saveUserData(userId, gameData).then(function () {
            logger.info('HERO', 'resolve userId=' + userId + ' resolved=' + heroIds.length + ' heroes');
            callback(RH.success(resp));
        });
    }).catch(function (err) {
        logger.info('HERO', 'resolve error: ' + err.message);
        callback(RH.error(RH.ErrorCode.UNKNOWN_ERROR, 'Resolve failed'));
    });
}

// =============================================
// ACTION: reborn
// =============================================

/**
 * Reborn hero — reset and reclaim some resources.
 *
 * Client sends: { heros: [heroId, ...], keepStar: boolean, version:"1.0" }
 * Response: Same as resolve — { _changeInfo, _linkHeroes }
 *
 * @param {object} parsed
 * @param {function} callback
 */
function actionReborn(parsed, callback) {
    var userId = parsed.userId;
    var heroIds = parsed.heros;
    var keepStar = parsed.keepStar;

    logger.info('HERO', 'reborn userId=' + userId + ' heroes=' + JSON.stringify(heroIds) + ' keepStar=' + keepStar);

    if (!heroIds || !Array.isArray(heroIds) || heroIds.length === 0) {
        callback(RH.error(RH.ErrorCode.LACK_PARAM, 'Missing heros'));
        return;
    }

    userDataService.loadUserData(userId).then(function (gameData) {
        if (!gameData) { callback(RH.error(RH.ErrorCode.DATA_ERROR, 'User not found')); return; }

        var changes = [];

        for (var i = 0; i < heroIds.length; i++) {
            var hid = heroIds[i];
            var heroData = getHero(gameData, hid);
            if (!heroData) continue;

            var quality = getQualityFromEvolve(heroData._heroBaseAttr._evolveLevel || 0);

            // Get rebirth refund from heroRebirth.json
            var rebirthConfig = GameData.get('heroRebirth');
            var qIdx = getQualityIndex(quality);
            var rebirthEntry = rebirthConfig ? rebirthConfig[String(qIdx)] : null;

            if (rebirthEntry && rebirthEntry.num > 0) {
                changes.push(addItem(gameData, rebirthEntry.rebirthNeeded, rebirthEntry.num));
            }

            removeHero(gameData, hid);
        }

        userDataService.saveUserData(userId, gameData).then(function () {
            logger.info('HERO', 'reborn userId=' + userId + ' reborned=' + heroIds.length + ' heroes');
            callback(RH.success({ _changeInfo: buildChangeInfo(changes), _linkHeroes: null }));
        });
    }).catch(function (err) {
        logger.info('HERO', 'reborn error: ' + err.message);
        callback(RH.error(RH.ErrorCode.UNKNOWN_ERROR, 'Reborn failed'));
    });
}

// =============================================
// ACTION: splitHero
// =============================================

/**
 * Split a hero into fragments/pieces.
 *
 * Client sends: { heros: [heroId], version:"1.0" }
 * Response: { _changeInfo, _addHeroes, _linkHeroes }
 *
 * @param {object} parsed
 * @param {function} callback
 */
function actionSplitHero(parsed, callback) {
    var userId = parsed.userId;
    var heroIds = parsed.heros;

    logger.info('HERO', 'splitHero userId=' + userId + ' heroId=' + JSON.stringify(heroIds));

    if (!heroIds || !Array.isArray(heroIds) || heroIds.length === 0) {
        callback(RH.error(RH.ErrorCode.LACK_PARAM, 'Missing heros'));
        return;
    }

    userDataService.loadUserData(userId).then(function (gameData) {
        if (!gameData) { callback(RH.error(RH.ErrorCode.DATA_ERROR, 'User not found')); return; }

        var changes = [];

        for (var i = 0; i < heroIds.length; i++) {
            var hid = heroIds[i];
            var heroData = getHero(gameData, hid);
            if (!heroData) continue;

            var displayId = heroData._heroDisplayId;
            var quality = getQualityFromEvolve(heroData._heroBaseAttr._evolveLevel || 0);

            // Find piece item for this hero from heroPiece.json
            var pieceConfig = GameData.get('heroPiece');
            var pieceId = null;
            var mergeNum = 10;
            if (pieceConfig) {
                for (var p in pieceConfig) {
                    if (pieceConfig[p].belongTo == displayId) {
                        pieceId = pieceConfig[p].id;
                        mergeNum = pieceConfig[p].mergeNum || 10;
                        break;
                    }
                }
            }

            if (pieceId) {
                // Give back a portion of merge cost as pieces
                changes.push(addItem(gameData, pieceId, Math.ceil(mergeNum / 2)));
            }

            removeHero(gameData, hid);
        }

        userDataService.saveUserData(userId, gameData).then(function () {
            logger.info('HERO', 'splitHero userId=' + userId + ' split=' + heroIds.length);
            callback(RH.success({
                _changeInfo: buildChangeInfo(changes),
                _addHeroes: [],
                _linkHeroes: null
            }));
        });
    }).catch(function (err) {
        logger.info('HERO', 'splitHero error: ' + err.message);
        callback(RH.error(RH.ErrorCode.UNKNOWN_ERROR, 'Split failed'));
    });
}

// =============================================
// ACTION: inherit
// =============================================

/**
 * Transfer stats from one hero to another.
 *
 * Client sends: { fromHeroId, toHeroId, version:"1.0" }
 * Response: { fromHeroId, _toHero, _changeInfo, _addHeroes, _baseAttr, _totalAttr, _totalCost, _inheritFromLinkHeroes }
 *
 * @param {object} parsed
 * @param {function} callback
 */
function actionInherit(parsed, callback) {
    var userId = parsed.userId;
    var fromHeroId = parsed.fromHeroId;
    var toHeroId = parsed.toHeroId;

    logger.info('HERO', 'inherit userId=' + userId + ' from=' + fromHeroId + ' to=' + toHeroId);

    if (!fromHeroId || !toHeroId) {
        callback(RH.error(RH.ErrorCode.LACK_PARAM, 'Missing fromHeroId or toHeroId'));
        return;
    }

    userDataService.loadUserData(userId).then(function (gameData) {
        if (!gameData) { callback(RH.error(RH.ErrorCode.DATA_ERROR, 'User not found')); return; }

        var fromHero = getHero(gameData, fromHeroId);
        var toHero = getHero(gameData, toHeroId);

        if (!fromHero) { callback(RH.error(RH.ErrorCode.DATA_ERROR, 'Source hero not found')); return; }
        if (!toHero) { callback(RH.error(RH.ErrorCode.DATA_ERROR, 'Target hero not found')); return; }

        // Transfer level and evolve level
        toHero._heroBaseAttr._level = fromHero._heroBaseAttr._level;
        toHero._heroBaseAttr._evolveLevel = fromHero._heroBaseAttr._evolveLevel;
        toHero._heroStar = fromHero._heroStar;
        toHero._heroBaseAttr.maxlevel = getMaxLevel(toHero._heroBaseAttr._evolveLevel);

        // Remove source hero
        removeHero(gameData, fromHeroId);

        var changes = [];
        var toHeroAttrs = calculateHeroAttrs(toHero);

        var resp = {
            fromHeroId: fromHeroId,
            _toHero: toHero,
            _changeInfo: buildChangeInfo(changes),
            _addHeroes: [],
            _baseAttr: toHeroAttrs._baseAttr,
            _totalAttr: toHeroAttrs._totalAttr,
            _totalCost: calculateTotalCost(toHero, gameData),
            _inheritFromLinkHeroes: null
        };

        userDataService.saveUserData(userId, gameData).then(function () {
            logger.info('HERO', 'inherit userId=' + userId + ' from=' + fromHeroId + ' to=' + toHeroId + ' OK');
            callback(RH.success(resp));
        });
    }).catch(function (err) {
        logger.info('HERO', 'inherit error: ' + err.message);
        callback(RH.error(RH.ErrorCode.UNKNOWN_ERROR, 'Inherit failed'));
    });
}

// =============================================
// ACTIONS: qigong / saveQigong / cancelQigong
// =============================================

/**
 * Start qigong training.
 * Client sends: { heroId, times, version:"1.0" }
 */
function actionQigong(parsed, callback) {
    var userId = parsed.userId;
    var heroId = parsed.heroId;
    var times = parseInt(parsed.times) || 1;

    logger.info('HERO', 'qigong userId=' + userId + ' heroId=' + heroId + ' times=' + times);

    if (!heroId) { callback(RH.error(RH.ErrorCode.LACK_PARAM, 'Missing heroId')); return; }

    userDataService.loadUserData(userId).then(function (gameData) {
        if (!gameData) { callback(RH.error(RH.ErrorCode.DATA_ERROR, 'User not found')); return; }

        var heroData = getHero(gameData, heroId);
        if (!heroData) { callback(RH.error(RH.ErrorCode.DATA_ERROR, 'Hero not found')); return; }

        var displayId = heroData._heroDisplayId;
        var heroInfo = getHeroInfo(displayId);
        var heroType = heroInfo ? heroInfo.type : 'body';
        var qigongStage = heroData._qigongStage || 1;

        // Find qigong config for this type and stage
        var qigongConfig = GameData.get('qigong');
        if (!qigongConfig) {
            callback(RH.error(RH.ErrorCode.DATA_ERROR, 'No qigong config'));
            return;
        }

        var qigongEntry = null;
        var qKeys = Object.keys(qigongConfig);
        for (var i = 0; i < qKeys.length; i++) {
            var qe = qigongConfig[qKeys[i]];
            if (qe.heroType === heroType && qe.levelPara === qigongStage) {
                qigongEntry = qe;
                break;
            }
        }

        if (!qigongEntry) {
            callback(RH.error(RH.ErrorCode.DATA_ERROR, 'No qigong entry for stage'));
            return;
        }

        // Check costs
        var changes = [];
        if (qigongEntry.qigongCostID1 && (qigongEntry.num1 || 0) > 0) {
            if (!hasItem(gameData, qigongEntry.qigongCostID1, qigongEntry.num1)) {
                callback(RH.success({ heroId: heroId, _openType: OPEN_TYPE.TIPS, _changeInfo: buildChangeInfo([]) }));
                return;
            }
            changes.push(addItem(gameData, qigongEntry.qigongCostID1, -qigongEntry.num1));
        }
        if (qigongEntry.qigongCostID2 && (qigongEntry.num2 || 0) > 0) {
            if (!hasItem(gameData, qigongEntry.qigongCostID2, qigongEntry.num2)) {
                callback(RH.success({ heroId: heroId, _openType: OPEN_TYPE.TIPS, _changeInfo: buildChangeInfo([]) }));
                return;
            }
            changes.push(addItem(gameData, qigongEntry.qigongCostID2, -qigongEntry.num2));
        }

        // Generate qigong temp results (random within max range)
        var hpResult = Math.floor(Math.random() * qigongEntry.hpMax);
        var attackResult = Math.floor(Math.random() * qigongEntry.attackMax);
        var armorResult = Math.floor(Math.random() * qigongEntry.armorMax);

        heroData._qigongTmp = {
            _items: [
                { _id: 'hp', _num: hpResult },
                { _id: 'attack', _num: attackResult },
                { _id: 'armor', _num: armorResult }
            ]
        };

        var attrs = calculateHeroAttrs(heroData);

        var resp = {
            heroId: heroId,
            _qigongTmp: heroData._qigongTmp,
            _offPower: 0,
            _changeInfo: buildChangeInfo(changes),
            _baseAttr: attrs._baseAttr,
            _totalAttr: attrs._totalAttr,
            _totalCost: calculateTotalCost(heroData, gameData)
        };

        userDataService.saveUserData(userId, gameData).then(function () {
            logger.info('HERO', 'qigong userId=' + userId + ' heroId=' + heroId + ' hp+' + hpResult + ' atk+' + attackResult + ' arm+' + armorResult);
            callback(RH.success(resp));
        });
    }).catch(function (err) {
        logger.info('HERO', 'qigong error: ' + err.message);
        callback(RH.error(RH.ErrorCode.UNKNOWN_ERROR, 'Qigong failed'));
    });
}

/**
 * Save qigong training results permanently.
 */
function actionSaveQigong(parsed, callback) {
    var userId = parsed.userId;
    var heroId = parsed.heroId;

    logger.info('HERO', 'saveQigong userId=' + userId + ' heroId=' + heroId);

    if (!heroId) { callback(RH.error(RH.ErrorCode.LACK_PARAM, 'Missing heroId')); return; }

    userDataService.loadUserData(userId).then(function (gameData) {
        if (!gameData) { callback(RH.error(RH.ErrorCode.DATA_ERROR, 'User not found')); return; }

        var heroData = getHero(gameData, heroId);
        if (!heroData || !heroData._qigongTmp) {
            callback(RH.success({ heroId: heroId }));
            return;
        }

        // Merge qigongTmp into qigong
        if (!heroData._qigong || !heroData._qigong._items) {
            heroData._qigong = { _items: [] };
        }

        var qigongItems = heroData._qigong._items;
        var tmpItems = heroData._qigongTmp._items || [];

        // Merge: add tmp values to existing qigong values
        for (var i = 0; i < tmpItems.length; i++) {
            var found = false;
            for (var j = 0; j < qigongItems.length; j++) {
                if (qigongItems[j]._id === tmpItems[i]._id) {
                    qigongItems[j]._num = (qigongItems[j]._num || 0) + (tmpItems[i]._num || 0);
                    found = true;
                    break;
                }
            }
            if (!found) {
                qigongItems.push({ _id: tmpItems[i]._id, _num: tmpItems[i]._num });
            }
        }

        // Advance stage
        heroData._qigongStage = (heroData._qigongStage || 1) + 1;
        heroData._qigongTmp = null;

        var attrs = calculateHeroAttrs(heroData);

        var resp = {
            heroId: heroId,
            _qigongTmp: heroData._qigongTmp,
            _qigong: heroData._qigong,
            _qigongStage: heroData._qigongStage,
            _changeInfo: buildChangeInfo([]),
            _baseAttr: attrs._baseAttr,
            _totalAttr: attrs._totalAttr,
            _totalCost: calculateTotalCost(heroData, gameData)
        };

        userDataService.saveUserData(userId, gameData).then(function () {
            logger.info('HERO', 'saveQigong userId=' + userId + ' heroId=' + heroId + ' stage=' + heroData._qigongStage);
            callback(RH.success(resp));
        });
    }).catch(function (err) {
        logger.info('HERO', 'saveQigong error: ' + err.message);
        callback(RH.error(RH.ErrorCode.UNKNOWN_ERROR, 'Save qigong failed'));
    });
}

/**
 * Cancel qigong training (discard temp results).
 */
function actionCancelQigong(parsed, callback) {
    var userId = parsed.userId;
    var heroId = parsed.heroId;

    logger.info('HERO', 'cancelQigong userId=' + userId + ' heroId=' + heroId);

    if (!heroId) { callback(RH.error(RH.ErrorCode.LACK_PARAM, 'Missing heroId')); return; }

    userDataService.loadUserData(userId).then(function (gameData) {
        if (!gameData) { callback(RH.error(RH.ErrorCode.DATA_ERROR, 'User not found')); return; }

        var heroData = getHero(gameData, heroId);
        if (heroData) {
            heroData._qigongTmp = null;
            heroData._qigongTmpPower = 0;
        }

        userDataService.saveUserData(userId, gameData).then(function () {
            callback(RH.success({ heroId: heroId }));
        });
    }).catch(function (err) {
        logger.info('HERO', 'cancelQigong error: ' + err.message);
        callback(RH.error(RH.ErrorCode.UNKNOWN_ERROR, 'Cancel qigong failed'));
    });
}

// =============================================
// ACTIONS: heroBreak / activeHeroBreak / autoHeroBreak / rebornSelfBreak
// =============================================

/**
 * Helper: Perform breakthrough on a hero.
 * @param {object} gameData
 * @param {string} heroId
 * @returns {object|null} { heroData, changes, error }
 */
function doHeroBreak(gameData, heroId) {
    var heroData = getHero(gameData, heroId);
    if (!heroData) return { error: 'Hero not found' };

    var quality = getQualityFromEvolve(heroData._heroBaseAttr._evolveLevel || 0);

    // Only purple+ can self-break
    var qIdx = getQualityIndex(quality);
    if (qIdx < 4) return { error: 'Quality too low for breakthrough', heroData: heroData };

    var currentBreakLevel = 0;
    if (heroData._breakInfo && heroData._breakInfo._level) {
        currentBreakLevel = heroData._breakInfo._level;
    }

    // Find next break entry from selfBreak.json
    var breakConfig = GameData.get('selfBreak');
    if (!breakConfig) return { error: 'No break config', heroData: heroData };

    var nextBreakLevel = currentBreakLevel + 1;
    var nextEntry = null;
    var bKeys = Object.keys(breakConfig);
    for (var i = 0; i < bKeys.length; i++) {
        var be = breakConfig[bKeys[i]];
        if (be.breakLevel === nextBreakLevel) {
            nextEntry = be;
            break;
        }
    }

    if (!nextEntry) return { error: 'Already at max break level', heroData: heroData };

    // Check costs
    var changes = [];
    var costId1 = nextEntry.costID1;
    var costNum1 = nextEntry.costNum1 || 0;

    if (costNum1 > 0 && !hasItem(gameData, costId1, costNum1)) {
        return { error: 'INSUFFICIENT', heroData: heroData };
    }

    if (costNum1 > 0) changes.push(addItem(gameData, costId1, -costNum1));

    // Initialize breakInfo if null
    if (!heroData._breakInfo) {
        heroData._breakInfo = { _level: 0, _attrs: [] };
    }

    heroData._breakInfo._level = nextBreakLevel;
    heroData._breakInfo._attrs = heroData._breakInfo._attrs || [];
    heroData._breakInfo._attrs.push({
        _ability: nextEntry.ability1 || 'attack',
        _abilityID: nextEntry.abilityID1 || 1,
        _value: nextEntry.value1 || 0,
        _abilityAffected: nextEntry.abilityAffected1 || 1
    });

    return { heroData: heroData, changes: changes };
}

/**
 * Build heroBreak response.
 */
function buildBreakResponse(heroId, heroData, gameData, changes) {
    var attrs = calculateHeroAttrs(heroData);
    return {
        heroId: heroId,
        _breakInfo: heroData._breakInfo,
        _changeInfo: buildChangeInfo(changes),
        _baseAttr: attrs._baseAttr,
        _totalAttr: attrs._totalAttr,
        _totalCost: calculateTotalCost(heroData, gameData),
        _linkHeroes: null
    };
}

function actionHeroBreak(parsed, callback) {
    var userId = parsed.userId;
    var heroId = parsed.heroId;
    logger.info('HERO', 'heroBreak userId=' + userId + ' heroId=' + heroId);
    if (!heroId) { callback(RH.error(RH.ErrorCode.LACK_PARAM, 'Missing heroId')); return; }

    userDataService.loadUserData(userId).then(function (gameData) {
        if (!gameData) { callback(RH.error(RH.ErrorCode.DATA_ERROR, 'User not found')); return; }
        var result = doHeroBreak(gameData, heroId);
        if (result.error && result.error === 'INSUFFICIENT') {
            var attrs = calculateHeroAttrs(result.heroData);
            callback(RH.success({
                heroId: heroId, _breakInfo: result.heroData._breakInfo,
                _baseAttr: attrs._baseAttr, _totalAttr: attrs._totalAttr,
                _changeInfo: buildChangeInfo([]), _totalCost: calculateTotalCost(result.heroData, gameData),
                _openType: OPEN_TYPE.TIPS
            }));
            return;
        }
        if (result.error) {
            callback(RH.error(RH.ErrorCode.DATA_ERROR, result.error));
            return;
        }
        var resp = buildBreakResponse(heroId, result.heroData, gameData, result.changes);
        userDataService.saveUserData(userId, gameData).then(function () {
            logger.info('HERO', 'heroBreak userId=' + userId + ' heroId=' + heroId + ' OK');
            callback(RH.success(resp));
        });
    }).catch(function (err) {
        logger.info('HERO', 'heroBreak error: ' + err.message);
        callback(RH.error(RH.ErrorCode.UNKNOWN_ERROR, 'Break failed'));
    });
}

function actionActiveHeroBreak(parsed, callback) {
    // Same as heroBreak but without the manual piece count params
    actionHeroBreak(parsed, callback);
}

function actionAutoHeroBreak(parsed, callback) {
    var userId = parsed.userId;
    var heroId = parsed.heroId;
    logger.info('HERO', 'autoHeroBreak userId=' + userId + ' heroId=' + heroId);
    if (!heroId) { callback(RH.error(RH.ErrorCode.LACK_PARAM, 'Missing heroId')); return; }

    userDataService.loadUserData(userId).then(function (gameData) {
        if (!gameData) { callback(RH.error(RH.ErrorCode.DATA_ERROR, 'User not found')); return; }
        var result = doHeroBreak(gameData, heroId);
        if (result.error && result.error === 'INSUFFICIENT') {
            var attrs = calculateHeroAttrs(result.heroData);
            callback(RH.success({
                heroId: heroId, _breakInfo: result.heroData._breakInfo,
                _baseAttr: attrs._baseAttr, _totalAttr: attrs._totalAttr,
                _changeInfo: buildChangeInfo([]), _totalCost: calculateTotalCost(result.heroData, gameData),
                _openType: OPEN_TYPE.TIME_BONUS
            }));
            return;
        }
        if (result.error) {
            callback(RH.error(RH.ErrorCode.DATA_ERROR, result.error));
            return;
        }
        var resp = buildBreakResponse(heroId, result.heroData, gameData, result.changes);
        userDataService.saveUserData(userId, gameData).then(function () {
            logger.info('HERO', 'autoHeroBreak userId=' + userId + ' heroId=' + heroId + ' OK');
            callback(RH.success(resp));
        });
    }).catch(function (err) {
        logger.info('HERO', 'autoHeroBreak error: ' + err.message);
        callback(RH.error(RH.ErrorCode.UNKNOWN_ERROR, 'Auto break failed'));
    });
}

function actionRebornSelfBreak(parsed, callback) {
    var userId = parsed.userId;
    var heroId = parsed.heroId;
    logger.info('HERO', 'rebornSelfBreak userId=' + userId + ' heroId=' + heroId);

    if (!heroId) { callback(RH.error(RH.ErrorCode.LACK_PARAM, 'Missing heroId')); return; }

    userDataService.loadUserData(userId).then(function (gameData) {
        if (!gameData) { callback(RH.error(RH.ErrorCode.DATA_ERROR, 'User not found')); return; }

        var heroData = getHero(gameData, heroId);
        if (!heroData) { callback(RH.error(RH.ErrorCode.DATA_ERROR, 'Hero not found')); return; }

        // Refund some break materials
        var changes = [];
        if (heroData._breakInfo && heroData._breakInfo._level > 0) {
            // Refund a portion of self break cost items
            var breakConfig = GameData.get('selfBreak');
            if (breakConfig) {
                var bKeys = Object.keys(breakConfig);
                for (var i = 0; i < bKeys.length; i++) {
                    var be = breakConfig[bKeys[i]];
                    if (be.breakLevel <= (heroData._breakInfo._level || 0)) {
                        var refundNum = Math.floor((be.costNum1 || 0) / 2);
                        if (refundNum > 0) {
                            changes.push(addItem(gameData, be.costID1, refundNum));
                        }
                    }
                }
            }
        }

        // Reset break info
        heroData._breakInfo = { _level: 0, _attrs: [] };

        var resp = buildBreakResponse(heroId, heroData, gameData, changes);
        userDataService.saveUserData(userId, gameData).then(function () {
            logger.info('HERO', 'rebornSelfBreak userId=' + userId + ' heroId=' + heroId + ' OK');
            callback(RH.success(resp));
        });
    }).catch(function (err) {
        logger.info('HERO', 'rebornSelfBreak error: ' + err.message);
        callback(RH.error(RH.ErrorCode.UNKNOWN_ERROR, 'Reborn break failed'));
    });
}

// =============================================
// ACTION: wakeUp
// =============================================

/**
 * Awaken hero — upgrade quality tier using material heroes.
 *
 * Client sends: { heroId, heros: [materialHeroId,...], dragonPieceNum, selfPieceNum, version:"1.0" }
 * Response: { heroId, heros, _totalTalent, _hero, _changeInfo, _baseAttr, _totalAttr, _totalCost, _linkHeroes }
 *
 * @param {object} parsed
 * @param {function} callback
 */
function actionWakeUp(parsed, callback) {
    var userId = parsed.userId;
    var heroId = parsed.heroId;
    var materialHeroIds = parsed.heros;

    logger.info('HERO', 'wakeUp userId=' + userId + ' heroId=' + heroId + ' materials=' + JSON.stringify(materialHeroIds));

    if (!heroId) { callback(RH.error(RH.ErrorCode.LACK_PARAM, 'Missing heroId')); return; }

    userDataService.loadUserData(userId).then(function (gameData) {
        if (!gameData) { callback(RH.error(RH.ErrorCode.DATA_ERROR, 'User not found')); return; }

        var heroData = getHero(gameData, heroId);
        if (!heroData) { callback(RH.error(RH.ErrorCode.DATA_ERROR, 'Hero not found')); return; }

        var displayId = heroData._heroDisplayId;
        var currentStar = heroData._heroStar || 0;

        // Find wakeup config from heroWakeUp.json
        var wakeConfig = GameData.get('heroWakeUp');
        if (!wakeConfig || !wakeConfig[displayId]) {
            callback(RH.error(RH.ErrorCode.DATA_ERROR, 'No wakeup config for hero'));
            return;
        }

        var wakeEntry = wakeConfig[displayId];
        if (!wakeEntry[currentStar]) {
            callback(RH.error(RH.ErrorCode.DATA_ERROR, 'Already at max wakeup'));
            return;
        }

        var starEntry = wakeEntry[currentStar];
        if (!starEntry) {
            callback(RH.error(RH.ErrorCode.DATA_ERROR, 'No wakeup entry for star ' + currentStar));
            return;
        }

        // Verify material heroes
        if (!materialHeroIds || materialHeroIds.length === 0) {
            callback(RH.error(RH.ErrorCode.LACK_PARAM, 'Missing material heroes'));
            return;
        }

        // Consume material heroes
        var changes = [];
        for (var i = 0; i < materialHeroIds.length; i++) {
            var matId = materialHeroIds[i];
            if (!getHero(gameData, matId)) {
                callback(RH.error(RH.ErrorCode.DATA_ERROR, 'Material hero not found: ' + matId));
                return;
            }
            removeHero(gameData, matId);
        }

        // Upgrade star
        heroData._heroStar = currentStar + 1;
        if (starEntry.levelBound) {
            heroData._heroBaseAttr.maxlevel = starEntry.levelBound;
        }

        var attrs = calculateHeroAttrs(heroData);

        var resp = {
            heroId: heroId,
            heros: materialHeroIds,
            _totalTalent: starEntry.talent || 0,
            _hero: heroData,
            _changeInfo: buildChangeInfo(changes),
            _baseAttr: attrs._baseAttr,
            _totalAttr: attrs._totalAttr,
            _totalCost: calculateTotalCost(heroData, gameData),
            _linkHeroes: null
        };

        userDataService.saveUserData(userId, gameData).then(function () {
            logger.info('HERO', 'wakeUp userId=' + userId + ' heroId=' + heroId + ' star=' + heroData._heroStar);
            callback(RH.success(resp));
        });
    }).catch(function (err) {
        logger.info('HERO', 'wakeUp error: ' + err.message);
        callback(RH.error(RH.ErrorCode.UNKNOWN_ERROR, 'WakeUp failed'));
    });
}

// =============================================
// ACTION: activeSkill
// =============================================

/**
 * Activate a potential skill for a hero.
 *
 * Client sends: { heroId, pos, stype: SkillBasic.POTENTIAL, version:"1.0" }
 * Response: { heroId, _potentialLevel, _changeInfo, _baseAttr, _totalAttr, _totalCost }
 *
 * @param {object} parsed
 * @param {function} callback
 */
function actionActiveSkill(parsed, callback) {
    var userId = parsed.userId;
    var heroId = parsed.heroId;
    var pos = parsed.pos;

    logger.info('HERO', 'activeSkill userId=' + userId + ' heroId=' + heroId + ' pos=' + pos);

    if (!heroId) { callback(RH.error(RH.ErrorCode.LACK_PARAM, 'Missing heroId')); return; }

    userDataService.loadUserData(userId).then(function (gameData) {
        if (!gameData) { callback(RH.error(RH.ErrorCode.DATA_ERROR, 'User not found')); return; }

        var heroData = getHero(gameData, heroId);
        if (!heroData) { callback(RH.error(RH.ErrorCode.DATA_ERROR, 'Hero not found')); return; }

        // Initialize potential levels
        if (!heroData._potentialLevel) heroData._potentialLevel = {};
        if (!heroData._potentialLevel._items) heroData._potentialLevel._items = [];

        // Find potential config
        var potentialConfig = GameData.get('potentialLevel');
        if (!potentialConfig) {
            callback(RH.error(RH.ErrorCode.DATA_ERROR, 'No potential config'));
            return;
        }

        // Get current level for this skill position
        var currentLevel = 0;
        for (var i = 0; i < heroData._potentialLevel._items.length; i++) {
            if (heroData._potentialLevel._items[i]._pos == pos) {
                currentLevel = heroData._potentialLevel._items[i]._level || 0;
                break;
            }
        }

        var nextLevel = currentLevel + 1;

        // Find next level config from potentialLevel.json
        // Key format: displayId + pos (e.g. "120141")
        var configKey = String(heroData._heroDisplayId) + String(pos);
        var levelEntries = potentialConfig[configKey];
        if (!levelEntries) {
            callback(RH.error(RH.ErrorCode.DATA_ERROR, 'No potential config for hero'));
            return;
        }

        var nextEntry = null;
        for (var j = 0; j < levelEntries.length; j++) {
            if (levelEntries[j].level === nextLevel) {
                nextEntry = levelEntries[j];
                break;
            }
        }

        if (!nextEntry) {
            callback(RH.error(RH.ErrorCode.DATA_ERROR, 'Already at max potential level'));
            return;
        }

        // Check costs
        var changes = [];
        if (nextEntry.expID && nextEntry.expNum) {
            if (!hasItem(gameData, nextEntry.expID, nextEntry.expNum)) {
                callback(RH.success({ heroId: heroId, _openType: OPEN_TYPE.TIPS, _changeInfo: buildChangeInfo([]) }));
                return;
            }
            changes.push(addItem(gameData, nextEntry.expID, -nextEntry.expNum));
        }
        if (nextEntry.goldID && nextEntry.goldNum) {
            if (!hasItem(gameData, nextEntry.goldID, nextEntry.goldNum)) {
                callback(RH.success({ heroId: heroId, _openType: OPEN_TYPE.TIPS, _changeInfo: buildChangeInfo([]) }));
                return;
            }
            changes.push(addItem(gameData, nextEntry.goldID, -nextEntry.goldNum));
        }

        // Update potential level
        var found = false;
        for (var k = 0; k < heroData._potentialLevel._items.length; k++) {
            if (heroData._potentialLevel._items[k]._pos == pos) {
                heroData._potentialLevel._items[k]._level = nextLevel;
                found = true;
                break;
            }
        }
        if (!found) {
            heroData._potentialLevel._items.push({ _pos: pos, _level: nextLevel });
        }

        var attrs = calculateHeroAttrs(heroData);
        var resp = {
            heroId: heroId,
            _potentialLevel: heroData._potentialLevel,
            _changeInfo: buildChangeInfo(changes),
            _baseAttr: attrs._baseAttr,
            _totalAttr: attrs._totalAttr,
            _totalCost: calculateTotalCost(heroData, gameData)
        };

        userDataService.saveUserData(userId, gameData).then(function () {
            logger.info('HERO', 'activeSkill userId=' + userId + ' heroId=' + heroId + ' pos=' + pos + ' level=' + nextLevel);
            callback(RH.success(resp));
        });
    }).catch(function (err) {
        logger.info('HERO', 'activeSkill error: ' + err.message);
        callback(RH.error(RH.ErrorCode.UNKNOWN_ERROR, 'Active skill failed'));
    });
}

// =============================================
// ACTIONS: useSkin / activeSkin
// =============================================

/**
 * Equip/unequip a hero skin.
 * Client sends: { skinId } (no version field)
 * Response: { _totalAttrs: { [heroId]: { _items } } }
 */
function actionUseSkin(parsed, callback) {
    var userId = parsed.userId;
    var skinId = parsed.skinId;

    logger.info('HERO', 'useSkin userId=' + userId + ' skinId=' + skinId);

    if (!skinId) { callback(RH.error(RH.ErrorCode.LACK_PARAM, 'Missing skinId')); return; }

    userDataService.loadUserData(userId).then(function (gameData) {
        if (!gameData) { callback(RH.error(RH.ErrorCode.DATA_ERROR, 'User not found')); return; }

        // Find which hero this skin belongs to
        var skinConfig = GameData.get('heroSkin');
        if (!skinConfig || !skinConfig[skinId]) {
            callback(RH.error(RH.ErrorCode.DATA_ERROR, 'Invalid skinId'));
            return;
        }

        var skinEntry = skinConfig[skinId];
        var heroDisplayId = skinEntry.heroDrangon;

        // Update heroSkin in game data
        if (!gameData.heroSkin) gameData.heroSkin = null;
        // Simplified: just return success with current attrs
        // Full implementation would track active skins per hero

        var found = findHeroByDisplayId(gameData, heroDisplayId);
        var totalAttrs = {};
        if (found) {
            var attrs = calculateHeroAttrs(found.heroData);
            totalAttrs[found.heroId] = attrs._totalAttr;
        }

        callback(RH.success({ _totalAttrs: totalAttrs }));
    }).catch(function (err) {
        logger.info('HERO', 'useSkin error: ' + err.message);
        callback(RH.error(RH.ErrorCode.UNKNOWN_ERROR, 'Use skin failed'));
    });
}

/**
 * Activate/unlock a new hero skin.
 * Client sends: { skinId } (no version field)
 * Response: { _changeInfo }
 */
function actionActiveSkin(parsed, callback) {
    var userId = parsed.userId;
    var skinId = parsed.skinId;

    logger.info('HERO', 'activeSkin userId=' + userId + ' skinId=' + skinId);

    if (!skinId) { callback(RH.error(RH.ErrorCode.LACK_PARAM, 'Missing skinId')); return; }

    userDataService.loadUserData(userId).then(function (gameData) {
        if (!gameData) { callback(RH.error(RH.ErrorCode.DATA_ERROR, 'User not found')); return; }

        var skinConfig = GameData.get('heroSkin');
        if (!skinConfig || !skinConfig[skinId]) {
            callback(RH.error(RH.ErrorCode.DATA_ERROR, 'Invalid skinId'));
            return;
        }

        // Initialize heroSkin data if needed
        if (!gameData.heroSkin) {
            gameData.heroSkin = { skins: {}, curSkin: {} };
        }
        if (!gameData.heroSkin.skins) gameData.heroSkin.skins = {};
        if (!gameData.heroSkin.curSkin) gameData.heroSkin.curSkin = {};

        var skinEntry = skinConfig[skinId];
        var heroDisplayId = skinEntry.heroDrangon;

        if (!gameData.heroSkin.skins[heroDisplayId]) {
            gameData.heroSkin.skins[heroDisplayId] = [];
        }

        // Add skin if not already owned
        if (gameData.heroSkin.skins[heroDisplayId].indexOf(skinId) === -1) {
            gameData.heroSkin.skins[heroDisplayId].push(skinId);
        }

        // Set as current skin
        gameData.heroSkin.curSkin[heroDisplayId] = skinId;

        userDataService.saveUserData(userId, gameData).then(function () {
            logger.info('HERO', 'activeSkin userId=' + userId + ' skinId=' + skinId + ' OK');
            callback(RH.success({ _changeInfo: buildChangeInfo([]) }));
        });
    }).catch(function (err) {
        logger.info('HERO', 'activeSkin error: ' + err.message);
        callback(RH.error(RH.ErrorCode.UNKNOWN_ERROR, 'Active skin failed'));
    });
}

// =============================================
// ACTIONS: queryHeroEquipInfo / queryArenaHeroEquipInfo
// =============================================

/**
 * Query hero equipment info (for viewing other players' heroes).
 * Client sends: { queryUserId, heroId, withAttr, serverId, version:"1.0" }
 * Response: entire response passed as "Infos" to HeroEquipAndStampShow UI
 *
 * Simplified: return basic hero info. Full implementation would query
 * the target user's data (cross-player query).
 */
function actionQueryHeroEquipInfo(parsed, callback) {
    var userId = parsed.userId;
    var queryUserId = parsed.queryUserId;
    var heroId = parsed.heroId;

    logger.info('HERO', 'queryHeroEquipInfo userId=' + userId + ' queryUserId=' + queryUserId + ' heroId=' + heroId);

    if (!heroId) { callback(RH.error(RH.ErrorCode.LACK_PARAM, 'Missing heroId')); return; }

    // For now, return empty info (cross-player queries need additional logic)
    callback(RH.success({
        _equips: {},
        _stamps: {},
        _attrs: parsed.withAttr ? emptyAttrs() : null
    }));
}

/**
 * Same as queryHeroEquipInfo but for arena context.
 */
function actionQueryArenaHeroEquipInfo(parsed, callback) {
    var userId = parsed.userId;
    var queryUserId = parsed.queryUserId;
    var heroId = parsed.heroId;

    logger.info('HERO', 'queryArenaHeroEquipInfo userId=' + userId + ' queryUserId=' + queryUserId + ' heroId=' + heroId);

    if (!heroId) { callback(RH.error(RH.ErrorCode.LACK_PARAM, 'Missing heroId')); return; }

    callback(RH.success({
        _equips: {},
        _stamps: {},
        _attrs: parsed.withAttr ? emptyAttrs() : null
    }));
}

// =============================================
// MAIN HANDLER
// =============================================

/**
 * Handle hero management requests.
 *
 * Routes 20 verified actions from client code.
 * No fabricated actions — all actions verified against client minified JS.
 *
 * @param {object} socket - Socket.IO socket
 * @param {object} parsed - Parsed request
 * @param {function} callback - Response callback
 */
function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        // === ATTRIBUTE QUERY ===
        case 'getAttrs':
            actionGetAttrs(parsed, callback);
            break;

        // === LEVEL UP ===
        case 'autoLevelUp':
            actionAutoLevelUp(parsed, callback);
            break;

        // === EVOLVE (STAR UP) ===
        case 'evolve':
            actionEvolve(parsed, callback);
            break;

        // === DECOMPOSE ===
        case 'resolve':
            actionResolve(parsed, callback);
            break;

        // === REBIRTH ===
        case 'reborn':
            actionReborn(parsed, callback);
            break;

        // === SPLIT ===
        case 'splitHero':
            actionSplitHero(parsed, callback);
            break;

        // === INHERIT ===
        case 'inherit':
            actionInherit(parsed, callback);
            break;

        // === QIGONG TRAINING ===
        case 'qigong':
            actionQigong(parsed, callback);
            break;
        case 'saveQigong':
            actionSaveQigong(parsed, callback);
            break;
        case 'cancelQigong':
            actionCancelQigong(parsed, callback);
            break;

        // === BREAKTHROUGH ===
        case 'heroBreak':
            actionHeroBreak(parsed, callback);
            break;
        case 'activeHeroBreak':
            actionActiveHeroBreak(parsed, callback);
            break;
        case 'autoHeroBreak':
            actionAutoHeroBreak(parsed, callback);
            break;
        case 'rebornSelfBreak':
            actionRebornSelfBreak(parsed, callback);
            break;

        // === AWAKENING ===
        case 'wakeUp':
            actionWakeUp(parsed, callback);
            break;

        // === SKILLS ===
        case 'activeSkill':
            actionActiveSkill(parsed, callback);
            break;

        // === SKINS ===
        case 'useSkin':
            actionUseSkin(parsed, callback);
            break;
        case 'activeSkin':
            actionActiveSkin(parsed, callback);
            break;

        // === EQUIPMENT QUERY (SOCIAL) ===
        case 'queryHeroEquipInfo':
            actionQueryHeroEquipInfo(parsed, callback);
            break;
        case 'queryArenaHeroEquipInfo':
            actionQueryArenaHeroEquipInfo(parsed, callback);
            break;

        default:
            logger.warn('HERO', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
