/**
 * saveGuideTeam.js — Handler: hangup/saveGuideTeam
 *
 * ═══════════════════════════════════════════════════════════════
 * DEEP TRACE — main.min.js (100% verified)
 * ═══════════════════════════════════════════════════════════════
 *
 * CALLER: L104867-104874, L105806-105813 — tutorial guide steps 2107 and 2508
 *   ts.processHandler({
 *       type: 'hangup', action: 'saveGuideTeam',
 *       userId: r,
 *       team: n,      // array of hero objects from getBattleHero()
 *       supers: a,    // array of super skill IDs
 *       version: '1.0'
 *   }, callback)
 *
 * CALLBACK: L104874-104900 — reads NO fields from saveGuideTeam response itself.
 * Instead, callback IMMEDIATELY chains to:
 *   ts.processHandler({
 *       type: 'hangup', action: 'checkBattleResult',
 *       userId, version: '1.0', isGuide: true
 *   }, function(e) {
 *       e._battleResult       → 0 = win (L104882)
 *       e._changeInfo._items  → reward items (L104884)
 *       e._curLess            → current lesson (L104892)
 *       e._maxPassLesson      → max passed lesson (L104893)
 *   })
 *
 * IMPORTANT: saveGuideTeam alone is useless without checkBattleResult.
 * The tutorial will STUCK if checkBattleResult is not handled.
 *
 * For 50%: Save team to user data + implement checkBattleResult as relay.
 *
 * team format (from getBattleHero):
 *   Array of hero objects with: heroId, position, etc.
 *
 * STRICT RULES: NO STUB, OVERRIDE, FORCE, BYPASS, DUMMY, ASUMSI
 */

function handleSaveGuideTeam(request, ctx) {
    const { userId, team, supers } = request;

    ctx.logger.step(1, 2, 'Save guide team', 'running');
    ctx.logger.details('request',
        ['userId', userId ? userId.substring(0, 20) : 'MISSING'],
        ['team', Array.isArray(team) ? `${team.length} hero(es)` : String(team || '(none)')],
        ['supers', Array.isArray(supers) ? supers.join(',') : String(supers || '(none)')]
    );

    if (!userId) {
        ctx.logger.step(1, 2, 'Save guide team', 'fail', 'userId MISSING ❌');
        return ctx.buildErrorResponse(8);
    }

    ctx.logger.step(1, 2, 'Save guide team', 'pass', `team=${Array.isArray(team) ? team.length : 0} heroes`);

    // ─── STEP 2: Save team to user data ───
    ctx.logger.step(2, 2, 'Persist team data', 'running');

    const userData = ctx.db.getUser(userId);
    if (userData) {
        // Save hangup team — this is the team used for tutorial/hangup battle
        if (!userData.hangupTeam) userData.hangupTeam = {};
        userData.hangupTeam.team = team || [];
        userData.hangupTeam.supers = supers || [];
        ctx.db.saveUser(userId, userData);
        ctx.logger.step(2, 2, 'Persist team data', 'pass', 'saved to DB');
    } else {
        ctx.logger.log('WARN', 'HANGUP', `User not found in DB — team NOT saved`);
        ctx.logger.step(2, 2, 'Persist team data', 'warn', 'user not found');
    }

    // Response: no fields read by client callback
    return ctx.buildDataResponse(0, {});
}

module.exports = handleSaveGuideTeam;
