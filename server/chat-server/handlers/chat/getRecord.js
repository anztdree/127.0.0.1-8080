/**
 * getRecord.js — Handler: chat/getRecord
 *
 * ═══════════════════════════════════════════════════════════════
 * DEEP TRACE — main.min.js (100% verified)
 * ═══════════════════════════════════════════════════════════════
 *
 * CALLER:
 *   L91695-91712: BroadcastSingleton.getTeamDungeonInfoRecord()
 *     → Digunakan untuk mengambil pesan team dungeon yang terlewat
 *       saat pemain kembali ke lobby setelah dungeon selesai.
 *
 *     ts.processHandlerWithChat({
 *         type: 'chat',
 *         action: 'getRecord',
 *         userId: o,
 *         roomId: n,              // teamDungeonChatRoom
 *         startTime: t.teamDungeonInfoStartTime,
 *         version: '1.0'
 *     }, function (t) {
 *         for (var n in t._record) {
 *             var o = ChatDataBaseClass.getData(t._record[n]);
 *             a = e.getInstance().setSystemInfoArray(o);
 *             a && o && ts.chatNotifyData(o);
 *         }
 *     });
 *
 * RESPONSE FIELDS:
 *   _record: Object { "0": msgObj, "1": msgObj, ... }
 *     Sama format dengan joinRoom response.
 *     Client iterasi: for (var n in t._record) { ChatDataBaseClass.getData(t._record[n]) }
 *     MUST be Object (not Array) — for...in iteration.
 *
 * Setiap msgObj (ChatDataBaseClass.getData L92110):
 *   _time, _kind, _name, _content, _id, _image, _param, _type,
 *   _headEffect, _headBox, _oriServerId, _serverId, _showMain
 *
 * SERVER BEHAVIOR:
 *   1. Query pesan dari SQLite: room_id = roomId AND server_time > startTime
 *   2. Return {_record: Object{index: msgObj, ...}}
 *
 * REQUEST FIELDS:
 *   userId   : string — requesting user
 *   roomId   : string — room to get records from
 *   startTime: number — only return messages AFTER this timestamp (strictly >)
 *   version  : string — always '1.0'
 *
 * STRICT RULES: NO STUB, OVERRIDE, FORCE, BYPASS, DUMMY, ASUMSI
 */

function handleGetRecord(request, ctx) {
    const startTime = Date.now();
    const { userId, roomId, startTime: sinceTime } = request;

    ctx.logger.step(1, 2, 'Get record', 'running');
    ctx.logger.details('request',
        ['userId', userId ? userId.substring(0, 20) : 'MISSING'],
        ['roomId', roomId || 'MISSING'],
        ['startTime', String(sinceTime || 0)]
    );

    // ─── STEP 1: Validate ───
    if (!userId || !roomId) {
        ctx.logger.step(1, 2, 'Get record', 'fail', 'userId or roomId MISSING ❌');
        return ctx.buildErrorResponse(8);
    }

    ctx.logger.step(1, 2, 'Get record', 'pass', `roomId="${roomId}"`);

    // ─── STEP 2: Query pesan dari SQLite ───
    ctx.logger.step(2, 2, 'Filter messages', 'running');

    const filterTime = sinceTime ? Number(sinceTime) : 0;

    /**
     * Get pesan setelah startTime (strictly greater than).
     * L91707: for (var n in t._record) — iterasi semua pesan
     *
     * Pesan diurutkan oldest-first (ASC) dari SQLite.
     * Client memproses semua pesan yang dikembalikan.
     */
    const messages = ctx.db.getMessagesSince(roomId, filterTime);

    const record = {};
    for (let i = 0; i < messages.length; i++) {
        record[String(i)] = messages[i];
    }

    const duration = Date.now() - startTime;

    ctx.logger.step(2, 2, 'Filter messages', 'pass',
        `${messages.length} messages since ${filterTime}`);
    ctx.logger.details('response',
        ['roomId', roomId],
        ['sinceTime', String(filterTime)],
        ['_record', `${messages.length} message(s)`],
        ['duration', duration + 'ms']
    );

    return ctx.buildDataResponse(0, { _record: record });
}

module.exports = handleGetRecord;
