[DB] Loaded 4 records from /var/www/html/server/main-server/data/main_server.json (51479 bytes)
🟢 12:27:12 INFO  📋 CONFIG   ▸ serverOpenDate auto-initialized: 1779280032912

  ──────────────────── LOADING RESOURCES ────────────────────

🟢 12:27:12 INFO  📋 CONFIG   ▸ Resource loaded: constant.json
     ├─ entries: 1
     ├─ bytes: 17728
     └─ path: /var/www/html/resource/json/constant.json
🟢 12:27:12 INFO  📋 CONFIG   ▸ Resource loaded: hero.json
     ├─ entries: 887
     ├─ bytes: 1467869
     └─ path: /var/www/html/resource/json/hero.json
🟢 12:27:12 INFO  📋 CONFIG   ▸ Resource loaded: summon.json
     ├─ entries: 4
     ├─ bytes: 736
     └─ path: /var/www/html/resource/json/summon.json
🟢 12:27:12 INFO  📋 CONFIG   ▸ Resource loaded: heroLevelAttr.json
     ├─ entries: 360
     ├─ bytes: 32275
     └─ path: /var/www/html/resource/json/heroLevelAttr.json
🟢 12:27:12 INFO  📋 CONFIG   ▸ Resource loaded: heroTypeParam.json
     ├─ entries: 13
     ├─ bytes: 2241
     └─ path: /var/www/html/resource/json/heroTypeParam.json
🟢 12:27:12 INFO  📋 CONFIG   ▸ Resource loaded: heroQualityParam.json
     ├─ entries: 7
     ├─ bytes: 746
     └─ path: /var/www/html/resource/json/heroQualityParam.json
🟢 12:27:12 INFO  📋 CONFIG   ▸ Resource loaded: heroPower.json
     ├─ entries: 403
     ├─ bytes: 43864
     └─ path: /var/www/html/resource/json/heroPower.json
🟢 12:27:12 INFO  📋 CONFIG   ▸ Resource loaded: zPowerQualityPara.json
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
  │  serverOpenDate   : 1779280032912
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
  ├─ >> hangup::startGeneral  handlers/hangup/startGeneral.js
  ├─ >> hangup::checkBattleResult  handlers/hangup/checkBattleResult.js
  ├─ >> hangup::gain  handlers/hangup/gain.js
  ├─ >> activity::getActivityBrief  handlers/activity/getActivityBrief.js
  ├─ >> buryPoint::guideBattle  handlers/buryPoint/guideBattle.js
  ├─ >> summon::summonOneFree  handlers/summon/summonOneFree.js
  ├─ >> equip::wearAuto  handlers/equip/wearAuto.js
  └─ >> battle::getRandom  handlers/battle/getRandom.js

     └─ total: 23

══════════════════════════════════════════════════════════════════


🟢 12:27:13 INFO  🚀 SERVER   ▸ Ready — listening on http://127.0.0.1:8001
🟢 12:27:13 INFO  🚀 SERVER   ▸ Waiting for Socket.IO connections...

══════════════════════════════════════════════════════════════════
  🔗⚡ Client connected  PBOZUY6bINkO...  📍 ::ffff:127.0.0.1  📡 polling
🟢 12:27:29 INFO  🔐 TEA      ▸ Sending verify challenge
     ├─ challenge: cc8aa361-7905-4461-a39d-a9c399d161b2
     └─ socketId: PBOZUY6bINkOuXpI...
     ├─ type: string
     └─ length: 48
🟢 12:27:29 INFO  🔐 TEA      ▸ TEA verification SUCCESS
     ├─ socketId: PBOZUY6bINkOuXpI...
     ├─ duration: 4ms
     └─ transport: polling
     ├─ socketId: PBOZUY6bINkOuXpI...
     ├─ from: polling
     └─ to: websocket
══════════════════════════════════════════════════════════════════
▼ [1] 👤 user::enterGame  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: user
     ├─ action ............: enterGame
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: 1
🟢 12:27:29 INFO  ⚔️ ENTER    ▸ enterGame REQUEST RECEIVED
     ├─ userId: guest_09428ddb2dc74ee7
     ├─ serverId: 1
     ├─ loginToken: b8cc15f0cf6bf62...
     └─ gameVersion: 2026-03-02143147
     🔄 [1/10] Required fields check .
     ✅ [1/10] Required fields check .All present
     🔄 [2/10] Token auth via SDK-Server .
🟢 12:27:29 INFO  📡 SDKAPI   ▸ User verified via SDK-Server
     ├─ userId: guest_09428ddb2dc74ee7
     ├─ httpStatus: 200
     ├─ bodySize: 268 bytes
     └─ duration: 17ms
     ✅ [2/10] Token auth via SDK-Server .20ms ✅
     🔄 [3/10] ServerId validation .
     ✅ [3/10] ServerId validation .1 == 1 ✅
     🔄 [4/10] User existence check .
     🌟 [4/10] User existence check .NEW USER 🌟
     🔄 [5/10] Build user data ..
🟢 12:27:29 INFO  📋 CONFIG   ▸ Resource loaded: task.json
     ├─ entries: 44
     ├─ bytes: 22978
     └─ path: /var/www/html/resource/json/task.json
     ├─ constantKeys: 505
     ├─ heroEntries: 887
     ├─ summonPools: 4
     └─ taskEntries: 44
     ├─ startHero: 1205
     ├─ startHeroLevel: 3
     ├─ heroInstanceId: cf4790e6-fb8...
     ├─ heroConfigFound: true
     └─ heroName: hero_name_15
     ├─ startDiamond: 0
     ├─ startGold: 0
     ├─ startUserExp: 0
     └─ startUserLevel: 1
     ├─ types: 1,2,4,5,6,7,8
     └─ values: 2,2,2,2,2,2,2
🟢 12:27:29 INFO  📋 CONFIG   ▸ Resource loaded: thingsID.json
     ├─ entries: 1636
     ├─ bytes: 884038
     └─ path: /var/www/html/resource/json/thingsID.json
     ├─ _heroId: cf4790e6-fb8...
     ├─ _heroDisplayId: 1205
     ├─ _level: 3
     └─ _heroStar: 0
     ✅ [5/10] Build user data ..100 keys (47ms)
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
[DB] saveUser("guest_09428d..."): 100 keys, 10122 bytes
     ✅ [9/10] Database save ....4ms 💾
     🔄 [10/10] Response build ..
     ├─ original: 10122 chars
     ├─ compressed: 2398 chars
     ├─ reduction: 76%
     └─ threshold: 1024 chars
     ✅ [10/10] Response build ..OK 📤

     🏏️ SUMMARY
     👤 User ......... guest_09428ddb2dc74ee7
     🦸 Heroes ........ 1
     🏆 Level ......... 1
     💎 Diamond ....... 0
     📦 Fields ........ 100
     ⏱️  Duration ..... 196ms
     📦 Data .......... 2,398 chars (LZ)


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
     ├─   serverOpenDate               1779280032912
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
     └─ size ..............: 2,398 chars (LZ)

     ⏱️  TIMING
     └─ Total .............: 206ms  ████████████████████
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [2] 👤 user::getBulletinBrief  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: user
     ├─ action ............: getBulletinBrief
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/2] Validate request fields .
     └─ userId: guest_09428ddb2dc74e
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
     👤 User ......... guest_09428ddb2dc74ee7
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
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/2] Route relay action .
     ├─ userId: guest_09428ddb2dc74e
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
     └─ Total .............: 11ms  █
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [4] 🤝 friend::friendServerAction  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: friend
     ├─ action ............: friendServerAction
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/2] Route relay action .
     ├─ userId: guest_09428ddb2dc74e
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
     └─ Total .............: 8ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [5] 🖼️ heroImage::getAll  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: heroImage
     ├─ action ............: getAll
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/2] Validate request fields .
     └─ userId: guest_09428ddb2dc74e
     ✅ [1/2] Validate request fields .userId OK
     🔄 [1/1] Load userData from DB .
     ├─ heros: exists
     └─ heros._heros: exists
     ✅ [1/1] Load userData from DB .userData loaded
     🔄 [1/1] Type assert request fields .
     ✅ [1/1] Type assert request fields .type verified
     🔄 [1/1] Snapshot hero collection state .
     ├─ heroCount: 1
     └─ heroIds: cf4790e6-fb85-4570-89f0-d973e457be9c
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
     👤 User ......... guest_09428ddb2dc74ee7
     📦 Fields ........ 1
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 97 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 3ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [6] 🦸 hero::getAttrs  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hero
     ├─ action ............: getAttrs
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/2] Get hero attrs ....
     ├─ userId: guest_09428ddb2dc74e
     └─ heros: cf4790e6-fb85-4570-89f0-d973e457be9c
     ✅ [1/2] Get hero attrs ....1 hero(es) requested
     🔄 [2/2] Calculate hero attributes .
     ├─ heroId: cf4790e6-fb85-4570-89f0-d973e457be9c
     ├─ displayId: 1205
     └─ level: 3
     ├─ heroType: critical
     ├─ weightedSum: 2312.0
     └─ power: 2312
     ├─ hp: 1260
     ├─ attack: 462
     ├─ armor: 214
     └─ power: 2312
     ✅ [2/2] Calculate hero attributes .1 heroes calculated

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 _attrs                   = Object{1}  L133726: for(var o in t._attrs) — keyed by hero index, each has _items with calculated attrs
     ├─ 🔒 _baseAttrs               = Object{1}  L133731: t._baseAttrs[o] — keyed by hero index, each has _items with base attrs (before talent)
     └─ 🔒 POWER (attr 21)          = calculated per hero  L133821: 21==p._id → heroBaseAttr.power = floor(num)
     ✅ CRITICAL AUDIT: 3/3 PASSED

     🏏️ SUMMARY
     👤 User ......... guest_09428ddb2dc74ee7
     📦 Fields ........ 2
     ⏱️  Duration ..... 0ms
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 420 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 8ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [7] 💬 userMsg::getMsgList  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: userMsg
     ├─ action ............: getMsgList
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/2] Validate request fields .
     └─ userId: guest_09428ddb2dc74e
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
     👤 User ......... guest_09428ddb2dc74ee7
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
▼ [8] 👤 user::registChat  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: user
     ├─ action ............: registChat
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
🟢 12:27:34 INFO  ⚪ REGIST_CHAT ▸ registChat REQUEST RECEIVED
     ├─ userId: guest_09428ddb2dc74e
     └─ version: 1.0
🟢 12:27:34 INFO  ⚪ REGIST_CHAT ▸ Entry check PASS — userId=guest_09428ddb2d...
🟢 12:27:34 INFO  ⚪ REGIST_CHAT ▸ Loading config for chat registration
     ├─ chatUrl: http://127.0.0.1:8002
     ├─ serverId: 1
     └─ source: DEFAULT (chatUrl not set)
🟢 12:27:34 INFO  ⚪ REGIST_CHAT ▸ Config loaded — chatUrl and serverId resolved
🟢 12:27:34 INFO  ⚪ REGIST_CHAT ▸ Loading player state for guild/room context
     ├─ userData: LOADED (100 top keys)
     ├─ guild: NO
     └─ guildRoomId: undefined (by design — updated dynamically by guild handler L114204)
🟢 12:27:34 INFO  ⚪ REGIST_CHAT ▸ Building chat registration response (6 fields)
     ├─ worldRoomId: world_1 (L114566 — ALWAYS joined)
     ├─ guildRoomId: undefined (L114568 — undefined = skip)
     ├─ teamDungeonChatRoom: undefined (L114579 — undefined = skip)
     └─ teamChatRoom: undefined (L114590 — undefined = skip)
     ├─ consumer: L114470 — 6 fields read from callback(n)
     ├─ next-step: L114480: io.connect(chatServerUrl) → TEA verify required
     ├─ post-login: L114550: chat::login → joinRoom(world, guild?, team?, dungeon?)
     └─ dynamic-update: guild L114207 | teamDungeon L136514 | team L136531
🟢 12:27:34 INFO  ⚪ REGIST_CHAT ▸ Response fields built — 6 fields total
🟢 12:27:34 INFO  ⚪ REGIST_CHAT ▸ No data mutations (configuration handler)
     ├─ type: NONE — registChat is a read-only configuration handler
     ├─ reason: Only returns chat URL and room IDs — no user data modified
     └─ trace: L114462-114470: client reads response fields, does not write back
🟢 12:27:34 INFO  ⚪ REGIST_CHAT ▸ No DB save required (configuration handler)
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
     👤 User ......... guest_09428ddb2dc74ee7
     📦 Fields ........ 6
     ⏱️  Duration ..... 3ms
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 83 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 8ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [9] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_09428ddb2dc74e
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
[DB] saveUser("guest_09428d..."): 100 keys, 10130 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_09428ddb2dc74ee7
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 9ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [10] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_09428ddb2dc74e
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
[DB] saveUser("guest_09428d..."): 100 keys, 10130 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_09428ddb2dc74ee7
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
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/2] Save guide team ...
     ├─ userId: guest_09428ddb2dc74e
     ├─ team: 5 hero(es)
     └─ supers: 1120561
     ✅ [1/2] Save guide team ...team=5 heroes
     🔄 [2/2] Persist team data .
[DB] saveUser("guest_09428d..."): 101 keys, 10245 bytes
     ✅ [2/2] Persist team data .saved to DB

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 8ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [12] ⏳ hangup::checkBattleResult  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hangup
     ├─ action ............: checkBattleResult
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/5] Validate request ..
     ├─ userId: guest_09428ddb2dc74e
     ├─ isGuide: true
     ├─ battleId: (none)
     ├─ checkResult: (none)
     ├─ runaway: (none)
     └─ super: (none)
     ✅ [1/5] Validate request ..
     🔄 [2/5] Load data .........
🟢 12:27:53 INFO  📋 CONFIG   ▸ Resource loaded: lesson.json
     ├─ entries: 611
     ├─ bytes: 833203
     └─ path: /var/www/html/resource/json/lesson.json
     ✅ [2/5] Load data .........lesson.json=611 entries
     🔄 [3/5] Read progress .....
     ├─ curLess: 10101
     ├─ maxPassLesson: 0
     ├─ maxPassChapter: 0
     └─ source: user.hangup
     ✅ [3/5] Read progress .....lesson=10101
     🔄 [4/5] Determine outcome .
     ├─ mode: TUTORIAL (always win — design)
     └─ isGuide: true
     ✅ [4/5] Determine outcome .WIN (0)
     🔄 [5/5] Build response ....
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
     ├─ lessonId (completed): 10101
     ├─ curLess (new): 10102
     ├─ maxPassLesson: 10101
     ├─ maxPassChapter: 801
     ├─ nextLessonId: 10102
     └─ source: lesson.json nextID/thisChapter
     🔄 [6/7] Update curMainTask .
     ✅ [6/7] Update curMainTask .No lesson task matched completed lesson 10101 — no change
[DB] saveUser("guest_09428d..."): 101 keys, 10319 bytes
     ✅ [5/7] Build response ....WIN rewards=5 lesson=10102

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 _battleResult            = 0  L104882: 0 == e._battleResult -> true (tutorial always win)
     ├─ 🔒 _changeInfo._items       = 5 items  L97686: getBattleAwardItems iterates _changeInfo._items for {_id, _num}
     ├─ 🔒 _curLess                 = 10102  L104892/L97751: OnHookSingleton.lastSection = e._curLess
     └─ 🔒 _maxPassLesson           = 10101  L104893/L97751: OnHookSingleton.maxPassLesson = e._maxPassLesson
     ✅ CRITICAL AUDIT: 4/4 PASSED

     🏏️ SUMMARY
     👤 User ......... guest_09428ddb2dc74ee7
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
     └─ Total .............: 28ms  ██
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [13] 📋 buryPoint::guideBattle  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: buryPoint
     ├─ action ............: guideBattle
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
🟢 12:27:55 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received
     ├─ userId: guest_09428ddb2dc74e
     ├─ point: load
     ├─ passLesson: 10101
     └─ version: 1.0
[DB] saveUser("guest_09428d..."): 102 keys, 10427 bytes

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 4ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
  📊 IDLE SUMMARY — 10s no activity — PBOZUY6bINkO
══════════════════════════════════════════════════════════════════
  📊 Calls: 13  ✅ 13 OK  ⚡ 23.8ms avg  📦 3,274 chars
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [14] 📋 buryPoint::guideBattle  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: buryPoint
     ├─ action ............: guideBattle
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
🟢 12:28:05 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received
     ├─ userId: guest_09428ddb2dc74e
     ├─ point: battle
     ├─ passLesson: 10101
     └─ version: 1.0
[DB] saveUser("guest_09428d..."): 102 keys, 10506 bytes

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 5ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [15] 📋 buryPoint::guideBattle  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: buryPoint
     ├─ action ............: guideBattle
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
🟢 12:28:07 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received
     ├─ userId: guest_09428ddb2dc74e
     ├─ point: home
     ├─ passLesson: 10101
     └─ version: 1.0
[DB] saveUser("guest_09428d..."): 102 keys, 10583 bytes

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
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request ..
     └─ userId: guest_09428ddb2dc74e...
     ✅ [1/3] Validate request ..
     🔄 [2/3] Load user data ....
     ✅ [2/3] Load user data ....
     ├─ userLevel: 1
     ├─ userCreateTime: 2026-05-20T12:27:29.235Z
     ├─ userAgeDays: 0.0 days
     ├─ serverOpenDate: 2026-05-20T12:27:12.912Z
     ├─ serverAgeDays: 0.0 days
     └─ dayOfWeek(UTC+7): 3 (Weekday)
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
     ├─   userId                       "guest_09428ddb2dc74ee7"
     ├─   version                      "1.0"
     └─   _acts                        Object{12}
     ├─ original: 2576 chars
     ├─ compressed: 775 chars
     ├─ reduction: 70%
     └─ threshold: 1024 chars

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 775 chars (LZ)

     ⏱️  TIMING
     └─ Total .............: 20ms  ██
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [17] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_09428ddb2dc74e
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
[DB] saveUser("guest_09428d..."): 102 keys, 10583 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_09428ddb2dc74ee7
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 6ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [18] ✨ summon::summonOneFree  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: summon
     ├─ action ............: summonOneFree
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
🟢 12:28:12 INFO  ⚪ SUMMON-FREE ▸ summonOneFree REQUEST RECEIVED
     ├─ userId: guest_09428ddb2dc74ee7
     ├─ sType: 3
     └─ isGuide: true
🟢 12:28:12 INFO  📋 CONFIG   ▸ Resource loaded: summonPool.json
     ├─ entries: 200
     ├─ bytes: 75170
     └─ path: /var/www/html/resource/json/summonPool.json
🟢 12:28:12 INFO  📋 CONFIG   ▸ Resource loaded: summonRandom.json
     ├─ entries: 10
     ├─ bytes: 2157
     └─ path: /var/www/html/resource/json/summonRandom.json
     ├─ poolId: 1
     ├─ poolType: summonSuper
     ├─ freeTimer: 86400s
     └─ summonEnergyGain: 10
🟢 12:28:12 INFO  ⚪ SUMMON-FREE ▸ Free timer OK — proceeding with summon
🟢 12:28:12 INFO  ⚪ SUMMON-FREE ▸ [GUIDE] Predetermined hero: displayId=1309 quality=purple
     ├─ heroInstanceId: d58639a3-ca3...
     ├─ displayId: 1309
     ├─ heroName: hero_name_31
     ├─ quality: purple
     ├─ heroColor: 4
     └─ heroType: body
     ├─ oldEnergy: 0
     ├─ newEnergy: 10
     ├─ energyGained: 10
     ├─ freeTimeField: _canSuperFreeTime
     ├─ newFreeTime: 2026-05-21T12:28:12.245Z
     ├─ summonTimes[1]: 1
     └─ totalHeroes: 2
[DB] saveUser("guest_09428d..."): 102 keys, 11274 bytes
🟢 12:28:12 INFO  ⚪ SUMMON-FREE ▸ User data SAVED
🟢 12:28:12 INFO  ⚪ SUMMON-FREE ▸ summonOneFree SUCCESS

     🏏️ SUMMARY
     👤 User ......... guest_09428ddb2dc74ee7
     📦 Fields ........ [object Object]
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 767 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 16ms  █
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [19] 🦸 hero::getAttrs  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hero
     ├─ action ............: getAttrs
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/2] Get hero attrs ....
     ├─ userId: guest_09428ddb2dc74e
     └─ heros: d58639a3-ca3b-4049-9d32-8770796f77ee
     ✅ [1/2] Get hero attrs ....1 hero(es) requested
     🔄 [2/2] Calculate hero attributes .
     ├─ heroId: d58639a3-ca3b-4049-9d32-8770796f77ee
     ├─ displayId: 1309
     └─ level: 1
     ├─ heroType: body
     ├─ weightedSum: 3760.0
     └─ power: 3760
     ├─ hp: 3136
     ├─ attack: 93
     ├─ armor: 153
     └─ power: 3760
     ✅ [2/2] Calculate hero attributes .1 heroes calculated

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 _attrs                   = Object{1}  L133726: for(var o in t._attrs) — keyed by hero index, each has _items with calculated attrs
     ├─ 🔒 _baseAttrs               = Object{1}  L133731: t._baseAttrs[o] — keyed by hero index, each has _items with base attrs (before talent)
     └─ 🔒 POWER (attr 21)          = calculated per hero  L133821: 21==p._id → heroBaseAttr.power = floor(num)
     ✅ CRITICAL AUDIT: 3/3 PASSED

     🏏️ SUMMARY
     👤 User ......... guest_09428ddb2dc74ee7
     📦 Fields ........ 2
     ⏱️  Duration ..... 0ms
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 420 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 2ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [20] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_09428ddb2dc74e
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
[DB] saveUser("guest_09428d..."): 102 keys, 11274 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_09428ddb2dc74ee7
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
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
🟢 12:28:16 INFO  ⚪ SUMMON-FREE ▸ summonOneFree REQUEST RECEIVED
     ├─ userId: guest_09428ddb2dc74ee7
     ├─ sType: 1
     └─ isGuide: true
     ├─ poolId: 3
     ├─ poolType: summonNormal
     ├─ freeTimer: 21600s
     └─ summonEnergyGain: 0
🟢 12:28:16 INFO  ⚪ SUMMON-FREE ▸ Free timer OK — proceeding with summon
🟢 12:28:16 INFO  ⚪ SUMMON-FREE ▸ [GUIDE] Predetermined hero: displayId=1206 quality=blue
     ├─ heroInstanceId: ac03db3f-6a0...
     ├─ displayId: 1206
     ├─ heroName: hero_name_17
     ├─ quality: blue
     ├─ heroColor: 3
     └─ heroType: skill
     ├─ oldEnergy: 10
     ├─ newEnergy: 10
     ├─ energyGained: 0
     ├─ freeTimeField: _canCommonFreeTime
     ├─ newFreeTime: 2026-05-20T18:28:16.525Z
     ├─ summonTimes[3]: 1
     └─ totalHeroes: 3
[DB] saveUser("guest_09428d..."): 102 keys, 11964 bytes
🟢 12:28:16 INFO  ⚪ SUMMON-FREE ▸ User data SAVED
🟢 12:28:16 INFO  ⚪ SUMMON-FREE ▸ summonOneFree SUCCESS

     🏏️ SUMMARY
     👤 User ......... guest_09428ddb2dc74ee7
     📦 Fields ........ [object Object]
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 767 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 9ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [22] 🦸 hero::getAttrs  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hero
     ├─ action ............: getAttrs
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/2] Get hero attrs ....
     ├─ userId: guest_09428ddb2dc74e
     └─ heros: ac03db3f-6a07-44c7-b13d-9b638207b597
     ✅ [1/2] Get hero attrs ....1 hero(es) requested
     🔄 [2/2] Calculate hero attributes .
     ├─ heroId: ac03db3f-6a07-44c7-b13d-9b638207b597
     ├─ displayId: 1206
     └─ level: 1
     ├─ heroType: skill
     ├─ weightedSum: 2080.0
     └─ power: 2080
     ├─ hp: 1240
     ├─ attack: 275
     ├─ armor: 205
     └─ power: 2080
     ✅ [2/2] Calculate hero attributes .1 heroes calculated

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 _attrs                   = Object{1}  L133726: for(var o in t._attrs) — keyed by hero index, each has _items with calculated attrs
     ├─ 🔒 _baseAttrs               = Object{1}  L133731: t._baseAttrs[o] — keyed by hero index, each has _items with base attrs (before talent)
     └─ 🔒 POWER (attr 21)          = calculated per hero  L133821: 21==p._id → heroBaseAttr.power = floor(num)
     ✅ CRITICAL AUDIT: 3/3 PASSED

     🏏️ SUMMARY
     👤 User ......... guest_09428ddb2dc74ee7
     📦 Fields ........ 2
     ⏱️  Duration ..... 0ms
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 421 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 2ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [23] 🏆 activity::getActivityBrief  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: activity
     ├─ action ............: getActivityBrief
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request ..
     └─ userId: guest_09428ddb2dc74e...
     ✅ [1/3] Validate request ..
     🔄 [2/3] Load user data ....
     ✅ [2/3] Load user data ....
     ├─ userLevel: 1
     ├─ userCreateTime: 2026-05-20T12:27:29.235Z
     ├─ userAgeDays: 0.0 days
     ├─ serverOpenDate: 2026-05-20T12:27:12.912Z
     ├─ serverAgeDays: 0.0 days
     └─ dayOfWeek(UTC+7): 3 (Weekday)
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
     ├─   userId                       "guest_09428ddb2dc74ee7"
     ├─   version                      "1.0"
     └─   _acts                        Object{12}
     ├─ original: 2576 chars
     ├─ compressed: 775 chars
     ├─ reduction: 70%
     └─ threshold: 1024 chars

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 775 chars (LZ)

     ⏱️  TIMING
     └─ Total .............: 15ms  █
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
  📊 IDLE SUMMARY — 10s no activity — PBOZUY6bINkO
══════════════════════════════════════════════════════════════════
  📊 Calls: 23  ✅ 23 OK  ⚡ 17.1ms avg  📦 7,207 chars
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [24] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_09428ddb2dc74e
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
[DB] saveUser("guest_09428d..."): 102 keys, 11964 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_09428ddb2dc74ee7
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 5ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [25] 🦸 hero::autoLevelUp  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hero
     ├─ action ............: autoLevelUp
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/4] Auto Level Up .....
     ├─ userId: guest_09428ddb2dc74e
     ├─ heroId: d58639a3-ca3b-4049-9d32-8770796f77ee
     └─ times: 1
     ├─ maxTimes: 1
     └─ heroId: d58639a3-ca3b-4049-9d32-8770796f77ee
     ✅ [1/4] Auto Level Up .....heroId=d58639a3-ca3b-4049-9d32-8770796f77ee, times=1
     🔄 [2/4] Load hero data ....
     ├─ heroId: d58639a3-ca3b-4049-9d32-8770796f77ee
     ├─ displayId: 1309
     └─ currentLevel: 1
     🔄 [3/4] Calculate level up .
     ├─ heroQuality: purple
     ├─ heroType: body
     └─ configTable: heroLevelUpPurple
     ├─ expCapsule (131): 1000
     └─ gold (102): 1000
🟢 12:28:54 INFO  📋 CONFIG   ▸ Resource loaded: heroLevelUpPurple.json
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
[DB] saveUser("guest_09428d..."): 102 keys, 11962 bytes
     ├─ heroLevel: 2
     ├─ expCapsule: 982
     └─ gold: 919
     ├─ hp: 3371
     ├─ attack: 105
     ├─ armor: 192
     └─ power: 4046
     ├─ hp: 1348
     ├─ attack: 42
     ├─ armor: 192
     ├─ extraArmor: 0
     └─ power: 1960
     ✅ [4/4] Save data & build response .ret=0, heroId=d58639a3-ca3b-4049-9d32-8770796f77ee, lvl 1→2

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 heroId                   = d58639a3-ca3b-4049-9d32-8770796f77ee  L133741: getHero(e.heroId) — REQUIRED
     ├─ 🔒 _heroLevel               = 2  L133751: heroBaseAttr.level = e._heroLevel
     ├─ 🔒 _baseAttr                = Object{6}  L133805: setBaseAttr(e._baseAttr, hero)
     ├─ 🔒 _totalAttr               = Object{8}  L133805: totalAttr loop _totalAttr._items
     ├─ 🔒 _totalCost._levelUp      = 2 items (exp+gold)  L133385-133393: totalCost.levelUp[] deserialize
     └─ 🔒 _changeInfo              = 2 items (exp+gold)  L118414-118417: resetTtemsCallBack → setItem(_id, _num)
     ✅ CRITICAL AUDIT: 6/6 PASSED

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 647 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 24ms  ██
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [26] 🦸 hero::autoLevelUp  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hero
     ├─ action ............: autoLevelUp
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/4] Auto Level Up .....
     ├─ userId: guest_09428ddb2dc74e
     ├─ heroId: d58639a3-ca3b-4049-9d32-8770796f77ee
     └─ times: 1
     ├─ maxTimes: 1
     └─ heroId: d58639a3-ca3b-4049-9d32-8770796f77ee
     ✅ [1/4] Auto Level Up .....heroId=d58639a3-ca3b-4049-9d32-8770796f77ee, times=1
     🔄 [2/4] Load hero data ....
     ├─ heroId: d58639a3-ca3b-4049-9d32-8770796f77ee
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
[DB] saveUser("guest_09428d..."): 102 keys, 11962 bytes
     ├─ heroLevel: 3
     ├─ expCapsule: 946
     └─ gold: 784
     ├─ hp: 3606
     ├─ attack: 118
     ├─ armor: 230
     └─ power: 4332
     ├─ hp: 1442
     ├─ attack: 47
     ├─ armor: 230
     ├─ extraArmor: 0
     └─ power: 2097
     ✅ [4/4] Save data & build response .ret=0, heroId=d58639a3-ca3b-4049-9d32-8770796f77ee, lvl 2→3

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 heroId                   = d58639a3-ca3b-4049-9d32-8770796f77ee  L133741: getHero(e.heroId) — REQUIRED
     ├─ 🔒 _heroLevel               = 3  L133751: heroBaseAttr.level = e._heroLevel
     ├─ 🔒 _baseAttr                = Object{6}  L133805: setBaseAttr(e._baseAttr, hero)
     ├─ 🔒 _totalAttr               = Object{8}  L133805: totalAttr loop _totalAttr._items
     ├─ 🔒 _totalCost._levelUp      = 2 items (exp+gold)  L133385-133393: totalCost.levelUp[] deserialize
     └─ 🔒 _changeInfo              = 2 items (exp+gold)  L118414-118417: resetTtemsCallBack → setItem(_id, _num)
     ✅ CRITICAL AUDIT: 6/6 PASSED

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 648 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 9ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [27] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_09428ddb2dc74e
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
[DB] saveUser("guest_09428d..."): 102 keys, 11962 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_09428ddb2dc74ee7
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 6ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [28] 🦸 hero::autoLevelUp  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hero
     ├─ action ............: autoLevelUp
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/4] Auto Level Up .....
     ├─ userId: guest_09428ddb2dc74e
     ├─ heroId: ac03db3f-6a07-44c7-b13d-9b638207b597
     └─ times: 1
     ├─ maxTimes: 1
     └─ heroId: ac03db3f-6a07-44c7-b13d-9b638207b597
     ✅ [1/4] Auto Level Up .....heroId=ac03db3f-6a07-44c7-b13d-9b638207b597, times=1
     🔄 [2/4] Load hero data ....
     ├─ heroId: ac03db3f-6a07-44c7-b13d-9b638207b597
     ├─ displayId: 1206
     └─ currentLevel: 1
     🔄 [3/4] Calculate level up .
     ├─ heroQuality: blue
     ├─ heroType: skill
     └─ configTable: heroLevelUpBlue
     ├─ expCapsule (131): 946
     └─ gold (102): 784
🟢 12:28:58 INFO  📋 CONFIG   ▸ Resource loaded: heroLevelUpBlue.json
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
[DB] saveUser("guest_09428d..."): 102 keys, 11962 bytes
     ├─ heroLevel: 2
     ├─ expCapsule: 930
     └─ gold: 712
     ├─ hp: 1408
     ├─ attack: 291
     ├─ armor: 256
     └─ power: 2315
     ├─ hp: 450
     ├─ attack: 93
     ├─ armor: 256
     ├─ extraArmor: 0
     └─ power: 1159
     ✅ [4/4] Save data & build response .ret=0, heroId=ac03db3f-6a07-44c7-b13d-9b638207b597, lvl 1→2

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 heroId                   = ac03db3f-6a07-44c7-b13d-9b638207b597  L133741: getHero(e.heroId) — REQUIRED
     ├─ 🔒 _heroLevel               = 2  L133751: heroBaseAttr.level = e._heroLevel
     ├─ 🔒 _baseAttr                = Object{6}  L133805: setBaseAttr(e._baseAttr, hero)
     ├─ 🔒 _totalAttr               = Object{8}  L133805: totalAttr loop _totalAttr._items
     ├─ 🔒 _totalCost._levelUp      = 2 items (exp+gold)  L133385-133393: totalCost.levelUp[] deserialize
     └─ 🔒 _changeInfo              = 2 items (exp+gold)  L118414-118417: resetTtemsCallBack → setItem(_id, _num)
     ✅ CRITICAL AUDIT: 6/6 PASSED

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 647 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 28ms  ██
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [29] 🦸 hero::autoLevelUp  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hero
     ├─ action ............: autoLevelUp
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/4] Auto Level Up .....
     ├─ userId: guest_09428ddb2dc74e
     ├─ heroId: ac03db3f-6a07-44c7-b13d-9b638207b597
     └─ times: 1
     ├─ maxTimes: 1
     └─ heroId: ac03db3f-6a07-44c7-b13d-9b638207b597
     ✅ [1/4] Auto Level Up .....heroId=ac03db3f-6a07-44c7-b13d-9b638207b597, times=1
     🔄 [2/4] Load hero data ....
     ├─ heroId: ac03db3f-6a07-44c7-b13d-9b638207b597
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
[DB] saveUser("guest_09428d..."): 102 keys, 11962 bytes
     ├─ heroLevel: 3
     ├─ expCapsule: 898
     └─ gold: 592
     ├─ hp: 1576
     ├─ attack: 308
     ├─ armor: 307
     └─ power: 2551
     ├─ hp: 504
     ├─ attack: 98
     ├─ armor: 307
     ├─ extraArmor: 0
     └─ power: 1269
     ✅ [4/4] Save data & build response .ret=0, heroId=ac03db3f-6a07-44c7-b13d-9b638207b597, lvl 2→3

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 heroId                   = ac03db3f-6a07-44c7-b13d-9b638207b597  L133741: getHero(e.heroId) — REQUIRED
     ├─ 🔒 _heroLevel               = 3  L133751: heroBaseAttr.level = e._heroLevel
     ├─ 🔒 _baseAttr                = Object{6}  L133805: setBaseAttr(e._baseAttr, hero)
     ├─ 🔒 _totalAttr               = Object{8}  L133805: totalAttr loop _totalAttr._items
     ├─ 🔒 _totalCost._levelUp      = 2 items (exp+gold)  L133385-133393: totalCost.levelUp[] deserialize
     └─ 🔒 _changeInfo              = 2 items (exp+gold)  L118414-118417: resetTtemsCallBack → setItem(_id, _num)
     ✅ CRITICAL AUDIT: 6/6 PASSED

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 648 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 6ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [30] 🏆 activity::getActivityBrief  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: activity
     ├─ action ............: getActivityBrief
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request ..
     └─ userId: guest_09428ddb2dc74e...
     ✅ [1/3] Validate request ..
     🔄 [2/3] Load user data ....
     ✅ [2/3] Load user data ....
     ├─ userLevel: 1
     ├─ userCreateTime: 2026-05-20T12:27:29.235Z
     ├─ userAgeDays: 0.0 days
     ├─ serverOpenDate: 2026-05-20T12:27:12.912Z
     ├─ serverAgeDays: 0.0 days
     └─ dayOfWeek(UTC+7): 3 (Weekday)
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
     ├─   userId                       "guest_09428ddb2dc74ee7"
     ├─   version                      "1.0"
     └─   _acts                        Object{12}
     ├─ original: 2576 chars
     ├─ compressed: 775 chars
     ├─ reduction: 70%
     └─ threshold: 1024 chars

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 775 chars (LZ)

     ⏱️  TIMING
     └─ Total .............: 6ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [31] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_09428ddb2dc74e
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
[DB] saveUser("guest_09428d..."): 102 keys, 11962 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_09428ddb2dc74ee7
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 6ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [32] ⏳ hangup::saveGuideTeam  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hangup
     ├─ action ............: saveGuideTeam
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/2] Save guide team ...
     ├─ userId: guest_09428ddb2dc74e
     ├─ team: 5 hero(es)
     └─ supers: 
     ✅ [1/2] Save guide team ...team=5 heroes
     🔄 [2/2] Persist team data .
[DB] saveUser("guest_09428d..."): 102 keys, 12043 bytes
     ✅ [2/2] Persist team data .saved to DB

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 6ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [33] ⏳ hangup::checkBattleResult  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hangup
     ├─ action ............: checkBattleResult
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/5] Validate request ..
     ├─ userId: guest_09428ddb2dc74e
     ├─ isGuide: true
     ├─ battleId: (none)
     ├─ checkResult: (none)
     ├─ runaway: (none)
     └─ super: (none)
     ✅ [1/5] Validate request ..
     🔄 [2/5] Load data .........
     ✅ [2/5] Load data .........lesson.json=611 entries
     🔄 [3/5] Read progress .....
     ├─ curLess: 10102
     ├─ maxPassLesson: 10101
     ├─ maxPassChapter: 801
     └─ source: user.hangup
     ✅ [3/5] Read progress .....lesson=10102
     🔄 [4/5] Determine outcome .
     ├─ mode: TUTORIAL (always win — design)
     └─ isGuide: true
     ✅ [4/5] Determine outcome .WIN (0)
     🔄 [5/5] Build response ....
     ├─ lesson: 10102
     ├─ lessonName: lesson_name_3
     ├─ lessonType: 1
     ├─ thisChapter: 801
     └─ nextID: 10103
     └─ #1: item=103 qty=+39 old=20 new=59
     └─ #2: item=102 qty=+1100 old=592 new=1692
     └─ #3: item=3003 qty=+4 old=0 new=4
     └─ #4: item=3004 qty=+4 old=0 new=4
     └─ #5: item=101 qty=+20 old=20 new=40
     └─ totalProps._items[102] (GOLD): 592 gold → 1692 gold (+1100 gold) [BATTLE-REWARD]
     └─ totalProps._items[101] (DIAMOND): 20 diamond → 40 diamond (+20 diamond) [BATTLE-REWARD]
     └─ totalProps._items[103] (EXP): 20 exp → 59 exp (+39 exp) [BATTLE-REWARD]
     ├─ lessonId (completed): 10102
     ├─ curLess (new): 10103
     ├─ maxPassLesson: 10102
     ├─ maxPassChapter: 801
     ├─ nextLessonId: 10103
     └─ source: lesson.json nextID/thisChapter
     🔄 [6/7] Update curMainTask .
     ├─ matchedTask: 6001
     ├─ taskType: lesson
     └─ targetWas: 10102
     ├─ nextTask: 6002
     ├─ nextTaskType: lesson
     ├─ curCount: 10102
     ├─ targetCount: 10103
     └─ levelNeeded: 1
     ✅ [6/7] Update curMainTask .Task advanced — curMainTask updated
     ✅ [6/7] Update curMainTask .Task advanced — curMainTask updated
[DB] saveUser("guest_09428d..."): 102 keys, 12106 bytes
     ✅ [5/7] Build response ....WIN rewards=5 lesson=10103

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 _battleResult            = 0  L104882: 0 == e._battleResult -> true (tutorial always win)
     ├─ 🔒 _changeInfo._items       = 5 items  L97686: getBattleAwardItems iterates _changeInfo._items for {_id, _num}
     ├─ 🔒 _curLess                 = 10103  L104892/L97751: OnHookSingleton.lastSection = e._curLess
     └─ 🔒 _maxPassLesson           = 10102  L104893/L97751: OnHookSingleton.maxPassLesson = e._maxPassLesson
     ✅ CRITICAL AUDIT: 4/4 PASSED

     🏏️ SUMMARY
     👤 User ......... guest_09428ddb2dc74ee7
     📦 Fields ........ 4
     📦 Data .......... 0 chars (RAW)


     📸 CHECK BATTLE RESULT ret=0
     ├─   _battleResult                0
     ├─   _curLess                     10103
     ├─   _maxPassLesson               10102
     └─   _changeInfo                  Object{1}

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 218 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 9ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [34] 📋 buryPoint::guideBattle  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: buryPoint
     ├─ action ............: guideBattle
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
🟢 12:29:09 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received
     ├─ userId: guest_09428ddb2dc74e
     ├─ point: load
     ├─ passLesson: 10102
     └─ version: 1.0
[DB] saveUser("guest_09428d..."): 102 keys, 12183 bytes

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 5ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
  📊 IDLE SUMMARY — 10s no activity — PBOZUY6bINkO
══════════════════════════════════════════════════════════════════
  📊 Calls: 34  ✅ 34 OK  ⚡ 14.8ms avg  📦 10,800 chars
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [35] 📋 buryPoint::guideBattle  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: buryPoint
     ├─ action ............: guideBattle
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
🟢 12:29:31 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received
     ├─ userId: guest_09428ddb2dc74e
     ├─ point: battle
     ├─ passLesson: 10102
     └─ version: 1.0
[DB] saveUser("guest_09428d..."): 102 keys, 12262 bytes

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 6ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [36] 📋 buryPoint::guideBattle  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: buryPoint
     ├─ action ............: guideBattle
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
🟢 12:29:32 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received
     ├─ userId: guest_09428ddb2dc74e
     ├─ point: home
     ├─ passLesson: 10102
     └─ version: 1.0
[DB] saveUser("guest_09428d..."): 102 keys, 12339 bytes

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 4ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [37] 🏆 activity::getActivityBrief  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: activity
     ├─ action ............: getActivityBrief
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request ..
     └─ userId: guest_09428ddb2dc74e...
     ✅ [1/3] Validate request ..
     🔄 [2/3] Load user data ....
     ✅ [2/3] Load user data ....
     ├─ userLevel: 1
     ├─ userCreateTime: 2026-05-20T12:27:29.235Z
     ├─ userAgeDays: 0.0 days
     ├─ serverOpenDate: 2026-05-20T12:27:12.912Z
     ├─ serverAgeDays: 0.0 days
     └─ dayOfWeek(UTC+7): 3 (Weekday)
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
     ├─   userId                       "guest_09428ddb2dc74ee7"
     ├─   version                      "1.0"
     └─   _acts                        Object{12}
     ├─ original: 2576 chars
     ├─ compressed: 775 chars
     ├─ reduction: 70%
     └─ threshold: 1024 chars

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 775 chars (LZ)

     ⏱️  TIMING
     └─ Total .............: 5ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [38] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_09428ddb2dc74e
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
[DB] saveUser("guest_09428d..."): 102 keys, 12339 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_09428ddb2dc74ee7
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 11ms  █
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [39] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_09428ddb2dc74e
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
[DB] saveUser("guest_09428d..."): 102 keys, 12339 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_09428ddb2dc74ee7
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 8ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [40] ⏳ hangup::gain  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hangup
     ├─ action ............: gain
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/8] Validate request ..
     ├─ userId: guest_09428ddb2dc74e
     └─ version: 1.0
     ✅ [1/8] Validate request ..
     🔄 [2/8] Load data .........
🟢 12:29:34 INFO  📋 CONFIG   ▸ Resource loaded: idleVipPlus.json
     ├─ entries: 18
     ├─ bytes: 1418
     └─ path: /var/www/html/resource/json/idleVipPlus.json
🟢 12:29:34 INFO  📋 CONFIG   ▸ Resource loaded: idleAwardFirst.json
     ├─ entries: 3
     ├─ bytes: 182
     └─ path: /var/www/html/resource/json/idleAwardFirst.json
🟢 12:29:34 INFO  📋 CONFIG   ▸ Resource loaded: lessonIdleAward.json
     ├─ entries: 611
     ├─ bytes: 1143151
     └─ path: /var/www/html/resource/json/lessonIdleAward.json
🟢 12:29:34 INFO  📋 CONFIG   ▸ Resource loaded: userUpgrade.json
     ├─ entries: 299
     ├─ bytes: 16357
     └─ path: /var/www/html/resource/json/userUpgrade.json
     ✅ [2/8] Load data .........lesson=611, everyTime=300s, maxIdle=28800s, maxLevel=300, firstBonus=3, idleAwardKeys=611, upgradeLevels=299
     🔄 [3/8] Calculate idle time .
     ├─ lastGainTime: 1779280049235
     ├─ now: 1779280174718
     ├─ elapsedRaw: 125s
     ├─ elapsedCapped: 125s (max 28800s)
     ├─ exCount: 0 ticks (300s each)
     └─ vipLevel: 0
     ✅ [3/8] Calculate idle time .125s, 0 ticks
     🔄 [4/8] Lesson config & bonus .
     ├─ curLess: 10103
     ├─ lessonName: 3
     ├─ idleAwardPlus: 0
     ├─ globalWarBuff: 0 (inactive)
     └─ bonusMultiplier: 1
     ✅ [4/8] Lesson config & bonus .lesson=10103, mult=1
     🔄 [5/8] Calculate rewards .
     └─ id=102 +363 (2.90416666666667/s x 125s x 1): undefined
     └─ id=103 +42 (0.3425/s x 125s x 1): undefined
     └─ id=131 +99 (0.794722222222222/s x 125s x 1): undefined
     └─ id=132 +1 (0.00812777777777779/s x 125s x 1): undefined
     └─ id=102 +1000: undefined
     └─ id=103 +20: undefined
     └─ id=131 +500: undefined
     ✅ [5/8] Calculate rewards .deterministic=4, randomDrops=0, firstBonus=3, totalItems=4
     🔄 [6/8] Level-up cascade ..
     ├─ oldLevel: 1
     ├─ newLevel: 2
     ├─ levelsGained: 1
     └─ expTotal: 121
     ✅ [6/8] Level-up cascade ..LEVELED UP 1 -> 2
     🔄 [7/8] Save & respond ....
[DB] saveUser("guest_09428d..."): 102 keys, 12368 bytes
     ✅ [7/8] Save & respond ....
     🔄 [8/8] Build response ....
     └─ totalProps._items[102] (GOLD): 1692 gold → 3055 gold (+1363 gold) [IDLE-GAIN]
     └─ totalProps._items[103] (EXP): 59 exp → 121 exp (+62 exp) [IDLE-GAIN]
     ✅ [8/8] Build response ....5 items, LEVEL UP 1->2

     📸 HANGUP GAIN ret=0
     ├─   type                         "hangup"
     ├─   action                       "gain"
     ├─   userId                       "guest_09428ddb2dc74ee7"
     ├─   version                      "1.0"
     ├─   _changeInfo                  Object{1}
     ├─   _lastGainTime                1779280049235
     └─   _clickGlobalWarBuffTag       ""

     🏏️ SUMMARY
     👤 User ......... guest_09428ddb2dc74ee7
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 311 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 72ms  ███████
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [41] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_09428ddb2dc74e
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
[DB] saveUser("guest_09428d..."): 102 keys, 12368 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_09428ddb2dc74ee7
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
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/8] Validate request fields .
     ├─ userId: guest_09428ddb2dc74e...
     ├─ heroId: d58639a3-ca3b-4049-9d32-8770796f77ee
     ├─ equipInfo: 1,2,3,4
     └─ weaponId: (none)
     ✅ [1/8] Validate request fields .userId + heroId present
     🔄 [2/8] Load resource JSONs .
🟢 12:29:40 INFO  📋 CONFIG   ▸ Resource loaded: equip.json
     ├─ entries: 84
     ├─ bytes: 44152
     └─ path: /var/www/html/resource/json/equip.json
🟢 12:29:40 INFO  📋 CONFIG   ▸ Resource loaded: equipSuit.json
     ├─ entries: 15
     ├─ bytes: 8619
     └─ path: /var/www/html/resource/json/equipSuit.json
🟢 12:29:40 INFO  📋 CONFIG   ▸ Resource loaded: weapon.json
     ├─ entries: 20
     ├─ bytes: 3725
     └─ path: /var/www/html/resource/json/weapon.json
     ✅ [2/8] Load resource JSONs .8 JSONs loaded
     🔄 [3/8] Load userData from DB .
     ✅ [3/8] Load userData from DB .userData loaded
     🔄 [4/8] Validate hero exists .
     ├─ heroId: d58639a3-ca3b-4049-9d32-8770796f77ee
     ├─ _heroDisplayId: 1309
     └─ _level: 3
     ✅ [4/8] Validate hero exists .hero found: displayId=1309 level=3
     🔄 [5/8] Get hero config ...
     ✅ [5/8] Get hero config ...heroType=body quality=purple
     🔄 [6/8] Process equip changes .
     ├─ equippedCount: 4
     ├─ equippedIds: 3001,3002,3003,3004
     └─ changeCount: 4
     ✅ [6/8] Process equip changes .4 equips processed
     🔄 [7/8] Calculate equip attributes .
     ├─ equipAttrs: 3 types
     └─ suitAttrs: 5 bonuses
     ✅ [7/8] Calculate equip attributes .3 equip + 5 suit
     🔄 [8/8] Calculate total attributes .
     ├─ hp: 6348
     ├─ attack: 317
     ├─ armor: 230
     ├─ extraArmor: 1430
     └─ power: 8703
     ✅ [8/8] Calculate total attributes .power=8703
[DB] saveUser("guest_09428d..."): 102 keys, 12855 bytes
🟢 12:29:40 INFO  ⚪ WEAR_AUTO ▸ equip::wearAuto SUCCESS
     ├─ userId: guest_09428ddb2dc74e...
     ├─ heroId: d58639a3-ca3b-4049-9d32-8770796f77ee
     ├─ equips: 4
     ├─ weapon: (none)
     ├─ power: 8703
     └─ duration: 40ms
     ├─ original: 1836 chars
     ├─ compressed: 382 chars
     ├─ reduction: 79%
     └─ threshold: 1024 chars

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 382 chars (LZ)

     ⏱️  TIMING
     └─ Total .............: 44ms  ████
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [43] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_09428ddb2dc74e
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
[DB] saveUser("guest_09428d..."): 102 keys, 12855 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_09428ddb2dc74ee7
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 6ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [44] 🏆 activity::getActivityBrief  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: activity
     ├─ action ............: getActivityBrief
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request ..
     └─ userId: guest_09428ddb2dc74e...
     ✅ [1/3] Validate request ..
     🔄 [2/3] Load user data ....
     ✅ [2/3] Load user data ....
     ├─ userLevel: 2
     ├─ userCreateTime: 2026-05-20T12:27:29.235Z
     ├─ userAgeDays: 0.0 days
     ├─ serverOpenDate: 2026-05-20T12:27:12.912Z
     ├─ serverAgeDays: 0.0 days
     └─ dayOfWeek(UTC+7): 3 (Weekday)
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
     ├─   userId                       "guest_09428ddb2dc74ee7"
     ├─   version                      "1.0"
     └─   _acts                        Object{12}
     ├─ original: 2576 chars
     ├─ compressed: 775 chars
     ├─ reduction: 70%
     └─ threshold: 1024 chars

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 775 chars (LZ)

     ⏱️  TIMING
     └─ Total .............: 5ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [45] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_09428ddb2dc74e
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
[DB] saveUser("guest_09428d..."): 102 keys, 12864 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_09428ddb2dc74ee7
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 5ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [46] ⏳ hangup::startGeneral  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hangup
     ├─ action ............: startGeneral
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/7] Validate request ..
     ├─ userId: guest_09428ddb2dc74e
     ├─ version: 1.0
     ├─ team: 5 heroes
     ├─ super: 
     └─ battleField: 20
     ✅ [1/7] Validate request ..
     🔄 [2/7] Load data .........
🟢 12:29:51 INFO  📋 CONFIG   ▸ Resource loaded: heroQualityPower.json
     ├─ entries: 7
     ├─ bytes: 466
     └─ path: /var/www/html/resource/json/heroQualityPower.json
     ✅ [2/7] Load data .........lesson=611, heroes=887, levelAttr=360, typeParam=13, qualityParam=7, heroPower=403, qualityPower=7
     🔄 [3/7] Read lesson progress .
     ├─ curLess: 10103
     └─ source: userData.hangup._curLess
     ✅ [3/7] Read lesson progress .lesson=10103 (lesson_name_5)
     🔄 [4/7] Parse enemy config .
     ├─ enemyList: ,,,55202,
     ├─ enemyLevel: ,,,8,
     ├─ monsterType: ,,,critical,
     ├─ difficultyHp: 1.89,1.89,1.89,3.024,1.89
     ├─ difficultyAttack: 4.4,4.4,4.4,4.84,4.4
     ├─ difficultyArmor: 1,1,1,1,1
     ├─ power: 10000
     └─ isBoss: 4
     ✅ [4/7] Parse enemy config .parsed 5 positions
     🔄 [5/7] Build enemy team ..
     ├─ pos: 3
     ├─ heroId: 55202
     ├─ quality: blue
     ├─ level: 8
     ├─ monsterType: critical
     ├─ diffHp/dAtk/dArm: 3.024/4.84/1
     ├─ hp/atk/arm: 5844.79/2853.18/394.10
     ├─ power: 9283
     ├─ speed: 187
     └─ skills: 120201,120211,120291
     ✅ [5/7] Build enemy team ..1 enemies built
     🔄 [6/7] Build response ....
     ├─ battleId: 4d3608bb-6d6...
     ├─ userId: guest_09428ddb2d...
     ├─ lessonId: 10103
     └─ status: REGISTERED
     ✅ [6/7] Build response ....battleId=4d3608bb..., enemies=1
     🔄 [7/7] Verify & respond ..

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 _battleId                = 4d3608bb-6d66-4c...  L97731: UserInfoSingleton.getInstance().battleId = r._battleId
     ├─ 🔒 _rightTeam (FLAT, no _items) = 1 heroes (keys: 3)  L102470: for (var o in e) iterates _rightTeam directly — [FIX-001]
     ├─ 🔒 _rightSuper              = 0 skills  L103618: rightSuper: r ? r : [] (empty is valid)
     ├─ 🔒 _attrs._items uses _id   = verified  L102528-537: a.type = o._id — [FIX-002]
     ├─ 🔒 Power attr (21)          = included (integer)  L133821: 21==p._id → floor(num) — [FIX-006][FIX-015]
     ├─ 🔒 FullHealth attr (22)     = included (= HP with decimals)  L74988: heroMaxHealth = FullHealth || Health — [FIX-007]
     ├─ 🔒 HP/ATK/ARM decimal values = NOT floored — matches HAR  HAR: _num:702.45, _num:174.24 — [FIX-009]
     ├─ 🔒 ENERGY attr (16)         = 50 (starting energy)  HAR: _num:50 — [FIX-014]
     ├─ 🔒 Skills keyed by skill ID = verified  HAR: "190401":{...} — [FIX-013]
     └─ 🔒 Formula 5-layer          = (levelAttr × typeParam + bais) × qualityParam × balance × difficulty  L116073 makeHeroBasicAttr — [FIX-008]
     ✅ CRITICAL AUDIT: 10/10 PASSED

  ┌──────────────────────────────────────────────────────────┐
  │  ❌ FATAL ERROR AT STEP L101674: for (var o = 0; o < n.length; o++)│
  │                                                          │
  │  STEP:   START-GENERAL                                   │
  │  REASON: TYPE ASSERTION FAILED: responseData._rightSuper │
  │  DETAIL: L101674: for (var o = 0; o < n.length; o++)     │
  │                                                          │
  │  IMPACT:  Wrong type -> super skill parsing error         │
  │                                                          │
  └──────────────────────────────────────────────────────────┘

     ├─ field: responseData._rightSuper
     ├─ expected: object
     ├─ actual: object
     └─ value: 
     ✅ [7/7] Verify & respond ..

     📸 START GENERAL ret=0
     ├─   _battleId                    "4d3608bb-6d66-4c53-b8c7-678e..."
     ├─   _rightTeam                   Object{1}
     └─   _rightSuper                  Array[0] ⚠️ EMPTY

     🏏️ SUMMARY
     👤 User ......... guest_09428ddb2dc74ee7
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 994 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 33ms  ███
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [47] 🛠️ battle::getRandom  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: battle
     ├─ action ............: getRandom
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/5] Validate request ..
     ├─ userId: guest_09428ddb2dc74e
     ├─ battleId: 4d3608bb-6d66-4c53-b...
     ├─ count: 100
     └─ version: 1.0
     ✅ [1/5] Validate request ..
     🔄 [2/5] Validate battleId .
     ✅ [2/5] Validate battleId .battleId=4d3608bb-6d6... lesson=10103
     🔄 [3/5] Generate randoms ..
     ├─ count: 100
     ├─ min: 0.003208
     ├─ max: 0.989937
     ├─ avg: 0.477493
     ├─ first5: 0.956909, 0.876131, 0.447281, 0.136290, 0.684574
     └─ precision: ~16 decimal places (Math.random)
     ✅ [3/5] Generate randoms ..100 randoms generated (avg=0.4775)
     🔄 [4/5] Update session ....
     ├─ battleId: 4d3608bb-6d6...
     ├─ randomUsed: true
     └─ nextStep: hangup::checkBattleResult
     ✅ [4/5] Update session ....
     🔄 [5/5] Build response ....

  ┌──────────────────────────────────────────────────────────┐
  │  ❌ FATAL ERROR AT STEP L102462: t(e._rand) — callback receives array│
  │                                                          │
  │  STEP:   GET-RANDOM                                      │
  │  REASON: TYPE ASSERTION FAILED: responseData._rand       │
  │  DETAIL: L102462: t(e._rand) — callback receives array   │
  │                                                          │
  │  IMPACT:  Wrong type -> RandomManager.addRandomList fails -> battle crash│
  │                                                          │
  └──────────────────────────────────────────────────────────┘

     ├─ field: responseData._rand
     ├─ expected: object
     ├─ actual: object
     └─ value: 0.9569091956908866,0.8761305114182008,0.44728116979803356,0.1362901554251863,0.6845736499580142,0.45638322525723807,0.8513025056948597,0.9744011556203841,0.4906973079831288,0.3821800822529702,0.003208054511414482,0.49557401232859843,0.21249869857571146,0.7233335904746178,0.5840492373357961,0.9281506245960297,0.8352921818342256,0.03387966048234614,0.8432054569236525,0.5889811859070833,0.37801171926259103,0.6850359855978316,0.3993621662504713,0.3120234638967948,0.3522357288463117,0.21242512933838043,0.18928353312677038,0.349165364851567,0.5578045732590292,0.3189190058226894,0.6323829286472858,0.8394385756155295,0.06400470779781942,0.36718542662914144,0.6795545669341356,0.1747292115831085,0.3897571426552635,0.21037453164023512,0.5968659887150499,0.9801632575627324,0.27659024526906484,0.08086701137388064,0.9280025660638626,0.43389232000082,0.2704454398365962,0.23265636789292554,0.44572473163052617,0.34859240830909355,0.9273094862045084,0.17228729662408093,0.872836007761039,0.9576069145931037,0.5122448995061465,0.18243364649972305,0.9460617749151624,0.6061743831609404,0.3427627378266386,0.746593052378872,0.03333054487274878,0.7980762104962339,0.5631422199887041,0.989937261227219,0.22124056047618879,0.6560155610777639,0.8776170953302216,0.38780242371114404,0.39802168590626297,0.6121402504331904,0.6724467675458276,0.8033416258250697,0.21859757157745496,0.09999059316998926,0.6847139006268275,0.30827033157951045,0.7381822305512069,0.11459063704928729,0.7136367667062273,0.24524171146428142,0.23774989910752964,0.05767453314688964,0.15954877192921146,0.2781932806470728,0.7599688383688366,0.3429794099497543,0.47988342475178725,0.14125073386419007,0.08452693155231938,0.05710962371841943,0.8475054222128828,0.4190176414203357,0.5568039702344355,0.7031768941326205,0.5961589375875814,0.05634273725961081,0.7667729047731545,0.28522414115166417,0.8950580844785475,0.18275946515485209,0.11104832194923742,0.11811067750457227
     ✅ [5/5] Build response ....

     📸 GET RANDOM ret=0
     ├─   _rand_length                 100
     ├─   _rand_first3                 Array[3]
     └─   _rand_avg                    "0.477493"

     🏏️ SUMMARY
     👤 User ......... guest_09428ddb2dc74ee7
     📦 Data .......... 0 chars (RAW)

     ├─ original: 1946 chars
     ├─ compressed: 538 chars
     ├─ reduction: 72%
     └─ threshold: 1024 chars

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 538 chars (LZ)

     ⏱️  TIMING
     └─ Total .............: 7ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [48] ⏳ hangup::checkBattleResult  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hangup
     ├─ action ............: checkBattleResult
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/5] Validate request ..
     ├─ userId: guest_09428ddb2dc74e
     ├─ isGuide: false
     ├─ battleId: 4d3608bb-6d66-4c53-b8c7-678ecc55fdce
     ├─ checkResult: [object Object],[object Object],[object Object],[object Object]
     ├─ runaway: false
     └─ super: 
     ✅ [1/5] Validate request ..
     🔄 [2/5] Load data .........
     ✅ [2/5] Load data .........lesson.json=611 entries
     🔄 [3/5] Read progress .....
     ├─ curLess: 10103
     ├─ maxPassLesson: 10102
     ├─ maxPassChapter: 801
     └─ source: user.hangup
     ✅ [3/5] Read progress .....lesson=10103
     🔄 [4/5] Determine outcome .
     ├─ mode: REGULAR
     ├─ checkResult: [object Object],[object Object],[object Object],[object Object]
     ├─ runaway: false
     └─ isWin: false
     ✅ [4/5] Determine outcome .LOSE (1)
     🔄 [5/5] Build response ....
     └─ status: LOSE — no rewards given
[DB] saveUser("guest_09428d..."): 102 keys, 12864 bytes
     ✅ [5/7] Build response ....LOSE rewards=0 lesson=10103

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 _battleResult            = 1  L97750: 0 == t._battleResult ? true : false (regular battle)
     ├─ 🔒 _changeInfo._items       = 0 items  L97686: getBattleAwardItems iterates _changeInfo._items for {_id, _num}
     ├─ 🔒 _curLess                 = 10103  L104892/L97751: OnHookSingleton.lastSection = e._curLess
     └─ 🔒 _maxPassLesson           = 10102  L104893/L97751: OnHookSingleton.maxPassLesson = e._maxPassLesson
     ✅ CRITICAL AUDIT: 3/4 PASSED, 1 warning(s)

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     └─ 🔒 _maxPassChapter          = 801  L97751: OnHookSingleton.maxPassChapter = e._maxPassChapter (regular only)
     ✅ CRITICAL AUDIT: 1/1 PASSED

     🏏️ SUMMARY
     👤 User ......... guest_09428ddb2dc74ee7
     📦 Fields ........ 5
     📦 Data .......... 0 chars (RAW)


     📸 CHECK BATTLE RESULT ret=0
     ├─   _battleResult                1
     ├─   _curLess                     10103
     ├─   _maxPassLesson               10102
     ├─   _changeInfo                  Object{1}
     └─   _maxPassChapter              801

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 109 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 13ms  █
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [49] 🏆 activity::getActivityBrief  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: activity
     ├─ action ............: getActivityBrief
     ├─ userId ............: guest_09428ddb2dc74ee7
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request ..
     └─ userId: guest_09428ddb2dc74e...
     ✅ [1/3] Validate request ..
     🔄 [2/3] Load user data ....
     ✅ [2/3] Load user data ....
     ├─ userLevel: 2
     ├─ userCreateTime: 2026-05-20T12:27:29.235Z
     ├─ userAgeDays: 0.0 days
     ├─ serverOpenDate: 2026-05-20T12:27:12.912Z
     ├─ serverAgeDays: 0.0 days
     └─ dayOfWeek(UTC+7): 3 (Weekday)
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
     ├─   userId                       "guest_09428ddb2dc74ee7"
     ├─   version                      "1.0"
     └─   _acts                        Object{12}
     ├─ original: 2576 chars
     ├─ compressed: 775 chars
     ├─ reduction: 70%
     └─ threshold: 1024 chars

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 775 chars (LZ)

     ⏱️  TIMING
     └─ Total .............: 6ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
  📊 IDLE SUMMARY — 10s no activity — PBOZUY6bINkO
══════════════════════════════════════════════════════════════════
  📊 Calls: 49  ✅ 49 OK  ⚡ 15.0ms avg  📦 15,473 chars
══════════════════════════════════════════════════════════════════
