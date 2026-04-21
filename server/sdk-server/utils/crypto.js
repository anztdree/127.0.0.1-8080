/**
 * ============================================================================
 *  SDK Server v3 — Crypto Utilities
 *  ============================================================================
 *
 *  All cryptographic functions for SDK server:
 *    - hashPassword / verifyPassword — PBKDF2-SHA512
 *    - generateSalt — random 32 bytes → 64-char hex
 *    - generateLoginToken — timestamp_base36 + '_' + 48-char hex
 *    - generateSign — sha256(userId+token+secret).substring(0,32)
 *    - generateSecurity — random 16 bytes → 32-char hex
 *    - generateOrderId — ORD{padded}_{timestamp_base36}_{hex}
 *    - sanitizeUsername — alphanumeric + underscore only
 *
 *  Reference formats from existing data:
 *    Token:    "mnvwij4q_7b367e2dbeb88523dd136e33a3b7b809c25d71e282f1466c"  (57 chars)
 *    Sign:     "869ade36f9de1b26d4c9119fcf87d45b"                               (32 chars)
 *    Security: "4929977724e50a7101f078b08e273a45"                               (32 chars)
 *    Salt:     "6a0c25c606132d907ec453f3af8ee22dca9778176fe2a33d8298a6e926692513" (64 chars)
 *    PwHash:   "8dffe562121de441b60236ccd1ed74a1483d8341d4f0903c0a1db529fa01dc5f..." (128 chars)
 *
 * ============================================================================
 */

var crypto = require('crypto');
var CONSTANTS = require('../config/constants');

// =============================================
// PASSWORD
// =============================================

/**
 * Hash password — PBKDF2-SHA512 synchronous.
 * Output: 128-char hex string (64 bytes).
 */
function hashPassword(password, salt) {
    return crypto.pbkdf2Sync(
        password,
        salt,
        CONSTANTS.HASH_ITERATIONS,
        CONSTANTS.HASH_KEY_LENGTH,
        CONSTANTS.HASH_ALGORITHM
    ).toString('hex');
}

/**
 * Verify password with timing-safe comparison.
 */
function verifyPassword(password, salt, storedHash) {
    try {
        var computed = hashPassword(password, salt);
        return crypto.timingSafeEqual(
            Buffer.from(computed, 'hex'),
            Buffer.from(storedHash, 'hex')
        );
    } catch (e) {
        // Invalid hash/salt format → always fail
        return false;
    }
}

/**
 * Generate random salt — 32 bytes → 64-char hex.
 */
function generateSalt() {
    return crypto.randomBytes(CONSTANTS.SALT_LENGTH).toString('hex');
}

// =============================================
// TOKEN
// =============================================

/**
 * Generate login token.
 * Format: {8-char base36 timestamp}_{48-char hex}
 * Example: "mnvwij4q_7b367e2dbeb88523dd136e33a3b7b809c25d71e282f1466c"
 */
function generateLoginToken() {
    return Date.now().toString(36) + '_' + crypto.randomBytes(CONSTANTS.TOKEN_RANDOM_BYTES).toString('hex');
}

// =============================================
// SIGN & SECURITY
// =============================================

/**
 * Generate sign — sha256(userId + loginToken + SIGN_SECRET).substring(0, 32).
 * Used by main.min.js: ts.loginUserInfo.sign (line 88571)
 */
function generateSign(userId, loginToken) {
    return crypto.createHash('sha256')
        .update(userId + loginToken + CONSTANTS.SIGN_SECRET)
        .digest('hex')
        .substring(0, 32);
}

/**
 * Generate security code — 16 random bytes → 32-char hex.
 * Used by main.min.js: ts.loginInfo.userInfo.securityCode (line 88725)
 * Sent as ?security= URL param by sdk.js
 */
function generateSecurity() {
    return crypto.randomBytes(CONSTANTS.SECURITY_LENGTH).toString('hex');
}

// =============================================
// ORDER ID
// =============================================

/**
 * Generate order ID.
 * Format: ORD{6-padded num}_{8-char base36 timestamp}_{8-char hex}
 * Example: "ORD000001_mnvwiabc_7b367e2d"
 */
function generateOrderId(nextOrderNum) {
    var padded = String(nextOrderNum).padStart(6, '0');
    var ts = Date.now().toString(36);
    var rand = crypto.randomBytes(CONSTANTS.ORDER_RANDOM_BYTES).toString('hex');
    return 'ORD' + padded + '_' + ts + '_' + rand;
}

// =============================================
// SANITIZE
// =============================================

/**
 * Sanitize username — alphanumeric + underscore, max 20 chars.
 */
function sanitizeUsername(username) {
    return String(username || '').replace(/[^a-zA-Z0-9_]/g, '').substring(0, CONSTANTS.USERNAME_MAX_LENGTH);
}

module.exports = {
    hashPassword: hashPassword,
    verifyPassword: verifyPassword,
    generateSalt: generateSalt,
    generateLoginToken: generateLoginToken,
    generateSign: generateSign,
    generateSecurity: generateSecurity,
    generateOrderId: generateOrderId,
    sanitizeUsername: sanitizeUsername
};
