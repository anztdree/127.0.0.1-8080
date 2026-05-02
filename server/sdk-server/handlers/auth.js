/**
 * handlers/auth.js — Authentication Endpoints
 *
 * POST /api/auth/login     — Login with userId (create if not exists)
 * POST /api/auth/guest     — Guest login (auto-generate userId)
 * POST /api/auth/validate  — Validate loginToken
 *
 * Token generation:
 *   loginToken:   base64(userId + ":" + timestamp + ":" + randomHex16)
 *   sign:         HMAC-SHA256(userId + ":" + timestamp, SECRET_KEY) → hex
 *   securityCode: SHA256(userId + ":" + loginToken + ":" + timestamp + ":" + SECRET_KEY) → hex
 */

var crypto = require('crypto');

/**
 * Generate tokens for a user.
 * @param {string} userId
 * @param {string} secretKey
 * @returns {{ loginToken: string, sign: string, securityCode: string, timestamp: number }}
 */
function generateTokens(userId, secretKey) {
    var timestamp = Date.now();
    var randomHex = crypto.randomBytes(16).toString('hex');

    // loginToken: base64(userId:timestamp:randomHex16)
    var rawToken = userId + ':' + timestamp + ':' + randomHex;
    var loginToken = Buffer.from(rawToken, 'utf8').toString('base64');

    // sign: HMAC-SHA256(userId:timestamp, SECRET_KEY) → hex
    var signPayload = userId + ':' + timestamp;
    var sign = crypto.createHmac('sha256', secretKey)
        .update(signPayload)
        .digest('hex');

    // securityCode: SHA256(userId:loginToken:timestamp:SECRET_KEY) → hex
    var securityPayload = userId + ':' + loginToken + ':' + timestamp + ':' + secretKey;
    var securityCode = crypto.createHash('sha256')
        .update(securityPayload)
        .digest('hex');

    return {
        loginToken: loginToken,
        sign: sign,
        securityCode: securityCode,
        timestamp: timestamp
    };
}

/**
 * Register auth routes on the Express app.
 * @param {object} app       Express app
 * @param {object} db        Database module
 * @param {object} config    Config module
 * @param {object} helpers   Helper functions (tNow, fmtDur, trunc, etc.)
 */
function register(app, db, config, helpers) {

    // ============================================================
    // POST /api/auth/login
    // ============================================================

    app.post('/api/auth/login', function (req, res) {
        var body = req.body || {};
        var userId = (body.userId || '').trim();

        if (!userId) {
            return res.json({ success: false, error: 'userId_required' });
        }

        var tokens = generateTokens(userId, config.secretKey);
        var user = db.getUserById(userId);

        if (user) {
            // Existing user — update tokens and lastLoginAt
            var nickName = user.nickName || userId;
            db.updateUserToken(tokens.loginToken, tokens.sign, tokens.securityCode, tokens.timestamp, userId);

            return res.json({
                success: true,
                loginToken: tokens.loginToken,
                nickname: nickName,
                userId: userId,
                sign: tokens.sign,
                security: tokens.securityCode
            });
        } else {
            // New user — create with nickName = userId
            db.createUser(userId, userId, 'ppgame', tokens.loginToken, tokens.sign, tokens.securityCode, false);

            return res.json({
                success: true,
                loginToken: tokens.loginToken,
                nickname: userId,
                userId: userId,
                sign: tokens.sign,
                security: tokens.securityCode
            });
        }
    });

    // ============================================================
    // POST /api/auth/guest
    // ============================================================

    app.post('/api/auth/guest', function (req, res) {
        // Generate guest userId: "guest_" + 8 hex chars
        var guestId = config.guestPrefix + crypto.randomBytes(4).toString('hex');
        // Generate guest nickName: "Guest_" + 4 hex chars
        var guestNick = 'Guest_' + crypto.randomBytes(2).toString('hex');

        var tokens = generateTokens(guestId, config.secretKey);

        db.createUser(guestId, guestNick, 'ppgame', tokens.loginToken, tokens.sign, tokens.securityCode, true);

        return res.json({
            success: true,
            loginToken: tokens.loginToken,
            nickname: guestNick,
            userId: guestId,
            sign: tokens.sign,
            security: tokens.securityCode
        });
    });

    // ============================================================
    // POST /api/auth/validate
    // ============================================================

    app.post('/api/auth/validate', function (req, res) {
        var body = req.body || {};
        var loginToken = body.loginToken || '';
        var userId = body.userId || '';
        var sdk = body.sdk || '';

        var user = db.getUserById(userId);

        if (!user) {
            return res.json({ valid: false, error: 'user_not_found' });
        }

        if (user.loginToken !== loginToken) {
            return res.json({ valid: false, error: 'token_mismatch' });
        }

        return res.json({
            valid: true,
            userId: user.userId,
            nickName: user.nickName,
            sign: user.sign,
            securityCode: user.securityCode
        });
    });
}

module.exports = { register: register };
