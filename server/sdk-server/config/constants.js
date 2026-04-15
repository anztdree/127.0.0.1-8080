/**
 * ============================================================================
 *  SDK Server — Constants & Configuration
 *  ============================================================================
 *
 *  Semua konfigurasi SDK server dalam satu file.
 *  Nilai default diselaraskan dengan:
 *    - sdk.js (client): APP_ID '288', CHANNEL 'ppgame'
 *    - data/users.json (existing data): sdk 'ppgame', appId '288'
 *    - data/sessions.json (existing data): 7 hari expiry
 *
 *  CRITICAL FIX dari existing index.js:
 *    - DEFAULT_SDK_CHANNEL: 'en' → 'ppgame' (fix S1)
 *    - DEFAULT_APP_ID: '1' → '288' (fix S2)
 *
 * ============================================================================
 */

var path = require('path');

module.exports = {
    // =============================================
    // SERVER
    // =============================================

    /** Port SDK server — Express HTTP */
    PORT: process.env.PORT || 9999,

    /** Base directory untuk data files */
    DATA_DIR: path.join(__dirname, '..', 'data'),

    // =============================================
    // SDK CHANNEL & APP ID
    // =============================================

    /**
     * Default SDK channel untuk user baru.
     * HARUS 'ppgame' — sesuai sdk.js SDK_CONFIG.CHANNEL
     * dan semua existing user di data/users.json.
     *
     * Nilai ini dikirim ke login-server sebagai:
     *   - fromChannel (di getServerList)
     *   - channelCode (di loginGame response)
     *
     * main.min.js ts.loginUserInfo.sdk = o.sdk (dari getSdkLoginInfo)
     */
    DEFAULT_SDK_CHANNEL: 'ppgame',

    /**
     * Default App ID.
     * HARUS '288' — sesuai sdk.js SDK_CONFIG.APP_ID
     * dan semua existing user di data/users.json yang punya field appId.
     *
     * Digunakan di:
     *   - ReportSdkInfoXX (main.min.js line 52484)
     *   - login-server subChannel field
     *   - analytics event appId field
     */
    DEFAULT_APP_ID: '288',

    // =============================================
    // CRYPTO
    // =============================================

    /**
     * Secret key untuk generate sign (signature).
     * Format: sha256(userId + loginToken + SIGN_SECRET).substring(0, 32)
     *
     * Digunakan oleh:
     *   - ts.loginUserInfo.sign (main.min.js line 88571)
     *   - ReportToSdkCommon sign field (main.min.js line 52504)
     */
    SIGN_SECRET: 'sdk_sign_secret_2024',

    /** PBKDF2 iterations untuk password hashing */
    HASH_ITERATIONS: 10000,

    /** PBKDF2 key length (bytes) */
    HASH_KEY_LENGTH: 64,

    /** PBKDF2 hash algorithm */
    HASH_ALGORITHM: 'sha512',

    /** Salt length (bytes, akan di-encode jadi hex string) */
    SALT_LENGTH: 32,

    /** Security code length (bytes, hex string) */
    SECURITY_LENGTH: 16,

    // =============================================
    // SESSION
    // =============================================

    /** Session duration: 7 hari (ms) — sesuai existing data/sessions.json */
    SESSION_DURATION_MS: 7 * 24 * 60 * 60 * 1000,

    /** Cleanup interval untuk expired sessions (ms) — setiap 30 menit */
    SESSION_CLEANUP_INTERVAL_MS: 30 * 60 * 1000,

    // =============================================
    // RATE LIMITING
    // =============================================

    /** Rate limit config per endpoint type */
    RATE_LIMITS: {
        /** Login — 10 request / 60 detik per IP */
        LOGIN: { maxRequests: 10, windowMs: 60000 },

        /** Register — 5 request / 60 detik per IP */
        REGISTER: { maxRequests: 5, windowMs: 60000 },

        /** Guest — 10 request / 60 detik per IP */
        GUEST: { maxRequests: 10, windowMs: 60000 },

        /** Payment — 20 request / 60 detik per IP */
        PAYMENT: { maxRequests: 20, windowMs: 60000 },

        /** Report/Analytics — 60 request / 60 detik per IP */
        REPORT: { maxRequests: 60, windowMs: 60000 },

        /** General API — 30 request / 60 detik per IP */
        GENERAL: { maxRequests: 30, windowMs: 60000 }
    },

    /** Rate limit store cleanup interval (ms) — setiap 5 menit */
    RATE_LIMIT_CLEANUP_MS: 5 * 60 * 1000,

    /** Rate limit stale entry threshold (ms) — 10 menit */
    RATE_LIMIT_STALE_MS: 10 * 60 * 1000,

    // =============================================
    // ANALYTICS
    // =============================================

    /** Maksimal events sebelum rotation */
    MAX_ANALYTICS_EVENTS: 50000,

    /** Persentase events yang di-archive saat rotation (80%) */
    ANALYTICS_ARCHIVE_PERCENT: 0.8,

    /** Analytics rotation interval (ms) — setiap 30 menit */
    ANALYTICS_ROTATION_INTERVAL_MS: 30 * 60 * 1000,

    /** Analytics archive subdirectory */
    ANALYTICS_ARCHIVE_DIR: 'archive',

    // =============================================
    // USER
    // =============================================

    /** Username minimum length */
    USERNAME_MIN_LENGTH: 3,

    /** Username maximum length */
    USERNAME_MAX_LENGTH: 20,

    /** Password minimum length */
    PASSWORD_MIN_LENGTH: 4,

    /** Password maximum length */
    PASSWORD_MAX_LENGTH: 32,

    /** Karakter yang diizinkan untuk username: alphanumeric + underscore */
    USERNAME_PATTERN: /^[a-zA-Z0-9_]+$/,

    // =============================================
    // LOGIN TOKEN FORMAT
    // =============================================

    /**
     * Login token format: timestamp_base36 + '_' + random_hex
     * Contoh: "mnvwij4q_7b367e2dbeb88523dd136e33a3b7b809c25d71e282f1466c"
     * (dari data/sessions.json existing)
     */
    TOKEN_RANDOM_BYTES: 24,

    // =============================================
    // ORDER ID FORMAT
    // =============================================

    /**
     * Order ID format: ORD + padded_num + '_' + timestamp_base36 + '_' + random_hex
     * Contoh: ORD000001_mnvwiabc_7b367e2d
     */
    ORDER_RANDOM_BYTES: 4,

    // =============================================
    // CORS
    // =============================================

    /** CORS configuration */
    CORS: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type',
            'X-SDK-Channel',
            'X-Session-ID',
            'X-SDK-AppId',
            'X-SDK-Version',
            'X-Request-ID'
        ],
        exposedHeaders: ['Content-Type', 'X-SDK-Channel', 'X-RateLimit-Remaining'],
        credentials: false,
        maxAge: 86400,
        preflightContinue: false,
        optionsSuccessStatus: 204
    },

    // =============================================
    // EXPRESS
    // =============================================

    /** JSON body size limit */
    BODY_LIMIT: '5mb',

    /** XHR timeout (ms) — reference untuk dokumentasi, tidak dipakai server-side */
    REQUEST_TIMEOUT_MS: 30000
};
