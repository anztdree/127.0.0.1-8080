/**
 * ============================================================
 * HANGUPGAIN.JS - Mock Handler for hangup.gain
 * ============================================================
 * 
 * Purpose: Collects idle/AFK rewards accumulated over time
 * Called when player clicks "Claim" on the home screen idle reward
 * 
 * HAR Reference: s398-zd.pksilo.com_2026_04_01_22_14_53.har
 *   4 entries found, all uncompressed, same userId
 * 
 * HAR Data (4 captured server responses, chronologically earliest→latest):
 *   Entry[3] (earliest): Gold=12692, Exp=19, Cap=1398, Item104=2
 *     _lastGainTime=1775055047762
 *   Entry[2]: Gold=132578, Exp=983, Cap=15091, Item132=202, Item137=1
 *     _lastGainTime=1775055184977
 *   Entry[1]: Gold=217271, Exp=704, Cap=56898, Item132=17, Item134=31, Item137=2
 *     _lastGainTime=1775055555047
 *   Entry[0] (latest): Gold=461054, Exp=1104, Cap=42655, Item132=72
 *     _lastGainTime=1775055906999
 * 
 * Reward rate analysis (delta between consecutive claims):
 *   Gain 3→2 (137s): Gold+119886 (~874/s), Exp+964 (~7/s), Cap+13693 (~100/s)
 *   Gain 2→1 (370s): Gold+84693 (~229/s), Exp-279 (player spent), Cap+41807 (~113/s)
 *   Gain 1→0 (352s): Gold+243783 (~693/s), Exp+400 (~1.1/s), Cap-14243 (player spent)
 *   Note: deltas include BOTH idle accumulation AND player spending between claims.
 *   Actual idle rates are higher than delta rates. Median idle rate estimate:
 *   Gold ~400-550/s, Exp ~2-5/s, Capsule ~60-100/s
 * 
 * Response fields (from HAR):
 *   type, action, userId, version         — echo request (echo loop)
 *   _lastGainTime                          — timestamp of previous gain (server sets this)
 *   _changeInfo._items                     — reward items (_num = NEW TOTAL, not delta)
 *     102: Gold
 *     103: PlayerExp
 *     131: Exp Capsule
 *     104, 132, 134, 137: random drop materials (optional)
 *   _clickGlobalWarBuffTag                 — empty string ""
 * 
 * Client processing (from main.min_777039fc.js):
 *   gainTap → ts.processHandler({type:"hangup", action:"gain", ...}, function(t) {
 *     var items = BattleCallBack.getBattleAwardItems(t, false);  // reads t._changeInfo._items
 *     var exCount = t._exCount;                                    // undefined = OK
 *     OnHookSingleton.clickGlobalWarBuffTag = t._clickGlobalWarBuffTag;
 *     HomeGainTips opens with: {items, _lastGainTime, exCount}
 *   })
 * 
 * Note: _changeInfo._num = NEW TOTAL (same as checkBattleResult).
 *       Client computes display delta as: _changeInfo._num - current_item._num
 * 
 * Design: Non-echo handler (adds server-generated _lastGainTime, _changeInfo, _clickGlobalWarBuffTag)
 *   Response = echo(request) + _lastGainTime + _changeInfo + _clickGlobalWarBuffTag
 * 
 * Author: Local SDK Bridge
 * Version: 2.0.0 — HAR-verified (4 entries), reward rates calibrated to HAR delta analysis
 * ============================================================
 */

(function(window) {
    'use strict';

    var LOG = {
        prefix: '[HANGUP-GAIN]',
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
    // ITEM ID CONSTANTS
    // ========================================================
    var GOLD_ID = 102;
    var PLAYER_EXP_ID = 103;
    var STAMINA_ID = 104;
    var EXP_CAPSULE_ID = 131;
    var ITEM_132_ID = 132;
    var ITEM_134_ID = 134;
    var ITEM_137_ID = 137;

    // Random drop item pool (from HAR: 104, 132, 134, 137)
    var DROP_ITEM_POOL = [STAMINA_ID, ITEM_132_ID, ITEM_134_ID, ITEM_137_ID];

    // ========================================================
    // REWARD RATES (per second of idle time)
    // Calibrated from HAR delta analysis (median idle rate estimates)
    // Note: HAR deltas include player spending, so actual idle rates are higher.
    // These values produce reasonable gameplay rewards for mid-level players.
    // ========================================================
    var GOLD_PER_SEC = 400;
    var EXP_PER_SEC = 3;
    var CAPSULE_PER_SEC = 60;

    // ========================================================
    // HELPERS
    // ========================================================

    function getItemCount(playerData, itemId) {
        var items = playerData.items || {};
        var item = items[String(itemId)];
        return item ? (item._num || 0) : 0;
    }

    function setItemCount(playerData, itemId, newTotal) {
        var items = playerData.items || {};
        var key = String(itemId);
        if (!items[key]) {
            items[key] = { _id: itemId, _num: 0 };
        }
        items[key]._num = newTotal;
    }

    /**
     * Get the last gain time from playerData.hangup
     * Returns current server time if no previous gain
     */
    function getLastGainTime(playerData) {
        var hangup = playerData.hangup || {};
        return hangup._lastGainTime || 0;
    }

    /**
     * Save last gain time to playerData
     */
    function saveLastGainTime(playerData, timestamp) {
        if (!playerData.hangup) {
            playerData.hangup = {};
        }
        playerData.hangup._lastGainTime = timestamp;
    }

    /**
     * Save playerData to localStorage
     */
    function savePlayerData(userId, playerData) {
        if (window.LOCAL_MAIN_SERVER) {
            try {
                localStorage.setItem('dragonball_player_data_' + userId, JSON.stringify(playerData));
            } catch (e) {
                LOG.warn('Save failed: ' + e.message);
            }
        }
    }

    // ========================================================
    // MAIN HANDLER
    // ========================================================

    function handleHangupGain(request, playerData) {
        LOG.info('Handling hangup.gain');
        LOG.info('UserId: ' + request.userId);

        var now = Date.now();
        var lastGainTime = getLastGainTime(playerData);

        // Calculate idle duration
        var idleSeconds = 0;
        if (lastGainTime > 0) {
            idleSeconds = Math.floor((now - lastGainTime) / 1000);
        }

        // Cap idle time at 4 hours (14400 seconds) to prevent insane rewards
        var MAX_IDLE_SECONDS = 14400;
        if (idleSeconds > MAX_IDLE_SECONDS) {
            idleSeconds = MAX_IDLE_SECONDS;
        }

        // Minimum idle: 10 seconds (otherwise no reward)
        if (idleSeconds < 10) {
            idleSeconds = 10;
        }

        LOG.info('Idle time: ' + idleSeconds + 's (' + (idleSeconds / 60).toFixed(1) + ' min)');

        // --- Calculate rewards ---
        var goldGain = Math.floor(idleSeconds * GOLD_PER_SEC);
        var expGain = Math.floor(idleSeconds * EXP_PER_SEC);
        var capsuleGain = Math.floor(idleSeconds * CAPSULE_PER_SEC);

        // Random drop: small chance per idle minute
        var dropItems = {};
        var idleMinutes = Math.floor(idleSeconds / 60);
        if (idleMinutes > 0) {
            // 1-2 random drops per 5 idle minutes
            var dropChance = Math.floor(idleMinutes / 5);
            if (dropChance < 1) dropChance = 1;
            var numDrops = Math.floor(Math.random() * (dropChance + 1));
            for (var d = 0; d < numDrops; d++) {
                var dropId = DROP_ITEM_POOL[Math.floor(Math.random() * DROP_ITEM_POOL.length)];
                var dropAmount = 1 + Math.floor(Math.random() * 3); // 1-3
                dropItems[dropId] = (dropItems[dropId] || 0) + dropAmount;
            }
        }

        // --- Get current item counts and build new totals ---
        var currentGold = getItemCount(playerData, GOLD_ID);
        var currentExp = getItemCount(playerData, PLAYER_EXP_ID);
        var currentCapsule = getItemCount(playerData, EXP_CAPSULE_ID);

        var newGold = currentGold + goldGain;
        var newExp = currentExp + expGain;
        var newCapsule = currentCapsule + capsuleGain;

        // Build _changeInfo._items (NEW TOTAL values)
        var changeItems = {};
        changeItems[String(GOLD_ID)] = { _id: GOLD_ID, _num: newGold };
        changeItems[String(PLAYER_EXP_ID)] = { _id: PLAYER_EXP_ID, _num: newExp };
        changeItems[String(EXP_CAPSULE_ID)] = { _id: EXP_CAPSULE_ID, _num: newCapsule };

        // Add random drops
        for (var dropKey in dropItems) {
            var itemId = parseInt(dropKey);
            var currentDrop = getItemCount(playerData, itemId);
            changeItems[dropKey] = { _id: itemId, _num: currentDrop + dropItems[dropKey] };
        }

        // --- Update playerData items ---
        setItemCount(playerData, GOLD_ID, newGold);
        setItemCount(playerData, PLAYER_EXP_ID, newExp);
        setItemCount(playerData, EXP_CAPSULE_ID, newCapsule);
        for (var dk in dropItems) {
            var di = parseInt(dk);
            var cd = getItemCount(playerData, di);
            setItemCount(playerData, di, cd + dropItems[dk]);
        }

        // --- Save last gain time (previous time, NOT now — client uses this for countdown) ---
        // From HAR: _lastGainTime = the timestamp BEFORE this gain
        var previousGainTime = lastGainTime > 0 ? lastGainTime : (now - idleSeconds * 1000);
        saveLastGainTime(playerData, now);

        // --- Save playerData ---
        savePlayerData(request.userId, playerData);

        // --- Build response: echo loop + server fields (matches HAR format exactly) ---
        var responseData = {};
        for (var key in request) {
            responseData[key] = request[key];
        }
        responseData._lastGainTime = previousGainTime;
        responseData._changeInfo = {
            _items: changeItems
        };
        responseData._clickGlobalWarBuffTag = '';

        LOG.success('gain → Gold+' + goldGain + ' Exp+' + expGain + ' Cap+' + capsuleGain);
        if (Object.keys(dropItems).length > 0) {
            LOG.info('Drops: ' + JSON.stringify(dropItems));
        }

        return responseData;
    }

    // ========================================================
    // REGISTER HANDLER
    // ========================================================
    function register() {
        if (typeof window === 'undefined') {
            console.error('[HANGUP-GAIN] window not available');
            return;
        }

        window.MAIN_SERVER_HANDLERS = window.MAIN_SERVER_HANDLERS || {};
        window.MAIN_SERVER_HANDLERS['hangup.gain'] = handleHangupGain;

        LOG.success('Handler registered: hangup.gain');
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
