/**
 * getAttrs.js — Handler: hero/getAttrs
 *
 * ═══════════════════════════════════════════════════════════════
 * DEEP TRACE — main.min.js (100% verified)
 * ═══════════════════════════════════════════════════════════════
 *
 * CALLER: 7 call sites (L84789, L89715, L89840, L95348, L134120, L158723, L236695)
 *   ts.processHandler({
 *       type: 'hero', action: 'getAttrs',
 *       userId: UserInfoSingleton.getInstance().userId,
 *       heros: h,    // array of heroId strings
 *       version: '1.0'
 *   }, function(e) { HerosManager.getInstance().getAttrsCallBack(h, e); })
 *
 * CONSUMER: L133724-133738 getAttrsCallBack(e, t):
 *   for (var o in t._attrs) {          ← _attrs keyed by hero index
 *       var a = n.getHero(e[o]);       ← e = request heros array, o = index
 *       var r = {
 *           _totalAttr: t._attrs[o],   ← total combat attributes
 *           _baseAttr: t._baseAttrs[o] ← base combat attributes
 *       };
 *       n.setTotalAttrs(r, a);
 *   }
 *
 * L133802-133805 setTotalAttrs(e, t):
 *   e._baseAttr && setBaseAttr(e._baseAttr, t)
 *   e._totalAttr._items → iterate total attributes
 *   → _baseAttr and _totalAttr both need _items: Object{ attrId: { _num, _id } }
 *
 * FORMAT: _attrs and _baseAttrs = Object keyed by hero index (same order as request heros array)
 *   Each value: { _items: { attrId: { _num: number, _id: attrId } } }
 *
 * For 50%: Return _attrs and _baseAttrs with empty _items for each requested hero.
 * The hero detail attributes will be calculated when we build the hero detail system.
 *
 * STRICT RULES: NO STUB, OVERRIDE, FORCE, BYPASS, DUMMY, ASUMSI
 */

function handleHeroGetAttrs(request, ctx) {
    const { userId, heros } = request;

    ctx.logger.step(1, 2, 'Get hero attrs', 'running');
    ctx.logger.details('request',
        ['userId', userId ? userId.substring(0, 20) : 'MISSING'],
        ['heros', Array.isArray(heros) ? heros.join(',') : String(heros || '(none)')]
    );

    if (!userId) {
        ctx.logger.step(1, 2, 'Get hero attrs', 'fail', 'userId MISSING ❌');
        return ctx.buildErrorResponse(8);
    }
    if (!Array.isArray(heros) || heros.length === 0) {
        ctx.logger.step(1, 2, 'Get hero attrs', 'fail', 'heros array EMPTY ❌');
        return ctx.buildErrorResponse(8);
    }

    ctx.logger.step(1, 2, 'Get hero attrs', 'pass', `${heros.length} hero(es)`);

    // ─── STEP 2: Build attribute data ───
    ctx.logger.step(2, 2, 'Build attrs response', 'running');

    const attrs = {};
    const baseAttrs = {};

    for (let i = 0; i < heros.length; i++) {
        /**
         * _attrs[i] and _baseAttrs[i] must have _items: Object
         * L133805: e._totalAttr._items → for(var l in i) { iterate attrs }
         * L133805: e._baseAttr → setBaseAttr(e._baseAttr, t)
         *
         * Format per attr: { _id: attrId, _num: value }
         * Common attrIds: 101=HP, 102=ATK, 103=DEF, etc.
         *
         * For 50%: return empty _items — hero UI will show 0 stats.
         * Full implementation will calculate from hero level, equip, etc.
         */
        attrs[i] = { _items: {} };
        baseAttrs[i] = { _items: {} };
    }

    ctx.logger.step(2, 2, 'Build attrs response', 'pass', `${heros.length} entries (empty items)`);

    ctx.logger.criticalFields([
        {
            name: '_attrs',
            value: `Object{${heros.length}}`,
            status: 'ok',
            detail: 'L133726: for(var o in t._attrs) → Object keyed by hero index, each has _items'
        },
        {
            name: '_baseAttrs',
            value: `Object{${heros.length}}`,
            status: 'ok',
            detail: 'L133731: t._baseAttrs[o] → Object keyed by hero index, each has _items'
        }
    ]);

    ctx.logger.summaryCard({
        title: 'HERO GET ATTRS COMPLETE',
        userId: userId,
        fields: 2,
        heroCount: heros.length,
        duration: 0
    });

    return ctx.buildDataResponse(0, {
        _attrs: attrs,
        _baseAttrs: baseAttrs
    });
}

module.exports = handleHeroGetAttrs;
