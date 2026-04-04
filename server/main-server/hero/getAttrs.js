/**
 * ============================================================
 * GETATTRS.JS - Mock Handler for hero.getAttrs
 * ============================================================
 *
 * Purpose: Returns computed attribute arrays for requested heroes.
 * Called when hero detail panel opens, team setup changes, or battle preview.
 * The game client also recalculates these values client-side, so exact
 * server values are informational — format correctness is critical.
 *
 * HAR Reference: main-server(level 1 sampai 10).har
 * HAR Pattern: POST request -> GET response (LZString compressed)
 *
 * Flow (from game code main.min.js):
 *   1. Game calls: ts.processHandler({
 *        type:"hero", action:"getAttrs",
 *        userId:"<uuid>",
 *        heros:["<hero-uuid-1>", ...],
 *        version:"1.0"
 *      }, callback, errorCallback)
 *   2. Response: { type, action, userId, heros, version, _attrs, _baseAttrs }
 *   3. Game iterates _attrs[i]._items and _baseAttrs[i]._items per hero
 *
 * Response Schema:
 *   _attrs[i]._items: { "0":{_id:0,_num:HP}, "1":{_id:1,_num:ATK}, ... "41":{_id:41,_num:100} }
 *   _baseAttrs[i]._items: { "0":{_id:0,_num:baseHP}, ... "15":..., "23":..., "41":... }
 *     (NO ids 16-22 in _baseAttrs — those are computed-only stats)
 *
 * Config files loaded from /resource/json/:
 *   hero.json           — hero template by displayId (heroType, talent, speed, quality, balance*)
 *   heroLevelAttr.json  — base HP/ATK/DEF per level
 *   heroTypeParam.json  — heroType multipliers (hpParam, attackParam, armorParam, biases)
 *   heroLevelUpMul.json — evolve multiplier per quality tier
 *   heroEvolve.json     — per-hero flat stat bonuses per evolve level
 *   heroPower.json      — attribute ID → name/power mapping (for combat power)
 *
 * Author: Local SDK Bridge
 * Version: 1.0.0 - Based on HAR real server data
 * ============================================================
 */

(function(window) {
    'use strict';

    // ========================================================
    // 1. STYLISH LOGGER
    // ========================================================
    var LOG = {
        prefix: '\uD83C\uDFAE [HERO-GETATTRS]',
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
        success: function(msg, data) { this._log('success', '\u2705', msg, data); },
        info: function(msg, data) { this._log('info', '\u2139\uFE0F', msg, data); },
        warn: function(msg, data) { this._log('warn', '\u26A0\uFE0F', msg, data); },
        error: function(msg, data) { this._log('error', '\u274C', msg, data); }
    };

    // ========================================================
    // 2. CONFIG CACHE & CONSTANTS
    // ========================================================
    var CONFIGS = {
        hero: null,
        heroLevelAttr: null,
        heroTypeParam: null,
        heroLevelUpMul: null,
        heroEvolve: null,
        heroPower: null
    };

    // Quality name → heroLevelUpMul index mapping
    var QUALITY_TO_MUL_ID = {
        'white': '1',
        'green': '2',
        'blue': '3',
        'purple': '4',
        'orange': '5',
        'flickerOrange': '6'
    };

    // ========================================================
    // 3. CONFIG LOADING
    // ========================================================
    function loadJsonFile(name, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/resource/json/' + name + '.json', true);
        xhr.onload = function() {
            if (xhr.status === 200 || xhr.status === 0) {
                try {
                    CONFIGS[name] = JSON.parse(xhr.responseText);
                    LOG.info('Loaded config: ' + name);
                } catch (e) {
                    LOG.error('Parse error for config: ' + name, e.message);
                }
            } else {
                LOG.warn('Failed to load config: ' + name + ' (status ' + xhr.status + ')');
            }
            if (callback) callback();
        };
        xhr.onerror = function() {
            LOG.error('Network error loading config: ' + name);
            if (callback) callback();
        };
        xhr.send();
    }

    function loadAllConfigs(onReady) {
        var names = ['hero', 'heroLevelAttr', 'heroTypeParam', 'heroLevelUpMul', 'heroEvolve', 'heroPower'];
        var loaded = 0;
        var total = names.length;

        for (var i = 0; i < names.length; i++) {
            (function(name) {
                loadJsonFile(name, function() {
                    loaded++;
                    if (loaded >= total) {
                        LOG.success('All ' + total + ' configs loaded');
                        if (onReady) onReady();
                    }
                });
            })(names[i]);
        }
    }

    // ========================================================
    // 4. EVOLVE MULTIPLIER (from heroLevelUpMul.json)
    // ========================================================
    // heroLevelUpMul[qualityId] = array of { evolveLevel, hpMul, attackMul, armorMul }
    // Find the entry with the highest evolveLevel <= heroEvolveLevel
    function getEvolveMultiplier(quality, evolveLevel) {
        var qualityId = QUALITY_TO_MUL_ID[quality] || '1';
        var mulEntries = CONFIGS.heroLevelUpMul ? CONFIGS.heroLevelUpMul[qualityId] : null;

        if (!mulEntries || !mulEntries.length) {
            return { hpMul: 1, attackMul: 1, armorMul: 1 };
        }

        var best = mulEntries[0]; // evolveLevel=0 entry is always first
        for (var i = 0; i < mulEntries.length; i++) {
            if (mulEntries[i].evolveLevel <= evolveLevel) {
                best = mulEntries[i];
            }
        }

        return {
            hpMul: parseFloat(best.hpMul) || 1,
            attackMul: parseFloat(best.attackMul) || 1,
            armorMul: parseFloat(best.armorMul) || 1
        };
    }

    // ========================================================
    // 5. EVOLVE FLAT BONUS (from heroEvolve.json)
    // ========================================================
    // heroEvolve[displayId] = array of { level, hp, attack, armor, speed }
    // Find the entry with the highest level <= heroEvolveLevel
    function getEvolveFlatBonus(displayId, evolveLevel) {
        var entries = CONFIGS.heroEvolve ? CONFIGS.heroEvolve[displayId] : null;

        if (!entries || !entries.length) {
            return { hp: 0, attack: 0, armor: 0, speed: 0 };
        }

        var best = entries[0]; // level=0 entry is always first
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].level <= evolveLevel) {
                best = entries[i];
            }
        }

        return {
            hp: parseInt(best.hp) || 0,
            attack: parseInt(best.attack) || 0,
            armor: parseInt(best.armor) || 0,
            speed: parseInt(best.speed) || 0
        };
    }

    // ========================================================
    // 6. COMBAT POWER CALCULATION
    // ========================================================
    // Uses heroPower.json powerParam weights for the hero's type.
    // Sum of (attrValue * powerParam) for each attribute.
    // Falls back to simplified formula if heroPower.json not loaded.
    function computeCombatPower(heroType, stats) {
        if (!CONFIGS.heroPower) {
            // Fallback simplified formula
            return Math.round(
                stats.hp * 1 + stats.atk * 3 + stats.def * 1.5 +
                stats.speed * 1 + stats.talent * 200
            );
        }

        // Build attName → attrValue map from the _attrs structure
        // Attribute ID mapping to heroPower attNames:
        var attrMap = {
            'hpPercent': stats.hp,
            'attackPercent': stats.atk,
            'armorPercent': stats.def,
            'speed': stats.speed,
            'critical': stats.talent * 100 // talent as percentage-like value
        };

        // Find the block of 31 entries for this heroType in heroPower.json
        var power = 0;
        var keys = Object.keys(CONFIGS.heroPower);
        for (var k = 0; k < keys.length; k++) {
            var entry = CONFIGS.heroPower[keys[k]];
            if (entry.heroType === heroType) {
                var val = attrMap[entry.attName];
                if (val !== undefined && val !== null) {
                    power += val * (entry.powerParam || 0);
                }
            }
        }

        return Math.round(power);
    }

    // ========================================================
    // 7. COMPUTE HERO STATS
    // ========================================================
    function computeHeroStats(heroData) {
        var displayId = String(heroData._heroDisplayId);
        var level = (heroData._heroBaseAttr && heroData._heroBaseAttr._level) || 1;
        var evolveLevel = (heroData._heroBaseAttr && heroData._heroBaseAttr._evolveLevel) || 0;

        // --- Look up hero template ---
        var heroConfig = CONFIGS.hero ? CONFIGS.hero[displayId] : null;
        if (!heroConfig) {
            LOG.warn('Hero template not found for displayId: ' + displayId);
            return getDefaultStats(level);
        }

        var heroType = heroConfig.heroType || 'strength';
        var talent = parseFloat(heroConfig.talent) || 0.26;
        var speed = parseInt(heroConfig.speed) || 360;
        var quality = heroConfig.quality || 'white';
        var balanceHp = parseFloat(heroConfig.balanceHp) || 1;
        var balanceAttack = parseFloat(heroConfig.balanceAttack) || 1;
        var balanceArmor = parseFloat(heroConfig.balanceArmor) || 1;
        var balancePower = parseFloat(heroConfig.balancePower) || 1;

        // --- Look up level-based base stats ---
        var levelAttr = CONFIGS.heroLevelAttr ? CONFIGS.heroLevelAttr[String(level)] : null;
        if (!levelAttr) {
            levelAttr = CONFIGS.heroLevelAttr ? CONFIGS.heroLevelAttr['1'] : { hp: 1240, attack: 125, armor: 205 };
            LOG.warn('Level attr not found for level ' + level + ', using level 1');
        }

        var baseHp = parseFloat(levelAttr.hp) || 1240;
        var baseAtk = parseFloat(levelAttr.attack) || 125;
        var baseDef = parseFloat(levelAttr.armor) || 205;

        // --- Look up heroType params ---
        var typeParam = CONFIGS.heroTypeParam ? CONFIGS.heroTypeParam[heroType] : null;
        if (!typeParam) {
            typeParam = { hpParam: 1, attackParam: 1, armorParam: 1, hpBais: 0, attackBais: 0, armorBais: 0 };
            LOG.warn('Type param not found for heroType: ' + heroType);
        }

        // --- Compute raw stats (before evolve) ---
        // Formula: rawStat = baseStat * typeParam * balanceMultiplier * talent + typeBias
        var rawHp = baseHp * (typeParam.hpParam || 1) * balanceHp * talent + (typeParam.hpBais || 0);
        var rawAtk = baseAtk * (typeParam.attackParam || 1) * balanceAttack * talent + (typeParam.attackBais || 0);
        var rawDef = baseDef * (typeParam.armorParam || 1) * balanceArmor * talent + (typeParam.armorBais || 0);

        // --- Apply evolve multiplier ---
        var evolveMul = getEvolveMultiplier(quality, evolveLevel);
        var finalHp = rawHp * evolveMul.hpMul;
        var finalAtk = rawAtk * evolveMul.attackMul;
        var finalDef = rawDef * evolveMul.armorMul;

        // --- Add evolve flat bonus ---
        var evolveFlat = getEvolveFlatBonus(displayId, evolveLevel);
        finalHp += evolveFlat.hp;
        finalAtk += evolveFlat.attack;
        finalDef += evolveFlat.armor;
        speed += evolveFlat.speed;

        // --- Combat power ---
        var statsForPower = {
            hp: finalHp,
            atk: finalAtk,
            def: finalDef,
            speed: speed,
            talent: talent
        };
        var power = computeCombatPower(heroType, statsForPower);

        // --- Crit rate: talent-based (simplified — game client recalculates) ---
        var critRate = parseFloat((talent * 1.5).toFixed(2));

        return {
            hp: parseFloat(finalHp.toFixed(1)),
            atk: parseFloat(finalAtk.toFixed(1)),
            def: parseFloat(finalDef.toFixed(1)),
            speed: speed,
            power: Math.round(power * balancePower),
            crit: critRate,
            // Base level stats (for _baseAttrs)
            baseHp: baseHp,
            baseAtk: baseAtk,
            baseDef: baseDef
        };
    }

    // Default stats when config is missing
    function getDefaultStats(level) {
        var levelAttr = CONFIGS.heroLevelAttr ? CONFIGS.heroLevelAttr[String(level)] : null;
        var hp = levelAttr ? parseFloat(levelAttr.hp) : 1240;
        var atk = levelAttr ? parseFloat(levelAttr.attack) : 125;
        var def = levelAttr ? parseFloat(levelAttr.armor) : 205;

        return {
            hp: hp,
            atk: atk,
            def: def,
            speed: 360,
            power: Math.round(hp + atk * 3 + def * 1.5 + 360),
            crit: 0.39,
            baseHp: hp,
            baseAtk: atk,
            baseDef: def
        };
    }

    // ========================================================
    // 8. BUILD _items OBJECT
    // ========================================================
    // Creates the _items dictionary: { "0": {_id:0, _num:val}, "1": {...}, ... }
    //
    // _attrs: IDs 0-41 (42 attributes, includes computed stats 16-22)
    // _baseAttrs: IDs 0-15, 23-41 (35 attributes, NO computed stats 16-22)
    //
    // Attribute mapping:
    //   0  = HP (computed with type/talent/evolve)
    //   1  = ATK (computed)
    //   2  = DEF (computed)
    //   3  = Speed (FIXED from hero.json)
    //   4-15 = Equipment/gem bonuses (0 for new heroes)
    //   16 = Level-based computed bonus (50 for new heroes)
    //   17-20 = 0
    //   21 = Combat power (computed)
    //   22 = Max HP mirror (same as ID 0)
    //   23-29 = 0
    //   30 = Crit rate (talent-based)
    //   31-40 = 0
    //   41 = 100 (constant)

    function buildAttrsItems(stats) {
        var items = {};

        // 0: HP
        items['0'] = { _id: 0, _num: stats.hp };
        // 1: ATK
        items['1'] = { _id: 1, _num: stats.atk };
        // 2: DEF
        items['2'] = { _id: 2, _num: stats.def };
        // 3: Speed
        items['3'] = { _id: 3, _num: stats.speed };
        // 4-15: Equipment/gem bonuses (all zero)
        for (var i = 4; i <= 15; i++) {
            items[String(i)] = { _id: i, _num: 0 };
        }
        // 16: Level-based computed bonus
        items['16'] = { _id: 16, _num: 50 };
        // 17-20: Zero
        for (var j = 17; j <= 20; j++) {
            items[String(j)] = { _id: j, _num: 0 };
        }
        // 21: Combat power
        items['21'] = { _id: 21, _num: stats.power };
        // 22: Max HP mirror (same as attr 0)
        items['22'] = { _id: 22, _num: stats.hp };
        // 23-29: Zero
        for (var k = 23; k <= 29; k++) {
            items[String(k)] = { _id: k, _num: 0 };
        }
        // 30: Crit rate
        items['30'] = { _id: 30, _num: stats.crit };
        // 31-40: Zero
        for (var m = 31; m <= 40; m++) {
            items[String(m)] = { _id: m, _num: 0 };
        }
        // 41: Constant 100
        items['41'] = { _id: 41, _num: 100 };

        return items;
    }

    function buildBaseAttrsItems(stats) {
        var items = {};

        // 0: Base level HP (raw from heroLevelAttr, before type/talent modification)
        items['0'] = { _id: 0, _num: stats.baseHp };
        // 1: Base level ATK
        items['1'] = { _id: 1, _num: stats.baseAtk };
        // 2: Base level DEF
        items['2'] = { _id: 2, _num: stats.baseDef };
        // 3: Speed (same as _attrs)
        items['3'] = { _id: 3, _num: stats.speed };
        // 4-15: Equipment/gem bonuses (all zero)
        for (var i = 4; i <= 15; i++) {
            items[String(i)] = { _id: i, _num: 0 };
        }
        // NO ids 16-22 in _baseAttrs (computed stats only in _attrs)
        // 23-29: Zero
        for (var j = 23; j <= 29; j++) {
            items[String(j)] = { _id: j, _num: 0 };
        }
        // 30: Crit rate (same as _attrs)
        items['30'] = { _id: 30, _num: stats.crit };
        // 31-40: Zero
        for (var k = 31; k <= 40; k++) {
            items[String(k)] = { _id: k, _num: 0 };
        }
        // 41: Constant 100
        items['41'] = { _id: 41, _num: 100 };

        return items;
    }

    // ========================================================
    // 9. HANDLER
    // ========================================================
    /**
     * Handler for hero.getAttrs
     * Registered via window.MAIN_SERVER_HANDLERS
     *
     * Request:
     *   { type:"hero", action:"getAttrs", userId:"<uuid>",
     *     heros:["<hero-uuid-1>", ...], version:"1.0" }
     *
     * Response (before buildResponse wrapping):
     *   { type:"hero", action:"getAttrs", userId, heros, version,
     *     _attrs: [ { _items: { "0":{_id:0,_num:...}, ... } }, ... ],
     *     _baseAttrs: [ { _items: { "0":{_id:0,_num:...}, ... } }, ... ] }
     *
     * Note: entergame.js wraps this with buildResponse():
     *   { ret:0, data:"<JSON string>", compress:false, serverTime:<ms>, server0Time:14400000 }
     */
    function handleGetAttrs(request, playerData) {
        LOG.info('Handling hero.getAttrs');
        LOG.info('UserId: ' + request.userId);
        LOG.info('Heroes requested: ' + (request.heros ? request.heros.length : 0));

        var heroUuids = request.heros || [];
        var attrsArray = [];
        var baseAttrsArray = [];

        for (var i = 0; i < heroUuids.length; i++) {
            var heroId = heroUuids[i];
            var heroData = null;

            // Look up hero in playerData.heros
            if (playerData && playerData.heros && playerData.heros[heroId]) {
                heroData = playerData.heros[heroId];
            }

            if (!heroData) {
                LOG.warn('Hero not found in playerData: ' + heroId);
                // Return zeroed-out entry for missing heroes
                var zeroItems = {};
                for (var z = 0; z <= 41; z++) {
                    zeroItems[String(z)] = { _id: z, _num: 0 };
                }
                zeroItems['41'] = { _id: 41, _num: 100 };

                var zeroBaseItems = {};
                for (var zb = 0; zb <= 15; zb++) {
                    zeroBaseItems[String(zb)] = { _id: zb, _num: 0 };
                }
                for (var zb2 = 23; zb2 <= 41; zb2++) {
                    zeroBaseItems[String(zb2)] = { _id: zb2, _num: 0 };
                }
                zeroBaseItems['41'] = { _id: 41, _num: 100 };

                attrsArray.push({ _items: zeroItems });
                baseAttrsArray.push({ _items: zeroBaseItems });
                continue;
            }

            // Compute stats for this hero
            var displayId = heroData._heroDisplayId || 0;
            var level = (heroData._heroBaseAttr && heroData._heroBaseAttr._level) || 1;
            var evolveLevel = (heroData._heroBaseAttr && heroData._heroBaseAttr._evolveLevel) || 0;

            var stats = computeHeroStats(heroData);

            LOG.info('  Hero [' + heroId.substring(0, 8) + '...] displayId=' + displayId +
                ' lv=' + level + ' ev=' + evolveLevel +
                ' type=' + (CONFIGS.hero && CONFIGS.hero[String(displayId)] ? CONFIGS.hero[String(displayId)].heroType : '?') +
                ' -> HP=' + stats.hp + ' ATK=' + stats.atk + ' DEF=' + stats.def +
                ' SPD=' + stats.speed + ' PWR=' + stats.power + ' CRIT=' + stats.crit);

            attrsArray.push({ _items: buildAttrsItems(stats) });
            baseAttrsArray.push({ _items: buildBaseAttrsItems(stats) });
        }

        // Build response
        var responseData = {
            type: 'hero',
            action: 'getAttrs',
            userId: request.userId,
            heros: heroUuids,
            version: request.version || '1.0',
            _attrs: attrsArray,
            _baseAttrs: baseAttrsArray
        };

        LOG.success('getAttrs success — ' + heroUuids.length + ' heroes processed');

        return responseData;
    }

    // ========================================================
    // 10. REGISTER HANDLER
    // ========================================================
    function register() {
        if (typeof window === 'undefined') {
            console.error('[HERO-GETATTRS] window not available');
            return;
        }

        window.MAIN_SERVER_HANDLERS = window.MAIN_SERVER_HANDLERS || {};
        window.MAIN_SERVER_HANDLERS['hero.getAttrs'] = handleGetAttrs;

        LOG.success('Handler registered: hero.getAttrs');

        var configStatus = [];
        var configNames = ['hero', 'heroLevelAttr', 'heroTypeParam', 'heroLevelUpMul', 'heroEvolve', 'heroPower'];
        for (var i = 0; i < configNames.length; i++) {
            configStatus.push(configNames[i] + '=' + (CONFIGS[configNames[i]] ? 'OK' : 'MISSING'));
        }
        LOG.info('Config status: ' + configStatus.join(', '));
    }

    // ========================================================
    // 11. INIT: Load configs then register
    // ========================================================
    if (typeof window !== 'undefined' && window.MAIN_SERVER_HANDLERS) {
        // window and handler registry already available — load configs then register
        loadAllConfigs(function() {
            register();
        });
    } else {
        // Retry until window / MAIN_SERVER_HANDLERS are ready
        var _check = setInterval(function() {
            if (typeof window !== 'undefined') {
                if (!window.MAIN_SERVER_HANDLERS) {
                    window.MAIN_SERVER_HANDLERS = {};
                }
                clearInterval(_check);
                loadAllConfigs(function() {
                    register();
                });
            }
        }, 50);
        setTimeout(function() { clearInterval(_check); }, 10000);
    }

})(window);
