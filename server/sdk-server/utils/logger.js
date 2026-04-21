/**
 * ============================================================================
 * SDK Server — Logger Utility (Natural Implementation)
 * ============================================================================
 *
 * Simple, zero-dependency logger with timestamp and color.
 * 
 * Natural approach:
 * - No external logging library
 * - Standardized format
 * - Color support (TTY only)
 * - Development mode filtering
 *
 * ============================================================================
 */

const CONSTANTS = require('../config/constants');

/** ANSI Colors */
const COLORS = {
    INFO: '\x1b[36m',    // Cyan
    WARN: '\x1b[33m',    // Yellow
    ERROR: '\x1b[31m',   // Red
    DEBUG: '\x1b[90m',   // Gray
    SUCCESS: '\x1b[32m', // Green
    RESET: '\x1b[0m'
};

/** Use colors only in development or when stdout is TTY */
const useColors = CONSTANTS.IS_DEV || process.stdout.isTTY;

/**
 * Format timestamp for log prefix
 * @returns {string} Format: "2026-04-21 10:30:45"
 */
function timestamp() {
    const d = new Date();
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

/**
 * Build log prefix
 * @param {string} level - Log level
 * @returns {string} Formatted prefix
 */
function prefix(level) {
    if (useColors) {
        const color = COLORS[level] || COLORS.RESET;
        return `${color}[${timestamp()}] [${level}]${COLORS.RESET}`;
    }
    return `[${timestamp()}] [${level}]`;
}

// =============================================
// LOGGER
// =============================================

const logger = {
    /**
     * Log info message
     * @param {string} tag - Component tag
     * @param {string} message - Log message
     * @param {*} data - Optional data
     */
    info(tag, message, data) {
        const msg = data !== undefined ? `${message} ${JSON.stringify(data)}` : message;
        console.log(prefix('INFO'), `[${tag}]`, msg);
    },

    /**
     * Log warning message
     * @param {string} tag - Component tag
     * @param {string} message - Log message
     * @param {*} data - Optional data
     */
    warn(tag, message, data) {
        const msg = data !== undefined ? `${message} ${JSON.stringify(data)}` : message;
        console.warn(prefix('WARN'), `[${tag}]`, msg);
    },

    /**
     * Log error message
     * @param {string} tag - Component tag
     * @param {string} message - Log message
     * @param {*} data - Optional data
     */
    error(tag, message, data) {
        const msg = data !== undefined ? `${message} ${JSON.stringify(data)}` : message;
        console.error(prefix('ERROR'), `[${tag}]`, msg);
    },

    /**
     * Log debug message (development only)
     * @param {string} tag - Component tag
     * @param {string} message - Log message
     * @param {*} data - Optional data
     */
    debug(tag, message, data) {
        if (CONSTANTS.IS_DEV) {
            const msg = data !== undefined ? `${message} ${JSON.stringify(data)}` : message;
            console.log(prefix('DEBUG'), `[${tag}]`, msg);
        }
    },

    /**
     * Log success message
     * @param {string} tag - Component tag
     * @param {string} message - Log message
     * @param {*} data - Optional data
     */
    success(tag, message, data) {
        const msg = data !== undefined ? `${message} ${JSON.stringify(data)}` : message;
        console.log(prefix('SUCCESS'), `[${tag}]`, msg);
    }
};

// =============================================
// EXPORT
// =============================================

module.exports = logger;