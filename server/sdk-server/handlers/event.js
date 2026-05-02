/**
 * handlers/event.js — Event Logging Endpoints
 *
 * POST /api/event/enter-server    — Player enters a game server
 * POST /api/event/submit          — Submit custom event
 * POST /api/event/chapter-finish  — Player finishes a chapter
 * POST /api/event/level-up        — Player levels up
 * POST /api/event/game-ready      — Game client is ready
 * POST /api/event/lifecycle       — Lifecycle event (stage-based)
 */

/**
 * Register event routes on the Express app.
 * @param {object} app       Express app
 * @param {object} db        Database module
 * @param {object} config    Config module
 * @param {object} helpers   Helper functions
 */
function register(app, db, config, helpers) {

    // ============================================================
    // POST /api/event/enter-server
    // ============================================================

    app.post('/api/event/enter-server', function (req, res) {
        var body = req.body || {};
        var userId = body.userId || '';
        var characterName = body.characterName || '';
        var characterId = body.characterId || '';
        var serverId = body.serverId || 0;
        var serverName = body.serverName || '';

        if (!userId) {
            return res.json({ success: false, error: 'userId_required' });
        }

        try {
            var eventData = {
                characterName: characterName,
                characterId: characterId,
                serverName: serverName
            };

            db.insertEvent(userId, 'enter_server', 'enter_server', eventData, serverId);

            return res.json({ success: true });
        } catch (err) {
            return res.json({ success: false, error: err.message });
        }
    });

    // ============================================================
    // POST /api/event/submit
    // ============================================================

    app.post('/api/event/submit', function (req, res) {
        var body = req.body || {};
        var userId = body.userId || '';
        var eventName = body.eventName || '';
        var data = body.data || null;

        if (!userId) {
            return res.json({ success: false, error: 'userId_required' });
        }

        try {
            db.insertEvent(userId, 'submit', eventName, data, 0);

            return res.json({ success: true });
        } catch (err) {
            return res.json({ success: false, error: err.message });
        }
    });

    // ============================================================
    // POST /api/event/chapter-finish
    // ============================================================

    app.post('/api/event/chapter-finish', function (req, res) {
        var body = req.body || {};
        var userId = body.userId || '';
        var chapterId = body.chapterId || '';

        if (!userId) {
            return res.json({ success: false, error: 'userId_required' });
        }

        try {
            var eventData = {
                chapterId: chapterId
            };

            db.insertEvent(userId, 'chapter_finish', 'chapter_finish', eventData, 0);

            return res.json({ success: true });
        } catch (err) {
            return res.json({ success: false, error: err.message });
        }
    });

    // ============================================================
    // POST /api/event/level-up
    // ============================================================

    app.post('/api/event/level-up', function (req, res) {
        var body = req.body || {};
        var userId = body.userId || '';
        var level = body.level || 0;

        if (!userId) {
            return res.json({ success: false, error: 'userId_required' });
        }

        try {
            var eventData = {
                level: level
            };

            db.insertEvent(userId, 'level_up', 'level_up', eventData, 0);

            return res.json({ success: true });
        } catch (err) {
            return res.json({ success: false, error: err.message });
        }
    });

    // ============================================================
    // POST /api/event/game-ready
    // ============================================================

    app.post('/api/event/game-ready', function (req, res) {
        var body = req.body || {};
        var userId = body.userId || '';

        if (!userId) {
            return res.json({ success: false, error: 'userId_required' });
        }

        try {
            db.insertEvent(userId, 'game_ready', 'game_ready', null, 0);

            return res.json({ success: true });
        } catch (err) {
            return res.json({ success: false, error: err.message });
        }
    });

    // ============================================================
    // POST /api/event/lifecycle
    // ============================================================

    app.post('/api/event/lifecycle', function (req, res) {
        var body = req.body || {};
        var userId = body.userId || '';
        var stageName = body.stageName || '';
        var data = body.data || null;

        if (!userId) {
            return res.json({ success: false, error: 'userId_required' });
        }

        try {
            db.insertEvent(userId, 'lifecycle', stageName, data, 0);

            return res.json({ success: true });
        } catch (err) {
            return res.json({ success: false, error: err.message });
        }
    });
}

module.exports = { register: register };
