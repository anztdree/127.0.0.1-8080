/**
 * jsonLoader.js — Resource Data Loader
 *
 * Load semua 471 file JSON dari /var/www/html/resource/json ke memory.
 * Pattern: ReadJsonSingleton — sama seperti client.
 *
 * Access:
 *   jsonLoader.get('hero')           → hero.json parsed object
 *   jsonLoader.get('constant')       → constant.json parsed object
 *   jsonLoader.getConstant('startHero') → constant['1']['startHero']
 *   jsonLoader.list()                → semua nama file yang loaded
 */

const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const jsonMap = new Map();  // filename (tanpa .json) → parsed object

/**
 * Load semua file JSON dari direktori
 * @param {string} dirPath - Path ke resource/json/
 */
function load(dirPath) {
    const startTime = Date.now();

    if (!fs.existsSync(dirPath)) {
        logger.log('ERROR', 'JSON', `Directory not found: ${dirPath}`);
        logger.log('WARNING', 'JSON', 'jsonLoader will be empty — handlers may not work correctly');
        return;
    }

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.json'));
    let loaded = 0;
    let errors = 0;

    for (const file of files) {
        const name = file.replace('.json', '');
        const filePath = path.join(dirPath, file);

        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const parsed = JSON.parse(content);
            jsonMap.set(name, parsed);
            loaded++;
        } catch (e) {
            errors++;
            logger.log('WARNING', 'JSON', `Failed to load ${file}: ${e.message}`);
        }
    }

    const elapsed = Date.now() - startTime;
    logger.details('JSON',
        ['loaded', `${loaded} files`],
        ['errors', errors],
        ['time', `${elapsed}ms`],
        ['path', dirPath]
    );
}

/**
 * Get JSON data by name (tanpa .json)
 * @param {string} name - Nama file tanpa extension (misal: 'hero')
 * @returns {object|null} Parsed JSON object
 */
function get(name) {
    return jsonMap.get(name) || null;
}

/**
 * Get constant value dari constant.json
 * constant.json structure: { "1": { startHero: "1205", startUserLevel: "1", ... } }
 * @param {string} key - Key dalam constant['1']
 * @returns {*} Value atau undefined
 */
function getConstant(key) {
    const constants = jsonMap.get('constant');
    if (!constants || !constants['1']) return undefined;
    return constants['1'][key];
}

/**
 * List semua nama JSON yang loaded
 * @returns {string[]} Array nama file
 */
function list() {
    return Array.from(jsonMap.keys());
}

/**
 * Cek apakah JSON tertentu sudah loaded
 * @param {string} name - Nama file tanpa extension
 * @returns {boolean}
 */
function has(name) {
    return jsonMap.has(name);
}

module.exports = {
    load,
    get,
    getConstant,
    list,
    has
};
