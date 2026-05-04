/**
 * config.js — MAIN-SERVER Configuration
 * Referensi: main-server.md v4.0 Section 1, 3, 12
 *
 * Port: 8001
 * TEA: ON (verifyEnable = true)
 * Key: 'verification' — dari main.min.js Line 82582
 * server0Time: 25200000 (UTC+7 offset)
 * Resource JSON path: ../../resource/json (relative to this file)
 */

const path = require('path');

module.exports = {
    // ─── Server ───
    port: 8001,
    host: '0.0.0.0',
    dbFile: path.join(__dirname, 'data', 'main_server.db'),

    // ─── TEA Handshake ───
    teaEnabled: true,
    teaKey: 'verification',               // String literal main.min.js Line 82582

    // ─── Server Time ───
    server0Time: 25200000,                // UTC+7 = 25200000ms

    // ─── External Servers ───
    sdkServerUrl: 'http://127.0.0.1:9999',
    loginServerUrl: 'http://127.0.0.1:8000',
    chatServerUrl: 'http://127.0.0.1:8002',
    dungeonServerUrl: 'http://127.0.0.1:8003',

    // ─── Chat Server Parameters ───
    // Client membaca dari registChat response (main.min.js Line 114462)
    chatWorldRoomId: 'world_room',
    chatGuildRoomIdPrefix: 'guild_',
    chatTeamDungeonRoomPrefix: 'team_dungeon_',
    chatTeamRoomPrefix: 'team_',

    // ─── Resource Paths ───
    jsonResourcePath: path.join(__dirname, '..', '..', 'resource', 'json'),
    languagePath: path.join(__dirname, '..', '..', 'resource', 'language'),

    // ─── Daily Reset ───
    // Reset terjadi pada 06:00 UTC+7 (dibaca dari constant.json resetTime)
    dailyResetHour: 6,
    dailyResetTimezone: 'Asia/Jakarta',

    // ─── Response Compression ───
    compressThreshold: 4096,              // Bytes — diatas ini, LZString compress

    // ─── Client Parameters ───
    maxReconnectWaitMs: 600000,           // Client maxReconnectWaitTime
    clientTimeoutMs: 10000,               // Client processHandler timeout

    // ─── Limits ───
    maxOnlineUsers: 5000,                 // Error code 61 jika penuh

    // ─── Version ───
    version: '1.0'
};
