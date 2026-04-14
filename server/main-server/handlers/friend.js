'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'apply':
            // TODO: Send friend request to another player
            // REQ: targetUserId
            // RES: application result
            logger.info('FRIEND', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'accept':
            // TODO: Accept incoming friend request
            // REQ: applyUserId
            // RES: new friend info
            logger.info('FRIEND', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'reject':
            // TODO: Reject incoming friend request
            // REQ: applyUserId
            // RES: rejection confirmation
            logger.info('FRIEND', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'remove':
            // TODO: Remove a friend from friend list
            // REQ: friendUserId
            // RES: removal confirmation
            logger.info('FRIEND', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getFriendList':
            // TODO: Get current friend list
            // REQ: -
            // RES: friend list with online status
            logger.info('FRIEND', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getApplyList':
            // TODO: Get list of pending friend applications
            // REQ: -
            // RES: apply list
            logger.info('FRIEND', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'search':
            // TODO: Search for player by name or ID
            // REQ: keyword
            // RES: search results
            logger.info('FRIEND', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'gift':
            // TODO: Send stamina/gift to a friend
            // REQ: friendUserId
            // RES: gift sent confirmation
            logger.info('FRIEND', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getGift':
            // TODO: Claim friendship gifts received
            // REQ: -
            // RES: claimed gifts, stamina
            logger.info('FRIEND', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'recommend':
            // TODO: Get recommended friends list
            // REQ: -
            // RES: recommended player list
            logger.info('FRIEND', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'friendServerAction':
            // TODO: Friend server action — initial friend data sync on login
            // Called by client after enterGame to sync friend list state
            // REQ: -
            // RES: _friendList, _blacklist, _friendApplyList
            logger.info('FRIEND', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('FRIEND', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
