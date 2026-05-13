/**
 * getBulletinBrief.js — Handlers: user/getBulletinBrief + user/readBulletin
 *
 * ═══════════════════════════════════════════════════════════════
 * DEEP TRACE — main.min.js (100% verified)
 * ═══════════════════════════════════════════════════════════════
 *
 * ── ACTION 1: getBulletinBrief ──
 * CALLER: L121084-121102 — MailInfoManager.getBulletinBrief
 *   ts.processHandler({
 *       type: 'user', action: 'getBulletinBrief',
 *       userId: UserInfoSingleton.getInstance().userId, version: '1.0'
 *   }, callback)
 *
 * CONSUMER: L121094-12199 — callback iterates n._brief:
 *   for (var o in n._brief) {
 *       bulletinTitle = n._brief[o].title;
 *       bulletinVersion = n._brief[o].version;
 *       order = n._brief[o].order;
 *   }
 *   → stored in MailInfoManager.bulletinList[id]
 *
 * RESPONSE: { _brief: Object{ [id]: { title, version, order } } }
 *
 * Also called at L114795 (enterGame success) — fire-and-forget, no callback.
 * Throttled by checkAskNoticeTime (L121151): max once per 5 minutes.
 *
 * ── ACTION 2: readBulletin ──
 * CALLER: L187184-187202 — NoticeBoradListItem.noticeItem_showDetalBtnTap
 *   ts.processHandler({
 *       type: 'user', action: 'readBulletin',
 *       userId: i, id: a (bulletinId), version: '1.0'
 *   }, callback)
 *
 * CONSUMER: L121103-121105 — saveBulletin(id, response):
 *   t._bulletin       → full body text (string)
 *   t._bulletinTitle  → title (string)
 *   t._bulletinVersion → version (string)
 *   Also sets: UserInfoSingleton.bulletinVersions[id] = t._bulletinVersion
 *   → clears "NEW" red dot for that bulletin
 *
 * RESPONSE: { _bulletin: string, _bulletinTitle: string, _bulletinVersion: string }
 *
 * NOTE: There is ALSO guild/readBulletin (L200156) — type:'guild', NO id field.
 *   That is a DIFFERENT handler, handled separately (not here).
 *
 * DATA SOURCE:
 *   Bulletins are GLOBAL (same for all users), stored in ctx.db.getGlobal('bulletinBrief')
 *   Structure: { [id]: { title, version, order, body } }
 *   - title: string (shown in brief list)
 *   - version: string (red-dot comparison)
 *   - order: number (sort order, lower = first)
 *   - body: string (full content, returned by readBulletin)
 *
 * STRICT RULES: NO STUB, OVERRIDE, FORCE, BYPASS, DUMMY, ASUMSI
 */

// ═══════════════════════════════════════════════════════════════
// ACTION 1: getBulletinBrief
// ═══════════════════════════════════════════════════════════════

function handleGetBulletinBrief(request, ctx) {
    const { userId } = request;

    ctx.logger.step(1, 1, 'Get bulletin brief', 'running');
    ctx.logger.details('request',
        ['userId', userId ? userId.substring(0, 20) : 'MISSING']
    );

    if (!userId) {
        ctx.logger.step(1, 1, 'Get bulletin brief', 'fail', 'userId MISSING');
        return ctx.buildErrorResponse(8);
    }

    // Bulletins are GLOBAL — same data for all users
    const globalBrief = ctx.db.getGlobal('bulletinBrief') || {};

    // Build _brief: strip the 'body' field (not needed for brief list)
    const brief = {};
    for (const id in globalBrief) {
        const entry = globalBrief[id];
        brief[id] = {
            title: entry.title || '',
            version: entry.version || '',
            order: entry.order || 0
        };
    }

    ctx.logger.step(1, 1, 'Get bulletin brief', 'pass',
        Object.keys(brief).length + ' bulletins');

    ctx.logger.criticalFields([
        {
            name: '_brief',
            value: 'Object{' + Object.keys(brief).length + '}',
            status: 'ok',
            detail: 'L121094: for(var o in n._brief) iterates each bulletin'
        }
    ]);

    return ctx.buildDataResponse(0, { _brief: brief });
}

// ═══════════════════════════════════════════════════════════════
// ACTION 2: readBulletin
// ═══════════════════════════════════════════════════════════════

function handleReadBulletin(request, ctx) {
    const { userId, id } = request;

    ctx.logger.step(1, 2, 'Read bulletin detail', 'running');
    ctx.logger.details('request',
        ['userId', userId ? userId.substring(0, 20) : 'MISSING'],
        ['id', id || 'MISSING']
    );

    if (!userId || !id) {
        ctx.logger.step(1, 2, 'Read bulletin detail', 'fail', 'userId or id MISSING');
        return ctx.buildErrorResponse(8);
    }

    // Load bulletin from global store
    const globalBrief = ctx.db.getGlobal('bulletinBrief') || {};
    const bulletin = globalBrief[id];

    if (!bulletin) {
        ctx.logger.step(1, 2, 'Read bulletin detail', 'fail',
            'Bulletin "' + id + '" not found');
        return ctx.buildErrorResponse(8);
    }

    // Update user's bulletinVersions so red-dot clears on next check
    // Client compares: bulletinVersions[id] vs bulletinList[id].bulletinVersion
    // Setting them equal → red dot disappears
    const userData = ctx.db.getUser(userId);
    if (userData && userData.user) {
        if (!userData.user._bulletinVersions) {
            userData.user._bulletinVersions = {};
        }
        userData.user._bulletinVersions[id] = bulletin.version;
        ctx.db.saveUser(userId, userData);
        ctx.logger.step(2, 2, 'Update bulletinVersions', 'pass',
            'saved version "' + bulletin.version + '" for bulletin "' + id + '"');
    } else {
        ctx.logger.log('WARN', 'BULLETIN', 'readBulletin: user ' + userId + ' not found — version not saved');
    }

    const responseData = {
        _bulletin: bulletin.body || '',
        _bulletinTitle: bulletin.title || '',
        _bulletinVersion: bulletin.version || ''
    };

    ctx.logger.step(1, 2, 'Read bulletin detail', 'pass',
        'id=' + id + ' title="' + (bulletin.title || '').substring(0, 30) + '"');

    ctx.logger.criticalFields([
        {
            name: '_bulletin',
            value: '"' + (bulletin.body || '').substring(0, 40) + '..."',
            status: 'ok',
            detail: 'L121103: saveBulletin reads t._bulletin (body text)'
        },
        {
            name: '_bulletinTitle',
            value: '"' + (bulletin.title || '') + '"',
            status: 'ok',
            detail: 'L121103: saveBulletin reads t._bulletinTitle'
        },
        {
            name: '_bulletinVersion',
            value: '"' + (bulletin.version || '') + '"',
            status: 'ok',
            detail: 'L121103: saveBulletin reads t._bulletinVersion → clears red dot'
        }
    ]);

    return ctx.buildDataResponse(0, responseData);
}

module.exports = {
    getBulletinBrief: handleGetBulletinBrief,
    readBulletin: handleReadBulletin
};
