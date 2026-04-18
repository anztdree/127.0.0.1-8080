'use strict';

/**
 * =====================================================
 *  activity/luck/luckFeedbackGetBox.js
 *  Super Warrior Z Game Server — Main Server
 *
 *  ACTION: luckFeedbackGetBox
 *  DESC: Open luck feedback compensation box
 *  TYPE: WRITE
 *
 *  CLIENT REQUEST:
 *    { type:"activity", action:"luckFeedbackGetBox", actId, userId, version }
 *
 *  CLIENT SOURCE: receiveOneBtnTap() (line 97363)
 *
 *  STATUS: TODO
 * =====================================================
 */

var RH = require('../../../../shared/responseHelper');
var logger = require('../../../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var userId = parsed.userId;
    logger.info('ACTIVITY', 'luckFeedbackGetBox' + ' userId=' + userId);

    // TODO: Implement business logic

    callback(RH.success({}));
}

module.exports = { handle: handle };
