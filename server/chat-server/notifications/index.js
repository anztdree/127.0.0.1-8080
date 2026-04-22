/**
 * ============================================================================
 * Chat Notify — Message Broadcast Dispatcher
 * ============================================================================
 *
 * Sends chat messages to room members via Socket.IO "Notify" event.
 *
 * Chat-server Notify format (DIFFERENT from main-server):
 *   Main-server:  { ret:"SUCCESS", data: JSON({ action: actionType, ...data }) }
 *   Chat-server:  { ret:"SUCCESS", data: JSON({ _msg: messageObject }) }
 *
 * The client distinguishes based on which socket the Notify comes from:
 *   - mainClient.listenNotify → parses o.action
 *   - chatClient.listenNotify → parses n._msg → ChatDataBaseClass.getData(n._msg)
 *
 * Broadcast excludes the sender (they already created local data from ACK callback).
 *
 * ============================================================================
 */

var ResponseHelper = require('../core/responseHelper');
var RoomManager    = require('../services/roomManager');
var logger         = require('../utils/logger');

/**
 * The Socket.IO server instance (set during init)
 * @type {object|null}
 */
var _io = null;

/**
 * Initialize with Socket.IO instance
 * @param {object} io - Socket.IO server instance
 */
function init(io) {
  _io = io;
  logger.info('Notify', 'Initialized');
}

/**
 * Broadcast a chat message to all members of a room (excluding sender)
 *
 * @param {object} senderSocket - The socket of the message sender (to exclude)
 * @param {string} roomId       - Room identifier
 * @param {object} msgObj       - Full message object (ChatDataBaseClass fields, no _roomId)
 * @returns {number} Number of recipients
 */
function broadcastMessage(senderSocket, roomId, msgObj) {
  if (!_io) {
    logger.warn('Notify', 'Not initialized — cannot broadcast');
    return 0;
  }

  if (!roomId || !msgObj) {
    logger.warn('Notify', 'Missing roomId or msgObj');
    return 0;
  }

  // Build Notify response: { ret:"SUCCESS", data: JSON({ _msg: msgObj }), compress, serverTime }
  var notifyPayload = ResponseHelper.pushMessage(msgObj);

  // Broadcast to all room members excluding sender
  var count = RoomManager.broadcastToRoom(
    _io, roomId, 'Notify', notifyPayload, senderSocket
  );

  if (count > 0) {
    logger.debug('Notify', 'Broadcast to ' + count + ' members in room: ' + roomId);
  }

  return count;
}

module.exports = {
  init:             init,
  broadcastMessage: broadcastMessage,
};
