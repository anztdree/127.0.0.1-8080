/**
 * db.js — Pure LocalStorage API for Main-Server
 * Referensi: game.md §11
 *
 * Database dimulai KOSONG — terisi natural melalui server logic.
 * Pattern: setItem/getItem/removeItem via JSON.stringify/parse auto.
 * Storage key pattern: ms_user_{userId} → Full user data (all 99 keys)
 */

const fs = require('fs');
const path = require('path');

class DB {
    constructor(prefix = 'ms_') {
        this.prefix = prefix;
        this.dataDir = path.join(__dirname, 'data');
        this._cache = new Map(); // In-memory cache

        // Ensure data directory exists
        if (!fs.existsSync(this.dataDir)) {
            fs.mkdirSync(this.dataDir, { recursive: true });
        }

        // Load existing data from disk into cache
        this._loadFromDisk();
    }

    // ─── Disk persistence ───

    _getFilePath() {
        return path.join(this.dataDir, 'main_server.json');
    }

    _loadFromDisk() {
        const filePath = this._getFilePath();
        if (fs.existsSync(filePath)) {
            try {
                const raw = fs.readFileSync(filePath, 'utf-8');
                const data = JSON.parse(raw);
                for (const [key, value] of Object.entries(data)) {
                    this._cache.set(key, value);
                }
            } catch (err) {
                // Corrupted file — start fresh
                console.error('[DB] Failed to load data, starting fresh:', err.message);
            }
        }
    }

    _saveToDisk() {
        const filePath = this._getFilePath();
        const data = {};
        for (const [key, value] of this._cache.entries()) {
            data[key] = value;
        }
        fs.writeFileSync(filePath, JSON.stringify(data), 'utf-8');
    }

    // ─── Core LocalStorage API ───

    setItem(key, value) {
        this._cache.set(key, value);
        this._saveToDisk();
    }

    getItem(key) {
        return this._cache.has(key) ? this._cache.get(key) : null;
    }

    removeItem(key) {
        this._cache.delete(key);
        this._saveToDisk();
    }

    // ─── User-specific helpers ───

    getUser(userId) {
        return this.getItem('user_' + userId);
    }

    saveUser(userId, data) {
        this.setItem('user_' + userId, data);
    }

    userExists(userId) {
        return this.getItem('user_' + userId) !== null;
    }

    createUser(userId, data) {
        if (this.userExists(userId)) return false;
        this.saveUser(userId, data);
        return true;
    }

    // ─── Global server state ───

    getGlobal(key) {
        return this.getItem('global_' + key);
    }

    setGlobal(key, value) {
        this.setItem('global_' + key, value);
    }
}

module.exports = new DB();
