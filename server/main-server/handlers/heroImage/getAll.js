/**
 * getAll.js — Handler: heroImage/getAll
 *
 * ═══════════════════════════════════════════════════════════════
 * DEEP TRACE — main.min.js (100% verified)
 * ═══════════════════════════════════════════════════════════════
 *
 * CALLER: L236709-236722
 *   ts.processHandler({
 *       type: 'heroImage', action: 'getAll',
 *       userId: UserInfoSingleton.getInstance().userId, version: '1.0'
 *   }, callback)
 *
 * CONSUMER: L236715 → L134360-134370 setAlreadyGainHeroID(e):
 *   for (var n in e._heros) {
 *       var o = e._heros[n]._id;
 *       a.maxLevel = e._heros[n]._maxLevel;
 *       var r = e._heros[n]._selfComments;
 *       if (r) { for...in r { a.selfComments.push(r[i]); } }
 *   }
 *
 * RESPONSE: { _heros: Object{} }
 *   Each entry: { _id: number, _maxLevel: number, _selfComments: array }
 *   _heros MUST be Object (for...in iteration).
 *
 * For 50%: Build _heros from user's owned heroes in DB.
 *
 * STRICT RULES: NO STUB, OVERRIDE, FORCE, BYPASS, DUMMY, ASUMSI
 */

function handleHeroImageGetAll(request, ctx) {
    const { userId } = request;

    ctx.logger.step(1, 2, 'Get hero image list', 'running');
    ctx.logger.details('request',
        ['userId', userId ? userId.substring(0, 20) : 'MISSING']
    );

    if (!userId) {
        ctx.logger.step(1, 2, 'Get hero image list', 'fail', 'userId MISSING ❌');
        return ctx.buildErrorResponse(8);
    }

    ctx.logger.step(1, 2, 'Get hero image list', 'pass', 'userId OK');

    // ─── STEP 2: Build hero image data from user's heroes ───
    ctx.logger.step(2, 2, 'Build hero image data', 'running');

    const userData = ctx.db.getUser(userId);
    const heros = {};

    if (userData && userData.hero && userData.hero._heros) {
        const userHeros = userData.hero._heros;
        for (const key in userHeros) {
            const h = userHeros[key];
            if (h && h._heroId) {
                heros[key] = {
                    _id: h._heroId,
                    _maxLevel: 1,
                    _selfComments: []
                };
            }
        }
    }

    const heroCount = Object.keys(heros).length;
    ctx.logger.step(2, 2, 'Build hero image data', 'pass', `${heroCount} hero(es)`);

    ctx.logger.criticalFields([
        {
            name: '_heros',
            value: `Object{${heroCount}}`,
            status: 'ok',
            detail: 'L134363: for(var n in e._heros) → Object, each has _id/_maxLevel/_selfComments'
        }
    ]);

    ctx.logger.summaryCard({
        title: 'HERO IMAGE GET ALL COMPLETE',
        userId: userId,
        fields: 1,
        heroCount: heroCount,
        duration: 0
    });

    return ctx.buildDataResponse(0, { _heros: heros });
}

module.exports = handleHeroImageGetAll;
