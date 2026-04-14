'use strict';

var RH = require('../../shared/responseHelper');
var logger = require('../../shared/utils/logger');

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        case 'activeHeroBreak':
            // TODO: Activate hero breakthrough enhancement
            // REQ: heroId, breakLevel
            // RES: updated hero stats
            logger.info('HERO', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'activeSkill':
            // TODO: Activate or upgrade a hero skill
            // REQ: heroId, skillId, level
            // RES: updated skill data
            logger.info('HERO', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'activeSkin':
            // TODO: Activate a hero skin for display
            // REQ: heroId, skinId
            // RES: updated skin status
            logger.info('HERO', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'autoHeroBreak':
            // TODO: Auto-perform hero breakthrough using available materials
            // REQ: heroId
            // RES: breakthrough result, new level
            logger.info('HERO', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'autoLevelUp':
            // TODO: Auto level up hero using available exp materials
            // REQ: heroId
            // RES: new hero level, remaining materials
            logger.info('HERO', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'cancelQigong':
            // TODO: Cancel ongoing qigong (meditation) training
            // REQ: heroId
            // RES: cancelled qigong data
            logger.info('HERO', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'evolve':
            // TODO: Evolve hero to next star/quality tier
            // REQ: heroId
            // RES: evolved hero data
            logger.info('HERO', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'heroBreak':
            // TODO: Perform hero breakthrough to raise level cap
            // REQ: heroId, material items
            // RES: new level cap, updated hero
            logger.info('HERO', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'inherit':
            // TODO: Inherit stats from one hero to another
            // REQ: sourceHeroId, targetHeroId
            // RES: inheritance result
            logger.info('HERO', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'qigong':
            // TODO: Start qigong (meditation) training for hero
            // REQ: heroId, slotId
            // RES: qigong training data
            logger.info('HERO', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'reborn':
            // TODO: Reborn hero to reset and reclaim resources
            // REQ: heroId
            // RES: returned materials, reset hero
            logger.info('HERO', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'rebornSelfBreak':
            // TODO: Reborn hero self-breakthrough stats
            // REQ: heroId
            // RES: returned materials, updated hero
            logger.info('HERO', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'resolve':
            // TODO: Resolve/decompose hero into soul shards
            // REQ: heroId
            // RES: obtained soul shards
            logger.info('HERO', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'saveQigong':
            // TODO: Save and claim qigong training results
            // REQ: heroId, slotId
            // RES: saved qigong rewards
            logger.info('HERO', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'splitHero':
            // TODO: Split duplicate hero into soul fragments
            // REQ: heroId
            // RES: obtained fragments
            logger.info('HERO', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'useSkin':
            // TODO: Equip/use a specific hero skin
            // REQ: heroId, skinId
            // RES: updated active skin
            logger.info('HERO', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'wakeUp':
            // TODO: Awaken hero to unlock higher potential
            // REQ: heroId, materials
            // RES: awakened hero data
            logger.info('HERO', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'getAttrs':
            // TODO: Get hero attribute details
            // REQ: heroId
            // RES: hero attributes (hp, atk, def, etc.)
            logger.info('HERO', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'queryArenaHeroEquipInfo':
            // TODO: Query hero equipment info for arena
            // REQ: heroId
            // RES: arena hero equip details
            logger.info('HERO', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        case 'queryHeroEquipInfo':
            // TODO: Query hero equipment information
            // REQ: heroId
            // RES: hero equipment list and details
            logger.info('HERO', 'action=' + action + ' userId=' + (userId || '-'));
            callback(RH.success({}));
            break;

        default:
            logger.warn('HERO', 'Unknown action: ' + action);
            callback(RH.error(RH.ErrorCode.INVALID_COMMAND, 'Unknown action: ' + action));
            break;
    }
}

module.exports = { handle: handle };
