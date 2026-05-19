[DB] Loaded 7 records from /var/www/html/server/main-server/data/main_server.json (85659 bytes)
🟢 08:05:41 INFO  📋 CONFIG   ▸ serverOpenDate auto-initialized: 1779177941693

  ──────────────────── LOADING RESOURCES ────────────────────

🟢 08:05:41 INFO  📋 CONFIG   ▸ Resource loaded: constant.json
     ├─ entries: 1
     ├─ bytes: 17728
     └─ path: /var/www/html/resource/json/constant.json
🟢 08:05:41 INFO  📋 CONFIG   ▸ Resource loaded: hero.json
     ├─ entries: 887
     ├─ bytes: 1467869
     └─ path: /var/www/html/resource/json/hero.json
🟢 08:05:41 INFO  📋 CONFIG   ▸ Resource loaded: summon.json
     ├─ entries: 4
     ├─ bytes: 736
     └─ path: /var/www/html/resource/json/summon.json
🟢 08:05:41 INFO  📋 CONFIG   ▸ Resource loaded: heroLevelAttr.json
     ├─ entries: 360
     ├─ bytes: 32275
     └─ path: /var/www/html/resource/json/heroLevelAttr.json
🟢 08:05:41 INFO  📋 CONFIG   ▸ Resource loaded: heroTypeParam.json
     ├─ entries: 13
     ├─ bytes: 2241
     └─ path: /var/www/html/resource/json/heroTypeParam.json
🟢 08:05:41 INFO  📋 CONFIG   ▸ Resource loaded: heroQualityParam.json
     ├─ entries: 7
     ├─ bytes: 746
     └─ path: /var/www/html/resource/json/heroQualityParam.json
🟢 08:05:41 INFO  📋 CONFIG   ▸ Resource loaded: heroPower.json
     ├─ entries: 403
     ├─ bytes: 43864
     └─ path: /var/www/html/resource/json/heroPower.json
🟢 08:05:41 INFO  📋 CONFIG   ▸ Resource loaded: zPowerQualityPara.json
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
  │  serverOpenDate   : 1779177941693
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


🟢 08:05:41 INFO  🚀 SERVER   ▸ Ready — listening on http://127.0.0.1:8001
🟢 08:05:41 INFO  🚀 SERVER   ▸ Waiting for Socket.IO connections...

══════════════════════════════════════════════════════════════════
  🔗⚡ Client connected  fsjjbpmdajyi...  📍 ::ffff:127.0.0.1  📡 polling
🟢 08:05:51 INFO  🔐 TEA      ▸ Sending verify challenge
     ├─ challenge: 04ddfcad-77ca-4184-a482-b5000c04af0c
     └─ socketId: fsjjbpmdajyiK7Dl...
     ├─ type: string
     └─ length: 48
🟢 08:05:51 INFO  🔐 TEA      ▸ TEA verification SUCCESS
     ├─ socketId: fsjjbpmdajyiK7Dl...
     ├─ duration: 2ms
     └─ transport: polling
     ├─ socketId: fsjjbpmdajyiK7Dl...
     ├─ from: polling
     └─ to: websocket
══════════════════════════════════════════════════════════════════
▼ [1] 👤 user::enterGame  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: user
     ├─ action ............: enterGame
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: 1
🟢 08:05:51 INFO  ⚔️ ENTER    ▸ enterGame REQUEST RECEIVED
     ├─ userId: guest_4cc76cf292132e89
     ├─ serverId: 1
     ├─ loginToken: 252f31fe56364d3...
     └─ gameVersion: 2026-03-02143147
     🔄 [1/10] Required fields check .
     ✅ [1/10] Required fields check .All present
     🔄 [2/10] Token auth via SDK-Server .
🟢 08:05:51 INFO  📡 SDKAPI   ▸ User verified via SDK-Server
     ├─ userId: guest_4cc76cf292132e89
     ├─ httpStatus: 200
     ├─ bodySize: 268 bytes
     └─ duration: 17ms
     ✅ [2/10] Token auth via SDK-Server .20ms ✅
     🔄 [3/10] ServerId validation .
     ✅ [3/10] ServerId validation .1 == 1 ✅
     🔄 [4/10] User existence check .
     🌟 [4/10] User existence check .NEW USER 🌟
     🔄 [5/10] Build user data ..
🟢 08:05:51 INFO  📋 CONFIG   ▸ Resource loaded: task.json
     ├─ entries: 44
     ├─ bytes: 22978
     └─ path: /var/www/html/resource/json/task.json
     ├─ constantKeys: 505
     ├─ heroEntries: 887
     ├─ summonPools: 4
     └─ taskEntries: 44
     ├─ startHero: 1205
     ├─ startHeroLevel: 3
     ├─ heroInstanceId: b891d08c-36b...
     ├─ heroConfigFound: true
     └─ heroName: hero_name_15
     ├─ startDiamond: 0
     ├─ startGold: 0
     ├─ startUserExp: 0
     └─ startUserLevel: 1
     ├─ types: 1,2,4,5,6,7,8
     └─ values: 2,2,2,2,2,2,2
🟢 08:05:51 INFO  📋 CONFIG   ▸ Resource loaded: thingsID.json
     ├─ entries: 1636
     ├─ bytes: 884038
     └─ path: /var/www/html/resource/json/thingsID.json
     ├─ _heroId: b891d08c-36b...
     ├─ _heroDisplayId: 1205
     ├─ _level: 3
     └─ _heroStar: 0
     ✅ [5/10] Build user data ..100 keys (39ms)
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
[DB] saveUser("guest_4cc76c..."): 100 keys, 10122 bytes
     ✅ [9/10] Database save ....5ms 💾
     🔄 [10/10] Response build ..
     ├─ original: 10122 chars
     ├─ compressed: 2396 chars
     ├─ reduction: 76%
     └─ threshold: 1024 chars
     ✅ [10/10] Response build ..OK 📤

     🏏️ SUMMARY
     👤 User ......... guest_4cc76cf292132e89
     🦸 Heroes ........ 1
     🏆 Level ......... 1
     💎 Diamond ....... 0
     📦 Fields ........ 100
     ⏱️  Duration ..... 185ms
     📦 Data .......... 2,396 chars (LZ)


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
     ├─   serverOpenDate               1779177941693
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
     └─ size ..............: 2,396 chars (LZ)

     ⏱️  TIMING
     └─ Total .............: 194ms  ███████████████████
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [2] 👤 user::getBulletinBrief  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: user
     ├─ action ............: getBulletinBrief
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/2] Validate request fields .
     └─ userId: guest_4cc76cf292132e
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
     👤 User ......... guest_4cc76cf292132e89
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 13 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 4ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [3] 🤝 friend::friendServerAction  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: friend
     ├─ action ............: friendServerAction
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/2] Route relay action .
     ├─ userId: guest_4cc76cf292132e
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
     └─ Total .............: 4ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [4] 🤝 friend::friendServerAction  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: friend
     ├─ action ............: friendServerAction
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/2] Route relay action .
     ├─ userId: guest_4cc76cf292132e
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
     └─ Total .............: 2ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [5] 🖼️ heroImage::getAll  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: heroImage
     ├─ action ............: getAll
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/2] Validate request fields .
     └─ userId: guest_4cc76cf292132e
     ✅ [1/2] Validate request fields .userId OK
     🔄 [1/1] Load userData from DB .
     ├─ heros: exists
     └─ heros._heros: exists
     ✅ [1/1] Load userData from DB .userData loaded
     🔄 [1/1] Type assert request fields .
     ✅ [1/1] Type assert request fields .type verified
     🔄 [1/1] Snapshot hero collection state .
     ├─ heroCount: 1
     └─ heroIds: b891d08c-36b7-42ee-b427-5b9b34765576
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
     👤 User ......... guest_4cc76cf292132e89
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
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/2] Validate request fields .
     ├─ userId: guest_4cc76cf292132e
     └─ heros: b891d08c-36b7-42ee-b427-5b9b34765576
     ✅ [1/2] Validate request fields .1 hero(es) requested
     🔄 [1/1] Load userData from DB .
     └─ heros._heros: 1 heroes
     ✅ [1/1] Load userData from DB .userData loaded
     🔄 [1/2] Type assert request fields .
     ✅ [1/2] Type assert request fields .types verified
     🔄 [1/1] Snapshot hero request vs found .
     ├─ requested: 1 heroes: b891d08c-36b7-42ee-b427-5b9b34765576
     ├─ found: 1 heroes: b891d08c-36b7-42ee-b427-5b9b34765576
     └─ missing: 0 heroes: (none)
     ✅ [1/1] Snapshot hero request vs found .1/1 heroes found
     🔄 [1/1] Validate hero availability .
     ✅ [1/1] Validate hero availability .all heroes found
     🔄 [1/1] Calculate hero attributes .
     ├─ heroId: b891d08c-36b7-42ee-b427-5b9b34765576
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
     👤 User ......... guest_4cc76cf292132e89
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
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/2] Validate request fields .
     └─ userId: guest_4cc76cf292132e
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
     👤 User ......... guest_4cc76cf292132e89
     📦 Fields ........ 1
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 13 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 4ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [8] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_4cc76cf292132e
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
[DB] saveUser("guest_4cc76c..."): 100 keys, 10130 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_4cc76cf292132e89
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 14ms  █
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [9] 👤 user::registChat  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: user
     ├─ action ............: registChat
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
🟢 08:05:56 INFO  ⚪ REGIST_CHAT ▸ registChat REQUEST RECEIVED
     ├─ userId: guest_4cc76cf292132e
     └─ version: 1.0
🟢 08:05:56 INFO  ⚪ REGIST_CHAT ▸ Entry check PASS — userId=guest_4cc76cf292...
🟢 08:05:56 INFO  ⚪ REGIST_CHAT ▸ Loading config for chat registration
     ├─ chatUrl: http://127.0.0.1:8002
     ├─ serverId: 1
     └─ source: DEFAULT (chatUrl not set)
🟢 08:05:56 INFO  ⚪ REGIST_CHAT ▸ Config loaded — chatUrl and serverId resolved
🟢 08:05:56 INFO  ⚪ REGIST_CHAT ▸ Loading player state for guild/room context
     ├─ userData: LOADED (100 top keys)
     ├─ guild: NO
     └─ guildRoomId: undefined (by design — updated dynamically by guild handler L114204)
🟢 08:05:56 INFO  ⚪ REGIST_CHAT ▸ Building chat registration response (6 fields)
     ├─ worldRoomId: world_1 (L114566 — ALWAYS joined)
     ├─ guildRoomId: undefined (L114568 — undefined = skip)
     ├─ teamDungeonChatRoom: undefined (L114579 — undefined = skip)
     └─ teamChatRoom: undefined (L114590 — undefined = skip)
     ├─ consumer: L114470 — 6 fields read from callback(n)
     ├─ next-step: L114480: io.connect(chatServerUrl) → TEA verify required
     ├─ post-login: L114550: chat::login → joinRoom(world, guild?, team?, dungeon?)
     └─ dynamic-update: guild L114207 | teamDungeon L136514 | team L136531
🟢 08:05:56 INFO  ⚪ REGIST_CHAT ▸ Response fields built — 6 fields total
🟢 08:05:56 INFO  ⚪ REGIST_CHAT ▸ No data mutations (configuration handler)
     ├─ type: NONE — registChat is a read-only configuration handler
     ├─ reason: Only returns chat URL and room IDs — no user data modified
     └─ trace: L114462-114470: client reads response fields, does not write back
🟢 08:05:56 INFO  ⚪ REGIST_CHAT ▸ No DB save required (configuration handler)
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
     👤 User ......... guest_4cc76cf292132e89
     📦 Fields ........ 6
     ⏱️  Duration ..... 2ms
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 83 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 7ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [10] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_4cc76cf292132e
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
[DB] saveUser("guest_4cc76c..."): 100 keys, 10130 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_4cc76cf292132e89
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
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/2] Save guide team ...
     ├─ userId: guest_4cc76cf292132e
     ├─ team: 5 hero(es)
     └─ supers: 1120561
     ✅ [1/2] Save guide team ...team=5 heroes
     🔄 [2/2] Persist team data .
[DB] saveUser("guest_4cc76c..."): 101 keys, 10245 bytes
     ✅ [2/2] Persist team data .saved to DB

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 9ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [12] ⏳ hangup::checkBattleResult  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hangup
     ├─ action ............: checkBattleResult
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/5] Validate request ..
     ├─ userId: guest_4cc76cf292132e
     ├─ isGuide: true
     ├─ battleId: (none)
     ├─ checkResult: (none)
     ├─ runaway: (none)
     └─ super: (none)
     ✅ [1/5] Validate request ..
     🔄 [2/5] Load data .........
🟢 08:05:59 INFO  📋 CONFIG   ▸ Resource loaded: lesson.json
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
[DB] saveUser("guest_4cc76c..."): 101 keys, 10319 bytes
     ✅ [5/7] Build response ....WIN rewards=5 lesson=10102

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 _battleResult            = 0  L104882: 0 == e._battleResult -> true (tutorial always win)
     ├─ 🔒 _changeInfo._items       = 5 items  L97686: getBattleAwardItems iterates _changeInfo._items for {_id, _num}
     ├─ 🔒 _curLess                 = 10102  L104892/L97751: OnHookSingleton.lastSection = e._curLess
     └─ 🔒 _maxPassLesson           = 10101  L104893/L97751: OnHookSingleton.maxPassLesson = e._maxPassLesson
     ✅ CRITICAL AUDIT: 4/4 PASSED

     🏏️ SUMMARY
     👤 User ......... guest_4cc76cf292132e89
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
     └─ Total .............: 24ms  ██
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [13] 📋 buryPoint::guideBattle  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: buryPoint
     ├─ action ............: guideBattle
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
🟢 08:06:00 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received
     ├─ userId: guest_4cc76cf292132e
     ├─ point: load
     ├─ passLesson: 10101
     └─ version: 1.0
[DB] saveUser("guest_4cc76c..."): 102 keys, 10427 bytes

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 6ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
  📊 IDLE SUMMARY — 10s no activity — fsjjbpmdajyi
══════════════════════════════════════════════════════════════════
  📊 Calls: 13  ✅ 13 OK  ⚡ 22.3ms avg  📦 3,246 chars
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [14] 📋 buryPoint::guideBattle  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: buryPoint
     ├─ action ............: guideBattle
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
🟢 08:06:11 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received
     ├─ userId: guest_4cc76cf292132e
     ├─ point: battle
     ├─ passLesson: 10101
     └─ version: 1.0
[DB] saveUser("guest_4cc76c..."): 102 keys, 10506 bytes

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 6ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [15] 📋 buryPoint::guideBattle  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: buryPoint
     ├─ action ............: guideBattle
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
🟢 08:06:12 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received
     ├─ userId: guest_4cc76cf292132e
     ├─ point: home
     ├─ passLesson: 10101
     └─ version: 1.0
[DB] saveUser("guest_4cc76c..."): 102 keys, 10583 bytes

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 5ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [16] 🏆 activity::getActivityBrief  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: activity
     ├─ action ............: getActivityBrief
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request ..
     └─ userId: guest_4cc76cf292132e...
     ✅ [1/3] Validate request ..
     🔄 [2/3] Load user data ....
     ✅ [2/3] Load user data ....
     ├─ userLevel: 1
     ├─ userCreateTime: 2026-05-19T08:05:51.396Z
     ├─ userAgeDays: 0.0 days
     ├─ serverOpenDate: 2026-05-19T08:05:41.693Z
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
     ├─   userId                       "guest_4cc76cf292132e89"
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
     └─ Total .............: 13ms  █
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [17] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_4cc76cf292132e
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
[DB] saveUser("guest_4cc76c..."): 102 keys, 10583 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_4cc76cf292132e89
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
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
🟢 08:06:18 INFO  ⚪ SUMMON-FREE ▸ summonOneFree REQUEST RECEIVED
     ├─ userId: guest_4cc76cf292132e89
     ├─ sType: 3
     └─ isGuide: true
🟢 08:06:18 INFO  📋 CONFIG   ▸ Resource loaded: summonPool.json
     ├─ entries: 200
     ├─ bytes: 75170
     └─ path: /var/www/html/resource/json/summonPool.json
🟢 08:06:18 INFO  📋 CONFIG   ▸ Resource loaded: summonRandom.json
     ├─ entries: 10
     ├─ bytes: 2157
     └─ path: /var/www/html/resource/json/summonRandom.json
     ├─ poolId: 1
     ├─ poolType: summonSuper
     ├─ freeTimer: 86400s
     └─ summonEnergyGain: 10
🟢 08:06:18 INFO  ⚪ SUMMON-FREE ▸ Free timer OK — proceeding with summon
🟢 08:06:18 INFO  ⚪ SUMMON-FREE ▸ [GUIDE] Predetermined hero: displayId=1309 quality=purple
     ├─ heroInstanceId: 39e0dafb-77f...
     ├─ displayId: 1309
     ├─ heroName: hero_name_31
     ├─ quality: purple
     ├─ heroColor: 4
     └─ heroType: body
     ├─ oldEnergy: 0
     ├─ newEnergy: 10
     ├─ energyGained: 10
     ├─ freeTimeField: _canSuperFreeTime
     ├─ newFreeTime: 2026-05-20T08:06:18.414Z
     ├─ summonTimes[1]: 1
     └─ totalHeroes: 2
[DB] saveUser("guest_4cc76c..."): 102 keys, 11274 bytes
🟢 08:06:18 INFO  ⚪ SUMMON-FREE ▸ User data SAVED
🟢 08:06:18 INFO  ⚪ SUMMON-FREE ▸ summonOneFree SUCCESS

     🏏️ SUMMARY
     👤 User ......... guest_4cc76cf292132e89
     📦 Fields ........ [object Object]
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 767 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 15ms  █
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [19] 🦸 hero::getAttrs  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hero
     ├─ action ............: getAttrs
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/2] Validate request fields .
     ├─ userId: guest_4cc76cf292132e
     └─ heros: 39e0dafb-77f7-48dc-9501-aa55b19d727b
     ✅ [1/2] Validate request fields .1 hero(es) requested
     🔄 [1/1] Load userData from DB .
     └─ heros._heros: 2 heroes
     ✅ [1/1] Load userData from DB .userData loaded
     🔄 [1/2] Type assert request fields .
     ✅ [1/2] Type assert request fields .types verified
     🔄 [1/1] Snapshot hero request vs found .
     ├─ requested: 1 heroes: 39e0dafb-77f7-48dc-9501-aa55b19d727b
     ├─ found: 1 heroes: 39e0dafb-77f7-48dc-9501-aa55b19d727b
     └─ missing: 0 heroes: (none)
     ✅ [1/1] Snapshot hero request vs found .1/1 heroes found
     🔄 [1/1] Validate hero availability .
     ✅ [1/1] Validate hero availability .all heroes found
     🔄 [1/1] Calculate hero attributes .
     ├─ heroId: 39e0dafb-77f7-48dc-9501-aa55b19d727b
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
     👤 User ......... guest_4cc76cf292132e89
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
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_4cc76cf292132e
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
[DB] saveUser("guest_4cc76c..."): 102 keys, 11274 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_4cc76cf292132e89
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 10ms  █
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [21] ✨ summon::summonOneFree  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: summon
     ├─ action ............: summonOneFree
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
🟢 08:06:23 INFO  ⚪ SUMMON-FREE ▸ summonOneFree REQUEST RECEIVED
     ├─ userId: guest_4cc76cf292132e89
     ├─ sType: 1
     └─ isGuide: true
     ├─ poolId: 3
     ├─ poolType: summonNormal
     ├─ freeTimer: 21600s
     └─ summonEnergyGain: 0
🟢 08:06:23 INFO  ⚪ SUMMON-FREE ▸ Free timer OK — proceeding with summon
🟢 08:06:23 INFO  ⚪ SUMMON-FREE ▸ [GUIDE] Predetermined hero: displayId=1206 quality=blue
     ├─ heroInstanceId: 49bc7d9b-426...
     ├─ displayId: 1206
     ├─ heroName: hero_name_17
     ├─ quality: blue
     ├─ heroColor: 3
     └─ heroType: skill
     ├─ oldEnergy: 10
     ├─ newEnergy: 10
     ├─ energyGained: 0
     ├─ freeTimeField: _canCommonFreeTime
     ├─ newFreeTime: 2026-05-19T14:06:23.061Z
     ├─ summonTimes[3]: 1
     └─ totalHeroes: 3
[DB] saveUser("guest_4cc76c..."): 102 keys, 11964 bytes
🟢 08:06:23 INFO  ⚪ SUMMON-FREE ▸ User data SAVED
🟢 08:06:23 INFO  ⚪ SUMMON-FREE ▸ summonOneFree SUCCESS

     🏏️ SUMMARY
     👤 User ......... guest_4cc76cf292132e89
     📦 Fields ........ [object Object]
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 767 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 8ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [22] 🦸 hero::getAttrs  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hero
     ├─ action ............: getAttrs
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/2] Validate request fields .
     ├─ userId: guest_4cc76cf292132e
     └─ heros: 49bc7d9b-426a-4a73-a1e6-0c73e5e56f67
     ✅ [1/2] Validate request fields .1 hero(es) requested
     🔄 [1/1] Load userData from DB .
     └─ heros._heros: 3 heroes
     ✅ [1/1] Load userData from DB .userData loaded
     🔄 [1/2] Type assert request fields .
     ✅ [1/2] Type assert request fields .types verified
     🔄 [1/1] Snapshot hero request vs found .
     ├─ requested: 1 heroes: 49bc7d9b-426a-4a73-a1e6-0c73e5e56f67
     ├─ found: 1 heroes: 49bc7d9b-426a-4a73-a1e6-0c73e5e56f67
     └─ missing: 0 heroes: (none)
     ✅ [1/1] Snapshot hero request vs found .1/1 heroes found
     🔄 [1/1] Validate hero availability .
     ✅ [1/1] Validate hero availability .all heroes found
     🔄 [1/1] Calculate hero attributes .
     ├─ heroId: 49bc7d9b-426a-4a73-a1e6-0c73e5e56f67
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
     👤 User ......... guest_4cc76cf292132e89
     📦 Fields ........ 2
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 396 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 2ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [23] 🏆 activity::getActivityBrief  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: activity
     ├─ action ............: getActivityBrief
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request ..
     └─ userId: guest_4cc76cf292132e...
     ✅ [1/3] Validate request ..
     🔄 [2/3] Load user data ....
     ✅ [2/3] Load user data ....
     ├─ userLevel: 1
     ├─ userCreateTime: 2026-05-19T08:05:51.396Z
     ├─ userAgeDays: 0.0 days
     ├─ serverOpenDate: 2026-05-19T08:05:41.693Z
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
     ├─   userId                       "guest_4cc76cf292132e89"
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
     └─ Total .............: 12ms  █
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [24] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_4cc76cf292132e
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
[DB] saveUser("guest_4cc76c..."): 102 keys, 11964 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_4cc76cf292132e89
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 10ms  █
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [25] 🦸 hero::autoLevelUp  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hero
     ├─ action ............: autoLevelUp
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/4] Auto Level Up .....
     ├─ userId: guest_4cc76cf292132e
     ├─ heroId: 39e0dafb-77f7-48dc-9501-aa55b19d727b
     └─ times: 1
     ├─ maxTimes: 1
     └─ heroId: 39e0dafb-77f7-48dc-9501-aa55b19d727b
     ✅ [1/4] Auto Level Up .....heroId=39e0dafb-77f7-48dc-9501-aa55b19d727b, times=1
     🔄 [2/4] Load hero data ....
     ├─ heroId: 39e0dafb-77f7-48dc-9501-aa55b19d727b
     ├─ displayId: 1309
     └─ currentLevel: 1
     🔄 [3/4] Calculate level up .
     ├─ heroQuality: purple
     ├─ heroType: body
     └─ configTable: heroLevelUpPurple
     ├─ expCapsule (131): 1000
     └─ gold (102): 1000
🟢 08:06:30 INFO  📋 CONFIG   ▸ Resource loaded: heroLevelUpPurple.json
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
[DB] saveUser("guest_4cc76c..."): 102 keys, 11962 bytes
     ├─ heroLevel: 2
     ├─ expCapsule: 982
     └─ gold: 919
     ├─ hp: 3371
     ├─ attack: 105
     ├─ armor: 192
     └─ power: 4046
     ✅ [4/4] Save data & build response .ret=0, heroId=39e0dafb-77f7-48dc-9501-aa55b19d727b, lvl 1→2

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 heroId                   = 39e0dafb-77f7-48dc-9501-aa55b19d727b  L133741: getHero(e.heroId) — REQUIRED
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
     └─ Total .............: 23ms  ██
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [26] 🦸 hero::autoLevelUp  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hero
     ├─ action ............: autoLevelUp
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/4] Auto Level Up .....
     ├─ userId: guest_4cc76cf292132e
     ├─ heroId: 39e0dafb-77f7-48dc-9501-aa55b19d727b
     └─ times: 1
     ├─ maxTimes: 1
     └─ heroId: 39e0dafb-77f7-48dc-9501-aa55b19d727b
     ✅ [1/4] Auto Level Up .....heroId=39e0dafb-77f7-48dc-9501-aa55b19d727b, times=1
     🔄 [2/4] Load hero data ....
     ├─ heroId: 39e0dafb-77f7-48dc-9501-aa55b19d727b
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
[DB] saveUser("guest_4cc76c..."): 102 keys, 11962 bytes
     ├─ heroLevel: 3
     ├─ expCapsule: 946
     └─ gold: 784
     ├─ hp: 3606
     ├─ attack: 118
     ├─ armor: 230
     └─ power: 4332
     ✅ [4/4] Save data & build response .ret=0, heroId=39e0dafb-77f7-48dc-9501-aa55b19d727b, lvl 2→3

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 heroId                   = 39e0dafb-77f7-48dc-9501-aa55b19d727b  L133741: getHero(e.heroId) — REQUIRED
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
     └─ Total .............: 11ms  █
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [27] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_4cc76cf292132e
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
[DB] saveUser("guest_4cc76c..."): 102 keys, 11962 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_4cc76cf292132e89
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 7ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [28] 🦸 hero::autoLevelUp  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hero
     ├─ action ............: autoLevelUp
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/4] Auto Level Up .....
     ├─ userId: guest_4cc76cf292132e
     ├─ heroId: 49bc7d9b-426a-4a73-a1e6-0c73e5e56f67
     └─ times: 1
     ├─ maxTimes: 1
     └─ heroId: 49bc7d9b-426a-4a73-a1e6-0c73e5e56f67
     ✅ [1/4] Auto Level Up .....heroId=49bc7d9b-426a-4a73-a1e6-0c73e5e56f67, times=1
     🔄 [2/4] Load hero data ....
     ├─ heroId: 49bc7d9b-426a-4a73-a1e6-0c73e5e56f67
     ├─ displayId: 1206
     └─ currentLevel: 1
     🔄 [3/4] Calculate level up .
     ├─ heroQuality: blue
     ├─ heroType: skill
     └─ configTable: heroLevelUpBlue
     ├─ expCapsule (131): 946
     └─ gold (102): 784
🟢 08:06:32 INFO  📋 CONFIG   ▸ Resource loaded: heroLevelUpBlue.json
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
[DB] saveUser("guest_4cc76c..."): 102 keys, 11962 bytes
     ├─ heroLevel: 2
     ├─ expCapsule: 930
     └─ gold: 712
     ├─ hp: 1408
     ├─ attack: 291
     ├─ armor: 256
     └─ power: 2315
     ✅ [4/4] Save data & build response .ret=0, heroId=49bc7d9b-426a-4a73-a1e6-0c73e5e56f67, lvl 1→2

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 heroId                   = 49bc7d9b-426a-4a73-a1e6-0c73e5e56f67  L133741: getHero(e.heroId) — REQUIRED
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
     └─ Total .............: 7ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [29] 🦸 hero::autoLevelUp  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hero
     ├─ action ............: autoLevelUp
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/4] Auto Level Up .....
     ├─ userId: guest_4cc76cf292132e
     ├─ heroId: 49bc7d9b-426a-4a73-a1e6-0c73e5e56f67
     └─ times: 1
     ├─ maxTimes: 1
     └─ heroId: 49bc7d9b-426a-4a73-a1e6-0c73e5e56f67
     ✅ [1/4] Auto Level Up .....heroId=49bc7d9b-426a-4a73-a1e6-0c73e5e56f67, times=1
     🔄 [2/4] Load hero data ....
     ├─ heroId: 49bc7d9b-426a-4a73-a1e6-0c73e5e56f67
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
[DB] saveUser("guest_4cc76c..."): 102 keys, 11962 bytes
     ├─ heroLevel: 3
     ├─ expCapsule: 898
     └─ gold: 592
     ├─ hp: 1576
     ├─ attack: 308
     ├─ armor: 307
     └─ power: 2551
     ✅ [4/4] Save data & build response .ret=0, heroId=49bc7d9b-426a-4a73-a1e6-0c73e5e56f67, lvl 2→3

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 heroId                   = 49bc7d9b-426a-4a73-a1e6-0c73e5e56f67  L133741: getHero(e.heroId) — REQUIRED
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
     └─ Total .............: 6ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [30] 🏆 activity::getActivityBrief  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: activity
     ├─ action ............: getActivityBrief
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request ..
     └─ userId: guest_4cc76cf292132e...
     ✅ [1/3] Validate request ..
     🔄 [2/3] Load user data ....
     ✅ [2/3] Load user data ....
     ├─ userLevel: 1
     ├─ userCreateTime: 2026-05-19T08:05:51.396Z
     ├─ userAgeDays: 0.0 days
     ├─ serverOpenDate: 2026-05-19T08:05:41.693Z
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
     ├─   userId                       "guest_4cc76cf292132e89"
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
     └─ Total .............: 13ms  █
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [31] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_4cc76cf292132e
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
[DB] saveUser("guest_4cc76c..."): 102 keys, 11962 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_4cc76cf292132e89
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 10ms  █
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [32] ⏳ hangup::saveGuideTeam  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hangup
     ├─ action ............: saveGuideTeam
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/2] Save guide team ...
     ├─ userId: guest_4cc76cf292132e
     ├─ team: 5 hero(es)
     └─ supers: 
     ✅ [1/2] Save guide team ...team=5 heroes
     🔄 [2/2] Persist team data .
[DB] saveUser("guest_4cc76c..."): 102 keys, 12043 bytes
     ✅ [2/2] Persist team data .saved to DB

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 12ms  █
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [33] ⏳ hangup::checkBattleResult  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hangup
     ├─ action ............: checkBattleResult
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/5] Validate request ..
     ├─ userId: guest_4cc76cf292132e
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
🟢 08:06:39 INFO  ⚪ BATTLE-RESULT ▸ [FIX-008] Notify push sent — mainTaskChange
[DB] saveUser("guest_4cc76c..."): 102 keys, 12106 bytes
     ✅ [5/7] Build response ....WIN rewards=5 lesson=10103

     🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
     ├─ 🔒 _battleResult            = 0  L104882: 0 == e._battleResult -> true (tutorial always win)
     ├─ 🔒 _changeInfo._items       = 5 items  L97686: getBattleAwardItems iterates _changeInfo._items for {_id, _num}
     ├─ 🔒 _curLess                 = 10103  L104892/L97751: OnHookSingleton.lastSection = e._curLess
     └─ 🔒 _maxPassLesson           = 10102  L104893/L97751: OnHookSingleton.maxPassLesson = e._maxPassLesson
     ✅ CRITICAL AUDIT: 4/4 PASSED

     🏏️ SUMMARY
     👤 User ......... guest_4cc76cf292132e89
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
     └─ Total .............: 8ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [34] 📋 buryPoint::guideBattle  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: buryPoint
     ├─ action ............: guideBattle
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
🟢 08:06:40 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received
     ├─ userId: guest_4cc76cf292132e
     ├─ point: load
     ├─ passLesson: 10102
     └─ version: 1.0
[DB] saveUser("guest_4cc76c..."): 102 keys, 12183 bytes

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 6ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
  📊 IDLE SUMMARY — 10s no activity — fsjjbpmdajyi
══════════════════════════════════════════════════════════════════
  📊 Calls: 34  ✅ 34 OK  ⚡ 14.2ms avg  📦 10,615 chars
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [35] 📋 buryPoint::guideBattle  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: buryPoint
     ├─ action ............: guideBattle
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
🟢 08:07:02 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received
     ├─ userId: guest_4cc76cf292132e
     ├─ point: battle
     ├─ passLesson: 10102
     └─ version: 1.0
[DB] saveUser("guest_4cc76c..."): 102 keys, 12262 bytes

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 7ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [36] 📋 buryPoint::guideBattle  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: buryPoint
     ├─ action ............: guideBattle
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
🟢 08:07:02 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received
     ├─ userId: guest_4cc76cf292132e
     ├─ point: home
     ├─ passLesson: 10102
     └─ version: 1.0
[DB] saveUser("guest_4cc76c..."): 102 keys, 12339 bytes

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 5ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [37] 🏆 activity::getActivityBrief  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: activity
     ├─ action ............: getActivityBrief
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request ..
     └─ userId: guest_4cc76cf292132e...
     ✅ [1/3] Validate request ..
     🔄 [2/3] Load user data ....
     ✅ [2/3] Load user data ....
     ├─ userLevel: 1
     ├─ userCreateTime: 2026-05-19T08:05:51.396Z
     ├─ userAgeDays: 0.0 days
     ├─ serverOpenDate: 2026-05-19T08:05:41.693Z
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
     ├─   userId                       "guest_4cc76cf292132e89"
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
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_4cc76cf292132e
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
[DB] saveUser("guest_4cc76c..."): 102 keys, 12339 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_4cc76cf292132e89
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
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_4cc76cf292132e
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
[DB] saveUser("guest_4cc76c..."): 102 keys, 12339 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_4cc76cf292132e89
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 7ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [40] ⏳ hangup::gain  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: hangup
     ├─ action ............: gain
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/8] Validate request ..
     ├─ userId: guest_4cc76cf292132e
     └─ version: 1.0
     ✅ [1/8] Validate request ..
     🔄 [2/8] Load data .........
🟢 08:07:04 INFO  📋 CONFIG   ▸ Resource loaded: idleVipPlus.json
     ├─ entries: 18
     ├─ bytes: 1418
     └─ path: /var/www/html/resource/json/idleVipPlus.json
🟢 08:07:04 INFO  📋 CONFIG   ▸ Resource loaded: idleAwardFirst.json
     ├─ entries: 3
     ├─ bytes: 182
     └─ path: /var/www/html/resource/json/idleAwardFirst.json
🟢 08:07:04 INFO  📋 CONFIG   ▸ Resource loaded: lessonIdleAward.json
     ├─ entries: 611
     ├─ bytes: 1143151
     └─ path: /var/www/html/resource/json/lessonIdleAward.json
🟢 08:07:04 INFO  📋 CONFIG   ▸ Resource loaded: userUpgrade.json
     ├─ entries: 299
     ├─ bytes: 16357
     └─ path: /var/www/html/resource/json/userUpgrade.json
     ✅ [2/8] Load data .........lesson=611, everyTime=300s, maxIdle=28800s, maxLevel=300, firstBonus=3, idleAwardKeys=611, upgradeLevels=299
     🔄 [3/8] Calculate idle time .
     ├─ lastGainTime: 1779177951396
     ├─ now: 1779178024999
     ├─ elapsedRaw: 73s
     ├─ elapsedCapped: 73s (max 28800s)
     ├─ exCount: 0 ticks (300s each)
     └─ vipLevel: 0
     ✅ [3/8] Calculate idle time .73s, 0 ticks
     🔄 [4/8] Lesson config & bonus .
     ├─ curLess: 10103
     ├─ lessonName: 3
     ├─ idleAwardPlus: 0
     ├─ globalWarBuff: 0 (inactive)
     └─ bonusMultiplier: 1
     ✅ [4/8] Lesson config & bonus .lesson=10103, mult=1
     🔄 [5/8] Calculate rewards .
     └─ id=102 +212 (2.90416666666667/s x 73s x 1): undefined
     └─ id=103 +25 (0.3425/s x 73s x 1): undefined
     └─ id=131 +58 (0.794722222222222/s x 73s x 1): undefined
     └─ id=102 +1000: undefined
     └─ id=103 +20: undefined
     └─ id=131 +500: undefined
     ✅ [5/8] Calculate rewards .deterministic=3, randomDrops=0, firstBonus=3, totalItems=3
     🔄 [6/8] Level-up cascade ..
     ├─ oldLevel: 1
     ├─ newLevel: 2
     ├─ levelsGained: 1
     └─ expTotal: 104
     ✅ [6/8] Level-up cascade ..LEVELED UP 1 -> 2
     🔄 [7/8] Save & respond ....
[DB] saveUser("guest_4cc76c..."): 102 keys, 12341 bytes
     ✅ [7/8] Save & respond ....
     🔄 [8/8] Build response ....
     └─ totalProps._items[102] (GOLD): 1692 gold → 2904 gold (+1212 gold) [IDLE-GAIN]
     └─ totalProps._items[103] (EXP): 59 exp → 104 exp (+45 exp) [IDLE-GAIN]
     ✅ [8/8] Build response ....4 items, LEVEL UP 1->2

     📸 HANGUP GAIN ret=0
     ├─   type                         "hangup"
     ├─   action                       "gain"
     ├─   userId                       "guest_4cc76cf292132e89"
     ├─   version                      "1.0"
     ├─   _changeInfo                  Object{1}
     ├─   _lastGainTime                1779177951396
     └─   _clickGlobalWarBuffTag       ""

     🏏️ SUMMARY
     👤 User ......... guest_4cc76cf292132e89
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 284 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 66ms  ██████
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [41] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_4cc76cf292132e
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
[DB] saveUser("guest_4cc76c..."): 102 keys, 12341 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_4cc76cf292132e89
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 6ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [42] 🛠️ equip::wearAuto  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: equip
     ├─ action ............: wearAuto
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/8] Validate request fields .
     ├─ userId: guest_4cc76cf292132e...
     ├─ heroId: 39e0dafb-77f7-48dc-9501-aa55b19d727b
     ├─ equipInfo: 1,2,3,4
     └─ weaponId: (none)
     ✅ [1/8] Validate request fields .userId + heroId present
     🔄 [2/8] Load resource JSONs .
🟢 08:07:10 INFO  📋 CONFIG   ▸ Resource loaded: equip.json
     ├─ entries: 84
     ├─ bytes: 44152
     └─ path: /var/www/html/resource/json/equip.json
🟢 08:07:10 INFO  📋 CONFIG   ▸ Resource loaded: equipSuit.json
     ├─ entries: 15
     ├─ bytes: 8619
     └─ path: /var/www/html/resource/json/equipSuit.json
🟢 08:07:10 INFO  📋 CONFIG   ▸ Resource loaded: weapon.json
     ├─ entries: 20
     ├─ bytes: 3725
     └─ path: /var/www/html/resource/json/weapon.json
     ✅ [2/8] Load resource JSONs .8 JSONs loaded
     🔄 [3/8] Load userData from DB .
     ✅ [3/8] Load userData from DB .userData loaded
     🔄 [4/8] Validate hero exists .
     ├─ heroId: 39e0dafb-77f7-48dc-9501-aa55b19d727b
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
     ├─ hp: 8512
     ├─ attack: 388
     ├─ armor: 230
     └─ power: 4332
     ✅ [8/8] Calculate total attributes .power=4332
[DB] saveUser("guest_4cc76c..."): 102 keys, 12828 bytes
🟢 08:07:10 INFO  ⚪ WEAR_AUTO ▸ equip::wearAuto SUCCESS
     ├─ userId: guest_4cc76cf292132e...
     ├─ heroId: 39e0dafb-77f7-48dc-9501-aa55b19d727b
     ├─ equips: 4
     ├─ weapon: (none)
     ├─ power: 4332
     └─ duration: 35ms
     ├─ original: 1833 chars
     ├─ compressed: 379 chars
     ├─ reduction: 79%
     └─ threshold: 1024 chars

     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 379 chars (LZ)

     ⏱️  TIMING
     └─ Total .............: 41ms  ████
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [43] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_4cc76cf292132e
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
[DB] saveUser("guest_4cc76c..."): 102 keys, 12828 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_4cc76cf292132e89
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 8ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [44] 🏆 activity::getActivityBrief  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: activity
     ├─ action ............: getActivityBrief
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request ..
     └─ userId: guest_4cc76cf292132e...
     ✅ [1/3] Validate request ..
     🔄 [2/3] Load user data ....
     ✅ [2/3] Load user data ....
     ├─ userLevel: 2
     ├─ userCreateTime: 2026-05-19T08:05:51.396Z
     ├─ userAgeDays: 0.0 days
     ├─ serverOpenDate: 2026-05-19T08:05:41.693Z
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
     ├─   userId                       "guest_4cc76cf292132e89"
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
     └─ Total .............: 13ms  █
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
▼ [45] 🎯 guide::saveGuide  —  ⚡—  📦—
══════════════════════════════════════════════════════════════════

     📕 REQUEST
     ├─ type ..............: guide
     ├─ action ............: saveGuide
     ├─ userId ............: guest_4cc76cf292132e89
     └─ serverId ..........: (missing)
     🔄 [1/3] Validate request fields .
     ├─ userId: guest_4cc76cf292132e
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
[DB] saveUser("guest_4cc76c..."): 102 keys, 12837 bytes

     📸 saveGuide ret=0

     🏏️ SUMMARY
     👤 User ......... guest_4cc76cf292132e89
     📦 Data .......... 0 chars (RAW)


     📤 RESPONSE
     ├─ ret ...............: 0
     ├─ fields ............: (raw string)
     └─ size ..............: 2 chars (RAW)

     ⏱️  TIMING
     └─ Total .............: 6ms  
══════════════════════════════════════════════════════════════════
══════════════════════════════════════════════════════════════════
  📊 IDLE SUMMARY — 10s no activity — fsjjbpmdajyi
══════════════════════════════════════════════════════════════════
  📊 Calls: 45  ✅ 45 OK  ⚡ 14.6ms avg  📦 12,842 chars
══════════════════════════════════════════════════════════════════
