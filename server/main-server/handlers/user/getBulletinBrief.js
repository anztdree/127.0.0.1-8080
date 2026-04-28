/**
 * handlers/user/getBulletinBrief.js
 *
 * Client request (line 121087-121091):
 *   type: 'user', action: 'getBulletinBrief', userId, version: '1.0'
 *
 * Client response (line 121093-121101):
 *   { _brief: { "<bulletinId>": { title, version, order } } }
 *
 * Called when user opens Notice Board tab in mail panel.
 * Client has 5-min cooldown (checkAskNoticeTime) before next request.
 * Red dot logic runs client-side: compares bulletinVersions vs server version.
 */

var db = require('../../db');

module.exports = {
    execute: function (data, socket, ctx) {
        return new Promise(function (resolve) {
            try {
                var bulletins = db.getBulletins();
                var brief = {};

                for (var i = 0; i < bulletins.length; i++) {
                    var b = bulletins[i];
                    brief[b.id] = {
                        title: b.title || '',
                        version: b.version || '1',
                        order: b.order || 0
                    };
                }

                resolve(ctx.buildResponse({ _brief: brief }));
            } catch (err) {
                console.error('  [getBulletinBrief] DB error: ' + err.message);
                console.error('  [getBulletinBrief] Stack: ' + err.stack);
                resolve(ctx.buildResponse({ _brief: {} }));
            }
        });
    }
};
