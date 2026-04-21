/**
 * ============================================================================
 *  Notifications — Push Dispatcher
 *  Thin wrapper around NotifyService for convenience
 * ============================================================================
 */

var NotifyService = require('../services/notifyService');
var ActionTypes = require('./actionTypes');
var logger = require('../utils/logger');

var _notifyService = null;

/**
 * Initialize with connected clients map
 * @param {Object.<number, Object>} connectedClients
 */
function init(connectedClients) {
    _notifyService = new NotifyService(connectedClients);
    logger.info('Notify', 'Initialized with ' + Object.keys(ActionTypes).length + ' action types');
}

/**
 * Send notification to user
 * @param {number} userId
 * @param {string} action
 * @param {object} data
 */
function sendToUser(userId, action, data) {
    if (!_notifyService) {
        logger.warn('Notify', 'Not initialized');
        return false;
    }
    return _notifyService.sendToUser(userId, action, data);
}

/**
 * Broadcast to all
 * @param {string} action
 * @param {object} data
 */
function broadcast(action, data) {
    if (!_notifyService) return 0;
    return _notifyService.broadcast(action, data);
}

/**
 * Kick user
 * @param {Object} socket
 * @param {string} reason
 */
function kickUser(socket, reason) {
    if (_notifyService) _notifyService.kickUser(socket, reason);
}

module.exports = {
    init: init,
    sendToUser: sendToUser,
    broadcast: broadcast,
    kickUser: kickUser,
    ActionTypes: ActionTypes,
};
