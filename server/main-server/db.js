/**
 * db.js — Game Server Database Module (COMPLETE REWRITE)
 *
 * Super Warrior Z — Main Server Database Layer
 *
 * Uses better-sqlite3 with WAL mode.
 * Normalized schema with 24 tables matching client expectations from
 * main.min.js UserDataParser.saveUserData().
 *
 * PRINCIPLES:
 *   - NO STUB, OVERRIDE, FORCE, BYPASS, DUMMY, or ASSUMPTIONS
 *   - Source of truth: main.min.js client code (UserDataParser.saveUserData)
 *   - Database schema EXACTLY matches what the game needs
 *   - Default values from constant.json via jsonLoader
 *   - user_data has NO pwd column (authentication handled by SDK-Server)
 */

const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// ---------------------------------------------------------------------------
// Logger (same pattern as the rest of the server)
// ---------------------------------------------------------------------------
let logger;
try {
  logger = require('./logger');
} catch (_) {
  logger = {
    log: (level, tag, msg) => console.log(`[${level}][${tag}] ${msg}`),
    details: (tag, ...pairs) => {}
  };
}

// ---------------------------------------------------------------------------
// Database initialization
// ---------------------------------------------------------------------------

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, 'main_server.db');

const db = new Database(DB_PATH);

// WAL mode for better concurrent read performance
db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');
db.pragma('foreign_keys = ON');
db.pragma('busy_timeout = 5000');

// ---------------------------------------------------------------------------
// Schema creation — 24 tables
// ---------------------------------------------------------------------------

function initSchema() {
  db.exec(`
    -- ============================================================
    -- 1. user_data (PRIMARY — one row per user, NO pwd column)
    -- ============================================================
    CREATE TABLE IF NOT EXISTS user_data (
      userId TEXT PRIMARY KEY,
      nickName TEXT DEFAULT '',
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
      fastTeams TEXT DEFAULT '{}',
      clickSystem TEXT DEFAULT '{"1":false,"2":false}',
      bulletinRead TEXT DEFAULT '{}',
      lessonId INTEGER DEFAULT 10101,
      chapterId INTEGER DEFAULT 801,
      backpackLevel INTEGER DEFAULT 1,
      firstEnter INTEGER DEFAULT 1,
      scheduleData TEXT DEFAULT '{}',
      timesData TEXT DEFAULT '{}',
      battleMedalData TEXT DEFAULT '{}',
      giftInfoData TEXT DEFAULT '{}',
      ballWarData TEXT DEFAULT '{}',
      expeditionData TEXT DEFAULT '{}',
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
      lifelongCardGot INTEGER DEFAULT 0,
      hangupData TEXT DEFAULT '{}',
      summonData TEXT DEFAULT '{}',
      heroSkinData TEXT DEFAULT '{}',
      lastTeamData TEXT DEFAULT '{}',
      headEffectData TEXT DEFAULT '{"_effects":[]}',
      trainingData TEXT DEFAULT '{}',
      checkinData TEXT DEFAULT '{}',
      monthCardData TEXT DEFAULT '{}',
      rechargeData TEXT DEFAULT '{}',
      dragonEquipedData TEXT DEFAULT '{}',
      channelSpecialData TEXT DEFAULT '{}',
      timeMachineData TEXT DEFAULT '{"_items":{}}',
      timeBonusInfoData TEXT DEFAULT '{}',
      timeTrialData TEXT DEFAULT '{}',
      expeditionModelData TEXT DEFAULT '{}',
      shopNewHeroesData TEXT DEFAULT '{}',
      teamDungeonData TEXT DEFAULT '{}',
      teamDungeonTaskData TEXT DEFAULT '{}',
      gemstoneData TEXT DEFAULT '{}',
      resonanceData TEXT DEFAULT '{}',
      userTopBattleData TEXT DEFAULT '{}',
      topBattleInfoData TEXT DEFAULT '{}',
      littleGameData TEXT DEFAULT '{}',
      gravityData TEXT DEFAULT '{}',
      warInfoData TEXT DEFAULT '',
      userWarData TEXT DEFAULT '',
      userBallWarData TEXT DEFAULT '{}',
      ballWarInfoData TEXT DEFAULT '{}',
      userGuildData TEXT DEFAULT '{}',
      userGuildPubData TEXT DEFAULT '{}',
      fastTeamData TEXT DEFAULT '{"_teamInfo":{}}',
      superSkillData TEXT DEFAULT '[]',
      customSignData TEXT DEFAULT '{}'
    );

    CREATE INDEX IF NOT EXISTS idx_user_data_loginToken ON user_data(loginToken);
    CREATE INDEX IF NOT EXISTS idx_user_data_serverId ON user_data(serverId);
    CREATE INDEX IF NOT EXISTS idx_user_data_online ON user_data(online);

    -- ============================================================
    -- 2. hero_data
    -- ============================================================
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
      FOREIGN KEY(userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_hero_data_userId ON hero_data(userId);

    -- ============================================================
    -- 3. item_data
    -- ============================================================
    CREATE TABLE IF NOT EXISTS item_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      itemId INTEGER NOT NULL,
      num INTEGER DEFAULT 0,
      displayId INTEGER DEFAULT 0,
      UNIQUE(userId, itemId, displayId),
      FOREIGN KEY(userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_item_data_userId ON item_data(userId);

    -- ============================================================
    -- 4. equip_data (matches EquipInfoManager.readByData)
    -- ============================================================
    CREATE TABLE IF NOT EXISTS equip_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      heroId TEXT NOT NULL DEFAULT '0',
      suitItems TEXT DEFAULT '[]',
      suitAttrs TEXT DEFAULT '[]',
      equipAttrs TEXT DEFAULT '[]',
      earrings TEXT DEFAULT '{}',
      weaponState INTEGER DEFAULT 0,
      FOREIGN KEY(userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_equip_data_userId ON equip_data(userId);

    -- ============================================================
    -- 5. weapon_data (matches WeaponDataModel)
    -- ============================================================
    CREATE TABLE IF NOT EXISTS weapon_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      weaponId TEXT NOT NULL DEFAULT '',
      displayId INTEGER DEFAULT 0,
      heroId TEXT DEFAULT '',
      star INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1,
      attrs TEXT DEFAULT '{}',
      strengthenCost TEXT DEFAULT '{}',
      haloId INTEGER DEFAULT 0,
      haloLevel INTEGER DEFAULT 0,
      haloCost TEXT DEFAULT '{}',
      quality INTEGER DEFAULT 0,
      FOREIGN KEY(userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_weapon_data_userId ON weapon_data(userId);

    -- ============================================================
    -- 6. imprint_data (matches ImprintItem)
    -- ============================================================
    CREATE TABLE IF NOT EXISTS imprint_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      imprintId TEXT NOT NULL DEFAULT '',
      displayId INTEGER DEFAULT 0,
      heroId TEXT DEFAULT '',
      level INTEGER DEFAULT 1,
      star INTEGER DEFAULT 0,
      mainAttr TEXT DEFAULT '{}',
      starAttr TEXT DEFAULT '{}',
      viceAttr TEXT DEFAULT '[]',
      totalCost TEXT DEFAULT '[]',
      addAttr TEXT DEFAULT '{}',
      signType INTEGER DEFAULT 0,
      part INTEGER DEFAULT 0,
      signQuality INTEGER DEFAULT 0,
      FOREIGN KEY(userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_imprint_data_userId ON imprint_data(userId);

    -- ============================================================
    -- 7. genki_data
    -- ============================================================
    CREATE TABLE IF NOT EXISTS genki_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      genkiId INTEGER NOT NULL,
      heroId INTEGER DEFAULT 0,
      pos INTEGER DEFAULT 0,
      FOREIGN KEY(userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_genki_data_userId ON genki_data(userId);

    -- ============================================================
    -- 8. guild_data
    -- ============================================================
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
      activePoint INTEGER DEFAULT 0
    );

    -- ============================================================
    -- 9. guild_member_data
    -- ============================================================
    CREATE TABLE IF NOT EXISTS guild_member_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      guildUUID TEXT NOT NULL,
      userId TEXT NOT NULL,
      position INTEGER DEFAULT 0,
      joinTime INTEGER,
      donateNum INTEGER DEFAULT 0,
      UNIQUE(guildUUID, userId)
    );

    CREATE INDEX IF NOT EXISTS idx_guild_member_userId ON guild_member_data(userId);

    -- ============================================================
    -- 10. friend_data
    -- ============================================================
    CREATE TABLE IF NOT EXISTS friend_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      friendId TEXT NOT NULL,
      giveHeartTime INTEGER DEFAULT 0,
      getHeartTime INTEGER DEFAULT 0,
      UNIQUE(userId, friendId)
    );

    CREATE INDEX IF NOT EXISTS idx_friend_data_userId ON friend_data(userId);

    -- ============================================================
    -- 11. friend_blacklist
    -- ============================================================
    CREATE TABLE IF NOT EXISTS friend_blacklist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      targetUserId TEXT NOT NULL,
      UNIQUE(userId, targetUserId)
    );

    CREATE INDEX IF NOT EXISTS idx_friend_blacklist_userId ON friend_blacklist(userId);

    -- ============================================================
    -- 12. arena_data
    -- ============================================================
    CREATE TABLE IF NOT EXISTS arena_data (
      userId TEXT PRIMARY KEY,
      rank INTEGER DEFAULT 0,
      times INTEGER DEFAULT 5,
      buyTimes INTEGER DEFAULT 0,
      team TEXT DEFAULT '{}',
      lastRefreshTime INTEGER DEFAULT 0
    );

    -- ============================================================
    -- 13. mail_data
    -- ============================================================
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
      type INTEGER DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_mail_data_userId ON mail_data(userId);

    -- ============================================================
    -- 14. shop_data
    -- ============================================================
    CREATE TABLE IF NOT EXISTS shop_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      shopType INTEGER NOT NULL,
      goodsId INTEGER NOT NULL,
      buyTimes INTEGER DEFAULT 0,
      refreshTime INTEGER DEFAULT 0,
      UNIQUE(userId, shopType, goodsId)
    );

    CREATE INDEX IF NOT EXISTS idx_shop_data_userId ON shop_data(userId);

    -- ============================================================
    -- 15. dungeon_data
    -- ============================================================
    CREATE TABLE IF NOT EXISTS dungeon_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      dungeonType INTEGER NOT NULL,
      level INTEGER DEFAULT 0,
      sweepLevel INTEGER DEFAULT 0,
      times INTEGER DEFAULT 0,
      buyTimes INTEGER DEFAULT 0,
      UNIQUE(userId, dungeonType)
    );

    CREATE INDEX IF NOT EXISTS idx_dungeon_data_userId ON dungeon_data(userId);

    -- ============================================================
    -- 16. tower_data
    -- ============================================================
    CREATE TABLE IF NOT EXISTS tower_data (
      userId TEXT PRIMARY KEY,
      floor INTEGER DEFAULT 0,
      times INTEGER DEFAULT 10,
      buyTimes INTEGER DEFAULT 0,
      climbTimes INTEGER DEFAULT 0,
      events TEXT DEFAULT '[]'
    );

    -- ============================================================
    -- 17. expedition_data
    -- ============================================================
    CREATE TABLE IF NOT EXISTS expedition_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      machineId INTEGER DEFAULT 0,
      heroId INTEGER DEFAULT 0,
      lessonIds TEXT DEFAULT '[]',
      teams TEXT DEFAULT '[]'
    );

    CREATE INDEX IF NOT EXISTS idx_expedition_data_userId ON expedition_data(userId);

    -- ============================================================
    -- 18. battle_data
    -- ============================================================
    CREATE TABLE IF NOT EXISTS battle_data (
      battleId TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      battleField INTEGER NOT NULL,
      seed TEXT DEFAULT '',
      team TEXT DEFAULT '{}',
      startTime INTEGER,
      status INTEGER DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_battle_data_userId ON battle_data(userId);

    -- ============================================================
    -- 19. ball_war_data
    -- ============================================================
    CREATE TABLE IF NOT EXISTS ball_war_data (
      userId TEXT PRIMARY KEY,
      state INTEGER DEFAULT 0,
      signedUp INTEGER DEFAULT 0,
      times INTEGER DEFAULT 3,
      defence TEXT DEFAULT '{}'
    );

    -- ============================================================
    -- 20. entrust_data
    -- ============================================================
    CREATE TABLE IF NOT EXISTS entrust_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      entrustIndex INTEGER DEFAULT 0,
      heroInfo TEXT DEFAULT '{}',
      status INTEGER DEFAULT 0,
      finishTime INTEGER DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_entrust_data_userId ON entrust_data(userId);

    -- ============================================================
    -- 21. resonance_data
    -- ============================================================
    CREATE TABLE IF NOT EXISTS resonance_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      cabinId INTEGER NOT NULL,
      seatId INTEGER NOT NULL,
      heroId INTEGER DEFAULT 0,
      UNIQUE(userId, cabinId, seatId)
    );

    CREATE INDEX IF NOT EXISTS idx_resonance_data_userId ON resonance_data(userId);

    -- ============================================================
    -- 22. super_skill_data
    -- ============================================================
    CREATE TABLE IF NOT EXISTS super_skill_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      skillId INTEGER NOT NULL,
      level INTEGER DEFAULT 1,
      evolveLevel INTEGER DEFAULT 0,
      UNIQUE(userId, skillId)
    );

    CREATE INDEX IF NOT EXISTS idx_super_skill_data_userId ON super_skill_data(userId);

    -- ============================================================
    -- 23. gemstone_data (matches GemstoneItem)
    -- ============================================================
    CREATE TABLE IF NOT EXISTS gemstone_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      stoneId TEXT NOT NULL DEFAULT '',
      displayId INTEGER DEFAULT 0,
      heroId TEXT DEFAULT '',
      level INTEGER DEFAULT 1,
      totalExp INTEGER DEFAULT 0,
      version TEXT DEFAULT '',
      FOREIGN KEY(userId) REFERENCES user_data(userId)
    );

    CREATE INDEX IF NOT EXISTS idx_gemstone_data_userId ON gemstone_data(userId);

    -- ============================================================
    -- 24. rank_data
    -- ============================================================
    CREATE TABLE IF NOT EXISTS rank_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      rankType INTEGER NOT NULL,
      userId TEXT NOT NULL,
      rankValue INTEGER DEFAULT 0,
      rankLevel INTEGER DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_rank_data_rankType ON rank_data(rankType);
    CREATE INDEX IF NOT EXISTS idx_rank_data_userId ON rank_data(userId);
  `);

  // Count tables for logging
  const tableCount = db.prepare(
    "SELECT COUNT(*) as cnt FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
  ).get().cnt;

  logger.log('INFO', 'DB', `Database initialized: ${tableCount} tables, WAL mode, path: ${DB_PATH}`);
}

initSchema();

// ---------------------------------------------------------------------------
// JSON blob field detection helper
// ---------------------------------------------------------------------------

const JSON_BLOB_COLUMNS = new Set([
  'guideStep', 'fastTeams', 'clickSystem', 'bulletinRead',
  'scheduleData', 'timesData', 'battleMedalData', 'giftInfoData',
  'ballWarData', 'expeditionData', 'entrustData', 'towerEvents',
  'arenaTeam', 'hangupData', 'summonData', 'heroSkinData',
  'lastTeamData', 'headEffectData', 'trainingData', 'checkinData',
  'monthCardData', 'rechargeData', 'dragonEquipedData',
  'channelSpecialData', 'timeMachineData', 'timeBonusInfoData',
  'timeTrialData', 'expeditionModelData', 'shopNewHeroesData',
  'teamDungeonData', 'teamDungeonTaskData', 'gemstoneData',
  'resonanceData', 'userTopBattleData', 'topBattleInfoData',
  'littleGameData', 'gravityData', 'warInfoData', 'userWarData',
  'userBallWarData', 'ballWarInfoData', 'userGuildData',
  'userGuildPubData', 'fastTeamData', 'superSkillData', 'customSignData'
]);

/**
 * Parse JSON blob columns in a user row from TEXT to JS objects.
 * Mutates the row object in-place and returns it.
 */
function parseUserRow(row) {
  if (!row) return null;
  for (const col of JSON_BLOB_COLUMNS) {
    if (row[col] !== undefined && row[col] !== null) {
      try {
        row[col] = JSON.parse(row[col]);
      } catch (_) {
        // Keep original string if parse fails
      }
    }
  }
  return row;
}

// ---------------------------------------------------------------------------
// Helper: auto-serialize object/array values for JSON blob columns
// ---------------------------------------------------------------------------

function serializeForDB(key, value) {
  if (JSON_BLOB_COLUMNS.has(key) && value !== null && typeof value === 'object') {
    return JSON.stringify(value);
  }
  return value;
}

// ===========================================================================
// USER OPERATIONS
// ===========================================================================

/**
 * Get full user_data row by userId.
 * JSON blob columns are auto-parsed to JS objects.
 * Returns null if user not found.
 */
function getUser(userId) {
  const row = db.prepare('SELECT * FROM user_data WHERE userId = ?').get(userId);
  return parseUserRow(row);
}

/**
 * Find user by loginToken.
 * Returns parsed user row or null.
 */
function getUserByToken(loginToken) {
  const row = db.prepare('SELECT * FROM user_data WHERE loginToken = ?').get(loginToken);
  return parseUserRow(row);
}

/**
 * Update online status and lastLoginTime.
 */
function setUserOnline(userId, online) {
  const now = Math.floor(Date.now() / 1000);
  if (online) {
    db.prepare('UPDATE user_data SET online = ?, lastLoginTime = ? WHERE userId = ?')
      .run(online ? 1 : 0, now, userId);
  } else {
    db.prepare('UPDATE user_data SET online = ? WHERE userId = ?')
      .run(0, userId);
  }
}

/**
 * Generic field updater for user_data.
 * Auto-detects object/array values and JSON.stringify them for JSON blob columns.
 *
 * @param {string} userId
 * @param {Object} fields - key-value pairs to update
 */
function updateUserFields(userId, fields) {
  if (!fields || typeof fields !== 'object' || Object.keys(fields).length === 0) return;

  const setClauses = [];
  const values = [];

  for (const [key, value] of Object.entries(fields)) {
    setClauses.push(`${key} = ?`);
    values.push(serializeForDB(key, value));
  }

  values.push(userId);

  const sql = `UPDATE user_data SET ${setClauses.join(', ')} WHERE userId = ?`;
  db.prepare(sql).run(...values);
}

/**
 * Check if a user exists. Returns boolean.
 */
function userExists(userId) {
  const row = db.prepare('SELECT 1 FROM user_data WHERE userId = ?').get(userId);
  return !!row;
}

/**
 * Count online users.
 */
function getOnlineCount() {
  const row = db.prepare('SELECT COUNT(*) as cnt FROM user_data WHERE online = 1').get();
  return row.cnt;
}

/**
 * Get array of online user IDs.
 */
function getOnlineUserIds() {
  const rows = db.prepare('SELECT userId FROM user_data WHERE online = 1').all();
  return rows.map(r => r.userId);
}

// ===========================================================================
// HERO OPERATIONS
// ===========================================================================

/**
 * Get all heroes for a user, ordered by id.
 */
function getHeroes(userId) {
  return db.prepare('SELECT * FROM hero_data WHERE userId = ? ORDER BY id').all(userId);
}

/**
 * Create a new hero entry.
 * @param {Object} params - { userId, displayId, level, quality, evolveLevel, star, skinId, activeSkill, qigongLevel, selfBreakLevel, selfBreakType, connectHeroId, position, power }
 * @returns {number} The auto-incremented id
 */
function createHero(params) {
  const {
    userId, displayId, level = 1, quality = 1, evolveLevel = 0,
    star = 0, skinId = 0, activeSkill = '{}', qigongLevel = 0,
    selfBreakLevel = 0, selfBreakType = 0, connectHeroId = 0,
    position = 0, power = 0
  } = params;

  const result = db.prepare(`
    INSERT INTO hero_data (userId, displayId, level, quality, evolveLevel, star,
      skinId, activeSkill, qigongLevel, selfBreakLevel, selfBreakType,
      connectHeroId, position, power)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(userId, displayId, level, quality, evolveLevel, star,
    skinId, typeof activeSkill === 'object' ? JSON.stringify(activeSkill) : activeSkill,
    qigongLevel, selfBreakLevel, selfBreakType, connectHeroId, position, power);

  return result.lastInsertRowid;
}

/**
 * Update hero fields by hero DB id (auto-increment PK).
 * @param {number} heroDbId - The hero_data.id
 * @param {Object} fields - key-value pairs to update
 */
function updateHero(heroDbId, fields) {
  if (!fields || typeof fields !== 'object' || Object.keys(fields).length === 0) return;

  const setClauses = [];
  const values = [];

  for (const [key, value] of Object.entries(fields)) {
    setClauses.push(`${key} = ?`);
    // activeSkill is a JSON blob in hero_data
    if (key === 'activeSkill' && value !== null && typeof value === 'object') {
      values.push(JSON.stringify(value));
    } else {
      values.push(value);
    }
  }

  values.push(heroDbId);

  const sql = `UPDATE hero_data SET ${setClauses.join(', ')} WHERE id = ?`;
  db.prepare(sql).run(...values);
}

/**
 * Get a specific hero by its DB id.
 */
function getHeroById(heroDbId) {
  return db.prepare('SELECT * FROM hero_data WHERE id = ?').get(heroDbId) || null;
}

/**
 * Delete a hero by its DB id.
 */
function deleteHero(heroDbId) {
  db.prepare('DELETE FROM hero_data WHERE id = ?').run(heroDbId);
}

// ===========================================================================
// ITEM OPERATIONS
// ===========================================================================

/**
 * Get all items for a user, ordered by itemId.
 */
function getItems(userId) {
  return db.prepare('SELECT * FROM item_data WHERE userId = ? ORDER BY itemId').all(userId);
}

/**
 * Get a specific item by userId, itemId, and displayId.
 */
function getItem(userId, itemId, displayId) {
  if (displayId !== undefined && displayId !== 0) {
    return db.prepare('SELECT * FROM item_data WHERE userId = ? AND itemId = ? AND displayId = ?')
      .get(userId, itemId, displayId) || null;
  }
  return db.prepare('SELECT * FROM item_data WHERE userId = ? AND itemId = ? AND displayId = 0')
    .get(userId, itemId) || null;
}

/**
 * Set (UPSERT) an item: insert or update num.
 * @param {string} userId
 * @param {number} itemId
 * @param {number} num - The new quantity
 * @param {number} displayId
 */
function setItem(userId, itemId, num, displayId) {
  const dId = displayId || 0;
  db.prepare(`
    INSERT INTO item_data (userId, itemId, num, displayId)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(userId, itemId, displayId) DO UPDATE SET num = excluded.num
  `).run(userId, itemId, num, dId);
}

/**
 * Add (increment) an item's quantity. Creates the row if not exists.
 * @param {string} userId
 * @param {number} itemId
 * @param {number} amount - Amount to add (can be negative for decrement)
 * @param {number} displayId
 * @returns {number} The new quantity after increment
 */
function addItem(userId, itemId, amount, displayId) {
  const dId = displayId || 0;
  const result = db.prepare(`
    INSERT INTO item_data (userId, itemId, num, displayId)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(userId, itemId, displayId) DO UPDATE SET num = MAX(0, num + excluded.num)
  `).run(userId, itemId, Math.max(0, amount), dId);

  // Return the new quantity
  const row = db.prepare('SELECT num FROM item_data WHERE userId = ? AND itemId = ? AND displayId = ?')
    .get(userId, itemId, dId);
  return row ? row.num : 0;
}

/**
 * Remove (decrement) an item's quantity. Minimum is 0.
 * @param {string} userId
 * @param {number} itemId
 * @param {number} amount - Amount to remove
 * @param {number} displayId
 * @returns {number} The new quantity after decrement
 */
function removeItem(userId, itemId, amount, displayId) {
  const dId = displayId || 0;
  db.prepare(`
    UPDATE item_data SET num = MAX(0, num - ?) WHERE userId = ? AND itemId = ? AND displayId = ?
  `).run(amount, userId, itemId, dId);

  const row = db.prepare('SELECT num FROM item_data WHERE userId = ? AND itemId = ? AND displayId = ?')
    .get(userId, itemId, dId);
  return row ? row.num : 0;
}

/**
 * Batch create items for a user.
 * @param {string} userId
 * @param {Array} items - Array of { itemId, num, displayId }
 */
function createItems(userId, items) {
  if (!items || !items.length) return;

  const stmt = db.prepare(
    'INSERT INTO item_data (userId, itemId, num, displayId) VALUES (?, ?, ?, ?)'
  );

  const insertMany = db.transaction((rows) => {
    for (const item of rows) {
      stmt.run(userId, item.itemId, item.num || 0, item.displayId || 0);
    }
  });

  insertMany(items);
}

// ===========================================================================
// EQUIP OPERATIONS
// ===========================================================================

/**
 * Get all equips for a user.
 */
function getEquips(userId) {
  return db.prepare('SELECT * FROM equip_data WHERE userId = ? ORDER BY id').all(userId);
}

/**
 * Create a new equip entry.
 * @param {Object} params
 * @returns {number} The auto-incremented id
 */
function createEquip(params) {
  const {
    userId, heroId = '0', suitItems = '[]', suitAttrs = '[]',
    equipAttrs = '[]', earrings = '{}', weaponState = 0
  } = params;

  const result = db.prepare(`
    INSERT INTO equip_data (userId, heroId, suitItems, suitAttrs, equipAttrs, earrings, weaponState)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(userId, heroId,
    typeof suitItems === 'object' ? JSON.stringify(suitItems) : suitItems,
    typeof suitAttrs === 'object' ? JSON.stringify(suitAttrs) : suitAttrs,
    typeof equipAttrs === 'object' ? JSON.stringify(equipAttrs) : equipAttrs,
    typeof earrings === 'object' ? JSON.stringify(earrings) : earrings,
    weaponState);

  return result.lastInsertRowid;
}

/**
 * Update equip fields by DB id.
 * @param {number} id - equip_data.id
 * @param {Object} fields - key-value pairs to update
 */
function updateEquip(id, fields) {
  if (!fields || typeof fields !== 'object' || Object.keys(fields).length === 0) return;

  const jsonFields = new Set(['suitItems', 'suitAttrs', 'equipAttrs', 'earrings']);
  const setClauses = [];
  const values = [];

  for (const [key, value] of Object.entries(fields)) {
    setClauses.push(`${key} = ?`);
    if (jsonFields.has(key) && value !== null && typeof value === 'object') {
      values.push(JSON.stringify(value));
    } else {
      values.push(value);
    }
  }

  values.push(id);
  const sql = `UPDATE equip_data SET ${setClauses.join(', ')} WHERE id = ?`;
  db.prepare(sql).run(...values);
}

// ===========================================================================
// WEAPON OPERATIONS
// ===========================================================================

/**
 * Get all weapons for a user.
 */
function getWeapons(userId) {
  return db.prepare('SELECT * FROM weapon_data WHERE userId = ? ORDER BY id').all(userId);
}

/**
 * Create a new weapon entry.
 * @param {Object} params
 * @returns {number} The auto-incremented id
 */
function createWeapon(params) {
  const {
    userId, weaponId = '', displayId = 0, heroId = '', star = 0,
    level = 1, attrs = '{}', strengthenCost = '{}', haloId = 0,
    haloLevel = 0, haloCost = '{}', quality = 0
  } = params;

  const result = db.prepare(`
    INSERT INTO weapon_data (userId, weaponId, displayId, heroId, star, level,
      attrs, strengthenCost, haloId, haloLevel, haloCost, quality)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(userId, weaponId, displayId, heroId, star, level,
    typeof attrs === 'object' ? JSON.stringify(attrs) : attrs,
    typeof strengthenCost === 'object' ? JSON.stringify(strengthenCost) : strengthenCost,
    haloId, haloLevel,
    typeof haloCost === 'object' ? JSON.stringify(haloCost) : haloCost,
    quality);

  return result.lastInsertRowid;
}

/**
 * Update weapon fields by DB id.
 * @param {number} id - weapon_data.id
 * @param {Object} fields
 */
function updateWeapon(id, fields) {
  if (!fields || typeof fields !== 'object' || Object.keys(fields).length === 0) return;

  const jsonFields = new Set(['attrs', 'strengthenCost', 'haloCost']);
  const setClauses = [];
  const values = [];

  for (const [key, value] of Object.entries(fields)) {
    setClauses.push(`${key} = ?`);
    if (jsonFields.has(key) && value !== null && typeof value === 'object') {
      values.push(JSON.stringify(value));
    } else {
      values.push(value);
    }
  }

  values.push(id);
  const sql = `UPDATE weapon_data SET ${setClauses.join(', ')} WHERE id = ?`;
  db.prepare(sql).run(...values);
}

// ===========================================================================
// IMPRINT OPERATIONS
// ===========================================================================

/**
 * Get all imprints for a user.
 */
function getImprints(userId) {
  return db.prepare('SELECT * FROM imprint_data WHERE userId = ? ORDER BY id').all(userId);
}

/**
 * Create a new imprint entry.
 * @param {Object} params
 * @returns {number} The auto-incremented id
 */
function createImprint(params) {
  const {
    userId, imprintId = '', displayId = 0, heroId = '', level = 1,
    star = 0, mainAttr = '{}', starAttr = '{}', viceAttr = '[]',
    totalCost = '[]', addAttr = '{}', signType = 0, part = 0, signQuality = 0
  } = params;

  const result = db.prepare(`
    INSERT INTO imprint_data (userId, imprintId, displayId, heroId, level, star,
      mainAttr, starAttr, viceAttr, totalCost, addAttr, signType, part, signQuality)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(userId, imprintId, displayId, heroId, level, star,
    typeof mainAttr === 'object' ? JSON.stringify(mainAttr) : mainAttr,
    typeof starAttr === 'object' ? JSON.stringify(starAttr) : starAttr,
    typeof viceAttr === 'object' ? JSON.stringify(viceAttr) : viceAttr,
    typeof totalCost === 'object' ? JSON.stringify(totalCost) : totalCost,
    typeof addAttr === 'object' ? JSON.stringify(addAttr) : addAttr,
    signType, part, signQuality);

  return result.lastInsertRowid;
}

/**
 * Update imprint fields by DB id.
 * @param {number} id
 * @param {Object} fields
 */
function updateImprint(id, fields) {
  if (!fields || typeof fields !== 'object' || Object.keys(fields).length === 0) return;

  const jsonFields = new Set(['mainAttr', 'starAttr', 'viceAttr', 'totalCost', 'addAttr']);
  const setClauses = [];
  const values = [];

  for (const [key, value] of Object.entries(fields)) {
    setClauses.push(`${key} = ?`);
    if (jsonFields.has(key) && value !== null && typeof value === 'object') {
      values.push(JSON.stringify(value));
    } else {
      values.push(value);
    }
  }

  values.push(id);
  const sql = `UPDATE imprint_data SET ${setClauses.join(', ')} WHERE id = ?`;
  db.prepare(sql).run(...values);
}

// ===========================================================================
// GENKI OPERATIONS
// ===========================================================================

/**
 * Get all genki entries for a user.
 */
function getGenkis(userId) {
  return db.prepare('SELECT * FROM genki_data WHERE userId = ? ORDER BY id').all(userId);
}

/**
 * Create a new genki entry.
 * @param {Object} params - { userId, genkiId, heroId, pos }
 * @returns {number} The auto-incremented id
 */
function createGenki(params) {
  const { userId, genkiId, heroId = 0, pos = 0 } = params;
  const result = db.prepare(
    'INSERT INTO genki_data (userId, genkiId, heroId, pos) VALUES (?, ?, ?, ?)'
  ).run(userId, genkiId, heroId, pos);
  return result.lastInsertRowid;
}

/**
 * Update genki fields by DB id.
 */
function updateGenki(id, fields) {
  if (!fields || typeof fields !== 'object' || Object.keys(fields).length === 0) return;

  const setClauses = [];
  const values = [];
  for (const [key, value] of Object.entries(fields)) {
    setClauses.push(`${key} = ?`);
    values.push(value);
  }
  values.push(id);
  const sql = `UPDATE genki_data SET ${setClauses.join(', ')} WHERE id = ?`;
  db.prepare(sql).run(...values);
}

// ===========================================================================
// GEMSTONE OPERATIONS
// ===========================================================================

/**
 * Get all gemstones for a user.
 */
function getGemstones(userId) {
  return db.prepare('SELECT * FROM gemstone_data WHERE userId = ? ORDER BY id').all(userId);
}

/**
 * Create a new gemstone entry.
 * @param {Object} params - { userId, stoneId, displayId, heroId, level, totalExp, version }
 * @returns {number} The auto-incremented id
 */
function createGemstone(params) {
  const {
    userId, stoneId = '', displayId = 0, heroId = '',
    level = 1, totalExp = 0, version = ''
  } = params;

  const result = db.prepare(`
    INSERT INTO gemstone_data (userId, stoneId, displayId, heroId, level, totalExp, version)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(userId, stoneId, displayId, heroId, level, totalExp, version);

  return result.lastInsertRowid;
}

/**
 * Update gemstone fields by DB id.
 */
function updateGemstone(id, fields) {
  if (!fields || typeof fields !== 'object' || Object.keys(fields).length === 0) return;

  const setClauses = [];
  const values = [];
  for (const [key, value] of Object.entries(fields)) {
    setClauses.push(`${key} = ?`);
    values.push(value);
  }
  values.push(id);
  const sql = `UPDATE gemstone_data SET ${setClauses.join(', ')} WHERE id = ?`;
  db.prepare(sql).run(...values);
}

// ===========================================================================
// SUPER SKILL OPERATIONS
// ===========================================================================

/**
 * Get all super skills for a user.
 */
function getSuperSkills(userId) {
  return db.prepare('SELECT * FROM super_skill_data WHERE userId = ? ORDER BY id').all(userId);
}

/**
 * Create a new super skill entry.
 * @param {Object} params - { userId, skillId, level, evolveLevel }
 * @returns {number} The auto-incremented id
 */
function createSuperSkill(params) {
  const { userId, skillId, level = 1, evolveLevel = 0 } = params;
  const result = db.prepare(`
    INSERT INTO super_skill_data (userId, skillId, level, evolveLevel)
    VALUES (?, ?, ?, ?)
  `).run(userId, skillId, level, evolveLevel);
  return result.lastInsertRowid;
}

/**
 * Update super skill by DB id.
 */
function updateSuperSkill(id, fields) {
  if (!fields || typeof fields !== 'object' || Object.keys(fields).length === 0) return;

  const setClauses = [];
  const values = [];
  for (const [key, value] of Object.entries(fields)) {
    setClauses.push(`${key} = ?`);
    values.push(value);
  }
  values.push(id);
  const sql = `UPDATE super_skill_data SET ${setClauses.join(', ')} WHERE id = ?`;
  db.prepare(sql).run(...values);
}

// ===========================================================================
// RESONANCE OPERATIONS
// ===========================================================================

/**
 * Get all resonance seat entries for a user.
 */
function getResonance(userId) {
  return db.prepare('SELECT * FROM resonance_data WHERE userId = ? ORDER BY cabinId, seatId')
    .all(userId);
}

/**
 * Upsert a resonance seat (insert or update if userId+cabinId+seatId exists).
 * @param {Object} params - { userId, cabinId, seatId, heroId }
 */
function upsertResonanceSeat(params) {
  const { userId, cabinId, seatId, heroId = 0 } = params;
  db.prepare(`
    INSERT INTO resonance_data (userId, cabinId, seatId, heroId)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(userId, cabinId, seatId) DO UPDATE SET heroId = excluded.heroId
  `).run(userId, cabinId, seatId, heroId);
}

// ===========================================================================
// GUILD OPERATIONS
// ===========================================================================

/**
 * Get guild row by guildUUID.
 */
function getGuild(guildUUID) {
  return db.prepare('SELECT * FROM guild_data WHERE guildUUID = ?').get(guildUUID) || null;
}

/**
 * Find guild that a user belongs to (via guild_member_data join).
 * Returns the guild_data row or null.
 */
function getGuildByUser(userId) {
  const member = db.prepare(
    'SELECT guildUUID FROM guild_member_data WHERE userId = ?'
  ).get(userId);
  if (!member) return null;
  return getGuild(member.guildUUID);
}

/**
 * Get all members of a guild.
 */
function getGuildMembers(guildUUID) {
  return db.prepare('SELECT * FROM guild_member_data WHERE guildUUID = ?').all(guildUUID);
}

/**
 * Create a new guild.
 * @param {Object} params
 * @returns {string} guildUUID
 */
function createGuild(params) {
  const {
    guildUUID, guildName, iconId = 0, captainUserId,
    viceCaptainUserId = '', bulletin = '', description = '',
    level = 1, exp = 0, memberNum = 0, needAgree = 1,
    limitLevel = 0, createTime, activePoint = 0
  } = params;

  db.prepare(`
    INSERT INTO guild_data (guildUUID, guildName, iconId, captainUserId,
      viceCaptainUserId, bulletin, description, level, exp, memberNum,
      needAgree, limitLevel, createTime, activePoint)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(guildUUID, guildName, iconId, captainUserId,
    viceCaptainUserId, bulletin, description, level, exp,
    memberNum, needAgree, limitLevel, createTime || Math.floor(Date.now() / 1000),
    activePoint);

  return guildUUID;
}

/**
 * Update guild fields by guildUUID.
 */
function updateGuild(guildUUID, fields) {
  if (!fields || typeof fields !== 'object' || Object.keys(fields).length === 0) return;

  const setClauses = [];
  const values = [];
  for (const [key, value] of Object.entries(fields)) {
    setClauses.push(`${key} = ?`);
    values.push(value);
  }
  values.push(guildUUID);
  const sql = `UPDATE guild_data SET ${setClauses.join(', ')} WHERE guildUUID = ?`;
  db.prepare(sql).run(...values);
}

/**
 * Add a member to a guild.
 */
function addGuildMember(params) {
  const { guildUUID, userId, position = 0, joinTime, donateNum = 0 } = params;
  db.prepare(`
    INSERT INTO guild_member_data (guildUUID, userId, position, joinTime, donateNum)
    VALUES (?, ?, ?, ?, ?)
  `).run(guildUUID, userId, position, joinTime || Math.floor(Date.now() / 1000), donateNum);
}

/**
 * Remove a member from a guild.
 */
function removeGuildMember(guildUUID, userId) {
  db.prepare('DELETE FROM guild_member_data WHERE guildUUID = ? AND userId = ?')
    .run(guildUUID, userId);
}

// ===========================================================================
// FRIEND OPERATIONS
// ===========================================================================

/**
 * Get all friend entries for a user.
 */
function getFriends(userId) {
  return db.prepare('SELECT * FROM friend_data WHERE userId = ?').all(userId);
}

/**
 * Get a specific friend entry.
 */
function getFriend(userId, friendId) {
  return db.prepare('SELECT * FROM friend_data WHERE userId = ? AND friendId = ?')
    .get(userId, friendId) || null;
}

/**
 * Add a friend.
 */
function addFriend(params) {
  const { userId, friendId, giveHeartTime = 0, getHeartTime = 0 } = params;
  db.prepare(`
    INSERT INTO friend_data (userId, friendId, giveHeartTime, getHeartTime)
    VALUES (?, ?, ?, ?)
  `).run(userId, friendId, giveHeartTime, getHeartTime);
}

/**
 * Remove a friend.
 */
function removeFriend(userId, friendId) {
  db.prepare('DELETE FROM friend_data WHERE userId = ? AND friendId = ?')
    .run(userId, friendId);
}

/**
 * Update friend fields.
 */
function updateFriend(userId, friendId, fields) {
  if (!fields || typeof fields !== 'object' || Object.keys(fields).length === 0) return;

  const setClauses = [];
  const values = [];
  for (const [key, value] of Object.entries(fields)) {
    setClauses.push(`${key} = ?`);
    values.push(value);
  }
  values.push(userId, friendId);
  const sql = `UPDATE friend_data SET ${setClauses.join(', ')} WHERE userId = ? AND friendId = ?`;
  db.prepare(sql).run(...values);
}

/**
 * Get all blacklist entries for a user.
 */
function getBlacklist(userId) {
  return db.prepare('SELECT * FROM friend_blacklist WHERE userId = ?').all(userId);
}

/**
 * Add to blacklist.
 */
function addBlacklist(userId, targetUserId) {
  db.prepare('INSERT OR IGNORE INTO friend_blacklist (userId, targetUserId) VALUES (?, ?)')
    .run(userId, targetUserId);
}

/**
 * Remove from blacklist.
 */
function removeBlacklist(userId, targetUserId) {
  db.prepare('DELETE FROM friend_blacklist WHERE userId = ? AND targetUserId = ?')
    .run(userId, targetUserId);
}

// ===========================================================================
// ARENA OPERATIONS
// ===========================================================================

/**
 * Get arena data for a user.
 */
function getArena(userId) {
  return db.prepare('SELECT * FROM arena_data WHERE userId = ?').get(userId) || null;
}

/**
 * Upsert arena data for a user.
 */
function upsertArena(userId, fields) {
  // Check if row exists
  const existing = db.prepare('SELECT 1 FROM arena_data WHERE userId = ?').get(userId);
  if (existing) {
    if (fields && typeof fields === 'object' && Object.keys(fields).length > 0) {
      const setClauses = [];
      const values = [];
      for (const [key, value] of Object.entries(fields)) {
        setClauses.push(`${key} = ?`);
        values.push(typeof value === 'object' ? JSON.stringify(value) : value);
      }
      values.push(userId);
      db.prepare(`UPDATE arena_data SET ${setClauses.join(', ')} WHERE userId = ?`).run(...values);
    }
  } else {
    const { rank = 0, times = 5, buyTimes = 0, team = '{}', lastRefreshTime = 0 } = fields || {};
    db.prepare(`
      INSERT INTO arena_data (userId, rank, times, buyTimes, team, lastRefreshTime)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(userId, rank, times, buyTimes,
      typeof team === 'object' ? JSON.stringify(team) : team, lastRefreshTime);
  }
}

// ===========================================================================
// MAIL OPERATIONS
// ===========================================================================

/**
 * Get all mails for a user, sorted by sendTime descending.
 */
function getMails(userId) {
  return db.prepare(
    'SELECT * FROM mail_data WHERE userId = ? ORDER BY sendTime DESC'
  ).all(userId);
}

/**
 * Get a specific mail by mailId.
 */
function getMail(mailId) {
  return db.prepare('SELECT * FROM mail_data WHERE mailId = ?').get(mailId) || null;
}

/**
 * Insert a new mail.
 * @param {Object} params
 * @returns {number} The mailId
 */
function createMail(params) {
  const {
    userId, senderId = '', title = '', content = '',
    awards = '[]', isRead = 0, isGot = 0,
    sendTime = Math.floor(Date.now() / 1000), expireTime = 0, type = 0
  } = params;

  const result = db.prepare(`
    INSERT INTO mail_data (userId, senderId, title, content, awards, isRead, isGot, sendTime, expireTime, type)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(userId, senderId, title, content,
    typeof awards === 'object' ? JSON.stringify(awards) : awards,
    isRead, isGot, sendTime, expireTime, type);

  return result.lastInsertRowid;
}

/**
 * Update mail fields.
 */
function updateMail(mailId, fields) {
  if (!fields || typeof fields !== 'object' || Object.keys(fields).length === 0) return;

  const setClauses = [];
  const values = [];
  for (const [key, value] of Object.entries(fields)) {
    setClauses.push(`${key} = ?`);
    if (key === 'awards' && typeof value === 'object') {
      values.push(JSON.stringify(value));
    } else {
      values.push(value);
    }
  }
  values.push(mailId);
  const sql = `UPDATE mail_data SET ${setClauses.join(', ')} WHERE mailId = ?`;
  db.prepare(sql).run(...values);
}

/**
 * Delete a mail.
 */
function deleteMail(mailId) {
  db.prepare('DELETE FROM mail_data WHERE mailId = ?').run(mailId);
}

// ===========================================================================
// SHOP OPERATIONS
// ===========================================================================

/**
 * Get shop entries for a user, optionally filtered by shopType.
 */
function getShopData(userId, shopType) {
  if (shopType !== undefined) {
    return db.prepare('SELECT * FROM shop_data WHERE userId = ? AND shopType = ?')
      .all(userId, shopType);
  }
  return db.prepare('SELECT * FROM shop_data WHERE userId = ?').all(userId);
}

/**
 * Upsert shop entry.
 */
function upsertShopData(userId, shopType, goodsId, fields) {
  const existing = db.prepare(
    'SELECT id FROM shop_data WHERE userId = ? AND shopType = ? AND goodsId = ?'
  ).get(userId, shopType, goodsId);

  if (existing) {
    if (fields && typeof fields === 'object' && Object.keys(fields).length > 0) {
      const setClauses = [];
      const values = [];
      for (const [key, value] of Object.entries(fields)) {
        setClauses.push(`${key} = ?`);
        values.push(value);
      }
      values.push(existing.id);
      db.prepare(`UPDATE shop_data SET ${setClauses.join(', ')} WHERE id = ?`).run(...values);
    }
  } else {
    const { buyTimes = 0, refreshTime = 0 } = fields || {};
    db.prepare(`
      INSERT INTO shop_data (userId, shopType, goodsId, buyTimes, refreshTime)
      VALUES (?, ?, ?, ?, ?)
    `).run(userId, shopType, goodsId, buyTimes, refreshTime);
  }
}

// ===========================================================================
// DUNGEON OPERATIONS
// ===========================================================================

/**
 * Get dungeon data for a user.
 */
function getDungeons(userId) {
  return db.prepare('SELECT * FROM dungeon_data WHERE userId = ? ORDER BY dungeonType')
    .all(userId);
}

/**
 * Get a specific dungeon by type.
 */
function getDungeon(userId, dungeonType) {
  return db.prepare('SELECT * FROM dungeon_data WHERE userId = ? AND dungeonType = ?')
    .get(userId, dungeonType) || null;
}

/**
 * Upsert dungeon data.
 */
function upsertDungeon(userId, dungeonType, fields) {
  const existing = db.prepare(
    'SELECT id FROM dungeon_data WHERE userId = ? AND dungeonType = ?'
  ).get(userId, dungeonType);

  if (existing) {
    if (fields && typeof fields === 'object' && Object.keys(fields).length > 0) {
      const setClauses = [];
      const values = [];
      for (const [key, value] of Object.entries(fields)) {
        setClauses.push(`${key} = ?`);
        values.push(value);
      }
      values.push(existing.id);
      db.prepare(`UPDATE dungeon_data SET ${setClauses.join(', ')} WHERE id = ?`).run(...values);
    }
  } else {
    const { level = 0, sweepLevel = 0, times = 0, buyTimes = 0 } = fields || {};
    db.prepare(`
      INSERT INTO dungeon_data (userId, dungeonType, level, sweepLevel, times, buyTimes)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(userId, dungeonType, level, sweepLevel, times, buyTimes);
  }
}

// ===========================================================================
// TOWER OPERATIONS
// ===========================================================================

/**
 * Get tower data for a user.
 */
function getTower(userId) {
  return db.prepare('SELECT * FROM tower_data WHERE userId = ?').get(userId) || null;
}

/**
 * Upsert tower data.
 */
function upsertTower(userId, fields) {
  const existing = db.prepare('SELECT 1 FROM tower_data WHERE userId = ?').get(userId);
  if (existing) {
    if (fields && typeof fields === 'object' && Object.keys(fields).length > 0) {
      const setClauses = [];
      const values = [];
      for (const [key, value] of Object.entries(fields)) {
        setClauses.push(`${key} = ?`);
        if (key === 'events' && typeof value === 'object') {
          values.push(JSON.stringify(value));
        } else {
          values.push(value);
        }
      }
      values.push(userId);
      db.prepare(`UPDATE tower_data SET ${setClauses.join(', ')} WHERE userId = ?`).run(...values);
    }
  } else {
    const { floor = 0, times = 10, buyTimes = 0, climbTimes = 0, events = '[]' } = fields || {};
    db.prepare(`
      INSERT INTO tower_data (userId, floor, times, buyTimes, climbTimes, events)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(userId, floor, times, buyTimes, climbTimes,
      typeof events === 'object' ? JSON.stringify(events) : events);
  }
}

// ===========================================================================
// BALL WAR OPERATIONS
// ===========================================================================

/**
 * Get ball war data for a user.
 */
function getBallWar(userId) {
  return db.prepare('SELECT * FROM ball_war_data WHERE userId = ?').get(userId) || null;
}

/**
 * Upsert ball war data.
 */
function upsertBallWar(userId, fields) {
  const existing = db.prepare('SELECT 1 FROM ball_war_data WHERE userId = ?').get(userId);
  if (existing) {
    if (fields && typeof fields === 'object' && Object.keys(fields).length > 0) {
      const setClauses = [];
      const values = [];
      for (const [key, value] of Object.entries(fields)) {
        setClauses.push(`${key} = ?`);
        if (key === 'defence' && typeof value === 'object') {
          values.push(JSON.stringify(value));
        } else {
          values.push(value);
        }
      }
      values.push(userId);
      db.prepare(`UPDATE ball_war_data SET ${setClauses.join(', ')} WHERE userId = ?`).run(...values);
    }
  } else {
    const { state = 0, signedUp = 0, times = 3, defence = '{}' } = fields || {};
    db.prepare(`
      INSERT INTO ball_war_data (userId, state, signedUp, times, defence)
      VALUES (?, ?, ?, ?, ?)
    `).run(userId, state, signedUp, times,
      typeof defence === 'object' ? JSON.stringify(defence) : defence);
  }
}

// ===========================================================================
// BATTLE OPERATIONS
// ===========================================================================

/**
 * Insert a new battle.
 * @param {Object} params
 */
function createBattle(params) {
  const {
    battleId, userId, battleField, seed = '', team = '{}',
    startTime = Math.floor(Date.now() / 1000), status = 0
  } = params;

  db.prepare(`
    INSERT INTO battle_data (battleId, userId, battleField, seed, team, startTime, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(battleId, userId, battleField, seed,
    typeof team === 'object' ? JSON.stringify(team) : team,
    startTime, status);
}

/**
 * Get a battle by battleId.
 */
function getBattle(battleId) {
  return db.prepare('SELECT * FROM battle_data WHERE battleId = ?').get(battleId) || null;
}

/**
 * Update battle status.
 */
function updateBattleStatus(battleId, status) {
  db.prepare('UPDATE battle_data SET status = ? WHERE battleId = ?').run(status, battleId);
}

/**
 * Update battle fields.
 */
function updateBattle(battleId, fields) {
  if (!fields || typeof fields !== 'object' || Object.keys(fields).length === 0) return;

  const setClauses = [];
  const values = [];
  for (const [key, value] of Object.entries(fields)) {
    setClauses.push(`${key} = ?`);
    if (key === 'team' && typeof value === 'object') {
      values.push(JSON.stringify(value));
    } else {
      values.push(value);
    }
  }
  values.push(battleId);
  const sql = `UPDATE battle_data SET ${setClauses.join(', ')} WHERE battleId = ?`;
  db.prepare(sql).run(...values);
}

/**
 * Delete a battle.
 */
function deleteBattle(battleId) {
  db.prepare('DELETE FROM battle_data WHERE battleId = ?').run(battleId);
}

// ===========================================================================
// ENTRUST OPERATIONS
// ===========================================================================

/**
 * Get all entrust entries for a user.
 */
function getEntrusts(userId) {
  return db.prepare('SELECT * FROM entrust_data WHERE userId = ? ORDER BY entrustIndex')
    .all(userId);
}

/**
 * Create a new entrust entry.
 */
function createEntrust(params) {
  const {
    userId, entrustIndex = 0, heroInfo = '{}', status = 0, finishTime = 0
  } = params;

  const result = db.prepare(`
    INSERT INTO entrust_data (userId, entrustIndex, heroInfo, status, finishTime)
    VALUES (?, ?, ?, ?, ?)
  `).run(userId, entrustIndex,
    typeof heroInfo === 'object' ? JSON.stringify(heroInfo) : heroInfo,
    status, finishTime);

  return result.lastInsertRowid;
}

/**
 * Update entrust fields by DB id.
 */
function updateEntrust(id, fields) {
  if (!fields || typeof fields !== 'object' || Object.keys(fields).length === 0) return;

  const jsonFields = new Set(['heroInfo']);
  const setClauses = [];
  const values = [];

  for (const [key, value] of Object.entries(fields)) {
    setClauses.push(`${key} = ?`);
    if (jsonFields.has(key) && typeof value === 'object') {
      values.push(JSON.stringify(value));
    } else {
      values.push(value);
    }
  }
  values.push(id);
  const sql = `UPDATE entrust_data SET ${setClauses.join(', ')} WHERE id = ?`;
  db.prepare(sql).run(...values);
}

// ===========================================================================
// EXPEDITION OPERATIONS
// ===========================================================================

/**
 * Get all expedition entries for a user.
 */
function getExpeditions(userId) {
  return db.prepare('SELECT * FROM expedition_data WHERE userId = ? ORDER BY id')
    .all(userId);
}

/**
 * Create a new expedition entry.
 */
function createExpedition(params) {
  const {
    userId, machineId = 0, heroId = 0, lessonIds = '[]', teams = '[]'
  } = params;

  const result = db.prepare(`
    INSERT INTO expedition_data (userId, machineId, heroId, lessonIds, teams)
    VALUES (?, ?, ?, ?, ?)
  `).run(userId, machineId, heroId,
    typeof lessonIds === 'object' ? JSON.stringify(lessonIds) : lessonIds,
    typeof teams === 'object' ? JSON.stringify(teams) : teams);

  return result.lastInsertRowid;
}

/**
 * Update expedition fields by DB id.
 */
function updateExpedition(id, fields) {
  if (!fields || typeof fields !== 'object' || Object.keys(fields).length === 0) return;

  const jsonFields = new Set(['lessonIds', 'teams']);
  const setClauses = [];
  const values = [];

  for (const [key, value] of Object.entries(fields)) {
    setClauses.push(`${key} = ?`);
    if (jsonFields.has(key) && typeof value === 'object') {
      values.push(JSON.stringify(value));
    } else {
      values.push(value);
    }
  }
  values.push(id);
  const sql = `UPDATE expedition_data SET ${setClauses.join(', ')} WHERE id = ?`;
  db.prepare(sql).run(...values);
}

// ===========================================================================
// RANK OPERATIONS
// ===========================================================================

/**
 * Get top rank entries by rankType.
 * @param {number} rankType
 * @param {number} limit
 */
function getRankByType(rankType, limit = 100) {
  return db.prepare(
    'SELECT * FROM rank_data WHERE rankType = ? ORDER BY rankValue DESC, rankLevel DESC LIMIT ?'
  ).all(rankType, limit);
}

/**
 * Get rank entry for a specific user and type.
 */
function getRank(userId, rankType) {
  return db.prepare('SELECT * FROM rank_data WHERE userId = ? AND rankType = ?')
    .get(userId, rankType) || null;
}

/**
 * Upsert a rank entry.
 */
function upsertRank(rankType, userId, fields) {
  const existing = db.prepare('SELECT id FROM rank_data WHERE rankType = ? AND userId = ?')
    .get(rankType, userId);

  if (existing) {
    if (fields && typeof fields === 'object' && Object.keys(fields).length > 0) {
      const setClauses = [];
      const values = [];
      for (const [key, value] of Object.entries(fields)) {
        setClauses.push(`${key} = ?`);
        values.push(value);
      }
      values.push(existing.id);
      db.prepare(`UPDATE rank_data SET ${setClauses.join(', ')} WHERE id = ?`).run(...values);
    }
  } else {
    const { rankValue = 0, rankLevel = 0 } = fields || {};
    db.prepare(`
      INSERT INTO rank_data (rankType, userId, rankValue, rankLevel)
      VALUES (?, ?, ?, ?)
    `).run(rankType, userId, rankValue, rankLevel);
  }
}

// ===========================================================================
// DEFAULT DATA BUILDERS (for createCompleteUser)
// ===========================================================================

/**
 * Build default scheduleData from constant.json values.
 * All keys use `_` prefix (Serializable model).
 */
function buildDefaultSchedule(constant) {
  return {
    _marketDiamondRefreshCount: 0,
    _vipMarketDiamondRefreshCount: 0,
    _arenaAttackTimes: parseInt(constant.arenaAttackTimes) || 5,
    _arenaBuyTimesCount: 0,
    _snakeResetTimes: 0,
    _snakeSweepCount: 0,
    _cellGameHaveGotReward: false,
    _cellGameHaveTimes: parseInt(constant.cellGameTimes) || 1,
    _cellgameHaveSetHero: false,
    _strongEnemyTimes: parseInt(constant.bossAttackTimes) || 6,
    _strongEnemyBuyCount: 0,
    _mergeBossBuyCount: 0,
    _dungeonTimes: {},
    _dungeonBuyTimesCount: {},
    _karinBattleTimes: parseInt(constant.karinTowerBattleTimes) || 10,
    _karinBuyBattleTimesCount: 0,
    _karinBuyFeetCount: 0,
    _entrustResetTimes: 0,
    _dragonExchangeSSPoolId: 0,
    _dragonExchangeSSSPoolId: 0,
    _teamDugeonUsedRobots: [],
    _timeTrialBuyTimesCount: 0,
    _monthCardHaveGotReward: {},
    _goldBuyCount: 0,
    _likeRank: 0,
    _mahaAttackTimes: parseInt(constant.mahaAdventureTimesMax) || 5,
    _mahaBuyTimesCount: 0,
    _mineResetTimes: 0,
    _mineBuyResetTimesCount: 0,
    _mineBuyStepCount: 0,
    _guildBossTimes: parseInt(constant.guildBOSSTimes) || 2,
    _guildBossTimesBuyCount: 0,
    _treasureTimes: 0,
    _guildCheckInType: 0,
    _templeBuyCount: 0,
    _trainingBuyCount: 0,
    _bossCptTimes: 0,
    _bossCptBuyCount: 0,
    _ballWarBuyCount: 0,
    _expeditionEvents: null,
    _clickExpedition: 0,
    _expeditionSpeedUpCost: 0,
    _templeDailyReward: null,
    _templeYesterdayLess: 0,
    _topBattleTimes: 0,
    _topBattleBuyCount: 0,
    _gravityTrialBuyTimesCount: 0
  };
}

/**
 * Build default timesData from constant.json values.
 * Keys WITHOUT `_` prefix (direct read model).
 */
function buildDefaultTimes(constant) {
  return {
    marketRefreshTimes: parseInt(constant.marketRefreshTimeMax) || 5,
    marketRefreshTimesRecover: 0,
    vipMarketRefreshTimes: parseInt(constant.vipMarketRefreshTimeMax) || 5,
    vipMarketRefreshTimesRecover: 0,
    templeTimes: parseInt(constant.templeTestTimes) || 10,
    templeTimesRecover: 0,
    mahaTimes: parseInt(constant.mahaAdventureTimesMax) || 5,
    mahaTimesRecover: 0,
    mineSteps: parseInt(constant.mineActionPointMax) || 50,
    mineStepsRecover: 0,
    karinFeet: parseInt(constant.karinTowerFeet) || 5,
    karinFeetRecover: 0
  };
}

/**
 * Build default hangupData.
 * IMPORTANT: _curLess MUST be startLesson (e.g. 10101), NOT 0
 */
function buildDefaultHangup(constant) {
  const startLesson = parseInt(constant.startLesson) || 10101;
  return {
    _curLess: startLesson,
    _maxPassLesson: startLesson,
    _haveGotChapterReward: {},
    _maxPassChapter: 0,
    _clickGlobalWarBuffTag: '',
    _buyFund: false,
    _haveGotFundReward: {}
  };
}

/**
 * Build default summonData.
 */
function buildDefaultSummon() {
  return {
    _energy: 0,
    _wishList: [],
    _wishVersion: 0,
    _canCommonFreeTime: 0,
    _canSuperFreeTime: 0,
    _summonTimes: {}
  };
}

/**
 * Build default giftInfoData.
 */
function buildDefaultGiftInfo() {
  return {
    _gotChannelWeeklyRewardTag: '',
    _fristRecharge: { _canGetReward: false, _haveGotReward: false },
    _haveGotVipRewrd: {},
    _buyVipGiftCount: {},
    _onlineGift: { _curId: 0, _nextTime: 0 },
    _gotBSAddToHomeReward: false,
    _clickHonghuUrlTime: 0
  };
}

/**
 * Build default channelSpecialData.
 */
function buildDefaultChannelSpecial() {
  return {
    _honghuUrl: '',
    _honghuUrlStartTime: 0,
    _honghuUrlEndTime: 0
  };
}

/**
 * Build default checkinData.
 */
function buildDefaultCheckin() {
  return {
    _id: '',
    _activeItem: [],
    _curCycle: 1,
    _maxActiveDay: 0,
    _lastActiveDate: 0
  };
}

/**
 * Build default trainingData.
 */
function buildDefaultTraining(constant) {
  return {
    _id: '',
    _type: 0,
    _times: parseInt(constant.trainingTimesMax) || 10,
    _timesStartRecover: 0,
    _surpriseReward: null,
    _questionId: 0,
    _enemyId: 0,
    _cfgId: 0
  };
}

/**
 * Build default userBallWarData.
 */
function buildDefaultUserBallWar(constant) {
  return {
    _state: 0,
    _signedUp: 0,
    _times: parseInt(constant.dragonBallWarTimesMax) || 3,
    _defence: {}
  };
}

/**
 * Build default ballWarInfoData.
 */
function buildDefaultBallWarInfo() {
  return {
    _signed: false,
    _fieldId: '',
    _point: 0,
    _topMsg: ''
  };
}

/**
 * Build default expeditionData.
 */
function buildDefaultExpedition(constant) {
  return {
    _id: '',
    _passLesson: {},
    _machines: {},
    _collection: [],
    _teams: {},
    _times: parseInt(constant.expeditionBattleTimes) || 10,
    _timesStartRecover: 0
  };
}

/**
 * Build default timeTrialData.
 */
function buildDefaultTimeTrial() {
  return {
    _id: '',
    _levelStars: {},
    _level: 1,
    _totalStars: 0,
    _gotStarReward: {},
    _haveTimes: 5,
    _timesStartRecover: 0,
    _lastRefreshTime: 0,
    _startTime: 0
  };
}

/**
 * Build default battleMedalData.
 */
function buildDefaultBattleMedal() {
  return {
    _id: '',
    _battleMedalId: '',
    _cycle: 0,
    _nextRefreshTime: 0,
    _level: 0,
    _curExp: 0,
    _openSuper: false,
    _task: {},
    _levelReward: {},
    _shopBuyTimes: {},
    _buyLevelCount: 0
  };
}

/**
 * Build default teamDungeonData.
 */
function buildDefaultTeamDungeon() {
  return {
    _myTeam: null,
    _canCreateTeamTime: 0,
    _nextCanJoinTime: 0
  };
}

/**
 * Build default resonanceData.
 */
function buildDefaultResonance() {
  return {
    _id: '',
    _diamondCabin: 0,
    _cabins: {},
    _buySeatCount: 0,
    _totalTalent: 0,
    _unlockSpecial: false
  };
}

/**
 * Build default gravityData.
 */
function buildDefaultGravity(constant) {
  return {
    _id: '',
    _haveTimes: parseInt(constant.trainingTimesMax) || 10,
    _timesStartRecover: 0,
    _lastLess: 0,
    _lastTime: 0
  };
}

/**
 * Build default littleGameData.
 */
function buildDefaultLittleGame() {
  return {
    _gotBattleReward: {},
    _gotChapterReward: {},
    _clickTime: 0
  };
}

/**
 * Build default monthCardData.
 */
function buildDefaultMonthCard() {
  return { _id: '', _card: {} };
}

/**
 * Build default rechargeData.
 */
function buildDefaultRecharge() {
  return { _id: '', _haveBought: {} };
}

// ===========================================================================
// NEW USER CREATION (CRITICAL)
// ===========================================================================

/**
 * Create a complete new user with all default game data.
 * Reads constant.json via jsonLoader for all default values.
 * Inserts everything in a single transaction across multiple tables:
 *   1. user_data row (with default values from constant.json)
 *   2. hero_data row (startHero from constant.json, default 1205)
 *   3. item_data rows (7 mandatory items: 104=level, 103=exp, 101=diamond, 102=gold, 106=vipLevel, 105=vipExp, 107=vipExpAll)
 *   4. dungeon_data rows (8 dungeon types: 1-8)
 *   5. tower_data row
 *   6. arena_data row
 *   7. ball_war_data row
 *
 * @param {string} userId
 * @param {string} nickName
 * @param {string} loginToken
 * @param {string} serverId
 * @param {string} language
 * @returns {Object} The newly created user row (parsed)
 */
function createCompleteUser(userId, nickName, loginToken, serverId, language) {
  // Load constant.json defaults via jsonLoader
  let constant = {};
  try {
    const jsonLoader = require('./jsonLoader');
    const constantData = jsonLoader.get('constant');
    // constant.json values are under key "1"
    constant = (constantData && constantData['1']) || {};
  } catch (_) {
    // If jsonLoader not available, use hardcoded fallbacks (NO ASSUMPTIONS — these are exact constant.json values)
    constant = {
      startHero: '1205',
      startHeroLevel: '3',
      startLesson: 10101,
      startChapter: 801,
      startDiamond: '0',
      startGold: '0',
      startUserLevel: 1,
      arenaAttackTimes: '5',
      bossAttackTimes: '6',
      karinTowerBattleTimes: '10',
      cellGameTimes: '1',
      templeTestTimes: '10',
      marketRefreshTimeMax: '5',
      vipMarketRefreshTimeMax: '5',
      mahaAdventureTimesMax: '5',
      mineActionPointMax: '50',
      karinTowerFeet: '5',
      guildBOSSTimes: '2',
      expeditionBattleTimes: '10',
      trainingTimesMax: '10',
      dragonBallWarTimesMax: '3'
    };
  }

  const now = Math.floor(Date.now() / 1000);
  const startHero = String(constant.startHero || '1205');
  const startHeroLevel = parseInt(constant.startHeroLevel) || 3;
  const startDiamond = parseInt(constant.startDiamond) || 0;
  const startGold = parseInt(constant.startGold) || 0;
  const startLesson = parseInt(constant.startLesson) || 10101;
  const startChapter = parseInt(constant.startChapter) || 801;
  const startUserLevel = parseInt(constant.startUserLevel) || 1;

  // Build all JSON blob data for user_data
  const hangupData = buildDefaultHangup(constant);
  const summonData = buildDefaultSummon();
  const scheduleData = buildDefaultSchedule(constant);
  const timesData = buildDefaultTimes(constant);
  const giftInfoData = buildDefaultGiftInfo();
  const channelSpecialData = buildDefaultChannelSpecial();
  const checkinData = buildDefaultCheckin();
  const trainingData = buildDefaultTraining(constant);
  const monthCardData = buildDefaultMonthCard();
  const rechargeData = buildDefaultRecharge();
  const userBallWarData = buildDefaultUserBallWar(constant);
  const ballWarInfoData = buildDefaultBallWarInfo();
  const expeditionData = buildDefaultExpedition(constant);
  const timeTrialData = buildDefaultTimeTrial();
  const battleMedalData = buildDefaultBattleMedal();
  const teamDungeonData = buildDefaultTeamDungeon();
  const resonanceData = buildDefaultResonance();
  const gravityData = buildDefaultGravity(constant);
  const littleGameData = buildDefaultLittleGame();

  // Arena defaults from constant.json
  const arenaAttackTimes = parseInt(constant.arenaAttackTimes) || 5;
  const karinTowerBattleTimes = parseInt(constant.karinTowerBattleTimes) || 10;
  const dragonBallWarTimesMax = parseInt(constant.dragonBallWarTimesMax) || 3;

  // ── Transaction: insert all tables atomically ──
  const doInsert = db.transaction(() => {
    // 1. Insert user_data
    db.prepare(`
      INSERT INTO user_data (
        userId, nickName, headImageId, headBoxId, level, exp,
        vipLevel, vipExp, vipExpAll, diamond, gold,
        loginToken, serverId, createTime, lastLoginTime,
        language, guideStep, fastTeams, clickSystem, bulletinRead,
        lessonId, chapterId, backpackLevel, firstEnter,
        scheduleData, timesData, battleMedalData, giftInfoData,
        ballWarData, expeditionData, entrustData,
        towerFloor, towerTimes, towerBuyTimes, towerClimbTimes, towerEvents,
        arenaRank, arenaTimes, arenaBuyTimes, arenaLastRefreshTime, arenaTeam,
        online,
        monthlyCardEndTime, bigMonthlyCardEndTime, lifelongCardEndTime,
        monthlyCardDay, bigMonthlyCardDay, lifelongCardDay,
        firstRechargeGot, monthCardGot, bigMonthCardGot, lifelongCardGot,
        hangupData, summonData, heroSkinData, lastTeamData,
        headEffectData, trainingData, checkinData,
        monthCardData, rechargeData, dragonEquipedData,
        channelSpecialData, timeMachineData, timeBonusInfoData,
        timeTrialData, expeditionModelData, shopNewHeroesData,
        teamDungeonData, teamDungeonTaskData, gemstoneData,
        resonanceData, userTopBattleData, topBattleInfoData,
        littleGameData, gravityData, warInfoData, userWarData,
        userBallWarData, ballWarInfoData, userGuildData, userGuildPubData,
        fastTeamData, superSkillData, customSignData
      ) VALUES (
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?,
        ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?,
        ?, ?, ?,
        ?, ?,
        ?, ?,
        ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?
      )
    `).run(
      userId,
      nickName,
      0,                                  // headImageId
      0,                                  // headBoxId
      startUserLevel,                     // level
      0,                                  // exp
      0,                                  // vipLevel
      0,                                  // vipExp
      0,                                  // vipExpAll
      startDiamond,                       // diamond
      startGold,                          // gold
      loginToken,
      serverId,
      now,                                // createTime
      now,                                // lastLoginTime
      language || 'en',
      '',                                 // guideStep
      '{}',                               // fastTeams
      '{"1":false,"2":false}',            // clickSystem
      '{}',                               // bulletinRead
      startLesson,                        // lessonId (from constant.json)
      startChapter,                       // chapterId (from constant.json)
      startUserLevel,                     // backpackLevel
      1,                                  // firstEnter
      JSON.stringify(scheduleData),
      JSON.stringify(timesData),
      JSON.stringify(battleMedalData),
      JSON.stringify(giftInfoData),
      JSON.stringify(ballWarData),        // user_data.ballWarData (legacy blob)
      JSON.stringify(expeditionData),
      '[]',                               // entrustData
      0,                                  // towerFloor
      karinTowerBattleTimes,              // towerTimes (from constant.json)
      0,                                  // towerBuyTimes
      0,                                  // towerClimbTimes
      '[]',                               // towerEvents
      0,                                  // arenaRank
      arenaAttackTimes,                   // arenaTimes (from constant.json)
      0,                                  // arenaBuyTimes
      0,                                  // arenaLastRefreshTime
      '{}',                               // arenaTeam
      1,                                  // online
      0,                                  // monthlyCardEndTime
      0,                                  // bigMonthlyCardEndTime
      0,                                  // lifelongCardEndTime
      0,                                  // monthlyCardDay
      0,                                  // bigMonthlyCardDay
      0,                                  // lifelongCardDay
      0,                                  // firstRechargeGot
      0,                                  // monthCardGot
      0,                                  // bigMonthCardGot
      0,                                  // lifelongCardGot
      JSON.stringify(hangupData),
      JSON.stringify(summonData),
      '{}',                               // heroSkinData
      '{}',                               // lastTeamData
      '{"_effects":[]}',                  // headEffectData
      JSON.stringify(trainingData),
      JSON.stringify(checkinData),
      JSON.stringify(monthCardData),
      JSON.stringify(rechargeData),
      '{}',                               // dragonEquipedData
      JSON.stringify(channelSpecialData),
      '{"_items":{}}',                    // timeMachineData
      '{}',                               // timeBonusInfoData
      JSON.stringify(timeTrialData),
      '{}',                               // expeditionModelData
      '{}',                               // shopNewHeroesData
      JSON.stringify(teamDungeonData),
      '{}',                               // teamDungeonTaskData
      '{}',                               // gemstoneData
      JSON.stringify(resonanceData),
      '{}',                               // userTopBattleData
      '{}',                               // topBattleInfoData
      JSON.stringify(littleGameData),
      JSON.stringify(gravityData),
      '',                                 // warInfoData
      '',                                 // userWarData
      JSON.stringify(userBallWarData),
      JSON.stringify(ballWarInfoData),
      '{}',                               // userGuildData
      '{}',                               // userGuildPubData
      '{"_teamInfo":{}}',                // fastTeamData
      '[]',                               // superSkillData
      '{}'                                // customSignData
    );

    // 2. Insert starting hero into hero_data
    db.prepare(`
      INSERT INTO hero_data (userId, displayId, level, quality, evolveLevel, star,
        skinId, activeSkill, qigongLevel, selfBreakLevel, selfBreakType,
        connectHeroId, position, power)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(userId, parseInt(startHero), startHeroLevel, 1, 0, 0,
      0, '{}', 0, 0, 0, 0, 0, 0);

    // 3. Insert mandatory items into item_data
    //    Item IDs: 101=diamond, 102=gold, 103=exp, 104=level, 105=vipExp, 106=vipLevel, 107=vipExpAll
    const insertItem = db.prepare(
      'INSERT INTO item_data (userId, itemId, num, displayId) VALUES (?, ?, ?, ?)'
    );
    insertItem.run(userId, 101, startDiamond, 0);  // diamond
    insertItem.run(userId, 102, startGold, 0);     // gold
    insertItem.run(userId, 103, 0, 0);             // exp (startUserExp=0)
    insertItem.run(userId, 104, startUserLevel, 0); // level
    insertItem.run(userId, 105, 0, 0);             // vipExp
    insertItem.run(userId, 106, 0, 0);             // vipLevel
    insertItem.run(userId, 107, 0, 0);             // vipExpAll

    // 4. Insert 8 dungeon types into dungeon_data
    const insertDungeon = db.prepare(
      'INSERT INTO dungeon_data (userId, dungeonType, level, sweepLevel, times, buyTimes) VALUES (?, ?, ?, ?, ?, ?)'
    );
    // Dungeon times from constant.json
    const expDungeonTimes = parseInt(constant.expDungeonTimes) || 2;
    const evolveDungeonTimes = parseInt(constant.evolveDungeonTimes) || 2;
    const energyDungeonTimes = parseInt(constant.energyDungeonTimes) || 2;
    const metalDungeonTimes = parseInt(constant.metalDungeonTimes) || 2;
    const zStoneDungeonTimes = parseInt(constant.zStoneDungeonTimes) || 2;
    const equipDungeonTimes = parseInt(constant.equipDungeonTimes) || 2;
    const signDungeonTimes = parseInt(constant.signDungeonTimes) || 2;

    // Types: 1=EXP, 2=EVOLVE, 3=ENERGY, 4=EQUIP, 5=SIGNA, 6=SIGNB, 7=METAL, 8=Z_STONE
    insertDungeon.run(userId, 1, 0, 0, expDungeonTimes, 0);
    insertDungeon.run(userId, 2, 0, 0, evolveDungeonTimes, 0);
    insertDungeon.run(userId, 3, 0, 0, energyDungeonTimes, 0);
    insertDungeon.run(userId, 4, 0, 0, equipDungeonTimes, 0);
    insertDungeon.run(userId, 5, 0, 0, signDungeonTimes, 0);
    insertDungeon.run(userId, 6, 0, 0, signDungeonTimes, 0);
    insertDungeon.run(userId, 7, 0, 0, metalDungeonTimes, 0);
    insertDungeon.run(userId, 8, 0, 0, zStoneDungeonTimes, 0);

    // 5. Insert tower_data row
    db.prepare(`
      INSERT INTO tower_data (userId, floor, times, buyTimes, climbTimes, events)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(userId, 0, karinTowerBattleTimes, 0, 0, '[]');

    // 6. Insert arena_data row
    db.prepare(`
      INSERT INTO arena_data (userId, rank, times, buyTimes, team, lastRefreshTime)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(userId, 0, arenaAttackTimes, 0, '{}', 0);

    // 7. Insert ball_war_data row
    db.prepare(`
      INSERT INTO ball_war_data (userId, state, signedUp, times, defence)
      VALUES (?, ?, ?, ?, ?)
    `).run(userId, 0, 0, dragonBallWarTimesMax, '{}');
  });

  doInsert();
  logger.log('INFO', 'DB', `Created complete user: ${userId}, hero: ${startHero} lv${startHeroLevel}, lesson: ${startLesson}`);

  return getUser(userId);
}

// ===========================================================================
// EXPORTS
// ===========================================================================

module.exports = {
  // Raw db instance for advanced use
  db,

  // ── User Operations ──
  getUser,
  getUserByToken,
  setUserOnline,
  updateUserFields,
  userExists,
  getOnlineCount,
  getOnlineUserIds,

  // ── Hero Operations ──
  getHeroes,
  getHeroById,
  createHero,
  updateHero,
  deleteHero,

  // ── Item Operations ──
  getItems,
  getItem,
  setItem,
  addItem,
  removeItem,
  createItems,

  // ── Equip Operations ──
  getEquips,
  createEquip,
  updateEquip,

  // ── Weapon Operations ──
  getWeapons,
  createWeapon,
  updateWeapon,

  // ── Imprint Operations ──
  getImprints,
  createImprint,
  updateImprint,

  // ── Genki Operations ──
  getGenkis,
  createGenki,
  updateGenki,

  // ── Gemstone Operations ──
  getGemstones,
  createGemstone,
  updateGemstone,

  // ── Super Skill Operations ──
  getSuperSkills,
  createSuperSkill,
  updateSuperSkill,

  // ── Resonance Operations ──
  getResonance,
  upsertResonanceSeat,

  // ── Guild Operations ──
  getGuild,
  getGuildByUser,
  getGuildMembers,
  createGuild,
  updateGuild,
  addGuildMember,
  removeGuildMember,

  // ── Friend Operations ──
  getFriends,
  getFriend,
  addFriend,
  removeFriend,
  updateFriend,
  getBlacklist,
  addBlacklist,
  removeBlacklist,

  // ── Arena Operations ──
  getArena,
  upsertArena,

  // ── Mail Operations ──
  getMails,
  getMail,
  createMail,
  updateMail,
  deleteMail,

  // ── Shop Operations ──
  getShopData,
  upsertShopData,

  // ── Dungeon Operations ──
  getDungeons,
  getDungeon,
  upsertDungeon,

  // ── Tower Operations ──
  getTower,
  upsertTower,

  // ── Ball War Operations ──
  getBallWar,
  upsertBallWar,

  // ── Battle Operations ──
  createBattle,
  getBattle,
  updateBattleStatus,
  updateBattle,
  deleteBattle,

  // ── Entrust Operations ──
  getEntrusts,
  createEntrust,
  updateEntrust,

  // ── Expedition Operations ──
  getExpeditions,
  createExpedition,
  updateExpedition,

  // ── Rank Operations ──
  getRankByType,
  getRank,
  upsertRank,

  // ── User Creation ──
  createCompleteUser,

  // ── Utility ──
  parseUserRow,
  serializeForDB,
  JSON_BLOB_COLUMNS
};
