'use strict';

var RH = require('../../shared/responseHelper');

/**
 * Summon Handler
 * Port 8001 — Main Server
 *
 * Actions: 6 total
 * WRITE: 4 | READ: 2
 *
 * REQ params: sType, userId, version, isGuide
 *
 * Source: main.min.js client analysis
 */

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        // === WRITE ACTIONS ===

        case 'setWishList':
            // TODO: WRITE — Set/update the player's wish list picks for a summon banner (increases rates for chosen heroes)
            // REQ: sType (summon banner type), userId, version, wishList[] (hero ids to add to wish list)
            // RES: _changeInfo._summonData (wish list saved),
            //      _changeInfo._gachaWishList (updated wish picks),
            //      _wishListConfirm { _sType, _wishList[] }
            callback(RH.success({}));
            break;

        case 'summonOne':
            // TODO: WRITE — Perform a single summon pull on a specific banner, consuming premium currency
            // REQ: sType (summon banner type), userId, version, isGuide (boolean, true if tutorial summon)
            // RES: _changeInfo._summonData (pull counter updated, pity counter incremented),
            //      _changeInfo._diamond (diamond cost deducted, unless isGuide),
            //      _changeInfo._items (new hero shards/items added),
            //      _changeInfo._heros (if full hero pulled),
            //      _summonResult { _sType, _results[{ _heroId, _heroUid, _shardCount, _rarity, _isNew }] }
            callback(RH.success({}));
            break;

        case 'summonOneFree':
            // TODO: WRITE — Perform a free single summon pull (daily free pull or timer-based free pull)
            // REQ: sType (summon banner type), userId, version, isGuide (boolean)
            // RES: _changeInfo._summonData (pull counter updated, free pull timer reset),
            //      _changeInfo._items (new hero shards/items added),
            //      _changeInfo._heros (if full hero pulled),
            //      _summonResult { _sType, _results[{ _heroId, _heroUid, _shardCount, _rarity, _isNew }] },
            //      _nextFreeTime
            callback(RH.success({}));
            break;

        case 'summonTen':
            // TODO: WRITE — Perform a 10-pull summon (guaranteed at least one high-rarity result), consuming premium currency
            // REQ: sType (summon banner type), userId, version, isGuide (boolean)
            // RES: _changeInfo._summonData (10 pulls added to counter, pity updated),
            //      _changeInfo._diamond (diamond cost deducted, typically 10-pull discount),
            //      _changeInfo._items (new hero shards/items added),
            //      _changeInfo._heros (if full heroes pulled),
            //      _summonResult { _sType, _results[10x { _heroId, _heroUid, _shardCount, _rarity, _isNew }],
            //                   _guaranteedHighRarity (boolean) }
            callback(RH.success({}));
            break;

        // === READ ACTIONS ===

        case 'readWishList':
            // TODO: READ — Get the player's current wish list configuration for a specific summon banner
            // REQ: sType (summon banner type), userId, version
            // RES: _wishList { _sType, _wishList[{ _heroId, _heroName, _rarity, _isOwned, _shardCount }],
            //                 _maxWishSlots, _usedWishSlots }
            callback(RH.success({}));
            break;

        case 'summonEnergy':
            // TODO: READ — Get the player's current summon energy/resources and banner-specific info (pity counters, rates)
            // REQ: sType (summon banner type), userId, version
            // RES: _summonEnergyInfo { _sType, _bannerName, _bannerHeroPool[],
            //                         _pityCounter, _pityThreshold, _guaranteeThreshold,
            //                         _totalPulls, _freeSummonAvailable, _nextFreeTime,
            //                         _diamondCost, _tenPullDiscountCost, _bannerEndTime }
            callback(RH.success({}));
            break;

        default:
            console.warn('[SUMMON] Unknown action: ' + action);
            callback(RH.success({}));
    }
}

module.exports = { handle: handle };
