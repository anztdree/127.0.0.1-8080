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
 * CALLBACK BEHAVIOR (L114557):
 *   Client does NOT read any fields from response data.
 *   Immediately starts joining rooms via Promise.all:
 *     L114566: chatJoinRequest(worldRoomId)          — ALWAYS
 *     L114568: if(guildRoomId) chatJoinRequest(guildRoomId)    — OPTIONAL
 *     L114579: if(teamDungeonChatRoom) chatJoinRequest(...)    — OPTIONAL
 *     L114590: if(teamChatRoomId) chatJoinRequest(...)         — OPTIONAL
 *
 * RESPONSE: ret=0, data={} (empty — client reads nothing)
 *
 * SERVER BEHAVIOR:
 *   1. Validate userId, serverId
 *   2. Store session mapping (userId → socketId)
 *   3. Read user profile dari main_server.json (via db.readFromMainServer)
 *   4. Cache profile di chat-server SQLite (via db.syncUser)
 *      → Profil ini digunakan oleh sendMsg untuk mengisi _name, _image, dll
 *
 * USER PROFILE FLOW:
 *   Client TIDAK mengirim _nickName / _headImage ke chat-server.
 *   Client hanya kirim userId + serverId.
 *   Chat-server baca profil dari main_server.json:
 *     - Key: "user_{userId}"
 *     - Field: user._nickName, user._headImage, user._oriServerId, dll
 *   Profil di-cache di SQLite untuk performa (baca file hanya sekali per login).
 *
 * REQUEST FIELDS:
 *   userId   : string — from UserInfoSingleton.getInstance().userId
 *   serverId : string/number — from UserInfoSingleton.getInstance().getServerId()
 *   version  : string — always '1.0'
 *
 * STRICT RULES: NO STUB, OVERRIDE, FORCE, BYPASS, DUMMY, ASUMSI
 */

function handleChatLogin(request, ctx) {
    const { userId, serverId } = request;

    ctx.logger.step(1, 2, 'Chat login', 'running');
    ctx.logger.details('request',
        ['userId', userId ? userId.substring(0, 20) : 'MISSING'],
        ['serverId', String(serverId || '?')],
        ['socketId', ctx.socket.id.substring(0, 16) + '...']
    );

    // ─── STEP 1: Validate ───
    if (!userId) {
        ctx.logger.step(1, 2, 'Chat login', 'fail', 'userId MISSING ❌');
        return ctx.buildErrorResponse(8);
    }

    // ─── STEP 2: Update session mapping ───
    // UPDATE existing session — DO NOT overwrite!
    // Session dibuat di connection handler dan sudah punya verified:true dari TEA handshake.
    // Overwrite akan hilangkan verified flag → joinRoom gagal ret=38.
    const existingSession = ctx.sessions.get(ctx.socket.id);
    if (existingSession) {
        existingSession.userId = userId;
        existingSession.serverId = serverId;
        existingSession.rooms = existingSession.rooms || [];
        // verified flag preserved dari TEA handshake
    }

    // Reverse mapping: userId → socketId (untuk reference)
    ctx.userSockets.set(userId, ctx.socket.id);

    ctx.logger.step(1, 2, 'Chat login', 'pass', 'session updated');

    // ─── STEP 3: Sync user profile dari main_server.json → SQLite cache ───
    ctx.logger.step(2, 2, 'Sync profile', 'running');

    const mainProfile = ctx.db.readFromMainServer(userId);

    if (mainProfile) {
        // Profile ditemukan di main-server → cache ke SQLite
        ctx.db.syncUser(mainProfile);
        ctx.logger.step(2, 2, 'Sync profile', 'pass',
            `nick="${mainProfile.nickName}" image="${mainProfile.headImage}"`);
    } else {
        // Profile tidak ditemukan → buat default (nama kosong, image kosong)
        // Ini normal untuk user baru yang belum pernah login ke main-server
        ctx.db.syncUser({
            userId: userId,
            serverId: Number(serverId) || 1,
            nickName: '',
            headImage: '',
            headEffect: 0,
            headBox: 0,
            oriServerId: 0,
            vipLevel: 0,
            level: 1
        });
        ctx.logger.step(2, 2, 'Sync profile', 'pass', 'no main-server profile — using defaults');
    }

    ctx.logger.details('session',
        ['totalSessions', String(ctx.sessions.size)],
        ['totalUsers', String(ctx.userSockets.size)]
    );

    // ─── Response: empty data — client tidak baca apapun ───
    return ctx.buildDataResponse(0, {});
}

module.exports = handleChatLogin;
