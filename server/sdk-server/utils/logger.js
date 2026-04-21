/**
 * ============================================================================
 *  SDK Server v3 — Logger Utility
 *  ============================================================================
 *
 *  Simple, zero-dependency logger with timestamp and color.
 *  No external logging library needed for a private server.
 *
 * ============================================================================
 */

var CONSTANTS = require('../config/constants');

/**
 * Log level colors (ANSI escape codes).
 * Only used when IS_DEV = true or stdout is TTY.
 */
var COLORS = {
    INFO:  '\x1b[36m',   // cyan
    WARN:  '\x1b[33m',   // yellow
    ERROR: '\x1b[31m',   // red
    DEBUG: '\x1b[90m',   // gray
    RESET: '\x1b[0m'
};

var useColors = CONSTANTS.IS_DEV || process.stdout.isTTY;

/**
 * Format timestamp for log prefix.
 * @returns {string} ISO-like timestamp: "2026-04-21 10:30:45"
 */
function timestamp() {
    var d = new Date();
    var pad = function (n) { return String(n).padStart(2, '0'); };
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) +
        ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
}

/**
 * Build log prefix with timestamp and level.
 * @param {string} level - "INFO", "WARN", "ERROR", "DEBUG"
 * @returns {string}
 */
function prefix(level) {
    if (useColors) {
        return COLORS[level] + '[' + timestamp() + '] [' + level + ']' + COLORS.RESET;
    }
    return '[' + timestamp() + '] [' + level + ']';
}

var logger = {
    info: function (tag, msg, data) {
        console.log(prefix('INFO'), '[' + tag + ']', msg, data !== undefined ? data : '');
    },

    warn: function (tag, msg, data) {
        console.warn(prefix('WARN'), '[' + tag + ']', msg, data !== undefined ? data : '');
    },

    error: function (tag, msg, data) {
        console.error(prefix('ERROR'), '[' + tag + ']', msg, data !== undefined ? data : '');
    },

    debug: function (tag, msg, data) {
        if (CONSTANTS.IS_DEV) {
            console.log(prefix('DEBUG'), '[' + tag + ']', msg, data !== undefined ? data : '');
        }
    }
};

module.exports = logger;
