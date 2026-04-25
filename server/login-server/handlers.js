/**
 * Action Handlers - Login Server
 *
 * All game client messages arrive via 'handler.process' event.
 * Request format  : { type:'User', action:'<actionName>', ...fields, version:'1.0' }
 * Response wrapper : { ret:0, data:'<JSON string>', compress:false, serverTime:<ms>, server0Time:0 }
 *
 * Response data is JSON.stringify'd inside wrapper. Client does JSON.parse(e.data).
 * Evidence: line 113904 — e.compress && (t = LZString.decompressFromUTF16(t))
 * Evidence: line 113905 — var a = JSON.parse(t)
 *
 * Error codes:
 *   0 = success
 *   1 = unknown error
 *   3 = wrong password / data error
 *   5 = invalid command / unknown action
 *   8 = missing parameter
 */

var Database = require('better-sqlite3');
var path     = require('path');
var crypto   = require('crypto');
var fs       = require('fs');

// ── Database Setup ─────────────────────────────────────────────────────────
var DB_DIR  = path.join(__dirname, 'db');
var DB_PATH = path.join(DB_DIR, 'login.db');

if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

var db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        channel_code TEXT NOT NULL DEFAULT 'game_origin',
        nick_name TEXT NOT NULL DEFAULT '',
        security_code TEXT NOT NULL DEFAULT '',
        created_at INTEGER NOT NULL,
        last_login INTEGER NOT NULL DEFAULT 0,
        login_count INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS login_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        server_id TEXT NOT NULL,
        channel_code TEXT DEFAULT '',
        security_code TEXT DEFAULT '',
        ip_address TEXT DEFAULT '',
        login_time INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS login_tokens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        token TEXT UNIQUE NOT NULL,
        user_id TEXT NOT NULL,
        server_id TEXT NOT NULL,
        channel_code TEXT DEFAULT '',
        security_code TEXT DEFAULT '',
        created_at INTEGER NOT NULL,
        expires_at INTEGER NOT NULL,
        used INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS user_language (
        user_id TEXT PRIMARY KEY,
        language TEXT NOT NULL DEFAULT 'en',
        updated_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS login_stats (
        user_id TEXT NOT NULL,
        login_date TEXT NOT NULL,
        count INTEGER NOT NULL DEFAULT 1,
        PRIMARY KEY (user_id, login_date)
    );

    CREATE TABLE IF NOT EXISTS user_enter_info (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        server_id TEXT DEFAULT '',
        channel_code TEXT DEFAULT '',
        sub_channel TEXT DEFAULT '',
        create_time INTEGER DEFAULT 0,
        user_level INTEGER DEFAULT 0,
        ip_address TEXT DEFAULT '',
        created_at INTEGER NOT NULL
    );
`);

// ── Prepared Statements ────────────────────────────────────────────────────
var stmtGetUser      = db.prepare('SELECT * FROM users WHERE user_id = ?');
var stmtCreateUser   = db.prepare(
    'INSERT INTO users (user_id, password, channel_code, nick_name, security_code, created_at, last_login, login_count) ' +
    'VALUES (?, ?, ?, ?, ?, ?, ?, 1)'
);
var stmtUpdateLogin  = db.prepare(
    'UPDATE users SET last_login = ?, login_count = login_count + 1 WHERE user_id = ?'
);
var stmtGetHistory   = db.prepare(
    'SELECT DISTINCT server_id FROM login_history WHERE user_id = ? ORDER BY login_time DESC LIMIT 10'
);
var stmtSaveHistory  = db.prepare(
    'INSERT INTO login_history (user_id, server_id, channel_code, security_code, ip_address, login_time) ' +
    'VALUES (?, ?, ?, ?, ?, ?)'
);
var stmtCreateToken  = db.prepare(
    'INSERT INTO login_tokens (token, user_id, server_id, channel_code, security_code, created_at, expires_at) ' +
    'VALUES (?, ?, ?, ?, ?, ?, ?)'
);
var stmtSetLanguage  = db.prepare(
    'INSERT OR REPLACE INTO user_language (user_id, language, updated_at) VALUES (?, ?, ?)'
);
var stmtGetLanguage  = db.prepare('SELECT language FROM user_language WHERE user_id = ?');
var stmtUpsertStats  = db.prepare(
    "INSERT INTO login_stats (user_id, login_date, count) VALUES (?, ?, 1) " +
    "ON CONFLICT(user_id, login_date) DO UPDATE SET count = count + 1"
);
var stmtGetTodayCount = db.prepare(
    'SELECT count FROM login_stats WHERE user_id = ? AND login_date = ?'
);
var stmtSaveEnterInfo = db.prepare(
    'INSERT INTO user_enter_info (user_id, server_id, channel_code, sub_channel, create_time, user_level, ip_address, created_at) ' +
    'VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
);

// ── Default Game Server Config ─────────────────────────────────────────────
// Response fields evidence:
//   serverList[].serverId — line 138045
//   serverList[].name     — line 138047
//   serverList[].url      — line 114396 (mainClient.connectToServer url)
//   serverList[].chaturl  — line 114469 (chat server url)
//   serverList[].dungeonurl — dungeon server url
//   serverList[].online   — line 137898
//   serverList[].hot      — line 138035, 138058
//   serverList[].new      — line 138035, 138058
//   serverList[].offlineReason — line 138057
var DEFAULT_SERVER = {
    serverId: '1',
    name: 'Original 1',
    url: 'http://127.0.0.1:8001',
    chaturl: 'http://127.0.0.1:8002',
    dungeonurl: 'http://127.0.0.1:8003',
    online: true,
    hot: false,
    new: true,
    offlineReason: ''
};

// ── Helpers ────────────────────────────────────────────────────────────────

/** UUID v4 — works on all Node.js versions (no crypto.randomUUID dependency) */
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

/** Standard success response wrapper */
function ok(data) {
    return {
        ret: 0,
        data: JSON.stringify(data),
        compress: false,
        serverTime: Date.now(),
        server0Time: 0
    };
}

/** Error response wrapper */
function err(code) {
    return {
        ret: code,
        data: '{}',
        compress: false,
        serverTime: Date.now(),
        server0Time: 0
    };
}

/** Get client IP from socket handshake */
function getClientIp(socket) {
    var h = socket.handshake && socket.handshake.headers;
    if (h) {
        var xff = h['x-forwarded-for'] || h['X-Forwarded-For'];
        if (xff) return xff.split(',')[0].trim();
    }
    return socket.handshake ? socket.handshake.address : 'unknown';
}

// ── Connected sockets tracker ──────────────────────────────────────────────
var connectedSockets = new Map();

// ══════════════════════════════════════════════════════════════════════════
//  MAIN DISPATCH — called from index.js on every 'handler.process' event
// ══════════════════════════════════════════════════════════════════════════

function process(socket, msg, callback) {
    if (!msg || !msg.action) {
        console.log('[HANDLER] Missing action');
        if (callback) callback(err(5));
        return;
    }

    var action = msg.action;
    var label  = msg.userId || msg.accountToken || '';
    console.log('[HANDLER] ' + action + ' | userId=' + label);

    try {
        switch (action) {
            case 'loginGame':         return loginGame(socket, msg, callback);
            case 'GetServerList':     return getServerList(socket, msg, callback);
            case 'SaveHistory':       return saveHistory(socket, msg, callback);
            case 'SaveLanguage':      return saveLanguage(socket, msg, callback);
            case 'SaveUserEnterInfo': return saveUserEnterInfo(socket, msg, callback);
            case 'getNotice':         return getNotice(socket, msg, callback);
            case 'LoginAnnounce':     return loginAnnounce(socket, msg, callback);
            default:
                console.log('[HANDLER] Unknown action: ' + action);
                if (callback) err(5);
                if (callback) callback(err(5));
        }
    } catch (e) {
        console.error('[HANDLER] Error in ' + action + ': ' + e.message);
        if (callback) callback(err(1));
    }
}

/** Handle socket disconnect */
function onDisconnect(socket) {
    for (var entry of connectedSockets.entries()) {
        if (entry[1] === socket.id) {
            connectedSockets.delete(entry[0]);
            console.log('[DISCONNECT USER] ' + entry[0]);
            break;
        }
    }
}

// ══════════════════════════════════════════════════════════════════════════
//  ACTION HANDLERS
// ══════════════════════════════════════════════════════════════════════════

/**
 * ── loginGame ────────────────────────────────────────────────────────────
 * Authenticate user (auto-register if new)
 *
 * Request (line 114371-114382):
 *   type: 'User', action: 'loginGame',
 *   userId, password, fromChannel,
 *   channelName: '', headImageUrl: '', nickName: '',
 *   subChannel: getAppId() || '',
 *   version: '1.0'
 *
 * Origin login (line 137978-137981):
 *   password = user input || 'game_origin'
 *   fromChannel = same as password
 *
 * Response data (parsed from inner data):
 *   userId       — line 137982: o.userId
 *   channelCode  — line 137982: o.channelCode
 *   nickName     — used in SDK login path (line 138079)
 *   securityCode — line 137910: ts.loginInfo.userInfo.securityCode
 *   language     — line 113906: a.language && (ts.language = a.language) [optional]
 */
function loginGame(socket, msg, callback) {
    var userId      = msg.userId;
    var password    = msg.password || 'game_origin';   // client sets 'game_origin' if empty (line 137980)
    var fromChannel = msg.fromChannel || password;      // fromChannel = password for origin (line 137981)

    if (!userId) {
        if (callback) callback(err(8));
        return;
    }

    var user = stmtGetUser.get(userId);

    if (!user) {
        // ── Register new user ────────────────────────────────────────────
        var now          = Math.floor(Date.now() / 1000);
        var securityCode = crypto.randomBytes(8).toString('hex');

        try {
            stmtCreateUser.run(userId, password, fromChannel, userId, securityCode, now, now);
            user = stmtGetUser.get(userId);
            console.log('[REGISTER] userId=' + userId + ' channel=' + fromChannel);
        } catch (e) {
            console.error('[REGISTER FAIL] ' + userId + ': ' + e.message);
            if (callback) callback(err(1));
            return;
        }
    } else {
        // ── Login — verify password ──────────────────────────────────────
        if (user.password !== password) {
            console.log('[LOGIN FAIL] Wrong password: ' + userId);
            if (callback) callback(err(3));
            return;
        }
        var now = Math.floor(Date.now() / 1000);
        stmtUpdateLogin.run(now, userId);
    }

    // ── Build response data ──────────────────────────────────────────────
    var data = {
        userId:      user.user_id,
        channelCode: user.channel_code,       // stored fromChannel at registration
        nickName:    user.nick_name || user.user_id,
        securityCode: user.security_code
    };

    // Include saved language if exists (line 113906: a.language && ts.language = a.language)
    var lang = stmtGetLanguage.get(user.user_id);
    if (lang) {
        data.language = lang.language;
    }

    // Track connected socket
    connectedSockets.set(user.user_id, socket.id);

    console.log('[LOGIN OK] userId=' + user.user_id + ' count=' + (user.login_count + 1) + ' channel=' + user.channel_code);
    if (callback) callback(ok(data));
}

/**
 * ── GetServerList ────────────────────────────────────────────────────────
 * Return available servers and user's login history
 *
 * Request (line 114403-114409):
 *   type: 'User', action: 'GetServerList',
 *   userId, subChannel: getAppId() || '',
 *   channel: channelCode from loginGame response
 *   [NO version field]
 *
 * Response data:
 *   serverList     — line 137995: t.serverList
 *   history        — line 137998: t.history (array of serverId strings)
 *   offlineReason  — line 138057: t.offlineReason (applied to each server)
 *
 * Server item fields (evidence):
 *   serverId       — line 138045
 *   name           — line 138047
 *   url            — line 114396 (mainClient.connectToServer)
 *   chaturl        — line 114469
 *   dungeonurl     — dungeon server
 *   online         — line 137898 (gate check before Start Game)
 *   hot            — line 138035, 138058
 *   new            — line 138035, 138058
 *   offlineReason  — line 138057
 */
function getServerList(socket, msg, callback) {
    if (!msg.userId) {
        if (callback) callback(err(8));
        return;
    }

    // Get user's previous server history
    var rows    = stmtGetHistory.all(msg.userId);
    var history = [];
    for (var i = 0; i < rows.length; i++) {
        history.push(rows[i].server_id);
    }

    var data = {
        serverList:    [DEFAULT_SERVER],
        history:       history,
        offlineReason: ''
    };

    console.log('[GetServerList] userId=' + msg.userId + ' history=' + history.length + ' servers=' + data.serverList.length);
    if (callback) callback(ok(data));
}

/**
 * ── SaveHistory ──────────────────────────────────────────────────────────
 * Save server selection, issue loginToken for main-server entry
 *
 * Request (line 137904-137912):
 *   type: 'User', action: 'SaveHistory',
 *   accountToken: ts.loginInfo.userInfo.userId,
 *   channelCode:  ts.loginInfo.userInfo.channelCode,
 *   serverId:     ts.loginInfo.serverItem.serverId,
 *   securityCode: ts.loginInfo.userInfo.securityCode,
 *   subChannel:   getAppId() || '',
 *   version: '1.0'
 *
 * Response data:
 *   loginToken      — line 137914: e.loginToken (CRITICAL for main-server)
 *   todayLoginCount — line 137918: e.todayLoginCount
 *
 * After response, client calls ts.clientStartGame(false) — line 137916
 */
function saveHistory(socket, msg, callback) {
    if (!msg.accountToken || !msg.serverId) {
        if (callback) callback(err(8));
        return;
    }

    var now = Math.floor(Date.now() / 1000);
    var ip  = getClientIp(socket);

    // Save to history
    stmtSaveHistory.run(
        msg.accountToken,
        String(msg.serverId),
        msg.channelCode || '',
        msg.securityCode || '',
        ip,
        now
    );

    // Generate loginToken (UUID v4)
    var token     = uuid();
    var expiresAt = now + 86400; // 24 hours
    stmtCreateToken.run(token, msg.accountToken, String(msg.serverId), msg.channelCode || '', msg.securityCode || '', now, expiresAt);

    // Track daily login count
    var today     = new Date().toISOString().split('T')[0];
    stmtUpsertStats.run(msg.accountToken, today);
    var stats = stmtGetTodayCount.get(msg.accountToken, today);
    var todayLoginCount = stats ? stats.count : 1;

    console.log('[SaveHistory] userId=' + msg.accountToken + ' serverId=' + msg.serverId + ' token=' + token.substring(0, 8) + '... count=' + todayLoginCount);
    if (callback) callback(ok({
        loginToken:      token,
        todayLoginCount: todayLoginCount
    }));
}

/**
 * ── SaveLanguage ─────────────────────────────────────────────────────────
 * Save user language preference
 *
 * Request (line 114282-114288):
 *   type: 'User', action: 'SaveLanguage',
 *   userid: ts.loginUserInfo.userId,      ← NOTE: lowercase 'userid'
 *   sdk: ts.loginUserInfo.sdk,
 *   appid: getAppId() || '',
 *   language: string
 *   [NO version field]
 *
 * Response data (line 138290):
 *   errorCode: 0   ← NOTE: uses 'errorCode', NOT 'success'
 */
function saveLanguage(socket, msg, callback) {
    // Field is 'userid' (lowercase) — line 114285
    var userid   = msg.userid;
    var language = msg.language;

    if (!userid || !language) {
        if (callback) callback(err(8));
        return;
    }

    var now = Math.floor(Date.now() / 1000);
    stmtSetLanguage.run(userid, language, now);

    console.log('[SaveLanguage] userId=' + userid + ' lang=' + language);
    // Response uses errorCode field (line 138290: 0 === t.errorCode)
    if (callback) callback(ok({ errorCode: 0 }));
}

/**
 * ── SaveUserEnterInfo ────────────────────────────────────────────────────
 * Record info after player enters main-server successfully
 *
 * Request (line 114449-114457):
 *   type: 'User', action: 'SaveUserEnterInfo',
 *   accountToken: ts.loginInfo.userInfo.userId,
 *   channelCode: ts.loginInfo.userInfo.channelCode,
 *   subChannel: getAppId() || '',
 *   createTime: UserInfoSingleton.getInstance().createTime,
 *   userLevel:  UserInfoSingleton.getInstance().getUserLevel(),
 *   version: '1.0'
 *
 * Response: client does NOT process response data
 * After callback: ts.loginClient.destroy() — line 114459
 */
function saveUserEnterInfo(socket, msg, callback) {
    if (msg.accountToken) {
        var ip = getClientIp(socket);
        console.log('[SaveUserEnterInfo] userId=' + msg.accountToken + ' serverId=' + (msg.serverId || '-') + ' level=' + (msg.userLevel || 0));

        try {
            stmtSaveEnterInfo.run(
                msg.accountToken,
                msg.serverId || '',
                msg.channelCode || '',
                msg.subChannel || '',
                msg.createTime || 0,
                msg.userLevel || 0,
                ip,
                Math.floor(Date.now() / 1000)
            );
        } catch (e) {
            console.error('[SaveUserEnterInfo] DB error: ' + e.message);
        }
    }

    // Client doesn't process response data — line 114458-114459
    if (callback) callback(ok({}));
}

/**
 * ── LoginAnnounce ────────────────────────────────────────────────────────
 * Login announcement / bulletin
 *
 * Request: { type:'User', action:'LoginAnnounce', ... }
 *
 * NOTE: This action is NOT found in main.min(unminfy).js source code.
 * It may come from a SDK login path, custom JS extension, or analytics module.
 * Since no evidence exists for request/response format, return empty success.
 */
function loginAnnounce(socket, msg, callback) {
    console.log('[LoginAnnounce]');
    if (callback) callback(ok({}));
}

/**
 * ── getNotice ────────────────────────────────────────────────────────────
 * Return bulletin/notice data
 *
 * Request: { type: 'User', action: 'getNotice' }
 * (Note: line 138130 has unminification bug, request object reconstructed from context)
 *
 * Response data (line 138132-138144):
 *   data: [             ← NOTE: object with 'data' property, NOT array directly
 *     {
 *       text:  { en: string, cn: string, ... },   — localized bulletin text
 *       title: { en: string, cn: string, ... },   — localized title
 *       version: string,                           — version string
 *       orderNo: number,                           — sort order
 *       alwaysPopup: boolean                       — auto-show on login
 *     }
 *   ]
 */
function getNotice(socket, msg, callback) {
    console.log('[getNotice]');
    // Return { data: [] } — object with data property containing empty array
    if (callback) callback(ok({ data: [] }));
}

// ── Exports ────────────────────────────────────────────────────────────────
module.exports = {
    process:     process,
    onDisconnect: onDisconnect
};
