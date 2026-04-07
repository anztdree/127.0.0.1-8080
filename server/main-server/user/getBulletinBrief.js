/**
 * ============================================================
 * GETBULLETINBRIEF.JS - Mock Handler for user.getBulletinBrief
 * ============================================================
 * 
 * Purpose: Returns bulletin/announcement brief data
 * Called during login sequence after friendServerAction queries
 * Shows popup notifications for active bulletins/announcements
 * 
 * HAR Reference: s398-zd.pksilo.com_2026_04_01_01_08_04.har
 * 
 * Flow (from game code main.min.js):
 *   1. Game calls: ts.processHandler({type:"user",action:"getBulletinBrief",userId,version:"1.0"})
 *   2. Response: {type:"user", action:"getBulletinBrief", userId:"...", version:"1.0", _brief:{...}}
 *   3. Game checks _brief for new/unread bulletins and shows popup
 *   4. If _brief is empty {}, no popup shown (new player / no active announcements)
 * 
 * HAR Data (2 sessions, identical response):
 *   Request:  {"type":"user","action":"getBulletinBrief","userId":"f443c70a-...","version":"1.0"}
 *   Response: {"type":"user","action":"getBulletinBrief","userId":"f443c70a-...","version":"1.0","_brief":{}}
 *   Response wrapper: {ret:0, compress:false, serverTime:..., server0Time:14400000, data:"..."}
 * 
 * Author: Local SDK Bridge
 * Version: 1.0.0
 * ============================================================
 */

(function(window) {
    'use strict';

    var LOG = {
        prefix: '📢 [BULLETIN]',
        _log: function(level, icon, message, data) {
            var timestamp = new Date().toISOString().substr(11, 12);
            var styles = {
                success: 'color: #22c55e; font-weight: bold;',
                info: 'color: #6b7280;',
                warn: 'color: #f59e0b; font-weight: bold;',
                error: 'color: #ef4444; font-weight: bold;'
            };
            var style = styles[level] || styles.info;
            var format = '%c' + this.prefix + ' ' + icon + ' [' + timestamp + '] ' + message;
            if (data !== undefined) {
                console.log(format + ' %o', style, data);
            } else {
                console.log(format, style);
            }
        },
        success: function(msg, data) { this._log('success', '✅', msg, data); },
        info: function(msg, data) { this._log('info', 'ℹ️', msg, data); },
        warn: function(msg, data) { this._log('warn', '⚠️', msg, data); },
        error: function(msg, data) { this._log('error', '❌', msg, data); }
    };

    /**
     * Handler for user.getBulletinBrief
     * Registered via window.MAIN_SERVER_HANDLERS
     * 
     * HAR Response Structure:
     *   _brief: {} — empty for new player (no active bulletins)
     *   
     * When real server has bulletins, _brief contains:
     *   _brief: {
     *     "<bulletinId>": {
     *       "_id": "<bulletinId>",
     *       "_title": "Announcement Title",
     *       "_content": "Announcement content...",
     *       "_type": 1,
     *       "_startTime": <timestamp>,
     *       "_endTime": <timestamp>
     *     }
     *   }
     */
    function handleGetBulletinBrief(request, playerData) {
        LOG.info('Handling user.getBulletinBrief');
        LOG.info('UserId:', request.userId);

        // HAR: Real server returns _brief:{} for new player
        // No active bulletins on local mock server
        var responseData = {
            type: 'user',
            action: 'getBulletinBrief',
            userId: request.userId,
            version: request.version || '1.0',
            _brief: {}
        };

        LOG.success('getBulletinBrief success → no active bulletins');

        return responseData;
    }

    // ========================================================
    // REGISTER HANDLER
    // ========================================================
    // entergame.js checks window.MAIN_SERVER_HANDLERS for external handlers
    // The routing logic in _handleRequest does:
    //   1. Check window.MAIN_SERVER_HANDLERS["user.getBulletinBrief"]
    //   2. If found, call handler(request, playerData)
    //   3. Then wrap result with buildResponse() by entergame.js
    // ========================================================
    function register() {
        if (typeof window === 'undefined') {
            console.error('[BULLETIN] window not available');
            return;
        }

        window.MAIN_SERVER_HANDLERS = window.MAIN_SERVER_HANDLERS || {};
        window.MAIN_SERVER_HANDLERS['user.getBulletinBrief'] = handleGetBulletinBrief;

        LOG.success('Handler registered: user.getBulletinBrief');
    }

    // Auto-register
    if (typeof window !== 'undefined') {
        register();
    } else {
        var _check = setInterval(function() {
            if (typeof window !== 'undefined') {
                clearInterval(_check);
                register();
            }
        }, 50);
        setTimeout(function() { clearInterval(_check); }, 10000);
    }

})(window);
