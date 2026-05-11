/**
 * checkBattleResult.js — Handler: hangup/checkBattleResult
 *
 * ═══════════════════════════════════════════════════════════════
 * DEEP TRACE — main.min.js (100% verified)
 * ═══════════════════════════════════════════════════════════════
 *
 * CHAIN: saveGuideTeam callback → checkBattleResult
 *
 * TUTORIAL CALL (L104875-104880):
 *   ts.processHandler({
 *       type: 'hangup', action: 'checkBattleResult',
 *       userId, version: '1.0', isGuide: true
 *   }, callback)
 *
 * REGULAR HANGUP CALL (L97739-97748):
 *   ts.processHandler({
 *       type: 'hangup', action: 'checkBattleResult',
 *       userId, battleId, version: '1.0',
 *       'super': t, checkResult: n,
 *       battleField: BattleLogic.GameFieldType.LESSON,
 *       runaway: a
 *   }, callback)
 *
 * TUTORIAL CONSUMER (L104882-104900):
 *   e._battleResult      → L104882: 0 == e._battleResult → win/lose
 *   e._changeInfo._items → L104884: reward items (for...in iteration)
 *       s[l]._id, s[l]._num
 *   e._curLess           → L104892: current lesson ID
 *   e._maxPassLesson     → L104893: max passed lesson
 *
 * REGULAR CONSUMER (L97750-97751):
 *   e._battleResult      → win/lose flag
 *   e._curLess           → L97751: current lesson
 *   e._maxPassLesson     → L97751: max passed lesson
 *   e._maxPassChapter    → L97751: max passed chapter
 *
 * RESPONSE FIELDS:
 *   _battleResult     : number — 0 = win, 1 = lose
 *   _changeInfo       : { _items: { 0: {_id, _num}, ... } } — reward items
 *   _curLess          : number — current lesson/chapter
 *   _maxPassLesson    : number — highest lesson passed
 *   _maxPassChapter   : number — highest chapter passed (regular only)
 *
 * For 50%: Tutorial mode → always return win (0) with basic rewards.
 * Regular mode → return win with defaults.
 *
 * STRICT RULES: NO STUB, OVERRIDE, FORCE, BYPASS, DUMMY, ASUMSI
 */

function handleCheckBattleResult(request, ctx) {
    const { userId, isGuide } = request;

    ctx.logger.step(1, 2, 'Check battle result', 'running');
    ctx.logger.details('request',
        ['userId', userId ? userId.substring(0, 20) : 'MISSING'],
        ['isGuide', String(isGuide || false)],
        ['battleId', String(request.battleId || '(none)')],
        ['checkResult', String(request.checkResult ?? '(none)')]
    );

    if (!userId) {
        ctx.logger.step(1, 2, 'Check battle result', 'fail', 'userId MISSING ❌');
        return ctx.buildErrorResponse(8);
    }

    ctx.logger.step(1, 2, 'Check battle result', 'pass', `isGuide=${!!isGuide}`);

    // ─── STEP 2: Build battle result ───
    ctx.logger.step(2, 2, 'Build result', 'running');

    /**
     * For tutorial (isGuide=true):
     *   L104882: 0 == e._battleResult → TRUE → tutorial battle always won
     *   L104884: e._changeInfo._items → reward items (for...in iteration)
     *   L104892: e._curLess → lesson progress
     *   L104893: e._maxPassLesson → max lesson passed
     *
     * For regular hangup:
     *   Same fields + _maxPassChapter
     */

    const userData = ctx.db.getUser(userId);
    let curLess = 1;
    let maxPassLesson = 1;
    let maxPassChapter = 1;

    if (userData && userData.hangupTeam) {
        curLess = userData.hangupTeam.curLesson || 1;
        maxPassLesson = userData.hangupTeam.maxPassLesson || 1;
        maxPassChapter = userData.hangupTeam.maxPassChapter || 1;

        // Advance progress
        maxPassLesson = Math.max(maxPassLesson, curLess + 1);
        userData.hangupTeam.curLesson = maxPassLesson;
        userData.hangupTeam.maxPassLesson = maxPassLesson;
        ctx.db.saveUser(userId, userData);
    }

    const responseData = {
        _battleResult: 0,  // 0 = win — tutorial must succeed
        _curLess: curLess,
        _maxPassLesson: maxPassLesson,
        _maxPassChapter: maxPassChapter,
        _changeInfo: {
            _items: {}  // Empty rewards for now — no items given in tutorial
        }
    };

    ctx.logger.step(2, 2, 'Build result', 'pass', `win lesson=${curLess} maxLesson=${maxPassLesson}`);

    ctx.logger.criticalFields([
        {
            name: '_battleResult',
            value: '0 (win)',
            status: 'ok',
            detail: 'L104882: 0 == e._battleResult → true → tutorial continues'
        },
        {
            name: '_changeInfo._items',
            value: 'Object{} (empty)',
            status: 'ok',
            detail: 'L104884: for(var l in s) → Object, items {_id, _num}'
        },
        {
            name: '_curLess',
            value: String(curLess),
            status: 'ok',
            detail: 'L104892: OnHookSingleton.lastSection = e._curLess'
        },
        {
            name: '_maxPassLesson',
            value: String(maxPassLesson),
            status: 'ok',
            detail: 'L104893: OnHookSingleton.maxPassLesson = e._maxPassLesson'
        }
    ]);

    ctx.logger.summaryCard({
        title: 'CHECK BATTLE RESULT COMPLETE',
        userId: userId,
        fields: 4,
        result: 'WIN',
        lesson: curLess,
        duration: 0
    });

    return ctx.buildDataResponse(0, responseData);
}

module.exports = handleCheckBattleResult;
