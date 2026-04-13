'use strict';

var RH = require('../../shared/responseHelper');

/**
 * Hero Handler
 * Port 8001 — Main Server
 *
 * Actions: 20 total
 * WRITE: 18 | READ: 2
 *
 * Source: main.min.js client analysis
 */

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        // === WRITE ACTIONS ===

        case 'activeHeroBreak':
            // TODO: WRITE — Activate/trigger hero breakthrough, consuming materials to raise star tier
            // REQ: heroId, heroUid, materialList[]
            // RES: _changeInfo._heros (updated hero with new star/breakthrough level),
            //      _changeInfo._items (consumed materials)
            callback(RH.success({}));
            break;

        case 'activeSkill':
            // TODO: WRITE — Activate a locked skill on a hero (unlock skill slot)
            // REQ: heroId, heroUid, skillId, materialList[]
            // RES: _changeInfo._heros (updated hero skill list),
            //      _changeInfo._items (consumed materials)
            callback(RH.success({}));
            break;

        case 'activeSkin':
            // TODO: WRITE — Activate/equip a skin on a hero, marking it as in-use
            // REQ: heroId, heroUid, skinId
            // RES: _changeInfo._heros (updated activeSkin field),
            //      _changeInfo._skinData
            callback(RH.success({}));
            break;

        case 'autoHeroBreak':
            // TODO: WRITE — Auto hero breakthrough: use optimal materials from inventory to max-breakthrough a hero
            // REQ: heroId, heroUid
            // RES: _changeInfo._heros (hero with new breakthrough level),
            //      _changeInfo._items (consumed materials)
            callback(RH.success({}));
            break;

        case 'autoLevelUp':
            // TODO: WRITE — Auto level up: consume hero soul/exp items from inventory to max level a hero
            // REQ: heroId, heroUid
            // RES: _changeInfo._heros (hero with updated level/exp),
            //      _changeInfo._items (consumed items),
            //      _changeInfo._heroSoul
            callback(RH.success({}));
            break;

        case 'cancelQigong':
            // TODO: WRITE — Cancel an ongoing qigong/cultivation session for a hero, reclaiming partial resources
            // REQ: heroId, heroUid
            // RES: _changeInfo._heros (hero qigong state reset),
            //      _changeInfo._qigongData,
            //      _changeInfo._items (refunded materials)
            callback(RH.success({}));
            break;

        case 'evolve':
            // TODO: WRITE — Evolve a hero to a higher tier/grade form (e.g., 2★ → 3★)
            // REQ: heroId, heroUid, consumeHeroUid (hero to sacrifice)
            // RES: _changeInfo._heros (evolved hero with new tier),
            //      _changeInfo._items (returned duplicate materials)
            callback(RH.success({}));
            break;

        case 'heroBreak':
            // TODO: WRITE — Perform a single hero breakthrough step (incremental star upgrade)
            // REQ: heroId, heroUid, breakLevel
            // RES: _changeInfo._heros (hero with updated break/star level),
            //      _changeInfo._items (consumed materials)
            callback(RH.success({}));
            break;

        case 'inherit':
            // TODO: WRITE — Inherit levels/stats from one hero to another (sacrifice source, boost target)
            // REQ: sourceHeroUid, targetHeroId, targetHeroUid
            // RES: _changeInfo._heros (target hero with boosted level,
            //      source hero removed),
            //      _changeInfo._items (inherited materials returned)
            callback(RH.success({}));
            break;

        case 'qigong':
            // TODO: WRITE — Start qigong/cultivation training for a hero to boost stats over time
            // REQ: heroId, heroUid, qigongType, slotIndex
            // RES: _changeInfo._heros (hero qigong state updated),
            //      _changeInfo._qigongData
            callback(RH.success({}));
            break;

        case 'reborn':
            // TODO: WRITE — Reborn/reincarnate a hero: reset level, return invested materials, increase reborn count for bonus
            // REQ: heroId, heroUid
            // RES: _changeInfo._heros (reborned hero with reset level, incremented reborn count),
            //      _changeInfo._items (returned investment materials),
            //      _changeInfo._heroSoul
            callback(RH.success({}));
            break;

        case 'rebornSelfBreak':
            // TODO: WRITE — Reborn self-breakthrough: reset a hero's own breakthrough and return breakthrough materials
            // REQ: heroId, heroUid
            // RES: _changeInfo._heros (hero with reset breakthrough level),
            //      _changeInfo._items (returned breakthrough materials)
            callback(RH.success({}));
            break;

        case 'resolve':
            // TODO: WRITE — Resolve/dissolve a hero into fragments, shards, or hero soul currency
            // REQ: heroId, heroUid
            // RES: _changeInfo._heros (hero removed),
            //      _changeInfo._items (gained shards/soul items),
            //      _changeInfo._heroSoul
            callback(RH.success({}));
            break;

        case 'saveQigong':
            // TODO: WRITE — Save/confirm a qigong/cultivation session result, locking in stat gains
            // REQ: heroId, heroUid, slotIndex
            // RES: _changeInfo._heros (hero with permanent stat boost applied),
            //      _changeInfo._qigongData
            callback(RH.success({}));
            break;

        case 'splitHero':
            // TODO: WRITE — Split/extract a hero into component shards (reverse of evolve)
            // REQ: heroId, heroUid
            // RES: _changeInfo._heros (hero removed or downgraded),
            //      _changeInfo._items (gained hero shards)
            callback(RH.success({}));
            break;

        case 'useSkin':
            // TODO: WRITE — Use/apply a skin item from inventory to a specific hero
            // REQ: heroId, heroUid, skinItemId
            // RES: _changeInfo._heros (hero skin updated),
            //      _changeInfo._items (consumed skin item),
            //      _changeInfo._skinData
            callback(RH.success({}));
            break;

        case 'wakeUp':
            // TODO: WRITE — Awaken/wake up a hero to unlock awakening skills or passive bonuses
            // REQ: heroId, heroUid, materialList[]
            // RES: _changeInfo._heros (hero with awakening state/level updated),
            //      _changeInfo._items (consumed materials)
            callback(RH.success({}));
            break;

        // === READ ACTIONS ===

        case 'getAttrs':
            // TODO: READ — Get the computed attribute/stats for a specific hero (base + equip + qigong + buffs)
            // REQ: heroId, heroUid
            // RES: _heroAttrs { _hp, _atk, _def, _spd, _critRate, _critDmg, _resist, ... }
            callback(RH.success({}));
            break;

        case 'queryArenaHeroEquipInfo':
            // TODO: READ — Query hero equipment info specifically for arena defense team display
            // REQ: teamHeroList[] (list of heroUids in arena defense)
            // RES: _arenaHeroEquipList [{ _heroUid, _heroId, _equipList, _skinId, _attrs }]
            callback(RH.success({}));
            break;

        case 'queryHeroEquipInfo':
            // TODO: READ — Query equipment details for one or more heroes (full equip list per hero)
            // REQ: heroUidList[] or heroUid
            // RES: _heroEquipList [{ _heroUid, _heroId, _equipList [{ _equipId, _level, _refineLevel, _mainAttr, _subAttrs }], _power }]
            callback(RH.success({}));
            break;

        default:
            console.warn('[HERO] Unknown action: ' + action);
            callback(RH.success({}));
    }
}

module.exports = { handle: handle };
