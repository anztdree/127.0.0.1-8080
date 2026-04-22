/**
 * ============================================================================
 * Message Store — Chat Server
 * ============================================================================
 *
 * Handles persistence of chat messages to/from chat_messages table.
 *
 * DB schema (chat_messages):
 *   id, room_id, user_id, nick_name, head_image, kind, content,
 *   msg_type, param_json, head_effect_json, head_box, ori_server_id,
 *   server_id, show_main, server_time, create_time
 *
 * Message object format (ChatDataBaseClass from main.min.js):
 *   _time, _kind, _name, _content, _id, _image, _param, _type,
 *   _headEffect, _headBox, _oriServerId, _serverId, _showMain
 *
 * Key insight: DB columns use no prefix, message objects use _ prefix.
 * This service handles the conversion between the two formats.
 *
 * ============================================================================
 */

var DB        = require('./db');
var CONSTANTS = require('../config/constants');
var logger    = require('../utils/logger');

// ============================================
// SAVE MESSAGE
// ============================================

/**
 * Save a chat message to the database
 *
 * @param {object} msgObj - Full message object with _-prefixed fields
 * @returns {Promise<object>} The saved message object (for broadcasting)
 */
async function saveMessage(msgObj) {
  var now = Date.now();

  var sql = `
    INSERT INTO chat_messages
      (room_id, user_id, nick_name, head_image, kind, content,
       msg_type, param_json, head_effect_json, head_box,
       ori_server_id, server_id, show_main, server_time, create_time)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  var params = [
    msgObj._roomId || '',
    msgObj._id || '',
    msgObj._name || '',
    msgObj._image || '',
    msgObj._kind || 0,
    msgObj._content || '',
    msgObj._type || 0,
    (msgObj._param != null) ? JSON.stringify(msgObj._param) : null,
    (msgObj._headEffect != null) ? JSON.stringify(msgObj._headEffect) : null,
    msgObj._headBox || 0,
    msgObj._oriServerId || 1,
    msgObj._serverId || 1,
    msgObj._showMain ? 1 : 0,
    msgObj._time || now,
    now
  ];

  await DB.query(sql, params);
  logger.debug('MessageStore', 'Saved message room=' + (msgObj._roomId || '?') +
    ' user=' + (msgObj._id || '?'));

  return msgObj;
}

// ============================================
// GET RECENT RECORDS (for joinRoom)
// ============================================

/**
 * Get the most recent N messages for a room
 * Used by joinRoom handler to return _record to client
 *
 * @param {string} roomId
 * @param {number} [limit] - Max messages (default from constants)
 * @returns {Promise<Array>} Array of message objects
 */
async function getRecentRecords(roomId, limit) {
  limit = limit || CONSTANTS.JOIN_ROOM_RECORD_LIMIT;

  var sql = `
    SELECT room_id, user_id, nick_name, head_image, kind, content,
           msg_type, param_json, head_effect_json, head_box,
           ori_server_id, server_id, show_main, server_time
    FROM chat_messages
    WHERE room_id = ?
    ORDER BY server_time ASC
    LIMIT ?
  `;

  var rows = await DB.query(sql, [roomId, limit]);
  return _rowsToMessages(rows);
}

// ============================================
// GET RECORDS SINCE TIMESTAMP (for getRecord)
// ============================================

/**
 * Get messages for a room since a specific server_time
 * Used by getRecord handler for history retrieval
 *
 * Client sends startTime from last known message.
 * Returns messages with server_time > startTime.
 *
 * @param {string} roomId
 * @param {number} startTime - Server timestamp (ms) to query after
 * @param {number} [limit] - Max messages (default from constants)
 * @returns {Promise<Array>} Array of message objects
 */
async function getRecordsSince(roomId, startTime, limit) {
  limit = limit || CONSTANTS.GET_RECORD_LIMIT;

  var sql = `
    SELECT room_id, user_id, nick_name, head_image, kind, content,
           msg_type, param_json, head_effect_json, head_box,
           ori_server_id, server_id, show_main, server_time
    FROM chat_messages
    WHERE room_id = ? AND server_time > ?
    ORDER BY server_time ASC
    LIMIT ?
  `;

  var rows = await DB.query(sql, [roomId, startTime, limit]);
  return _rowsToMessages(rows);
}

// ============================================
// ROW → MESSAGE CONVERSION
// ============================================

/**
 * Convert DB rows to client-format message objects
 *
 * Maps DB columns (no prefix) → message fields (_ prefix)
 * Parses JSON fields (param_json, head_effect_json)
 *
 * @param {Array} rows - DB query result rows
 * @returns {Array} Array of ChatDataBaseClass-compatible objects
 */
function _rowsToMessages(rows) {
  if (!rows || rows.length === 0) return [];

  var messages = [];

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];

    var msg = {
      _time:       row.server_time,
      _kind:       row.kind,
      _name:       row.nick_name,
      _content:    row.content,
      _id:         row.user_id,
      _image:      row.head_image,
      _param:      [],
      _type:       row.msg_type,
      _headEffect: {},
      _headBox:    row.head_box,
      _oriServerId: row.ori_server_id,
      _serverId:   row.server_id,
      _showMain:   !!row.show_main,
    };

    // Parse JSON fields safely
    if (row.param_json) {
      try { msg._param = JSON.parse(row.param_json); }
      catch (e) { msg._param = []; }
    }

    if (row.head_effect_json) {
      try { msg._headEffect = JSON.parse(row.head_effect_json); }
      catch (e) { msg._headEffect = {}; }
    }

    messages.push(msg);
  }

  return messages;
}

// ============================================
// EXPORT
// ============================================

module.exports = {
  saveMessage:      saveMessage,
  getRecentRecords: getRecentRecords,
  getRecordsSince:  getRecordsSince,
};
