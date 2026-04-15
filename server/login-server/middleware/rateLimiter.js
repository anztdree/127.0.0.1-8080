/**
 * Login Server - Rate Limiter
 * 
 * Protects against brute force login attacks.
 * In-memory per-IP tracking with configurable thresholds.
 * 
 * Rate limit config:
 *   - 5 failed login attempts per 60 seconds per IP
 *   - 5 minute ban after exceeding limit
 * 
 * Usage:
 *   rateLimiter.check(ip)       → true if allowed
 *   rateLimiter.recordFail(ip)  → record a failed attempt
 *   rateLimiter.recordSuccess(ip) → reset counter on success
 */

const { RATE_LIMIT } = require('../utils/loginConstants');
const { warn, info } = require('../../shared/utils/logger');

// In-memory store: ip → { attempts: [{timestamp}], bannedUntil: 0 }
const _store = new Map();

const RateLimiter = {
    /**
     * Check if an IP is allowed to attempt login
     * @param {string} ip - Client IP address
     * @returns {boolean} true if allowed, false if rate limited
     */
    check(ip) {
        if (!ip) return true;

        const entry = _store.get(ip);
        if (!entry) return true;

        // Check if currently banned
        if (entry.bannedUntil && Date.now() < entry.bannedUntil) {
            return false;
        }

        // Ban expired — clear it
        if (entry.bannedUntil && Date.now() >= entry.bannedUntil) {
            entry.bannedUntil = 0;
            entry.attempts = [];
            return true;
        }

        // Filter attempts within the window
        const windowStart = Date.now() - RATE_LIMIT.windowMs;
        entry.attempts = entry.attempts.filter(ts => ts > windowStart);

        return entry.attempts.length < RATE_LIMIT.maxAttempts;
    },

    /**
     * Record a failed login attempt
     * @param {string} ip - Client IP address
     */
    recordFail(ip) {
        if (!ip) return;

        if (!_store.has(ip)) {
            _store.set(ip, { attempts: [], bannedUntil: 0 });
        }

        const entry = _store.get(ip);
        entry.attempts.push(Date.now());

        // Check if threshold exceeded → apply ban
        if (entry.attempts.length >= RATE_LIMIT.maxAttempts) {
            entry.bannedUntil = Date.now() + RATE_LIMIT.banDurationMs;
            warn('RateLimiter', `IP ${ip} banned for ${RATE_LIMIT.banDurationMs / 1000}s after ${RATE_LIMIT.maxAttempts} failed attempts`);
        }
    },

    /**
     * Reset counter on successful login
     * @param {string} ip - Client IP address
     */
    recordSuccess(ip) {
        if (ip && _store.has(ip)) {
            _store.delete(ip);
        }
    },

    /**
     * Get remaining attempts for an IP (for logging)
     * @param {string} ip
     * @returns {number}
     */
    getRemaining(ip) {
        if (!ip) return RATE_LIMIT.maxAttempts;
        const entry = _store.get(ip);
        if (!entry) return RATE_LIMIT.maxAttempts;

        const windowStart = Date.now() - RATE_LIMIT.windowMs;
        const recent = entry.attempts.filter(ts => ts > windowStart);
        return Math.max(0, RATE_LIMIT.maxAttempts - recent.length);
    },

    /**
     * Cleanup old entries (call periodically)
     */
    cleanup() {
        const windowStart = Date.now() - RATE_LIMIT.windowMs - RATE_LIMIT.banDurationMs;
        for (const [ip, entry] of _store.entries()) {
            if (entry.bannedUntil && Date.now() >= entry.bannedUntil) {
                _store.delete(ip);
            } else {
                entry.attempts = entry.attempts.filter(ts => ts > windowStart);
                if (entry.attempts.length === 0 && !entry.bannedUntil) {
                    _store.delete(ip);
                }
            }
        }
    },
};

// Cleanup every 10 minutes
setInterval(() => {
    RateLimiter.cleanup();
}, 10 * 60 * 1000);

module.exports = RateLimiter;
