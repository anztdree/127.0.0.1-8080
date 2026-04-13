'use strict';

var RH = require('../../shared/responseHelper');

/**
 * Backpack Handler
 * Port 8001 — Main Server
 *
 * Actions: 5 total
 * WRITE: 5 | READ: 0
 *
 * REQ params: itemId, num/itemNum, userId, version
 *
 * Source: main.min.js client analysis
 */

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        // === WRITE ACTIONS ===

        case 'openBox':
            // TODO: WRITE — Open a loot box / treasure chest item from the backpack, generating random rewards
            // REQ: itemId (box/chest item id), num (number of boxes to open), userId, version
            // RES: _changeInfo._items (box items consumed, new reward items added),
            //      _changeInfo._heros (if box yields hero shards or heroes),
            //      _changeInfo._accountInfo (gold/diamond/soul if included),
            //      _openBoxResults[] (array of reward previews for client animation)
            callback(RH.success({}));
            break;

        case 'plus':
            // TODO: WRITE — Combine/merge stackable items (e.g., merge fragments, shards) into higher-tier items
            // REQ: itemId (fragment/shard item id), num (quantity to merge), userId, version
            // RES: _changeInfo._items (fragment items consumed, merged item added),
            //      _mergeResult { _itemId, _num, _fromItems[] }
            callback(RH.success({}));
            break;

        case 'randSummons':
            // TODO: WRITE — Perform a random summon/pull using a specific summon item (e.g., pull ticket from backpack)
            // REQ: itemId (summon ticket/scroll item id), num (number of pulls), userId, version
            // RES: _changeInfo._items (ticket items consumed, gained items/heroes added),
            //      _changeInfo._heros (if summons yield hero shards or heroes),
            //      _summonResults[] (array of summoned item/hero previews for animation),
            //      _changeInfo._summonData (counter updated)
            callback(RH.success({}));
            break;

        case 'sell':
            // TODO: WRITE — Sell items from the backpack in exchange for gold currency
            // REQ: itemId (item to sell), num (quantity to sell), userId, version
            // RES: _changeInfo._items (sold items removed),
            //      _changeInfo._accountInfo._gold (gold earned from sale),
            //      _sellResult { _itemId, _num, _goldGained }
            callback(RH.success({}));
            break;

        case 'useItem':
            // TODO: WRITE — Use/consume an item from the backpack (e.g., exp potion, stamina fruit, skill book)
            // REQ: itemId (item to use), itemNum (quantity to use), userId, version
            // RES: _changeInfo._items (used items consumed),
            //      _changeInfo._accountInfo (affected stats: stamina, gold, etc.),
            //      _changeInfo._heros (if item targets a specific hero and boosts it),
            //      _useResult { _itemId, _itemNum, _effects[] }
            callback(RH.success({}));
            break;

        default:
            console.warn('[BACKPACK] Unknown action: ' + action);
            callback(RH.success({}));
    }
}

module.exports = { handle: handle };
