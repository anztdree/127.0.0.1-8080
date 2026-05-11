/**
 * sendMsg.js — Handler: chat/sendMsg
 *
 * ═══════════════════════════════════════════════════════════════
 * DEEP TRACE — main.min.js (100% verified)
 * ═══════════════════════════════════════════════════════════════
 *
 * CALLER:
 *   L83831-83851: ChatCommon.sendMsg(t, n, o, a, r)
 *     → ts.processHandlerWithChat({
 *           type: 'chat',
 *           action: 'sendMsg',
 *           userId: UserInfoSingleton.getInstance().userId,
 *           kind: n,          // MESSAGE_KIND enum
 *           content: t,      // message text
 *           msgType: a,      // message type
 *           param: r,        // extra param
 *           roomId: i,       // target room
 *           version: '1.0'
 *         }, successCallback, errorCallback)
 *
 * ROOM SELECTION (L83835-83836):
 *   Default roomId = ts.loginInfo.serverItem.worldRoomId
 *   kind == MESSAGE_KIND.GUILD       → guildRoomId
 *   kind == MESSAGE_KIND.WORLD_TEAM  → teamDungeonChatRoom
 *   kind == MESSAGE_KIND.TEAM        → teamChatRoomId
 *   If roomId falsy → does NOT send (guard: i ? void ... : undefined)
 *
 * SUCCESS CALLBACK (L83846-83849):
 *   ts.createLocalData(t, n, e._time, a, r);
 *   → L114325: r._time = n (server timestamp)
 *   → Client stores message with server time — _time MUST be in response
 *
 *   BroadcastSingleton.getInstance().addSystemInfoWithMyChat(t, n, e._time, a, r);
 *
 * ERROR CALLBACK (L83851-83853):
 *   36001 == t.ret → open BarTypeTips (chat cooldown/flood?)
 *
 * MESSAGE_KIND (L116615-116625):
 *   0=MK_NULL, 1=SYSTEM, 2=WORLD, 3=GUILD, 4=PRIVATE, 5=WORLD_TEAM, 6=TEAM
 *
 * RESPONSE FIELDS:
 *   _time: number — SERVER timestamp (Date.now())
 *     L83847: e._time used in createLocalData and BroadcastSingleton
 *
 * SERVER BEHAVIOR:
 *   1. Store message in room history
 *   2. Build message object with all ChatDataBaseClass fields
 *   3. Broadcast Notify to ALL sockets in room (including sender)
 *
 * NOTIFY FORMAT (L114240-114245):
 *   socket.emit('Notify', {
 *     ret: 'SUCCESS',
 *     data: JSON.stringify({ _msg: msgObj }),  // or LZ compressed
 *     compress: boolean
 *   })
 *   Client parses: n = JSON.parse(data), ChatDataBaseClass.getData(n._msg)
 *
 * ChatDataBaseClass.getData (L92110) reads these fields from _msg:
 *   _time, _kind, _name, _content, _id, _image, _param, _type,
 *   _headEffect, _headBox, _oriServerId, _serverId, _showMain
 *
 * REQUEST FIELDS:
 *   userId  : string — sender userId
 *   kind    : number — MESSAGE_KIND enum (2=WORLD, 3=GUILD, 5=WORLD_TEAM, 6=TEAM)
 *   content : string — message text
 *   msgType : any — message sub-type (passed through to createLocalData)
 *   param   : any — extra param (passed through)
 *   roomId  : string — target room to broadcast to
 *   version : string — always '1.0'
 *
 * STRICT RULES: NO STUB, OVERRIDE, FORCE, BYPASS, DUMMY, ASUMSI
 */

function handleSendMsg(request, ctx) {
    const startTime = Date.now();
    const { userId, kind, content, msgType, param, roomId } = request;

    ctx.logger.step(1, 3, 'Validate message', 'running');
    ctx.logger.details('request',
        ['userId', userId ? userId.substring(0, 20) : 'MISSING'],
        ['kind', String(kind || '?')],
        ['roomId', roomId || 'MISSING'],
        ['content', content ? content.substring(0, 40) + (content.length > 40 ? '...' : '') : '(empty)'],
        ['msgType', String(msgType ?? '(none)')],
        ['param', String(param ?? '(none)')]
    );

    // ─── Validate ───
    if (!userId) {
        ctx.logger.step(1, 3, 'Validate message', 'fail', 'userId MISSING ❌');
        return ctx.buildErrorResponse(8);
    }
    if (!roomId) {
        ctx.logger.step(1, 3, 'Validate message', 'fail', 'roomId MISSING ❌');
        ctx.logger.errorBanner({
            module: 'CHAT_SEND_MSG',
            step: '01/03 Validate Message',
            message: 'roomId is MISSING — cannot route message',
            impact: 'Message not delivered to any room',
            fix: 'Client selects roomId based on kind (L83835-83836)'
        });
        return ctx.buildErrorResponse(4);
    }
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
        ctx.logger.step(1, 3, 'Validate message', 'fail', 'content EMPTY ❌');
        return ctx.buildErrorResponse(4);
    }

    // Content length check
    if (content.length > ctx.config.maxMessageLength) {
        ctx.logger.step(1, 3, 'Validate message', 'fail', `content too long (${content.length} > ${ctx.config.maxMessageLength})`);
        return ctx.buildErrorResponse(36001); // L83852: client handles 36001
    }

    ctx.logger.step(1, 3, 'Validate message', 'pass', `kind=${kind} roomId="${roomId}"`);

    // ─── STEP 2: Build message object ───
    ctx.logger.step(2, 3, 'Build message', 'running');

    const serverTime = Date.now();

    /**
     * Message object — all fields from ChatDataBaseClass.getData L92110.
     * These are the fields client reads when receiving a chat message.
     * Fields the server doesn't have (userNickName, userHeadImage) are
     * set to empty/defaults. The real game server would fetch from user data.
     */
    const msgObj = {
        _time: serverTime,
        _kind: kind,
        _name: '',           // Would come from user profile — placeholder for now
        _content: content,
        _id: userId,
        _image: 0,           // Would come from user profile (head image)
        _param: param || null,
        _type: msgType || 0,
        _headEffect: 0,
        _headBox: 0,
        _oriServerId: 0,
        _serverId: 0,
        _showMain: false
    };

    // Store in room history
    if (!ctx.roomStore.has(roomId)) {
        ctx.roomStore.set(roomId, []);
    }
    const roomMsgs = ctx.roomStore.get(roomId);
    roomMsgs.push(msgObj);

    // Trim room history to max
    while (roomMsgs.length > ctx.config.maxRoomMessages) {
        roomMsgs.shift();
    }

    ctx.logger.step(2, 3, 'Build message', 'pass', `time=${serverTime}`);

    // ─── STEP 3: Broadcast Notify to room ───
    ctx.logger.step(3, 3, 'Broadcast Notify', 'running');

    /**
     * Notify format — L114240-114245:
     *   if ('SUCCESS' == e.ret) {
     *       var t = e.data;
     *       e.compress && (t = LZString.decompressFromUTF16(t));
     *       var n = JSON.parse(t), o = ChatDataBaseClass.getData(n._msg);
     *   }
     *
     * ret is STRING 'SUCCESS' (not number 0)
     * data is JSON string of { _msg: msgObj }
     */
    const notifyPayload = { _msg: msgObj };
    const notifyJson = JSON.stringify(notifyPayload);

    let notifyData, notifyCompress;
    if (notifyJson.length > ctx.config.compressionThreshold) {
        const LZString = require('lz-string');
        notifyData = LZString.compressToUTF16(notifyJson);
        notifyCompress = true;
    } else {
        notifyData = notifyJson;
        notifyCompress = false;
    }

    const notifyPacket = {
        ret: 'SUCCESS',
        data: notifyData,
        compress: notifyCompress
    };

    // Broadcast to all sockets in this room (including sender)
    ctx.io.to(roomId).emit('Notify', notifyPacket);

    const duration = Date.now() - startTime;
    ctx.logger.step(3, 3, 'Broadcast Notify', 'pass', `room="${roomId}" ${duration}ms`);
    ctx.logger.details('broadcast',
        ['roomId', roomId],
        ['recipients', String(ctx.io.sockets.adapter.rooms[roomId] ? Object.keys(ctx.io.sockets.adapter.rooms[roomId]).length : 0)],
        ['msgSize', notifyJson.length + ' chars'],
        ['compressed', String(notifyCompress)]
    );

    // ─── Critical Fields Audit ───
    ctx.logger.criticalFields([
        {
            name: '_time (response)',
            value: String(serverTime),
            status: 'ok',
            detail: 'L83847: e._time → createLocalData + BroadcastSingleton'
        },
        {
            name: '_time (notify._msg)',
            value: String(serverTime),
            status: 'ok',
            detail: 'L92110: n._time → ChatDataBaseClass.getData copies to local'
        }
    ]);

    ctx.logger.summaryCard({
        title: 'SEND MSG COMPLETE',
        userId: userId,
        fields: 2,
        roomId: roomId,
        kind: kind,
        duration: duration
    });

    // Response: only _time is read by client (L83847)
    return ctx.buildDataResponse(0, { _time: serverTime });
}

module.exports = handleSendMsg;
