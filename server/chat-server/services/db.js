/**
 * ============================================================================
 * Database Service — Chat Server (Standalone)
 * ============================================================================
 *
 * Shared database: super_warrior_z (same as login-server & main-server)
 * Chat-server is READ-ONLY on game_users (for user profile lookup)
 * Chat-server owns these tables:
 *   chat_messages  — all chat messages per room
 *   chat_mutes     — mute/forbidden chat records (written by main-server, read by chat-server)
 *
 * Two-phase init (same pattern as main-server):
 *   Phase 1 — connect without DB → CREATE DATABASE IF NOT EXISTS
 *   Phase 2 — connect with DB   → CREATE chat tables IF NOT EXISTS
 * ============================================================================
 */

var mariadb   = require('mariadb');
var CONSTANTS = require('../config/constants');
var logger    = require('../utils/logger');

var pool  = null;
var ready = false;

// ============================================
// INIT
// ============================================

async function init() {
  if (ready) {
    logger.info('DB', 'Already initialized');
    return;
  }

  try {
    await _bootstrapDatabase();
    await _createTables();
    ready = true;
    logger.info('DB', 'Initialized successfully');
  } catch (err) {
    ready = false;
    pool  = null;
    logger.error('DB', 'Init failed: ' + err.message);
    throw err;
  }
}

// ============================================
// PHASE 1 — Bootstrap
// ============================================

async function _bootstrapDatabase() {
  var cfg = CONSTANTS.DB;
  logger.info('DB', 'Phase 1: Connecting to MariaDB at ' + cfg.host + ':' + cfg.port + '...');

  var tmpPool = mariadb.createPool({
    host:             cfg.host,
    port:             cfg.port,
    user:             cfg.user,
    password:         cfg.password,
    connectionLimit:  1,
    connectTimeout:   cfg.connectTimeout,
    acquireTimeout:   cfg.acquireTimeout,
  });

  var conn;
  try {
    conn = await tmpPool.getConnection();
    await conn.query(
      'CREATE DATABASE IF NOT EXISTS `' + cfg.database + '`' +
      ' CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci'
    );
    logger.info('DB', 'Database "' + cfg.database + '" ready');
  } finally {
    if (conn) conn.release();
    try { await tmpPool.end(); } catch (e) { /* ignore */ }
  }
}

// ============================================
// PHASE 2 — Create Tables
// ============================================

async function _createTables() {
  var cfg = CONSTANTS.DB;
  logger.info('DB', 'Phase 2: Creating chat tables...');

  pool = mariadb.createPool({
    host:             cfg.host,
    port:             cfg.port,
    user:             cfg.user,
    password:         cfg.password,
    database:         cfg.database,
    connectionLimit:  cfg.connectionLimit,
    connectTimeout:   cfg.connectTimeout,
    acquireTimeout:   cfg.acquireTimeout,
  });

  var conn;
  try {
    conn = await pool.getConnection();
    await conn.query('SELECT 1 AS test');

    // ------------------------------------------
    // chat_messages — all chat messages per room
    // ------------------------------------------
    // Stores the full message data so records can be
    // reconstructed exactly as ChatDataBaseClass expects
    await conn.query(`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id              BIGINT AUTO_INCREMENT PRIMARY KEY,
        room_id         VARCHAR(128) NOT NULL,
        user_id         VARCHAR(64)  NOT NULL,
        nick_name       VARCHAR(64)  NOT NULL DEFAULT '',
        head_image      VARCHAR(256) NOT NULL DEFAULT '',
        kind            INT          NOT NULL DEFAULT 0,
        content         TEXT         NOT NULL DEFAULT '',
        msg_type        INT          NOT NULL DEFAULT 0,
        param_json      TEXT         DEFAULT NULL,
        head_effect_json TEXT        DEFAULT NULL,
        head_box        INT          NOT NULL DEFAULT 0,
        ori_server_id   INT          NOT NULL DEFAULT 1,
        server_id       INT          NOT NULL DEFAULT 1,
        show_main       TINYINT(1)   NOT NULL DEFAULT 0,
        server_time     BIGINT       NOT NULL DEFAULT 0,
        create_time     BIGINT       NOT NULL DEFAULT 0,
        INDEX idx_room_time (room_id, server_time),
        INDEX idx_user_id (user_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    logger.info('DB', 'Table chat_messages OK');

    // ------------------------------------------
    // chat_mutes — mute/forbidden chat records
    // ------------------------------------------
    // Written by main-server (admin actions, automated bans)
    // Read by chat-server to enforce chat restrictions
    // finish_time = 0 means permanent mute
    await conn.query(`
      CREATE TABLE IF NOT EXISTS chat_mutes (
        id          INT AUTO_INCREMENT PRIMARY KEY,
        user_id     VARCHAR(64)  NOT NULL,
        server_id   INT          NOT NULL DEFAULT 1,
        muted_by    VARCHAR(64)  NOT NULL DEFAULT '',
        reason      VARCHAR(256) NOT NULL DEFAULT '',
        finish_time BIGINT       NOT NULL DEFAULT 0,
        create_time BIGINT       NOT NULL DEFAULT 0,
        UNIQUE KEY uk_user_server (user_id, server_id),
        INDEX idx_user_id (user_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    logger.info('DB', 'Table chat_mutes OK');

    logger.info('DB', 'All chat tables created');

  } finally {
    if (conn) conn.release();
  }
}

// ============================================
// QUERY HELPERS
// ============================================

/**
 * Execute query, returns all rows
 * @param {string} sql
 * @param {Array}  [params]
 * @returns {Promise<Array>}
 */
async function query(sql, params) {
  if (!pool || !ready) throw new Error('Database not initialized');
  var conn;
  try {
    conn = await pool.getConnection();
    return await conn.query(sql, params || []);
  } catch (err) {
    logger.error('DB', 'Query error: ' + err.message);
    throw err;
  } finally {
    if (conn) conn.release();
  }
}

/**
 * Execute query, returns first row or null
 * @param {string} sql
 * @param {Array}  [params]
 * @returns {Promise<object|null>}
 */
async function queryOne(sql, params) {
  var rows = await query(sql, params);
  return (rows && rows.length > 0) ? rows[0] : null;
}

/**
 * Get a raw connection for transactions
 * @returns {Promise<Connection>}
 */
async function getConnection() {
  if (!pool || !ready) throw new Error('Database not initialized');
  return pool.getConnection();
}

// ============================================
// HEALTH
// ============================================

function isReady() {
  return ready;
}

// ============================================
// CLOSE
// ============================================

async function close() {
  if (!pool) { ready = false; return; }
  logger.info('DB', 'Closing pool...');
  ready = false;
  try {
    await pool.end();
    pool = null;
    logger.info('DB', 'Pool closed');
  } catch (err) {
    logger.error('DB', 'Close error: ' + err.message);
    pool = null;
  }
}

// ============================================
// EXPORT
// ============================================

module.exports = {
  init:          init,
  query:         query,
  queryOne:      queryOne,
  getConnection: getConnection,
  isReady:       isReady,
  close:         close,
};
