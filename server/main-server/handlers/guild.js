'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'create':
            // TODO: Create a new guild
            // REQ: guildName, guildIcon
            // RES: created guild info
            logger.info('GUILD', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'join':
            // TODO: Apply to join a guild
            // REQ: guildId
            // RES: application result
            logger.info('GUILD', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'leave':
            // TODO: Leave current guild
            // REQ: -
            // RES: leave confirmation
            logger.info('GUILD', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'dismiss':
            // TODO: Dismiss/disband the guild (leader only)
            // REQ: -
            // RES: dismiss confirmation
            logger.info('GUILD', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getMemberList':
            // TODO: Get guild member list
            // REQ: -
            // RES: member list with roles and info
            logger.info('GUILD', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getGuildInfo':
            // TODO: Get current guild detailed info
            // REQ: -
            // RES: guild name, level, members count, etc.
            logger.info('GUILD', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'setNotice':
            // TODO: Set guild notice/announcement
            // REQ: notice text
            // RES: updated notice
            logger.info('GUILD', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'donate':
            // TODO: Donate resources to guild
            // REQ: donateType, amount
            // RES: guild contribution, updated resources
            logger.info('GUILD', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getGuildList':
            // TODO: Get list of available guilds to join
            // REQ: page, pageSize
            // RES: guild list
            logger.info('GUILD', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'apply':
            // TODO: Apply to join a guild
            // REQ: guildId
            // RES: application result
            logger.info('GUILD', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'acceptApply':
            // TODO: Accept a guild join application
            // REQ: applyUserId
            // RES: new member info
            logger.info('GUILD', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'rejectApply':
            // TODO: Reject a guild join application
            // REQ: applyUserId
            // RES: rejection confirmation
            logger.info('GUILD', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'kickMember':
            // TODO: Kick a member from guild
            // REQ: targetUserId
            // RES: kick confirmation
            logger.info('GUILD', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'setMemberRole':
            // TODO: Set member role (promote/demote)
            // REQ: targetUserId, role
            // RES: updated role
            logger.info('GUILD', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getApplyList':
            // TODO: Get guild join application list
            // REQ: -
            // RES: pending applications
            logger.info('GUILD', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('GUILD', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
