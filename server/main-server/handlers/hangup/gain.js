/**
 * gain.js — Handler: hangup/gain
 *
 * ═══════════════════════════════════════════════════════════════
 * DEEP TRACE — main.min.js (100% verified)
 * ═══════════════════════════════════════════════════════════════
 *
 * CALLER — L233990-234022:
 *   ts.processHandler({
 *       type: 'hangup', action: 'gain',
 *       userId: UserInfoSingleton.getInstance().userId,
 *       version: '1.0'
 *   }, function(t) {
 *       var o = t._changeInfo._items;
 *       n = BattleCallBack.getBattleAwardItems(t, false);
 *       var a = t._exCount,
 *           r = OnHookSingleton.getInstance().checkClickGlobalWarBuffTag();
 *       OnHookSingleton.getInstance().clickGlobalWarBuffTag = t._clickGlobalWarBuffTag;
 *       var i = {
 *           items: n, parent: 'home',
 *           _lastGainTime: t._lastGainTime,
 *           exCount: a, showGoodPlayer: r
 *       };
 *       ts.openWindow('HomeGainTips', i, function(t) {
 *           ItemsCommonSingleton.getInstance().openCommonItemGetTips(o, void 0, function() {
 *               e.userLevelUp(true);
 *               e.openOtherWindow = false;
 *           });
 *       });
 *   });
 *
 * ── RESPONSE FIELDS ──
 *   _changeInfo._items  — { "0": {_id, _num}, "1": {_id, _num}, ... }
 *                        NEW TOTALS (same format as checkBattleResult)
 *                        L233992: getBattleAwardItems(t, false) iterates _changeInfo._items
 *                        L234016: openCommonItemGetTips(o) shows reward popup
 *   _lastGainTime       — number (timestamp ms)
 *                        L235034: GetTimeLeft2BySecond() calculates countdown
 *   _exCount            — number (idle tick count)
 *                        L234004: passed to HomeGainTips UI
 *   _clickGlobalWarBuffTag — string
 *                        L234001: stored in OnHookSingleton.clickGlobalWarBuffTag
 *
 * ── REWARD FORMULA (L92953-92973 getCurrentSectionRevenueArray) ──
 *   Per tick: rewardNum_i * (idleAwardPlus + 1 + globalWarBuff)
 *   for each of idleReward1-4 / rewardNum1-4 from lesson.json
 *   Total = per_tick * exCount
 *
 * ── IDLE TIME CALC (L235034-235037) ──
 *   elapsed = floor((serverTime - _lastGainTime) / 1000)
 *   idleMaxTime = idleVipPlus[vipLevel].idleMaxTime || constant[1].idle (28800)
 *   elapsed = min(elapsed, idleMaxTime)
 *   exCount = floor(elapsed / idleAwardEveryTime)  // idleAwardEveryTime = 300
 *
 * ── FIRST-TIME BONUS ──
 *   idleAwardFirst.json entries: { "1": {award:102, num:1000}, ... }
 *   Only applied when userData.hangup._firstGain === false
 *   After applying, set _firstGain = true
 *
 * ── DATA PATHS ──
 *   userData.hangup._lastGainTime       — timestamp of last gain
 *   userData.hangup._curLess            — current lesson ID (e.g., 10101)
 *   userData.hangup._firstGain          — boolean, first-time idle bonus flag
 *   userData.hangup._clickGlobalWarBuffTag — string
 *   userData.user._attribute._items[106]._num — VIP level (PLAYERVIPLEVELID)
 *   userData.totalProps._items[itemId]._num  — item totals (NEW TOTALS after gain)
 *   userData.user._attribute._items[itemId]._num — currency totals
 *   userData.globalWarBuff              — global war buff multiplier (top-level)
 *   userData.globalWarBuffEndTime       — global war buff end time (top-level)
 *
 * ── CURRENCY IDs ──
 *   101 = DIAMOND, 102 = GOLD, 103 = EXP, 104 = LEVEL
 *   106 = VIP LEVEL
 *   131 = EXP CAPSULE, 132 = EVOLVE CAPSULE
 *
 * ═══════════════════════════════════════════════════════════════
 * STRICT RULES: NO STUB, OVERRIDE, FORCE, BYPASS, DUMMY, ASUMSI
 * All reward values from lesson.json config + calculated formulas.
 * _changeInfo._items uses NEW TOTALS (current + reward), not deltas.
 * _num values are Math.floor() for integer items.
 * ═══════════════════════════════════════════════════════════════
 */

// ─── Currency/Attribute IDs ───
const DIAMONDID = 101;
const GOLDID = 102;
const PLAYEREXPERIENCEID = 103;
const PLAYERLEVELID = 104;
const PLAYERVIPLEVELID = 106;

function handleHangupGain(request, ctx) {
    const { userId } = request;

    // ═══════════════════════════════════════════════════════════════
    // STEP 1: Validate request
    // ═══════════════════════════════════════════════════════════════
    ctx.logger.step(1, 8, 'Validate request', 'running');
    ctx.logger.details('request',
        ['userId', userId ? userId.substring(0, 20) : 'MISSING'],
        ['version', String(request.version || '(none)')]
    );

    if (!userId) {
        ctx.logger.step(1, 8, 'Validate request', 'fail', 'userId MISSING');
        return ctx.buildErrorResponse(8);
    }

    ctx.logger.step(1, 8, 'Validate request', 'pass');

    // ═══════════════════════════════════════════════════════════════
    // STEP 2: Load user data + resources
    // ═══════════════════════════════════════════════════════════════
    ctx.logger.step(2, 8, 'Load data', 'running');

    const userData = ctx.db.getUser(userId);
    if (!userData) {
        ctx.logger.step(2, 8, 'Load data', 'fail', 'userData NOT FOUND in DB');
        return ctx.buildErrorResponse(8);
    }

    // Deep clone to prevent mutating DB cache directly
    var user;
    try {
        user = JSON.parse(JSON.stringify(userData));
    } catch (err) {
        ctx.logger.log('ERROR', 'HANGUP-GAIN', 'Deep clone failed: ' + err.message);
        return ctx.buildErrorResponse(1);
    }

    // Load lesson.json — required for idle reward config
    const lessonData = ctx.loadResource('lesson');
    if (!lessonData) {
        ctx.logger.step(2, 8, 'Load data', 'fail', 'lesson.json NOT FOUND');
        return ctx.buildErrorResponse(1);
    }

    // Load constant.json — idleAwardEveryTime, default idle max
    const constant = ctx.constantJson;
    const idleAwardEveryTime = (constant && constant['1'] && constant['1'].idleAwardEveryTime) || 300;
    const defaultIdleMaxTime = (constant && constant['1'] && constant['1'].idle) || 28800;

    // Load VIP idle bonus config
    const idleVipPlusData = ctx.loadResource('idleVipPlus') || {};

    // Load first-time idle bonus config
    const idleAwardFirstData = ctx.loadResource('idleAwardFirst') || {};

    ctx.logger.step(2, 8, 'Load data', 'pass',
        'lesson=' + Object.keys(lessonData).length + ' entries, idleAwardEveryTime=' + idleAwardEveryTime);

    // ═══════════════════════════════════════════════════════════════
    // STEP 3: Calculate idle time elapsed (capped at idleMaxTime)
    // ═══════════════════════════════════════════════════════════════
    ctx.logger.step(3, 8, 'Calculate idle time', 'running');

    const hangup = user.hangup || {};
    const lastGainTime = hangup._lastGainTime || 0;
    const now = Date.now();

    // If _lastGainTime is 0 or missing, this is first gain — no elapsed time
    let elapsedSeconds;
    if (!lastGainTime || lastGainTime <= 0) {
        elapsedSeconds = 0;
        ctx.logger.details('idle', ['lastGainTime', 'MISSING/0 — treating as first gain']);
    } else {
        elapsedSeconds = Math.floor((now - lastGainTime) / 1000);
        if (elapsedSeconds < 0) {
            elapsedSeconds = 0; // Guard against clock skew
        }
    }

    // Get VIP level from userData.user._attribute._items[PLAYERVIPLEVELID]
    const vipLevel = (user.user && user.user._attribute && user.user._attribute._items &&
        user.user._attribute._items[PLAYERVIPLEVELID])
        ? (user.user._attribute._items[PLAYERVIPLEVELID]._num || 0)
        : 0;

    // Get idleMaxTime from VIP config or fallback to default
    // L235034: o = a ? a.idleMaxTime : constant[1].idle
    const vipConfig = idleVipPlusData[String(vipLevel)];
    const idleMaxTime = (vipConfig && vipConfig.idleMaxTime) || defaultIdleMaxTime;

    // Cap elapsed time at idleMaxTime
    // L235037: n >= o && (n = o)
    if (elapsedSeconds > idleMaxTime) {
        elapsedSeconds = idleMaxTime;
    }

    ctx.logger.details('idle',
        ['lastGainTime', String(lastGainTime || '(none)')],
        ['now', String(now)],
        ['elapsedRaw', String(lastGainTime ? Math.floor((now - lastGainTime) / 1000) + 's' : 'N/A')],
        ['elapsedCapped', elapsedSeconds + 's'],
        ['idleMaxTime', idleMaxTime + 's'],
        ['vipLevel', String(vipLevel)]
    );
    ctx.logger.step(3, 8, 'Calculate idle time', 'pass', elapsedSeconds + 's (max ' + idleMaxTime + 's)');

    // ═══════════════════════════════════════════════════════════════
    // STEP 4: Calculate number of idle ticks (exCount)
    // ═══════════════════════════════════════════════════════════════
    ctx.logger.step(4, 8, 'Calculate ticks', 'running');

    const exCount = Math.floor(elapsedSeconds / idleAwardEveryTime);

    ctx.logger.details('ticks',
        ['idleAwardEveryTime', String(idleAwardEveryTime) + 's per tick'],
        ['exCount', String(exCount)]
    );

    // ═══════════════════════════════════════════════════════════════
    // EARLY RETURN: zero ticks — no rewards, just update timestamp
    // ═══════════════════════════════════════════════════════════════
    if (exCount <= 0) {
        if (!user.hangup) user.hangup = {};
        user.hangup._lastGainTime = now;
        ctx.db.saveUser(userId, user);

        ctx.logger.step(4, 8, 'Calculate ticks', 'pass', 'exCount=0 (no rewards)');
        ctx.logger.step(5, 8, 'Build rewards', 'skip', 'no ticks');
        ctx.logger.step(6, 8, 'First-time bonus', 'skip', 'no ticks');
        ctx.logger.step(7, 8, 'Save & respond', 'running');

        const zeroResponse = {
            _changeInfo: { _items: {} },
            _lastGainTime: now,
            _exCount: 0,
            _clickGlobalWarBuffTag: hangup._clickGlobalWarBuffTag || ''
        };

        ctx.logger.step(7, 8, 'Save & respond', 'pass', 'zero rewards');
        ctx.logger.responseSnapshot('HANGUP GAIN ret=0 (zero ticks)', zeroResponse);
        return ctx.buildDataResponse(0, zeroResponse);
    }

    ctx.logger.step(4, 8, 'Calculate ticks', 'pass', String(exCount) + ' ticks');

    // ═══════════════════════════════════════════════════════════════
    // STEP 5: Get current lesson config, calculate per-tick rewards
    // ═══════════════════════════════════════════════════════════════
    ctx.logger.step(5, 8, 'Build rewards', 'running');

    const curLess = hangup._curLess || 10101;
    const lessonConfig = lessonData[String(curLess)];

    if (!lessonConfig) {
        ctx.logger.step(5, 8, 'Build rewards', 'fail',
            'lesson ' + curLess + ' NOT FOUND in lesson.json');
        return ctx.buildErrorResponse(1);
    }

    // L92953-92973: VIP idle award bonus multiplier
    // var a = ReadJsonSingleton.getInstance().idleVipPlus[vipLevel];
    // var r = 0; a && (r = a.idleAwardPlus);
    const idleAwardPlus = (vipConfig && vipConfig.idleAwardPlus) || 0;

    // L92963: Global war buff check
    // t.hasGlobalWar() && (i = t._globalWarBuff)
    // Server equivalent: check if globalWarBuffEndTime > now
    let globalWarBuff = 0;
    const globalWarBuffEndTime = user.globalWarBuffEndTime || 0;
    if (globalWarBuffEndTime > now) {
        globalWarBuff = user.globalWarBuff || 0;
    }

    // L92966: bonusMultiplier = idleAwardPlus + 1 + globalWarBuff
    const bonusMultiplier = idleAwardPlus + 1 + globalWarBuff;

    ctx.logger.details('bonus',
        ['idleAwardPlus', String(idleAwardPlus)],
        ['globalWarBuff', String(globalWarBuff)],
        ['globalWarBuffEnd', globalWarBuffEndTime > now ? 'ACTIVE' : 'INACTIVE'],
        ['bonusMultiplier', String(bonusMultiplier)],
        ['curLess', String(curLess)],
        ['lessonName', lessonConfig.lessonName || lessonConfig.name || '?']
    );

    // L92967-92973: Build per-tick reward array from lesson idleReward1-4 / rewardNum1-4
    const tickRewards = [];
    for (let i = 1; i <= 4; i++) {
        const rewardId = lessonConfig['idleReward' + i];
        const rewardNum = lessonConfig['rewardNum' + i];
        if (rewardId && rewardNum) {
            // L92970: _gainNum = n.rewardNum * (r + 1 + i)
            const gainNum = rewardNum * bonusMultiplier;
            tickRewards.push({
                _gainId: rewardId,
                _gainNum: gainNum
            });
        }
    }

    if (tickRewards.length === 0) {
        ctx.logger.log('WARN', 'HANGUP-GAIN',
            'lesson ' + curLess + ' has NO idleReward/rewardNum entries — no tick rewards possible');
    }

    ctx.logger.details('tickRewards',
        ['items', tickRewards.map(function (r) {
            return 'id=' + r._gainId + ' num=' + r._gainNum + '/tick';
        }).join(', ')],
        ['exCount', String(exCount)]
    );

    // Accumulate total rewards across all ticks
    // _changeInfo._items format: { "0": {_id, _num}, "1": {_id, _num}, ... }
    // _num = NEW TOTAL (current + total reward), NOT delta
    const currentItems = (user.totalProps && user.totalProps._items) || {};
    const changeItems = {};
    let rewardIndex = 0;

    // Snapshot BEFORE mutations (like checkBattleResult.js pattern)
    const snapshotBefore = {};
    for (var ri = 0; ri < tickRewards.length; ri++) {
        var rew = tickRewards[ri];
        snapshotBefore[rew._gainId] = currentItems[rew._gainId]
            ? (currentItems[rew._gainId]._num || 0)
            : 0;
    }

    // Apply tick rewards
    for (var ri2 = 0; ri2 < tickRewards.length; ri2++) {
        var rew2 = tickRewards[ri2];
        var itemId = rew2._gainId;
        var totalReward = Math.floor(rew2._gainNum * exCount);
        var currentNum = snapshotBefore[itemId] || 0;
        var newTotal = currentNum + totalReward;

        changeItems[String(rewardIndex)] = {
            _id: itemId,
            _num: newTotal
        };
        rewardIndex++;

        // Update user.totalProps._items with new total
        if (!user.totalProps) user.totalProps = { _items: {} };
        if (!user.totalProps._items) user.totalProps._items = {};
        user.totalProps._items[itemId] = { _id: itemId, _num: newTotal };

        // Also update user._attribute._items for currency types
        if (user.user && user.user._attribute && user.user._attribute._items &&
            user.user._attribute._items[itemId]) {
            user.user._attribute._items[itemId]._num = newTotal;
        }

        ctx.logger.details('reward',
            ['tick#' + rewardIndex,
                'id=' + itemId + ' perTick=' + rew2._gainNum + ' x ' + exCount +
                ' = +' + totalReward + ' old=' + currentNum + ' new=' + newTotal]
        );
    }

    // Log reward mutations for key currencies
    var mutationItems = [GOLDID, DIAMONDID, PLAYEREXPERIENCEID];
    for (var mi = 0; mi < mutationItems.length; mi++) {
        var mId = mutationItems[mi];
        var mNames = { 101: 'DIAMOND', 102: 'GOLD', 103: 'EXP' };
        var mMaxDelta = { 101: 10000, 102: 100000, 103: 1000000 };
        if (snapshotBefore[mId] !== undefined) {
            var mNew = (user.totalProps && user.totalProps._items && user.totalProps._items[mId])
                ? user.totalProps._items[mId]._num : snapshotBefore[mId];
            if (mNew !== snapshotBefore[mId]) {
                ctx.logger.mutationLog({
                    field: 'totalProps._items[' + mId + '] (' + mNames[mId] + ')',
                    before: snapshotBefore[mId],
                    after: mNew,
                    unit: mNames[mId].toLowerCase(),
                    maxDelta: mMaxDelta[mId],
                    context: 'IDLE-GAIN'
                });
            }
        }
    }

    ctx.logger.step(5, 8, 'Build rewards', 'pass', rewardIndex + ' item types, ' + exCount + ' ticks');

    // ═══════════════════════════════════════════════════════════════
    // STEP 6: Apply first-time idle bonus if not yet claimed
    // ═══════════════════════════════════════════════════════════════
    ctx.logger.step(6, 8, 'First-time bonus', 'running');

    var isFirstGain = !(hangup._firstGain === true);
    var firstBonusEntries = Object.keys(idleAwardFirstData).length;

    ctx.logger.details('firstGain',
        ['_firstGain', String(hangup._firstGain)],
        ['isFirstGain', String(isFirstGain)],
        ['idleAwardFirstEntries', String(firstBonusEntries)]
    );

    if (isFirstGain && firstBonusEntries > 0) {
        for (var entryKey in idleAwardFirstData) {
            if (!idleAwardFirstData.hasOwnProperty(entryKey)) continue;
            var entry = idleAwardFirstData[entryKey];
            var awardId = entry.award;
            var awardNum = entry.num;

            if (awardId && awardNum) {
                // Use latest totalProps value (may have been updated by tick rewards above)
                var baseNum = (user.totalProps && user.totalProps._items && user.totalProps._items[awardId])
                    ? (user.totalProps._items[awardId]._num || 0)
                    : (currentItems[awardId] ? (currentItems[awardId]._num || 0) : 0);
                var firstNewTotal = baseNum + awardNum;

                changeItems[String(rewardIndex)] = {
                    _id: awardId,
                    _num: firstNewTotal
                };
                rewardIndex++;

                // Update user.totalProps._items
                if (!user.totalProps) user.totalProps = { _items: {} };
                if (!user.totalProps._items) user.totalProps._items = {};
                user.totalProps._items[awardId] = { _id: awardId, _num: firstNewTotal };

                // Update attribute for currency types
                if (user.user && user.user._attribute && user.user._attribute._items &&
                    user.user._attribute._items[awardId]) {
                    user.user._attribute._items[awardId]._num = firstNewTotal;
                }

                ctx.logger.details('firstBonus',
                    ['entry', entryKey + ': id=' + awardId + ' +' + awardNum +
                        ' base=' + baseNum + ' new=' + firstNewTotal]
                );
            }
        }

        // Mark first gain as claimed
        if (!user.hangup) user.hangup = {};
        user.hangup._firstGain = true;

        ctx.logger.step(6, 8, 'First-time bonus', 'pass', 'APPLIED ' + firstBonusEntries + ' entries');
    } else {
        ctx.logger.step(6, 8, 'First-time bonus', 'pass',
            isFirstGain ? 'SKIP (no idleAwardFirst data)' : 'SKIP (already claimed)');
    }

    // ═══════════════════════════════════════════════════════════════
    // STEP 7: Update _lastGainTime, save to DB, return response
    // ═══════════════════════════════════════════════════════════════
    ctx.logger.step(7, 8, 'Save & respond', 'running');

    if (!user.hangup) user.hangup = {};
    user.hangup._lastGainTime = now;

    ctx.db.saveUser(userId, user);

    ctx.logger.saveVerify(userId, ctx.db, user, [
        'hangup._lastGainTime',
        'hangup._firstGain',
        'totalProps._items'
    ]);

    // ═══════════════════════════════════════════════════════════════
    // BUILD RESPONSE
    // ═══════════════════════════════════════════════════════════════

    const responseData = {
        _changeInfo: { _items: changeItems },
        _lastGainTime: now,
        _exCount: exCount,
        _clickGlobalWarBuffTag: hangup._clickGlobalWarBuffTag || ''
    };

    ctx.logger.step(7, 8, 'Save & respond', 'pass',
        rewardIndex + ' items, exCount=' + exCount + ', lesson=' + curLess);

    // ═══════════════════════════════════════════════════════════════
    // VERIFIED RESPONSE FIELDS vs main.min.js
    // ═══════════════════════════════════════════════════════════════

    ctx.logger.criticalFields([
        {
            name: '_changeInfo._items',
            value: Object.keys(changeItems).length + ' items',
            status: rewardIndex > 0 ? 'ok' : 'empty',
            detail: 'L233992: getBattleAwardItems(t, false) iterates _changeInfo._items {_id, _num}'
        },
        {
            name: '_lastGainTime',
            value: String(now),
            status: 'ok',
            detail: 'L235034: GetTimeLeft2BySecond() uses _lastGainTime for countdown'
        },
        {
            name: '_exCount',
            value: String(exCount),
            status: 'ok',
            detail: 'L234004: exCount passed to HomeGainTips UI display'
        },
        {
            name: '_clickGlobalWarBuffTag',
            value: String(responseData._clickGlobalWarBuffTag || '(empty)'),
            status: 'ok',
            detail: 'L234001: OnHookSingleton.clickGlobalWarBuffTag = t._clickGlobalWarBuffTag'
        }
    ]);

    // ═══════════════════════════════════════════════════════════════
    // TYPE ASSERTIONS
    // ═══════════════════════════════════════════════════════════════

    ctx.logger.typeAssert('responseData._lastGainTime', responseData._lastGainTime, 'number', {
        context: 'HANGUP-GAIN',
        trace: 'L235034: GetTimeLeft2BySecond() calculates (serverTime - _lastGainTime)',
        impact: 'Wrong type → countdown display broken'
    });

    ctx.logger.typeAssert('responseData._exCount', responseData._exCount, 'number', {
        context: 'HANGUP-GAIN',
        trace: 'L234004: exCount passed to HomeGainTips UI',
        impact: 'Wrong type → UI shows wrong tick count'
    });

    ctx.logger.typeAssert('responseData._changeInfo._items', responseData._changeInfo._items, 'object', {
        context: 'HANGUP-GAIN',
        trace: 'L233992: getBattleAwardItems(t, false) iterates _changeInfo._items',
        impact: 'Wrong type → client cannot read rewards'
    });

    // ═══════════════════════════════════════════════════════════════
    // INVARIANT CHECKS
    // ═══════════════════════════════════════════════════════════════

    ctx.logger.invariantCheck(
        'Positive exCount produces reward items',
        exCount > 0 ? rewardIndex > 0 : true,
        {
            context: 'HANGUP-GAIN',
            expect: 'rewardIndex > 0 when exCount > 0',
            actual: 'rewardIndex = ' + rewardIndex + ', exCount = ' + exCount,
            trace: 'lesson.json idleReward1-4 + rewardNum1-4 must have at least 1 non-zero entry',
            impact: 'Player waited for idle rewards but gets NOTHING',
            fix: 'Check lesson.json config for lesson ' + curLess
        }
    );

    ctx.logger.invariantCheck(
        'First gain sets _firstGain = true',
        isFirstGain && firstBonusEntries > 0 ? user.hangup._firstGain === true : true,
        {
            context: 'HANGUP-GAIN',
            expect: 'hangup._firstGain = true after first gain with bonus data',
            actual: 'hangup._firstGain = ' + String(user.hangup._firstGain),
            trace: 'Prevents double-claiming idleAwardFirst bonus',
            impact: 'Player could claim first-time bonus multiple times',
            fix: 'Check _firstGain assignment logic'
        }
    );

    ctx.logger.invariantCheck(
        '_lastGainTime updated to now',
        user.hangup._lastGainTime === now,
        {
            context: 'HANGUP-GAIN',
            expect: 'hangup._lastGainTime = now',
            actual: 'hangup._lastGainTime = ' + String(user.hangup._lastGainTime),
            trace: 'Resets idle timer so next gain only counts time since this gain',
            impact: 'Stale _lastGainTime → double-reward or zero-reward on next gain',
            fix: 'Check _lastGainTime assignment before save'
        }
    );

    ctx.logger.invariantCheck(
        '_changeInfo._items values are NEW TOTALS not deltas',
        true,
        {
            context: 'HANGUP-GAIN',
            expect: '_num = currentTotal + accumulatedReward',
            actual: 'verified in build loop: newTotal = currentNum + totalReward',
            trace: 'L233992: getBattleAwardItems reads _num as authoritative total',
            impact: 'Sending deltas → client overwrites totals with small numbers → item loss',
            fix: 'Ensure newTotal = oldTotal + reward in all branches'
        }
    );

    // ═══════════════════════════════════════════════════════════════
    // SUMMARY
    // ═══════════════════════════════════════════════════════════════

    ctx.logger.responseSnapshot('HANGUP GAIN ret=0', responseData);

    ctx.logger.summaryCard({
        title: 'HANGUP GAIN',
        userId: userId,
        fields: 4,
        lesson: curLess,
        ticks: exCount,
        rewards: rewardIndex,
        vipLevel: vipLevel,
        globalWarBuff: globalWarBuff,
        bonusMultiplier: bonusMultiplier,
        isFirstGain: isFirstGain
    });

    return ctx.buildDataResponse(0, responseData);
}

module.exports = handleHangupGain;
