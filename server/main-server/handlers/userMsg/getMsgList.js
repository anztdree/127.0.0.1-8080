/**
 * getMsgList.js — Handler: userMsg/getMsgList
 *
 * ═══════════════════════════════════════════════════════════════
 * DEEP TRACE — main.min.js (100% verified)
 * ═══════════════════════════════════════════════════════════════
 *
 * CALLER: L186590-186601, L236728-236739
 *   ts.processHandler({
 *       type: 'userMsg', action: 'getMsgList',
 *       userId: UserInfoSingleton.getInstance().userId, version: '1.0'
 *   }, callback)
 *
 * CONSUMER: L186596, L236732 — callback reads:
 *   MailInfoManager.getInstance().setMessageFriendSimpleList(t._brief);
 *   → _brief is friend message summary list
 *
 * RESPONSE: { _brief: Object{} }
 *   Same format as friend::friendServerAction relayAction='getMsgList'
 *
 * For 50%: Return stored brief from user data.
 *
 * STRICT RULES: NO STUB, OVERRIDE, FORCE, BYPASS, DUMMY, ASUMSI
 */

function handleGetMsgList(request, ctx) {
    const { userId } = request;

    ctx.logger.step(1, 1, 'Get message list', 'running');
    ctx.logger.details('request',
        ['userId', userId ? userId.substring(0, 20) : 'MISSING']
    );

    if (!userId) {
        ctx.logger.step(1, 1, 'Get message list', 'fail', 'userId MISSING ❌');
        return ctx.buildErrorResponse(8);
    }

    const userData = ctx.db.getUser(userId);
    const storedBrief = (userData && userData.userMsgBrief) ? userData.userMsgBrief : {};

    ctx.logger.step(1, 1, 'Get message list', 'pass', `${Object.keys(storedBrief).length} entries`);

    ctx.logger.criticalFields([
        {
            name: '_brief',
            value: `Object{${Object.keys(storedBrief).length}}`,
            status: 'ok',
            detail: 'L186596: setMessageFriendSimpleList(t._brief) → Object for friend msg summary'
        }
    ]);

    return ctx.buildDataResponse(0, { _brief: storedBrief });
}

module.exports = handleGetMsgList;
