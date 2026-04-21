/**
 * ============================================================================
 * SDK Server — Constants & Configuration
 * ============================================================================
 *
 * Natural Configuration - No overrides, no bypass
 * All values match sdk.js (client) requirements
 *
 * ============================================================================
 */

var path = require('path');

// =============================================
// SERVER
// =============================================

/** Server port */
const PORT = parseInt(process.env.PORT) || 9999;

/** Host binding - 0.0.0.0 for LAN access */
const HOST = process.env.HOST || '0.0.0.0';

/** Base directory for data files */
const DATA_DIR = path.join(__dirname, '..', 'data');

// =============================================
// DEVELOPMENT MODE
// =============================================

/** Enable verbose logging in development */
const IS_DEV = process.argv.includes('--dev') || process.env.NODE_ENV === 'development';

// =============================================
// SDK CHANNEL & APP ID
// =============================================

/**
 * Default SDK channel - MUST be 'ppgame' per sdk.js SDK_CONFIG.CHANNEL
 * Used in:
 * - User default sdk field
 * - getServerList (fromChannel)
 * - loginGame response (channelCode)
 */
const DEFAULT_SDK_CHANNEL = 'ppgame';

/**
 * Default App ID - MUST be '288' per sdk.js SDK_CONFIG.APP_ID
 * Used in:
 * - ReportSdkInfoXX (main.min.js line 52484)
 * - login-server subChannel field
 * - analytics event appId field
 */
const DEFAULT_APP_ID = '288';

// =============================================
// CRYPTO
// =============================================

/**
 * Secret for sign generation
 * Format: sha256(userId + loginToken + SECRET).substring(0, 32)
 */
const SIGN_SECRET = process.env.SDK_SIGN_SECRET || 'sdk_sign_secret_2024';

/** PBKDF2 iterations for password hashing */
const HASH_ITERATIONS = 10000;

/** PBKDF2 key length (bytes) - produces 64 char hex */
const HASH_KEY_LENGTH = 32; // Changed from 64 to match actual usage

/** PBKDF2 hash algorithm */
const HASH_ALGORITHM = 'sha256'; // Changed from sha512 for better compatibility

/** Salt length (bytes) */
const SALT_LENGTH = 32;

/** Security code length (bytes) */
const SECURITY_LENGTH = 16;

/** Login token random bytes */
const TOKEN_RANDOM_BYTES = 24;

/** Order ID random bytes */
const ORDER_RANDOM_BYTES = 4;

// =============================================
// SESSION
// =============================================

/** Session duration: 7 days (ms) */
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

/** Session cleanup interval (ms) - every 30 minutes */
const SESSION_CLEANUP_INTERVAL_MS = 30 * 60 * 1000;

// =============================================
// RATE LIMITING
// =============================================

/** Rate limit configs per endpoint type */
const RATE_LIMITS = {
    LOGIN: { maxRequests: 10, windowMs: 60000 },
    REGISTER: { maxRequests: 5, windowMs: 60000 },
    GUEST: { maxRequests: 10, windowMs: 60000 },
    PAYMENT: { maxRequests: 20, windowMs: 60000 },
    REPORT: { maxRequests: 60, windowMs: 60000 },
    GENERAL: { maxRequests: 30, windowMs: 60000 }
};

/** Rate limit store cleanup interval (ms) - every 5 minutes */
const RATE_LIMIT_CLEANUP_MS = 5 * 60 * 1000;

/** Rate limit stale entry threshold (ms) - 10 minutes */
const RATE_LIMIT_STALE_MS = 10 * 60 * 1000;

// =============================================
// ANALYTICS
// =============================================

/** Max events before rotation */
const MAX_ANALYTICS_EVENTS = 50000;

/** Archive percentage when rotating (80%) */
const ANALYTICS_ARCHIVE_PERCENT = 0.8;

/** Analytics rotation interval (ms) - every 30 minutes */
const ANALYTICS_ROTATION_INTERVAL_MS = 30 * 60 * 1000;

/** Analytics archive subdirectory */
const ANALYTICS_ARCHIVE_DIR = 'archive';

// =============================================
// USER VALIDATION
// =============================================

/** Username minimum length */
const USERNAME_MIN_LENGTH = 3;

/** Username maximum length */
const USERNAME_MAX_LENGTH = 20;

/** Password minimum length */
const PASSWORD_MIN_LENGTH = 4;

/** Password maximum length */
const PASSWORD_MAX_LENGTH = 32;

/** Username pattern: alphanumeric + underscore only */
const USERNAME_PATTERN = /^[a-zA-Z0-9_]+$/;

// =============================================
// EXPRESS & CORS
// =============================================

/** JSON body size limit */
const BODY_LIMIT = '5mb';

/** Request timeout (ms) */
const REQUEST_TIMEOUT_MS = 30000;

/**
 * CORS Configuration - Natural Express approach
 * Using standard cors middleware with proper origin handling
 */
const CORS_CONFIG = {
    // Allow specific origins in production, * for development
    origin: process.env.CORS_ORIGIN || '*',
    
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    
    allowedHeaders: [
        'Content-Type',
        'X-SDK-Channel',
        'X-Session-ID',
        'X-SDK-AppId',
        'X-SDK-Version',
        'X-Request-ID',
        'X-Login-Token',
        'X-User-Id',
        'X-Forwarded-For'
    ],
    
    exposedHeaders: ['Content-Type', 'X-SDK-Channel', 'X-RateLimit-Remaining'],
    
    // Credentials should match CORS_ORIGIN setting
    // If CORS_ORIGIN is specific domain, set credentials: true
    // If CORS_ORIGIN is *, keep credentials: false
    credentials: process.env.CORS_ORIGIN && process.env.CORS_ORIGIN !== '*',
    
    maxAge: 86400
};

// =============================================
// EXPORT
// =============================================

module.exports = {
    // Server
    PORT,
    HOST,
    DATA_DIR,
    
    // Development
    IS_DEV,
    
    // SDK Config
    DEFAULT_SDK_CHANNEL,
    DEFAULT_APP_ID,
    
    // Crypto
    SIGN_SECRET,
    HASH_ITERATIONS,
    HASH_KEY_LENGTH,
    HASH_ALGORITHM,
    SALT_LENGTH,
    SECURITY_LENGTH,
    TOKEN_RANDOM_BYTES,
    ORDER_RANDOM_BYTES,
    
    // Session
    SESSION_DURATION_MS,
    SESSION_CLEANUP_INTERVAL_MS,
    
    // Rate Limiting
    RATE_LIMITS,
    RATE_LIMIT_CLEANUP_MS,
    RATE_LIMIT_STALE_MS,
    
    // Analytics
    MAX_ANALYTICS_EVENTS,
    ANALYTICS_ARCHIVE_PERCENT,
    ANALYTICS_ROTATION_INTERVAL_MS,
    ANALYTICS_ARCHIVE_DIR,
    
    // User
    USERNAME_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    USERNAME_PATTERN,
    
    // Express
    BODY_LIMIT,
    REQUEST_TIMEOUT_MS,
    CORS_CONFIG
};