/**
 * getRecord.js — Handler: chat/getRecord
 *
 * ═══════════════════════════════════════════════════════════════
 * DEEP TRACE — main.min.js (100% verified)
 * ═══════════════════════════════════════════════════════════════
 *
 * CALLER:
 *   L91695-91711: BroadcastSingleton.getTeamDungeonInfoRecord()
 *     ts.processHandlerWithChat({
 *         type: 'chat',
 *         action: 'getRecord',
 *         userId: o,
 *         roomId: n,        // teamDungeonChatRoom
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
 * Used to fetch message history for a specific room since a given time.
 * Primarily used for team dungeon info records.
 *
 * RESPONSE FIELDS:
 *   _record: Object { 0: msgObj, 1: msgObj, ... }
 *     Same format as joinRoom response.
 *     Client iterates: for (var n in t._record) { ChatDataBaseClass.getData(t._record[n]) }
 *     MUST be Object (not Array) — for...in iteration.
 *
 * Each msgObj (ChatDataBaseClass.getData L92110):
 *   _time, _kind, _name, _content, _id, _image, _param, _type,
 *   _headEffect, _headBox, _oriServerId, _serverId, _showMain
 *
 * REQUEST FIELDS:
 *   userId   : string — requesting user
 *   roomId   : string — room to get records from
 *   startTime: number — only return messages AFTER this timestamp
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

    // ─── Validate ───
    if (!userId || !roomId) {
        ctx.logger.step(1, 2, 'Get record', 'fail', 'userId or roomId MISSING ❌');
        ctx.logger.errorBanner({
            module: 'CHAT_GET_RECORD',
            step: '01/02 Get Record',
            message: 'userId or roomId is MISSING',
            impact: 'Client cannot load team dungeon message history',
            fix: 'userId from UserInfoSingleton, roomId from serverItem.teamDungeonChatRoom'
        });
        return ctx.buildErrorResponse(8);
    }

    ctx.logger.step(1, 2, 'Get record', 'pass', `roomId="${roomId}"`);

    // ─── STEP 2: Build filtered record ───
    ctx.logger.step(2, 2, 'Filter messages', 'running');

    const record = {};
    const roomMessages = ctx.roomStore.get(roomId);
    const filterTime = sinceTime ? Number(sinceTime) : 0;
    let count = 0;

    if (roomMessages && roomMessages.length > 0) {
        for (let i = 0; i < roomMessages.length; i++) {
            // Return messages AFTER startTime (strictly greater)
            if (roomMessages[i]._time > filterTime) {
                record[String(count)] = roomMessages[i];
                count++;
            }
        }
    }

    const duration = Date.now() - startTime;

    ctx.logger.step(2, 2, 'Filter messages', 'pass', `${count} messages since ${filterTime}`);
    ctx.logger.details('response',
        ['roomId', roomId],
        ['sinceTime', String(filterTime)],
        ['_record', `${count} message(s)`],
        ['totalInRoom', String(roomMessages ? roomMessages.length : 0)]
    );

    // ─── Critical Fields Audit ───
    ctx.logger.criticalFields([
        {
            name: '_record',
            value: `Object{${count}}`,
            status: 'ok',
            detail: 'L91707: for(var n in t._record) → Object format, iterated by client'
        }
    ]);

    ctx.logger.summaryCard({
        title: 'GET RECORD COMPLETE',
        userId: userId,
        fields: 1,
        roomId: roomId,
        messages: count,
        duration: duration
    });

    return ctx.buildDataResponse(0, { _record: record });
}

module.exports = handleGetRecord;
