'use strict';

/**
 * =====================================================
 *  activity/luck/luckFeedbackGetReward.js
 *  Super Warrior Z Game Server — Main Server
 *
 *  ACTION: luckFeedbackGetReward
 *  DESC: Claim luck feedback compensation reward
 *  TYPE: WRITE
 *
 *  CLIENT REQUEST:
 *    { type:"activity", action:"luckFeedbackGetReward", actId, userId, version }
 *
 *  CLIENT SOURCE: receiveTwoBtnTap() (line 97379)
 *
 *  STATUS: TODO
 * =====================================================
 */

var RH = require('../../../../shared/responseHelper');
var logger = require('../../../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var userId = parsed.userId;
    logger.info('ACTIVITY', 'luckFeedbackGetReward' + ' userId=' + userId);

    // TODO: Implement business logic

    callback(RH.success({}));
}

module.exports = { handle: handle };
