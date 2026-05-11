/**
 * joinRoom.js — Handler: chat/joinRoom
 *
 * ═══════════════════════════════════════════════════════════════
 * DEEP TRACE — main.min.js (100% verified)
 * ═══════════════════════════════════════════════════════════════
 *
 * CALLER:
 *   L114612-114621: TSUIController.chatJoinRequest(e, t)
 *     → ts.processHandlerWithChat({
 *           type: 'chat',
 *           action: 'joinRoom',
 *           userId: UserInfoSingleton.getInstance().userId,
 *           roomId: e,
 *           version: '1.0'
 *         }, callback)
 *
 *   Called from chatLoginRequest (L114566/114574/114585/114596) after login.
 *   Also called from setTeamID (L114206) when guild joined.
 *
 * CALLBACK BEHAVIOR:
 *   L114632-114640: ts.chatJoinRecord(e)
 *     var t = e._record, n = [];
 *     for (var o in t) {        ← _record iterated as Object
 *         var a = t[o];
 *         ts.chatData[a._kind] || (ts.chatData[a._kind] = []);
 *         var r = ChatDataBaseClass.getData(a);
 *         r && (ts.chatNotifyData(r), n.push(r));
 *     }
 *     return n;
 *
 * RESPONSE FIELDS:
 *   _record: Object { 0: msgObj, 1: msgObj, ... }
 *     Each msgObj: { _time, _kind, _name, _content, _id, _image, _param,
 *                    _type, _headEffect, _headBox, _oriServerId, _serverId, _showMain }
 *   Must be Object (not Array) — client uses for...in to iterate
 *
 * MESSAGE_KIND (L116615-116625):
 *   0=MK_NULL, 1=SYSTEM, 2=WORLD, 3=GUILD, 4=PRIVATE, 5=WORLD_TEAM, 6=TEAM
 *
 * ChatDataBaseClass.getData (L92098-92110):
 *   Filters out blacklisted players. If _type is undefined → returns undefined (skipped).
 *   Copies fields: _time, _kind, _name, _content, _id, _image, _param, _type,
 *                  _headEffect, _headBoxId, _oriServerId, _serverId, _showMain
 *
 * REQUEST FIELDS:
 *   userId : string — from UserInfoSingleton
 *   roomId : string — room identifier (e.g., "world_1", "guild_123")
 *   version: string — always '1.0'
 *
 * STRICT RULES: NO STUB, OVERRIDE, FORCE, BYPASS, DUMMY, ASUMSI
 */

function handleJoinRoom(request, ctx) {
    const startTime = Date.now();
    const { userId, roomId } = request;

    ctx.logger.step(1, 2, 'Join room', 'running');
    ctx.logger.details('request',
        ['userId', userId ? userId.substring(0, 20) : 'MISSING'],
        ['roomId', roomId || 'MISSING']
    );

    // ─── Validate ───
    if (!userId || !roomId) {
        ctx.logger.step(1, 2, 'Join room', 'fail', 'userId or roomId MISSING ❌');
        ctx.logger.errorBanner({
            module: 'CHAT_JOIN_ROOM',
            step: '01/02 Join Room',
            message: 'userId or roomId is MISSING',
            impact: 'Client cannot join chat room — messages lost',
            fix: 'userId from UserInfoSingleton, roomId from serverItem.worldRoomId etc.'
        });
        return ctx.buildErrorResponse(8);
    }

    // ─── Join Socket.IO room ───
    ctx.socket.join(roomId);

    // Update session room list
    const session = ctx.sessions.get(ctx.socket.id);
    if (session && !session.rooms.includes(roomId)) {
        session.rooms.push(roomId);
    }

    ctx.logger.step(1, 2, 'Join room', 'pass', `roomId="${roomId}"`);

    // ─── STEP 2: Build response with room message history ───
    ctx.logger.step(2, 2, 'Build room history', 'running');

    /**
     * Get recent messages from room store.
     * _record format: Object with numeric keys — client iterates with for(var o in t)
     * L114634: for (var o in t) { var a = t[o]; ... }
     * MUST be Object (not Array) — for...in on Array gives index strings anyway,
     * but empty Object is safer than empty Array.
     */
    const roomMessages = ctx.roomStore.get(roomId);
    const record = {};

    if (roomMessages && roomMessages.length > 0) {
        for (let i = 0; i < roomMessages.length; i++) {
            record[String(i)] = roomMessages[i];
        }
    }

    const msgCount = roomMessages ? roomMessages.length : 0;
    const duration = Date.now() - startTime;

    ctx.logger.step(2, 2, 'Build room history', 'pass', `${msgCount} messages`);
    ctx.logger.details('response',
        ['roomId', roomId],
        ['_record', `${msgCount} message(s)`],
        ['format', 'Object (for...in safe)']
    );

    // ─── Critical Fields Audit ───
    ctx.logger.criticalFields([
        {
            name: '_record',
            value: `Object{${msgCount}}`,
            status: 'ok',
            detail: 'L114634: for(var o in t) — Object, client iterates all keys'
        }
    ]);

    ctx.logger.summaryCard({
        title: 'JOIN ROOM COMPLETE',
        userId: userId,
        fields: 1,
        roomId: roomId,
        messages: msgCount,
        duration: duration
    });

    return ctx.buildDataResponse(0, { _record: record });
}

module.exports = handleJoinRoom;
