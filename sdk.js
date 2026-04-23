/**
 * ============================================================================
 *  SDK.js v4.1 — PPGAME SDK Client + Server (Standalone)
 *  Super Warrior Z (Dragon Ball Z) — Private Server
 * ============================================================================
 *
 *  Engine     : Egret (WebGL)
 *  Resolution : 750 x 1334
 *  SDK Type   : PPGAME (Standalone — no external server needed)
 *  Version    : 4.1.0
 *
 *  ARCHITECTURE:
 *  ───────────────────────────────────────────────────────────────────────────
 *  This file is a SINGLE FILE that acts as BOTH:
 *    - SERVER: Handles API requests (auth, payment, report) locally
 *    - CLIENT: Manages SDK state, UI, window functions for main.min.js
 *
 *  The "server" lives inside sendHttpRequest() — instead of making real XHR
 *  calls to port 9999, it dispatches to local handler functions.
 *  Everything else (state, UI, PPGAME, window functions) remains natural.
 *
 *  LOADING ORDER (index.html <head>):
 *    1. jszip-utils.min.js
 *    2. jszip.min.js
 *    3. sdk.js  ← THIS FILE (IIFE runs immediately)
 *
 *  WHAT THIS FILE PROVIDES:
 *    - window.PPGAME            → 7 methods (gate for index.html wrappers)
 *    - window.initSDKDe(key)    → TEA cipher reference for main.min.js
 *    - window.checkFromNative() → false (web mode)
 *    - window.getAppId()        → '288'
 *    - window.getLoginServer()  → null (use serversetting.json)
 *    - window.getClientServer() → ''
 *    - window.getSubChannel()   → '288'
 *    - window.changeLanguage()  → save language pref
 *    - window.openURL()         → window.open
 *    - window.sendCustomEvent() → queue custom report
 *    - window.accountLoginCallback(fn) → store exit function
 *    - window.exitGame()        → exit or logout
 *    - window.reportToCpapiCreaterole() → queue report
 *    - window.fbq() / window.gtag() → queue report
 *    - window.report2Sdk350*()  → queue report
 *    - window.reportLogToPP()   → queue report
 *    - window.contactSdk()      → no-op
 *    - window.userCenterSdk()   → no-op
 *    - window.switchAccount() / window.switchAccountSdk() / window.switchUser() → exit+logout
 *    - window.fbGiveLiveSdk()   → no-op
 *    - window.reportToBSH5Createrole() / window.reportToFbq() → queue
 *    - window.PPGAME_SDK        → debug interface
 *    - 20+ window.* variables   → config values for main.min.js
 *
 *  LOGIN FLOW (Guest Only):
 *    sdk.js loads → check URL params → no params? show login UI →
 *    user clicks GUEST LOGIN → SERVER handler creates/finds guest →
 *    redirect ?sdk=X&logintoken=X&nickname=X&userid=X&sign=X&security=X →
 *    page reload → params detected → skip login UI → game loads →
 *    main.min.js calls getSdkLoginInfo() → sdkLoginSuccess()
 *
 *  PAYMENT FLOW:
 *    Client buy → main-server prePayRet → client enriches with role data →
 *    TSBrowser.executeFunction("paySdk", data) → window.paySdk →
 *    PPGAME.createPaymentOrder → SERVER handler creates order → confirm UI →
 *    SERVER handler verifies → success
 *
 *  REPORTING FLOW:
 *    report2Sdk → PPGAME.playerEnterServer / .submitEvent →
 *    reportLogToPP → queue → batch flush → SERVER handler accepts (always success)
 *
 * ============================================================================
 */

(function () {
    'use strict';

    // ========================================================================
    // SECTION 1: CONFIGURATION
    // ========================================================================

    var SDK_CONFIG = {
        // App identifiers
        APP_ID: '288',       // Used by: ReportSdkInfoXX, auth requests
        GAME_ID: '261',      // Used by: ReportToCpapiCreaterole

        // SDK channel
        CHANNEL: 'ppgame',

        // Encryption keys
        INIT_SDK_KEY: '68355760639752706329835728782448',  // initSDKDe key (main.min.js line 86991)
        TEA_KEY: 'verification',                             // game socket TEA encryption

        // Login server — null means use serversetting.json from resource/
        LOGIN_SERVER_URL: null,

        // Client server (Weixin/WeChat only, empty for private server)
        CLIENT_SERVER_URL: '',

        // Login UI appearance
        LOGIN_UI_TITLE: 'Super Warrior Z',
        LOGIN_UI_SUBTITLE: 'Private Server',
        LOGIN_UI_BG_COLOR: '#0a0a1a',

        // Payment
        PAYMENT_CURRENCY: 'USD',

        // Reporting
        REPORT_BATCH_SIZE: 10,           // flush when queue reaches this
        REPORT_FLUSH_INTERVAL_MS: 30000, // auto-flush every 30s
        REPORT_MAX_QUEUE_SIZE: 100,      // max reports in queue

        // Session
        SESSION_TIMEOUT_MS: 86400000,    // 24 hours (informational, not enforced)

        // API endpoints — kept for compatibility with original flow
        API: {
            AUTH_GUEST: '/api/auth/guest',
            AUTH_LOGOUT: '/api/auth/logout',
            PAYMENT_CREATE: '/api/payment/create',
            PAYMENT_VERIFY: '/api/payment/verify',
            REPORT_EVENT: '/api/report/event',
            REPORT_BATCH: '/api/report/batch',
            USER_LANGUAGE: '/api/user/language'
        }
    };

    // ========================================================================
    // SECTION 2: CLIENT STATE
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

    /**
     * Generate a unique ID string.
     * Format: timestamp-base36 + random-base36 + counter-base36
     */
    function generateUniqueId() {
        var ts = Date.now().toString(36);
        var rand = Math.random().toString(36).substring(2, 10);
        var ctr = (generateUniqueId._c = (generateUniqueId._c || 0) + 1);
        return ts + '-' + rand + '-' + ctr.toString(36);
    }
    generateUniqueId._c = 0;

    /**
     * Simple hash function for generating sign and security codes.
     * Used as fallback when server doesn't provide these values.
     */
    function simpleHash(str) {
        var h = 0;
        for (var i = 0; i < str.length; i++) {
            h = ((h << 5) - h) + str.charCodeAt(i);
            h = h & h; // Convert to 32-bit integer
        }
        return Math.abs(h).toString(16).padStart(8, '0');
    }

    /**
     * Parse URL query parameters into an object.
     * Case-sensitive. Used internally by sdk.js.
     */
    function getUrlParams() {
        var r = {};
        var s = window.location.search;
        if (!s || s.length <= 1) return r;
        var pairs = s.substring(1).split('&');
        for (var i = 0; i < pairs.length; i++) {
            var p = pairs[i].split('=');
            if (p.length >= 2) {
                try {
                    r[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || '');
                } catch (ex) {
                    r[p[0]] = p[1] || '';
                }
            }
        }
        return r;
    }

    /**
     * Format a Date object to ISO-like string: YYYY-MM-DDTHH:mm:ss.SSS
     */
    function formatDate(date) {
        var d = date || new Date();
        var pad = function (n) { return String(n).padStart(2, '0'); };
        return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + 'T'
            + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()) + '.'
            + pad(d.getMilliseconds());
    }

    /**
     * Deep clone an object or array.
     */
    function deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Array) {
            var a = [];
            for (var i = 0; i < obj.length; i++) a[i] = deepClone(obj[i]);
            return a;
        }
        var c = {};
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) c[k] = deepClone(obj[k]);
        }
        return c;
    }

    /**
     * Check URL for login params (sdk, logintoken, nickname, userid).
     * Returns params object or null if incomplete.
     * Case-insensitive matching for known param names.
     */
    function checkUrlLoginParams() {
        var p = getUrlParams();
        var sdk = p.sdk || p.SDK;
        var lt = p.logintoken || p.loginToken || p.LOGINTOKEN;
        var nn = p.nickname || p.nickName || p.NICKNAME;
        var ui = p.userid || p.userId || p.USERID;

        if (sdk && lt && nn && ui) {
            return {
                sdk: sdk,
                logintoken: lt,
                nickname: nn,
                userid: ui,
                sign: p.sign || null,
                security: p.security || null
            };
        }
        return null;
    }

    /**
     * Build login URL with all required params for redirect after login.
     * Preserves language, pluginMiniGame, channel params from current URL.
     */
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

    /**
     * Logging utility. Respects window.Log_Clean and window.debug settings.
     */
    function sdkLog(level, source, msg, data) {
        if (window.Log_Clean === true && level !== 'error') return;
        var prefix = '[PPGAME SDK][' + source + ']';
        var ts = new Date().toISOString();
        var d = data !== undefined ? ' ' + JSON.stringify(data) : '';

        if (level === 'error') console.error(prefix, ts, msg, d);
        else if (level === 'warn') console.warn(prefix, ts, msg, d);
        else if (level === 'debug') {
            if (_state.debugMode || window.debug === true) console.log(prefix, ts, msg, d);
        }
        else if (level === 'info') console.info(prefix, ts, msg, d);
        else console.log(prefix, ts, msg, d);
    }

    // ========================================================================
    // SECTION 4: TEA ENCRYPTION
    // ========================================================================
    // Classic TEA (Tiny Encryption Algorithm) — 32 rounds, 64-bit block, 128-bit key
    // Used by main.min.js for game socket verification (key: 'verification')
    // Also used via initSDKDe for SDK-level encryption

    var TEACipher = {
        DELTA: 0x9E3779B9,  // Golden ratio constant (standard TEA)
        ROUNDS: 32,          // Standard TEA rounds

        /**
         * Encrypt a string with TEA cipher.
         * @param {string} data - Plaintext string
         * @param {string} key - Encryption key (first 16 chars used)
         * @returns {string} Hex-encoded ciphertext
         */
        encrypt: function (data, key) {
            var bytes = this._s2b(data);
            // Pad to 8-byte boundary
            while (bytes.length % 8 !== 0) bytes.push(0);
            var kb = this._s2b(key);
            // Pad key to 16 bytes (128-bit)
            while (kb.length < 16) kb.push(0);

            var result = [];
            for (var i = 0; i < bytes.length; i += 8) {
                var v0 = this._r32(bytes, i);
                var v1 = this._r32(bytes, i + 4);
                var k0 = this._r32(kb, 0), k1 = this._r32(kb, 4);
                var k2 = this._r32(kb, 8), k3 = this._r32(kb, 12);
                var sum = 0;

                for (var r = 0; r < this.ROUNDS; r++) {
                    sum = (sum + this.DELTA) >>> 0;
                    v0 = (v0 + (((v1 << 4) + k0) ^ (v1 + sum) ^ ((v1 >>> 5) + k1))) >>> 0;
                    v1 = (v1 + (((v0 << 4) + k2) ^ (v0 + sum) ^ ((v0 >>> 5) + k3))) >>> 0;
                }

                // Write 4 bytes for each 32-bit value (little-endian)
                result.push(
                    v0 & 0xFF, (v0 >>> 8) & 0xFF, (v0 >>> 16) & 0xFF, (v0 >>> 24) & 0xFF,
                    v1 & 0xFF, (v1 >>> 8) & 0xFF, (v1 >>> 16) & 0xFF, (v1 >>> 24) & 0xFF
                );
            }
            return this._b2h(result);
        },

        /**
         * Decrypt TEA-encrypted hex data.
         * @param {string} hexData - Hex-encoded ciphertext
         * @param {string} key - Encryption key (first 16 chars used)
         * @returns {string} Decrypted plaintext (trailing nulls stripped)
         */
        decrypt: function (hexData, key) {
            var bytes = this._h2b(hexData);
            var kb = this._s2b(key);
            while (kb.length < 16) kb.push(0);

            var result = [];
            for (var i = 0; i < bytes.length; i += 8) {
                var v0 = this._r32(bytes, i);
                var v1 = this._r32(bytes, i + 4);
                var k0 = this._r32(kb, 0), k1 = this._r32(kb, 4);
                var k2 = this._r32(kb, 8), k3 = this._r32(kb, 12);
                var sum = (this.DELTA * this.ROUNDS) >>> 0;

                for (var r = 0; r < this.ROUNDS; r++) {
                    v1 = (v1 - (((v0 << 4) + k2) ^ (v0 + sum) ^ ((v0 >>> 5) + k3))) >>> 0;
                    v0 = (v0 - (((v1 << 4) + k0) ^ (v1 + sum) ^ ((v1 >>> 5) + k1))) >>> 0;
                    sum = (sum - this.DELTA) >>> 0;
                }

                result.push(
                    v0 & 0xFF, (v0 >>> 8) & 0xFF, (v0 >>> 16) & 0xFF, (v0 >>> 24) & 0xFF,
                    v1 & 0xFF, (v1 >>> 8) & 0xFF, (v1 >>> 16) & 0xFF, (v1 >>> 24) & 0xFF
                );
            }
            // Strip trailing null bytes
            while (result.length > 0 && result[result.length - 1] === 0) result.pop();
            return this._b2s(result);
        },

        // Helper: string → byte array
        _s2b: function (s) {
            var b = [];
            for (var i = 0; i < s.length; i++) b.push(s.charCodeAt(i) & 0xFF);
            return b;
        },
        // Helper: byte array → string
        _b2s: function (b) {
            var s = '';
            for (var i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
            return s;
        },
        // Helper: 4 bytes → uint32 (little-endian)
        _r32: function (b, o) {
            return (b[o] + (b[o + 1] << 8) + (b[o + 2] << 16) + ((b[o + 3] << 24) >>> 0)) >>> 0;
        },
        // Helper: byte array → hex string
        _b2h: function (b) {
            var h = '';
            for (var i = 0; i < b.length; i++) h += ('0' + b[i].toString(16)).slice(-2);
            return h;
        },
        // Helper: hex string → byte array
        _h2b: function (h) {
            var b = [];
            for (var i = 0; i < h.length; i += 2) b.push(parseInt(h.substr(i, 2), 16));
            return b;
        }
    };

    // ========================================================================
    // SECTION 5: LOCAL DATA STORE (MockDB)
    // ========================================================================
    // Replaces MySQL/database. All data persisted in localStorage.
    // Tables: users, sessions, orders

    var DB_PREFIX = 'ppgame_db_';

    var MockDB = {
        /**
         * Read a "table" (array of objects) from localStorage.
         * @param {string} tableName - Table name (e.g., 'users')
         * @returns {Array} Array of records, or empty array
         */
        _readTable: function (tableName) {
            try {
                var raw = localStorage.getItem(DB_PREFIX + tableName);
                return raw ? JSON.parse(raw) : [];
            } catch (e) {
                sdkLog('error', 'DB', 'Read table failed: ' + tableName, e.message);
                return [];
            }
        },

        /**
         * Write a "table" to localStorage.
         * @param {string} tableName - Table name
         * @param {Array} data - Array of records
         */
        _writeTable: function (tableName, data) {
            try {
                localStorage.setItem(DB_PREFIX + tableName, JSON.stringify(data));
            } catch (e) {
                sdkLog('error', 'DB', 'Write table failed: ' + tableName, e.message);
            }
        },

        // ─── USER operations ───────────────────────────────────────────

        /**
         * Find a user by deviceId (guest login).
         * @param {string} deviceId
         * @returns {Object|null}
         */
        findUserByDeviceId: function (deviceId) {
            var users = this._readTable('users');
            for (var i = 0; i < users.length; i++) {
                if (users[i].deviceId === deviceId) return users[i];
            }
            return null;
        },

        /**
         * Create a new guest user record.
         * @param {Object} userData - {deviceId, channel, appId}
         * @returns {Object} The created user record (with generated fields)
         */
        createUser: function (userData) {
            var users = this._readTable('users');
            // Generate unique userId (incrementing)
            var maxId = 1000;
            for (var i = 0; i < users.length; i++) {
                var uid = parseInt(users[i].userId, 10);
                if (uid >= maxId) maxId = uid + 1;
            }

            var now = Date.now();
            var user = {
                userId: String(maxId),
                deviceId: userData.deviceId || null,
                nickname: 'Player' + maxId,
                channel: userData.channel || SDK_CONFIG.CHANNEL,
                appId: userData.appId || SDK_CONFIG.APP_ID,
                createdAt: now,
                lastLoginAt: now,
                loginCount: 1,
                loginToken: null
            };

            users.push(user);
            this._writeTable('users', users);
            sdkLog('debug', 'DB', 'Created user: ' + user.userId + ' (' + user.deviceId + ')');
            return user;
        },

        /**
         * Update a user record's last login info and generate new token.
         * @param {string} userId
         * @returns {Object|null} Updated user record
         */
        updateUserLogin: function (userId) {
            var users = this._readTable('users');
            for (var i = 0; i < users.length; i++) {
                if (users[i].userId === userId) {
                    users[i].lastLoginAt = Date.now();
                    users[i].loginCount = (users[i].loginCount || 0) + 1;
                    users[i].loginToken = 'tok-' + generateUniqueId() + '-' + simpleHash(userId + Date.now());
                    this._writeTable('users', users);
                    sdkLog('debug', 'DB', 'Updated login for user: ' + userId);
                    return users[i];
                }
            }
            return null;
        },

        // ─── ORDER operations ──────────────────────────────────────────

        /**
         * Save a payment order.
         * @param {Object} orderData
         */
        saveOrder: function (orderData) {
            var orders = this._readTable('orders');
            orders.push(orderData);
            this._writeTable('orders', orders);
            sdkLog('debug', 'DB', 'Saved order: ' + orderData.orderId);
        },

        /**
         * Update order status.
         * @param {string} orderId
         * @param {string} status - 'confirmed', 'cancelled'
         */
        updateOrderStatus: function (orderId, status) {
            var orders = this._readTable('orders');
            for (var i = 0; i < orders.length; i++) {
                if (orders[i].orderId === orderId) {
                    orders[i].status = status;
                    orders[i].updatedAt = Date.now();
                    this._writeTable('orders', orders);
                    sdkLog('debug', 'DB', 'Updated order ' + orderId + ' → ' + status);
                    return;
                }
            }
        },

        /**
         * Get all orders for a user.
         * @param {string} userId
         * @returns {Array}
         */
        getOrdersByUserId: function (userId) {
            var orders = this._readTable('orders');
            var result = [];
            for (var i = 0; i < orders.length; i++) {
                if (orders[i].userId === userId) result.push(orders[i]);
            }
            return result;
        }
    };

    // ========================================================================
    // SECTION 6: SERVER — AUTH HANDLERS
    // ========================================================================

    var ServerHandlers = {};

    /**
     * POST /api/auth/guest
     * Login as guest using a persistent device ID.
     *
     * Request: { channel, appId, deviceId, timestamp }
     * Response: same as login
     */
    ServerHandlers[SDK_CONFIG.API.AUTH_GUEST] = function (data) {
        sdkLog('info', 'Server:Auth', 'Guest login request');

        if (!data.deviceId) {
            return { success: false, message: 'Device ID is required' };
        }

        // Check if guest user already exists for this device
        var user = MockDB.findUserByDeviceId(data.deviceId);
        if (!user) {
            // Create new guest user
            user = MockDB.createUser({
                deviceId: data.deviceId,
                channel: data.channel || SDK_CONFIG.CHANNEL,
                appId: data.appId || SDK_CONFIG.APP_ID
            });
        }

        // Update login
        user = MockDB.updateUserLogin(user.userId);
        var loginToken = user.loginToken;
        var sign = simpleHash(user.userId + loginToken);
        var security = simpleHash(loginToken + SDK_CONFIG.APP_ID);

        sdkLog('info', 'Server:Auth', 'Guest login success', { userId: user.userId });

        return {
            success: true,
            data: {
                userId: user.userId,
                nickname: user.nickname,
                loginToken: loginToken,
                sdk: user.channel || SDK_CONFIG.CHANNEL,
                sessionId: generateUniqueId(),
                sign: sign,
                security: security
            }
        };
    };

    /**
     * POST /api/auth/logout
     * Invalidate user session. Fire-and-forget from client.
     *
     * Request: { userId, loginToken, timestamp }
     * Response: { success: true, data: {} }
     */
    ServerHandlers[SDK_CONFIG.API.AUTH_LOGOUT] = function (data) {
        sdkLog('info', 'Server:Auth', 'Logout request', { userId: data.userId });
        // In a real server, we'd invalidate the token.
        // Here we just acknowledge the logout.
        return { success: true, data: {} };
    };

    // ========================================================================
    // SECTION 7: SERVER — PAYMENT HANDLERS
    // ========================================================================

    /**
     * POST /api/payment/create
     * Create a payment order.
     *
     * Request: { orderId, userId, sessionId, goodsId, goodsName, goodsNum,
     *            price, totalPrice, currency, roleId, roleName, roleLevel,
     *            serverId, serverName, channel, appId, timestamp }
     * Response: { success: true, data: { orderId, status: 'pending' } }
     */
    ServerHandlers[SDK_CONFIG.API.PAYMENT_CREATE] = function (data) {
        sdkLog('info', 'Server:Payment', 'Create order', { orderId: data.orderId, goodsId: data.goodsId });

        if (!data.orderId || !data.goodsId) {
            return { success: false, message: 'Invalid order data' };
        }

        // Save order to local storage
        MockDB.saveOrder({
            orderId: data.orderId,
            userId: data.userId,
            sessionId: data.sessionId,
            goodsId: data.goodsId,
            goodsName: data.goodsName,
            goodsNum: data.goodsNum,
            price: data.price,
            totalPrice: data.totalPrice,
            currency: data.currency,
            status: 'pending',
            createdAt: Date.now()
        });

        return {
            success: true,
            data: { orderId: data.orderId, status: 'pending' }
        };
    };

    /**
     * POST /api/payment/verify
     * Confirm a payment order (always succeeds in mock mode).
     *
     * Request: { orderId, userId, sessionId, confirmed, timestamp }
     * Response: { success: true, data: { orderId, status: 'confirmed' } }
     */
    ServerHandlers[SDK_CONFIG.API.PAYMENT_VERIFY] = function (data) {
        sdkLog('info', 'Server:Payment', 'Verify order', { orderId: data.orderId });

        if (!data.orderId) {
            return { success: false, message: 'Order ID is required' };
        }

        // Update order status
        MockDB.updateOrderStatus(data.orderId, 'confirmed');

        return {
            success: true,
            data: { orderId: data.orderId, status: 'confirmed' }
        };
    };

    // ========================================================================
    // SECTION 8: SERVER — REPORT HANDLERS
    // ========================================================================

    /**
     * POST /api/report/batch
     * Accept a batch of analytics reports. Always succeeds.
     *
     * Request: { reports: [...], timestamp: string }
     * Response: { success: true, data: { received: number } }
     */
    ServerHandlers[SDK_CONFIG.API.REPORT_BATCH] = function (data) {
        var count = Array.isArray(data.reports) ? data.reports.length : 0;
        sdkLog('debug', 'Server:Report', 'Batch received: ' + count + ' reports');

        // In a real server, we'd store these. Here we just accept and discard.
        // Reports are logged at debug level for troubleshooting.

        return {
            success: true,
            data: { received: count }
        };
    };

    /**
     * POST /api/report/event
     * Single analytics event (synchronous, sent on beforeunload).
     * Response is ignored by the client.
     *
     * Request: { eventType, eventData }
     * Response: { success: true, data: {} }
     */
    ServerHandlers[SDK_CONFIG.API.REPORT_EVENT] = function (data) {
        sdkLog('debug', 'Server:Report', 'Event received', { eventType: data.eventType });
        return { success: true, data: {} };
    };

    /**
     * POST /api/user/language
     * Save user language preference. Non-blocking.
     *
     * Request: { userId, sessionId, language, timestamp }
     * Response: { success: true, data: {} }
     */
    ServerHandlers[SDK_CONFIG.API.USER_LANGUAGE] = function (data) {
        sdkLog('debug', 'Server:User', 'Language saved', { language: data.language });
        return { success: true, data: {} };
    };

    /**
     * Catch-all handler for undefined endpoints.
     * Returns a generic error response.
     */
    function serverUnknownEndpoint(endpoint) {
        sdkLog('warn', 'Server', 'Unknown endpoint: ' + endpoint);
        return { success: false, message: 'Unknown endpoint: ' + endpoint };
    }

    // ========================================================================
    // SECTION 9: TRANSPORT — sendHttpRequest (Local Dispatch)
    // ========================================================================
    // This is the critical bridge between CLIENT and SERVER.
    // Instead of making real XHR calls, it dispatches to local ServerHandlers.
    // The callback signature is identical to the original XHR-based version,
    // so all CLIENT code works unchanged.

    /**
     * Simulate an HTTP request by dispatching to local server handlers.
     * Replaces the original XHR-based sendHttpRequest.
     *
     * @param {string} method - HTTP method ('POST', 'GET')
     * @param {string} endpoint - API path (e.g., '/api/auth/login')
     * @param {Object|null} data - Request body
     * @param {Function} onSuccess - Called with response.data on success
     * @param {Function} onError - Called with error string on failure
     */
    function sendHttpRequest(method, endpoint, data, onSuccess, onError) {
        sdkLog('debug', 'Transport', method + ' ' + endpoint, data);

        // Simulate async delay (50-150ms) for realistic timing
        var delay = 50 + Math.floor(Math.random() * 100);

        setTimeout(function () {
            try {
                // Find handler for this endpoint
                var handler = ServerHandlers[endpoint];

                if (!handler) {
                    var errResponse = serverUnknownEndpoint(endpoint);
                    if (onError) onError(errResponse.message);
                    return;
                }

                // Call handler with request data
                var response = handler(data || {});

                // Process response (same logic as original XHR handler)
                if (response.success) {
                    if (onSuccess) onSuccess(response.data || response);
                } else {
                    if (onError) onError(response.message || response.msg || 'Server error');
                }
            } catch (e) {
                sdkLog('error', 'Transport', 'Handler error: ' + e.message, e.stack);
                if (onError) onError('Internal server error: ' + e.message);
            }
        }, delay);
    }

    /**
     * Synchronous version of sendHttpRequest for beforeunload reporting.
     * Matches the original behavior: fire-and-forget, no response handling.
     *
     * @param {string} method
     * @param {string} endpoint
     * @param {Object} data
     */
    function sendHttpRequestSync(method, endpoint, data) {
        try {
            var handler = ServerHandlers[endpoint];
            if (handler) handler(data || {});
        } catch (e) {
            // Silently ignore — this is a best-effort call
        }
    }

    // ========================================================================
    // SECTION 10: CLIENT — REPORTING
    // ========================================================================

    /**
     * Report data types — numeric IDs used by main.min.js ReportSdkInfoXX().
     * These map to in-game events like create role, level up, enter game, etc.
     */
    var ReportDataType = {
        ChangeServer: 1,
        CreateRole: 2,
        EnterGame: 3,
        LevelUp: 4,
        ExitGame: 5,
        ChangeName: 6,
        EndGuide: 7,
        GetFirstRecharge: 8,
        GetVipLevelReward: 9,
        LevelAchieved: 10,
        LevelAchieved2: 11,
        LevelAchieved4: 12,
        LevelAchieved6: 13,
        LevelAchievedv2: 14,
        LevelAchievedv6: 15,
        // Value 16 intentionally skipped in original
        LevelAchieved20: 17,
        LevelAchieved25: 18,
        LevelAchieved30: 19,
        LevelAchieved35: 20,
        LevelAchieved40: 21,
        SecondDaySign: 22,
        userLevelAchieved3: 23,
        userLevelAchieved6: 24,
        userLevelAchieved18: 25,
        userevelAchieved28: 26,  // Note: typo preserved from original
        firstViewRechargePanel: 27,
        blackStoneLoginCount4: 28,
        blackStoneLoginCount6: 29,
        blackStoneLessonFinish: 30,
        EnterGameFalse: 31,
        UserVipLevelUP: 32
    };

    /**
     * PP Log events — string event types for lifecycle tracking.
     * Used by main.min.ts reportLogToPP() for socket connection events.
     */
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

    /**
     * Queue a report event for later batch sending.
     * Auto-flushes when queue reaches REPORT_BATCH_SIZE.
     *
     * @param {string} eventType - Event name
     * @param {Object} eventData - Event data payload
     * @param {string} category - Report category (lifecycle, immediate, event, progress, ui, payment, custom, cp_api, analytics, platform_350, bsh5)
     */
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

        // Auto-flush when queue reaches batch size
        if (_state.reportQueue.length >= SDK_CONFIG.REPORT_BATCH_SIZE) {
            flushReportQueue();
        }
    }

    /**
     * Flush all queued reports to the server (local handler).
     * On failure, re-queues reports up to max queue size.
     */
    function flushReportQueue() {
        if (_state.reportQueue.length === 0) return;

        // Atomically drain the queue
        var reports = _state.reportQueue.slice();
        _state.reportQueue = [];

        sendHttpRequest('POST', SDK_CONFIG.API.REPORT_BATCH,
            { reports: reports, timestamp: formatDate() },
            function () {
                sdkLog('debug', 'Report', 'Flushed ' + reports.length + ' reports');
            },
            function (err) {
                sdkLog('warn', 'Report', 'Flush failed: ' + err);
                // Re-queue with overflow protection
                for (var i = 0; i < reports.length; i++) {
                    if (_state.reportQueue.length < SDK_CONFIG.REPORT_MAX_QUEUE_SIZE) {
                        _state.reportQueue.push(reports[i]);
                    }
                }
            }
        );
    }

    /**
     * Start the periodic report flush timer.
     * Clears any existing timer first.
     */
    function startReportFlushTimer() {
        if (_state.reportFlushTimer) clearInterval(_state.reportFlushTimer);
        _state.reportFlushTimer = setInterval(flushReportQueue, SDK_CONFIG.REPORT_FLUSH_INTERVAL_MS);
    }

    /**
     * Stop the periodic report flush timer.
     * BUG FIX: This was undefined in the original sdk.js, causing logout to crash.
     */
    function stopReportFlushTimer() {
        if (_state.reportFlushTimer) {
            clearInterval(_state.reportFlushTimer);
            _state.reportFlushTimer = null;
        }
    }

    /**
     * Queue a report and immediately flush it.
     * Used for high-priority events (game_ready, player_enter_server).
     */
    function sendImmediateReport(eventType, eventData) {
        queueReport(eventType, eventData, 'immediate');
        flushReportQueue();
    }

    // ========================================================================
    // SECTION 11: CLIENT — PAYMENT
    // ========================================================================

    /**
     * Handle create payment order request from game engine.
     * Called by PPGAME.createPaymentOrder() after state update.
     *
     * Flow: Enrich data from game → call server → show confirmation UI
     */
    function handleCreatePaymentOrder(paymentData) {
        sdkLog('info', 'Payment', 'Create order', paymentData);
        if (!paymentData || !paymentData.goodsId) return;

        var orderId = 'ORD-' + generateUniqueId();

        // Enrich order data with session state
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

        // Store pending payment for reference
        _state.pendingPayments[orderId] = orderData;

        // Send to server handler, then show confirmation UI
        sendHttpRequest('POST', SDK_CONFIG.API.PAYMENT_CREATE, orderData,
            function () {
                showPaymentConfirmationUI(orderId, orderData);
            },
            function (err) {
                sdkLog('error', 'Payment', 'Create failed: ' + err);
                hidePaymentUI();
            }
        );
    }

    /**
     * Show the payment confirmation overlay UI.
     * Dark themed dialog with item details, cancel/confirm buttons.
     */
    function showPaymentConfirmationUI(orderId, orderData) {
        // Remove any existing payment overlay
        var old = document.getElementById('ppgame-payment-overlay');
        if (old) old.parentNode.removeChild(old);

        var overlay = document.createElement('div');
        overlay.id = 'ppgame-payment-overlay';
        overlay.setAttribute('style', 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center;font-family:Arial,sans-serif');

        var dialog = document.createElement('div');
        dialog.setAttribute('style', 'background:linear-gradient(135deg,#1a1a3e 0%,#0d0d2b 100%);border:2px solid #4a4a8a;border-radius:16px;padding:24px;max-width:400px;width:90%;color:#fff;box-shadow:0 10px 40px rgba(0,0,0,0.6)');

        // Title
        var title = document.createElement('div');
        title.textContent = 'Confirm Purchase';
        title.setAttribute('style', 'font-size:20px;font-weight:bold;text-align:center;margin-bottom:16px;color:#ffd700');
        dialog.appendChild(title);

        // Order details
        var details = document.createElement('div');
        details.setAttribute('style', 'background:rgba(255,255,255,0.05);border-radius:8px;padding:16px;margin-bottom:16px');
        details.innerHTML =
            '<div style="margin-bottom:8px"><span style="color:#aaa">Item:</span> <span style="color:#fff">' + (orderData.goodsName || 'Unknown') + '</span></div>' +
            '<div style="margin-bottom:8px"><span style="color:#aaa">Qty:</span> <span style="color:#fff">' + orderData.goodsNum + '</span></div>' +
            '<div style="margin-bottom:8px"><span style="color:#aaa">Price:</span> <span style="color:#7dffb3">$' + (orderData.totalPrice / 100).toFixed(2) + '</span></div>' +
            '<div><span style="color:#aaa">Order:</span> <span style="color:#888;font-size:11px">' + orderId + '</span></div>';
        dialog.appendChild(details);

        // Buttons
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

    /**
     * Confirm a payment order.
     * User clicked "Confirm Pay" → verify with server → update UI.
     */
    function confirmPayment(orderId, orderData) {
        sendHttpRequest('POST', SDK_CONFIG.API.PAYMENT_VERIFY,
            { orderId: orderId, userId: _state.userId, sessionId: _state.sessionId, confirmed: true, timestamp: formatDate() },
            function () {
                updatePaymentUIStatus('success', 'Payment successful! Items delivered shortly.');
                setTimeout(hidePaymentUI, 2000);
            },
            function (err) {
                updatePaymentUIStatus('error', 'Payment failed: ' + err);
            }
        );
    }

    /**
     * Update the payment UI with a status message (success/error).
     * Hides the action buttons and shows the status text.
     */
    function updatePaymentUIStatus(status, message) {
        var overlay = document.getElementById('ppgame-payment-overlay');
        if (!overlay) return;
        var dialog = overlay.querySelector('div > div');
        if (!dialog) return;

        var statusDiv = document.createElement('div');
        statusDiv.setAttribute('style', 'text-align:center;margin-top:12px;font-size:14px;color:' + (status === 'success' ? '#7dffb3' : '#ff6b6b'));
        statusDiv.textContent = message;

        // Hide the action buttons
        var btns = dialog.querySelector('div:last-child');
        if (btns && btns.style.display === 'flex') btns.style.display = 'none';
        dialog.appendChild(statusDiv);
    }

    /**
     * Hide and remove the payment confirmation overlay.
     */
    function hidePaymentUI() {
        var el = document.getElementById('ppgame-payment-overlay');
        if (el) el.parentNode.removeChild(el);
        _state.paymentUIVisible = false;
    }

    // ========================================================================
    // SECTION 12: CLIENT — LOGIN UI
    // ========================================================================

    /**
     * Show the full-screen login overlay.
     * Created dynamically via DOM manipulation.
     * z-index: 10000 (above game loading screen at 999).
     */
    function showLoginUI() {
        if (_state.loginUIVisible) return;
        sdkLog('info', 'LoginUI', 'Showing login UI');

        var overlay = document.createElement('div');
        overlay.id = 'ppgame-login-overlay';
        overlay.setAttribute('style', 'position:fixed;top:0;left:0;right:0;bottom:0;background:' + SDK_CONFIG.LOGIN_UI_BG_COLOR + ';z-index:10000;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Arial,Helvetica,sans-serif;overflow:hidden');

        // Background gradient layer
        var bg = document.createElement('div');
        bg.setAttribute('style', 'position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(ellipse at center,#1a1a4e 0%,#0a0a1a 70%);z-index:-1');
        overlay.appendChild(bg);

        // Decorative golden glow circle
        var deco = document.createElement('div');
        deco.setAttribute('style', 'position:absolute;top:-100px;right:-100px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(255,215,0,0.08) 0%,transparent 70%);pointer-events:none');
        overlay.appendChild(deco);

        // Title area
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

        // Form container
        var form = document.createElement('div');
        form.setAttribute('style', 'width:320px;max-width:85%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:32px 24px;backdrop-filter:blur(10px)');

        // ── Error message area ──
        var err = document.createElement('div');
        err.id = 'ppgame-login-error';
        err.setAttribute('style', 'color:#ff6b6b;font-size:13px;text-align:center;margin-bottom:24px;min-height:20px');
        form.appendChild(err);

        // ── GUEST LOGIN button (primary) ──
        var gb = document.createElement('button');
        gb.textContent = 'GUEST LOGIN';
        gb.id = 'ppgame-guest-btn';
        gb.setAttribute('style', 'width:100%;padding:16px;border:none;border-radius:12px;background:linear-gradient(135deg,#ffd700,#ff8c00);color:#000;font-size:18px;font-weight:bold;letter-spacing:3px;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s');
        gb.onmouseenter = function () { this.style.transform = 'translateY(-2px)'; this.style.boxShadow = '0 6px 24px rgba(255,215,0,0.4)'; };
        gb.onmouseleave = function () { this.style.transform = 'translateY(0)'; this.style.boxShadow = 'none'; };
        gb.onclick = function () { handleGuestLoginClick(); };
        form.appendChild(gb);
        overlay.appendChild(form);

        // ── Version footer ──
        var ver = document.createElement('div');
        ver.setAttribute('style', 'position:absolute;bottom:20px;color:#444;font-size:11px;text-align:center');
        ver.textContent = 'PPGAME SDK v4.1.0 | Channel: ' + SDK_CONFIG.CHANNEL.toUpperCase();
        overlay.appendChild(ver);

        document.body.appendChild(overlay);
        _state.loginUIVisible = true;
    }

    /**
     * Hide and remove the login overlay.
     */
    function hideLoginUI() {
        var el = document.getElementById('ppgame-login-overlay');
        if (el) el.parentNode.removeChild(el);
        _state.loginUIVisible = false;
    }

    /**
     * Display an error message in the login form.
     */
    function setLoginError(msg) {
        var el = document.getElementById('ppgame-login-error');
        if (el) el.textContent = msg || '';
    }

    /**
     * Enable or disable guest button during authentication.
     */
    function setLoginButtonsDisabled(disabled) {
        var gb = document.getElementById('ppgame-guest-btn');
        if (gb) {
            gb.disabled = disabled;
            gb.style.opacity = disabled ? '0.5' : '1';
            gb.style.pointerEvents = disabled ? 'none' : 'auto';
            gb.textContent = disabled ? 'CONNECTING...' : 'GUEST LOGIN';
        }
    }

    /**
     * Handle GUEST LOGIN button click.
     * No input validation needed — uses persistent device ID.
     */
    function handleGuestLoginClick() {
        setLoginError('');
        setLoginButtonsDisabled(true);

        sendHttpRequest('POST', SDK_CONFIG.API.AUTH_GUEST,
            { channel: SDK_CONFIG.CHANNEL, appId: SDK_CONFIG.APP_ID, deviceId: generateGuestDeviceId(), timestamp: formatDate() },
            function (response) {
                sdkLog('info', 'Auth', 'Guest OK');
                handleLoginSuccess(response);
            },
            function (error) {
                sdkLog('error', 'Auth', 'Guest failed: ' + error);
                setLoginError(error);
                setLoginButtonsDisabled(false);
            }
        );
    }

    /**
     * Generate or retrieve a persistent guest device ID.
     * Stored in localStorage under 'ppgame_guest_device_id'.
     */
    function generateGuestDeviceId() {
        var key = 'ppgame_guest_device_id';
        try {
            var s = localStorage.getItem(key);
            if (s) return s;
        } catch (e) { /* fallback */ }
        var id = 'GUEST-' + generateUniqueId() + '-' + simpleHash(navigator.userAgent + navigator.language);
        try { localStorage.setItem(key, id); } catch (e) { /* fallback */ }
        return id;
    }

    /**
     * Handle successful login/register/guest response.
     * Updates state, saves to localStorage, redirects with URL params.
     *
     * This is the shared handler for all auth success paths.
     * The redirect causes a full page reload with login params in URL,
     * which checkUrlLoginParams() will detect on the next load.
     */
    function handleLoginSuccess(response) {
        // Update all state fields with fallbacks
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

        sdkLog('info', 'Auth', 'Success', { userId: _state.userId, nick: _state.nickname });

        // Build redirect URL with login params
        var url = buildLoginUrl({
            sdk: _state.sdk,
            loginToken: _state.loginToken,
            nickname: _state.nickname,
            userId: _state.userId,
            sign: _state.sign,
            security: _state.security
        });

        // Persist session to localStorage
        try {
            localStorage.setItem('ppgame_session', JSON.stringify({
                userId: _state.userId,
                nickname: _state.nickname,
                loginToken: _state.loginToken,
                sdk: _state.sdk,
                sessionId: _state.sessionId,
                loginTime: _state.loginTime,
                sign: _state.sign,
                security: _state.security
            }));
        } catch (e) { /* fallback */ }

        // Full page redirect with params
        window.location.href = url;
    }

    /**
     * Handle logout.
     * Clears state, stops timers, flushes reports, redirects to clean URL.
     * BUG FIX: Original called undefined stopReportFlushTimer(), now fixed.
     */
    function handleLogout() {
        sdkLog('info', 'Auth', 'Logout: ' + _state.userId);

        // Send logout to server (fire-and-forget)
        if (_state.userId && _state.loginToken) {
            sendHttpRequest('POST', SDK_CONFIG.API.AUTH_LOGOUT,
                { userId: _state.userId, loginToken: _state.loginToken, timestamp: formatDate() },
                function () { sdkLog('info', 'Auth', 'Logout OK'); },
                function (e) { sdkLog('warn', 'Auth', 'Logout failed: ' + e); }
            );
        }

        // Clear all auth state
        _state.isLoggedIn = false;
        _state.userId = null;
        _state.nickname = null;
        _state.loginToken = null;
        _state.sessionId = null;
        _state.sign = null;
        _state.security = null;

        // Clear persisted session
        try { localStorage.removeItem('ppgame_session'); } catch (e) { /* fallback */ }

        // BUG FIX: stopReportFlushTimer is now properly defined
        stopReportFlushTimer();
        flushReportQueue();

        // Redirect to clean URL (no login params)
        window.location.href = window.location.origin + window.location.pathname;
    }

    // ========================================================================
    // SECTION 13: CLIENT — PPGAME OBJECT
    // ========================================================================
    // Exposed as window.PPGAME. index.html checks if(window.PPGAME) and
    // creates 7 wrapper functions (paySdk, gameReady, report2Sdk, etc.)

    var PPGAME = {
        /**
         * Create a payment order. Called by game engine via window.paySdk().
         * Updates character state, calls payment handler, queues report.
         */
        createPaymentOrder: function (data) {
            sdkLog('info', 'PPGAME', 'createPaymentOrder', data);
            // Update character state from game data
            if (data.roleId) _state.characterId = data.roleId;
            if (data.roleName) _state.characterName = data.roleName;
            if (data.roleLevel) _state.characterLevel = data.roleLevel;
            if (data.serverName) _state.serverName = data.serverName;
            // Create the order (shows confirmation UI on success)
            handleCreatePaymentOrder(data);
            // Queue payment analytics event
            queueReport('payment_add_to_cart',
                { goodsId: data.goodsId || data.goodId, goodsName: data.goodsName, price: data.price },
                'payment'
            );
        },

        /**
         * Notify SDK that the game is ready. Called by main.min.js after load.
         * Sends immediate report.
         */
        gameReady: function () {
            sdkLog('info', 'PPGAME', 'gameReady');
            sendImmediateReport('game_ready', {
                userId: _state.userId,
                sessionId: _state.sessionId,
                timestamp: formatDate()
            });
        },

        /**
         * Notify SDK that player has entered the game server.
         * Called via report2Sdk(dataType=3) from main.min.js.
         */
        playerEnterServer: function (data) {
            sdkLog('info', 'PPGAME', 'playerEnterServer', data);
            if (data.characterId) _state.characterId = data.characterId;
            if (data.characterName) _state.characterName = data.characterName;
            if (data.serverId) _state.serverId = data.serverId;
            if (data.serverName) _state.serverName = data.serverName;
            sendImmediateReport('player_enter_server', {
                userId: _state.userId,
                sessionId: _state.sessionId,
                characterId: _state.characterId,
                characterName: _state.characterName,
                serverId: _state.serverId,
                serverName: _state.serverName
            });
        },

        /**
         * Submit a generic event to the analytics queue.
         * Called for various game events (create role, login success, etc.)
         */
        submitEvent: function (eventName, data) {
            sdkLog('info', 'PPGAME', 'submitEvent: ' + eventName, data);
            if (data) {
                if (data.characterId) _state.characterId = data.characterId;
                if (data.characterName) _state.characterName = data.characterName;
                if (data.serverId) _state.serverId = data.serverId;
                if (data.serverName) _state.serverName = data.serverName;
            }
            queueReport(eventName, data, 'event');
        },

        /**
         * Report chapter/lesson completion. Called via window.gameChapterFinish().
         */
        gameChapterFinish: function (chapterId) {
            sdkLog('info', 'PPGAME', 'gameChapterFinish: ' + chapterId);
            queueReport('game_chapter_finish', { chapterId: chapterId }, 'progress');
        },

        /**
         * Report shop page opened. Called via window.openShopPage().
         */
        openShopPage: function () {
            sdkLog('info', 'PPGAME', 'openShopPage');
            queueReport('open_shop_page', {}, 'ui');
        },

        /**
         * Report player level up. Called via window.gameLevelUp().
         */
        gameLevelUp: function (level) {
            sdkLog('info', 'PPGAME', 'gameLevelUp: ' + level);
            _state.characterLevel = level;
            queueReport('game_level_up', { level: level }, 'progress');
        }
    };

    // ========================================================================
    // SECTION 14: CLIENT — WINDOW FUNCTIONS
    // ========================================================================
    // These are called by main.min.js via TSBrowser.executeFunction("name", args)
    // All are set on the window object during IIFE execution.

    // window.reload() — Reload the page
    window.reload = function () {
        window.location.reload();
    };

    // window.checkFromNative() — Must return false for web mode
    // main.min.js uses this to detect native app vs browser
    window.checkFromNative = function () {
        return false;
    };

    // window.getAppId() — Return the app ID string
    // Used by: TSUIController for subChannel in login/serverList requests
    window.getAppId = function () {
        return SDK_CONFIG.APP_ID;
    };

    // window.getLoginServer() — Return login server URL override
    // null means use default from serversetting.json
    window.getLoginServer = function () {
        return SDK_CONFIG.LOGIN_SERVER_URL;
    };

    // window.getClientServer() — Return client resource server URL
    // Empty string for private server (WeChat only feature)
    window.getClientServer = function () {
        return SDK_CONFIG.CLIENT_SERVER_URL;
    };

    // window.getSubChannel() — Return sub-channel ID
    // Used by: TSUIController in login, server list, and report requests
    window.getSubChannel = function () {
        return SDK_CONFIG.APP_ID;
    };

    // window.changeLanguage(lang) — Save language preference
    // Called by: TSUIController.saveLanguage()
    // Saves to localStorage and sends to server
    window.changeLanguage = function (lang) {
        sdkLog('info', 'SDK', 'changeLanguage: ' + lang);
        _state.currentLanguage = lang;
        try { localStorage.setItem('ppgame_language', lang); } catch (e) { /* fallback */ }
        sendHttpRequest('POST', SDK_CONFIG.API.USER_LANGUAGE,
            { userId: _state.userId, sessionId: _state.sessionId, language: lang, timestamp: formatDate() },
            function () { sdkLog('debug', 'SDK', 'Language saved: ' + lang); },
            function (e) { sdkLog('warn', 'SDK', 'Language save failed: ' + e); }
        );
    };

    // window.openURL(url) — Open URL in new tab
    // Used by: TSUIController.openUrlStr() as primary opener
    window.openURL = function (url) {
        try { window.open(url, '_blank'); } catch (e) { /* fallback */ }
    };

    // window.sendCustomEvent(name, data) — Queue a custom analytics event
    // Used by: main.min.js for createRole, levelUp, finishGuide, loginSuccess, enterHomeScreen
    window.sendCustomEvent = function (name, data) {
        sdkLog('info', 'SDK', 'sendCustomEvent: ' + name, data);
        queueReport(name, data, 'custom');
    };

    // window.accountLoginCallback(fn) — Store exit game function
    // Called by: Login.initAll() with ts.exitGame as the callback
    window.accountLoginCallback = function (exitGameFn) {
        _state.exitGameFn = exitGameFn;
    };

    // window.exitGame() — Exit the game
    // Calls the stored exitGameFn if available, otherwise triggers logout
    window.exitGame = function () {
        sdkLog('info', 'SDK', 'exitGame');
        if (typeof _state.exitGameFn === 'function') {
            _state.exitGameFn();
        } else {
            handleLogout();
        }
    };

    // ── Reporting bridge functions ──
    // These are called by TSUIController methods to queue specific reports

    // window.reportToCpapiCreaterole(data) — CP API create role report
    // Called by: TSUIController.reportToCpapiCreaterole()
    // Data: { gameId, userId, areaId, roleName, sign }
    window.reportToCpapiCreaterole = function (data) {
        sdkLog('info', 'SDK', 'reportToCpapiCreaterole', data);
        queueReport('cp_api_create_role', data, 'cp_api');
    };

    // window.fbq(action, eventName) — Facebook Pixel event
    // Called by: TSUIController.reportToEnFaceBookSdk()
    // Events: AddToCart, CompleteRegistration, CharacterCreated, GameStarted, etc.
    window.fbq = function (action, eventName) {
        sdkLog('debug', 'SDK', 'fbq: ' + action + ' / ' + eventName);
        queueReport('facebook_pixel', { action: action, eventName: eventName }, 'analytics');
    };

    // window.gtag(type, eventName, data) — Google Analytics event
    // Called by: TSUIController.reportToEnGoogleSdk()
    // Used for conversion tracking: AW-727890639/fHr2CNfov6UBEM_1itsC, etc.
    window.gtag = function (type, eventName, data) {
        sdkLog('debug', 'SDK', 'gtag: ' + type + ' / ' + eventName, data);
        queueReport('google_analytics', { type: type, eventName: eventName, data: data }, 'analytics');
    };

    // window.report2Sdk350CreateRole(json) — 350 SDK create role
    // Called by: TSUIController.reportTo350CreateRole()
    window.report2Sdk350CreateRole = function (json) {
        sdkLog('debug', 'SDK', 'report2Sdk350CreateRole', json);
        try {
            queueReport('platform_350_create_role', JSON.parse(json), 'platform_350');
        } catch (e) {
            queueReport('platform_350_create_role', { raw: json }, 'platform_350');
        }
    };

    // window.report2Sdk350LoginUser(json) — 350 SDK login user
    // Called by: TSUIController.report2Sdk350LoginUser()
    window.report2Sdk350LoginUser = function (json) {
        sdkLog('debug', 'SDK', 'report2Sdk350LoginUser', json);
        try {
            queueReport('platform_350_login_user', JSON.parse(json), 'platform_350');
        } catch (e) {
            queueReport('platform_350_login_user', { raw: json }, 'platform_350');
        }
    };

    // window.reportLogToPP(event, data) — PP Analytics lifecycle event
    // Called by: main.min.js for socket lifecycle tracking
    // Events: endLoadResource, startPlay, connectLoginSocket, disconnectLoginSocket,
    //         enterServerList, enterLoadingPage, connectGame78Socket, disconnectGame78Socket, inGame
    window.reportLogToPP = function (event, data) {
        sdkLog('debug', 'SDK', 'reportLogToPP: ' + event, data);
        queueReport('pp_lifecycle', { event: event, data: data }, 'lifecycle');
    };

    // ── SDK UI bridge functions ──

    // window.initSDKDe(key) — Initialize SDK encryption key
    // Called by: Main.startAnimation() (line 86991) with INIT_SDK_KEY
    // Stores the key and TEACipher reference for main.min.js to use
    window.initSDKDe = function (key) {
        sdkLog('info', 'SDK', 'initSDKDe: ' + (key ? key.substring(0, 8) + '...' : 'null'));
        _state.sdkDeKey = key;
        _state.teaCipher = TEACipher;
    };

    // window.contactSdk() — Open customer service contact
    // Called by: Login.contactBtnTap(), SettingMain.contactBtnTap()
    window.contactSdk = function () {
        sdkLog('info', 'SDK', 'contactSdk');
        // No-op in private server mode
    };

    // window.userCenterSdk() — Open user center
    // Called by: Login.userCenterBtnTap(), SettingMain.userCenterBtnTap()
    window.userCenterSdk = function () {
        sdkLog('info', 'SDK', 'userCenterSdk');
        // No-op in private server mode
    };

    // window.switchAccountSdk() — Switch account (with exit game)
    // Called by: SettingMain.switchAccountBtnTap() when SDK supports it
    window.switchAccountSdk = function () {
        sdkLog('info', 'SDK', 'switchAccountSdk');
        if (typeof _state.exitGameFn === 'function') {
            _state.exitGameFn();
        }
        handleLogout();
    };

    // window.switchAccount() — Switch account (TSBrowser.switchAccount)
    // Called by: TSBrowser.switchAccount() at main.min.js line 81728
    // BUG FIX: Was missing — TSBrowser calls executeFunction('switchAccount')
    window.switchAccount = function () {
        sdkLog('info', 'SDK', 'switchAccount');
        if (typeof _state.exitGameFn === 'function') {
            _state.exitGameFn();
        }
        handleLogout();
    };

    // window.switchUser() — Switch user account
    // Called by: Login.switchAccountBtnTap(), SettingMain.switchAccountBtnTap()
    window.switchUser = function () {
        sdkLog('info', 'SDK', 'switchUser');
        if (typeof _state.exitGameFn === 'function') {
            _state.exitGameFn();
        }
        handleLogout();
    };

    // window.fbGiveLiveSdk() — Facebook Live SDK integration
    // Called by: LikeReward.sureBtnTap() for certain channels
    window.fbGiveLiveSdk = function () {
        sdkLog('debug', 'SDK', 'fbGiveLiveSdk');
        // No-op in private server mode
    };

    // window.reportToBSH5Createrole(data) — BS H5 create role report
    // Called by: TSUIController.reportToBSH5Createrole()
    window.reportToBSH5Createrole = function (data) {
        sdkLog('debug', 'SDK', 'reportToBSH5Createrole', data);
        queueReport('bsh5_create_role', data, 'bsh5');
    };

    // window.reportToFbq(data) — BS H5 Facebook pixel
    // Called by: TSUIController.reportToBsH5FaceBookSdk()
    window.reportToFbq = function (data) {
        sdkLog('debug', 'SDK', 'reportToFbq', data);
        queueReport('fb_pixel_h5', data, 'analytics');
    };

    // ========================================================================
    // SECTION 15: CLIENT — WINDOW VARIABLES
    // ========================================================================
    // These are read by main.min.js via TSBrowser.getVariantValue("name")
    // Some are read directly as window.* properties.
    // NOTE: We only set these if they're not already defined by index.html.

    // debugLanguage — NOT set here. index.html sets it to "en" after sdk.js loads.
    // We intentionally leave this alone.

    // clientVer — Mirrors index.html's clientver for VersionController
    window.clientVer = (function () {
        return window.clientver || '2026-03-02143147';
    })();

    // versionConfig — WeChat version config (null for private server)
    window.versionConfig = null;

    // reportBattlleLog — Battle error report URL (undefined = disabled)
    window.reportBattlleLog = undefined;

    // clientserver / clientServer — WeChat resource server (empty for private server)
    window.clientserver = '';
    window.clientServer = '';

    // subChannel — Sub-channel ID for reporting
    window.subChannel = SDK_CONFIG.APP_ID;

    // show18Login — Show 18+ age gate on login screen
    window.show18Login = false;

    // loginpictype — Login image type (0 = default)
    window.loginpictype = 0;

    // showSixteenImg — Show 16+ age restriction image
    window.showSixteenImg = false;

    // supportLang — Supported languages for language selector
    // Read by: Login.initAll() for language button display
    window.supportLang = [
        { lang: 'en' },
        { lang: 'kr' },
        { lang: 'vi' },
        { lang: 'jr' },
        { lang: 'zh' }
    ];

    // showContact — Show contact customer service button
    window.showContact = true;

    // sdkNativeChannel — Native channel derived from URL ?sdk= param
    // Read by: Login.initAll() for button visibility, UI configuration
    // Maps: ppgame→en, kr→kr, vi→vi, jr→jr, etc. Default: 'en'
    window.sdkNativeChannel = (function () {
        var p = getUrlParams();
        var sdk = p.sdk || '';
        var map = {
            'en': 'en', 'ppgame': 'en',
            'kr': 'kr',
            'vi': 'vi',
            'jr': 'jr',
            'zh': 'zh',
            'sylz': 'en',
            'tc': 'en',
            'tanwan55en': 'tanwan55en'
        };
        return map[sdk] || 'en';
    })();

    // showCurChannel — Additional channel flag (undefined = no special handling)
    window.showCurChannel = undefined;

    // dotq — Yahoo/Taboola tracking pixel array
    // Must be a pushable array for window.dotq.push({...}) calls
    window.dotq = [];

    // battleAudio — Enable battle audio debug override
    // Read by: SoundManager at main.min.js line 97663
    // When true, battle sounds play even if user muted them
    window.battleAudio = undefined;

    // issdkVer2 — SDK version flag (false = v3 behavior)
    window.issdkVer2 = false;

    // show18Home — Show 18+ gate on home screen
    window.show18Home = false;

    // replaceServerName — Server name replacement rules
    // Format: [{from, to, name, reset}]
    window.replaceServerName = [];

    // serverList — Server whitelist/filter (null = show all servers)
    window.serverList = null;

    // privacyUrl — Privacy policy URL (empty for private server)
    window.privacyUrl = '';

    // version — Additional version info (undefined)
    window.version = undefined;

    // ========================================================================
    // SECTION 16: CLIENT — PPGAME_SDK DEBUG INTERFACE
    // ========================================================================
    // Exposed as window.PPGAME_SDK for debugging and external access.

    window.PPGAME_SDK = {
        /**
         * Get a deep clone of the current SDK state.
         * Useful for debugging session data.
         */
        getState: function () {
            return deepClone(_state);
        },

        /**
         * Get a deep clone of the SDK configuration.
         */
        getConfig: function () {
            return deepClone(SDK_CONFIG);
        },

        /**
         * Enable or disable debug logging.
         */
        setDebug: function (enabled) {
            _state.debugMode = !!enabled;
            sdkLog('info', 'Debug', 'Debug mode: ' + _state.debugMode);
        },

        /**
         * Get the TEA cipher object for testing encryption.
         */
        getTEACipher: function () {
            return TEACipher;
        },

        /**
         * Encrypt data using TEA with the default key 'verification'.
         */
        encrypt: function (data) {
            return TEACipher.encrypt(data, SDK_CONFIG.TEA_KEY);
        },

        /**
         * Decrypt TEA-encrypted hex data with the default key 'verification'.
         */
        decrypt: function (hexData) {
            return TEACipher.decrypt(hexData, SDK_CONFIG.TEA_KEY);
        },

        /**
         * Manually flush the report queue.
         */
        flushReports: function () {
            flushReportQueue();
        },

        /**
         * Trigger logout.
         */
        logout: function () {
            handleLogout();
        },

        /**
         * Get the ReportDataType enum.
         */
        getReportDataType: function () {
            return ReportDataType;
        },

        /**
         * Get the PPLogEvents enum.
         */
        getPPLogEvents: function () {
            return PPLogEvents;
        },

        /**
         * Get the MockDB instance for direct data access (debug only).
         */
        getDB: function () {
            return MockDB;
        },

        /**
         * Get the ServerHandlers map for inspection (debug only).
         */
        getHandlers: function () {
            return ServerHandlers;
        }
    };

    // ========================================================================
    // SECTION 17: CLIENT — INITIALIZATION
    // ========================================================================

    /**
     * Main SDK initialization.
     * Called at the end of IIFE execution (synchronously when sdk.js loads).
     *
     * Steps:
     * 1. Restore session from localStorage (sessionId only)
     * 2. Check URL for login params
     * 3. If params found → set state, skip login UI
     * 4. If no params → show login UI (or defer to DOMContentLoaded)
     * 5. Start report flush timer
     * 6. Register event listeners (beforeunload, visibilitychange)
     */
    function initializeSDK() {
        _state.isInitialized = true;
        sdkLog('info', 'Init', 'PPGAME SDK v4.1.0 (Standalone)');
        sdkLog('info', 'Init', 'Channel: ' + SDK_CONFIG.CHANNEL + ' | App: ' + SDK_CONFIG.APP_ID);

        // Step 1: Restore session info from localStorage
        try {
            var sess = localStorage.getItem('ppgame_session');
            if (sess) {
                var parsed = JSON.parse(sess);
                if (parsed && parsed.userId && parsed.loginToken) {
                    _state.sessionId = parsed.sessionId || generateUniqueId();
                    sdkLog('debug', 'Init', 'Session restored for user: ' + parsed.userId);
                }
            }
        } catch (e) {
            sdkLog('warn', 'Init', 'Session restore failed: ' + e.message);
        }

        // Step 2: Check URL login params
        var loginParams = checkUrlLoginParams();
        if (loginParams) {
            // URL has login params — user already authenticated
            _state.isLoggedIn = true;
            _state.userId = loginParams.userid;
            _state.nickname = loginParams.nickname;
            _state.loginToken = loginParams.logintoken;
            _state.sdk = loginParams.sdk;
            _state.sign = loginParams.sign || null;
            _state.security = loginParams.security || null;
            _state.loginTime = Date.now();
            _state.lastActivityTime = Date.now();
            // BUG FIX: Ensure sessionId always has a value after redirect
            // If Step 1 failed to restore from localStorage, generate new one
            _state.sessionId = _state.sessionId || generateUniqueId();

            sdkLog('info', 'Init', 'Login from URL params', { userId: _state.userId, nick: _state.nickname });

            // Save/restore session
            try {
                localStorage.setItem('ppgame_session', JSON.stringify({
                    userId: _state.userId,
                    nickname: _state.nickname,
                    loginToken: _state.loginToken,
                    sdk: _state.sdk,
                    sessionId: _state.sessionId,
                    loginTime: _state.loginTime,
                    sign: _state.sign,
                    security: _state.security
                }));
            } catch (e) { /* fallback */ }

            // NO login UI — game proceeds to load normally
        } else {
            // No URL params — show login UI
            if (document.readyState === 'loading' || !document.body) {
                // DOM not ready yet — defer to DOMContentLoaded
                document.addEventListener('DOMContentLoaded', function () {
                    showLoginUI();
                });
            } else {
                // DOM is ready — show immediately
                showLoginUI();
            }
        }

        // Step 3: Restore language preference
        try {
            var lang = localStorage.getItem('ppgame_language');
            if (lang) {
                _state.currentLanguage = lang;
                sdkLog('debug', 'Init', 'Language restored: ' + lang);
            }
        } catch (e) { /* fallback */ }

        // Step 4: Start periodic report flush timer
        startReportFlushTimer();

        // Step 5: Register beforeunload handler
        // Sends a synchronous session_end report before page closes
        window.addEventListener('beforeunload', function () {
            if (_state.isLoggedIn) {
                var duration = Date.now() - (_state.loginTime || Date.now());
                sendHttpRequestSync('POST', SDK_CONFIG.API.REPORT_EVENT, {
                    eventType: 'session_end',
                    eventData: {
                        userId: _state.userId,
                        sessionId: _state.sessionId,
                        duration: duration
                    }
                });
            }
        });

        // Step 6: Register visibility change handler
        // Updates last activity time when tab becomes visible
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) {
                _state.lastActivityTime = Date.now();
            }
        });

        // Provide fallback for getQueryStringByName if not defined by index.html
        if (typeof window.getQueryStringByName !== 'function') {
            window.getQueryStringByName = function (name) {
                var params = getUrlParams();
                return params[name] || '';
            };
        }

        sdkLog('info', 'Init', 'SDK initialization complete');
    }

    // ========================================================================
    // SECTION 18: EXPOSE PPGAME & INITIALIZE
    // ========================================================================

    // Expose PPGAME object — index.html's if(window.PPGAME) gate depends on this
    window.PPGAME = PPGAME;

    // Run initialization
    initializeSDK();

    sdkLog('info', 'SDK', 'PPGAME SDK v4.1.0 loaded successfully');

})();
