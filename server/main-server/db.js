/**
 * db.js — MAIN-SERVER Database Module
 * Referensi: main-server.md v4.0 Section 7
 * Cross-reference verified against: main.min(unminfy).js
 *
 * Database: better-sqlite3 WAL mode
 * File: ./data/main_server.db
 * Prinsip: 1 tabel per fitur (sesuai Section 7)
 *
 * Default values: SQLite DEFAULT constraints menangani semua default
 * Game constants: dibaca dari constant.json via jsonLoader
 *
 * CRUD Pattern:
 *   - READ:   getXxx(id)     → object|null  |  getXxxs(userId) → array
 *   - CREATE: createXxx(params) → object (created row)
 *   - UPDATE: updateXxx(id, fields) → void  (generic field updater)
 *   - DELETE: deleteXxx(id) → boolean
 *   - UPSERT: upsertXxx(...) → void  (untuk tabel dengan UNIQUE constraint)
 *
 * Schema Strategy:
 *   - Core persistent fields → dedicated columns with DEFAULT
 *   - Complex/nested objects → TEXT columns with JSON DEFAULT ('{}' or '[]')
 *   - Derived/computed fields → NOT stored (calculated by handlers from config)
 *   - 1:1 user data → JSON columns in user_data
 *   - 1:many user data → separate tables
 */

const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const logger = require('./logger');

const DB_DIR = path.join(__dirname, 'data');
const DB_PATH = path.join(DB_DIR, 'main_server.db');

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
}

// ─── Initialize Database ───
const db = new Database(DB_PATH);

// WAL mode for performance
db.pragma('journal_mode = WAL');

// ─── Create Tables ───
// Referensi: main-server.md v4.0 Section 7.1
// Cross-reference: main.min(unminfy).js client data models
db.exec(`
    -- ═══════════════════════════════════════════════════════════
    -- USER DATA (Data User Utama)
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS user_data (
        userId TEXT PRIMARY KEY,
        nickName TEXT NOT NULL DEFAULT '',
        headImageId INTEGER DEFAULT 0,
        headBoxId INTEGER DEFAULT 0,
        level INTEGER DEFAULT 1,
        exp INTEGER DEFAULT 0,
        vipLevel INTEGER DEFAULT 0,
        vipExp INTEGER DEFAULT 0,
        vipExpAll INTEGER DEFAULT 0,
        diamond INTEGER DEFAULT 0,
        gold INTEGER DEFAULT 0,
        loginToken TEXT,
        serverId TEXT,
        createTime INTEGER,
        lastLoginTime INTEGER,
        language TEXT DEFAULT 'en',
        guideStep TEXT DEFAULT '',
        fastTeams TEXT DEFAULT '',
        clickSystem TEXT DEFAULT '',
        bulletinRead TEXT DEFAULT '',
        lessonId INTEGER DEFAULT 10101,
        chapterId INTEGER DEFAULT 801,
        backpackLevel INTEGER DEFAULT 1,
        firstEnter INTEGER DEFAULT 1,
        scheduleData TEXT DEFAULT '{}',
        timesData TEXT DEFAULT '{}',
        battleMedalData TEXT DEFAULT '{}',
        giftInfoData TEXT DEFAULT '{}',
        ballWarData TEXT DEFAULT '{}',
        expeditionData TEXT DEFAULT '[]',
        entrustData TEXT DEFAULT '[]',
        online INTEGER DEFAULT 0,
        -- Card/VIP data
        monthlyCardEndTime INTEGER DEFAULT 0,
        bigMonthlyCardEndTime INTEGER DEFAULT 0,
        lifelongCardEndTime INTEGER DEFAULT 0,
        monthlyCardDay INTEGER DEFAULT 0,
        bigMonthlyCardDay INTEGER DEFAULT 0,
        lifelongCardDay INTEGER DEFAULT 0,
        firstRechargeGot INTEGER DEFAULT 0,
        monthCardGot INTEGER DEFAULT 0,
        bigMonthCardGot INTEGER DEFAULT 0,
        lifelongCardGot INTEGER DEFAULT 0,
        -- Additional user fields from client cross-reference
        newUser INTEGER DEFAULT 0,
        nickChangeTimes INTEGER DEFAULT 0,
        oriServerId TEXT DEFAULT '',
        serverVersion TEXT DEFAULT '',
        serverOpenDate INTEGER DEFAULT 0,
        forbiddenChat INTEGER DEFAULT 0,
        -- 1:1 JSON data blocks (client expects these in enterGame)
        hangupData TEXT DEFAULT '{}',
        summonData TEXT DEFAULT '{}',
        heroSkinData TEXT DEFAULT '{}',
        dragonEquiped TEXT DEFAULT '{}',
        lastTeamData TEXT DEFAULT '{}',
        trainingData TEXT DEFAULT '{}',
        retrieveData TEXT DEFAULT '{}',
        snakeData TEXT DEFAULT '{}',
        checkinData TEXT DEFAULT '{}',
        littleGameData TEXT DEFAULT '{}',
        gravityData TEXT DEFAULT '{}',
        headEffectData TEXT DEFAULT '{}',
        warData TEXT DEFAULT '{}',
        timeTrialData TEXT DEFAULT '{}',
        cellGameData TEXT DEFAULT '{}',
        hideHeroesData TEXT DEFAULT '{}',
        teamTrainingData TEXT DEFAULT '{}',
        channelSpecial TEXT DEFAULT '{}'
    );

    CREATE INDEX IF NOT EXISTS idx_user_data_loginToken ON user_data(loginToken);
    CREATE INDEX IF NOT EXISTS idx_user_data_serverId ON user_data(serverId);
    CREATE INDEX IF NOT EXISTS idx_user_data_online ON user_data(online);
    CREATE INDEX IF NOT EXISTS idx_user_data_level ON user_data(level);

    -- ═══════════════════════════════════════════════════════════
    -- HERO DATA (Data Hero)
    -- Cross-reference: HeroDataModel + SetHeroDataToModel
    -- Server wire format: _heroId, _heroDisplayId, _heroStar, etc.
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS hero_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        displayId INTEGER NOT NULL,
        level INTEGER DEFAULT 1,
        quality INTEGER DEFAULT 1,
        evolveLevel INTEGER DEFAULT 0,
        star INTEGER DEFAULT 0,
        skinId INTEGER DEFAULT 0,
        activeSkill TEXT DEFAULT '{}',
        qigongLevel INTEGER DEFAULT 0,
        selfBreakLevel INTEGER DEFAULT 0,
        selfBreakType INTEGER DEFAULT 0,
        connectHeroId INTEGER DEFAULT 0,
        position INTEGER DEFAULT 0,
        power INTEGER DEFAULT 0,
        -- Additional hero fields from client cross-reference
        fragment INTEGER DEFAULT 0,
        expeditionMaxLevel INTEGER DEFAULT 0,
        heroTag TEXT DEFAULT '[]',
        qigong TEXT DEFAULT '{}',
        qigongTmp TEXT DEFAULT '{}',
        qigongTmpPower INTEGER DEFAULT 0,
        breakInfo TEXT DEFAULT '{}',
        gemstoneSuitId INTEGER DEFAULT 0,
        linkTo TEXT DEFAULT '[]',
        superSkillResetCount INTEGER DEFAULT 0,
        potentialResetCount INTEGER DEFAULT 0,
        superSkillLevel TEXT DEFAULT '[]',
        potentialLevel TEXT DEFAULT '[]',
        FOREIGN KEY (userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_hero_data_userId ON hero_data(userId);
    CREATE INDEX IF NOT EXISTS idx_hero_data_displayId ON hero_data(displayId);

    -- ═══════════════════════════════════════════════════════════
    -- ITEM DATA (Data Item/Inventaris)
    -- Cross-reference: totalProps._items [{_id, _num}]
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS item_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        itemId INTEGER NOT NULL,
        num INTEGER DEFAULT 0,
        displayId INTEGER DEFAULT 0,
        UNIQUE(userId, itemId, displayId),
        FOREIGN KEY (userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_item_data_userId ON item_data(userId);
    CREATE INDEX IF NOT EXISTS idx_item_data_itemId ON item_data(itemId);

    -- ═══════════════════════════════════════════════════════════
    -- EQUIP DATA (Data Equipment)
    -- Cross-reference: EquipItem {id, pos} per hero suit
    -- NOTE: Client expects per-hero suit structure, but we store flat
    --       Handler transforms flat data → per-hero suit on enterGame
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS equip_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        equipId INTEGER NOT NULL,
        level INTEGER DEFAULT 1,
        quality INTEGER DEFAULT 1,
        heroId INTEGER DEFAULT 0,
        position INTEGER DEFAULT 0,
        FOREIGN KEY (userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_equip_data_userId ON equip_data(userId);

    -- ═══════════════════════════════════════════════════════════
    -- WEAPON DATA (Data Senjata)
    -- Cross-reference: WeaponDataModel {weaponId, displayId, heroId, star,
    --   level, attrs[], strengthenCost[], haloId, haloLevel, haloCost[], quality}
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS weapon_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        weaponId INTEGER NOT NULL,
        displayId INTEGER DEFAULT 0,
        level INTEGER DEFAULT 1,
        quality INTEGER DEFAULT 1,
        star INTEGER DEFAULT 0,
        heroId INTEGER DEFAULT 0,
        haloId INTEGER DEFAULT 0,
        haloLevel INTEGER DEFAULT 0,
        attrs TEXT DEFAULT '[]',
        strengthenCost TEXT DEFAULT '[]',
        haloCost TEXT DEFAULT '[]',
        FOREIGN KEY (userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_weapon_data_userId ON weapon_data(userId);

    -- ═══════════════════════════════════════════════════════════
    -- IMPRINT DATA (Data Imprint/Signet)
    -- Cross-reference: ImprintItem {id, displayId, heroId, level, star,
    --   mainAttr, starAttr, viceAttr[], totalCost[], addAttr, part, tmpViceAttr[]}
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS imprint_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        imprintId INTEGER NOT NULL,
        displayId INTEGER DEFAULT 0,
        level INTEGER DEFAULT 1,
        star INTEGER DEFAULT 0,
        quality INTEGER DEFAULT 1,
        part INTEGER DEFAULT 0,
        heroId INTEGER DEFAULT 0,
        mainAttr TEXT DEFAULT '{}',
        starAttr TEXT DEFAULT '{}',
        viceAttr TEXT DEFAULT '[]',
        totalCost TEXT DEFAULT '[]',
        addAttr TEXT DEFAULT '{}',
        tmpViceAttr TEXT DEFAULT '[]',
        FOREIGN KEY (userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_imprint_data_userId ON imprint_data(userId);

    -- ═══════════════════════════════════════════════════════════
    -- GENKI DATA (Data Genki)
    -- Cross-reference: GenkiItem {id, displayId, heroId, heroPos,
    --   mainAttr, viceAttr, disable}
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS genki_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        genkiId INTEGER NOT NULL,
        displayId INTEGER DEFAULT 0,
        heroId INTEGER DEFAULT 0,
        pos INTEGER DEFAULT 0,
        mainAttr TEXT DEFAULT '{}',
        viceAttr TEXT DEFAULT '{}',
        disable INTEGER DEFAULT 0,
        FOREIGN KEY (userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_genki_data_userId ON genki_data(userId);

    -- ═══════════════════════════════════════════════════════════
    -- GUILD DATA (Data Guild)
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS guild_data (
        guildUUID TEXT PRIMARY KEY,
        guildName TEXT NOT NULL,
        iconId INTEGER DEFAULT 0,
        captainUserId TEXT,
        viceCaptainUserId TEXT DEFAULT '',
        bulletin TEXT DEFAULT '',
        description TEXT DEFAULT '',
        level INTEGER DEFAULT 1,
        exp INTEGER DEFAULT 0,
        memberNum INTEGER DEFAULT 0,
        needAgree INTEGER DEFAULT 1,
        limitLevel INTEGER DEFAULT 0,
        createTime INTEGER,
        activePoint INTEGER DEFAULT 0,
        FOREIGN KEY (captainUserId) REFERENCES user_data(userId)
    );

    -- ═══════════════════════════════════════════════════════════
    -- GUILD MEMBER DATA (Data Member Guild)
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS guild_member_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        guildUUID TEXT NOT NULL,
        userId TEXT NOT NULL,
        position INTEGER DEFAULT 0,
        joinTime INTEGER,
        donateNum INTEGER DEFAULT 0,
        UNIQUE(guildUUID, userId),
        FOREIGN KEY (guildUUID) REFERENCES guild_data(guildUUID),
        FOREIGN KEY (userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_guild_member_guild ON guild_member_data(guildUUID);
    CREATE INDEX IF NOT EXISTS idx_guild_member_user ON guild_member_data(userId);

    -- ═══════════════════════════════════════════════════════════
    -- FRIEND DATA (Data Teman)
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS friend_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        friendId TEXT NOT NULL,
        giveHeartTime INTEGER DEFAULT 0,
        getHeartTime INTEGER DEFAULT 0,
        UNIQUE(userId, friendId),
        FOREIGN KEY (userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_friend_data_userId ON friend_data(userId);

    -- ═══════════════════════════════════════════════════════════
    -- FRIEND BLACKLIST (Data Blacklist Teman)
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS friend_blacklist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        targetUserId TEXT NOT NULL,
        UNIQUE(userId, targetUserId),
        FOREIGN KEY (userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_friend_blacklist_userId ON friend_blacklist(userId);

    -- ═══════════════════════════════════════════════════════════
    -- ARENA DATA (Data Arena)
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS arena_data (
        userId TEXT PRIMARY KEY,
        rank INTEGER DEFAULT 0,
        times INTEGER DEFAULT 5,
        buyTimes INTEGER DEFAULT 0,
        team TEXT DEFAULT '{}',
        lastRefreshTime INTEGER DEFAULT 0,
        FOREIGN KEY (userId) REFERENCES user_data(userId)
    );

    -- ═══════════════════════════════════════════════════════════
    -- MAIL DATA (Data Mail)
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS mail_data (
        mailId INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        senderId TEXT DEFAULT '',
        title TEXT DEFAULT '',
        content TEXT DEFAULT '',
        awards TEXT DEFAULT '[]',
        isRead INTEGER DEFAULT 0,
        isGot INTEGER DEFAULT 0,
        sendTime INTEGER,
        expireTime INTEGER,
        type INTEGER DEFAULT 0,
        FOREIGN KEY (userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_mail_data_userId ON mail_data(userId);
    CREATE INDEX IF NOT EXISTS idx_mail_data_sendTime ON mail_data(sendTime);

    -- ═══════════════════════════════════════════════════════════
    -- SHOP DATA (Data Toko)
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS shop_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        shopType INTEGER NOT NULL,
        goodsId INTEGER NOT NULL,
        buyTimes INTEGER DEFAULT 0,
        refreshTime INTEGER DEFAULT 0,
        UNIQUE(userId, shopType, goodsId),
        FOREIGN KEY (userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_shop_data_userId ON shop_data(userId);

    -- ═══════════════════════════════════════════════════════════
    -- DUNGEON DATA (Data Dungeon Progress)
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS dungeon_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        dungeonType INTEGER NOT NULL,
        level INTEGER DEFAULT 0,
        sweepLevel INTEGER DEFAULT 0,
        times INTEGER DEFAULT 0,
        buyTimes INTEGER DEFAULT 0,
        UNIQUE(userId, dungeonType),
        FOREIGN KEY (userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_dungeon_data_userId ON dungeon_data(userId);

    -- ═══════════════════════════════════════════════════════════
    -- TOWER DATA (Data Karin Tower)
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS tower_data (
        userId TEXT PRIMARY KEY,
        floor INTEGER DEFAULT 0,
        times INTEGER DEFAULT 10,
        buyTimes INTEGER DEFAULT 0,
        climbTimes INTEGER DEFAULT 0,
        events TEXT DEFAULT '[]',
        FOREIGN KEY (userId) REFERENCES user_data(userId)
    );

    -- ═══════════════════════════════════════════════════════════
    -- EXPEDITION DATA (Data Expedition)
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS expedition_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        machineId INTEGER DEFAULT 0,
        heroId INTEGER DEFAULT 0,
        lessonIds TEXT DEFAULT '[]',
        teams TEXT DEFAULT '[]',
        FOREIGN KEY (userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_expedition_data_userId ON expedition_data(userId);

    -- ═══════════════════════════════════════════════════════════
    -- BATTLE DATA (Data Pertempuran Aktif)
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS battle_data (
        battleId TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        battleField INTEGER NOT NULL,
        seed TEXT DEFAULT '',
        team TEXT DEFAULT '{}',
        startTime INTEGER,
        status INTEGER DEFAULT 0,
        FOREIGN KEY (userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_battle_data_userId ON battle_data(userId);

    -- ═══════════════════════════════════════════════════════════
    -- BALL WAR DATA (Data Dragon Ball War)
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS ball_war_data (
        userId TEXT PRIMARY KEY,
        state INTEGER DEFAULT 0,
        signedUp INTEGER DEFAULT 0,
        times INTEGER DEFAULT 3,
        defence TEXT DEFAULT '{}',
        FOREIGN KEY (userId) REFERENCES user_data(userId)
    );

    -- ═══════════════════════════════════════════════════════════
    -- ENTRUST DATA (Data Entrust)
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS entrust_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        entrustIndex INTEGER DEFAULT 0,
        heroInfo TEXT DEFAULT '{}',
        status INTEGER DEFAULT 0,
        finishTime INTEGER DEFAULT 0,
        FOREIGN KEY (userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_entrust_data_userId ON entrust_data(userId);

    -- ═══════════════════════════════════════════════════════════
    -- RESONANCE DATA (Data Resonance)
    -- Cross-reference: ResonanceModel {id, diamondCabin, cabins{},
    --   buySeatCount, totalTalent, unlockSpecial}
    --   ResonanceCabin {id, mainHero, diamondSeat, seats{}, specialSeat}
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS resonance_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        cabinId INTEGER NOT NULL,
        seatId INTEGER NOT NULL,
        heroId INTEGER DEFAULT 0,
        FOREIGN KEY (userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_resonance_data_userId ON resonance_data(userId);

    -- ═══════════════════════════════════════════════════════════
    -- SUPER SKILL DATA (Data Super Skill)
    -- Cross-reference: [{_id, _level}]
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS super_skill_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        skillId INTEGER NOT NULL,
        level INTEGER DEFAULT 1,
        evolveLevel INTEGER DEFAULT 0,
        FOREIGN KEY (userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_super_skill_data_userId ON super_skill_data(userId);

    -- ═══════════════════════════════════════════════════════════
    -- GEMSTONE DATA (Data Gemstone)
    -- Cross-reference: GemstoneItem {id, displayId, heroId, level,
    --   totalExp, version, jewPosition}
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS gemstone_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        stoneId INTEGER NOT NULL,
        displayId INTEGER DEFAULT 0,
        level INTEGER DEFAULT 1,
        heroId INTEGER DEFAULT 0,
        totalExp INTEGER DEFAULT 0,
        version TEXT DEFAULT '',
        jewPosition INTEGER DEFAULT 1,
        FOREIGN KEY (userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_gemstone_data_userId ON gemstone_data(userId);

    -- ═══════════════════════════════════════════════════════════
    -- RANK DATA (Data Ranking)
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS rank_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        rankType INTEGER NOT NULL,
        userId TEXT NOT NULL,
        rankValue INTEGER DEFAULT 0,
        rankLevel INTEGER DEFAULT 0,
        FOREIGN KEY (userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_rank_data_type ON rank_data(rankType);
    CREATE INDEX IF NOT EXISTS idx_rank_data_userId ON rank_data(userId);
`);

logger.log('INFO', 'DB', 'Database initialized');
logger.details('data',
    ['tables', '24'],
    ['mode', 'WAL'],
    ['path', DB_PATH]
);

// ═══════════════════════════════════════════════════════════════
// USER DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get user by userId
 * @param {string} userId
 * @returns {object|null}
 */
function getUser(userId) {
    const stmt = db.prepare('SELECT * FROM user_data WHERE userId = ?');
    return stmt.get(userId);
}

/**
 * Get user by loginToken
 * @param {string} loginToken
 * @returns {object|null}
 */
function getUserByToken(loginToken) {
    const stmt = db.prepare('SELECT * FROM user_data WHERE loginToken = ?');
    return stmt.get(loginToken);
}

/**
 * Update user online status
 * @param {string} userId
 * @param {number} online - 0=offline, 1=online
 */
function setUserOnline(userId, online) {
    const stmt = db.prepare('UPDATE user_data SET online = ?, lastLoginTime = ? WHERE userId = ?');
    stmt.run(online, Date.now(), userId);
}

/**
 * Update user field(s) — generic updater
 * @param {string} userId
 * @param {object} fields - Key-value pairs to update
 */
function updateUserFields(userId, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return;

    const setClauses = keys.map(k => `${k} = @${k}`).join(', ');
    const values = { userId, ...fields };

    const stmt = db.prepare(`UPDATE user_data SET ${setClauses} WHERE userId = @userId`);
    stmt.run(values);
}

/**
 * Check if user exists
 * @param {string} userId
 * @returns {boolean}
 */
function userExists(userId) {
    const stmt = db.prepare('SELECT 1 FROM user_data WHERE userId = ?');
    return !!stmt.get(userId);
}

/**
 * Create new user
 * @param {object} params
 * @returns {object} Created user row
 */
function createUser(params) {
    const stmt = db.prepare(`
        INSERT INTO user_data (userId, nickName, headImageId, level, exp, diamond, gold,
            loginToken, serverId, createTime, lastLoginTime, language, online)
        VALUES (@userId, @nickName, @headImageId, @level, @exp, @diamond, @gold,
            @loginToken, @serverId, @createTime, @lastLoginTime, @language, @online)
    `);
    const info = stmt.run({
        userId: params.userId,
        nickName: params.nickName || '',
        headImageId: params.headImageId || 0,
        level: params.level || 1,
        exp: params.exp || 0,
        diamond: params.diamond || 0,
        gold: params.gold || 0,
        loginToken: params.loginToken || null,
        serverId: params.serverId || null,
        createTime: params.createTime || Date.now(),
        lastLoginTime: params.lastLoginTime || Date.now(),
        language: params.language || 'en',
        online: params.online || 1
    });
    return getUser(params.userId);
}

// ═══════════════════════════════════════════════════════════════
// HERO DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get all heroes for a user
 * @param {string} userId
 * @returns {array}
 */
function getHeroes(userId) {
    const stmt = db.prepare('SELECT * FROM hero_data WHERE userId = ? ORDER BY id');
    return stmt.all(userId);
}

/**
 * Get hero by database id
 * @param {number} id - Auto-increment id
 * @returns {object|null}
 */
function getHeroById(id) {
    return db.prepare('SELECT * FROM hero_data WHERE id = ?').get(id);
}

/**
 * Get hero by userId + displayId
 * @param {string} userId
 * @param {number} displayId
 * @returns {object|null}
 */
function getHeroByDisplayId(userId, displayId) {
    return db.prepare('SELECT * FROM hero_data WHERE userId = ? AND displayId = ?').get(userId, displayId);
}

/**
 * Create hero
 * @param {object} params
 * @returns {object} Created hero row
 */
function createHero(params) {
    const stmt = db.prepare(`
        INSERT INTO hero_data (userId, displayId, level, quality, evolveLevel, star, skinId,
            activeSkill, qigongLevel, selfBreakLevel, selfBreakType, connectHeroId, position, power,
            fragment, expeditionMaxLevel, heroTag, qigong, qigongTmp, qigongTmpPower,
            breakInfo, gemstoneSuitId, linkTo, superSkillResetCount, potentialResetCount,
            superSkillLevel, potentialLevel)
        VALUES (@userId, @displayId, @level, @quality, @evolveLevel, @star, @skinId,
            @activeSkill, @qigongLevel, @selfBreakLevel, @selfBreakType, @connectHeroId, @position, @power,
            @fragment, @expeditionMaxLevel, @heroTag, @qigong, @qigongTmp, @qigongTmpPower,
            @breakInfo, @gemstoneSuitId, @linkTo, @superSkillResetCount, @potentialResetCount,
            @superSkillLevel, @potentialLevel)
    `);
    const info = stmt.run({
        userId: params.userId,
        displayId: params.displayId,
        level: params.level || 1,
        quality: params.quality || 1,
        evolveLevel: params.evolveLevel || 0,
        star: params.star || 0,
        skinId: params.skinId || 0,
        activeSkill: params.activeSkill || '{}',
        qigongLevel: params.qigongLevel || 0,
        selfBreakLevel: params.selfBreakLevel || 0,
        selfBreakType: params.selfBreakType || 0,
        connectHeroId: params.connectHeroId || 0,
        position: params.position || 0,
        power: params.power || 0,
        fragment: params.fragment || 0,
        expeditionMaxLevel: params.expeditionMaxLevel || 0,
        heroTag: params.heroTag || '[]',
        qigong: params.qigong || '{}',
        qigongTmp: params.qigongTmp || '{}',
        qigongTmpPower: params.qigongTmpPower || 0,
        breakInfo: params.breakInfo || '{}',
        gemstoneSuitId: params.gemstoneSuitId || 0,
        linkTo: params.linkTo || '[]',
        superSkillResetCount: params.superSkillResetCount || 0,
        potentialResetCount: params.potentialResetCount || 0,
        superSkillLevel: params.superSkillLevel || '[]',
        potentialLevel: params.potentialLevel || '[]'
    });
    return db.prepare('SELECT * FROM hero_data WHERE id = ?').get(info.lastInsertRowid);
}

/**
 * Update hero by id — generic updater
 * @param {number} heroDbId - Auto-increment id
 * @param {object} fields
 */
function updateHero(heroDbId, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return;
    const setClauses = keys.map(k => `${k} = @${k}`).join(', ');
    const values = { id: heroDbId, ...fields };
    db.prepare(`UPDATE hero_data SET ${setClauses} WHERE id = @id`).run(values);
}

/**
 * Delete hero by id
 * @param {number} heroDbId
 * @returns {boolean}
 */
function deleteHero(heroDbId) {
    const info = db.prepare('DELETE FROM hero_data WHERE id = ?').run(heroDbId);
    return info.changes > 0;
}

// ═══════════════════════════════════════════════════════════════
// ITEM DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get all items for a user
 * @param {string} userId
 * @returns {array}
 */
function getItems(userId) {
    const stmt = db.prepare('SELECT * FROM item_data WHERE userId = ? ORDER BY itemId');
    return stmt.all(userId);
}

/**
 * Get specific item
 * @param {string} userId
 * @param {number} itemId
 * @param {number} displayId
 * @returns {object|null}
 */
function getItem(userId, itemId, displayId) {
    const stmt = db.prepare('SELECT * FROM item_data WHERE userId = ? AND itemId = ? AND displayId = ?');
    return stmt.get(userId, itemId, displayId || 0);
}

/**
 * Set item count (upsert)
 * @param {string} userId
 * @param {number} itemId
 * @param {number} num
 * @param {number} displayId
 */
function setItem(userId, itemId, num, displayId) {
    const stmt = db.prepare(`
        INSERT INTO item_data (userId, itemId, num, displayId)
        VALUES (@userId, @itemId, @num, @displayId)
        ON CONFLICT(userId, itemId, displayId) DO UPDATE SET num = @num
    `);
    stmt.run({ userId, itemId, num, displayId: displayId || 0 });
}

/**
 * Add item count (increment)
 * @param {string} userId
 * @param {number} itemId
 * @param {number} amount
 * @param {number} displayId
 * @returns {number} New total
 */
function addItem(userId, itemId, amount, displayId) {
    const existing = getItem(userId, itemId, displayId || 0);
    const newNum = (existing ? existing.num : 0) + amount;
    setItem(userId, itemId, newNum, displayId || 0);
    return newNum;
}

/**
 * Remove item (decrement, min 0)
 * @param {string} userId
 * @param {number} itemId
 * @param {number} amount
 * @param {number} displayId
 * @returns {number} New total
 */
function removeItem(userId, itemId, amount, displayId) {
    const existing = getItem(userId, itemId, displayId || 0);
    const newNum = Math.max(0, (existing ? existing.num : 0) - amount);
    setItem(userId, itemId, newNum, displayId || 0);
    return newNum;
}

/**
 * Create multiple items at once (for new user)
 * @param {string} userId
 * @param {array} items - [{ itemId, num, displayId }]
 */
function createItems(userId, items) {
    const stmt = db.prepare(`
        INSERT INTO item_data (userId, itemId, num, displayId)
        VALUES (@userId, @itemId, @num, @displayId)
    `);
    const insertMany = db.transaction((rows) => {
        for (const item of rows) {
            stmt.run({
                userId,
                itemId: item.itemId,
                num: item.num || 0,
                displayId: item.displayId || 0
            });
        }
    });
    insertMany(items);
}

/**
 * Delete item completely (not decrement — full remove)
 * @param {string} userId
 * @param {number} itemId
 * @param {number} displayId
 * @returns {boolean}
 */
function deleteItem(userId, itemId, displayId) {
    const info = db.prepare('DELETE FROM item_data WHERE userId = ? AND itemId = ? AND displayId = ?').run(userId, itemId, displayId || 0);
    return info.changes > 0;
}

// ═══════════════════════════════════════════════════════════════
// EQUIP DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get all equips for a user
 * @param {string} userId
 * @returns {array}
 */
function getEquips(userId) {
    return db.prepare('SELECT * FROM equip_data WHERE userId = ?').all(userId);
}

/**
 * Get equip by database id
 * @param {number} id
 * @returns {object|null}
 */
function getEquipById(id) {
    return db.prepare('SELECT * FROM equip_data WHERE id = ?').get(id);
}

/**
 * Get equips by heroId
 * @param {string} userId
 * @param {number} heroId
 * @returns {array}
 */
function getEquipsByHeroId(userId, heroId) {
    return db.prepare('SELECT * FROM equip_data WHERE userId = ? AND heroId = ?').all(userId, heroId);
}

/**
 * Create equip
 * @param {object} params
 * @returns {object} Created equip row
 */
function createEquip(params) {
    const stmt = db.prepare(`
        INSERT INTO equip_data (userId, equipId, level, quality, heroId, position)
        VALUES (@userId, @equipId, @level, @quality, @heroId, @position)
    `);
    const info = stmt.run({
        userId: params.userId,
        equipId: params.equipId,
        level: params.level || 1,
        quality: params.quality || 1,
        heroId: params.heroId || 0,
        position: params.position || 0
    });
    return db.prepare('SELECT * FROM equip_data WHERE id = ?').get(info.lastInsertRowid);
}

/**
 * Update equip by id — generic updater
 * @param {number} equipDbId
 * @param {object} fields
 */
function updateEquip(equipDbId, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return;
    const setClauses = keys.map(k => `${k} = @${k}`).join(', ');
    const values = { id: equipDbId, ...fields };
    db.prepare(`UPDATE equip_data SET ${setClauses} WHERE id = @id`).run(values);
}

/**
 * Delete equip by id
 * @param {number} equipDbId
 * @returns {boolean}
 */
function deleteEquip(equipDbId) {
    const info = db.prepare('DELETE FROM equip_data WHERE id = ?').run(equipDbId);
    return info.changes > 0;
}

// ═══════════════════════════════════════════════════════════════
// WEAPON DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get all weapons for a user
 * @param {string} userId
 * @returns {array}
 */
function getWeapons(userId) {
    return db.prepare('SELECT * FROM weapon_data WHERE userId = ?').all(userId);
}

/**
 * Get weapon by database id
 * @param {number} id
 * @returns {object|null}
 */
function getWeaponById(id) {
    return db.prepare('SELECT * FROM weapon_data WHERE id = ?').get(id);
}

/**
 * Create weapon
 * @param {object} params
 * @returns {object} Created weapon row
 */
function createWeapon(params) {
    const stmt = db.prepare(`
        INSERT INTO weapon_data (userId, weaponId, displayId, level, quality, star, heroId, haloId, haloLevel, attrs, strengthenCost, haloCost)
        VALUES (@userId, @weaponId, @displayId, @level, @quality, @star, @heroId, @haloId, @haloLevel, @attrs, @strengthenCost, @haloCost)
    `);
    const info = stmt.run({
        userId: params.userId,
        weaponId: params.weaponId,
        displayId: params.displayId || 0,
        level: params.level || 1,
        quality: params.quality || 1,
        star: params.star || 0,
        heroId: params.heroId || 0,
        haloId: params.haloId || 0,
        haloLevel: params.haloLevel || 0,
        attrs: params.attrs || '[]',
        strengthenCost: params.strengthenCost || '[]',
        haloCost: params.haloCost || '[]'
    });
    return db.prepare('SELECT * FROM weapon_data WHERE id = ?').get(info.lastInsertRowid);
}

/**
 * Update weapon by id — generic updater
 * @param {number} weaponDbId
 * @param {object} fields
 */
function updateWeapon(weaponDbId, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return;
    const setClauses = keys.map(k => `${k} = @${k}`).join(', ');
    const values = { id: weaponDbId, ...fields };
    db.prepare(`UPDATE weapon_data SET ${setClauses} WHERE id = @id`).run(values);
}

/**
 * Delete weapon by id
 * @param {number} weaponDbId
 * @returns {boolean}
 */
function deleteWeapon(weaponDbId) {
    const info = db.prepare('DELETE FROM weapon_data WHERE id = ?').run(weaponDbId);
    return info.changes > 0;
}

// ═══════════════════════════════════════════════════════════════
// IMPRINT DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get all imprints for a user
 * @param {string} userId
 * @returns {array}
 */
function getImprints(userId) {
    return db.prepare('SELECT * FROM imprint_data WHERE userId = ?').all(userId);
}

/**
 * Get imprint by database id
 * @param {number} id
 * @returns {object|null}
 */
function getImprintById(id) {
    return db.prepare('SELECT * FROM imprint_data WHERE id = ?').get(id);
}

/**
 * Create imprint
 * @param {object} params
 * @returns {object} Created imprint row
 */
function createImprint(params) {
    const stmt = db.prepare(`
        INSERT INTO imprint_data (userId, imprintId, displayId, level, star, quality, part, heroId,
            mainAttr, starAttr, viceAttr, totalCost, addAttr, tmpViceAttr)
        VALUES (@userId, @imprintId, @displayId, @level, @star, @quality, @part, @heroId,
            @mainAttr, @starAttr, @viceAttr, @totalCost, @addAttr, @tmpViceAttr)
    `);
    const info = stmt.run({
        userId: params.userId,
        imprintId: params.imprintId,
        displayId: params.displayId || 0,
        level: params.level || 1,
        star: params.star || 0,
        quality: params.quality || 1,
        part: params.part || 0,
        heroId: params.heroId || 0,
        mainAttr: params.mainAttr || '{}',
        starAttr: params.starAttr || '{}',
        viceAttr: params.viceAttr || '[]',
        totalCost: params.totalCost || '[]',
        addAttr: params.addAttr || '{}',
        tmpViceAttr: params.tmpViceAttr || '[]'
    });
    return db.prepare('SELECT * FROM imprint_data WHERE id = ?').get(info.lastInsertRowid);
}

/**
 * Update imprint by id — generic updater
 * @param {number} imprintDbId
 * @param {object} fields
 */
function updateImprint(imprintDbId, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return;
    const setClauses = keys.map(k => `${k} = @${k}`).join(', ');
    const values = { id: imprintDbId, ...fields };
    db.prepare(`UPDATE imprint_data SET ${setClauses} WHERE id = @id`).run(values);
}

/**
 * Delete imprint by id
 * @param {number} imprintDbId
 * @returns {boolean}
 */
function deleteImprint(imprintDbId) {
    const info = db.prepare('DELETE FROM imprint_data WHERE id = ?').run(imprintDbId);
    return info.changes > 0;
}

// ═══════════════════════════════════════════════════════════════
// GENKI DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get all genkis for a user
 * @param {string} userId
 * @returns {array}
 */
function getGenkis(userId) {
    return db.prepare('SELECT * FROM genki_data WHERE userId = ?').all(userId);
}

/**
 * Get genki by database id
 * @param {number} id
 * @returns {object|null}
 */
function getGenkiById(id) {
    return db.prepare('SELECT * FROM genki_data WHERE id = ?').get(id);
}

/**
 * Create genki
 * @param {object} params
 * @returns {object} Created genki row
 */
function createGenki(params) {
    const stmt = db.prepare(`
        INSERT INTO genki_data (userId, genkiId, displayId, heroId, pos, mainAttr, viceAttr, disable)
        VALUES (@userId, @genkiId, @displayId, @heroId, @pos, @mainAttr, @viceAttr, @disable)
    `);
    const info = stmt.run({
        userId: params.userId,
        genkiId: params.genkiId,
        displayId: params.displayId || 0,
        heroId: params.heroId || 0,
        pos: params.pos || 0,
        mainAttr: params.mainAttr || '{}',
        viceAttr: params.viceAttr || '{}',
        disable: params.disable || 0
    });
    return db.prepare('SELECT * FROM genki_data WHERE id = ?').get(info.lastInsertRowid);
}

/**
 * Update genki by id — generic updater
 * @param {number} genkiDbId
 * @param {object} fields
 */
function updateGenki(genkiDbId, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return;
    const setClauses = keys.map(k => `${k} = @${k}`).join(', ');
    const values = { id: genkiDbId, ...fields };
    db.prepare(`UPDATE genki_data SET ${setClauses} WHERE id = @id`).run(values);
}

/**
 * Delete genki by id
 * @param {number} genkiDbId
 * @returns {boolean}
 */
function deleteGenki(genkiDbId) {
    const info = db.prepare('DELETE FROM genki_data WHERE id = ?').run(genkiDbId);
    return info.changes > 0;
}

// ═══════════════════════════════════════════════════════════════
// GUILD DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get guild by UUID
 * @param {string} guildUUID
 * @returns {object|null}
 */
function getGuild(guildUUID) {
    return db.prepare('SELECT * FROM guild_data WHERE guildUUID = ?').get(guildUUID);
}

/**
 * Get all guilds
 * @param {object} options - { page, pageSize, isAll }
 * @returns {array}
 */
function getGuilds(options = {}) {
    const page = options.page || 1;
    const pageSize = options.pageSize || 20;
    const offset = (page - 1) * pageSize;
    return db.prepare('SELECT * FROM guild_data ORDER BY memberNum DESC LIMIT ? OFFSET ?').all(pageSize, offset);
}

/**
 * Search guild by name or UUID
 * @param {string} idOrName
 * @returns {object|null}
 */
function getGuildByIdOrName(idOrName) {
    return db.prepare('SELECT * FROM guild_data WHERE guildUUID = ? OR guildName = ?').get(idOrName, idOrName);
}

/**
 * Create guild
 * @param {object} params
 * @returns {object} Created guild row
 */
function createGuild(params) {
    const stmt = db.prepare(`
        INSERT INTO guild_data (guildUUID, guildName, iconId, captainUserId, viceCaptainUserId,
            bulletin, description, level, exp, memberNum, needAgree, limitLevel, createTime, activePoint)
        VALUES (@guildUUID, @guildName, @iconId, @captainUserId, @viceCaptainUserId,
            @bulletin, @description, @level, @exp, @memberNum, @needAgree, @limitLevel, @createTime, @activePoint)
    `);
    stmt.run({
        guildUUID: params.guildUUID,
        guildName: params.guildName,
        iconId: params.iconId || 0,
        captainUserId: params.captainUserId,
        viceCaptainUserId: params.viceCaptainUserId || '',
        bulletin: params.bulletin || '',
        description: params.description || '',
        level: params.level || 1,
        exp: params.exp || 0,
        memberNum: params.memberNum || 0,
        needAgree: params.needAgree !== undefined ? params.needAgree : 1,
        limitLevel: params.limitLevel || 0,
        createTime: params.createTime || Date.now(),
        activePoint: params.activePoint || 0
    });
    return getGuild(params.guildUUID);
}

/**
 * Update guild by UUID — generic updater
 * @param {string} guildUUID
 * @param {object} fields
 */
function updateGuild(guildUUID, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return;
    const setClauses = keys.map(k => `${k} = @${k}`).join(', ');
    const values = { guildUUID, ...fields };
    db.prepare(`UPDATE guild_data SET ${setClauses} WHERE guildUUID = @guildUUID`).run(values);
}

/**
 * Delete guild by UUID
 * @param {string} guildUUID
 * @returns {boolean}
 */
function deleteGuild(guildUUID) {
    const info = db.prepare('DELETE FROM guild_data WHERE guildUUID = ?').run(guildUUID);
    return info.changes > 0;
}

// ═══════════════════════════════════════════════════════════════
// GUILD MEMBER DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get all members of a guild
 * @param {string} guildUUID
 * @returns {array}
 */
function getGuildMembers(guildUUID) {
    return db.prepare('SELECT * FROM guild_member_data WHERE guildUUID = ?').all(guildUUID);
}

/**
 * Get guild member by userId
 * @param {string} userId
 * @returns {object|null}
 */
function getGuildMemberByUserId(userId) {
    return db.prepare('SELECT * FROM guild_member_data WHERE userId = ?').get(userId);
}

/**
 * Create guild member
 * @param {object} params
 * @returns {object} Created member row
 */
function createGuildMember(params) {
    const stmt = db.prepare(`
        INSERT INTO guild_member_data (guildUUID, userId, position, joinTime, donateNum)
        VALUES (@guildUUID, @userId, @position, @joinTime, @donateNum)
    `);
    const info = stmt.run({
        guildUUID: params.guildUUID,
        userId: params.userId,
        position: params.position || 0,
        joinTime: params.joinTime || Date.now(),
        donateNum: params.donateNum || 0
    });
    return db.prepare('SELECT * FROM guild_member_data WHERE id = ?').get(info.lastInsertRowid);
}

/**
 * Update guild member by id — generic updater
 * @param {number} memberDbId
 * @param {object} fields
 */
function updateGuildMember(memberDbId, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return;
    const setClauses = keys.map(k => `${k} = @${k}`).join(', ');
    const values = { id: memberDbId, ...fields };
    db.prepare(`UPDATE guild_member_data SET ${setClauses} WHERE id = @id`).run(values);
}

/**
 * Delete guild member by id
 * @param {number} memberDbId
 * @returns {boolean}
 */
function deleteGuildMember(memberDbId) {
    const info = db.prepare('DELETE FROM guild_member_data WHERE id = ?').run(memberDbId);
    return info.changes > 0;
}

// ═══════════════════════════════════════════════════════════════
// FRIEND DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get all friends for a user
 * @param {string} userId
 * @returns {array}
 */
function getFriends(userId) {
    return db.prepare('SELECT * FROM friend_data WHERE userId = ?').all(userId);
}

/**
 * Get specific friend record
 * @param {string} userId
 * @param {string} friendId
 * @returns {object|null}
 */
function getFriend(userId, friendId) {
    return db.prepare('SELECT * FROM friend_data WHERE userId = ? AND friendId = ?').get(userId, friendId);
}

/**
 * Create friend (add friend)
 * @param {object} params
 * @returns {object|null} Created friend row
 */
function createFriend(params) {
    const stmt = db.prepare(`
        INSERT INTO friend_data (userId, friendId, giveHeartTime, getHeartTime)
        VALUES (@userId, @friendId, @giveHeartTime, @getHeartTime)
    `);
    const info = stmt.run({
        userId: params.userId,
        friendId: params.friendId,
        giveHeartTime: params.giveHeartTime || 0,
        getHeartTime: params.getHeartTime || 0
    });
    return db.prepare('SELECT * FROM friend_data WHERE id = ?').get(info.lastInsertRowid);
}

/**
 * Update friend by id — generic updater
 * @param {number} friendDbId
 * @param {object} fields
 */
function updateFriend(friendDbId, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return;
    const setClauses = keys.map(k => `${k} = @${k}`).join(', ');
    const values = { id: friendDbId, ...fields };
    db.prepare(`UPDATE friend_data SET ${setClauses} WHERE id = @id`).run(values);
}

/**
 * Delete friend by id
 * @param {number} friendDbId
 * @returns {boolean}
 */
function deleteFriend(friendDbId) {
    const info = db.prepare('DELETE FROM friend_data WHERE id = ?').run(friendDbId);
    return info.changes > 0;
}

// ═══════════════════════════════════════════════════════════════
// FRIEND BLACKLIST OPERATIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get blacklist for a user
 * @param {string} userId
 * @returns {array}
 */
function getBlacklist(userId) {
    return db.prepare('SELECT * FROM friend_blacklist WHERE userId = ?').all(userId);
}

/**
 * Add to blacklist
 * @param {object} params
 * @returns {object|null} Created row
 */
function createBlacklist(params) {
    const stmt = db.prepare(`
        INSERT INTO friend_blacklist (userId, targetUserId)
        VALUES (@userId, @targetUserId)
    `);
    const info = stmt.run({
        userId: params.userId,
        targetUserId: params.targetUserId
    });
    return db.prepare('SELECT * FROM friend_blacklist WHERE id = ?').get(info.lastInsertRowid);
}

/**
 * Remove from blacklist
 * @param {string} userId
 * @param {string} targetUserId
 * @returns {boolean}
 */
function deleteBlacklist(userId, targetUserId) {
    const info = db.prepare('DELETE FROM friend_blacklist WHERE userId = ? AND targetUserId = ?').run(userId, targetUserId);
    return info.changes > 0;
}

// ═══════════════════════════════════════════════════════════════
// ARENA DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get arena data for a user
 * @param {string} userId
 * @returns {object|null}
 */
function getArena(userId) {
    return db.prepare('SELECT * FROM arena_data WHERE userId = ?').get(userId);
}

/**
 * Create or update arena data (upsert)
 * @param {string} userId
 * @param {object} fields
 */
function upsertArena(userId, fields) {
    const stmt = db.prepare(`
        INSERT INTO arena_data (userId, rank, times, buyTimes, team, lastRefreshTime)
        VALUES (@userId, @rank, @times, @buyTimes, @team, @lastRefreshTime)
        ON CONFLICT(userId) DO UPDATE SET
            rank = @rank, times = @times, buyTimes = @buyTimes,
            team = @team, lastRefreshTime = @lastRefreshTime
    `);
    stmt.run({
        userId,
        rank: fields.rank || 0,
        times: fields.times || 5,
        buyTimes: fields.buyTimes || 0,
        team: fields.team || '{}',
        lastRefreshTime: fields.lastRefreshTime || 0
    });
}

/**
 * Update arena by userId — generic updater
 * @param {string} userId
 * @param {object} fields
 */
function updateArena(userId, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return;
    const setClauses = keys.map(k => `${k} = @${k}`).join(', ');
    const values = { userId, ...fields };
    db.prepare(`UPDATE arena_data SET ${setClauses} WHERE userId = @userId`).run(values);
}

/**
 * Get arena rank list
 * @param {number} limit
 * @returns {array}
 */
function getArenaRankList(limit = 100) {
    return db.prepare('SELECT * FROM arena_data WHERE rank > 0 ORDER BY rank ASC LIMIT ?').all(limit);
}

// ═══════════════════════════════════════════════════════════════
// MAIL DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get all mail for a user
 * @param {string} userId
 * @returns {array}
 */
function getMails(userId) {
    return db.prepare('SELECT * FROM mail_data WHERE userId = ? ORDER BY sendTime DESC').all(userId);
}

/**
 * Get mail by mailId
 * @param {number} mailId
 * @returns {object|null}
 */
function getMailById(mailId) {
    return db.prepare('SELECT * FROM mail_data WHERE mailId = ?').get(mailId);
}

/**
 * Create mail
 * @param {object} params
 * @returns {object} Created mail row
 */
function createMail(params) {
    const stmt = db.prepare(`
        INSERT INTO mail_data (userId, senderId, title, content, awards, isRead, isGot, sendTime, expireTime, type)
        VALUES (@userId, @senderId, @title, @content, @awards, @isRead, @isGot, @sendTime, @expireTime, @type)
    `);
    const info = stmt.run({
        userId: params.userId,
        senderId: params.senderId || '',
        title: params.title || '',
        content: params.content || '',
        awards: params.awards || '[]',
        isRead: params.isRead || 0,
        isGot: params.isGot || 0,
        sendTime: params.sendTime || Date.now(),
        expireTime: params.expireTime || (Date.now() + 7 * 24 * 60 * 60 * 1000),
        type: params.type || 0
    });
    return db.prepare('SELECT * FROM mail_data WHERE mailId = ?').get(info.lastInsertRowid);
}

/**
 * Update mail by mailId — generic updater
 * @param {number} mailId
 * @param {object} fields
 */
function updateMail(mailId, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return;
    const setClauses = keys.map(k => `${k} = @${k}`).join(', ');
    const values = { mailId, ...fields };
    db.prepare(`UPDATE mail_data SET ${setClauses} WHERE mailId = @mailId`).run(values);
}

/**
 * Delete mail by mailId
 * @param {number} mailId
 * @returns {boolean}
 */
function deleteMail(mailId) {
    const info = db.prepare('DELETE FROM mail_data WHERE mailId = ?').run(mailId);
    return info.changes > 0;
}

/**
 * Delete expired mail for a user
 * @param {string} userId
 * @returns {number} Number of deleted mails
 */
function deleteExpiredMails(userId) {
    const info = db.prepare('DELETE FROM mail_data WHERE userId = ? AND expireTime < ? AND isGot = 1').run(userId, Date.now());
    return info.changes;
}

// ═══════════════════════════════════════════════════════════════
// SHOP DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get shop data for a user by shopType
 * @param {string} userId
 * @param {number} shopType
 * @returns {array}
 */
function getShopByType(userId, shopType) {
    return db.prepare('SELECT * FROM shop_data WHERE userId = ? AND shopType = ?').all(userId, shopType);
}

/**
 * Get all shop data for a user
 * @param {string} userId
 * @returns {array}
 */
function getShops(userId) {
    return db.prepare('SELECT * FROM shop_data WHERE userId = ?').all(userId);
}

/**
 * Get specific shop goods
 * @param {string} userId
 * @param {number} shopType
 * @param {number} goodsId
 * @returns {object|null}
 */
function getShopGoods(userId, shopType, goodsId) {
    return db.prepare('SELECT * FROM shop_data WHERE userId = ? AND shopType = ? AND goodsId = ?').get(userId, shopType, goodsId);
}

/**
 * Upsert shop goods (create or update)
 * @param {object} params
 */
function upsertShopGoods(params) {
    const stmt = db.prepare(`
        INSERT INTO shop_data (userId, shopType, goodsId, buyTimes, refreshTime)
        VALUES (@userId, @shopType, @goodsId, @buyTimes, @refreshTime)
        ON CONFLICT(userId, shopType, goodsId) DO UPDATE SET
            buyTimes = @buyTimes, refreshTime = @refreshTime
    `);
    stmt.run({
        userId: params.userId,
        shopType: params.shopType,
        goodsId: params.goodsId,
        buyTimes: params.buyTimes || 0,
        refreshTime: params.refreshTime || 0
    });
}

/**
 * Update shop goods — generic updater
 * @param {number} shopDbId
 * @param {object} fields
 */
function updateShopGoods(shopDbId, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return;
    const setClauses = keys.map(k => `${k} = @${k}`).join(', ');
    const values = { id: shopDbId, ...fields };
    db.prepare(`UPDATE shop_data SET ${setClauses} WHERE id = @id`).run(values);
}

/**
 * Delete shop goods
 * @param {number} shopDbId
 * @returns {boolean}
 */
function deleteShopGoods(shopDbId) {
    const info = db.prepare('DELETE FROM shop_data WHERE id = ?').run(shopDbId);
    return info.changes > 0;
}

// ═══════════════════════════════════════════════════════════════
// DUNGEON DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get all dungeon data for a user
 * @param {string} userId
 * @returns {array}
 */
function getDungeons(userId) {
    return db.prepare('SELECT * FROM dungeon_data WHERE userId = ?').all(userId);
}

/**
 * Get dungeon by type
 * @param {string} userId
 * @param {number} dungeonType
 * @returns {object|null}
 */
function getDungeonByType(userId, dungeonType) {
    return db.prepare('SELECT * FROM dungeon_data WHERE userId = ? AND dungeonType = ?').get(userId, dungeonType);
}

/**
 * Upsert dungeon data
 * @param {object} params
 */
function upsertDungeon(params) {
    const stmt = db.prepare(`
        INSERT INTO dungeon_data (userId, dungeonType, level, sweepLevel, times, buyTimes)
        VALUES (@userId, @dungeonType, @level, @sweepLevel, @times, @buyTimes)
        ON CONFLICT(userId, dungeonType) DO UPDATE SET
            level = @level, sweepLevel = @sweepLevel, times = @times, buyTimes = @buyTimes
    `);
    stmt.run({
        userId: params.userId,
        dungeonType: params.dungeonType,
        level: params.level || 0,
        sweepLevel: params.sweepLevel || 0,
        times: params.times || 0,
        buyTimes: params.buyTimes || 0
    });
}

/**
 * Update dungeon by id — generic updater
 * @param {number} dungeonDbId
 * @param {object} fields
 */
function updateDungeon(dungeonDbId, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return;
    const setClauses = keys.map(k => `${k} = @${k}`).join(', ');
    const values = { id: dungeonDbId, ...fields };
    db.prepare(`UPDATE dungeon_data SET ${setClauses} WHERE id = @id`).run(values);
}

/**
 * Delete dungeon by id
 * @param {number} dungeonDbId
 * @returns {boolean}
 */
function deleteDungeon(dungeonDbId) {
    const info = db.prepare('DELETE FROM dungeon_data WHERE id = ?').run(dungeonDbId);
    return info.changes > 0;
}

// ═══════════════════════════════════════════════════════════════
// TOWER DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get tower data for a user
 * @param {string} userId
 * @returns {object|null}
 */
function getTower(userId) {
    return db.prepare('SELECT * FROM tower_data WHERE userId = ?').get(userId);
}

/**
 * Create tower data
 * @param {string} userId
 * @returns {object} Created tower row
 */
function createTower(userId) {
    db.prepare(`
        INSERT INTO tower_data (userId, floor, times, buyTimes, climbTimes, events)
        VALUES (?, 0, 10, 0, 0, '[]')
    `).run(userId);
    return getTower(userId);
}

/**
 * Update tower by userId — generic updater
 * @param {string} userId
 * @param {object} fields
 */
function updateTower(userId, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return;
    const setClauses = keys.map(k => `${k} = @${k}`).join(', ');
    const values = { userId, ...fields };
    db.prepare(`UPDATE tower_data SET ${setClauses} WHERE userId = @userId`).run(values);
}

/**
 * Get tower rank list
 * @param {number} limit
 * @returns {array}
 */
function getTowerRankList(limit = 100) {
    return db.prepare('SELECT * FROM tower_data WHERE floor > 0 ORDER BY floor DESC LIMIT ?').all(limit);
}

// ═══════════════════════════════════════════════════════════════
// EXPEDITION DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get all expeditions for a user
 * @param {string} userId
 * @returns {array}
 */
function getExpeditions(userId) {
    return db.prepare('SELECT * FROM expedition_data WHERE userId = ?').all(userId);
}

/**
 * Get expedition by id
 * @param {number} id
 * @returns {object|null}
 */
function getExpeditionById(id) {
    return db.prepare('SELECT * FROM expedition_data WHERE id = ?').get(id);
}

/**
 * Create expedition
 * @param {object} params
 * @returns {object} Created expedition row
 */
function createExpedition(params) {
    const stmt = db.prepare(`
        INSERT INTO expedition_data (userId, machineId, heroId, lessonIds, teams)
        VALUES (@userId, @machineId, @heroId, @lessonIds, @teams)
    `);
    const info = stmt.run({
        userId: params.userId,
        machineId: params.machineId || 0,
        heroId: params.heroId || 0,
        lessonIds: params.lessonIds || '[]',
        teams: params.teams || '[]'
    });
    return db.prepare('SELECT * FROM expedition_data WHERE id = ?').get(info.lastInsertRowid);
}

/**
 * Update expedition by id — generic updater
 * @param {number} expeditionDbId
 * @param {object} fields
 */
function updateExpedition(expeditionDbId, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return;
    const setClauses = keys.map(k => `${k} = @${k}`).join(', ');
    const values = { id: expeditionDbId, ...fields };
    db.prepare(`UPDATE expedition_data SET ${setClauses} WHERE id = @id`).run(values);
}

/**
 * Delete expedition by id
 * @param {number} expeditionDbId
 * @returns {boolean}
 */
function deleteExpedition(expeditionDbId) {
    const info = db.prepare('DELETE FROM expedition_data WHERE id = ?').run(expeditionDbId);
    return info.changes > 0;
}

// ═══════════════════════════════════════════════════════════════
// BATTLE DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get battle by battleId
 * @param {string} battleId
 * @returns {object|null}
 */
function getBattle(battleId) {
    return db.prepare('SELECT * FROM battle_data WHERE battleId = ?').get(battleId);
}

/**
 * Get active battles for a user
 * @param {string} userId
 * @returns {array}
 */
function getBattles(userId) {
    return db.prepare('SELECT * FROM battle_data WHERE userId = ? AND status = 0').all(userId);
}

/**
 * Create battle
 * @param {object} params
 * @returns {object} Created battle row
 */
function createBattle(params) {
    const stmt = db.prepare(`
        INSERT INTO battle_data (battleId, userId, battleField, seed, team, startTime, status)
        VALUES (@battleId, @userId, @battleField, @seed, @team, @startTime, @status)
    `);
    stmt.run({
        battleId: params.battleId,
        userId: params.userId,
        battleField: params.battleField,
        seed: params.seed || '',
        team: params.team || '{}',
        startTime: params.startTime || Date.now(),
        status: params.status || 0
    });
    return getBattle(params.battleId);
}

/**
 * Update battle by battleId — generic updater
 * @param {string} battleId
 * @param {object} fields
 */
function updateBattle(battleId, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return;
    const setClauses = keys.map(k => `${k} = @${k}`).join(', ');
    const values = { battleId, ...fields };
    db.prepare(`UPDATE battle_data SET ${setClauses} WHERE battleId = @battleId`).run(values);
}

/**
 * Delete battle by battleId
 * @param {string} battleId
 * @returns {boolean}
 */
function deleteBattle(battleId) {
    const info = db.prepare('DELETE FROM battle_data WHERE battleId = ?').run(battleId);
    return info.changes > 0;
}

/**
 * Cleanup old battles (status != 0 and older than 1 hour)
 * @returns {number} Number of deleted battles
 */
function cleanupOldBattles() {
    const cutoff = Date.now() - 60 * 60 * 1000;
    const info = db.prepare('DELETE FROM battle_data WHERE status != 0 AND startTime < ?').run(cutoff);
    return info.changes;
}

// ═══════════════════════════════════════════════════════════════
// BALL WAR DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get ball war data for a user
 * @param {string} userId
 * @returns {object|null}
 */
function getBallWar(userId) {
    return db.prepare('SELECT * FROM ball_war_data WHERE userId = ?').get(userId);
}

/**
 * Create or update ball war data (upsert)
 * @param {string} userId
 * @param {object} fields
 */
function upsertBallWar(userId, fields) {
    const stmt = db.prepare(`
        INSERT INTO ball_war_data (userId, state, signedUp, times, defence)
        VALUES (@userId, @state, @signedUp, @times, @defence)
        ON CONFLICT(userId) DO UPDATE SET
            state = @state, signedUp = @signedUp, times = @times, defence = @defence
    `);
    stmt.run({
        userId,
        state: fields.state || 0,
        signedUp: fields.signedUp || 0,
        times: fields.times || 3,
        defence: fields.defence || '{}'
    });
}

/**
 * Update ball war by userId — generic updater
 * @param {string} userId
 * @param {object} fields
 */
function updateBallWar(userId, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return;
    const setClauses = keys.map(k => `${k} = @${k}`).join(', ');
    const values = { userId, ...fields };
    db.prepare(`UPDATE ball_war_data SET ${setClauses} WHERE userId = @userId`).run(values);
}

// ═══════════════════════════════════════════════════════════════
// ENTRUST DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get all entrusts for a user
 * @param {string} userId
 * @returns {array}
 */
function getEntrusts(userId) {
    return db.prepare('SELECT * FROM entrust_data WHERE userId = ?').all(userId);
}

/**
 * Get entrust by id
 * @param {number} id
 * @returns {object|null}
 */
function getEntrustById(id) {
    return db.prepare('SELECT * FROM entrust_data WHERE id = ?').get(id);
}

/**
 * Create entrust
 * @param {object} params
 * @returns {object} Created entrust row
 */
function createEntrust(params) {
    const stmt = db.prepare(`
        INSERT INTO entrust_data (userId, entrustIndex, heroInfo, status, finishTime)
        VALUES (@userId, @entrustIndex, @heroInfo, @status, @finishTime)
    `);
    const info = stmt.run({
        userId: params.userId,
        entrustIndex: params.entrustIndex || 0,
        heroInfo: params.heroInfo || '{}',
        status: params.status || 0,
        finishTime: params.finishTime || 0
    });
    return db.prepare('SELECT * FROM entrust_data WHERE id = ?').get(info.lastInsertRowid);
}

/**
 * Update entrust by id — generic updater
 * @param {number} entrustDbId
 * @param {object} fields
 */
function updateEntrust(entrustDbId, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return;
    const setClauses = keys.map(k => `${k} = @${k}`).join(', ');
    const values = { id: entrustDbId, ...fields };
    db.prepare(`UPDATE entrust_data SET ${setClauses} WHERE id = @id`).run(values);
}

/**
 * Delete entrust by id
 * @param {number} entrustDbId
 * @returns {boolean}
 */
function deleteEntrust(entrustDbId) {
    const info = db.prepare('DELETE FROM entrust_data WHERE id = ?').run(entrustDbId);
    return info.changes > 0;
}

// ═══════════════════════════════════════════════════════════════
// RESONANCE DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get all resonance data for a user
 * @param {string} userId
 * @returns {array}
 */
function getResonances(userId) {
    return db.prepare('SELECT * FROM resonance_data WHERE userId = ?').all(userId);
}

/**
 * Get resonance by id
 * @param {number} id
 * @returns {object|null}
 */
function getResonanceById(id) {
    return db.prepare('SELECT * FROM resonance_data WHERE id = ?').get(id);
}

/**
 * Get resonance by cabinId + seatId
 * @param {string} userId
 * @param {number} cabinId
 * @param {number} seatId
 * @returns {object|null}
 */
function getResonanceBySeat(userId, cabinId, seatId) {
    return db.prepare('SELECT * FROM resonance_data WHERE userId = ? AND cabinId = ? AND seatId = ?').get(userId, cabinId, seatId);
}

/**
 * Create resonance
 * @param {object} params
 * @returns {object} Created resonance row
 */
function createResonance(params) {
    const stmt = db.prepare(`
        INSERT INTO resonance_data (userId, cabinId, seatId, heroId)
        VALUES (@userId, @cabinId, @seatId, @heroId)
    `);
    const info = stmt.run({
        userId: params.userId,
        cabinId: params.cabinId,
        seatId: params.seatId,
        heroId: params.heroId || 0
    });
    return db.prepare('SELECT * FROM resonance_data WHERE id = ?').get(info.lastInsertRowid);
}

/**
 * Update resonance by id — generic updater
 * @param {number} resonanceDbId
 * @param {object} fields
 */
function updateResonance(resonanceDbId, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return;
    const setClauses = keys.map(k => `${k} = @${k}`).join(', ');
    const values = { id: resonanceDbId, ...fields };
    db.prepare(`UPDATE resonance_data SET ${setClauses} WHERE id = @id`).run(values);
}

/**
 * Delete resonance by id
 * @param {number} resonanceDbId
 * @returns {boolean}
 */
function deleteResonance(resonanceDbId) {
    const info = db.prepare('DELETE FROM resonance_data WHERE id = ?').run(resonanceDbId);
    return info.changes > 0;
}

// ═══════════════════════════════════════════════════════════════
// SUPER SKILL DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get all super skills for a user
 * @param {string} userId
 * @returns {array}
 */
function getSuperSkills(userId) {
    return db.prepare('SELECT * FROM super_skill_data WHERE userId = ?').all(userId);
}

/**
 * Get super skill by id
 * @param {number} id
 * @returns {object|null}
 */
function getSuperSkillById(id) {
    return db.prepare('SELECT * FROM super_skill_data WHERE id = ?').get(id);
}

/**
 * Get super skill by skillId
 * @param {string} userId
 * @param {number} skillId
 * @returns {object|null}
 */
function getSuperSkillBySkillId(userId, skillId) {
    return db.prepare('SELECT * FROM super_skill_data WHERE userId = ? AND skillId = ?').get(userId, skillId);
}

/**
 * Create super skill
 * @param {object} params
 * @returns {object} Created super skill row
 */
function createSuperSkill(params) {
    const stmt = db.prepare(`
        INSERT INTO super_skill_data (userId, skillId, level, evolveLevel)
        VALUES (@userId, @skillId, @level, @evolveLevel)
    `);
    const info = stmt.run({
        userId: params.userId,
        skillId: params.skillId,
        level: params.level || 1,
        evolveLevel: params.evolveLevel || 0
    });
    return db.prepare('SELECT * FROM super_skill_data WHERE id = ?').get(info.lastInsertRowid);
}

/**
 * Update super skill by id — generic updater
 * @param {number} superSkillDbId
 * @param {object} fields
 */
function updateSuperSkill(superSkillDbId, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return;
    const setClauses = keys.map(k => `${k} = @${k}`).join(', ');
    const values = { id: superSkillDbId, ...fields };
    db.prepare(`UPDATE super_skill_data SET ${setClauses} WHERE id = @id`).run(values);
}

/**
 * Delete super skill by id
 * @param {number} superSkillDbId
 * @returns {boolean}
 */
function deleteSuperSkill(superSkillDbId) {
    const info = db.prepare('DELETE FROM super_skill_data WHERE id = ?').run(superSkillDbId);
    return info.changes > 0;
}

// ═══════════════════════════════════════════════════════════════
// GEMSTONE DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get all gemstones for a user
 * @param {string} userId
 * @returns {array}
 */
function getGemstones(userId) {
    return db.prepare('SELECT * FROM gemstone_data WHERE userId = ?').all(userId);
}

/**
 * Get gemstone by id
 * @param {number} id
 * @returns {object|null}
 */
function getGemstoneById(id) {
    return db.prepare('SELECT * FROM gemstone_data WHERE id = ?').get(id);
}

/**
 * Create gemstone
 * @param {object} params
 * @returns {object} Created gemstone row
 */
function createGemstone(params) {
    const stmt = db.prepare(`
        INSERT INTO gemstone_data (userId, stoneId, displayId, level, heroId, totalExp, version, jewPosition)
        VALUES (@userId, @stoneId, @displayId, @level, @heroId, @totalExp, @version, @jewPosition)
    `);
    const info = stmt.run({
        userId: params.userId,
        stoneId: params.stoneId,
        displayId: params.displayId || 0,
        level: params.level || 1,
        heroId: params.heroId || 0,
        totalExp: params.totalExp || 0,
        version: params.version || '',
        jewPosition: params.jewPosition || 1
    });
    return db.prepare('SELECT * FROM gemstone_data WHERE id = ?').get(info.lastInsertRowid);
}

/**
 * Update gemstone by id — generic updater
 * @param {number} gemstoneDbId
 * @param {object} fields
 */
function updateGemstone(gemstoneDbId, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return;
    const setClauses = keys.map(k => `${k} = @${k}`).join(', ');
    const values = { id: gemstoneDbId, ...fields };
    db.prepare(`UPDATE gemstone_data SET ${setClauses} WHERE id = @id`).run(values);
}

/**
 * Delete gemstone by id
 * @param {number} gemstoneDbId
 * @returns {boolean}
 */
function deleteGemstone(gemstoneDbId) {
    const info = db.prepare('DELETE FROM gemstone_data WHERE id = ?').run(gemstoneDbId);
    return info.changes > 0;
}

// ═══════════════════════════════════════════════════════════════
// RANK DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Get ranks by type
 * @param {number} rankType
 * @param {number} limit
 * @returns {array}
 */
function getRanksByType(rankType, limit = 100) {
    return db.prepare('SELECT * FROM rank_data WHERE rankType = ? ORDER BY rankValue DESC LIMIT ?').all(rankType, limit);
}

/**
 * Get user rank by type
 * @param {string} userId
 * @param {number} rankType
 * @returns {object|null}
 */
function getRankByType(userId, rankType) {
    return db.prepare('SELECT * FROM rank_data WHERE userId = ? AND rankType = ?').get(userId, rankType);
}

/**
 * Get all ranks for a user
 * @param {string} userId
 * @returns {array}
 */
function getRanks(userId) {
    return db.prepare('SELECT * FROM rank_data WHERE userId = ?').all(userId);
}

/**
 * Create rank entry
 * @param {object} params
 * @returns {object} Created rank row
 */
function createRank(params) {
    const stmt = db.prepare(`
        INSERT INTO rank_data (rankType, userId, rankValue, rankLevel)
        VALUES (@rankType, @userId, @rankValue, @rankLevel)
    `);
    const info = stmt.run({
        rankType: params.rankType,
        userId: params.userId,
        rankValue: params.rankValue || 0,
        rankLevel: params.rankLevel || 0
    });
    return db.prepare('SELECT * FROM rank_data WHERE id = ?').get(info.lastInsertRowid);
}

/**
 * Update rank by id — generic updater
 * @param {number} rankDbId
 * @param {object} fields
 */
function updateRank(rankDbId, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return;
    const setClauses = keys.map(k => `${k} = @${k}`).join(', ');
    const values = { id: rankDbId, ...fields };
    db.prepare(`UPDATE rank_data SET ${setClauses} WHERE id = @id`).run(values);
}

/**
 * Delete rank by id
 * @param {number} rankDbId
 * @returns {boolean}
 */
function deleteRank(rankDbId) {
    const info = db.prepare('DELETE FROM rank_data WHERE id = ?').run(rankDbId);
    return info.changes > 0;
}

/**
 * Upsert rank (update if exists, create if not)
 * @param {string} userId
 * @param {number} rankType
 * @param {object} fields
 */
function upsertRank(userId, rankType, fields) {
    const existing = getRankByType(userId, rankType);
    if (existing) {
        updateRank(existing.id, fields);
    } else {
        createRank({ userId, rankType, ...fields });
    }
}

// ═══════════════════════════════════════════════════════════════
// UTILITY OPERATIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Delete all data for a user (used for account deletion)
 * @param {string} userId
 * @returns {void}
 */
function deleteAllUserData(userId) {
    const deleteMany = db.transaction(() => {
        db.prepare('DELETE FROM hero_data WHERE userId = ?').run(userId);
        db.prepare('DELETE FROM item_data WHERE userId = ?').run(userId);
        db.prepare('DELETE FROM equip_data WHERE userId = ?').run(userId);
        db.prepare('DELETE FROM weapon_data WHERE userId = ?').run(userId);
        db.prepare('DELETE FROM imprint_data WHERE userId = ?').run(userId);
        db.prepare('DELETE FROM genki_data WHERE userId = ?').run(userId);
        db.prepare('DELETE FROM guild_member_data WHERE userId = ?').run(userId);
        db.prepare('DELETE FROM friend_data WHERE userId = ?').run(userId);
        db.prepare('DELETE FROM friend_blacklist WHERE userId = ?').run(userId);
        db.prepare('DELETE FROM arena_data WHERE userId = ?').run(userId);
        db.prepare('DELETE FROM mail_data WHERE userId = ?').run(userId);
        db.prepare('DELETE FROM shop_data WHERE userId = ?').run(userId);
        db.prepare('DELETE FROM dungeon_data WHERE userId = ?').run(userId);
        db.prepare('DELETE FROM tower_data WHERE userId = ?').run(userId);
        db.prepare('DELETE FROM expedition_data WHERE userId = ?').run(userId);
        db.prepare('DELETE FROM battle_data WHERE userId = ?').run(userId);
        db.prepare('DELETE FROM ball_war_data WHERE userId = ?').run(userId);
        db.prepare('DELETE FROM entrust_data WHERE userId = ?').run(userId);
        db.prepare('DELETE FROM resonance_data WHERE userId = ?').run(userId);
        db.prepare('DELETE FROM super_skill_data WHERE userId = ?').run(userId);
        db.prepare('DELETE FROM gemstone_data WHERE userId = ?').run(userId);
        db.prepare('DELETE FROM rank_data WHERE userId = ?').run(userId);
        db.prepare('DELETE FROM user_data WHERE userId = ?').run(userId);
    });
    deleteMany();
}

/**
 * Get online user count
 * @returns {number}
 */
function getOnlineCount() {
    const result = db.prepare('SELECT COUNT(*) as count FROM user_data WHERE online = 1').get();
    return result.count;
}

/**
 * Get total user count
 * @returns {number}
 */
function getTotalUserCount() {
    const result = db.prepare('SELECT COUNT(*) as count FROM user_data').get();
    return result.count;
}

// ═══════════════════════════════════════════════════════════════
// COMPOSITE / CONVENIENCE FUNCTIONS
// Digunakan oleh handlers — menggabungkan beberapa operasi dasar
// ═══════════════════════════════════════════════════════════════

/**
 * Create complete user — transaction: user_data + tower_data + arena_data + ball_war_data
 * Dipanggil oleh enterGame handler saat user baru pertama kali login.
 * SQLite DEFAULT constraints menangani semua default values.
 *
 * @param {string} userId
 * @param {string} nickName
 * @param {string} loginToken
 * @param {string} serverId
 * @param {string} language
 * @returns {object} Created user row
 */
function createCompleteUser(userId, nickName, loginToken, serverId, language) {
    const createAll = db.transaction(() => {
        // 1. Insert user_data — hanya kolom yang perlu di-INSERT eksplisit
        //    Semua kolom lain pakai SQLite DEFAULT
        db.prepare(`
            INSERT INTO user_data (userId, nickName, loginToken, serverId, language, createTime, lastLoginTime, online)
            VALUES (?, ?, ?, ?, ?, ?, ?, 1)
        `).run(userId, nickName, loginToken, serverId, language || 'en', Date.now(), Date.now());

        // 2. Auto-create tower_data row (userId PK, DEFAULT menangani sisanya)
        db.prepare(`
            INSERT INTO tower_data (userId) VALUES (?)
        `).run(userId);

        // 3. Auto-create arena_data row (userId PK, DEFAULT menangani sisanya)
        db.prepare(`
            INSERT INTO arena_data (userId) VALUES (?)
        `).run(userId);

        // 4. Auto-create ball_war_data row (userId PK, DEFAULT menangani sisanya)
        db.prepare(`
            INSERT INTO ball_war_data (userId) VALUES (?)
        `).run(userId);
    });

    createAll();
    return getUser(userId);
}

/**
 * Get guild info by userId — JOIN guild_member_data + guild_data
 * Digunakan oleh enterGame untuk mendapatkan guildUUID dan guildName
 *
 * @param {string} userId
 * @returns {object|null} { guildUUID, guildName, ... } or null
 */
function getGuildByUser(userId) {
    const stmt = db.prepare(`
        SELECT g.guildUUID, g.guildName, g.iconId, g.level as guildLevel,
               m.position as memberPosition, m.joinTime, m.donateNum
        FROM guild_member_data m
        JOIN guild_data g ON g.guildUUID = m.guildUUID
        WHERE m.userId = ?
    `);
    return stmt.get(userId) || null;
}

/**
 * Get shop data for enterGame response
 * Mengembalikan semua shop entries untuk user dalam format yang bisa
 * langsung dipakai oleh client
 *
 * @param {string} userId
 * @returns {array}
 */
function getShopData(userId) {
    return getShops(userId);
}

/**
 * Get dungeon progress for enterGame response
 * Mengembalikan semua dungeon entries untuk user
 *
 * @param {string} userId
 * @returns {array}
 */
function getDungeonProgress(userId) {
    return getDungeons(userId);
}

/**
 * Get arena data for enterGame response
 * Alias untuk getArena — dipanggil oleh handler
 *
 * @param {string} userId
 * @returns {object|null}
 */
function getArenaData(userId) {
    return getArena(userId);
}

/**
 * Get tower data for enterGame response
 * Alias untuk getTower — dipanggil oleh handler
 *
 * @param {string} userId
 * @returns {object|null}
 */
function getTowerData(userId) {
    return getTower(userId);
}

/**
 * Get ball war data for enterGame response
 * Alias untuk getBallWar — dipanggil oleh handler
 *
 * @param {string} userId
 * @returns {object|null}
 */
function getBallWarData(userId) {
    return getBallWar(userId);
}

/**
 * Get all online user IDs
 * Digunakan oleh daily reset scheduler untuk push notify
 *
 * @returns {array} Array of userId strings
 */
function getOnlineUserIds() {
    const rows = db.prepare('SELECT userId FROM user_data WHERE online = 1').all();
    return rows.map(r => r.userId);
}

// ═══════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════

module.exports = {
    // User
    getUser,
    getUserByToken,
    setUserOnline,
    updateUserFields,
    userExists,
    createUser,
    // Hero
    getHeroes,
    getHeroById,
    getHeroByDisplayId,
    createHero,
    updateHero,
    deleteHero,
    // Item
    getItems,
    getItem,
    setItem,
    addItem,
    removeItem,
    createItems,
    deleteItem,
    // Equip
    getEquips,
    getEquipById,
    getEquipsByHeroId,
    createEquip,
    updateEquip,
    deleteEquip,
    // Weapon
    getWeapons,
    getWeaponById,
    createWeapon,
    updateWeapon,
    deleteWeapon,
    // Imprint
    getImprints,
    getImprintById,
    createImprint,
    updateImprint,
    deleteImprint,
    // Genki
    getGenkis,
    getGenkiById,
    createGenki,
    updateGenki,
    deleteGenki,
    // Guild
    getGuild,
    getGuilds,
    getGuildByIdOrName,
    createGuild,
    updateGuild,
    deleteGuild,
    // Guild Member
    getGuildMembers,
    getGuildMemberByUserId,
    createGuildMember,
    updateGuildMember,
    deleteGuildMember,
    // Friend
    getFriends,
    getFriend,
    createFriend,
    updateFriend,
    deleteFriend,
    // Friend Blacklist
    getBlacklist,
    createBlacklist,
    deleteBlacklist,
    // Arena
    getArena,
    upsertArena,
    updateArena,
    getArenaRankList,
    // Mail
    getMails,
    getMailById,
    createMail,
    updateMail,
    deleteMail,
    deleteExpiredMails,
    // Shop
    getShopByType,
    getShops,
    getShopGoods,
    upsertShopGoods,
    updateShopGoods,
    deleteShopGoods,
    // Dungeon
    getDungeons,
    getDungeonByType,
    upsertDungeon,
    updateDungeon,
    deleteDungeon,
    // Tower
    getTower,
    createTower,
    updateTower,
    getTowerRankList,
    // Expedition
    getExpeditions,
    getExpeditionById,
    createExpedition,
    updateExpedition,
    deleteExpedition,
    // Battle
    getBattle,
    getBattles,
    createBattle,
    updateBattle,
    deleteBattle,
    cleanupOldBattles,
    // Ball War
    getBallWar,
    upsertBallWar,
    updateBallWar,
    // Entrust
    getEntrusts,
    getEntrustById,
    createEntrust,
    updateEntrust,
    deleteEntrust,
    // Resonance
    getResonances,
    getResonanceById,
    getResonanceBySeat,
    createResonance,
    updateResonance,
    deleteResonance,
    // Super Skill
    getSuperSkills,
    getSuperSkillById,
    getSuperSkillBySkillId,
    createSuperSkill,
    updateSuperSkill,
    deleteSuperSkill,
    // Gemstone
    getGemstones,
    getGemstoneById,
    createGemstone,
    updateGemstone,
    deleteGemstone,
    // Rank
    getRanksByType,
    getRankByType,
    getRanks,
    createRank,
    updateRank,
    deleteRank,
    upsertRank,
    // Utility
    deleteAllUserData,
    getOnlineCount,
    getTotalUserCount,
    // Composite / Convenience (used by handlers)
    createCompleteUser,
    getGuildByUser,
    getShopData,
    getDungeonProgress,
    getArenaData,
    getTowerData,
    getBallWarData,
    getOnlineUserIds
};
