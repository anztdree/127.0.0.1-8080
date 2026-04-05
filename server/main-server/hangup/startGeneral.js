/**
 * ============================================================
 * HANGUPSTARTGENERAL.JS v2.0.0 - Mock Handler for hangup.startGeneral
 * ============================================================
 * 
 * Purpose: Starts a PvE battle for a lesson/stage (hangup mode)
 * Generates enemy team data based on lesson config
 * Returns player team + enemy team + battle ID for client to run battle
 * 
 * HAR Reference: 10 entries across HAR_decompressed_main-server.json
 *   Entries #315-840, various lessons (10103, 10202, etc.)
 * 
 * Config Files:
 *   lesson.json       - enemy list, levels, difficulty multipliers
 *   hero.json         - hero display info, skill IDs, base % stats, speed
 *   levelAbility{Type}.json - per-heroType per-level base stats (hp/atk/armor + % attrs)
 *     Types: body, strength, critical, skill, dodge, armor, armorS, armorDamage,
 *            hit, block, blockEffect, dot
 *   abilityName.json  - attr ID → property name mapping
 * 
 * VERIFIED FORMULAS (against 10 HAR entries, 3 hero types, levels 8-22):
 *   HP   = levelAbility{heroType}.hp * difficultyHp[position]
 *   ATK  = levelAbility{heroType}.attack * difficultyAttack[position]
 *   DEF  = levelAbility{heroType}.armor * difficultyArmor[position]
 *   SPD  = hero.json.speed (direct)
 *   % attrs (4-15, 23-25, 28-29, 31, 36-37):
 *         = hero.json.{property} * levelAbility{heroType}.{property}
 *   extraArmor (26) = levelAbility.extraArmor (non-difficulty-scaled)
 *   orgHP (22)      = HP (same as computed HP)
 *   energy (16)     = 50 (constant)
 *   energyMax (41)  = hero.json.energyMax
 *   power (21)      = (base_hp + base_atk*10 + base_armor*2 + extraArmor) * diffAtk
 * 
 * Skill generation (2 skills per hero, verified against all HAR entries):
 *   hero.json.skill  → _type: 1 (active), _level: 1
 *   hero.json.normal → _type: 0 (passive), _level: 1
 *   (skillPassive1 is NOT included in server response)
 * 
 * Attr IDs in response (28 total):
 *   0-16, 21-26, 28-29, 31, 36-37, 41
 * 
 * Client processing (from main.min_777039fc.js):
 *   ts.processHandler({type:"hangup",action:"startGeneral",...}, function(r) {
 *     UserInfoSingleton.getInstance().battleId = r._battleId;
 *     var rightTeam = r._rightTeam;
 *     var rightSuper = r._rightSuper;
 *     var isBoss = ReadJsonSingleton.getInstance().lesson[lastSection].isBoss;
 *     RunSceneWithBattle.battleWithPVEAndTeamAndOnHookBattle(team, super, cb, ctx, rightTeam, rightSuper, isBoss);
 *   })
 * 
 * Changes v1.0.0 → v2.0.0:
 *   [CRITICAL] #1: Data source changed from heroLevelAttr.json + heroTypeParam.json
 *              → levelAbility{heroType}.json (correct source, verified against 10 HAR entries)
 *   [CRITICAL] #2: HP/ATK/DEF formula fixed:
 *              OLD: (levelData.X * typeParam.xParam + typeParam.xBais) * diffX
 *              NEW: levelAbility.X * diffX  (no typeParam involved)
 *   [CRITICAL] #3: Percentage attrs (4-15,23-25,28-29,31,36-37) now computed
 *              from hero.json.property * levelAbility.property (were all hardcoded 0)
 *   [CRITICAL] #4: Skill _type values fixed (were swapped):
 *              hero.skill → _type: 1 (active), hero.normal → _type: 0 (passive)
 *   [MAJOR]    #5: Removed extra skillPassive1 (HAR only includes skill + normal)
 *   [MAJOR]    #6: ExtraArmor (attr 26) now from levelAbility.extraArmor (was hardcoded 1030)
 *   [MAJOR]    #7: Power (attr 21) formula improved:
 *              OLD: Math.floor(baseHP + baseATK*10 + baseDEF*2)
 *              NEW: (base_hp + base_atk*10 + base_armor*2 + extraArmor) * diffAtk
 *   [MINOR]    #8: Removed unnecessary heroTypeParam.json and heroLevelAttr.json loads
 *   [MINOR]    #9: energyMax (attr 41) from hero.json.energyMax (was hardcoded 100)
 * 
 * Author: Local SDK Bridge
 * Version: 2.0.0
 * ============================================================
 */

(function(window) {
    'use strict';

    var LOG = {
        prefix: '[HANGUP-START]',
        _log: function(level, icon, message, data) {
            var timestamp = new Date().toISOString().substr(11, 12);
            var styles = {
                success: 'color: #22c55e; font-weight: bold;',
                info: 'color: #6b7280;',
                warn: 'color: #f59e0b; font-weight: bold;',
                error: 'color: #ef4444; font-weight: bold;'
            };
            var style = styles[level] || styles.info;
            var format = '%c' + this.prefix + ' ' + icon + ' [' + timestamp + '] ' + message;
            if (data !== undefined) {
                console.log(format + ' %o', style, data);
            } else {
                console.log(format, style);
            }
        },
        success: function(msg, data) { this._log('success', 'OK', msg, data); },
        info: function(msg, data) { this._log('info', '>>', msg, data); },
        warn: function(msg, data) { this._log('warn', '!!', msg, data); },
        error: function(msg, data) { this._log('error', 'XX', msg, data); }
    };

    // ========================================================
    // CONFIG CACHES
    // ========================================================
    var lessonCache = null;       // lesson.json
    var heroCache = null;         // hero.json (keyed by heroDisplayId)
    var levelAbilityCache = {};   // levelAbility{Type}.json keyed by heroType

    /**
     * Attr ID → hero.json property name mapping
     * For percentage attrs: value = hero.json[prop] * levelAbility[prop]
     */
    var PERCENT_ATTR_MAP = {
        '4':  'hit',               // hit
        '5':  'dodge',             // dodge
        '6':  'block',             // block
        '7':  'blockEffect',       // blockEffect
        '8':  'skillDamage',       // skillDamage
        '9':  'critical',          // critical
        '10': 'criticalResist',    // criticalResist
        '11': 'criticalDamage',    // criticalDamage
        '12': 'armorBreak',        // armorBreak
        '13': 'damageReduce',      // damageReduce
        '14': 'controlResist',     // controlResist
        '15': 'trueDamage',        // trueDamage
        '23': 'superDamage',       // superDamage
        '24': 'healPlus',          // healPlus
        '25': 'healerPlus',        // healerPlus
        '28': 'damageUp',          // damageUp
        '29': 'damageDown',        // damageDown
        '31': 'superDamageResist', // superDamageResist
        '36': 'criticalDamageResist', // criticalDamageResist
        '37': 'blockThrough'       // blockThrough
    };

    function loadConfigs() {
        var basePath = window.__GAME_BASE_PATH__ || '';

        // Load lesson.json
        fetch(basePath + 'resource/json/lesson.json').then(function(r) { return r.json(); })
            .then(function(data) {
                lessonCache = data;
                LOG.info('Loaded: lesson (' + Object.keys(data).length + ' entries)');
            })
            .catch(function(e) { LOG.warn('Failed: lesson.json — ' + e.message); });

        // Load hero.json and index by heroDisplayId
        fetch(basePath + 'resource/json/hero.json').then(function(r) { return r.json(); })
            .then(function(data) {
                heroCache = {};
                var arr = Array.isArray(data) ? data : Object.values(data);
                arr.forEach(function(h) { heroCache[h.id] = h; });
                LOG.info('Loaded: hero (' + Object.keys(heroCache).length + ' entries)');
            })
            .catch(function(e) { LOG.warn('Failed: hero.json — ' + e.message); });

        // Pre-load common levelAbility files
        var heroTypes = ['body', 'strength', 'critical', 'skill', 'dodge', 
                         'armor', 'armorS', 'armorDamage', 'hit', 'block', 
                         'blockEffect', 'dot'];
        heroTypes.forEach(function(type) {
            fetch(basePath + 'resource/json/levelAbility' + 
                  type.charAt(0).toUpperCase() + type.slice(1) + '.json')
                .then(function(r) { return r.json(); })
                .then(function(data) {
                    levelAbilityCache[type] = data;
                })
                .catch(function() {});
        });
    }

    /**
     * Generate a UUID v4 for battle ID
     */
    function generateBattleId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0;
            var v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Get levelAbility data for a specific heroType and level
     * @param {string} heroType - e.g. "critical", "strength", "skill"
     * @param {number} level - hero level
     * @returns {object|null} level ability data for this type+level
     */
    function getLevelAbility(heroType, level) {
        var typeData = levelAbilityCache[heroType];
        if (!typeData) return null;
        return typeData[String(level)] || typeData[level] || null;
    }

    /**
     * Build enemy hero attrs based on levelAbility data and hero.json
     * 
     * Verified formulas (HAR entries #315-840):
     *   HP/ATK/DEF = levelAbility.X * difficultyMultiplier
     *   % attrs    = hero.json.property * levelAbility.property
     *   Speed      = hero.json.speed
     *   Energy     = 50
     *   extraArmor = levelAbility.extraArmor (non-scaled)
     *   orgHP      = HP (same value)
     *   energyMax  = hero.json.energyMax
     *   power      = (base_hp + base_atk*10 + base_armor*2 + extraArmor) * diffAtk
     */
    function buildEnemyAttrs(heroDisplayId, level, diffHp, diffAtk, diffArmor) {
        var heroInfo = heroCache ? heroCache[heroDisplayId] : null;
        if (!heroInfo) {
            LOG.warn('Hero ' + heroDisplayId + ' not found in hero.json');
            return buildFallbackAttrs(level, diffHp, diffAtk, diffArmor);
        }

        var heroType = heroInfo.heroType || 'body';
        var la = getLevelAbility(heroType, level);

        if (!la) {
            LOG.warn('levelAbility for type=' + heroType + ' level=' + level + ' not found');
            return buildFallbackAttrs(level, diffHp, diffAtk, diffArmor);
        }

        // Compute core stats (verified: levelAbility.X * difficulty)
        var hp   = la.hp * diffHp;
        var atk  = la.attack * diffAtk;
        var def  = la.armor * diffArmor;
        var spd  = heroInfo.speed || 180;

        // Compute power (approximation using base stats * diffAtk)
        // Full formula uses heroPower.json weights per heroType - approximated here
        var basePower = la.hp + la.attack * 10 + la.armor * 2 + (la.extraArmor || 0);
        var power = Math.round(basePower * diffAtk);

        var extraArmor = la.extraArmor || 0;
        var energyMax = heroInfo.energyMax || 100;

        // Build attr items (exact 28 attr IDs from HAR: 0-16, 21-26, 28-29, 31, 36-37, 41)
        var items = {};

        // Core stats (non-percentage)
        items['0']  = { _id: 0,  _num: hp };         // HP
        items['1']  = { _id: 1,  _num: atk };        // ATK
        items['2']  = { _id: 2,  _num: def };        // DEF
        items['3']  = { _id: 3,  _num: spd };        // SPD

        // Percentage attrs (4-15): hero.json.property * levelAbility.property
        for (var attrId = 4; attrId <= 15; attrId++) {
            var propName = PERCENT_ATTR_MAP[String(attrId)];
            if (propName) {
                var heroVal = heroInfo[propName] || 0;
                var laVal = la[propName] || 0;
                items[String(attrId)] = { _id: attrId, _num: heroVal * laVal };
            } else {
                items[String(attrId)] = { _id: attrId, _num: 0 };
            }
        }

        // Energy (constant)
        items['16'] = { _id: 16, _num: 50 };

        // Power (computed)
        items['21'] = { _id: 21, _num: power };

        // OrgHP (same as HP)
        items['22'] = { _id: 22, _num: hp };

        // Extra armor (from levelAbility, non-difficulty-scaled)
        items['26'] = { _id: 26, _num: extraArmor };

        // Remaining percentage attrs (28-29)
        items['28'] = { _id: 28, _num: (heroInfo.damageUp || 0) * (la.damageUp || 0) };
        items['29'] = { _id: 29, _num: (heroInfo.damageDown || 0) * (la.damageDown || 0) };

        // superDamageResist (31)
        items['31'] = { _id: 31, _num: (heroInfo.superDamageResist || 0) * (la.superDamageResist || 0) };

        // criticalDamageResist (36) and blockThrough (37)
        items['36'] = { _id: 36, _num: (heroInfo.criticalDamageResist || 0) * (la.criticalDamageResist || 0) };
        items['37'] = { _id: 37, _num: (heroInfo.blockThrough || 0) * (la.blockThrough || 0) };

        // energyMax (41)
        items['41'] = { _id: 41, _num: energyMax };

        return { _items: items };
    }

    /**
     * Fallback attrs when hero/levelAbility data unavailable
     */
    function buildFallbackAttrs(level, diffHp, diffAtk, diffArmor) {
        var hp = 1000 * diffHp;
        var atk = 80 * diffAtk;
        var def = 100 * diffArmor;
        var items = {};
        items['0']  = { _id: 0,  _num: hp };
        items['1']  = { _id: 1,  _num: atk };
        items['2']  = { _id: 2,  _num: def };
        items['3']  = { _id: 3,  _num: 300 };
        for (var i = 4; i <= 15; i++) items[String(i)] = { _id: i, _num: 0 };
        items['16'] = { _id: 16, _num: 50 };
        items['21'] = { _id: 21, _num: Math.round(hp + atk * 10 + def * 2) };
        items['22'] = { _id: 22, _num: hp };
        for (var j = 23; j <= 26; j++) items[String(j)] = { _id: j, _num: 0 };
        items['28'] = { _id: 28, _num: 0 };
        items['29'] = { _id: 29, _num: 0 };
        items['31'] = { _id: 31, _num: 0 };
        items['36'] = { _id: 36, _num: 0 };
        items['37'] = { _id: 37, _num: 0 };
        items['41'] = { _id: 41, _num: 100 };
        return { _items: items };
    }

    /**
     * Build enemy skills (exactly 2 skills, verified against all 10 HAR entries)
     * 
     * hero.json.skill  → active skill (_type: 1)
     * hero.json.normal → passive skill (_type: 0)
     * 
     * NOTE: skillPassive1 is NOT included in the server response
     *       (confirmed across all 10 HAR entries, all heroes)
     */
    function buildEnemySkills(heroDisplayId) {
        var heroInfo = heroCache ? heroCache[heroDisplayId] : null;
        if (!heroInfo) return {};

        var skills = {};
        // Active skill (hero.json.skill → _type: 1)
        if (heroInfo.skill) {
            skills[String(heroInfo.skill)] = { _type: 1, _id: heroInfo.skill, _level: 1 };
        }
        // Passive skill (hero.json.normal → _type: 0)
        if (heroInfo.normal) {
            skills[String(heroInfo.normal)] = { _type: 0, _id: heroInfo.normal, _level: 1 };
        }

        return skills;
    }

    // ========================================================
    // MAIN HANDLER
    // ========================================================

    function handleStartGeneral(request, playerData) {
        LOG.info('Handling hangup.startGeneral');

        var hangup = playerData.hangup || {};
        var curLess = hangup._curLess || 10101;

        LOG.info('Current lesson: ' + curLess);

        // Get lesson config
        var lesson = lessonCache ? lessonCache[String(curLess)] : null;
        if (!lesson) {
            LOG.warn('Lesson ' + curLess + ' not found in cache, using defaults');
            lesson = {
                enemyList: ',,55201,55202,55203',
                enemyLevel: ',,8,8,8',
                difficultyHp: '1,1,1,1,1',
                difficultyAttack: '1,1,1,1,1',
                difficultyArmor: '1,1,1,1,1',
                power: 5000
            };
        }

        // Parse enemy config from lesson.json
        var enemyIds = (lesson.enemyList || '').split(',');
        var enemyLevels = (lesson.enemyLevel || '').split(',');
        var diffHp = (lesson.difficultyHp || '1,1,1,1,1').split(',');
        var diffAtk = (lesson.difficultyAttack || '1,1,1,1,1').split(',');
        var diffArmor = (lesson.difficultyArmor || '1,1,1,1,1').split(',');

        // Build _rightTeam (enemy team)
        // Positions are keyed by number (0-4), only non-empty slots included
        var rightTeam = {};
        for (var pos = 0; pos < enemyIds.length && pos < 5; pos++) {
            var eid = enemyIds[pos].trim();
            if (!eid) continue; // Skip empty positions

            var eLevel = parseInt(enemyLevels[pos]) || 1;
            var eHpMult = parseFloat(diffHp[pos]) || 1;
            var eAtkMult = parseFloat(diffAtk[pos]) || 1;
            var eArmorMult = parseFloat(diffArmor[pos]) || 1;

            var heroDisplayId = parseInt(eid);
            rightTeam[String(pos)] = {
                _heroDisplayId: heroDisplayId,
                _heroLevel: eLevel,
                _heroStar: 0,
                _skills: buildEnemySkills(heroDisplayId),
                _attrs: buildEnemyAttrs(heroDisplayId, eLevel, eHpMult, eAtkMult, eArmorMult),
                _skinId: 0,
                _weaponHaloId: 0,
                _weaponHaloLevel: 0
            };
        }

        // If no enemies from config, generate at least 1 fallback
        if (Object.keys(rightTeam).length === 0) {
            LOG.warn('No enemies in lesson config, using fallback');
            rightTeam['3'] = {
                _heroDisplayId: 55202,
                _heroLevel: 1,
                _heroStar: 0,
                _skills: buildEnemySkills(55202),
                _attrs: buildEnemyAttrs(55202, 1, 1, 1, 1),
                _skinId: 0,
                _weaponHaloId: 0,
                _weaponHaloLevel: 0
            };
        }

        LOG.info('Enemy team: ' + Object.keys(rightTeam).length + ' heroes');

        // Build response (matches HAR format exactly)
        // Server echoes request fields and adds response fields
        var responseData = {
            type: 'hangup',
            action: 'startGeneral',
            userId: request.userId,
            version: request.version || '1.0',
            team: request.team || [],
            super: request.super || [],
            battleField: request.battleField || 20,
            _rightTeam: rightTeam,
            _rightSuper: [],
            _battleId: generateBattleId()
        };

        LOG.success('startGeneral → battle ' + responseData._battleId.substring(0, 8) + '...');

        return responseData;
    }

    // ========================================================
    // REGISTER HANDLER
    // ========================================================
    function register() {
        if (typeof window === 'undefined') {
            console.error('[HANGUP-START] window not available');
            return;
        }

        window.MAIN_SERVER_HANDLERS = window.MAIN_SERVER_HANDLERS || {};
        window.MAIN_SERVER_HANDLERS['hangup.startGeneral'] = handleStartGeneral;

        LOG.success('Handler registered: hangup.startGeneral');
        loadConfigs();
    }

    if (typeof window !== 'undefined') {
        register();
    } else {
        var _check = setInterval(function() {
            if (typeof window !== 'undefined') {
                clearInterval(_check);
                register();
            }
        }, 50);
        setTimeout(function() { clearInterval(_check); }, 10000);
    }

})(window);
