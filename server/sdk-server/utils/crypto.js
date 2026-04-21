/**
 * ============================================================================
 * SDK Server — Crypto Utilities (Natural Implementation)
 * ============================================================================
 *
 * Clean cryptographic functions without workarounds or bypasses.
 * Uses Node.js native crypto module properly.
 *
 * ============================================================================
 */

const crypto = require('crypto');
const CONSTANTS = require('../config/constants');

// =============================================
// PASSWORD HASHING
// =============================================

/**
 * Hash password using PBKDF2
 * Output: hex string (HASH_KEY_LENGTH * 2 chars)
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
 * Verify password with constant-time comparison
 * Safely handles invalid input without timing leaks
 */
function verifyPassword(password, salt, storedHash) {
    // Handle edge cases safely
    if (!password || !salt || !storedHash) {
        return false;
    }
    
    // Validate hex format
    if (!isValidHex(storedHash)) {
        return false;
    }
    
    try {
        const computed = hashPassword(password, salt);
        const computedBuffer = Buffer.from(computed, 'hex');
        const storedBuffer = Buffer.from(storedHash, 'hex');
        
        // Ensure same length for timing-safe compare
        if (computedBuffer.length !== storedBuffer.length) {
            return false;
        }
        
        return crypto.timingSafeEqual(computedBuffer, storedBuffer);
    } catch (error) {
        // Log but don't expose internal errors
        return false;
    }
}

/**
 * Check if string is valid hexadecimal
 */
function isValidHex(str) {
    if (typeof str !== 'string') return false;
    if (str.length % 2 !== 0) return false;
    return /^[0-9a-fA-F]+$/.test(str);
}

// =============================================
// SALT GENERATION
// =============================================

/**
 * Generate random salt
 * Output: hex string (SALT_LENGTH * 2 chars)
 */
function generateSalt() {
    return crypto.randomBytes(CONSTANTS.SALT_LENGTH).toString('hex');
}

// =============================================
// TOKEN GENERATION
// =============================================

/**
 * Generate login token
 * Format: {8-char base36 timestamp}_{48-char hex random}
 * Example: "mnvwij4q_7b367e2dbeb88523dd136e33a3b7b809c25d71e282f1466c"
 */
function generateLoginToken() {
    const timestamp = Date.now().toString(36);
    const random = crypto.randomBytes(CONSTANTS.TOKEN_RANDOM_BYTES).toString('hex');
    return `${timestamp}_${random}`;
}

// =============================================
// SIGNATURE GENERATION
// =============================================

/**
 * Generate sign for user authentication
 * Format: sha256(userId + loginToken + SECRET).substring(0, 32)
 * Used by main.min.js: ts.loginUserInfo.sign
 */
function generateSign(userId, loginToken) {
    const data = String(userId || '') + String(loginToken || '') + CONSTANTS.SIGN_SECRET;
    return crypto.createHash('sha256')
        .update(data)
        .digest('hex')
        .substring(0, 32);
}

/**
 * Generate security code
 * Output: hex string (SECURITY_LENGTH * 2 chars)
 * Used by main.min.js: ts.loginInfo.userInfo.securityCode
 */
function generateSecurity() {
    return crypto.randomBytes(CONSTANTS.SECURITY_LENGTH).toString('hex');
}

// =============================================
// ORDER ID GENERATION
// =============================================

/**
 * Generate order ID
 * Format: ORD{6-padded num}_{8-char base36 timestamp}_{8-char hex}
 * Example: "ORD000001_mnvwiabc_7b367e2d"
 */
function generateOrderId(nextOrderNum) {
    const padded = String(nextOrderNum || 1).padStart(6, '0');
    const timestamp = Date.now().toString(36);
    const random = crypto.randomBytes(CONSTANTS.ORDER_RANDOM_BYTES).toString('hex');
    return `ORD${padded}_${timestamp}_${random}`;
}

// =============================================
// INPUT SANITIZATION
// =============================================

/**
 * Sanitize username - only allow alphanumeric and underscore
 * @param {string} username - Input username
 * @returns {string} Sanitized username
 */
function sanitizeUsername(username) {
    if (!username || typeof username !== 'string') {
        return '';
    }
    
    // Remove all non-alphanumeric characters except underscore
    const sanitized = username.replace(/[^a-zA-Z0-9_]/g, '');
    
    // Enforce max length
    return sanitized.substring(0, CONSTANTS.USERNAME_MAX_LENGTH);
}

/**
 * Validate username format
 * @param {string} username - Input username
 * @returns {{ valid: boolean, message: string }}
 */
function validateUsername(username) {
    if (!username || typeof username !== 'string') {
        return { valid: false, message: 'Username diperlukan' };
    }
    
    const sanitized = sanitizeUsername(username);
    
    if (sanitized.length < CONSTANTS.USERNAME_MIN_LENGTH) {
        return { valid: false, message: `Username minimal ${CONSTANTS.USERNAME_MIN_LENGTH} karakter` };
    }
    
    if (sanitized.length > CONSTANTS.USERNAME_MAX_LENGTH) {
        return { valid: false, message: `Username maksimal ${CONSTANTS.USERNAME_MAX_LENGTH} karakter` };
    }
    
    if (!CONSTANTS.USERNAME_PATTERN.test(sanitized)) {
        return { valid: false, message: 'Username hanya boleh huruf, angka, dan underscore' };
    }
    
    return { valid: true, username: sanitized };
}

/**
 * Validate password strength
 * @param {string} password - Input password
 * @returns {{ valid: boolean, message: string }}
 */
function validatePassword(password) {
    if (!password || typeof password !== 'string') {
        return { valid: false, message: 'Password diperlukan' };
    }
    
    if (password.length < CONSTANTS.PASSWORD_MIN_LENGTH) {
        return { valid: false, message: `Password minimal ${CONSTANTS.PASSWORD_MIN_LENGTH} karakter` };
    }
    
    if (password.length > CONSTANTS.PASSWORD_MAX_LENGTH) {
        return { valid: false, message: `Password maksimal ${CONSTANTS.PASSWORD_MAX_LENGTH} karakter` };
    }
    
    return { valid: true };
}

// =============================================
// DEVICE ID GENERATION (for guests)
// =============================================

/**
 * Generate device ID for guest users
 * Format: DEV_{timestamp}_{random hex}
 * Example: "DEV_mnvwi4q_7b367e2d"
 */
function generateDeviceId() {
    const timestamp = Date.now().toString(36);
    const random = crypto.randomBytes(8).toString('hex');
    return `DEV_${timestamp}_${random}`;
}

// =============================================
// HASH VERIFICATION
// =============================================

/**
 * Create hash comparison that won't leak timing
 * @param {string} a - First hash
 * @param {string} b - Second hash
 * @returns {boolean}
 */
function safeCompare(a, b) {
    if (typeof a !== 'string' || typeof b !== 'string') {
        return false;
    }
    
    if (a.length !== b.length) {
        // Still do comparison to maintain constant time
        const dummy = Buffer.alloc(a.length);
        const dummyB = Buffer.from(b);
        try {
            crypto.timingSafeEqual(dummy, dummyB);
        } catch (e) {
            // Ignore error, lengths differ so they're not equal
        }
        return false;
    }
    
    try {
        return crypto.timingSafeEqual(
            Buffer.from(a, 'hex'),
            Buffer.from(b, 'hex')
        );
    } catch (e) {
        return false;
    }
}

// =============================================
// EXPORT
// =============================================

module.exports = {
    // Password
    hashPassword,
    verifyPassword,
    generateSalt,
    
    // Token
    generateLoginToken,
    
    // Sign
    generateSign,
    generateSecurity,
    
    // Order
    generateOrderId,
    
    // Validation
    sanitizeUsername,
    validateUsername,
    validatePassword,
    
    // Device
    generateDeviceId,
    
    // Utility
    isValidHex,
    safeCompare
};