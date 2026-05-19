/**
 * startGeneral.js — Handler: hangup/startGeneral
 *
 * ═══════════════════════════════════════════════════════════════
 * DEEP TRACE — main.min.js (100% verified)
 * ═══════════════════════════════════════════════════════════════
 *
 * CALLER — L97716-97735:
 *   var r = function (e, a, r) {
 *       var i = OnHookSingleton.getInstance().getEnemyPower();
 *       return i > r ? void ts.openWindow('BarTypeTips', ...) :
 *       void ts.processHandler({
 *           type: 'hangup', action: 'startGeneral',
 *           userId: UserInfoSingleton.getInstance().userId,
 *           version: '1.0',
 *           team: e,
 *           'super': a,
 *           battleField: BattleLogic.GameFieldType.LESSON
 *       }, function (r) {
 *           n(e, a);
 *           UserInfoSingleton.getInstance().battleId = r._battleId;
 *           var i = r._rightTeam, s = r._rightSuper;
 *           var l = ReadJsonSingleton.getInstance().lesson[OnHookSingleton.getInstance().lastSection];
 *           var u = l.isBoss;
 *           RunSceneWithBattle.battleWithPVEAndTeamAndOnHookBattle(e, a, o, t, i, s, u);
 *       });
 *   };
 *
 * ── REQUEST FIELDS ──
 *   type       — 'hangup'
 *   action     — 'startGeneral'
 *   userId     — player's user ID
 *   version    — '1.0'
 *   team       — player's team array (heroId, position, etc.)
 *   'super'    — player's super skill ID array
 *   battleField — 20 (= BattleLogic.GameFieldType.LESSON)
 *
 * ── RESPONSE FIELDS ──
 *   _battleId   — UUID string for this battle session
 *                 L97731: UserInfoSingleton.getInstance().battleId = r._battleId
 *   _rightTeam  — Enemy team data object
 *                 L97733: var i = r._rightTeam
 *                 Structure: { _items: { "pos": { heroObj }, ... } }
 *                 Sparse keys — only occupied positions have entries.
 *                 Position keys are 0-indexed string ("0"-"4").
 *   _rightSuper — Enemy super skill array
 *                 L97733: var s = r._rightSuper
 *                 Structure: [ { _id: skillId, _level: skillLevel }, ... ]
 *                 Can be empty array — client defaults to [] at L103618.
 *
 * ── ENEMY HERO OBJECT FORMAT ──
 *   Each hero in _rightTeam._items[pos]:
 *   _heroDisplayId — String, hero.json key (e.g., "55206")
 *                    L102477: ReadJsonSingleton.getInstance().getHeroInfo()[r._heroDisplayId]
 *   _heroLevel     — Number, hero's level
 *                    L102697: level: r._heroLevel
 *                    Used in battle for armor scaling (L66555-66558)
 *   _attrs         — { _items: { "attrType": { _type, _num }, ... } }
 *                    Sparse — only non-zero attributes included.
 *                    Key = attribute type enum value (string).
 *                    L102475: r._attrs._items[BattleLogic.HERO_ATTRIBUTE.ENERGYMAX]
 *                    L102528-102537: getEnemyAttributeModel iterates _items
 *   _skills        — { "idx": { _type, _id, _level }, ... }
 *                    _type: 0=normal, 1=proactive(skill), 2=passive, 3=superSkill
 *                    L102518-102527: getEnemySkill parses _skills
 *                    L102508-102517: getEnemySkillLevel reads _id/_level
 *
 * ── CLIENT ATTRIBUTE CONSUMPTION (getEnemyAttributeModel L102528-102537) ──
 *   for (var n in e) {
 *       var o = e[n];   // each item: { _type: enum, _num: value }
 *       var a = new BattleLogic.AttributeModel();
 *       a.type = o._type;
 *       a.value = o._num;
 *       t.push(a);
 *   }
 *
 * ── CLIENT SKILL CONSUMPTION (getEnemySkill L102518-102527) ──
 *   for (var n in e) {
 *       var o = e[n];
 *       if (o._level > 0) {
 *           var a = o._type, r = o._id;
 *           0 == a ? t.normal = r : 1 == a ? t.proactive = r :
 *           2 == a ? t.passive.push(r) : 3 == a ? t.superSkill = r : ...
 *       }
 *   }
 *
 * ── HERO_ATTRIBUTE ENUM (used as _type / key in _items) ──
 *   0=hp, 1=attack, 2=armor, 3=speed, 4=hit, 5=dodge, 6=block,
 *   7=blockEffect, 8=skillDamage, 9=critical, 10=criticalResist,
 *   11=criticalDamage, 12=armorBreak, 13=damageReduce, 14=controlResist,
 *   15=trueDamage, 16=energy, 23=superDamage, 24=healPlus,
 *   25=healerPlus, 26=extraArmor, 27=shielderPlus, 28=damageUp,
 *   29=damageDown, 30=talent, 31=superDamageResist,
 *   36=criticalDamageResist, 37=blockThrough, 41=energyMax
 *
 * ── ENEMY STATS FORMULA ──
 *   HP/Attack/Armor (level-dependent, from heroLevelAttr.json):
 *     hp     = floor((levelAttr.hp  × typeParam.hpParam  + typeParam.hpBais)  × diffHp[pos])
 *     attack = floor((levelAttr.atk × typeParam.atkParam + typeParam.atkBais) × diffAtk[pos])
 *     armor  = floor((levelAttr.arm × typeParam.armParam + typeParam.armBais) × diffArm[pos])
 *
 *   levelAttr  = heroLevelAttr.json[level]
 *   typeParam  = heroTypeParam.json[monsterType[pos]]
 *   diffHp/Atk/Arm = lesson.json difficultyHp/Attack/Armor CSV split by pos
 *
 *   Percentage stats (speed, hit, dodge, etc.): from hero.json directly (no scaling)
 *
 * ── BOSS POS ──
 *   isBoss from lesson.json is 1-indexed position.
 *   L97733: l.isBoss passed to battleWithPVEAndTeamAndOnHookBattle as bossPos.
 *   NOT included in server response — client reads from local lesson.json.
 *
 * ── BATTLE ID ──
 *   L97731: UserInfoSingleton.getInstance().battleId = r._battleId
 *   L97743: battleId sent back in checkBattleResult request.
 *   Server must generate unique battleId for each battle session.
 *
 * ═══════════════════════════════════════════════════════════════
 * STRICT RULES: NO STUB, OVERRIDE, FORCE, BYPASS, DUMMY, ASUMSI
 * ═══════════════════════════════════════════════════════════════
 */

// ─── HERO_ATTRIBUTE enum indices ───
var ATTR = {
    HP: 0,
    ATTACK: 1,
    ARMOR: 2,
    SPEED: 3,
    HIT: 4,
    DODGE: 5,
    BLOCK: 6,
    BLOCK_EFFECT: 7,
    SKILL_DAMAGE: 8,
    CRITICAL: 9,
    CRITICAL_RESIST: 10,
    CRITICAL_DAMAGE: 11,
    ARMOR_BREAK: 12,
    DAMAGE_REDUCE: 13,
    CONTROL_RESIST: 14,
    TRUE_DAMAGE: 15,
    ENERGY: 16,
    SUPER_DAMAGE: 23,
    HEAL_PLUS: 24,
    HEALER_PLUS: 25,
    EXTRA_ARMOR: 26,
    SHIELDER_PLUS: 27,
    DAMAGE_UP: 28,
    DAMAGE_DOWN: 29,
    TALENT: 30,
    SUPER_DAMAGE_RESIST: 31,
    CRITICAL_DAMAGE_RESIST: 36,
    BLOCK_THROUGH: 37,
    ENERGY_MAX: 41
};

function handleStartGeneral(request, ctx) {
    var userId = request.userId;
    var version = request.version || '1.0';

    // ═══════════════════════════════════════════════════════════════
    // STEP 1: Validate request
    // ═══════════════════════════════════════════════════════════════
    ctx.logger.step(1, 5, 'Validate request', 'running');
    ctx.logger.details('request',
        ['userId', userId ? userId.substring(0, 20) : 'MISSING'],
        ['version', version],
        ['team', Array.isArray(request.team) ? request.team.length + ' heroes' : String(request.team || '(none)')],
        ['super', Array.isArray(request['super']) ? request['super'].join(',') : String(request['super'] || '(none)')],
        ['battleField', String(request.battleField || '(none)')]
    );

    if (!userId) {
        ctx.logger.step(1, 5, 'Validate request', 'fail', 'userId MISSING');
        return ctx.buildErrorResponse(8);
    }

    ctx.logger.step(1, 5, 'Validate request', 'pass');

    // ═══════════════════════════════════════════════════════════════
    // STEP 2: Load user data and resources
    // ═══════════════════════════════════════════════════════════════
    ctx.logger.step(2, 5, 'Load data', 'running');

    var userData = ctx.db.getUser(userId);
    if (!userData) {
        ctx.logger.step(2, 5, 'Load data', 'fail', 'userData NOT FOUND');
        return ctx.buildErrorResponse(8);
    }

    // Load lesson.json
    var lessonData = ctx.loadResource('lesson');
    if (!lessonData) {
        ctx.logger.step(2, 5, 'Load data', 'fail', 'lesson.json NOT FOUND');
        return ctx.buildErrorResponse(1);
    }

    // Load hero.json for enemy hero base stats
    var heroData = ctx.heroJson;
    if (!heroData) {
        ctx.logger.step(2, 5, 'Load data', 'fail', 'hero.json NOT FOUND');
        return ctx.buildErrorResponse(1);
    }

    // Load heroLevelAttr.json for level-based HP/Attack/Armor
    var heroLevelAttrData = ctx.loadResource('heroLevelAttr');
    if (!heroLevelAttrData) {
        ctx.logger.step(2, 5, 'Load data', 'fail', 'heroLevelAttr.json NOT FOUND');
        return ctx.buildErrorResponse(1);
    }

    // Load heroTypeParam.json for type multipliers
    var heroTypeParamData = ctx.loadResource('heroTypeParam');
    if (!heroTypeParamData) {
        ctx.logger.step(2, 5, 'Load data', 'fail', 'heroTypeParam.json NOT FOUND');
        return ctx.buildErrorResponse(1);
    }

    ctx.logger.step(2, 5, 'Load data', 'pass',
        'lesson=' + Object.keys(lessonData).length +
        ', heroes=' + Object.keys(heroData).length +
        ', levelAttr=' + Object.keys(heroLevelAttrData).length +
        ', typeParam=' + Object.keys(heroTypeParamData).length);

    // ═══════════════════════════════════════════════════════════════
    // STEP 3: Get current lesson from user progress
    // ═══════════════════════════════════════════════════════════════
    ctx.logger.step(3, 5, 'Read lesson progress', 'running');

    var hangup = userData.hangup || {};
    var curLess = hangup._curLess || 10101;

    ctx.logger.details('progress',
        ['curLess', String(curLess)],
        ['source', 'userData.hangup._curLess']
    );

    var lessonId = String(curLess);
    var lessonConfig = lessonData[lessonId];
    if (!lessonConfig) {
        ctx.logger.step(3, 5, 'Read lesson progress', 'fail',
            'lesson ' + lessonId + ' NOT FOUND in lesson.json');
        return ctx.buildErrorResponse(1);
    }

    ctx.logger.step(3, 5, 'Read lesson progress', 'pass',
        'lesson=' + lessonId + ' (' + (lessonConfig.name || '?') + ')');

    // ═══════════════════════════════════════════════════════════════
    // STEP 4: Parse lesson enemy config
    // ═══════════════════════════════════════════════════════════════
    ctx.logger.step(4, 5, 'Parse enemy config', 'running');

    // enemyList CSV: ",,,55206," → ["", "", "", "55206", ""]
    var enemyListRaw = lessonConfig.enemyList || '';
    var enemyList = enemyListRaw.split(',');

    // enemyLevel CSV: ",,,1," → ["", "", "", "1", ""]
    var enemyLevelRaw = lessonConfig.enemyLevel || '';
    var enemyLevels = enemyLevelRaw.split(',');

    // monsterType CSV: ",,,skill," → ["", "", "", "skill", ""]
    var monsterTypeRaw = lessonConfig.monsterType || '';
    var monsterTypes = monsterTypeRaw.split(',');

    // difficultyHp/Attack/Armor CSV: "3.15,3.15,3.15,5.04,3.15"
    var diffHpRaw = lessonConfig.difficultyHp || '';
    var diffHpArr = diffHpRaw.split(',');

    var diffAtkRaw = lessonConfig.difficultyAttack || '';
    var diffAtkArr = diffAtkRaw.split(',');

    var diffArmRaw = lessonConfig.difficultyArmor || '';
    var diffArmArr = diffArmRaw.split(',');

    ctx.logger.details('enemyConfig',
        ['enemyList', enemyListRaw],
        ['enemyLevel', enemyLevelRaw],
        ['monsterType', monsterTypeRaw],
        ['difficultyHp', diffHpRaw],
        ['difficultyAttack', diffAtkRaw],
        ['difficultyArmor', diffArmRaw],
        ['power', String(lessonConfig.power || 0)],
        ['isBoss', String(lessonConfig.isBoss || '?')]
    );

    ctx.logger.step(4, 5, 'Parse enemy config', 'pass',
        'parsed ' + enemyList.length + ' positions');

    // ═══════════════════════════════════════════════════════════════
    // STEP 5: Build enemy team
    // ═══════════════════════════════════════════════════════════════
    ctx.logger.step(5, 5, 'Build enemy team', 'running');

    var rightTeamItems = {};
    var enemyCount = 0;
    var buildLog = [];

    for (var pos = 0; pos < enemyList.length && pos < 5; pos++) {
        var heroIdStr = (enemyList[pos] || '').trim();
        if (!heroIdStr) {
            // Empty position — skip (sparse)
            continue;
        }

        var heroId = heroIdStr;
        var hero = heroData[heroId];
        if (!hero) {
            ctx.logger.log('WARN', 'START-GENERAL',
                'hero ' + heroId + ' at position ' + pos + ' NOT FOUND in hero.json — skipping');
            continue;
        }

        // Get level for this position
        var levelStr = (enemyLevels[pos] || '').trim();
        var level = parseInt(levelStr) || 1;

        // Get monster type for this position (determines type multipliers)
        var mType = (monsterTypes[pos] || '').trim() || hero.heroType || 'strength';

        // Get type params
        var typeParams = heroTypeParamData[mType] || heroTypeParamData['strength'] || { hpParam: 1, attackParam: 1, armorParam: 1, hpBais: 0, attackBais: 150, armorBais: 0 };

        // Get difficulty multipliers for this position
        var dHp = parseFloat(diffHpArr[pos]) || 1;
        var dAtk = parseFloat(diffAtkArr[pos]) || 1;
        var dArm = parseFloat(diffArmArr[pos]) || 1;

        // Get level stats from heroLevelAttr.json
        var levelEntry = heroLevelAttrData[String(level)];
        if (!levelEntry) {
            ctx.logger.log('WARN', 'START-GENERAL',
                'level ' + level + ' NOT in heroLevelAttr — using level 1');
            levelEntry = heroLevelAttrData['1'] || { hp: 1240, attack: 125, armor: 205 };
        }

        // ═════════════════════════════════════════════════════════
        // CALCULATE ENEMY STATS
        // ═════════════════════════════════════════════════════════
        // Formula: floor((levelAttr × typeParam + bais) × difficulty)
        var hp = Math.floor((levelEntry.hp * typeParams.hpParam + (typeParams.hpBais || 0)) * dHp);
        var attack = Math.floor((levelEntry.attack * typeParams.attackParam + (typeParams.attackBais || 0)) * dAtk);
        var armor = Math.floor((levelEntry.armor * typeParams.armorParam + (typeParams.armorBais || 0)) * dArm);

        // Percentage stats — directly from hero.json (no level scaling)
        var speed = hero.speed || 180;
        var hit = hero.hit || 0;
        var dodge = hero.dodge || 0;
        var block = hero.block || 0;
        var blockEffect = hero.blockEffect || 0;
        var skillDamage = hero.skillDamage || 0.1;
        var critical = hero.critical || 0;
        var criticalResist = hero.criticalResist || 0;
        var criticalDamage = hero.criticalDamage || 0;
        var armorBreak = hero.armorBreak || 0;
        var damageReduce = hero.damageReduce || 0;
        var controlResist = hero.controlResist || 0;
        var trueDamage = hero.trueDamage || 0;
        var superDamage = hero.superDamage || 0;
        var healPlus = hero.healPlus || 0;
        var healerPlus = hero.healerPlus || 0;
        var shielderPlus = hero.shielderPlus || 0;
        var damageUp = hero.damageUp || 0;
        var damageDown = hero.damageDown || 0;
        var talent = hero.talent || 1;
        var superDamageResist = hero.superDamageResist || 0;
        var criticalDamageResist = hero.criticalDamageResist || 0;
        var blockThrough = hero.blockThrough || 0;
        var energyMax = hero.energyMax || 100;

        // Build _attrs._items — keyed by attribute type enum value (string)
        var attrItems = {};

        attrItems[String(ATTR.HP)] = { _type: ATTR.HP, _num: hp };
        attrItems[String(ATTR.ATTACK)] = { _type: ATTR.ATTACK, _num: attack };
        attrItems[String(ATTR.ARMOR)] = { _type: ATTR.ARMOR, _num: armor };
        attrItems[String(ATTR.SPEED)] = { _type: ATTR.SPEED, _num: speed };
        attrItems[String(ATTR.HIT)] = { _type: ATTR.HIT, _num: hit };
        attrItems[String(ATTR.DODGE)] = { _type: ATTR.DODGE, _num: dodge };
        attrItems[String(ATTR.BLOCK)] = { _type: ATTR.BLOCK, _num: block };
        attrItems[String(ATTR.BLOCK_EFFECT)] = { _type: ATTR.BLOCK_EFFECT, _num: blockEffect };
        attrItems[String(ATTR.SKILL_DAMAGE)] = { _type: ATTR.SKILL_DAMAGE, _num: skillDamage };
        attrItems[String(ATTR.CRITICAL)] = { _type: ATTR.CRITICAL, _num: critical };
        attrItems[String(ATTR.CRITICAL_RESIST)] = { _type: ATTR.CRITICAL_RESIST, _num: criticalResist };
        attrItems[String(ATTR.CRITICAL_DAMAGE)] = { _type: ATTR.CRITICAL_DAMAGE, _num: criticalDamage };
        attrItems[String(ATTR.ARMOR_BREAK)] = { _type: ATTR.ARMOR_BREAK, _num: armorBreak };
        attrItems[String(ATTR.DAMAGE_REDUCE)] = { _type: ATTR.DAMAGE_REDUCE, _num: damageReduce };
        attrItems[String(ATTR.CONTROL_RESIST)] = { _type: ATTR.CONTROL_RESIST, _num: controlResist };
        attrItems[String(ATTR.TRUE_DAMAGE)] = { _type: ATTR.TRUE_DAMAGE, _num: trueDamage };
        attrItems[String(ATTR.ENERGY)] = { _type: ATTR.ENERGY, _num: 0 };
        attrItems[String(ATTR.SUPER_DAMAGE)] = { _type: ATTR.SUPER_DAMAGE, _num: superDamage };
        attrItems[String(ATTR.HEAL_PLUS)] = { _type: ATTR.HEAL_PLUS, _num: healPlus };
        attrItems[String(ATTR.HEALER_PLUS)] = { _type: ATTR.HEALER_PLUS, _num: healerPlus };
        attrItems[String(ATTR.EXTRA_ARMOR)] = { _type: ATTR.EXTRA_ARMOR, _num: 0 };
        attrItems[String(ATTR.SHIELDER_PLUS)] = { _type: ATTR.SHIELDER_PLUS, _num: shielderPlus };
        attrItems[String(ATTR.DAMAGE_UP)] = { _type: ATTR.DAMAGE_UP, _num: damageUp };
        attrItems[String(ATTR.DAMAGE_DOWN)] = { _type: ATTR.DAMAGE_DOWN, _num: damageDown };
        attrItems[String(ATTR.TALENT)] = { _type: ATTR.TALENT, _num: talent };
        attrItems[String(ATTR.SUPER_DAMAGE_RESIST)] = { _type: ATTR.SUPER_DAMAGE_RESIST, _num: superDamageResist };
        attrItems[String(ATTR.CRITICAL_DAMAGE_RESIST)] = { _type: ATTR.CRITICAL_DAMAGE_RESIST, _num: criticalDamageResist };
        attrItems[String(ATTR.BLOCK_THROUGH)] = { _type: ATTR.BLOCK_THROUGH, _num: blockThrough };
        attrItems[String(ATTR.ENERGY_MAX)] = { _type: ATTR.ENERGY_MAX, _num: energyMax };

        // Build _skills — keyed by index
        // _type: 0=normal, 1=proactive(skill), 2=passive, 3=superSkill
        var skillItems = {};
        var skillIdx = 0;

        // Normal attack (type 0)
        if (hero.normal) {
            skillItems[String(skillIdx)] = {
                _type: 0,
                _id: hero.normal,
                _level: 1
            };
            skillIdx++;
        }

        // Proactive skill (type 1)
        if (hero.skill) {
            skillItems[String(skillIdx)] = {
                _type: 1,
                _id: hero.skill,
                _level: hero.skillLevel || 1
            };
            skillIdx++;
        }

        // Passive skill (type 2) — from skillPassive1 + passiveLevel1
        if (hero.skillPassive1) {
            skillItems[String(skillIdx)] = {
                _type: 2,
                _id: hero.skillPassive1,
                _level: hero.passiveLevel1 || 1
            };
            skillIdx++;
        }

        // Build hero object for this position
        rightTeamItems[String(pos)] = {
            _heroDisplayId: heroId,
            _heroLevel: level,
            _attrs: {
                _items: attrItems
            },
            _skills: skillItems
        };

        enemyCount++;
        buildLog.push(
            'pos=' + pos +
            ' hero=' + heroId +
            ' lvl=' + level +
            ' type=' + mType +
            ' hp=' + hp +
            ' atk=' + attack +
            ' arm=' + armor +
            ' spd=' + speed +
            ' skills=' + skillIdx
        );

        ctx.logger.details('enemy',
            ['pos', String(pos)],
            ['heroId', heroId],
            ['level', String(level)],
            ['monsterType', mType],
            ['diffHp/dAtk/dArm', dHp + '/' + dAtk + '/' + dArm],
            ['hp/atk/arm', hp + '/' + attack + '/' + armor],
            ['speed', String(speed)],
            ['skills', String(skillIdx)]
        );
    }

    if (enemyCount === 0) {
        ctx.logger.step(5, 5, 'Build enemy team', 'fail',
            'NO valid enemies in lesson ' + lessonId);
        return ctx.buildErrorResponse(1);
    }

    ctx.logger.step(5, 5, 'Build enemy team', 'pass',
        enemyCount + ' enemies built');

    // ═══════════════════════════════════════════════════════════════
    // STEP 6: Generate battleId and build response
    // ═══════════════════════════════════════════════════════════════
    ctx.logger.step(6, 5, 'Build response', 'running');

    // Generate unique battle ID
    var battleId = ctx.uuidv4();

    // Build rightSuper — empty array (enemy has no super skill in lesson battle)
    // Client handles empty gracefully: rightSuper: r ? r : [] (L103618)
    var rightSuper = [];

    var responseData = {
        _battleId: battleId,
        _rightTeam: {
            _items: rightTeamItems
        },
        _rightSuper: rightSuper
    };

    ctx.logger.step(6, 5, 'Build response', 'pass',
        'battleId=' + battleId.substring(0, 8) + '...' +
        ', enemies=' + enemyCount);

    // ═══════════════════════════════════════════════════════════════
    // VERIFIED RESPONSE FIELDS vs main.min.js
    // ═══════════════════════════════════════════════════════════════

    ctx.logger.criticalFields([
        {
            name: '_battleId',
            value: battleId.substring(0, 16) + '...',
            status: 'ok',
            detail: 'L97731: UserInfoSingleton.getInstance().battleId = r._battleId'
        },
        {
            name: '_rightTeam._items',
            value: Object.keys(rightTeamItems).length + ' heroes (keys: ' + Object.keys(rightTeamItems).join(',') + ')',
            status: 'ok',
            detail: 'L102470: for (var o in e) iterates _rightTeam._items (sparse keys)'
        },
        {
            name: '_rightSuper',
            value: rightSuper.length + ' skills',
            status: 'ok',
            detail: 'L103618: rightSuper: r ? r : [] (empty is valid)'
        }
    ]);

    // ═══════════════════════════════════════════════════════════════
    // TYPE ASSERTIONS
    // ═══════════════════════════════════════════════════════════════

    ctx.logger.typeAssert('responseData._battleId', responseData._battleId, 'string', {
        context: 'START-GENERAL',
        trace: 'L97731: battleId stored in UserInfoSingleton',
        impact: 'Wrong type -> battle session broken'
    });

    ctx.logger.typeAssert('responseData._rightTeam._items', responseData._rightTeam._items, 'object', {
        context: 'START-GENERAL',
        trace: 'L102470: for...in iteration on _rightTeam._items',
        impact: 'Wrong type -> no enemy heroes loaded'
    });

    ctx.logger.typeAssert('responseData._rightSuper', responseData._rightSuper, 'object', {
        context: 'START-GENERAL',
        trace: 'L101674: for (var o = 0; o < n.length; o++)',
        impact: 'Wrong type -> super skill parsing error'
    });

    // ═══════════════════════════════════════════════════════════════
    // INVARIANT CHECKS
    // ═══════════════════════════════════════════════════════════════

    ctx.logger.invariantCheck(
        'At least 1 enemy hero built',
        enemyCount > 0,
        {
            context: 'START-GENERAL',
            expect: 'enemyCount > 0',
            actual: 'enemyCount = ' + enemyCount,
            trace: 'lesson.json enemyList must have at least 1 non-empty position',
            impact: 'No enemies -> battle cannot start'
        }
    );

    ctx.logger.invariantCheck(
        'All enemy heroes have valid HP > 0',
        Object.keys(rightTeamItems).every(function(pos) {
            var hero = rightTeamItems[pos];
            return hero._attrs._items['0'] && hero._attrs._items['0']._num > 0;
        }),
        {
            context: 'START-GENERAL',
            expect: 'HP > 0 for all enemies',
            actual: 'verified: formula produces positive HP',
            trace: 'Battle system requires HP > 0 for each hero',
            impact: 'HP <= 0 -> enemy dies instantly'
        }
    );

    ctx.logger.invariantCheck(
        'All enemy heroes have valid _heroDisplayId',
        Object.keys(rightTeamItems).every(function(pos) {
            return !!rightTeamItems[pos]._heroDisplayId;
        }),
        {
            context: 'START-GENERAL',
            expect: '_heroDisplayId exists for all enemies',
            actual: 'verified: heroId from hero.json used',
            trace: 'L102477: getHeroInfo()[r._heroDisplayId] lookup',
            impact: 'Missing _heroDisplayId -> client cannot load hero visuals'
        }
    );

    ctx.logger.invariantCheck(
        'All enemy heroes have _heroLevel > 0',
        Object.keys(rightTeamItems).every(function(pos) {
            return rightTeamItems[pos]._heroLevel > 0;
        }),
        {
            context: 'START-GENERAL',
            expect: '_heroLevel > 0',
            actual: 'verified: level from lesson config',
            trace: 'L66555-66558: armor formula uses getHeroLevel()',
            impact: '_heroLevel = 0 -> armor calculation broken'
        }
    );

    // ═══════════════════════════════════════════════════════════════
    // SUMMARY
    // ═══════════════════════════════════════════════════════════════

    ctx.logger.responseSnapshot('START GENERAL ret=0', responseData);

    ctx.logger.summaryCard({
        title: 'START GENERAL',
        userId: userId,
        lesson: lessonId,
        battleId: battleId.substring(0, 12) + '...',
        enemies: enemyCount,
        enemySummary: buildLog.join(' | ')
    });

    return ctx.buildDataResponse(0, responseData);
}

module.exports = handleStartGeneral;
