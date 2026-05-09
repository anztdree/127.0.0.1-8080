/**
 * db.js — Pure LocalStorage API for Main-Server
 * Referensi: game.md §11
 *
 * Database dimulai KOSONG — terisi natural melalui server logic.
 * Pattern: setItem/getItem/removeItem via JSON.stringify/parse auto.
 * Storage key pattern: ms_user_{userId} → Full user data (all 99 keys)
 *
 * ═══════════════════════════════════════════════════════════════
 * BUG FIX LOG
 * ═══════════════════════════════════════════════════════════════
 *
 * [FIX-003] Circular reference safety in _saveToDisk
 *   Added try-catch around JSON.stringify with field-level error detection
 *   If circular found, identifies exact field and logs detailed error
 *   Prevents entire server crash from one corrupted user record
 *
 * [FIX-006] Deep clone on getItem to prevent cache mutation
 *   Returns JSON.parse(JSON.stringify(value)) so caller cannot
 *   accidentally mutate the cache
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
                let count = 0;
                for (const [key, value] of Object.entries(data)) {
                    this._cache.set(key, value);
                    count++;
                }
                console.log(`[DB] Loaded ${count} records from ${filePath} (${raw.length} bytes)`);
            } catch (err) {
                console.error(`[DB] Failed to load data from ${filePath}: ${err.message}`);
                console.error('[DB] Starting with empty database');
            }
        } else {
            console.log(`[DB] No existing database file found — starting fresh`);
        }
    }

    /**
     * Save entire cache to disk.
     * [FIX-003] Added circular reference safety — catches JSON.stringify errors
     * and identifies which key causes the problem.
     */
    _saveToDisk() {
        const filePath = this._getFilePath();
        const data = {};
        for (const [key, value] of this._cache.entries()) {
            data[key] = value;
        }

        try {
            const jsonStr = JSON.stringify(data);
            fs.writeFileSync(filePath, jsonStr, 'utf-8');
        } catch (err) {
            console.error(`[DB] _saveToDisk FAILED: ${err.message}`);

            // Identify which key causes the circular reference
            for (const [key, value] of this._cache.entries()) {
                try {
                    JSON.stringify(value);
                } catch (innerErr) {
                    console.error(`[DB] Circular ref in key: "${key}" → ${innerErr.message}`);

                    // Try to identify sub-field
                    if (value && typeof value === 'object') {
                        for (const [subKey, subVal] of Object.entries(value)) {
                            try {
                                JSON.stringify(subVal);
                            } catch (deepErr) {
                                console.error(`[DB]   └─ Circular in "${key}.${subKey}" → ${deepErr.message}`);
                            }
                        }
                    }
                }
            }

            // Don't crash — just skip this save and log
            console.error('[DB] Skipping save to prevent server crash — data may be lost!');
        }
    }

    // ─── Core LocalStorage API ───

    setItem(key, value) {
        this._cache.set(key, value);
        this._saveToDisk();
    }

    /**
     * Get item from cache.
     * [FIX-006] Returns deep clone to prevent accidental cache mutation.
     * If caller needs the original reference (for performance), use getItemDirect().
     */
    getItem(key) {
        if (!this._cache.has(key)) return null;
        try {
            // Deep clone to prevent mutation of cache
            return JSON.parse(JSON.stringify(this._cache.get(key)));
        } catch (err) {
            // If clone fails (circular), return the original reference
            // but log a warning
            console.warn(`[DB] getItem("${key}"): deep clone failed (${err.message}) — returning original reference`);
            return this._cache.get(key);
        }
    }

    /**
     * Get item directly from cache without deep clone.
     * USE WITH CAUTION — mutations will affect the cache!
     * Only use when you need maximum performance and won't modify the result.
     */
    getItemDirect(key) {
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
        const key = 'user_' + userId;
        const dataKeys = data ? Object.keys(data).length : 0;

        // Pre-save validation: ensure data can be stringified
        try {
            const jsonStr = JSON.stringify(data);
            console.log(`[DB] saveUser("${userId.substring(0, 12)}..."): ${dataKeys} keys, ${jsonStr.length} bytes`);
        } catch (err) {
            console.error(`[DB] saveUser("${userId}"): DATA CANNOT BE STRINGIFIED — ${err.message}`);

            // Identify problematic field
            if (data && typeof data === 'object') {
                for (const [key, val] of Object.entries(data)) {
                    try {
                        JSON.stringify(val);
                    } catch (innerErr) {
                        console.error(`[DB]   └─ Circular in field "${key}" → ${innerErr.message}`);
                    }
                }
            }

            // Don't save corrupted data
            console.error(`[DB] ABORTING save for userId="${userId}" — data would corrupt database`);
            return;
        }

        this.setItem(key, data);
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
