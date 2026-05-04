/**
 * db.js — MAIN-SERVER Database Module
 * Referensi: main-server.md v4.0 Section 7
 *
 * Database: better-sqlite3 WAL mode
 * File: ./data/main_server.db
 * Prinsip: 1 tabel per fitur (sesuai Section 7)
 *
 * Default values: SQLite DEFAULT constraints menangani semua default
 * Game constants: dibaca dari constant.json via jsonLoader
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
        towerFloor INTEGER DEFAULT 0,
        towerTimes INTEGER DEFAULT 10,
        towerBuyTimes INTEGER DEFAULT 0,
        towerClimbTimes INTEGER DEFAULT 0,
        towerEvents TEXT DEFAULT '[]',
        arenaRank INTEGER DEFAULT 0,
        arenaTimes INTEGER DEFAULT 5,
        arenaBuyTimes INTEGER DEFAULT 0,
        arenaLastRefreshTime INTEGER DEFAULT 0,
        arenaTeam TEXT DEFAULT '{}',
        online INTEGER DEFAULT 0,
        monthlyCardEndTime INTEGER DEFAULT 0,
        bigMonthlyCardEndTime INTEGER DEFAULT 0,
        lifelongCardEndTime INTEGER DEFAULT 0,
        monthlyCardDay INTEGER DEFAULT 0,
        bigMonthlyCardDay INTEGER DEFAULT 0,
        lifelongCardDay INTEGER DEFAULT 0,
        firstRechargeGot INTEGER DEFAULT 0,
        monthCardGot INTEGER DEFAULT 0,
        bigMonthCardGot INTEGER DEFAULT 0,
        lifelongCardGot INTEGER DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_user_data_loginToken ON user_data(loginToken);
    CREATE INDEX IF NOT EXISTS idx_user_data_serverId ON user_data(serverId);
    CREATE INDEX IF NOT EXISTS idx_user_data_online ON user_data(online);
    CREATE INDEX IF NOT EXISTS idx_user_data_level ON user_data(level);

    -- ═══════════════════════════════════════════════════════════
    -- HERO DATA (Data Hero)
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
        FOREIGN KEY (userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_hero_data_userId ON hero_data(userId);
    CREATE INDEX IF NOT EXISTS idx_hero_data_displayId ON hero_data(displayId);

    -- ═══════════════════════════════════════════════════════════
    -- ITEM DATA (Data Item/Inventaris)
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
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS weapon_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        weaponId INTEGER NOT NULL,
        level INTEGER DEFAULT 1,
        quality INTEGER DEFAULT 1,
        heroId INTEGER DEFAULT 0,
        haloLevel INTEGER DEFAULT 0,
        FOREIGN KEY (userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_weapon_data_userId ON weapon_data(userId);

    -- ═══════════════════════════════════════════════════════════
    -- IMPRINT DATA (Data Imprint/Signet)
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS imprint_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        imprintId INTEGER NOT NULL,
        level INTEGER DEFAULT 1,
        star INTEGER DEFAULT 0,
        quality INTEGER DEFAULT 1,
        part INTEGER DEFAULT 0,
        heroId INTEGER DEFAULT 0,
        viceAttrId INTEGER DEFAULT 0,
        FOREIGN KEY (userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_imprint_data_userId ON imprint_data(userId);

    -- ═══════════════════════════════════════════════════════════
    -- GENKI DATA (Data Genki)
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS genki_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        genkiId INTEGER NOT NULL,
        heroId INTEGER DEFAULT 0,
        pos INTEGER DEFAULT 0,
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
    -- ═══════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS gemstone_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        stoneId INTEGER NOT NULL,
        displayId INTEGER DEFAULT 0,
        level INTEGER DEFAULT 1,
        heroId INTEGER DEFAULT 0,
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
 * Create hero
 * @param {object} params
 * @returns {object}
 */
function createHero(params) {
    const stmt = db.prepare(`
        INSERT INTO hero_data (userId, displayId, level, quality, evolveLevel, star, skinId, activeSkill, qigongLevel, selfBreakLevel, selfBreakType, connectHeroId, position, power)
        VALUES (@userId, @displayId, @level, @quality, @evolveLevel, @star, @skinId, @activeSkill, @qigongLevel, @selfBreakLevel, @selfBreakType, @connectHeroId, @position, @power)
    `);
    stmt.run({
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
        power: params.power || 0
    });
    return db.prepare('SELECT * FROM hero_data WHERE userId = ? ORDER BY id DESC LIMIT 1').get(params.userId);
}

/**
 * Update hero by id
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

// ═══════════════════════════════════════════════════════════════
// EQUIP DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

function getEquips(userId) {
    return db.prepare('SELECT * FROM equip_data WHERE userId = ?').all(userId);
}

function createEquip(params) {
    db.prepare(`
        INSERT INTO equip_data (userId, equipId, level, quality, heroId, position)
        VALUES (@userId, @equipId, @level, @quality, @heroId, @position)
    `).run({
        userId: params.userId,
        equipId: params.equipId,
        level: params.level || 1,
        quality: params.quality || 1,
        heroId: params.heroId || 0,
        position: params.position || 0
    });
}

// ═══════════════════════════════════════════════════════════════
// WEAPON DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

function getWeapons(userId) {
    return db.prepare('SELECT * FROM weapon_data WHERE userId = ?').all(userId);
}

function createWeapon(params) {
    db.prepare(`
        INSERT INTO weapon_data (userId, weaponId, level, quality, heroId, haloLevel)
        VALUES (@userId, @weaponId, @level, @quality, @heroId, @haloLevel)
    `).run({
        userId: params.userId,
        weaponId: params.weaponId,
        level: params.level || 1,
        quality: params.quality || 1,
        heroId: params.heroId || 0,
        haloLevel: params.haloLevel || 0
    });
}

// ═══════════════════════════════════════════════════════════════
// IMPRINT DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

function getImprints(userId) {
    return db.prepare('SELECT * FROM imprint_data WHERE userId = ?').all(userId);
}

// ═══════════════════════════════════════════════════════════════
// GENKI DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

function getGenkis(userId) {
    return db.prepare('SELECT * FROM genki_data WHERE userId = ?').all(userId);
}

// ═══════════════════════════════════════════════════════════════
// GUILD DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

function getGuild(guildUUID) {
    return db.prepare('SELECT * FROM guild_data WHERE guildUUID = ?').get(guildUUID);
}

function getGuildByUser(userId) {
    const member = db.prepare('SELECT * FROM guild_member_data WHERE userId = ?').get(userId);
    if (!member) return null;
    return getGuild(member.guildUUID);
}

function getGuildMembers(guildUUID) {
    return db.prepare('SELECT * FROM guild_member_data WHERE guildUUID = ?').all(guildUUID);
}

// ═══════════════════════════════════════════════════════════════
// FRIEND DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

function getFriends(userId) {
    return db.prepare('SELECT * FROM friend_data WHERE userId = ?').all(userId);
}

function getBlacklist(userId) {
    return db.prepare('SELECT * FROM friend_blacklist WHERE userId = ?').all(userId);
}

// ═══════════════════════════════════════════════════════════════
// MAIL DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

function getMails(userId) {
    return db.prepare('SELECT * FROM mail_data WHERE userId = ? ORDER BY sendTime DESC').all(userId);
}

function createMail(params) {
    const now = Date.now();
    db.prepare(`
        INSERT INTO mail_data (userId, senderId, title, content, awards, isRead, isGot, sendTime, expireTime, type)
        VALUES (@userId, @senderId, @title, @content, @awards, 0, 0, @sendTime, @expireTime, @type)
    `).run({
        userId: params.userId,
        senderId: params.senderId || '',
        title: params.title || '',
        content: params.content || '',
        awards: params.awards || '[]',
        sendTime: now,
        expireTime: params.expireTime || (now + 30 * 24 * 60 * 60 * 1000),
        type: params.type || 0
    });
}

// ═══════════════════════════════════════════════════════════════
// SHOP DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

function getShopData(userId) {
    return db.prepare('SELECT * FROM shop_data WHERE userId = ?').all(userId);
}

// ═══════════════════════════════════════════════════════════════
// DUNGEON DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

function getDungeonProgress(userId) {
    return db.prepare('SELECT * FROM dungeon_data WHERE userId = ?').all(userId);
}

function getDungeonByType(userId, dungeonType) {
    return db.prepare('SELECT * FROM dungeon_data WHERE userId = ? AND dungeonType = ?').get(userId, dungeonType);
}

function upsertDungeon(userId, dungeonType, fields) {
    const existing = getDungeonByType(userId, dungeonType);
    if (existing) {
        const keys = Object.keys(fields);
        if (keys.length === 0) return;
        const setClauses = keys.map(k => `${k} = @${k}`).join(', ');
        const values = { id: existing.id, ...fields };
        db.prepare(`UPDATE dungeon_data SET ${setClauses} WHERE id = @id`).run(values);
    } else {
        db.prepare(`
            INSERT INTO dungeon_data (userId, dungeonType, level, sweepLevel, times, buyTimes)
            VALUES (@userId, @dungeonType, @level, @sweepLevel, @times, @buyTimes)
        `).run({
            userId,
            dungeonType,
            level: fields.level || 0,
            sweepLevel: fields.sweepLevel || 0,
            times: fields.times || 0,
            buyTimes: fields.buyTimes || 0
        });
    }
}

// ═══════════════════════════════════════════════════════════════
// ARENA DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

function getArenaData(userId) {
    return db.prepare('SELECT * FROM arena_data WHERE userId = ?').get(userId);
}

// ═══════════════════════════════════════════════════════════════
// TOWER DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

function getTowerData(userId) {
    return db.prepare('SELECT * FROM tower_data WHERE userId = ?').get(userId);
}

// ═══════════════════════════════════════════════════════════════
// BALL WAR DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

function getBallWarData(userId) {
    return db.prepare('SELECT * FROM ball_war_data WHERE userId = ?').get(userId);
}

// ═══════════════════════════════════════════════════════════════
// BATTLE DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

function createBattle(params) {
    db.prepare(`
        INSERT INTO battle_data (battleId, userId, battleField, seed, team, startTime, status)
        VALUES (@battleId, @userId, @battleField, @seed, @team, @startTime, 0)
    `).run({
        battleId: params.battleId,
        userId: params.userId,
        battleField: params.battleField,
        seed: params.seed || '',
        team: params.team || '{}',
        startTime: Date.now()
    });
}

function getBattle(battleId) {
    return db.prepare('SELECT * FROM battle_data WHERE battleId = ?').get(battleId);
}

function updateBattleStatus(battleId, status) {
    db.prepare('UPDATE battle_data SET status = ? WHERE battleId = ?').run(status, battleId);
}

// ═══════════════════════════════════════════════════════════════
// RANK DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

function getRankByType(rankType, limit) {
    return db.prepare('SELECT * FROM rank_data WHERE rankType = ? ORDER BY rankValue DESC LIMIT ?').all(rankType, limit || 50);
}

// ═══════════════════════════════════════════════════════════════
// SUPER SKILL DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

function getSuperSkills(userId) {
    return db.prepare('SELECT * FROM super_skill_data WHERE userId = ?').all(userId);
}

// ═══════════════════════════════════════════════════════════════
// GEMSTONE DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

function getGemstones(userId) {
    return db.prepare('SELECT * FROM gemstone_data WHERE userId = ?').all(userId);
}

// ═══════════════════════════════════════════════════════════════
// RESONANCE DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

function getResonance(userId) {
    return db.prepare('SELECT * FROM resonance_data WHERE userId = ?').all(userId);
}

// ═══════════════════════════════════════════════════════════════
// EXPEDITION DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

function getExpedition(userId) {
    return db.prepare('SELECT * FROM expedition_data WHERE userId = ?').all(userId);
}

// ═══════════════════════════════════════════════════════════════
// ENTRUST DATA OPERATIONS
// ═══════════════════════════════════════════════════════════════

function getEntrust(userId) {
    return db.prepare('SELECT * FROM entrust_data WHERE userId = ?').all(userId);
}

// ═══════════════════════════════════════════════════════════════
// ONLINE USER TRACKING
// ═══════════════════════════════════════════════════════════════

/**
 * Get count of online users
 * @returns {number}
 */
function getOnlineCount() {
    const row = db.prepare('SELECT COUNT(*) as count FROM user_data WHERE online = 1').get();
    return row ? row.count : 0;
}

/**
 * Get all online user IDs
 * @returns {array}
 */
function getOnlineUserIds() {
    const rows = db.prepare('SELECT userId FROM user_data WHERE online = 1').all();
    return rows.map(r => r.userId);
}

// ═══════════════════════════════════════════════════════════════
// COMPLETE NEW USER CREATION (transaction)
// ═══════════════════════════════════════════════════════════════

/**
 * Create complete new user dengan semua data relasional
 * Menggunakan transaction untuk atomicity
 * Game constants dibaca dari constant.json via jsonLoader
 *
 * Fungsi ini BUKAN deadcode — diperlukan untuk INSERT ke tabel relasional:
 * - user_data (dengan nilai dari constant.json)
 * - hero_data (hero awal dari constant.json startHero)
 * - item_data (7 mandatory items)
 * - dungeon_data (8 tipe dungeon)
 * - tower_data, arena_data, ball_war_data
 *
 * SQLite DEFAULT menangani kolom yang TIDAK di-INSERT secara eksplisit.
 * Tapi kolom yang nilainya bergantung pada constant.json HARUS di-INSERT.
 *
 * @param {string} userId
 * @param {string} nickName
 * @param {string} loginToken
 * @param {string} serverId
 * @param {string} language
 * @returns {object} Created user row
 */
function createCompleteUser(userId, nickName, loginToken, serverId, language) {
    // Read game constants from constant.json
    const jsonLoader = require('./jsonLoader');
    const constantData = jsonLoader.get('constant');
    const c1 = (constantData && constantData['1']) || {};

    const startHero = String(c1.startHero || '1205');
    const startHeroLevel = Number(c1.startHeroLevel || 3);
    const startUserLevel = Number(c1.startUserLevel || 1);
    const startUserExp = Number(c1.startUserExp || 0);
    const startDiamond = Number(c1.startDiamond || 0);
    const startGold = Number(c1.startGold || 0);
    const startChapter = Number(c1.startChapter || 801);
    const startLesson = Number(c1.startLesson || 10101);
    const arenaAttackTimes = Number(c1.arenaAttackTimes || 5);
    const karinTowerBattleTimes = Number(c1.karinTowerBattleTimes || 10);
    const dragonBallWarTimesMax = Number(c1.dragonBallWarTimesMax || 3);

    // Build scheduleData from constant.json
    const scheduleData = JSON.stringify({
        _arenaAttackTimes: arenaAttackTimes,
        _arenaBuyTimesCount: 0,
        _strongEnemyTimes: Number(c1.bossAttackTimes || 6),
        _strongEnemyBuyCount: 0,
        _karinTowerBattleTimes: karinTowerBattleTimes,
        _karinTowerBuyTimesCount: 0,
        _cellGameTimes: Number(c1.cellGameTimes || 1),
        _cellGameBuyTimesCount: 0,
        _templeTestTimes: Number(c1.templeTestTimes || 10),
        _templeTestBuyTimesCount: 0,
        _expDungeonTimes: Number(c1.expDungeonTimes || 2),
        _expDungeonBuyTimes: 0,
        _evolveDungeonTimes: Number(c1.evolveDungeonTimes || 2),
        _evolveDungeonBuyTimes: 0,
        _energyDungeonTimes: Number(c1.energyDungeonTimes || 2),
        _energyDungeonBuyTimes: 0,
        _metalDungeonTimes: Number(c1.metalDungeonTimes || 2),
        _metalDungeonBuyTimes: 0,
        _zStoneDungeonTimes: Number(c1.zStoneDungeonTimes || 2),
        _zStoneDungeonBuyTimes: 0,
        _equipDungeonTimes: Number(c1.equipDungeonTimes || 2),
        _equipDungeonBuyTimes: 0,
        _signDungeonTimes: Number(c1.signDungeonTimes || 2),
        _signDungeonBuyTimes: 0,
        _bossFightTimes: Number(c1.bossFightTimesMax || 3),
        _bossFightBuyTimes: 0,
        _mahaAdventureTimes: Number(c1.mahaAdventureTimesMax || 5),
        _mahaAdventureBuyTimes: 0,
        _trainingTimes: Number(c1.trainingTimesMax || 10),
        _trainingBuyTimes: 0,
        _guildBOSSTimes: Number(c1.guildBOSSTimes || 2),
        _guildBOSSBuyTimes: 0,
        _guildGrabTimes: Number(c1.guildGrabTimes || 3),
        _mineActionPoint: Number(c1.mineActionPointMax || 50),
        _dragonBallWarTimes: dragonBallWarTimesMax,
        _dragonBallWarBuyTimes: 0,
        _expeditionTimes: Number(c1.expeditionBattleTimes || 10),
        _snakeDungeonTimes: Number(c1.snakeTimes || 1),
        _topBattleTimes: 0,
        _topBattleBuyTimes: 0,
        _gravityTestTimes: Number(c1.gravityTestRewardpreview || 50),
        _timeTrainTimes: 0,
        _timeTrainBuyTimes: 0,
        _marketRefreshTimes: Number(c1.marketRefreshTimeMax || 5),
        _vipMarketRefreshTimes: Number(c1.vipMarketRefreshTimeMax || 5),
        _rewardHelpTimes: Number(c1.rewardHelpRewardEveryday || 10),
        _goldBuyTimes: Number(c1.goldBuyFree || 20)
    });

    // Build timesData
    const now = Date.now();
    const timesData = JSON.stringify({
        _marketLastRefreshTime: now,
        _vipMarketLastRefreshTime: now,
        _karinTowerLastRefreshTime: now,
        _trainingLastRefreshTime: now,
        _dragonBallWarLastRefreshTime: now,
        _expeditionLastRefreshTime: now,
        _templeTestLastRefreshTime: now,
        _mahaAdventureLastBattleTime: 0,
        _mineLastRefreshTime: now,
        _timeTrainLastRefreshTime: now,
        _gravityTestLastRefreshTime: now
    });

    // Build battleMedalData
    const battleMedalData = JSON.stringify({
        _level: 1, _exp: 0, _todayExp: 0, _buyTimes: 0, _taskData: []
    });

    // Build giftInfoData
    const giftInfoData = JSON.stringify({
        _firstRechargeGot: 0, _monthCardGot: 0, _bigMonthCardGot: 0, _lifelongCardGot: 0,
        _monthCardEndTime: 0, _bigMonthCardEndTime: 0, _lifelongCardEndTime: 0,
        _monthCardDay: 0, _bigMonthCardDay: 0, _lifelongCardDay: 0
    });

    const createUserAndRelations = db.transaction(() => {
        // 1. Create user_data row — nilai dari constant.json
        db.prepare(`
            INSERT INTO user_data (
                userId, nickName, headImageId, headBoxId, level, exp,
                vipLevel, vipExp, vipExpAll, diamond, gold,
                loginToken, serverId, createTime, lastLoginTime, language,
                lessonId, chapterId, backpackLevel, firstEnter,
                scheduleData, timesData, battleMedalData, giftInfoData,
                arenaRank, arenaTimes, towerFloor, towerTimes, online
            ) VALUES (
                ?, ?, ?, ?, ?, ?,
                0, 0, 0, ?, ?,
                ?, ?, ?, ?, ?,
                ?, ?, 1, 1,
                ?, ?, ?, ?,
                0, ?, 0, ?, 1
            )
        `).run(
            userId,
            nickName,
            Number(startHero),       // headImageId = start hero
            0,                        // headBoxId
            startUserLevel,
            startUserExp,
            startDiamond,
            startGold,
            loginToken,
            serverId,
            now,                      // createTime
            now,                      // lastLoginTime
            language || 'en',
            startLesson,
            startChapter,
            scheduleData,
            timesData,
            battleMedalData,
            giftInfoData,
            arenaAttackTimes,         // arenaTimes
            karinTowerBattleTimes     // towerTimes
        );

        // 2. Create default hero (dari constant.json startHero)
        db.prepare(`
            INSERT INTO hero_data (userId, displayId, level, quality, evolveLevel, star, skinId, activeSkill, qigongLevel, selfBreakLevel, selfBreakType, connectHeroId, position, power)
            VALUES (?, ?, ?, 1, 0, 0, 0, '{}', 0, 0, 0, 0, 1, 0)
        `).run(
            userId,
            Number(startHero),
            startHeroLevel
        );

        // 3. Create default items (7 mandatory items dari constant.json)
        const itemStmt = db.prepare(`
            INSERT INTO item_data (userId, itemId, num, displayId)
            VALUES (?, ?, ?, 0)
        `);
        itemStmt.run(userId, 104, startUserLevel);   // playerLevel
        itemStmt.run(userId, 103, startUserExp);      // playerExp
        itemStmt.run(userId, 101, startDiamond);      // diamond
        itemStmt.run(userId, 102, startGold);         // gold
        itemStmt.run(userId, 106, 0);                 // vipLevel
        itemStmt.run(userId, 105, 0);                 // vipExp
        itemStmt.run(userId, 107, 0);                 // vipExpAll

        // 4. Create default dungeon progress (8 tipe)
        const dungeonTypes = [1, 2, 3, 4, 5, 6, 7, 8];
        const dungeonStmt = db.prepare(`
            INSERT INTO dungeon_data (userId, dungeonType, level, sweepLevel, times, buyTimes)
            VALUES (?, ?, 0, 0, 0, 0)
        `);
        for (const dt of dungeonTypes) {
            dungeonStmt.run(userId, dt);
        }

        // 5. Create default tower data
        db.prepare(`
            INSERT INTO tower_data (userId, floor, times, buyTimes, climbTimes, events)
            VALUES (?, 0, ?, 0, 0, '[]')
        `).run(userId, karinTowerBattleTimes);

        // 6. Create default arena data
        db.prepare(`
            INSERT INTO arena_data (userId, rank, times, buyTimes, team, lastRefreshTime)
            VALUES (?, 0, ?, 0, '{}', 0)
        `).run(userId, arenaAttackTimes);

        // 7. Create default ball_war_data
        db.prepare(`
            INSERT INTO ball_war_data (userId, state, signedUp, times, defence)
            VALUES (?, 0, 0, ?, '{}')
        `).run(userId, dragonBallWarTimesMax);
    });

    createUserAndRelations();
    return getUser(userId);
}

module.exports = {
    db,

    // User operations
    getUser,
    getUserByToken,
    setUserOnline,
    updateUserFields,
    userExists,

    // Hero operations
    getHeroes,
    createHero,
    updateHero,

    // Item operations
    getItems,
    getItem,
    setItem,
    addItem,
    removeItem,
    createItems,

    // Equip operations
    getEquips,
    createEquip,

    // Weapon operations
    getWeapons,
    createWeapon,

    // Imprint operations
    getImprints,

    // Genki operations
    getGenkis,

    // Guild operations
    getGuild,
    getGuildByUser,
    getGuildMembers,

    // Friend operations
    getFriends,
    getBlacklist,

    // Mail operations
    getMails,
    createMail,

    // Shop operations
    getShopData,

    // Dungeon operations
    getDungeonProgress,
    getDungeonByType,
    upsertDungeon,

    // Arena operations
    getArenaData,

    // Tower operations
    getTowerData,

    // Ball war operations
    getBallWarData,

    // Battle operations
    createBattle,
    getBattle,
    updateBattleStatus,

    // Rank operations
    getRankByType,

    // Super Skill operations
    getSuperSkills,

    // Gemstone operations
    getGemstones,

    // Resonance operations
    getResonance,

    // Expedition operations
    getExpedition,

    // Entrust operations
    getEntrust,

    // Online tracking
    getOnlineCount,
    getOnlineUserIds,

    // Bulk creation
    createCompleteUser
};
