/**
 * ============================================================
 * DUNGEON-SERVER/APPLY.JS - Apply & Reward Handlers
 * ============================================================
 * 
 * Purpose: Handler untuk apply team dan rewards
 * Type: "teamDungeonGame"
 * 
 * Handlers:
 *   - apply              → Apply to join team
 *   - autoApply          → Auto apply settings
 *   - queryMyApplyList   → Query user's applications
 *   - queryMyRecord      → Query user's dungeon records
 *   - queryKillRank      → Query kill ranking
 *   - getReward          → Get reward
 *   - getAllReward       → Get all rewards
 *   - getDailyTaskReward → Get daily task reward
 *   - getAchReward       → Get achievement reward
 * 
 * Author: Local SDK Bridge
 * Version: 1.0.0
 * ============================================================
 */

(function(window) {
    'use strict';

    // Logger
    var LOG = {
        prefix: '🏰 [DUNGEON-SERVER]',
        success: function(msg, data) { console.log('%c' + this.prefix + ' ✅ ' + msg, 'color: #22c55e; font-weight: bold;', data); },
        info: function(msg, data) { console.log('%c' + this.prefix + ' ℹ️ ' + msg, 'color: #6b7280;', data); },
        warn: function(msg, data) { console.log('%c' + this.prefix + ' ⚠️ ' + msg, 'color: #f59e0b; font-weight: bold;', data); },
        error: function(msg, data) { console.log('%c' + this.prefix + ' ❌ ' + msg, 'color: #ef4444; font-weight: bold;', data); },
        data: function(msg, data) { console.log('%c' + this.prefix + ' 📊 ' + msg, 'color: #8b5cf6;', data); }
    };

    // ========================================================
    // STORAGE KEYS
    // ========================================================
    var STORAGE_KEYS = {
        TEAMS: 'dragonball_dungeon_teams',
        USER_TEAM: 'dragonball_dungeon_user_team_',
        TEAM_MEMBERS: 'dragonball_dungeon_team_members_',
        USER_APPLIES: 'dragonball_dungeon_user_applies_',
        TEAM_APPLIES: 'dragonball_dungeon_team_applies_',
        USER_RECORDS: 'dragonball_dungeon_user_records_',
        KILL_RANK: 'dragonball_dungeon_kill_rank'
    };

    // ========================================================
    // HELPERS
    // ========================================================
    function getServerTime() {
        return Date.now();
    }

    function buildResponse(data) {
        return {
            ret: 0,
            data: typeof data === 'string' ? data : JSON.stringify(data),
            compress: false,
            serverTime: getServerTime(),
            server0Time: getServerTime()
        };
    }

    function getTeams() {
        try {
            var stored = localStorage.getItem(STORAGE_KEYS.TEAMS);
            return stored ? JSON.parse(stored) : {};
        } catch (e) { return {}; }
    }

    function saveTeams(teams) {
        try {
            localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(teams));
        } catch (e) {}
    }

    function getUserApplies(userId) {
        try {
            var stored = localStorage.getItem(STORAGE_KEYS.USER_APPLIES + userId);
            return stored ? JSON.parse(stored) : [];
        } catch (e) { return []; }
    }

    function saveUserApplies(userId, applies) {
        try {
            localStorage.setItem(STORAGE_KEYS.USER_APPLIES + userId, JSON.stringify(applies));
        } catch (e) {}
    }

    function getTeamApplies(teamId) {
        try {
            var stored = localStorage.getItem(STORAGE_KEYS.TEAM_APPLIES + teamId);
            return stored ? JSON.parse(stored) : [];
        } catch (e) { return []; }
    }

    function saveTeamApplies(teamId, applies) {
        try {
            localStorage.setItem(STORAGE_KEYS.TEAM_APPLIES + teamId, JSON.stringify(applies));
        } catch (e) {}
    }

    function getUserRecords(userId) {
        try {
            var stored = localStorage.getItem(STORAGE_KEYS.USER_RECORDS + userId);
            return stored ? JSON.parse(stored) : [];
        } catch (e) { return []; }
    }

    function saveUserRecords(userId, records) {
        try {
            localStorage.setItem(STORAGE_KEYS.USER_RECORDS + userId, JSON.stringify(records));
        } catch (e) {}
    }

    function getTeamMembers(teamId) {
        try {
            var stored = localStorage.getItem(STORAGE_KEYS.TEAM_MEMBERS + teamId);
            return stored ? JSON.parse(stored) : [];
        } catch (e) { return []; }
    }

    function saveTeamMembers(teamId, members) {
        try {
            localStorage.setItem(STORAGE_KEYS.TEAM_MEMBERS + teamId, JSON.stringify(members));
        } catch (e) {}
    }

    function getUserTeam(userId) {
        try {
            var stored = localStorage.getItem(STORAGE_KEYS.USER_TEAM + userId);
            return stored ? JSON.parse(stored) : null;
        } catch (e) { return null; }
    }

    function saveUserTeam(userId, teamData) {
        try {
            localStorage.setItem(STORAGE_KEYS.USER_TEAM + userId, JSON.stringify(teamData));
        } catch (e) {}
    }

    function removeUserTeam(userId) {
        try {
            localStorage.removeItem(STORAGE_KEYS.USER_TEAM + userId);
        } catch (e) {}
    }

    function getPlayerData(userId) {
        try {
            var stored = localStorage.getItem('dragonball_player_data_' + userId);
            return stored ? JSON.parse(stored) : null;
        } catch (e) { return null; }
    }

    function getKillRank() {
        try {
            var stored = localStorage.getItem(STORAGE_KEYS.KILL_RANK);
            return stored ? JSON.parse(stored) : [];
        } catch (e) { return []; }
    }

    function saveKillRank(rank) {
        try {
            localStorage.setItem(STORAGE_KEYS.KILL_RANK, JSON.stringify(rank));
        } catch (e) {}
    }

    // ========================================================
    // HANDLERS
    // ========================================================

    /**
     * Handler: apply
     * Apply to join a team
     * 
     * Request:
     *   { type: "teamDungeonGame", action: "apply", userId, teamId, version: "1.0" }
     * 
     * Response:
     *   { _success: boolean }
     */
    function handleApply(request) {
        LOG.info('─────────────────────────────────────────');
        LOG.info('Handler: apply');
        LOG.data('Request:', request);

        var userId = request.userId;
        var teamId = request.teamId;

        if (!userId || !teamId) {
            return buildResponse({ _success: false, _error: 'Missing params' });
        }

        // Check if already in team
        var existingTeam = getUserTeam(userId);
        if (existingTeam) {
            return buildResponse({ _success: false, _error: 'Already in team' });
        }

        var teams = getTeams();
        var team = teams[teamId];

        if (!team) {
            return buildResponse({ _success: false, _error: 'Team not found' });
        }

        if (team._memberCount >= team._maxMembers) {
            return buildResponse({ _success: false, _error: 'Team full' });
        }

        // Get player info
        var playerData = getPlayerData(userId);
        var userName = playerData && playerData.user ? playerData.user._nickName : 'Player';
        var userLevel = playerData && playerData.items && playerData.items['104'] ? playerData.items['104']._num : 1;

        // For mock server, auto-accept
        // Add user to team directly
        var members = getTeamMembers(teamId);
        members.push({
            _userId: userId,
            _userName: userName,
            _userLevel: userLevel,
            _isLeader: false,
            _joinTime: getServerTime()
        });
        saveTeamMembers(teamId, members);

        // Update team
        team._memberCount = members.length;
        teams[teamId] = team;
        saveTeams(teams);

        // Save user team
        saveUserTeam(userId, team);

        LOG.success('User joined team:', userId, '→', teamId);

        return buildResponse({ _success: true });
    }

    /**
     * Handler: autoApply
     * Set auto-apply settings
     * 
     * Request:
     *   { type: "teamDungeonGame", action: "autoApply", userId, mapId, autoApply: boolean, version: "1.0" }
     * 
     * Response:
     *   { _success: boolean }
     */
    function handleAutoApply(request) {
        LOG.info('─────────────────────────────────────────');
        LOG.info('Handler: autoApply');
        LOG.data('Request:', request);

        var userId = request.userId;
        var mapId = request.mapId;
        var autoApply = request.autoApply;

        // Store auto-apply preference
        try {
            var prefs = JSON.parse(localStorage.getItem('dragonball_dungeon_auto_apply_' + userId) || '{}');
            prefs[mapId] = autoApply;
            localStorage.setItem('dragonball_dungeon_auto_apply_' + userId, JSON.stringify(prefs));
        } catch (e) {}

        LOG.info('Auto-apply set:', autoApply, 'for map:', mapId);

        return buildResponse({ _success: true });
    }

    /**
     * Handler: queryMyApplyList
     * Query user's pending applications
     * 
     * Request:
     *   { type: "teamDungeonGame", action: "queryMyApplyList", userId, version: "1.0" }
     * 
     * Response:
     *   { _applies: [applyData, ...] }
     */
    function handleQueryMyApplyList(request) {
        LOG.info('─────────────────────────────────────────');
        LOG.info('Handler: queryMyApplyList');
        LOG.data('Request:', request);

        var userId = request.userId;
        var applies = getUserApplies(userId);

        return buildResponse({
            _applies: applies
        });
    }

    /**
     * Handler: queryMyRecord
     * Query user's dungeon records
     * 
     * Request:
     *   { type: "teamDungeonGame", action: "queryMyRecord", userId, version: "1.0" }
     * 
     * Response:
     *   { _records: [recordData, ...] }
     */
    function handleQueryMyRecord(request) {
        LOG.info('─────────────────────────────────────────');
        LOG.info('Handler: queryMyRecord');
        LOG.data('Request:', request);

        var userId = request.userId;
        var records = getUserRecords(userId);

        return buildResponse({
            _records: records
        });
    }

    /**
     * Handler: queryKillRank
     * Query kill ranking
     * 
     * Request:
     *   { type: "teamDungeonGame", action: "queryKillRank", userId, version: "1.0" }
     * 
     * Response:
     *   { _rank: [rankItem, ...] }
     */
    function handleQueryKillRank(request) {
        LOG.info('─────────────────────────────────────────');
        LOG.info('Handler: queryKillRank');
        LOG.data('Request:', request);

        var rank = getKillRank();

        // If empty, return sample data
        if (rank.length === 0) {
            rank = [
                { _rank: 1, _userId: 'player1', _userName: 'TopPlayer', _killCount: 1000 },
                { _rank: 2, _userId: 'player2', _userName: 'ProGamer', _killCount: 800 },
                { _rank: 3, _userId: 'player3', _userName: 'Warrior', _killCount: 600 }
            ];
        }

        return buildResponse({
            _rank: rank
        });
    }

    /**
     * Handler: getReward
     * Get dungeon reward
     * 
     * Request:
     *   { type: "teamDungeonGame", action: "getReward", userId, rewardId, version: "1.0" }
     * 
     * Response:
     *   { _success: boolean, _items: [itemData, ...] }
     */
    function handleGetReward(request) {
        LOG.info('─────────────────────────────────────────');
        LOG.info('Handler: getReward');
        LOG.data('Request:', request);

        var userId = request.userId;
        var rewardId = request.rewardId;

        // Mock reward - give some gold
        var playerData = getPlayerData(userId);
        if (playerData && playerData.items) {
            if (!playerData.items['102']) {
                playerData.items['102'] = { _id: 102, _num: 0 };
            }
            playerData.items['102']._num += 1000;
            
            try {
                localStorage.setItem('dragonball_player_data_' + userId, JSON.stringify(playerData));
            } catch (e) {}
        }

        LOG.success('Reward given to:', userId);

        return buildResponse({
            _success: true,
            _items: [{ _id: 102, _num: 1000 }]  // Gold
        });
    }

    /**
     * Handler: getAllReward
     * Get all available rewards
     * 
     * Request:
     *   { type: "teamDungeonGame", action: "getAllReward", userId, version: "1.0" }
     * 
     * Response:
     *   { _success: boolean, _items: [itemData, ...] }
     */
    function handleGetAllReward(request) {
        LOG.info('─────────────────────────────────────────');
        LOG.info('Handler: getAllReward');
        LOG.data('Request:', request);

        var userId = request.userId;

        // Mock - give multiple rewards
        var playerData = getPlayerData(userId);
        if (playerData && playerData.items) {
            if (!playerData.items['102']) playerData.items['102'] = { _id: 102, _num: 0 };
            if (!playerData.items['101']) playerData.items['101'] = { _id: 101, _num: 0 };
            
            playerData.items['102']._num += 5000;  // Gold
            playerData.items['101']._num += 100;   // Diamonds
            
            try {
                localStorage.setItem('dragonball_player_data_' + userId, JSON.stringify(playerData));
            } catch (e) {}
        }

        LOG.success('All rewards given to:', userId);

        return buildResponse({
            _success: true,
            _items: [
                { _id: 102, _num: 5000 },
                { _id: 101, _num: 100 }
            ]
        });
    }

    /**
     * Handler: getDailyTaskReward
     * Get daily task reward
     * 
     * Request:
     *   { type: "teamDungeonGame", action: "getDailyTaskReward", userId, taskId, version: "1.0" }
     * 
     * Response:
     *   { _success: boolean, _items: [itemData, ...] }
     */
    function handleGetDailyTaskReward(request) {
        LOG.info('─────────────────────────────────────────');
        LOG.info('Handler: getDailyTaskReward');
        LOG.data('Request:', request);

        var userId = request.userId;
        var taskId = request.taskId;

        LOG.success('Daily task reward given to:', userId);

        return buildResponse({
            _success: true,
            _items: [{ _id: 102, _num: 500 }]
        });
    }

    /**
     * Handler: getAchReward
     * Get achievement reward
     * 
     * Request:
     *   { type: "teamDungeonGame", action: "getAchReward", userId, achId, version: "1.0" }
     * 
     * Response:
     *   { _success: boolean, _items: [itemData, ...] }
     */
    function handleGetAchReward(request) {
        LOG.info('─────────────────────────────────────────');
        LOG.info('Handler: getAchReward');
        LOG.data('Request:', request);

        var userId = request.userId;
        var achId = request.achId;

        LOG.success('Achievement reward given to:', userId);

        return buildResponse({
            _success: true,
            _items: [{ _id: 101, _num: 50 }]
        });
    }

    // ========================================================
    // REGISTER HANDLERS
    // ========================================================
    
    if (window.DUNGEON_SERVER_MOCK && window.DUNGEON_SERVER_MOCK.registerHandler) {
        window.DUNGEON_SERVER_MOCK.registerHandler('apply', handleApply);
        window.DUNGEON_SERVER_MOCK.registerHandler('autoApply', handleAutoApply);
        window.DUNGEON_SERVER_MOCK.registerHandler('queryMyApplyList', handleQueryMyApplyList);
        window.DUNGEON_SERVER_MOCK.registerHandler('queryMyRecord', handleQueryMyRecord);
        window.DUNGEON_SERVER_MOCK.registerHandler('queryKillRank', handleQueryKillRank);
        window.DUNGEON_SERVER_MOCK.registerHandler('getReward', handleGetReward);
        window.DUNGEON_SERVER_MOCK.registerHandler('getAllReward', handleGetAllReward);
        window.DUNGEON_SERVER_MOCK.registerHandler('getDailyTaskReward', handleGetDailyTaskReward);
        window.DUNGEON_SERVER_MOCK.registerHandler('getAchReward', handleGetAchReward);
    } else {
        LOG.warn('DUNGEON_SERVER_MOCK not found, handlers not registered');
    }

})(window);
