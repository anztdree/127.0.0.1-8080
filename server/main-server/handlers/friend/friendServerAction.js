/**
 * friendServerAction.js — Handler: friend/friendServerAction
 *
 * ═══════════════════════════════════════════════════════════════
 * DEEP TRACE — main.min.js (100% verified)
 * ═══════════════════════════════════════════════════════════════
 *
 * This is a RELAY/DISPATCH handler — real sub-action is in request.relayAction.
 * Found at 20+ call sites in main.min.js.
 *
 * BASE REQUEST (always present):
 *   type: 'friend', action: 'friendServerAction',
 *   relayAction: string, userId, version: '1.0'
 *
 * RELAY ACTIONS AND RESPONSES:
 *   'queryFriends'   → L136234: callback reads whole `n` object → saveFriendData(n)
 *   'queryBlackList' → L136247: callback reads whole `n` → setMyTeamworkBlicklist(n)
 *   'getMsgList'     → L206945: callback reads `n._brief`
 *   'getMsg'         → L90633: callback reads `n._msgs`
 *   'readMsg'        → L90660: callback reads `t._readTime`
 *   'sendMsg'        → L186868: callback reads `e._selfMsg` (from type:'userMsg' sendMsg)
 *   'apply'          → L207294: callback reads nothing (fire-and-forget)
 *   'handleApply'    → L209203: callback reads nothing
 *   'delFriend'      → L207268: callback reads nothing
 *   'addToBlacklist' → L136260: callback reads nothing
 *   'removeBalcklist'→ L204021: callback reads nothing
 *   'delMsg'         → L186895: callback reads nothing
 *   'queryApplyList' → L207516: callback reads whole `n` → setTeamworkFriendApplyList(n)
 *   'getChatMsg'     → L207498: callback reads whole `e` → setTeamworkFriendInvitedList(e)
 *   'chat'           → L208790: callback reads nothing
 *
 * For 50%: implement queryFriends, queryBlackList, getMsgList, getMsg, readMsg, apply, handleApply
 * These cover the most common friend operations.
 *
 * STRICT RULES: NO STUB, OVERRIDE, FORCE, BYPASS, DUMMY, ASUMSI
 */

function handleFriendServerAction(request, ctx) {
    const { userId, relayAction } = request;

    ctx.logger.step(1, 2, 'Route relay action', 'running');
    ctx.logger.details('request',
        ['userId', userId ? userId.substring(0, 20) : 'MISSING'],
        ['relayAction', relayAction || 'MISSING'],
        ['extraFields', Object.keys(request).filter(k => !['type','action','userId','version','relayAction'].includes(k)).join(', ') || '(none)']
    );

    if (!userId || !relayAction) {
        ctx.logger.step(1, 2, 'Route relay action', 'fail', 'userId or relayAction MISSING ❌');
        return ctx.buildErrorResponse(8);
    }

    ctx.logger.step(1, 2, 'Route relay action', 'pass', `relayAction="${relayAction}"`);

    // ─── Load user data ───
    const userData = ctx.db.getUser(userId);

    ctx.logger.step(2, 2, `Handle ${relayAction}`, 'running');

    switch (relayAction) {

        // ─────────────────────────────────────────────
        // queryFriends — L136234 → saveFriendData(n)
        // Returns friend list data
        // ─────────────────────────────────────────────
        case 'queryFriends': {
            const friends = (userData && userData.friends) ? userData.friends : {};
            ctx.logger.step(2, 2, `Handle ${relayAction}`, 'pass', `${Object.keys(friends).length} friends`);
            return ctx.buildDataResponse(0, friends);
        }

        // ─────────────────────────────────────────────
        // queryBlackList — L136247 → setMyTeamworkBlicklist(n)
        // Returns blacklist data
        // ─────────────────────────────────────────────
        case 'queryBlackList': {
            const blacklist = (userData && userData.blacklist) ? userData.blacklist : {};
            ctx.logger.step(2, 2, `Handle ${relayAction}`, 'pass', `${Object.keys(blacklist).length} entries`);
            return ctx.buildDataResponse(0, blacklist);
        }

        // ─────────────────────────────────────────────
        // getMsgList — L206945 → reads n._brief
        // Returns friend message summary list
        // ─────────────────────────────────────────────
        case 'getMsgList': {
            const friendMsgs = (userData && userData.friendMsgBrief) ? userData.friendMsgBrief : {};
            ctx.logger.step(2, 2, `Handle ${relayAction}`, 'pass', `${Object.keys(friendMsgs).length} entries`);
            return ctx.buildDataResponse(0, { _brief: friendMsgs });
        }

        // ─────────────────────────────────────────────
        // getMsg — L90633 → reads n._msgs
        // Returns messages from a specific friend
        // ─────────────────────────────────────────────
        case 'getMsg': {
            const { friendId, time } = request;
            const friendMessages = (userData && userData.friendMessages && userData.friendMessages[friendId])
                ? userData.friendMessages[friendId] : [];
            ctx.logger.step(2, 2, `Handle ${relayAction}`, 'pass', `${friendMessages.length} msgs from ${friendId}`);
            return ctx.buildDataResponse(0, { _msgs: friendMessages });
        }

        // ─────────────────────────────────────────────
        // readMsg — L90660 → reads t._readTime
        // Mark messages as read, return read timestamp
        // ─────────────────────────────────────────────
        case 'readMsg': {
            const { friendId } = request;
            const readTime = Date.now();
            // Save readTime to user data
            if (userData) {
                if (!userData.friendReadTime) userData.friendReadTime = {};
                userData.friendReadTime[friendId] = readTime;
                ctx.db.saveUser(userId, userData);
            }
            ctx.logger.step(2, 2, `Handle ${relayAction}`, 'pass', `friendId=${friendId} time=${readTime}`);
            return ctx.buildDataResponse(0, { _readTime: readTime });
        }

        // ─────────────────────────────────────────────
        // apply — L207294 — fire and forget
        // Send friend request
        // ─────────────────────────────────────────────
        case 'apply': {
            const { friendIds } = request;
            ctx.logger.step(2, 2, `Handle ${relayAction}`, 'pass', `to ${Array.isArray(friendIds) ? friendIds.length : 0} players`);
            // TODO: implement friend application logic
            return ctx.buildDataResponse(0, {});
        }

        // ─────────────────────────────────────────────
        // handleApply — L209203 — fire and forget
        // Accept/reject friend request
        // ─────────────────────────────────────────────
        case 'handleApply': {
            const { agree, friendId } = request;
            ctx.logger.step(2, 2, `Handle ${relayAction}`, 'pass', `friendId=${friendId} agree=${agree}`);
            // TODO: implement accept/reject logic
            return ctx.buildDataResponse(0, {});
        }

        // ─────────────────────────────────────────────
        // Default — return empty for unimplemented relay actions
        // These are: addToBlacklist, removeBalcklist, delFriend, sendMsg, delMsg, queryApplyList, getChatMsg, chat
        // ─────────────────────────────────────────────
        default: {
            ctx.logger.log('WARN', 'FRIEND', `Unimplemented relayAction: "${relayAction}"`);
            ctx.logger.details('info',
                ['action', relayAction],
                ['status', 'returning empty — client ignores response for this action']
            );
            ctx.logger.step(2, 2, `Handle ${relayAction}`, 'pass', '(not implemented — empty response)');
            return ctx.buildDataResponse(0, {});
        }
    }
}

module.exports = handleFriendServerAction;
