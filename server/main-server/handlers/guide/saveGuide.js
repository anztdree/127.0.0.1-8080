/**
 * handlers/guide/saveGuide.js
 *
 * Client request (line 120624-120631):
 *   type: 'guide', action: 'saveGuide'
 *   userId: string
 *   guideType: o.tutorialLine  (tutorial line identifier)
 *   step: e                    (current step number)
 *   version: '1.0'
 *
 * Client callback (line 120631-120635):
 *   Success → Logger.serverDebugLog('成功')
 *   Fail    → Logger.serverDebugLog('失败')
 *   Callback does NOT read response data — only cares about ret code.
 *
 * Client enterGame loads guide (line 120569-120575):
 *   GuideInfoManager.setGuideInfo(e.guide)
 *   → reads e._id, iterates e._steps → copies to local guideInfo._steps
 *
 * Implementation: save guide progress to userJson module 'guide'.
 *   Structure: { _id: userId, _steps: { "<guideType>": stepId } }
 */

module.exports = {
    execute: function (data, socket, ctx) {
        return new Promise(function (resolve) {
            try {
                var userId = data.userId;
                if (!userId) return resolve(ctx.buildErrorResponse(1));

                var guideType = data.guideType;
                var step = data.step;

                // Load existing guide data
                var guideData = ctx.db.getJsonModule(userId, 'guide') || {};

                // Update step inside _steps — NOT at root level!
                // Client setGuideInfo (line 120574): for (var n in e._steps)
                // Root-level keys are NEVER read by client.
                if (guideType !== undefined && guideType !== null) {
                    if (!guideData._steps) guideData._steps = {};
                    guideData._steps[String(guideType)] = step;
                }

                // Save back
                ctx.db.setJsonModule(userId, 'guide', guideData);

                resolve(ctx.buildResponse({}));
            } catch (err) {
                console.error('[guide/saveGuide] Error:', err);
                resolve(ctx.buildErrorResponse(1));
            }
        });
    }
};
