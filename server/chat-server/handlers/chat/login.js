/**
 * login.js — Handler: chat/login
 *
 * ═══════════════════════════════════════════════════════════════
 * DEEP TRACE — main.min.js (100% verified)
 * ═══════════════════════════════════════════════════════════════
 *
 * CALLER:
 *   L114550-114557: TSUIController.chatLoginRequest(e, t)
 *     → ts.processHandlerWithChat({
 *           type: 'chat',
 *           action: 'login',
 *           userId: UserInfoSingleton.getInstance().userId,
 *           serverId: UserInfoSingleton.getInstance().getServerId(),
 *           version: '1.0'
 *         }, callback)
 *
 * CALLBACK BEHAVIOR:
 *   L114557: function(e) {
 *     // e = parsed JSON data from response
 *     // Client does NOT read any fields from e
 *     // Immediately starts joining rooms:
 *     L114566: chatJoinRequest(worldRoomId)        — ALWAYS
 *     L114574: chatJoinRequest(guildRoomId)         — if exists
 *     L114585: chatJoinRequest(teamDungeonChatRoom) — if exists
 *     L114596: chatJoinRequest(teamChatRoomId)      — if exists
 *   }
 *
 * RESPONSE: ret=0, no data fields required.
 * Server stores userId → socketId mapping for later Notify broadcasts.
 *
 * REQUEST FIELDS:
 *   userId   : string — from UserInfoSingleton
 *   serverId : string/number — server the user is on
 *   version  : string — always '1.0'
 *
 * STRICT RULES: NO STUB, OVERRIDE, FORCE, BYPASS, DUMMY, ASUMSI
 */

function handleChatLogin(request, ctx) {
    const { userId, serverId } = request;

    ctx.logger.step(1, 1, 'Chat login', 'running');
    ctx.logger.details('request',
        ['userId', userId ? userId.substring(0, 20) : 'MISSING'],
        ['serverId', String(serverId || '?')],
        ['socketId', ctx.socket.id.substring(0, 16) + '...']
    );

    // ─── Validate ───
    if (!userId) {
        ctx.logger.step(1, 1, 'Chat login', 'fail', 'userId MISSING ❌');
        ctx.logger.errorBanner({
            module: 'CHAT_LOGIN',
            step: '01/01 Chat Login',
            message: 'userId is MISSING from login request',
            impact: 'Client cannot join rooms — chat non-functional',
            fix: 'Client sends userId from UserInfoSingleton.getInstance().userId'
        });
        return ctx.buildErrorResponse(8);
    }

    // ─── Store session mapping ───
    // UPDATE existing session — DO NOT overwrite! The session was created in
    // the connection handler and already has verified:true from TEA handshake.
    // Overwriting would lose the verified flag → joinRoom fails with ret=38.
    const existingSession = ctx.sessions.get(ctx.socket.id);
    if (existingSession) {
        existingSession.userId = userId;
        existingSession.serverId = serverId;
        existingSession.rooms = existingSession.rooms || [];
        // verified flag preserved from TEA handshake
    }

    // Also store reverse mapping: userId → socketId
    ctx.userSockets.set(userId, ctx.socket.id);

    ctx.logger.step(1, 1, 'Chat login', 'pass', `userId=${userId.substring(0, 16)}...`);
    ctx.logger.details('session',
        ['totalSessions', String(ctx.sessions.size)],
        ['totalUsers', String(ctx.userSockets.size)]
    );

    ctx.logger.summaryCard({
        title: 'CHAT LOGIN COMPLETE',
        userId: userId,
        fields: 0,
        duration: 0
    });

    // Return empty data — client doesn't read any fields from login response
    return ctx.buildDataResponse(0, {});
}

module.exports = handleChatLogin;
