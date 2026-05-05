/**
 * logger.js — Emoji Block Logging System
 * Reuse dari login-server pattern
 */

const EMOJI = {
    INFO:    '📋',
    SUCCESS: '✅',
    WARNING: '⚠️',
    ERROR:   '❌',
    SERVER:  '🖥️',
    DB:      '🗄️',
    HANDLER: '⚡',
    SOCKET:  '🔌',
    TEA:     '🔐',
    JSON:    '📄',
    NOTIFY:  '📢',
    USER:    '👤'
};

function timestamp() {
    return new Date().toLocaleString('en-US', {
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

function pad(str, len) {
    return String(str).padEnd(len);
}

function log(level, tag, message, ...details) {
    const emoji = EMOJI[level] || EMOJI.INFO;
    const ts = timestamp();
    const prefix = `${emoji} [${ts}] ${pad(tag, 8)} ▸`;

    if (details.length > 0) {
        console.log(prefix, message, ...details);
    } else {
        console.log(prefix, message);
    }
}

function details(level, message, ...pairs) {
    const emoji = EMOJI[level] || EMOJI.INFO;
    const ts = timestamp();
    const parts = pairs.map(p => Array.isArray(p) ? `${p[0]}: ${p[1]}` : p);
    console.log(`${emoji} [${ts}] ${message} │ ${parts.join(' │ ')}`);
}

function block(title, lines) {
    const border = '═'.repeat(50);
    console.log('');
    console.log(`╔${border}╗`);
    console.log(`║  ${pad(title, 46)}  ║`);
    console.log(`╠${border}╣`);
    for (const line of lines) {
        console.log(`║  ${pad(line, 46)}  ║`);
    }
    console.log(`╚${border}╝`);
    console.log('');
}

module.exports = {
    log,
    details,
    block,
    EMOJI
};
