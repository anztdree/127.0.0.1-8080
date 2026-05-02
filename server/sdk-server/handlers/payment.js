/**
 * handlers/payment.js — Payment Endpoints
 *
 * POST /api/payment/create    — Create a payment order
 * POST /api/payment/callback  — Payment callback (update order status)
 */

/**
 * Register payment routes on the Express app.
 * @param {object} app       Express app
 * @param {object} db        Database module
 * @param {object} config    Config module
 * @param {object} helpers   Helper functions
 */
function register(app, db, config, helpers) {

    // ============================================================
    // POST /api/payment/create
    // ============================================================

    app.post('/api/payment/create', function (req, res) {
        var body = req.body || {};
        var orderId = body.orderId || '';
        var userId = body.userId || '';
        var productId = body.productId || null;
        var productName = body.productName || null;
        var price = body.price || 0;
        var currency = body.currency || 'USD';
        var roleId = body.roleId || null;
        var roleName = body.roleName || null;
        var roleLevel = body.roleLevel || null;
        var roleVip = body.roleVip || null;
        var serverName = body.serverName || null;

        if (!orderId) {
            return res.json({ success: false, error: 'orderId_required' });
        }

        if (!userId) {
            return res.json({ success: false, error: 'userId_required' });
        }

        try {
            db.createPayment(orderId, userId, productId, productName, price, currency, roleId, roleName, roleLevel, roleVip, serverName);

            return res.json({
                success: true,
                paymentUrl: 'http://127.0.0.1:' + config.port + '/payment/' + orderId,
                orderId: orderId
            });
        } catch (err) {
            return res.json({ success: false, error: err.message });
        }
    });

    // ============================================================
    // POST /api/payment/callback
    // ============================================================

    app.post('/api/payment/callback', function (req, res) {
        var body = req.body || {};
        var orderId = body.orderId || '';
        var status = body.status || 'completed';
        var transactionId = body.transactionId || '';

        if (!orderId) {
            return res.json({ received: false, error: 'orderId_required' });
        }

        try {
            var now = Date.now();
            db.updatePaymentStatus(status, now, orderId);

            return res.json({ received: true });
        } catch (err) {
            return res.json({ received: false, error: err.message });
        }
    });
}

module.exports = { register: register };
