/**
 * guideBattle.js — Handler: buryPoint/guideBattle
 *
 * ═══════════════════════════════════════════════════════════════
 * DEEP TRACE — main.min.js (100% verified)
 * ═══════════════════════════════════════════════════════════════
 *
 * DEFINITION: L120836-120849 — GuideInfoManager.prototype.guideBuriedPoint
 *
 *   e.prototype.guideBuriedPoint = function (e, t) {
 *       var n = UserInfoSingleton.getInstance().userId;
 *       ts.processHandler({
 *           type: 'buryPoint',
 *           action: 'guideBattle',
 *           userId: n,
 *           point: e,        // 'load' | 'battle' | 'home'
 *           passLesson: t,   // tutorial lesson ID
 *           version: '1.0'
 *       }, function (e) {
 *           Logger.serverDebugLog('新手引导埋点！！！');       // success log only
 *       }, function (e) {
 *           Logger.serverDebugLog('新手引导埋点失败！！！');   // error log only
 *       });
 *   }
 *
 * PURPOSE: Analytics / event tracking for tutorial battle progress.
 *   "埋点" (bury point) = telemetry event in Chinese game dev.
 *   Client sends tutorial progress events to server, then IGNORES the response.
 *   Fire-and-forget — no response data is read by client.
 *
 * POINT CONSTANTS (L120990):
 *   GuideLoad_Point   = 'load'   — Tutorial battle scene finished loading
 *   GuideBattle_Point = 'battle' — Tutorial battle finished (win/lose)
 *   GuideHome_Point   = 'home'   — Returned to home screen after tutorial battle
 *
 * CALL SITES (4 total):
 *   L230925 — GuideBattle.initAll()              → point='load',   auto on scene init
 *   L231034 — GuideBattle.nextRound() battle end  → point='battle', auto on battle finish
 *   L104894 — Tutorial step 2107 OverScene close  → point='home',   chaterID=1
 *   L105834 — Tutorial step 2508 OverScene close  → point='home',   chaterID=2
 *
 * RESPONSE: Client ignores response data entirely.
 *   Success callback: Logger.serverDebugLog('新手引导埋点！！！')
 *   Error callback:   Logger.serverDebugLog('新手引导埋点失败！！！')
 *   IMPORTANT: processHandler 4th param (skipErrorUI) is NOT passed,
 *   so ret !== 0 triggers ErrorHandler.ShowErrorTips popup. Must return ret=0.
 *
 * passLesson VALUES:
 *   ChaterID 1 (step 2107): parseInt(tutorialLesson.split(',')[0]) — first lesson ID
 *   ChaterID 2 (step 2508): parseInt(tutorialLesson.split(',')[1]) — second lesson ID
 *   Auto calls (load/battle): GuideInfoManager.getInstance().lessonID
 *
 * HAR: No captures available — tutorial requests not in HAR files.
 *
 * OTHER buryPoint ACTIONS: None. guideBattle is the ONLY action under buryPoint type.
 *
 * STRICT RULES: NO STUB, OVERRIDE, FORCE, BYPASS, DUMMY, ASUMSI
 */

function handleBuryPointGuideBattle(request, ctx) {
    const { userId, point, passLesson, version } = request;

    ctx.logger.log('INFO', 'BURYPOINT', `Guide battle analytics received`);

    ctx.logger.details('request',
        ['userId', userId ? userId.substring(0, 20) : 'MISSING'],
        ['point', String(point || '(none)')],
        ['passLesson', String(passLesson || '(none)')],
        ['version', String(version || '(none)')]
    );

    // ── Persist analytics to DB (was fire-and-forget, now stored) ──
    if (userId) {
        var userData = ctx.db.getUser(userId);
        if (userData) {
            if (!userData._analytics) userData._analytics = {};
            if (!userData._analytics.guideBattle) userData._analytics.guideBattle = [];
            userData._analytics.guideBattle.push({
                _point: point || 'unknown',
                _passLesson: passLesson || 0,
                _time: Date.now(),
                _version: version || ''
            });
            // Keep max 100 entries per user
            if (userData._analytics.guideBattle.length > 100) {
                userData._analytics.guideBattle = userData._analytics.guideBattle.slice(-100);
            }
            ctx.db.saveUser(userId, userData);
            ctx.logger.log('DEBUG', 'BURYPOINT', 'Analytics saved for user ' + userId.substring(0, 12));
        } else {
            ctx.logger.log('DEBUG', 'BURYPOINT', 'User ' + userId + ' not found — analytics not saved');
        }
    }

    // Fire-and-forget analytics — client ignores response data.
    // Must return ret=0 to prevent ErrorHandler.ShowErrorTips popup.
    return ctx.buildDataResponse(0, {});
}

module.exports = handleBuryPointGuideBattle;
