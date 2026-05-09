/**
 * getBulletinBrief.js — Handler: user/getBulletinBrief
 * Deep-traced from main.min.js MailInfoManager.getBulletinBrief
 *
 * Called right after saveUserData completes.
 * Client expects response with bulletin/mail data.
 * For now, return empty bulletin list (no mail server needed).
 */

function handleGetBulletinBrief(request, ctx) {
    const { userId } = request;

    ctx.logger.log('INFO', 'BULLETIN', 'getBulletinBrief request');
    ctx.logger.details('request',
        ['userId', userId ? userId.substring(0, 12) : 'MISSING']
    );

    // Return empty bulletin list — no mail server
    const responseData = {
        _bulletins: [],
        _version: 0
    };

    ctx.logger.log('INFO', 'BULLETIN', 'getBulletinBrief SUCCESS (empty)');

    return ctx.buildDataResponse(0, responseData);
}

module.exports = handleGetBulletinBrief;
