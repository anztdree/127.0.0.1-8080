/**
 * config.js — CHAT-SERVER Configuration
 *
 * Port: 8002
 * Transport: Socket.IO 2.5.1
 * TEA: ON (key = 'verification') — L113445: chatClient = new TSSocketClient('chat-server', true)
 *
 * Referensi main.min.js:
 *   L82537: io.connect(chatServerUrl, { reconnectionAttempts: 10 })
 *   L82579-82587: TEA verify handshake (same key as main-server)
 */

module.exports = {
    port: parseInt(process.env.CHAT_PORT) || 8002,
    host: '0.0.0.0',
    teaKey: 'verification',                   // L82582 — same as main-server
    compressionThreshold: 1024,               // Same as main-server L39134
    server0Time: 25200000,                    // UTC+7 offset ms (same as main-server)
    maxRoomMessages: 100,                     // Max messages stored per room
    maxMessageLength: 500                     // Max chat message content length
};
