/**
 * ============================================================
 * USERMSGGETMSGLIST.JS - Mock Handler for userMsg.getMsgList
 * ============================================================
 * 
 * Purpose: Returns user mail/message list
 * Called during login to check for unread mail/messages
 * Shows mail icon notification if there are unread messages
 * 
 * HAR Reference: s398-zd.pksilo.com_2026_04_01_01_08_04.har
 * 
 * Flow (from game code main.min.js):
 *   1. Game calls: ts.processHandler({type:"userMsg",action:"getMsgList",userId,version:"1.0"})
 *   2. Response contains _brief with message summary
 *   3. If _brief is empty {}, no mail notification shown
 * 
 * HAR Data:
 *   Request:  {"type":"userMsg","action":"getMsgList","userId":"f443c70a-...","version":"1.0"}
 *   Response: {"type":"userMsg","action":"getMsgList","userId":"f443c70a-...","version":"1.0","_brief":{}}
 *   Response wrapper: {ret:0, compress:false, serverTime:..., server0Time:14400000, data:"..."}
 * 
 * Author: Local SDK Bridge
 * Version: 1.0.0
 * ============================================================
 */

(function(window) {
    'use strict';

    var LOG = {
        prefix: '📬 [USER-MSG]',
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
     * Handler for userMsg.getMsgList
     * Registered via window.MAIN_SERVER_HANDLERS
     * 
     * HAR Response: _brief:{} — no mail for new player
     */
    function handleGetMsgList(request, playerData) {
        LOG.info('Handling userMsg.getMsgList');
        LOG.info('UserId: ' + request.userId);

        var responseData = {
            type: 'userMsg',
            action: 'getMsgList',
            userId: request.userId,
            version: request.version || '1.0',
            _brief: {}
        };

        LOG.success('getMsgList → no messages');

        return responseData;
    }

    // ========================================================
    // REGISTER HANDLER
    // ========================================================
    function register() {
        if (typeof window === 'undefined') {
            console.error('[USER-MSG] window not available');
            return;
        }

        window.MAIN_SERVER_HANDLERS = window.MAIN_SERVER_HANDLERS || {};
        window.MAIN_SERVER_HANDLERS['userMsg.getMsgList'] = handleGetMsgList;

        LOG.success('Handler registered: userMsg.getMsgList');
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
