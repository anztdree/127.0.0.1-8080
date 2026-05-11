/**
 * getBulletinBrief.js — Handler: user/getBulletinBrief
 *
 * ═══════════════════════════════════════════════════════════════
 * DEEP TRACE — main.min.js (100% verified)
 * ═══════════════════════════════════════════════════════════════
 *
 * CALLER: L1087-1092 — MailInfoManager.getBulletinBrief
 *   ts.processHandler({
 *       type: 'user', action: 'getBulletinBrief',
 *       userId: UserInfoSingleton.getInstance().userId, version: '1.0'
 *   }, callback)
 *
 * CONSUMER: L1094-1099 — callback iterates n._brief:
 *   for (var o in n._brief) {
 *       bulletinTitle = n._brief[o].title;
 *       bulletinVersion = n._brief[o].version;
 *       order = n._brief[o].order;
 *   }
 *
 * RESPONSE: { _brief: Object{} }
 *   Each entry: { title: string, version: number, order: number }
 *   _brief MUST be Object (for...in iteration).
 *
 * STRICT RULES: NO STUB, OVERRIDE, FORCE, BYPASS, DUMMY, ASUMSI
 */

function handleGetBulletinBrief(request, ctx) {
    const { userId } = request;

    ctx.logger.step(1, 1, 'Get bulletin brief', 'running');
    ctx.logger.details('request',
        ['userId', userId ? userId.substring(0, 20) : 'MISSING']
    );

    if (!userId) {
        ctx.logger.step(1, 1, 'Get bulletin brief', 'fail', 'userId MISSING ❌');
        return ctx.buildErrorResponse(8);
    }

    // Load user's bulletin data from DB
    const userData = ctx.db.getUser(userId);
    const storedBrief = (userData && userData.bulletinBrief) ? userData.bulletinBrief : {};

    ctx.logger.step(1, 1, 'Get bulletin brief', 'pass', `${Object.keys(storedBrief).length} entries`);

    ctx.logger.criticalFields([
        {
            name: '_brief',
            value: `Object{${Object.keys(storedBrief).length}}`,
            status: 'ok',
            detail: 'L1094: for(var o in n._brief) → Object, iterates each bulletin'
        }
    ]);

    return ctx.buildDataResponse(0, { _brief: storedBrief });
}

module.exports = handleGetBulletinBrief;
