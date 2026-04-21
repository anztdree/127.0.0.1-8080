/**
 * Login Server — Structured Logger
 */

var LEVELS = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 };
var LOG_LEVEL = (process.env.LOG_LEVEL || 'info').toUpperCase();
var MIN_LEVEL = LEVELS[LOG_LEVEL] !== undefined ? LEVELS[LOG_LEVEL] : LEVELS.INFO;

var COLORS = {
    DEBUG: '\x1b[36m',   // cyan
    INFO:  '\x1b[32m',   // green
    WARN:  '\x1b[33m',   // yellow
    ERROR: '\x1b[31m',   // red
};
var RESET = '\x1b[0m';

function log(level, source, msg, data) {
    if (LEVELS[level] < MIN_LEVEL) return;

    var ts = new Date().toISOString();
    var color = COLORS[level] || '';
    var tag = source ? '[' + source + '] ' : '';
    var line = ts + ' ' + color + '[' + level + ']\x1b[0m ' + tag + msg;

    if (level === 'ERROR') {
        if (data !== undefined) console.error(line, data);
        else console.error(line);
    } else if (level === 'WARN') {
        if (data !== undefined) console.warn(line, data);
        else console.warn(line);
    } else {
        if (data !== undefined) console.log(line, data);
        else console.log(line);
    }
}

module.exports = {
    debug: function (source, msg, data) { log('DEBUG', source, msg, data); },
    info:  function (source, msg, data) { log('INFO', source, msg, data); },
    warn:  function (source, msg, data) { log('WARN', source, msg, data); },
    error: function (source, msg, data) { log('ERROR', source, msg, data); },
};
