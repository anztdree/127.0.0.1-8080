/**
 * ============================================================================
 *  SDK.js v3 — PPGAME SDK Client for Super Warrior Z (Dragon Ball Z)
 * ============================================================================
 *
 *  Engine     : Egret (WebGL)
 *  Resolution : 750 x 1334
 *  SDK Type   : PPGAME
 *  Version    : 3.0.0
 *
 *  ARCHITECTURE:
 *  ───────────────────────────────────────────────────────────────────────────
 *  1. This file loads BEFORE index.html inline scripts and BEFORE main.min.js
 *  2. index.html (line 27) loads this via <script src="sdk.js">
 *  3. index.html (lines 48-54) sets: hideList, activityUrl, clientver,
 *     Log_Clean, debug, sdkChannel, gameIcon, debugLanguage — we DO NOT override
 *  4. index.html (lines 119-128) sets: maskLayerClear, loadJsonFunc, refreshPage
 *  5. index.html (line 193-194) defines checkSDK() returning true
 *  6. index.html (lines 196-210) defines getSdkLoginInfo() reading URL params
 *  7. index.html (lines 221-259) PPGAME block: if(window.PPGAME) creates 7 wrappers
 *
 *  RULES:
 *    - NEVER override functions/variables already set by index.html
 *    - ONLY provide what main.min.js needs but doesn't have
 *    - Provide window.PPGAME so PPGAME block auto-creates wrappers
 *    - main.min.js: TSBrowser.executeFunction("name", ...args) → window[name](...args)
 *    - main.min.js: TSBrowser.getVariantValue("name") → window[name]
 *    - main.min.js: TSBrowser.checkWindowFunction("name") → window[name] && typeof function
 *
 *  LOGIN FLOW:
 *    sdk.js loads → check URL params → no params? show login UI →
 *    user login → POST /api/auth/login → server returns login data →
 *    redirect ?sdk=X&logintoken=X&nickname=X&userid=X&sign=X&security=X →
 *    index.html getSdkLoginInfo() → main.min.js sdkLoginSuccess()
 *
 *  PAYMENT FLOW:
 *    Client buy → main-server prePayRet → client enriches with role data →
 *    TSBrowser.executeFunction("paySdk", data) → window.paySdk →
 *    PPGAME.createPaymentOrder → POST /api/payment/create → confirm UI →
 *    POST /api/payment/verify → main-server delivers goods
 *
 *  REPORTING FLOW:
 *    report2Sdk → PPGAME.playerEnterServer / .submitEvent →
 *    reportLogToPP → TSBrowser.executeFunction("reportLogToPP", event, data) →
 *    queue → batch flush → POST /api/report/batch
 *
 * ============================================================================
 */

(function () {
    'use strict';

    // ========================================================================
    // SECTION 1: CONFIGURATION
    // ========================================================================

    var SDK_CONFIG = {
        // SDK server URL — auto-detect from current origin for LAN play
        // Override with ?sdk_server=http://192.168.1.100:9999 if needed
        SERVER_URL: (function () {
            try {
                var params = {};
                var search = window.location.search;
                if (search && search.length > 1) {
                    var pairs = search.substring(1).split('&');
                    for (var i = 0; i < pairs.length; i++) {
                        var p = pairs[i].split('=');
                        if (p.length >= 2) {
                            params[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || '');
                        }
                    }
                }
                if (params.sdk_server) return params.sdk_server;
            } catch (e) { /* fallback */ }
            return window.location.protocol + '//' + window.location.hostname + ':9999';
        })(),

        // App identifiers
        APP_ID: '288',      // ReportSdkInfoXX (main.min.js line 52484)
        GAME_ID: '261',     // ReportToCpapiCreaterole (main.min.js line 52500)

        // SDK channel — index.html line 53: window["sdkChannel"] = "ppgame"
        CHANNEL: 'ppgame',

        // Encryption keys
        INIT_SDK_KEY: '68355760639752706329835728782448',  // initSDKDe (line 55181)
        TEA_KEY: 'verification',                             // game socket encryption

        // Login server — null = use serversetting.json default
        LOGIN_SERVER_URL: null,

        // Client server (Weixin only)
        CLIENT_SERVER_URL: '',

        // Login UI
        LOGIN_UI_TITLE: 'Super Warrior Z',
        LOGIN_UI_SUBTITLE: 'Private Server',
        LOGIN_UI_BG_COLOR: '#0a0a1a',

        // Payment
        PAYMENT_CURRENCY: 'USD',
        PAYMENT_TIMEOUT_MS: 300000,

        // Reporting
        REPORT_BATCH_SIZE: 10,
        REPORT_FLUSH_INTERVAL_MS: 30000,
        REPORT_MAX_QUEUE_SIZE: 100,

        // Session
        SESSION_TIMEOUT_MS: 86400000,

        // API endpoints
        API: {
            AUTH_LOGIN: '/api/auth/login',
            AUTH_GUEST: '/api/auth/guest',
            AUTH_REGISTER: '/api/auth/register',
            AUTH_LOGOUT: '/api/auth/logout',
            PAYMENT_CREATE: '/api/payment/create',
            PAYMENT_VERIFY: '/api/payment/verify',
            PAYMENT_CALLBACK: '/api/payment/callback',
            REPORT_EVENT: '/api/report/event',
            REPORT_BATCH: '/api/report/batch',
            USER_INFO: '/api/user/info',
            USER_LANGUAGE: '/api/user/language'
        }
    };

    // ========================================================================
    // SECTION 2: STATE
    // ========================================================================

    var _state = {
        isLoggedIn: false,
        userId: null,
        nickname: null,
        loginToken: null,
        sdk: SDK_CONFIG.CHANNEL,
        security: null,
        sign: null,
        sessionId: null,
        loginTime: null,
        lastActivityTime: null,
        serverId: null,
        serverName: null,
        characterId: null,
        characterName: null,
        characterLevel: null,
        pendingPayments: {},
        paymentCallbacks: {},
        reportQueue: [],
        reportFlushTimer: null,
        exitGameFn: null,
        loginUIVisible: false,
        paymentUIVisible: false,
        currentLanguage: null,
        sdkDeKey: null,
        teaCipher: null,
        isInitialized: false,
        debugMode: false
    };

    // ========================================================================
    // SECTION 3: UTILITIES
    // ========================================================================

    function generateUniqueId() {
        var ts = Date.now().toString(36);
        var rand = Math.random().toString(36).substring(2, 10);
        var ctr = (generateUniqueId._c = (generateUniqueId._c || 0) + 1);
        return ts + '-' + rand + '-' + ctr.toString(36);
    }
    generateUniqueId._c = 0;

    function simpleHash(str) {
        var h = 0;
        for (var i = 0; i < str.length; i++) {
            h = ((h << 5) - h) + str.charCodeAt(i);
            h = h & h;
        }
        return Math.abs(h).toString(16).padStart(8, '0');
    }

    function getUrlParams() {
        var r = {};
        var s = window.location.search;
        if (!s || s.length <= 1) return r;
        var pairs = s.substring(1).split('&');
        for (var i = 0; i < pairs.length; i++) {
            var p = pairs[i].split('=');
            if (p.length >= 2) {
                r[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || '');
            }
        }
        return r;
    }

    function formatDate(date) {
        var d = date || new Date();
        var pad = function (n) { return String(n).padStart(2, '0'); };
        return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + 'T'
            + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()) + '.'
            + pad(d.getMilliseconds());
    }

    function deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Array) {
            var a = [];
            for (var i = 0; i < obj.length; i++) a[i] = deepClone(obj[i]);
            return a;
        }
        var c = {};
        for (var k in obj) { if (obj.hasOwnProperty(k)) c[k] = deepClone(obj[k]); }
        return c;
    }

    function sendHttpRequest(method, endpoint, data, onSuccess, onError) {
        var url = SDK_CONFIG.SERVER_URL + endpoint;
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('X-SDK-Channel', SDK_CONFIG.CHANNEL);
        xhr.timeout = 30000;

        if (_state.loginToken) {
            xhr.setRequestHeader('X-Login-Token', _state.loginToken);
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        var resp = JSON.parse(xhr.responseText);
                        if (resp.success) {
                            if (onSuccess) onSuccess(resp.data || resp);
                        } else {
                            if (onError) onError(resp.message || resp.msg || 'Server error');
                        }
                    } catch (e) {
                        if (onError) onError('Invalid response: ' + e.message);
                    }
                } else if (xhr.status === 0) {
                    if (onError) onError('Cannot connect to SDK server');
                } else {
                    if (onError) onError('Server error: ' + xhr.status);
                }
            }
        };

        xhr.ontimeout = function () { if (onError) onError('Request timed out'); };
        xhr.onerror = function () { if (onError) onError('Network error'); };

        try {
            if (data && (method === 'POST' || method === 'PUT')) {
                xhr.send(JSON.stringify(data));
            } else {
                xhr.send();
            }
        } catch (e) {
            if (onError) onError('Send failed: ' + e.message);
        }
    }

    function checkUrlLoginParams() {
        var p = getUrlParams();
        var sdk = p.sdk || p.SDK;
        var lt = p.logintoken || p.loginToken || p.LOGINTOKEN;
        var nn = p.nickname || p.nickName || p.NICKNAME;
        var ui = p.userid || p.userId || p.USERID;

        if (sdk && lt && nn && ui) {
            return { sdk: sdk, logintoken: lt, nickname: nn, userid: ui, sign: p.sign || null, security: p.security || null };
        }
        return null;
    }

    function buildLoginUrl(d) {
        var base = window.location.origin + window.location.pathname;
        var p = getUrlParams();
        var extra = '';
        ['language', 'pluginMiniGame', 'channel'].forEach(function (k) {
            if (p[k]) extra += '&' + k + '=' + encodeURIComponent(p[k]);
        });

        return base
            + '?sdk=' + encodeURIComponent(d.sdk || SDK_CONFIG.CHANNEL)
            + '&logintoken=' + encodeURIComponent(d.loginToken)
            + '&nickname=' + encodeURIComponent(d.nickname)
            + '&userid=' + encodeURIComponent(d.userId)
            + (d.sign ? '&sign=' + encodeURIComponent(d.sign) : '')
            + (d.security ? '&security=' + encodeURIComponent(d.security) : '')
            + extra;
    }

    function sdkLog(level, source, msg, data) {
        if (window.Log_Clean === true && level !== 'error') return;
        var prefix = '[PPGAME SDK][' + source + ']';
        var ts = new Date().toISOString();
        var d = data !== undefined ? ' ' + JSON.stringify(data) : '';

        if (level === 'error') console.error(prefix, ts, msg, d);
        else if (level === 'warn') console.warn(prefix, ts, msg, d);
        else if (level === 'debug') { if (_state.debugMode || window.debug === true) console.log(prefix, ts, msg, d); }
        else if (level === 'info') console.info(prefix, ts, msg, d);
        else console.log(prefix, ts, msg, d);
    }

    // ========================================================================
    // SECTION 4: TEA ENCRYPTION
    // ========================================================================

    var TEACipher = {
        DELTA: 0x9E3779B9,
        ROUNDS: 32,

        encrypt: function (data, key) {
            var bytes = this._s2b(data);
            while (bytes.length % 8 !== 0) bytes.push(0);
            var kb = this._s2b(key);
            while (kb.length < 16) kb.push(0);

            var result = [];
            for (var i = 0; i < bytes.length; i += 8) {
                var v0 = this._r32(bytes, i), v1 = this._r32(bytes, i + 4);
                var k0 = this._r32(kb, 0), k1 = this._r32(kb, 4);
                var k2 = this._r32(kb, 8), k3 = this._r32(kb, 12);
                var sum = 0;
                for (var r = 0; r < this.ROUNDS; r++) {
                    sum = (sum + this.DELTA) >>> 0;
                    v0 = (v0 + (((v1 << 4) + k0) ^ (v1 + sum) ^ ((v1 >>> 5) + k1))) >>> 0;
                    v1 = (v1 + (((v0 << 4) + k2) ^ (v0 + sum) ^ ((v0 >>> 5) + k3))) >>> 0;
                }
                result.push(v0 & 0xFF, (v0 >>> 8) & 0xFF, (v0 >>> 16) & 0xFF, (v0 >>> 24) & 0xFF,
                    v1 & 0xFF, (v1 >>> 8) & 0xFF, (v1 >>> 16) & 0xFF, (v1 >>> 24) & 0xFF);
            }
            return this._b2h(result);
        },

        decrypt: function (hexData, key) {
            var bytes = this._h2b(hexData);
            var kb = this._s2b(key);
            while (kb.length < 16) kb.push(0);
            var result = [];
            for (var i = 0; i < bytes.length; i += 8) {
                var v0 = this._r32(bytes, i), v1 = this._r32(bytes, i + 4);
                var k0 = this._r32(kb, 0), k1 = this._r32(kb, 4);
                var k2 = this._r32(kb, 8), k3 = this._r32(kb, 12);
                var sum = (this.DELTA * this.ROUNDS) >>> 0;
                for (var r = 0; r < this.ROUNDS; r++) {
                    v1 = (v1 - (((v0 << 4) + k2) ^ (v0 + sum) ^ ((v0 >>> 5) + k3))) >>> 0;
                    v0 = (v0 - (((v1 << 4) + k0) ^ (v1 + sum) ^ ((v1 >>> 5) + k1))) >>> 0;
                    sum = (sum - this.DELTA) >>> 0;
                }
                result.push(v0 & 0xFF, (v0 >>> 8) & 0xFF, (v0 >>> 16) & 0xFF, (v0 >>> 24) & 0xFF,
                    v1 & 0xFF, (v1 >>> 8) & 0xFF, (v1 >>> 16) & 0xFF, (v1 >>> 24) & 0xFF);
            }
            while (result.length > 0 && result[result.length - 1] === 0) result.pop();
            return this._b2s(result);
        },

        _s2b: function (s) { var b = []; for (var i = 0; i < s.length; i++) b.push(s.charCodeAt(i) & 0xFF); return b; },
        _b2s: function (b) { var s = ''; for (var i = 0; i < b.length; i++) s += String.fromCharCode(b[i]); return s; },
        _r32: function (b, o) { return (b[o] + (b[o+1] << 8) + (b[o+2] << 16) + ((b[o+3] << 24) >>> 0)) >>> 0; },
        _b2h: function (b) { var h = ''; for (var i = 0; i < b.length; i++) h += ('0' + b[i].toString(16)).slice(-2); return h; },
        _h2b: function (h) { var b = []; for (var i = 0; i < h.length; i += 2) b.push(parseInt(h.substr(i, 2), 16)); return b; }
    };

    // ========================================================================
    // SECTION 5: REPORTING
    // ========================================================================

    var ReportDataType = {
        ChangeServer: 1, CreateRole: 2, EnterGame: 3, LevelUp: 4, ExitGame: 5,
        ChangeName: 6, EndGuide: 7, GetFirstRecharge: 8, GetVipLevelReward: 9,
        LevelAchieved: 10, LevelAchieved2: 11, LevelAchieved4: 12, LevelAchieved6: 13,
        LevelAchievedv2: 14, LevelAchievedv6: 15, LevelAchieved20: 17, LevelAchieved25: 18,
        LevelAchieved30: 19, LevelAchieved35: 20, LevelAchieved40: 21, SecondDaySign: 22,
        userLevelAchieved3: 23, userLevelAchieved6: 24, userLevelAchieved18: 25, userevelAchieved28: 26,
        firstViewRechargePanel: 27, blackStoneLoginCount4: 28, blackStoneLoginCount6: 29,
        blackStoneLessonFinish: 30, EnterGameFalse: 31, UserVipLevelUP: 32
    };

    var PPLogEvents = {
        END_LOAD_RESOURCE: 'endLoadResource',
        START_PLAY: 'startPlay',
        DISCONNECT_LOGIN_SOCKET: 'disConnectLoginSocket',
        CONNECT_LOGIN_SOCKET: 'connectLoginSocket',
        ENTER_SERVER_LIST: 'enterServerList',
        ENTER_LOADING_PAGE: 'enterLoadingPage',
        DISCONNECT_GAME_SOCKET: 'disconnectGame78Socket',
        CONNECT_GAME_SOCKET: 'connectGame78Socket',
        IN_GAME: 'inGame'
    };

    function queueReport(eventType, eventData, category) {
        _state.reportQueue.push({
            id: generateUniqueId(),
            timestamp: formatDate(),
            category: category || 'lifecycle',
            eventType: eventType,
            eventData: eventData || {},
            userId: _state.userId,
            sessionId: _state.sessionId,
            serverId: _state.serverId,
            serverName: _state.serverName,
            characterId: _state.characterId,
            characterName: _state.characterName,
            characterLevel: _state.characterLevel,
            sdk: SDK_CONFIG.CHANNEL,
            appId: SDK_CONFIG.APP_ID,
            pageUrl: window.location.href,
            userAgent: navigator.userAgent
        });

        if (_state.reportQueue.length >= SDK_CONFIG.REPORT_BATCH_SIZE) {
            flushReportQueue();
        }
    }

    function flushReportQueue() {
        if (_state.reportQueue.length === 0) return;
        var reports = _state.reportQueue.slice();
        _state.reportQueue = [];

        sendHttpRequest('POST', SDK_CONFIG.API.REPORT_BATCH,
            { reports: reports, timestamp: formatDate() },
            function () { sdkLog('debug', 'Report', 'Flushed ' + reports.length + ' reports'); },
            function (err) {
                sdkLog('warn', 'Report', 'Flush failed: ' + err);
                for (var i = 0; i < reports.length; i++) {
                    if (_state.reportQueue.length < SDK_CONFIG.REPORT_MAX_QUEUE_SIZE) {
                        _state.reportQueue.push(reports[i]);
                    }
                }
            }
        );
    }

    function startReportFlushTimer() {
        if (_state.reportFlushTimer) clearInterval(_state.reportFlushTimer);
        _state.reportFlushTimer = setInterval(flushReportQueue, SDK_CONFIG.REPORT_FLUSH_INTERVAL_MS);
    }

    function sendImmediateReport(eventType, eventData) {
        queueReport(eventType, eventData, 'immediate');
        flushReportQueue();
    }

    // ========================================================================
    // SECTION 6: PAYMENT
    // ========================================================================

    function handleCreatePaymentOrder(paymentData) {
        sdkLog('info', 'Payment', 'Create order', paymentData);
        if (!paymentData || !paymentData.goodsId) return;

        var orderId = 'ORD-' + generateUniqueId();
        var orderData = {
            orderId: orderId,
            userId: _state.userId,
            sessionId: _state.sessionId,
            goodsId: paymentData.goodsId || paymentData.goodId,
            goodsName: paymentData.goodsName || ('Item ' + paymentData.goodsId),
            goodsNum: paymentData.goodsNum || paymentData.goodNum || 1,
            price: paymentData.price,
            totalPrice: paymentData.totalPrice || paymentData.money || paymentData.price,
            currency: paymentData.currency || SDK_CONFIG.PAYMENT_CURRENCY,
            roleId: paymentData.roleId || _state.characterId,
            roleName: paymentData.roleName || _state.characterName,
            roleLevel: paymentData.roleLevel || _state.characterLevel,
            roleVip: paymentData.roleVip,
            serverId: _state.serverId,
            serverName: paymentData.serverName || _state.serverName,
            channel: SDK_CONFIG.CHANNEL,
            appId: SDK_CONFIG.APP_ID,
            timestamp: formatDate()
        };

        _state.pendingPayments[orderId] = orderData;

        sendHttpRequest('POST', SDK_CONFIG.API.PAYMENT_CREATE, orderData,
            function () { showPaymentConfirmationUI(orderId, orderData); },
            function (err) {
                sdkLog('error', 'Payment', 'Create failed: ' + err);
                hidePaymentUI();
            }
        );
    }

    function showPaymentConfirmationUI(orderId, orderData) {
        var old = document.getElementById('ppgame-payment-overlay');
        if (old) old.parentNode.removeChild(old);

        var overlay = document.createElement('div');
        overlay.id = 'ppgame-payment-overlay';
        overlay.setAttribute('style', 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center;font-family:Arial,sans-serif');

        var dialog = document.createElement('div');
        dialog.setAttribute('style', 'background:linear-gradient(135deg,#1a1a3e 0%,#0d0d2b 100%);border:2px solid #4a4a8a;border-radius:16px;padding:24px;max-width:400px;width:90%;color:#fff;box-shadow:0 10px 40px rgba(0,0,0,0.6)');

        var title = document.createElement('div');
        title.textContent = 'Confirm Purchase';
        title.setAttribute('style', 'font-size:20px;font-weight:bold;text-align:center;margin-bottom:16px;color:#ffd700');
        dialog.appendChild(title);

        var details = document.createElement('div');
        details.setAttribute('style', 'background:rgba(255,255,255,0.05);border-radius:8px;padding:16px;margin-bottom:16px');
        details.innerHTML =
            '<div style="margin-bottom:8px"><span style="color:#aaa">Item:</span> <span style="color:#fff">' + (orderData.goodsName || 'Unknown') + '</span></div>' +
            '<div style="margin-bottom:8px"><span style="color:#aaa">Qty:</span> <span style="color:#fff">' + orderData.goodsNum + '</span></div>' +
            '<div style="margin-bottom:8px"><span style="color:#aaa">Price:</span> <span style="color:#7dffb3">$' + (orderData.totalPrice / 100).toFixed(2) + '</span></div>' +
            '<div><span style="color:#aaa">Order:</span> <span style="color:#888;font-size:11px">' + orderId + '</span></div>';
        dialog.appendChild(details);

        var btns = document.createElement('div');
        btns.setAttribute('style', 'display:flex;gap:12px');

        var cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.setAttribute('style', 'flex:1;padding:12px;border:1px solid #666;border-radius:8px;background:transparent;color:#ccc;font-size:16px;cursor:pointer');
        cancelBtn.onclick = function () { hidePaymentUI(); };

        var confirmBtn = document.createElement('button');
        confirmBtn.textContent = 'Confirm Pay';
        confirmBtn.setAttribute('style', 'flex:1;padding:12px;border:none;border-radius:8px;background:linear-gradient(135deg,#ffd700,#ff8c00);color:#000;font-size:16px;font-weight:bold;cursor:pointer');
        confirmBtn.onclick = function () { confirmPayment(orderId, orderData); };

        btns.appendChild(cancelBtn);
        btns.appendChild(confirmBtn);
        dialog.appendChild(btns);
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
        _state.paymentUIVisible = true;
    }

    function confirmPayment(orderId, orderData) {
        sendHttpRequest('POST', SDK_CONFIG.API.PAYMENT_VERIFY,
            { orderId: orderId, userId: _state.userId, sessionId: _state.sessionId, confirmed: true, timestamp: formatDate() },
            function () {
                updatePaymentUIStatus('success', 'Payment successful! Items delivered shortly.');
                setTimeout(hidePaymentUI, 2000);
            },
            function (err) { updatePaymentUIStatus('error', 'Payment failed: ' + err); }
        );
    }

    function updatePaymentUIStatus(status, message) {
        var overlay = document.getElementById('ppgame-payment-overlay');
        if (!overlay) return;
        var dialog = overlay.querySelector('div > div');
        if (!dialog) return;

        var statusDiv = document.createElement('div');
        statusDiv.setAttribute('style', 'text-align:center;margin-top:12px;font-size:14px;color:' + (status === 'success' ? '#7dffb3' : '#ff6b6b'));
        statusDiv.textContent = message;

        var btns = dialog.querySelector('div:last-child');
        if (btns && btns.style.display === 'flex') btns.style.display = 'none';
        dialog.appendChild(statusDiv);
    }

    function hidePaymentUI() {
        var el = document.getElementById('ppgame-payment-overlay');
        if (el) el.parentNode.removeChild(el);
        _state.paymentUIVisible = false;
    }

    // ========================================================================
    // SECTION 7: LOGIN UI
    // ========================================================================

    function showLoginUI() {
        if (_state.loginUIVisible) return;
        sdkLog('info', 'LoginUI', 'Showing login UI');

        var overlay = document.createElement('div');
        overlay.id = 'ppgame-login-overlay';
        overlay.setAttribute('style', 'position:fixed;top:0;left:0;right:0;bottom:0;background:' + SDK_CONFIG.LOGIN_UI_BG_COLOR + ';z-index:10000;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Arial,Helvetica,sans-serif;overflow:hidden');

        // BG gradient
        var bg = document.createElement('div');
        bg.setAttribute('style', 'position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(ellipse at center,#1a1a4e 0%,#0a0a1a 70%);z-index:-1');
        overlay.appendChild(bg);

        // Decorative circle
        var deco = document.createElement('div');
        deco.setAttribute('style', 'position:absolute;top:-100px;right:-100px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(255,215,0,0.08) 0%,transparent 70%);pointer-events:none');
        overlay.appendChild(deco);

        // Title
        var logoArea = document.createElement('div');
        logoArea.setAttribute('style', 'text-align:center;margin-bottom:40px');

        var logoTitle = document.createElement('div');
        logoTitle.textContent = SDK_CONFIG.LOGIN_UI_TITLE;
        logoTitle.setAttribute('style', 'font-size:36px;font-weight:bold;color:#ffd700;text-shadow:0 2px 10px rgba(255,215,0,0.3);margin-bottom:8px;letter-spacing:2px');
        logoArea.appendChild(logoTitle);

        var logoSub = document.createElement('div');
        logoSub.textContent = SDK_CONFIG.LOGIN_UI_SUBTITLE;
        logoSub.setAttribute('style', 'font-size:14px;color:#8888aa;letter-spacing:4px;text-transform:uppercase');
        logoArea.appendChild(logoSub);
        overlay.appendChild(logoArea);

        // Form
        var form = document.createElement('div');
        form.setAttribute('style', 'width:320px;max-width:85%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:32px 24px;backdrop-filter:blur(10px)');

        // Username
        var ug = document.createElement('div');
        ug.setAttribute('style', 'margin-bottom:16px');
        var ul = document.createElement('label');
        ul.textContent = 'Username';
        ul.setAttribute('style', 'display:block;font-size:12px;color:#8888aa;margin-bottom:6px;text-transform:uppercase;letter-spacing:1px');
        ug.appendChild(ul);
        var ui = document.createElement('input');
        ui.type = 'text';
        ui.id = 'ppgame-username';
        ui.placeholder = 'Enter username';
        ui.setAttribute('style', 'width:100%;padding:12px 16px;border:1px solid rgba(255,255,255,0.15);border-radius:8px;background:rgba(0,0,0,0.3);color:#fff;font-size:16px;outline:none;box-sizing:border-box;transition:border-color 0.3s');
        ui.onfocus = function () { this.style.borderColor = '#ffd700'; };
        ui.onblur = function () { this.style.borderColor = 'rgba(255,255,255,0.15)'; };
        ug.appendChild(ui);
        form.appendChild(ug);

        // Password
        var pg = document.createElement('div');
        pg.setAttribute('style', 'margin-bottom:24px');
        var pl = document.createElement('label');
        pl.textContent = 'Password';
        pl.setAttribute('style', 'display:block;font-size:12px;color:#8888aa;margin-bottom:6px;text-transform:uppercase;letter-spacing:1px');
        pg.appendChild(pl);
        var pi = document.createElement('input');
        pi.type = 'password';
        pi.id = 'ppgame-password';
        pi.placeholder = 'Enter password';
        pi.setAttribute('style', 'width:100%;padding:12px 16px;border:1px solid rgba(255,255,255,0.15);border-radius:8px;background:rgba(0,0,0,0.3);color:#fff;font-size:16px;outline:none;box-sizing:border-box;transition:border-color 0.3s');
        pi.onfocus = function () { this.style.borderColor = '#ffd700'; };
        pi.onblur = function () { this.style.borderColor = 'rgba(255,255,255,0.15)'; };
        pg.appendChild(pi);
        form.appendChild(pg);

        // Error
        var err = document.createElement('div');
        err.id = 'ppgame-login-error';
        err.setAttribute('style', 'color:#ff6b6b;font-size:13px;text-align:center;margin-bottom:12px;min-height:20px');
        form.appendChild(err);

        // Login button
        var lb = document.createElement('button');
        lb.textContent = 'LOGIN';
        lb.id = 'ppgame-login-btn';
        lb.setAttribute('style', 'width:100%;padding:14px;border:none;border-radius:8px;background:linear-gradient(135deg,#ffd700,#ff8c00);color:#000;font-size:18px;font-weight:bold;letter-spacing:2px;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s');
        lb.onmouseenter = function () { this.style.transform = 'translateY(-2px)'; this.style.boxShadow = '0 6px 20px rgba(255,215,0,0.3)'; };
        lb.onmouseleave = function () { this.style.transform = 'translateY(0)'; this.style.boxShadow = 'none'; };
        lb.onclick = function () { handleLoginClick(); };
        form.appendChild(lb);

        // Register link
        var rl = document.createElement('div');
        rl.setAttribute('style', 'text-align:center;margin-top:12px');
        var rb = document.createElement('span');
        rb.textContent = "Don't have an account? Register";
        rb.setAttribute('style', 'color:#8888cc;font-size:13px;cursor:pointer;text-decoration:underline');
        rb.onclick = function () { handleRegisterClick(); };
        rl.appendChild(rb);
        form.appendChild(rl);

        // Divider
        var div = document.createElement('div');
        div.setAttribute('style', 'display:flex;align-items:center;margin:24px 0;color:#555;font-size:12px');
        div.innerHTML = '<div style="flex:1;height:1px;background:rgba(255,255,255,0.1)"></div><div style="padding:0 12px">OR</div><div style="flex:1;height:1px;background:rgba(255,255,255,0.1)"></div>';
        form.appendChild(div);

        // Guest button
        var gb = document.createElement('button');
        gb.textContent = 'GUEST LOGIN';
        gb.id = 'ppgame-guest-btn';
        gb.setAttribute('style', 'width:100%;padding:12px;border:1px solid rgba(255,255,255,0.2);border-radius:8px;background:transparent;color:#aaa;font-size:14px;letter-spacing:2px;cursor:pointer;transition:all 0.3s');
        gb.onmouseenter = function () { this.style.borderColor = '#8888cc'; this.style.color = '#ccc'; };
        gb.onmouseleave = function () { this.style.borderColor = 'rgba(255,255,255,0.2)'; this.style.color = '#aaa'; };
        gb.onclick = function () { handleGuestLoginClick(); };
        form.appendChild(gb);
        overlay.appendChild(form);

        // Version
        var ver = document.createElement('div');
        ver.setAttribute('style', 'position:absolute;bottom:20px;color:#444;font-size:11px;text-align:center');
        ver.textContent = 'PPGAME SDK v3.0.0 | Channel: ' + SDK_CONFIG.CHANNEL.toUpperCase();
        overlay.appendChild(ver);

        document.body.appendChild(overlay);
        _state.loginUIVisible = true;

        pi.addEventListener('keyup', function (e) { if (e.key === 'Enter' || e.keyCode === 13) handleLoginClick(); });
        ui.addEventListener('keyup', function (e) { if (e.key === 'Enter' || e.keyCode === 13) pi.focus(); });
    }

    function hideLoginUI() {
        var el = document.getElementById('ppgame-login-overlay');
        if (el) el.parentNode.removeChild(el);
        _state.loginUIVisible = false;
    }

    function setLoginError(msg) {
        var el = document.getElementById('ppgame-login-error');
        if (el) el.textContent = msg || '';
    }

    function setLoginButtonsDisabled(disabled) {
        var lb = document.getElementById('ppgame-login-btn');
        var gb = document.getElementById('ppgame-guest-btn');
        if (lb) { lb.disabled = disabled; lb.style.opacity = disabled ? '0.5' : '1'; lb.style.pointerEvents = disabled ? 'none' : 'auto'; lb.textContent = disabled ? 'LOGGING IN...' : 'LOGIN'; }
        if (gb) { gb.disabled = disabled; gb.style.opacity = disabled ? '0.5' : '1'; gb.style.pointerEvents = disabled ? 'none' : 'auto'; gb.textContent = disabled ? 'CONNECTING...' : 'GUEST LOGIN'; }
    }

    function handleLoginClick() {
        var uInput = document.getElementById('ppgame-username');
        var pInput = document.getElementById('ppgame-password');
        var username = uInput ? uInput.value.trim() : '';
        var password = pInput ? pInput.value.trim() : '';

        if (!username) { setLoginError('Please enter your username'); uInput && uInput.focus(); return; }
        if (!password) { setLoginError('Please enter your password'); pInput && pInput.focus(); return; }
        if (username.length < 3) { setLoginError('Username must be at least 3 characters'); return; }
        if (password.length < 3) { setLoginError('Password must be at least 3 characters'); return; }

        setLoginError('');
        setLoginButtonsDisabled(true);

        sendHttpRequest('POST', SDK_CONFIG.API.AUTH_LOGIN,
            { username: username, password: password, channel: SDK_CONFIG.CHANNEL, appId: SDK_CONFIG.APP_ID, timestamp: formatDate() },
            function (response) { sdkLog('info', 'Auth', 'Login OK: ' + username); handleLoginSuccess(response); },
            function (error) { sdkLog('error', 'Auth', 'Login failed: ' + error); setLoginError(error); setLoginButtonsDisabled(false); }
        );
    }

    function handleRegisterClick() {
        var uInput = document.getElementById('ppgame-username');
        var pInput = document.getElementById('ppgame-password');
        var username = uInput ? uInput.value.trim() : '';
        var password = pInput ? pInput.value.trim() : '';

        if (!username || !password) { setLoginError('Enter username and password to register'); return; }
        if (username.length < 3) { setLoginError('Username must be at least 3 characters'); return; }
        if (password.length < 3) { setLoginError('Password must be at least 3 characters'); return; }

        setLoginError('');
        setLoginButtonsDisabled(true);

        sendHttpRequest('POST', SDK_CONFIG.API.AUTH_REGISTER,
            { username: username, password: password, channel: SDK_CONFIG.CHANNEL, appId: SDK_CONFIG.APP_ID, timestamp: formatDate() },
            function (response) { sdkLog('info', 'Auth', 'Register OK, auto-login: ' + username); handleLoginSuccess(response); },
            function (error) { sdkLog('error', 'Auth', 'Register failed: ' + error); setLoginError(error); setLoginButtonsDisabled(false); }
        );
    }

    function handleGuestLoginClick() {
        setLoginError('');
        setLoginButtonsDisabled(true);

        sendHttpRequest('POST', SDK_CONFIG.API.AUTH_GUEST,
            { channel: SDK_CONFIG.CHANNEL, appId: SDK_CONFIG.APP_ID, deviceId: generateGuestDeviceId(), timestamp: formatDate() },
            function (response) { sdkLog('info', 'Auth', 'Guest OK'); handleLoginSuccess(response); },
            function (error) { sdkLog('error', 'Auth', 'Guest failed: ' + error); setLoginError(error); setLoginButtonsDisabled(false); }
        );
    }

    function generateGuestDeviceId() {
        var key = 'ppgame_guest_device_id';
        try { var s = localStorage.getItem(key); if (s) return s; } catch (e) { }
        var id = 'GUEST-' + generateUniqueId() + '-' + simpleHash(navigator.userAgent + navigator.language);
        try { localStorage.setItem(key, id); } catch (e) { }
        return id;
    }

    function handleLoginSuccess(response) {
        _state.isLoggedIn = true;
        _state.userId = response.userId || response.userid;
        _state.nickname = response.nickname || response.nickName || response.username || 'Player';
        _state.loginToken = response.loginToken || response.logintoken;
        _state.sdk = response.sdk || SDK_CONFIG.CHANNEL;
        _state.sessionId = response.sessionId || generateUniqueId();
        _state.loginTime = Date.now();
        _state.lastActivityTime = Date.now();
        _state.sign = response.sign || simpleHash(_state.userId + _state.loginToken);
        _state.security = response.security || simpleHash(_state.loginToken + SDK_CONFIG.APP_ID);

        sdkLog('info', 'Auth', 'Success — userId: ' + _state.userId + ', nick: ' + _state.nickname);

        var url = buildLoginUrl({
            sdk: _state.sdk,
            loginToken: _state.loginToken,
            nickname: _state.nickname,
            userId: _state.userId,
            sign: _state.sign,
            security: _state.security
        });

        try { localStorage.setItem('ppgame_session', JSON.stringify({ userId: _state.userId, nickname: _state.nickname, loginToken: _state.loginToken, sdk: _state.sdk, sessionId: _state.sessionId, loginTime: _state.loginTime, sign: _state.sign, security: _state.security })); } catch (e) { }

        window.location.href = url;
    }

    function handleLogout() {
        sdkLog('info', 'Auth', 'Logout: ' + _state.userId);

        if (_state.userId && _state.loginToken) {
            sendHttpRequest('POST', SDK_CONFIG.API.AUTH_LOGOUT,
                { userId: _state.userId, loginToken: _state.loginToken, timestamp: formatDate() },
                function () { sdkLog('info', 'Auth', 'Logout OK'); },
                function (e) { sdkLog('warn', 'Auth', 'Logout failed: ' + e); }
            );
        }

        _state.isLoggedIn = false;
        _state.userId = null;
        _state.nickname = null;
        _state.loginToken = null;
        _state.sessionId = null;
        _state.sign = null;
        _state.security = null;

        try { localStorage.removeItem('ppgame_session'); } catch (e) { }
        stopReportFlushTimer();
        flushReportQueue();

        window.location.href = window.location.origin + window.location.pathname;
    }

    // ========================================================================
    // SECTION 8: PPGAME OBJECT
    // ========================================================================

    var PPGAME = {
        createPaymentOrder: function (data) {
            sdkLog('info', 'PPGAME', 'createPaymentOrder', data);
            if (data.roleId) _state.characterId = data.roleId;
            if (data.roleName) _state.characterName = data.roleName;
            if (data.roleLevel) _state.characterLevel = data.roleLevel;
            if (data.serverName) _state.serverName = data.serverName;
            handleCreatePaymentOrder(data);
            queueReport('payment_add_to_cart', { goodsId: data.goodsId || data.goodId, goodsName: data.goodsName, price: data.price }, 'payment');
        },

        gameReady: function () {
            sdkLog('info', 'PPGAME', 'gameReady');
            sendImmediateReport('game_ready', { userId: _state.userId, sessionId: _state.sessionId, timestamp: formatDate() });
        },

        playerEnterServer: function (data) {
            sdkLog('info', 'PPGAME', 'playerEnterServer', data);
            if (data.characterId) _state.characterId = data.characterId;
            if (data.characterName) _state.characterName = data.characterName;
            if (data.serverId) _state.serverId = data.serverId;
            if (data.serverName) _state.serverName = data.serverName;
            sendImmediateReport('player_enter_server', { characterName: data.characterName, characterId: data.characterId, serverId: data.serverId, serverName: data.serverName, userId: _state.userId, timestamp: formatDate() });
        },

        submitEvent: function (eventName, data) {
            sdkLog('info', 'PPGAME', 'submitEvent: ' + eventName, data);
            if (data) {
                if (data.characterId) _state.characterId = data.characterId;
                if (data.characterName) _state.characterName = data.characterName;
                if (data.serverId) _state.serverId = data.serverId;
                if (data.serverName) _state.serverName = data.serverName;
            }
            queueReport(eventName, { eventData: data || {}, userId: _state.userId, sessionId: _state.sessionId, serverId: _state.serverId, serverName: _state.serverName, characterId: _state.characterId, characterName: _state.characterName, timestamp: formatDate() }, 'event');
        },

        gameChapterFinish: function (chapterId) {
            sdkLog('info', 'PPGAME', 'gameChapterFinish: ' + chapterId);
            queueReport('game_chapter_finish', { chapterId: chapterId, userId: _state.userId, characterId: _state.characterId, characterName: _state.characterName, serverId: _state.serverId, serverName: _state.serverName, characterLevel: _state.characterLevel, timestamp: formatDate() }, 'progress');
        },

        openShopPage: function () {
            sdkLog('info', 'PPGAME', 'openShopPage');
            queueReport('open_shop_page', { userId: _state.userId, timestamp: formatDate() }, 'ui');
        },

        gameLevelUp: function (level) {
            sdkLog('info', 'PPGAME', 'gameLevelUp: ' + level);
            _state.characterLevel = level;
            queueReport('game_level_up', { level: level, userId: _state.userId, characterId: _state.characterId, characterName: _state.characterName, serverId: _state.serverId, serverName: _state.serverName, timestamp: formatDate() }, 'progress');
        }
    };

    // ========================================================================
    // SECTION 9: TSBrowser.executeFunction — Window Functions
    // ========================================================================

    // Functions defined by index.html — DO NOT override:
    //   getQueryStringByName, getSdkLoginInfo, checkSDK, getParams,
    //   paySdk, gameReady, report2Sdk, gameChapterFinish, openShopPage,
    //   gameLevelUp, tutorialFinish, refreshPage, maskLayerClear, loadJsonFunc

    window.reload = function () {
        sdkLog('warn', 'Window', 'reload()');
        window.location.reload();
    };

    window.checkFromNative = function () {
        return false; // MUST return false for web SDK
    };

    window.getAppId = function () {
        return SDK_CONFIG.APP_ID;
    };

    window.getLoginServer = function () {
        return SDK_CONFIG.LOGIN_SERVER_URL; // null = use default
    };

    window.getClientServer = function () {
        return SDK_CONFIG.CLIENT_SERVER_URL;
    };

    window.getSubChannel = function () {
        return SDK_CONFIG.APP_ID;
    };

    window.changeLanguage = function (lang) {
        sdkLog('info', 'Window', 'changeLanguage: ' + lang);
        _state.currentLanguage = lang;
        try { localStorage.setItem('ppgame_language', lang); } catch (e) { }
        sendHttpRequest('POST', SDK_CONFIG.API.USER_LANGUAGE,
            { userId: _state.userId, sessionId: _state.sessionId, language: lang, timestamp: formatDate() },
            function () { sdkLog('debug', 'Window', 'Language saved: ' + lang); },
            function (err) { sdkLog('warn', 'Window', 'Language save failed: ' + err); }
        );
    };

    window.openURL = function (url) {
        sdkLog('info', 'Window', 'openURL: ' + url);
        if (url) {
            try { window.open(url, '_blank', 'noopener,noreferrer'); } catch (e) { window.location.href = url; }
        }
    };

    window.sendCustomEvent = function (eventName, data) {
        sdkLog('info', 'Window', 'sendCustomEvent: ' + eventName, data);
        queueReport('custom_event', { eventName: eventName, eventData: data, userId: _state.userId, sessionId: _state.sessionId, timestamp: formatDate() }, 'custom');
    };

    window.accountLoginCallback = function (exitGameFn) {
        sdkLog('info', 'Window', 'accountLoginCallback — storing exitGame fn');
        if (typeof exitGameFn === 'function') _state.exitGameFn = exitGameFn;
    };

    window.exitGame = function () {
        sdkLog('info', 'Window', 'exitGame');
        if (_state.exitGameFn && typeof _state.exitGameFn === 'function') {
            try {
                var result = _state.exitGameFn();
                if (result && typeof result.then === 'function') {
                    result.then(function () { sdkLog('debug', 'Window', 'exitGameFn async done'); }).catch(function (err) { sdkLog('warn', 'Window', 'exitGameFn rejected'); });
                }
            } catch (e) { sdkLog('warn', 'Window', 'exitGameFn threw'); }
        } else {
            handleLogout();
        }
    };

    window.reportToCpapiCreaterole = function (data) {
        sdkLog('info', 'Window', 'reportToCpapiCreaterole', data);
        queueReport('cp_api_create_role', { gameId: data.gameId, userId: data.userId, areaId: data.areaId, roleName: data.roleName, sign: data.sign }, 'cp_api');
    };

    window.fbq = function (action, eventName) {
        sdkLog('debug', 'Window', 'fbq: ' + action + ' / ' + eventName);
        queueReport('facebook_pixel', { action: action, eventName: eventName }, 'analytics');
    };

    window.gtag = function (type, eventName, data) {
        sdkLog('debug', 'Window', 'gtag: ' + type + ' / ' + eventName, data);
        queueReport('google_analytics', { type: type, eventName: eventName, data: data }, 'analytics');
    };

    window.report2Sdk350CreateRole = function (jsonString) {
        sdkLog('info', 'Window', 'report2Sdk350CreateRole');
        var data;
        try { data = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString; } catch (e) { return; }
        queueReport('platform_350_create_role', { event: data.event, serverId: data._sid, serverName: data._sname, roleId: data.role_id, roleName: data.role_name }, 'platform_350');
    };

    window.report2Sdk350LoginUser = function (jsonString) {
        sdkLog('info', 'Window', 'report2Sdk350LoginUser');
        var data;
        try { data = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString; } catch (e) { return; }
        queueReport('platform_350_login_user', { event: data.event, serverId: data._sid, serverName: data._sname, roleId: data.role_id, roleName: data.role_name, roleLevel: data.role_level, vip: data.vip }, 'platform_350');
    };

    window.reportLogToPP = function (event, data) {
        sdkLog('info', 'Lifecycle', 'reportLogToPP: ' + event);
        queueReport('pp_lifecycle', { event: event, data: data, userId: _state.userId, sessionId: _state.sessionId, serverId: _state.serverId, serverName: _state.serverName, timestamp: formatDate() }, 'lifecycle');
    };

    window.initSDKDe = function (key) {
        sdkLog('info', 'Window', 'initSDKDe key: ' + (key ? key.substring(0, 8) + '...' : 'null'));
        _state.sdkDeKey = key;
        _state.teaCipher = TEACipher;
    };

    // ========================================================================
    // SECTION 10: Additional Window Functions (direct window.xxx calls)
    // ========================================================================

    window.contactSdk = function () {
        sdkLog('info', 'Window', 'contactSdk');
        try { window.open(SDK_CONFIG.SERVER_URL + '/support', '_blank'); } catch (e) { alert('Support: support@ppgame-sdk.local'); }
    };

    window.userCenterSdk = function () {
        sdkLog('info', 'Window', 'userCenterSdk');
        var url = SDK_CONFIG.SERVER_URL + '/user-center?userId=' + (_state.userId || '');
        try { window.open(url, '_blank'); } catch (e) { alert('User Center: ' + url); }
    };

    window.switchAccountSdk = function () {
        sdkLog('info', 'Window', 'switchAccountSdk');
        if (_state.exitGameFn && typeof _state.exitGameFn === 'function') {
            try {
                var result = _state.exitGameFn();
                if (result && typeof result.then === 'function') { result.then(function () { handleLogout(); }).catch(function () { handleLogout(); }); }
                else { handleLogout(); }
            } catch (e) { handleLogout(); }
        } else { handleLogout(); }
    };

    window.switchUser = function () {
        sdkLog('info', 'Window', 'switchUser');
        if (_state.exitGameFn && typeof _state.exitGameFn === 'function') {
            try {
                var result = _state.exitGameFn();
                if (result && typeof result.then === 'function') { result.then(function () { handleLogout(); }).catch(function () { handleLogout(); }); }
                else { handleLogout(); }
            } catch (e) { handleLogout(); }
        } else { handleLogout(); }
    };

    window.fbGiveLiveSdk = function () {
        sdkLog('debug', 'Window', 'fbGiveLiveSdk — no-op (non-tanwan)');
    };

    window.reportToBSH5Createrole = function (data) {
        sdkLog('info', 'Window', 'reportToBSH5Createrole', data);
        queueReport('bsh5_create_role', { uid: data.uid, serverName: data.serverName, userRoleName: data.userRoleName, userRoleId: data.userRoleId, userRoleLevel: data.userRoleLevel, vipLevel: data.vipLevel, partyName: data.partyName, userRoleBalance: data.userRoleBalance, serverId: data.serverId }, 'bsh5');
    };

    window.reportToFbq = function (data) {
        sdkLog('debug', 'Window', 'reportToFbq', data);
        queueReport('fb_pixel_h5', { actionName: data.actionName, eventName: data.eventName, param: data.param }, 'analytics');
    };

    // ========================================================================
    // SECTION 11: Window Variables (TSBrowser.getVariantValue / direct read)
    // ========================================================================

    // Variables set by index.html — DO NOT override:
    //   window.hideList, window.activityUrl, window.clientver, window.Log_Clean,
    //   window.debug, window.sdkChannel, window.gameIcon, window.debugLanguage

    // Variables we provide (NOT defined by index.html):
    window.debugLanguage = undefined;                    // override for language debug
    window.clientVer = window.clientver || '2026-03-02143147';  // mirror index.html value for getVariantValue("clientVer")
    window.versionConfig = null;                            // Weixin resource cache (null = off)
    window.reportBattlleLog = undefined;                    // battle error report URL
    window.clientserver = SDK_CONFIG.CLIENT_SERVER_URL;       // Weixin resource prefix
    window.clientServer = SDK_CONFIG.CLIENT_SERVER_URL;       // Weixin resource prefix (camelCase alias)
    window.subChannel = SDK_CONFIG.APP_ID;                // sub-channel for reporting
    window.show18Login = false;
    window.loginpictype = 0;
    window.showSixteenImg = false;
    window.supportLang = [
        { lang: 'en', name: 'English' },
        { lang: 'kr', name: 'Korean' },
        { lang: 'vi', name: 'Vietnamese' },
        { lang: 'jr', name: 'Japanese' },
        { lang: 'zh', name: 'Chinese' }
    ];
    window.showContact = true;
    window.sdkNativeChannel = (function () {
        try {
            var p = getUrlParams();
            var sdk = (p.sdk || p.SDK || '').toLowerCase();
            var known = ['en', 'kr', 'vi', 'jr', 'sylz', 'tc', 'tanwan55en'];
            for (var i = 0; i < known.length; i++) { if (sdk === known[i]) return known[i]; }
            if (sdk === 'ppgame') return 'en';
        } catch (e) { }
        return 'en';
    })();
    window.showCurChannel = undefined;
    window.dotq = [];                                     // Yahoo tracking (must be array for push())
    window.issdkVer2 = false;
    window.show18Home = false;
    window.replaceServerName = [];
    window.serverList = null;
    window.privacyUrl = '';
    window.version = undefined;

    // Safety guard for getQueryStringByName if index.html hasn't loaded yet
    if (typeof window.getQueryStringByName !== 'function') {
        window.getQueryStringByName = function (name) {
            return getUrlParams()[name] || '';
        };
    }

    // ========================================================================
    // SECTION 12: PPGAME Assignment
    // ========================================================================

    window.PPGAME = PPGAME;

    sdkLog('info', 'Init', 'window.PPGAME assigned — ' + Object.keys(PPGAME).length + ' methods');
    sdkLog('info', 'Init', 'Methods: ' + Object.keys(PPGAME).join(', '));

    // ========================================================================
    // SECTION 13: Initialization
    // ========================================================================

    function initializeSDK() {
        if (_state.isInitialized) return;
        _state.isInitialized = true;

        sdkLog('info', 'Init', 'PPGAME SDK v3.0.0');
        sdkLog('info', 'Init', 'Channel: ' + SDK_CONFIG.CHANNEL);
        sdkLog('info', 'Init', 'Server: ' + SDK_CONFIG.SERVER_URL);
        sdkLog('info', 'Init', 'App ID: ' + SDK_CONFIG.APP_ID);

        // Restore session from localStorage
        try {
            var stored = localStorage.getItem('ppgame_session');
            if (stored) {
                var sess = JSON.parse(stored);
                if (sess && sess.userId && sess.loginToken) {
                    _state.sessionId = sess.sessionId || generateUniqueId();
                }
            }
        } catch (e) { sdkLog('warn', 'Init', 'Session restore failed'); }

        // Check URL for login params
        var lp = checkUrlLoginParams();

        if (lp) {
            sdkLog('info', 'Init', 'Login params found in URL');
            _state.isLoggedIn = true;
            _state.userId = lp.userid;
            _state.nickname = lp.nickname;
            _state.loginToken = lp.logintoken;
            _state.sdk = lp.sdk;
            _state.sign = lp.sign || null;
            _state.security = lp.security || null;
            _state.loginTime = Date.now();
            _state.lastActivityTime = Date.now();
            _state.sessionId = _state.sessionId || generateUniqueId();

            try { localStorage.setItem('ppgame_session', JSON.stringify({ userId: _state.userId, nickname: _state.nickname, loginToken: _state.loginToken, sdk: _state.sdk, sessionId: _state.sessionId, loginTime: _state.loginTime, sign: _state.sign, security: _state.security })); } catch (e) { }

            sdkLog('info', 'Init', 'Auth verified — game loading proceeds');
        } else {
            sdkLog('info', 'Init', 'No login params — showing login UI');
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function () { showLoginUI(); });
            } else {
                showLoginUI();
            }
        }

        startReportFlushTimer();

        // Restore language
        try { var lang = localStorage.getItem('ppgame_language'); if (lang) _state.currentLanguage = lang; } catch (e) { }

        // Beforeunload: flush reports + session_end
        window.addEventListener('beforeunload', function () {
            flushReportQueue();
            if (_state.isLoggedIn) {
                try {
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', SDK_CONFIG.SERVER_URL + SDK_CONFIG.API.REPORT_EVENT, false);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify({ eventType: 'session_end', eventData: { userId: _state.userId, sessionId: _state.sessionId, duration: Date.now() - (_state.loginTime || Date.now()) } }));
                } catch (e) { }
            }
        });

        // Visibility change — track activity
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden && _state.isLoggedIn) _state.lastActivityTime = Date.now();
        });

        sdkLog('info', 'Init', 'SDK initialization complete');
    }

    // ========================================================================
    // SECTION 14: PPGAME_SDK Debug Interface
    // ========================================================================

    window.PPGAME_SDK = {
        getState: function () { return deepClone(_state); },
        getConfig: function () { return deepClone(SDK_CONFIG); },
        setDebug: function (enabled) { _state.debugMode = !!enabled; sdkLog('info', 'SDK', 'Debug: ' + (enabled ? 'ON' : 'OFF')); },
        getTEACipher: function () { return TEACipher; },
        encrypt: function (data) { return TEACipher.encrypt(data, SDK_CONFIG.TEA_KEY); },
        decrypt: function (hex) { return TEACipher.decrypt(hex, SDK_CONFIG.TEA_KEY); },
        flushReports: function () { flushReportQueue(); },
        logout: function () { handleLogout(); },
        getReportDataType: function () { return deepClone(ReportDataType); },
        getPPLogEvents: function () { return deepClone(PPLogEvents); }
    };

    // ========================================================================
    // SECTION 15: Run
    // ========================================================================

    initializeSDK();

})();
