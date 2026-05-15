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
 * ALL RELAY ACTIONS:
 *   queryFriends     → L136208-136216: saveFriendData(e) → iterates e.users[n] → FSUser.deserialize
 *   queryBlackList   → L136292-136301: setMyTeamworkBlicklist(e) → iterates e.users[n] → FSUser.deserialize
 *   getMsgList       → L124529-124540: setMessageFriendSimpleList(e) → iterates e[n].lastMsgTime/lastReadTime/msg
 *   getMsg           → L90631-90647: callback reads t._msgs[] → each { _time, _isSelf, _context }
 *   readMsg          → L90658-90667: callback reads e._readTime
 *   sendMsg          → L186864-186890: callback reads NOTHING (client constructs msg locally)
 *   delMsg           → L186893-186906: callback reads NOTHING
 *   apply            → L207292-207301: callback reads NOTHING (shows barTypeTips)
 *   handleApply      → L209199-209213: callback reads NOTHING (client adds friend locally on agree)
 *   queryApplyList   → L210112-210123: setTeamworkFriendApplyList(e) → iterates e.users[n] → FSUser.deserialize
 *   getChatMsg       → L210091-210110: setTeamworkFriendInvitedList(e) → iterates e._msgs[n] → {_type,_from,_param,_time,teamExist}
 *   chat             → L208788-208801: callback reads NOTHING
 *   addToBlacklist   → L136256-136275: callback reads NOTHING
 *   removeBalcklist  → L204019-204031: callback reads NOTHING (NOTE: client typo "Balcklist")
 *   delFriend        → L207264-207279: callback reads NOTHING
 *
 * DATA STRUCTURES:
 *   FSUser extends TeamUserItem (L124832-124841)
 *   TeamUserItem.deserialize (L85300-85304): iterates keys, strips leading _, common types → direct assign
 *   Fields: _userId, _nickName, _headImage, _level, _vip, _headEffect, _headBox,
 *           _serverId, _oriServerId, _guildName, _totalPower, _superSkill, _teams
 *   FSUser adds: state (OFFLINE=0, ONLINE=1, IN_TEAM=2)
 *
 * STORAGE PATHS (all inside userData):
 *   userData.teamworkFriends     → { [friendId]: FSUserObj }
 *   userData.teamworkBlacklist   → { [userId]: FSUserObj }
 *   userData.teamworkApplies     → { [fromId]: FSUserObj + _applyTime }
 *   userData.teamworkMessages    → { [friendId]: [ { _time, _isSelf, _context } ] }
 *   userData.teamworkMsgBrief    → { [friendId]: { lastMsgTime, lastReadTime, msg } }
 *   userData.teamworkReadTime    → { [friendId]: timestamp }
 *   global:teamworkChatMsgs      → { _msgs: [ { _type, _from, _param, _time, teamExist } ] }
 *
 * STRICT RULES: NO STUB, OVERRIDE, FORCE, BYPASS, DUMMY, ASUMSI
 */

const PLAYERLEVELID = 104;

/**
 * Helper: Extract a user's friend profile (FSUser-compatible) from userData.
 * Used when adding friends, sending applies, etc.
 */
function buildFriendProfile(userData) {
    const u = userData.user || {};
    const he = userData.headEffect || {};
    const attr = u._attribute || {};
    const items = attr._items || {};
    const levelItem = items[PLAYERLEVELID] || {};
    const level = levelItem._num || 0;

    return {
        _userId: u._id || '',
        _nickName: u._nickName || '',
        _headImage: u._headImage || '',
        _level: level,
        _vip: 0,
        _headEffect: he._curEffect || 0,
        _headBox: he._curBox || 0,
        _serverId: 0,
        _oriServerId: u._oriServerId || 0,
        _guildName: '',
        _totalPower: 0,
        state: 1
    };
}

/**
 * Helper: Get user level from userData.
 */
function getUserLevel(userData) {
    const u = userData.user || {};
    const attr = u._attribute || {};
    const items = attr._items || {};
    const levelItem = items[PLAYERLEVELID] || {};
    return levelItem._num || 0;
}

function handleFriendServerAction(request, ctx) {
    const { userId, relayAction } = request;

    ctx.logger.step(1, 2, 'Route relay action', 'running');
    ctx.logger.details('request',
        ['userId', userId ? userId.substring(0, 20) : 'MISSING'],
        ['relayAction', relayAction || 'MISSING'],
        ['extraFields', Object.keys(request).filter(k => !['type', 'action', 'userId', 'version', 'relayAction'].includes(k)).join(', ') || '(none)']
    );

    if (!userId || !relayAction) {
        ctx.logger.step(1, 2, 'Route relay action', 'fail', 'userId or relayAction MISSING');
        return ctx.buildErrorResponse(8);
    }

    ctx.logger.step(1, 2, 'Route relay action', 'pass', 'relayAction="${relayAction}"');

    // ─── Load user data ───
    const userData = ctx.db.getUser(userId);

    if (!userData) {
        ctx.logger.step(2, 2, 'Handle ' + relayAction, 'fail', 'User not found');
        return ctx.buildErrorResponse(8);
    }

    // ─── Ensure teamwork storage fields exist ───
    if (!userData.teamworkFriends) userData.teamworkFriends = {};
    if (!userData.teamworkBlacklist) userData.teamworkBlacklist = {};
    if (!userData.teamworkApplies) userData.teamworkApplies = {};
    if (!userData.teamworkMessages) userData.teamworkMessages = {};
    if (!userData.teamworkMsgBrief) userData.teamworkMsgBrief = {};
    if (!userData.teamworkReadTime) userData.teamworkReadTime = {};

    ctx.logger.step(2, 2, 'Handle ' + relayAction, 'running');

    switch (relayAction) {

        // ─────────────────────────────────────────────
        // queryFriends — L136208-136216 → saveFriendData(e)
        // Client reads: e.users[n] → FSUser.deserialize(e.users[n])
        // Response: { users: { [friendId]: FSUserObj } }
        // ─────────────────────────────────────────────
        case 'queryFriends': {
            const friends = userData.teamworkFriends;
            ctx.logger.step(2, 2, 'Handle ' + relayAction, 'pass',
                Object.keys(friends).length + ' friends');
            return ctx.buildDataResponse(0, { users: friends });
        }

        // ─────────────────────────────────────────────
        // queryBlackList — L136292-136301 → setMyTeamworkBlicklist(e)
        // Client reads: if(e.users) iterate e.users[n] → FSUser.deserialize(e.users[n])
        // Response: { users: { [userId]: FSUserObj } }
        // ─────────────────────────────────────────────
        case 'queryBlackList': {
            const blacklist = userData.teamworkBlacklist;
            ctx.logger.step(2, 2, 'Handle ' + relayAction, 'pass',
                Object.keys(blacklist).length + ' entries');
            return ctx.buildDataResponse(0, { users: blacklist });
        }

        // ─────────────────────────────────────────────
        // getMsgList — L124529-124540: setMessageFriendSimpleList(e)
        // Client reads: for(n in e) → e[n].lastMsgTime, e[n].lastReadTime, e[n].msg
        // Response: { _brief: { [friendId]: { lastMsgTime, lastReadTime, msg } } }
        // ─────────────────────────────────────────────
        case 'getMsgList': {
            const brief = userData.teamworkMsgBrief;
            ctx.logger.step(2, 2, 'Handle ' + relayAction, 'pass',
                Object.keys(brief).length + ' conversations');
            return ctx.buildDataResponse(0, { _brief: brief });
        }

        // ─────────────────────────────────────────────
        // getMsg — L90631-90647 (initial load), L186798-186818 (pagination scroll)
        // Each msg: { _time, _isSelf, _context }
        // Request: friendId, time
        //   Initial load (L90637): time = ServerTime.getServerTime() → return ALL msgs (<= now)
        //   Pagination (L186804): time = maxOldTime → return OLDER msgs (<= maxOldTime)
        // So time is always an UPPER BOUND — filter: msg._time <= time
        // Response: { _msgs: [ { _time, _isSelf, _context } ] }
        // ─────────────────────────────────────────────
        case 'getMsg': {
            const { friendId, time } = request;
            let messages = (userData.teamworkMessages[friendId]) ? userData.teamworkMessages[friendId] : [];

            // time is upper bound: return messages <= time, limited to last 50
            if (time && Array.isArray(messages)) {
                messages = messages.filter(function (msg) {
                    return msg._time <= time;
                });
                // For pagination, return only the 50 oldest messages (before the time)
                if (messages.length > 50) {
                    messages = messages.slice(-50);
                }
            }

            ctx.logger.step(2, 2, 'Handle ' + relayAction, 'pass',
                messages.length + ' msgs from ' + (friendId || '?'));
            return ctx.buildDataResponse(0, { _msgs: messages });
        }

        // ─────────────────────────────────────────────
        // readMsg — L90658-90667: callback reads e._readTime
        // Request: friendId
        // Response: { _readTime: timestamp }
        // ─────────────────────────────────────────────
        case 'readMsg': {
            const { friendId } = request;
            const readTime = Date.now();

            userData.teamworkReadTime[friendId] = readTime;

            // Also update brief lastReadTime
            if (userData.teamworkMsgBrief[friendId]) {
                userData.teamworkMsgBrief[friendId].lastReadTime = readTime;
            }

            ctx.db.saveUser(userId, userData);
            ctx.logger.step(2, 2, 'Handle ' + relayAction, 'pass',
                'friendId=' + friendId + ' time=' + readTime);
            return ctx.buildDataResponse(0, { _readTime: readTime });
        }

        // ─────────────────────────────────────────────
        // sendMsg — L186864-186890: callback reads NOTHING
        // Client constructs msg locally: { _time, _isSelf: true, _context: msg }
        // Request: friendId, msg
        // Action: store in BOTH users' message data
        // ─────────────────────────────────────────────
        case 'sendMsg': {
            const { friendId, msg } = request;

            // ── Validation: friendId and msg required ──
            if (!friendId || msg === undefined || msg === null) {
                ctx.logger.step(2, 2, 'Handle ' + relayAction, 'fail', 'friendId or msg MISSING');
                return ctx.buildErrorResponse(8);
            }
            // ── Validation: message length limit ──
            var maxTeamMsgLen = 500;
            if (typeof msg !== 'string') {
                ctx.logger.step(2, 2, 'Handle ' + relayAction, 'fail', 'msg is not string');
                return ctx.buildErrorResponse(8);
            }
            if (msg.length === 0) {
                ctx.logger.step(2, 2, 'Handle ' + relayAction, 'fail', 'msg is empty');
                return ctx.buildErrorResponse(8);
            }
            if (msg.length > maxTeamMsgLen) {
                ctx.logger.log('WARN', 'FRIEND', 'relay sendMsg: msg truncated (' + msg.length + '/' + maxTeamMsgLen + ')');
                request.msg = msg.substring(0, maxTeamMsgLen);
            }

            const senderData = userData;
            const recipientData = ctx.db.getUser(friendId);

            const now = Date.now();
            const senderMsg = { _time: now, _isSelf: true, _context: msg };
            const recipientMsg = { _time: now, _isSelf: false, _context: msg };

            // Save to sender's messages
            if (!senderData.teamworkMessages[friendId]) {
                senderData.teamworkMessages[friendId] = [];
            }
            senderData.teamworkMessages[friendId].push(senderMsg);
            senderData.teamworkMsgBrief[friendId] = {
                lastMsgTime: now,
                lastReadTime: senderData.teamworkReadTime[friendId] || 0,
                msg: msg
            };
            ctx.db.saveUser(userId, senderData);

            // Save to recipient's messages
            if (recipientData) {
                if (!recipientData.teamworkMessages) recipientData.teamworkMessages = {};
                if (!recipientData.teamworkMsgBrief) recipientData.teamworkMsgBrief = {};
                if (!recipientData.teamworkReadTime) recipientData.teamworkReadTime = {};

                if (!recipientData.teamworkMessages[userId]) {
                    recipientData.teamworkMessages[userId] = [];
                }
                recipientData.teamworkMessages[userId].push(recipientMsg);
                recipientData.teamworkMsgBrief[userId] = {
                    lastMsgTime: now,
                    lastReadTime: recipientData.teamworkReadTime[userId] || 0,
                    msg: msg
                };
                ctx.db.saveUser(friendId, recipientData);
            } else {
                ctx.logger.log('WARN', 'FRIEND', 'sendMsg: recipient ' + friendId + ' not found');
            }

            ctx.logger.step(2, 2, 'Handle ' + relayAction, 'pass',
                'to=' + friendId + ' msgLen=' + (msg || '').length);
            return ctx.buildDataResponse(0, {});
        }

        // ─────────────────────────────────────────────
        // delMsg — L186893-186906: callback reads NOTHING
        // Client locally calls clearOneFriendMessage(friendId)
        // Request: friendId
        // Action: delete all messages with that friend for BOTH users
        // ─────────────────────────────────────────────
        case 'delMsg': {
            const { friendId } = request;
            const recipientData = ctx.db.getUser(friendId);

            // Delete from sender
            delete userData.teamworkMessages[friendId];
            delete userData.teamworkMsgBrief[friendId];
            delete userData.teamworkReadTime[friendId];
            ctx.db.saveUser(userId, userData);

            // Delete from recipient
            if (recipientData) {
                if (recipientData.teamworkMessages) {
                    delete recipientData.teamworkMessages[userId];
                }
                if (recipientData.teamworkMsgBrief) {
                    delete recipientData.teamworkMsgBrief[userId];
                }
                if (recipientData.teamworkReadTime) {
                    delete recipientData.teamworkReadTime[userId];
                }
                ctx.db.saveUser(friendId, recipientData);
            }

            ctx.logger.step(2, 2, 'Handle ' + relayAction, 'pass',
                'deleted msgs with ' + friendId);
            return ctx.buildDataResponse(0, {});
        }

        // ─────────────────────────────────────────────
        // apply — L207292-207301: callback reads NOTHING
        // Client shows barTypeTips or dispatches refreshRecommend
        // Request: friendIds (array of target userIds)
        // Action: create apply entry in EACH target user's teamworkApplies
        // ─────────────────────────────────────────────
        case 'apply': {
            const { friendIds } = request;

            if (!Array.isArray(friendIds) || friendIds.length === 0) {
                ctx.logger.step(2, 2, 'Handle ' + relayAction, 'fail', 'friendIds empty or not array');
                return ctx.buildErrorResponse(8);
            }

            const profile = buildFriendProfile(userData);
            profile._applyTime = Date.now();

            let savedCount = 0;
            for (let i = 0; i < friendIds.length; i++) {
                const targetId = friendIds[i];
                if (targetId === userId) continue; // Cannot apply to self

                const targetData = ctx.db.getUser(targetId);
                if (!targetData) {
                    ctx.logger.log('WARN', 'FRIEND', 'apply: target ' + targetId + ' not found');
                    continue;
                }

                if (!targetData.teamworkApplies) targetData.teamworkApplies = {};

                // Don't overwrite existing apply
                if (!targetData.teamworkApplies[userId]) {
                    targetData.teamworkApplies[userId] = Object.assign({}, profile);
                    ctx.db.saveUser(targetId, targetData);
                    savedCount++;
                }
            }

            ctx.logger.step(2, 2, 'Handle ' + relayAction, 'pass',
                'applied to ' + savedCount + '/' + friendIds.length + ' players');
            return ctx.buildDataResponse(0, {});
        }

        // ─────────────────────────────────────────────
        // handleApply — L209199-209213: callback reads NOTHING
        // Client: if agree → addFriendData(n) + refreshTeamworkApply
        // Request: agree (boolean), friendId (applicant's userId)
        // Action: if agree=true → add BOTH users to each other's teamworkFriends
        //         always → remove from current user's teamworkApplies
        // ─────────────────────────────────────────────
        case 'handleApply': {
            const { agree, friendId } = request;

            if (!friendId) {
                ctx.logger.step(2, 2, 'Handle ' + relayAction, 'fail', 'friendId MISSING');
                return ctx.buildErrorResponse(8);
            }

            const applicantData = ctx.db.getUser(friendId);

            // Remove from current user's applies (always)
            delete userData.teamworkApplies[friendId];

            if (agree) {
                // Add applicant to current user's friends
                if (applicantData) {
                    const applicantProfile = buildFriendProfile(applicantData);
                    userData.teamworkFriends[friendId] = applicantProfile;

                    // Add current user to applicant's friends
                    if (!applicantData.teamworkFriends) applicantData.teamworkFriends = {};
                    const myProfile = buildFriendProfile(userData);
                    applicantData.teamworkFriends[userId] = myProfile;
                    ctx.db.saveUser(friendId, applicantData);
                } else {
                    ctx.logger.log('WARN', 'FRIEND', 'handleApply: applicant ' + friendId + ' not found');
                }
            }

            ctx.db.saveUser(userId, userData);
            ctx.logger.step(2, 2, 'Handle ' + relayAction, 'pass',
                'friendId=' + friendId + ' agree=' + agree);
            return ctx.buildDataResponse(0, {});
        }

        // ─────────────────────────────────────────────
        // queryApplyList — L210112-210123: setTeamworkFriendApplyList(e)
        // Client reads: e.users[n] → FSUser.deserialize(e.users[n]) + state + offlineTime sort
        // Response: { users: { [userId]: FSUserObj } }
        // ─────────────────────────────────────────────
        case 'queryApplyList': {
            const applies = userData.teamworkApplies;
            ctx.logger.step(2, 2, 'Handle ' + relayAction, 'pass',
                Object.keys(applies).length + ' pending applies');
            return ctx.buildDataResponse(0, { users: applies });
        }

        // ─────────────────────────────────────────────
        // addToBlacklist — L136256-136275: callback reads NOTHING
        // Client locally: addBlackList(t), delectFriendData(t.userId), clearOneFriendMessage(t.userId)
        // Request: friendId
        // Action: add friendId to current user's teamworkBlacklist
        //         optionally remove from friends (client also does locally)
        // ─────────────────────────────────────────────
        case 'addToBlacklist': {
            const { friendId } = request;

            if (!friendId) {
                ctx.logger.step(2, 2, 'Handle ' + relayAction, 'fail', 'friendId MISSING');
                return ctx.buildErrorResponse(8);
            }

            // Get target user info for the profile
            const targetData = ctx.db.getUser(friendId);
            if (targetData) {
                const profile = buildFriendProfile(targetData);
                userData.teamworkBlacklist[friendId] = profile;
            } else {
                // If target not found, create minimal profile with just the ID
                userData.teamworkBlacklist[friendId] = {
                    _userId: friendId,
                    _nickName: 'Unknown',
                    _headImage: '',
                    _level: 0,
                    _vip: 0,
                    _headEffect: 0,
                    _headBox: 0,
                    _serverId: 0,
                    _oriServerId: 0,
                    _guildName: '',
                    _totalPower: 0,
                    state: 0
                };
            }

            // Remove from friends (client also does this locally)
            delete userData.teamworkFriends[friendId];

            // Also remove from the other user's friend list (bidirectional)
            if (targetData && targetData.teamworkFriends) {
                delete targetData.teamworkFriends[userId];
                ctx.db.saveUser(friendId, targetData);
            }

            ctx.db.saveUser(userId, userData);
            ctx.logger.step(2, 2, 'Handle ' + relayAction, 'pass',
                'added ' + friendId + ' to blacklist');
            return ctx.buildDataResponse(0, {});
        }

        // ─────────────────────────────────────────────
        // removeBalcklist — L204019-204031: callback reads NOTHING
        // NOTE: Client has TYPO — "Balcklist" (not "Blacklist") in relayAction!
        // Client locally: removeBlacklist(a), dispatch teamworkRefreshBlacklist
        // Request: friendId
        // Action: remove friendId from current user's teamworkBlacklist
        // ─────────────────────────────────────────────
        case 'removeBalcklist': {
            const { friendId } = request;

            if (!friendId) {
                ctx.logger.step(2, 2, 'Handle ' + relayAction, 'fail', 'friendId MISSING');
                return ctx.buildErrorResponse(8);
            }

            delete userData.teamworkBlacklist[friendId];
            ctx.db.saveUser(userId, userData);
            ctx.logger.step(2, 2, 'Handle ' + relayAction, 'pass',
                'removed ' + friendId + ' from blacklist');
            return ctx.buildDataResponse(0, {});
        }

        // ─────────────────────────────────────────────
        // delFriend — L207264-207279: callback reads NOTHING
        // Client locally: delectFriendData(o), clearOneFriendMessage(o)
        // Request: friendId
        // Action: remove friendId from BOTH users' teamworkFriends
        // ─────────────────────────────────────────────
        case 'delFriend': {
            const { friendId } = request;

            if (!friendId) {
                ctx.logger.step(2, 2, 'Handle ' + relayAction, 'fail', 'friendId MISSING');
                return ctx.buildErrorResponse(8);
            }

            // Remove from current user
            delete userData.teamworkFriends[friendId];
            delete userData.teamworkMessages[friendId];
            delete userData.teamworkMsgBrief[friendId];
            delete userData.teamworkReadTime[friendId];
            ctx.db.saveUser(userId, userData);

            // Remove from other user's friend list (bidirectional)
            const friendData = ctx.db.getUser(friendId);
            if (friendData) {
                if (friendData.teamworkFriends) {
                    delete friendData.teamworkFriends[userId];
                }
                if (friendData.teamworkMessages) {
                    delete friendData.teamworkMessages[userId];
                }
                if (friendData.teamworkMsgBrief) {
                    delete friendData.teamworkMsgBrief[userId];
                }
                if (friendData.teamworkReadTime) {
                    delete friendData.teamworkReadTime[userId];
                }
                ctx.db.saveUser(friendId, friendData);
            }

            ctx.logger.step(2, 2, 'Handle ' + relayAction, 'pass',
                'deleted friend ' + friendId);
            return ctx.buildDataResponse(0, {});
        }

        // ─────────────────────────────────────────────
        // getChatMsg — L210091-210110: setTeamworkFriendInvitedList(e)
        // Client reads: for(n in e._msgs) → e._msgs[n]._type, ._from, ._param, ._time, teamExist
        // Request: time (timestamp — get messages since this time)
        // Response: { _msgs: [ { _type, _from, _param, _time, teamExist } ] }
        // ─────────────────────────────────────────────
        case 'getChatMsg': {
            const { time } = request;
            const allChatMsgs = ctx.db.getGlobal('teamworkChatMsgs') || { _msgs: [] };
            let msgs = allChatMsgs._msgs || [];

            // Filter messages after the requested time
            if (time) {
                msgs = msgs.filter(function (m) {
                    return m._time > time;
                });
            }

            ctx.logger.step(2, 2, 'Handle ' + relayAction, 'pass',
                msgs.length + ' chat msgs since ' + (time || 'beginning'));
            return ctx.buildDataResponse(0, { _msgs: msgs });
        }

        // ─────────────────────────────────────────────
        // chat — L208788-208801: callback reads NOTHING
        // Client locally: adds to teamDungeonInvitedFriends, dispatches deleteInviteListItem
        // Request: friendId, msgType, params
        // Action: store broadcast message in global store
        // ─────────────────────────────────────────────
        case 'chat': {
            const { friendId, msgType, params } = request;
            const now = Date.now();

            // Load global chat msgs
            const allChatMsgs = ctx.db.getGlobal('teamworkChatMsgs') || { _msgs: [] };
            if (!allChatMsgs._msgs) allChatMsgs._msgs = [];

            // Append new broadcast message
            allChatMsgs._msgs.push({
                _type: msgType,
                _from: userId,
                _param: params || {},
                _time: now,
                teamExist: false
            });

            // Keep max 200 messages to prevent unbounded growth
            if (allChatMsgs._msgs.length > 200) {
                allChatMsgs._msgs = allChatMsgs._msgs.slice(-200);
            }

            ctx.db.setGlobal('teamworkChatMsgs', allChatMsgs);

            ctx.logger.step(2, 2, 'Handle ' + relayAction, 'pass',
                'broadcast msgType=' + msgType + ' from=' + userId.substring(0, 12));
            return ctx.buildDataResponse(0, {});
        }

        // ─────────────────────────────────────────────
        // Default — unknown relay action
        // ─────────────────────────────────────────────
        default: {
            ctx.logger.log('WARN', 'FRIEND', 'Unknown relayAction: "' + relayAction + '" — returning error');
            ctx.logger.step(2, 2, 'Handle ' + relayAction, 'fail', 'unknown action');
            return ctx.buildErrorResponse(4);
        }
    }
}

module.exports = handleFriendServerAction;
