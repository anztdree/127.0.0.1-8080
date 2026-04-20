'use strict';

/**
 * =====================================================
 *  activity/index.js — Activity Router
 *  Super Warrior Z Game Server — Main Server
 *
 *  Flat router: require('./' + action) → handler.handle()
 *  Tidak ada FOLDERS map. Semua handler file di root folder.
 *  Unknown action → fallback success {} (matching original server)
 * =====================================================
 */

var RH = require('../../../shared/responseHelper');
var logger = require('../../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    if (!action) {
        callback(RH.success({}));
        return;
    }

    try {
        var handler = require('./' + action);
        if (handler && typeof handler.handle === 'function') {
            return handler.handle(socket, parsed, callback);
        }
    } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
            // Handler file belum dibuat → fallback success
            logger.warn('ACTIVITY', 'No handler: ' + action);
        } else {
            logger.error('ACTIVITY', 'Handler error: ' + action + ' → ' + err.message);
        }
    }

    callback(RH.success({}));
}

module.exports = { handle: handle };
