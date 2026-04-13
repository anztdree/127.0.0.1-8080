/**
 * =====================================================
 *  userDataService.js — User Game Data Service
 *  Super Warrior Z Game Server — Main Server
 *
 *  Manages loading and saving user game_data from MariaDB.
 *  The database table `users` has a `game_data` JSON column
 *  that stores ALL game state as a JSON object.
 *
 *  Features:
 *    - In-memory LRU-style cache (max 1000 users) using Map
 *    - Deep clone on every read to prevent cache mutation
 *    - Cache invalidation support for staleness tracking
 *    - Partial field updates with updateField()
 *
 *  Usage:
 *    var userDataService = require('./services/userDataService');
 *    var data = await userDataService.loadUserData(1001);
 *    await userDataService.saveUserData(1001, data);
 *    await userDataService.updateField(1001, 'gold', 5000);
 *    var cached = userDataService.getCachedUserData(1001);
 * =====================================================
 */

'use strict';

var DB = require('../../database/connection');
var defaultData = require('../utils/defaultData');
var helpers = require('../utils/helpers');

/**
 * Maximum number of users to keep in the in-memory cache.
 * Oldest entries are evicted when this limit is exceeded (LRU).
 * @type {number}
 */
var CACHE_MAX_SIZE = 1000;

/**
 * In-memory cache for user game_data.
 * Key: userId (number), Value: gameData (object)
 *
 * Uses JavaScript Map which maintains insertion order,
 * allowing LRU eviction by deleting the oldest key.
 * @type {Map<number, object>}
 */
var _cache = new Map();

/**
 * Set of userIds whose cache entries are marked as stale.
 * Next loadUserData() call for these users will fetch from DB.
 * @type {Set<number>}
 */
var _staleSet = new Set();

/**
 * Load user game_data from the database.
 *
 * Queries the `users` table for the `game_data` JSON column,
 * parses it, merges with defaults to fill any missing fields,
 * and caches the result in memory.
 *
 * If the data is already cached and not stale, returns the cached copy.
 * Always returns a deep clone — NEVER the cache reference directly.
 *
 * @param {number} userId - The user's unique ID
 * @returns {Promise<object>} Complete user game_data with all default fields
 *
 * @example
 *   var data = await userDataService.loadUserData(1001);
 *   console.log(data.level, data.gold, data.heroList);
 */
function loadUserData(userId) {
    // Return cached data if available and not stale
    if (_cache.has(userId) && !_staleSet.has(userId)) {
        // Move to end of Map (LRU: most recently used)
        var cached = _cache.get(userId);
        _cache.delete(userId);
        _cache.set(userId, cached);

        console.log('[UserDataService] Cache hit for userId=' + userId);
        return Promise.resolve(helpers.deepClone(cached));
    }

    // Clear stale flag if set (we're about to fetch fresh data)
    _staleSet.delete(userId);

    console.log('[UserDataService] Loading game_data from DB for userId=' + userId);

    // Query database for game_data JSON column
    return DB.query('SELECT game_data FROM users WHERE user_id = ?', [userId])
        .then(function (rows) {
            if (!rows || rows.length === 0) {
                console.error('[UserDataService] User not found: userId=' + userId);
                return null;
            }

            var rawData = rows[0].game_data;
            var parsedData = rawData;

            // Parse JSON string if game_data is stored as a string
            if (typeof rawData === 'string') {
                try {
                    parsedData = JSON.parse(rawData);
                } catch (parseErr) {
                    console.error('[UserDataService] Failed to parse game_data JSON for userId=' + userId + ': ' + parseErr.message);
                    parsedData = {};
                }
            }

            // Merge with defaults to ensure all 99 fields have values
            var mergedData = defaultData.mergeWithDefaults(parsedData);

            // Store in cache
            _evictIfNeeded();
            _cache.set(userId, mergedData);

            console.log('[UserDataService] Loaded and cached game_data for userId=' + userId);
            return helpers.deepClone(mergedData);
        })
        .catch(function (err) {
            console.error('[UserDataService] DB error loading game_data for userId=' + userId + ': ' + err.message);
            throw err;
        });
}

/**
 * Save user game_data to the database.
 *
 * Stringifies the gameData object and updates the `game_data`
 * column in the `users` table. Also updates the in-memory cache.
 *
 * @param {number} userId - The user's unique ID
 * @param {object} gameData - Complete game_data object to save
 * @returns {Promise<boolean>} True if save was successful
 *
 * @example
 *   var data = await userDataService.loadUserData(1001);
 *   data.gold += 100;
 *   await userDataService.saveUserData(1001, data);
 */
function saveUserData(userId, gameData) {
    if (!gameData || typeof gameData !== 'object') {
        console.error('[UserDataService] Invalid gameData provided for userId=' + userId);
        return Promise.reject(new Error('Invalid gameData: must be a non-null object'));
    }

    var jsonData = JSON.stringify(gameData);

    console.log('[UserDataService] Saving game_data to DB for userId=' + userId +
        ' (size: ' + jsonData.length + ' bytes)');

    return DB.query('UPDATE users SET game_data = ? WHERE user_id = ?', [jsonData, userId])
        .then(function (result) {
            if (result && result.affectedRows > 0) {
                // Update cache
                _evictIfNeeded();
                _cache.set(userId, helpers.deepClone(gameData));
                _staleSet.delete(userId);

                console.log('[UserDataService] Saved and cached game_data for userId=' + userId);
                return true;
            } else {
                console.warn('[UserDataService] No rows affected when saving for userId=' + userId);
                return false;
            }
        })
        .catch(function (err) {
            console.error('[UserDataService] DB error saving game_data for userId=' + userId + ': ' + err.message);
            throw err;
        });
}

/**
 * Get cached user game_data without hitting the database.
 *
 * Returns a deep clone of the cached data if available.
 * Returns null if the user is not in cache or cache is stale.
 *
 * Use this for high-frequency reads where slight staleness is acceptable.
 * For guaranteed fresh data, use loadUserData() instead.
 *
 * @param {number} userId - The user's unique ID
 * @returns {object|null} Deep cloned game_data, or null if not cached
 *
 * @example
 *   var data = userDataService.getCachedUserData(1001);
 *   if (data) {
 *       console.log('Cached level:', data.level);
 *   }
 */
function getCachedUserData(userId) {
    if (!_cache.has(userId) || _staleSet.has(userId)) {
        return null;
    }

    // Move to end of Map (LRU: most recently used)
    var cached = _cache.get(userId);
    _cache.delete(userId);
    _cache.set(userId, cached);

    // NEVER return cache reference directly — always deep clone
    return helpers.deepClone(cached);
}

/**
 * Clear cache entry for a specific user.
 *
 * Removes the user's game_data from the in-memory cache entirely.
 * Use this on disconnect or when you know the data is no longer needed.
 *
 * @param {number} userId - The user's unique ID
 *
 * @example
 *   // On socket disconnect
 *   userDataService.clearCache(userId);
 */
function clearCache(userId) {
    _cache.delete(userId);
    _staleSet.delete(userId);
    console.log('[UserDataService] Cache cleared for userId=' + userId);
}

/**
 * Invalidate cache for a specific user.
 *
 * Marks the cache entry as stale. The data remains in cache but
 * the next loadUserData() call will fetch fresh data from the database.
 * This is more efficient than clearCache when the user is likely
 * to reconnect soon.
 *
 * @param {number} userId - The user's unique ID
 *
 * @example
 *   // External data modification detected
 *   userDataService.invalidateCache(userId);
 */
function invalidateCache(userId) {
    if (_cache.has(userId)) {
        _staleSet.add(userId);
        console.log('[UserDataService] Cache invalidated for userId=' + userId);
    }
}

/**
 * Update a single field in the user's game_data.
 *
 * Performs a partial update — only modifies the specified field
 * without rewriting the entire game_data JSON. This is more efficient
 * for small changes like incrementing gold or stamina.
 *
 * Flow:
 *   1. Load current data (from cache or DB)
 *   2. Update the specified field
 *   3. Save entire game_data back to DB
 *   4. Update cache
 *
 * @param {number} userId - The user's unique ID
 * @param {string} field - Field name in game_data (e.g., 'gold', 'level')
 * @param {*} value - New value for the field
 * @returns {Promise<object>} Updated game_data
 *
 * @example
 *   await userDataService.updateField(1001, 'gold', 5000);
 *   await userDataService.updateField(1001, 'level', 25);
 */
function updateField(userId, field, value) {
    console.log('[UserDataService] Updating field "' + field + '" for userId=' + userId);

    return loadUserData(userId)
        .then(function (gameData) {
            if (!gameData) {
                throw new Error('User data not found for userId=' + userId);
            }

            // Update the field
            gameData[field] = value;

            // Save to DB (this also updates cache)
            return saveUserData(userId, gameData);
        })
        .then(function () {
            // Return updated cached data
            return helpers.deepClone(_cache.get(userId));
        });
}

/**
 * Get current cache statistics.
 *
 * Returns information about the in-memory cache state
 * including size, stale count, and max capacity.
 *
 * @returns {{size: number, staleCount: number, maxSize: number}} Cache stats
 *
 * @example
 *   var stats = userDataService.getCacheStats();
 *   console.log('Cached users:', stats.size, '/', stats.maxSize);
 */
function getCacheStats() {
    return {
        size: _cache.size,
        staleCount: _staleSet.size,
        maxSize: CACHE_MAX_SIZE
    };
}

/**
 * Clear all cached data.
 *
 * Removes all entries from both the cache and stale set.
 * Use with caution — primarily for testing or admin operations.
 */
function clearAllCache() {
    _cache.clear();
    _staleSet.clear();
    console.log('[UserDataService] All cache cleared');
}

/**
 * Evict the oldest cache entry if the cache is at capacity.
 * Implements LRU eviction by removing the first (oldest) Map entry.
 * @private
 */
function _evictIfNeeded() {
    if (_cache.size >= CACHE_MAX_SIZE) {
        // Map iterates in insertion order, first key is oldest
        var firstKey = _cache.keys().next().value;
        _cache.delete(firstKey);
        _staleSet.delete(firstKey);
        console.log('[UserDataService] LRU eviction: removed userId=' + firstKey);
    }
}

module.exports = {
    loadUserData: loadUserData,
    saveUserData: saveUserData,
    getCachedUserData: getCachedUserData,
    clearCache: clearCache,
    invalidateCache: invalidateCache,
    updateField: updateField,
    getCacheStats: getCacheStats,
    clearAllCache: clearAllCache
};
