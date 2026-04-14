'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'getImageVersion':
            // TODO: Get hero image version info for cache validation
            // REQ: -
            // RES: image version list
            logger.info('HEROIMAGE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'downloadImage':
            // TODO: Download hero image asset
            // REQ: heroId, imageType
            // RES: image data or download URL
            logger.info('HEROIMAGE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getAll':
            // TODO: Get all hero image versions/data for download manager
            // Called on first login to check which hero images need downloading
            // REQ: -
            // RES: _heroImageVersion, _superImageVersion, image list
            logger.info('HEROIMAGE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('HEROIMAGE', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
