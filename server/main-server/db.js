/**
 * db.js — Handler-Driven Smart Database
 *
 * KONSEP: Handler = Source of Truth
 *   - Setiap handler file mendefinisikan `schema` (table + field)
 *   - db.js SCAN semua handlers → MERGE schema → AUTO CREATE TABLE → AUTO CRUD
 *   - Handler baru cukup tulis schema di file-nya, TIDAK perlu edit db.js
 *   - Field baru otomatis di-ALTER TABLE saat server restart
 *
 * NAMING: Ikuti main.min.js persis
 *   - e.heros → table `heros`
 *   - e.user → table `user`
 *   - hero._displayId → column `_displayId`
 *   - Semua underscore prefix dijaga (_nickName, _level, dll.)
 *
 * META KEYS di schema:
 *   _foreignKey: 'col REFERENCES other(col)' — foreign key constraint
 *   _indexes: ['idx_name ON(col)']           — index definitions
 *   _unique: 'col1, col2'                    — unique constraint
 */

const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const logger = require('./logger');

const DB_DIR = path.join(__dirname, 'data');
const DB_PATH = path.join(__dirname, 'data', 'main_server.db');

if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

// ╔══════════════════════════════════════════════════════════════╗
// ║  STEP 1: SCAN SEMUA HANDLER → KUMPULKAN SCHEMA             ║
// ╚══════════════════════════════════════════════════════════════╝

const META_KEYS = new Set(['_foreignKey', '_indexes', '_unique']);

function collectSchemasFromHandlers() {
    const handlersDir = path.join(__dirname, 'handlers');
    const merged = {};  // tableName → { fieldName → definition }

    if (!fs.existsSync(handlersDir)) {
        logger.log('WARNING', 'DB', 'No handlers directory found');
        return merged;
    }

    function scanDir(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                scanDir(fullPath);
            } else if (entry.name.endsWith('.js')) {
                try {
                    // Clear cache to get fresh schema
                    delete require.cache[require.resolve(fullPath)];
                    const handler = require(fullPath);
                    if (handler.schema) {
                        for (const [table, fields] of Object.entries(handler.schema)) {
                            if (!merged[table]) merged[table] = {};
                            // Merge fields — handler baru bisa tambah field baru ke table yang sama
                            Object.assign(merged[table], fields);
                        }
                    }
                } catch (e) {
                    // Handler mungkin butuh dependency yang belum ready saat scan
                    // Skip silently — akan di-scan ulang kalau perlu
                }
            }
        }
    }

    scanDir(handlersDir);
    return merged;
}

const mergedSchema = collectSchemasFromHandlers();

// ╔══════════════════════════════════════════════════════════════╗
// ║  STEP 2: AUTO-GENERATE TABLES DARI MERGED SCHEMA           ║
// ╚══════════════════════════════════════════════════════════════╝

const tableNames = [];

for (const [tableName, fields] of Object.entries(mergedSchema)) {
    const columns = [];
    const indexes = [];

    for (const [key, def] of Object.entries(fields)) {
        if (META_KEYS.has(key)) {
            // Meta directives — handle below
            continue;
        }
        columns.push(`${key} ${def}`);
    }

    // Foreign keys
    if (fields._foreignKey) {
        const fk = fields._foreignKey;
        columns.push(`FOREIGN KEY(${fk.split(' ')[0]}) REFERENCES ${fk.split('REFERENCES ')[1]}`);
    }

    // Unique constraint
    if (fields._unique) {
        columns.push(`UNIQUE(${fields._unique})`);
    }

    // Create table
    const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns.join(', ')})`;
    try {
        db.exec(sql);
        tableNames.push(tableName);
    } catch (e) {
        logger.log('ERROR', 'DB', `CREATE TABLE ${tableName} failed: ${e.message}`);
    }

    // Create indexes — auto-prepend table name if missing
    if (fields._indexes && Array.isArray(fields._indexes)) {
        for (const idx of fields._indexes) {
            try {
                // Format: "idx_name ON(col)" → "idx_name ON tableName(col)"
                const fullIdx = idx.includes(` ON ${tableName}(`) ? idx : idx.replace(' ON(', ` ON ${tableName}(`);
                db.exec(`CREATE INDEX IF NOT EXISTS ${fullIdx}`);
                indexes.push(fullIdx);
            } catch (e) {
                logger.log('WARNING', 'DB', `Index ${idx} failed: ${e.message}`);
            }
        }
    }

    // ALTER TABLE: Tambah kolom baru kalau handler baru menambah field
    try {
        const existingCols = db.pragma(`table_info(${tableName})`).map(c => c.name);
        for (const [key, def] of Object.entries(fields)) {
            if (META_KEYS.has(key)) continue;
            if (!existingCols.includes(key)) {
                try {
                    db.exec(`ALTER TABLE ${tableName} ADD COLUMN ${key} ${def}`);
                    logger.log('INFO', 'DB', `➕ ALTER ${tableName} ADD ${key} ${def}`);
                } catch (alterErr) {
                    // Column might already exist from concurrent ALTER
                }
            }
        }
    } catch (e) {
        // table_info might fail if table just created
    }
}

logger.log('INFO', 'DB', `Database initialized`);
logger.details('DB',
    ['tables', `${tableNames.length} auto-generated`],
    ['names', tableNames.join(', ') || '(none yet)'],
    ['mode', 'WAL'],
    ['path', DB_PATH]
);

// ╔══════════════════════════════════════════════════════════════╗
// ║  STEP 3: AUTO-GENERATE CRUD API PER TABLE                  ║
// ╚══════════════════════════════════════════════════════════════╝

function createTableAPI(tableName) {
    let columns;
    try {
        columns = db.pragma(`table_info(${tableName})`);
    } catch (e) {
        return null;
    }

    const pkCol = columns.find(c => c.pk > 0);
    const pkName = pkCol ? pkCol.name : null;
    const colNames = columns.map(c => c.name);
    const hasUserId = colNames.includes('_userId');

    // Prepared statements
    const getStmt = pkName
        ? db.prepare(`SELECT * FROM ${tableName} WHERE ${pkName} = ?`)
        : null;

    const getByUserStmt = hasUserId
        ? db.prepare(`SELECT * FROM ${tableName} WHERE _userId = ?`)
        : null;

    const getAllStmt = db.prepare(`SELECT * FROM ${tableName}`);

    const countStmt = db.prepare(`SELECT COUNT(*) as c FROM ${tableName}`);

    const deleteStmt = pkName
        ? db.prepare(`DELETE FROM ${tableName} WHERE ${pkName} = ?`)
        : null;

    return {
        /**
         * Get row by primary key
         * @param {*} pkValue
         * @returns {object|null}
         */
        get: pkName
            ? function(pkValue) { return getStmt.get(pkValue); }
            : null,

        /**
         * Get all rows for a userId
         * @param {string} userId
         * @returns {array}
         */
        getByUser: hasUserId
            ? function(userId) { return getByUserStmt.all(userId); }
            : null,

        /**
         * Get all rows
         * @returns {array}
         */
        getAll: function() { return getAllStmt.all(); },

        /**
         * Count rows
         * @returns {number}
         */
        count: function() { return countStmt.get().c; },

        /**
         * Create a new row
         * @param {object} data - Column values { _nickName: 'test', _level: 1, ... }
         * @returns {object} Statement result
         */
        create: function(data) {
            const keys = Object.keys(data);
            const vals = keys.map(k => data[k]);
            const placeholders = keys.map(() => '?').join(', ');
            const sql = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders})`;
            return db.prepare(sql).run(...vals);
        },

        /**
         * Create multiple rows in a transaction
         * @param {array} dataArray - Array of data objects
         * @returns {array} Array of statement results
         */
        createBatch: function(dataArray) {
            if (!dataArray.length) return [];
            const keys = Object.keys(dataArray[0]);
            const placeholders = keys.map(() => '?').join(', ');
            const sql = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders})`;
            const stmt = db.prepare(sql);
            const results = [];
            const tx = db.transaction(() => {
                for (const data of dataArray) {
                    results.push(stmt.run(...keys.map(k => data[k])));
                }
            });
            tx();
            return results;
        },

        /**
         * Update row by primary key
         * @param {*} pkValue - Primary key value
         * @param {object} data - Columns to update { _level: 5, _gold: 1000 }
         * @returns {object} Statement result
         */
        update: pkName
            ? function(pkValue, data) {
                const keys = Object.keys(data);
                const sets = keys.map(k => `${k} = ?`).join(', ');
                const sql = `UPDATE ${tableName} SET ${sets} WHERE ${pkName} = ?`;
                return db.prepare(sql).run(...keys.map(k => data[k]), pkValue);
            }
            : null,

        /**
         * Delete row by primary key
         * @param {*} pkValue
         * @returns {object} Statement result
         */
        delete: pkName
            ? function(pkValue) { return deleteStmt.run(pkValue); }
            : null,

        /**
         * Raw database access for custom queries
         */
        raw: db
    };
}

// Build API for all tables
const api = {};
for (const tableName of tableNames) {
    api[tableName] = createTableAPI(tableName);
}

// ╔══════════════════════════════════════════════════════════════╗
// ║  STEP 4: CUSTOM FUNCTIONS (untuk query non-generik)        ║
// ╚══════════════════════════════════════════════════════════════╝

// ─── totalProps (items) helpers ───
if (api.totalProps) {
    /**
     * Add item (increment num). Jika belum ada, insert baru.
     * ON CONFLICT untuk UPSERT.
     */
    api.totalProps.addItem = function(userId, itemId, num, displayId) {
        displayId = displayId || 0;
        return db.prepare(
            `INSERT INTO totalProps (_userId, _itemId, _num, _displayId) VALUES (?, ?, ?, ?)
             ON CONFLICT(_userId, _itemId, _displayId) DO UPDATE SET _num = _num + ?`
        ).run(userId, itemId, num, displayId, num);
    };

    /**
     * Get item by itemId (bukan PK, tapi itemId + userId)
     */
    api.totalProps.getByItemId = function(userId, itemId) {
        return db.prepare('SELECT * FROM totalProps WHERE _userId = ? AND _itemId = ?').get(userId, itemId);
    };

    /**
     * Build _items dict format untuk enterGame response
     * Output: { "0": { _id: 104, _num: 1 }, "1": { _id: 103, _num: 0 }, ... }
     */
    api.totalProps.buildItemsDict = function(userId) {
        const items = api.totalProps.getByUser(userId);
        const result = {};
        items.forEach((item, index) => {
            result[String(index)] = { _id: item._itemId, _num: item._num };
        });
        return result;
    };
}

// ─── user helpers ───
if (api.user) {
    /**
     * Increment currency field (diamond += amount, bukan SET)
     */
    api.user.addCurrency = function(userId, field, amount) {
        db.prepare(`UPDATE user SET ${field} = ${field} + ? WHERE _id = ?`).run(amount, userId);
    };

    /**
     * Update last login time
     */
    api.user.updateLogin = function(userId) {
        db.prepare('UPDATE user SET _lastLoginTime = ? WHERE _id = ?').run(Date.now(), userId);
    };
}

// ─── heros helpers ───
if (api.heros) {
    /**
     * Get hero by displayId + userId
     */
    api.heros.getByDisplayId = function(userId, displayId) {
        return db.prepare('SELECT * FROM heros WHERE _userId = ? AND _displayId = ?').get(userId, displayId);
    };
}

// ╔══════════════════════════════════════════════════════════════╗
// ║  STEP 5: RESCAN (opsional — kalau ada handler baru)         ║
// ╚══════════════════════════════════════════════════════════════╝

/**
 * Rescan handlers dan update tables + API
 * Berguna kalau handler ditambah tanpa restart server
 */
function rescan() {
    const newSchema = collectSchemasFromHandlers();
    let newTables = 0;
    let newColumns = 0;

    for (const [tableName, fields] of Object.entries(newSchema)) {
        // New table?
        if (!api[tableName]) {
            const columns = [];
            for (const [key, def] of Object.entries(fields)) {
                if (META_KEYS.has(key)) continue;
                columns.push(`${key} ${def}`);
            }
            if (fields._foreignKey) {
                columns.push(`FOREIGN KEY(${fields._foreignKey.split(' ')[0]}) REFERENCES ${fields._foreignKey.split('REFERENCES ')[1]}`);
            }
            if (fields._unique) {
                columns.push(`UNIQUE(${fields._unique})`);
            }
            try {
                db.exec(`CREATE TABLE IF NOT EXISTS ${tableName} (${columns.join(', ')})`);
                api[tableName] = createTableAPI(tableName);
                newTables++;
            } catch (e) {
                logger.log('ERROR', 'DB', `Rescan CREATE ${tableName} failed: ${e.message}`);
            }
        } else {
            // Check for new columns
            try {
                const existingCols = db.pragma(`table_info(${tableName})`).map(c => c.name);
                for (const [key, def] of Object.entries(fields)) {
                    if (META_KEYS.has(key)) continue;
                    if (!existingCols.includes(key)) {
                        try {
                            db.exec(`ALTER TABLE ${tableName} ADD COLUMN ${key} ${def}`);
                            newColumns++;
                            logger.log('INFO', 'DB', `➕ ALTER ${tableName} ADD ${key} ${def}`);
                        } catch (e) { /* already exists */ }
                    }
                }
                // Refresh API
                api[tableName] = createTableAPI(tableName);
            } catch (e) { /* ignore */ }
        }
    }

    if (newTables > 0 || newColumns > 0) {
        logger.details('DB', ['new tables', newTables], ['new columns', newColumns]);
    }
}

module.exports = api;
module.exports.rescan = rescan;
module.exports.raw = db;
