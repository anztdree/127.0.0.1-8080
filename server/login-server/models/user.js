/**
 * User Model - Database queries for users table
 * 
 * 100% derived from client code analysis.
 * 
 * users table schema based on:
 * - UserDataParser.saveUserData() e.user fields (line 77670-77673)
 * - loginGame request fields (line 77300-77315)
 */

const { query } = require('../../database/connection');

const UserModel = {
    /**
     * Find user by userId
     */
    async findByUserId(userId) {
        const rows = await query('SELECT * FROM users WHERE user_id = ?', [userId]);
        return rows.length > 0 ? rows[0] : null;
    },

    /**
     * Create new user (auto-register on loginGame)
     */
    async create(userData) {
        const now = Date.now();
        const result = await query(
            `INSERT INTO users (user_id, password, nick_name, head_image, from_channel, channel_name, sub_channel, last_login_time, create_time, is_new)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
            [
                userData.userId,
                userData.password || 'game_origin',
                userData.nickName || '',
                userData.headImage || '',
                userData.fromChannel || '',
                userData.channelName || '',
                userData.subChannel || '',
                now,
                now,
            ]
        );
        return result;
    },

    /**
     * Update last login time
     */
    async updateLoginTime(userId) {
        const now = Date.now();
        await query('UPDATE users SET last_login_time = ? WHERE user_id = ?', [now, userId]);
    },

    /**
     * Mark user as no longer new (after first login success)
     */
    async markNotNew(userId) {
        await query('UPDATE users SET is_new = 0 WHERE user_id = ?', [userId]);
    },
};

module.exports = UserModel;
