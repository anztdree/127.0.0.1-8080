/**
 * =====================================================
 *  battleService.js — Battle Simulation & Verification Service
 *  Super Warrior Z Game Server — Main Server
 *
 *  Battle simulation and verification service.
 *  The CLIENT calculates battle results locally;
 *  the server just validates and records outcomes.
 *
 *  Architecture:
 *    1. Client starts battle → server records battle start
 *    2. Client calculates result locally (damage, rewards)
 *    3. Client submits result → server verifies and applies rewards
 *
 *  Battle Lifecycle:
 *    recordBattleStart() → verifyBattleResult() → completeBattle()
 *         (active)            (submitted)            (done)
 *
 *  Features:
 *    - In-memory battle state storage using Map
 *    - Automatic cleanup of expired battles (>30 minutes)
 *    - Unique battle ID generation
 *    - Battle record retrieval
 *
 *  Usage:
 *    var battleService = require('./services/battleService');
 *    var battleId = battleService.generateBattleId();
 *    battleService.recordBattleStart(userId, 'dungeon', battleId);
 *    battleService.verifyBattleResult(userId, battleId, result);
 *    await battleService.completeBattle(userId, battleId, result, rewards);
 * =====================================================
 */

'use strict';

var helpers = require('../utils/helpers');

/**
 * Maximum time a battle can remain active before being considered expired.
 * Battles older than this are cleaned up by cleanupExpiredBattles().
 * @type {number}
 */
var BATTLE_EXPIRY_MS = 30 * 60 * 1000; // 30 minutes

/**
 * Map of active battle records.
 * Key: battleId (string), Value: battle record object
 *
 * @type {Map<string, object>}
 */
var _battles = new Map();

/**
 * Map of userId to their current active battleId.
 * A user can only have one active battle at a time.
 *
 * @type {Map<number, string>}
 */
var _userBattles = new Map();

/**
 * Generate a unique battle ID.
 *
 * Format: `battle_<timestamp>_<randomHex>`
 * Combines current timestamp with random bytes for uniqueness.
 *
 * @returns {string} Unique battle identifier
 *
 * @example
 *   var battleId = battleService.generateBattleId();
 *   // "battle_1700000000_a3f2b1c4"
 */
function generateBattleId() {
    var timestamp = Date.now();
    var random = Math.random().toString(16).substring(2, 10);
    return 'battle_' + timestamp + '_' + random;
}

/**
 * Record that a battle has started for a user.
 *
 * Creates an active battle record in memory. The battle is considered
 * "in progress" until completeBattle() is called or it expires.
 *
 * If the user already has an active battle, it is completed
 * automatically with a timeout result to prevent ghost battles.
 *
 * @param {number} userId - The user's unique ID
 * @param {string} battleField - Battle type/location (e.g., 'dungeon', 'arena', 'tower')
 * @param {string} battleId - Unique battle identifier from generateBattleId()
 * @returns {{ success: boolean, battleId: string, reason: string|null }} Result of the operation
 *
 * @example
 *   var battleId = battleService.generateBattleId();
 *   var result = battleService.recordBattleStart(1001, 'dungeon', battleId);
 */
function recordBattleStart(userId, battleField, battleId) {
    console.log('[BattleService] Recording battle start: userId=' + userId +
        ' field=' + battleField + ' battleId=' + battleId);

    // Check if user already has an active battle
    if (_userBattles.has(userId)) {
        var existingBattleId = _userBattles.get(userId);

        // Complete existing battle as timed out
        if (_battles.has(existingBattleId)) {
            var existingBattle = _battles.get(existingBattleId);
            existingBattle.status = 'timeout';
            existingBattle.completedAt = Date.now();
            console.warn('[BattleService] Auto-completing previous battle ' + existingBattleId +
                ' for userId=' + userId + ' (new battle started)');
        }
    }

    // Create battle record
    var battleRecord = {
        battleId: battleId,
        userId: userId,
        battleField: battleField,
        status: 'active',          // active | submitted | completed | timeout | expired
        startedAt: Date.now(),
        submittedAt: null,
        completedAt: null,
        result: null,
        rewards: null
    };

    _battles.set(battleId, battleRecord);
    _userBattles.set(userId, battleId);

    return {
        success: true,
        battleId: battleId,
        reason: null
    };
}

/**
 * Verify that a battle result submission is valid.
 *
 * Checks:
 *   1. Battle exists in records
 *   2. Battle belongs to the specified user
 *   3. Battle is in 'active' status (not already completed)
 *   4. Battle has not expired (>30 minutes old)
 *   5. Battle result contains required fields
 *
 * Does NOT modify battle state — use completeBattle() to finalize.
 *
 * @param {number} userId - The user's unique ID
 * @param {string} battleId - Unique battle identifier
 * @param {object} battleResult - Battle result from client
 * @returns {{ valid: boolean, reason: string|null }} Validation result
 *
 * @example
 *   var check = battleService.verifyBattleResult(1001, battleId, { victory: true, stars: 3 });
 *   if (check.valid) {
 *       await battleService.completeBattle(1001, battleId, result, rewards);
 *   }
 */
function verifyBattleResult(userId, battleId, battleResult) {
    console.log('[BattleService] Verifying battle result: userId=' + userId +
        ' battleId=' + battleId);

    // Check battle exists
    if (!_battles.has(battleId)) {
        console.warn('[BattleService] Battle not found: battleId=' + battleId);
        return { valid: false, reason: 'Battle not found' };
    }

    var battle = _battles.get(battleId);

    // Check battle belongs to user
    if (battle.userId !== userId) {
        console.warn('[BattleService] Battle ' + battleId + ' does not belong to userId=' + userId);
        return { valid: false, reason: 'Battle does not belong to user' };
    }

    // Check battle status
    if (battle.status !== 'active') {
        console.warn('[BattleService] Battle ' + battleId + ' is not active (status=' + battle.status + ')');
        return { valid: false, reason: 'Battle is not active: ' + battle.status };
    }

    // Check battle expiration
    var elapsed = Date.now() - battle.startedAt;
    if (elapsed > BATTLE_EXPIRY_MS) {
        console.warn('[BattleService] Battle ' + battleId + ' has expired (' + elapsed + 'ms old)');
        battle.status = 'expired';
        battle.completedAt = Date.now();
        _userBattles.delete(userId);
        return { valid: false, reason: 'Battle has expired' };
    }

    // Check battle result has required fields
    if (!battleResult || typeof battleResult !== 'object') {
        console.warn('[BattleService] Invalid battle result format for battleId=' + battleId);
        return { valid: false, reason: 'Invalid battle result format' };
    }

    console.log('[BattleService] Battle result verified: battleId=' + battleId);
    return { valid: true, reason: null };
}

/**
 * Complete a battle, mark it as done, and apply rewards.
 *
 * Finalizes the battle record, marks it as completed,
 * and removes the user's active battle reference.
 *
 * NOTE: This method does NOT apply rewards directly.
 * The caller should use rewardService.grantReward() to distribute rewards.
 *
 * @param {number} userId - The user's unique ID
 * @param {string} battleId - Unique battle identifier
 * @param {object} result - Final battle result from client
 * @param {Array} [rewards] - Array of reward objects to apply
 * @returns {Promise<{ success: boolean, reason: string|null }} Completion result
 *
 * @example
 *   var completion = await battleService.completeBattle(1001, battleId, result, rewards);
 */
function completeBattle(userId, battleId, result, rewards) {
    console.log('[BattleService] Completing battle: userId=' + userId +
        ' battleId=' + battleId);

    // Verify first
    var verification = verifyBattleResult(userId, battleId, result);
    if (!verification.valid) {
        return Promise.resolve({
            success: false,
            reason: verification.reason
        });
    }

    var battle = _battles.get(battleId);

    // Update battle record
    battle.status = 'completed';
    battle.submittedAt = Date.now();
    battle.completedAt = Date.now();
    battle.result = result || {};
    battle.rewards = rewards || [];

    // Clean up user's active battle
    _userBattles.delete(userId);

    console.log('[BattleService] Battle completed: battleId=' + battleId +
        ' field=' + battle.battleField +
        ' duration=' + (battle.completedAt - battle.startedAt) + 'ms');

    return Promise.resolve({
        success: true,
        reason: null
    });
}

/**
 * Retrieve a battle record by battleId.
 *
 * Returns the battle record regardless of its status.
 * Returns null if the battle does not exist.
 *
 * @param {number} userId - The user's unique ID (unused, kept for API consistency)
 * @param {string} battleId - Unique battle identifier
 * @returns {object|null} Battle record or null if not found
 *
 * @example
 *   var record = battleService.getBattleRecord(1001, battleId);
 *   if (record) {
 *       console.log('Battle status:', record.status);
 *   }
 */
function getBattleRecord(userId, battleId) {
    if (!_battles.has(battleId)) {
        console.warn('[BattleService] Battle not found: battleId=' + battleId);
        return null;
    }

    var battle = _battles.get(battleId);

    // Verify ownership (optional but recommended for security)
    if (battle.userId !== userId) {
        console.warn('[BattleService] Access denied: battle ' + battleId +
            ' does not belong to userId=' + userId);
        return null;
    }

    // Return a copy to prevent external mutation
    return helpers.deepClone(battle);
}

/**
 * Clean up expired battles from memory.
 *
 * Removes all battles that have been active for longer than
 * BATTLE_EXPIRY_MS (30 minutes). Also cleans up any user battle
 * references that point to expired battles.
 *
 * Should be called periodically (e.g., every 5 minutes) to
 * prevent memory leaks from abandoned battles.
 *
 * @returns {{ removed: number, remaining: number }} Cleanup statistics
 *
 * @example
 *   var stats = battleService.cleanupExpiredBattles();
 *   console.log('Removed', stats.removed, 'expired battles');
 */
function cleanupExpiredBattles() {
    var now = Date.now();
    var removed = 0;

    _battles.forEach(function (battle, battleId) {
        var elapsed = now - battle.startedAt;

        // Check for expired battles
        if (elapsed > BATTLE_EXPIRY_MS) {
            // Only clean up non-active or expired battles
            if (battle.status !== 'active') {
                _battles.delete(battleId);
                removed++;
            } else {
                // Mark active battles as expired
                battle.status = 'expired';
                battle.completedAt = now;
                _userBattles.delete(battle.userId);
                _battles.delete(battleId);
                removed++;
            }
        }
    });

    // Clean up orphaned user battle references
    _userBattles.forEach(function (battleId, userId) {
        if (!_battles.has(battleId)) {
            _userBattles.delete(userId);
        }
    });

    if (removed > 0) {
        console.log('[BattleService] Cleanup: removed ' + removed +
            ' expired battles, ' + _battles.size + ' remaining');
    }

    return {
        removed: removed,
        remaining: _battles.size
    };
}

/**
 * Get current battle service statistics.
 *
 * @returns {{ activeBattles: number, totalRecords: number, userBattles: number }} Stats
 */
function getStats() {
    var activeCount = 0;
    _battles.forEach(function (battle) {
        if (battle.status === 'active') {
            activeCount++;
        }
    });

    return {
        activeBattles: activeCount,
        totalRecords: _battles.size,
        userBattles: _userBattles.size
    };
}

/**
 * Check if a user has an active battle.
 *
 * @param {number} userId - The user's unique ID
 * @returns {boolean} True if user has an active battle
 */
function hasActiveBattle(userId) {
    return _userBattles.has(userId);
}

/**
 * Get a user's active battle ID.
 *
 * @param {number} userId - The user's unique ID
 * @returns {string|null} Active battle ID or null
 */
function getActiveBattleId(userId) {
    return _userBattles.get(userId) || null;
}

module.exports = {
    generateBattleId: generateBattleId,
    recordBattleStart: recordBattleStart,
    verifyBattleResult: verifyBattleResult,
    completeBattle: completeBattle,
    getBattleRecord: getBattleRecord,
    cleanupExpiredBattles: cleanupExpiredBattles,
    getStats: getStats,
    hasActiveBattle: hasActiveBattle,
    getActiveBattleId: getActiveBattleId,
    BATTLE_EXPIRY_MS: BATTLE_EXPIRY_MS
};
