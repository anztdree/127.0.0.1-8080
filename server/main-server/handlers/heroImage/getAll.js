/**
 * getAll.js — Handler: heroImage/getAll
 * Deep-traced from main.min.js
 *
 * Client sends: { type: "heroImage", action: "getAll", userId: "..." }
 * Returns hero image data used for hero portraits/icons.
 *
 * For now, return empty list (no hero image server needed).
 */

function handleHeroImageGetAll(request, ctx) {
    const { userId } = request;

    ctx.logger.log('INFO', 'HERO_IMG', 'heroImage getAll request');
    ctx.logger.details('request',
        ['userId', userId ? userId.substring(0, 12) : 'MISSING']
    );

    // Return empty hero image list
    const responseData = {
        _heroImages: [],
        _version: 0
    };

    ctx.logger.log('INFO', 'HERO_IMG', 'heroImage getAll SUCCESS (empty)');

    return ctx.buildDataResponse(0, responseData);
}

module.exports = handleHeroImageGetAll;
