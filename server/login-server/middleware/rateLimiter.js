/**
 * Login Server — IP Rate Limiter
 *
 * Protects against brute force login attacks.
 * 5 failed attempts / 60s → 5 min ban
 */

var CONSTANTS = require('../config/constants');
var logger = require('../utils/logger');

var _store = new Map(); // ip → { attempts:[ts], bannedUntil:0 }

var RateLimiter = {

    /**
     * Check if IP is allowed to attempt login
     * @param {string} ip
     * @returns {boolean}
     */
    check(ip) {
        if (!ip) return true;
        var entry = _store.get(ip);
        if (!entry) return true;

        // Currently banned?
        if (entry.bannedUntil && Date.now() < entry.bannedUntil) return false;

        // Ban expired → clear
        if (entry.bannedUntil && Date.now() >= entry.bannedUntil) {
            entry.bannedUntil = 0;
            entry.attempts = [];
            return true;
        }

        // Filter attempts within window
        var windowStart = Date.now() - CONSTANTS.RATE_WINDOW_MS;
        entry.attempts = entry.attempts.filter(function (ts) { return ts > windowStart; });
        return entry.attempts.length < CONSTANTS.RATE_MAX_ATTEMPTS;
    },

    /**
     * Record failed attempt
     * @param {string} ip
     */
    recordFail(ip) {
        if (!ip) return;
        if (!_store.has(ip)) _store.set(ip, { attempts: [], bannedUntil: 0 });
        var entry = _store.get(ip);
        entry.attempts.push(Date.now());
        if (entry.attempts.length >= CONSTANTS.RATE_MAX_ATTEMPTS) {
            entry.bannedUntil = Date.now() + CONSTANTS.RATE_BAN_MS;
            logger.warn('RateLimiter', 'IP ' + ip + ' banned ' + (CONSTANTS.RATE_BAN_MS / 1000) + 's');
        }
    },

    /**
     * Reset on success
     * @param {string} ip
     */
    recordSuccess(ip) {
        if (ip) _store.delete(ip);
    },

    /**
     * Cleanup old entries (called periodically)
     */
    cleanup() {
        var cutoff = Date.now() - CONSTANTS.RATE_WINDOW_MS - CONSTANTS.RATE_BAN_MS;
        for (var key of _store.keys()) {
            var entry = _store.get(key);
            if (entry.bannedUntil && Date.now() >= entry.bannedUntil) {
                _store.delete(key);
            } else {
                entry.attempts = entry.attempts.filter(function (ts) { return ts > cutoff; });
                if (entry.attempts.length === 0 && !entry.bannedUntil) _store.delete(key);
            }
        }
    },
};

// Cleanup every 10 minutes
setInterval(function () { RateLimiter.cleanup(); }, CONSTANTS.RATE_CLEANUP_MS);

module.exports = RateLimiter;
