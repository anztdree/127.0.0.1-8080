/**
 * config.js — Environment Configuration
 *
 * Membaca .env file dan menyediakan config object.
 */

require('dotenv').config();

var config = {
    port: parseInt(process.env.PORT) || 8000,

    db: {
        path: process.env.DB_FILE || './data/super_warrior_z.db'
    }
};

module.exports = config;
