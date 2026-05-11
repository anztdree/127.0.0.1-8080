/**
 * leaveRoom.js — Handler: chat/leaveRoom
 *
 * ═══════════════════════════════════════════════════════════════
 * DEEP TRACE — main.min.js (100% verified)
 * ═══════════════════════════════════════════════════════════════
 *
 * CALLER:
 *   L114622-114631: TSUIController.chatLeaveRequest(e, t)
 *     → ts.processHandlerWithChat({
 *           type: 'chat',
 *           action: 'leaveRoom',
 *           userId: UserInfoSingleton.getInstance().userId,
 *           roomId: e,
 *           version: '1.0'
 *         }, function (e) { t && t(e); })
 *
 * Used when player leaves a chat room (e.g., leaves guild, leaves team dungeon).
 * Callback receives response but doesn't read specific fields.
 *
 * RESPONSE: ret=0, no data fields required.
 * Server removes socket from Socket.IO room.
 *
 * REQUEST FIELDS:
 *   userId : string — from UserInfoSingleton
 *   roomId : string — room to leave
 *   version: string — always '1.0'
 *
 * STRICT RULES: NO STUB, OVERRIDE, FORCE, BYPASS, DUMMY, ASUMSI
 */

function handleLeaveRoom(request, ctx) {
    const { userId, roomId } = request;

    ctx.logger.step(1, 1, 'Leave room', 'running');
    ctx.logger.details('request',
        ['userId', userId ? userId.substring(0, 20) : 'MISSING'],
        ['roomId', roomId || 'MISSING']
    );

    // ─── Validate ───
    if (!userId || !roomId) {
        ctx.logger.step(1, 1, 'Leave room', 'fail', 'userId or roomId MISSING ❌');
        ctx.logger.errorBanner({
            module: 'CHAT_LEAVE_ROOM',
            step: '01/01 Leave Room',
            message: 'userId or roomId is MISSING',
            impact: 'Socket stays in room — receives unwanted messages',
            fix: 'userId from UserInfoSingleton, roomId from serverItem'
        });
        return ctx.buildErrorResponse(8);
    }

    // ─── Leave Socket.IO room ───
    ctx.socket.leave(roomId);

    // Update session room list
    const session = ctx.sessions.get(ctx.socket.id);
    if (session && session.rooms) {
        const idx = session.rooms.indexOf(roomId);
        if (idx !== -1) {
            session.rooms.splice(idx, 1);
        }
    }

    ctx.logger.step(1, 1, 'Leave room', 'pass', `roomId="${roomId}"`);
    ctx.logger.details('session',
        ['remainingRooms', String(session ? session.rooms.length : 0)]
    );

    return ctx.buildDataResponse(0, {});
}

module.exports = handleLeaveRoom;
