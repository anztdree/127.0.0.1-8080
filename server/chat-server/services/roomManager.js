/**
 * ============================================================================
 * Room Manager — Chat Server
 * ============================================================================
 *
 * Manages Socket.IO room membership for chat channels.
 *
 * Room lifecycle:
 *   joinRoom  → socket.join(roomId) → user receives messages from this room
 *   leaveRoom → socket.leave(roomId) → user stops receiving messages
 *   broadcast → io.to(roomId).emit(...) → send to all room members
 *
 * Room ID format:
 *   Opaque strings provided by the client (from registChat response).
 *   Chat-server does NOT generate room IDs — it just accepts whatever the client sends.
 *   Examples: "world", "guild_123", "team_456", "tdungeon"
 *
 * Room types (determined by client, not server):
 *   World (kind=2), Guild (kind=3), WorldTeam (kind=5), Team (kind=6)
 *
 * Socket.IO v2 rooms are in-memory by default.
 * Room membership is automatically cleaned up when a socket disconnects.
 *
 * ============================================================================
 */

var logger = require('../utils/logger');

// ============================================
// JOIN ROOM
// ============================================

/**
 * Add a socket to a Socket.IO room
 *
 * @param {object} socket  - Socket.IO socket instance
 * @param {string} roomId  - Room identifier
 * @returns {boolean} true if joined successfully
 */
function joinRoom(socket, roomId) {
  if (!socket || !socket.connected || !roomId) {
    logger.warn('RoomManager', 'joinRoom: invalid socket or roomId');
    return false;
  }

  socket.join(roomId);
  logger.info('RoomManager', 'User ' + (socket._userId || socket.id) + ' joined room: ' + roomId);
  return true;
}

// ============================================
// LEAVE ROOM
// ============================================

/**
 * Remove a socket from a Socket.IO room
 *
 * @param {object} socket  - Socket.IO socket instance
 * @param {string} roomId  - Room identifier
 * @returns {boolean} true if left successfully
 */
function leaveRoom(socket, roomId) {
  if (!socket || !roomId) {
    return false;
  }

  socket.leave(roomId);
  logger.info('RoomManager', 'User ' + (socket._userId || socket.id) + ' left room: ' + roomId);
  return true;
}

// ============================================
// LEAVE ALL ROOMS (on disconnect)
// ============================================

/**
 * Remove a socket from ALL rooms (used on disconnect)
 *
 * @param {object} socket - Socket.IO socket instance
 */
function leaveAllRooms(socket) {
  if (!socket) return;

  // Socket.IO v2: adapter.rooms[socket.id] contains rooms the socket is in
  var rooms = Object.keys(socket.rooms || {});
  for (var i = 0; i < rooms.length; i++) {
    // Skip the default socket.id room
    if (rooms[i] !== socket.id) {
      socket.leave(rooms[i]);
    }
  }

  if (rooms.length > 0) {
    logger.info('RoomManager', 'User ' + (socket._userId || socket.id) + ' left all rooms (' + rooms.length + ')');
  }
}

// ============================================
// GET ROOM MEMBER COUNT
// ============================================

/**
 * Get the number of sockets in a room
 *
 * @param {object} io     - Socket.IO server instance
 * @param {string} roomId - Room identifier
 * @returns {number} Number of sockets in the room
 */
function getRoomMemberCount(io, roomId) {
  if (!io || !roomId) return 0;

  try {
    var room = io.sockets.adapter.rooms[roomId];
    return room ? Object.keys(room).length : 0;
  } catch (e) {
    return 0;
  }
}

// ============================================
// BROADCAST TO ROOM
// ============================================

/**
 * Broadcast an event to all sockets in a room, optionally excluding the sender
 *
 * @param {object} io          - Socket.IO server instance
 * @param {string} roomId      - Room identifier
 * @param {string} event       - Event name (e.g. "Notify")
 * @param {object} data        - Payload to send
 * @param {object} [excludeSocket] - Socket to exclude from broadcast (usually the sender)
 * @returns {number} Number of sockets that received the message
 */
function broadcastToRoom(io, roomId, event, data, excludeSocket) {
  if (!io || !roomId) return 0;

  var count = 0;

  try {
    var room = io.sockets.adapter.rooms[roomId];
    if (!room) return 0;

    var socketIds = Object.keys(room);
    for (var i = 0; i < socketIds.length; i++) {
      var socketId = socketIds[i];
      var targetSocket = io.sockets.connected[socketId];

      if (!targetSocket || !targetSocket.connected) continue;

      // Skip the excluded socket (sender)
      if (excludeSocket && targetSocket.id === excludeSocket.id) continue;

      try {
        targetSocket.emit(event, data);
        count++;
      } catch (e) {
        // Skip failed emit
      }
    }
  } catch (e) {
    logger.error('RoomManager', 'broadcastToRoom error: ' + e.message);
  }

  return count;
}

// ============================================
// IS SOCKET IN ROOM
// ============================================

/**
 * Check if a socket is a member of a specific room
 *
 * @param {object} socket  - Socket.IO socket instance
 * @param {string} roomId  - Room identifier
 * @returns {boolean}
 */
function isInRoom(socket, roomId) {
  if (!socket || !roomId) return false;
  return !!(socket.rooms && socket.rooms[roomId]);
}

// ============================================
// EXPORT
// ============================================

module.exports = {
  joinRoom:          joinRoom,
  leaveRoom:         leaveRoom,
  leaveAllRooms:     leaveAllRooms,
  getRoomMemberCount: getRoomMemberCount,
  broadcastToRoom:   broadcastToRoom,
  isInRoom:          isInRoom,
};
