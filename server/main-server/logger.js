/**
 * logger.js — MAIN-SERVER Logger v5.0 "Table Flow"
 *
 * Redesign from v4.0 "Emoji Flow":
 *   - Cleaner per-action format separated by thick ═══ lines (66 chars)
 *   - NO handler table at top — removed entirely
 *   - Errors go INSIDE the action block, NOT in separate tables
 *   - Auto-summary after 10s idle (debounce, NOT interval)
 *   - Final summary on disconnect
 *   - Silent errors caught with impact analysis
 *   - step() is the MOST critical function — clean dot-padded format
 *   - Full backward compatibility with all handler calls
 *
 * SEPARATOR WIDTH: exactly 66 chars (═.repeat(66))
 *
 * Levels: DEBUG=0, INFO=1, WARN=2, ERROR=3
 * Default: INFO (set LOG_LEVEL=DEBUG for maximum verbosity)
 */

const chalk = require('chalk');

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════

var SEP_WIDTH = 66;

const LEVELS = {
    DEBUG: { emoji: '\u{1F535}', color: chalk.cyan,   label: 'DEBUG', priority: 0 },
    INFO:  { emoji: '\u{1F7E2}', color: chalk.green,  label: 'INFO ', priority: 1 },
    WARN:  { emoji: '\u{1F7E1}', color: chalk.yellow, label: 'WARN ', priority: 2 },
    ERROR: { emoji: '\u{1F534}', color: chalk.red,    label: 'ERROR', priority: 3 },
};

const LOG_LEVEL = (process.env.LOG_LEVEL || 'INFO').toUpperCase();
var MIN_PRIORITY = LEVELS[LOG_LEVEL] ? LEVELS[LOG_LEVEL].priority : 1;

const MODULES = {
    ENTER:     { emoji: '\u{2694}\u{FE0F}',  color: chalk.magenta },
    BUILD:     { emoji: '\u{1F3D7}\u{FE0F}',  color: chalk.yellow },
    UPDATE:    { emoji: '\u{1F504}',          color: chalk.blue },
    VALIDATE:  { emoji: '\u{1F50D}',          color: chalk.cyan },
    SOCKET:    { emoji: '\u{1F50C}',          color: chalk.blue },
    HANDLER:   { emoji: '\u{2699}\u{FE0F}',  color: chalk.yellow },
    TEA:       { emoji: '\u{1F510}',          color: chalk.magenta },
    COMPRESS:  { emoji: '\u{1F4E6}',          color: chalk.green },
    SDKAPI:    { emoji: '\u{1F4E1}',          color: chalk.yellow },
    CONFIG:    { emoji: '\u{1F4CB}',          color: chalk.gray },
    SERVER:    { emoji: '\u{1F680}',          color: chalk.green },
    DB:        { emoji: '\u{1F4BE}',          color: chalk.cyan },
    CIRCULAR:  { emoji: '\u{26A0}\u{FE0F}',  color: chalk.yellow },
    CLONE:     { emoji: '\u{1F916}',          color: chalk.cyan },
    SERIAL:    { emoji: '\u{1F4CB}',          color: chalk.white },
    RESP:      { emoji: '\u{1F4E4}',          color: chalk.green },
    SAVE:      { emoji: '\u{1F4BE}',          color: chalk.cyan },
    STEP:      { emoji: '\u{1F4CD}',          color: chalk.gray },
    TRACE:     { emoji: '\u{1F50D}',          color: chalk.magenta },
    CAPTURE:   { emoji: '\u{1F4A5}',          color: chalk.red },
    AUDIT:     { emoji: '\u{1F6E1}\u{FE0F}',  color: chalk.yellow },
};

const PHASE_ICONS = [
    '\u{1F50D}',
    '\u{1F6E1}\u{FE0F}',
    '\u{1F3E0}',
    '\u{1F50E}',
    '\u{1F5C4}\u{FE0F}',
    '\u{2699}\u{FE0F}',
    '\u{1F3D7}\u{FE0F}',
    '\u{1F504}',
    '\u{1F512}',
    '\u{1F4DC}',
    '\u{1F4BE}',
    '\u{1F4CA}',
    '\u{1F4E4}',
    '\u{1F50E}',
    '\u{1F3AF}',
];

const DATA_EMOJI = {
    userId:      '\u{1F464}',
    serverId:    '\u{1F3E0}',
    loginToken:  '\u{1F511}',
    string:      '\u{1F4DD}',
    number:      '\u{1F522}',
    object:      '\u{1F4E6}',
    array:       '\u{1F4CB}',
    boolean:     '\u{2705}',
    null:        '\u{26AB}',
    undefined:   '\u{1F534}',
    hero:        '\u{1F9B8}',
    diamond:     '\u{1F48E}',
    gold:        '\u{1FA99}',
    level:       '\u{1F3C6}',
    friend:      '\u{1F91D}',
    blacklist:   '\u{1F6AB}',
    message:     '\u{1F4AC}',
    config:      '\u{2699}\u{FE0F}',
    file:        '\u{1F4C4}',
    http:        '\u{1F310}',
    timing:      '\u{26A1}',
    action:      '\u{1F3AF}',
    type:        '\u{1F3AF}',
    impact:      '\u{1F4A5}',
    fix:         '\u{1F527}',
    source:      '\u{1F4CE}',
    empty:       '\u{1F4ED}',
    star:        '\u{2B50}',
    skill:       '\u{2728}',
};

const STATUS = {
    traced:  { emoji: '\u2705', label: 'TRACED',  color: chalk.green },
    fix:     { emoji: '\u2705', label: 'FIX',     color: chalk.cyan },
    config:  { emoji: '\u{2699}\u{FE0F}',  label: 'CONFIG',  color: chalk.yellow },
    default: { emoji: '\u{1F538}', label: 'DEFAULT', color: chalk.gray },
    dead:    { emoji: '\u{1F6AB}', label: 'DEAD',    color: chalk.red },
    missing: { emoji: '\u274C', label: 'MISSING', color: chalk.red.bold },
    warn:    { emoji: '\u{26A0}\u{FE0F}', label: 'WARN',    color: chalk.yellow.bold },
    ok:      { emoji: '\u2705', label: 'OK',      color: chalk.green },
    fail:    { emoji: '\u274C', label: 'FAIL',    color: chalk.red },
};

// ═══════════════════════════════════════════════════════════════
// INTERNAL HELPERS
// ═══════════════════════════════════════════════════════════════

function ts() {
    var d = new Date();
    return String(d.getHours()).padStart(2, '0') + ':' +
           String(d.getMinutes()).padStart(2, '0') + ':' +
           String(d.getSeconds()).padStart(2, '0');
}

function tsFull() {
    var d = new Date();
    return d.getFullYear() + '-' +
           String(d.getMonth() + 1).padStart(2, '0') + '-' +
           String(d.getDate()).padStart(2, '0') + ' ' + ts();
}

function sep() {
    console.log(chalk.dim('\u{2550}'.repeat(SEP_WIDTH)));
}

// ═══════════════════════════════════════════════════════════════
// v5.0 NEW — ACTION HEADER / FOOTER
// ═══════════════════════════════════════════════════════════════

/**
 * Print action header with thick separators.
 * Called ONCE per action at the start.
 *
 * @param {number} num       - Action counter number
 * @param {string} type      - Request type (e.g. "user")
 * @param {string} action    - Request action (e.g. "enterGame")
 * @param {number} [ret]     - Return code (optional, for post-execution header)
 * @param {number} [duration]- Duration in ms (optional)
 * @param {number} [dataSize]- Response data size in chars (optional)
 * @param {object} [extra]   - Extra info
 */
function actionHeader(num, type, action, ret, duration, dataSize, extra) {
    sep();

    var typeEmoji = TYPE_EMOJIS[type] || '\u{1F6E0}\u{FE0F}';

    // Build status string
    var statusStr;
    if (ret === undefined || ret === null) {
        statusStr = chalk.gray('\u2014');
    } else if (ret === 0) {
        statusStr = chalk.green('\u2705 0');
    } else if (ret === 4) {
        statusStr = chalk.red('\u274C NF');
    } else {
        statusStr = chalk.red('\u274C ' + ret);
    }

    // Duration
    var durStr;
    if (duration !== undefined && duration !== null) {
        durStr = chalk.cyan(duration + 'ms');
    } else {
        durStr = chalk.gray('\u2014');
    }

    // Data size
    var sizeStr;
    if (dataSize) {
        sizeStr = chalk.white(dataSize.toLocaleString() + ' chars');
    } else {
        sizeStr = chalk.gray('\u2014');
    }

    var header = '\u25BC [' + num + '] ' + typeEmoji + ' ' + type + '::' + action + '  ' + statusStr + '  \u26A1' + durStr + '  \u{1F4E6}' + sizeStr;
    console.log(chalk.white.bold(header));

    sep();
}

/**
 * Print action footer — closing thick separator.
 */
function actionFooter() {
    sep();
}

// ═══════════════════════════════════════════════════════════════
// v5.0 NEW — SUMMARY FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Print idle summary — called after 10s of no activity.
 *
 * @param {string} socketId - Socket ID (shortened)
 * @param {object} stats    - Formatted stats from formatStats()
 */
function summaryIdle(socketId, stats) {
    sep();
    console.log('  \u{1F4CA} IDLE SUMMARY \u2014 10s no activity \u2014 ' + chalk.white(socketId.substring(0, 12)));
    sep();

    var errors = stats.errorDetails || [];
    var errStr = '';
    if (errors.length > 0) {
        errStr = '  ' + chalk.red('\u274C ' + errors.length + ' (' + errors.map(function(e) { return e.type + '::' + e.action; }).join(', ') + ')');
    }

    console.log('  \u{1F4CA} Calls: ' + stats.actionCount + '  ' + chalk.green('\u2705 ' + stats.successCount + ' OK') + errStr + '  \u26A1 ' + stats.avgTime + 'ms avg  \u{1F4E6} ' + stats.totalData.toLocaleString() + ' chars');
    sep();
}

/**
 * Print final summary — called on disconnect.
 *
 * @param {string} socketId  - Socket ID (shortened)
 * @param {object} stats     - Formatted stats
 */
function summaryFinal(socketId, stats) {
    sep();
    console.log('  \u{1F4CA} FINAL SUMMARY \u2014 ' + chalk.white(socketId.substring(0, 12)) + '  \u23F1\uFE0F alive ' + stats.alive);
    sep();

    if (stats.userId) {
        console.log('  \u{1F464} User ........... ' + chalk.white(stats.userId));
    }

    var errors = stats.errorDetails || [];
    var errStr = '';
    if (errors.length > 0) {
        errStr = '  ' + chalk.red('\u274C ' + errors.length + ' (' + errors.map(function(e) { return e.type + '::' + e.action; }).join(', ') + ')');
    }

    console.log('  \u{1F4CA} Calls: ' + stats.actionCount + '  ' + chalk.green('\u2705 ' + stats.successCount + ' OK') + errStr + '  \u26A1 ' + stats.avgTime + 'ms avg  \u{1F4E6} ' + stats.totalData.toLocaleString() + ' chars');

    if (stats.registeredHandlers !== undefined) {
        console.log('  \u{1F4CB} Handlers ........ ' + stats.registeredHandlers + ' registered' + (stats.missingHandlers > 0 ? ', ' + chalk.red(stats.missingHandlers + ' missing') : ''));
    }

    sep();
}

// ═══════════════════════════════════════════════════════════════
// TYPE_EMOJIS MAP — emoji per handler type (used by actionHeader)
// ═══════════════════════════════════════════════════════════════

var TYPE_EMOJIS = {
    user:        '\u{1F464}',
    friend:      '\u{1F91D}',
    heroImage:   '\u{1F5BC}\u{FE0F}',
    hero:        '\u{1F9B8}',
    userMsg:     '\u{1F4AC}',
    guide:       '\u{1F3AF}',
    hangup:      '\u{23F3}',
    activity:    '\u{1F3C6}',
    buryPoint:   '\u{1F4CB}',
    summon:      '\u{2728}',
    gift:        '\u{1F381}',
};

// ═══════════════════════════════════════════════════════════════
// CORE LOG — Main log line (compact inside handler, full outside)
// ═══════════════════════════════════════════════════════════════

function log(level, module, message) {
    var lv = LEVELS[level] || LEVELS.INFO;
    if (lv.priority < MIN_PRIORITY) return;

    var md = MODULES[module] || { emoji: '\u26AA', color: chalk.white };
    var levelStr = lv.color(lv.label);

    // Outside handler — full format with timestamp
    console.log(
        lv.emoji + ' ' + chalk.gray(ts()) + ' ' + levelStr + ' ' + md.emoji + ' ' +
        md.color(module.padEnd(8)) + ' \u25B8 ' + chalk.white.bold(message)
    );
}

// ═══════════════════════════════════════════════════════════════
// STEP — THE MOST CRITICAL FUNCTION (100+ calls per session)
// Clean dot-padded format with status indicator
// ═══════════════════════════════════════════════════════════════

/**
 * Pipeline step log.
 * @param {number} current  - Current step number
 * @param {number} total    - Total steps
 * @param {string} title    - Step title
 * @param {string} status   - 'running' | 'pass' | 'fail' | 'warn' | 'skip' | 'new' | 'ok'
 * @param {string} [detail] - Optional detail text
 */
function step(current, total, title, status, detail) {
    var icon;
    if (status === 'pass' || status === 'ok') icon = '\u2705';
    else if (status === 'fail') icon = '\u274C';
    else if (status === 'warn') icon = '\u{26A0}\u{FE0F}';
    else if (status === 'skip') icon = '\u23ED';
    else if (status === 'new') icon = '\u{1F31F}';
    else icon = '\u{1F504}';

    var label = '[' + current + '/' + total + '] ' + title;
    var dots = '.'.repeat(Math.max(1, 24 - label.length));

    var line = '     ' + icon + ' ' + label + ' ' + dots;
    if (detail) {
        if (status === 'pass' || status === 'ok') line += chalk.green(detail);
        else if (status === 'fail') line += chalk.red(detail);
        else if (status === 'warn') line += chalk.yellow(detail);
        else if (status === 'skip') line += chalk.gray(detail);
        else if (status === 'new') line += chalk.magenta(detail);
        else line += chalk.cyan(detail);
    }
    console.log(line);
}

// ═══════════════════════════════════════════════════════════════
// DETAILS — Key-value pairs (├─/└─ tree format)
// ═══════════════════════════════════════════════════════════════

function details(type /*, ...pairs */) {
    var pairs = Array.prototype.slice.call(arguments, 1);
    pairs.forEach(function(p, i) {
        var isLast = (i === pairs.length - 1);
        var connector = isLast ? '\u2514\u2500' : '\u251C\u2500';
        if (Array.isArray(p)) {
            console.log('     ' + connector + ' ' + chalk.dim(p[0] + ': ') + chalk.white(String(p[1])));
        } else {
            console.log('     ' + connector + ' ' + chalk.dim(String(p)));
        }
    });
}

function detail(type, key, value, isLast) {
    if (LEVELS.DEBUG.priority < MIN_PRIORITY && type !== 'important' && type !== 'warn' && type !== 'error') return;
    var connector = isLast ? '\u2514\u2500' : '\u251C\u2500';
    console.log('     ' + connector + ' ' + chalk.dim(key + ': ') + chalk.white(String(value)));
}

// ═══════════════════════════════════════════════════════════════
// SECTION HEADERS
// ═══════════════════════════════════════════════════════════════

function header(title) {
    sep();
    console.log('  \u{1F3AE} ' + chalk.white.bold(title));
    sep();
}

function headerThin(title) {
    console.log('');
    console.log(chalk.dim('  ' + '\u2500'.repeat(20) + ' ' + chalk.white.bold(title) + ' ' + '\u2500'.repeat(20)));
    console.log('');
}

function headerEnd() {
    console.log('');
    sep();
    console.log('');
}

function separator(char) {
    var c = char || '\u2500';
    console.log(chalk.dim('  ' + c.repeat(SEP_WIDTH)));
}

function separatorDouble() {
    sep();
}

// ═══════════════════════════════════════════════════════════════
// TABLE — Key-value table (├─/└─ format)
// ═══════════════════════════════════════════════════════════════

function table(rows) {
    if (!rows || rows.length === 0) return;
    var keyWidth = Math.max.apply(null, rows.map(function(r) { return String(r[0]).length; })) + 2;
    rows.forEach(function(row, i) {
        var isLast = (i === rows.length - 1);
        var connector = isLast ? '\u2514\u2500' : '\u2502 ';
        var key = chalk.white(String(row[0]).padEnd(keyWidth));
        var val = typeof row[1] === 'number' ? chalk.yellow(String(row[1])) : chalk.cyan(String(row[1]));
        console.log('  ' + connector + ' ' + key + ' ' + chalk.dim(': ') + val);
    });
}

// ═══════════════════════════════════════════════════════════════
// SOCKET EVENT — connect/disconnect/upgrade
// ═══════════════════════════════════════════════════════════════

function socketEvent(event, socketId, ip, transport, extra) {
    var sid = socketId ? chalk.white(socketId.substring(0, 12)) + chalk.gray('...') : chalk.gray('?');

    if (event === 'connect') {
        sep();
        console.log(chalk.green.bold('  \u{1F517}\u26A1 Client connected  ') + sid + chalk.gray('  \u{1F4CD} ' + ip + '  \u{1F4E1} ' + transport));
    } else if (event === 'disconnect') {
        console.log('');
        console.log(chalk.red.bold('  \u2796 Disconnected  ') + sid + chalk.gray('  reason: ' + (extra || '?')));
    } else if (event === 'upgrade') {
        console.log(chalk.cyan('  \u{1F504}\u2197\uFE0F Upgrade  ') + chalk.white(extra || '') + '  \u{1F7E2}');
    } else {
        console.log('  \u2502 ' + chalk.cyan(event.padEnd(14)) + ' ' + sid + '  ' + ip + '  ' + transport);
        if (extra) console.log('  \u2514 ' + chalk.dim(extra));
    }
}

// ═══════════════════════════════════════════════════════════════
// NO-OP STUBS — Replaced by actionHeader/actionFooter in index.js
// ═══════════════════════════════════════════════════════════════

function actionLog() { /* no-op: replaced by actionHeader/actionFooter */ }
function requestDump() { /* no-op: removed in v5.0 */ }
function responseSummary() { /* no-op: replaced by actionFooter context */ }
function timing() { /* no-op: replaced by actionFooter context */ }

// ═══════════════════════════════════════════════════════════════
// ERROR WITH STACK
// ═══════════════════════════════════════════════════════════════

function errorWithStack(module, message, err) {
    console.log('');
    console.log(chalk.red.bold('  \u274C ERROR: ' + module) + chalk.gray(' ' + '\u2500'.repeat(46)));
    console.log('     \u251C\u2500 ' + chalk.dim('msg: ') + chalk.white(message));
    if (err) {
        console.log('     \u251C\u2500 ' + chalk.dim('err: ') + chalk.red(err.message));
        if (err.stack) {
            err.stack.split('\n').slice(1, 6).forEach(function(line, i) {
                console.log('     ' + chalk.gray(line.trim()));
            });
            if (err.stack.split('\n').length > 6) {
                console.log('     ' + chalk.gray('... more stack lines ...'));
            }
        }
    }
    console.log('');
}

// ═══════════════════════════════════════════════════════════════
// ERROR BANNER
// ═══════════════════════════════════════════════════════════════

function errorBanner(opts) {
    opts = opts || {};
    var r = chalk.red.bold, rb = chalk.red, w = chalk.white, g = chalk.gray, y = chalk.yellow;
    console.log('');
    console.log(rb('  \u250C' + '\u2500'.repeat(58) + '\u2510'));
    if (opts.step) console.log(r('  \u2502') + '  ' + r('\u274C FATAL ERROR AT STEP ' + opts.step) + g(' '.repeat(Math.max(0, 58 - 26 - opts.step.length))) + r('\u2502'));
    console.log(rb('  \u2502') + g(' '.repeat(58)) + rb('\u2502'));
    if (opts.module)      console.log(rb('  \u2502') + '  ' + g('STEP:   ') + w(opts.module) + g(' '.repeat(Math.max(0, 58 - 10 - opts.module.length))) + rb('\u2502'));
    if (opts.message)     console.log(rb('  \u2502') + '  ' + g('REASON: ') + w.bold(opts.message) + g(' '.repeat(Math.max(0, 58 - 10 - opts.message.length))) + rb('\u2502'));
    if (opts.trace)       console.log(rb('  \u2502') + '  ' + g('DETAIL: ') + w(opts.trace) + g(' '.repeat(Math.max(0, 58 - 10 - opts.trace.length))) + rb('\u2502'));
    if (opts.consumer)    console.log(rb('  \u2502') + '  ' + g('CLIENT: ') + g(opts.consumer) + g(' '.repeat(Math.max(0, 58 - 10 - opts.consumer.length))) + rb('\u2502'));
    console.log(rb('  \u2502') + g(' '.repeat(58)) + rb('\u2502'));
    if (opts.impact)      console.log(rb('  \u2502') + '  ' + y('IMPACT:  ') + y.bold(opts.impact) + g(' '.repeat(Math.max(0, 58 - 10 - opts.impact.length))) + rb('\u2502'));
    if (opts.fix)         console.log(rb('  \u2502') + '  ' + g('FIX:     ') + g(opts.fix) + g(' '.repeat(Math.max(0, 58 - 10 - opts.fix.length))) + rb('\u2502'));
    console.log(rb('  \u2502') + g(' '.repeat(58)) + rb('\u2502'));
    if (opts.err && opts.err.stack) {
        var lines = opts.err.stack.split('\n').slice(1, 5);
        lines.forEach(function(line, i) {
            var trimmed = line.trim().substring(0, 54);
            console.log(rb('  \u2502') + '  ' + g(trimmed.padEnd(54)) + rb('\u2502'));
        });
        if (opts.err.stack.split('\n').length > 5) {
            console.log(rb('  \u2502') + '  ' + g('     ... more stack lines ...'.padEnd(54)) + rb('\u2502'));
        }
        console.log(rb('  \u2502') + g(' '.repeat(58)) + rb('\u2502'));
    }
    console.log(r('  \u2514' + '\u2500'.repeat(58) + '\u2518'));
    console.log('');
}

// ═══════════════════════════════════════════════════════════════
// WARN CALLOUT
// ═══════════════════════════════════════════════════════════════

function warnCallout(message, opts) {
    opts = opts || {};
    var y = chalk.yellow, yb = chalk.yellow.bold, w = chalk.white, g = chalk.gray, m = chalk.magenta;
    console.log('');
    console.log(yb('     \u26A0\uFE0F  ') + w.bold(message));
    if (opts.source) console.log('          ' + m('\u{1F4CE} SOURCE: ') + m(opts.source));
    if (opts.action) console.log('          ' + g('\u{1F527} ACTION: ') + g(opts.action));
    if (opts.reason) console.log('          ' + w('\u{1F4CE} REASON: ') + w(opts.reason));
    if (opts.module) console.log('          ' + g('\u{1F4CB} MODULE: ') + g(opts.module));
    console.log('');
}

// ═══════════════════════════════════════════════════════════════
// WARNING SECTION
// ═══════════════════════════════════════════════════════════════

function warningSection(warnings) {
    if (!warnings || warnings.length === 0) return;
    console.log('');
    console.log(chalk.yellow.bold('     \u26A0\uFE0F WARNINGS DETECTED'));
    warnings.forEach(function(warn, i) {
        var isLast = (i === warnings.length - 1);
        console.log(chalk.yellow.bold('     \u26A0\uFE0F  [' + (warn.id || 'W' + String(i + 1).padStart(3, '0')) + '] ') + chalk.white(warn.message));
        if (warn.expected) console.log(chalk.gray('          Expected: ') + chalk.white(warn.expected));
        if (warn.got)      console.log(chalk.gray('          Got:      ') + chalk.magenta(warn.got));
        if (warn.impact)   console.log(chalk.gray('          Impact:   ') + chalk.yellow(warn.impact));
        if (warn.fix)      console.log(chalk.gray('          Fix:      ') + chalk.gray(warn.fix));
        if (!isLast) console.log('');
    });
    console.log(chalk.yellow.bold('     \u26A0\uFE0F TOTAL WARNINGS: ' + warnings.length));
    console.log('');
}

// ═══════════════════════════════════════════════════════════════
// CRITICAL FIELDS AUDIT
// ═══════════════════════════════════════════════════════════════

function criticalFields(fields) {
    if (!fields || fields.length === 0) return { passed: 0, failed: 0, warned: 0 };
    var stats = { passed: 0, failed: 0, warned: 0 };
    console.log('');
    console.log(chalk.red.bold('     \u{1F512} CRITICAL FIELDS AUDIT \u2014 game will crash/stuck if wrong'));
    fields.forEach(function(f, i) {
        var isLast = (i === fields.length - 1);
        var connector = isLast ? '\u2514\u2500' : '\u251C\u2500';
        var icon;
        if (f.status === 'ok') { icon = '\u2705'; stats.passed++; }
        else if (f.status === 'fail') { icon = '\u{1F6AB}'; stats.failed++; }
        else { icon = '\u{26A0}\u{FE0F}'; stats.warned++; }
        var name = chalk.white(f.name.padEnd(24));
        var val = f.status === 'ok' ? chalk.green(String(f.value))
                : f.status === 'fail' ? chalk.red(String(f.value))
                : chalk.yellow(String(f.value));
        var d = f.detail ? chalk.dim('  ' + f.detail) : '';
        console.log('     ' + connector + ' \u{1F512} ' + name + ' = ' + val + d);
    });
    var allOk = stats.failed === 0;
    var verdict = allOk
        ? chalk.green.bold('     \u2705 CRITICAL AUDIT: ' + stats.passed + '/' + fields.length + ' PASSED' + (stats.warned > 0 ? ', ' + stats.warned + ' warning(s)' : ''))
        : chalk.red.bold('     \u26A0\uFE0F CRITICAL AUDIT: ' + stats.passed + '/' + fields.length + ' PASSED \u2014 ' + stats.failed + ' ISSUES');
    console.log(verdict);
    return stats;
}

// ═══════════════════════════════════════════════════════════════
// TYPE ASSERT
// ═══════════════════════════════════════════════════════════════

function typeAssert(fieldPath, actualValue, expectedType, opts) {
    opts = opts || {};
    var passed = false;
    var actualType = typeof actualValue;
    switch (expectedType) {
        case 'number': passed = (actualType === 'number' && !isNaN(actualValue)); break;
        case 'string': passed = (actualType === 'string'); break;
        case 'object': passed = (actualType === 'object' && actualValue !== null && !Array.isArray(actualValue)); break;
        case 'array': passed = Array.isArray(actualValue); break;
        case 'boolean': passed = (actualType === 'boolean'); break;
        default: passed = false;
    }
    if (passed) {
        log('DEBUG', 'VALIDATE', '\u2705 typeAssert PASS: ' + fieldPath + ' is ' + expectedType);
    } else {
        errorBanner({
            module: opts.context || 'VALIDATE',
            step: opts.trace || '',
            message: 'TYPE ASSERTION FAILED: ' + fieldPath,
            trace: opts.trace || '',
            consumer: opts.consumer || '',
            impact: opts.impact || 'Unexpected type may crash client or corrupt data',
        });
        details('error', ['field', fieldPath], ['expected', expectedType], ['actual', actualType], ['value', String(actualValue)]);
    }
    return passed;
}

// ═══════════════════════════════════════════════════════════════
// INVARIANT CHECK
// ═══════════════════════════════════════════════════════════════

function invariantCheck(ruleName, condition, opts) {
    if (condition) {
        log('DEBUG', 'VALIDATE', '\u2705 invariant PASS: ' + ruleName);
        return true;
    }
    var failOpts = {};
    if (opts) {
        if (opts.context) failOpts.source = opts.context + (opts.trace ? ' ' + opts.trace : '');
        if (opts.fix)     failOpts.action = opts.fix;
        if (opts.actual)  failOpts.reason = 'Expected: ' + (opts.expect || 'truthy') + ', Got: ' + opts.actual;
        if (opts.impact && opts.actual) failOpts.reason = failOpts.reason + ' \u2014 ' + opts.impact;
        else if (opts.impact) failOpts.reason = opts.impact;
    }
    warnCallout('INVARIANT VIOLATION: ' + ruleName, failOpts);
    return false;
}

// ═══════════════════════════════════════════════════════════════
// MUTATION LOG
// ═══════════════════════════════════════════════════════════════

function mutationLog(opts) {
    if (!opts) return;
    var delta = (opts.after || 0) - (opts.before || 0);
    var sign = delta >= 0 ? '+' : '';
    var unit = opts.unit ? ' ' + opts.unit : '';
    var deltaStr = sign + delta + unit;
    var anomalyFlag = '';
    if (opts.maxDelta !== undefined && opts.maxDelta !== null && Math.abs(delta) > opts.maxDelta)
        anomalyFlag = chalk.red(' \u26A0\uFE0F DELTA TOO LARGE (max=' + opts.maxDelta + ')');
    if (opts.nonNegative && opts.after < 0)
        anomalyFlag = chalk.red(' \u26A0\uFE0F NEGATIVE RESULT!');
    if (opts.noChange && delta === 0)
        anomalyFlag = chalk.yellow(' \u26A0\uFE0F NO CHANGE');
    var beforeStr = String(opts.before) + unit;
    var afterStr = String(opts.after) + unit;
    var summary = chalk.cyan(beforeStr) + ' \u2192 ' + chalk.cyan(afterStr) + ' (' + chalk.green(deltaStr) + ')' + anomalyFlag;
    var context = opts.context ? ' [' + opts.context + ']' : '';
    details('mutation', [opts.field || '?', summary + context]);
}

// ═══════════════════════════════════════════════════════════════
// DEEP TYPE SCAN
// ═══════════════════════════════════════════════════════════════

function deepTypeScan(obj, specs, prefix) {
    var result = { passed: 0, failed: 0, errors: [] };
    if (!obj || typeof obj !== 'object' || !specs) return result;
    var specKeys = Object.keys(specs);
    for (var i = 0; i < specKeys.length; i++) {
        var fieldName = specKeys[i];
        var expectedType = specs[fieldName];
        var val = obj[fieldName];
        var path = prefix ? prefix + '.' + fieldName : fieldName;
        var match = false;
        var actualType = typeof val;
        switch (expectedType) {
            case 'array': match = Array.isArray(val); break;
            case 'object': match = (actualType === 'object' && val !== null && !Array.isArray(val)); break;
            case 'number': match = (actualType === 'number'); break;
            case 'string': match = (actualType === 'string'); break;
            case 'boolean': match = (actualType === 'boolean'); break;
            default: match = (actualType === expectedType);
        }
        if (match) result.passed++;
        else {
            result.failed++;
            result.errors.push({
                path: path,
                expected: expectedType,
                actual: Array.isArray(val) ? 'array' : (val === null ? 'null' : actualType),
                value: val,
            });
        }
    }
    return result;
}

// ═══════════════════════════════════════════════════════════════
// SAVE VERIFY
// ═══════════════════════════════════════════════════════════════

function walkPath(obj, path) {
    if (!obj || !path) return undefined;
    var parts = path.split('.');
    var current = obj;
    for (var i = 0; i < parts.length; i++) {
        if (current === null || current === undefined) return undefined;
        current = current[parts[i]];
    }
    return current;
}

function saveVerify(userId, db, expectedData, criticalPaths) {
    if (!db || !db.getUser) return false;
    var savedData = db.getUser(userId);
    if (!savedData) {
        errorBanner({ module: 'SAVE', message: 'User data NOT FOUND after save!', trace: 'userId=' + userId, impact: 'Save operation may have failed silently' });
        return false;
    }
    var allOk = true;
    for (var i = 0; i < criticalPaths.length; i++) {
        var path = criticalPaths[i];
        var expected = walkPath(expectedData, path);
        var actual = walkPath(savedData, path);
        if (JSON.stringify(expected) !== JSON.stringify(actual)) {
            warnCallout('SAVE INTEGRITY: ' + path + ' MISMATCH', { reason: 'Expected: ' + JSON.stringify(expected) + ', Got: ' + JSON.stringify(actual), module: 'SAVE' });
            allOk = false;
        }
    }
    if (allOk) log('DEBUG', 'SAVE', '\u2705 saveVerify: ' + criticalPaths.length + '/' + criticalPaths.length + ' paths OK');
    return allOk;
}

// ═══════════════════════════════════════════════════════════════
// RESPONSE SNAPSHOT
// ═══════════════════════════════════════════════════════════════

function responseSnapshot(label, data) {
    if (!data || typeof data !== 'object') return;
    var keys = Object.keys(data);
    var total = keys.length;
    console.log('');
    console.log(chalk.green.bold('     \u{1F4F8} ' + label));
    keys.forEach(function(key, i) {
        var isLast = (i === total - 1);
        var connector = isLast ? '\u2514\u2500' : '\u251C\u2500';
        var val = data[key];
        var keyStr = chalk.white(key.padEnd(28));
        var typeStr;
        var anomalyFlag = '';
        if (val === null) { typeStr = chalk.gray('null'); anomalyFlag = chalk.yellow(' \u26A0\uFE0F NULL'); }
        else if (val === undefined) { typeStr = chalk.gray('undefined'); anomalyFlag = chalk.red(' \u26A0\uFE0F UNDEFINED'); }
        else if (Array.isArray(val)) { typeStr = chalk.cyan('Array[' + val.length + ']'); if (val.length === 0) anomalyFlag = chalk.yellow(' \u26A0\uFE0F EMPTY'); }
        else if (typeof val === 'object') { typeStr = chalk.cyan('Object{' + Object.keys(val).length + '}'); }
        else if (typeof val === 'boolean') typeStr = chalk.yellow(String(val));
        else if (typeof val === 'number') { typeStr = chalk.yellow(String(val)); if (isNaN(val)) anomalyFlag = chalk.red(' \u26A0\uFE0F NaN!'); else if (val < 0) anomalyFlag = chalk.yellow(' \u26A0\uFE0F NEGATIVE'); }
        else if (typeof val === 'string') { var p = val.length > 28 ? val.substring(0, 28) + '...' : val; typeStr = chalk.green('"' + p + '"'); }
        else typeStr = chalk.gray(typeof val);
        console.log('     ' + connector + '   ' + keyStr + ' ' + typeStr + anomalyFlag);
    });
}

// ═══════════════════════════════════════════════════════════════
// SUMMARY CARD
// ═══════════════════════════════════════════════════════════════

function summaryCard(data) {
    // In v5.0, summaryCard is now a simplified output inside the action block
    var ret = data.errors > 0 ? 1 : 0;
    var dur = data.duration;
    var dataLen = data.respSize || 0;
    var proto = data.compressed ? 'LZ' : 'RAW';

    console.log('');
    console.log('     \u{1F3CF}\u{FE0F} SUMMARY');
    if (data.userId) {
        console.log('     \u{1F464} User ......... ' + chalk.white(data.userId));
    }
    if (data.heroes !== undefined) {
        console.log('     \u{1F9B8} Heroes ........ ' + chalk.white(String(data.heroes)));
    }
    if (data.level !== undefined) {
        console.log('     \u{1F3C6} Level ......... ' + chalk.white(String(data.level)));
    }
    if (data.diamond !== undefined) {
        console.log('     \u{1F48E} Diamond ....... ' + chalk.white(String(data.diamond)));
    }
    if (data.fields !== undefined) {
        console.log('     \u{1F4E6} Fields ........ ' + chalk.white(String(data.fields)));
    }
    if (dur !== undefined) {
        console.log('     \u23F1\uFE0F  Duration ..... ' + chalk.cyan(dur + 'ms'));
    }
    console.log('     \u{1F4E6} Data .......... ' + chalk.white(dataLen.toLocaleString() + ' chars (' + proto + ')'));
    if (data.warnings > 0) {
        console.log('     \u26A0\uFE0F  Warnings ...... ' + chalk.yellow(String(data.warnings)));
    }
    if (data.errors > 0) {
        console.log('     \u274C Errors ........ ' + chalk.red(String(data.errors)));
    }
    console.log('');
}

// ═══════════════════════════════════════════════════════════════
// GLOBAL ERROR CAPTURE
// ═══════════════════════════════════════════════════════════════

function fatalCapture(err, origin) {
    sep();

    console.log(chalk.red.bold('  \u{1F4A5}  UNCAUGHT EXCEPTION  ' + chalk.white(origin || 'unknown')));
    sep();

    if (err === undefined || err === null) {
        console.log('     \u{1F527} error   : ' + chalk.yellow('undefined/null \u2014 no error object received'));
        console.log('     \u{1F4CE} hint    : ' + chalk.gray('Check process.on("uncaughtException") binding'));
        sep();
        return;
    }
    if (!(err instanceof Error)) {
        console.log('     \u{1F527} error   : ' + chalk.white(String(err)));
        console.log('     \u{1F4C4} type    : ' + chalk.yellow(typeof err + ' (not Error instance)'));
        sep();
        return;
    }

    console.log('     \u{1F527} error   : ' + chalk.white(err.message));
    console.log('     \u{1F4C4} type    : ' + chalk.yellow(err.constructor.name));

    if (err.stack) {
        var lines = err.stack.split('\n').slice(1, 6);
        console.log('     \u{1F4CD} stack   :');
        lines.forEach(function(line) {
            console.log('        ' + chalk.gray(line.trim()));
        });
        if (err.stack.split('\n').length > 6) {
            console.log('        ' + chalk.gray('... more stack lines ...'));
        }
    }

    sep();
}

function rejectionCapture(reason, promise) {
    sep();

    var reasonStr;
    if (reason === undefined || reason === null) {
        reasonStr = chalk.yellow('undefined/null \u2014 no rejection reason received');
    } else if (reason instanceof Error) {
        reasonStr = chalk.white(reason.message);
    } else {
        reasonStr = chalk.white(String(reason)) + chalk.gray(' (' + typeof reason + ')');
    }

    console.log(chalk.red.bold('  \u{1F4A5}  UNHANDLED REJECTION'));
    sep();

    console.log('     \u{1F527} reason  : ' + reasonStr);

    if (reason instanceof Error && reason.stack) {
        var lines = reason.stack.split('\n').slice(1, 4);
        console.log('     \u{1F4CD} stack   :');
        lines.forEach(function(line) {
            console.log('        ' + chalk.gray(line.trim()));
        });
    }

    sep();
}

// ═══════════════════════════════════════════════════════════════
// CONFIG AUDIT
// ═══════════════════════════════════════════════════════════════

function configAudit(config) {
    if (!config) return { passed: 0, issues: [] };

    var issues = [];
    var checks = [
        { name: 'serverVersion', check: function(c) { return c.serverVersion && c.serverVersion.length > 0; }, severity: 'error', impact: 'Client displays no/wrong version info', fix: 'config.serverVersion = "2026-05-15"' },
        { name: 'serverId', check: function(c) { return c.serverId !== undefined && c.serverId !== null; }, severity: 'error', impact: 'Server selection will fail', fix: 'config.serverId = 1 (number)' },
        { name: 'serverId type', check: function(c) { return typeof c.serverId === 'number' || typeof c.serverId === 'string'; }, severity: 'warn', impact: 'Client parser expects number for serverId', fix: 'Ensure config.serverId matches client expectation' },
        { name: 'port', check: function(c) { return c.port && c.port > 0 && c.port < 65536; }, severity: 'error', impact: 'Server will not start', fix: 'config.port = 8001' },
        { name: 'teaKey', check: function(c) { return c.teaKey && c.teaKey.length > 0; }, severity: 'warn', impact: 'TEA verification disabled \u2014 security risk', fix: 'config.teaKey = "verification" or custom key' },
        { name: 'sdkUrl', check: function(c) { return c.sdkUrl && c.sdkUrl.startsWith('http'); }, severity: 'warn', impact: 'SDK-Server authentication will fail', fix: 'config.sdkUrl = "http://127.0.0.1:9999"' },
        { name: 'chatUrl', check: function(c) { return c.chatUrl && c.chatUrl.startsWith('http') && !c.chatUrl.includes('127.0.0.1'); }, severity: 'warn', impact: 'Chat won\'t work in production (hardcoded localhost)', fix: 'Use process.env.CHAT_URL or env config' },
        { name: 'dungeonUrl', check: function(c) { return c.dungeonUrl && c.dungeonUrl.startsWith('http') && !c.dungeonUrl.includes('127.0.0.1'); }, severity: 'warn', impact: 'Dungeon won\'t work in production (hardcoded localhost)', fix: 'Use process.env.DUNGEON_URL or env config' },
        { name: 'resourcePath', check: function(c) { return c.resourcePath && typeof c.resourcePath === 'string'; }, severity: 'error', impact: 'Resources will not load \u2014 game broken', fix: 'config.resourcePath = "/path/to/resource/json"' },
        { name: 'currency', check: function(c) { return c.currency && typeof c.currency === 'string'; }, severity: 'warn', impact: 'Currency display may be wrong', fix: 'config.currency = "USD" or "CNY"' },
    ];

    var passed = 0;
    checks.forEach(function(c) {
        var ok = c.check(config);
        if (ok) {
            passed++;
        } else {
            issues.push({ name: c.name, severity: c.severity, impact: c.impact, fix: c.fix });
        }
    });

    if (issues.length === 0) {
        log('INFO', 'AUDIT', '\u2705 Config audit passed: ' + passed + '/' + checks.length + ' checks OK');
    } else {
        sep();
        console.log(chalk.yellow.bold('  \u{1F6E1}\uFE0F  CONFIG AUDIT  ' + issues.length + ' issues at startup'));
        sep();

        issues.forEach(function(issue) {
            var icon = issue.severity === 'error' ? '\u274C' : '\u26A0\uFE0F';
            var nameColor = issue.severity === 'error' ? chalk.red : chalk.yellow;
            console.log('     ' + icon + ' ' + nameColor(issue.name));
            console.log('          \u{1F4CE} impact : ' + chalk.white(issue.impact));
            console.log('          \u{1F527} fix    : ' + chalk.white(issue.fix));
        });

        sep();
    }

    return { passed: passed, issues: issues };
}

// ═══════════════════════════════════════════════════════════════
// LEGACY COMPAT STUBS — used by some handlers
// ═══════════════════════════════════════════════════════════════

function subHeader(emoji, title) {
    console.log('');
    console.log('     ' + emoji + ' ' + chalk.white.bold(title));
    console.log(chalk.dim('     ' + '\u2500'.repeat(50)));
}

function fieldBuild(index, total, fieldName, fieldType, extra) {
    var isLast = (index === total);
    var num = chalk.gray('[' + String(index).padStart(2, '0') + '/' + total + ']');
    var connector = isLast ? '\u2514' : '\u2502';
    console.log('     ' + connector + ' ' + num + ' ' + chalk.white(fieldName.padEnd(26)) + ' ' + chalk.cyan('(' + fieldType + ')'.padEnd(24)) + ' ' + (extra ? chalk.gray(extra) : ''));
}

function fieldMap(data, label) {
    if (!data || typeof data !== 'object') return;
    var keys = Object.keys(data);
    console.log('');
    console.log(chalk.yellow.bold('     \u{1F3D7}\u{FE0F} ' + (label || 'DATA CONSTRUCTION')));
    keys.forEach(function(key, i) {
        var val = data[key];
        var isLast = (i === keys.length - 1);
        var connector = isLast ? '\u2514\u2500' : '\u251C\u2500';
        var typeInfo;
        if (val === null) typeInfo = chalk.gray('null');
        else if (val === undefined) typeInfo = chalk.gray('undefined');
        else if (Array.isArray(val)) typeInfo = chalk.cyan('Array[' + val.length + ']');
        else if (typeof val === 'object') typeInfo = chalk.cyan('Object{' + Object.keys(val).length + '}');
        else if (typeof val === 'boolean') typeInfo = chalk.yellow(String(val));
        else if (typeof val === 'number') typeInfo = chalk.yellow(String(val));
        else if (typeof val === 'string') { var p = val.length > 25 ? val.substring(0, 25) + '...' : val; typeInfo = chalk.green('"' + p + '"'); }
        else typeInfo = chalk.gray(typeof val);
        console.log('     ' + connector + '   ' + chalk.white(key.padEnd(28)) + ' ' + typeInfo);
    });
}

function categoryBreakdown(categories) {
    if (!categories || categories.length === 0) return;
    var maxLabel = Math.max.apply(null, categories.map(function(c) { return String(c[1]).length; }));
    categories.forEach(function(cat, i) {
        var isLast = (i === categories.length - 1);
        var connector = isLast ? '\u2514\u2500' : '\u251C\u2500';
        var label = chalk.white(String(cat[1]).padEnd(maxLabel));
        var count = chalk.yellow(String(cat[2]));
        var typeStr = cat[3] ? chalk.dim(' (' + cat[3] + ')') : '';
        console.log('     ' + connector + ' ' + (cat[0] || '\u{1F4CB}') + ' ' + label + ' ' + count + ' fields' + typeStr);
    });
}

function objectTree(obj, label, maxKeys, maxDepth) {
    if (!obj || typeof obj !== 'object') {
        console.log('     \u2514\u2500 \u{1F4CB} ' + chalk.gray(label) + ' = ' + chalk.white(String(obj)));
        return;
    }
    var keys = Object.keys(obj);
    var total = keys.length;
    var show = Math.min(total, maxKeys || 15);
    console.log('     \u251C\u2500 \u{1F4D1} ' + chalk.magenta(label) + ' ' + chalk.gray('{' + total + ' keys}'));
    keys.slice(0, show).forEach(function(key, i) {
        var isLast = (i === show - 1) && (show >= total);
        var connector = isLast ? '\u2514' : '\u2502';
        var val = obj[key];
        var typeStr;
        if (val === null) typeStr = chalk.gray('null');
        else if (val === undefined) typeStr = chalk.gray('undefined');
        else if (Array.isArray(val)) typeStr = chalk.cyan('Array[' + val.length + ']');
        else if (typeof val === 'object') typeStr = chalk.cyan('Object{' + Object.keys(val).length + '}');
        else if (typeof val === 'boolean') typeStr = chalk.yellow(String(val));
        else if (typeof val === 'number') typeStr = chalk.yellow(String(val));
        else if (typeof val === 'string') { var p = val.length > 28 ? val.substring(0, 28) + '...' : val; typeStr = chalk.green('"' + p + '"'); }
        else typeStr = chalk.gray(typeof val);
        console.log('     ' + connector + '   ' + chalk.white(key.padEnd(28)) + ' ' + typeStr);
    });
    if (total > show) console.log('     \u2514   ' + chalk.gray('... +' + (total - show) + ' more keys'));
}

function dataPreview(label, data, maxDepth) {
    objectTree(data, label, 10, maxDepth);
}

function fieldStatus(key, value, status, detailStr, isLast) {
    var s = STATUS[status] || STATUS.default;
    var connector = isLast ? '\u2514\u2500' : '\u2502 ';
    var badge = s.color(s.emoji + ' ' + s.label);
    var d = detailStr ? chalk.dim('  ' + detailStr) : '';
    console.log('     ' + connector + '   ' + chalk.white(String(key).padEnd(32)) + ' ' + chalk.white(String(value).padEnd(20)) + ' ' + badge + d);
}

function warnCollapse(category, count, fields, hint) {
    if (count <= 1) return;
    var fieldStr = '';
    if (fields && fields.length > 0) {
        if (fields.length <= 4) {
            fieldStr = '\n          \u{1F4CE} fields : ' + chalk.white(fields.join(', '));
        } else {
            fieldStr = '\n          \u{1F4CE} fields : ' + chalk.white(fields.slice(0, 4).join(', ')) + chalk.gray(' +' + (fields.length - 4) + ' more');
        }
    }
    console.log('     \u26A0\uFE0F  ' + chalk.yellow(count + 'x ' + category) +
                (hint ? ' \u2014 auto-coerced' : '') + fieldStr);
}

// Legacy box functions (kept for backward compat)
function boxOpen(title, emoji, borderColor) { console.log(''); }
function boxLine() {}
function boxDetail() {}
function boxHighlight() {}
function boxClose() { console.log(''); }
function colorBox() {}
function boxTrace() {}
function traceRef() {}
function assertLine() {}
function sectionLine() {}

// Legacy handler functions
function handlerOpen() {}
function handlerClose() {}
function handlerDivider() {}
function handlerCrash() {}
function phaseBox() {}
function phase() {}
function phaseHeader() {}
function phaseDivider() {}
function payloadLog() {}
function phaseIcon(num) { return PHASE_ICONS[(num - 1) % PHASE_ICONS.length] || '\u{1F4CD}'; }
function serverBanner() {}
function teaChallenge() {}
function teaVerified() {}

// ReqId system (kept for compat but not used in v5.0 flow)
var _currentReqId = null;
var _reqIdCounter = 0;
function generateReqId() { _reqIdCounter++; var hex = (_reqIdCounter * 2654435761 >>> 0).toString(16).toUpperCase(); return hex.substring(0, 4).padStart(4, '0'); }
function getReqId() { return _currentReqId; }
function setReqId(id) { _currentReqId = id; }
function clearReqId() { _currentReqId = null; }

// ═══════════════════════════════════════════════════════════════
// EXPORTS — All 33 unique functions + constants
// ═══════════════════════════════════════════════════════════════

module.exports = {
    // --- v5.0 NEW ---
    actionHeader,
    actionFooter,
    summaryIdle,
    summaryFinal,

    // --- CORE (used by index.js + handlers) ---
    log,
    step,
    details,
    detail,

    // --- HEADERS (used by index.js) ---
    header,
    headerThin,
    headerEnd,
    subHeader,
    separator,
    separatorDouble,

    // --- TABLE ---
    table,

    // --- SOCKET ---
    socketEvent,

    // --- NO-OP STUBS (replaced in index.js) ---
    actionLog,
    requestDump,
    responseSummary,
    timing,

    // --- ERRORS ---
    errorWithStack,
    errorBanner,
    warnCallout,
    warningSection,

    // --- VALIDATION ---
    criticalFields,
    typeAssert,
    invariantCheck,
    mutationLog,
    deepTypeScan,

    // --- SAVE ---
    saveVerify,
    responseSnapshot,
    summaryCard,

    // --- GLOBAL ERROR CAPTURE ---
    fatalCapture,
    rejectionCapture,
    configAudit,

    // --- LEGACY COMPAT ---
    fieldBuild,
    fieldMap,
    categoryBreakdown,
    objectTree,
    dataPreview,
    fieldStatus,
    warnCollapse,
    boxOpen, boxLine, boxDetail, boxClose, boxHighlight, colorBox, boxTrace,
    traceRef, assertLine, sectionLine,
    handlerOpen, handlerClose, handlerDivider, handlerCrash,
    phaseBox, phase, phaseHeader, phaseDivider, phaseIcon,
    payloadLog, serverBanner, teaChallenge, teaVerified,

    // --- REQID ---
    generateReqId, getReqId, setReqId, clearReqId,

    // --- CONSTANTS ---
    LEVELS,
    MODULES,
    DATA_EMOJI,
    PHASE_ICONS,
    STATUS,
    TYPE_EMOJIS,

    // --- CHALK ---
    chalk,
};
