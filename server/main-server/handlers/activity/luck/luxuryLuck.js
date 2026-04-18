'use strict';

/**
 * =====================================================
 *  activity/luck/luxuryLuck.js
 *  Super Warrior Z Game Server — Main Server
 *
 *  ACTION: luxuryLuck
 *  DESC: Luxury luck draw (1x or 10x)
 *  TYPE: WRITE
 *
 *  CLIENT REQUEST:
 *    { type:"activity", action:"luxuryLuck", actId, userId, times, costType, version }
 *
 *  CLIENT SOURCE: ActivitySuperLuck (line 61947, 61969)
 *  CUSTOM RESPONSE: _addTotal[] or _addHeroes[], _energy, _canFreeTime
 *
 *  STATUS: TODO
 * =====================================================
 */

var RH = require('../../../../shared/responseHelper');
var logger = require('../../../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var userId = parsed.userId;
    logger.info('ACTIVITY', 'luxuryLuck' + ' userId=' + userId);

    // TODO: Implement business logic

    callback(RH.success({}));
}

module.exports = { handle: handle };
