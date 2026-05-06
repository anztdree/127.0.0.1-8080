/**
 * config.js — Chat-Server Configuration
 *
 * Port: 8002
 * TEA: enabled (key: 'verification')
 * Message storage: In-memory only
 * Rate limiting: Disabled
 */

module.exports = {
    // ─── Server ───
    port: 8002,
    serverId: '1',

    // ─── TEA Verification ───
    teaKey: 'verification',
    verifyEnable: true,

    // ─── Response ───
    server0Time: 25200000,  // UTC+7 offset (ms)

    // ─── Chat Room IDs (hardcode) ───
    worldRoomId: 'world_1',
    guildRoomId: 'guild_1',          // Hardcode — semua player 1 guild room
    teamDungeonChatRoom: 'teamDungeon_1',
    teamChatRoomId: 'team_1',

    // ─── Message Storage ───
    maxMessagesPerRoom: 100,          // Max messages kept per room in memory
    maxRecordReturn: 50,              // Max messages returned per getRecord/joinRoom

    // ─── Chat Cooldown (from constant.json newsInterval) ───
    // Client-side handles its own cooldown; server does NOT enforce rate limiting
    // Error code 36001 reserved but NOT used

    // ─── Client ───
    clientVersion: '1.0'
};
