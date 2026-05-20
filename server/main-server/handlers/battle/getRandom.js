/**
 * getRandom.js — Handler: battle/getRandom
 *
 * ═══════════════════════════════════════════════════════════════
 * DEEP TRACE — main.min.js (100% verified) + HAR (4 samples)
 * ═══════════════════════════════════════════════════════════════
 *
 * CALLER — L102452-102462:
 *   ts.processHandler({
 *       type: 'battle',
 *       action: 'getRandom',
 *       userId: UserInfoSingleton.getInstance().userId,
 *       battleId: UserInfoSingleton.getInstance().battleId,
 *       count: e,                    // always 100
 *       version: '1.0'
 *   }, function (e) {
 *       t(e._rand);                  // callback receives _rand array
 *   });
 *
 * CONSUMER — L74137-74162 (RandomManager):
 *   addRandomList(a)  → stores all 100 randoms in randomNumCache[]
 *   getOneRandom()    → returns randomNumCache[currentIndex++],
 *                        truncated to 5 decimal places:
 *                        Math.round(100000 * a) / 100000
 *   getRandomIndex(n) → Math.floor(n * getOneRandom()) — pick [0, n)
 *   Wraps around when cache exhausted (currentIndex >= length → 0)
 *   THROWS "随机数队列为空" if cache is empty → BATTLE CRASH
 *
 * HAR VERIFICATION (4 samples):
 *   Sample 1: battleId=4d6a80bf..., _rand length=100
 *     first: 0.21066719052616323, avg: 0.467034
 *   Sample 2: battleId=dbc1b37b..., _rand length=100
 *     min: 0.00574, max: 0.99009, avg: 0.494448
 *   Sample 3: battleId=2fc723e7..., _rand length=100
 *     min: 0.02617, max: 0.99499, avg: 0.488211
 *   Sample 4: battleId=da621287..., _rand length=100
 *     min: 0.01906, max: 0.98679, avg: 0.518741
 *   ALL: uniform distribution [0,1), ~16 decimal places, Math.random()
 *
 * FLOW:
 *   1. Client: hangup::startGeneral → gets battleId
 *   2. Client: battle::getRandom {battleId, count:100} → gets _rand[100]
 *   3. Client: uses _rand for BattleEngine simulation
 *   4. Client: hangup::checkBattleResult {battleId, ...} → gets rewards
 *
 * SECURITY:
 *   - battleId MUST be validated (was issued by startGeneral)
 *   - One battleId should only get one getRandom call
 *   - Server controls random seed → client cannot manipulate outcome
 *
 * ═══════════════════════════════════════════════════════════════
 * STRICT RULES: NO STUB, OVERRIDE, FORCE, BYPASS, DUMMY, ASUMSI
 * ═══════════════════════════════════════════════════════════════
 */

function handleGetRandom(request, ctx) {
    var userId = request.userId;
    var battleId = request.battleId;
    var count = request.count || 100;
    var version = request.version || '1.0';

    // ═══════════════════════════════════════════════════════════════
    // STEP 1: Validate request fields
    // ═══════════════════════════════════════════════════════════════
    ctx.logger.step(1, 5, 'Validate request', 'running');
    ctx.logger.details('request',
        ['userId', userId ? userId.substring(0, 20) : 'MISSING'],
        ['battleId', battleId ? battleId.substring(0, 20) + '...' : 'MISSING'],
        ['count', String(count)],
        ['version', version]
    );

    if (!userId) {
        ctx.logger.step(1, 5, 'Validate request', 'fail', 'userId MISSING');
        return ctx.buildErrorResponse(8);
    }

    if (!battleId) {
        ctx.logger.step(1, 5, 'Validate request', 'fail', 'battleId MISSING');
        return ctx.buildErrorResponse(8);
    }

    if (typeof count !== 'number' || count <= 0 || count > 1000) {
        ctx.logger.step(1, 5, 'Validate request', 'fail',
            'count INVALID: ' + count + ' (must be 1-1000)');
        return ctx.buildErrorResponse(8);
    }

    ctx.logger.step(1, 5, 'Validate request', 'pass');

    // ═══════════════════════════════════════════════════════════════
    // STEP 2: Validate battleId — must exist in battleSessions
    // ═══════════════════════════════════════════════════════════════
    ctx.logger.step(2, 5, 'Validate battleId', 'running');

    var battleSession = null;
    if (ctx.battleSessions && ctx.battleSessions.has(battleId)) {
        battleSession = ctx.battleSessions.get(battleId);
    }

    if (!battleSession) {
        ctx.logger.step(2, 5, 'Validate battleId', 'fail',
            'battleId ' + battleId.substring(0, 12) + '... NOT FOUND in active sessions');
        ctx.logger.details('impact',
            ['hint', 'battleId must be issued by hangup::startGeneral first'],
            ['flow', 'startGeneral → getRandom → checkBattleResult']
        );
        return ctx.buildErrorResponse(8);
    }

    // Verify userId matches the session owner
    if (battleSession.userId !== userId) {
        ctx.logger.step(2, 5, 'Validate battleId', 'fail',
            'userId MISMATCH: request=' + userId.substring(0, 16) +
            ' vs session=' + battleSession.userId.substring(0, 16));
        return ctx.buildErrorResponse(8);
    }

    // Check if random already used for this battle
    if (battleSession.randomUsed) {
        ctx.logger.step(2, 5, 'Validate battleId', 'fail',
            'battleId ' + battleId.substring(0, 12) + '... already used for getRandom');
        ctx.logger.details('security',
            ['reason', 'One battleId should only get one getRandom call (anti-cheat)'],
            ['createdAt', new Date(battleSession.createdAt).toISOString()]
        );
        return ctx.buildErrorResponse(8);
    }

    ctx.logger.step(2, 5, 'Validate battleId', 'pass',
        'battleId=' + battleId.substring(0, 12) + '... lesson=' + battleSession.lessonId);

    // ═══════════════════════════════════════════════════════════════
    // STEP 3: Generate random numbers
    // ═══════════════════════════════════════════════════════════════
    ctx.logger.step(3, 5, 'Generate randoms', 'running');

    // Generate count random floats in [0, 1)
    // Using Math.random() — same as original server (HAR verified: ~16 decimal places)
    var randArray = [];
    var min = 1.0, max = 0.0, sum = 0.0;
    for (var i = 0; i < count; i++) {
        var r = Math.random();
        randArray.push(r);
        if (r < min) min = r;
        if (r > max) max = r;
        sum += r;
    }
    var avg = sum / count;

    ctx.logger.details('randoms',
        ['count', String(count)],
        ['min', min.toFixed(6)],
        ['max', max.toFixed(6)],
        ['avg', avg.toFixed(6)],
        ['first5', randArray.slice(0, 5).map(function(v) { return v.toFixed(6); }).join(', ')],
        ['precision', '~16 decimal places (Math.random)']
    );

    ctx.logger.step(3, 5, 'Generate randoms', 'pass',
        count + ' randoms generated (avg=' + avg.toFixed(4) + ')');

    // ═══════════════════════════════════════════════════════════════
    // STEP 4: Mark battle session as random-used
    // ═══════════════════════════════════════════════════════════════
    ctx.logger.step(4, 5, 'Update session', 'running');

    if (battleSession) {
        battleSession.randomUsed = true;
        battleSession.randomGeneratedAt = Date.now();

        ctx.logger.details('session',
            ['battleId', battleId.substring(0, 12) + '...'],
            ['randomUsed', 'true'],
            ['nextStep', 'hangup::checkBattleResult']
        );
    }

    ctx.logger.step(4, 5, 'Update session', 'pass');

    // ═══════════════════════════════════════════════════════════════
    // STEP 5: Build response
    // ═══════════════════════════════════════════════════════════════
    ctx.logger.step(5, 5, 'Build response', 'running');

    var responseData = {
        _rand: randArray
    };

    // ─── Type Assertions ───
    ctx.logger.typeAssert('responseData._rand', responseData._rand, 'object', {
        context: 'GET-RANDOM',
        trace: 'L102462: t(e._rand) — callback receives array',
        impact: 'Wrong type -> RandomManager.addRandomList fails -> battle crash'
    });

    ctx.logger.invariantCheck(
        '_rand has exactly ' + count + ' elements',
        responseData._rand.length === count,
        {
            context: 'GET-RANDOM',
            expect: '_rand.length === ' + count,
            actual: '_rand.length = ' + responseData._rand.length,
            trace: 'L102458: count: e (client always sends 100)',
            impact: 'Wrong count -> battle simulation uses wrong random sequence'
        }
    );

    ctx.logger.invariantCheck(
        'All _rand values are in [0, 1)',
        responseData._rand.every(function(v) { return v >= 0 && v < 1; }),
        {
            context: 'GET-RANDOM',
            expect: '0 <= v < 1 for all values',
            actual: 'min=' + min.toFixed(6) + ' max=' + max.toFixed(6),
            trace: 'L74155: Math.floor(a * b) requires [0,1) range',
            impact: 'Value >= 1 -> getRandomIndex could return out-of-bounds index'
        }
    );

    ctx.logger.invariantCheck(
        'All _rand values are numbers',
        responseData._rand.every(function(v) { return typeof v === 'number' && !isNaN(v); }),
        {
            context: 'GET-RANDOM',
            expect: 'typeof v === "number" for all values',
            actual: 'verified: Math.random() returns number',
            trace: 'L74152: this.randomNumCache.push(a[b])',
            impact: 'NaN in array -> battle calculations produce NaN -> broken'
        }
    );

    ctx.logger.step(5, 5, 'Build response', 'pass');

    // ─── Summary ───
    ctx.logger.responseSnapshot('GET RANDOM ret=0', {
        _rand_length: randArray.length,
        _rand_first3: randArray.slice(0, 3),
        _rand_avg: avg.toFixed(6)
    });

    ctx.logger.summaryCard({
        title: 'GET RANDOM',
        userId: userId,
        battleId: battleId.substring(0, 12) + '...',
        count: count,
        avg: avg.toFixed(4),
        min: min.toFixed(4),
        max: max.toFixed(4)
    });

    return ctx.buildDataResponse(0, responseData);
}

module.exports = handleGetRandom;
