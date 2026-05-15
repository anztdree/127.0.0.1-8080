```
[DB] Loaded 6 records from /var/www/html/server/main-server/data/main_server.json (67260 bytes)
🟢 06:58:27.690 INFO  📋 CONFIG   ▸ serverOpenDate auto-initialized: 1778828307690

  ┌─ LOADING RESOURCES ───────────────────────────────────┐

🟢 06:58:27.694 INFO  📋 CONFIG   ▸ Resource loaded: constant.json
  ├ 📋 entries: 1
  ├ 📋 bytes: 17728
  └ 📋 path: /var/www/html/resource/json/constant.json
🟢 06:58:27.734 INFO  📋 CONFIG   ▸ Resource loaded: hero.json
  ├ 📋 entries: 887
  ├ 📋 bytes: 1467869
  └ 📋 path: /var/www/html/resource/json/hero.json
🟢 06:58:27.737 INFO  📋 CONFIG   ▸ Resource loaded: summon.json
  ├ 📋 entries: 4
  ├ 📋 bytes: 736
  └ 📋 path: /var/www/html/resource/json/summon.json
🟢 06:58:27.741 INFO  📋 CONFIG   ▸ Resource loaded: heroLevelAttr.json
  ├ 📋 entries: 360
  ├ 📋 bytes: 32275
  └ 📋 path: /var/www/html/resource/json/heroLevelAttr.json
🟢 06:58:27.743 INFO  📋 CONFIG   ▸ Resource loaded: heroTypeParam.json
  ├ 📋 entries: 13
  ├ 📋 bytes: 2241
  └ 📋 path: /var/www/html/resource/json/heroTypeParam.json
🟢 06:58:27.745 INFO  📋 CONFIG   ▸ Resource loaded: heroQualityParam.json
  ├ 📋 entries: 7
  ├ 📋 bytes: 746
  └ 📋 path: /var/www/html/resource/json/heroQualityParam.json
🟢 06:58:27.749 INFO  📋 CONFIG   ▸ Resource loaded: heroPower.json
  ├ 📋 entries: 403
  ├ 📋 bytes: 43864
  └ 📋 path: /var/www/html/resource/json/heroPower.json
🟢 06:58:27.751 INFO  📋 CONFIG   ▸ Resource loaded: zPowerQualityPara.json
  ├ 📋 entries: 7
  ├ 📋 bytes: 484
  └ 📋 path: /var/www/html/resource/json/zPowerQualityPara.json

  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─


  ╔════════════════════════════════════════════════════════════╗
  ║  SUPER WARRIOR Z — MAIN SERVER                             ║
  ╚════════════════════════════════════════════════════════════╝


  │ Port             : 8001
  │ Socket.IO        : 2.5.1
  │ TEA              : ON (verification)
  │ DB               : /var/www/html/server/main-server/data/main_server.json
  │ SDK API          : http://127.0.0.1:9999
  │ server0Time      : 25200000
  │ serverOpenDate   : 1778828307690
  │ resourcePath     : /var/www/html/resource/json
  │ chatUrl          : http://127.0.0.1:8002
  │ dungeonUrl       : http://127.0.0.1:8003
  └ LOG_LEVEL        : INFO

  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─

🟢 06:58:27.808 INFO  📋 CONFIG   ▸ Resource JSON status:
  │ constant.json            : 1 entries
  │ hero.json                : 887 entries
  │ summon.json              : 4 entries
  │ heroLevelAttr.json       : 360 entries
  │ heroTypeParam.json       : 13 entries
  │ heroQualityParam.json    : 7 entries
  │ zPowerQualityPara.json   : 7 entries
  └ heroPower.json           : 403 entries
  ══════════════════════════════════════════════════════════

🟢 06:58:27.809 INFO  ⚙️ HANDLER  ▸ Registered action handlers:

  ├ >> user::enterGame  handlers/user/enterGame.js
  ├ >> user::registChat  handlers/user/registChat.js
  ├ >> user::getBulletinBrief  handlers/user/getBulletinBrief.js
  ├ >> user::readBulletin  handlers/user/readBulletin.js
  ├ >> friend::friendServerAction  handlers/friend/friendServerAction.js
  ├ >> heroImage::getAll  handlers/heroImage/getAll.js
  ├ >> hero::getAttrs  handlers/hero/getAttrs.js
  ├ >> userMsg::getMsgList  handlers/userMsg/getMsgList.js
  ├ >> userMsg::getMsg  handlers/userMsg/getMsg.js
  ├ >> userMsg::sendMsg  handlers/userMsg/sendMsg.js
  ├ >> userMsg::readMsg  handlers/userMsg/readMsg.js
  ├ >> userMsg::delFriendMsg  handlers/userMsg/delFriendMsg.js
  ├ >> guide::saveGuide  handlers/guide/saveGuide.js
  ├ >> hangup::saveGuideTeam  handlers/hangup/saveGuideTeam.js
  ├ >> hangup::checkBattleResult  handlers/hangup/checkBattleResult.js
  ├ >> buryPoint::guideBattle  handlers/buryPoint/guideBattle.js
  └ >> summon::summonOneFree  handlers/summon/summonOneFree.js

  └ 📋 total: 17

  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─


🟢 06:58:27.810 INFO  🚀 SERVER   ▸ Ready — listening on http://127.0.0.1:8001
🟢 06:58:27.810 INFO  🚀 SERVER   ▸ Waiting for Socket.IO connections...


  ➕ NEW CONNECTION ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
  ├ 🔗 id: hNWNBz0VV0Zzl3QmAAAA
  ├ 🔗 ip: ::ffff:127.0.0.1
  └ 🔗 transport: polling
  ├ 🔗 socketId: hNWNBz0VV0Zzl3QmAAAA
  ├ 🔗 ip: ::ffff:127.0.0.1
  ├ 🔗 transport: polling
  ├ 🔗 totalSessions: 1
  └ 🔗 activeUsers: 0
🟢 06:58:51.384 INFO  🔐 TEA      ▸ Sending verify challenge
  ├ 📋 challenge: d08ac4b5-7cbe-4b9f-956a-d23b44bf3691
  └ 📋 socketId: hNWNBz0VV0Zzl3Qm...
  ├ 📋 type: string
  └ 📋 length: 48
🟢 06:58:51.459 INFO  🔐 TEA      ▸ TEA verification SUCCESS
  ├ 📋 socketId: hNWNBz0VV0Zzl3Qm...
  ├ 📋 duration: 13ms
  └ 📋 transport: polling
  ├ 📋 socketId: hNWNBz0VV0Zzl3Qm...
  ├ 📋 from: polling
  └ 📋 to: websocket

  📤 user::enterGame        ──────────────────────────────────
  ├ 📤 action: enterGame
  ├ 📤 type: user
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 counter: 1
  └ 📤 serverId: 1

  ┌────────────────────────────────────────────────────────┐
  │  📤 REQUEST PAYLOAD                                      │
  ├────────────────────────────────────────────────────────┤
  │   type                 "user"
  │   action               "enterGame"
  │   loginToken           "224c620d7589199f4aaabe7761c7a8f0"
  │   userId               "guest_9e4fb9520954e69b"
  │   serverId             1
  │   version              "1.0"
  │   language             "en"
  └   gameVersion          "2026-03-02143147"
  └────────────────────────────────────────────────────────┘

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: enterGame  (user/enterGame)  userId=guest_9e4fb95209
  ══════════════════════════════════════════════════════════


  [01/10] 🟢 ENTRY CHECK


  ┌────────────────────────────────────────────────────────┐
  │  📤 REQUEST PAYLOAD                                      │
  ├────────────────────────────────────────────────────────┤
  │   type                 "user"
  │   action               "enterGame"
  │   loginToken           "224c620d7589199f4aaabe7761c7a8f0"
  │   userId               "guest_9e4fb9520954e69b"
  │   serverId             1
  │   version              "1.0"
  │   language             "en"
  └   gameVersion          "2026-03-02143147"
  └────────────────────────────────────────────────────────┘
🟢 06:58:51.551 INFO  ⚔️ ENTER    ▸ enterGame REQUEST RECEIVED
  ├ 📤 userId: guest_9e4fb9520954e69b
  ├ 📤 serverId: 1
  ├ 📤 loginToken: 224c620d7589199...
  ├ 📤 version: 1.0
  ├ 📤 gameVersion: 2026-03-02143147
  └ 📤 language: en
  [ 1/10] 🔄 Required fields validation  █░░░░░░░░░
  [ 1/10] ✅ Required fields validation  █░░░░░░░░░  All 3 present

  [02/10] 📦 DATA INJECTION CHECK

  [ 2/10] 🔄 Token auth via SDK-Server  ██░░░░░░░░
🟢 06:58:51.573 INFO  📡 SDKAPI   ▸ User verified via SDK-Server
  ├ 📥 userId: guest_9e4fb9520954e69b
  ├ 📥 httpStatus: 200
  ├ 📥 bodySize: 268 bytes
  └ 📥 duration: 21ms
  [ 2/10] ✅ Token auth via SDK-Server  ██░░░░░░░░  25ms
  [ 3/10] 🔄 ServerId validation  ███░░░░░░░
  [ 3/10] ✅ ServerId validation  ███░░░░░░░  1 == 1

  [03/10] 🔍 DEEP TYPE SCAN

  [ 4/10] 🔄 Request type validation  ████░░░░░░
  ├ ✅ request.userId: string — PASS

  ┌──────────────────────────────────────────────────────────────┐
  │  ❌ FATAL ERROR AT STEP Server selection                    │
  │                                                              │
  │  STEP:   ENTER-TYPESCAN                                      │
  │  REASON: TYPE ASSERTION FAILED: request.serverId             │
  │  DETAIL: Server selection                                    │
  │  CLIENT: ctx.config.serverId                                 │
  │                                                              │
  │  IMPACT:  serverId must be string for parseInt comparison     │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘

  ├ ❌ field: request.serverId
  ├ ❌ expected: string
  ├ ❌ actual: number
  └ ❌ value: 1
  ├ ✅ request.loginToken: string — PASS
  [ 4/10] ✅ Request type validation  ████░░░░░░  2/2 passed

  [04/10] ⚡ PLAYER STATE SNAPSHOT

  [ 5/10] 🔄 Database lookup  █████░░░░░
  [ 5/10] 🌟 Database lookup  █████░░░░░  NEW USER — no existing data
  ├ 📋 userId: guest_9e4fb9520954e69b
  ├ 📋 status: NEW — first login
  └ 📋 dbResult: null (no record found)

  [05/10] 🧮 INVARIANT CHECK

  [ 6/10] 🔄 Config & resource invariants  ██████░░░░
  ├ ✅ config.serverId loaded — PASS

  ⚠️  INVARIANT VIOLATION: config.serverVersion loaded
       SOURCE: ENTER-INVARIANT UserInfoSingleton.serverVersion → e.serverVersion
       REASON: Expected: truthy (string), Got: MISSING — Client displays wrong version info

  ├ ✅ config.serverOpenDate loaded — PASS
  ├ ✅ config.currency loaded — PASS
  ├ ✅ constant.json loaded for new user build — PASS
  [ 6/10] ✅ Config & resource invariants  ██████░░░░  All server configs verified

  [06/10] 🔮 MAIN PROCESS

  [ 7/10] 🔄 Build/Load user data  ███████░░░
  ├ 📋 constantKeys: 505
  ├ 📋 heroEntries: 887
  └ 📋 summonPools: 4
  ├ 🦸 startHero: 1205
  ├ 🦸 startHeroLevel: 3
  ├ 🦸 heroInstanceId: de4c6801-834...
  ├ 🦸 heroConfigFound: true
  └ 🦸 heroName: hero_name_15
  ├ 💰 startDiamond: 0
  ├ 💰 startGold: 0
  ├ 💰 startUserExp: 0
  └ 💰 startUserLevel: 1
  ├ 📋 types: 1,2,4,5,6,7,8
  └ 📋 values: 2,2,2,2,2,2,2
  ├ 📋 _heroId: de4c6801-834...
  ├ 📋 _heroDisplayId: 1205
  ├ 📋 _level: 3
  └ 📋 _heroStar: 0
  ├ ✅ summon._energy = 0 for new user — PASS
  ├ ✅ summon._canCommonFreeTime = now (ready for first summon) — PASS
  ├ ✅ summon._canSuperFreeTime = now (ready for first summon) — PASS
  ├ ✅ summonTimes covers ALL summon pools — PASS
  [ 7/10] ✅ Build/Load user data  ███████░░░  100 keys (5ms)
  [ 8/10] 🔄 Circular reference safety  ████████░░
  [ 8/10] ✅ Circular reference safety  ████████░░  0 circular refs

  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 lastTeam[9]._team        = {0}  EMPTY — tutorial safe (guide 2106)
  ├ 🔒 training._award          = null  present — FIX-001 safe
  ├ 🔒 user._attribute._items[104] = present  Level=1
  ├ 🔒 imprint._items           = Object{}  FIX-005: client L114925 uses for...in → needs Object
  ├ 🔒 weapon._items            = Object{}  FIX-005: client L130938 uses for...in → needs Object
  └ 🔒 genki._items             = Object{}  FIX-005: client L132158 uses for...in → needs Object
  ✅ CRITICAL AUDIT: 6/6 PASSED

  [ 9/10] 🔄 JSON serialization test  █████████░
  [ 9/10] ✅ JSON serialization test  █████████░  10,057 bytes

  [07/10] 📝 MUTATION LOG

🟢 06:58:51.708 INFO  ⚔️ ENTER    ▸ MUTATION: New user data CREATED

  ⚠️  mutationLog: before/after must be numbers
       SOURCE: mutationLog(user._id)
       ACTION: Auto-extracting numbers from strings. Fix handler to pass numeric values.
       REASON: Got before=string after=string. Delta calculation requires numbers.

  └ 📋 user._id: 0 → 0 (+0) [NEW-USER-CREATION]

  ⚠️  mutationLog: before/after must be numbers
       SOURCE: mutationLog(user._lastLoginTime)
       ACTION: Auto-extracting numbers from strings. Fix handler to pass numeric values.
       REASON: Got before=string after=string. Delta calculation requires numbers.

  └ 📋 user._lastLoginTime: 0 timestamp → 1778828331583 timestamp (+1778828331583 timestamp) [NEW-USER-CREATION]

  ⚠️  mutationLog: before/after must be numbers
       SOURCE: mutationLog(user._attribute._items[104]._num)
       ACTION: Auto-extracting numbers from strings. Fix handler to pass numeric values.
       REASON: Got before=string after=string. Delta calculation requires numbers.

  └ 📋 user._attribute._items[104]._num: 0 level → 1 level (+1 level) [NEW-USER-CREATION]

  ⚠️  mutationLog: before/after must be numbers
       SOURCE: mutationLog(user._attribute._items[101]._num)
       ACTION: Auto-extracting numbers from strings. Fix handler to pass numeric values.
       REASON: Got before=string after=string. Delta calculation requires numbers.

  └ 📋 user._attribute._items[101]._num: 0 diamond → 0 diamond (+0 diamond) [NEW-USER-CREATION]

  ⚠️  mutationLog: before/after must be numbers
       SOURCE: mutationLog(heros._heros)
       ACTION: Auto-extracting numbers from strings. Fix handler to pass numeric values.
       REASON: Got before=string after=string. Delta calculation requires numbers.

  └ 📋 heros._heros: 0 → 1 (+1) [NEW-USER-CREATION]

  ⚠️  mutationLog: before/after must be numbers
       SOURCE: mutationLog(summon._energy)
       ACTION: Auto-extracting numbers from strings. Fix handler to pass numeric values.
       REASON: Got before=string after=string. Delta calculation requires numbers.

  └ 📋 summon._energy: 0 energy → 0 energy (+0 energy) [NEW-USER-CREATION]

  ⚠️  mutationLog: before/after must be numbers
       SOURCE: mutationLog(newUser)
       ACTION: Auto-extracting numbers from strings. Fix handler to pass numeric values.
       REASON: Got before=string after=string. Delta calculation requires numbers.

  └ 📋 newUser: 0 → 0 (+0) [NEW-USER-CREATION]

  [08/10] 💾 SAVE VERIFY

  [10/10] 🔄 Database save  ██████████
[DB] saveUser("guest_9e4fb9..."): 100 keys, 10057 bytes
  [10/10] ✅ Database save  ██████████  4ms
🟢 06:58:51.716 INFO  ⚔️ ENTER    ▸ Post-save integrity verification...
  ├ ✅ SAVE VERIFY: 12/12 paths OK — data persisted

  [09/10] 📤 RESPONSE SNAPSHOT

  ├ 📋 original: 10057 chars
  ├ 📋 compressed: 2391 chars
  ├ 📋 reduction: 76%
  └ 📋 threshold: 1024 chars

  ┌ 📸 ENTER GAME RESPONSE (ret=0) ───────────────────────────┐
  ├   user                         Object{20}
  ├   heros                        Object{4}
  ├   hangup                       Object{16}
  ├   totalProps                   Object{1}
  ├   backpackLevel                1
  ├   imprint                      Object{2}
  ├   weapon                       Object{2}
  ├   summon                       Object{7}
  ├   dungeon                      Object{2}
  ├   equip                        Object{2}
  ├   scheduleInfo                 Object{53}
  ├   timesInfo                    Object{12}
  ├   serverVersion                ""
  ├   serverId                     1
  ├   serverOpenDate               1778828307690
  ├   newUser                      true
  ├   currency                     "USD"
  ├   lastTeam                     Object{2}
  ├   superSkill                   Object{2}
  ├   giftInfo                     Object{11}
  ├   guide                        Object{2}
  ├   userGuild                    Object{3}
  ├   userGuildPub                 Object{8}
  ├   expedition                   Object{7}
  ├   retrieve                     Object{7}
  ├   battleMedal                  Object{11}
  ├   training                     Object{9}
  ├   heroSkin                     Object{3}
  ├   userWar                      Object{9}
  ├   userBallWar                  Object{6}
  ├   headEffect                   Object{4}
  ├   userTopBattle                Object{10}
  ├   topBattleInfo                Object{4}
  ├   checkin                      Object{5}
  ├   curMainTask                  Object{0}
  ├   summonLog                    Array[0] ⚠️ EMPTY
  ├   vipLog                       Array[0] ⚠️ EMPTY
  ├   cardLog                      Array[0] ⚠️ EMPTY
  ├   onlineBulletin               Array[0] ⚠️ EMPTY
  ├   broadcastRecord              Array[0] ⚠️ EMPTY
  ├   blacklist                    Object{0}
  ├   forbiddenChat                Object{2}
  ├   guildLevel                   0
  ├   guildTreasureMatchRet        0
  ├   dragonEquiped                Object{0}
  ├   warInfo                      null ⚠️ NULL
  ├   ballWarState                 0
  ├   enableShowQQ                 false
  ├   showQQVip                    0
  ├   showQQ                       0
  ├   showQQImg1                   ""
  ├   showQQImg2                   ""
  ├   showQQUrl                    ""
  ├   cellgameHaveSetHero          false
  ├   globalWarBuffTag             ""
  ├   globalWarLastRank            Object{0}
  ├   globalWarBuff                0
  ├   globalWarBuffEndTime         0
  ├   guildName                    ""
  ├   guildActivePoints            Object{0}
  ├   ballBroadcast                null ⚠️ NULL
  ├   ballWarInfo                  Object{4}
  ├   teamTraining                 Object{4}
  ├   teamServerHttpUrl            ""
  ├   teamDungeonOpenTime          0
  ├   teamDungeonTask              Object{3}
  ├   teamDungeonSplBcst           null ⚠️ NULL
  ├   teamDungeonNormBcst          null ⚠️ NULL
  ├   teamDungeonHideInfo          null ⚠️ NULL
  ├   teamDungeon                  Object{3}
  ├   teamDungeonInvitedFriends    null ⚠️ NULL
  ├   myTeamServerSocketUrl        "http://127.0.0.1:8003"
  ├   shopNewHeroes                Object{0}
  ├   channelSpecial               Object{15}
  ├   hideHeroes                   Array[0] ⚠️ EMPTY
  ├   templeLess                   0
  ├   timeTrial                    Object{9}
  ├   timeTrialNextOpenTime        0
  ├   YouTuberRecruit              Object{7}
  ├   userYouTuberRecruit          Object{2}
  ├   heroImageVersion             0
  ├   superImageVersion            0
  ├   karinStartTime               0
  ├   karinEndTime                 0
  ├   timeBonusInfo                Object{2}
  ├   monthCard                    Object{2}
  ├   recharge                     Object{2}
  ├   userDownloadReward           Object{4}
  ├   clickSystem                  Object{2}
  ├   questionnaires               null ⚠️ NULL
  ├   littleGame                   Object{3}
  ├   genki                        Object{4}
  ├   gemstone                     Object{1}
  ├   resonance                    Object{6}
  ├   fastTeam                     Object{1}
  ├   gravity                      Object{0}
  ├   timeMachine                  Object{1}
  ├   _arenaTeam                   null ⚠️ NULL
  ├   _arenaSuper                  null ⚠️ NULL
  └   mergedServers                Array[0] ⚠️ EMPTY
  └──────────────────────────────────────────────────────────┘

  ├ 📋 typeScan: 7/8 passed
  └ 📋 failed: 1

  ┌──────────────────────────────────────────────────────────────┐
  │  ❌ FATAL ERROR AT STEP RESPONSE TYPE SCAN                  │
  │                                                              │
  │  STEP:   ENTER                                               │
  │  REASON: userData.serverId expected string but got number    │
  │  DETAIL: UserDataParser reads these fields on client         │
  │  CLIENT: Multiple client parsers                             │
  │                                                              │
  │  IMPACT:  Client crash or silent data loss                    │
  │  FIX:     Check buildNewUserData or updateExistingUser        │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘

  ├ ❌ field: userData.serverId
  ├ ❌ expected: string
  ├ ❌ actual: number
  └ ❌ value: 1

  [10/10] 🏁 EXECUTION SUMMARY


  ═══════════════════════════════════════════

  ❌ ENTER GAME COMPLETE

  👤 USER:       guest_9e4fb9520954e69b (New User)
  📦 FIELDS:     100
  🦸 HEROES:     1 hero(es)
  💎 DIAMOND:    0
  🏆 LEVEL:      1

  📏 JSON SIZE:  10,057 chars
  📦 RESP SIZE:  2,391 chars
  🔐 PROTOCOL:   LZ-STRING
  ⏱️ TOTAL TIME: 201ms  ████████████████

  🔒 CRITICAL:   6/6 PASSED
  ⚠️ WARNINGS:   0
  ❌ ERRORS:     1
  ✅ ASSERTS:     12 PASS / 2 FAIL

  ═══════════════════════════════════════════

✅ user::enterGame        OK     ────────────────────────────
  └ ret=0 2391 chars (LZ) 208ms

  ✅ SUCCESS  📏 data= 2391 chars  📦 proto= LZ-STRING  ⏱️ time= 208ms

  └ ⏱️ handler: 209ms ██

  📤 user::getBulletinBrief ──────────────────────────────────
  ├ 📤 action: getBulletinBrief
  ├ 📤 type: user
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 counter: 2
  └ 📤 serverId: ?

  ┌────────────────────────────────────────────────────────┐
  │  📤 REQUEST PAYLOAD                                      │
  ├────────────────────────────────────────────────────────┤
  │   type                 "user"
  │   action               "getBulletinBrief"
  │   userId               "guest_9e4fb9520954e69b"
  └   version              "1.0"
  └────────────────────────────────────────────────────────┘

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: getBulletinBrief  (user/getBulletinBrief)  userId=guest_9e4fb95209
  ══════════════════════════════════════════════════════════


  [01/10] 🟢 ENTRY CHECK

  [ 1/ 2] 🔄 Validate request fields  █░
  └ 📤 userId: guest_9e4fb9520954e6
  [ 1/ 2] ✅ Validate request fields  █░  userId OK

  [02/10] 📦 DATA INJECTION CHECK

  [ 1/ 1] 🔄 Load global bulletin data  █
  ├ 📋 source: ctx.db.getGlobal("bulletinBrief")
  └ 📋 entryCount: 0
  [ 1/ 1] ✅ Load global bulletin data  █  0 entries loaded

  [03/10] 🔍 DEEP TYPE SCAN

  [ 1/ 1] 🔄 Type assert request fields  █
  ├ ✅ userId: string — PASS
  [ 1/ 1] ✅ Type assert request fields  █  type verified

  [04/10] ⚡ PLAYER STATE SNAPSHOT

  [ 1/ 1] 🔄 Snapshot bulletin state  █
  ├ 📋 bulletinCount: 0
  └ 📋 bulletinIds: (empty)
  [ 1/ 1] ✅ Snapshot bulletin state  █  0 bulletins in global store

  [05/10] 🧮 INVARIANT CHECK

  [ 1/ 2] 🔄 Validate business rules  █░
  ├ ✅ globalBrief exists — PASS
  ├ ✅ has bulletin entries — PASS
  [ 1/ 2] ✅ Validate business rules  █░  invariants checked

  [06/10] 🔮 MAIN PROCESS

  [ 1/ 1] 🔄 Build _brief object (strip body field)  █
  [ 1/ 1] ✅ Build _brief object (strip body field)  █  0 bulletins (body stripped)

  [07/10] 💾 MUTATION LOG

  ├ 📋 status: read-only, no mutations
  └ 📋 reason: bulletin data is global — only read and returned

  [08/10] ✅ SAVE VERIFY

  ├ 📋 status: no DB save (read-only handler)
  └ 📋 reason: bulletin brief is global data — no user data changes

  [09/10] 📤 RESPONSE SNAPSHOT

  ├ ✅ _brief: object — PASS

  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  └ 🔒 _brief                   = Object{0}  L121094: for(var o in n._brief) iterates each bulletin
  ✅ CRITICAL AUDIT: 1/1 PASSED


  ┌ 📸 getBulletinBrief ret=0 ────────────────────────────────┐
  └   _brief                       Object{0}
  └──────────────────────────────────────────────────────────┘


  [10/10] 🏁 EXECUTION SUMMARY


  ═══════════════════════════════════════════

  ✅ GET BULLETIN BRIEF COMPLETE

  👤 USER:       guest_9e4fb9520954e69b


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0
  ✅ ASSERTS:     16 PASS / 2 FAIL

  ═══════════════════════════════════════════

✅ user::getBulletinBrief OK     ────────────────────────────
  └ ret=0 13 chars (raw) 14ms

  ✅ SUCCESS  📏 data= 13 chars  📦 proto= RAW  ⏱️ time= 14ms

  └ ⏱️ handler: 16ms 

  📤 friend::friendServerAction ──────────────────────────────────
  ├ 📤 action: friendServerAction
  ├ 📤 type: friend
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 counter: 3
  └ 📤 serverId: ?

  ┌────────────────────────────────────────────────────────┐
  │  📤 REQUEST PAYLOAD                                      │
  ├────────────────────────────────────────────────────────┤
  │   type                 "friend"
  │   action               "friendServerAction"
  │   relayAction          "queryFriends"
  │   userId               "guest_9e4fb9520954e69b"
  └   version              "1.0"
  └────────────────────────────────────────────────────────┘

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: friendServerAction  (friend/friendServerAction)  userId=guest_9e4fb95209
  ══════════════════════════════════════════════════════════


  [01/10] 🟢 ENTRY CHECK

  [ 1/ 2] 🔄 Validate request fields  █░
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 relayAction: queryFriends
  └ 📤 extraFields: (none)
  [ 1/ 2] ✅ Validate request fields  █░  relayAction="${relayAction}"

  [02/10] 📦 DATA INJECTION CHECK

  [ 1/ 1] 🔄 Load userData from DB  █
  ├ 📋 teamworkFriends: 0 entries
  ├ 📋 teamworkBlacklist: 0 entries
  ├ 📋 teamworkApplies: 0 entries
  ├ 📋 teamworkMessages: 0 conversations
  └ 📋 teamworkMsgBrief: 0 entries
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded + teamwork fields ensured

  [03/10] 🔍 DEEP TYPE SCAN

  [ 1/ 2] 🔄 Type assert request fields  █░
  ├ ✅ userId: string — PASS
  ├ ✅ relayAction: string — PASS
  [ 1/ 2] ✅ Type assert request fields  █░  types verified

  [04/10] ⚡ PLAYER STATE SNAPSHOT

  [ 1/ 1] 🔄 Snapshot teamwork storage state  █
  ├ 📋 friendsCount: 0
  ├ 📋 messagesCount: 0
  ├ 📋 blacklistCount: 0
  ├ 📋 appliesCount: 0
  └ 📋 msgBriefCount: 0
  [ 1/ 1] ✅ Snapshot teamwork storage state  █  0 friends

  [05/10] 🧮 INVARIANT CHECK

  [ 1/ 1] 🔄 Validate relayAction is known  █
  ├ ✅ relayAction is known action — PASS
  [ 1/ 1] ✅ Validate relayAction is known  █  known action

  [06/10] 🔮 MAIN PROCESS

  [ 1/ 1] 🔄 Dispatch relayAction: queryFriends  █
  [ 1/ 1] ✅ Dispatch relayAction: queryFriends  █  0 friends

  [07/10] 💾 MUTATION LOG

  ├ 📋 status: no data mutations
  └ 📋 reason: relayAction="queryFriends" is read-only or default

  [08/10] ✅ SAVE VERIFY

  ├ 📋 status: no DB save (read-only action)
  └ 📋 reason: relayAction="queryFriends" does not modify user data

  [09/10] 📤 RESPONSE SNAPSHOT

  ├ ✅ responseData: object — PASS

  ┌ 📸 friendServerAction ret=0 [queryFriends] ───────────────┐
  └   users                        Object{0}
  └──────────────────────────────────────────────────────────┘


  [10/10] 🏁 EXECUTION SUMMARY


  ═══════════════════════════════════════════

  ✅ FRIEND SERVER ACTION COMPLETE

  👤 USER:       guest_9e4fb9520954e69b


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0
  ✅ ASSERTS:     20 PASS / 2 FAIL

  ═══════════════════════════════════════════

✅ friend::friendServerAction OK     ────────────────────────────
  └ ret=0 12 chars (raw) 29ms

  ✅ SUCCESS  📏 data= 12 chars  📦 proto= RAW  ⏱️ time= 29ms

  └ ⏱️ handler: 30ms 

  📤 friend::friendServerAction ──────────────────────────────────
  ├ 📤 action: friendServerAction
  ├ 📤 type: friend
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 counter: 4
  └ 📤 serverId: ?

  ┌────────────────────────────────────────────────────────┐
  │  📤 REQUEST PAYLOAD                                      │
  ├────────────────────────────────────────────────────────┤
  │   type                 "friend"
  │   action               "friendServerAction"
  │   relayAction          "queryBlackList"
  │   userId               "guest_9e4fb9520954e69b"
  └   version              "1.0"
  └────────────────────────────────────────────────────────┘

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: friendServerAction  (friend/friendServerAction)  userId=guest_9e4fb95209
  ══════════════════════════════════════════════════════════


  [01/10] 🟢 ENTRY CHECK

  [ 1/ 2] 🔄 Validate request fields  █░
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 relayAction: queryBlackList
  └ 📤 extraFields: (none)
  [ 1/ 2] ✅ Validate request fields  █░  relayAction="${relayAction}"

  [02/10] 📦 DATA INJECTION CHECK

  [ 1/ 1] 🔄 Load userData from DB  █
  ├ 📋 teamworkFriends: 0 entries
  ├ 📋 teamworkBlacklist: 0 entries
  ├ 📋 teamworkApplies: 0 entries
  ├ 📋 teamworkMessages: 0 conversations
  └ 📋 teamworkMsgBrief: 0 entries
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded + teamwork fields ensured

  [03/10] 🔍 DEEP TYPE SCAN

  [ 1/ 2] 🔄 Type assert request fields  █░
  ├ ✅ userId: string — PASS
  ├ ✅ relayAction: string — PASS
  [ 1/ 2] ✅ Type assert request fields  █░  types verified

  [04/10] ⚡ PLAYER STATE SNAPSHOT

  [ 1/ 1] 🔄 Snapshot teamwork storage state  █
  ├ 📋 friendsCount: 0
  ├ 📋 messagesCount: 0
  ├ 📋 blacklistCount: 0
  ├ 📋 appliesCount: 0
  └ 📋 msgBriefCount: 0
  [ 1/ 1] ✅ Snapshot teamwork storage state  █  0 friends

  [05/10] 🧮 INVARIANT CHECK

  [ 1/ 1] 🔄 Validate relayAction is known  █
  ├ ✅ relayAction is known action — PASS
  [ 1/ 1] ✅ Validate relayAction is known  █  known action

  [06/10] 🔮 MAIN PROCESS

  [ 1/ 1] 🔄 Dispatch relayAction: queryBlackList  █
  [ 1/ 1] ✅ Dispatch relayAction: queryBlackList  █  0 entries

  [07/10] 💾 MUTATION LOG

  ├ 📋 status: no data mutations
  └ 📋 reason: relayAction="queryBlackList" is read-only or default

  [08/10] ✅ SAVE VERIFY

  ├ 📋 status: no DB save (read-only action)
  └ 📋 reason: relayAction="queryBlackList" does not modify user data

  [09/10] 📤 RESPONSE SNAPSHOT

  ├ ✅ responseData: object — PASS

  ┌ 📸 friendServerAction ret=0 [queryBlackList] ─────────────┐
  └   users                        Object{0}
  └──────────────────────────────────────────────────────────┘


  [10/10] 🏁 EXECUTION SUMMARY


  ═══════════════════════════════════════════

  ✅ FRIEND SERVER ACTION COMPLETE

  👤 USER:       guest_9e4fb9520954e69b


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0
  ✅ ASSERTS:     24 PASS / 2 FAIL

  ═══════════════════════════════════════════

✅ friend::friendServerAction OK     ────────────────────────────
  └ ret=0 12 chars (raw) 3ms

  ✅ SUCCESS  📏 data= 12 chars  📦 proto= RAW  ⏱️ time= 3ms

  └ ⏱️ handler: 3ms 

  📤 heroImage::getAll      ──────────────────────────────────
  ├ 📤 action: getAll
  ├ 📤 type: heroImage
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 counter: 5
  └ 📤 serverId: ?

  ┌────────────────────────────────────────────────────────┐
  │  📤 REQUEST PAYLOAD                                      │
  ├────────────────────────────────────────────────────────┤
  │   type                 "heroImage"
  │   action               "getAll"
  │   userId               "guest_9e4fb9520954e69b"
  └   version              "1.0"
  └────────────────────────────────────────────────────────┘

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: getAll  (heroImage/getAll)  userId=guest_9e4fb95209
  ══════════════════════════════════════════════════════════


  [01/10] 🟢 ENTRY CHECK

  [ 1/ 2] 🔄 Validate request fields  █░
  └ 📤 userId: guest_9e4fb9520954e6
  [ 1/ 2] ✅ Validate request fields  █░  userId OK

  [02/10] 📦 DATA INJECTION CHECK

  [ 1/ 1] 🔄 Load userData from DB  █
  ├ 📋 heros: exists
  └ 📋 heros._heros: exists
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded

  [03/10] 🔍 DEEP TYPE SCAN

  [ 1/ 1] 🔄 Type assert request fields  █
  ├ ✅ userId: string — PASS
  [ 1/ 1] ✅ Type assert request fields  █  type verified

  [04/10] ⚡ PLAYER STATE SNAPSHOT

  [ 1/ 1] 🔄 Snapshot hero collection state  █
  ├ 📋 heroCount: 1
  └ 📋 heroIds: de4c6801-8341-4c0e-acc3-7929b24c79a7
  [ 1/ 1] ✅ Snapshot hero collection state  █  1 heroes in collection

  [05/10] 🧮 INVARIANT CHECK

  [ 1/ 2] 🔄 Validate business rules  █░
  ├ ✅ userData.heros._heros exists — PASS
  ├ ✅ has hero entries — PASS
  [ 1/ 2] ✅ Validate business rules  █░  invariants checked

  [06/10] 🔮 MAIN PROCESS

  [ 1/ 1] 🔄 Build hero image data  █
  [ 1/ 1] ✅ Build hero image data  █  1 hero(es)

  [07/10] 💾 MUTATION LOG

  ├ 📋 status: read-only, no mutations
  └ 📋 reason: hero image data is derived from userData.heros — no writes

  [08/10] ✅ SAVE VERIFY

  ├ 📋 status: no DB save (read-only handler)
  └ 📋 reason: hero image list is a read-only view of hero collection

  [09/10] 📤 RESPONSE SNAPSHOT

  ├ ✅ _heros: object — PASS

  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  └ 🔒 _heros                   = Object{1}  L134363: for(var n in e._heros) → Object, each has _id/_maxLevel/_selfComments
  ✅ CRITICAL AUDIT: 1/1 PASSED


  ┌ 📸 getAll ret=0 ──────────────────────────────────────────┐
  └   _heros                       Object{1}
  └──────────────────────────────────────────────────────────┘


  [10/10] 🏁 EXECUTION SUMMARY


  ═══════════════════════════════════════════

  ✅ HERO IMAGE GET ALL COMPLETE

  👤 USER:       guest_9e4fb9520954e69b
  📦 FIELDS:     1


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0
  ✅ ASSERTS:     28 PASS / 2 FAIL

  ═══════════════════════════════════════════

✅ heroImage::getAll      OK     ────────────────────────────
  └ ret=0 97 chars (raw) 5ms

  ✅ SUCCESS  📏 data= 97 chars  📦 proto= RAW  ⏱️ time= 5ms

  └ ⏱️ handler: 6ms 

  📤 hero::getAttrs         ──────────────────────────────────
  ├ 📤 action: getAttrs
  ├ 📤 type: hero
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 counter: 6
  └ 📤 serverId: ?

  ┌────────────────────────────────────────────────────────┐
  │  📤 REQUEST PAYLOAD                                      │
  ├────────────────────────────────────────────────────────┤
  │   type                 "hero"
  │   action               "getAttrs"
  │   userId               "guest_9e4fb9520954e69b"
  │   heros                ["de4c6801-8341-4c0e-acc3-7929b24c79a7"]
  └   version              "1.0"
  └────────────────────────────────────────────────────────┘

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: getAttrs  (hero/getAttrs)  userId=guest_9e4fb95209
  ══════════════════════════════════════════════════════════


  [01/10] 🟢 ENTRY CHECK

  [ 1/ 2] 🔄 Validate request fields  █░
  ├ 📤 userId: guest_9e4fb9520954e6
  └ 📤 heros: de4c6801-8341-4c0e-acc3-7929b24c79a7
  [ 1/ 2] ✅ Validate request fields  █░  1 hero(es) requested

  [02/10] 📦 DATA INJECTION CHECK

  [ 1/ 1] 🔄 Load userData from DB  █
  └ 📋 heros._heros: 1 heroes
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded

  [03/10] 🔍 DEEP TYPE SCAN

  [ 1/ 2] 🔄 Type assert request fields  █░
  ├ ✅ userId: string — PASS
  ├ ✅ heros: array — PASS
  [ 1/ 2] ✅ Type assert request fields  █░  types verified

  [04/10] ⚡ PLAYER STATE SNAPSHOT

  [ 1/ 1] 🔄 Snapshot hero request vs found  █
  ├ 📋 requested: 1 heroes: de4c6801-8341-4c0e-acc3-7929b24c79a7
  ├ 📋 found: 1 heroes: de4c6801-8341-4c0e-acc3-7929b24c79a7
  └ 📋 missing: 0 heroes: (none)
  [ 1/ 1] ✅ Snapshot hero request vs found  █  1/1 heroes found

  [05/10] 🧮 INVARIANT CHECK

  [ 1/ 1] 🔄 Validate hero availability  █
  ├ ✅ all requested heroes exist in userData — PASS
  [ 1/ 1] ✅ Validate hero availability  █  all heroes found

  [06/10] 🔮 MAIN PROCESS

  [ 1/ 1] 🔄 Calculate hero attributes  █
  ├ 📋 heroId: de4c6801-8341-4c0e-acc3-7929b24c79a7
  ├ 📋 displayId: 1205
  └ 📋 level: 3
  ├ 📋 heroType: critical
  ├ 📋 weightedSum: 2312.0
  └ 📋 power: 2312
  ├ 📋 hp: 1260
  ├ 📋 attack: 462
  ├ 📋 armor: 214
  └ 📋 power: 2312
  [ 1/ 1] ✅ Calculate hero attributes  █  1 heroes calculated

  [07/10] 💾 MUTATION LOG

  ├ 📋 status: read-only, no mutations
  └ 📋 reason: hero attributes are calculated from config — no userData writes

  [08/10] ✅ SAVE VERIFY

  ├ 📋 status: no DB save (read-only handler)
  └ 📋 reason: attribute calculation is a read-only operation

  [09/10] 📤 RESPONSE SNAPSHOT

  ├ ✅ _attrs: object — PASS
  ├ ✅ _baseAttrs: object — PASS

  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 _attrs                   = Object{1}  L133726: for(var o in t._attrs) — keyed by hero index, each has _items with calculated attrs
  ├ 🔒 _baseAttrs               = Object{1}  L133731: t._baseAttrs[o] — keyed by hero index, each has _items with base attrs (before talent)
  └ 🔒 POWER (attr 21)          = calculated per hero  L133821: 21==p._id → heroBaseAttr.power = floor(num)
  ✅ CRITICAL AUDIT: 3/3 PASSED


  ┌ 📸 getAttrs ret=0 ────────────────────────────────────────┐
  ├   _attrs                       Object{1}
  └   _baseAttrs                   Object{1}
  └──────────────────────────────────────────────────────────┘


  [10/10] 🏁 EXECUTION SUMMARY


  ═══════════════════════════════════════════

  ✅ HERO GET ATTRS COMPLETE

  👤 USER:       guest_9e4fb9520954e69b
  📦 FIELDS:     2


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0
  ✅ ASSERTS:     33 PASS / 2 FAIL

  ═══════════════════════════════════════════

✅ hero::getAttrs         OK     ────────────────────────────
  └ ret=0 394 chars (raw) 21ms

  ✅ SUCCESS  📏 data= 394 chars  📦 proto= RAW  ⏱️ time= 21ms

  └ ⏱️ handler: 21ms 

  📤 userMsg::getMsgList    ──────────────────────────────────
  ├ 📤 action: getMsgList
  ├ 📤 type: userMsg
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 counter: 7
  └ 📤 serverId: ?

  ┌────────────────────────────────────────────────────────┐
  │  📤 REQUEST PAYLOAD                                      │
  ├────────────────────────────────────────────────────────┤
  │   type                 "userMsg"
  │   action               "getMsgList"
  │   userId               "guest_9e4fb9520954e69b"
  └   version              "1.0"
  └────────────────────────────────────────────────────────┘

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: getMsgList  (userMsg/getMsgList)  userId=guest_9e4fb95209
  ══════════════════════════════════════════════════════════


  [01/10] 🟢 ENTRY CHECK

  [ 1/ 2] 🔄 Validate request fields  █░
  └ 📤 userId: guest_9e4fb9520954e6
  [ 1/ 2] ✅ Validate request fields  █░  userId OK

  [02/10] 📦 DATA INJECTION CHECK

  [ 1/ 1] 🔄 Load userData from DB  █
  └ 📋 userMsgBrief: 0 entries
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded

  [03/10] 🔍 DEEP TYPE SCAN

  [ 1/ 1] 🔄 Type assert request fields  █
  ├ ✅ userId: string — PASS
  [ 1/ 1] ✅ Type assert request fields  █  type verified

  [04/10] ⚡ PLAYER STATE SNAPSHOT

  [ 1/ 1] 🔄 Snapshot message brief state  █
  ├ 📋 entryCount: 0
  └ 📋 keys: (empty)
  [ 1/ 1] ✅ Snapshot message brief state  █  0 message entries

  [05/10] 🧮 INVARIANT CHECK

  [ 1/ 1] 🔄 Validate data integrity  █
  ├ ✅ userMsgBrief exists — PASS
  [ 1/ 1] ✅ Validate data integrity  █  valid object

  [06/10] 🔮 MAIN PROCESS

  [ 1/ 1] 🔄 Return storedBrief directly  █
  [ 1/ 1] ✅ Return storedBrief directly  █  0 entries returned as-is

  [07/10] 💾 MUTATION LOG

  ├ 📋 status: read-only, no mutations
  └ 📋 reason: message list is returned directly from userData.userMsgBrief

  [08/10] ✅ SAVE VERIFY

  ├ 📋 status: no DB save (read-only handler)
  └ 📋 reason: getMsgList only reads stored message brief — no writes

  [09/10] 📤 RESPONSE SNAPSHOT

  ├ ✅ _brief: object — PASS

  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  └ 🔒 _brief                   = Object{0}  L121134: setMessageFriendSimpleList iterates e[n].userInfo → UserSimpleInfo.deserialize
  ✅ CRITICAL AUDIT: 1/1 PASSED


  ┌ 📸 getMsgList ret=0 ──────────────────────────────────────┐
  └   _brief                       Object{0}
  └──────────────────────────────────────────────────────────┘


  [10/10] 🏁 EXECUTION SUMMARY


  ═══════════════════════════════════════════

  ✅ GET MSG LIST COMPLETE

  👤 USER:       guest_9e4fb9520954e69b
  📦 FIELDS:     1


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0
  ✅ ASSERTS:     36 PASS / 2 FAIL

  ═══════════════════════════════════════════

✅ userMsg::getMsgList    OK     ────────────────────────────
  └ ret=0 13 chars (raw) 7ms

  ✅ SUCCESS  📏 data= 13 chars  📦 proto= RAW  ⏱️ time= 7ms

  └ ⏱️ handler: 7ms 

  📤 user::registChat       ──────────────────────────────────
  ├ 📤 action: registChat
  ├ 📤 type: user
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 counter: 8
  └ 📤 serverId: ?

  ┌────────────────────────────────────────────────────────┐
  │  📤 REQUEST PAYLOAD                                      │
  ├────────────────────────────────────────────────────────┤
  │   type                 "user"
  │   action               "registChat"
  │   userId               "guest_9e4fb9520954e69b"
  └   version              "1.0"
  └────────────────────────────────────────────────────────┘

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: registChat  (user/registChat)  userId=guest_9e4fb95209
  ══════════════════════════════════════════════════════════


  [01/10] 🟢 ENTRY CHECK

🟢 06:58:56.873 INFO  ⚪ REGIST_CHAT ▸ registChat REQUEST RECEIVED
  ├ 📤 userId: guest_9e4fb9520954e6
  └ 📤 version: 1.0
  ├ ✅ request.userId: string — PASS
🟢 06:58:56.873 INFO  ⚪ REGIST_CHAT ▸ Entry check PASS — userId=guest_9e4fb95209...

  [02/10] 📦 DATA INJECTION CHECK

🟢 06:58:56.873 INFO  ⚪ REGIST_CHAT ▸ Loading config for chat registration
  ├ ⚙️ chatUrl: http://127.0.0.1:8002
  ├ ⚙️ serverId: 1
  └ ⚙️ source: DEFAULT (chatUrl not set)
🟢 06:58:56.873 INFO  ⚪ REGIST_CHAT ▸ Config loaded — chatUrl and serverId resolved

  [03/10] 🔍 DEEP TYPE SCAN

  ├ ✅ request.userId: string — PASS
  ├ ✅ request.version: string — PASS
  ├ ✅ chatServerUrl: string — PASS
  ├ ✅ serverId: string — PASS

  [04/10] ⚡ PLAYER STATE SNAPSHOT

🟢 06:58:56.873 INFO  ⚪ REGIST_CHAT ▸ Loading player state for guild/room context
  ├ 📋 userData: LOADED (100 top keys)
  ├ 📋 guild: NO
  └ 📋 guildRoomId: undefined (by design — updated dynamically by guild handler L114204)

  [05/10] 🧮 INVARIANT CHECK

  ├ ✅ chatServerUrl is non-empty string — PASS
  ├ ✅ serverId is valid numeric string — PASS

  [06/10] 🔮 MAIN PROCESS

🟢 06:58:56.874 INFO  ⚪ REGIST_CHAT ▸ Building chat registration response (6 fields)
  ├ 📋 worldRoomId: world_1 (L114566 — ALWAYS joined)
  ├ 📋 guildRoomId: undefined (L114568 — undefined = skip)
  ├ 📋 teamDungeonChatRoom: undefined (L114579 — undefined = skip)
  └ 📋 teamChatRoom: undefined (L114590 — undefined = skip)
  ├ 📋 consumer: L114470 — 6 fields read from callback(n)
  ├ 📋 next-step: L114480: io.connect(chatServerUrl) → TEA verify required
  ├ 📋 post-login: L114550: chat::login → joinRoom(world, guild?, team?, dungeon?)
  └ 📋 dynamic-update: guild L114207 | teamDungeon L136514 | team L136531
🟢 06:58:56.874 INFO  ⚪ REGIST_CHAT ▸ Response fields built — 6 fields total

  [07/10] 💾 MUTATION LOG

🟢 06:58:56.874 INFO  ⚪ REGIST_CHAT ▸ No data mutations (configuration handler)
  ├ 📋 type: NONE — registChat is a read-only configuration handler
  ├ 📋 reason: Only returns chat URL and room IDs — no user data modified
  └ 📋 trace: L114462-114470: client reads response fields, does not write back

  [08/10] ✅ SAVE VERIFY

🟢 06:58:56.874 INFO  ⚪ REGIST_CHAT ▸ No DB save required (configuration handler)
  ├ 📋 action: SKIP — no mutations to persist
  ├ 📋 reason: registChat returns configuration data only — no user state changes
  └ 📋 dbWrite: NONE

  [09/10] 📤 RESPONSE SNAPSHOT

  ├ ✅ responseData._success: boolean — PASS
  ├ ✅ responseData._chatServerUrl: string — PASS
  ├ ✅ responseData._worldRoomId: string — PASS

  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 _success                 = true  L114470: n._success ? connect chat : retry every 3s (max 15)
  ├ 🔒 _chatServerUrl           = http://127.0.0.1:8002  L114480→L82537: io.connect(url) — MUST be full URL
  ├ 🔒 _worldRoomId             = world_1  L114566: chatJoinRequest(worldRoomId) — ALWAYS joined after login
  ├ 🔒 _guildRoomId             = (undefined)  L114568: if(guildRoomId) join — undefined = skip (no guild)
  ├ 🔒 _teamDungeonChatRoom     = (undefined)  L114579: if(teamDungeonChatRoom) join — undefined = skip
  └ 🔒 _teamChatRoom            = (undefined)  L114590: if(teamChatRoomId) join — undefined = skip (no team)
  ✅ CRITICAL AUDIT: 6/6 PASSED


  ┌ 📸 registChat ret=0 ──────────────────────────────────────┐
  ├   _success                     true
  ├   _chatServerUrl               "http://127.0.0.1:8002"
  └   _worldRoomId                 "world_1"
  └──────────────────────────────────────────────────────────┘


  [10/10] 🏁 EXECUTION SUMMARY


  ⚠️ WARNINGS DETECTED
  ──────────────────────────────────────────────
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


  ═══════════════════════════════════════════

  ✅ REGIST CHAT COMPLETE

  👤 USER:       guest_9e4fb9520954e69b
  📦 FIELDS:     6

  ⏱️ TOTAL TIME: 1ms  ░░░░░░░░░░░░░░░░

  ⚠️ WARNINGS:   11
  ❌ ERRORS:     2
  ✅ ASSERTS:     46 PASS / 2 FAIL

  ═══════════════════════════════════════════

✅ user::registChat       OK     ────────────────────────────
  └ ret=0 83 chars (raw) 5ms

  ✅ SUCCESS  📏 data= 83 chars  📦 proto= RAW  ⏱️ time= 5ms

  └ ⏱️ handler: 5ms 

  📤 guide::saveGuide       ──────────────────────────────────
  ├ 📤 action: saveGuide
  ├ 📤 type: guide
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 counter: 9
  └ 📤 serverId: ?

  ┌────────────────────────────────────────────────────────┐
  │  📤 REQUEST PAYLOAD                                      │
  ├────────────────────────────────────────────────────────┤
  │   type                 "guide"
  │   action               "saveGuide"
  │   userId               "guest_9e4fb9520954e69b"
  │   guideType            2
  │   step                 2102
  └   version              "1.0"
  └────────────────────────────────────────────────────────┘

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: saveGuide  (guide/saveGuide)  userId=guest_9e4fb95209
  ══════════════════════════════════════════════════════════


  [01/10] 🟢 ENTRY CHECK

  [ 1/ 3] 🔄 Validate request fields  █░░
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 guideType: 2
  └ 📤 step: 2102
  [ 1/ 3] ✅ Validate request fields  █░░  type=2 step=2102

  [02/10] 📦 DATA INJECTION CHECK

  [ 1/ 1] 🔄 Load userData from DB  █
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded

  [03/10] 🔍 DEEP TYPE SCAN

  [ 1/ 2] 🔄 Type assert request fields  █░
  ├ ✅ userId: string — PASS
  ├ ✅ guideType: number — PASS
  ├ ✅ step: number — PASS
  [ 1/ 2] ✅ Type assert request fields  █░  all types verified

  [04/10] ⚡ PLAYER STATE SNAPSHOT

  [ 1/ 1] 🔄 Snapshot guide._steps before modification  █
  ├ 📋 guideType: 2
  ├ 📋 currentStep: (none)
  └ 📋 allSteps: {}
  [ 1/ 1] ✅ Snapshot guide._steps before modification  █  guide._steps[2] was (none)

  [05/10] 🧮 INVARIANT CHECK

  [ 1/ 2] 🔄 Validate business rules  █░
  ├ ✅ guideType is valid enum — PASS
  ├ ✅ step is positive integer — PASS
  [ 1/ 2] ✅ Validate business rules  █░  invariants checked

  [06/10] 🔮 MAIN PROCESS

  [ 1/ 1] 🔄 Update guide._steps  █
  [ 1/ 1] ✅ Update guide._steps  █  guide._steps[2] = 2102

  [07/10] 💾 MUTATION LOG


  ⚠️  mutationLog: before/after must be numbers
       SOURCE: mutationLog(guide._steps[2])
       ACTION: Auto-extracting numbers from strings. Fix handler to pass numeric values.
       REASON: Got before=string after=number. Delta calculation requires numbers.

  └ 📋 guide._steps[2]: 0 step → 2102 step (+2102 step) [SAVE-GUIDE]

  [08/10] ✅ SAVE VERIFY

[DB] saveUser("guest_9e4fb9..."): 100 keys, 10065 bytes
  ├ ✅ SAVE VERIFY: 1/1 paths OK — data persisted

  [09/10] 📤 RESPONSE SNAPSHOT

  ├ ✅ responseData: object — PASS

  ┌ 📸 saveGuide ret=0 ───────────────────────────────────────┐
  └──────────────────────────────────────────────────────────┘


  [10/10] 🏁 EXECUTION SUMMARY


  ═══════════════════════════════════════════

  ✅ SAVE GUIDE COMPLETE

  👤 USER:       guest_9e4fb9520954e69b


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0
  ✅ ASSERTS:     52 PASS / 2 FAIL

  ═══════════════════════════════════════════

✅ guide::saveGuide       OK     ────────────────────────────
  └ ret=0 2 chars (raw) 17ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 17ms

  └ ⏱️ handler: 18ms 

  📤 guide::saveGuide       ──────────────────────────────────
  ├ 📤 action: saveGuide
  ├ 📤 type: guide
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 counter: 10
  └ 📤 serverId: ?

  ┌────────────────────────────────────────────────────────┐
  │  📤 REQUEST PAYLOAD                                      │
  ├────────────────────────────────────────────────────────┤
  │   type                 "guide"
  │   action               "saveGuide"
  │   userId               "guest_9e4fb9520954e69b"
  │   guideType            2
  │   step                 2107
  └   version              "1.0"
  └────────────────────────────────────────────────────────┘

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: saveGuide  (guide/saveGuide)  userId=guest_9e4fb95209
  ══════════════════════════════════════════════════════════


  [01/10] 🟢 ENTRY CHECK

  [ 1/ 3] 🔄 Validate request fields  █░░
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 guideType: 2
  └ 📤 step: 2107
  [ 1/ 3] ✅ Validate request fields  █░░  type=2 step=2107

  [02/10] 📦 DATA INJECTION CHECK

  [ 1/ 1] 🔄 Load userData from DB  █
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded

  [03/10] 🔍 DEEP TYPE SCAN

  [ 1/ 2] 🔄 Type assert request fields  █░
  ├ ✅ userId: string — PASS
  ├ ✅ guideType: number — PASS
  ├ ✅ step: number — PASS
  [ 1/ 2] ✅ Type assert request fields  █░  all types verified

  [04/10] ⚡ PLAYER STATE SNAPSHOT

  [ 1/ 1] 🔄 Snapshot guide._steps before modification  █
  ├ 📋 guideType: 2
  ├ 📋 currentStep: 2102
  └ 📋 allSteps: {"2":2102}
  [ 1/ 1] ✅ Snapshot guide._steps before modification  █  guide._steps[2] was 2102

  [05/10] 🧮 INVARIANT CHECK

  [ 1/ 2] 🔄 Validate business rules  █░
  ├ ✅ guideType is valid enum — PASS
  ├ ✅ step is positive integer — PASS
  [ 1/ 2] ✅ Validate business rules  █░  invariants checked

  [06/10] 🔮 MAIN PROCESS

  [ 1/ 1] 🔄 Update guide._steps  █
  [ 1/ 1] ✅ Update guide._steps  █  guide._steps[2] = 2107

  [07/10] 💾 MUTATION LOG

  └ 📋 guide._steps[2]: 2102 step → 2107 step (+5 step) [SAVE-GUIDE]

  [08/10] ✅ SAVE VERIFY

[DB] saveUser("guest_9e4fb9..."): 100 keys, 10065 bytes
  ├ ✅ SAVE VERIFY: 1/1 paths OK — data persisted

  [09/10] 📤 RESPONSE SNAPSHOT

  ├ ✅ responseData: object — PASS

  ┌ 📸 saveGuide ret=0 ───────────────────────────────────────┐
  └──────────────────────────────────────────────────────────┘


  [10/10] 🏁 EXECUTION SUMMARY


  ═══════════════════════════════════════════

  ✅ SAVE GUIDE COMPLETE

  👤 USER:       guest_9e4fb9520954e69b


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0
  ✅ ASSERTS:     58 PASS / 2 FAIL

  ═══════════════════════════════════════════

✅ guide::saveGuide       OK     ────────────────────────────
  └ ret=0 2 chars (raw) 9ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 9ms

  └ ⏱️ handler: 9ms 

  📤 hangup::saveGuideTeam  ──────────────────────────────────
  ├ 📤 action: saveGuideTeam
  ├ 📤 type: hangup
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 counter: 11
  └ 📤 serverId: ?

  ┌────────────────────────────────────────────────────────┐
  │  📤 REQUEST PAYLOAD                                      │
  ├────────────────────────────────────────────────────────┤
  │   type                 "hangup"
  │   action               "saveGuideTeam"
  │   userId               "guest_9e4fb9520954e69b"
  │   team                 [{"heroId":"de4c6801-8341-4c0e-acc3-7929b24c79a7"}
  │   supers               ["1120561"]
  └   version              "1.0"
  └────────────────────────────────────────────────────────┘

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: saveGuideTeam  (hangup/saveGuideTeam)  userId=guest_9e4fb95209
  ══════════════════════════════════════════════════════════


  [01/10] 🟢 ENTRY CHECK

  [ 1/ 3] 🔄 Validate request fields  █░░
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 team: 5 hero(es)
  └ 📤 supers: 1120561
  [ 1/ 3] ✅ Validate request fields  █░░  team=5 heroes

  [02/10] 📦 DATA INJECTION CHECK

  [ 1/ 1] 🔄 Load userData from DB  █
  └ 📋 hangupTeam: (none)
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded

  [03/10] 🔍 DEEP TYPE SCAN

  [ 1/ 2] 🔄 Type assert request fields  █░
  ├ ✅ userId: string — PASS
  ├ ✅ team: array — PASS
  ├ ✅ supers: array — PASS
  [ 1/ 2] ✅ Type assert request fields  █░  all types verified

  [04/10] ⚡ PLAYER STATE SNAPSHOT

  [ 1/ 1] 🔄 Snapshot hangupTeam data  █
  ├ 📋 team.length: 0
  └ 📋 supers.length: 0
  [ 1/ 1] ✅ Snapshot hangupTeam data  █  team=0 supers=0

  [05/10] 🧮 INVARIANT CHECK

  [ 1/ 2] 🔄 Validate business rules  █░
  ├ ✅ team is array — PASS
  ├ ✅ team length <= 6 — PASS
  [ 1/ 2] ✅ Validate business rules  █░  invariants checked

  [06/10] 🔮 MAIN PROCESS

  [ 1/ 1] 🔄 Update hangupTeam  █
  [ 1/ 1] ✅ Update hangupTeam  █  team=5 heroes saved

  [07/10] 💾 MUTATION LOG


  ⚠️  mutationLog: before/after must be numbers
       SOURCE: mutationLog(hangupTeam.team)
       ACTION: Auto-extracting numbers from strings. Fix handler to pass numeric values.
       REASON: Got before=string after=string. Delta calculation requires numbers.

  └ 📋 hangupTeam.team: 0 heroes → 5 heroes (+5 heroes) [SAVE-GUIDE-TEAM]

  ⚠️  mutationLog: before/after must be numbers
       SOURCE: mutationLog(hangupTeam.supers)
       ACTION: Auto-extracting numbers from strings. Fix handler to pass numeric values.
       REASON: Got before=string after=string. Delta calculation requires numbers.

  └ 📋 hangupTeam.supers: 0 supers → 1 supers (+1 supers) [SAVE-GUIDE-TEAM]

  [08/10] ✅ SAVE VERIFY

[DB] saveUser("guest_9e4fb9..."): 101 keys, 10180 bytes
  ├ ✅ SAVE VERIFY: 2/2 paths OK — data persisted

  [09/10] 📤 RESPONSE SNAPSHOT

  ├ ✅ responseData: object — PASS

  ┌ 📸 saveGuideTeam ret=0 ───────────────────────────────────┐
  └──────────────────────────────────────────────────────────┘


  [10/10] 🏁 EXECUTION SUMMARY


  ═══════════════════════════════════════════

  ✅ SAVE GUIDE TEAM COMPLETE

  👤 USER:       guest_9e4fb9520954e69b


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0
  ✅ ASSERTS:     64 PASS / 2 FAIL

  ═══════════════════════════════════════════

✅ hangup::saveGuideTeam  OK     ────────────────────────────
  └ ret=0 2 chars (raw) 9ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 9ms

  └ ⏱️ handler: 10ms 

  📤 hangup::checkBattleResult ──────────────────────────────────
  ├ 📤 action: checkBattleResult
  ├ 📤 type: hangup
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 counter: 12
  └ 📤 serverId: ?

  ┌────────────────────────────────────────────────────────┐
  │  📤 REQUEST PAYLOAD                                      │
  ├────────────────────────────────────────────────────────┤
  │   type                 "hangup"
  │   action               "checkBattleResult"
  │   userId               "guest_9e4fb9520954e69b"
  │   version              "1.0"
  └   isGuide              true
  └────────────────────────────────────────────────────────┘

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: checkBattleResult  (hangup/checkBattleResult)  userId=guest_9e4fb95209
  ══════════════════════════════════════════════════════════


  [01/10] 🟢 ENTRY CHECK

  [ 1/10] 🔄 Validate request  █░░░░░░░░░
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 isGuide: true
  ├ 📤 battleId: (none)
  ├ 📤 checkResult: (none)
  ├ 📤 runaway: (none)
  └ 📤 super: (none)
  [ 1/10] ✅ Validate request  █░░░░░░░░░

  [02/10] 📦 DATA INJECTION CHECK

  [ 2/10] 🔄 Load data  ██░░░░░░░░
🟢 06:59:00.971 INFO  📋 CONFIG   ▸ Resource loaded: lesson.json
  ├ 📋 entries: 611
  ├ 📋 bytes: 833203
  └ 📋 path: /var/www/html/resource/json/lesson.json
  [ 2/10] ✅ Load data  ██░░░░░░░░  lesson.json=611 entries

  [03/10] ⚡ PLAYER STATE SNAPSHOT

  [ 3/10] 🔄 Read progress  ███░░░░░░░
  ├ 📋 curLess: 10101
  ├ 📋 maxPassLesson: 0
  ├ 📋 maxPassChapter: 0
  └ 📋 source: user.hangup
  [ 3/10] ✅ Read progress  ███░░░░░░░  lesson=10101

  [04/10] 🧮 INVARIANT CHECK

  [ 4/10] 🔄 Determine outcome  ████░░░░░░
  ├ 📋 mode: TUTORIAL (forced win)
  └ 📋 isGuide: true
  [ 4/10] ✅ Determine outcome  ████░░░░░░  WIN (0)

  [05/10] 🔮 MAIN PROCESS

  [ 5/10] 🔄 Build response  █████░░░░░
  ├ 📋 lesson: 10101
  ├ 📋 lessonName: lesson_name_1
  ├ 📋 lessonType: 1
  ├ 📋 thisChapter: 801
  └ 📋 nextID: 10102
  └ 📋 #1: item=103 qty=+20 old=0 new=20
  └ 📋 #2: item=102 qty=+1000 old=0 new=1000
  └ 📋 #3: item=3001 qty=+3 old=0 new=3
  └ 📋 #4: item=3002 qty=+3 old=0 new=3
  └ 📋 #5: item=101 qty=+20 old=0 new=20
  └ 📋 totalProps._items[102] (GOLD): 0 gold → 1000 gold (+1000 gold) [BATTLE-REWARD]
  └ 📋 totalProps._items[101] (DIAMOND): 0 diamond → 20 diamond (+20 diamond) [BATTLE-REWARD]
  └ 📋 totalProps._items[103] (EXP): 0 exp → 20 exp (+20 exp) [BATTLE-REWARD]
  ├ 📋 curLess: 10102
  ├ 📋 maxPassLesson: 10101
  ├ 📋 maxPassChapter: 801
  ├ 📋 nextLessonId: 10102
  └ 📋 source: lesson.json nextID/thisChapter
  [ 5/10] ✅ Build response  █████░░░░░  WIN rewards=5 lesson=10102

  [06/10] 💾 MUTATION LOG

  └ 📋 hangup._curLess: 10101 → 10102 (+1) [BATTLE-PROGRESSION]
  └ 📋 hangup._maxPassLesson: 0 → 10101 (+10101) [BATTLE-PROGRESSION]
  └ 📋 hangup._maxPassChapter: 0 → 801 (+801) [BATTLE-PROGRESSION]

  [07/10] ✅ SAVE VERIFY

[DB] saveUser("guest_9e4fb9..."): 101 keys, 10254 bytes
  ├ ✅ SAVE VERIFY: 4/4 paths OK — data persisted

  [08/10] 📤 RESPONSE SNAPSHOT


  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 _battleResult            = 0  L104882: 0 == e._battleResult -> true (tutorial forced win)
  ├ 🔒 _changeInfo._items       = 5 items  L97686: getBattleAwardItems iterates _changeInfo._items for {_id, _num}
  ├ 🔒 _curLess                 = 10102  L104892/L97751: OnHookSingleton.lastSection = e._curLess
  └ 🔒 _maxPassLesson           = 10101  L104893/L97751: OnHookSingleton.maxPassLesson = e._maxPassLesson
  ✅ CRITICAL AUDIT: 4/4 PASSED


  [09/10] 🔍 DEEP TYPE SCAN

  ├ ✅ responseData._battleResult: number — PASS
  ├ ✅ responseData._changeInfo._items: object — PASS
  ├ ✅ responseData._curLess: number — PASS
  ├ ✅ Win gives at least 1 reward item — PASS
  ├ ✅ Lose gives 0 reward items — PASS

  [10/10] 🏁 EXECUTION SUMMARY


  ═══════════════════════════════════════════

  ✅ CHECK BATTLE RESULT

  👤 USER:       guest_9e4fb9520954e69b
  📦 FIELDS:     4


  ⚠️ WARNINGS:   14
  ❌ ERRORS:     2
  ✅ ASSERTS:     69 PASS / 2 FAIL

  ═══════════════════════════════════════════


  ┌ 📸 CHECK BATTLE RESULT ret=0 ─────────────────────────────┐
  ├   _battleResult                0
  ├   _curLess                     10102
  ├   _maxPassLesson               10101
  └   _changeInfo                  Object{1}
  └──────────────────────────────────────────────────────────┘

✅ hangup::checkBattleResult OK     ────────────────────────────
  └ ret=0 218 chars (raw) 25ms

  ✅ SUCCESS  📏 data= 218 chars  📦 proto= RAW  ⏱️ time= 25ms

  └ ⏱️ handler: 25ms 

  📤 buryPoint::guideBattle ──────────────────────────────────
  ├ 📤 action: guideBattle
  ├ 📤 type: buryPoint
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 counter: 13
  └ 📤 serverId: ?

  ┌────────────────────────────────────────────────────────┐
  │  📤 REQUEST PAYLOAD                                      │
  ├────────────────────────────────────────────────────────┤
  │   type                 "buryPoint"
  │   action               "guideBattle"
  │   userId               "guest_9e4fb9520954e69b"
  │   point                "load"
  │   passLesson           10101
  └   version              "1.0"
  └────────────────────────────────────────────────────────┘

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: guideBattle  (buryPoint/guideBattle)  userId=guest_9e4fb95209
  ══════════════════════════════════════════════════════════


  [01/10] 🟢 ENTRY CHECK

  [ 1/ 3] 🔄 Validate request fields  █░░
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 point: load
  ├ 📤 passLesson: 10101
  └ 📤 version: 1.0
  [ 1/ 3] ✅ Validate request fields  █░░  point=load

  [02/10] 📦 DATA INJECTION CHECK

  [ 1/ 1] 🔄 Check data injection requirements  █
  ├ 📋 dbLoadRequired: false
  └ 📋 reason: fire-and-forget analytics — client ignores response
  [ 1/ 1] ✅ Check data injection requirements  █  no DB load needed (analytics)

  [03/10] 🔍 DEEP TYPE SCAN

  [ 1/ 3] 🔄 Type assert request fields  █░░
  ├ ✅ userId: string — PASS
  ├ ✅ point: string — PASS
  ├ ✅ passLesson: number — PASS
  [ 1/ 3] ✅ Type assert request fields  █░░  all types verified

  [04/10] ⚡ PLAYER STATE SNAPSHOT

  [ 1/ 1] 🔄 Check player state requirements  █
  ├ 📋 status: N/A — analytics handler
  └ 📋 detail: no player state read — fire-and-forget telemetry
  [ 1/ 1] ✅ Check player state requirements  █  analytics handler, no player state read

  [05/10] 🧮 INVARIANT CHECK

  [ 1/ 1] 🔄 Validate point value  █
  ├ ✅ point is valid enum — PASS
  [ 1/ 1] ✅ Validate point value  █  point="load" is valid

  [06/10] 🔮 MAIN PROCESS

  [ 1/ 1] 🔄 Process analytics event  █
🟢 06:59:02.636 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received: point=load passLesson=10101
  ├ 📋 userId: guest_9e4fb9520954e6
  ├ 📋 point: load
  ├ 📋 passLesson: 10101
  └ 📋 version: 1.0
  [ 1/ 1] ✅ Process analytics event  █  analytics event logged

  [07/10] 💾 MUTATION LOG

  ├ 📋 status: no data mutations (analytics handler)
  └ 📋 reason: fire-and-forget — client ignores response, no DB writes

  [08/10] ✅ SAVE VERIFY

  ├ 📋 status: no DB save (fire-and-forget handler)
  └ 📋 reason: analytics only — no persistent data changes

  [09/10] 📤 RESPONSE SNAPSHOT

  ├ ✅ responseData: object — PASS

  ┌ 📸 guideBattle ret=0 ─────────────────────────────────────┐
  └──────────────────────────────────────────────────────────┘


  [10/10] 🏁 EXECUTION SUMMARY


  ═══════════════════════════════════════════

  ✅ GUIDE BATTLE ANALYTICS COMPLETE

  👤 USER:       guest_9e4fb9520954e69b


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0
  ✅ ASSERTS:     74 PASS / 2 FAIL

  ═══════════════════════════════════════════

✅ buryPoint::guideBattle OK     ────────────────────────────
  └ ret=0 2 chars (raw) 4ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 4ms

  └ ⏱️ handler: 4ms 

  📤 buryPoint::guideBattle ──────────────────────────────────
  ├ 📤 action: guideBattle
  ├ 📤 type: buryPoint
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 counter: 14
  └ 📤 serverId: ?

  ┌────────────────────────────────────────────────────────┐
  │  📤 REQUEST PAYLOAD                                      │
  ├────────────────────────────────────────────────────────┤
  │   type                 "buryPoint"
  │   action               "guideBattle"
  │   userId               "guest_9e4fb9520954e69b"
  │   point                "battle"
  │   passLesson           10101
  └   version              "1.0"
  └────────────────────────────────────────────────────────┘

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: guideBattle  (buryPoint/guideBattle)  userId=guest_9e4fb95209
  ══════════════════════════════════════════════════════════


  [01/10] 🟢 ENTRY CHECK

  [ 1/ 3] 🔄 Validate request fields  █░░
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 point: battle
  ├ 📤 passLesson: 10101
  └ 📤 version: 1.0
  [ 1/ 3] ✅ Validate request fields  █░░  point=battle

  [02/10] 📦 DATA INJECTION CHECK

  [ 1/ 1] 🔄 Check data injection requirements  █
  ├ 📋 dbLoadRequired: false
  └ 📋 reason: fire-and-forget analytics — client ignores response
  [ 1/ 1] ✅ Check data injection requirements  █  no DB load needed (analytics)

  [03/10] 🔍 DEEP TYPE SCAN

  [ 1/ 3] 🔄 Type assert request fields  █░░
  ├ ✅ userId: string — PASS
  ├ ✅ point: string — PASS
  ├ ✅ passLesson: number — PASS
  [ 1/ 3] ✅ Type assert request fields  █░░  all types verified

  [04/10] ⚡ PLAYER STATE SNAPSHOT

  [ 1/ 1] 🔄 Check player state requirements  █
  ├ 📋 status: N/A — analytics handler
  └ 📋 detail: no player state read — fire-and-forget telemetry
  [ 1/ 1] ✅ Check player state requirements  █  analytics handler, no player state read

  [05/10] 🧮 INVARIANT CHECK

  [ 1/ 1] 🔄 Validate point value  █
  ├ ✅ point is valid enum — PASS
  [ 1/ 1] ✅ Validate point value  █  point="battle" is valid

  [06/10] 🔮 MAIN PROCESS

  [ 1/ 1] 🔄 Process analytics event  █
🟢 06:59:13.491 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received: point=battle passLesson=10101
  ├ 📋 userId: guest_9e4fb9520954e6
  ├ 📋 point: battle
  ├ 📋 passLesson: 10101
  └ 📋 version: 1.0
  [ 1/ 1] ✅ Process analytics event  █  analytics event logged

  [07/10] 💾 MUTATION LOG

  ├ 📋 status: no data mutations (analytics handler)
  └ 📋 reason: fire-and-forget — client ignores response, no DB writes

  [08/10] ✅ SAVE VERIFY

  ├ 📋 status: no DB save (fire-and-forget handler)
  └ 📋 reason: analytics only — no persistent data changes

  [09/10] 📤 RESPONSE SNAPSHOT

  ├ ✅ responseData: object — PASS

  ┌ 📸 guideBattle ret=0 ─────────────────────────────────────┐
  └──────────────────────────────────────────────────────────┘


  [10/10] 🏁 EXECUTION SUMMARY


  ═══════════════════════════════════════════

  ✅ GUIDE BATTLE ANALYTICS COMPLETE

  👤 USER:       guest_9e4fb9520954e69b


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0
  ✅ ASSERTS:     79 PASS / 2 FAIL

  ═══════════════════════════════════════════

✅ buryPoint::guideBattle OK     ────────────────────────────
  └ ret=0 2 chars (raw) 1ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 1ms

  └ ⏱️ handler: 1ms 

  📤 buryPoint::guideBattle ──────────────────────────────────
  ├ 📤 action: guideBattle
  ├ 📤 type: buryPoint
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 counter: 15
  └ 📤 serverId: ?

  ┌────────────────────────────────────────────────────────┐
  │  📤 REQUEST PAYLOAD                                      │
  ├────────────────────────────────────────────────────────┤
  │   type                 "buryPoint"
  │   action               "guideBattle"
  │   userId               "guest_9e4fb9520954e69b"
  │   point                "home"
  │   passLesson           10101
  └   version              "1.0"
  └────────────────────────────────────────────────────────┘

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: guideBattle  (buryPoint/guideBattle)  userId=guest_9e4fb95209
  ══════════════════════════════════════════════════════════


  [01/10] 🟢 ENTRY CHECK

  [ 1/ 3] 🔄 Validate request fields  █░░
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 point: home
  ├ 📤 passLesson: 10101
  └ 📤 version: 1.0
  [ 1/ 3] ✅ Validate request fields  █░░  point=home

  [02/10] 📦 DATA INJECTION CHECK

  [ 1/ 1] 🔄 Check data injection requirements  █
  ├ 📋 dbLoadRequired: false
  └ 📋 reason: fire-and-forget analytics — client ignores response
  [ 1/ 1] ✅ Check data injection requirements  █  no DB load needed (analytics)

  [03/10] 🔍 DEEP TYPE SCAN

  [ 1/ 3] 🔄 Type assert request fields  █░░
  ├ ✅ userId: string — PASS
  ├ ✅ point: string — PASS
  ├ ✅ passLesson: number — PASS
  [ 1/ 3] ✅ Type assert request fields  █░░  all types verified

  [04/10] ⚡ PLAYER STATE SNAPSHOT

  [ 1/ 1] 🔄 Check player state requirements  █
  ├ 📋 status: N/A — analytics handler
  └ 📋 detail: no player state read — fire-and-forget telemetry
  [ 1/ 1] ✅ Check player state requirements  █  analytics handler, no player state read

  [05/10] 🧮 INVARIANT CHECK

  [ 1/ 1] 🔄 Validate point value  █
  ├ ✅ point is valid enum — PASS
  [ 1/ 1] ✅ Validate point value  █  point="home" is valid

  [06/10] 🔮 MAIN PROCESS

  [ 1/ 1] 🔄 Process analytics event  █
🟢 06:59:14.486 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received: point=home passLesson=10101
  ├ 📋 userId: guest_9e4fb9520954e6
  ├ 📋 point: home
  ├ 📋 passLesson: 10101
  └ 📋 version: 1.0
  [ 1/ 1] ✅ Process analytics event  █  analytics event logged

  [07/10] 💾 MUTATION LOG

  ├ 📋 status: no data mutations (analytics handler)
  └ 📋 reason: fire-and-forget — client ignores response, no DB writes

  [08/10] ✅ SAVE VERIFY

  ├ 📋 status: no DB save (fire-and-forget handler)
  └ 📋 reason: analytics only — no persistent data changes

  [09/10] 📤 RESPONSE SNAPSHOT

  ├ ✅ responseData: object — PASS

  ┌ 📸 guideBattle ret=0 ─────────────────────────────────────┐
  └──────────────────────────────────────────────────────────┘


  [10/10] 🏁 EXECUTION SUMMARY


  ═══════════════════════════════════════════

  ✅ GUIDE BATTLE ANALYTICS COMPLETE

  👤 USER:       guest_9e4fb9520954e69b


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0
  ✅ ASSERTS:     84 PASS / 2 FAIL

  ═══════════════════════════════════════════

✅ buryPoint::guideBattle OK     ────────────────────────────
  └ ret=0 2 chars (raw) 4ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 4ms

  └ ⏱️ handler: 4ms 

  📤 activity::getActivityBrief ──────────────────────────────────
  ├ 📤 action: getActivityBrief
  ├ 📤 type: activity
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 counter: 16
  └ 📤 serverId: ?

  ┌────────────────────────────────────────────────────────┐
  │  📤 REQUEST PAYLOAD                                      │
  ├────────────────────────────────────────────────────────┤
  │   type                 "activity"
  │   action               "getActivityBrief"
  │   userId               "guest_9e4fb9520954e69b"
  └   version              "1.0"
  └────────────────────────────────────────────────────────┘
🟡 06:59:14.686 WARN  ⚙️ HANDLER  ▸ Unknown type "activity" — no handlers registered for this type
  ├ 📋 types: user, friend, heroImage, hero, userMsg, guide, hangup, buryPoint, summon
  └ 📋 action: getActivityBrief

  📤 guide::saveGuide       ──────────────────────────────────
  ├ 📤 action: saveGuide
  ├ 📤 type: guide
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 counter: 17
  └ 📤 serverId: ?

  ┌────────────────────────────────────────────────────────┐
  │  📤 REQUEST PAYLOAD                                      │
  ├────────────────────────────────────────────────────────┤
  │   type                 "guide"
  │   action               "saveGuide"
  │   userId               "guest_9e4fb9520954e69b"
  │   guideType            2
  │   step                 2206
  └   version              "1.0"
  └────────────────────────────────────────────────────────┘

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: saveGuide  (guide/saveGuide)  userId=guest_9e4fb95209
  ══════════════════════════════════════════════════════════


  [01/10] 🟢 ENTRY CHECK

  [ 1/ 3] 🔄 Validate request fields  █░░
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 guideType: 2
  └ 📤 step: 2206
  [ 1/ 3] ✅ Validate request fields  █░░  type=2 step=2206

  [02/10] 📦 DATA INJECTION CHECK

  [ 1/ 1] 🔄 Load userData from DB  █
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded

  [03/10] 🔍 DEEP TYPE SCAN

  [ 1/ 2] 🔄 Type assert request fields  █░
  ├ ✅ userId: string — PASS
  ├ ✅ guideType: number — PASS
  ├ ✅ step: number — PASS
  [ 1/ 2] ✅ Type assert request fields  █░  all types verified

  [04/10] ⚡ PLAYER STATE SNAPSHOT

  [ 1/ 1] 🔄 Snapshot guide._steps before modification  █
  ├ 📋 guideType: 2
  ├ 📋 currentStep: 2107
  └ 📋 allSteps: {"2":2107}
  [ 1/ 1] ✅ Snapshot guide._steps before modification  █  guide._steps[2] was 2107

  [05/10] 🧮 INVARIANT CHECK

  [ 1/ 2] 🔄 Validate business rules  █░
  ├ ✅ guideType is valid enum — PASS
  ├ ✅ step is positive integer — PASS
  [ 1/ 2] ✅ Validate business rules  █░  invariants checked

  [06/10] 🔮 MAIN PROCESS

  [ 1/ 1] 🔄 Update guide._steps  █
  [ 1/ 1] ✅ Update guide._steps  █  guide._steps[2] = 2206

  [07/10] 💾 MUTATION LOG

  └ 📋 guide._steps[2]: 2107 step → 2206 step (+99 step) [SAVE-GUIDE]

  [08/10] ✅ SAVE VERIFY

[DB] saveUser("guest_9e4fb9..."): 101 keys, 10254 bytes
  ├ ✅ SAVE VERIFY: 1/1 paths OK — data persisted

  [09/10] 📤 RESPONSE SNAPSHOT

  ├ ✅ responseData: object — PASS

  ┌ 📸 saveGuide ret=0 ───────────────────────────────────────┐
  └──────────────────────────────────────────────────────────┘


  [10/10] 🏁 EXECUTION SUMMARY


  ═══════════════════════════════════════════

  ✅ SAVE GUIDE COMPLETE

  👤 USER:       guest_9e4fb9520954e69b


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0
  ✅ ASSERTS:     90 PASS / 2 FAIL

  ═══════════════════════════════════════════

✅ guide::saveGuide       OK     ────────────────────────────
  └ ret=0 2 chars (raw) 8ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 8ms

  └ ⏱️ handler: 8ms 

  📤 summon::summonOneFree  ──────────────────────────────────
  ├ 📤 action: summonOneFree
  ├ 📤 type: summon
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 counter: 18
  └ 📤 serverId: ?

  ┌────────────────────────────────────────────────────────┐
  │  📤 REQUEST PAYLOAD                                      │
  ├────────────────────────────────────────────────────────┤
  │   type                 "summon"
  │   action               "summonOneFree"
  │   userId               "guest_9e4fb9520954e69b"
  │   sType                3
  │   isGuide              true
  └   version              "1.0"
  └────────────────────────────────────────────────────────┘

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: summonOneFree  (summon/summonOneFree)  userId=guest_9e4fb95209
  ══════════════════════════════════════════════════════════


  [01/10] 🟢 ENTRY CHECK

🟢 06:59:18.459 INFO  ⚪ SUMMON-FREE ▸ summonOneFree REQUEST RECEIVED
  ├ 📤 userId: guest_9e4fb9520954e69b
  ├ 📤 sType: 3
  └ 📤 isGuide: true

  [02/10] 📦 DATA INJECTION CHECK

🟢 06:59:18.460 INFO  ⚪ SUMMON-FREE ▸ userData loaded successfully (101 top-level keys)
  ├ ✅ userData: object — PASS
🟢 06:59:18.461 INFO  ⚪ SUMMON-FREE ▸ Deep clone SUCCESS — user object isolated from DB cache
  ├ 📋 userData keys: 101
  ├ 📋 deepClone: OK (JSON.parse/JSON.stringify)
  └ 📋 purpose: Prevent mutating DB cache directly

  [03/10] 🔍 DEEP TYPE SCAN

  ├ ✅ request.sType: number — PASS
  ├ ✅ user.summon: object — PASS
  ├ ✅ user.heros: object — PASS
  ├ ✅ user.totalProps: object — PASS
🟢 06:59:18.464 INFO  📋 CONFIG   ▸ Resource loaded: summonPool.json
  ├ 📋 entries: 200
  ├ 📋 bytes: 75170
  └ 📋 path: /var/www/html/resource/json/summonPool.json
🟢 06:59:18.486 INFO  📋 CONFIG   ▸ Resource loaded: summonRandom.json
  ├ 📋 entries: 10
  ├ 📋 bytes: 2157
  └ 📋 path: /var/www/html/resource/json/summonRandom.json
  ├ ⚙️ poolId: 1
  ├ ⚙️ poolType: summonSuper
  ├ ⚙️ freeTimer: 86400s
  └ ⚙️ summonEnergyGain: 10

  [04/10] ⚡ PLAYER STATE SNAPSHOT

🟢 06:59:18.487 INFO  ⚪ SUMMON-FREE ▸ Free timer OK — proceeding with summon

  [05/10] 🧮 INVARIANT CHECK

🟢 06:59:18.487 INFO  ⚪ SUMMON-FREE ▸ [GUIDE] Predetermined hero: displayId=1309 quality=purple

  [06/10] 🔮 MAIN PROCESS


  ⚠️  HERO OBJECT TYPE: heroObj._fragment wrong type

  ├ 🦸 heroInstanceId: 86f7f994-fab...
  ├ 🦸 displayId: 1309
  ├ 🦸 heroName: hero_name_31
  ├ 🦸 quality: purple
  ├ 🦸 heroColor: 4
  └ 🦸 heroType: body

  [07/10] 💾 MUTATION LOG

  ├ 📋 mode: TUTORIAL (no energy/timer update)
  ├ 📋 oldEnergy: 0
  ├ 📋 newEnergy: 0
  ├ 📋 energyGained: 0 (skipped)
  ├ 📋 freeTimeField: _canSuperFreeTime
  ├ 📋 newFreeTime: UNCHANGED
  ├ 📋 summonTimes[1]: 1
  └ 📋 totalHeroes: 2

  [08/10] ✅ SAVE VERIFY

  └ 📋 summon._energy: 0 energy → 0 energy (+0 energy) [SUMMON-FREE]
  └ 📋 heros._heros (total count): 1 heroes → 2 heroes (+1 heroes) [SUMMON-FREE]
[DB] saveUser("guest_9e4fb9..."): 101 keys, 10944 bytes
🟢 06:59:18.495 INFO  ⚪ SUMMON-FREE ▸ User data SAVED

  [09/10] 📤 RESPONSE SNAPSHOT

🟢 06:59:18.496 INFO  ⚪ SUMMON-FREE ▸ summonOneFree SUCCESS
  ├ ✅ responseData._addTotal: array — PASS
  ├ ✅ responseData._addTotal[0]._heroId: string — PASS
  ├ ✅ responseData._addTotal[0]._heroDisplayId: number — PASS
  ├ ✅ responseData._addTotal[0]._heroQuality: number — PASS
  ├ ✅ responseData._energy: number — PASS
  ├ ✅ COMMON free timer = 6 hours (21600s) — PASS
  ├ ✅ SUPER energy gain = 10 per free pull — PASS
  ├ ✅ Tutorial does NOT send _canFreeTime — PASS
  ├ ✅ Hero has valid displayId from hero.json — PASS

  ┌ 📸 SUMMON-FREE ret=0 ─────────────────────────────────────┐
  ├   _addTotal                    Array[1]
  ├   _changeInfo                  Object{1}
  └   _energy                      0
  └──────────────────────────────────────────────────────────┘


  [10/10] 🏁 EXECUTION SUMMARY


  ═══════════════════════════════════════════

  ✅ SUMMON FREE COMPLETE

  👤 USER:       guest_9e4fb9520954e69b


  ⚠️ WARNINGS:   15
  ❌ ERRORS:     2
  ✅ ASSERTS:     104 PASS / 2 FAIL

  ═══════════════════════════════════════════

✅ summon::summonOneFree  OK     ────────────────────────────
  └ ret=0 737 chars (raw) 47ms

  ✅ SUCCESS  📏 data= 737 chars  📦 proto= RAW  ⏱️ time= 47ms

  └ ⏱️ handler: 47ms 

  📤 hero::getAttrs         ──────────────────────────────────
  ├ 📤 action: getAttrs
  ├ 📤 type: hero
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 counter: 19
  └ 📤 serverId: ?

  ┌────────────────────────────────────────────────────────┐
  │  📤 REQUEST PAYLOAD                                      │
  ├────────────────────────────────────────────────────────┤
  │   type                 "hero"
  │   action               "getAttrs"
  │   userId               "guest_9e4fb9520954e69b"
  │   heros                ["86f7f994-fab9-48bb-8fb9-445c327a9e51"]
  └   version              "1.0"
  └────────────────────────────────────────────────────────┘

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: getAttrs  (hero/getAttrs)  userId=guest_9e4fb95209
  ══════════════════════════════════════════════════════════


  [01/10] 🟢 ENTRY CHECK

  [ 1/ 2] 🔄 Validate request fields  █░
  ├ 📤 userId: guest_9e4fb9520954e6
  └ 📤 heros: 86f7f994-fab9-48bb-8fb9-445c327a9e51
  [ 1/ 2] ✅ Validate request fields  █░  1 hero(es) requested

  [02/10] 📦 DATA INJECTION CHECK

  [ 1/ 1] 🔄 Load userData from DB  █
  └ 📋 heros._heros: 2 heroes
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded

  [03/10] 🔍 DEEP TYPE SCAN

  [ 1/ 2] 🔄 Type assert request fields  █░
  ├ ✅ userId: string — PASS
  ├ ✅ heros: array — PASS
  [ 1/ 2] ✅ Type assert request fields  █░  types verified

  [04/10] ⚡ PLAYER STATE SNAPSHOT

  [ 1/ 1] 🔄 Snapshot hero request vs found  █
  ├ 📋 requested: 1 heroes: 86f7f994-fab9-48bb-8fb9-445c327a9e51
  ├ 📋 found: 1 heroes: 86f7f994-fab9-48bb-8fb9-445c327a9e51
  └ 📋 missing: 0 heroes: (none)
  [ 1/ 1] ✅ Snapshot hero request vs found  █  1/1 heroes found

  [05/10] 🧮 INVARIANT CHECK

  [ 1/ 1] 🔄 Validate hero availability  █
  ├ ✅ all requested heroes exist in userData — PASS
  [ 1/ 1] ✅ Validate hero availability  █  all heroes found

  [06/10] 🔮 MAIN PROCESS

  [ 1/ 1] 🔄 Calculate hero attributes  █
  ├ 📋 heroId: 86f7f994-fab9-48bb-8fb9-445c327a9e51
  ├ 📋 displayId: 1309
  └ 📋 level: 1
  ├ 📋 heroType: body
  ├ 📋 weightedSum: 3760.0
  └ 📋 power: 3760
  ├ 📋 hp: 3136
  ├ 📋 attack: 93
  ├ 📋 armor: 153
  └ 📋 power: 3760
  [ 1/ 1] ✅ Calculate hero attributes  █  1 heroes calculated

  [07/10] 💾 MUTATION LOG

  ├ 📋 status: read-only, no mutations
  └ 📋 reason: hero attributes are calculated from config — no userData writes

  [08/10] ✅ SAVE VERIFY

  ├ 📋 status: no DB save (read-only handler)
  └ 📋 reason: attribute calculation is a read-only operation

  [09/10] 📤 RESPONSE SNAPSHOT

  ├ ✅ _attrs: object — PASS
  ├ ✅ _baseAttrs: object — PASS

  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 _attrs                   = Object{1}  L133726: for(var o in t._attrs) — keyed by hero index, each has _items with calculated attrs
  ├ 🔒 _baseAttrs               = Object{1}  L133731: t._baseAttrs[o] — keyed by hero index, each has _items with base attrs (before talent)
  └ 🔒 POWER (attr 21)          = calculated per hero  L133821: 21==p._id → heroBaseAttr.power = floor(num)
  ✅ CRITICAL AUDIT: 3/3 PASSED


  ┌ 📸 getAttrs ret=0 ────────────────────────────────────────┐
  ├   _attrs                       Object{1}
  └   _baseAttrs                   Object{1}
  └──────────────────────────────────────────────────────────┘


  [10/10] 🏁 EXECUTION SUMMARY


  ═══════════════════════════════════════════

  ✅ HERO GET ATTRS COMPLETE

  👤 USER:       guest_9e4fb9520954e69b
  📦 FIELDS:     2


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0
  ✅ ASSERTS:     109 PASS / 2 FAIL

  ═══════════════════════════════════════════

✅ hero::getAttrs         OK     ────────────────────────────
  └ ret=0 392 chars (raw) 4ms

  ✅ SUCCESS  📏 data= 392 chars  📦 proto= RAW  ⏱️ time= 4ms

  └ ⏱️ handler: 4ms 

  📤 guide::saveGuide       ──────────────────────────────────
  ├ 📤 action: saveGuide
  ├ 📤 type: guide
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 counter: 20
  └ 📤 serverId: ?

  ┌────────────────────────────────────────────────────────┐
  │  📤 REQUEST PAYLOAD                                      │
  ├────────────────────────────────────────────────────────┤
  │   type                 "guide"
  │   action               "saveGuide"
  │   userId               "guest_9e4fb9520954e69b"
  │   guideType            2
  │   step                 2210
  └   version              "1.0"
  └────────────────────────────────────────────────────────┘

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: saveGuide  (guide/saveGuide)  userId=guest_9e4fb95209
  ══════════════════════════════════════════════════════════


  [01/10] 🟢 ENTRY CHECK

  [ 1/ 3] 🔄 Validate request fields  █░░
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 guideType: 2
  └ 📤 step: 2210
  [ 1/ 3] ✅ Validate request fields  █░░  type=2 step=2210

  [02/10] 📦 DATA INJECTION CHECK

  [ 1/ 1] 🔄 Load userData from DB  █
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded

  [03/10] 🔍 DEEP TYPE SCAN

  [ 1/ 2] 🔄 Type assert request fields  █░
  ├ ✅ userId: string — PASS
  ├ ✅ guideType: number — PASS
  ├ ✅ step: number — PASS
  [ 1/ 2] ✅ Type assert request fields  █░  all types verified

  [04/10] ⚡ PLAYER STATE SNAPSHOT

  [ 1/ 1] 🔄 Snapshot guide._steps before modification  █
  ├ 📋 guideType: 2
  ├ 📋 currentStep: 2206
  └ 📋 allSteps: {"2":2206}
  [ 1/ 1] ✅ Snapshot guide._steps before modification  █  guide._steps[2] was 2206

  [05/10] 🧮 INVARIANT CHECK

  [ 1/ 2] 🔄 Validate business rules  █░
  ├ ✅ guideType is valid enum — PASS
  ├ ✅ step is positive integer — PASS
  [ 1/ 2] ✅ Validate business rules  █░  invariants checked

  [06/10] 🔮 MAIN PROCESS

  [ 1/ 1] 🔄 Update guide._steps  █
  [ 1/ 1] ✅ Update guide._steps  █  guide._steps[2] = 2210

  [07/10] 💾 MUTATION LOG

  └ 📋 guide._steps[2]: 2206 step → 2210 step (+4 step) [SAVE-GUIDE]

  [08/10] ✅ SAVE VERIFY

[DB] saveUser("guest_9e4fb9..."): 101 keys, 10944 bytes
  ├ ✅ SAVE VERIFY: 1/1 paths OK — data persisted

  [09/10] 📤 RESPONSE SNAPSHOT

  ├ ✅ responseData: object — PASS

  ┌ 📸 saveGuide ret=0 ───────────────────────────────────────┐
  └──────────────────────────────────────────────────────────┘


  [10/10] 🏁 EXECUTION SUMMARY


  ═══════════════════════════════════════════

  ✅ SAVE GUIDE COMPLETE

  👤 USER:       guest_9e4fb9520954e69b


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0
  ✅ ASSERTS:     115 PASS / 2 FAIL

  ═══════════════════════════════════════════

✅ guide::saveGuide       OK     ────────────────────────────
  └ ret=0 2 chars (raw) 10ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 10ms

  └ ⏱️ handler: 10ms 

  📤 summon::summonOneFree  ──────────────────────────────────
  ├ 📤 action: summonOneFree
  ├ 📤 type: summon
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 counter: 21
  └ 📤 serverId: ?

  ┌────────────────────────────────────────────────────────┐
  │  📤 REQUEST PAYLOAD                                      │
  ├────────────────────────────────────────────────────────┤
  │   type                 "summon"
  │   action               "summonOneFree"
  │   userId               "guest_9e4fb9520954e69b"
  │   sType                1
  │   isGuide              true
  └   version              "1.0"
  └────────────────────────────────────────────────────────┘

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: summonOneFree  (summon/summonOneFree)  userId=guest_9e4fb95209
  ══════════════════════════════════════════════════════════


  [01/10] 🟢 ENTRY CHECK

🟢 06:59:23.229 INFO  ⚪ SUMMON-FREE ▸ summonOneFree REQUEST RECEIVED
  ├ 📤 userId: guest_9e4fb9520954e69b
  ├ 📤 sType: 1
  └ 📤 isGuide: true

  [02/10] 📦 DATA INJECTION CHECK

🟢 06:59:23.230 INFO  ⚪ SUMMON-FREE ▸ userData loaded successfully (101 top-level keys)
  ├ ✅ userData: object — PASS
🟢 06:59:23.231 INFO  ⚪ SUMMON-FREE ▸ Deep clone SUCCESS — user object isolated from DB cache
  ├ 📋 userData keys: 101
  ├ 📋 deepClone: OK (JSON.parse/JSON.stringify)
  └ 📋 purpose: Prevent mutating DB cache directly

  [03/10] 🔍 DEEP TYPE SCAN

  ├ ✅ request.sType: number — PASS
  ├ ✅ user.summon: object — PASS
  ├ ✅ user.heros: object — PASS
  ├ ✅ user.totalProps: object — PASS
  ├ ⚙️ poolId: 3
  ├ ⚙️ poolType: summonNormal
  ├ ⚙️ freeTimer: 21600s
  └ ⚙️ summonEnergyGain: 0

  [04/10] ⚡ PLAYER STATE SNAPSHOT

🟢 06:59:23.233 INFO  ⚪ SUMMON-FREE ▸ Free timer OK — proceeding with summon

  [05/10] 🧮 INVARIANT CHECK

🟢 06:59:23.233 INFO  ⚪ SUMMON-FREE ▸ [GUIDE] Predetermined hero: displayId=1206 quality=blue

  [06/10] 🔮 MAIN PROCESS


  ⚠️  HERO OBJECT TYPE: heroObj._fragment wrong type

  ├ 🦸 heroInstanceId: 7c0b5974-3a8...
  ├ 🦸 displayId: 1206
  ├ 🦸 heroName: hero_name_17
  ├ 🦸 quality: blue
  ├ 🦸 heroColor: 3
  └ 🦸 heroType: skill

  [07/10] 💾 MUTATION LOG

  ├ 📋 mode: TUTORIAL (no energy/timer update)
  ├ 📋 oldEnergy: 0
  ├ 📋 newEnergy: 0
  ├ 📋 energyGained: 0 (skipped)
  ├ 📋 freeTimeField: _canCommonFreeTime
  ├ 📋 newFreeTime: UNCHANGED
  ├ 📋 summonTimes[3]: 1
  └ 📋 totalHeroes: 3

  [08/10] ✅ SAVE VERIFY

  └ 📋 summon._energy: 0 energy → 0 energy (+0 energy) [SUMMON-FREE]
  └ 📋 heros._heros (total count): 2 heroes → 3 heroes (+1 heroes) [SUMMON-FREE]
[DB] saveUser("guest_9e4fb9..."): 101 keys, 11634 bytes
🟢 06:59:23.238 INFO  ⚪ SUMMON-FREE ▸ User data SAVED

  [09/10] 📤 RESPONSE SNAPSHOT

🟢 06:59:23.238 INFO  ⚪ SUMMON-FREE ▸ summonOneFree SUCCESS
  ├ ✅ responseData._addTotal: array — PASS
  ├ ✅ responseData._addTotal[0]._heroId: string — PASS
  ├ ✅ responseData._addTotal[0]._heroDisplayId: number — PASS
  ├ ✅ responseData._addTotal[0]._heroQuality: number — PASS
  ├ ✅ responseData._energy: number — PASS
  ├ ✅ COMMON free timer = 6 hours (21600s) — PASS
  ├ ✅ SUPER energy gain = 10 per free pull — PASS
  ├ ✅ Tutorial does NOT send _canFreeTime — PASS
  ├ ✅ Hero has valid displayId from hero.json — PASS

  ┌ 📸 SUMMON-FREE ret=0 ─────────────────────────────────────┐
  ├   _addTotal                    Array[1]
  ├   _changeInfo                  Object{1}
  └   _energy                      0
  └──────────────────────────────────────────────────────────┘


  [10/10] 🏁 EXECUTION SUMMARY


  ═══════════════════════════════════════════

  ✅ SUMMON FREE COMPLETE

  👤 USER:       guest_9e4fb9520954e69b


  ⚠️ WARNINGS:   16
  ❌ ERRORS:     2
  ✅ ASSERTS:     129 PASS / 2 FAIL

  ═══════════════════════════════════════════

✅ summon::summonOneFree  OK     ────────────────────────────
  └ ret=0 737 chars (raw) 10ms

  ✅ SUCCESS  📏 data= 737 chars  📦 proto= RAW  ⏱️ time= 10ms

  └ ⏱️ handler: 10ms 

  📤 hero::getAttrs         ──────────────────────────────────
  ├ 📤 action: getAttrs
  ├ 📤 type: hero
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 counter: 22
  └ 📤 serverId: ?

  ┌────────────────────────────────────────────────────────┐
  │  📤 REQUEST PAYLOAD                                      │
  ├────────────────────────────────────────────────────────┤
  │   type                 "hero"
  │   action               "getAttrs"
  │   userId               "guest_9e4fb9520954e69b"
  │   heros                ["7c0b5974-3a8e-459b-a334-ea0ba75bc519"]
  └   version              "1.0"
  └────────────────────────────────────────────────────────┘

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: getAttrs  (hero/getAttrs)  userId=guest_9e4fb95209
  ══════════════════════════════════════════════════════════


  [01/10] 🟢 ENTRY CHECK

  [ 1/ 2] 🔄 Validate request fields  █░
  ├ 📤 userId: guest_9e4fb9520954e6
  └ 📤 heros: 7c0b5974-3a8e-459b-a334-ea0ba75bc519
  [ 1/ 2] ✅ Validate request fields  █░  1 hero(es) requested

  [02/10] 📦 DATA INJECTION CHECK

  [ 1/ 1] 🔄 Load userData from DB  █
  └ 📋 heros._heros: 3 heroes
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded

  [03/10] 🔍 DEEP TYPE SCAN

  [ 1/ 2] 🔄 Type assert request fields  █░
  ├ ✅ userId: string — PASS
  ├ ✅ heros: array — PASS
  [ 1/ 2] ✅ Type assert request fields  █░  types verified

  [04/10] ⚡ PLAYER STATE SNAPSHOT

  [ 1/ 1] 🔄 Snapshot hero request vs found  █
  ├ 📋 requested: 1 heroes: 7c0b5974-3a8e-459b-a334-ea0ba75bc519
  ├ 📋 found: 1 heroes: 7c0b5974-3a8e-459b-a334-ea0ba75bc519
  └ 📋 missing: 0 heroes: (none)
  [ 1/ 1] ✅ Snapshot hero request vs found  █  1/1 heroes found

  [05/10] 🧮 INVARIANT CHECK

  [ 1/ 1] 🔄 Validate hero availability  █
  ├ ✅ all requested heroes exist in userData — PASS
  [ 1/ 1] ✅ Validate hero availability  █  all heroes found

  [06/10] 🔮 MAIN PROCESS

  [ 1/ 1] 🔄 Calculate hero attributes  █
  ├ 📋 heroId: 7c0b5974-3a8e-459b-a334-ea0ba75bc519
  ├ 📋 displayId: 1206
  └ 📋 level: 1
  ├ 📋 heroType: skill
  ├ 📋 weightedSum: 2080.0
  └ 📋 power: 2080
  ├ 📋 hp: 1240
  ├ 📋 attack: 275
  ├ 📋 armor: 205
  └ 📋 power: 2080
  [ 1/ 1] ✅ Calculate hero attributes  █  1 heroes calculated

  [07/10] 💾 MUTATION LOG

  ├ 📋 status: read-only, no mutations
  └ 📋 reason: hero attributes are calculated from config — no userData writes

  [08/10] ✅ SAVE VERIFY

  ├ 📋 status: no DB save (read-only handler)
  └ 📋 reason: attribute calculation is a read-only operation

  [09/10] 📤 RESPONSE SNAPSHOT

  ├ ✅ _attrs: object — PASS
  ├ ✅ _baseAttrs: object — PASS

  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 _attrs                   = Object{1}  L133726: for(var o in t._attrs) — keyed by hero index, each has _items with calculated attrs
  ├ 🔒 _baseAttrs               = Object{1}  L133731: t._baseAttrs[o] — keyed by hero index, each has _items with base attrs (before talent)
  └ 🔒 POWER (attr 21)          = calculated per hero  L133821: 21==p._id → heroBaseAttr.power = floor(num)
  ✅ CRITICAL AUDIT: 3/3 PASSED


  ┌ 📸 getAttrs ret=0 ────────────────────────────────────────┐
  ├   _attrs                       Object{1}
  └   _baseAttrs                   Object{1}
  └──────────────────────────────────────────────────────────┘


  [10/10] 🏁 EXECUTION SUMMARY


  ═══════════════════════════════════════════

  ✅ HERO GET ATTRS COMPLETE

  👤 USER:       guest_9e4fb9520954e69b
  📦 FIELDS:     2


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0
  ✅ ASSERTS:     134 PASS / 2 FAIL

  ═══════════════════════════════════════════

✅ hero::getAttrs         OK     ────────────────────────────
  └ ret=0 396 chars (raw) 6ms

  ✅ SUCCESS  📏 data= 396 chars  📦 proto= RAW  ⏱️ time= 6ms

  └ ⏱️ handler: 6ms 

  📤 activity::getActivityBrief ──────────────────────────────────
  ├ 📤 action: getActivityBrief
  ├ 📤 type: activity
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 counter: 23
  └ 📤 serverId: ?

  ┌────────────────────────────────────────────────────────┐
  │  📤 REQUEST PAYLOAD                                      │
  ├────────────────────────────────────────────────────────┤
  │   type                 "activity"
  │   action               "getActivityBrief"
  │   userId               "guest_9e4fb9520954e69b"
  └   version              "1.0"
  └────────────────────────────────────────────────────────┘
🟡 06:59:25.868 WARN  ⚙️ HANDLER  ▸ Unknown type "activity" — no handlers registered for this type
  ├ 📋 types: user, friend, heroImage, hero, userMsg, guide, hangup, buryPoint, summon
  └ 📋 action: getActivityBrief

  📤 guide::saveGuide       ──────────────────────────────────
  ├ 📤 action: saveGuide
  ├ 📤 type: guide
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 counter: 24
  └ 📤 serverId: ?

  ┌────────────────────────────────────────────────────────┐
  │  📤 REQUEST PAYLOAD                                      │
  ├────────────────────────────────────────────────────────┤
  │   type                 "guide"
  │   action               "saveGuide"
  │   userId               "guest_9e4fb9520954e69b"
  │   guideType            2
  │   step                 2304
  └   version              "1.0"
  └────────────────────────────────────────────────────────┘

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: saveGuide  (guide/saveGuide)  userId=guest_9e4fb95209
  ══════════════════════════════════════════════════════════


  [01/10] 🟢 ENTRY CHECK

  [ 1/ 3] 🔄 Validate request fields  █░░
  ├ 📤 userId: guest_9e4fb9520954e6
  ├ 📤 guideType: 2
  └ 📤 step: 2304
  [ 1/ 3] ✅ Validate request fields  █░░  type=2 step=2304

  [02/10] 📦 DATA INJECTION CHECK

  [ 1/ 1] 🔄 Load userData from DB  █
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded

  [03/10] 🔍 DEEP TYPE SCAN

  [ 1/ 2] 🔄 Type assert request fields  █░
  ├ ✅ userId: string — PASS
  ├ ✅ guideType: number — PASS
  ├ ✅ step: number — PASS
  [ 1/ 2] ✅ Type assert request fields  █░  all types verified

  [04/10] ⚡ PLAYER STATE SNAPSHOT

  [ 1/ 1] 🔄 Snapshot guide._steps before modification  █
  ├ 📋 guideType: 2
  ├ 📋 currentStep: 2210
  └ 📋 allSteps: {"2":2210}
  [ 1/ 1] ✅ Snapshot guide._steps before modification  █  guide._steps[2] was 2210

  [05/10] 🧮 INVARIANT CHECK

  [ 1/ 2] 🔄 Validate business rules  █░
  ├ ✅ guideType is valid enum — PASS
  ├ ✅ step is positive integer — PASS
  [ 1/ 2] ✅ Validate business rules  █░  invariants checked

  [06/10] 🔮 MAIN PROCESS

  [ 1/ 1] 🔄 Update guide._steps  █
  [ 1/ 1] ✅ Update guide._steps  █  guide._steps[2] = 2304

  [07/10] 💾 MUTATION LOG

  └ 📋 guide._steps[2]: 2210 step → 2304 step (+94 step) [SAVE-GUIDE]

  [08/10] ✅ SAVE VERIFY

[DB] saveUser("guest_9e4fb9..."): 101 keys, 11634 bytes
  ├ ✅ SAVE VERIFY: 1/1 paths OK — data persisted

  [09/10] 📤 RESPONSE SNAPSHOT

  ├ ✅ responseData: object — PASS

  ┌ 📸 saveGuide ret=0 ───────────────────────────────────────┐
  └──────────────────────────────────────────────────────────┘


  [10/10] 🏁 EXECUTION SUMMARY


  ═══════════════════════════════════════════

  ✅ SAVE GUIDE COMPLETE

  👤 USER:       guest_9e4fb9520954e69b


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0
  ✅ ASSERTS:     140 PASS / 2 FAIL

  ═══════════════════════════════════════════

✅ guide::saveGuide       OK     ────────────────────────────
  └ ret=0 2 chars (raw) 14ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 14ms

  └ ⏱️ handler: 14ms 

  ➖ DISCONNECT ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
  └ 🔗 reason: reason=ping timeout  sid= hNWNBz0V...
  ├ 🔗 userId: guest_9e4fb9520954e6
  ├ 🔗 alive: 82237ms
  ├ 🔗 actions: 24
  ├ 🔗 verified: true
  └ 🔗 reason: ping timeout

  ➕ NEW CONNECTION ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
  ├ 🔗 id: fGchVHFgwaV3nF1dAAAB
  ├ 🔗 ip: ::ffff:127.0.0.1
  └ 🔗 transport: polling
  ├ 🔗 socketId: fGchVHFgwaV3nF1dAAAB
  ├ 🔗 ip: ::ffff:127.0.0.1
  ├ 🔗 transport: polling
  ├ 🔗 totalSessions: 1
  └ 🔗 activeUsers: 0
🟢 07:00:13.669 INFO  🔐 TEA      ▸ Sending verify challenge
  ├ 📋 challenge: e63e2aee-53f4-47d1-9b53-049c19fe723b
  └ 📋 socketId: fGchVHFgwaV3nF1d...
  ├ 📋 type: string
  └ 📋 length: 48
🟢 07:00:13.713 INFO  🔐 TEA      ▸ TEA verification SUCCESS
  ├ 📋 socketId: fGchVHFgwaV3nF1d...
  ├ 📋 duration: 1ms
  └ 📋 transport: polling

  ➖ DISCONNECT ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
  └ 🔗 reason: reason=ping timeout  sid= fGchVHFg...
  ├ 🔗 userId: unknown
  ├ 🔗 alive: 45048ms
  ├ 🔗 actions: 0
  ├ 🔗 verified: true
  └ 🔗 reason: ping timeout

  ➕ NEW CONNECTION ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
  ├ 🔗 id: UCk4RFfJoa9VDVy6AAAC
  ├ 🔗 ip: ::ffff:127.0.0.1
  └ 🔗 transport: polling
  ├ 🔗 socketId: UCk4RFfJoa9VDVy6AAAC
  ├ 🔗 ip: ::ffff:127.0.0.1
  ├ 🔗 transport: polling
  ├ 🔗 totalSessions: 1
  └ 🔗 activeUsers: 0
🟢 07:00:58.770 INFO  🔐 TEA      ▸ Sending verify challenge
  ├ 📋 challenge: 22db780b-1d44-47d3-b6f4-1e2d5cecb4b8
  └ 📋 socketId: UCk4RFfJoa9VDVy6...
  ├ 📋 type: string
  └ 📋 length: 48
🟢 07:00:58.846 INFO  🔐 TEA      ▸ TEA verification SUCCESS
  ├ 📋 socketId: UCk4RFfJoa9VDVy6...
  ├ 📋 duration: 1ms
  └ 📋 transport: polling

  ➖ DISCONNECT ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
  └ 🔗 reason: reason=ping timeout  sid= UCk4RFfJ...
  ├ 🔗 userId: unknown
  ├ 🔗 alive: 45078ms
  ├ 🔗 actions: 0
  ├ 🔗 verified: true
  └ 🔗 reason: ping timeout
/var/www/html/server/main-server/logger.js:1493
    var num = chalk.gray('[' + String(phaseNum).padStart(2, '0') + '/' + String(total).padStart(2, '0) + ']');
                                                                                                   ^^^^^^^

SyntaxError: missing ) after argument list
    at wrapSafe (node:internal/modules/cjs/loader:1734:18)
    at Module._compile (node:internal/modules/cjs/loader:1777:20)
    at Object..js (node:internal/modules/cjs/loader:1934:10)
    at Module.load (node:internal/modules/cjs/loader:1524:32)
    at Module._load (node:internal/modules/cjs/loader:1326:12)
    at TracingChannel.traceSync (node:diagnostics_channel:328:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:245:24)
    at Module.require (node:internal/modules/cjs/loader:1547:12)
    at require (node:internal/modules/helpers:152:16)
    at Object.<anonymous> (/var/www/html/server/main-server/index.js:31:16)

Node.js v25.5.0
[DB] Loaded 7 records from /var/www/html/server/main-server/data/main_server.json (78925 bytes)
🟢 10:25:24.786 INFO  📋 CONFIG   ▸ serverOpenDate auto-initialized: 1778840724785

  ┌─ LOADING RESOURCES ───────────────────────────────────┐

🟢 10:25:24.796 INFO  📋 CONFIG   ▸ Resource loaded: constant.json
🟢 10:25:24.848 INFO  📋 CONFIG   ▸ Resource loaded: hero.json
🟢 10:25:24.852 INFO  📋 CONFIG   ▸ Resource loaded: summon.json
🟢 10:25:24.857 INFO  📋 CONFIG   ▸ Resource loaded: heroLevelAttr.json
🟢 10:25:24.861 INFO  📋 CONFIG   ▸ Resource loaded: heroTypeParam.json
🟢 10:25:24.863 INFO  📋 CONFIG   ▸ Resource loaded: heroQualityParam.json
🟢 10:25:24.868 INFO  📋 CONFIG   ▸ Resource loaded: heroPower.json
🟢 10:25:24.870 INFO  📋 CONFIG   ▸ Resource loaded: zPowerQualityPara.json

  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─


  ╔════════════════════════════════════════════════════════════╗
  ║  SUPER WARRIOR Z — MAIN SERVER                             ║
  ╚════════════════════════════════════════════════════════════╝



  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─

🟢 10:25:24.970 INFO  📋 CONFIG   ▸ Resource JSON status:
  ══════════════════════════════════════════════════════════

🟢 10:25:24.971 INFO  ⚙️ HANDLER  ▸ Registered action handlers:

  ├ >> user::enterGame  handlers/user/enterGame.js
  ├ >> user::registChat  handlers/user/registChat.js
  ├ >> user::getBulletinBrief  handlers/user/getBulletinBrief.js
  ├ >> user::readBulletin  handlers/user/readBulletin.js
  ├ >> friend::friendServerAction  handlers/friend/friendServerAction.js
  ├ >> heroImage::getAll  handlers/heroImage/getAll.js
  ├ >> hero::getAttrs  handlers/hero/getAttrs.js
  ├ >> userMsg::getMsgList  handlers/userMsg/getMsgList.js
  ├ >> userMsg::getMsg  handlers/userMsg/getMsg.js
  ├ >> userMsg::sendMsg  handlers/userMsg/sendMsg.js
  ├ >> userMsg::readMsg  handlers/userMsg/readMsg.js
  ├ >> userMsg::delFriendMsg  handlers/userMsg/delFriendMsg.js
  ├ >> guide::saveGuide  handlers/guide/saveGuide.js
  ├ >> hangup::saveGuideTeam  handlers/hangup/saveGuideTeam.js
  ├ >> hangup::checkBattleResult  handlers/hangup/checkBattleResult.js
  ├ >> buryPoint::guideBattle  handlers/buryPoint/guideBattle.js
  └ >> summon::summonOneFree  handlers/summon/summonOneFree.js


  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─


🟢 10:25:24.974 INFO  🚀 SERVER   ▸ Ready — listening on http://127.0.0.1:8001
🟢 10:25:24.974 INFO  🚀 SERVER   ▸ Waiting for Socket.IO connections...


  ➕ NEW CONNECTION ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
🟢 10:25:51.316 INFO  🔐 TEA      ▸ Sending verify challenge
🟢 10:25:51.362 INFO  🔐 TEA      ▸ TEA verification SUCCESS

  📤 user::enterGame        ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: enterGame  (user/enterGame)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

🟢 10:25:51.397 INFO  ⚔️ ENTER    ▸ enterGame REQUEST RECEIVED
  [ 1/10] 🔄 Required fields validation  █░░░░░░░░░
  [ 1/10] ✅ Required fields validation  █░░░░░░░░░  All 3 present

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 2/10] 🔄 Token auth via SDK-Server  ██░░░░░░░░
🟢 10:25:51.418 INFO  📡 SDKAPI   ▸ User verified via SDK-Server
  [ 2/10] ✅ Token auth via SDK-Server  ██░░░░░░░░  23ms
  [ 3/10] 🔄 ServerId validation  ███░░░░░░░
  [ 3/10] ✅ ServerId validation  ███░░░░░░░  1 == 1

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 4/10] 🔄 Request type validation  ████░░░░░░

  ┌──────────────────────────────────────────────────────────────┐
  │  ❌ FATAL ERROR AT STEP Server selection                    │
  │                                                              │
  │  STEP:   ENTER-TYPESCAN                                      │
  │  REASON: TYPE ASSERTION FAILED: request.serverId             │
  │  DETAIL: Server selection                                    │
  │  CLIENT: ctx.config.serverId                                 │
  │                                                              │
  │  IMPACT:  serverId must be string for parseInt comparison     │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘

  ├ ❌ field: request.serverId
  ├ ❌ expected: string
  ├ ❌ actual: number
  └ ❌ value: 1
  [ 4/10] ✅ Request type validation  ████░░░░░░  2/2 passed

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 5/10] 🔄 Database lookup  █████░░░░░
  [ 5/10] 🌟 Database lookup  █████░░░░░  NEW USER — no existing data

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 6/10] 🔄 Config & resource invariants  ██████░░░░

  ⚠️  INVARIANT VIOLATION: config.serverVersion loaded
       SOURCE: ENTER-INVARIANT UserInfoSingleton.serverVersion → e.serverVersion
       REASON: Expected: truthy (string), Got: MISSING — Client displays wrong version info

  [ 6/10] ✅ Config & resource invariants  ██████░░░░  All server configs verified

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 7/10] 🔄 Build/Load user data  ███████░░░
  [ 7/10] ✅ Build/Load user data  ███████░░░  100 keys (4ms)
  [ 8/10] 🔄 Circular reference safety  ████████░░
  [ 8/10] ✅ Circular reference safety  ████████░░  0 circular refs

  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 lastTeam[9]._team        = {0}  EMPTY — tutorial safe (guide 2106)
  ├ 🔒 training._award          = null  present — FIX-001 safe
  ├ 🔒 user._attribute._items[104] = present  Level=1
  ├ 🔒 imprint._items           = Object{}  FIX-005: client L114925 uses for...in → needs Object
  ├ 🔒 weapon._items            = Object{}  FIX-005: client L130938 uses for...in → needs Object
  └ 🔒 genki._items             = Object{}  FIX-005: client L132158 uses for...in → needs Object
  ✅ CRITICAL AUDIT: 6/6 PASSED

  [ 9/10] 🔄 JSON serialization test  █████████░
  [ 9/10] ✅ JSON serialization test  █████████░  10,057 bytes

  ────────────────────────────────────────────────────────
  [07/10] 📝 MUTATION LOG
  ────────────────────────────────────────────────────────

🟢 10:25:51.544 INFO  ⚔️ ENTER    ▸ MUTATION: New user data CREATED

  ────────────────────────────────────────────────────────
  [08/10] 💾 SAVE VERIFY
  ────────────────────────────────────────────────────────

  [10/10] 🔄 Database save  ██████████
[DB] saveUser("guest_2a33a5..."): 100 keys, 10057 bytes
  [10/10] ✅ Database save  ██████████  4ms
🟢 10:25:51.549 INFO  ⚔️ ENTER    ▸ Post-save integrity verification...

  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 ENTER GAME RESPONSE (ret=0) ───────────────────────────┐
  ├   user                         Object{20}
  ├   heros                        Object{4}
  ├   hangup                       Object{16}
  ├   totalProps                   Object{1}
  ├   backpackLevel                1
  ├   imprint                      Object{2}
  ├   weapon                       Object{2}
  ├   summon                       Object{7}
  ├   dungeon                      Object{2}
  ├   equip                        Object{2}
  ├   scheduleInfo                 Object{53}
  ├   timesInfo                    Object{12}
  ├   serverVersion                ""
  ├   serverId                     1
  ├   serverOpenDate               1778840724785
  ├   newUser                      true
  ├   currency                     "USD"
  ├   lastTeam                     Object{2}
  ├   superSkill                   Object{2}
  ├   giftInfo                     Object{11}
  ├   guide                        Object{2}
  ├   userGuild                    Object{3}
  ├   userGuildPub                 Object{8}
  ├   expedition                   Object{7}
  ├   retrieve                     Object{7}
  ├   battleMedal                  Object{11}
  ├   training                     Object{9}
  ├   heroSkin                     Object{3}
  ├   userWar                      Object{9}
  ├   userBallWar                  Object{6}
  ├   headEffect                   Object{4}
  ├   userTopBattle                Object{10}
  ├   topBattleInfo                Object{4}
  ├   checkin                      Object{5}
  ├   curMainTask                  Object{0}
  ├   summonLog                    Array[0] ⚠️ EMPTY
  ├   vipLog                       Array[0] ⚠️ EMPTY
  ├   cardLog                      Array[0] ⚠️ EMPTY
  ├   onlineBulletin               Array[0] ⚠️ EMPTY
  ├   broadcastRecord              Array[0] ⚠️ EMPTY
  ├   blacklist                    Object{0}
  ├   forbiddenChat                Object{2}
  ├   guildLevel                   0
  ├   guildTreasureMatchRet        0
  ├   dragonEquiped                Object{0}
  ├   warInfo                      null ⚠️ NULL
  ├   ballWarState                 0
  ├   enableShowQQ                 false
  ├   showQQVip                    0
  ├   showQQ                       0
  ├   showQQImg1                   ""
  ├   showQQImg2                   ""
  ├   showQQUrl                    ""
  ├   cellgameHaveSetHero          false
  ├   globalWarBuffTag             ""
  ├   globalWarLastRank            Object{0}
  ├   globalWarBuff                0
  ├   globalWarBuffEndTime         0
  ├   guildName                    ""
  ├   guildActivePoints            Object{0}
  ├   ballBroadcast                null ⚠️ NULL
  ├   ballWarInfo                  Object{4}
  ├   teamTraining                 Object{4}
  ├   teamServerHttpUrl            ""
  ├   teamDungeonOpenTime          0
  ├   teamDungeonTask              Object{3}
  ├   teamDungeonSplBcst           null ⚠️ NULL
  ├   teamDungeonNormBcst          null ⚠️ NULL
  ├   teamDungeonHideInfo          null ⚠️ NULL
  ├   teamDungeon                  Object{3}
  ├   teamDungeonInvitedFriends    null ⚠️ NULL
  ├   myTeamServerSocketUrl        "http://127.0.0.1:8003"
  ├   shopNewHeroes                Object{0}
  ├   channelSpecial               Object{15}
  ├   hideHeroes                   Array[0] ⚠️ EMPTY
  ├   templeLess                   0
  ├   timeTrial                    Object{9}
  ├   timeTrialNextOpenTime        0
  ├   YouTuberRecruit              Object{7}
  ├   userYouTuberRecruit          Object{2}
  ├   heroImageVersion             0
  ├   superImageVersion            0
  ├   karinStartTime               0
  ├   karinEndTime                 0
  ├   timeBonusInfo                Object{2}
  ├   monthCard                    Object{2}
  ├   recharge                     Object{2}
  ├   userDownloadReward           Object{4}
  ├   clickSystem                  Object{2}
  ├   questionnaires               null ⚠️ NULL
  ├   littleGame                   Object{3}
  ├   genki                        Object{4}
  ├   gemstone                     Object{1}
  ├   resonance                    Object{6}
  ├   fastTeam                     Object{1}
  ├   gravity                      Object{0}
  ├   timeMachine                  Object{1}
  ├   _arenaTeam                   null ⚠️ NULL
  ├   _arenaSuper                  null ⚠️ NULL
  └   mergedServers                Array[0] ⚠️ EMPTY
  └──────────────────────────────────────────────────────────┘


  ┌──────────────────────────────────────────────────────────────┐
  │  ❌ FATAL ERROR AT STEP RESPONSE TYPE SCAN                  │
  │                                                              │
  │  STEP:   ENTER                                               │
  │  REASON: userData.serverId expected string but got number    │
  │  DETAIL: UserDataParser reads these fields on client         │
  │  CLIENT: Multiple client parsers                             │
  │                                                              │
  │  IMPACT:  Client crash or silent data loss                    │
  │  FIX:     Check buildNewUserData or updateExistingUser        │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘

  ├ ❌ field: userData.serverId
  ├ ❌ expected: string
  ├ ❌ actual: number
  └ ❌ value: 1

  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ❌ ENTER GAME COMPLETE

  👤 USER:       guest_2a33a566488dfa9e (New User)
  📦 FIELDS:     100
  🦸 HEROES:     1 hero(es)
  💎 DIAMOND:    0
  🏆 LEVEL:      1

  📏 JSON SIZE:  10,057 chars
  📦 RESP SIZE:  2,382 chars
  🔐 PROTOCOL:   LZ-STRING
  ⏱️ TOTAL TIME: 186ms  ████████████████

  🔒 CRITICAL:   6/6 PASSED
  ⚠️ WARNINGS:   0
  ❌ ERRORS:     1

  ═══════════════════════════════════════════

✅ user::enterGame        OK     ────────────────────────────
  └ ret=0 2382 chars (LZ) 191ms

  ✅ SUCCESS  📏 data= 2382 chars  📦 proto= LZ-STRING  ⏱️ time= 191ms

  └ ⏱️ handler: 192ms █

  📤 user::getBulletinBrief ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: getBulletinBrief  (user/getBulletinBrief)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate request fields  █░
  [ 1/ 2] ✅ Validate request fields  █░  userId OK

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Load global bulletin data  █
  [ 1/ 1] ✅ Load global bulletin data  █  0 entries loaded

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Type assert request fields  █
  [ 1/ 1] ✅ Type assert request fields  █  type verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Snapshot bulletin state  █
  [ 1/ 1] ✅ Snapshot bulletin state  █  0 bulletins in global store

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate business rules  █░
  [ 1/ 2] ✅ Validate business rules  █░  invariants checked

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Build _brief object (strip body field)  █
  [ 1/ 1] ✅ Build _brief object (strip body field)  █  0 bulletins (body stripped)

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  └ 🔒 _brief                   = Object{0}  L121094: for(var o in n._brief) iterates each bulletin
  ✅ CRITICAL AUDIT: 1/1 PASSED


  ┌ 📸 getBulletinBrief ret=0 ────────────────────────────────┐
  └   _brief                       Object{0}
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ GET BULLETIN BRIEF COMPLETE

  👤 USER:       guest_2a33a566488dfa9e


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════

✅ user::getBulletinBrief OK     ────────────────────────────
  └ ret=0 13 chars (raw) 4ms

  ✅ SUCCESS  📏 data= 13 chars  📦 proto= RAW  ⏱️ time= 4ms

  └ ⏱️ handler: 6ms 

  📤 friend::friendServerAction ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: friendServerAction  (friend/friendServerAction)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate request fields  █░
  [ 1/ 2] ✅ Validate request fields  █░  relayAction="${relayAction}"

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Load userData from DB  █
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded + teamwork fields ensured

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Type assert request fields  █░
  [ 1/ 2] ✅ Type assert request fields  █░  types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Snapshot teamwork storage state  █
  [ 1/ 1] ✅ Snapshot teamwork storage state  █  0 friends

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Validate relayAction is known  █
  [ 1/ 1] ✅ Validate relayAction is known  █  known action

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Dispatch relayAction: queryFriends  █
  [ 1/ 1] ✅ Dispatch relayAction: queryFriends  █  0 friends

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 friendServerAction ret=0 [queryFriends] ───────────────┐
  └   users                        Object{0}
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ FRIEND SERVER ACTION COMPLETE

  👤 USER:       guest_2a33a566488dfa9e


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════

✅ friend::friendServerAction OK     ────────────────────────────
  └ ret=0 12 chars (raw) 6ms

  ✅ SUCCESS  📏 data= 12 chars  📦 proto= RAW  ⏱️ time= 6ms

  └ ⏱️ handler: 7ms 

  📤 friend::friendServerAction ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: friendServerAction  (friend/friendServerAction)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate request fields  █░
  [ 1/ 2] ✅ Validate request fields  █░  relayAction="${relayAction}"

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Load userData from DB  █
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded + teamwork fields ensured

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Type assert request fields  █░
  [ 1/ 2] ✅ Type assert request fields  █░  types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Snapshot teamwork storage state  █
  [ 1/ 1] ✅ Snapshot teamwork storage state  █  0 friends

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Validate relayAction is known  █
  [ 1/ 1] ✅ Validate relayAction is known  █  known action

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Dispatch relayAction: queryBlackList  █
  [ 1/ 1] ✅ Dispatch relayAction: queryBlackList  █  0 entries

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 friendServerAction ret=0 [queryBlackList] ─────────────┐
  └   users                        Object{0}
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ FRIEND SERVER ACTION COMPLETE

  👤 USER:       guest_2a33a566488dfa9e


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════

✅ friend::friendServerAction OK     ────────────────────────────
  └ ret=0 12 chars (raw) 5ms

  ✅ SUCCESS  📏 data= 12 chars  📦 proto= RAW  ⏱️ time= 5ms

  └ ⏱️ handler: 5ms 

  📤 heroImage::getAll      ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: getAll  (heroImage/getAll)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate request fields  █░
  [ 1/ 2] ✅ Validate request fields  █░  userId OK

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Load userData from DB  █
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Type assert request fields  █
  [ 1/ 1] ✅ Type assert request fields  █  type verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Snapshot hero collection state  █
  [ 1/ 1] ✅ Snapshot hero collection state  █  1 heroes in collection

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate business rules  █░
  [ 1/ 2] ✅ Validate business rules  █░  invariants checked

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Build hero image data  █
  [ 1/ 1] ✅ Build hero image data  █  1 hero(es)

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  └ 🔒 _heros                   = Object{1}  L134363: for(var n in e._heros) → Object, each has _id/_maxLevel/_selfComments
  ✅ CRITICAL AUDIT: 1/1 PASSED


  ┌ 📸 getAll ret=0 ──────────────────────────────────────────┐
  └   _heros                       Object{1}
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ HERO IMAGE GET ALL COMPLETE

  👤 USER:       guest_2a33a566488dfa9e
  📦 FIELDS:     1


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════

✅ heroImage::getAll      OK     ────────────────────────────
  └ ret=0 97 chars (raw) 6ms

  ✅ SUCCESS  📏 data= 97 chars  📦 proto= RAW  ⏱️ time= 6ms

  └ ⏱️ handler: 6ms 

  📤 hero::getAttrs         ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: getAttrs  (hero/getAttrs)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate request fields  █░
  [ 1/ 2] ✅ Validate request fields  █░  1 hero(es) requested

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Load userData from DB  █
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Type assert request fields  █░
  [ 1/ 2] ✅ Type assert request fields  █░  types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Snapshot hero request vs found  █
  [ 1/ 1] ✅ Snapshot hero request vs found  █  1/1 heroes found

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Validate hero availability  █
  [ 1/ 1] ✅ Validate hero availability  █  all heroes found

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Calculate hero attributes  █
  [ 1/ 1] ✅ Calculate hero attributes  █  1 heroes calculated

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 _attrs                   = Object{1}  L133726: for(var o in t._attrs) — keyed by hero index, each has _items with calculated attrs
  ├ 🔒 _baseAttrs               = Object{1}  L133731: t._baseAttrs[o] — keyed by hero index, each has _items with base attrs (before talent)
  └ 🔒 POWER (attr 21)          = calculated per hero  L133821: 21==p._id → heroBaseAttr.power = floor(num)
  ✅ CRITICAL AUDIT: 3/3 PASSED


  ┌ 📸 getAttrs ret=0 ────────────────────────────────────────┐
  ├   _attrs                       Object{1}
  └   _baseAttrs                   Object{1}
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ HERO GET ATTRS COMPLETE

  👤 USER:       guest_2a33a566488dfa9e
  📦 FIELDS:     2


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════

✅ hero::getAttrs         OK     ────────────────────────────
  └ ret=0 394 chars (raw) 7ms

  ✅ SUCCESS  📏 data= 394 chars  📦 proto= RAW  ⏱️ time= 7ms

  └ ⏱️ handler: 7ms 

  📤 userMsg::getMsgList    ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: getMsgList  (userMsg/getMsgList)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate request fields  █░
  [ 1/ 2] ✅ Validate request fields  █░  userId OK

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Load userData from DB  █
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Type assert request fields  █
  [ 1/ 1] ✅ Type assert request fields  █  type verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Snapshot message brief state  █
  [ 1/ 1] ✅ Snapshot message brief state  █  0 message entries

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Validate data integrity  █
  [ 1/ 1] ✅ Validate data integrity  █  valid object

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Return storedBrief directly  █
  [ 1/ 1] ✅ Return storedBrief directly  █  0 entries returned as-is

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  └ 🔒 _brief                   = Object{0}  L121134: setMessageFriendSimpleList iterates e[n].userInfo → UserSimpleInfo.deserialize
  ✅ CRITICAL AUDIT: 1/1 PASSED


  ┌ 📸 getMsgList ret=0 ──────────────────────────────────────┐
  └   _brief                       Object{0}
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ GET MSG LIST COMPLETE

  👤 USER:       guest_2a33a566488dfa9e
  📦 FIELDS:     1


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════

✅ userMsg::getMsgList    OK     ────────────────────────────
  └ ret=0 13 chars (raw) 3ms

  ✅ SUCCESS  📏 data= 13 chars  📦 proto= RAW  ⏱️ time= 3ms

  └ ⏱️ handler: 3ms 

  📤 guide::saveGuide       ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: saveGuide  (guide/saveGuide)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 3] 🔄 Validate request fields  █░░
  [ 1/ 3] ✅ Validate request fields  █░░  type=2 step=2102

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Load userData from DB  █
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Type assert request fields  █░
  [ 1/ 2] ✅ Type assert request fields  █░  all types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Snapshot guide._steps before modification  █
  [ 1/ 1] ✅ Snapshot guide._steps before modification  █  guide._steps[2] was (none)

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate business rules  █░
  [ 1/ 2] ✅ Validate business rules  █░  invariants checked

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Update guide._steps  █
  [ 1/ 1] ✅ Update guide._steps  █  guide._steps[2] = 2102

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────

[DB] saveUser("guest_2a33a5..."): 100 keys, 10065 bytes

  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 saveGuide ret=0 ───────────────────────────────────────┐
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ SAVE GUIDE COMPLETE

  👤 USER:       guest_2a33a566488dfa9e


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════

✅ guide::saveGuide       OK     ────────────────────────────
  └ ret=0 2 chars (raw) 25ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 25ms

  └ ⏱️ handler: 26ms 

  📤 user::registChat       ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: registChat  (user/registChat)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

🟢 10:25:56.605 INFO  ⚪ REGIST_CHAT ▸ registChat REQUEST RECEIVED
🟢 10:25:56.605 INFO  ⚪ REGIST_CHAT ▸ Entry check PASS — userId=guest_2a33a56648...

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

🟢 10:25:56.605 INFO  ⚪ REGIST_CHAT ▸ Loading config for chat registration
🟢 10:25:56.605 INFO  ⚪ REGIST_CHAT ▸ Config loaded — chatUrl and serverId resolved

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

🟢 10:25:56.605 INFO  ⚪ REGIST_CHAT ▸ Loading player state for guild/room context

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

🟢 10:25:56.606 INFO  ⚪ REGIST_CHAT ▸ Building chat registration response (6 fields)
🟢 10:25:56.606 INFO  ⚪ REGIST_CHAT ▸ Response fields built — 6 fields total

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────

🟢 10:25:56.606 INFO  ⚪ REGIST_CHAT ▸ No data mutations (configuration handler)

  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────

🟢 10:25:56.606 INFO  ⚪ REGIST_CHAT ▸ No DB save required (configuration handler)

  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 _success                 = true  L114470: n._success ? connect chat : retry every 3s (max 15)
  ├ 🔒 _chatServerUrl           = http://127.0.0.1:8002  L114480→L82537: io.connect(url) — MUST be full URL
  ├ 🔒 _worldRoomId             = world_1  L114566: chatJoinRequest(worldRoomId) — ALWAYS joined after login
  ├ 🔒 _guildRoomId             = (undefined)  L114568: if(guildRoomId) join — undefined = skip (no guild)
  ├ 🔒 _teamDungeonChatRoom     = (undefined)  L114579: if(teamDungeonChatRoom) join — undefined = skip
  └ 🔒 _teamChatRoom            = (undefined)  L114590: if(teamChatRoomId) join — undefined = skip (no team)
  ✅ CRITICAL AUDIT: 6/6 PASSED


  ┌ 📸 registChat ret=0 ──────────────────────────────────────┐
  ├   _success                     true
  ├   _chatServerUrl               "http://127.0.0.1:8002"
  └   _worldRoomId                 "world_1"
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ⚠️ WARNINGS DETECTED
  ──────────────────────────────────────────────
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


  ═══════════════════════════════════════════

  ✅ REGIST CHAT COMPLETE

  👤 USER:       guest_2a33a566488dfa9e
  📦 FIELDS:     6

  ⏱️ TOTAL TIME: 3ms  ░░░░░░░░░░░░░░░░


  ═══════════════════════════════════════════

✅ user::registChat       OK     ────────────────────────────
  └ ret=0 83 chars (raw) 7ms

  ✅ SUCCESS  📏 data= 83 chars  📦 proto= RAW  ⏱️ time= 7ms

  └ ⏱️ handler: 7ms 

  📤 guide::saveGuide       ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: saveGuide  (guide/saveGuide)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 3] 🔄 Validate request fields  █░░
  [ 1/ 3] ✅ Validate request fields  █░░  type=2 step=2107

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Load userData from DB  █
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Type assert request fields  █░
  [ 1/ 2] ✅ Type assert request fields  █░  all types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Snapshot guide._steps before modification  █
  [ 1/ 1] ✅ Snapshot guide._steps before modification  █  guide._steps[2] was 2102

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate business rules  █░
  [ 1/ 2] ✅ Validate business rules  █░  invariants checked

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Update guide._steps  █
  [ 1/ 1] ✅ Update guide._steps  █  guide._steps[2] = 2107

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────

[DB] saveUser("guest_2a33a5..."): 100 keys, 10065 bytes

  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 saveGuide ret=0 ───────────────────────────────────────┐
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ SAVE GUIDE COMPLETE

  👤 USER:       guest_2a33a566488dfa9e


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════

✅ guide::saveGuide       OK     ────────────────────────────
  └ ret=0 2 chars (raw) 8ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 8ms

  └ ⏱️ handler: 8ms 

  📤 hangup::saveGuideTeam  ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: saveGuideTeam  (hangup/saveGuideTeam)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 3] 🔄 Validate request fields  █░░
  [ 1/ 3] ✅ Validate request fields  █░░  team=5 heroes

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Load userData from DB  █
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Type assert request fields  █░
  [ 1/ 2] ✅ Type assert request fields  █░  all types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Snapshot hangupTeam data  █
  [ 1/ 1] ✅ Snapshot hangupTeam data  █  team=0 supers=0

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate business rules  █░
  [ 1/ 2] ✅ Validate business rules  █░  invariants checked

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Update hangupTeam  █
  [ 1/ 1] ✅ Update hangupTeam  █  team=5 heroes saved

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────

[DB] saveUser("guest_2a33a5..."): 101 keys, 10180 bytes

  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 saveGuideTeam ret=0 ───────────────────────────────────┐
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ SAVE GUIDE TEAM COMPLETE

  👤 USER:       guest_2a33a566488dfa9e


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════

✅ hangup::saveGuideTeam  OK     ────────────────────────────
  └ ret=0 2 chars (raw) 8ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 8ms

  └ ⏱️ handler: 9ms 

  📤 hangup::checkBattleResult ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: checkBattleResult  (hangup/checkBattleResult)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [ 1/10] 🔄 Validate request  █░░░░░░░░░
  [ 1/10] ✅ Validate request  █░░░░░░░░░

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 2/10] 🔄 Load data  ██░░░░░░░░
🟢 10:25:59.025 INFO  📋 CONFIG   ▸ Resource loaded: lesson.json
  [ 2/10] ✅ Load data  ██░░░░░░░░  lesson.json=611 entries

  ────────────────────────────────────────────────────────
  [03/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 3/10] 🔄 Read progress  ███░░░░░░░
  [ 3/10] ✅ Read progress  ███░░░░░░░  lesson=10101

  ────────────────────────────────────────────────────────
  [04/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 4/10] 🔄 Determine outcome  ████░░░░░░
  [ 4/10] ✅ Determine outcome  ████░░░░░░  WIN (0)

  ────────────────────────────────────────────────────────
  [05/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 5/10] 🔄 Build response  █████░░░░░
  [ 5/10] ✅ Build response  █████░░░░░  WIN rewards=5 lesson=10102

  ────────────────────────────────────────────────────────
  [06/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [07/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────

[DB] saveUser("guest_2a33a5..."): 101 keys, 10254 bytes

  ────────────────────────────────────────────────────────
  [08/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 _battleResult            = 0  L104882: 0 == e._battleResult -> true (tutorial forced win)
  ├ 🔒 _changeInfo._items       = 5 items  L97686: getBattleAwardItems iterates _changeInfo._items for {_id, _num}
  ├ 🔒 _curLess                 = 10102  L104892/L97751: OnHookSingleton.lastSection = e._curLess
  └ 🔒 _maxPassLesson           = 10101  L104893/L97751: OnHookSingleton.maxPassLesson = e._maxPassLesson
  ✅ CRITICAL AUDIT: 4/4 PASSED


  ────────────────────────────────────────────────────────
  [09/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ CHECK BATTLE RESULT

  👤 USER:       guest_2a33a566488dfa9e
  📦 FIELDS:     4



  ═══════════════════════════════════════════


  ┌ 📸 CHECK BATTLE RESULT ret=0 ─────────────────────────────┐
  ├   _battleResult                0
  ├   _curLess                     10102
  ├   _maxPassLesson               10101
  └   _changeInfo                  Object{1}
  └──────────────────────────────────────────────────────────┘

✅ hangup::checkBattleResult OK     ────────────────────────────
  └ ret=0 218 chars (raw) 20ms

  ✅ SUCCESS  📏 data= 218 chars  📦 proto= RAW  ⏱️ time= 20ms

  └ ⏱️ handler: 21ms 

  📤 buryPoint::guideBattle ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: guideBattle  (buryPoint/guideBattle)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 3] 🔄 Validate request fields  █░░
  [ 1/ 3] ✅ Validate request fields  █░░  point=load

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Check data injection requirements  █
  [ 1/ 1] ✅ Check data injection requirements  █  no DB load needed (analytics)

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 1/ 3] 🔄 Type assert request fields  █░░
  [ 1/ 3] ✅ Type assert request fields  █░░  all types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Check player state requirements  █
  [ 1/ 1] ✅ Check player state requirements  █  analytics handler, no player state read

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Validate point value  █
  [ 1/ 1] ✅ Validate point value  █  point="load" is valid

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Process analytics event  █
🟢 10:26:00.723 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received: point=load passLesson=10101
  [ 1/ 1] ✅ Process analytics event  █  analytics event logged

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 guideBattle ret=0 ─────────────────────────────────────┐
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ GUIDE BATTLE ANALYTICS COMPLETE

  👤 USER:       guest_2a33a566488dfa9e


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════

✅ buryPoint::guideBattle OK     ────────────────────────────
  └ ret=0 2 chars (raw) 4ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 4ms

  └ ⏱️ handler: 5ms 

  📤 buryPoint::guideBattle ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: guideBattle  (buryPoint/guideBattle)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 3] 🔄 Validate request fields  █░░
  [ 1/ 3] ✅ Validate request fields  █░░  point=battle

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Check data injection requirements  █
  [ 1/ 1] ✅ Check data injection requirements  █  no DB load needed (analytics)

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 1/ 3] 🔄 Type assert request fields  █░░
  [ 1/ 3] ✅ Type assert request fields  █░░  all types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Check player state requirements  █
  [ 1/ 1] ✅ Check player state requirements  █  analytics handler, no player state read

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Validate point value  █
  [ 1/ 1] ✅ Validate point value  █  point="battle" is valid

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Process analytics event  █
🟢 10:26:11.596 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received: point=battle passLesson=10101
  [ 1/ 1] ✅ Process analytics event  █  analytics event logged

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 guideBattle ret=0 ─────────────────────────────────────┐
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ GUIDE BATTLE ANALYTICS COMPLETE

  👤 USER:       guest_2a33a566488dfa9e


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════

✅ buryPoint::guideBattle OK     ────────────────────────────
  └ ret=0 2 chars (raw) 5ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 5ms

  └ ⏱️ handler: 5ms 

  📤 buryPoint::guideBattle ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: guideBattle  (buryPoint/guideBattle)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 3] 🔄 Validate request fields  █░░
  [ 1/ 3] ✅ Validate request fields  █░░  point=home

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Check data injection requirements  █
  [ 1/ 1] ✅ Check data injection requirements  █  no DB load needed (analytics)

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 1/ 3] 🔄 Type assert request fields  █░░
  [ 1/ 3] ✅ Type assert request fields  █░░  all types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Check player state requirements  █
  [ 1/ 1] ✅ Check player state requirements  █  analytics handler, no player state read

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Validate point value  █
  [ 1/ 1] ✅ Validate point value  █  point="home" is valid

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Process analytics event  █
🟢 10:26:13.233 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received: point=home passLesson=10101
  [ 1/ 1] ✅ Process analytics event  █  analytics event logged

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 guideBattle ret=0 ─────────────────────────────────────┐
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ GUIDE BATTLE ANALYTICS COMPLETE

  👤 USER:       guest_2a33a566488dfa9e


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════

✅ buryPoint::guideBattle OK     ────────────────────────────
  └ ret=0 2 chars (raw) 2ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 2ms

  └ ⏱️ handler: 2ms 

  📤 activity::getActivityBrief ──────────────────────────────────
🟡 10:26:13.432 WARN  ⚙️ HANDLER  ▸ Unknown type "activity" — no handlers registered for this type

  📤 guide::saveGuide       ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: saveGuide  (guide/saveGuide)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 3] 🔄 Validate request fields  █░░
  [ 1/ 3] ✅ Validate request fields  █░░  type=2 step=2206

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Load userData from DB  █
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Type assert request fields  █░
  [ 1/ 2] ✅ Type assert request fields  █░  all types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Snapshot guide._steps before modification  █
  [ 1/ 1] ✅ Snapshot guide._steps before modification  █  guide._steps[2] was 2107

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate business rules  █░
  [ 1/ 2] ✅ Validate business rules  █░  invariants checked

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Update guide._steps  █
  [ 1/ 1] ✅ Update guide._steps  █  guide._steps[2] = 2206

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────

[DB] saveUser("guest_2a33a5..."): 101 keys, 10254 bytes

  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 saveGuide ret=0 ───────────────────────────────────────┐
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ SAVE GUIDE COMPLETE

  👤 USER:       guest_2a33a566488dfa9e


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════

✅ guide::saveGuide       OK     ────────────────────────────
  └ ret=0 2 chars (raw) 6ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 6ms

  └ ⏱️ handler: 6ms 

  📤 summon::summonOneFree  ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: summonOneFree  (summon/summonOneFree)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

🟢 10:26:18.444 INFO  ⚪ SUMMON-FREE ▸ summonOneFree REQUEST RECEIVED

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

🟢 10:26:18.445 INFO  ⚪ SUMMON-FREE ▸ userData loaded successfully (101 top-level keys)
🟢 10:26:18.445 INFO  ⚪ SUMMON-FREE ▸ Deep clone SUCCESS — user object isolated from DB cache

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

🟢 10:26:18.448 INFO  📋 CONFIG   ▸ Resource loaded: summonPool.json
🟢 10:26:18.449 INFO  📋 CONFIG   ▸ Resource loaded: summonRandom.json

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

🟢 10:26:18.449 INFO  ⚪ SUMMON-FREE ▸ Free timer OK — proceeding with summon

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

🟢 10:26:18.449 INFO  ⚪ SUMMON-FREE ▸ [GUIDE] Predetermined hero: displayId=1309 quality=purple

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────


  ⚠️  HERO OBJECT TYPE: heroObj._fragment wrong type


  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────

[DB] saveUser("guest_2a33a5..."): 101 keys, 10944 bytes
🟢 10:26:18.454 INFO  ⚪ SUMMON-FREE ▸ User data SAVED

  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────

🟢 10:26:18.454 INFO  ⚪ SUMMON-FREE ▸ summonOneFree SUCCESS

  ┌ 📸 SUMMON-FREE ret=0 ─────────────────────────────────────┐
  ├   _addTotal                    Array[1]
  ├   _changeInfo                  Object{1}
  └   _energy                      0
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ SUMMON FREE COMPLETE

  👤 USER:       guest_2a33a566488dfa9e



  ═══════════════════════════════════════════

✅ summon::summonOneFree  OK     ────────────────────────────
  └ ret=0 737 chars (raw) 13ms

  ✅ SUCCESS  📏 data= 737 chars  📦 proto= RAW  ⏱️ time= 13ms

  └ ⏱️ handler: 13ms 

  📤 hero::getAttrs         ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: getAttrs  (hero/getAttrs)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate request fields  █░
  [ 1/ 2] ✅ Validate request fields  █░  1 hero(es) requested

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Load userData from DB  █
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Type assert request fields  █░
  [ 1/ 2] ✅ Type assert request fields  █░  types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Snapshot hero request vs found  █
  [ 1/ 1] ✅ Snapshot hero request vs found  █  1/1 heroes found

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Validate hero availability  █
  [ 1/ 1] ✅ Validate hero availability  █  all heroes found

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Calculate hero attributes  █
  [ 1/ 1] ✅ Calculate hero attributes  █  1 heroes calculated

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 _attrs                   = Object{1}  L133726: for(var o in t._attrs) — keyed by hero index, each has _items with calculated attrs
  ├ 🔒 _baseAttrs               = Object{1}  L133731: t._baseAttrs[o] — keyed by hero index, each has _items with base attrs (before talent)
  └ 🔒 POWER (attr 21)          = calculated per hero  L133821: 21==p._id → heroBaseAttr.power = floor(num)
  ✅ CRITICAL AUDIT: 3/3 PASSED


  ┌ 📸 getAttrs ret=0 ────────────────────────────────────────┐
  ├   _attrs                       Object{1}
  └   _baseAttrs                   Object{1}
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ HERO GET ATTRS COMPLETE

  👤 USER:       guest_2a33a566488dfa9e
  📦 FIELDS:     2


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════

✅ hero::getAttrs         OK     ────────────────────────────
  └ ret=0 392 chars (raw) 3ms

  ✅ SUCCESS  📏 data= 392 chars  📦 proto= RAW  ⏱️ time= 3ms

  └ ⏱️ handler: 3ms 

  📤 guide::saveGuide       ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: saveGuide  (guide/saveGuide)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 3] 🔄 Validate request fields  █░░
  [ 1/ 3] ✅ Validate request fields  █░░  type=2 step=2210

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Load userData from DB  █
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Type assert request fields  █░
  [ 1/ 2] ✅ Type assert request fields  █░  all types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Snapshot guide._steps before modification  █
  [ 1/ 1] ✅ Snapshot guide._steps before modification  █  guide._steps[2] was 2206

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate business rules  █░
  [ 1/ 2] ✅ Validate business rules  █░  invariants checked

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Update guide._steps  █
  [ 1/ 1] ✅ Update guide._steps  █  guide._steps[2] = 2210

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────

[DB] saveUser("guest_2a33a5..."): 101 keys, 10944 bytes

  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 saveGuide ret=0 ───────────────────────────────────────┐
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ SAVE GUIDE COMPLETE

  👤 USER:       guest_2a33a566488dfa9e


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════

✅ guide::saveGuide       OK     ────────────────────────────
  └ ret=0 2 chars (raw) 7ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 7ms

  └ ⏱️ handler: 7ms 

  📤 summon::summonOneFree  ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: summonOneFree  (summon/summonOneFree)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

🟢 10:26:22.653 INFO  ⚪ SUMMON-FREE ▸ summonOneFree REQUEST RECEIVED

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

🟢 10:26:22.654 INFO  ⚪ SUMMON-FREE ▸ userData loaded successfully (101 top-level keys)
🟢 10:26:22.655 INFO  ⚪ SUMMON-FREE ▸ Deep clone SUCCESS — user object isolated from DB cache

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

🟢 10:26:22.656 INFO  ⚪ SUMMON-FREE ▸ Free timer OK — proceeding with summon

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

🟢 10:26:22.656 INFO  ⚪ SUMMON-FREE ▸ [GUIDE] Predetermined hero: displayId=1206 quality=blue

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────


  ⚠️  HERO OBJECT TYPE: heroObj._fragment wrong type


  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────

[DB] saveUser("guest_2a33a5..."): 101 keys, 11634 bytes
🟢 10:26:22.660 INFO  ⚪ SUMMON-FREE ▸ User data SAVED

  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────

🟢 10:26:22.660 INFO  ⚪ SUMMON-FREE ▸ summonOneFree SUCCESS

  ┌ 📸 SUMMON-FREE ret=0 ─────────────────────────────────────┐
  ├   _addTotal                    Array[1]
  ├   _changeInfo                  Object{1}
  └   _energy                      0
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ SUMMON FREE COMPLETE

  👤 USER:       guest_2a33a566488dfa9e



  ═══════════════════════════════════════════

✅ summon::summonOneFree  OK     ────────────────────────────
  └ ret=0 737 chars (raw) 8ms

  ✅ SUCCESS  📏 data= 737 chars  📦 proto= RAW  ⏱️ time= 8ms

  └ ⏱️ handler: 8ms 

  📤 hero::getAttrs         ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: getAttrs  (hero/getAttrs)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate request fields  █░
  [ 1/ 2] ✅ Validate request fields  █░  1 hero(es) requested

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Load userData from DB  █
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Type assert request fields  █░
  [ 1/ 2] ✅ Type assert request fields  █░  types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Snapshot hero request vs found  █
  [ 1/ 1] ✅ Snapshot hero request vs found  █  1/1 heroes found

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Validate hero availability  █
  [ 1/ 1] ✅ Validate hero availability  █  all heroes found

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Calculate hero attributes  █
  [ 1/ 1] ✅ Calculate hero attributes  █  1 heroes calculated

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 _attrs                   = Object{1}  L133726: for(var o in t._attrs) — keyed by hero index, each has _items with calculated attrs
  ├ 🔒 _baseAttrs               = Object{1}  L133731: t._baseAttrs[o] — keyed by hero index, each has _items with base attrs (before talent)
  └ 🔒 POWER (attr 21)          = calculated per hero  L133821: 21==p._id → heroBaseAttr.power = floor(num)
  ✅ CRITICAL AUDIT: 3/3 PASSED


  ┌ 📸 getAttrs ret=0 ────────────────────────────────────────┐
  ├   _attrs                       Object{1}
  └   _baseAttrs                   Object{1}
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ HERO GET ATTRS COMPLETE

  👤 USER:       guest_2a33a566488dfa9e
  📦 FIELDS:     2


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════

✅ hero::getAttrs         OK     ────────────────────────────
  └ ret=0 396 chars (raw) 5ms

  ✅ SUCCESS  📏 data= 396 chars  📦 proto= RAW  ⏱️ time= 5ms

  └ ⏱️ handler: 5ms 

  📤 activity::getActivityBrief ──────────────────────────────────
🟡 10:26:26.346 WARN  ⚙️ HANDLER  ▸ Unknown type "activity" — no handlers registered for this type

  📤 guide::saveGuide       ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: saveGuide  (guide/saveGuide)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 3] 🔄 Validate request fields  █░░
  [ 1/ 3] ✅ Validate request fields  █░░  type=2 step=2304

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Load userData from DB  █
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Type assert request fields  █░
  [ 1/ 2] ✅ Type assert request fields  █░  all types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Snapshot guide._steps before modification  █
  [ 1/ 1] ✅ Snapshot guide._steps before modification  █  guide._steps[2] was 2210

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate business rules  █░
  [ 1/ 2] ✅ Validate business rules  █░  invariants checked

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Update guide._steps  █
  [ 1/ 1] ✅ Update guide._steps  █  guide._steps[2] = 2304

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────

[DB] saveUser("guest_2a33a5..."): 101 keys, 11634 bytes

  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 saveGuide ret=0 ───────────────────────────────────────┐
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ SAVE GUIDE COMPLETE

  👤 USER:       guest_2a33a566488dfa9e


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════

✅ guide::saveGuide       OK     ────────────────────────────
  └ ret=0 2 chars (raw) 7ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 7ms

  └ ⏱️ handler: 7ms 

  ➖ DISCONNECT ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
  └ 🔗 reason: reason=ping timeout  sid= 5yF9JIzr...

  ➕ NEW CONNECTION ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
🟢 10:27:14.623 INFO  🔐 TEA      ▸ Sending verify challenge
🟢 10:27:14.666 INFO  🔐 TEA      ▸ TEA verification SUCCESS

  ➖ DISCONNECT ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
  └ 🔗 reason: reason=ping timeout  sid= dsMT93J2...

  ➕ NEW CONNECTION ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
🟢 10:27:59.709 INFO  🔐 TEA      ▸ Sending verify challenge
🟢 10:27:59.750 INFO  🔐 TEA      ▸ TEA verification SUCCESS

  ➖ DISCONNECT ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
  └ 🔗 reason: reason=ping timeout  sid= m60-3zTF...

  ➕ NEW CONNECTION ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
🟢 10:29:32.345 INFO  🔐 TEA      ▸ Sending verify challenge
🟢 10:29:32.438 INFO  🔐 TEA      ▸ TEA verification SUCCESS

  📤 user::enterGame        ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: enterGame  (user/enterGame)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

🟢 10:29:32.486 INFO  ⚔️ ENTER    ▸ enterGame REQUEST RECEIVED
  [ 1/10] 🔄 Required fields validation  █░░░░░░░░░
  [ 1/10] ✅ Required fields validation  █░░░░░░░░░  All 3 present

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 2/10] 🔄 Token auth via SDK-Server  ██░░░░░░░░
🟢 10:29:32.500 INFO  📡 SDKAPI   ▸ User verified via SDK-Server
  [ 2/10] ✅ Token auth via SDK-Server  ██░░░░░░░░  14ms
  [ 3/10] 🔄 ServerId validation  ███░░░░░░░
  [ 3/10] ✅ ServerId validation  ███░░░░░░░  1 == 1

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 4/10] 🔄 Request type validation  ████░░░░░░

  ┌──────────────────────────────────────────────────────────────┐
  │  ❌ FATAL ERROR AT STEP Server selection                    │
  │                                                              │
  │  STEP:   ENTER-TYPESCAN                                      │
  │  REASON: TYPE ASSERTION FAILED: request.serverId             │
  │  DETAIL: Server selection                                    │
  │  CLIENT: ctx.config.serverId                                 │
  │                                                              │
  │  IMPACT:  serverId must be string for parseInt comparison     │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘

  ├ ❌ field: request.serverId
  ├ ❌ expected: string
  ├ ❌ actual: number
  └ ❌ value: 1
  [ 4/10] ✅ Request type validation  ████░░░░░░  2/2 passed

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 5/10] 🔄 Database lookup  █████░░░░░
  [ 5/10] ✅ Database lookup  █████░░░░░  EXISTING USER (101 keys, 11,634 bytes)

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 6/10] 🔄 Config & resource invariants  ██████░░░░

  ⚠️  INVARIANT VIOLATION: config.serverVersion loaded
       SOURCE: ENTER-INVARIANT UserInfoSingleton.serverVersion → e.serverVersion
       REASON: Expected: truthy (string), Got: MISSING — Client displays wrong version info

  [ 6/10] ✅ Config & resource invariants  ██████░░░░  All server configs verified

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 7/10] 🔄 Build/Load user data  ███████░░░
  [ 7/10] ✅ Build/Load user data  ███████░░░  101 keys (1ms)
  [ 8/10] 🔄 Circular reference safety  ████████░░
  [ 8/10] ✅ Circular reference safety  ████████░░  0 circular refs

  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 training._award          = null  present — FIX-001 safe
  ├ 🔒 user._attribute._items[104] = present  Level=1
  ├ 🔒 imprint._items           = Object{}  FIX-005: client L114925 uses for...in → needs Object
  ├ 🔒 weapon._items            = Object{}  FIX-005: client L130938 uses for...in → needs Object
  └ 🔒 genki._items             = Object{}  FIX-005: client L132158 uses for...in → needs Object
  ✅ CRITICAL AUDIT: 5/5 PASSED

  [ 9/10] 🔄 JSON serialization test  █████████░
  [ 9/10] ✅ JSON serialization test  █████████░  11,647 bytes

  ⚠️ WARNINGS DETECTED
  ──────────────────────────────────────────────
  ⚠️  [W001] training._award EXISTS in stored data — potential circular ref
       Expected: null or undefined
       Got:      type=object (possibly self-referencing)
       Impact:   Client bug L121387 may create nesting loop on re-login
       Fix:      stripCircularReferences will sanitize before response
  ⚠️ TOTAL WARNINGS: 1


  ────────────────────────────────────────────────────────
  [07/10] 📝 MUTATION LOG
  ────────────────────────────────────────────────────────

🟢 10:29:32.506 INFO  ⚔️ ENTER    ▸ MUTATION: Existing user data UPDATED

  ────────────────────────────────────────────────────────
  [08/10] 💾 SAVE VERIFY
  ────────────────────────────────────────────────────────

  [10/10] 🔄 Database save  ██████████
[DB] saveUser("guest_2a33a5..."): 101 keys, 11647 bytes
  [10/10] ✅ Database save  ██████████  2ms
🟢 10:29:32.509 INFO  ⚔️ ENTER    ▸ Post-save integrity verification...

  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 ENTER GAME RESPONSE (ret=0) ───────────────────────────┐
  ├   user                         Object{20}
  ├   heros                        Object{4}
  ├   hangup                       Object{16}
  ├   totalProps                   Object{1}
  ├   backpackLevel                1
  ├   imprint                      Object{2}
  ├   weapon                       Object{2}
  ├   summon                       Object{7}
  ├   dungeon                      Object{2}
  ├   equip                        Object{2}
  ├   scheduleInfo                 Object{53}
  ├   timesInfo                    Object{12}
  ├   serverVersion                ""
  ├   serverId                     1
  ├   serverOpenDate               1778840724785
  ├   newUser                      false
  ├   currency                     "USD"
  ├   lastTeam                     Object{2}
  ├   superSkill                   Object{2}
  ├   giftInfo                     Object{11}
  ├   guide                        Object{2}
  ├   userGuild                    Object{3}
  ├   userGuildPub                 Object{8}
  ├   expedition                   Object{7}
  ├   retrieve                     Object{7}
  ├   battleMedal                  Object{11}
  ├   training                     Object{9}
  ├   heroSkin                     Object{3}
  ├   userWar                      Object{9}
  ├   userBallWar                  Object{6}
  ├   headEffect                   Object{4}
  ├   userTopBattle                Object{10}
  ├   topBattleInfo                Object{4}
  ├   checkin                      Object{5}
  ├   curMainTask                  Object{0}
  ├   summonLog                    Array[0] ⚠️ EMPTY
  ├   vipLog                       Array[0] ⚠️ EMPTY
  ├   cardLog                      Array[0] ⚠️ EMPTY
  ├   onlineBulletin               Array[0] ⚠️ EMPTY
  ├   broadcastRecord              Array[0] ⚠️ EMPTY
  ├   blacklist                    Object{0}
  ├   forbiddenChat                Object{2}
  ├   guildLevel                   0
  ├   guildTreasureMatchRet        0
  ├   dragonEquiped                Object{0}
  ├   warInfo                      null ⚠️ NULL
  ├   ballWarState                 0
  ├   enableShowQQ                 false
  ├   showQQVip                    0
  ├   showQQ                       0
  ├   showQQImg1                   ""
  ├   showQQImg2                   ""
  ├   showQQUrl                    ""
  ├   cellgameHaveSetHero          false
  ├   globalWarBuffTag             ""
  ├   globalWarLastRank            Object{0}
  ├   globalWarBuff                0
  ├   globalWarBuffEndTime         0
  ├   guildName                    ""
  ├   guildActivePoints            Object{0}
  ├   ballBroadcast                null ⚠️ NULL
  ├   ballWarInfo                  Object{4}
  ├   teamTraining                 Object{4}
  ├   teamServerHttpUrl            ""
  ├   teamDungeonOpenTime          0
  ├   teamDungeonTask              Object{3}
  ├   teamDungeonSplBcst           null ⚠️ NULL
  ├   teamDungeonNormBcst          null ⚠️ NULL
  ├   teamDungeonHideInfo          null ⚠️ NULL
  ├   teamDungeon                  Object{3}
  ├   teamDungeonInvitedFriends    null ⚠️ NULL
  ├   myTeamServerSocketUrl        "http://127.0.0.1:8003"
  ├   shopNewHeroes                Object{0}
  ├   channelSpecial               Object{15}
  ├   hideHeroes                   Array[0] ⚠️ EMPTY
  ├   templeLess                   0
  ├   timeTrial                    Object{9}
  ├   timeTrialNextOpenTime        0
  ├   YouTuberRecruit              Object{7}
  ├   userYouTuberRecruit          Object{2}
  ├   heroImageVersion             0
  ├   superImageVersion            0
  ├   karinStartTime               0
  ├   karinEndTime                 0
  ├   timeBonusInfo                Object{2}
  ├   monthCard                    Object{2}
  ├   recharge                     Object{2}
  ├   userDownloadReward           Object{4}
  ├   clickSystem                  Object{2}
  ├   questionnaires               null ⚠️ NULL
  ├   littleGame                   Object{3}
  ├   genki                        Object{4}
  ├   gemstone                     Object{1}
  ├   resonance                    Object{6}
  ├   fastTeam                     Object{1}
  ├   gravity                      Object{0}
  ├   timeMachine                  Object{1}
  ├   _arenaTeam                   null ⚠️ NULL
  ├   _arenaSuper                  null ⚠️ NULL
  ├   mergedServers                Array[0] ⚠️ EMPTY
  └   hangupTeam                   Object{2}
  └──────────────────────────────────────────────────────────┘


  ┌──────────────────────────────────────────────────────────────┐
  │  ❌ FATAL ERROR AT STEP RESPONSE TYPE SCAN                  │
  │                                                              │
  │  STEP:   ENTER                                               │
  │  REASON: userData.serverId expected string but got number    │
  │  DETAIL: UserDataParser reads these fields on client         │
  │  CLIENT: Multiple client parsers                             │
  │                                                              │
  │  IMPACT:  Client crash or silent data loss                    │
  │  FIX:     Check buildNewUserData or updateExistingUser        │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘

  ├ ❌ field: userData.serverId
  ├ ❌ expected: string
  ├ ❌ actual: number
  └ ❌ value: 1

  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ❌ ENTER GAME COMPLETE — WITH WARNINGS

  👤 USER:       guest_2a33a566488dfa9e (Returning User)
  📦 FIELDS:     101
  🦸 HEROES:     3 hero(es)
  💎 DIAMOND:    20
  🏆 LEVEL:      1

  📏 JSON SIZE:  11,647 chars
  📦 RESP SIZE:  2,734 chars
  🔐 PROTOCOL:   LZ-STRING
  ⏱️ TOTAL TIME: 63ms  █████████░░░░░░░

  🔒 CRITICAL:   5/5 PASSED
  ⚠️ WARNINGS:   1
  ❌ ERRORS:     1

  ═══════════════════════════════════════════

✅ user::enterGame        OK     ────────────────────────────
  └ ret=0 2734 chars (LZ) 64ms

  ✅ SUCCESS  📏 data= 2734 chars  📦 proto= LZ-STRING  ⏱️ time= 64ms

  └ ⏱️ handler: 64ms 

  📤 user::getBulletinBrief ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: getBulletinBrief  (user/getBulletinBrief)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate request fields  █░
  [ 1/ 2] ✅ Validate request fields  █░  userId OK

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Load global bulletin data  █
  [ 1/ 1] ✅ Load global bulletin data  █  0 entries loaded

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Type assert request fields  █
  [ 1/ 1] ✅ Type assert request fields  █  type verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Snapshot bulletin state  █
  [ 1/ 1] ✅ Snapshot bulletin state  █  0 bulletins in global store

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate business rules  █░
  [ 1/ 2] ✅ Validate business rules  █░  invariants checked

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Build _brief object (strip body field)  █
  [ 1/ 1] ✅ Build _brief object (strip body field)  █  0 bulletins (body stripped)

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  └ 🔒 _brief                   = Object{0}  L121094: for(var o in n._brief) iterates each bulletin
  ✅ CRITICAL AUDIT: 1/1 PASSED


  ┌ 📸 getBulletinBrief ret=0 ────────────────────────────────┐
  └   _brief                       Object{0}
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ GET BULLETIN BRIEF COMPLETE

  👤 USER:       guest_2a33a566488dfa9e


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════

✅ user::getBulletinBrief OK     ────────────────────────────
  └ ret=0 13 chars (raw) 7ms

  ✅ SUCCESS  📏 data= 13 chars  📦 proto= RAW  ⏱️ time= 7ms

  └ ⏱️ handler: 8ms 

  📤 friend::friendServerAction ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: friendServerAction  (friend/friendServerAction)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate request fields  █░
  [ 1/ 2] ✅ Validate request fields  █░  relayAction="${relayAction}"

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Load userData from DB  █
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded + teamwork fields ensured

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Type assert request fields  █░
  [ 1/ 2] ✅ Type assert request fields  █░  types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Snapshot teamwork storage state  █
  [ 1/ 1] ✅ Snapshot teamwork storage state  █  0 friends

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Validate relayAction is known  █
  [ 1/ 1] ✅ Validate relayAction is known  █  known action

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Dispatch relayAction: queryFriends  █
  [ 1/ 1] ✅ Dispatch relayAction: queryFriends  █  0 friends

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 friendServerAction ret=0 [queryFriends] ───────────────┐
  └   users                        Object{0}
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ FRIEND SERVER ACTION COMPLETE

  👤 USER:       guest_2a33a566488dfa9e


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════

✅ friend::friendServerAction OK     ────────────────────────────
  └ ret=0 12 chars (raw) 5ms

  ✅ SUCCESS  📏 data= 12 chars  📦 proto= RAW  ⏱️ time= 5ms

  └ ⏱️ handler: 6ms 

  📤 friend::friendServerAction ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: friendServerAction  (friend/friendServerAction)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate request fields  █░
  [ 1/ 2] ✅ Validate request fields  █░  relayAction="${relayAction}"

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Load userData from DB  █
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded + teamwork fields ensured

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Type assert request fields  █░
  [ 1/ 2] ✅ Type assert request fields  █░  types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Snapshot teamwork storage state  █
  [ 1/ 1] ✅ Snapshot teamwork storage state  █  0 friends

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Validate relayAction is known  █
  [ 1/ 1] ✅ Validate relayAction is known  █  known action

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Dispatch relayAction: queryBlackList  █
  [ 1/ 1] ✅ Dispatch relayAction: queryBlackList  █  0 entries

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 friendServerAction ret=0 [queryBlackList] ─────────────┐
  └   users                        Object{0}
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ FRIEND SERVER ACTION COMPLETE

  👤 USER:       guest_2a33a566488dfa9e


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════

✅ friend::friendServerAction OK     ────────────────────────────
  └ ret=0 12 chars (raw) 8ms

  ✅ SUCCESS  📏 data= 12 chars  📦 proto= RAW  ⏱️ time= 8ms

  └ ⏱️ handler: 8ms 

  ➖ DISCONNECT ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
  └ 🔗 reason: reason=ping timeout  sid= FgY-D0GP...

  ➕ NEW CONNECTION ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
🟢 10:30:17.715 INFO  🔐 TEA      ▸ Sending verify challenge
🟢 10:30:17.758 INFO  🔐 TEA      ▸ TEA verification SUCCESS

  ➖ DISCONNECT ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
  └ 🔗 reason: reason=ping timeout  sid= DYgHFvH_...

  ➕ NEW CONNECTION ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
🟢 10:31:02.817 INFO  🔐 TEA      ▸ Sending verify challenge
🟢 10:31:02.856 INFO  🔐 TEA      ▸ TEA verification SUCCESS

  📤 user::enterGame        ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: enterGame  (user/enterGame)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

🟢 10:31:13.807 INFO  ⚔️ ENTER    ▸ enterGame REQUEST RECEIVED
  [ 1/10] 🔄 Required fields validation  █░░░░░░░░░
  [ 1/10] ✅ Required fields validation  █░░░░░░░░░  All 3 present

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 2/10] 🔄 Token auth via SDK-Server  ██░░░░░░░░
🟢 10:31:13.816 INFO  📡 SDKAPI   ▸ User verified via SDK-Server
  [ 2/10] ✅ Token auth via SDK-Server  ██░░░░░░░░  8ms
  [ 3/10] 🔄 ServerId validation  ███░░░░░░░
  [ 3/10] ✅ ServerId validation  ███░░░░░░░  1 == 1

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 4/10] 🔄 Request type validation  ████░░░░░░

  ┌──────────────────────────────────────────────────────────────┐
  │  ❌ FATAL ERROR AT STEP Server selection                    │
  │                                                              │
  │  STEP:   ENTER-TYPESCAN                                      │
  │  REASON: TYPE ASSERTION FAILED: request.serverId             │
  │  DETAIL: Server selection                                    │
  │  CLIENT: ctx.config.serverId                                 │
  │                                                              │
  │  IMPACT:  serverId must be string for parseInt comparison     │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘

  ├ ❌ field: request.serverId
  ├ ❌ expected: string
  ├ ❌ actual: number
  └ ❌ value: 1
  [ 4/10] ✅ Request type validation  ████░░░░░░  2/2 passed

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 5/10] 🔄 Database lookup  █████░░░░░
  [ 5/10] ✅ Database lookup  █████░░░░░  EXISTING USER (101 keys, 11,647 bytes)

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 6/10] 🔄 Config & resource invariants  ██████░░░░

  ⚠️  INVARIANT VIOLATION: config.serverVersion loaded
       SOURCE: ENTER-INVARIANT UserInfoSingleton.serverVersion → e.serverVersion
       REASON: Expected: truthy (string), Got: MISSING — Client displays wrong version info

  [ 6/10] ✅ Config & resource invariants  ██████░░░░  All server configs verified

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 7/10] 🔄 Build/Load user data  ███████░░░
  [ 7/10] ✅ Build/Load user data  ███████░░░  101 keys (0ms)
  [ 8/10] 🔄 Circular reference safety  ████████░░
  [ 8/10] ✅ Circular reference safety  ████████░░  0 circular refs

  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 training._award          = null  present — FIX-001 safe
  ├ 🔒 user._attribute._items[104] = present  Level=1
  ├ 🔒 imprint._items           = Object{}  FIX-005: client L114925 uses for...in → needs Object
  ├ 🔒 weapon._items            = Object{}  FIX-005: client L130938 uses for...in → needs Object
  └ 🔒 genki._items             = Object{}  FIX-005: client L132158 uses for...in → needs Object
  ✅ CRITICAL AUDIT: 5/5 PASSED

  [ 9/10] 🔄 JSON serialization test  █████████░
  [ 9/10] ✅ JSON serialization test  █████████░  11,647 bytes

  ⚠️ WARNINGS DETECTED
  ──────────────────────────────────────────────
  ⚠️  [W001] training._award EXISTS in stored data — potential circular ref
       Expected: null or undefined
       Got:      type=object (possibly self-referencing)
       Impact:   Client bug L121387 may create nesting loop on re-login
       Fix:      stripCircularReferences will sanitize before response
  ⚠️ TOTAL WARNINGS: 1


  ────────────────────────────────────────────────────────
  [07/10] 📝 MUTATION LOG
  ────────────────────────────────────────────────────────

🟢 10:31:13.820 INFO  ⚔️ ENTER    ▸ MUTATION: Existing user data UPDATED

  ────────────────────────────────────────────────────────
  [08/10] 💾 SAVE VERIFY
  ────────────────────────────────────────────────────────

  [10/10] 🔄 Database save  ██████████
[DB] saveUser("guest_2a33a5..."): 101 keys, 11647 bytes
  [10/10] ✅ Database save  ██████████  4ms
🟢 10:31:13.824 INFO  ⚔️ ENTER    ▸ Post-save integrity verification...

  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 ENTER GAME RESPONSE (ret=0) ───────────────────────────┐
  ├   user                         Object{20}
  ├   heros                        Object{4}
  ├   hangup                       Object{16}
  ├   totalProps                   Object{1}
  ├   backpackLevel                1
  ├   imprint                      Object{2}
  ├   weapon                       Object{2}
  ├   summon                       Object{7}
  ├   dungeon                      Object{2}
  ├   equip                        Object{2}
  ├   scheduleInfo                 Object{53}
  ├   timesInfo                    Object{12}
  ├   serverVersion                ""
  ├   serverId                     1
  ├   serverOpenDate               1778840724785
  ├   newUser                      false
  ├   currency                     "USD"
  ├   lastTeam                     Object{2}
  ├   superSkill                   Object{2}
  ├   giftInfo                     Object{11}
  ├   guide                        Object{2}
  ├   userGuild                    Object{3}
  ├   userGuildPub                 Object{8}
  ├   expedition                   Object{7}
  ├   retrieve                     Object{7}
  ├   battleMedal                  Object{11}
  ├   training                     Object{9}
  ├   heroSkin                     Object{3}
  ├   userWar                      Object{9}
  ├   userBallWar                  Object{6}
  ├   headEffect                   Object{4}
  ├   userTopBattle                Object{10}
  ├   topBattleInfo                Object{4}
  ├   checkin                      Object{5}
  ├   curMainTask                  Object{0}
  ├   summonLog                    Array[0] ⚠️ EMPTY
  ├   vipLog                       Array[0] ⚠️ EMPTY
  ├   cardLog                      Array[0] ⚠️ EMPTY
  ├   onlineBulletin               Array[0] ⚠️ EMPTY
  ├   broadcastRecord              Array[0] ⚠️ EMPTY
  ├   blacklist                    Object{0}
  ├   forbiddenChat                Object{2}
  ├   guildLevel                   0
  ├   guildTreasureMatchRet        0
  ├   dragonEquiped                Object{0}
  ├   warInfo                      null ⚠️ NULL
  ├   ballWarState                 0
  ├   enableShowQQ                 false
  ├   showQQVip                    0
  ├   showQQ                       0
  ├   showQQImg1                   ""
  ├   showQQImg2                   ""
  ├   showQQUrl                    ""
  ├   cellgameHaveSetHero          false
  ├   globalWarBuffTag             ""
  ├   globalWarLastRank            Object{0}
  ├   globalWarBuff                0
  ├   globalWarBuffEndTime         0
  ├   guildName                    ""
  ├   guildActivePoints            Object{0}
  ├   ballBroadcast                null ⚠️ NULL
  ├   ballWarInfo                  Object{4}
  ├   teamTraining                 Object{4}
  ├   teamServerHttpUrl            ""
  ├   teamDungeonOpenTime          0
  ├   teamDungeonTask              Object{3}
  ├   teamDungeonSplBcst           null ⚠️ NULL
  ├   teamDungeonNormBcst          null ⚠️ NULL
  ├   teamDungeonHideInfo          null ⚠️ NULL
  ├   teamDungeon                  Object{3}
  ├   teamDungeonInvitedFriends    null ⚠️ NULL
  ├   myTeamServerSocketUrl        "http://127.0.0.1:8003"
  ├   shopNewHeroes                Object{0}
  ├   channelSpecial               Object{15}
  ├   hideHeroes                   Array[0] ⚠️ EMPTY
  ├   templeLess                   0
  ├   timeTrial                    Object{9}
  ├   timeTrialNextOpenTime        0
  ├   YouTuberRecruit              Object{7}
  ├   userYouTuberRecruit          Object{2}
  ├   heroImageVersion             0
  ├   superImageVersion            0
  ├   karinStartTime               0
  ├   karinEndTime                 0
  ├   timeBonusInfo                Object{2}
  ├   monthCard                    Object{2}
  ├   recharge                     Object{2}
  ├   userDownloadReward           Object{4}
  ├   clickSystem                  Object{2}
  ├   questionnaires               null ⚠️ NULL
  ├   littleGame                   Object{3}
  ├   genki                        Object{4}
  ├   gemstone                     Object{1}
  ├   resonance                    Object{6}
  ├   fastTeam                     Object{1}
  ├   gravity                      Object{0}
  ├   timeMachine                  Object{1}
  ├   _arenaTeam                   null ⚠️ NULL
  ├   _arenaSuper                  null ⚠️ NULL
  ├   mergedServers                Array[0] ⚠️ EMPTY
  └   hangupTeam                   Object{2}
  └──────────────────────────────────────────────────────────┘


  ┌──────────────────────────────────────────────────────────────┐
  │  ❌ FATAL ERROR AT STEP RESPONSE TYPE SCAN                  │
  │                                                              │
  │  STEP:   ENTER                                               │
  │  REASON: userData.serverId expected string but got number    │
  │  DETAIL: UserDataParser reads these fields on client         │
  │  CLIENT: Multiple client parsers                             │
  │                                                              │
  │  IMPACT:  Client crash or silent data loss                    │
  │  FIX:     Check buildNewUserData or updateExistingUser        │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘

  ├ ❌ field: userData.serverId
  ├ ❌ expected: string
  ├ ❌ actual: number
  └ ❌ value: 1

  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ❌ ENTER GAME COMPLETE — WITH WARNINGS

  👤 USER:       guest_2a33a566488dfa9e (Returning User)
  📦 FIELDS:     101
  🦸 HEROES:     3 hero(es)
  💎 DIAMOND:    20
  🏆 LEVEL:      1

  📏 JSON SIZE:  11,647 chars
  📦 RESP SIZE:  2,729 chars
  🔐 PROTOCOL:   LZ-STRING
  ⏱️ TOTAL TIME: 51ms  ███████░░░░░░░░░

  🔒 CRITICAL:   5/5 PASSED
  ⚠️ WARNINGS:   1
  ❌ ERRORS:     1

  ═══════════════════════════════════════════

✅ user::enterGame        OK     ────────────────────────────
  └ ret=0 2729 chars (LZ) 52ms

  ✅ SUCCESS  📏 data= 2729 chars  📦 proto= LZ-STRING  ⏱️ time= 52ms

  └ ⏱️ handler: 52ms 

  📤 user::enterGame        ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: enterGame  (user/enterGame)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

🟢 10:31:13.867 INFO  ⚔️ ENTER    ▸ enterGame REQUEST RECEIVED
  [ 1/10] 🔄 Required fields validation  █░░░░░░░░░
  [ 1/10] ✅ Required fields validation  █░░░░░░░░░  All 3 present

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 2/10] 🔄 Token auth via SDK-Server  ██░░░░░░░░
🟢 10:31:13.878 INFO  📡 SDKAPI   ▸ User verified via SDK-Server
  [ 2/10] ✅ Token auth via SDK-Server  ██░░░░░░░░  12ms
  [ 3/10] 🔄 ServerId validation  ███░░░░░░░
  [ 3/10] ✅ ServerId validation  ███░░░░░░░  1 == 1

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 4/10] 🔄 Request type validation  ████░░░░░░

  ┌──────────────────────────────────────────────────────────────┐
  │  ❌ FATAL ERROR AT STEP Server selection                    │
  │                                                              │
  │  STEP:   ENTER-TYPESCAN                                      │
  │  REASON: TYPE ASSERTION FAILED: request.serverId             │
  │  DETAIL: Server selection                                    │
  │  CLIENT: ctx.config.serverId                                 │
  │                                                              │
  │  IMPACT:  serverId must be string for parseInt comparison     │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘

  ├ ❌ field: request.serverId
  ├ ❌ expected: string
  ├ ❌ actual: number
  └ ❌ value: 1
  [ 4/10] ✅ Request type validation  ████░░░░░░  2/2 passed

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 5/10] 🔄 Database lookup  █████░░░░░
  [ 5/10] ✅ Database lookup  █████░░░░░  EXISTING USER (101 keys, 11,647 bytes)

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 6/10] 🔄 Config & resource invariants  ██████░░░░

  ⚠️  INVARIANT VIOLATION: config.serverVersion loaded
       SOURCE: ENTER-INVARIANT UserInfoSingleton.serverVersion → e.serverVersion
       REASON: Expected: truthy (string), Got: MISSING — Client displays wrong version info

  [ 6/10] ✅ Config & resource invariants  ██████░░░░  All server configs verified

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 7/10] 🔄 Build/Load user data  ███████░░░
  [ 7/10] ✅ Build/Load user data  ███████░░░  101 keys (1ms)
  [ 8/10] 🔄 Circular reference safety  ████████░░
  [ 8/10] ✅ Circular reference safety  ████████░░  0 circular refs

  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 training._award          = null  present — FIX-001 safe
  ├ 🔒 user._attribute._items[104] = present  Level=1
  ├ 🔒 imprint._items           = Object{}  FIX-005: client L114925 uses for...in → needs Object
  ├ 🔒 weapon._items            = Object{}  FIX-005: client L130938 uses for...in → needs Object
  └ 🔒 genki._items             = Object{}  FIX-005: client L132158 uses for...in → needs Object
  ✅ CRITICAL AUDIT: 5/5 PASSED

  [ 9/10] 🔄 JSON serialization test  █████████░
  [ 9/10] ✅ JSON serialization test  █████████░  11,647 bytes

  ⚠️ WARNINGS DETECTED
  ──────────────────────────────────────────────
  ⚠️  [W001] training._award EXISTS in stored data — potential circular ref
       Expected: null or undefined
       Got:      type=object (possibly self-referencing)
       Impact:   Client bug L121387 may create nesting loop on re-login
       Fix:      stripCircularReferences will sanitize before response
  ⚠️ TOTAL WARNINGS: 1


  ────────────────────────────────────────────────────────
  [07/10] 📝 MUTATION LOG
  ────────────────────────────────────────────────────────

🟢 10:31:13.889 INFO  ⚔️ ENTER    ▸ MUTATION: Existing user data UPDATED

  ────────────────────────────────────────────────────────
  [08/10] 💾 SAVE VERIFY
  ────────────────────────────────────────────────────────

  [10/10] 🔄 Database save  ██████████
[DB] saveUser("guest_2a33a5..."): 101 keys, 11647 bytes
  [10/10] ✅ Database save  ██████████  8ms
🟢 10:31:13.900 INFO  ⚔️ ENTER    ▸ Post-save integrity verification...

  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 ENTER GAME RESPONSE (ret=0) ───────────────────────────┐
  ├   user                         Object{20}
  ├   heros                        Object{4}
  ├   hangup                       Object{16}
  ├   totalProps                   Object{1}
  ├   backpackLevel                1
  ├   imprint                      Object{2}
  ├   weapon                       Object{2}
  ├   summon                       Object{7}
  ├   dungeon                      Object{2}
  ├   equip                        Object{2}
  ├   scheduleInfo                 Object{53}
  ├   timesInfo                    Object{12}
  ├   serverVersion                ""
  ├   serverId                     1
  ├   serverOpenDate               1778840724785
  ├   newUser                      false
  ├   currency                     "USD"
  ├   lastTeam                     Object{2}
  ├   superSkill                   Object{2}
  ├   giftInfo                     Object{11}
  ├   guide                        Object{2}
  ├   userGuild                    Object{3}
  ├   userGuildPub                 Object{8}
  ├   expedition                   Object{7}
  ├   retrieve                     Object{7}
  ├   battleMedal                  Object{11}
  ├   training                     Object{9}
  ├   heroSkin                     Object{3}
  ├   userWar                      Object{9}
  ├   userBallWar                  Object{6}
  ├   headEffect                   Object{4}
  ├   userTopBattle                Object{10}
  ├   topBattleInfo                Object{4}
  ├   checkin                      Object{5}
  ├   curMainTask                  Object{0}
  ├   summonLog                    Array[0] ⚠️ EMPTY
  ├   vipLog                       Array[0] ⚠️ EMPTY
  ├   cardLog                      Array[0] ⚠️ EMPTY
  ├   onlineBulletin               Array[0] ⚠️ EMPTY
  ├   broadcastRecord              Array[0] ⚠️ EMPTY
  ├   blacklist                    Object{0}
  ├   forbiddenChat                Object{2}
  ├   guildLevel                   0
  ├   guildTreasureMatchRet        0
  ├   dragonEquiped                Object{0}
  ├   warInfo                      null ⚠️ NULL
  ├   ballWarState                 0
  ├   enableShowQQ                 false
  ├   showQQVip                    0
  ├   showQQ                       0
  ├   showQQImg1                   ""
  ├   showQQImg2                   ""
  ├   showQQUrl                    ""
  ├   cellgameHaveSetHero          false
  ├   globalWarBuffTag             ""
  ├   globalWarLastRank            Object{0}
  ├   globalWarBuff                0
  ├   globalWarBuffEndTime         0
  ├   guildName                    ""
  ├   guildActivePoints            Object{0}
  ├   ballBroadcast                null ⚠️ NULL
  ├   ballWarInfo                  Object{4}
  ├   teamTraining                 Object{4}
  ├   teamServerHttpUrl            ""
  ├   teamDungeonOpenTime          0
  ├   teamDungeonTask              Object{3}
  ├   teamDungeonSplBcst           null ⚠️ NULL
  ├   teamDungeonNormBcst          null ⚠️ NULL
  ├   teamDungeonHideInfo          null ⚠️ NULL
  ├   teamDungeon                  Object{3}
  ├   teamDungeonInvitedFriends    null ⚠️ NULL
  ├   myTeamServerSocketUrl        "http://127.0.0.1:8003"
  ├   shopNewHeroes                Object{0}
  ├   channelSpecial               Object{15}
  ├   hideHeroes                   Array[0] ⚠️ EMPTY
  ├   templeLess                   0
  ├   timeTrial                    Object{9}
  ├   timeTrialNextOpenTime        0
  ├   YouTuberRecruit              Object{7}
  ├   userYouTuberRecruit          Object{2}
  ├   heroImageVersion             0
  ├   superImageVersion            0
  ├   karinStartTime               0
  ├   karinEndTime                 0
  ├   timeBonusInfo                Object{2}
  ├   monthCard                    Object{2}
  ├   recharge                     Object{2}
  ├   userDownloadReward           Object{4}
  ├   clickSystem                  Object{2}
  ├   questionnaires               null ⚠️ NULL
  ├   littleGame                   Object{3}
  ├   genki                        Object{4}
  ├   gemstone                     Object{1}
  ├   resonance                    Object{6}
  ├   fastTeam                     Object{1}
  ├   gravity                      Object{0}
  ├   timeMachine                  Object{1}
  ├   _arenaTeam                   null ⚠️ NULL
  ├   _arenaSuper                  null ⚠️ NULL
  ├   mergedServers                Array[0] ⚠️ EMPTY
  └   hangupTeam                   Object{2}
  └──────────────────────────────────────────────────────────┘


  ┌──────────────────────────────────────────────────────────────┐
  │  ❌ FATAL ERROR AT STEP RESPONSE TYPE SCAN                  │
  │                                                              │
  │  STEP:   ENTER                                               │
  │  REASON: userData.serverId expected string but got number    │
  │  DETAIL: UserDataParser reads these fields on client         │
  │  CLIENT: Multiple client parsers                             │
  │                                                              │
  │  IMPACT:  Client crash or silent data loss                    │
  │  FIX:     Check buildNewUserData or updateExistingUser        │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘

  ├ ❌ field: userData.serverId
  ├ ❌ expected: string
  ├ ❌ actual: number
  └ ❌ value: 1

  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ❌ ENTER GAME COMPLETE — WITH WARNINGS

  👤 USER:       guest_2a33a566488dfa9e (Returning User)
  📦 FIELDS:     101
  🦸 HEROES:     3 hero(es)
  💎 DIAMOND:    20
  🏆 LEVEL:      1

  📏 JSON SIZE:  11,647 chars
  📦 RESP SIZE:  2,734 chars
  🔐 PROTOCOL:   LZ-STRING
  ⏱️ TOTAL TIME: 71ms  ██████████░░░░░░

  🔒 CRITICAL:   5/5 PASSED
  ⚠️ WARNINGS:   1
  ❌ ERRORS:     1

  ═══════════════════════════════════════════

✅ user::enterGame        OK     ────────────────────────────
  └ ret=0 2734 chars (LZ) 71ms

  ✅ SUCCESS  📏 data= 2734 chars  📦 proto= LZ-STRING  ⏱️ time= 71ms

  └ ⏱️ handler: 71ms 

  📤 user::getBulletinBrief ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: getBulletinBrief  (user/getBulletinBrief)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate request fields  █░
  [ 1/ 2] ✅ Validate request fields  █░  userId OK

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Load global bulletin data  █
  [ 1/ 1] ✅ Load global bulletin data  █  0 entries loaded

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Type assert request fields  █
  [ 1/ 1] ✅ Type assert request fields  █  type verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Snapshot bulletin state  █
  [ 1/ 1] ✅ Snapshot bulletin state  █  0 bulletins in global store

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate business rules  █░
  [ 1/ 2] ✅ Validate business rules  █░  invariants checked

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Build _brief object (strip body field)  █
  [ 1/ 1] ✅ Build _brief object (strip body field)  █  0 bulletins (body stripped)

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  └ 🔒 _brief                   = Object{0}  L121094: for(var o in n._brief) iterates each bulletin
  ✅ CRITICAL AUDIT: 1/1 PASSED


  ┌ 📸 getBulletinBrief ret=0 ────────────────────────────────┐
  └   _brief                       Object{0}
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ GET BULLETIN BRIEF COMPLETE

  👤 USER:       guest_2a33a566488dfa9e


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════

✅ user::getBulletinBrief OK     ────────────────────────────
  └ ret=0 13 chars (raw) 9ms

  ✅ SUCCESS  📏 data= 13 chars  📦 proto= RAW  ⏱️ time= 9ms

  └ ⏱️ handler: 10ms 

  📤 friend::friendServerAction ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: friendServerAction  (friend/friendServerAction)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate request fields  █░
  [ 1/ 2] ✅ Validate request fields  █░  relayAction="${relayAction}"

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Load userData from DB  █
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded + teamwork fields ensured

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Type assert request fields  █░
  [ 1/ 2] ✅ Type assert request fields  █░  types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Snapshot teamwork storage state  █
  [ 1/ 1] ✅ Snapshot teamwork storage state  █  0 friends

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Validate relayAction is known  █
  [ 1/ 1] ✅ Validate relayAction is known  █  known action

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Dispatch relayAction: queryFriends  █
  [ 1/ 1] ✅ Dispatch relayAction: queryFriends  █  0 friends

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 friendServerAction ret=0 [queryFriends] ───────────────┐
  └   users                        Object{0}
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ FRIEND SERVER ACTION COMPLETE

  👤 USER:       guest_2a33a566488dfa9e


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════


  📤 friend::friendServerAction ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: friendServerAction  (friend/friendServerAction)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate request fields  █░
  [ 1/ 2] ✅ Validate request fields  █░  relayAction="${relayAction}"

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Load userData from DB  █
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded + teamwork fields ensured

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Type assert request fields  █░
  [ 1/ 2] ✅ Type assert request fields  █░  types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Snapshot teamwork storage state  █
  [ 1/ 1] ✅ Snapshot teamwork storage state  █  0 friends

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Validate relayAction is known  █
  [ 1/ 1] ✅ Validate relayAction is known  █  known action

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Dispatch relayAction: queryBlackList  █
  [ 1/ 1] ✅ Dispatch relayAction: queryBlackList  █  0 entries

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 friendServerAction ret=0 [queryBlackList] ─────────────┐
  └   users                        Object{0}
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ FRIEND SERVER ACTION COMPLETE

  👤 USER:       guest_2a33a566488dfa9e


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════

✅ friend::friendServerAction OK     ────────────────────────────
  └ ret=0 12 chars (raw) 8ms

  ✅ SUCCESS  📏 data= 12 chars  📦 proto= RAW  ⏱️ time= 8ms

  └ ⏱️ handler: 8ms 
✅ friend::friendServerAction OK     ────────────────────────────
  └ ret=0 12 chars (raw) 5ms

  ✅ SUCCESS  📏 data= 12 chars  📦 proto= RAW  ⏱️ time= 5ms

  └ ⏱️ handler: 5ms 

  ➖ DISCONNECT ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
  └ 🔗 reason: reason=ping timeout  sid= p7HStV89...

  ➕ NEW CONNECTION ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
🟢 10:32:20.744 INFO  🔐 TEA      ▸ Sending verify challenge
🟢 10:32:20.817 INFO  🔐 TEA      ▸ TEA verification SUCCESS

  📤 user::enterGame        ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: enterGame  (user/enterGame)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

🟢 10:32:20.862 INFO  ⚔️ ENTER    ▸ enterGame REQUEST RECEIVED
  [ 1/10] 🔄 Required fields validation  █░░░░░░░░░
  [ 1/10] ✅ Required fields validation  █░░░░░░░░░  All 3 present

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 2/10] 🔄 Token auth via SDK-Server  ██░░░░░░░░
🟢 10:32:20.871 INFO  📡 SDKAPI   ▸ User verified via SDK-Server
  [ 2/10] ✅ Token auth via SDK-Server  ██░░░░░░░░  10ms
  [ 3/10] 🔄 ServerId validation  ███░░░░░░░
  [ 3/10] ✅ ServerId validation  ███░░░░░░░  1 == 1

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 4/10] 🔄 Request type validation  ████░░░░░░

  ┌──────────────────────────────────────────────────────────────┐
  │  ❌ FATAL ERROR AT STEP Server selection                    │
  │                                                              │
  │  STEP:   ENTER-TYPESCAN                                      │
  │  REASON: TYPE ASSERTION FAILED: request.serverId             │
  │  DETAIL: Server selection                                    │
  │  CLIENT: ctx.config.serverId                                 │
  │                                                              │
  │  IMPACT:  serverId must be string for parseInt comparison     │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘

  ├ ❌ field: request.serverId
  ├ ❌ expected: string
  ├ ❌ actual: number
  └ ❌ value: 1
  [ 4/10] ✅ Request type validation  ████░░░░░░  2/2 passed

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 5/10] 🔄 Database lookup  █████░░░░░
  [ 5/10] ✅ Database lookup  █████░░░░░  EXISTING USER (101 keys, 11,647 bytes)

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 6/10] 🔄 Config & resource invariants  ██████░░░░

  ⚠️  INVARIANT VIOLATION: config.serverVersion loaded
       SOURCE: ENTER-INVARIANT UserInfoSingleton.serverVersion → e.serverVersion
       REASON: Expected: truthy (string), Got: MISSING — Client displays wrong version info

  [ 6/10] ✅ Config & resource invariants  ██████░░░░  All server configs verified

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 7/10] 🔄 Build/Load user data  ███████░░░
  [ 7/10] ✅ Build/Load user data  ███████░░░  101 keys (1ms)
  [ 8/10] 🔄 Circular reference safety  ████████░░
  [ 8/10] ✅ Circular reference safety  ████████░░  0 circular refs

  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 training._award          = null  present — FIX-001 safe
  ├ 🔒 user._attribute._items[104] = present  Level=1
  ├ 🔒 imprint._items           = Object{}  FIX-005: client L114925 uses for...in → needs Object
  ├ 🔒 weapon._items            = Object{}  FIX-005: client L130938 uses for...in → needs Object
  └ 🔒 genki._items             = Object{}  FIX-005: client L132158 uses for...in → needs Object
  ✅ CRITICAL AUDIT: 5/5 PASSED

  [ 9/10] 🔄 JSON serialization test  █████████░
  [ 9/10] ✅ JSON serialization test  █████████░  11,647 bytes

  ⚠️ WARNINGS DETECTED
  ──────────────────────────────────────────────
  ⚠️  [W001] training._award EXISTS in stored data — potential circular ref
       Expected: null or undefined
       Got:      type=object (possibly self-referencing)
       Impact:   Client bug L121387 may create nesting loop on re-login
       Fix:      stripCircularReferences will sanitize before response
  ⚠️ TOTAL WARNINGS: 1


  ────────────────────────────────────────────────────────
  [07/10] 📝 MUTATION LOG
  ────────────────────────────────────────────────────────

🟢 10:32:20.882 INFO  ⚔️ ENTER    ▸ MUTATION: Existing user data UPDATED

  ────────────────────────────────────────────────────────
  [08/10] 💾 SAVE VERIFY
  ────────────────────────────────────────────────────────

  [10/10] 🔄 Database save  ██████████
[DB] saveUser("guest_2a33a5..."): 101 keys, 11647 bytes
  [10/10] ✅ Database save  ██████████  2ms
🟢 10:32:20.885 INFO  ⚔️ ENTER    ▸ Post-save integrity verification...

  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 ENTER GAME RESPONSE (ret=0) ───────────────────────────┐
  ├   user                         Object{20}
  ├   heros                        Object{4}
  ├   hangup                       Object{16}
  ├   totalProps                   Object{1}
  ├   backpackLevel                1
  ├   imprint                      Object{2}
  ├   weapon                       Object{2}
  ├   summon                       Object{7}
  ├   dungeon                      Object{2}
  ├   equip                        Object{2}
  ├   scheduleInfo                 Object{53}
  ├   timesInfo                    Object{12}
  ├   serverVersion                ""
  ├   serverId                     1
  ├   serverOpenDate               1778840724785
  ├   newUser                      false
  ├   currency                     "USD"
  ├   lastTeam                     Object{2}
  ├   superSkill                   Object{2}
  ├   giftInfo                     Object{11}
  ├   guide                        Object{2}
  ├   userGuild                    Object{3}
  ├   userGuildPub                 Object{8}
  ├   expedition                   Object{7}
  ├   retrieve                     Object{7}
  ├   battleMedal                  Object{11}
  ├   training                     Object{9}
  ├   heroSkin                     Object{3}
  ├   userWar                      Object{9}
  ├   userBallWar                  Object{6}
  ├   headEffect                   Object{4}
  ├   userTopBattle                Object{10}
  ├   topBattleInfo                Object{4}
  ├   checkin                      Object{5}
  ├   curMainTask                  Object{0}
  ├   summonLog                    Array[0] ⚠️ EMPTY
  ├   vipLog                       Array[0] ⚠️ EMPTY
  ├   cardLog                      Array[0] ⚠️ EMPTY
  ├   onlineBulletin               Array[0] ⚠️ EMPTY
  ├   broadcastRecord              Array[0] ⚠️ EMPTY
  ├   blacklist                    Object{0}
  ├   forbiddenChat                Object{2}
  ├   guildLevel                   0
  ├   guildTreasureMatchRet        0
  ├   dragonEquiped                Object{0}
  ├   warInfo                      null ⚠️ NULL
  ├   ballWarState                 0
  ├   enableShowQQ                 false
  ├   showQQVip                    0
  ├   showQQ                       0
  ├   showQQImg1                   ""
  ├   showQQImg2                   ""
  ├   showQQUrl                    ""
  ├   cellgameHaveSetHero          false
  ├   globalWarBuffTag             ""
  ├   globalWarLastRank            Object{0}
  ├   globalWarBuff                0
  ├   globalWarBuffEndTime         0
  ├   guildName                    ""
  ├   guildActivePoints            Object{0}
  ├   ballBroadcast                null ⚠️ NULL
  ├   ballWarInfo                  Object{4}
  ├   teamTraining                 Object{4}
  ├   teamServerHttpUrl            ""
  ├   teamDungeonOpenTime          0
  ├   teamDungeonTask              Object{3}
  ├   teamDungeonSplBcst           null ⚠️ NULL
  ├   teamDungeonNormBcst          null ⚠️ NULL
  ├   teamDungeonHideInfo          null ⚠️ NULL
  ├   teamDungeon                  Object{3}
  ├   teamDungeonInvitedFriends    null ⚠️ NULL
  ├   myTeamServerSocketUrl        "http://127.0.0.1:8003"
  ├   shopNewHeroes                Object{0}
  ├   channelSpecial               Object{15}
  ├   hideHeroes                   Array[0] ⚠️ EMPTY
  ├   templeLess                   0
  ├   timeTrial                    Object{9}
  ├   timeTrialNextOpenTime        0
  ├   YouTuberRecruit              Object{7}
  ├   userYouTuberRecruit          Object{2}
  ├   heroImageVersion             0
  ├   superImageVersion            0
  ├   karinStartTime               0
  ├   karinEndTime                 0
  ├   timeBonusInfo                Object{2}
  ├   monthCard                    Object{2}
  ├   recharge                     Object{2}
  ├   userDownloadReward           Object{4}
  ├   clickSystem                  Object{2}
  ├   questionnaires               null ⚠️ NULL
  ├   littleGame                   Object{3}
  ├   genki                        Object{4}
  ├   gemstone                     Object{1}
  ├   resonance                    Object{6}
  ├   fastTeam                     Object{1}
  ├   gravity                      Object{0}
  ├   timeMachine                  Object{1}
  ├   _arenaTeam                   null ⚠️ NULL
  ├   _arenaSuper                  null ⚠️ NULL
  ├   mergedServers                Array[0] ⚠️ EMPTY
  └   hangupTeam                   Object{2}
  └──────────────────────────────────────────────────────────┘


  ┌──────────────────────────────────────────────────────────────┐
  │  ❌ FATAL ERROR AT STEP RESPONSE TYPE SCAN                  │
  │                                                              │
  │  STEP:   ENTER                                               │
  │  REASON: userData.serverId expected string but got number    │
  │  DETAIL: UserDataParser reads these fields on client         │
  │  CLIENT: Multiple client parsers                             │
  │                                                              │
  │  IMPACT:  Client crash or silent data loss                    │
  │  FIX:     Check buildNewUserData or updateExistingUser        │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘

  ├ ❌ field: userData.serverId
  ├ ❌ expected: string
  ├ ❌ actual: number
  └ ❌ value: 1

  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ❌ ENTER GAME COMPLETE — WITH WARNINGS

  👤 USER:       guest_2a33a566488dfa9e (Returning User)
  📦 FIELDS:     101
  🦸 HEROES:     3 hero(es)
  💎 DIAMOND:    20
  🏆 LEVEL:      1

  📏 JSON SIZE:  11,647 chars
  📦 RESP SIZE:  2,730 chars
  🔐 PROTOCOL:   LZ-STRING
  ⏱️ TOTAL TIME: 46ms  ██████░░░░░░░░░░

  🔒 CRITICAL:   5/5 PASSED
  ⚠️ WARNINGS:   1
  ❌ ERRORS:     1

  ═══════════════════════════════════════════

✅ user::enterGame        OK     ────────────────────────────
  └ ret=0 2730 chars (LZ) 47ms

  ✅ SUCCESS  📏 data= 2730 chars  📦 proto= LZ-STRING  ⏱️ time= 47ms

  └ ⏱️ handler: 48ms 

  📤 user::getBulletinBrief ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: getBulletinBrief  (user/getBulletinBrief)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate request fields  █░
  [ 1/ 2] ✅ Validate request fields  █░  userId OK

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Load global bulletin data  █
  [ 1/ 1] ✅ Load global bulletin data  █  0 entries loaded

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Type assert request fields  █
  [ 1/ 1] ✅ Type assert request fields  █  type verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Snapshot bulletin state  █
  [ 1/ 1] ✅ Snapshot bulletin state  █  0 bulletins in global store

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate business rules  █░
  [ 1/ 2] ✅ Validate business rules  █░  invariants checked

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Build _brief object (strip body field)  █
  [ 1/ 1] ✅ Build _brief object (strip body field)  █  0 bulletins (body stripped)

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  └ 🔒 _brief                   = Object{0}  L121094: for(var o in n._brief) iterates each bulletin
  ✅ CRITICAL AUDIT: 1/1 PASSED


  ┌ 📸 getBulletinBrief ret=0 ────────────────────────────────┐
  └   _brief                       Object{0}
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ GET BULLETIN BRIEF COMPLETE

  👤 USER:       guest_2a33a566488dfa9e


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════

✅ user::getBulletinBrief OK     ────────────────────────────
  └ ret=0 13 chars (raw) 1ms

  ✅ SUCCESS  📏 data= 13 chars  📦 proto= RAW  ⏱️ time= 1ms

  └ ⏱️ handler: 2ms 

  📤 friend::friendServerAction ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: friendServerAction  (friend/friendServerAction)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate request fields  █░
  [ 1/ 2] ✅ Validate request fields  █░  relayAction="${relayAction}"

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Load userData from DB  █
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded + teamwork fields ensured

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Type assert request fields  █░
  [ 1/ 2] ✅ Type assert request fields  █░  types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Snapshot teamwork storage state  █
  [ 1/ 1] ✅ Snapshot teamwork storage state  █  0 friends

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Validate relayAction is known  █
  [ 1/ 1] ✅ Validate relayAction is known  █  known action

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Dispatch relayAction: queryFriends  █
  [ 1/ 1] ✅ Dispatch relayAction: queryFriends  █  0 friends

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 friendServerAction ret=0 [queryFriends] ───────────────┐
  └   users                        Object{0}
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ FRIEND SERVER ACTION COMPLETE

  👤 USER:       guest_2a33a566488dfa9e


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════

✅ friend::friendServerAction OK     ────────────────────────────
  └ ret=0 12 chars (raw) 6ms

  ✅ SUCCESS  📏 data= 12 chars  📦 proto= RAW  ⏱️ time= 6ms

  └ ⏱️ handler: 7ms 

  📤 friend::friendServerAction ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: friendServerAction  (friend/friendServerAction)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Validate request fields  █░
  [ 1/ 2] ✅ Validate request fields  █░  relayAction="${relayAction}"

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Load userData from DB  █
  [ 1/ 1] ✅ Load userData from DB  █  userData loaded + teamwork fields ensured

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [ 1/ 2] 🔄 Type assert request fields  █░
  [ 1/ 2] ✅ Type assert request fields  █░  types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Snapshot teamwork storage state  █
  [ 1/ 1] ✅ Snapshot teamwork storage state  █  0 friends

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Validate relayAction is known  █
  [ 1/ 1] ✅ Validate relayAction is known  █  known action

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [ 1/ 1] 🔄 Dispatch relayAction: queryBlackList  █
  [ 1/ 1] ✅ Dispatch relayAction: queryBlackList  █  0 entries

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 friendServerAction ret=0 [queryBlackList] ─────────────┐
  └   users                        Object{0}
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════════

  ✅ FRIEND SERVER ACTION COMPLETE

  👤 USER:       guest_2a33a566488dfa9e


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════

✅ friend::friendServerAction OK     ────────────────────────────
  └ ret=0 12 chars (raw) 2ms

  ✅ SUCCESS  📏 data= 12 chars  📦 proto= RAW  ⏱️ time= 2ms

  └ ⏱️ handler: 2ms 

  📤 user::registChat       ──────────────────────────────────

  ══════════════════════════════════════════════════════════
  🎮 HANDLER: registChat  (user/registChat)  userId=guest_2a33a56648
  ══════════════════════════════════════════════════════════


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

🟢 10:32:23.973 INFO  ⚪ REGIST_CHAT ▸ registChat REQUEST RECEIVED
🟢 10:32:23.973 INFO  ⚪ REGIST_CHAT ▸ Entry check PASS — userId=guest_2a33a56648...

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

🟢 10:32:23.973 INFO  ⚪ REGIST_CHAT ▸ Loading config for chat registration
🟢 10:32:23.973 INFO  ⚪ REGIST_CHAT ▸ Config loaded — chatUrl and serverId resolved

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

🟢 10:32:23.973 INFO  ⚪ REGIST_CHAT ▸ Loading player state for guild/room context

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

🟢 10:32:23.975 INFO  ⚪ REGIST_CHAT ▸ Building chat registration response (6 fields)
🟢 10:32:23.975 INFO  ⚪ REGIST_CHAT ▸ Response fields built — 6 fields total

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────

🟢 10:32:23.975 INFO  ⚪ REGIST_CHAT ▸ No data mutations (configuration handler)

  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────

🟢 10:32:23.975 INFO  ⚪ REGIST_CHAT ▸ No DB save required (configuration handler)

  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 _success                 = true  L114470: n._success ? connect chat : retry every 3s (max 15)
  ├ 🔒 _chatServerUrl           = http://127.0.0.1:8002  L114480→L82537: io.connect(url) — MUST be full URL
  ├ 🔒 _worldRoomId             = world_1  L114566: chatJoinRequest(worldRoomId) — ALWAYS joined after login
  ├ 🔒 _guildRoomId             = (undefined)  L114568: if(guildRoomId) join — undefined = skip (no guild)
  ├ 🔒 _teamDungeonChatRoom     = (undefined)  L114579: if(teamDungeonChatRoom) join — undefined = skip
  └ 🔒 _teamChatRoom            = (undefined)  L114590: if(teamChatRoomId) join — undefined = skip (no team)
  ✅ CRITICAL AUDIT: 6/6 PASSED


  ┌ 📸 registChat ret=0 ──────────────────────────────────────┐
  ├   _success                     true
  ├   _chatServerUrl               "http://127.0.0.1:8002"
  └   _worldRoomId                 "world_1"
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ⚠️ WARNINGS DETECTED
  ──────────────────────────────────────────────
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


  ═══════════════════════════════════════════

  ✅ REGIST CHAT COMPLETE

  👤 USER:       guest_2a33a566488dfa9e
  📦 FIELDS:     6

  ⏱️ TOTAL TIME: 3ms  ░░░░░░░░░░░░░░░░


  ═══════════════════════════════════════════

✅ user::registChat       OK     ────────────────────────────
  └ ret=0 83 chars (raw) 6ms

  ✅ SUCCESS  📏 data= 83 chars  📦 proto= RAW  ⏱️ time= 6ms

  └ ⏱️ handler: 6ms 

  ➖ DISCONNECT ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
  └ 🔗 reason: reason=transport close  sid= s2I6Nwsr...
[DB] Loaded 8 records from /var/www/html/server/main-server/data/main_server.json (90603 bytes)
🟢 13:24:07.418 INFO  📋 CONFIG   ▸ serverOpenDate auto-initialized: 1778851447417
🟢 13:24:07.424 INFO  🚀 SERVER   ▸ 🛡️ Fatal capture ACTIVE — watching for uncaught errors

  ┌─ LOADING RESOURCES ───────────────────────────────────┐

🟢 13:24:07.428 INFO  📋 CONFIG   ▸ Resource loaded: constant.json
🟢 13:24:07.473 INFO  📋 CONFIG   ▸ Resource loaded: hero.json
🟢 13:24:07.477 INFO  📋 CONFIG   ▸ Resource loaded: summon.json
🟢 13:24:07.482 INFO  📋 CONFIG   ▸ Resource loaded: heroLevelAttr.json
🟢 13:24:07.485 INFO  📋 CONFIG   ▸ Resource loaded: heroTypeParam.json
🟢 13:24:07.487 INFO  📋 CONFIG   ▸ Resource loaded: heroQualityParam.json
🟢 13:24:07.492 INFO  📋 CONFIG   ▸ Resource loaded: heroPower.json
🟢 13:24:07.496 INFO  📋 CONFIG   ▸ Resource loaded: zPowerQualityPara.json

  ──────────────────────────────


  ╔════════════════════════════════════════════════════════════╗
  ║  SUPER WARRIOR Z — MAIN SERVER                             ║
  ╚════════════════════════════════════════════════════════════╝


  🛡️ CONFIG AUDIT — checking for silent config mistakes
  ──────────────────────────────────────────────────
  ├ ⚠️ config.serverVersion is EMPTY — client UserInfoSingleton.serverVersion will show blank
       🔨 FIX: Set to game version from properties/clientversion.json
  ├ ⚠️ config.chatUrl uses localhost: http://127.0.0.1:8002 — chat server unreachable from external clients
       🔨 FIX: Set to public IP or domain name of chat server
  ├ ⚠️ config.dungeonUrl uses localhost: http://127.0.0.1:8003 — dungeon server unreachable from external clients
       🔨 FIX: Set to public IP or domain name of dungeon server
  └ ⚠️ config.serverId is type NUMBER (1) — client L114417 may compare as string
       🔨 FIX: Convert to String when building response, or store as string in config

  └ 4 WARNING(S)



  ──────────────────────────────

🟢 13:24:07.609 INFO  📋 CONFIG   ▸ Resource JSON status:
  ══════════════════════════════════════════════════════════

🟢 13:24:07.610 INFO  ⚙️ HANDLER  ▸ Registered action handlers:

  ├ >> user::enterGame  handlers/user/enterGame.js
  ├ >> user::registChat  handlers/user/registChat.js
  ├ >> user::getBulletinBrief  handlers/user/getBulletinBrief.js
  ├ >> user::readBulletin  handlers/user/readBulletin.js
  ├ >> friend::friendServerAction  handlers/friend/friendServerAction.js
  ├ >> heroImage::getAll  handlers/heroImage/getAll.js
  ├ >> hero::getAttrs  handlers/hero/getAttrs.js
  ├ >> userMsg::getMsgList  handlers/userMsg/getMsgList.js
  ├ >> userMsg::getMsg  handlers/userMsg/getMsg.js
  ├ >> userMsg::sendMsg  handlers/userMsg/sendMsg.js
  ├ >> userMsg::readMsg  handlers/userMsg/readMsg.js
  ├ >> userMsg::delFriendMsg  handlers/userMsg/delFriendMsg.js
  ├ >> guide::saveGuide  handlers/guide/saveGuide.js
  ├ >> hangup::saveGuideTeam  handlers/hangup/saveGuideTeam.js
  ├ >> hangup::checkBattleResult  handlers/hangup/checkBattleResult.js
  ├ >> buryPoint::guideBattle  handlers/buryPoint/guideBattle.js
  └ >> summon::summonOneFree  handlers/summon/summonOneFree.js


  ──────────────────────────────


🟢 13:24:07.611 INFO  🚀 SERVER   ▸ Ready — listening on http://127.0.0.1:8001
🟢 13:24:07.611 INFO  🚀 SERVER   ▸ Waiting for Socket.IO connections...


  ➕ NEW CONNECTION ──────────────────────────────────────────
🟢 13:25:57.455 INFO  🔐 TEA      ▸ Sending verify challenge
🟢 13:25:57.493 INFO  🔐 TEA      ▸ TEA verification SUCCESS

  📤 user::enterGame        ──────────────────────────────────

  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️
  ⚔️  user/enterGame  R0001  👤guest_8dc4ba55fd  🔍 ENTRY
  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

🟢 13:25:57.535 INFO  ⚔️ ENTER    ▸ enterGame REQUEST RECEIVED
  [01/10] 🔄 Required fields validation  █░░░░░░░░░
  [01/10] ✅ Required fields validation  █░░░░░░░░░  All 3 present

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [02/10] 🔄 Token auth via SDK-Server  ██░░░░░░░░
🟢 13:25:57.555 INFO  📡 SDKAPI   ▸ User verified via SDK-Server
  [02/10] ✅ Token auth via SDK-Server  ██░░░░░░░░  21ms
  [03/10] 🔄 ServerId validation  ███░░░░░░░
  [03/10] ✅ ServerId validation  ███░░░░░░░  1 == 1

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [04/10] 🔄 Request type validation  ████░░░░░░

  ┌──────────────────────────────────────────────────────────────┐
  │  ❌ FATAL ERROR AT STEP Server selection                    │
  │                                                              │
  │  STEP:   ENTER-TYPESCAN                                      │
  │  REASON: TYPE ASSERTION FAILED: request.serverId             │
  │  DETAIL: Server selection                                    │
  │  CLIENT: ctx.config.serverId                                 │
  │                                                              │
  │  IMPACT:  serverId must be string for parseInt comparison     │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘

  ├ ❌ field: request.serverId
  ├ ❌ expected: string
  ├ ❌ actual: number
  └ ❌ value: 1
  [04/10] ✅ Request type validation  ████░░░░░░  2/2 passed

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [05/10] 🔄 Database lookup  █████░░░░░
  [05/10] 🌟 Database lookup  █████░░░░░  NEW USER — no existing data

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [06/10] 🔄 Config & resource invariants  ██████░░░░

  ⚠️  INVARIANT VIOLATION: config.serverVersion loaded
       SOURCE: ENTER-INVARIANT UserInfoSingleton.serverVersion → e.serverVersion
       REASON: Expected: truthy (string), Got: MISSING — Client displays wrong version info

  [06/10] ✅ Config & resource invariants  ██████░░░░  All server configs verified

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [07/10] 🔄 Build/Load user data  ███████░░░
  [07/10] ✅ Build/Load user data  ███████░░░  100 keys (4ms)
  [08/10] 🔄 Circular reference safety  ████████░░
  [08/10] ✅ Circular reference safety  ████████░░  0 circular refs

  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 lastTeam[9]._team        = {0}  EMPTY — tutorial safe (guide 2106)
  ├ 🔒 training._award          = null  present — FIX-001 safe
  ├ 🔒 user._attribute._items[104] = present  Level=1
  ├ 🔒 imprint._items           = Object{}  FIX-005: client L114925 uses for...in → needs Object
  ├ 🔒 weapon._items            = Object{}  FIX-005: client L130938 uses for...in → needs Object
  └ 🔒 genki._items             = Object{}  FIX-005: client L132158 uses for...in → needs Object
  ✅ CRITICAL AUDIT: 6/6 PASSED

  [09/10] 🔄 JSON serialization test  █████████░
  [09/10] ✅ JSON serialization test  █████████░  10,057 bytes

  ────────────────────────────────────────────────────────
  [07/10] 📝 MUTATION LOG
  ────────────────────────────────────────────────────────

🟢 13:25:57.675 INFO  ⚔️ ENTER    ▸ MUTATION: New user data CREATED

  ────────────────────────────────────────────────────────
  [08/10] 💾 SAVE VERIFY
  ────────────────────────────────────────────────────────

  [10/10] 🔄 Database save  ██████████
[DB] saveUser("guest_8dc4ba..."): 100 keys, 10057 bytes
  [10/10] ✅ Database save  ██████████  5ms
🟢 13:25:57.681 INFO  ⚔️ ENTER    ▸ Post-save integrity verification...

  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 ENTER GAME RESPONSE (ret=0) ───────────────────────────┐
  ├ 👤 user                       Object{20}
  ├ 🦸 heros                      Object{4}
  ├ 📋 hangup                     Object{16}
  ├ 📋 totalProps                 Object{1}
  ├ 🏆 backpackLevel              1
  ├ 📋 imprint                    Object{2}
  ├ 📋 weapon                     Object{2}
  ├ 📋 summon                     Object{7}
  ├ ⚔️ dungeon                    Object{2}
  ├ 🌐 equip                      Object{2}
  ├ 📋 scheduleInfo               Object{53}
  ├ ⏱️ timesInfo                  Object{12}
  ├ 📦 serverVersion              ""
  ├ 🏠 serverId                   1
  ├ 📋 serverOpenDate             1778851447417
  ├ 📋 newUser                    true
  ├ 📋 currency                   "USD"
  ├ 📋 lastTeam                   Object{2}
  ├ 📋 superSkill                 Object{2}
  ├ 📋 giftInfo                   Object{11}
  ├ 📋 guide                      Object{2}
  ├ 📋 userGuild                  Object{3}
  ├ 📋 userGuildPub               Object{8}
  ├ 💥 expedition                 Object{7}
  ├ 📋 retrieve                   Object{7}
  ├ 📋 battleMedal                Object{11}
  ├ 📋 training                   Object{9}
  ├ 🦸 heroSkin                   Object{3}
  ├ 📋 userWar                    Object{9}
  ├ 📋 userBallWar                Object{6}
  ├ 📋 headEffect                 Object{4}
  ├ 📋 userTopBattle              Object{10}
  ├ 📋 topBattleInfo              Object{4}
  ├ 📋 checkin                    Object{5}
  ├ 📋 curMainTask                Object{0}
  ├ 📋 summonLog                  Array[0] ⚠️ EMPTY
  ├ 📋 vipLog                     Array[0] ⚠️ EMPTY
  ├ 📋 cardLog                    Array[0] ⚠️ EMPTY
  ├ 📋 onlineBulletin             Array[0] ⚠️ EMPTY
  ├ 📋 broadcastRecord            Array[0] ⚠️ EMPTY
  ├ 📋 blacklist                  Object{0}
  ├ 📋 forbiddenChat              Object{2}
  ├ 🏆 guildLevel                 0
  ├ 📋 guildTreasureMatchRet      0
  ├ 📋 dragonEquiped              Object{0}
  ├ 📋 warInfo                    null ⚠️ NULL
  ├ 📋 ballWarState               0
  ├ 📋 enableShowQQ               false
  ├ 🌐 showQQVip                  0
  ├ 📋 showQQ                     0
  ├ 📋 showQQImg1                 ""
  ├ 📋 showQQImg2                 ""
  ├ 📋 showQQUrl                  ""
  ├ 🦸 cellgameHaveSetHero        false
  ├ 📋 globalWarBuffTag           ""
  ├ 📋 globalWarLastRank          Object{0}
  ├ 📋 globalWarBuff              0
  ├ ⏱️ globalWarBuffEndTime       0
  ├ 📋 guildName                  ""
  ├ 📋 guildActivePoints          Object{0}
  ├ 📋 ballBroadcast              null ⚠️ NULL
  ├ 📋 ballWarInfo                Object{4}
  ├ 📋 teamTraining               Object{4}
  ├ 📋 teamServerHttpUrl          ""
  ├ ⚔️ teamDungeonOpenTime        0
  ├ ⚔️ teamDungeonTask            Object{3}
  ├ ⚔️ teamDungeonSplBcst         null ⚠️ NULL
  ├ ⚔️ teamDungeonNormBcst        null ⚠️ NULL
  ├ ⚔️ teamDungeonHideInfo        null ⚠️ NULL
  ├ ⚔️ teamDungeon                Object{3}
  ├ ⚔️ teamDungeonInvitedFriends  null ⚠️ NULL
  ├ 🔌 myTeamServerSocketUrl      "http://127.0.0.1:8003"
  ├ 🦸 shopNewHeroes              Object{0}
  ├ 📋 channelSpecial             Object{15}
  ├ 🦸 hideHeroes                 Array[0] ⚠️ EMPTY
  ├ 📋 templeLess                 0
  ├ ⏱️ timeTrial                  Object{9}
  ├ ⏱️ timeTrialNextOpenTime      0
  ├ ❌ YouTuberRecruit            Object{7}
  ├ ❌ userYouTuberRecruit        Object{2}
  ├ 🦸 heroImageVersion           0
  ├ 📦 superImageVersion          0
  ├ ⏱️ karinStartTime             0
  ├ ⏱️ karinEndTime               0
  ├ ⏱️ timeBonusInfo              Object{2}
  ├ 📋 monthCard                  Object{2}
  ├ 📋 recharge                   Object{2}
  ├ 📋 userDownloadReward         Object{4}
  ├ 📋 clickSystem                Object{2}
  ├ 📋 questionnaires             null ⚠️ NULL
  ├ 📋 littleGame                 Object{3}
  ├ 📋 genki                      Object{4}
  ├ 📋 gemstone                   Object{1}
  ├ 📋 resonance                  Object{6}
  ├ 📋 fastTeam                   Object{1}
  ├ 📋 gravity                    Object{0}
  ├ ⏱️ timeMachine                Object{1}
  ├ 📋 _arenaTeam                 null ⚠️ NULL
  ├ 📋 _arenaSuper                null ⚠️ NULL
  └ 📋 mergedServers              Array[0] ⚠️ EMPTY
  └──────────────────────────────────────────────────────────┘


  ┌──────────────────────────────────────────────────────────────┐
  │  ❌ FATAL ERROR AT STEP RESPONSE TYPE SCAN                  │
  │                                                              │
  │  STEP:   ENTER                                               │
  │  REASON: userData.serverId expected string but got number    │
  │  DETAIL: UserDataParser reads these fields on client         │
  │  CLIENT: Multiple client parsers                             │
  │                                                              │
  │  IMPACT:  Client crash or silent data loss                    │
  │  FIX:     Check buildNewUserData or updateExistingUser        │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘

  ├ ❌ field
  └ ❌ userData.serverId

  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════

  ❌ ENTER GAME COMPLETE

  👤 USER:       guest_8dc4ba55fd0e0370 (New User)
  📦 FIELDS:     100
  🦸 HEROES:     1 hero(es)
  💎 DIAMOND:    0
  🏆 LEVEL:      1

  📏 JSON SIZE:  10,057 chars
  📦 RESP SIZE:  2,382 chars
  📜 PROTOCOL:   LZ-STRING
  ⏱️ TOTAL TIME: 186ms  ████████████████

  🔒 CRITICAL:   6/6 PASSED
  ⚠️ WARNINGS:   0
  ❌ ERRORS:     1

  ═══════════════════════════════════════

✅ user::enterGame        OK     ────────────────────────────
  └ ret=0 2382 chars (LZ) 191ms

  ✅ SUCCESS  📏 data= 2382 chars  📦 proto= LZ-STRING  ⏱️ time= 191ms

  └ ⏱️ handler: 192ms █

  📤 user::getBulletinBrief ──────────────────────────────────

  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️
  ⚔️  user/getBulletinBrief  R0002  👤guest_8dc4ba55fd  🔍 ENTRY
  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [01/02] 🔄 Validate request fields  █░
  [01/02] ✅ Validate request fields  █░  userId OK

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Load global bulletin data  █
  [01/01] ✅ Load global bulletin data  █  0 entries loaded

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Type assert request fields  █
  [01/01] ✅ Type assert request fields  █  type verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Snapshot bulletin state  █
  [01/01] ✅ Snapshot bulletin state  █  0 bulletins in global store

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [01/02] 🔄 Validate business rules  █░
  [01/02] ✅ Validate business rules  █░  invariants checked

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Build _brief object (strip body field)  █
  [01/01] ✅ Build _brief object (strip body field)  █  0 bulletins (body stripped)

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  └ 🔒 _brief                   = Object{0}  L121094: for(var o in n._brief) iterates each bulletin
  ✅ CRITICAL AUDIT: 1/1 PASSED


  ┌ 📸 getBulletinBrief ret=0 ────────────────────────────────┐
  └ 📋 _brief                     Object{0}
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════

  ✅ GET BULLETIN BRIEF COMPLETE

  👤 USER:       guest_8dc4ba55fd0e0370


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════

✅ user::getBulletinBrief OK     ────────────────────────────
  └ ret=0 13 chars (raw) 10ms

  ✅ SUCCESS  📏 data= 13 chars  📦 proto= RAW  ⏱️ time= 10ms

  └ ⏱️ handler: 10ms 

  📤 friend::friendServerAction ──────────────────────────────────

  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️
  ⚔️  friend/friendServerAction  R0003  👤guest_8dc4ba55fd  🔍 ENTRY
  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [01/02] 🔄 Validate request fields  █░
  [01/02] ✅ Validate request fields  █░  relayAction="${relayAction}"

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Load userData from DB  █
  [01/01] ✅ Load userData from DB  █  userData loaded + teamwork fields ensured

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [01/02] 🔄 Type assert request fields  █░
  [01/02] ✅ Type assert request fields  █░  types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Snapshot teamwork storage state  █
  [01/01] ✅ Snapshot teamwork storage state  █  0 friends

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Validate relayAction is known  █
  [01/01] ✅ Validate relayAction is known  █  known action

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Dispatch relayAction: queryFriends  █
  [01/01] ✅ Dispatch relayAction: queryFriends  █  0 friends

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 friendServerAction ret=0 [queryFriends] ───────────────┐
  └ 📋 users                      Object{0}
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════

  ✅ FRIEND SERVER ACTION COMPLETE

  👤 USER:       guest_8dc4ba55fd0e0370


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════

✅ friend::friendServerAction OK     ────────────────────────────
  └ ret=0 12 chars (raw) 26ms

  ✅ SUCCESS  📏 data= 12 chars  📦 proto= RAW  ⏱️ time= 26ms

  └ ⏱️ handler: 26ms 

  📤 friend::friendServerAction ──────────────────────────────────

  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️
  ⚔️  friend/friendServerAction  R0004  👤guest_8dc4ba55fd  🔍 ENTRY
  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [01/02] 🔄 Validate request fields  █░
  [01/02] ✅ Validate request fields  █░  relayAction="${relayAction}"

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Load userData from DB  █
  [01/01] ✅ Load userData from DB  █  userData loaded + teamwork fields ensured

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [01/02] 🔄 Type assert request fields  █░
  [01/02] ✅ Type assert request fields  █░  types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Snapshot teamwork storage state  █
  [01/01] ✅ Snapshot teamwork storage state  █  0 friends

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Validate relayAction is known  █
  [01/01] ✅ Validate relayAction is known  █  known action

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Dispatch relayAction: queryBlackList  █
  [01/01] ✅ Dispatch relayAction: queryBlackList  █  0 entries

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 friendServerAction ret=0 [queryBlackList] ─────────────┐
  └ 📋 users                      Object{0}
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════

  ✅ FRIEND SERVER ACTION COMPLETE

  👤 USER:       guest_8dc4ba55fd0e0370


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════

✅ friend::friendServerAction OK     ────────────────────────────
  └ ret=0 12 chars (raw) 5ms

  ✅ SUCCESS  📏 data= 12 chars  📦 proto= RAW  ⏱️ time= 5ms

  └ ⏱️ handler: 5ms 

  📤 heroImage::getAll      ──────────────────────────────────

  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️
  ⚔️  heroImage/getAll  R0005  👤guest_8dc4ba55fd  🔍 ENTRY
  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [01/02] 🔄 Validate request fields  █░
  [01/02] ✅ Validate request fields  █░  userId OK

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Load userData from DB  █
  [01/01] ✅ Load userData from DB  █  userData loaded

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Type assert request fields  █
  [01/01] ✅ Type assert request fields  █  type verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Snapshot hero collection state  █
  [01/01] ✅ Snapshot hero collection state  █  1 heroes in collection

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [01/02] 🔄 Validate business rules  █░
  [01/02] ✅ Validate business rules  █░  invariants checked

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Build hero image data  █
  [01/01] ✅ Build hero image data  █  1 hero(es)

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  └ 🔒 _heros                   = Object{1}  L134363: for(var n in e._heros) → Object, each has _id/_maxLevel/_selfComments
  ✅ CRITICAL AUDIT: 1/1 PASSED


  ┌ 📸 getAll ret=0 ──────────────────────────────────────────┐
  └ 🦸 _heros                     Object{1}
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════

  ✅ HERO IMAGE GET ALL COMPLETE

  👤 USER:       guest_8dc4ba55fd0e0370
  📦 FIELDS:     1


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════

✅ heroImage::getAll      OK     ────────────────────────────
  └ ret=0 97 chars (raw) 5ms

  ✅ SUCCESS  📏 data= 97 chars  📦 proto= RAW  ⏱️ time= 5ms

  └ ⏱️ handler: 5ms 

  📤 hero::getAttrs         ──────────────────────────────────

  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️
  ⚔️  hero/getAttrs  R0006  👤guest_8dc4ba55fd  🔍 ENTRY
  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [01/02] 🔄 Validate request fields  █░
  [01/02] ✅ Validate request fields  █░  1 hero(es) requested

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Load userData from DB  █
  [01/01] ✅ Load userData from DB  █  userData loaded

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [01/02] 🔄 Type assert request fields  █░
  [01/02] ✅ Type assert request fields  █░  types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Snapshot hero request vs found  █
  [01/01] ✅ Snapshot hero request vs found  █  1/1 heroes found

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Validate hero availability  █
  [01/01] ✅ Validate hero availability  █  all heroes found

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Calculate hero attributes  █
  [01/01] ✅ Calculate hero attributes  █  1 heroes calculated

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 _attrs                   = Object{1}  L133726: for(var o in t._attrs) — keyed by hero index, each has _items with calculated attrs
  ├ 🔒 _baseAttrs               = Object{1}  L133731: t._baseAttrs[o] — keyed by hero index, each has _items with base attrs (before talent)
  └ 🔒 POWER (attr 21)          = calculated per hero  L133821: 21==p._id → heroBaseAttr.power = floor(num)
  ✅ CRITICAL AUDIT: 3/3 PASSED


  ┌ 📸 getAttrs ret=0 ────────────────────────────────────────┐
  ├ 📋 _attrs                     Object{1}
  └ 📋 _baseAttrs                 Object{1}
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════

  ✅ HERO GET ATTRS COMPLETE

  👤 USER:       guest_8dc4ba55fd0e0370
  📦 FIELDS:     2


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════

✅ hero::getAttrs         OK     ────────────────────────────
  └ ret=0 394 chars (raw) 8ms

  ✅ SUCCESS  📏 data= 394 chars  📦 proto= RAW  ⏱️ time= 8ms

  └ ⏱️ handler: 8ms 

  📤 userMsg::getMsgList    ──────────────────────────────────

  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️
  ⚔️  userMsg/getMsgList  R0007  👤guest_8dc4ba55fd  🔍 ENTRY
  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [01/02] 🔄 Validate request fields  █░
  [01/02] ✅ Validate request fields  █░  userId OK

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Load userData from DB  █
  [01/01] ✅ Load userData from DB  █  userData loaded

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Type assert request fields  █
  [01/01] ✅ Type assert request fields  █  type verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Snapshot message brief state  █
  [01/01] ✅ Snapshot message brief state  █  0 message entries

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Validate data integrity  █
  [01/01] ✅ Validate data integrity  █  valid object

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Return storedBrief directly  █
  [01/01] ✅ Return storedBrief directly  █  0 entries returned as-is

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  └ 🔒 _brief                   = Object{0}  L121134: setMessageFriendSimpleList iterates e[n].userInfo → UserSimpleInfo.deserialize
  ✅ CRITICAL AUDIT: 1/1 PASSED


  ┌ 📸 getMsgList ret=0 ──────────────────────────────────────┐
  └ 📋 _brief                     Object{0}
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════

  ✅ GET MSG LIST COMPLETE

  👤 USER:       guest_8dc4ba55fd0e0370
  📦 FIELDS:     1


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════

✅ userMsg::getMsgList    OK     ────────────────────────────
  └ ret=0 13 chars (raw) 4ms

  ✅ SUCCESS  📏 data= 13 chars  📦 proto= RAW  ⏱️ time= 4ms

  └ ⏱️ handler: 5ms 

  📤 user::registChat       ──────────────────────────────────

  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️
  ⚔️  user/registChat  R0008  👤guest_8dc4ba55fd  🔍 ENTRY
  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

🟢 13:26:02.758 INFO  ⚪ REGIST_CHAT ▸ registChat REQUEST RECEIVED
🟢 13:26:02.758 INFO  ⚪ REGIST_CHAT ▸ Entry check PASS — userId=guest_8dc4ba55fd...

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

🟢 13:26:02.759 INFO  ⚪ REGIST_CHAT ▸ Loading config for chat registration
🟢 13:26:02.759 INFO  ⚪ REGIST_CHAT ▸ Config loaded — chatUrl and serverId resolved

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

🟢 13:26:02.761 INFO  ⚪ REGIST_CHAT ▸ Loading player state for guild/room context

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

🟢 13:26:02.764 INFO  ⚪ REGIST_CHAT ▸ Building chat registration response (6 fields)
🟢 13:26:02.765 INFO  ⚪ REGIST_CHAT ▸ Response fields built — 6 fields total

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────

🟢 13:26:02.767 INFO  ⚪ REGIST_CHAT ▸ No data mutations (configuration handler)

  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────

🟢 13:26:02.768 INFO  ⚪ REGIST_CHAT ▸ No DB save required (configuration handler)

  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 _success                 = true  L114470: n._success ? connect chat : retry every 3s (max 15)
  ├ 🔒 _chatServerUrl           = http://127.0.0.1:8002  L114480→L82537: io.connect(url) — MUST be full URL
  ├ 🔒 _worldRoomId             = world_1  L114566: chatJoinRequest(worldRoomId) — ALWAYS joined after login
  ├ 🔒 _guildRoomId             = (undefined)  L114568: if(guildRoomId) join — undefined = skip (no guild)
  ├ 🔒 _teamDungeonChatRoom     = (undefined)  L114579: if(teamDungeonChatRoom) join — undefined = skip
  └ 🔒 _teamChatRoom            = (undefined)  L114590: if(teamChatRoomId) join — undefined = skip (no team)
  ✅ CRITICAL AUDIT: 6/6 PASSED


  ┌ 📸 registChat ret=0 ──────────────────────────────────────┐
  ├ ✅ _success                   true
  ├ 📋 _chatServerUrl             "http://127.0.0.1:8002"
  └ 📋 _worldRoomId               "world_1"
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ⚠️ WARNINGS DETECTED
  ──────────────────────────────────────────────
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


  ═══════════════════════════════════════

  ✅ REGIST CHAT COMPLETE

  👤 USER:       guest_8dc4ba55fd0e0370
  📦 FIELDS:     6

  ⏱️ TOTAL TIME: 13ms  █░░░░░░░░░░░░░░░


  ═══════════════════════════════════════

✅ user::registChat       OK     ────────────────────────────
  └ ret=0 83 chars (raw) 29ms

  ✅ SUCCESS  📏 data= 83 chars  📦 proto= RAW  ⏱️ time= 29ms

  └ ⏱️ handler: 29ms 

  📤 guide::saveGuide       ──────────────────────────────────

  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️
  ⚔️  guide/saveGuide  R0009  👤guest_8dc4ba55fd  🔍 ENTRY
  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [01/03] 🔄 Validate request fields  █░░
  [01/03] ✅ Validate request fields  █░░  type=2 step=2102

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Load userData from DB  █
  [01/01] ✅ Load userData from DB  █  userData loaded

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [01/02] 🔄 Type assert request fields  █░
  [01/02] ✅ Type assert request fields  █░  all types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Snapshot guide._steps before modification  █
  [01/01] ✅ Snapshot guide._steps before modification  █  guide._steps[2] was (none)

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [01/02] 🔄 Validate business rules  █░
  [01/02] ✅ Validate business rules  █░  invariants checked

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Update guide._steps  █
  [01/01] ✅ Update guide._steps  █  guide._steps[2] = 2102

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────

[DB] saveUser("guest_8dc4ba..."): 100 keys, 10065 bytes

  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 saveGuide ret=0 ───────────────────────────────────────┐
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════

  ✅ SAVE GUIDE COMPLETE

  👤 USER:       guest_8dc4ba55fd0e0370


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════

✅ guide::saveGuide       OK     ────────────────────────────
  └ ret=0 2 chars (raw) 16ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 16ms

  └ ⏱️ handler: 16ms 

  📤 guide::saveGuide       ──────────────────────────────────

  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️
  ⚔️  guide/saveGuide  R000A  👤guest_8dc4ba55fd  🔍 ENTRY
  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [01/03] 🔄 Validate request fields  █░░
  [01/03] ✅ Validate request fields  █░░  type=2 step=2107

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Load userData from DB  █
  [01/01] ✅ Load userData from DB  █  userData loaded

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [01/02] 🔄 Type assert request fields  █░
  [01/02] ✅ Type assert request fields  █░  all types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Snapshot guide._steps before modification  █
  [01/01] ✅ Snapshot guide._steps before modification  █  guide._steps[2] was 2102

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [01/02] 🔄 Validate business rules  █░
  [01/02] ✅ Validate business rules  █░  invariants checked

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Update guide._steps  █
  [01/01] ✅ Update guide._steps  █  guide._steps[2] = 2107

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────

[DB] saveUser("guest_8dc4ba..."): 100 keys, 10065 bytes

  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 saveGuide ret=0 ───────────────────────────────────────┐
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════

  ✅ SAVE GUIDE COMPLETE

  👤 USER:       guest_8dc4ba55fd0e0370


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════

✅ guide::saveGuide       OK     ────────────────────────────
  └ ret=0 2 chars (raw) 8ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 8ms

  └ ⏱️ handler: 8ms 

  📤 hangup::saveGuideTeam  ──────────────────────────────────

  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️
  ⚔️  hangup/saveGuideTeam  R000B  👤guest_8dc4ba55fd  🔍 ENTRY
  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [01/03] 🔄 Validate request fields  █░░
  [01/03] ✅ Validate request fields  █░░  team=5 heroes

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Load userData from DB  █
  [01/01] ✅ Load userData from DB  █  userData loaded

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [01/02] 🔄 Type assert request fields  █░
  [01/02] ✅ Type assert request fields  █░  all types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Snapshot hangupTeam data  █
  [01/01] ✅ Snapshot hangupTeam data  █  team=0 supers=0

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [01/02] 🔄 Validate business rules  █░
  [01/02] ✅ Validate business rules  █░  invariants checked

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Update hangupTeam  █
  [01/01] ✅ Update hangupTeam  █  team=5 heroes saved

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────

[DB] saveUser("guest_8dc4ba..."): 101 keys, 10180 bytes

  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 saveGuideTeam ret=0 ───────────────────────────────────┐
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════

  ✅ SAVE GUIDE TEAM COMPLETE

  👤 USER:       guest_8dc4ba55fd0e0370


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════

✅ hangup::saveGuideTeam  OK     ────────────────────────────
  └ ret=0 2 chars (raw) 9ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 9ms

  └ ⏱️ handler: 9ms 

  📤 hangup::checkBattleResult ──────────────────────────────────

  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️
  ⚔️  hangup/checkBattleResult  R000C  👤guest_8dc4ba55fd  🔍 ENTRY
  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [01/10] 🔄 Validate request  █░░░░░░░░░
  [01/10] ✅ Validate request  █░░░░░░░░░

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [02/10] 🔄 Load data  ██░░░░░░░░
🟢 13:26:07.384 INFO  📋 CONFIG   ▸ Resource loaded: lesson.json
  [02/10] ✅ Load data  ██░░░░░░░░  lesson.json=611 entries

  ────────────────────────────────────────────────────────
  [03/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [03/10] 🔄 Read progress  ███░░░░░░░
  [03/10] ✅ Read progress  ███░░░░░░░  lesson=10101

  ────────────────────────────────────────────────────────
  [04/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [04/10] 🔄 Determine outcome  ████░░░░░░
  [04/10] ✅ Determine outcome  ████░░░░░░  WIN (0)

  ────────────────────────────────────────────────────────
  [05/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [05/10] 🔄 Build response  █████░░░░░
  [05/10] ✅ Build response  █████░░░░░  WIN rewards=5 lesson=10102

  ────────────────────────────────────────────────────────
  [06/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [07/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────

[DB] saveUser("guest_8dc4ba..."): 101 keys, 10254 bytes

  ────────────────────────────────────────────────────────
  [08/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 _battleResult            = 0  L104882: 0 == e._battleResult -> true (tutorial forced win)
  ├ 🔒 _changeInfo._items       = 5 items  L97686: getBattleAwardItems iterates _changeInfo._items for {_id, _num}
  ├ 🔒 _curLess                 = 10102  L104892/L97751: OnHookSingleton.lastSection = e._curLess
  └ 🔒 _maxPassLesson           = 10101  L104893/L97751: OnHookSingleton.maxPassLesson = e._maxPassLesson
  ✅ CRITICAL AUDIT: 4/4 PASSED


  ────────────────────────────────────────────────────────
  [09/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════

  ✅ CHECK BATTLE RESULT

  👤 USER:       guest_8dc4ba55fd0e0370
  📦 FIELDS:     4



  ═══════════════════════════════════════


  ┌ 📸 CHECK BATTLE RESULT ret=0 ─────────────────────────────┐
  ├ 📋 _battleResult              0
  ├ 📋 _curLess                   10102
  ├ ✅ _maxPassLesson             10101
  └ 📋 _changeInfo                Object{1}
  └──────────────────────────────────────────────────────────┘

✅ hangup::checkBattleResult OK     ────────────────────────────
  └ ret=0 218 chars (raw) 22ms

  ✅ SUCCESS  📏 data= 218 chars  📦 proto= RAW  ⏱️ time= 22ms

  └ ⏱️ handler: 22ms 

  📤 buryPoint::guideBattle ──────────────────────────────────

  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️
  ⚔️  buryPoint/guideBattle  R000D  👤guest_8dc4ba55fd  🔍 ENTRY
  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [01/03] 🔄 Validate request fields  █░░
  [01/03] ✅ Validate request fields  █░░  point=load

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Check data injection requirements  █
  [01/01] ✅ Check data injection requirements  █  no DB load needed (analytics)

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [01/03] 🔄 Type assert request fields  █░░
  [01/03] ✅ Type assert request fields  █░░  all types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Check player state requirements  █
  [01/01] ✅ Check player state requirements  █  analytics handler, no player state read

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Validate point value  █
  [01/01] ✅ Validate point value  █  point="load" is valid

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Process analytics event  █
🟢 13:26:09.000 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received: point=load passLesson=10101
  [01/01] ✅ Process analytics event  █  analytics event logged

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 guideBattle ret=0 ─────────────────────────────────────┐
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════

  ✅ GUIDE BATTLE ANALYTICS COMPLETE

  👤 USER:       guest_8dc4ba55fd0e0370


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════

✅ buryPoint::guideBattle OK     ────────────────────────────
  └ ret=0 2 chars (raw) 2ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 2ms

  └ ⏱️ handler: 2ms 

  📤 buryPoint::guideBattle ──────────────────────────────────

  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️
  ⚔️  buryPoint/guideBattle  R000E  👤guest_8dc4ba55fd  🔍 ENTRY
  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [01/03] 🔄 Validate request fields  █░░
  [01/03] ✅ Validate request fields  █░░  point=battle

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Check data injection requirements  █
  [01/01] ✅ Check data injection requirements  █  no DB load needed (analytics)

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [01/03] 🔄 Type assert request fields  █░░
  [01/03] ✅ Type assert request fields  █░░  all types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Check player state requirements  █
  [01/01] ✅ Check player state requirements  █  analytics handler, no player state read

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Validate point value  █
  [01/01] ✅ Validate point value  █  point="battle" is valid

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Process analytics event  █
🟢 13:26:19.852 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received: point=battle passLesson=10101
  [01/01] ✅ Process analytics event  █  analytics event logged

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 guideBattle ret=0 ─────────────────────────────────────┐
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════

  ✅ GUIDE BATTLE ANALYTICS COMPLETE

  👤 USER:       guest_8dc4ba55fd0e0370


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════

✅ buryPoint::guideBattle OK     ────────────────────────────
  └ ret=0 2 chars (raw) 4ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 4ms

  └ ⏱️ handler: 4ms 

  📤 buryPoint::guideBattle ──────────────────────────────────

  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️
  ⚔️  buryPoint/guideBattle  R000F  👤guest_8dc4ba55fd  🔍 ENTRY
  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [01/03] 🔄 Validate request fields  █░░
  [01/03] ✅ Validate request fields  █░░  point=home

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Check data injection requirements  █
  [01/01] ✅ Check data injection requirements  █  no DB load needed (analytics)

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [01/03] 🔄 Type assert request fields  █░░
  [01/03] ✅ Type assert request fields  █░░  all types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Check player state requirements  █
  [01/01] ✅ Check player state requirements  █  analytics handler, no player state read

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Validate point value  █
  [01/01] ✅ Validate point value  █  point="home" is valid

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Process analytics event  █
🟢 13:26:21.090 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received: point=home passLesson=10101
  [01/01] ✅ Process analytics event  █  analytics event logged

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 guideBattle ret=0 ─────────────────────────────────────┐
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════

  ✅ GUIDE BATTLE ANALYTICS COMPLETE

  👤 USER:       guest_8dc4ba55fd0e0370


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════

✅ buryPoint::guideBattle OK     ────────────────────────────
  └ ret=0 2 chars (raw) 2ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 2ms

  └ ⏱️ handler: 2ms 

  📤 activity::getActivityBrief ──────────────────────────────────
🟡 13:26:21.290 WARN  ⚙️ HANDLER  ▸ Unknown type "activity" — no handlers registered for this type

  📤 guide::saveGuide       ──────────────────────────────────

  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️
  ⚔️  guide/saveGuide  R0010  👤guest_8dc4ba55fd  🔍 ENTRY
  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [01/03] 🔄 Validate request fields  █░░
  [01/03] ✅ Validate request fields  █░░  type=2 step=2206

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Load userData from DB  █
  [01/01] ✅ Load userData from DB  █  userData loaded

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [01/02] 🔄 Type assert request fields  █░
  [01/02] ✅ Type assert request fields  █░  all types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Snapshot guide._steps before modification  █
  [01/01] ✅ Snapshot guide._steps before modification  █  guide._steps[2] was 2107

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [01/02] 🔄 Validate business rules  █░
  [01/02] ✅ Validate business rules  █░  invariants checked

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Update guide._steps  █
  [01/01] ✅ Update guide._steps  █  guide._steps[2] = 2206

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────

[DB] saveUser("guest_8dc4ba..."): 101 keys, 10254 bytes

  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 saveGuide ret=0 ───────────────────────────────────────┐
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════

  ✅ SAVE GUIDE COMPLETE

  👤 USER:       guest_8dc4ba55fd0e0370


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════

✅ guide::saveGuide       OK     ────────────────────────────
  └ ret=0 2 chars (raw) 11ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 11ms

  └ ⏱️ handler: 12ms 

  📤 summon::summonOneFree  ──────────────────────────────────

  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️
  ⚔️  summon/summonOneFree  R0011  👤guest_8dc4ba55fd  🔍 ENTRY
  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

🟢 13:26:27.344 INFO  ⚪ SUMMON-FREE ▸ summonOneFree REQUEST RECEIVED

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

🟢 13:26:27.345 INFO  ⚪ SUMMON-FREE ▸ userData loaded successfully (101 top-level keys)
🟢 13:26:27.346 INFO  ⚪ SUMMON-FREE ▸ Deep clone SUCCESS — user object isolated from DB cache

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

🟢 13:26:27.348 INFO  📋 CONFIG   ▸ Resource loaded: summonPool.json
🟢 13:26:27.349 INFO  📋 CONFIG   ▸ Resource loaded: summonRandom.json

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

🟢 13:26:27.350 INFO  ⚪ SUMMON-FREE ▸ Free timer OK — proceeding with summon

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

🟢 13:26:27.350 INFO  ⚪ SUMMON-FREE ▸ [GUIDE] Predetermined hero: displayId=1309 quality=purple

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────


  ⚠️  HERO OBJECT TYPE: heroObj._fragment wrong type


  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────

[DB] saveUser("guest_8dc4ba..."): 101 keys, 10944 bytes
🟢 13:26:27.354 INFO  ⚪ SUMMON-FREE ▸ User data SAVED

  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────

🟢 13:26:27.354 INFO  ⚪ SUMMON-FREE ▸ summonOneFree SUCCESS

  ┌ 📸 SUMMON-FREE ret=0 ─────────────────────────────────────┐
  ├ 📋 _addTotal                  Array[1]
  ├ 📋 _changeInfo                Object{1}
  └ 📋 _energy                    0
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════

  ✅ SUMMON FREE COMPLETE

  👤 USER:       guest_8dc4ba55fd0e0370



  ═══════════════════════════════════════

✅ summon::summonOneFree  OK     ────────────────────────────
  └ ret=0 737 chars (raw) 13ms

  ✅ SUCCESS  📏 data= 737 chars  📦 proto= RAW  ⏱️ time= 13ms

  └ ⏱️ handler: 13ms 

  📤 hero::getAttrs         ──────────────────────────────────

  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️
  ⚔️  hero/getAttrs  R0012  👤guest_8dc4ba55fd  🔍 ENTRY
  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [01/02] 🔄 Validate request fields  █░
  [01/02] ✅ Validate request fields  █░  1 hero(es) requested

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Load userData from DB  █
  [01/01] ✅ Load userData from DB  █  userData loaded

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [01/02] 🔄 Type assert request fields  █░
  [01/02] ✅ Type assert request fields  █░  types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Snapshot hero request vs found  █
  [01/01] ✅ Snapshot hero request vs found  █  1/1 heroes found

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Validate hero availability  █
  [01/01] ✅ Validate hero availability  █  all heroes found

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Calculate hero attributes  █
  [01/01] ✅ Calculate hero attributes  █  1 heroes calculated

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 _attrs                   = Object{1}  L133726: for(var o in t._attrs) — keyed by hero index, each has _items with calculated attrs
  ├ 🔒 _baseAttrs               = Object{1}  L133731: t._baseAttrs[o] — keyed by hero index, each has _items with base attrs (before talent)
  └ 🔒 POWER (attr 21)          = calculated per hero  L133821: 21==p._id → heroBaseAttr.power = floor(num)
  ✅ CRITICAL AUDIT: 3/3 PASSED


  ┌ 📸 getAttrs ret=0 ────────────────────────────────────────┐
  ├ 📋 _attrs                     Object{1}
  └ 📋 _baseAttrs                 Object{1}
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════

  ✅ HERO GET ATTRS COMPLETE

  👤 USER:       guest_8dc4ba55fd0e0370
  📦 FIELDS:     2


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════

✅ hero::getAttrs         OK     ────────────────────────────
  └ ret=0 392 chars (raw) 3ms

  ✅ SUCCESS  📏 data= 392 chars  📦 proto= RAW  ⏱️ time= 3ms

  └ ⏱️ handler: 3ms 

  📤 guide::saveGuide       ──────────────────────────────────

  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️
  ⚔️  guide/saveGuide  R0013  👤guest_8dc4ba55fd  🔍 ENTRY
  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [01/03] 🔄 Validate request fields  █░░
  [01/03] ✅ Validate request fields  █░░  type=2 step=2210

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Load userData from DB  █
  [01/01] ✅ Load userData from DB  █  userData loaded

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [01/02] 🔄 Type assert request fields  █░
  [01/02] ✅ Type assert request fields  █░  all types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Snapshot guide._steps before modification  █
  [01/01] ✅ Snapshot guide._steps before modification  █  guide._steps[2] was 2206

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [01/02] 🔄 Validate business rules  █░
  [01/02] ✅ Validate business rules  █░  invariants checked

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Update guide._steps  █
  [01/01] ✅ Update guide._steps  █  guide._steps[2] = 2210

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────

[DB] saveUser("guest_8dc4ba..."): 101 keys, 10944 bytes

  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 saveGuide ret=0 ───────────────────────────────────────┐
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════

  ✅ SAVE GUIDE COMPLETE

  👤 USER:       guest_8dc4ba55fd0e0370


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════

✅ guide::saveGuide       OK     ────────────────────────────
  └ ret=0 2 chars (raw) 7ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 7ms

  └ ⏱️ handler: 7ms 

  📤 summon::summonOneFree  ──────────────────────────────────

  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️
  ⚔️  summon/summonOneFree  R0014  👤guest_8dc4ba55fd  🔍 ENTRY
  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

🟢 13:26:31.708 INFO  ⚪ SUMMON-FREE ▸ summonOneFree REQUEST RECEIVED

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

🟢 13:26:31.709 INFO  ⚪ SUMMON-FREE ▸ userData loaded successfully (101 top-level keys)
🟢 13:26:31.709 INFO  ⚪ SUMMON-FREE ▸ Deep clone SUCCESS — user object isolated from DB cache

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

🟢 13:26:31.710 INFO  ⚪ SUMMON-FREE ▸ Free timer OK — proceeding with summon

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

🟢 13:26:31.710 INFO  ⚪ SUMMON-FREE ▸ [GUIDE] Predetermined hero: displayId=1206 quality=blue

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────


  ⚠️  HERO OBJECT TYPE: heroObj._fragment wrong type


  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────

[DB] saveUser("guest_8dc4ba..."): 101 keys, 11634 bytes
🟢 13:26:31.714 INFO  ⚪ SUMMON-FREE ▸ User data SAVED

  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────

🟢 13:26:31.714 INFO  ⚪ SUMMON-FREE ▸ summonOneFree SUCCESS

  ┌ 📸 SUMMON-FREE ret=0 ─────────────────────────────────────┐
  ├ 📋 _addTotal                  Array[1]
  ├ 📋 _changeInfo                Object{1}
  └ 📋 _energy                    0
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════

  ✅ SUMMON FREE COMPLETE

  👤 USER:       guest_8dc4ba55fd0e0370



  ═══════════════════════════════════════

✅ summon::summonOneFree  OK     ────────────────────────────
  └ ret=0 737 chars (raw) 7ms

  ✅ SUCCESS  📏 data= 737 chars  📦 proto= RAW  ⏱️ time= 7ms

  └ ⏱️ handler: 7ms 

  📤 hero::getAttrs         ──────────────────────────────────

  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️
  ⚔️  hero/getAttrs  R0015  👤guest_8dc4ba55fd  🔍 ENTRY
  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [01/02] 🔄 Validate request fields  █░
  [01/02] ✅ Validate request fields  █░  1 hero(es) requested

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Load userData from DB  █
  [01/01] ✅ Load userData from DB  █  userData loaded

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [01/02] 🔄 Type assert request fields  █░
  [01/02] ✅ Type assert request fields  █░  types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Snapshot hero request vs found  █
  [01/01] ✅ Snapshot hero request vs found  █  1/1 heroes found

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Validate hero availability  █
  [01/01] ✅ Validate hero availability  █  all heroes found

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Calculate hero attributes  █
  [01/01] ✅ Calculate hero attributes  █  1 heroes calculated

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 _attrs                   = Object{1}  L133726: for(var o in t._attrs) — keyed by hero index, each has _items with calculated attrs
  ├ 🔒 _baseAttrs               = Object{1}  L133731: t._baseAttrs[o] — keyed by hero index, each has _items with base attrs (before talent)
  └ 🔒 POWER (attr 21)          = calculated per hero  L133821: 21==p._id → heroBaseAttr.power = floor(num)
  ✅ CRITICAL AUDIT: 3/3 PASSED


  ┌ 📸 getAttrs ret=0 ────────────────────────────────────────┐
  ├ 📋 _attrs                     Object{1}
  └ 📋 _baseAttrs                 Object{1}
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════

  ✅ HERO GET ATTRS COMPLETE

  👤 USER:       guest_8dc4ba55fd0e0370
  📦 FIELDS:     2


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════

✅ hero::getAttrs         OK     ────────────────────────────
  └ ret=0 396 chars (raw) 5ms

  ✅ SUCCESS  📏 data= 396 chars  📦 proto= RAW  ⏱️ time= 5ms

  └ ⏱️ handler: 5ms 

  📤 activity::getActivityBrief ──────────────────────────────────
🟡 13:26:36.119 WARN  ⚙️ HANDLER  ▸ Unknown type "activity" — no handlers registered for this type

  📤 guide::saveGuide       ──────────────────────────────────

  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️
  ⚔️  guide/saveGuide  R0016  👤guest_8dc4ba55fd  🔍 ENTRY
  ⚔️━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚔️


  ────────────────────────────────────────────────────────
  [01/10] 🟢 ENTRY CHECK
  ────────────────────────────────────────────────────────

  [01/03] 🔄 Validate request fields  █░░
  [01/03] ✅ Validate request fields  █░░  type=2 step=2304

  ────────────────────────────────────────────────────────
  [02/10] 📦 DATA INJECTION CHECK
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Load userData from DB  █
  [01/01] ✅ Load userData from DB  █  userData loaded

  ────────────────────────────────────────────────────────
  [03/10] 🔍 DEEP TYPE SCAN
  ────────────────────────────────────────────────────────

  [01/02] 🔄 Type assert request fields  █░
  [01/02] ✅ Type assert request fields  █░  all types verified

  ────────────────────────────────────────────────────────
  [04/10] ⚡ PLAYER STATE SNAPSHOT
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Snapshot guide._steps before modification  █
  [01/01] ✅ Snapshot guide._steps before modification  █  guide._steps[2] was 2210

  ────────────────────────────────────────────────────────
  [05/10] 🧮 INVARIANT CHECK
  ────────────────────────────────────────────────────────

  [01/02] 🔄 Validate business rules  █░
  [01/02] ✅ Validate business rules  █░  invariants checked

  ────────────────────────────────────────────────────────
  [06/10] 🔮 MAIN PROCESS
  ────────────────────────────────────────────────────────

  [01/01] 🔄 Update guide._steps  █
  [01/01] ✅ Update guide._steps  █  guide._steps[2] = 2304

  ────────────────────────────────────────────────────────
  [07/10] 💾 MUTATION LOG
  ────────────────────────────────────────────────────────


  ────────────────────────────────────────────────────────
  [08/10] ✅ SAVE VERIFY
  ────────────────────────────────────────────────────────

[DB] saveUser("guest_8dc4ba..."): 101 keys, 11634 bytes

  ────────────────────────────────────────────────────────
  [09/10] 📤 RESPONSE SNAPSHOT
  ────────────────────────────────────────────────────────


  ┌ 📸 saveGuide ret=0 ───────────────────────────────────────┐
  └──────────────────────────────────────────────────────────┘


  ────────────────────────────────────────────────────────
  [10/10] 🏁 EXECUTION SUMMARY
  ────────────────────────────────────────────────────────


  ═══════════════════════════════════════

  ✅ SAVE GUIDE COMPLETE

  👤 USER:       guest_8dc4ba55fd0e0370


  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════

✅ guide::saveGuide       OK     ────────────────────────────
  └ ret=0 2 chars (raw) 7ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 7ms

  └ ⏱️ handler: 7ms 
```