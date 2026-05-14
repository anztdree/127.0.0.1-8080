/**
 * summon/summonOneFree.js — Handler: summon/summonOneFree
 *
 * Free summon (gacha) for COMMON and SUPER pool types.
 * Tutorial mode (isGuide=true): returns predetermined hero from constant.json.
 * Normal mode: runs full weighted random gacha algorithm.
 *
 * STRICT RULES: NO STUB, OVERRIDE, FORCE, BYPASS, DUMMY, ASUMSI
 * Every value traced to main.min.js logic or resource/json config.
 *
 * ═══════════════════════════════════════════════════════════════
 * TRACE MAP — Client Call Sites & Response Consumer
 * ═══════════════════════════════════════════════════════════════
 *
 * CALL SITES:
 *   L95502-95514 — highSummonOnceBtnClick()
 *     → sType=SummonType.SUPER(3), isGuide=a.isGuideComplete()
 *   L95578-95598 — commonSummonOnceBtnClick()
 *     → sType=SummonType.COMMON(1), isGuide=o.isGuideComplete()
 *
 * RESPONSE CONSUMER: requestCallBackCheck (L95432-95470)
 *   e._changeInfo._items → L95438 → resetTtemsCallBack() — sync item totals
 *   e._addTotal           → L95438 → array of hero objects (primary)
 *   e._addHeroes          → L95438 → fallback if _addTotal absent
 *   e._energy             → L95438 → SummonSingleton._energy
 *   e._canFreeTime        → L95444 → new free timer for summon type
 *
 * HERO OBJECT CONSUMER: SetHeroDataToModel (L134052)
 *   _heroId, _heroDisplayId, _heroStar, _expeditionMaxLevel,
 *   _fragment, _superSkillResetCount, _potentialResetCount,
 *   _heroBaseAttr (L134096: deserialize), _superSkillLevel,
 *   _potentialLevel, _qigong, _qigongTmp, _qigongStage,
 *   _qigongTmpPower, _totalCost, _breakInfo, _gemstoneSuitId,
 *   _linkTo, _linkFrom
 *
 * TIMER LOGIC (L95444):
 *   if response._canFreeTime exists:
 *     common summon (n=true) → requestCallBack(heroes, energy, response._canFreeTime, keepSuper)
 *     super summon (n=false) → requestCallBack(heroes, energy, keepCommon, response._canFreeTime)
 *
 * TUTORIAL CONFIG (constant.json):
 *   tutorialHighHero: 1309   (Tien — predetermined SUPER summon)
 *   tutorialNormalHero: 1206  (Bulma — predetermined COMMON summon)
 *   tutorialHeroBagSort: "1309,1205,1206"
 *
 * isGuideComplete (L95499-95501):
 *   return getGuideStep(GUIDE_TYPE.MAIN) < 2211
 *   Steps 2206 (SUPER) and 2210 (COMMON) both have guideStep < 2211 → isGuide=true
 *
 * GACHA ALGORITHM:
 *   Step 1: Roll quality tier from summonRandom.json (weighted probability)
 *     SUPER (randomHigh): flickerOrange=0.01, orange=0.08, purple=0.28, blue=0.58
 *     COMMON (randomNormal): orange=0.01, purple=0.10, blue=0.25, green=0.34, white=0.20
 *     Fragment tiers (superOrangePiece, flickerOrangePiece, orangePiece) → SKIPPED (hero-only)
 *   Step 2: Filter summonPool.json by quality + pool weight > 0 + type=hero
 *   Step 3: Weighted random hero selection from eligible entries
 *
 * POOL CONFIG (summon.json):
 *   Pool 1 (summonSuper): costID=123, free=86400s, summonEnergy=10
 *   Pool 3 (summonNormal): costID=122, free=21600s, summonEnergy=0
 *
 * HERO_COLOR ENUM (L73608-73616):
 *   White=1, Green=2, Blue=3, Purple=4, Orange=5, SilverOrange=6, SuperOrange=7
 *
 * _changeInfo FORMAT (L118412-118419 resetTtemsCallBack):
 *   { _items: { "0": {_id: itemId, _num: newTotal}, "1": {...}, ... } }
 *   _num = NEW TOTAL (absolute), NOT delta
 *   Client calls setItem(id, num) — replaces current value
 */

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════

// SummonType → Pool ID mapping
// Traced: summon.json pool IDs match SummonType usage
var SUMMON_TYPE_TO_POOL = {
    1: '3',  // SummonType.COMMON → pool 3 (summonNormal)
    3: '1'   // SummonType.SUPER → pool 1 (summonSuper)
};

// Quality string → HERO_COLOR numeric
// Traced: main.min.js L73608-73616 + L82618 colorToHeroColor
var QUALITY_TO_COLOR = {
    'white': 1,
    'green': 2,
    'blue': 3,
    'purple': 4,
    'orange': 5,
    'flickerOrange': 6,
    'superOrange': 7
};

// Weight column name per pool type for summonRandom.json
// Traced: summonRandom.json field names match pool type
var POOL_WEIGHT_COL = {
    '1': 'randomHigh',    // SUPER pool uses randomHigh column
    '3': 'randomNormal'   // COMMON pool uses randomNormal column
};

// Fragment quality types to SKIP (hero-only mode)
// These quality tiers give hero fragments, not heroes
// Traced: summonRandom.json entries with "Piece" suffix
var FRAGMENT_TYPES = [
    'superOrangePiece',
    'flickerOrangePiece',
    'orangePiece'
];

// ═══════════════════════════════════════════════════════════════
// MAIN HANDLER
// ═══════════════════════════════════════════════════════════════

/**
 * Handle free summon request.
 *
 * @param {object} request - { type:'summon', action:'summonOneFree', userId, sType, isGuide, version }
 * @param {object} ctx - Context with db, config, logger, loadResource, etc.
 * @returns {object} Response envelope via buildDataResponse
 */
async function handleSummonOneFree(request, ctx) {
    var userId = request.userId;
    var sType = request.sType;
    var isGuide = request.isGuide;
    var now = Date.now();

    ctx.logger.log('INFO', 'SUMMON-FREE', 'summonOneFree REQUEST RECEIVED');
    ctx.logger.details('request',
        ['userId', userId || 'MISSING'],
        ['sType', String(sType)],
        ['isGuide', String(isGuide)]
    );

    // ─── Step 1: Validate required fields ───
    if (!userId || sType === undefined) {
        ctx.logger.log('ERROR', 'SUMMON-FREE', 'Missing required fields (userId, sType)');
        return ctx.buildErrorResponse(1);
    }

    // Validate sType — only COMMON(1) and SUPER(3) support free summon
    // Traced: L95507 (SUPER=3) and L95581 (COMMON=1) are the only call sites for summonOneFree
    var poolId = SUMMON_TYPE_TO_POOL[sType];
    if (!poolId) {
        ctx.logger.log('ERROR', 'SUMMON-FREE', 'Invalid sType=' + sType + ' for free summon (only COMMON=1, SUPER=3 supported)');
        return ctx.buildErrorResponse(1);
    }

    // ─── Step 2: Load user data ───
    var userData = ctx.db.getUser(userId);
    if (!userData) {
        ctx.logger.log('ERROR', 'SUMMON-FREE', 'User not found: ' + userId);
        return ctx.buildErrorResponse(1);
    }

    // Deep clone to prevent mutating DB cache directly
    // [FIX-002 pattern from enterGame.js]
    var user;
    try {
        user = JSON.parse(JSON.stringify(userData));
    } catch (err) {
        ctx.logger.log('ERROR', 'SUMMON-FREE', 'Deep clone failed: ' + err.message);
        return ctx.buildErrorResponse(1);
    }

    // ─── Step 3: Load configs ───
    var constant = (ctx.constantJson && ctx.constantJson['1']) ? ctx.constantJson['1'] : {};
    var heroJson = ctx.heroJson || {};
    var poolConfig = ctx.summonJson[poolId];

    if (!poolConfig) {
        ctx.logger.log('ERROR', 'SUMMON-FREE', 'Pool config not found for poolId=' + poolId);
        return ctx.buildErrorResponse(1);
    }

    // Load on-demand resources
    var summonPool = ctx.loadResource('summonPool');
    var summonRandom = ctx.loadResource('summonRandom');

    if (!summonPool || !summonRandom) {
        ctx.logger.log('ERROR', 'SUMMON-FREE', 'Failed to load summonPool.json or summonRandom.json');
        return ctx.buildErrorResponse(1);
    }

    var isCommon = (sType === 1);
    var weightCol = POOL_WEIGHT_COL[poolId];
    var freeTimerSeconds = parseInt(poolConfig.free) || 0;
    var summonEnergyGain = parseInt(poolConfig.summonEnergy) || 0;

    ctx.logger.details('config',
        ['poolId', poolId],
        ['poolType', poolConfig.type],
        ['freeTimer', freeTimerSeconds + 's'],
        ['summonEnergyGain', String(summonEnergyGain)]
    );

    // ─── Step 4: Validate free timer ───
    var summon = user.summon;
    if (!summon) {
        ctx.logger.log('ERROR', 'SUMMON-FREE', 'User summon data is MISSING');
        return ctx.buildErrorResponse(1);
    }

    var freeTimeField = isCommon ? '_canCommonFreeTime' : '_canSuperFreeTime';
    var currentFreeTime = summon[freeTimeField] || 0;

    if (now < currentFreeTime) {
        var waitSeconds = Math.ceil((currentFreeTime - now) / 1000);
        ctx.logger.log('WARN', 'SUMMON-FREE', 'Free summon not ready — wait ' + waitSeconds + 's (timer=' + new Date(currentFreeTime).toISOString() + ', now=' + new Date(now).toISOString() + ')');
        return ctx.buildErrorResponse(1);
    }

    ctx.logger.log('INFO', 'SUMMON-FREE', 'Free timer OK — proceeding with summon');

    // ─── Step 5: Determine hero to give ───
    var selectedDisplayId;
    var selectedQuality;

    if (isGuide) {
        // ═══ TUTORIAL MODE: predetermined hero from constant.json ═══
        // Traced: constant.json → tutorialHighHero=1309, tutorialNormalHero=1206
        // Traced: tutorialBattle.json confirms between battle 1 and 2,
        //   player acquires 1309 (Tien) and 1206 (Bulma)
        if (isCommon) {
            selectedDisplayId = constant.tutorialNormalHero || 1206;  // Bulma (blue)
        } else {
            selectedDisplayId = constant.tutorialHighHero || 1309;    // Tien (purple)
        }

        var heroConfigForQuality = heroJson[String(selectedDisplayId)];
        selectedQuality = heroConfigForQuality ? heroConfigForQuality.quality : (isCommon ? 'blue' : 'purple');

        ctx.logger.log('INFO', 'SUMMON-FREE', '[GUIDE] Predetermined hero: displayId=' + selectedDisplayId + ' quality=' + selectedQuality);
    } else {
        // ═══ NORMAL MODE: weighted random gacha algorithm ═══

        // Step 5a: Roll quality tier (skip fragment tiers)
        var rollResult = rollQualityTier(summonRandom, weightCol);
        selectedQuality = rollResult.quality;
        ctx.logger.log('INFO', 'SUMMON-FREE', '[GACHA] Quality tier rolled: ' + selectedQuality + ' (rawRoll=' + rollResult.rawRoll.toFixed(4) + ' rerolls=' + rollResult.rerolls + ')');

        // Step 5b: Filter eligible heroes from summonPool.json
        // Must match: quality == selectedQuality AND weight > 0 AND type == 'hero'
        var eligible = [];
        var poolEntries = Object.values(summonPool);
        for (var i = 0; i < poolEntries.length; i++) {
            var entry = poolEntries[i];
            if (entry.quality === selectedQuality && entry[weightCol] > 0 && entry.type === 'hero') {
                eligible.push(entry);
            }
        }

        if (eligible.length === 0) {
            ctx.logger.log('ERROR', 'SUMMON-FREE', 'No eligible heroes for quality=' + selectedQuality + ' poolId=' + poolId + ' weightCol=' + weightCol);
            return ctx.buildErrorResponse(1);
        }

        ctx.logger.details('gacha', ['eligibleHeroes', String(eligible.length)]);

        // Step 5c: Weighted random hero selection from eligible entries
        var selectedEntry = weightedRandom(eligible, weightCol);
        selectedDisplayId = selectedEntry.thingsId;

        ctx.logger.log('INFO', 'SUMMON-FREE', '[GACHA] Selected hero: displayId=' + selectedDisplayId + ' quality=' + selectedQuality + ' weight=' + selectedEntry[weightCol]);
    }

    // ─── Step 6: Create hero object ───
    // Traced: L134052 SetHeroDataToModel — reads all these fields
    // Pattern: same as buildStarterHero in enterGame.js
    var heroId = ctx.uuidv4();
    var heroConfig = heroJson[String(selectedDisplayId)] || {};
    var heroObj = createNewHero(heroId, selectedDisplayId, heroConfig);
    var heroColor = QUALITY_TO_COLOR[selectedQuality] || 1;

    // Deep type scan on hero object structure
    var heroSpecs = {
        '_heroId': 'string',
        '_heroDisplayId': 'number',
        '_heroStar': 'number',
        '_heroBaseAttr': 'object',
        '_superSkillLevel': 'number',
        '_potentialLevel': 'object',
        '_superSkillResetCount': 'number',
        '_potentialResetCount': 'number',
        '_qigong': 'object',
        '_qigongTmp': 'object',
        '_qigongTmpPower': 'number',
        '_qigongStage': 'number',
        '_breakInfo': 'object',
        '_totalCost': 'object',
        '_expeditionMaxLevel': 'number',
        '_gemstoneSuitId': 'number',
        '_linkTo': 'array',
        '_fragment': 'number'
    };

    var heroScan = ctx.logger.deepTypeScan(heroObj, heroSpecs, 'heroObj');
    if (heroScan.failed > 0) {
        heroScan.errors.forEach(function(e) {
            ctx.logger.warnCallout('HERO OBJECT TYPE: ' + e.path + ' wrong type', {
                context: 'SUMMON-FREE',
                expected: e.expected,
                actual: e.actual + ' (value: ' + e.value + ')',
                trace: 'createNewHero() must produce correct types',
                impact: 'SetHeroDataToModel (L134052) may crash or ignore fields'
            });
        });
    }

    ctx.logger.details('hero',
        ['heroInstanceId', heroId.substring(0, 12) + '...'],
        ['displayId', String(selectedDisplayId)],
        ['heroName', heroConfig.name || 'UNKNOWN'],
        ['quality', selectedQuality],
        ['heroColor', String(heroColor)],
        ['heroType', heroConfig.heroType || 'UNKNOWN']
    );

    // ─── Step 7: Update user data ───

    // 7a: Add hero to heros collection
    if (!user.heros) user.heros = { _id: userId, _heros: {}, _maxPower: 0, _maxPowerChangeTime: now };
    if (!user.heros._heros) user.heros._heros = {};
    user.heros._heros[heroId] = heroObj;
    var totalHeroes = Object.keys(user.heros._heros).length;

    // ═══ TUTORIAL MODE: DON'T update energy, timer, or summon times ═══
    // Traced: Tutorial summon is a guided one-time experience.
    // Real server does NOT consume free timer or add energy during tutorial.
    // Client: highSummonFree() (L95370) = (canSuperFreeTime - serverTime)/1000 <= 0
    //   If we set timer here, player must wait 6/24hr after tutorial for first real free summon.
    // Client: energy display (L95335) = this._energy + '/' + max
    //   If we add energy here, display shows wrong count after tutorial.
    var oldEnergy = summon._energy || 0;
    var newEnergy = oldEnergy;
    var newFreeTime = summon[freeTimeField] || now;

    if (!isGuide) {
        // Normal mode: update energy and free timer
        newEnergy = oldEnergy + summonEnergyGain;
        summon._energy = newEnergy;

        newFreeTime = now + (freeTimerSeconds * 1000);
        summon[freeTimeField] = newFreeTime;
    }

    // 7d: Increment summon times counter (both tutorial and normal)
    if (!summon._summonTimes) summon._summonTimes = {};
    if (!summon._summonTimes[poolId]) summon._summonTimes[poolId] = 0;
    summon._summonTimes[poolId]++;

    ctx.logger.details('update',
        ['mode', isGuide ? 'TUTORIAL (no energy/timer update)' : 'NORMAL'],
        ['oldEnergy', String(oldEnergy)],
        ['newEnergy', String(newEnergy)],
        ['energyGained', isGuide ? '0 (skipped)' : String(summonEnergyGain)],
        ['freeTimeField', freeTimeField],
        ['newFreeTime', isGuide ? 'UNCHANGED' : new Date(newFreeTime).toISOString()],
        ['summonTimes[' + poolId + ']', String(summon._summonTimes[poolId])],
        ['totalHeroes', String(totalHeroes)]
    );

    // ─── Step 8: Build _changeInfo ───
    // Traced: L118412-118419 resetTtemsCallBack reads e._changeInfo._items
    // Format: { _items: { "0": {_id, _num}, ... } } where _num = NEW TOTAL
    // For FREE summon: no items consumed, no currency spent.
    // Energy goes to summon._energy (separate field), not to _changeInfo.
    // Hero goes to _addTotal, not _changeInfo.
    // So _changeInfo._items is empty for free summons.
    var changeInfo = { _items: {} };

    // ─── Step 9: Build response data ───
    // Traced: L95438 — requestCallBackCheck reads these fields:
    //   resetTtemsCallBack(e) → reads e._changeInfo
    //   s = e._addTotal || e._addHeroes → hero array
    //   l = e._energy → summon energy
    //   e._canFreeTime → free timer (L95444)
    //
    // _canFreeTime routing (L95444):
    //   if _canFreeTime exists:
    //     isFree=true  → canCommonFreeTime = _canFreeTime
    //     isFree=false → canSuperFreeTime = _canFreeTime
    //   if _canFreeTime absent → both timers unchanged
    //
    // TUTORIAL: don't send _canFreeTime → client keeps both timers unchanged
    var responseData = {
        _addTotal: [{
            _heroId: heroId,
            _heroDisplayId: selectedDisplayId,
            _heroQuality: heroColor,
            _heroStar: heroObj._heroStar,
            _heroBaseAttr: heroObj._heroBaseAttr,
            _superSkillLevel: heroObj._superSkillLevel,
            _potentialLevel: heroObj._potentialLevel,
            _superSkillResetCount: heroObj._superSkillResetCount,
            _potentialResetCount: heroObj._potentialResetCount,
            _qigong: heroObj._qigong,
            _qigongTmp: heroObj._qigongTmp,
            _qigongTmpPower: heroObj._qigongTmpPower,
            _qigongStage: heroObj._qigongStage,
            _breakInfo: heroObj._breakInfo,
            _totalCost: heroObj._totalCost,
            _expeditionMaxLevel: heroObj._expeditionMaxLevel,
            _gemstoneSuitId: heroObj._gemstoneSuitId,
            _linkTo: heroObj._linkTo,
            _linkFrom: heroObj._linkFrom,
            _fragment: 0
        }],
        _changeInfo: changeInfo,
        _energy: newEnergy
    };

    // Only send _canFreeTime for NORMAL summons (not tutorial)
    // Traced: L95444 — if _canFreeTime absent → requestCallBack(s, l, canCommonFreeTime, canSuperFreeTime)
    //   → both timers kept unchanged (correct for tutorial)
    if (!isGuide) {
        responseData._canFreeTime = newFreeTime;
    }

    // ─── Step 10: Save user data ───
    // Mutation logging — track all state changes
    ctx.logger.mutationLog({
        field: 'summon._energy',
        before: oldEnergy,
        after: newEnergy,
        unit: 'energy',
        maxDelta: 100,
        context: 'SUMMON-FREE'
    });

    if (!isGuide) {
        ctx.logger.mutationLog({
            field: 'summon.' + freeTimeField,
            before: currentFreeTime,
            after: newFreeTime,
            unit: 'ms',
            context: 'SUMMON-FREE'
        });
    }

    ctx.logger.mutationLog({
        field: 'heros._heros (total count)',
        before: totalHeroes - 1,
        after: totalHeroes,
        unit: 'heroes',
        context: 'SUMMON-FREE'
    });

    ctx.db.saveUser(userId, user);
    ctx.logger.log('INFO', 'SUMMON-FREE', 'User data SAVED');

    // ─── Step 11: Build and return response ───
    ctx.logger.log('INFO', 'SUMMON-FREE', 'summonOneFree SUCCESS');

    // Type assertions — catch silent type errors BEFORE response is sent
    var assertOk = true;
    assertOk = ctx.logger.typeAssert('responseData._addTotal', responseData._addTotal, 'array', {
        context: 'SUMMON-FREE',
        trace: 'L95438 → s = e._addTotal || e._addHeroes',
        consumer: 'requestCallBackCheck — iterates hero array',
        impact: 'If not array → client forEach crashes, no hero received'
    }) && assertOk;

    assertOk = ctx.logger.typeAssert('responseData._addTotal[0]._heroId', responseData._addTotal[0]._heroId, 'string', {
        context: 'SUMMON-FREE',
        trace: 'L134052 SetHeroDataToModel → u._heroId',
        impact: 'If wrong type → hero not registered in client model'
    }) && assertOk;

    assertOk = ctx.logger.typeAssert('responseData._addTotal[0]._heroDisplayId', responseData._addTotal[0]._heroDisplayId, 'number', {
        context: 'SUMMON-FREE',
        trace: 'L134052 SetHeroDataToModel → reads displayId for hero config lookup',
        impact: 'If wrong type → hero card display broken'
    }) && assertOk;

    assertOk = ctx.logger.typeAssert('responseData._addTotal[0]._heroQuality', responseData._addTotal[0]._heroQuality, 'number', {
        context: 'SUMMON-FREE',
        trace: 'L73608-73616 HERO_COLOR — client uses numeric color for UI rendering',
        impact: 'If wrong type → hero quality border/rarity display broken'
    }) && assertOk;

    assertOk = ctx.logger.typeAssert('responseData._energy', responseData._energy, 'number', {
        context: 'SUMMON-FREE',
        trace: 'L95438 → SummonSingleton._energy = e._energy',
        impact: 'If wrong type → energy display shows NaN or wrong count'
    }) && assertOk;

    // Invariant checks — business rule assertions
    ctx.logger.invariantCheck(
        'COMMON free timer = 6 hours (21600s)',
        !isCommon || freeTimerSeconds === 21600,
        {
            context: 'SUMMON-FREE',
            expect: 'freeTimerSeconds = 21600 for COMMON pool',
            actual: 'freeTimerSeconds = ' + freeTimerSeconds + ' for pool ' + poolId,
            trace: 'summon.json pool 3 (summonNormal).free = 21600',
            impact: 'Player waits wrong duration for next free COMMON summon',
            fix: 'Check summon.json pool 3 free value'
        }
    );

    ctx.logger.invariantCheck(
        'SUPER energy gain = 10 per free pull',
        sType !== 3 || summonEnergyGain === 10,
        {
            context: 'SUMMON-FREE',
            expect: 'summonEnergy = 10 for SUPER pool (pool 1)',
            actual: 'summonEnergy = ' + summonEnergyGain + ' for pool ' + poolId,
            trace: 'summon.json pool 1 (summonSuper).summonEnergy = 10',
            impact: 'Player never accumulates energy for 10-pull summon',
            fix: 'Check summon.json pool 1 summonEnergy value'
        }
    );

    ctx.logger.invariantCheck(
        'Tutorial does NOT send _canFreeTime',
        !isGuide || responseData._canFreeTime === undefined,
        {
            context: 'SUMMON-FREE',
            expect: 'responseData._canFreeTime = undefined when isGuide=true',
            actual: 'responseData._canFreeTime = ' + String(responseData._canFreeTime),
            trace: 'L95444 — if _canFreeTime exists → overwrites client timer',
            impact: 'After tutorial, player must wait full timer for first real free summon',
            fix: 'Check line 380-382: _canFreeTime should only be set when !isGuide'
        }
    );

    ctx.logger.invariantCheck(
        'Hero has valid displayId from hero.json',
        !!heroJson[String(selectedDisplayId)],
        {
            context: 'SUMMON-FREE',
            expect: 'heroJson[' + selectedDisplayId + '] exists',
            actual: 'heroJson[' + selectedDisplayId + '] = ' + (heroJson[String(selectedDisplayId)] ? 'found' : 'MISSING'),
            trace: 'hero.json must contain the summoned hero config',
            impact: 'Hero created without name/type/config → broken hero card',
            fix: 'Check selectedDisplayId matches a hero.json entry'
        }
    );

    // Response snapshot — visual structure dump before sending
    ctx.logger.responseSnapshot('SUMMON-FREE ret=0', responseData);

    ctx.logger.summaryCard({
        title: 'SUMMON FREE COMPLETE',
        userId: userId,
        mode: isGuide ? 'TUTORIAL' : (sType === 1 ? 'COMMON' : 'SUPER'),
        poolId: poolId,
        heroDisplayId: String(selectedDisplayId),
        heroName: heroConfig.name || 'UNKNOWN',
        heroQuality: selectedQuality + ' (' + heroColor + ')',
        energyBefore: String(oldEnergy),
        energyAfter: String(newEnergy),
        totalHeroes: String(totalHeroes),
        timerSet: isGuide ? 'NO (tutorial)' : new Date(newFreeTime).toISOString(),
        assertOk: assertOk ? 'ALL PASS' : 'FAILURES DETECTED'
    });

    return ctx.buildDataResponse(0, responseData);
}

// ═══════════════════════════════════════════════════════════════
// HELPER: Weighted Random Quality Tier Selection
// ═══════════════════════════════════════════════════════════════

/**
 * Roll a quality tier from summonRandom.json.
 * Skips fragment types (hero-only mode per user requirement).
 * Re-rolls if a fragment tier is hit, preserving hero quality ratios.
 *
 * @param {object} summonRandom - summonRandom.json data
 * @param {string} weightCol - 'randomHigh' or 'randomNormal'
 * @returns {{ quality: string, rawRoll: number, rerolls: number }}
 */
function rollQualityTier(summonRandom, weightCol) {
    var entries = Object.values(summonRandom);
    var rerolls = 0;
    var maxRerolls = 100;

    while (rerolls < maxRerolls) {
        var roll = Math.random();
        var cumulative = 0;

        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];
            var prob = entry[weightCol];

            if (prob > 0) {
                cumulative += prob;
                if (roll <= cumulative) {
                    // Skip fragment types — re-roll
                    if (FRAGMENT_TYPES.indexOf(entry.type) !== -1) {
                        rerolls++;
                        break; // break inner loop, continue while loop
                    }
                    return {
                        quality: entry.type,
                        rawRoll: roll,
                        rerolls: rerolls
                    };
                }
            }
        }

        // If we get here, roll exceeded cumulative (floating point edge) or hit fragment
        rerolls++;
    }

    // Fallback: return lowest non-fragment quality with weight > 0
    for (var j = entries.length - 1; j >= 0; j--) {
        if (entries[j][weightCol] > 0 && FRAGMENT_TYPES.indexOf(entries[j].type) === -1) {
            return { quality: entries[j].type, rawRoll: 0, rerolls: maxRerolls };
        }
    }

    return { quality: 'white', rawRoll: 0, rerolls: maxRerolls };
}

// ═══════════════════════════════════════════════════════════════
// HELPER: Weighted Random Selection from Array
// ═══════════════════════════════════════════════════════════════

/**
 * Select one item from array using weighted random.
 * Each item has a numeric weight field.
 *
 * @param {Array} items - Array of objects with weight field
 * @param {string} weightField - Field name containing weight value
 * @returns {object} Selected item
 */
function weightedRandom(items, weightField) {
    var totalWeight = 0;
    for (var i = 0; i < items.length; i++) {
        totalWeight += (items[i][weightField] || 0);
    }

    var roll = Math.random() * totalWeight;

    for (var j = 0; j < items.length; j++) {
        roll -= (items[j][weightField] || 0);
        if (roll <= 0) return items[j];
    }

    return items[items.length - 1]; // fallback to last item
}

// ═══════════════════════════════════════════════════════════════
// HELPER: Create New Hero Object
// ═══════════════════════════════════════════════════════════════

/**
 * Create a new hero object for the summoned hero.
 * Same structure as buildStarterHero in enterGame.js (L1488-1525).
 * All fields traced to SetHeroDataToModel consumer (L134052).
 *
 * @param {string} heroId - UUID instance ID for this hero
 * @param {number} displayId - Hero template ID from hero.json
 * @param {object} heroConfig - Hero config entry from hero.json
 * @returns {object} Hero data object ready for client consumption
 */
function createNewHero(heroId, displayId, heroConfig) {
    return {
        _heroId: heroId,
        _heroDisplayId: parseInt(displayId),
        _heroBaseAttr: {
            _level: 1,
            _evolveLevel: 0
        },
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
        _linkFrom: ''
    };
}

module.exports = handleSummonOneFree;
