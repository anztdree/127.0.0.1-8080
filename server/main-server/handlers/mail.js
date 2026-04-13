'use strict';
var RH = require('../../shared/responseHelper');
function handle(socket, parsed, callback) {
    switch (parsed.action) {
        case 'autoDelMail': // TODO: WRITE — automatically delete expired or read mails // REQ: userId, version // RES: deletedCount
            callback(RH.success({})); break;
        case 'delMail': // TODO: WRITE — delete a specific mail by ID // REQ: mailId, userId, version // RES: success
            callback(RH.success({})); break;
        case 'getAllReward': // TODO: WRITE — claim all pending mail attachments at once // REQ: userId, version // RES: rewards
            callback(RH.success({})); break;
        case 'getMailList': // TODO: READ — retrieve the user's mail inbox list // REQ: userId, version // RES: mails
            callback(RH.success({})); break;
        case 'getReward': // TODO: WRITE — claim attachment reward from a specific mail // REQ: mailId, userId, version // RES: reward
            callback(RH.success({})); break;
        case 'readMail': // TODO: WRITE — mark a mail as read // REQ: mailId, userId, version // RES: updatedMail
            callback(RH.success({})); break;
        default: callback(RH.success({}));
    }
}
module.exports = { handle: handle };
