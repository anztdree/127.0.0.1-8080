[DB] Loaded 3 records from /var/www/html/server/main-server/data/main_server.json (36983 bytes)
🟢 05:09:23 INFO  📋 CONFIG   ▸ serverOpenDate auto-initialized: 1779167363704

  ──────────────────── LOADING RESOURCES ────────────────────

🟢 05:09:23 INFO  📋 CONFIG   ▸ Resource loaded: constant.json
     ├─ entries: 1
     ├─ bytes: 17728
     └─ path: /var/www/html/resource/json/constant.json
🟢 05:09:23 INFO  📋 CONFIG   ▸ Resource loaded: hero.json
     ├─ entries: 887
     ├─ bytes: 1467869
     └─ path: /var/www/html/resource/json/hero.json
🟢 05:09:23 INFO  📋 CONFIG   ▸ Resource loaded: summon.json
     ├─ entries: 4
     ├─ bytes: 736
     └─ path: /var/www/html/resource/json/summon.json
🟢 05:09:23 INFO  📋 CONFIG   ▸ Resource loaded: heroLevelAttr.json
     ├─ entries: 360
     ├─ bytes: 32275
     └─ path: /var/www/html/resource/json/heroLevelAttr.json
🟢 05:09:23 INFO  📋 CONFIG   ▸ Resource loaded: heroTypeParam.json
     ├─ entries: 13
     ├─ bytes: 2241
     └─ path: /var/www/html/resource/json/heroTypeParam.json
🟢 05:09:23 INFO  📋 CONFIG   ▸ Resource loaded: heroQualityParam.json
     ├─ entries: 7
     ├─ bytes: 746
     └─ path: /var/www/html/resource/json/heroQualityParam.json
🟢 05:09:23 INFO  📋 CONFIG   ▸ Resource loaded: heroPower.json
     ├─ entries: 403
     ├─ bytes: 43864
     └─ path: /var/www/html/resource/json/heroPower.json
🟢 05:09:23 INFO  📋 CONFIG   ▸ Resource loaded: zPowerQualityPara.json
     ├─ entries: 7
     ├─ bytes: 484
     └─ path: /var/www/html/resource/json/zPowerQualityPara.json

══════════════════════════════════════════════════════════════════

══════════════════════════════════════════════════════════════════
  🎮 SUPER WARRIOR Z — MAIN SERVER
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
  🛡️  CONFIG AUDIT  4 issues at startup
══════════════════════════════════════════════════════════════════
     ❌ serverVersion
          📎 impact : Client displays no/wrong version info
          🔧 fix    : config.serverVersion = "2026-05-15"
     ⚠️ sdkUrl
          📎 impact : SDK-Server authentication will fail
          🔧 fix    : config.sdkUrl = "http://127.0.0.1:9999"
     ⚠️ chatUrl
          📎 impact : Chat won't work in production (hardcoded localhost)
          🔧 fix    : Use process.env.CHAT_URL or env config
     ⚠️ dungeonUrl
          📎 impact : Dungeon won't work in production (hardcoded localhost)
          🔧 fix    : Use process.env.DUNGEON_URL or env config
══════════════════════════════════════════════════════════════════

  │  Port             : 8001
  │  Socket.IO        : 2.5.1
  │  TEA              : ON (verification)
  │  DB               : /var/www/html/server/main-server/data/main_server.json
  │  SDK API          : http://127.0.0.1:9999
  │  server0Time      : 25200000
  │  serverOpenDate   : 1779167363704
  │  resourcePath     : /var/www/html/resource/json
  │  chatUrl          : http://127.0.0.1:8002
  │  dungeonUrl       : http://127.0.0.1:8003
  └─ LOG_LEVEL        : INFO

══════════════════════════════════════════════════════════════════


  ──────────────────── RESOURCE JSON STATUS ────────────────────

  │  constant.json            : 1 entries
  │  hero.json                : 887 entries
  │  summon.json              : 4 entries
  │  heroLevelAttr.json       : 360 entries
  │  heroTypeParam.json       : 13 entries
  │  heroQualityParam.json    : 7 entries
  │  zPowerQualityPara.json   : 7 entries
  └─ heroPower.json           : 403 entries

  ──────────────────── REGISTERED HANDLERS ────────────────────


  ├─ >> user::enterGame  handlers/user/enterGame.js
  ├─ >> user::registChat  handlers/user/registChat.js
  ├─ >> user::getBulletinBrief  handlers/user/getBulletinBrief.js
  ├─ >> user::readBulletin  handlers/user/readBulletin.js
  ├─ >> friend::friendServerAction  handlers/friend/friendServerAction.js
  ├─ >> heroImage::getAll  handlers/heroImage/getAll.js
  ├─ >> hero::getAttrs  handlers/hero/getAttrs.js
  ├─ >> hero::autoLevelUp  handlers/hero/autoLevelUp.js
  ├─ >> userMsg::getMsgList  handlers/userMsg/getMsgList.js
  ├─ >> userMsg::getMsg  handlers/userMsg/getMsg.js
  ├─ >> userMsg::sendMsg  handlers/userMsg/sendMsg.js
  ├─ >> userMsg::readMsg  handlers/userMsg/readMsg.js
  ├─ >> userMsg::delFriendMsg  handlers/userMsg/delFriendMsg.js
  ├─ >> guide::saveGuide  handlers/guide/saveGuide.js
  ├─ >> hangup::saveGuideTeam  handlers/hangup/saveGuideTeam.js
  ├─ >> hangup::checkBattleResult  handlers/hangup/checkBattleResult.js
  ├─ >> hangup::gain  handlers/hangup/gain.js
  ├─ >> activity::getActivityBrief  handlers/activity/getActivityBrief.js
  ├─ >> buryPoint::guideBattle  handlers/buryPoint/guideBattle.js
  ├─ >> summon::summonOneFree  handlers/summon/summonOneFree.js
  └─ >> equip::wearAuto  handlers/equip/wearAuto.js

     └─ total: 21

══════════════════════════════════════════════════════════════════


🟢 05:09:23 INFO  🚀 SERVER   ▸ Ready — listening on http://127.0.0.1:8001
🟢 05:09:23 INFO  🚀 SERVER   ▸ Waiting for Socket.IO connections...

══════════════════════════════════════════════════════════════════
  🔗⚡ Client connected  x1QrxxOrByPk...  📍 ::ffff:127.0.0.1  📡 polling
🟢 05:09:36 INFO  🔐 TEA      ▸ Sending verify challenge
     ├─ challenge: fce66c6e-4614-4c27-a0a7-643ecefc8bd3
     └─ socketId: x1QrxxOrByPkU0_j...
     ├─ socketId: x1QrxxOrByPkU0_j...
     ├─ from: polling
     └─ to: websocket
     ├─ type: string
     └─ length: 48
🟢 05:09:36 INFO  🔐 TEA      ▸ TEA verification SUCCESS
     ├─ socketId: x1QrxxOrByPkU0_j...
     ├─ duration: 2ms
     └─ transport: websocket
══════════════════════════════════════════════════════════════════
▼ [1] 👤 user::enterGame  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: user
     ├─ action ............: enterGame
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: 1
🟢 05:09:36 INFO  ⚔️ ENTER    ▸ enterGame REQUEST RECEIVED
     ├─ userId: guest_3d1ce6be74560df8
     ├─ serverId: 1
     ├─ loginToken: 80c75010cbd1b2b...
     └─ gameVersion: 2026-03-02143147
     🔄 [1/10] Required fields check .
     ✅ [1/10] Required fields check .All present
     🔄 [2/10] Token auth via SDK-Server .
🟢 05:09:36 INFO  📡 SDKAPI   ▸ User verified via SDK-Server
     ├─ userId: guest_3d1ce6be74560df8
     ├─ httpStatus: 200
     ├─ bodySize: 268 bytes
     └─ duration: 21ms
     ✅ [2/10] Token auth via SDK-Server .24ms ✅
     🔄 [3/10] ServerId validation .
     ✅ [3/10] ServerId validation .1 == 1 ✅
     🔄 [4/10] User existence check .
     🌟 [4/10] User existence check .NEW USER 🌟
     🔄 [5/10] Build user data ..
🟢 05:09:36 INFO  📋 CONFIG   ▸ Resource loaded: task.json
     ├─ entries: 44
     ├─ bytes: 22978
     └─ path: /var/www/html/resource/json/task.json
     ├─ constantKeys: 505
     ├─ heroEntries: 887
     ├─ summonPools: 4
     └─ taskEntries: 44
     ├─ startHero: 1205
     ├─ startHeroLevel: 3
     ├─ heroInstanceId: d0a67cfa-eb4...
     ├─ heroConfigFound: true
     └─ heroName: hero_name_15
     ├─ startDiamond: 0
     ├─ startGold: 0
     ├─ startUserExp: 0
     └─ startUserLevel: 1
     ├─ types: 1,2,4,5,6,7,8
     └─ values: 2,2,2,2,2,2,2
🟢 05:09:36 INFO  📋 CONFIG   ▸ Resource loaded: thingsID.json
     ├─ entries: 1636
     ├─ bytes: 884038
     └─ path: /var/www/html/resource/json/thingsID.json
     ├─ _heroId: d0a67cfa-eb4...
     ├─ _heroDisplayId: 1205
     ├─ _level: 3
     └─ _heroStar: 0
     ✅ [5/10] Build user data ..100 keys (45ms)
     🔄 [6/10] Circular reference check .
     ✅ [6/10] Circular reference check .0 circular refs ✅
     🔄 [7/10] Structure validation .

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 lastTeam[9]._team        = {0}  EMPTY — tutorial safe (guide 2106)
     ├─ 🔒 training._award          = null  present — FIX-001 safe
     ├─ 🔒 user._attribute._items[104] = present  Level=1
     ├─ 🔒 imprint._items           = Object{}  FIX-005: client L114925 uses for...in → needs Object
     ├─ 🔒 weapon._items            = Object{}  FIX-005: client L130938 uses for...in → needs Object
     └─ 🔒 genki._items             = Object{}  FIX-005: client L132158 uses for...in → needs Object
     ✅ CRITICAL AUDIT: 6/6 PASSED
     ✅ [7/10] Structure validation .100 keys audited
     🔄 [8/10] JSON serialization test .
     ✅ [8/10] JSON serialization test .OK (10,122 bytes)
     🔄 [9/10] Database save ....
[DB] saveUser("guest_3d1ce6..."): 100 keys, 10122 bytes
     ✅ [9/10] Database save ....4ms 💾
     🔄 [10/10] Response build ..
     ├─ original: 10122 chars
     ├─ compressed: 2401 chars
     ├─ reduction: 76%
     └─ threshold: 1024 chars
     ✅ [10/10] Response build ..OK 📤

     🏏️ SUMMARY
     👤 User ......... guest_3d1ce6be74560df8
     🦸 Heroes ........ 1
     🏆 Level ......... 1
     💎 Diamond ....... 0
     📦 Fields ........ 100
     ⏱️  Duration ..... 207ms
     📦 Data .......... 2,401 chars (LZ)


     📸 ENTER GAME ret=0
     ├─   user                         Object{20}
     ├─   heros                        Object{4}
     ├─   hangup                       Object{16}
     ├─   totalProps                   Object{1}
     ├─   backpackLevel                1
     ├─   imprint                      Object{2}
     ├─   weapon                       Object{2}
     ├─   summon                       Object{7}
     ├─   dungeon                      Object{2}
     ├─   equip                        Object{2}
     ├─   scheduleInfo                 Object{53}
     ├─   timesInfo                    Object{12}
     ├─   serverVersion                ""
     ├─   serverId                     1
     ├─   serverOpenDate               1779167363704
     ├─   newUser                      true
     ├─   currency                     "USD"
     ├─   lastTeam                     Object{2}
     ├─   superSkill                   Object{2}
     ├─   giftInfo                     Object{11}
     ├─   guide                        Object{2}
     ├─   userGuild                    Object{3}
     ├─   userGuildPub                 Object{8}
     ├─   expedition                   Object{7}
     ├─   retrieve                     Object{7}
     ├─   battleMedal                  Object{11}
     ├─   training                     Object{9}
     ├─   heroSkin                     Object{3}
     ├─   userWar                      Object{9}
     ├─   userBallWar                  Object{6}
     ├─   headEffect                   Object{4}
     ├─   userTopBattle                Object{10}
     ├─   topBattleInfo                Object{4}
     ├─   checkin                      Object{5}
     ├─   curMainTask                  Object{1}
     ├─   summonLog                    Array[0] ⚠️ EMPTY
     ├─   vipLog                       Array[0] ⚠️ EMPTY
     ├─   cardLog                      Array[0] ⚠️ EMPTY
     ├─   onlineBulletin               Array[0] ⚠️ EMPTY
     ├─   broadcastRecord              Array[0] ⚠️ EMPTY
     ├─   blacklist                    Object{0}
     ├─   forbiddenChat                Object{2}
     ├─   guildLevel                   0
     ├─   guildTreasureMatchRet        0
     ├─   dragonEquiped                Object{0}
     ├─   warInfo                      null ⚠️ NULL
     ├─   ballWarState                 0
     ├─   enableShowQQ                 false
     ├─   showQQVip                    0
     ├─   showQQ                       0
     ├─   showQQImg1                   ""
     ├─   showQQImg2                   ""
     ├─   showQQUrl                    ""
     ├─   cellgameHaveSetHero          false
     ├─   globalWarBuffTag             ""
     ├─   globalWarLastRank            Object{0}
     ├─   globalWarBuff                0
     ├─   globalWarBuffEndTime         0
     ├─   guildName                    ""
     ├─   guildActivePoints            Object{0}
     ├─   ballBroadcast                null ⚠️ NULL
     ├─   ballWarInfo                  Object{4}
     ├─   teamTraining                 Object{4}
     ├─   teamServerHttpUrl            ""
     ├─   teamDungeonOpenTime          0
     ├─   teamDungeonTask              Object{3}
     ├─   teamDungeonSplBcst           null ⚠️ NULL
     ├─   teamDungeonNormBcst          null ⚠️ NULL
     ├─   teamDungeonHideInfo          null ⚠️ NULL
     ├─   teamDungeon                  Object{3}
     ├─   teamDungeonInvitedFriends    null ⚠️ NULL
     ├─   myTeamServerSocketUrl        "http://127.0.0.1:8003"
     ├─   shopNewHeroes                Object{0}
     ├─   channelSpecial               Object{15}
     ├─   hideHeroes                   Array[0] ⚠️ EMPTY
     ├─   templeLess                   0
     ├─   timeTrial                    Object{9}
     ├─   timeTrialNextOpenTime        0
     ├─   YouTuberRecruit              Object{7}
     ├─   userYouTuberRecruit          Object{2}
     ├─   heroImageVersion             0
     ├─   superImageVersion            0
     ├─   karinStartTime               0
     ├─   karinEndTime                 0
     ├─   timeBonusInfo                Object{2}
     ├─   monthCard                    Object{2}
     ├─   recharge                     Object{2}
     ├─   userDownloadReward           Object{4}
     ├─   clickSystem                  Object{2}
     ├─   questionnaires               null ⚠️ NULL
     ├─   littleGame                   Object{3}
     ├─   genki                        Object{4}
     ├─   gemstone                     Object{1}
     ├─   resonance                    Object{6}
     ├─   fastTeam                     Object{1}
     ├─   gravity                      Object{0}
     ├─   timeMachine                  Object{1}
     ├─   _arenaTeam                   Object{0}
     ├─   _arenaSuper                  Array[0] ⚠️ EMPTY
     └─   mergedServers                Array[0] ⚠️ EMPTY

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2,401 chars (LZ)

     ⏱️  TIMING
     └─ Total .............: 216ms  ████████████████████
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [2] 👤 user::getBulletinBrief  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: user
     ├─ action ............: getBulletinBrief
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/2] Validate request fields .
     └─ userId: guest_3d1ce6be74560d
     ✅ [1/2] Validate request fields .userId OK
     🔄 [1/1] Load global bulletin data .
     ├─ source: ctx.db.getGlobal("bulletinBrief")
     └─ entryCount: 0
     ✅ [1/1] Load global bulletin data .0 entries loaded
     🔄 [1/1] Type assert request fields .
     ✅ [1/1] Type assert request fields .type verified
     🔄 [1/1] Snapshot bulletin state .
     ├─ bulletinCount: 0
     └─ bulletinIds: (empty)
     ✅ [1/1] Snapshot bulletin state .0 bulletins in global store
     🔄 [1/2] Validate business rules .
     ✅ [1/2] Validate business rules .invariants checked
     🔄 [1/1] Build _brief object (strip body field) .
     ✅ [1/1] Build _brief object (strip body field) .0 bulletins (body stripped)
     ├─ status: read-only, no mutations
     └─ reason: bulletin data is global — only read and returned
     ├─ status: no DB save (read-only handler)
     └─ reason: bulletin brief is global data — no user data changes

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     └─ 🔒 _brief                   = Object{0}  L121094: for(var o in n._brief) iterates each bulletin
     ✅ CRITICAL AUDIT: 1/1 PASSED

     📸 getBulletinBrief ret=0
     └─   _brief                       Object{0}

     🏏️ SUMMARY
     👤 User ......... guest_3d1ce6be74560df8
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 13 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 6ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [3] 🤝 friend::friendServerAction  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: friend
     ├─ action ............: friendServerAction
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/2] Route relay action .
     ├─ userId: guest_3d1ce6be74560d
     ├─ relayAction: queryFriends
     └─ extraFields: (none)
     ✅ [1/2] Route relay action .relayAction="${relayAction}"
     🔄 [2/2] Handle queryFriends .
     ✅ [2/2] Handle queryFriends .0 friends

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 12 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 8ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [4] 🤝 friend::friendServerAction  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: friend
     ├─ action ............: friendServerAction
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/2] Route relay action .
     ├─ userId: guest_3d1ce6be74560d
     ├─ relayAction: queryBlackList
     └─ extraFields: (none)
     ✅ [1/2] Route relay action .relayAction="${relayAction}"
     🔄 [2/2] Handle queryBlackList .
     ✅ [2/2] Handle queryBlackList .0 entries

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 12 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 7ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [5] 🖼️ heroImage::getAll  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: heroImage
     ├─ action ............: getAll
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/2] Validate request fields .
     └─ userId: guest_3d1ce6be74560d
     ✅ [1/2] Validate request fields .userId OK
     🔄 [1/1] Load userData from DB .
     ├─ heros: exists
     └─ heros._heros: exists
     ✅ [1/1] Load userData from DB .userData loaded
     🔄 [1/1] Type assert request fields .
     ✅ [1/1] Type assert request fields .type verified
     🔄 [1/1] Snapshot hero collection state .
     ├─ heroCount: 1
     └─ heroIds: d0a67cfa-eb4e-4db3-876d-f0e601af1e5f
     ✅ [1/1] Snapshot hero collection state .1 heroes in collection
     🔄 [1/2] Validate business rules .
     ✅ [1/2] Validate business rules .invariants checked
     🔄 [1/1] Build hero image data .
     ✅ [1/1] Build hero image data .1 hero(es)
     ├─ status: read-only, no mutations
     └─ reason: hero image data is derived from userData.heros — no writes
     ├─ status: no DB save (read-only handler)
     └─ reason: hero image list is a read-only view of hero collection

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     └─ 🔒 _heros                   = Object{1}  L134363: for(var n in e._heros) → Object, each has _id/_maxLevel/_selfComments
     ✅ CRITICAL AUDIT: 1/1 PASSED

     📸 getAll ret=0
     └─   _heros                       Object{1}

     🏏️ SUMMARY
     👤 User ......... guest_3d1ce6be74560df8
     📦 Fields ........ 1
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 97 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 4ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [6] 🦸 hero::getAttrs  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hero
     ├─ action ............: getAttrs
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/2] Validate request fields .
     ├─ userId: guest_3d1ce6be74560d
     └─ heros: d0a67cfa-eb4e-4db3-876d-f0e601af1e5f
     ✅ [1/2] Validate request fields .1 hero(es) requested
     🔄 [1/1] Load userData from DB .
     └─ heros._heros: 1 heroes
     ✅ [1/1] Load userData from DB .userData loaded
     🔄 [1/2] Type assert request fields .
     ✅ [1/2] Type assert request fields .types verified
     🔄 [1/1] Snapshot hero request vs found .
     ├─ requested: 1 heroes: d0a67cfa-eb4e-4db3-876d-f0e601af1e5f
     ├─ found: 1 heroes: d0a67cfa-eb4e-4db3-876d-f0e601af1e5f
     └─ missing: 0 heroes: (none)
     ✅ [1/1] Snapshot hero request vs found .1/1 heroes found
     🔄 [1/1] Validate hero availability .
     ✅ [1/1] Validate hero availability .all heroes found
     🔄 [1/1] Calculate hero attributes .
     ├─ heroId: d0a67cfa-eb4e-4db3-876d-f0e601af1e5f
     ├─ displayId: 1205
     └─ level: 3
     ├─ heroType: critical
     ├─ weightedSum: 2312.0
     └─ power: 2312
     ├─ hp: 1260
     ├─ attack: 462
     ├─ armor: 214
     └─ power: 2312
     ✅ [1/1] Calculate hero attributes .1 heroes calculated
     ├─ status: read-only, no mutations
     └─ reason: hero attributes are calculated from config — no userData writes
     ├─ status: no DB save (read-only handler)
     └─ reason: attribute calculation is a read-only operation

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 _attrs                   = Object{1}  L133726: for(var o in t._attrs) — keyed by hero index, each has _items with calculated attrs
     ├─ 🔒 _baseAttrs               = Object{1}  L133731: t._baseAttrs[o] — keyed by hero index, each has _items with base attrs (before talent)
     └─ 🔒 POWER (attr 21)          = calculated per hero  L133821: 21==p._id → heroBaseAttr.power = floor(num)
     ✅ CRITICAL AUDIT: 3/3 PASSED

     📸 getAttrs ret=0
     ├─   _attrs                       Object{1}
     └─   _baseAttrs                   Object{1}

     🏏️ SUMMARY
     👤 User ......... guest_3d1ce6be74560df8
     📦 Fields ........ 2
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 394 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 12ms  █
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [7] 💬 userMsg::getMsgList  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: userMsg
     ├─ action ............: getMsgList
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/2] Validate request fields .
     └─ userId: guest_3d1ce6be74560d
     ✅ [1/2] Validate request fields .userId OK
     🔄 [1/1] Load userData from DB .
     └─ userMsgBrief: 0 entries
     ✅ [1/1] Load userData from DB .userData loaded
     🔄 [1/1] Type assert request fields .
     ✅ [1/1] Type assert request fields .type verified
     🔄 [1/1] Snapshot message brief state .
     ├─ entryCount: 0
     └─ keys: (empty)
     ✅ [1/1] Snapshot message brief state .0 message entries
     🔄 [1/1] Validate data integrity .
     ✅ [1/1] Validate data integrity .valid object
     🔄 [1/1] Return storedBrief directly .
     ✅ [1/1] Return storedBrief directly .0 entries returned as-is
     ├─ status: read-only, no mutations
     └─ reason: message list is returned directly from userData.userMsgBrief
     ├─ status: no DB save (read-only handler)
     └─ reason: getMsgList only reads stored message brief — no writes

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     └─ 🔒 _brief                   = Object{0}  L121134: setMessageFriendSimpleList iterates e[n].userInfo → UserSimpleInfo.deserialize
     ✅ CRITICAL AUDIT: 1/1 PASSED

     📸 getMsgList ret=0
     └─   _brief                       Object{0}

     🏏️ SUMMARY
     👤 User ......... guest_3d1ce6be74560df8
     📦 Fields ........ 1
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 13 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 3ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [8] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_3d1ce6be74560d
     ├─ guideType: 2
     └─ step: 2102
     ✅ [1/3] Validate request fields .type=2 step=2102
     🔄 [1/1] Load userData from DB .
     ✅ [1/1] Load userData from DB .userData loaded
     🔄 [1/2] Type assert request fields .
     ✅ [1/2] Type assert request fields .all types verified
     🔄 [1/1] Snapshot guide._steps before modification .
     ├─ guideType: 2
     ├─ currentStep: (none)
     └─ allSteps: {}
     ✅ [1/1] Snapshot guide._steps before modification .guide._steps[2] was (none)
     🔄 [1/2] Validate business rules .
     ✅ [1/2] Validate business rules .invariants checked
     🔄 [1/1] Update guide._steps .
     ✅ [1/1] Update guide._steps .guide._steps[2] = 2102
     └─ guide._steps[2]: (none) step → 2102 step (NaN step) [SAVE-GUIDE]
[DB] saveUser("guest_3d1ce6..."): 100 keys, 10130 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_3d1ce6be74560df8
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 17ms  █
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [9] 👤 user::registChat  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: user
     ├─ action ............: registChat
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
🟢 05:09:41 INFO  ⚪ REGIST_CHAT ▸ registChat REQUEST RECEIVED
     ├─ userId: guest_3d1ce6be74560d
     └─ version: 1.0
🟢 05:09:41 INFO  ⚪ REGIST_CHAT ▸ Entry check PASS — userId=guest_3d1ce6be74...
🟢 05:09:41 INFO  ⚪ REGIST_CHAT ▸ Loading config for chat registration
     ├─ chatUrl: http://127.0.0.1:8002
     ├─ serverId: 1
     └─ source: DEFAULT (chatUrl not set)
🟢 05:09:41 INFO  ⚪ REGIST_CHAT ▸ Config loaded — chatUrl and serverId resolved
🟢 05:09:41 INFO  ⚪ REGIST_CHAT ▸ Loading player state for guild/room context
     ├─ userData: LOADED (100 top keys)
     ├─ guild: NO
     └─ guildRoomId: undefined (by design — updated dynamically by guild handler L114204)
🟢 05:09:41 INFO  ⚪ REGIST_CHAT ▸ Building chat registration response (6 fields)
     ├─ worldRoomId: world_1 (L114566 — ALWAYS joined)
     ├─ guildRoomId: undefined (L114568 — undefined = skip)
     ├─ teamDungeonChatRoom: undefined (L114579 — undefined = skip)
     └─ teamChatRoom: undefined (L114590 — undefined = skip)
     ├─ consumer: L114470 — 6 fields read from callback(n)
     ├─ next-step: L114480: io.connect(chatServerUrl) → TEA verify required
     ├─ post-login: L114550: chat::login → joinRoom(world, guild?, team?, dungeon?)
     └─ dynamic-update: guild L114207 | teamDungeon L136514 | team L136531
🟢 05:09:41 INFO  ⚪ REGIST_CHAT ▸ Response fields built — 6 fields total
🟢 05:09:41 INFO  ⚪ REGIST_CHAT ▸ No data mutations (configuration handler)
     ├─ type: NONE — registChat is a read-only configuration handler
     ├─ reason: Only returns chat URL and room IDs — no user data modified
     └─ trace: L114462-114470: client reads response fields, does not write back
🟢 05:09:41 INFO  ⚪ REGIST_CHAT ▸ No DB save required (configuration handler)
     ├─ action: SKIP — no mutations to persist
     ├─ reason: registChat returns configuration data only — no user state changes
     └─ dbWrite: NONE

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 _success                 = true  L114470: n._success ? connect chat : retry every 3s (max 15)
     ├─ 🔒 _chatServerUrl           = http://127.0.0.1:8002  L114480→L82537: io.connect(url) — MUST be full URL
     ├─ 🔒 _worldRoomId             = world_1  L114566: chatJoinRequest(worldRoomId) — ALWAYS joined after login
     ├─ 🔒 _guildRoomId             = (undefined)  L114568: if(guildRoomId) join — undefined = skip (no guild)
     ├─ 🔒 _teamDungeonChatRoom     = (undefined)  L114579: if(teamDungeonChatRoom) join — undefined = skip
     └─ 🔒 _teamChatRoom            = (undefined)  L114590: if(teamChatRoomId) join — undefined = skip (no team)
     ✅ CRITICAL AUDIT: 6/6 PASSED

     📸 registChat ret=0
     ├─   _success                     true
     ├─   _chatServerUrl               "http://127.0.0.1:8002"
     └─   _worldRoomId                 "world_1"

     ⚠️ WARNINGS DETECTED
     ⚠️  [WARN-001] chat-server must be running on http://127.0.0.1:8002
          Expected: (server operational)
          Got:      may fail if chat-server down
          Impact:   Chat will never connect. Client stops retrying registChat after 15 attempts (45s).
          Fix:      Ensure chat-server is started before main-server

     ⚠️  [WARN-002] chat-server MUST implement TEA handshake (verifyEnable=true)
          Expected: (TEA verify event emitted by chat-server)
          Got:      L113445: chatClient verifyEnable=TRUE → waits for verify event
          Impact:   Client connection stalls — callback never fires, no chat, no error shown.
          Fix:      chat-server must emit "verify" event with TEA challenge on connect

     ⚠️  [WARN-003] guildRoomId, teamDungeonChatRoom, teamChatRoom = undefined (by design)
          Expected: (undefined for new/no-guild/no-team users)
          Got:      Returning undefined — client L114568/114579/114590 checks truthy before join
          Impact:   None — client correctly skips joining these rooms when undefined.
          Fix:      N/A — this is correct behavior. Guild handler (L114204) updates guildRoomId dynamically.
     ⚠️ TOTAL WARNINGS: 3


     🏏️ SUMMARY
     👤 User ......... guest_3d1ce6be74560df8
     📦 Fields ........ 6
     ⏱️  Duration ..... 2ms
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 83 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 6ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [10] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_3d1ce6be74560d
     ├─ guideType: 2
     └─ step: 2107
     ✅ [1/3] Validate request fields .type=2 step=2107
     🔄 [1/1] Load userData from DB .
     ✅ [1/1] Load userData from DB .userData loaded
     🔄 [1/2] Type assert request fields .
     ✅ [1/2] Type assert request fields .all types verified
     🔄 [1/1] Snapshot guide._steps before modification .
     ├─ guideType: 2
     ├─ currentStep: 2102
     └─ allSteps: {"2":2102}
     ✅ [1/1] Snapshot guide._steps before modification .guide._steps[2] was 2102
     🔄 [1/2] Validate business rules .
     ✅ [1/2] Validate business rules .invariants checked
     🔄 [1/1] Update guide._steps .
     ✅ [1/1] Update guide._steps .guide._steps[2] = 2107
     └─ guide._steps[2]: 2102 step → 2107 step (+5 step) [SAVE-GUIDE]
[DB] saveUser("guest_3d1ce6..."): 100 keys, 10130 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_3d1ce6be74560df8
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 7ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [11] ⏳ hangup::saveGuideTeam  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hangup
     ├─ action ............: saveGuideTeam
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/2] Save guide team ...
     ├─ userId: guest_3d1ce6be74560d
     ├─ team: 5 hero(es)
     └─ supers: 1120561
     ✅ [1/2] Save guide team ...team=5 heroes
     🔄 [2/2] Persist team data .
[DB] saveUser("guest_3d1ce6..."): 101 keys, 10245 bytes
     ✅ [2/2] Persist team data .saved to DB

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 4ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [12] ⏳ hangup::checkBattleResult  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hangup
     ├─ action ............: checkBattleResult
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/10] Validate request .
     ├─ userId: guest_3d1ce6be74560d
     ├─ isGuide: true
     ├─ battleId: (none)
     ├─ checkResult: (none)
     ├─ runaway: (none)
     └─ super: (none)
     ✅ [1/10] Validate request .
     🔄 [2/10] Load data ........
🟢 05:09:44 INFO  📋 CONFIG   ▸ Resource loaded: lesson.json
     ├─ entries: 611
     ├─ bytes: 833203
     └─ path: /var/www/html/resource/json/lesson.json
     ✅ [2/10] Load data ........lesson.json=611 entries
     🔄 [3/10] Read progress ....
     ├─ curLess: 10101
     ├─ maxPassLesson: 0
     ├─ maxPassChapter: 0
     └─ source: user.hangup
     ✅ [3/10] Read progress ....lesson=10101
     🔄 [4/10] Determine outcome .
     ├─ mode: TUTORIAL (forced win)
     └─ isGuide: true
     ✅ [4/10] Determine outcome .WIN (0)
     🔄 [5/10] Build response ...
     ├─ lesson: 10101
     ├─ lessonName: lesson_name_1
     ├─ lessonType: 1
     ├─ thisChapter: 801
     └─ nextID: 10102
     └─ #1: item=103 qty=+20 old=0 new=20
     └─ #2: item=102 qty=+1000 old=0 new=1000
     └─ #3: item=3001 qty=+3 old=0 new=3
     └─ #4: item=3002 qty=+3 old=0 new=3
     └─ #5: item=101 qty=+20 old=0 new=20
     └─ totalProps._items[102] (GOLD): 0 gold → 1000 gold (+1000 gold) [BATTLE-REWARD]
     └─ totalProps._items[101] (DIAMOND): 0 diamond → 20 diamond (+20 diamond) [BATTLE-REWARD]
     └─ totalProps._items[103] (EXP): 0 exp → 20 exp (+20 exp) [BATTLE-REWARD]
     ├─ curLess: 10102
     ├─ maxPassLesson: 10101
     ├─ maxPassChapter: 801
     ├─ nextLessonId: 10102
     └─ source: lesson.json nextID/thisChapter
     ✅ [5/10] Build response ...WIN rewards=5 lesson=10102
     └─ hangup._curLess: 10101 → 10102 (+1) [BATTLE-PROGRESSION]
     └─ hangup._maxPassLesson: 0 → 10101 (+10101) [BATTLE-PROGRESSION]
     └─ hangup._maxPassChapter: 0 → 801 (+801) [BATTLE-PROGRESSION]
[DB] saveUser("guest_3d1ce6..."): 101 keys, 10319 bytes

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 _battleResult            = 0  L104882: 0 == e._battleResult -> true (tutorial forced win)
     ├─ 🔒 _changeInfo._items       = 5 items  L97686: getBattleAwardItems iterates _changeInfo._items for {_id, _num}
     ├─ 🔒 _curLess                 = 10102  L104892/L97751: OnHookSingleton.lastSection = e._curLess
     └─ 🔒 _maxPassLesson           = 10101  L104893/L97751: OnHookSingleton.maxPassLesson = e._maxPassLesson
     ✅ CRITICAL AUDIT: 4/4 PASSED

     🏏️ SUMMARY
     👤 User ......... guest_3d1ce6be74560df8
     📦 Fields ........ 4
     📦 Data .......... 0 chars (RAW)


     📸 CHECK BATTLE RESULT ret=0
     ├─   _battleResult                0
     ├─   _curLess                     10102
     ├─   _maxPassLesson               10101
     └─   _changeInfo                  Object{1}

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 218 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 27ms  ██
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [13] 📋 buryPoint::guideBattle  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: buryPoint
     ├─ action ............: guideBattle
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
🟢 05:09:46 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received
     ├─ userId: guest_3d1ce6be74560d
     ├─ point: load
     ├─ passLesson: 10101
     └─ version: 1.0
[DB] saveUser("guest_3d1ce6..."): 102 keys, 10427 bytes

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 8ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
  📊 IDLE SUMMARY — 10s no activity — x1QrxxOrByPk
══════════════════════════════════════════════════════════════════
  📊 Calls: 13  ✅ 13 OK  ⚡ 25.0ms avg  📦 3,251 chars
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [14] 📋 buryPoint::guideBattle  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: buryPoint
     ├─ action ............: guideBattle
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
🟢 05:09:57 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received
     ├─ userId: guest_3d1ce6be74560d
     ├─ point: battle
     ├─ passLesson: 10101
     └─ version: 1.0
[DB] saveUser("guest_3d1ce6..."): 102 keys, 10506 bytes

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 4ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [15] 📋 buryPoint::guideBattle  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: buryPoint
     ├─ action ............: guideBattle
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
🟢 05:09:57 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received
     ├─ userId: guest_3d1ce6be74560d
     ├─ point: home
     ├─ passLesson: 10101
     └─ version: 1.0
[DB] saveUser("guest_3d1ce6..."): 102 keys, 10583 bytes

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 4ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [16] 🏆 activity::getActivityBrief  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: activity
     ├─ action ............: getActivityBrief
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request ..
     └─ userId: guest_3d1ce6be74560d...
     ✅ [1/3] Validate request ..
     🔄 [2/3] Load user data ....
     ✅ [2/3] Load user data ....
     ├─ userLevel: 1
     ├─ userCreateTime: 2026-05-19T05:09:36.277Z
     ├─ userAgeDays: 0.0 days
     ├─ serverOpenDate: 2026-05-19T05:09:23.704Z
     ├─ serverAgeDays: 0.0 days
     └─ dayOfWeek(UTC+7): 2 (Weekday)
     🔄 [3/3] Generate activity list .
     ├─ name: Hero Value Pack
     ├─ actType: 5037
     ├─ actCycle: 2
     ├─ displayIndex: 0
     └─ showRed: true
     ├─ name: New Server Discount Pack
     ├─ actType: 2003
     ├─ actCycle: 2
     ├─ displayIndex: 2
     └─ showRed: true
     ├─ name: Discount Today
     ├─ actType: 5003
     ├─ actCycle: 2
     ├─ displayIndex: 3
     └─ showRed: true
     ├─ name: Cumulative Top-up Gift
     ├─ actType: 2004
     ├─ actCycle: 2
     ├─ displayIndex: 4
     └─ showRed: true
     ├─ name: Daily accumulated top-up
     ├─ actType: 2007
     ├─ actCycle: 2
     ├─ displayIndex: 6
     └─ showRed: true
     ├─ name: Growth Quest
     ├─ actType: 1002
     ├─ actCycle: 1
     ├─ displayIndex: 7
     └─ showRed: true
     ├─ name: Hero Grand Kickback
     ├─ actType: 2001
     ├─ actCycle: 1
     ├─ displayIndex: 8
     └─ showRed: true
     ├─ name: Orange Hero Assembly
     ├─ actType: 2002
     ├─ actCycle: 1
     ├─ displayIndex: 9
     └─ showRed: true
     ├─ name: 7-Day Top-up At Will
     ├─ actType: 1003
     ├─ actCycle: 1
     ├─ displayIndex: 85
     └─ showRed: true
     ├─ name: Temple Contest
     ├─ actType: 4003
     ├─ actCycle: 4
     ├─ displayIndex: 9
     └─ showRed: true
     ├─ name: Ignition Illustration
     ├─ actType: 4001
     ├─ actCycle: 4
     ├─ displayIndex: 10
     └─ showRed: true
     ├─ name: Event Sign-in
     ├─ actType: 1001
     ├─ actCycle: 8
     ├─ displayIndex: 9999
     └─ showRed: false
     ✅ [3/3] Generate activity list .
     ├─ catalog: 12
     ├─ activated: 12
     └─ returned: 12
     ├─ count: 4
     ├─ homeIcon: zhujiemiannew87_png
     └─ sort: 79
     ├─ count: 5
     ├─ homeIcon: zhujiemiannew88_png
     └─ sort: 69
     ├─ count: 2
     ├─ homeIcon: zhujiemiannew101_png
     └─ sort: 89
     ├─ count: 1
     ├─ homeIcon: zhujiemiannew125_png
     └─ sort: 99

     📸 ACTIVITY BRIEF ret=0
     ├─   type                         "activity"
     ├─   action                       "getActivityBrief"
     ├─   userId                       "guest_3d1ce6be74560df8"
     ├─   version                      "1.0"
     └─   _acts                        Object{12}
     ├─ original: 2576 chars
     ├─ compressed: 777 chars
     ├─ reduction: 70%
     └─ threshold: 1024 chars

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 777 chars (LZ)

     ⏱️  TIMING
     └─ Total .............: 18ms  █
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [17] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_3d1ce6be74560d
     ├─ guideType: 2
     └─ step: 2206
     ✅ [1/3] Validate request fields .type=2 step=2206
     🔄 [1/1] Load userData from DB .
     ✅ [1/1] Load userData from DB .userData loaded
     🔄 [1/2] Type assert request fields .
     ✅ [1/2] Type assert request fields .all types verified
     🔄 [1/1] Snapshot guide._steps before modification .
     ├─ guideType: 2
     ├─ currentStep: 2107
     └─ allSteps: {"2":2107}
     ✅ [1/1] Snapshot guide._steps before modification .guide._steps[2] was 2107
     🔄 [1/2] Validate business rules .
     ✅ [1/2] Validate business rules .invariants checked
     🔄 [1/1] Update guide._steps .
     ✅ [1/1] Update guide._steps .guide._steps[2] = 2206
     └─ guide._steps[2]: 2107 step → 2206 step (+99 step) [SAVE-GUIDE]
[DB] saveUser("guest_3d1ce6..."): 102 keys, 10583 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_3d1ce6be74560df8
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 7ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [18] ✨ summon::summonOneFree  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: summon
     ├─ action ............: summonOneFree
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
🟢 05:10:01 INFO  ⚪ SUMMON-FREE ▸ summonOneFree REQUEST RECEIVED
     ├─ userId: guest_3d1ce6be74560df8
     ├─ sType: 3
     └─ isGuide: true
🟢 05:10:01 INFO  📋 CONFIG   ▸ Resource loaded: summonPool.json
     ├─ entries: 200
     ├─ bytes: 75170
     └─ path: /var/www/html/resource/json/summonPool.json
🟢 05:10:01 INFO  📋 CONFIG   ▸ Resource loaded: summonRandom.json
     ├─ entries: 10
     ├─ bytes: 2157
     └─ path: /var/www/html/resource/json/summonRandom.json
     ├─ poolId: 1
     ├─ poolType: summonSuper
     ├─ freeTimer: 86400s
     └─ summonEnergyGain: 10
🟢 05:10:01 INFO  ⚪ SUMMON-FREE ▸ Free timer OK — proceeding with summon
🟢 05:10:01 INFO  ⚪ SUMMON-FREE ▸ [GUIDE] Predetermined hero: displayId=1309 quality=purple
     ├─ heroInstanceId: ca10e6ca-e3c...
     ├─ displayId: 1309
     ├─ heroName: hero_name_31
     ├─ quality: purple
     ├─ heroColor: 4
     └─ heroType: body
     ├─ oldEnergy: 0
     ├─ newEnergy: 10
     ├─ energyGained: 10
     ├─ freeTimeField: _canSuperFreeTime
     ├─ newFreeTime: 2026-05-20T05:10:01.280Z
     ├─ summonTimes[1]: 1
     └─ totalHeroes: 2
[DB] saveUser("guest_3d1ce6..."): 102 keys, 11274 bytes
🟢 05:10:01 INFO  ⚪ SUMMON-FREE ▸ User data SAVED
🟢 05:10:01 INFO  ⚪ SUMMON-FREE ▸ summonOneFree SUCCESS

     🏏️ SUMMARY
     👤 User ......... guest_3d1ce6be74560df8
     📦 Fields ........ [object Object]
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 767 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 11ms  █
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [19] 🦸 hero::getAttrs  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hero
     ├─ action ............: getAttrs
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/2] Validate request fields .
     ├─ userId: guest_3d1ce6be74560d
     └─ heros: ca10e6ca-e3cf-46f1-98b9-0c000082383d
     ✅ [1/2] Validate request fields .1 hero(es) requested
     🔄 [1/1] Load userData from DB .
     └─ heros._heros: 2 heroes
     ✅ [1/1] Load userData from DB .userData loaded
     🔄 [1/2] Type assert request fields .
     ✅ [1/2] Type assert request fields .types verified
     🔄 [1/1] Snapshot hero request vs found .
     ├─ requested: 1 heroes: ca10e6ca-e3cf-46f1-98b9-0c000082383d
     ├─ found: 1 heroes: ca10e6ca-e3cf-46f1-98b9-0c000082383d
     └─ missing: 0 heroes: (none)
     ✅ [1/1] Snapshot hero request vs found .1/1 heroes found
     🔄 [1/1] Validate hero availability .
     ✅ [1/1] Validate hero availability .all heroes found
     🔄 [1/1] Calculate hero attributes .
     ├─ heroId: ca10e6ca-e3cf-46f1-98b9-0c000082383d
     ├─ displayId: 1309
     └─ level: 1
     ├─ heroType: body
     ├─ weightedSum: 3760.0
     └─ power: 3760
     ├─ hp: 3136
     ├─ attack: 93
     ├─ armor: 153
     └─ power: 3760
     ✅ [1/1] Calculate hero attributes .1 heroes calculated
     ├─ status: read-only, no mutations
     └─ reason: hero attributes are calculated from config — no userData writes
     ├─ status: no DB save (read-only handler)
     └─ reason: attribute calculation is a read-only operation

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 _attrs                   = Object{1}  L133726: for(var o in t._attrs) — keyed by hero index, each has _items with calculated attrs
     ├─ 🔒 _baseAttrs               = Object{1}  L133731: t._baseAttrs[o] — keyed by hero index, each has _items with base attrs (before talent)
     └─ 🔒 POWER (attr 21)          = calculated per hero  L133821: 21==p._id → heroBaseAttr.power = floor(num)
     ✅ CRITICAL AUDIT: 3/3 PASSED

     📸 getAttrs ret=0
     ├─   _attrs                       Object{1}
     └─   _baseAttrs                   Object{1}

     🏏️ SUMMARY
     👤 User ......... guest_3d1ce6be74560df8
     📦 Fields ........ 2
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 392 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 3ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [20] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_3d1ce6be74560d
     ├─ guideType: 2
     └─ step: 2210
     ✅ [1/3] Validate request fields .type=2 step=2210
     🔄 [1/1] Load userData from DB .
     ✅ [1/1] Load userData from DB .userData loaded
     🔄 [1/2] Type assert request fields .
     ✅ [1/2] Type assert request fields .all types verified
     🔄 [1/1] Snapshot guide._steps before modification .
     ├─ guideType: 2
     ├─ currentStep: 2206
     └─ allSteps: {"2":2206}
     ✅ [1/1] Snapshot guide._steps before modification .guide._steps[2] was 2206
     🔄 [1/2] Validate business rules .
     ✅ [1/2] Validate business rules .invariants checked
     🔄 [1/1] Update guide._steps .
     ✅ [1/1] Update guide._steps .guide._steps[2] = 2210
     └─ guide._steps[2]: 2206 step → 2210 step (+4 step) [SAVE-GUIDE]
[DB] saveUser("guest_3d1ce6..."): 102 keys, 11274 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_3d1ce6be74560df8
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 6ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [21] ✨ summon::summonOneFree  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: summon
     ├─ action ............: summonOneFree
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
🟢 05:10:05 INFO  ⚪ SUMMON-FREE ▸ summonOneFree REQUEST RECEIVED
     ├─ userId: guest_3d1ce6be74560df8
     ├─ sType: 1
     └─ isGuide: true
     ├─ poolId: 3
     ├─ poolType: summonNormal
     ├─ freeTimer: 21600s
     └─ summonEnergyGain: 0
🟢 05:10:05 INFO  ⚪ SUMMON-FREE ▸ Free timer OK — proceeding with summon
🟢 05:10:05 INFO  ⚪ SUMMON-FREE ▸ [GUIDE] Predetermined hero: displayId=1206 quality=blue
     ├─ heroInstanceId: 906d1360-c60...
     ├─ displayId: 1206
     ├─ heroName: hero_name_17
     ├─ quality: blue
     ├─ heroColor: 3
     └─ heroType: skill
     ├─ oldEnergy: 10
     ├─ newEnergy: 10
     ├─ energyGained: 0
     ├─ freeTimeField: _canCommonFreeTime
     ├─ newFreeTime: 2026-05-19T11:10:05.563Z
     ├─ summonTimes[3]: 1
     └─ totalHeroes: 3
[DB] saveUser("guest_3d1ce6..."): 102 keys, 11964 bytes
🟢 05:10:05 INFO  ⚪ SUMMON-FREE ▸ User data SAVED
🟢 05:10:05 INFO  ⚪ SUMMON-FREE ▸ summonOneFree SUCCESS

     🏏️ SUMMARY
     👤 User ......... guest_3d1ce6be74560df8
     📦 Fields ........ [object Object]
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 767 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 6ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [22] 🦸 hero::getAttrs  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hero
     ├─ action ............: getAttrs
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/2] Validate request fields .
     ├─ userId: guest_3d1ce6be74560d
     └─ heros: 906d1360-c60e-4de0-9fbd-cd3d4b69e3e9
     ✅ [1/2] Validate request fields .1 hero(es) requested
     🔄 [1/1] Load userData from DB .
     └─ heros._heros: 3 heroes
     ✅ [1/1] Load userData from DB .userData loaded
     🔄 [1/2] Type assert request fields .
     ✅ [1/2] Type assert request fields .types verified
     🔄 [1/1] Snapshot hero request vs found .
     ├─ requested: 1 heroes: 906d1360-c60e-4de0-9fbd-cd3d4b69e3e9
     ├─ found: 1 heroes: 906d1360-c60e-4de0-9fbd-cd3d4b69e3e9
     └─ missing: 0 heroes: (none)
     ✅ [1/1] Snapshot hero request vs found .1/1 heroes found
     🔄 [1/1] Validate hero availability .
     ✅ [1/1] Validate hero availability .all heroes found
     🔄 [1/1] Calculate hero attributes .
     ├─ heroId: 906d1360-c60e-4de0-9fbd-cd3d4b69e3e9
     ├─ displayId: 1206
     └─ level: 1
     ├─ heroType: skill
     ├─ weightedSum: 2080.0
     └─ power: 2080
     ├─ hp: 1240
     ├─ attack: 275
     ├─ armor: 205
     └─ power: 2080
     ✅ [1/1] Calculate hero attributes .1 heroes calculated
     ├─ status: read-only, no mutations
     └─ reason: hero attributes are calculated from config — no userData writes
     ├─ status: no DB save (read-only handler)
     └─ reason: attribute calculation is a read-only operation

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 _attrs                   = Object{1}  L133726: for(var o in t._attrs) — keyed by hero index, each has _items with calculated attrs
     ├─ 🔒 _baseAttrs               = Object{1}  L133731: t._baseAttrs[o] — keyed by hero index, each has _items with base attrs (before talent)
     └─ 🔒 POWER (attr 21)          = calculated per hero  L133821: 21==p._id → heroBaseAttr.power = floor(num)
     ✅ CRITICAL AUDIT: 3/3 PASSED

     📸 getAttrs ret=0
     ├─   _attrs                       Object{1}
     └─   _baseAttrs                   Object{1}

     🏏️ SUMMARY
     👤 User ......... guest_3d1ce6be74560df8
     📦 Fields ........ 2
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 396 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 3ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [23] 🏆 activity::getActivityBrief  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: activity
     ├─ action ............: getActivityBrief
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request ..
     └─ userId: guest_3d1ce6be74560d...
     ✅ [1/3] Validate request ..
     🔄 [2/3] Load user data ....
     ✅ [2/3] Load user data ....
     ├─ userLevel: 1
     ├─ userCreateTime: 2026-05-19T05:09:36.277Z
     ├─ userAgeDays: 0.0 days
     ├─ serverOpenDate: 2026-05-19T05:09:23.704Z
     ├─ serverAgeDays: 0.0 days
     └─ dayOfWeek(UTC+7): 2 (Weekday)
     🔄 [3/3] Generate activity list .
     ├─ name: Hero Value Pack
     ├─ actType: 5037
     ├─ actCycle: 2
     ├─ displayIndex: 0
     └─ showRed: true
     ├─ name: New Server Discount Pack
     ├─ actType: 2003
     ├─ actCycle: 2
     ├─ displayIndex: 2
     └─ showRed: true
     ├─ name: Discount Today
     ├─ actType: 5003
     ├─ actCycle: 2
     ├─ displayIndex: 3
     └─ showRed: true
     ├─ name: Cumulative Top-up Gift
     ├─ actType: 2004
     ├─ actCycle: 2
     ├─ displayIndex: 4
     └─ showRed: true
     ├─ name: Daily accumulated top-up
     ├─ actType: 2007
     ├─ actCycle: 2
     ├─ displayIndex: 6
     └─ showRed: true
     ├─ name: Growth Quest
     ├─ actType: 1002
     ├─ actCycle: 1
     ├─ displayIndex: 7
     └─ showRed: true
     ├─ name: Hero Grand Kickback
     ├─ actType: 2001
     ├─ actCycle: 1
     ├─ displayIndex: 8
     └─ showRed: true
     ├─ name: Orange Hero Assembly
     ├─ actType: 2002
     ├─ actCycle: 1
     ├─ displayIndex: 9
     └─ showRed: true
     ├─ name: 7-Day Top-up At Will
     ├─ actType: 1003
     ├─ actCycle: 1
     ├─ displayIndex: 85
     └─ showRed: true
     ├─ name: Temple Contest
     ├─ actType: 4003
     ├─ actCycle: 4
     ├─ displayIndex: 9
     └─ showRed: true
     ├─ name: Ignition Illustration
     ├─ actType: 4001
     ├─ actCycle: 4
     ├─ displayIndex: 10
     └─ showRed: true
     ├─ name: Event Sign-in
     ├─ actType: 1001
     ├─ actCycle: 8
     ├─ displayIndex: 9999
     └─ showRed: false
     ✅ [3/3] Generate activity list .
     ├─ catalog: 12
     ├─ activated: 12
     └─ returned: 12
     ├─ count: 4
     ├─ homeIcon: zhujiemiannew87_png
     └─ sort: 79
     ├─ count: 5
     ├─ homeIcon: zhujiemiannew88_png
     └─ sort: 69
     ├─ count: 2
     ├─ homeIcon: zhujiemiannew101_png
     └─ sort: 89
     ├─ count: 1
     ├─ homeIcon: zhujiemiannew125_png
     └─ sort: 99

     📸 ACTIVITY BRIEF ret=0
     ├─   type                         "activity"
     ├─   action                       "getActivityBrief"
     ├─   userId                       "guest_3d1ce6be74560df8"
     ├─   version                      "1.0"
     └─   _acts                        Object{12}
     ├─ original: 2576 chars
     ├─ compressed: 777 chars
     ├─ reduction: 70%
     └─ threshold: 1024 chars

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 777 chars (LZ)

     ⏱️  TIMING
     └─ Total .............: 9ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [24] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_3d1ce6be74560d
     ├─ guideType: 2
     └─ step: 2304
     ✅ [1/3] Validate request fields .type=2 step=2304
     🔄 [1/1] Load userData from DB .
     ✅ [1/1] Load userData from DB .userData loaded
     🔄 [1/2] Type assert request fields .
     ✅ [1/2] Type assert request fields .all types verified
     🔄 [1/1] Snapshot guide._steps before modification .
     ├─ guideType: 2
     ├─ currentStep: 2210
     └─ allSteps: {"2":2210}
     ✅ [1/1] Snapshot guide._steps before modification .guide._steps[2] was 2210
     🔄 [1/2] Validate business rules .
     ✅ [1/2] Validate business rules .invariants checked
     🔄 [1/1] Update guide._steps .
     ✅ [1/1] Update guide._steps .guide._steps[2] = 2304
     └─ guide._steps[2]: 2210 step → 2304 step (+94 step) [SAVE-GUIDE]
[DB] saveUser("guest_3d1ce6..."): 102 keys, 11964 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_3d1ce6be74560df8
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 7ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [25] 🦸 hero::autoLevelUp  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hero
     ├─ action ............: autoLevelUp
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/4] Auto Level Up .....
     ├─ userId: guest_3d1ce6be74560d
     ├─ heroId: ca10e6ca-e3cf-46f1-98b9-0c000082383d
     └─ times: 1
     ├─ maxTimes: 1
     └─ heroId: ca10e6ca-e3cf-46f1-98b9-0c000082383d
     ✅ [1/4] Auto Level Up .....heroId=ca10e6ca-e3cf-46f1-98b9-0c000082383d, times=1
     🔄 [2/4] Load hero data ....
     ├─ heroId: ca10e6ca-e3cf-46f1-98b9-0c000082383d
     ├─ displayId: 1309
     └─ currentLevel: 1
     🔄 [3/4] Calculate level up .
     ├─ heroQuality: purple
     ├─ heroType: body
     └─ configTable: heroLevelUpPurple
     ├─ expCapsule (131): 1000
     └─ gold (102): 1000
🟢 05:10:11 INFO  📋 CONFIG   ▸ Resource loaded: heroLevelUpPurple.json
     ├─ entries: 220
     ├─ bytes: 23450
     └─ path: /var/www/html/resource/json/heroLevelUpPurple.json
     ├─ levelsGained: 1
     ├─ oldLevel: 1
     ├─ newLevel: 2
     ├─ totalExpCost: 18
     ├─ totalGoldCost: 81
     ├─ remainingExp: 982
     └─ remainingGold: 919
     ✅ [3/4] Calculate level up .1 levels (1 → 2)
     🔄 [4/4] Save data & build response .
[DB] saveUser("guest_3d1ce6..."): 102 keys, 11962 bytes
     ├─ heroLevel: 2
     ├─ expCapsule: 982
     └─ gold: 919
     ├─ hp: 3371
     ├─ attack: 105
     ├─ armor: 192
     └─ power: 4046
     ✅ [4/4] Save data & build response .ret=0, heroId=ca10e6ca-e3cf-46f1-98b9-0c000082383d, lvl 1→2

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 heroId                   = ca10e6ca-e3cf-46f1-98b9-0c000082383d  L133741: getHero(e.heroId) — REQUIRED
     ├─ 🔒 _heroLevel               = 2  L133751: heroBaseAttr.level = e._heroLevel
     ├─ 🔒 _baseAttr                = Object{6}  L133805: setBaseAttr(e._baseAttr, hero)
     ├─ 🔒 _totalAttr               = Object{7}  L133805: totalAttr loop _totalAttr._items
     ├─ 🔒 _totalCost._levelUp      = 2 items (exp+gold)  L133385-133393: totalCost.levelUp[] deserialize
     └─ 🔒 _changeInfo              = 2 items (exp+gold)  L118414-118417: resetTtemsCallBack → setItem(_id, _num)
     ✅ CRITICAL AUDIT: 6/6 PASSED

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 620 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 10ms  █
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [26] 🦸 hero::autoLevelUp  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hero
     ├─ action ............: autoLevelUp
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/4] Auto Level Up .....
     ├─ userId: guest_3d1ce6be74560d
     ├─ heroId: ca10e6ca-e3cf-46f1-98b9-0c000082383d
     └─ times: 1
     ├─ maxTimes: 1
     └─ heroId: ca10e6ca-e3cf-46f1-98b9-0c000082383d
     ✅ [1/4] Auto Level Up .....heroId=ca10e6ca-e3cf-46f1-98b9-0c000082383d, times=1
     🔄 [2/4] Load hero data ....
     ├─ heroId: ca10e6ca-e3cf-46f1-98b9-0c000082383d
     ├─ displayId: 1309
     └─ currentLevel: 2
     🔄 [3/4] Calculate level up .
     ├─ heroQuality: purple
     ├─ heroType: body
     └─ configTable: heroLevelUpPurple
     ├─ expCapsule (131): 982
     └─ gold (102): 919
     ├─ levelsGained: 1
     ├─ oldLevel: 2
     ├─ newLevel: 3
     ├─ totalExpCost: 36
     ├─ totalGoldCost: 135
     ├─ remainingExp: 946
     └─ remainingGold: 784
     ✅ [3/4] Calculate level up .1 levels (2 → 3)
     🔄 [4/4] Save data & build response .
[DB] saveUser("guest_3d1ce6..."): 102 keys, 11962 bytes
     ├─ heroLevel: 3
     ├─ expCapsule: 946
     └─ gold: 784
     ├─ hp: 3606
     ├─ attack: 118
     ├─ armor: 230
     └─ power: 4332
     ✅ [4/4] Save data & build response .ret=0, heroId=ca10e6ca-e3cf-46f1-98b9-0c000082383d, lvl 2→3

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 heroId                   = ca10e6ca-e3cf-46f1-98b9-0c000082383d  L133741: getHero(e.heroId) — REQUIRED
     ├─ 🔒 _heroLevel               = 3  L133751: heroBaseAttr.level = e._heroLevel
     ├─ 🔒 _baseAttr                = Object{6}  L133805: setBaseAttr(e._baseAttr, hero)
     ├─ 🔒 _totalAttr               = Object{7}  L133805: totalAttr loop _totalAttr._items
     ├─ 🔒 _totalCost._levelUp      = 2 items (exp+gold)  L133385-133393: totalCost.levelUp[] deserialize
     └─ 🔒 _changeInfo              = 2 items (exp+gold)  L118414-118417: resetTtemsCallBack → setItem(_id, _num)
     ✅ CRITICAL AUDIT: 6/6 PASSED

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 621 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 6ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [27] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_3d1ce6be74560d
     ├─ guideType: 2
     └─ step: 2308
     ✅ [1/3] Validate request fields .type=2 step=2308
     🔄 [1/1] Load userData from DB .
     ✅ [1/1] Load userData from DB .userData loaded
     🔄 [1/2] Type assert request fields .
     ✅ [1/2] Type assert request fields .all types verified
     🔄 [1/1] Snapshot guide._steps before modification .
     ├─ guideType: 2
     ├─ currentStep: 2304
     └─ allSteps: {"2":2304}
     ✅ [1/1] Snapshot guide._steps before modification .guide._steps[2] was 2304
     🔄 [1/2] Validate business rules .
     ✅ [1/2] Validate business rules .invariants checked
     🔄 [1/1] Update guide._steps .
     ✅ [1/1] Update guide._steps .guide._steps[2] = 2308
     └─ guide._steps[2]: 2304 step → 2308 step (+4 step) [SAVE-GUIDE]
[DB] saveUser("guest_3d1ce6..."): 102 keys, 11962 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_3d1ce6be74560df8
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 14ms  █
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [28] 🦸 hero::autoLevelUp  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hero
     ├─ action ............: autoLevelUp
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/4] Auto Level Up .....
     ├─ userId: guest_3d1ce6be74560d
     ├─ heroId: 906d1360-c60e-4de0-9fbd-cd3d4b69e3e9
     └─ times: 1
     ├─ maxTimes: 1
     └─ heroId: 906d1360-c60e-4de0-9fbd-cd3d4b69e3e9
     ✅ [1/4] Auto Level Up .....heroId=906d1360-c60e-4de0-9fbd-cd3d4b69e3e9, times=1
     🔄 [2/4] Load hero data ....
     ├─ heroId: 906d1360-c60e-4de0-9fbd-cd3d4b69e3e9
     ├─ displayId: 1206
     └─ currentLevel: 1
     🔄 [3/4] Calculate level up .
     ├─ heroQuality: blue
     ├─ heroType: skill
     └─ configTable: heroLevelUpBlue
     ├─ expCapsule (131): 946
     └─ gold (102): 784
🟢 05:10:14 INFO  📋 CONFIG   ▸ Resource loaded: heroLevelUpBlue.json
     ├─ entries: 220
     ├─ bytes: 23431
     └─ path: /var/www/html/resource/json/heroLevelUpBlue.json
     ├─ levelsGained: 1
     ├─ oldLevel: 1
     ├─ newLevel: 2
     ├─ totalExpCost: 16
     ├─ totalGoldCost: 72
     ├─ remainingExp: 930
     └─ remainingGold: 712
     ✅ [3/4] Calculate level up .1 levels (1 → 2)
     🔄 [4/4] Save data & build response .
[DB] saveUser("guest_3d1ce6..."): 102 keys, 11962 bytes
     ├─ heroLevel: 2
     ├─ expCapsule: 930
     └─ gold: 712
     ├─ hp: 1408
     ├─ attack: 291
     ├─ armor: 256
     └─ power: 2315
     ✅ [4/4] Save data & build response .ret=0, heroId=906d1360-c60e-4de0-9fbd-cd3d4b69e3e9, lvl 1→2

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 heroId                   = 906d1360-c60e-4de0-9fbd-cd3d4b69e3e9  L133741: getHero(e.heroId) — REQUIRED
     ├─ 🔒 _heroLevel               = 2  L133751: heroBaseAttr.level = e._heroLevel
     ├─ 🔒 _baseAttr                = Object{6}  L133805: setBaseAttr(e._baseAttr, hero)
     ├─ 🔒 _totalAttr               = Object{7}  L133805: totalAttr loop _totalAttr._items
     ├─ 🔒 _totalCost._levelUp      = 2 items (exp+gold)  L133385-133393: totalCost.levelUp[] deserialize
     └─ 🔒 _changeInfo              = 2 items (exp+gold)  L118414-118417: resetTtemsCallBack → setItem(_id, _num)
     ✅ CRITICAL AUDIT: 6/6 PASSED

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 622 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 6ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [29] 🦸 hero::autoLevelUp  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hero
     ├─ action ............: autoLevelUp
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/4] Auto Level Up .....
     ├─ userId: guest_3d1ce6be74560d
     ├─ heroId: 906d1360-c60e-4de0-9fbd-cd3d4b69e3e9
     └─ times: 1
     ├─ maxTimes: 1
     └─ heroId: 906d1360-c60e-4de0-9fbd-cd3d4b69e3e9
     ✅ [1/4] Auto Level Up .....heroId=906d1360-c60e-4de0-9fbd-cd3d4b69e3e9, times=1
     🔄 [2/4] Load hero data ....
     ├─ heroId: 906d1360-c60e-4de0-9fbd-cd3d4b69e3e9
     ├─ displayId: 1206
     └─ currentLevel: 2
     🔄 [3/4] Calculate level up .
     ├─ heroQuality: blue
     ├─ heroType: skill
     └─ configTable: heroLevelUpBlue
     ├─ expCapsule (131): 930
     └─ gold (102): 712
     ├─ levelsGained: 1
     ├─ oldLevel: 2
     ├─ newLevel: 3
     ├─ totalExpCost: 32
     ├─ totalGoldCost: 120
     ├─ remainingExp: 898
     └─ remainingGold: 592
     ✅ [3/4] Calculate level up .1 levels (2 → 3)
     🔄 [4/4] Save data & build response .
[DB] saveUser("guest_3d1ce6..."): 102 keys, 11962 bytes
     ├─ heroLevel: 3
     ├─ expCapsule: 898
     └─ gold: 592
     ├─ hp: 1576
     ├─ attack: 308
     ├─ armor: 307
     └─ power: 2551
     ✅ [4/4] Save data & build response .ret=0, heroId=906d1360-c60e-4de0-9fbd-cd3d4b69e3e9, lvl 2→3

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 heroId                   = 906d1360-c60e-4de0-9fbd-cd3d4b69e3e9  L133741: getHero(e.heroId) — REQUIRED
     ├─ 🔒 _heroLevel               = 3  L133751: heroBaseAttr.level = e._heroLevel
     ├─ 🔒 _baseAttr                = Object{6}  L133805: setBaseAttr(e._baseAttr, hero)
     ├─ 🔒 _totalAttr               = Object{7}  L133805: totalAttr loop _totalAttr._items
     ├─ 🔒 _totalCost._levelUp      = 2 items (exp+gold)  L133385-133393: totalCost.levelUp[] deserialize
     └─ 🔒 _changeInfo              = 2 items (exp+gold)  L118414-118417: resetTtemsCallBack → setItem(_id, _num)
     ✅ CRITICAL AUDIT: 6/6 PASSED

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 623 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 7ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [30] 🏆 activity::getActivityBrief  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: activity
     ├─ action ............: getActivityBrief
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request ..
     └─ userId: guest_3d1ce6be74560d...
     ✅ [1/3] Validate request ..
     🔄 [2/3] Load user data ....
     ✅ [2/3] Load user data ....
     ├─ userLevel: 1
     ├─ userCreateTime: 2026-05-19T05:09:36.277Z
     ├─ userAgeDays: 0.0 days
     ├─ serverOpenDate: 2026-05-19T05:09:23.704Z
     ├─ serverAgeDays: 0.0 days
     └─ dayOfWeek(UTC+7): 2 (Weekday)
     🔄 [3/3] Generate activity list .
     ├─ name: Hero Value Pack
     ├─ actType: 5037
     ├─ actCycle: 2
     ├─ displayIndex: 0
     └─ showRed: true
     ├─ name: New Server Discount Pack
     ├─ actType: 2003
     ├─ actCycle: 2
     ├─ displayIndex: 2
     └─ showRed: true
     ├─ name: Discount Today
     ├─ actType: 5003
     ├─ actCycle: 2
     ├─ displayIndex: 3
     └─ showRed: true
     ├─ name: Cumulative Top-up Gift
     ├─ actType: 2004
     ├─ actCycle: 2
     ├─ displayIndex: 4
     └─ showRed: true
     ├─ name: Daily accumulated top-up
     ├─ actType: 2007
     ├─ actCycle: 2
     ├─ displayIndex: 6
     └─ showRed: true
     ├─ name: Growth Quest
     ├─ actType: 1002
     ├─ actCycle: 1
     ├─ displayIndex: 7
     └─ showRed: true
     ├─ name: Hero Grand Kickback
     ├─ actType: 2001
     ├─ actCycle: 1
     ├─ displayIndex: 8
     └─ showRed: true
     ├─ name: Orange Hero Assembly
     ├─ actType: 2002
     ├─ actCycle: 1
     ├─ displayIndex: 9
     └─ showRed: true
     ├─ name: 7-Day Top-up At Will
     ├─ actType: 1003
     ├─ actCycle: 1
     ├─ displayIndex: 85
     └─ showRed: true
     ├─ name: Temple Contest
     ├─ actType: 4003
     ├─ actCycle: 4
     ├─ displayIndex: 9
     └─ showRed: true
     ├─ name: Ignition Illustration
     ├─ actType: 4001
     ├─ actCycle: 4
     ├─ displayIndex: 10
     └─ showRed: true
     ├─ name: Event Sign-in
     ├─ actType: 1001
     ├─ actCycle: 8
     ├─ displayIndex: 9999
     └─ showRed: false
     ✅ [3/3] Generate activity list .
     ├─ catalog: 12
     ├─ activated: 12
     └─ returned: 12
     ├─ count: 4
     ├─ homeIcon: zhujiemiannew87_png
     └─ sort: 79
     ├─ count: 5
     ├─ homeIcon: zhujiemiannew88_png
     └─ sort: 69
     ├─ count: 2
     ├─ homeIcon: zhujiemiannew101_png
     └─ sort: 89
     ├─ count: 1
     ├─ homeIcon: zhujiemiannew125_png
     └─ sort: 99

     📸 ACTIVITY BRIEF ret=0
     ├─   type                         "activity"
     ├─   action                       "getActivityBrief"
     ├─   userId                       "guest_3d1ce6be74560df8"
     ├─   version                      "1.0"
     └─   _acts                        Object{12}
     ├─ original: 2576 chars
     ├─ compressed: 777 chars
     ├─ reduction: 70%
     └─ threshold: 1024 chars

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 777 chars (LZ)

     ⏱️  TIMING
     └─ Total .............: 4ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [31] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_3d1ce6be74560d
     ├─ guideType: 2
     └─ step: 2508
     ✅ [1/3] Validate request fields .type=2 step=2508
     🔄 [1/1] Load userData from DB .
     ✅ [1/1] Load userData from DB .userData loaded
     🔄 [1/2] Type assert request fields .
     ✅ [1/2] Type assert request fields .all types verified
     🔄 [1/1] Snapshot guide._steps before modification .
     ├─ guideType: 2
     ├─ currentStep: 2308
     └─ allSteps: {"2":2308}
     ✅ [1/1] Snapshot guide._steps before modification .guide._steps[2] was 2308
     🔄 [1/2] Validate business rules .
     ✅ [1/2] Validate business rules .invariants checked
     🔄 [1/1] Update guide._steps .
     ✅ [1/1] Update guide._steps .guide._steps[2] = 2508
     └─ guide._steps[2]: 2308 step → 2508 step (+200 step) [SAVE-GUIDE]
[DB] saveUser("guest_3d1ce6..."): 102 keys, 11962 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_3d1ce6be74560df8
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 5ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [32] ⏳ hangup::saveGuideTeam  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hangup
     ├─ action ............: saveGuideTeam
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/2] Save guide team ...
     ├─ userId: guest_3d1ce6be74560d
     ├─ team: 5 hero(es)
     └─ supers: 
     ✅ [1/2] Save guide team ...team=5 heroes
     🔄 [2/2] Persist team data .
[DB] saveUser("guest_3d1ce6..."): 102 keys, 12043 bytes
     ✅ [2/2] Persist team data .saved to DB

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 4ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [33] ⏳ hangup::checkBattleResult  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hangup
     ├─ action ............: checkBattleResult
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/10] Validate request .
     ├─ userId: guest_3d1ce6be74560d
     ├─ isGuide: true
     ├─ battleId: (none)
     ├─ checkResult: (none)
     ├─ runaway: (none)
     └─ super: (none)
     ✅ [1/10] Validate request .
     🔄 [2/10] Load data ........
     ✅ [2/10] Load data ........lesson.json=611 entries
     🔄 [3/10] Read progress ....
     ├─ curLess: 10102
     ├─ maxPassLesson: 10101
     ├─ maxPassChapter: 801
     └─ source: user.hangup
     ✅ [3/10] Read progress ....lesson=10102
     🔄 [4/10] Determine outcome .
     ├─ mode: TUTORIAL (forced win)
     └─ isGuide: true
     ✅ [4/10] Determine outcome .WIN (0)
     🔄 [5/10] Build response ...
     ├─ lesson: 10101
     ├─ lessonName: lesson_name_1
     ├─ lessonType: 1
     ├─ thisChapter: 801
     └─ nextID: 10102
     └─ #1: item=103 qty=+20 old=20 new=40
     └─ #2: item=102 qty=+1000 old=592 new=1592
     └─ #3: item=3001 qty=+3 old=3 new=6
     └─ #4: item=3002 qty=+3 old=3 new=6
     └─ #5: item=101 qty=+20 old=20 new=40
     └─ totalProps._items[102] (GOLD): 592 gold → 1592 gold (+1000 gold) [BATTLE-REWARD]
     └─ totalProps._items[101] (DIAMOND): 20 diamond → 40 diamond (+20 diamond) [BATTLE-REWARD]
     └─ totalProps._items[103] (EXP): 20 exp → 40 exp (+20 exp) [BATTLE-REWARD]
     ├─ curLess: 10102
     ├─ maxPassLesson: 10101
     ├─ maxPassChapter: 801
     ├─ nextLessonId: 10102
     └─ source: lesson.json nextID/thisChapter
     ✅ [5/10] Build response ...WIN rewards=5 lesson=10102
[DB] saveUser("guest_3d1ce6..."): 102 keys, 12044 bytes

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 _battleResult            = 0  L104882: 0 == e._battleResult -> true (tutorial forced win)
     ├─ 🔒 _changeInfo._items       = 5 items  L97686: getBattleAwardItems iterates _changeInfo._items for {_id, _num}
     ├─ 🔒 _curLess                 = 10102  L104892/L97751: OnHookSingleton.lastSection = e._curLess
     └─ 🔒 _maxPassLesson           = 10101  L104893/L97751: OnHookSingleton.maxPassLesson = e._maxPassLesson
     ✅ CRITICAL AUDIT: 4/4 PASSED

     🏏️ SUMMARY
     👤 User ......... guest_3d1ce6be74560df8
     📦 Fields ........ 4
     📦 Data .......... 0 chars (RAW)


     📸 CHECK BATTLE RESULT ret=0
     ├─   _battleResult                0
     ├─   _curLess                     10102
     ├─   _maxPassLesson               10101
     └─   _changeInfo                  Object{1}

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 218 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 6ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [34] 📋 buryPoint::guideBattle  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: buryPoint
     ├─ action ............: guideBattle
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
🟢 05:10:24 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received
     ├─ userId: guest_3d1ce6be74560d
     ├─ point: load
     ├─ passLesson: 10102
     └─ version: 1.0
[DB] saveUser("guest_3d1ce6..."): 102 keys, 12121 bytes

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 4ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
  📊 IDLE SUMMARY — 10s no activity — x1QrxxOrByPk
══════════════════════════════════════════════════════════════════
  📊 Calls: 34  ✅ 34 OK  ⚡ 13.8ms avg  📦 10,626 chars
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [35] 📋 buryPoint::guideBattle  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: buryPoint
     ├─ action ............: guideBattle
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
🟢 05:10:45 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received
     ├─ userId: guest_3d1ce6be74560d
     ├─ point: battle
     ├─ passLesson: 10102
     └─ version: 1.0
[DB] saveUser("guest_3d1ce6..."): 102 keys, 12200 bytes

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 5ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [36] 📋 buryPoint::guideBattle  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: buryPoint
     ├─ action ............: guideBattle
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
🟢 05:10:46 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received
     ├─ userId: guest_3d1ce6be74560d
     ├─ point: home
     ├─ passLesson: 10102
     └─ version: 1.0
[DB] saveUser("guest_3d1ce6..."): 102 keys, 12277 bytes

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 6ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [37] 🏆 activity::getActivityBrief  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: activity
     ├─ action ............: getActivityBrief
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request ..
     └─ userId: guest_3d1ce6be74560d...
     ✅ [1/3] Validate request ..
     🔄 [2/3] Load user data ....
     ✅ [2/3] Load user data ....
     ├─ userLevel: 1
     ├─ userCreateTime: 2026-05-19T05:09:36.277Z
     ├─ userAgeDays: 0.0 days
     ├─ serverOpenDate: 2026-05-19T05:09:23.704Z
     ├─ serverAgeDays: 0.0 days
     └─ dayOfWeek(UTC+7): 2 (Weekday)
     🔄 [3/3] Generate activity list .
     ├─ name: Hero Value Pack
     ├─ actType: 5037
     ├─ actCycle: 2
     ├─ displayIndex: 0
     └─ showRed: true
     ├─ name: New Server Discount Pack
     ├─ actType: 2003
     ├─ actCycle: 2
     ├─ displayIndex: 2
     └─ showRed: true
     ├─ name: Discount Today
     ├─ actType: 5003
     ├─ actCycle: 2
     ├─ displayIndex: 3
     └─ showRed: true
     ├─ name: Cumulative Top-up Gift
     ├─ actType: 2004
     ├─ actCycle: 2
     ├─ displayIndex: 4
     └─ showRed: true
     ├─ name: Daily accumulated top-up
     ├─ actType: 2007
     ├─ actCycle: 2
     ├─ displayIndex: 6
     └─ showRed: true
     ├─ name: Growth Quest
     ├─ actType: 1002
     ├─ actCycle: 1
     ├─ displayIndex: 7
     └─ showRed: true
     ├─ name: Hero Grand Kickback
     ├─ actType: 2001
     ├─ actCycle: 1
     ├─ displayIndex: 8
     └─ showRed: true
     ├─ name: Orange Hero Assembly
     ├─ actType: 2002
     ├─ actCycle: 1
     ├─ displayIndex: 9
     └─ showRed: true
     ├─ name: 7-Day Top-up At Will
     ├─ actType: 1003
     ├─ actCycle: 1
     ├─ displayIndex: 85
     └─ showRed: true
     ├─ name: Temple Contest
     ├─ actType: 4003
     ├─ actCycle: 4
     ├─ displayIndex: 9
     └─ showRed: true
     ├─ name: Ignition Illustration
     ├─ actType: 4001
     ├─ actCycle: 4
     ├─ displayIndex: 10
     └─ showRed: true
     ├─ name: Event Sign-in
     ├─ actType: 1001
     ├─ actCycle: 8
     ├─ displayIndex: 9999
     └─ showRed: false
     ✅ [3/3] Generate activity list .
     ├─ catalog: 12
     ├─ activated: 12
     └─ returned: 12
     ├─ count: 4
     ├─ homeIcon: zhujiemiannew87_png
     └─ sort: 79
     ├─ count: 5
     ├─ homeIcon: zhujiemiannew88_png
     └─ sort: 69
     ├─ count: 2
     ├─ homeIcon: zhujiemiannew101_png
     └─ sort: 89
     ├─ count: 1
     ├─ homeIcon: zhujiemiannew125_png
     └─ sort: 99

     📸 ACTIVITY BRIEF ret=0
     ├─   type                         "activity"
     ├─   action                       "getActivityBrief"
     ├─   userId                       "guest_3d1ce6be74560df8"
     ├─   version                      "1.0"
     └─   _acts                        Object{12}
     ├─ original: 2576 chars
     ├─ compressed: 777 chars
     ├─ reduction: 70%
     └─ threshold: 1024 chars

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 777 chars (LZ)

     ⏱️  TIMING
     └─ Total .............: 27ms  ██
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [38] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_3d1ce6be74560d
     ├─ guideType: 2
     └─ step: 2601
     ✅ [1/3] Validate request fields .type=2 step=2601
     🔄 [1/1] Load userData from DB .
     ✅ [1/1] Load userData from DB .userData loaded
     🔄 [1/2] Type assert request fields .
     ✅ [1/2] Type assert request fields .all types verified
     🔄 [1/1] Snapshot guide._steps before modification .
     ├─ guideType: 2
     ├─ currentStep: 2508
     └─ allSteps: {"2":2508}
     ✅ [1/1] Snapshot guide._steps before modification .guide._steps[2] was 2508
     🔄 [1/2] Validate business rules .
     ✅ [1/2] Validate business rules .invariants checked
     🔄 [1/1] Update guide._steps .
     ✅ [1/1] Update guide._steps .guide._steps[2] = 2601
     └─ guide._steps[2]: 2508 step → 2601 step (+93 step) [SAVE-GUIDE]
[DB] saveUser("guest_3d1ce6..."): 102 keys, 12277 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_3d1ce6be74560df8
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 14ms  █
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [39] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_3d1ce6be74560d
     ├─ guideType: 2
     └─ step: 2603
     ✅ [1/3] Validate request fields .type=2 step=2603
     🔄 [1/1] Load userData from DB .
     ✅ [1/1] Load userData from DB .userData loaded
     🔄 [1/2] Type assert request fields .
     ✅ [1/2] Type assert request fields .all types verified
     🔄 [1/1] Snapshot guide._steps before modification .
     ├─ guideType: 2
     ├─ currentStep: 2601
     └─ allSteps: {"2":2601}
     ✅ [1/1] Snapshot guide._steps before modification .guide._steps[2] was 2601
     🔄 [1/2] Validate business rules .
     ✅ [1/2] Validate business rules .invariants checked
     🔄 [1/1] Update guide._steps .
     ✅ [1/1] Update guide._steps .guide._steps[2] = 2603
     └─ guide._steps[2]: 2601 step → 2603 step (+2 step) [SAVE-GUIDE]
[DB] saveUser("guest_3d1ce6..."): 102 keys, 12277 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_3d1ce6be74560df8
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 5ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [40] ⏳ hangup::gain  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hangup
     ├─ action ............: gain
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/8] Validate request ..
     ├─ userId: guest_3d1ce6be74560d
     └─ version: 1.0
     ✅ [1/8] Validate request ..
     🔄 [2/8] Load data .........
🟢 05:10:48 INFO  📋 CONFIG   ▸ Resource loaded: idleVipPlus.json
     ├─ entries: 18
     ├─ bytes: 1418
     └─ path: /var/www/html/resource/json/idleVipPlus.json
🟢 05:10:48 INFO  📋 CONFIG   ▸ Resource loaded: idleAwardFirst.json
     ├─ entries: 3
     ├─ bytes: 182
     └─ path: /var/www/html/resource/json/idleAwardFirst.json
🟢 05:10:48 INFO  📋 CONFIG   ▸ Resource loaded: lessonIdleAward.json
     ├─ entries: 611
     ├─ bytes: 1143151
     └─ path: /var/www/html/resource/json/lessonIdleAward.json
🟢 05:10:48 INFO  📋 CONFIG   ▸ Resource loaded: userUpgrade.json
     ├─ entries: 299
     ├─ bytes: 16357
     └─ path: /var/www/html/resource/json/userUpgrade.json
     ✅ [2/8] Load data .........lesson=611, everyTime=300s, maxIdle=28800s, maxLevel=300, firstBonus=3, idleAwardKeys=611, upgradeLevels=299
     🔄 [3/8] Calculate idle time .
     ├─ lastGainTime: 1779167376277
     ├─ now: 1779167448395
     ├─ elapsedRaw: 72s
     ├─ elapsedCapped: 72s (max 28800s)
     ├─ exCount: 0 ticks (300s each)
     └─ vipLevel: 0
     ✅ [3/8] Calculate idle time .72s, 0 ticks
     🔄 [4/8] Lesson config & bonus .
     ├─ curLess: 10102
     ├─ lessonName: 2
     ├─ idleAwardPlus: 0
     ├─ globalWarBuff: 0 (inactive)
     └─ bonusMultiplier: 1
     ✅ [4/8] Lesson config & bonus .lesson=10102, mult=1
     🔄 [5/8] Calculate rewards .
     └─ id=102 +206 (2.8625/s x 72s x 1): undefined
     └─ id=103 +24 (0.337777777777778/s x 72s x 1): undefined
     └─ id=131 +56 (0.789166666666667/s x 72s x 1): undefined
     └─ id=102 +1000: undefined
     └─ id=103 +20: undefined
     └─ id=131 +500: undefined
     ✅ [5/8] Calculate rewards .deterministic=3, randomDrops=0, firstBonus=3, totalItems=3
     🔄 [6/8] Level-up cascade ..
     ├─ oldLevel: 1
     ├─ newLevel: 2
     ├─ levelsGained: 1
     └─ expTotal: 84
     ✅ [6/8] Level-up cascade ..LEVELED UP 1 -> 2
     🔄 [7/8] Save & respond ....
[DB] saveUser("guest_3d1ce6..."): 102 keys, 12277 bytes
     ✅ [7/8] Save & respond ....
     🔄 [8/8] Build response ....
     └─ totalProps._items[102] (GOLD): 1592 gold → 2798 gold (+1206 gold) [IDLE-GAIN]
     └─ totalProps._items[103] (EXP): 40 exp → 84 exp (+44 exp) [IDLE-GAIN]
     ✅ [8/8] Build response ....4 items, LEVEL UP 1->2

     📸 HANGUP GAIN ret=0
     ├─   type                         "hangup"
     ├─   action                       "gain"
     ├─   userId                       "guest_3d1ce6be74560df8"
     ├─   version                      "1.0"
     ├─   _changeInfo                  Object{1}
     ├─   _lastGainTime                1779167376277
     └─   _clickGlobalWarBuffTag       ""

     🏏️ SUMMARY
     👤 User ......... guest_3d1ce6be74560df8
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 283 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 73ms  ███████
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [41] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_3d1ce6be74560d
     ├─ guideType: 2
     └─ step: 2708
     ✅ [1/3] Validate request fields .type=2 step=2708
     🔄 [1/1] Load userData from DB .
     ✅ [1/1] Load userData from DB .userData loaded
     🔄 [1/2] Type assert request fields .
     ✅ [1/2] Type assert request fields .all types verified
     🔄 [1/1] Snapshot guide._steps before modification .
     ├─ guideType: 2
     ├─ currentStep: 2603
     └─ allSteps: {"2":2603}
     ✅ [1/1] Snapshot guide._steps before modification .guide._steps[2] was 2603
     🔄 [1/2] Validate business rules .
     ✅ [1/2] Validate business rules .invariants checked
     🔄 [1/1] Update guide._steps .
     ✅ [1/1] Update guide._steps .guide._steps[2] = 2708
     └─ guide._steps[2]: 2603 step → 2708 step (+105 step) [SAVE-GUIDE]
[DB] saveUser("guest_3d1ce6..."): 102 keys, 12277 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_3d1ce6be74560df8
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 5ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [42] 🛠️ equip::wearAuto  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: equip
     ├─ action ............: wearAuto
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/8] Validate request fields .
     ├─ userId: guest_3d1ce6be74560d...
     ├─ heroId: ca10e6ca-e3cf-46f1-98b9-0c000082383d
     ├─ equipInfo: 1,2
     └─ weaponId: (none)
     ✅ [1/8] Validate request fields .userId + heroId present
     🔄 [2/8] Load resource JSONs .
🟢 05:10:57 INFO  📋 CONFIG   ▸ Resource loaded: equip.json
     ├─ entries: 84
     ├─ bytes: 44152
     └─ path: /var/www/html/resource/json/equip.json
🟢 05:10:57 INFO  📋 CONFIG   ▸ Resource loaded: equipSuit.json
     ├─ entries: 15
     ├─ bytes: 8619
     └─ path: /var/www/html/resource/json/equipSuit.json
🟢 05:10:57 INFO  📋 CONFIG   ▸ Resource loaded: weapon.json
     ├─ entries: 20
     ├─ bytes: 3725
     └─ path: /var/www/html/resource/json/weapon.json
     ✅ [2/8] Load resource JSONs .8 JSONs loaded
     🔄 [3/8] Load userData from DB .
     ✅ [3/8] Load userData from DB .userData loaded
     🔄 [4/8] Validate hero exists .
     ├─ heroId: ca10e6ca-e3cf-46f1-98b9-0c000082383d
     ├─ _heroDisplayId: 1309
     └─ _level: 3
     ✅ [4/8] Validate hero exists .hero found: displayId=1309 level=3
     🔄 [5/8] Get hero config ...
     ✅ [5/8] Get hero config ...heroType=body quality=purple
     🔄 [6/8] Process equip changes .
     ├─ equippedCount: 2
     ├─ equippedIds: 3001,3002
     └─ changeCount: 2
     ✅ [6/8] Process equip changes .2 equips processed
     🔄 [7/8] Calculate equip attributes .
     ├─ equipAttrs: 3 types
     └─ suitAttrs: 1 bonuses
     ✅ [7/8] Calculate equip attributes .3 equip + 1 suit
     🔄 [8/8] Calculate total attributes .
     ├─ hp: 6059
     ├─ attack: 388
     ├─ armor: 230
     └─ power: 4332
     ✅ [8/8] Calculate total attributes .power=4332
[DB] saveUser("guest_3d1ce6..."): 102 keys, 12617 bytes
🟢 05:10:57 INFO  ⚪ WEAR_AUTO ▸ equip::wearAuto SUCCESS
     ├─ userId: guest_3d1ce6be74560d...
     ├─ heroId: ca10e6ca-e3cf-46f1-98b9-0c000082383d
     ├─ equips: 2
     ├─ weapon: (none)
     ├─ power: 4332
     └─ duration: 34ms
     ├─ original: 1587 chars
     ├─ compressed: 340 chars
     ├─ reduction: 79%
     └─ threshold: 1024 chars

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 340 chars (LZ)

     ⏱️  TIMING
     └─ Total .............: 38ms  ███
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [43] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_3d1ce6be74560d
     ├─ guideType: 2
     └─ step: 2717
     ✅ [1/3] Validate request fields .type=2 step=2717
     🔄 [1/1] Load userData from DB .
     ✅ [1/1] Load userData from DB .userData loaded
     🔄 [1/2] Type assert request fields .
     ✅ [1/2] Type assert request fields .all types verified
     🔄 [1/1] Snapshot guide._steps before modification .
     ├─ guideType: 2
     ├─ currentStep: 2708
     └─ allSteps: {"2":2708}
     ✅ [1/1] Snapshot guide._steps before modification .guide._steps[2] was 2708
     🔄 [1/2] Validate business rules .
     ✅ [1/2] Validate business rules .invariants checked
     🔄 [1/1] Update guide._steps .
     ✅ [1/1] Update guide._steps .guide._steps[2] = 2717
     └─ guide._steps[2]: 2708 step → 2717 step (+9 step) [SAVE-GUIDE]
[DB] saveUser("guest_3d1ce6..."): 102 keys, 12617 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_3d1ce6be74560df8
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 5ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [44] 🏆 activity::getActivityBrief  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: activity
     ├─ action ............: getActivityBrief
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request ..
     └─ userId: guest_3d1ce6be74560d...
     ✅ [1/3] Validate request ..
     🔄 [2/3] Load user data ....
     ✅ [2/3] Load user data ....
     ├─ userLevel: 2
     ├─ userCreateTime: 2026-05-19T05:09:36.277Z
     ├─ userAgeDays: 0.0 days
     ├─ serverOpenDate: 2026-05-19T05:09:23.704Z
     ├─ serverAgeDays: 0.0 days
     └─ dayOfWeek(UTC+7): 2 (Weekday)
     🔄 [3/3] Generate activity list .
     ├─ name: Hero Value Pack
     ├─ actType: 5037
     ├─ actCycle: 2
     ├─ displayIndex: 0
     └─ showRed: true
     ├─ name: New Server Discount Pack
     ├─ actType: 2003
     ├─ actCycle: 2
     ├─ displayIndex: 2
     └─ showRed: true
     ├─ name: Discount Today
     ├─ actType: 5003
     ├─ actCycle: 2
     ├─ displayIndex: 3
     └─ showRed: true
     ├─ name: Cumulative Top-up Gift
     ├─ actType: 2004
     ├─ actCycle: 2
     ├─ displayIndex: 4
     └─ showRed: true
     ├─ name: Daily accumulated top-up
     ├─ actType: 2007
     ├─ actCycle: 2
     ├─ displayIndex: 6
     └─ showRed: true
     ├─ name: Growth Quest
     ├─ actType: 1002
     ├─ actCycle: 1
     ├─ displayIndex: 7
     └─ showRed: true
     ├─ name: Hero Grand Kickback
     ├─ actType: 2001
     ├─ actCycle: 1
     ├─ displayIndex: 8
     └─ showRed: true
     ├─ name: Orange Hero Assembly
     ├─ actType: 2002
     ├─ actCycle: 1
     ├─ displayIndex: 9
     └─ showRed: true
     ├─ name: 7-Day Top-up At Will
     ├─ actType: 1003
     ├─ actCycle: 1
     ├─ displayIndex: 85
     └─ showRed: true
     ├─ name: Temple Contest
     ├─ actType: 4003
     ├─ actCycle: 4
     ├─ displayIndex: 9
     └─ showRed: true
     ├─ name: Ignition Illustration
     ├─ actType: 4001
     ├─ actCycle: 4
     ├─ displayIndex: 10
     └─ showRed: true
     ├─ name: Event Sign-in
     ├─ actType: 1001
     ├─ actCycle: 8
     ├─ displayIndex: 9999
     └─ showRed: false
     ✅ [3/3] Generate activity list .
     ├─ catalog: 12
     ├─ activated: 12
     └─ returned: 12
     ├─ count: 4
     ├─ homeIcon: zhujiemiannew87_png
     └─ sort: 79
     ├─ count: 5
     ├─ homeIcon: zhujiemiannew88_png
     └─ sort: 69
     ├─ count: 2
     ├─ homeIcon: zhujiemiannew101_png
     └─ sort: 89
     ├─ count: 1
     ├─ homeIcon: zhujiemiannew125_png
     └─ sort: 99

     📸 ACTIVITY BRIEF ret=0
     ├─   type                         "activity"
     ├─   action                       "getActivityBrief"
     ├─   userId                       "guest_3d1ce6be74560df8"
     ├─   version                      "1.0"
     └─   _acts                        Object{12}
     ├─ original: 2576 chars
     ├─ compressed: 777 chars
     ├─ reduction: 70%
     └─ threshold: 1024 chars

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 777 chars (LZ)

     ⏱️  TIMING
     └─ Total .............: 5ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [45] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_3d1ce6be74560df8
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_3d1ce6be74560d
     ├─ guideType: 3
     └─ step: 3102
     ✅ [1/3] Validate request fields .type=3 step=3102
     🔄 [1/1] Load userData from DB .
     ✅ [1/1] Load userData from DB .userData loaded
     🔄 [1/2] Type assert request fields .
     ✅ [1/2] Type assert request fields .all types verified
     🔄 [1/1] Snapshot guide._steps before modification .
     ├─ guideType: 3
     ├─ currentStep: (none)
     └─ allSteps: {"2":2717}
     ✅ [1/1] Snapshot guide._steps before modification .guide._steps[3] was (none)
     🔄 [1/2] Validate business rules .
     ✅ [1/2] Validate business rules .invariants checked
     🔄 [1/1] Update guide._steps .
     ✅ [1/1] Update guide._steps .guide._steps[3] = 3102
     └─ guide._steps[3]: (none) step → 3102 step (NaN step) [SAVE-GUIDE]
[DB] saveUser("guest_3d1ce6..."): 102 keys, 12626 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_3d1ce6be74560df8
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 6ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
  📊 IDLE SUMMARY — 10s no activity — x1QrxxOrByPk
══════════════════════════════════════════════════════════════════
  📊 Calls: 45  ✅ 45 OK  ⚡ 14.6ms avg  📦 12,817 chars
══════════════════════════════════════════════════════════════════
