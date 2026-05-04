/**
 * jsonLoader.js — Load Semua 471 JSON Resource Files ke Memory
 * Referensi: main-server.md v4.0 Section 1.4, 9
 * Source: ReadJsonSingleton pada client (main.min.js)
 *
 * Client memuat semua JSON lewat ReadJsonSingleton yang menyimpan
 * data dalam property-property bernama sesuai filename tanpa ekstensi.
 * Contoh: hero.json → ReadJsonSingleton.hero
 *
 * Server harus memuat SEMUA file yang sama ke memory agar
 * handler bisa mengakses data konfigurasi game dengan cepat.
 *
 * Struktur storage: { fileName: parsedJSON }
 * Contoh: jsonData['hero'] = { "1205": {...}, "1206": {...} }
 */

const fs = require('fs');
const path = require('path');
const logger = require('./logger');
const config = require('./config');

// ─── In-Memory JSON Storage ───
// Key = filename tanpa .json, Value = parsed JSON object
const jsonData = {};

// ─── Load Status ───
let loadStatus = {
    totalFiles: 0,
    loadedFiles: 0,
    failedFiles: 0,
    totalBytes: 0,
    loadTimeMs: 0,
    errors: []
};

/**
 * Load semua JSON file dari resource/json directory ke memory
 * Dipanggil sekali saat server startup
 * @returns {object} Load status
 */
function loadAll() {
    const startTime = Date.now();
    const jsonDir = config.jsonResourcePath;

    logger.log('INFO', 'JSON', 'Loading JSON resource files...');
    logger.detail('location', ['path', jsonDir]);

    // Verify directory exists
    if (!fs.existsSync(jsonDir)) {
        logger.log('ERROR', 'JSON', 'JSON resource directory not found!');
        logger.detail('important', ['path', jsonDir]);
        throw new Error('JSON resource directory not found: ' + jsonDir);
    }

    // Read all .json files
    const files = fs.readdirSync(jsonDir)
        .filter(f => f.endsWith('.json'))
        .sort();

    loadStatus.totalFiles = files.length;

    logger.log('INFO', 'JSON', `Found ${files.length} JSON files to load`);

    // Load each file
    for (const file of files) {
        const filePath = path.join(jsonDir, file);
        const key = file.replace('.json', '');  // filename tanpa .json

        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const parsed = JSON.parse(content);

            jsonData[key] = parsed;

            loadStatus.loadedFiles++;
            loadStatus.totalBytes += Buffer.byteLength(content, 'utf-8');

        } catch (err) {
            loadStatus.failedFiles++;
            loadStatus.errors.push({ file, error: err.message });
            logger.log('ERROR', 'JSON', `Failed to load: ${file}`);
            logger.detail('error', ['error', err.message]);
        }
    }

    loadStatus.loadTimeMs = Date.now() - startTime;

    // Log summary
    logger.log('INFO', 'JSON', 'JSON loading complete');
    logger.details('data',
        ['total', String(loadStatus.totalFiles)],
        ['loaded', String(loadStatus.loadedFiles)],
        ['failed', String(loadStatus.failedFiles)],
        ['size', (loadStatus.totalBytes / 1024 / 1024).toFixed(2) + ' MB'],
        ['time', loadStatus.loadTimeMs + 'ms']
    );

    if (loadStatus.failedFiles > 0) {
        logger.log('WARN', 'JSON', `${loadStatus.failedFiles} files failed to load`);
        for (const e of loadStatus.errors) {
            logger.detail('error', ['file', e.file], ['error', e.error]);
        }
    }

    return loadStatus;
}

/**
 * Get JSON data by name (filename tanpa .json)
 * Meniru pola ReadJsonSingleton pada client
 * @param {string} name - Nama JSON (misalnya 'hero', 'constant', 'skill')
 * @returns {object|null} Parsed JSON object, atau null jika tidak ada
 */
function get(name) {
    return jsonData[name] || null;
}

/**
 * Get nested value dari JSON data
 * Contoh: getNested('constant', '1', 'startUserLevel') → 1
 * @param {string} name - Nama JSON
 * @param {...string} keys - Nested keys
 * @returns {*|null}
 */
function getNested(name, ...keys) {
    let current = jsonData[name];
    if (!current) return null;

    for (const key of keys) {
        if (current === null || current === undefined) return null;
        current = current[key];
    }

    return current !== undefined ? current : null;
}

/**
 * Get specific entry dari JSON data by ID
 * Banyak JSON file menggunakan structure { "id1": {...}, "id2": {...} }
 * @param {string} name - Nama JSON
 * @param {string|number} id - Entry ID
 * @returns {object|null}
 */
function getById(name, id) {
    const data = jsonData[name];
    if (!data) return null;
    return data[String(id)] || data[id] || null;
}

/**
 * Get semua key names yang sudah dimuat
 * @returns {string[]}
 */
function getLoadedNames() {
    return Object.keys(jsonData).sort();
}

/**
 * Check apakah JSON tertentu sudah dimuat
 * @param {string} name
 * @returns {boolean}
 */
function has(name) {
    return name in jsonData;
}

/**
 * Get load status summary
 * @returns {object}
 */
function getStatus() {
    return { ...loadStatus, loadedNames: getLoadedNames() };
}

/**
 * Reload satu JSON file tertentu (untuk hot-reload tanpa restart)
 * @param {string} name - Nama JSON (tanpa .json)
 * @returns {boolean} true jika berhasil
 */
function reload(name) {
    const filePath = path.join(config.jsonResourcePath, name + '.json');

    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        jsonData[name] = JSON.parse(content);
        logger.log('INFO', 'JSON', `Reloaded: ${name}`);
        return true;
    } catch (err) {
        logger.log('ERROR', 'JSON', `Reload failed: ${name}`);
        logger.detail('error', ['error', err.message]);
        return false;
    }
}

module.exports = {
    loadAll,
    get,
    getNested,
    getById,
    getLoadedNames,
    has,
    getStatus,
    reload,
    _data: jsonData
};
