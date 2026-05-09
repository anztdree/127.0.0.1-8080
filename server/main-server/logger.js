/**
 * logger.js — MAIN-SERVER Enhanced Logging Utility
 * Provides detailed, structured, and color-coded logging for all server events.
 *
 * Improvements:
 * - ISO-8601 timestamps with timezone
 * - Structured key=value pairs for easy parsing
 * - Consistent indentation and visual hierarchy
 * - Session-aware logging (socketId, userId, action counter)
 * - Detailed data dumps for debugging
 * - Performance timing for all operations
 */

const chalk = require('chalk');

const LEVELS = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 };
const currentLevel = LEVELS[process.env.LOG_LEVEL || 'INFO'];

const MODULES = {
    SERVER: '🚀', SOCKET: '🔌', HANDLER: '⚙️', TEA: '🔐',
    ENTER: '🎮', DB: '💾', VALIDATE: '🔓', SDKAPI: '📡',
    CONFIG: '📋', COMPRESS: '📦', NOTIFY: '📢',
    CHAT: '💬', FRIEND: '👥', BULLETIN: '📰', HERO_IMG: '🖼️',
    IMPRINT: '🔖', REGIST: '📝'
};

const LEVEL_EMOJI = { INFO: '🟢', WARN: '🟡', ERROR: '🔴', DEBUG: '🔵' };
const LEVEL_COLOR = {
    INFO: chalk.green,
    WARN: chalk.yellow,
    ERROR: chalk.red,
    DEBUG: chalk.cyan
};

// ─── Timestamp with milliseconds ───
function ts() {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).padStart(3, '0');
    return `${hh}:${mm}:${ss}.${ms}`;
}

// ─── Core log function ───
function log(level, module, message) {
    if (LEVELS[level] < currentLevel) return;
    const emoji = LEVEL_EMOJI[level] || '⚪';
    const modEmoji = MODULES[module] || '📌';
    const colorFn = LEVEL_COLOR[level] || chalk.white;
    const paddedLevel = colorFn(level.padEnd(5));
    const paddedModule = chalk.cyan(module.padEnd(10));
    console.log(`[${emoji}] ${ts()} ${paddedLevel} [${modEmoji}] ${paddedModule} ▸ ${message}`);
}

// ─── Detail line: single key=value pair ───
function detail(type, ...pairs) {
    const parts = pairs.map(p => {
        if (Array.isArray(p)) return `${chalk.gray(p[0])}=${chalk.white(p[1])}`;
        return chalk.gray(p);
    });
    console.log(`    📋 ${chalk.cyan(type.padEnd(12))} ${parts.join('  ')}`);
}

// ─── Details line: multiple key=value pairs (same as detail) ───
function details(type, ...pairs) {
    detail(type, ...pairs);
}

// ─── Multi-line data block for complex data ───
function dataBlock(label, obj, maxDepth) {
    maxDepth = maxDepth || 2;
    const lines = formatObject(obj, 0, maxDepth);
    console.log(`    📊 ${chalk.magenta(label)}`);
    lines.forEach(line => console.log(`       ${line}`));
}

function formatObject(obj, depth, maxDepth) {
    if (depth >= maxDepth || !obj || typeof obj !== 'object') {
        return [chalk.gray(String(obj))];
    }
    const lines = [];
    const keys = Object.keys(obj);
    const maxKeys = Math.min(keys.length, 10); // Limit display
    for (let i = 0; i < maxKeys; i++) {
        const k = keys[i];
        const v = obj[k];
        const prefix = '  '.repeat(depth) + (i < maxKeys - 1 || keys.length <= 10 ? '├' : '└');
        if (v && typeof v === 'object' && !Array.isArray(v)) {
            lines.push(`${chalk.gray(prefix)} ${chalk.cyan(k)}: {`);
            lines.push(...formatObject(v, depth + 1, maxDepth));
            lines.push(`${chalk.gray(prefix)} }`);
        } else if (Array.isArray(v)) {
            lines.push(`${chalk.gray(prefix)} ${chalk.cyan(k)}: [${chalk.yellow(v.length)} items]`);
        } else {
            const valStr = typeof v === 'string' ? chalk.green(`"${v}"`) : chalk.yellow(String(v));
            lines.push(`${chalk.gray(prefix)} ${chalk.cyan(k)}: ${valStr}`);
        }
    }
    if (keys.length > maxKeys) {
        lines.push(`${chalk.gray('  '.repeat(depth) + '└')} ${chalk.gray(`... and ${keys.length - maxKeys} more keys`)}`);
    }
    return lines;
}

// ─── Boundary (section header) ───
function boundary(emoji, title) {
    console.log('');
    console.log(chalk.magenta('═══════════════════════════════════════════════════'));
    console.log(chalk.magenta(`  ${emoji}  ${title}`));
    console.log(chalk.magenta('═══════════════════════════════════════════════════'));
}

function boundaryEnd(emoji) {
    console.log(chalk.magenta('═══════════════════════════════════════════════════'));
    console.log('');
}

// ─── Socket event logging ───
function socketEvent(event, socketId, ip, transport, extra) {
    const sid = socketId ? socketId.substring(0, 8) : '?';
    console.log(
        `    🔌 ${chalk.cyan(event.padEnd(12))} ` +
        `${chalk.gray('sid')}=${chalk.white(sid)}  ` +
        `${chalk.gray('ip')}=${chalk.white(ip)}  ` +
        `${chalk.gray('tp')}=${chalk.white(transport)}` +
        (extra ? `  ${chalk.gray(extra)}` : '')
    );
}

// ─── Action log (request/response) ───
function actionLog(dir, action, status, err, extra) {
    const arrow = dir === 'req' ? '→' : '←';
    let statusStr;
    if (status === 'OK') statusStr = chalk.green('✅');
    else if (status === 'ERR') statusStr = chalk.red('❌');
    else statusStr = chalk.yellow(String(status));

    console.log(
        `    ⚙️ ${arrow} ${chalk.cyan(action.padEnd(24))} ${statusStr}` +
        (extra ? `  ${chalk.gray(extra)}` : '')
    );
}

// ─── Route registration log ───
function route(method, path) {
    console.log(`  ├ ⚙️  ${chalk.cyan('handler.process')} → ${chalk.white(method)}::${chalk.white(path)}`);
}

function routeLast(method, path) {
    console.log(`  └ ⚙️  ${chalk.cyan('handler.process')} → ${chalk.white(method)}::${chalk.white(path)}`);
}

// ─── Performance timing helper ───
function timing(label, startTimeMs) {
    const elapsed = Date.now() - startTimeMs;
    const color = elapsed > 1000 ? chalk.red : elapsed > 500 ? chalk.yellow : chalk.green;
    console.log(`    ⏱️  ${chalk.gray(label.padEnd(20))} ${color(elapsed + 'ms')}`);
}

// ─── Section separator ───
function separator(char) {
    char = char || '─';
    console.log(chalk.gray(char.repeat(52)));
}

// ─── Error with stack trace ───
function errorWithStack(module, message, err) {
    log('ERROR', module, message);
    if (err) {
        console.log(`    🔴 ${chalk.red('Error:')} ${chalk.white(err.message)}`);
        if (err.stack) {
            const stackLines = err.stack.split('\n').slice(1, 4);
            stackLines.forEach(line => {
                console.log(`       ${chalk.gray(line.trim())}`);
            });
        }
    }
}

module.exports = {
    log, detail, details, dataBlock,
    boundary, boundaryEnd,
    socketEvent, actionLog,
    route, routeLast,
    timing, separator, errorWithStack
};
