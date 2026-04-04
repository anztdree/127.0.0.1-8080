/**
 * ============================================================
 * DUNGEON-SERVER/TEAM.JS - Team Management Handlers
 * ============================================================
 * 
 * Purpose: Handler untuk manajemen team dungeon
 * Type: "teamDungeonGame"
 * 
 * Handlers:
 *   - createTeam          → Buat team baru
 *   - queryTeam           → Query available teams
 *   - queryTeamById       → Query team by ID
 *   - queryTeamByDisplayId → Query team by display ID
 *   - queryTeamMembers    → Query team members
 *   - queryTeamsMember    → Query multiple teams' members
 *   - queryUserTeam       → Query user's current team
 *   - setTeamDungeonTeam  → Set/update team
 *   - addRobot            → Add robot to team
 *   - quitTeam            → Quit from team
 * 
 * Author: Local SDK Bridge
 * Version: 1.0.0
 * ============================================================
 */

(function(window) {
    'use strict';

    // Get references from dungeon-server
    var DUNGEON_SERVER = window.DUNGEON_SERVER_MOCK;
    var LOG = window.DUNGEON_SERVER_LOG || {
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
        USER_RECORDS: 'dragonball_dungeon_user_records_',
        USER_APPLIES: 'dragonball_dungeon_user_applies_'
    };

    // ========================================================
    // HELPERS
    // ========================================================
    function getServerTime() {
        return Date.now();
    }

    function generateTeamId() {
        return 'team_' + getServerTime() + '_' + Math.random().toString(36).substr(2, 9);
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

    function getPlayerData(userId) {
        try {
            var stored = localStorage.getItem('dragonball_player_data_' + userId);
            return stored ? JSON.parse(stored) : null;
        } catch (e) { return null; }
    }

    // ========================================================
    // HANDLERS
    // ========================================================

    /**
     * Handler: createTeam
     * Create a new dungeon team
     * 
     * Request:
     *   { type: "teamDungeonGame", action: "createTeam", userId, mapId, teamName, version: "1.0" }
     * 
     * Response:
     *   { _teamId: string, _success: boolean }
     */
    function handleCreateTeam(request) {
        LOG.info('─────────────────────────────────────────');
        LOG.info('Handler: createTeam');
        LOG.data('Request:', request);

        var userId = request.userId;
        var mapId = request.mapId;
        var teamName = request.teamName || 'Team';

        if (!userId) {
            LOG.warn('Missing userId');
            return buildResponse({ _success: false, _error: 'Missing userId' });
        }

        // Check if user already in a team
        var existingTeam = getUserTeam(userId);
        if (existingTeam) {
            LOG.warn('User already in a team');
            return buildResponse({ _success: false, _error: 'Already in team' });
        }

        // Get player data for info
        var playerData = getPlayerData(userId);
        var userName = playerData && playerData.user ? playerData.user._nickName : 'Player';
        var userLevel = playerData && playerData.items && playerData.items['104'] ? playerData.items['104']._num : 1;

        // Create team
        var teamId = generateTeamId();
        var teamData = {
            _teamId: teamId,
            _teamName: teamName,
            _mapId: mapId,
            _leaderId: userId,
            _leaderName: userName,
            _createTime: getServerTime(),
            _memberCount: 1,
            _maxMembers: 4,
            _status: 0  // 0 = waiting, 1 = in battle, 2 = finished
        };

        // Save team
        var teams = getTeams();
        teams[teamId] = teamData;
        saveTeams(teams);

        // Save user's team
        saveUserTeam(userId, teamData);

        // Save team members
        var members = [{
            _userId: userId,
            _userName: userName,
            _userLevel: userLevel,
            _isLeader: true,
            _joinTime: getServerTime()
        }];
        saveTeamMembers(teamId, members);

        LOG.success('Team created:', teamId);

        return buildResponse({
            _teamId: teamId,
            _success: true
        });
    }

    /**
     * Handler: queryTeam
     * Query available teams for a map
     * 
     * Request:
     *   { type: "teamDungeonGame", action: "queryTeam", userId, mapId, version: "1.0" }
     * 
     * Response:
     *   { _teams: [teamData, ...] }
     */
    function handleQueryTeam(request) {
        LOG.info('─────────────────────────────────────────');
        LOG.info('Handler: queryTeam');
        LOG.data('Request:', request);

        var mapId = request.mapId;
        var teams = getTeams();
        var result = [];

        for (var teamId in teams) {
            var team = teams[teamId];
            // Filter by mapId if provided
            if (mapId && team._mapId !== mapId) continue;
            // Only show waiting teams with space
            if (team._status === 0 && team._memberCount < team._maxMembers) {
                result.push(team);
            }
        }

        LOG.info('Found teams:', result.length);

        return buildResponse({
            _teams: result
        });
    }

    /**
     * Handler: queryTeamById
     * Query team by team ID
     * 
     * Request:
     *   { type: "teamDungeonGame", action: "queryTeamById", userId, teamId, version: "1.0" }
     * 
     * Response:
     *   { _team: teamData }
     */
    function handleQueryTeamById(request) {
        LOG.info('─────────────────────────────────────────');
        LOG.info('Handler: queryTeamById');
        LOG.data('Request:', request);

        var teamId = request.teamId;
        var teams = getTeams();
        var team = teams[teamId] || null;

        if (team) {
            // Also get members
            team._members = getTeamMembers(teamId);
        }

        return buildResponse({
            _team: team
        });
    }

    /**
     * Handler: queryTeamByDisplayId
     * Query team by display ID (for searching)
     * 
     * Request:
     *   { type: "teamDungeonGame", action: "queryTeamByDisplayId", userId, displayId, version: "1.0" }
     * 
     * Response:
     *   { _team: teamData }
     */
    function handleQueryTeamByDisplayId(request) {
        LOG.info('─────────────────────────────────────────');
        LOG.info('Handler: queryTeamByDisplayId');
        LOG.data('Request:', request);

        var displayId = request.displayId;
        var teams = getTeams();
        var team = null;

        // Search by displayId (could be part of teamId or teamName)
        for (var teamId in teams) {
            if (teamId.indexOf(displayId) !== -1 || 
                (teams[teamId]._teamName && teams[teamId]._teamName.indexOf(displayId) !== -1)) {
                team = teams[teamId];
                team._members = getTeamMembers(teamId);
                break;
            }
        }

        return buildResponse({
            _team: team
        });
    }

    /**
     * Handler: queryTeamMembers
     * Query members of a team
     * 
     * Request:
     *   { type: "teamDungeonGame", action: "queryTeamMembers", userId, teamId, version: "1.0" }
     * 
     * Response:
     *   { _members: [memberData, ...] }
     */
    function handleQueryTeamMembers(request) {
        LOG.info('─────────────────────────────────────────');
        LOG.info('Handler: queryTeamMembers');
        LOG.data('Request:', request);

        var teamId = request.teamId;
        var members = getTeamMembers(teamId);

        return buildResponse({
            _members: members
        });
    }

    /**
     * Handler: queryTeamsMember
     * Query members of multiple teams
     * 
     * Request:
     *   { type: "teamDungeonGame", action: "queryTeamsMember", userId, teamIds: [...], version: "1.0" }
     * 
     * Response:
     *   { _teamsMembers: { teamId: [memberData, ...], ... } }
     */
    function handleQueryTeamsMember(request) {
        LOG.info('─────────────────────────────────────────');
        LOG.info('Handler: queryTeamsMember');
        LOG.data('Request:', request);

        var teamIds = request.teamIds || [];
        var result = {};

        for (var i = 0; i < teamIds.length; i++) {
            var teamId = teamIds[i];
            result[teamId] = getTeamMembers(teamId);
        }

        return buildResponse({
            _teamsMembers: result
        });
    }

    /**
     * Handler: queryUserTeam
     * Query user's current team
     * 
     * Request:
     *   { type: "teamDungeonGame", action: "queryUserTeam", userId, version: "1.0" }
     * 
     * Response:
     *   { _team: teamData, _members: [...] }
     */
    function handleQueryUserTeam(request) {
        LOG.info('─────────────────────────────────────────');
        LOG.info('Handler: queryUserTeam');
        LOG.data('Request:', request);

        var userId = request.userId;
        var teamData = getUserTeam(userId);

        var response = {
            _team: null,
            _members: []
        };

        if (teamData) {
            response._team = teamData;
            response._members = getTeamMembers(teamData._teamId);
        }

        LOG.info('User team:', teamData ? teamData._teamId : 'none');

        return buildResponse(response);
    }

    /**
     * Handler: setTeamDungeonTeam
     * Set/update team configuration
     * 
     * Request:
     *   { type: "teamDungeonGame", action: "setTeamDungeonTeam", userId, teamId, teamConfig, version: "1.0" }
     * 
     * Response:
     *   { _success: boolean }
     */
    function handleSetTeamDungeonTeam(request) {
        LOG.info('─────────────────────────────────────────');
        LOG.info('Handler: setTeamDungeonTeam');
        LOG.data('Request:', request);

        var userId = request.userId;
        var teamId = request.teamId;
        var teamConfig = request.teamConfig || {};

        var teams = getTeams();
        var team = teams[teamId];

        if (!team) {
            LOG.warn('Team not found:', teamId);
            return buildResponse({ _success: false, _error: 'Team not found' });
        }

        // Only leader can update
        if (team._leaderId !== userId) {
            LOG.warn('Not team leader');
            return buildResponse({ _success: false, _error: 'Not leader' });
        }

        // Update team config
        for (var key in teamConfig) {
            if (teamConfig.hasOwnProperty(key)) {
                team[key] = teamConfig[key];
            }
        }

        teams[teamId] = team;
        saveTeams(teams);

        LOG.success('Team updated:', teamId);

        return buildResponse({ _success: true });
    }

    /**
     * Handler: addRobot
     * Add robot/NPC to team
     * 
     * Request:
     *   { type: "teamDungeonGame", action: "addRobot", userId, teamId, robotData, version: "1.0" }
     * 
     * Response:
     *   { _success: boolean, _robotId: string }
     */
    function handleAddRobot(request) {
        LOG.info('─────────────────────────────────────────');
        LOG.info('Handler: addRobot');
        LOG.data('Request:', request);

        var userId = request.userId;
        var teamId = request.teamId;

        var teams = getTeams();
        var team = teams[teamId];

        if (!team) {
            return buildResponse({ _success: false, _error: 'Team not found' });
        }

        if (team._memberCount >= team._maxMembers) {
            return buildResponse({ _success: false, _error: 'Team full' });
        }

        // Create robot
        var robotId = 'robot_' + getServerTime();
        var robotData = {
            _userId: robotId,
            _userName: 'Robot_' + Math.floor(Math.random() * 1000),
            _userLevel: request.robotLevel || 10,
            _isLeader: false,
            _isRobot: true,
            _joinTime: getServerTime()
        };

        // Add to members
        var members = getTeamMembers(teamId);
        members.push(robotData);
        saveTeamMembers(teamId, members);

        // Update member count
        team._memberCount = members.length;
        teams[teamId] = team;
        saveTeams(teams);

        LOG.success('Robot added:', robotId);

        return buildResponse({
            _success: true,
            _robotId: robotId
        });
    }

    /**
     * Handler: quitTeam
     * Quit from current team
     * 
     * Request:
     *   { type: "teamDungeonGame", action: "quitTeam", userId, teamId, version: "1.0" }
     * 
     * Response:
     *   { _success: boolean }
     */
    function handleQuitTeam(request) {
        LOG.info('─────────────────────────────────────────');
        LOG.info('Handler: quitTeam');
        LOG.data('Request:', request);

        var userId = request.userId;
        var teamId = request.teamId;

        var teams = getTeams();
        var team = teams[teamId];

        if (!team) {
            return buildResponse({ _success: true }); // Already not in team
        }

        // Remove from members
        var members = getTeamMembers(teamId);
        var newMembers = [];
        for (var i = 0; i < members.length; i++) {
            if (members[i]._userId !== userId) {
                newMembers.push(members[i]);
            }
        }
        saveTeamMembers(teamId, newMembers);

        // Update or delete team
        if (team._leaderId === userId) {
            // Leader quits - disband team
            delete teams[teamId];
            // Remove all members' user team data
            for (var j = 0; j < newMembers.length; j++) {
                removeUserTeam(newMembers[j]._userId);
            }
            LOG.info('Team disbanded');
        } else {
            // Member quits
            team._memberCount = newMembers.length;
            teams[teamId] = team;
            LOG.info('Member quit');
        }

        saveTeams(teams);
        removeUserTeam(userId);

        LOG.success('Quit team successful');

        return buildResponse({ _success: true });
    }

    // ========================================================
    // REGISTER HANDLERS
    // ========================================================
    
    if (window.DUNGEON_SERVER_MOCK && window.DUNGEON_SERVER_MOCK.registerHandler) {
        window.DUNGEON_SERVER_MOCK.registerHandler('createTeam', handleCreateTeam);
        window.DUNGEON_SERVER_MOCK.registerHandler('queryTeam', handleQueryTeam);
        window.DUNGEON_SERVER_MOCK.registerHandler('queryTeamById', handleQueryTeamById);
        window.DUNGEON_SERVER_MOCK.registerHandler('queryTeamByDisplayId', handleQueryTeamByDisplayId);
        window.DUNGEON_SERVER_MOCK.registerHandler('queryTeamMembers', handleQueryTeamMembers);
        window.DUNGEON_SERVER_MOCK.registerHandler('queryTeamsMember', handleQueryTeamsMember);
        window.DUNGEON_SERVER_MOCK.registerHandler('queryUserTeam', handleQueryUserTeam);
        window.DUNGEON_SERVER_MOCK.registerHandler('setTeamDungeonTeam', handleSetTeamDungeonTeam);
        window.DUNGEON_SERVER_MOCK.registerHandler('addRobot', handleAddRobot);
        window.DUNGEON_SERVER_MOCK.registerHandler('quitTeam', handleQuitTeam);
    } else {
        LOG.warn('DUNGEON_SERVER_MOCK not found, handlers not registered');
    }

})(window);
