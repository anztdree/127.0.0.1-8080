'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'get':
            // TODO: Get YouTuber promotional reward info
            // REQ: -
            // RES: YouTuber reward status and list
            logger.info('YOUTUBER', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'claim':
            // TODO: Claim YouTuber promotional reward
            // REQ: rewardId
            // RES: reward items
            logger.info('YOUTUBER', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'hidden':
            // TODO: Hide/dismiss YouTuber promotional popup
            // REQ: -
            // RES: hidden status confirmation
            logger.info('YOUTUBER', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('YOUTUBER', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
