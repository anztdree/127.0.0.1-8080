/**
 * sendMsg.js — Handler: chat/sendMsg
 *
 * ═══════════════════════════════════════════════════════════════
 * DEEP TRACE — main.min.js (100% verified)
 * ═══════════════════════════════════════════════════════════════
 *
 * CALLER (L83831-83850):
 *   ToolCommon.sendMsg(t, n, o, a, r)
 *     t = content (string)
 *     n = kind (MESSAGE_KIND enum)
 *     o = callback (called after success)
 *     a = msgType (optional — bisa undefined)
 *     r = param (optional — bisa undefined)
 *
 *   → ts.processHandlerWithChat({
 *         type: 'chat',
 *         action: 'sendMsg',
 *         userId: UserInfoSingleton.getInstance().userId,
 *         kind: n,              // MESSAGE_KIND enum
 *         content: t,          // message text
 *         msgType: a,          // message sub-type (BISA undefined!)
 *         param: r,            // extra param (BISA undefined!)
 *         roomId: i,           // target room (berdasarkan kind)
 *         version: '1.0'
 *       }, successCallback, errorCallback)
 *
 * ROOM SELECTION (L83835-83837):
 *   Default roomId = ts.loginInfo.serverItem.worldRoomId
 *   kind == MESSAGE_KIND.GUILD       → guildRoomId
 *   kind == MESSAGE_KIND.WORLD_TEAM  → teamDungeonChatRoom
 *   kind == MESSAGE_KIND.TEAM        → teamChatRoomId
 *   Jika roomId falsy → TIDAK kirim (guard: i ? void ... : undefined)
 *
 * SUCCESS CALLBACK (L83846-83849):
 *   ts.createLocalData(t, n, e._time, a, r);
 *   → L114325: membuat ChatDataBaseClass instance untuk SENDER sendiri
 *     r._id = UserInfoSingleton.getInstance().userId;
 *     r._image = UserInfoSingleton.getInstance().userHeadImage;
 *     r._name = UserInfoSingleton.getInstance().userNickName;
 *     r._time = e._time;     ← SERVER TIMESTAMP — HARUS di response!
 *     r._kind = t;            ← kind dari parameter
 *     r._content = e;         ← content dari parameter
 *     r._type = o;            ← msgType dari parameter
 *     r._param = a;           ← param dari parameter
 *   → ts.chatNotifyData(r)   ← push ke ts.chatData[kind]
 *
 *   BroadcastSingleton.getInstance().addSystemInfoWithMyChat(t, n, e._time, a, r);
 *
 * ERROR CALLBACK (L83851-83853):
 *   36001 == t.ret → open BarTypeTips (chat cooldown/flood)
 *
 * NOTIFY FORMAT (L114240-114245 — startChatListenNotify):
 *   Client menerima dari server:
 *     if ('SUCCESS' == e.ret) {
 *         t = e.data;
 *         e.compress && (t = LZString.decompressFromUTF16(t));
 *         n = JSON.parse(t);
 *         o = ChatDataBaseClass.getData(n._msg);
 *     }
 *
 *   ChatDataBaseClass.getData (L92098-92110):
 *     - Cek blacklist → skip jika di-blacklist
 *     - Jika _type == undefined → return undefined (SKIP!)
 *     - Copy semua 12 field:
 *       _time, _kind, _name, _content, _id, _image, _param, _type,
 *       _headEffect, _headBox, _oriServerId, _serverId, _showMain
 *
 * BROADCAST STRATEGY:
 *   Menggunakan socket.broadcast.to(roomId) — EXCLUDE sender.
 *   Alasan: sender sudah menerima pesannya sendiri melalui createLocalData
 *   (L83847: callback success → createLocalData menggunakan response._time).
 *   Jika server juga kirim ke sender → DUPLIKAT pesan di chatData[kind].
 *
 * RESPONSE FIELDS:
 *   _time: number — SERVER timestamp (Date.now())
 *     L83847: e._time → createLocalData + addSystemInfoWithMyChat
 *     SATU-SATUNYA field yang client baca dari response.
 *
 * MESSAGE_KIND (L116615-116625):
 *   0=MK_NULL, 1=SYSTEM, 2=WORLD, 3=GUILD, 4=PRIVATE, 5=WORLD_TEAM, 6=TEAM
 *
 * TeamDungeonBroadcastID = 50 (L203915) — msgType khusus untuk invite dungeon
 *
 * REQUEST FIELDS:
 *   userId  : string — sender userId
 *   kind    : number — MESSAGE_KIND enum
 *   content : string — message text (sudah difilter replaceMessageBlocked oleh client)
 *   msgType : any — message sub-type (BISA undefined → default ke 0)
 *   param   : any — extra param (BISA undefined → default ke null)
 *   roomId  : string — target room
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

    // ─── STEP 1: Validate ───
    if (!userId) {
        ctx.logger.step(1, 3, 'Validate message', 'fail', 'userId MISSING ❌');
        return ctx.buildErrorResponse(8);
    }
    if (!roomId) {
        ctx.logger.step(1, 3, 'Validate message', 'fail', 'roomId MISSING ❌');
        return ctx.buildErrorResponse(4);
    }
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
        ctx.logger.step(1, 3, 'Validate message', 'fail', 'content EMPTY ❌');
        return ctx.buildErrorResponse(4);
    }
    if (content.length > ctx.config.maxMessageLength) {
        ctx.logger.step(1, 3, 'Validate message', 'fail',
            `content too long (${content.length} > ${ctx.config.maxMessageLength})`);
        return ctx.buildErrorResponse(36001);
    }

    ctx.logger.step(1, 3, 'Validate message', 'pass', `kind=${kind} roomId="${roomId}"`);

    // ─── STEP 2: Build message object ───
    ctx.logger.step(2, 3, 'Build message', 'running');

    const serverTime = Date.now();

    /**
     * Get user profile dari SQLite cache.
     * Profil di-sync dari main_server.json saat chat::login.
     * Jika tidak ada di cache → default (nama/image kosong).
     */
    const user = ctx.db.getUser(userId);

    /**
     * Message object — semua field dari ChatDataBaseClass.getData (L92110).
     * Client membaca field ini saat menerima Notify broadcast.
     *
     * CATATAN KRITIS tentang _type:
     *   ChatDataBaseClass.getData (L92103):
     *     return r || void 0 == t._type ? void 0 : (copy fields...)
     *
     *   Jika _type == undefined → pesan DITOLAK (return undefined)!
     *   Client TIDAK selalu mengirim msgType (bisa undefined).
     *   Solusi: default ke 0 jika msgType tidak diberikan.
     *
     * CATATAN tentang _headBox:
     *   Di msgObj field-nya adalah `_headBox`.
     *   ChatDataBaseClass.getData menyalin ke `_headBoxId`.
     *   Jadi server HARUS kirim `_headBox` (bukan `_headBoxId`).
     */
    const msgObj = {
        _time: serverTime,
        _kind: kind,
        _name: user ? user.nick_name : '',
        _content: content,
        _id: userId,
        _image: user ? user.head_image : '',
        _param: param != null ? param : null,
        _type: msgType != null ? Number(msgType) : 0,   // KRITIS: tidak boleh undefined!
        _headEffect: user ? user.head_effect : 0,
        _headBox: user ? user.head_box : 0,
        _oriServerId: user ? user.ori_server_id : 0,
        _serverId: user ? user.server_id : 0,
        _showMain: false
    };

    // Simpan pesan ke SQLite (permanen)
    ctx.db.storeMessage(msgObj, roomId);

    ctx.logger.step(2, 3, 'Build message', 'pass',
        `time=${serverTime} name="${msgObj._name}"`);

    // ─── STEP 3: Broadcast Notify ke room (EXCLUDE sender) ───
    ctx.logger.step(3, 3, 'Broadcast Notify', 'running');

    /**
     * Notify format — L114240-114245:
     *   if ('SUCCESS' == e.ret) {
     *       t = e.data;
     *       e.compress && (t = LZString.decompressFromUTF16(t));
     *       n = JSON.parse(t), o = ChatDataBaseClass.getData(n._msg);
     *   }
     *
     * ret adalah STRING 'SUCCESS' (bukan number 0)
     * data adalah JSON string dari { _msg: msgObj }
     *
     * Menggunakan socket.broadcast.to(roomId) untuk EXCLUDE sender.
     * Sender sudah menerima pesannya melalui sendMsg success callback
     * → createLocalData (L83847).
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

    // Broadcast ke semua socket di room KECUALI sender
    ctx.socket.broadcast.to(roomId).emit('Notify', notifyPacket);

    const duration = Date.now() - startTime;

    // Hitung jumlah recipient (exclude sender)
    const roomSockets = ctx.io.sockets.adapter.rooms[roomId];
    const recipientCount = roomSockets ? (Object.keys(roomSockets).length - 1) : 0;

    ctx.logger.step(3, 3, 'Broadcast Notify', 'pass',
        `room="${roomId}" ${recipientCount} recipients ${duration}ms`);
    ctx.logger.details('broadcast',
        ['roomId', roomId],
        ['recipients', String(recipientCount)],
        ['msgSize', notifyJson.length + ' chars'],
        ['compressed', String(notifyCompress)]
    );

    // ─── Response: hanya _time yang client baca (L83847) ───
    return ctx.buildDataResponse(0, { _time: serverTime });
}

module.exports = handleSendMsg;
