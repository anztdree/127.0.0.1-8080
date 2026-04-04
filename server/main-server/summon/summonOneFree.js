/**
 * ============================================================
 * SUMMONONEFREE.JS - Mock Handler for summon.summonOneFree
 * ============================================================
 * 
 * Purpose: Free summon (guide/tutorial) — gives pre-determined hero
 * Called during tutorial to give player specific heroes
 * Hero is PRE-DETERMINED by sType, not random
 * 
 * HAR Reference: s398-zd.pksilo.com_2026_04_01_22_14_53.har
 *   - Entry 907: sType:1 response (hero 1206)
 *   - Entry 914: sType:3 response (hero 1309)
 * 
 * HAR FACTS (Kamus):
 *   Request:  {type:"summon",action:"summonOneFree",userId,sType,isGuide,version}
 *   Response: same fields as request + computed:
 *     _addTotal: [hero object], _canFreeTime: timestamp,
 *     _energy: 10, _summonTimes: {cumulative per type}
 * 
 * _summonTimes is CUMULATIVE (HAR proof):
 *   - Entry 914 (sType:3 only): _summonTimes: {"3": 1}
 *   - Entry 907 (after both): _summonTimes: {"1": 1, "3": 1}
 * 
 * main.min.js FACTS (Hakim):
 *   - requestCallBackCheck reads: _addTotal, _energy, _canFreeTime
 *   - _summonTimes NOT read in immediate callback
 *   - But per principle: HAR field exists = MUST send correctly
 * 
 * Guide hero mapping (pre-determined):
 *   sType:1 → heroDisplayId 1206
 *   sType:3 → heroDisplayId 1309
 * 
 * Version: 2.0.0
 * ============================================================
 */

(function(window) {
    'use strict';

    var LOG = {
        prefix: '[SUMMON]',
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
        info: function(msg, data) { this._log('info', 'i', msg, data); },
        warn: function(msg, data) { this._log('warn', '!!', msg, data); },
        error: function(msg, data) { this._log('error', 'ERR', msg, data); }
    };

    /**
     * Generate UUID v4 for new hero ID
     */
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0;
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    /**
     * Build hero object matching HAR structure exactly
     * Verified against raw HAR entries 907 and 914 — all 20 fields match
     */
    function buildHeroObject(heroDisplayId) {
        var heroId = generateUUID();
        return {
            _heroId: heroId,
            _heroDisplayId: heroDisplayId,
            _heroBaseAttr: { _level: 1, _evolveLevel: 0 },
            _heroStar: 0,
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
            _version: '202010131125'
        };
    }

    /**
     * Guide hero mapping (pre-determined from HAR)
     */
    var GUIDE_HERO_MAP = {
        1: 1206,  // sType:1 (Normal Summon) → hero 1206
        3: 1309   // sType:3 (Super Summon) → hero 1309
    };

    /**
     * Handler for summon.summonOneFree
     */
    function handleSummonOneFree(request, playerData) {
        var sType = request.sType;
        var isGuide = request.isGuide;
        LOG.info('summonOneFree sType=' + sType + ' isGuide=' + isGuide);

        // Get pre-determined hero for this sType
        var heroDisplayId = GUIDE_HERO_MAP[sType];
        if (!heroDisplayId) {
            LOG.warn('Unknown sType: ' + sType);
            return;
        }

        // Build new hero object
        var newHero = buildHeroObject(heroDisplayId);

        // Add hero to playerData.heros
        if (!playerData.heros) playerData.heros = {};
        playerData.heros[newHero._heroId] = newHero;

        // HAR: _summonTimes is CUMULATIVE across all calls
        // Track in playerData for persistence
        if (!playerData._summonTimes) playerData._summonTimes = {};
        playerData._summonTimes[String(sType)] = (playerData._summonTimes[String(sType)] || 0) + 1;

        // Save to localStorage
        try {
            localStorage.setItem('dragonball_player_data_' + request.userId, JSON.stringify(playerData));
        } catch (e) {}

        // Build response
        // type/action/userId/sType/isGuide/version are echoed (not computed echo — these are request fields)
        // _addTotal/_canFreeTime/_energy/_summonTimes are computed
        var responseData = {
            type: request.type,
            action: request.action,
            userId: request.userId,
            sType: sType,
            isGuide: isGuide,
            version: request.version,
            _addTotal: [newHero],
            _canFreeTime: Date.now() + 86400000,
            _energy: 10,
            _summonTimes: {}
        };

        // Copy cumulative summon times from playerData
        for (var key in playerData._summonTimes) {
            responseData._summonTimes[key] = playerData._summonTimes[key];
        }

        LOG.success('summonOneFree → hero ' + heroDisplayId + ' sType=' + sType + ' summonTimes=' + JSON.stringify(responseData._summonTimes));

        return responseData;
    }

    // ========================================================
    // REGISTER
    // ========================================================
    function register() {
        if (typeof window === 'undefined') {
            return;
        }

        window.MAIN_SERVER_HANDLERS = window.MAIN_SERVER_HANDLERS || {};
        window.MAIN_SERVER_HANDLERS['summon.summonOneFree'] = handleSummonOneFree;

        LOG.success('registered: summon.summonOneFree');
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
