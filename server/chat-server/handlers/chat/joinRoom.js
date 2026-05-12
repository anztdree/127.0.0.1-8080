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
 *   Called dari chatLoginRequest (L114566/114574/114585/114596).
 *   Juga dipanggil dinamis:
 *     L114206: setTeamID → join guild room
 *     L136515: setCreateTeamDungeon → join team dungeon room
 *     L136532: joinTeamSuccessCallBack → join team room
 *     L198992, L199168: guild notify handlers → join guild room
 *
 * CALLBACK BEHAVIOR (L114632-114640):
 *   ts.chatJoinRecord(e)
 *     var t = e._record, n = [];
 *     for (var o in t) {              ← _record iterated as Object
 *         var a = t[o];
 *         ts.chatData[a._kind] || (ts.chatData[a._kind] = []);
 *         var r = ChatDataBaseClass.getData(a);
 *         r && (ts.chatNotifyData(r), n.push(r));
 *     }
 *     return n;
 *
 * ChatDataBaseClass.getData (L92098-92110):
 *   - Cek blacklist → jika user di-blacklist, return undefined (skip)
 *   - Jika _type == undefined → return undefined (SKIP!)
 *   - Copy semua field ke instance baru
 *
 * RESPONSE FIELDS:
 *   _record: Object { "0": msgObj, "1": msgObj, ... }
 *     MUST be Object (not Array) — client iterasi pakai for(var o in t)
 *     Setiap msgObj punya field ChatDataBaseClass.getData:
 *       _time, _kind, _name, _content, _id, _image, _param, _type,
 *       _headEffect, _headBox, _oriServerId, _serverId, _showMain
 *
 * SERVER BEHAVIOR:
 *   1. socket.join(roomId)
 *   2. Query pesan dari SQLite untuk room ini
 *   3. Return {_record: Object{index: msgObj, ...}}
 *
 * MESSAGE_KIND (L116615-116625):
 *   0=MK_NULL, 1=SYSTEM, 2=WORLD, 3=GUILD, 4=PRIVATE, 5=WORLD_TEAM, 6=TEAM
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

    // ─── STEP 1: Validate ───
    if (!userId || !roomId) {
        ctx.logger.step(1, 2, 'Join room', 'fail', 'userId or roomId MISSING ❌');
        return ctx.buildErrorResponse(8);
    }

    // ─── STEP 2: Join Socket.IO room ───
    ctx.socket.join(roomId);

    // Update session room list
    const session = ctx.sessions.get(ctx.socket.id);
    if (session && !session.rooms.includes(roomId)) {
        session.rooms.push(roomId);
    }

    ctx.logger.step(1, 2, 'Join room', 'pass', `roomId="${roomId}"`);

    // ─── STEP 3: Get message history dari SQLite ───
    ctx.logger.step(2, 2, 'Build room history', 'running');

    /**
     * Get pesan dari SQLite, convert ke Object dengan numeric string keys.
     *
     * _record format: Object { "0": msgObj, "1": msgObj, ... }
     * L114634: for (var o in t) { var a = t[o]; ... }
     * Client iterasi pakai for...in — MUST be Object, bukan Array.
     *
     * Setiap msgObj dari _rowToMsg sudah punya semua 12 field
     * ChatDataBaseClass.getData yang diperlukan.
     * Termasuk _type (selalu set, tidak pernah undefined).
     */
    const messages = ctx.db.getRoomMessages(roomId);
    const record = {};

    for (let i = 0; i < messages.length; i++) {
        record[String(i)] = messages[i];
    }

    const duration = Date.now() - startTime;

    ctx.logger.step(2, 2, 'Build room history', 'pass', `${messages.length} messages`);
    ctx.logger.details('response',
        ['roomId', roomId],
        ['_record', `${messages.length} message(s)`],
        ['format', 'Object (for...in safe)']
    );

    return ctx.buildDataResponse(0, { _record: record });
}

module.exports = handleJoinRoom;
