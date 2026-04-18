'use strict';

/**
 * =====================================================
 *  activity/luck/costFeedback.js
 *  Super Warrior Z Game Server — Main Server
 *
 *  ACTION: costFeedback
 *  DESC: Process cost/consumption feedback reward
 *  TYPE: WRITE
 *
 *  CLIENT REQUEST:
 *    { type:"activity", action:"costFeedback", actId, userId, itemId, pick }
 *
 *  CLIENT SOURCE: ActivitySetReward.costFeedbackActivity() (line ~79577)
 *
 *  STATUS: TODO
 * =====================================================
 */

var RH = require('../../../../shared/responseHelper');
var logger = require('../../../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var userId = parsed.userId;
    logger.info('ACTIVITY', 'costFeedback' + ' userId=' + userId);

    // TODO: Implement business logic

    callback(RH.success({}));
}

module.exports = { handle: handle };
