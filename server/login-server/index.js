/**
 * index.js — Login Server Entry Point
 *
 * Super Warrior Z Login Server
 * Port: 8000 | Socket.IO 2.5.1 | TEA: OFF | SQLite
 *
 * Session-based table logging with emoji indicators (v3)
 */

var http = require('http');
var path = require('path');
var crypto = require('crypto');
var LZString = require('lz-string');

var config = require('./config');
var db = require('./db');  // schema + seed data auto-created saat load

// ============================================================
// TABLE LAYOUT
//
// Row format:  │cell│cell│...│cell│  (7 cells, 8 pipes)
// Total width = 8 (pipes) + sum(column widths)
// Each cell content starts with 1 space for readability.
// ============================================================

var TW = 100;
var COL = {
    TIME: 14,   // " 12:39:58.310"  (+ 1 leading space in content)
    IDX:  3,    // " #1"
    DIR:  4,    // " ➡"
    ACT:  18,   // " 🔐 loginGame"
    STS:  10,   // " ✅ OK"
    MS:   6,    // " ⏱ MS"  (emoji = 2 cells)
    DET:  0     // calculated
};
COL.DET = TW - 8 - COL.TIME - COL.IDX - COL.DIR - COL.ACT - COL.STS - COL.MS;

var ALL_ACTIONS = [
    'loginGame', 'GetServerList', 'SaveHistory',
    'SaveUserEnterInfo', 'SaveLanguage', 'LoginAnnounce'
];

// ============================================================
// VISUAL STRING UTILITIES
// ============================================================

function vLen(s) {
    var w = 0;
    for (var i = 0; i < s.length; i++) {
        var c = s.charCodeAt(i);
        if (c >= 0xD800 && c <= 0xDBFF) {
            w += 2; i++; // surrogate pair
        } else if (c === 0xFE0F || c === 0x200D) {
            // VS16 or ZWJ — no extra width
        } else if ((c >= 0x2600 && c <= 0x27BF) ||
                   (c >= 0x2B00 && c <= 0x2BFF) ||
                   (c >= 0x231A && c <= 0x231B) ||
                   (c >= 0x23F0 && c <= 0x23F3)) {
            w += 2; // BMP emoji/symbols
        } else {
            w += 1;
        }
    }
    return w;
}

function vPad(s, w) {
    var d = w - vLen(s);
    return d > 0 ? s + '\u0020'.repeat(d) : s;
}

function vTrunc(s, maxW) {
    if (vLen(s) <= maxW) return s;
    var r = '', w = 0;
    for (var i = 0; i < s.length; i++) {
        var c = s.charCodeAt(i);
        if (c >= 0xD800 && c <= 0xDBFF) {
            if (w + 2 > maxW) break;
            r += s[i] + (s[i + 1] || ''); w += 2; i++;
        } else if (c === 0xFE0F || c === 0x200D) {
            r += s[i];
        } else if ((c >= 0x2600 && c <= 0x27BF) || (c >= 0x2B00 && c <= 0x2BFF) ||
                   (c >= 0x231A && c <= 0x231B) || (c >= 0x23F0 && c <= 0x23F3)) {
            if (w + 2 > maxW) break;
            r += s[i]; w += 2;
        } else {
            if (w + 1 > maxW) break;
            r += s[i]; w += 1;
        }
    }
    return r;
}

function vCell(s, w) { return vPad(vTrunc(s, w), w); }

// ============================================================
// SIMPLE HELPERS
// ============================================================

function p2(n) { return n < 10 ? '0' + n : '' + n; }
function p3(n) { return n < 10 ? '00' + n : n < 100 ? '0' + n : '' + n; }

function tNow() {
    var d = new Date();
    return p2(d.getHours()) + ':' + p2(d.getMinutes()) + ':' + p2(d.getSeconds()) + '.' + p3(d.getMilliseconds());
}

function fmtDur(ms) { return ms < 1000 ? ms + 'ms' : (ms / 1000).toFixed(1) + 's'; }
function fmtSize(b) { return b < 1024 ? b + 'B' : (b / 1024).toFixed(1) + 'KB'; }

function trunc(s, n) {
    if (!s) return '(none)';
    if (s.length <= n) return s;
    var half = Math.floor((n - 2) / 2);
    return s.substring(0, half) + '..' + s.slice(-(n - half));
}

// ============================================================
// TABLE ROW BUILDERS
// ============================================================

function dashes(n) { return '\u2500'.repeat(n); }

function tTop() {
    return '\u250C' + dashes(COL.TIME) + '\u252C' + dashes(COL.IDX) + '\u252C' +
        dashes(COL.DIR) + '\u252C' + dashes(COL.ACT) + '\u252C' +
        dashes(COL.STS) + '\u252C' + dashes(COL.MS) + '\u252C' +
        dashes(COL.DET) + '\u2510';
}

function tMid() {
    return '\u251C' + dashes(COL.TIME) + '\u253C' + dashes(COL.IDX) + '\u253C' +
        dashes(COL.DIR) + '\u253C' + dashes(COL.ACT) + '\u253C' +
        dashes(COL.STS) + '\u253C' + dashes(COL.MS) + '\u253C' +
        dashes(COL.DET) + '\u2524';
}

function tBot() {
    return '\u2514' + dashes(COL.TIME) + '\u2534' + dashes(COL.IDX) + '\u2534' +
        dashes(COL.DIR) + '\u2534' + dashes(COL.ACT) + '\u2534' +
        dashes(COL.STS) + '\u2534' + dashes(COL.MS) + '\u2534' +
        dashes(COL.DET) + '\u2518';
}

function tRow(cells) {
    var ws = [COL.TIME, COL.IDX, COL.DIR, COL.ACT, COL.STS, COL.MS, COL.DET];
    var parts = [];
    for (var i = 0; i < cells.length; i++) {
        var s = cells[i] == null ? '' : String(cells[i]);
        parts.push(vCell('\u0020' + s, ws[i]));
    }
    return '\u2502' + parts.join('\u2502') + '\u2502';
}

// ============================================================
// SESSION TRACKER
// ============================================================

var sessions = {};

function sessCreate(socketId, ip, transport) {
    var s = {
        id: crypto.randomBytes(3).toString('hex').toUpperCase(),
        ip: ip,
        transport: transport || '?',
        connectTime: Date.now(),
        disconnectTime: null,
        disconnectReason: null,
        userId: null,
        nickName: null,
        actions: {},
        actionOrder: [],
        counter: 0,
        dbQueries: 0,
        dbTime: 0,
        printedHeader: false
    };
    sessions[socketId] = s;
    return s;
}

// ============================================================
// DB WRAPPER (per-session tracking)
// ============================================================

function wrapDb(sess) {
    function tracked(promise) {
        var t0 = Date.now();
        sess.dbQueries++;
        return promise.then(function (r) {
            sess.dbTime += (Date.now() - t0);
            return r;
        }).catch(function (e) {
            sess.dbTime += (Date.now() - t0);
            throw e;
        });
    }
    return {
        query: function (sql, params) { return tracked(db.query(sql, params)); },
        queryOne: function (sql, params) { return tracked(db.queryOne(sql, params)); },
        close: db.close
    };
}

// ============================================================
// RESPONSE BUILDERS
// ============================================================

function buildResponse(data) {
    return {
        ret: 0,
        data: LZString.compressToUTF16(JSON.stringify(data)),
        compress: true,
        serverTime: Date.now(),
        server0Time: new Date().getTimezoneOffset() * 60 * 1000
    };
}

function buildErrorResponse(errorCode) {
    return {
        ret: errorCode || 1,
        data: '',
        compress: false,
        serverTime: Date.now(),
        server0Time: new Date().getTimezoneOffset() * 60 * 1000
    };
}

// ============================================================
// HANDLER MAP & LOADER
// ============================================================

var actionMap = {
    'loginGame':         path.join(__dirname, 'handlers', 'loginGame'),
    'GetServerList':     path.join(__dirname, 'handlers', 'getServerList'),
    'SaveHistory':       path.join(__dirname, 'handlers', 'saveHistory'),
    'SaveUserEnterInfo': path.join(__dirname, 'handlers', 'saveUserEnterInfo'),
    'SaveLanguage':      path.join(__dirname, 'handlers', 'saveLanguage'),
    'LoginAnnounce':     path.join(__dirname, 'handlers', 'loginAnnounce')
};

var handlerCache = {};

function loadHandler(action) {
    if (handlerCache[action]) return handlerCache[action];
    var modPath = actionMap[action];
    if (!modPath) return null;
    try {
        handlerCache[action] = require(modPath);
        return handlerCache[action];
    } catch (err) {
        console.error(tNow() + ' \u274C Handler "' + action + '": ' + err.message);
        return null;
    }
}

// ============================================================
// ACTION ICONS
// ============================================================

var ICON = {
    'CONNECT': '\uD83D\uDFE2',
    'DISCONNECT': '\uD83D\uDD34',
    'loginGame': '\uD83D\uDD10',
    'GetServerList': '\uD83D\uDCE1',
    'LoginAnnounce': '\uD83D\uDCE2',
    'SaveHistory': '\uD83D\uDCBE',
    'SaveUserEnterInfo': '\uD83D\uDCCA',
    'SaveLanguage': '\uD83C\uDF10'
};

function icon(a) { return ICON[a] || '\u2753'; }

// ============================================================
// DETAIL BUILDERS
// ============================================================

function reqDetail(action, data) {
    if (!data) return '\u2500\u2500';
    switch (action) {
        case 'loginGame': {
            var p = [];
            if (data.userId) p.push('\uD83D\uDC64 ' + data.userId);
            p.push('\uD83D\uDD11 ******');
            return p.join('  ');
        }
        case 'GetServerList': {
            var g = [];
            if (data.userId) g.push('\uD83D\uDC64 ' + data.userId);
            if (data.channel) g.push('ch=' + trunc(data.channel, 12));
            return g.join('  ') || '\u2500\u2500';
        }
        case 'SaveHistory': {
            var s = [];
            if (data.serverId) s.push('\uD83D\uDDA5 serverId=' + data.serverId);
            if (data.accountToken) s.push('\uD83D\uDC64 ' + trunc(data.accountToken, 14));
            return s.join('  ') || '\u2500\u2500';
        }
        case 'SaveUserEnterInfo': {
            var u = [];
            if (data.accountToken) u.push('\uD83D\uDC64 ' + trunc(data.accountToken, 14));
            if (data.userLevel) u.push('\uD83C\uDFAE Lv.' + data.userLevel);
            return u.join('  ') || '\u2500\u2500';
        }
        case 'SaveLanguage': {
            var l = [];
            if (data.userid) l.push('\uD83D\uDC64 ' + data.userid);
            if (data.language) l.push('\uD83C\uDF10 ' + data.language);
            return l.join('  ') || '\u2500\u2500';
        }
        default: return '\u2500\u2500';
    }
}

function resDetailMain(action, d) {
    if (!d) return '\u2500\u2500';
    switch (action) {
        case 'loginGame': {
            var p = [];
            if (d.userId && d.createTime) {
                var age = Date.now() - d.createTime;
                p.push(age < 3000 ? '\uD83C\uDD95 NEW USER' : '\uD83D\uDC64 EXIST ' + fmtDur(age));
            }
            if (d.loginToken) p.push('\uD83C\uDFAB ' + trunc(d.loginToken, 14));
            return p.join('  ');
        }
        case 'GetServerList': {
            var g = [];
            if (Array.isArray(d.serverList)) g.push('\uD83D\uDDA5 ' + d.serverList.length + ' servers');
            if (Array.isArray(d.history)) g.push('\uD83D\uDCDC ' + d.history.length + ' hist');
            return g.join('  ') || '\u2500\u2500';
        }
        case 'SaveHistory': {
            var s = [];
            s.push('\uD83C\uDFAB FINAL token');
            if (d.todayLoginCount !== undefined) s.push('\uD83D\uDCCA cnt=' + d.todayLoginCount);
            return s.join('  ');
        }
        case 'SaveUserEnterInfo':
            return '(analytics \u2014 socket destroyed next)';
        case 'SaveLanguage':
            return 'errorCode=' + (d.errorCode !== undefined ? d.errorCode : '?');
        case 'LoginAnnounce':
            if (Array.isArray(d.data)) return '\uD83D\uDCE2 ' + d.data.length + ' notices';
            return '\u2500\u2500';
        default: return '\u2500\u2500';
    }
}

function fieldSubRows(action, req, res) {
    var rows = [];
    switch (action) {
        case 'loginGame': {
            var l1 = [];
            if (res) {
                if (res.nickName) l1.push('nick=' + res.nickName);
                if (res.channelCode) l1.push('ch=' + trunc(res.channelCode, 14));
            }
            if (l1.length) rows.push(l1.join('  '));

            var l2 = [];
            if (res) {
                if (res.language) l2.push('\uD83C\uDF10 ' + res.language);
                if (res.securityCode) l2.push('\uD83D\uDD12 ' + trunc(res.securityCode, 12));
            }
            if (l2.length) rows.push(l2.join('  '));

            if (req) {
                var l3 = [];
                if (req.subChannel) l3.push('subCh=' + JSON.stringify(req.subChannel));
                if (req.version) l3.push('ver=' + req.version);
                if (l3.length) rows.push(l3.join('  '));
            }
            break;
        }
        case 'GetServerList': {
            if (res && Array.isArray(res.serverList)) {
                res.serverList.forEach(function (s, i) {
                    var tags = [];
                    tags.push(s.online ? '\u2713on' : '\u2717off');
                    if (s.hot) tags.push('\uD83D\uDD25');
                    if (s.new) tags.push('\uD83C\uDD95');
                    rows.push('[' + (i + 1) + '] ' + s.name + '  ' + tags.join(' '));
                    rows.push('  \uD83C\uDFAE\u2192' + trunc(s.url, 18) + '  \uD83D\uDCAC\u2192' + trunc(s.chaturl, 18) + '  \u2694\uFE0F\u2192' + trunc(s.dungeonurl, 18));
                });
            }
            break;
        }
        case 'SaveHistory': {
            if (req) {
                var f = [];
                if (req.accountToken) f.push('acct=' + trunc(req.accountToken, 14));
                if (req.channelCode) f.push('ch=' + trunc(req.channelCode, 12));
                if (req.securityCode) f.push('\uD83D\uDD12 ' + trunc(req.securityCode, 10));
                if (f.length) rows.push(f.join('  '));
            }
            break;
        }
        case 'SaveUserEnterInfo': {
            if (req) {
                var u = [];
                if (req.createTime) u.push('create=' + req.createTime);
                if (req.subChannel) u.push('subCh=' + JSON.stringify(req.subChannel));
                if (u.length) rows.push(u.join('  '));
            }
            break;
        }
        case 'SaveLanguage': {
            if (req) {
                var l = [];
                if (req.sdk !== undefined) l.push('sdk=' + JSON.stringify(req.sdk));
                if (req.appid !== undefined) l.push('appid=' + JSON.stringify(req.appid));
                if (l.length) rows.push(l.join('  '));
            }
            break;
        }
    }
    return rows;
}

function perfSubRow(dbQ, dbT, compSize) {
    var p = [];
    p.push('db ' + dbQ + 'q/' + dbT + 'ms');
    if (compSize > 0) p.push('\uD83D\uDCE6 ' + fmtSize(compSize));
    return p.join('  ');
}

function errDetailStr(ret) {
    switch (ret) {
        case 2: return '\uD83D\uDC64 userId kosong';
        case 3: return '\uD83D\uDD11 password salah';
        case 5: return '\uD83D\uDD12 security code mismatch';
        default: return 'error code ' + ret;
    }
}

// ============================================================
// LOG FUNCTIONS
// ============================================================

function ensureHeader(sess) {
    if (sess.printedHeader) return;
    sess.printedHeader = true;
    console.log('');
    console.log('\uD83D\uDC64 SESSION ' + sess.id + '  \u2502  \uD83C\uDF10 ' + sess.ip + '  \u2502  \uD83D\uDCE1 ' + sess.transport);
    console.log('');
    console.log(tTop());
    console.log(tRow([
        '\u23F0 TIME', '#', '\u27A1\uFE0F',
        '\uD83D\uDD27 ACTION', '\uD83D\uDCCA STATUS',
        '\u23F1 MS', '\uD83D\uDCCB DETAILS'
    ]));
    console.log(tMid());
}

function logUpgrade(sess, from, to) {
    ensureHeader(sess);
    console.log(tRow([tNow(), '', '\u2195', '', '\u2B06\uFE0F upgrade', '', from + ' \u2192 ' + to]));
    sess.transport = to;
}

function logReq(sess, idx, action, data) {
    ensureHeader(sess);
    console.log(tRow([tNow(), idx, '\u27A1\uFE0F', icon(action) + ' ' + action, '\uD83D\uDCE4 REQ', '\u2500\u2500\u2500', reqDetail(action, data)]));
}

function logResOk(sess, idx, action, elapsed, decompressed, compSize, reqData, dbQ, dbT) {
    ensureHeader(sess);
    console.log(tRow([tNow(), idx, '\u2B05\uFE0F', icon(action) + ' ' + action, '\u2705 OK', String(elapsed), resDetailMain(action, decompressed)]));

    var fRows = fieldSubRows(action, reqData, decompressed);
    for (var i = 0; i < fRows.length; i++) {
        console.log(tRow(['', '', '\uD83D\uDD0E', '', '\uD83D\uDCDD fields', '', fRows[i]]));
    }

    if (dbQ > 0 || compSize > 0) {
        console.log(tRow(['', '', '\uD83D\uDCCA', '', '\u26A1 perf', '', perfSubRow(dbQ, dbT, compSize)]));
    }
}

function logResErr(sess, idx, action, elapsed, ret) {
    ensureHeader(sess);
    console.log(tRow([tNow(), idx, '\u2B05\uFE0F', icon(action) + ' ' + action, '\u274C ERR=' + ret, String(elapsed), errDetailStr(ret)]));
}

function logConn(sess) {
    ensureHeader(sess);
    console.log(tRow([tNow(), '\u25C9', '\u2500\u2500', icon('CONNECT') + ' CONNECT', '\u2500\u2500\u2500', '\u2500\u2500\u2500', '\uD83C\uDF10 ' + sess.ip + '  \uD83D\uDCE1 ' + sess.transport]));
}

function logDisc(sess) {
    ensureHeader(sess);

    var dur = sess.disconnectTime - sess.connectTime;
    var nAct = sess.actionOrder.length;

    console.log(tMid());
    console.log(tRow([tNow(), '\u25C9', '\u2500\u2500', icon('DISCONNECT') + ' DISCONNECT', '\u2500\u2500\u2500', '\u2500\u2500\u2500', sess.disconnectReason || 'unknown']));
    console.log(tRow(['', '', '', '\uD83D\uDCCB SESSION LOG', '', '', nAct + '\u2705  \u23F1' + fmtDur(dur) + '  \uD83D\uDDC4' + sess.dbQueries + 'q/' + sess.dbTime + 'ms']));
    console.log(tBot());

    var skipped = [];
    for (var i = 0; i < ALL_ACTIONS.length; i++) {
        if (!sess.actions[ALL_ACTIONS[i]]) skipped.push(ALL_ACTIONS[i]);
    }
    if (skipped.length > 0) {
        console.log('  \u23ED Not triggered: ' + skipped.join(', '));
    }

    console.log('');
    var mem = process.memoryUsage();
    console.log('  \uD83D\uDCBE RSS: ' + (mem.rss / 1024 / 1024).toFixed(1) + 'MB' +
        '  \u2502  \uD83E\uDDE0 Heap: ' + (mem.heapUsed / 1024 / 1024).toFixed(1) + '/' + (mem.heapTotal / 1024 / 1024).toFixed(1) + 'MB' +
        '  \u2502  \uD83D\uDC65 Sessions: ' + Object.keys(sessions).length);
    console.log('');
}

// ============================================================
// SOCKET.IO SERVER
// ============================================================

var server = http.createServer();

var io = require('socket.io')(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
    transports: ['websocket', 'polling']
});

io.on('connection', function (socket) {
    var ip = socket.handshake
        ? (socket.handshake.address || socket.handshake.headers['x-forwarded-for'] || '?')
        : '?';
    var transport = (socket.conn && socket.conn.transport) ? socket.conn.transport.name : '?';

    var sess = sessCreate(socket.id, ip, transport);
    logConn(sess);

    if (socket.conn) {
        socket.conn.on('upgrade', function (newTransport) {
            if (sess.transport !== newTransport.name) {
                logUpgrade(sess, sess.transport, newTransport.name);
            }
        });
    }

    socket.on('handler.process', function (data, callback) {
        if (!callback || typeof callback !== 'function') return;

        var action = data ? data.action : null;

        if (!action || !actionMap[action]) {
            sess.counter++;
            ensureHeader(sess);
            console.log(tRow([tNow(), sess.counter, '\u27A1\uFE0F', icon('UNKNOWN') + ' ' + (action || '?'), '\u274C UNKNOWN', '\u2500\u2500\u2500', 'action not found']));
            return callback(buildErrorResponse(1));
        }

        sess.counter++;
        var idx = sess.counter;

        var dbQBefore = sess.dbQueries;
        var dbTBefore = sess.dbTime;

        logReq(sess, idx, action, data);

        var handler = loadHandler(action);
        if (!handler || typeof handler.execute !== 'function') {
            logResErr(sess, idx, action, 0, 1);
            sess.actions[action] = { idx: idx, status: 'error' };
            if (sess.actionOrder.indexOf(action) === -1) sess.actionOrder.push(action);
            return callback(buildErrorResponse(1));
        }

        var ctx = {
            db: wrapDb(sess),
            buildResponse: buildResponse,
            buildErrorResponse: buildErrorResponse,
            crypto: crypto
        };

        var startTime = Date.now();

        handler.execute(data, socket, ctx)
            .then(function (result) {
                var elapsed = Date.now() - startTime;
                var ret = result.ret;
                var decompressed = null;
                var compSize = 0;

                if (ret === 0 && result.compress && result.data) {
                    try { decompressed = JSON.parse(LZString.decompressFromUTF16(result.data)); }
                    catch (e) { decompressed = null; }
                    compSize = Buffer.byteLength(result.data, 'utf8');
                }

                var dbQ = sess.dbQueries - dbQBefore;
                var dbT = sess.dbTime - dbTBefore;

                if (ret === 0) {
                    logResOk(sess, idx, action, elapsed, decompressed, compSize, data, dbQ, dbT);
                } else {
                    logResErr(sess, idx, action, elapsed, ret);
                }

                sess.actions[action] = { idx: idx, status: ret === 0 ? 'ok' : 'error', time: elapsed };
                if (sess.actionOrder.indexOf(action) === -1) sess.actionOrder.push(action);

                if (action === 'loginGame' && ret === 0 && decompressed) {
                    sess.userId = decompressed.userId || null;
                    sess.nickName = decompressed.nickName || null;
                }

                callback(result);
            })
            .catch(function (err) {
                var elapsed = Date.now() - startTime;
                logResErr(sess, idx, action, elapsed, err.code || 1);
                sess.actions[action] = { idx: idx, status: 'error', time: elapsed };
                if (sess.actionOrder.indexOf(action) === -1) sess.actionOrder.push(action);
                callback(buildErrorResponse(err.code || 1));
            });
    });

    socket.on('disconnect', function (reason) {
        sess.disconnectTime = Date.now();
        sess.disconnectReason = reason;
        logDisc(sess);
        setTimeout(function () { delete sessions[socket.id]; }, 2000);
    });
});

// ============================================================
// START SERVER
// ============================================================

server.listen(config.port, function () {
    console.log('');
    console.log('\uD83D\uDFE2 SUPER WARRIOR Z \u2014 LOGIN SERVER');
    console.log('\u2550'.repeat(TW));
    console.log('  \u26A1 Port: ' + config.port + '  \u2502  \uD83D\uDD0C Socket.IO 2.5.1  \u2502  \uD83D\uDD13 TEA: OFF  \u2502  \uD83D\uDDC4 ' + config.db.path);
    console.log('  \u2705 Server Ready  \u2502  \uD83E\uDDE0 Node ' + process.version + '  \u2502  \uD83D\uDCC5 ' + new Date().toISOString().slice(0, 10));
    console.log('\u2550'.repeat(TW));
    console.log('');
});

// ============================================================
// GRACEFUL SHUTDOWN
// ============================================================

process.on('SIGINT', function () {
    console.log('\n' + tNow() + ' \uD83D\uDEAB Shutting down...');
    io.close();
    db.close().then(function () { process.exit(0); });
});

process.on('SIGTERM', function () {
    console.log('\n' + tNow() + ' \uD83D\uDEAB SIGTERM, shutting down...');
    io.close();
    db.close().then(function () { process.exit(0); });
});
