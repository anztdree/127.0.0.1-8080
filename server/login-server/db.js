/**
 * db.js — SQLite Database (better-sqlite3)
 *
 * Semua schema, index, dan seed data ada di sini.
 * Column names: camelCase (sama persis dengan client code).
 *
 * Keuntungan:
 * - Zero config, tidak perlu install DB server
 * - Single file, mudah backup & debug
 * - WAL mode untuk concurrent read
 * - camelCase = tidak ada mapping layer, debug mudah
 */

var Database = require('better-sqlite3');
var path = require('path');
var fs = require('fs');
var config = require('./config');

// Pastikan directory data/ ada
var dbDir = path.dirname(path.resolve(config.db.path));
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

var db = new Database(path.resolve(config.db.path));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ============================================================
// SCHEMA — semua kolom camelCase, sama dengan client code
// ============================================================

db.exec(`

CREATE TABLE IF NOT EXISTS users (
    userId          TEXT    NOT NULL,
    password        TEXT    NOT NULL DEFAULT 'game_origin',
    nickName        TEXT    NOT NULL DEFAULT '',
    channelCode     TEXT    NOT NULL DEFAULT 'game_origin',
    language        TEXT    NOT NULL DEFAULT 'en',
    securityCode    TEXT    NOT NULL DEFAULT '',
    loginToken      TEXT    NOT NULL DEFAULT '',
    createTime      INTEGER NOT NULL DEFAULT 0,
    lastLoginTime   INTEGER NOT NULL DEFAULT 0,
    lastLoginServer INTEGER NOT NULL DEFAULT 0,
    todayLoginDate  TEXT    NOT NULL DEFAULT '2000-01-01',
    todayLoginCount INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (userId)
);

CREATE INDEX IF NOT EXISTS idx_users_loginToken ON users(loginToken);
CREATE INDEX IF NOT EXISTS idx_users_lastLogin ON users(lastLoginTime);

CREATE TABLE IF NOT EXISTS servers (
    serverId            INTEGER PRIMARY KEY AUTOINCREMENT,
    serverName          TEXT    NOT NULL DEFAULT '',
    url                 TEXT    NOT NULL DEFAULT '',
    chatUrl             TEXT    NOT NULL DEFAULT '',
    dungeonUrl          TEXT    NOT NULL DEFAULT '',
    worldRoomId         TEXT    NOT NULL DEFAULT '',
    guildRoomId         TEXT    NOT NULL DEFAULT '',
    teamDungeonChatRoom TEXT    NOT NULL DEFAULT '',
    sortOrder           INTEGER NOT NULL DEFAULT 0,
    status              INTEGER NOT NULL DEFAULT 1,
    isHot               INTEGER NOT NULL DEFAULT 0,
    isNew               INTEGER NOT NULL DEFAULT 0,
    offlineReason       TEXT    NOT NULL DEFAULT '',
    UNIQUE(serverName)
);

CREATE INDEX IF NOT EXISTS idx_servers_sort ON servers(sortOrder);

CREATE TABLE IF NOT EXISTS loginHistory (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    userId      TEXT    NOT NULL,
    serverId    INTEGER NOT NULL DEFAULT 0,
    channelCode TEXT    NOT NULL DEFAULT '',
    subChannel  TEXT    NOT NULL DEFAULT '',
    version     TEXT    NOT NULL DEFAULT '',
    loginTime   INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_loginHistory_userId ON loginHistory(userId, loginTime DESC);

CREATE TABLE IF NOT EXISTS userLoginLogs (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    userId      TEXT    NOT NULL,
    channelCode TEXT    NOT NULL DEFAULT '',
    subChannel  TEXT    NOT NULL DEFAULT '',
    userLevel   INTEGER NOT NULL DEFAULT 1,
    createTime  INTEGER NOT NULL DEFAULT 0,
    loginTime   INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_userLoginLogs_userId ON userLoginLogs(userId, loginTime DESC);

INSERT OR IGNORE INTO servers (
    serverName, url, chatUrl, dungeonUrl,
    worldRoomId, guildRoomId, teamDungeonChatRoom,
    sortOrder, status, isHot, isNew, offlineReason
) VALUES (
    'server 1',
    'http://127.0.0.1:8001',
    'http://127.0.0.1:8002',
    'http://127.0.0.1:8003',
    'room_1',
    'guild_1',
    'team_1',
    1, 1, 0, 1, ''
);

`);

// ============================================================
// QUERY FUNCTIONS — Promise wrapper untuk handler async chain
// ============================================================

/**
 * Eksekusi query, return array of rows.
 * SELECT → stmt.all() → array
 * INSERT/UPDATE/DELETE → stmt.run() → empty array (compat)
 */
function query(sql, params) {
    try {
        var stmt = db.prepare(sql);
        var kw = sql.replace(/^\s+/, '').substring(0, 6).toUpperCase();
        if (kw === 'SELECT') {
            return Promise.resolve(
                params && params.length > 0
                    ? stmt.all.apply(stmt, params)
                    : stmt.all()
            );
        } else {
            if (params && params.length > 0) {
                stmt.run.apply(stmt, params);
            } else {
                stmt.run();
            }
            return Promise.resolve([]);
        }
    } catch (e) {
        return Promise.reject(e);
    }
}

/**
 * Eksekusi query, return 1 row pertama (object) atau null.
 */
function queryOne(sql, params) {
    try {
        var stmt = db.prepare(sql);
        var row = params && params.length > 0
            ? stmt.get.apply(stmt, params)
            : stmt.get();
        return Promise.resolve(row !== undefined ? row : null);
    } catch (e) {
        return Promise.reject(e);
    }
}

/**
 * Close database (untuk graceful shutdown).
 */
function close() {
    try { db.close(); } catch (e) {}
    return Promise.resolve();
}

module.exports = {
    query: query,
    queryOne: queryOne,
    close: close
};
