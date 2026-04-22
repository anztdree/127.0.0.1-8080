/**
 * ============================================================================
 * Forbidden Chat Service — Chat Server
 * ============================================================================
 *
 * Checks if a user is muted/forbidden from chatting.
 * Data source: chat_mutes table (shared DB).
 *
 * The mute list is managed by main-server (admin actions, automated bans).
 * Chat-server reads from DB directly — natural inter-server communication.
 *
 * Client-side mute handling (main.min.js):
 *   - forbiddenChat stored as { users: [userId,...], finishTime: {userId: timestamp,...} }
 *   - finishTime = 0 means permanent mute
 *   - Client filters messages from muted users locally
 *   - Server should also reject sendMsg from muted users → error 36001
 *
 * chat_mutes table schema:
 *   id, user_id, server_id, muted_by, reason, finish_time, create_time
 *   UNIQUE KEY (user_id, server_id)
 *   finish_time = 0 → permanent
 *   finish_time > 0 → temporary, expires at that timestamp
 *
 * ============================================================================
 */

var DB     = require('./db');
var logger = require('../utils/logger');

// ============================================
// CHECK IF USER IS MUTED
// ============================================

/**
 * Check if a user is currently muted on a specific server
 *
 * A user is muted if:
 *   1. There is a chat_mutes record for (userId, serverId)
 *   2. AND (finish_time = 0 [permanent] OR finish_time > now [not expired])
 *
 * @param {string} userId   - The user's ID
 * @param {number} serverId - The server ID (default: 1)
 * @returns {Promise<boolean>} true if user is currently muted
 */
async function isMuted(userId, serverId) {
  if (!userId) return false;
  serverId = serverId || 1;

  var now = Date.now();

  try {
    var row = await DB.queryOne(
      'SELECT finish_time FROM chat_mutes WHERE user_id = ? AND server_id = ? LIMIT 1',
      [userId, serverId]
    );

    if (!row) {
      return false; // No mute record → not muted
    }

    var finishTime = row.finish_time;

    // finish_time = 0 → permanent mute
    if (finishTime === 0) {
      return true;
    }

    // finish_time > 0 → temporary mute, check if expired
    return finishTime > now;

  } catch (err) {
    logger.error('ForbiddenChat', 'Check failed for userId=' + userId + ': ' + err.message);
    // On DB error, default to NOT muted (fail-open to avoid blocking all chat)
    return false;
  }
}

// ============================================
// GET MUTE INFO (for forbiddenChat response)
// ============================================

/**
 * Get the full forbidden chat data structure
 * Used for building the forbiddenChat response (same format as main-server)
 *
 * Returns: { users: [userId,...], finishTime: {userId: timestamp,...} }
 *
 * @param {Array<string>} userIds - List of user IDs to check
 * @param {number} serverId - Server ID
 * @returns {Promise<object>} { users: [...], finishTime: {...} }
 */
async function getMuteList(userIds, serverId) {
  if (!userIds || userIds.length === 0) {
    return { users: [], finishTime: {} };
  }

  serverId = serverId || 1;
  var now = Date.now();

  try {
    var placeholders = userIds.map(function() { return '?'; }).join(',');
    var sql = 'SELECT user_id, finish_time FROM chat_mutes WHERE user_id IN (' +
              placeholders + ') AND server_id = ?';

    var params = userIds.concat([serverId]);
    var rows = await DB.query(sql, params);

    var users = [];
    var finishTime = {};

    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];

      // Only include active (non-expired) mutes
      if (row.finish_time === 0 || row.finish_time > now) {
        users.push(row.user_id);
        finishTime[row.user_id] = row.finish_time;
      }
    }

    return { users: users, finishTime: finishTime };

  } catch (err) {
    logger.error('ForbiddenChat', 'GetMuteList failed: ' + err.message);
    return { users: [], finishTime: {} };
  }
}

// ============================================
// EXPORT
// ============================================

module.exports = {
  isMuted:     isMuted,
  getMuteList: getMuteList,
};
