/**
 * ============================================================================
 * Login Server — IP Rate Limiter
 * ============================================================================
 *
 * NATURAL IMPLEMENTATION:
 * - Simple attempt counter with ban
 * - In-memory store (Map)
 * - Auto cleanup stale entries
 *
 * Protects against brute force login attacks.
 * 5 failed attempts / 60s → 5 min ban
 *
 * ============================================================================
 */

const CONSTANTS = require('../config/constants');
const logger = require('../utils/logger');

// In-memory store: ip → { attempts: [timestamp], bannedUntil: timestamp }
const _store = new Map();

const RateLimiter = {

    /**
     * Check if IP is allowed to attempt login
     * 
     * @param {string} ip - Client IP
     * @returns {boolean} Allowed or not
     */
    check(ip) {
        if (!ip) return true;
        
        const entry = _store.get(ip);
        if (!entry) return true;

        // Currently banned?
        if (entry.bannedUntil && Date.now() < entry.bannedUntil) {
            return false;
        }

        // Ban expired → clear
        if (entry.bannedUntil && Date.now() >= entry.bannedUntil) {
            entry.bannedUntil = 0;
            entry.attempts = [];
        }

        // Filter attempts within window
        const windowStart = Date.now() - CONSTANTS.RATE_WINDOW_MS;
        entry.attempts = entry.attempts.filter(ts => ts > windowStart);
        
        return entry.attempts.length < CONSTANTS.RATE_MAX_ATTEMPTS;
    },

    /**
     * Record failed attempt
     * 
     * @param {string} ip - Client IP
     */
    recordFail(ip) {
        if (!ip) return;
        
        if (!_store.has(ip)) {
            _store.set(ip, { attempts: [], bannedUntil: 0 });
        }
        
        const entry = _store.get(ip);
        entry.attempts.push(Date.now());
        
        // Check if should ban
        if (entry.attempts.length >= CONSTANTS.RATE_MAX_ATTEMPTS) {
            entry.bannedUntil = Date.now() + CONSTANTS.RATE_BAN_MS;
            logger.warn('RateLimiter', 
                `IP ${ip} banned for ${CONSTANTS.RATE_BAN_MS / 1000}s`);
        }
    },

    /**
     * Reset on success (clear entry)
     * 
     * @param {string} ip - Client IP
     */
    recordSuccess(ip) {
        if (ip) {
            _store.delete(ip);
        }
    },

    /**
     * Cleanup old entries
     */
    cleanup() {
        const cutoff = Date.now() - CONSTANTS.RATE_WINDOW_MS - CONSTANTS.RATE_BAN_MS;
        
        for (const [key, entry] of _store) {
            // Remove expired bans
            if (entry.bannedUntil && Date.now() >= entry.bannedUntil) {
                _store.delete(key);
            } else {
                // Clean old attempts
                entry.attempts = entry.attempts.filter(ts => ts > cutoff);
                if (entry.attempts.length === 0 && !entry.bannedUntil) {
                    _store.delete(key);
                }
            }
        }
    },

    /**
     * Get store stats (for debugging)
     * 
     * @returns {Object} Store statistics
     */
    getStats() {
        let total = 0;
        let banned = 0;
        const now = Date.now();
        
        for (const [, entry] of _store) {
            total++;
            if (entry.bannedUntil && now < entry.bannedUntil) {
                banned++;
            }
        }
        
        return {
            totalEntries: total,
            bannedEntries: banned,
            maxAttempts: CONSTANTS.RATE_MAX_ATTEMPTS,
            windowMs: CONSTANTS.RATE_WINDOW_MS,
            banMs: CONSTANTS.RATE_BAN_MS
        };
    }
};

// Cleanup every 10 minutes
setInterval(() => RateLimiter.cleanup(), CONSTANTS.RATE_CLEANUP_MS);

module.exports = RateLimiter;