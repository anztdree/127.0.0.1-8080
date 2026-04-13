'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'submitQuestionnaire': // TODO: WRITE — Submit a player questionnaire response
            // REQ: answerTime, answers, ip, questId, userId
            // RES: questionnaire submission result
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
