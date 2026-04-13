'use strict';

var RH = require('../../shared/responseHelper');

/**
 * Friend Handler
 * Port 8001 — Main Server
 *
 * Actions: 16 total
 * WRITE: 9 | READ: 7
 *
 * Source: main.min.js client analysis
 */

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        // === WRITE ACTIONS ===

        case 'addToBlacklist':
            // TODO: WRITE — Add a player to the user's blacklist (block all interactions)
            // REQ: targetUserId
            // RES: _changeInfo._blacklist (new entry added),
            //      _changeInfo._friendList (friend removed if they were a friend)
            callback(RH.success({}));
            break;

        case 'applyFriend':
            // TODO: WRITE — Send a friend request to another player
            // REQ: targetUserId
            // RES: _changeInfo._friendApplyList (sent application recorded)
            callback(RH.success({}));
            break;

        case 'autoGiveGetHeart':
            // TODO: WRITE — Auto batch: give hearts to all friends who sent hearts, and collect all received hearts at once
            // REQ: (none)
            // RES: _changeInfo._heartData (all hearts exchanged),
            //      _changeInfo._items (heart reward items gained),
            //      _changeInfo._stamina (stamina gained from hearts)
            callback(RH.success({}));
            break;

        case 'delFriend':
            // TODO: WRITE — Remove a friend from the user's friend list
            // REQ: targetUserId
            // RES: _changeInfo._friendList (friend removed),
            //      _changeInfo._friendCount
            callback(RH.success({}));
            break;

        case 'friendBattle':
            // TODO: WRITE — Initiate a friendly sparring battle with a friend (non-ranked practice match)
            // REQ: targetUserId, attackTeam[] (hero UIDs)
            // RES: _battleResult { _battleId, _isWin, _replayData },
            //      _changeInfo._items (battle rewards)
            callback(RH.success({}));
            break;

        case 'friendServerAction':
            // TODO: WRITE — Perform a cross-server friend action (e.g., visit friend's base on another server)
            // REQ: targetUserId, targetServerId, actionType
            // RES: _changeInfo based on actionType (visit rewards, interact, etc.)
            callback(RH.success({}));
            break;

        case 'getHeart':
            // TODO: WRITE — Collect/claim hearts sent by a specific friend
            // REQ: targetUserId
            // RES: _changeInfo._heartData (heart marked as collected),
            //      _changeInfo._stamina (stamina gained),
            //      _changeInfo._items
            callback(RH.success({}));
            break;

        case 'giveHeart':
            // TODO: WRITE — Send a heart to a friend (daily heart gift action)
            // REQ: targetUserId
            // RES: _changeInfo._heartData (heart sent recorded),
            //      _changeInfo._items (friend point or reward gained)
            callback(RH.success({}));
            break;

        case 'handleApply':
            // TODO: WRITE — Accept or reject a pending friend application/request
            // REQ: applyId, isAccept (boolean)
            // RES: _changeInfo._friendApplyList (application removed),
            //      _changeInfo._friendList (friend added if accepted),
            //      _changeInfo._friendCount
            callback(RH.success({}));
            break;

        case 'removeBalcklist':
            // TODO: WRITE — Remove a player from the user's blacklist (unblock them)
            // REQ: targetUserId
            // RES: _changeInfo._blacklist (entry removed)
            callback(RH.success({}));
            break;

        // === READ ACTIONS ===

        case 'findUserBrief':
            // TODO: READ — Search for a player by userId or nickname, return brief profile info
            // REQ: searchKey (userId or nickName), searchType
            // RES: _userBrief { _userId, _nickName, _level, _headImage, _headBox, _power, _serverId }
            callback(RH.success({}));
            break;

        case 'getApplyList':
            // TODO: READ — Get the user's list of pending friend requests/applications
            // REQ: (none)
            // RES: _applyList [{ _applyId, _fromUserId, _fromName, _level, _headImage,
            //                   _timestamp, _message }]
            callback(RH.success({}));
            break;

        case 'getFriendArenaDefenceTeam':
            // TODO: READ — Get a specific friend's arena defense team composition (for scouting)
            // REQ: targetUserId
            // RES: _arenaDefenceTeam [{ _heroUid, _heroId, _skinId, _power }],
            //      _targetUserInfo { _nickName, _level, _power }
            callback(RH.success({}));
            break;

        case 'getFriends':
            // TODO: READ — Get the user's complete friend list with brief info for each friend
            // REQ: (none)
            // RES: _friendList [{ _userId, _nickName, _level, _headImage, _headBox, _power,
            //                    _isOnline, _lastLoginTime, _hasHeartToSend, _hasHeartToGet }]
            callback(RH.success({}));
            break;

        case 'recommendBattleFriend':
            // TODO: READ — Get recommended friends for battle/sparring (based on power level)
            // REQ: (none)
            // RES: _recommendBattleList [{ _userId, _nickName, _level, _headImage, _power, _isFriend }]
            callback(RH.success({}));
            break;

        case 'recommendFriend':
            // TODO: READ — Get recommended friends to add (random players near same level/power)
            // REQ: (none)
            // RES: _recommendFriendList [{ _userId, _nickName, _level, _headImage, _headBox,
            //                             _power, _isFriend, _isApplied }]
            callback(RH.success({}));
            break;

        default:
            console.warn('[FRIEND] Unknown action: ' + action);
            callback(RH.success({}));
    }
}

module.exports = { handle: handle };
