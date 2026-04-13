'use strict';

var RH = require('../../shared/responseHelper');

/**
 * Hero Image Handler
 * Port 8001 — Main Server
 *
 * Actions: 6 total
 * WRITE: 2 | READ: 4
 *
 * Source: main.min.js client analysis
 */

function handle(socket, parsed, callback) {
    var action = parsed.action;
    var userId = parsed.userId;

    switch (action) {
        // === WRITE ACTIONS ===

        case 'addComment':
            // TODO: WRITE — Post a comment on a hero's story/image page (social feature)
            // REQ: heroId, heroVersion, commentText
            // RES: _changeInfo._commentData (updated comment list with new entry),
            //      _commentId (newly created comment id)
            callback(RH.success({}));
            break;

        case 'likeComment':
            // TODO: WRITE — Like/upvote a specific comment on a hero's page
            // REQ: heroId, commentId
            // RES: _changeInfo._commentData (updated like count on comment),
            //      _likedComments[] (user's liked comment ids)
            callback(RH.success({}));
            break;

        case 'unlikeComment':
            // TODO: WRITE — Remove like/downvote a previously liked comment
            // REQ: heroId, commentId
            // RES: _changeInfo._commentData (updated like count on comment),
            //      _likedComments[] (user's liked comment ids, id removed)
            callback(RH.success({}));
            break;

        // === READ ACTIONS ===

        case 'getAll':
            // TODO: READ — Get the full hero image/illustration gallery list (all heroes' images)
            // REQ: (none)
            // RES: _heroImageList [{ _heroId, _heroName, _imageUrl, _version, _isUnlocked }]
            callback(RH.success({}));
            break;

        case 'getComments':
            // TODO: READ — Get paginated comments for a specific hero's story/image page
            // REQ: heroId, heroVersion, pageIndex, pageSize
            // RES: _commentList [{ _commentId, _userId, _userName, _headImage, _content,
            //                     _timestamp, _likeCount, _isLiked }],
            //      _totalComments, _totalPages
            callback(RH.success({}));
            break;

        case 'readHeroVersion':
            // TODO: READ — Read a specific hero's story version/chapter content
            // REQ: heroId, heroVersion
            // RES: _heroVersionData { _heroId, _version, _title, _content, _illustrations[],
            //                         _isRead, _unlockCondition, _nextVersion }
            callback(RH.success({}));
            break;

        default:
            console.warn('[HERO_IMAGE] Unknown action: ' + action);
            callback(RH.success({}));
    }
}

module.exports = { handle: handle };
