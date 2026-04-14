'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'submit':
            // TODO: Submit questionnaire response
            // REQ: questionnaireId, answers
            // RES: submission result, reward status
            logger.info('QUESTIONNAIRE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getList':
            // TODO: Get available questionnaires
            // REQ: -
            // RES: questionnaire list
            logger.info('QUESTIONNAIRE', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('QUESTIONNAIRE', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
