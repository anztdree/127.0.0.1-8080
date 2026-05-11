/**
 * logger.js — MAIN-SERVER Emoji Flow Logger (Style C) v3.0
 *
 * Konsisten dengan login-server logger: emoji + chalk + tree connectors
 * Dirancang untuk reverse engineering: rapi, detail, menarik, mudah dibaca.
 *
 * FORMAT:
 *   LEVEL_EMOJI HH:mm:ss.SSS LEVEL  MODULE_EMOJI MODULE ▸ Message
 *     ├ DETAIL_EMOJI key: value
 *     └ DETAIL_EMOJI key: value
 *
 * BOX SECTIONS:
 *   ┌ SECTION_TITLE ─────────────────────────────────────┐
 *   │  content...                                        │
 *   └────────────────────────────────────────────────────┘
 *
 * v3.0 NEW — Silent-Error Killer:
 *   errorBanner()  — 15+ baris MERAH, IMPOSSIBLE kelewat
 *   warnCallout()   — 7+ baris KUNING, terpisah dari info biasa
 *   criticalFields()— audit field yang bisa crash/stuck game
 *   summaryCard()   — ringkasan akhir yang LENGKAP
 *   statusBadge()   — badge per field (TRACED/DEFAULT/DEAD/MISSING)
 *   fieldStatus()   — shorthand single-line dengan badge
 *
 * Levels: DEBUG=0, INFO=1, WARN=2, ERROR=3
 * Default: INFO (set LOG_LEVEL=DEBUG for maximum verbosity)
 */

const chalk = require('chalk');

// ═══════════════════════════════════════════════════════════════
// LEVEL CONFIGURATION
// ═══════════════════════════════════════════════════════════════

const LEVELS = {
    DEBUG: { emoji: '\u{1F535}', color: chalk.cyan,   label: 'DEBUG', priority: 0 },
    INFO:  { emoji: '\u{1F7E2}', color: chalk.green,  label: 'INFO ', priority: 1 },
    WARN:  { emoji: '\u{1F7E1}', color: chalk.yellow, label: 'WARN ', priority: 2 },
    ERROR: { emoji: '\u{1F534}', color: chalk.red,    label: 'ERROR', priority: 3 },
};

const LOG_LEVEL = (process.env.LOG_LEVEL || 'INFO').toUpperCase();
const MIN_PRIORITY = LEVELS[LOG_LEVEL] ? LEVELS[LOG_LEVEL].priority : 1;

// ═══════════════════════════════════════════════════════════════
// MODULE CONFIGURATION
// ═══════════════════════════════════════════════════════════════

const MODULES = {
    ENTER:     { emoji: '\u{2694}\u{FE0F}',  color: chalk.magenta },  // enterGame handler
    BUILD:     { emoji: '\u{1F3D7}\u{FE0F}',  color: chalk.yellow },  // data construction
    UPDATE:    { emoji: '\u{1F504}',          color: chalk.blue },      // existing user update
    VALIDATE:  { emoji: '\u{1F50D}',          color: chalk.cyan },      // validation checks
    SOCKET:    { emoji: '\u{1F50C}',          color: chalk.blue },      // socket connect/disconnect
    HANDLER:   { emoji: '\u{2699}\u{FE0F}',  color: chalk.yellow },    // handler.process dispatcher
    TEA:       { emoji: '\u{1F510}',          color: chalk.magenta },   // TEA verification
    COMPRESS:  { emoji: '\u{1F4E6}',          color: chalk.green },     // LZ-string compression
    SDKAPI:    { emoji: '\u{1F4E1}',          color: chalk.yellow },    // SDK-Server API calls
    CONFIG:    { emoji: '\u{1F4CB}',          color: chalk.gray },      // configuration loading
    SERVER:    { emoji: '\u{1F680}',          color: chalk.green },     // server startup
    DB:        { emoji: '\u{1F4BE}',          color: chalk.cyan },      // database operations
    CIRCULAR:  { emoji: '\u{26A0}\u{FE0F}',  color: chalk.yellow },    // circular reference checks
    CLONE:     { emoji: '\u{1F916}',          color: chalk.cyan },      // deep clone operations
    SERIAL:    { emoji: '\u{1F4CB}',          color: chalk.white },     // JSON serialization
    RESP:      { emoji: '\u{1F4E4}',          color: chalk.green },     // response building
    SAVE:      { emoji: '\u{1F4BE}',          color: chalk.cyan },      // database save
    STEP:      { emoji: '\u{1F4CD}',          color: chalk.gray },      // pipeline step
    TRACE:     { emoji: '\u{1F50D}',          color: chalk.magenta },   // code trace reference
};

// ═══════════════════════════════════════════════════════════════
// DETAIL EMOJI
// ═══════════════════════════════════════════════════════════════

const DETAILS = {
    data:        '\u{1F4CB}',  // clipboard/data
    important:   '\u{1F4CC}',  // pushpin
    duration:    '\u{23F1}\u{FE0F}', // stopwatch
    location:    '\u{1F4CD}',  // round pushpin
    database:    '\u{1F4BE}',  // floppy disk
    config:      '\u{2699}\u{FE0F}', // gear
    request:     '\u{1F4E4}',  // outbox
    response:    '\u{1F4E5}',  // inbox
    session:     '\u{1F517}',  // link
    user:        '\u{1F464}',  // bust in silhouette
    hero:        '\u{1F9B8}',  // superhero
    currency:    '\u{1F4B0}',  // money bag
    dungeon:     '\u{2694}\u{FE0F}', // crossed swords
    team:        '\u{1F3AF}',  // direct hit
    skill:       '\u{2728}',  // sparkles
    equip:       '\u{1F392}',  // school bag / armor
    summon:      '\u{2728}',  // sparkles
    guild:       '\u{1F3DB}\u{FE0F}', // classical building
    gift:        '\u{1F381}',  // wrapped gift
    check:       '\u{2705}',  // check mark
    warn:        '\u{26A0}\u{FE0F}', // warning
    error:       '\u{274C}',  // cross mark
    success:     '\u{2705}',  // check mark
    info:        '\u{2139}\u{FE0F}', // information
    server:      '\u{1F310}',  // globe
    size:        '\u{1F4CF}',  // straight ruler
    field:       '\u{1F4D1}',  // bookmark tabs
    trace:       '\u{1F50D}',  // magnifying glass
    source:      '\u{1F4C4}',  // page facing up (code source)
    memory:      '\u{1F9E0}',  // brain
    arrow:       '\u{27A1}\u{FE0F}', // right arrow
    target:      '\u{1F3AF}',  // direct hit
    flag:        '\u{1F6A9}',  // triangular flag
    star:        '\u{2B50}',  // star
    diamond:     '\u{1F48E}',  // gem stone
    gold:        '\u{1FA99}',  // gold coin
    key:         '\u{1F511}',  // key
    lock:        '\u{1F512}',  // locked
    unlock:      '\u{1F513}',  // unlocked
    rocket:      '\u{1F680}',  // rocket
    zap:         '\u{26A1}',  // high voltage
    fire:        '\u{1F525}',  // fire
    shield:      '\u{1F6E1}\u{FE0F}', // shield
    hammer:      '\u{1F528}',  // hammer
    tool:        '\u{1F6E0}\u{FE0F}', // tools
    bookmark:    '\u{1F516}',  // bookmark
    tag:         '\u{1F3F7}\u{FE0F}', // label
    counter:     '\u{1F522}',  // input numbers
    chart:       '\u{1F4C8}',  // chart increasing
    folder:      '\u{1F4C1}',  // folder
    package:     '\u{1F4E6}',  // package
};

// ═══════════════════════════════════════════════════════════════
// TIMESTAMP
// ═══════════════════════════════════════════════════════════════

function ts() {
    const d = new Date();
    return chalk.gray(
        String(d.getHours()).padStart(2, '0') + ':' +
        String(d.getMinutes()).padStart(2, '0') + ':' +
        String(d.getSeconds()).padStart(2, '0') + '.' +
        String(d.getMilliseconds()).padStart(3, '0')
    );
}

// ═══════════════════════════════════════════════════════════════
// BOX WIDTH CONFIG
// ═══════════════════════════════════════════════════════════════

const BOX_WIDTH = 58;

// ═══════════════════════════════════════════════════════════════
// CORE LOG — Main header line
// ═══════════════════════════════════════════════════════════════

function log(level, module, message) {
    const lv = LEVELS[level] || LEVELS.INFO;
    if (lv.priority < MIN_PRIORITY) return;

    const md = MODULES[module] || { emoji: '\u{26AA}', color: chalk.white };
    const levelStr = lv.color(lv.label);
    const modStr = md.color(module.padEnd(8));

    console.log(
        `${lv.emoji} ${ts()} ${levelStr} ${md.emoji} ${modStr} \u25B8 ${chalk.white.bold(message)}`
    );
}

// ═══════════════════════════════════════════════════════════════
// DETAIL LINES — Tree-structured sub-entries
// ═══════════════════════════════════════════════════════════════

/**
 * Single detail line with tree connector
 * @param {string} type - Detail type for emoji (e.g. 'data', 'user', 'hero')
 * @param {string} key - Key name
 * @param {string} value - Value to display
 * @param {boolean} isLast - Whether this is the last item in the group
 */
function detail(type, key, value, isLast) {
    if (LEVELS.DEBUG.priority < MIN_PRIORITY && type !== 'important' && type !== 'warn' && type !== 'error') return;
    const emoji = DETAILS[type] || DETAILS.data;
    const connector = isLast ? '\u2514' : '\u251C';
    const line = `${chalk.dim(key + ':')} ${chalk.white(String(value))}`;
    console.log(`  ${connector} ${emoji} ${line}`);
}

/**
 * Multi-detail with automatic tree connectors
 * @param {string} type - Detail type for emoji
 * @param  {...[string, string]} pairs - Array of [key, value] pairs
 */
function details(type, ...pairs) {
    if (LEVELS.DEBUG.priority < MIN_PRIORITY && type !== 'important' && type !== 'warn' && type !== 'error') return;
    const emoji = DETAILS[type] || DETAILS.data;
    pairs.forEach((p, i) => {
        const isLast = (i === pairs.length - 1);
        const connector = isLast ? '\u2514' : '\u251C';
        if (Array.isArray(p)) {
            const line = `${chalk.dim(p[0] + ':')} ${chalk.white(String(p[1]))}`;
            console.log(`  ${connector} ${emoji} ${line}`);
        } else {
            console.log(`  ${connector} ${emoji} ${chalk.dim(String(p))}`);
        }
    });
}

// ═══════════════════════════════════════════════════════════════
// BOX SECTION — Visual grouping for related data
// ═══════════════════════════════════════════════════════════════

/**
 * Open a box section with optional border color
 * @param {string} title - Section title (e.g. 'STARTER HERO', 'CURRENCY')
 * @param {string} emoji - Optional emoji prefix
 * @param {Function} borderColor - chalk color function for border (default: magenta)
 */
function boxOpen(title, emoji, borderColor) {
    const prefix = emoji ? emoji + ' ' : '';
    const label = prefix + title;
    const bc = borderColor || chalk.magenta;
    const width = BOX_WIDTH;
    console.log('');
    console.log(`  \u250C ${bc.bold(label)} ${chalk.gray('\u2500'.repeat(Math.max(1, width - label.length - 1)))}\u2510`);
}

/**
 * Open a colored box section — green for success, yellow for warn, red for error
 * @param {string} title - Section title
 * @param {string} emoji - Optional emoji prefix
 * @param {string} type - 'success' | 'warn' | 'error' | 'info' | 'debug'
 */
function colorBox(title, emoji, type) {
    const colorMap = {
        success: chalk.green,
        warn: chalk.yellow,
        error: chalk.red,
        info: chalk.cyan,
        debug: chalk.blue,
    };
    const bc = colorMap[type] || chalk.magenta;
    boxOpen(title, emoji, bc);
    return bc;
}

/**
 * Add a line inside a box section
 * @param {string} content - The content to display
 * @param {string} emoji - Optional emoji prefix
 */
function boxLine(content, emoji) {
    const prefix = emoji ? emoji + ' ' : '  ';
    console.log(`  \u2502 ${prefix}${content}`);
}

/**
 * Add a key=value line inside a box section
 * @param {string} key - Key name
 * @param {string} value - Value to display
 * @param {string} emoji - Optional emoji prefix
 * @param {boolean} isLast - Whether this is the last boxLine before boxClose
 */
function boxDetail(key, value, emoji, isLast) {
    const prefix = emoji ? emoji + ' ' : '  ';
    const connector = isLast ? '\u2514' : '\u2502';
    console.log(`  ${connector} ${prefix}${chalk.dim(key + ':')} ${chalk.white(String(value))}`);
}

/**
 * Add a highlighted value line inside a box (value is colored)
 * @param {string} key - Key name
 * @param {string} value - Value to display (will be colored)
 * @param {string} emoji - Optional emoji prefix
 * @param {string} valueColor - 'green' | 'yellow' | 'red' | 'cyan' | 'magenta'
 * @param {boolean} isLast - Whether this is the last line
 */
function boxHighlight(key, value, emoji, valueColor, isLast) {
    const prefix = emoji ? emoji + ' ' : '  ';
    const connector = isLast ? '\u2514' : '\u2502';
    const colorMap = {
        green: chalk.green,
        yellow: chalk.yellow,
        red: chalk.red,
        cyan: chalk.cyan,
        magenta: chalk.magenta,
        white: chalk.white.bold,
    };
    const vc = colorMap[valueColor] || chalk.white;
    console.log(`  ${connector} ${prefix}${chalk.dim(key + ':')} ${vc(String(value))}`);
}

/**
 * Close a box section
 */
function boxClose() {
    console.log(`  \u2514${chalk.gray('\u2500'.repeat(BOX_WIDTH))}\u2518`);
    console.log('');
}

// ═══════════════════════════════════════════════════════════════
// TRACE REFERENCE — Show main.min.js code trace
// ═══════════════════════════════════════════════════════════════

/**
 * Show a code trace reference line (for reverse engineering)
 * @param {string} location - Code location (e.g. 'L5319', 'L134098')
 * @param {string} description - What the code does
 * @param {string} consumer - Which client function consumes this data
 */
function traceRef(location, description, consumer) {
    if (LEVELS.DEBUG.priority < MIN_PRIORITY) return;
    const loc = chalk.magenta.bold(location);
    const desc = chalk.white(description);
    const cons = consumer ? chalk.dim(`\u2192 ${consumer}`) : '';
    console.log(`  \u2502 ${chalk.dim('\u{1F4C4} TRACE')} ${loc}  ${desc} ${cons}`);
}

/**
 * Show trace reference inside a box (as boxLine)
 * @param {string} location - Code location
 * @param {string} description - What the code does
 */
function boxTrace(location, description) {
    if (LEVELS.DEBUG.priority < MIN_PRIORITY) return;
    const loc = chalk.magenta.bold(location);
    const desc = chalk.gray(description);
    console.log(`  \u2502 \u{1F4C4} ${loc}  ${desc}`);
}

// ═══════════════════════════════════════════════════════════════
// OBJECT TREE — Pretty-print nested object
// ═══════════════════════════════════════════════════════════════

/**
 * Display object structure as a tree with type info
 * @param {object} obj - Object to display
 * @param {string} label - Section label
 * @param {number} maxKeys - Max keys to show (default 15)
 * @param {number} maxDepth - Max nesting depth (default 1)
 */
function objectTree(obj, label, maxKeys, maxDepth) {
    if (LEVELS.DEBUG.priority < MIN_PRIORITY) return;
    if (!obj || typeof obj !== 'object') {
        console.log(`  \u2514 ${DETAILS.data} ${chalk.gray(label)} = ${chalk.white(String(obj))}`);
        return;
    }

    const keys = Object.keys(obj);
    const total = keys.length;
    const show = Math.min(total, maxKeys || 15);

    console.log(`  \u251C ${DETAILS.field} ${chalk.magenta(label)} ${chalk.gray(`{${total} keys}`)}`);

    keys.slice(0, show).forEach((key, i) => {
        const isLast = (i === show - 1) && (show >= total);
        const connector = isLast ? '\u2514' : '\u2502';
        const val = obj[key];

        let typeStr;
        if (val === null) {
            typeStr = chalk.gray('null');
        } else if (val === undefined) {
            typeStr = chalk.gray('undefined');
        } else if (Array.isArray(val)) {
            typeStr = chalk.cyan(`Array[${val.length}]`);
        } else if (typeof val === 'object') {
            const subKeys = Object.keys(val).length;
            typeStr = chalk.cyan(`Object{${subKeys}}`);
        } else if (typeof val === 'boolean') {
            typeStr = chalk.yellow(String(val));
        } else if (typeof val === 'number') {
            typeStr = chalk.yellow(String(val));
        } else if (typeof val === 'string') {
            const preview = val.length > 28 ? val.substring(0, 28) + '...' : val;
            typeStr = chalk.green(`"${preview}"`);
        } else {
            typeStr = chalk.gray(typeof val);
        }

        const keyStr = chalk.white(key.padEnd(28));
        console.log(`  ${connector}   ${keyStr} ${typeStr}`);
    });

    if (total > show) {
        console.log(`  \u2514   ${chalk.gray(`... +${total - show} more keys`)}`);
    }
}

// ═══════════════════════════════════════════════════════════════
// SECTION HEADERS
// ═══════════════════════════════════════════════════════════════

/** Main section header — bold box */
function header(title) {
    console.log('');
    const width = BOX_WIDTH + 2;
    const inner = title.padEnd(width - 4);
    console.log(chalk.magenta(`  \u2554${'\u2550'.repeat(width)}\u2557`));
    console.log(chalk.magenta('  \u2551') + chalk.magenta.bold('  ' + inner + '  ') + chalk.magenta('\u2551'));
    console.log(chalk.magenta(`  \u255A${'\u2550'.repeat(width)}\u255D`));
    console.log('');
}

/** Thin separator header */
function headerThin(title) {
    console.log('');
    console.log(chalk.magenta('  \u250C\u2500 ' + title + ' ' + '\u2500'.repeat(Math.max(1, 52 - title.length)) + '\u2510'));
    console.log('');
}

/** Section end — double line */
function headerEnd() {
    console.log('');
    console.log(chalk.gray('  \u2500'.repeat(30)));
    console.log('');
}

/** Sub-section divider with emoji */
function subHeader(emoji, title) {
    console.log('');
    console.log(`  ${emoji} ${chalk.white.bold(title)}`);
    console.log(chalk.gray('  ' + '\u2500'.repeat(54)));
}

// ═══════════════════════════════════════════════════════════════
// SEPARATOR — Visual divider
// ═══════════════════════════════════════════════════════════════

function separator(char) {
    const c = char || '\u2500';
    console.log(chalk.gray('  ' + c.repeat(BOX_WIDTH)));
}

/** Double separator for emphasis */
function separatorDouble() {
    console.log(chalk.gray('  \u2550'.repeat(BOX_WIDTH)));
}

// ═══════════════════════════════════════════════════════════════
// SOCKET EVENT — Connection lifecycle
// ═══════════════════════════════════════════════════════════════

function socketEvent(event, socketId, ip, transport, extra) {
    const sid = socketId ? chalk.white(socketId.substring(0, 8)) + chalk.gray('...') : chalk.gray('?');

    if (event === 'connect') {
        console.log('');
        console.log(chalk.green.bold('  \u2795 NEW CONNECTION') + chalk.gray(' \u2500'.repeat(42)));
        details('session',
            ['id', socketId],
            ['ip', ip],
            ['transport', transport]
        );
    } else if (event === 'disconnect') {
        console.log('');
        console.log(chalk.red.bold('  \u2796 DISCONNECT') + chalk.gray(' \u2500'.repeat(46)));
        console.log(`  \u2514 ${DETAILS.session} ${chalk.dim('reason:')} ${chalk.white(extra || '?')}  ${chalk.dim('sid=')} ${sid}`);
    } else {
        console.log(`  \u2502 ${chalk.cyan(event.padEnd(14))} ${chalk.dim('sid=')} ${sid}  ${chalk.dim('ip=')} ${chalk.white(ip)}  ${chalk.dim('tp=')} ${transport}`);
        if (extra) {
            console.log(`  \u2514 ${chalk.dim(extra)}`);
        }
    }
}

// ═══════════════════════════════════════════════════════════════
// ACTION LOG — Request/Response flow
// ═══════════════════════════════════════════════════════════════

function actionLog(direction, action, status, err, extra) {
    if (direction === 'req') {
        console.log('');
        console.log(`  \u{1F4E4} ${chalk.bold.cyan(action.padEnd(22))} ${chalk.gray('\u2500'.repeat(34))}`);
    } else {
        const statusEmoji = status === 'OK' ? '\u2705' : '\u274C';
        const statusColor = status === 'OK' ? chalk.green : chalk.red;
        const barColor = status === 'OK' ? chalk.green : chalk.red;
        console.log(`${statusEmoji} ${chalk.cyan(action.padEnd(22))} ${statusColor(status.padEnd(6))} ${barColor('\u2500'.repeat(28))}`);
        if (extra) {
            console.log(`  \u2514 ${chalk.dim(extra)}`);
        }
    }
}

// ═══════════════════════════════════════════════════════════════
// PERFORMANCE — Timing with visual bar
// ═══════════════════════════════════════════════════════════════

function timing(label, startTimeMs) {
    const elapsed = Date.now() - startTimeMs;
    const color = elapsed > 2000 ? chalk.red : elapsed > 1000 ? chalk.yellow : elapsed > 500 ? chalk.cyan : chalk.green;
    const barCount = Math.min(Math.floor(elapsed / 100), 20);
    const bar = elapsed > 100 ? '\u2588'.repeat(barCount) : '';
    const barColor = elapsed > 2000 ? chalk.red : elapsed > 1000 ? chalk.yellow : chalk.green;
    console.log(`  \u2514 ${DETAILS.duration} ${chalk.dim(label + ':')} ${color(elapsed + 'ms')} ${barColor(bar)}`);
}

// ═══════════════════════════════════════════════════════════════
// ERROR WITH STACK
// ═══════════════════════════════════════════════════════════════

function errorWithStack(module, message, err) {
    console.log('');
    console.log(chalk.red.bold('  \u274C ERROR: ' + module) + chalk.gray(' \u2500'.repeat(46)));
    console.log(`  \u251C ${DETAILS.error} ${chalk.dim('msg:')} ${chalk.white(message)}`);
    if (err) {
        console.log(`  \u251C ${DETAILS.error} ${chalk.dim('err:')} ${chalk.red(err.message)}`);
        if (err.stack) {
            console.log(chalk.gray('  \u250C' + '\u2500'.repeat(56) + '\u2510'));
            err.stack.split('\n').slice(1, 6).forEach((line, i) => {
                const prefix = i < 4 ? chalk.gray('\u2502') : chalk.gray('\u2514');
                const suffix = i < 4 ? chalk.gray('\u2502') : '';
                console.log(`  ${prefix} ${chalk.gray(line.trim().padEnd(56))} ${suffix}`);
            });
            if (err.stack.split('\n').length > 6) {
                console.log(`  ${chalk.gray('\u2502')} ${chalk.gray('... more stack lines ...'.padEnd(56))} ${chalk.gray('\u2502')}`);
            }
            console.log(chalk.gray('  \u2514' + '\u2500'.repeat(56) + '\u2518'));
        }
    }
    console.log('');
}

// ═══════════════════════════════════════════════════════════════
// REQUEST DUMP — Full request data in box
// ═══════════════════════════════════════════════════════════════

function requestDump(request) {
    if (LEVELS.DEBUG.priority < MIN_PRIORITY) return;
    if (!request || typeof request !== 'object') return;

    const keys = Object.keys(request);
    console.log('');
    console.log(chalk.gray('  \u250C' + '\u2500'.repeat(56) + '\u2510'));
    console.log(chalk.gray('  \u2502') + chalk.white.bold('  \u{1F4E4} REQUEST PAYLOAD'.padEnd(58)) + chalk.gray('\u2502'));
    console.log(chalk.gray('  \u251C' + '\u2500'.repeat(56) + '\u2524'));

    keys.forEach((key, i) => {
        const isLast = (i === keys.length - 1);
        const val = request[key];
        const connector = isLast ? '\u2514' : '\u2502';
        let valStr;
        if (val === null) valStr = chalk.gray('null');
        else if (val === undefined) valStr = chalk.gray('undefined');
        else if (typeof val === 'string') {
            const preview = val.length > 40 ? val.substring(0, 40) + chalk.gray('...') : val;
            valStr = chalk.green(`"${preview}"`);
        } else if (typeof val === 'object') {
            valStr = chalk.cyan(JSON.stringify(val).substring(0, 50));
        } else {
            valStr = chalk.yellow(String(val));
        }
        console.log(`  ${connector}   ${chalk.white(key.padEnd(20))} ${valStr}`);
    });

    console.log(chalk.gray('  \u2514' + '\u2500'.repeat(56) + '\u2518'));
}

// ═══════════════════════════════════════════════════════════════
// RESPONSE SUMMARY — Response metrics
// ═══════════════════════════════════════════════════════════════

function responseSummary(ret, dataLen, compressed, duration) {
    const status = ret === 0 ? chalk.green.bold('\u2705 SUCCESS') : chalk.red.bold(`\u274C ERROR(${ret})`);
    const comp = compressed ? chalk.green('LZ-STRING') : chalk.gray('RAW');
    const durColor = duration > 2000 ? chalk.red : duration > 1000 ? chalk.yellow : chalk.green;

    console.log('');
    console.log(`  ${status}  ${chalk.dim('\u{1F4CF} data=')} ${chalk.white(dataLen + ' chars')}  ${chalk.dim('\u{1F4E6} proto=')} ${comp}  ${chalk.dim('\u{23F1}\u{FE0F} time=')} ${durColor(duration + 'ms')}`);
    console.log('');
}

// ═══════════════════════════════════════════════════════════════
// DATA PREVIEW — Show object structure summary
// ═══════════════════════════════════════════════════════════════

function dataPreview(label, data, maxDepth = 1) {
    if (LEVELS.DEBUG.priority < MIN_PRIORITY) return;
    if (!data || typeof data !== 'object') {
        console.log(`  \u2514 ${DETAILS.data} ${chalk.gray(label)} = ${chalk.white(String(data))}`);
        return;
    }

    const keys = Object.keys(data);
    const totalKeys = keys.length;
    console.log(`  \u251C ${DETAILS.field} ${chalk.magenta(label)} ${chalk.gray(`{${totalKeys} keys}`)}`);

    if (maxDepth <= 0) return;

    const showCount = Math.min(totalKeys, 10);
    keys.slice(0, showCount).forEach((key, i) => {
        const isLast = (i === showCount - 1) && (showCount >= totalKeys);
        const connector = isLast ? '\u2514' : '\u2502';
        const val = data[key];

        if (val === null) {
            console.log(`  ${connector}   ${chalk.white(key)}: ${chalk.gray('null')}`);
        } else if (val === undefined) {
            console.log(`  ${connector}   ${chalk.white(key)}: ${chalk.gray('undefined')}`);
        } else if (Array.isArray(val)) {
            console.log(`  ${connector}   ${chalk.white(key)}: ${chalk.cyan(`Array[${val.length}]`)}`);
        } else if (typeof val === 'object') {
            const subKeys = Object.keys(val).length;
            console.log(`  ${connector}   ${chalk.white(key)}: ${chalk.cyan(`{${subKeys}}`)}`);
        } else if (typeof val === 'string') {
            const preview = val.length > 30 ? val.substring(0, 30) + '...' : val;
            console.log(`  ${connector}   ${chalk.white(key)}: ${chalk.green(`"${preview}"`)}`);
        } else if (typeof val === 'boolean') {
            console.log(`  ${connector}   ${chalk.white(key)}: ${chalk.yellow(String(val))}`);
        } else {
            console.log(`  ${connector}   ${chalk.white(key)}: ${chalk.yellow(String(val))}`);
        }
    });

    if (totalKeys > showCount) {
        console.log(`  \u2514   ${chalk.gray(`... +${totalKeys - showCount} more keys`)}`);
    }
}

// ═══════════════════════════════════════════════════════════════
// TABLE — Simple key=value table
// ═══════════════════════════════════════════════════════════════

function table(rows) {
    if (LEVELS.DEBUG.priority < MIN_PRIORITY) return;
    if (!rows || rows.length === 0) return;

    const keyWidth = Math.max(...rows.map(r => String(r[0]).length)) + 2;

    rows.forEach((row, i) => {
        const isLast = (i === rows.length - 1);
        const connector = isLast ? '\u2514' : '\u2502';
        const key = chalk.white(String(row[0]).padEnd(keyWidth));
        const val = typeof row[1] === 'number' ? chalk.yellow(String(row[1])) : chalk.cyan(String(row[1]));
        console.log(`  ${connector} ${key} ${chalk.dim(':')} ${val}`);
    });
}

// ═══════════════════════════════════════════════════════════════
// FIELD BUILD LOG — Show each field being built
// ═══════════════════════════════════════════════════════════════

function fieldBuild(index, total, fieldName, fieldType, extra) {
    if (LEVELS.DEBUG.priority < MIN_PRIORITY) return;
    const isLast = (index === total);
    const num = chalk.gray(`[${String(index).padStart(2)}/${total}]`);
    const connector = isLast ? '\u2514' : '\u2502';
    const name = chalk.white(fieldName.padEnd(26));
    const type = chalk.cyan(`(${fieldType})`.padEnd(24));
    const info = extra ? chalk.gray(extra) : '';
    console.log(`  ${connector} ${num} ${name} ${type} ${info}`);
}

// ═══════════════════════════════════════════════════════════════
// STEP LOG — Pipeline step indicator with visual bar
// ═══════════════════════════════════════════════════════════════

/**
 * Log a pipeline step with optional result
 * @param {number} current - Current step number
 * @param {number} total - Total steps
 * @param {string} description - Step description
 * @param {string} result - Result: 'ok', 'fail', 'warn', 'new', 'skip', 'running'
 * @param {string} extra - Extra detail text
 */
function step(current, total, description, result, extra) {
    const num = chalk.gray(`[${String(current).padStart(2)}/${String(total).padStart(2)}]`);

    let icon, color;
    if (result === 'ok' || result === 'pass') {
        icon = '\u2705';
        color = chalk.green;
    } else if (result === 'fail') {
        icon = '\u274C';
        color = chalk.red;
    } else if (result === 'warn') {
        icon = '\u{26A0}\u{FE0F}';
        color = chalk.yellow;
    } else if (result === 'new') {
        icon = '\u{1F31F}';
        color = chalk.magenta;
    } else if (result === 'skip') {
        icon = '\u23ED';
        color = chalk.gray;
    } else if (result === 'running') {
        icon = '\u{1F504}';
        color = chalk.cyan;
    } else {
        icon = '\u{1F504}';
        color = chalk.cyan;
    }

    // Visual progress bar
    let bar;
    if (result === 'fail' || result === 'skip') {
        // ALL empty blocks — nothing filled, makes fail/skip very visible
        bar = chalk.gray('\u2591'.repeat(total));
    } else if (result === 'warn') {
        // Completed up to this step, rest empty — warning highlight
        const filled = '\u2588'.repeat(current - 1);
        const warnBlock = chalk.yellow('\u2588');
        const empty = '\u2591'.repeat(total - current);
        bar = chalk.green(filled) + warnBlock + chalk.gray(empty);
    } else if (result === 'running') {
        const filled = '\u2588'.repeat(current - 1);
        const empty = '\u2591'.repeat(total - current);
        bar = chalk.gray(filled) + chalk.cyan('\u2588') + chalk.gray(empty);
    } else {
        // ok, pass, new — all completed steps green
        const filled = '\u2588'.repeat(current);
        const empty = '\u2591'.repeat(total - current);
        bar = chalk.green(filled) + chalk.gray(empty);
    }

    const desc = color(description);
    const extraStr = extra ? chalk.dim('  ' + extra) : '';

    console.log(`  ${num} ${icon} ${desc}  ${bar}${extraStr}`);
}

// ═══════════════════════════════════════════════════════════════
// FIELD MAP — Compact list of all fields with type/size info
// ═══════════════════════════════════════════════════════════════

function fieldMap(data, label) {
    if (LEVELS.DEBUG.priority < MIN_PRIORITY) return;
    if (!data || typeof data !== 'object') return;

    const keys = Object.keys(data);
    const total = keys.length;

    boxOpen(label || 'DATA CONSTRUCTION', '\u{1F3D7}\u{FE0F}');

    keys.forEach((key, i) => {
        const val = data[key];
        const isLast = (i === total - 1);
        const connector = isLast ? '\u2514' : '\u2502';

        let typeInfo;
        if (val === null) {
            typeInfo = chalk.gray('null');
        } else if (val === undefined) {
            typeInfo = chalk.gray('undefined');
        } else if (Array.isArray(val)) {
            typeInfo = chalk.cyan(`Array[${val.length}]`);
        } else if (typeof val === 'object') {
            const subKeys = Object.keys(val).length;
            typeInfo = chalk.cyan(`Object{${subKeys}}`);
        } else if (typeof val === 'boolean') {
            typeInfo = chalk.yellow(String(val));
        } else if (typeof val === 'number') {
            typeInfo = chalk.yellow(String(val));
        } else if (typeof val === 'string') {
            const preview = val.length > 25 ? val.substring(0, 25) + '...' : val;
            typeInfo = chalk.green(`"${preview}"`);
        } else {
            typeInfo = chalk.gray(typeof val);
        }

        const keyStr = chalk.white(key.padEnd(28));
        console.log(`  ${connector}   ${keyStr} ${typeInfo}`);
    });

    boxClose();
}

// ═══════════════════════════════════════════════════════════════
// CATEGORY COUNTER — Visual field category summary
// ═══════════════════════════════════════════════════════════════

/**
 * Show a visual category breakdown (for final summary)
 * @param {Array} categories - Array of [emoji, label, count, typeColor]
 */
function categoryBreakdown(categories) {
    if (!categories || categories.length === 0) return;

    const maxLabel = Math.max(...categories.map(c => String(c[1]).length));
    categories.forEach((cat, i) => {
        const isLast = (i === categories.length - 1);
        const connector = isLast ? '\u2514' : '\u2502';
        const emoji = cat[0] || DETAILS.data;
        const label = chalk.white(String(cat[1]).padEnd(maxLabel));
        const count = chalk.yellow(String(cat[2]));
        const typeStr = cat[3] ? chalk.dim(`(${cat[3]})`) : '';
        console.log(`  ${connector} ${emoji} ${label} ${count} fields ${typeStr}`);
    });
}

// ═══════════════════════════════════════════════════════════════
// v3.0 — ERROR BANNER — thin border, IMPOSSIBLE kelewat
// Untuk error SILENT yang main-server biasanya sembunyikan.
// ═══════════════════════════════════════════════════════════════

/**
 * Full-width ERROR BANNER — impossible to miss in any log output.
 * Use for CRITICAL errors that would otherwise be silent in the game server.
 *
 * @param {object} opts
 * @param {string} opts.module     - Module name (ENTER, BUILD, etc.)
 * @param {string} opts.step      - Step context e.g. '06/10 Circular Reference Check'
 * @param {string} opts.message   - What happened
 * @param {string} opts.trace     - main.min.js line reference e.g. 'L121387'
 * @param {string} opts.consumer  - Client function that consumes this data
 * @param {string} opts.impact    - What will happen if this error is ignored
 * @param {string} opts.fix       - What the server did to handle it
 * @param {Error}  [opts.err]     - Optional Error object for stack trace
 */
function errorBanner(opts) {
    const W = 62;
    const r = chalk.red.bold;
    const rb = chalk.red;
    const w = chalk.white;
    const g = chalk.gray;
    const y = chalk.yellow;
    const m = chalk.magenta;

    console.log('');
    console.log(r('  ┌' + '─'.repeat(W) + '┐'));
    if (opts.step)        console.log(r('  │') + '  ' + r('❌ FATAL ERROR AT STEP ' + opts.step) + rb(' '.repeat(Math.max(0, W - 26 - opts.step.length))) + r('│'));
    console.log(rb('  │') + g(' '.repeat(W)) + rb('│'));
    if (opts.module)      console.log(rb('  │') + '  ' + g('STEP:   ') + w(opts.module) + g(' '.repeat(Math.max(0, W - 10 - opts.module.length))) + rb('│'));
    if (opts.message)     console.log(rb('  │') + '  ' + g('REASON: ') + w.bold(opts.message) + g(' '.repeat(Math.max(0, W - 10 - opts.message.length))) + rb('│'));
    if (opts.trace)       console.log(rb('  │') + '  ' + g('DETAIL: ') + m.bold(opts.trace) + g(' '.repeat(Math.max(0, W - 10 - opts.trace.length))) + rb('│'));
    if (opts.consumer)    console.log(rb('  │') + '  ' + g('CLIENT: ') + g(opts.consumer) + g(' '.repeat(Math.max(0, W - 10 - opts.consumer.length))) + rb('│'));
    console.log(rb('  │') + g(' '.repeat(W)) + rb('│'));
    if (opts.impact)      console.log(rb('  │') + '  ' + y('IMPACT:  ') + y.bold(opts.impact) + g(' '.repeat(Math.max(0, W - 10 - opts.impact.length))) + rb('│'));
    if (opts.fix)         console.log(rb('  │') + '  ' + g('FIX:     ') + g(opts.fix) + g(' '.repeat(Math.max(0, W - 10 - opts.fix.length))) + rb('│'));
    console.log(rb('  │') + g(' '.repeat(W)) + rb('│'));

    // Stack trace inside banner
    if (opts.err && opts.err.stack) {
        const lines = opts.err.stack.split('\n').slice(1, 5);
        lines.forEach((line, i) => {
            const trimmed = line.trim().substring(0, W - 4);
            const prefix = i < lines.length - 1 ? '  │  ' : '  └  ';
            console.log(rb('  │') + '  ' + g(prefix + trimmed.padEnd(W - 4)) + rb('│'));
        });
        if (opts.err.stack.split('\n').length > 5) {
            console.log(rb('  │') + '  ' + g('     ... more stack lines ...'.padEnd(W - 4)) + rb('│'));
        }
        console.log(rb('  │') + g(' '.repeat(W)) + rb('│'));
    }

    console.log(r('  └' + '─'.repeat(W) + '┘'));
    console.log('');
}

// ═══════════════════════════════════════════════════════════════
// v3.0 — WARN CALLOUT — clean indent format, no box borders
// Untuk warning yang gampang kelewat di antara ratusan baris log.
// ═══════════════════════════════════════════════════════════════

/**
 * WARNING CALLOUT — clearly separated from normal log lines.
 * Use for non-fatal issues that need attention during reverse engineering.
 *
 * @param {string} message  - What the warning is about
 * @param {object} opts
 * @param {string} [opts.source]  - Code source reference (e.g. 'main.min.js L121387')
 * @param {string} [opts.action]  - What the server did to handle it
 * @param {string} [opts.reason]  - Why this happened (root cause explanation)
 * @param {string} [opts.module]  - Module name for context
 */
function warnCallout(message, opts) {
    opts = opts || {};
    const y = chalk.yellow;
    const yb = chalk.yellow.bold;
    const w = chalk.white;
    const g = chalk.gray;
    const m = chalk.magenta;

    console.log('');
    console.log(yb('  ⚠️  ') + w.bold(message));
    if (opts.source) console.log('       ' + m('SOURCE: ') + m(opts.source));
    if (opts.action) console.log('       ' + g('ACTION: ') + g(opts.action));
    if (opts.reason) console.log('       ' + w('REASON: ') + w(opts.reason));
    if (opts.module) console.log('       ' + g('MODULE: ') + g(opts.module));
    console.log('');
}

// ═══════════════════════════════════════════════════════════════
// v3.0 — STATUS BADGE — Per-field trace status
// Menunjukkan apakah value sudah di-trace ke main.min.js atau default.
// ═══════════════════════════════════════════════════════════════

const STATUS = {
    traced:  { emoji: '✅', label: 'TRACED',  color: chalk.green },
    fix:     { emoji: '✅', label: 'FIX',     color: chalk.cyan },
    config:  { emoji: '⚙️',  label: 'CONFIG',  color: chalk.yellow },
    default: { emoji: '🔸', label: 'DEFAULT', color: chalk.gray },
    dead:    { emoji: '🚫', label: 'DEAD',    color: chalk.red },
    missing: { emoji: '❌', label: 'MISSING', color: chalk.red.bold },
    warn:    { emoji: '⚠️',  label: 'WARN',    color: chalk.yellow.bold },
    ok:      { emoji: '✅', label: 'OK',      color: chalk.green },
    fail:    { emoji: '❌', label: 'FAIL',    color: chalk.red },
};

/**
 * Single line with status badge — ideal for per-field logging inside boxes.
 * @param {string} key     - Field name
 * @param {string} value   - Value display
 * @param {string} status  - 'traced'|'fix'|'config'|'default'|'dead'|'missing'|'warn'|'ok'|'fail'
 * @param {string} detail  - Extra info (e.g. 'FIX-006', 'L134098')
 * @param {boolean} isLast - Last item in group
 */
function fieldStatus(key, value, status, detail, isLast) {
    const s = STATUS[status] || STATUS.default;
    const connector = isLast ? '└' : '│';
    const badge = s.color(s.emoji + ' ' + s.label);
    const detailStr = detail ? chalk.dim('  ' + detail) : '';
    const keyStr = chalk.white(String(key).padEnd(32));
    const valStr = chalk.white(String(value).padEnd(20));
    console.log(`  ${connector}   ${keyStr} ${valStr} ${badge}${detailStr}`);
}

// ═══════════════════════════════════════════════════════════════
// v3.0 — CRITICAL FIELDS AUDIT
// Cek field yang bisa bikin game crash/stuck jika salah.
// Log selalu tampil (tidak dipengaruhi LOG_LEVEL) karena KRITIS.
// ═══════════════════════════════════════════════════════════════

/**
 * Audit critical fields — fields that can crash/stuck the game if wrong.
 * ALWAYS logs regardless of LOG_LEVEL because these are life-or-death for the game.
 *
 * @param {Array} fields - Array of { name, value, status, detail }
 *   status: 'ok' | 'fail' | 'warn'
 *   detail: explanation (e.g. 'EMPTY — tutorial safe' or 'HERO PRE-PLACED!')
 * @returns {{ passed: number, failed: number, warned: number }}
 */
function criticalFields(fields) {
    if (!fields || fields.length === 0) return { passed: 0, failed: 0, warned: 0 };

    const stats = { passed: 0, failed: 0, warned: 0 };

    console.log('');
    console.log(chalk.red.bold('  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong'));
    console.log(chalk.gray('  ' + '─'.repeat(46)));

    fields.forEach((f, i) => {
        const isLast = (i === fields.length - 1);
        const connector = isLast ? '└' : '├';

        let icon;
        if (f.status === 'ok') { icon = '✅'; stats.passed++; }
        else if (f.status === 'fail') { icon = '🚫'; stats.failed++; }
        else { icon = '⚠️'; stats.warned++; }

        const name = chalk.white(f.name.padEnd(24));
        const val = f.status === 'ok'
            ? chalk.green(String(f.value))
            : f.status === 'fail'
                ? chalk.red(String(f.value))
                : chalk.yellow(String(f.value));
        const detail = f.detail ? chalk.dim('  ' + f.detail) : '';

        console.log(`  ${connector} 🔒 ${name} = ${val}${detail}`);
    });

    // Summary line
    const allOk = stats.failed === 0;
    const verdict = allOk
        ? chalk.green.bold(`  ✅ CRITICAL AUDIT: ${stats.passed}/${fields.length} PASSED${stats.warned > 0 ? `, ${stats.warned} warning(s)` : ''}`)
        : chalk.red.bold(`  ⚠️ CRITICAL AUDIT: ${stats.passed}/${fields.length} PASSED — ${stats.failed} ISSUES`);
    console.log(verdict);
    console.log('');

    return stats;
}

// ═══════════════════════════════════════════════════════════════
// v3.0 — SUMMARY CARD — No box borders, just ═══ separators
// Penutup yang informatif setelah ratusan baris log.
// ═══════════════════════════════════════════════════════════════

/**
 * Full summary card — informative closing after hundreds of log lines.
 * Shows all key metrics. No side box borders, just ═══ top/bottom.
 *
 * @param {object} data
 * @param {string} data.title      - e.g. 'ENTER GAME COMPLETE'
 * @param {string} data.userId     - User identifier
 * @param {string} data.userType   - e.g. 'New User' or 'Returning User'
 * @param {number} data.fields     - Total response fields
 * @param {number} data.heroes     - Hero count
 * @param {number} data.diamond    - Diamond amount
 * @param {number} data.level      - Player level
 * @param {number} data.jsonSize   - JSON string size
 * @param {number} data.respSize   - Response payload size
 * @param {boolean}data.compressed - Whether response is LZ-string compressed
 * @param {number} data.duration   - Total processing time in ms
 * @param {object} data.critical   - { passed, failed, warned } from criticalFields()
 * @param {number} data.warnings   - Total warnings during processing
 * @param {number} data.errors     - Total errors during processing
 */
function summaryCard(data) {
    const g = chalk.green.bold;
    const r = chalk.red.bold;
    const w = chalk.white;
    const gr = chalk.gray;
    const y = chalk.yellow;

    const isOk = (data.errors || 0) === 0;
    const titleEmoji = isOk ? '✅' : '❌';
    const hasWarnings = (data.warnings || 0) > 0;
    const titleSuffix = hasWarnings ? ' — WITH WARNINGS' : '';

    // Timing bar
    const dur = data.duration || 0;
    const barCount = Math.min(Math.floor(dur / 7), 16);
    const barColor = dur > 2000 ? chalk.red : dur > 1000 ? chalk.yellow : chalk.green;
    const bar = barCount > 0 ? barColor('█'.repeat(barCount)) + gr('░'.repeat(16 - barCount)) : gr('░'.repeat(16));

    // ═══ Top separator ═══
    console.log('');
    console.log(chalk.gray('  ═══════════════════════════════════════════'));
    console.log('');

    // Title
    const titleColor = isOk && !hasWarnings ? g : hasWarnings ? chalk.yellow.bold : r;
    console.log(titleColor(`  ${titleEmoji} ${data.title || 'COMPLETE'}${titleSuffix}`));
    console.log('');

    // User info
    if (data.userId)   console.log(w('  👤 USER:       ') + w(data.userId + (data.userType ? ` (${data.userType})` : '')));
    if (data.fields !== undefined) console.log(w('  📦 FIELDS:     ') + y(String(data.fields)));
    if (data.heroes !== undefined) console.log(w('  🦸 HEROES:     ') + w(String(data.heroes) + ' hero(es)'));
    if (data.diamond !== undefined) console.log(w('  💎 DIAMOND:    ') + w(String(data.diamond)));
    if (data.level !== undefined) console.log(w('  🏆 LEVEL:      ') + w(String(data.level)));

    console.log('');

    // Technical metrics
    if (data.jsonSize !== undefined) console.log(w('  📏 JSON SIZE:  ') + w(data.jsonSize.toLocaleString() + ' chars'));
    if (data.respSize !== undefined) console.log(w('  📦 RESP SIZE:  ') + w(data.respSize.toLocaleString() + ' chars'));
    if (data.compressed !== undefined) console.log(w('  🔐 PROTOCOL:   ') + (data.compressed ? g('LZ-STRING') : gr('RAW')));
    if (data.duration !== undefined) console.log(w('  ⏱️ TOTAL TIME: ') + w(dur + 'ms  ') + bar);

    console.log('');

    // Critical + Warnings + Errors
    if (data.critical) {
        const totalCrit = data.critical.passed + data.critical.failed + data.critical.warned;
        const critOk = data.critical.failed === 0;
        const critStr = critOk && data.critical.warned === 0
            ? g(`${data.critical.passed}/${totalCrit} PASSED`)
            : critOk
                ? y(`${data.critical.passed}/${totalCrit} PASSED — ${data.critical.warned} ISSUES`)
                : r(`${data.critical.passed}/${totalCrit} PASSED — ${data.critical.failed} ISSUES`);
        console.log(w('  🔒 CRITICAL:   ') + critStr);
    }
    if (data.warnings !== undefined) {
        const wColor = data.warnings > 0 ? y : g;
        console.log(w('  ⚠️ WARNINGS:   ') + wColor(String(data.warnings)));
    }
    if (data.errors !== undefined) {
        const eColor = data.errors > 0 ? r : g;
        console.log(w('  ❌ ERRORS:     ') + eColor(String(data.errors)));
    }

    // ═══ Bottom separator ═══
    console.log('');
    console.log(chalk.gray('  ═══════════════════════════════════════════'));
    console.log('');
}

// ═══════════════════════════════════════════════════════════════
// v3.0 — WARNING SECTION — Structured multi-warning display
// Shows collected warnings with IDs, Expected/Got/Impact/Fix detail.
// ═══════════════════════════════════════════════════════════════

/**
 * Structured warning section — displays multiple warnings with details.
 * Use after pipeline steps to show all collected warnings in one place.
 *
 * @param {Array} warnings - Array of warning objects:
 *   { id: 'W001', message: '...', expected: '...', got: '...', impact: '...', fix: '...' }
 */
function warningSection(warnings) {
    if (!warnings || warnings.length === 0) return;

    const yb = chalk.yellow.bold;
    const y = chalk.yellow;
    const w = chalk.white;
    const g = chalk.gray;
    const m = chalk.magenta;

    console.log('');
    console.log(yb('  ⚠️ WARNINGS DETECTED'));
    console.log(g('  ' + '─'.repeat(46)));

    warnings.forEach((warn, i) => {
        const isLast = (i === warnings.length - 1);
        console.log(yb(`  ⚠️  [${warn.id || 'W' + String(i + 1).padStart(3, '0')}] `) + w(warn.message));
        if (warn.expected) console.log(g('       Expected: ') + w(warn.expected));
        if (warn.got)      console.log(g('       Got:      ') + m(warn.got));
        if (warn.impact)   console.log(g('       Impact:   ') + y(warn.impact));
        if (warn.fix)      console.log(g('       Fix:      ') + g(warn.fix));
        if (!isLast) console.log('');
    });

    console.log(yb(`  ⚠️ TOTAL WARNINGS: ${warnings.length}`));
    console.log('');
}

// ═══════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════

module.exports = {
    log, detail, details,
    header, headerThin, headerEnd, subHeader,
    socketEvent, actionLog,
    timing, separator, separatorDouble,
    errorWithStack, errorBanner, warnCallout,
    requestDump, responseSummary,
    dataPreview, table, fieldBuild,
    boxOpen, boxLine, boxDetail, boxClose,
    boxHighlight, colorBox, boxTrace,
    traceRef, objectTree,
    step, fieldMap,
    categoryBreakdown,
    criticalFields, summaryCard, fieldStatus, warningSection,
    STATUS,
    LEVELS, MODULES, DETAILS,
    chalk
};
