'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'complete':
            // TODO: Mark a guide step as completed
            // REQ: guideId
            // RES: completion status
            logger.info('GUIDE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'saveGuide':
            // Save guide progress (called after completing tutorial steps)
            // REQ: guide data (steps completed, current step, etc.)
            // RES: _changeInfo with updated guide state
            logger.info('GUIDE', 'action=saveGuide userId=' + (userId || '-'));
            callback(RH.success({
                _changeInfo: {
                    _guide: {},
                },
            }));
            break;

        case 'getGuideReward':
            // TODO: Claim guide completion reward
            // REQ: guideId
            // RES: reward items
            logger.info('GUIDE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getGuideData':
            // TODO: Get player guide/progress data
            // REQ: -
            // RES: completed guides, current guide
            logger.info('GUIDE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('GUIDE', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
