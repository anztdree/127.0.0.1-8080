```
Loaded 3 records from /var/www/html/server/main-server/data/main_server.json (32252 bytes)
🟢 13:17:29.796 INFO  📋 CONFIG   ▸ serverOpenDate auto-initialized: 1778764649795

  ┌─ LOADING RESOURCES ───────────────────────────────────┐

🟢 13:17:29.800 INFO  📋 CONFIG   ▸ Resource loaded: constant.json
🟢 13:17:29.836 INFO  📋 CONFIG   ▸ Resource loaded: hero.json
🟢 13:17:29.839 INFO  📋 CONFIG   ▸ Resource loaded: summon.json
🟢 13:17:29.843 INFO  📋 CONFIG   ▸ Resource loaded: heroLevelAttr.json
🟢 13:17:29.845 INFO  📋 CONFIG   ▸ Resource loaded: heroTypeParam.json
🟢 13:17:29.847 INFO  📋 CONFIG   ▸ Resource loaded: heroQualityParam.json
🟢 13:17:29.851 INFO  📋 CONFIG   ▸ Resource loaded: heroPower.json
🟢 13:17:29.852 INFO  📋 CONFIG   ▸ Resource loaded: zPowerQualityPara.json

  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─


  ╔════════════════════════════════════════════════════════════╗
  ║  SUPER WARRIOR Z — MAIN SERVER                             ║
  ╚════════════════════════════════════════════════════════════╝



  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─

🟢 13:17:29.906 INFO  📋 CONFIG   ▸ Resource JSON status:
  ══════════════════════════════════════════════════════════

🟢 13:17:29.907 INFO  ⚙️ HANDLER  ▸ Registered action handlers:

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


🟢 13:17:29.908 INFO  🚀 SERVER   ▸ Ready — listening on http://127.0.0.1:8001
🟢 13:17:29.908 INFO  🚀 SERVER   ▸ Waiting for Socket.IO connections...


  ➕ NEW CONNECTION ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
🟢 13:18:01.418 INFO  🔐 TEA      ▸ Sending verify challenge
🟢 13:18:01.449 INFO  🔐 TEA      ▸ TEA verification SUCCESS

  📤 user::enterGame        ──────────────────────────────────
🟢 13:18:01.485 INFO  ⚔️ ENTER    ▸ enterGame REQUEST RECEIVED
  [ 1/10] 🔄 Required fields check  █░░░░░░░░░
  [ 1/10] ✅ Required fields check  █░░░░░░░░░  All present
  [ 2/10] 🔄 Token auth via SDK-Server  ██░░░░░░░░
🟢 13:18:01.515 INFO  📡 SDKAPI   ▸ User verified via SDK-Server
  [ 2/10] ✅ Token auth via SDK-Server  ██░░░░░░░░  31ms ✅
  [ 3/10] 🔄 ServerId validation  ███░░░░░░░
  [ 3/10] ✅ ServerId validation  ███░░░░░░░  1 == 1 ✅
  [ 4/10] 🔄 User existence check  ████░░░░░░
  [ 4/10] 🌟 User existence check  ████░░░░░░  NEW USER 🌟
  [ 5/10] 🔄 Build user data  █████░░░░░
  [ 5/10] ✅ Build user data  █████░░░░░  100 keys (4ms)
  [ 6/10] 🔄 Circular reference check  ██████░░░░
  [ 6/10] ✅ Circular reference check  ██████░░░░  0 circular refs ✅
  [ 7/10] 🔄 Structure validation  ███████░░░

  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 lastTeam[9]._team        = {0}  EMPTY — tutorial safe (guide 2106)
  ├ 🔒 training._award          = null  present — FIX-001 safe
  ├ 🔒 user._attribute._items[104] = present  Level=1
  ├ 🔒 imprint._items           = Object{}  FIX-005: client L114925 uses for...in → needs Object
  ├ 🔒 weapon._items            = Object{}  FIX-005: client L130938 uses for...in → needs Object
  └ 🔒 genki._items             = Object{}  FIX-005: client L132158 uses for...in → needs Object
  ✅ CRITICAL AUDIT: 6/6 PASSED

  [ 7/10] ✅ Structure validation  ███████░░░  100 keys audited
  [ 8/10] 🔄 JSON serialization test  ████████░░
  [ 8/10] ✅ JSON serialization test  ████████░░  OK (10,057 bytes)
  [ 9/10] 🔄 Database save  █████████░
[DB] saveUser("guest_4d5698..."): 100 keys, 10057 bytes
  [ 9/10] ✅ Database save  █████████░  3ms 💾
  [10/10] 🔄 Response build  ██████████
  [10/10] ✅ Response build  ██████████  OK 📤

  ═══════════════════════════════════════════

  ✅ ENTER GAME COMPLETE

  👤 USER:       guest_4d569844675186d7 (New User)
  📦 FIELDS:     100
  🦸 HEROES:     1 hero(es)
  💎 DIAMOND:    0
  🏆 LEVEL:      1

  📏 JSON SIZE:  10,057 chars
  📦 RESP SIZE:  2,387 chars
  🔐 PROTOCOL:   LZ-STRING
  ⏱️ TOTAL TIME: 170ms  ████████████████

  🔒 CRITICAL:   6/6 PASSED
  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════


  ┌ 📸 ENTER GAME ret=0 ──────────────────────────────────────┐
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
  ├   serverOpenDate               1778764649795
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
  │                                                              │
  │  IMPACT:  Client crash or silent data loss                    │
  │  FIX:     Check buildNewUserData or updateExistingUser        │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘

✅ user::enterGame        OK     ────────────────────────────
  └ ret=0 2387 chars (LZ) 182ms

  ✅ SUCCESS  📏 data= 2387 chars  📦 proto= LZ-STRING  ⏱️ time= 182ms

  └ ⏱️ handler: 183ms █

  📤 user::getBulletinBrief ──────────────────────────────────
  [ 1/ 1] 🔄 Get bulletin brief  █
  [ 1/ 1] ✅ Get bulletin brief  █  0 bulletins

  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  └ 🔒 _brief                   = Object{0}  L121094: for(var o in n._brief) iterates each bulletin
  ✅ CRITICAL AUDIT: 1/1 PASSED

✅ user::getBulletinBrief OK     ────────────────────────────
  └ ret=0 13 chars (raw) 1ms

  ✅ SUCCESS  📏 data= 13 chars  📦 proto= RAW  ⏱️ time= 1ms

  └ ⏱️ handler: 1ms

  📤 friend::friendServerAction ──────────────────────────────────
  [ 1/ 2] 🔄 Route relay action  █░
  [ 1/ 2] ✅ Route relay action  █░  relayAction="${relayAction}"
  [ 2/ 2] 🔄 Handle queryFriends  ██
  [ 2/ 2] ✅ Handle queryFriends  ██  0 friends
✅ friend::friendServerAction OK     ────────────────────────────
  └ ret=0 12 chars (raw) 6ms

  ✅ SUCCESS  📏 data= 12 chars  📦 proto= RAW  ⏱️ time= 6ms

  └ ⏱️ handler: 7ms

  📤 friend::friendServerAction ──────────────────────────────────
  [ 1/ 2] 🔄 Route relay action  █░
  [ 1/ 2] ✅ Route relay action  █░  relayAction="${relayAction}"
  [ 2/ 2] 🔄 Handle queryBlackList  ██
  [ 2/ 2] ✅ Handle queryBlackList  ██  0 entries
✅ friend::friendServerAction OK     ────────────────────────────
  └ ret=0 12 chars (raw) 3ms

  ✅ SUCCESS  📏 data= 12 chars  📦 proto= RAW  ⏱️ time= 3ms

  └ ⏱️ handler: 4ms

  📤 heroImage::getAll      ──────────────────────────────────
  [ 1/ 2] 🔄 Get hero image list  █░
  [ 1/ 2] ✅ Get hero image list  █░  userId OK
  [ 2/ 2] 🔄 Build hero image data  ██
  [ 2/ 2] ✅ Build hero image data  ██  1 hero(es)

  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  └ 🔒 _heros                   = Object{1}  L134363: for(var n in e._heros) → Object, each has _id/_maxLevel/_selfComments
  ✅ CRITICAL AUDIT: 1/1 PASSED


  ═══════════════════════════════════════════

  ✅ HERO IMAGE GET ALL COMPLETE

  👤 USER:       guest_4d569844675186d7
  📦 FIELDS:     1

  ⏱️ TOTAL TIME: 0ms  ░░░░░░░░░░░░░░░░


  ═══════════════════════════════════════════

✅ heroImage::getAll      OK     ────────────────────────────
  └ ret=0 97 chars (raw) 4ms

  ✅ SUCCESS  📏 data= 97 chars  📦 proto= RAW  ⏱️ time= 4ms

  └ ⏱️ handler: 4ms

  📤 hero::getAttrs         ──────────────────────────────────
  [ 1/ 2] 🔄 Get hero attrs  █░
  [ 1/ 2] ✅ Get hero attrs  █░  1 hero(es) requested
  [ 2/ 2] 🔄 Calculate hero attributes  ██
  [ 2/ 2] ✅ Calculate hero attributes  ██  1 heroes calculated

  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 _attrs                   = Object{1}  L133726: for(var o in t._attrs) — keyed by hero index, each has _items with calculated attrs
  ├ 🔒 _baseAttrs               = Object{1}  L133731: t._baseAttrs[o] — keyed by hero index, each has _items with base attrs (before talent)
  └ 🔒 POWER (attr 21)          = calculated per hero  L133821: 21==p._id → heroBaseAttr.power = floor(num)
  ✅ CRITICAL AUDIT: 3/3 PASSED


  ═══════════════════════════════════════════

  ✅ HERO GET ATTRS COMPLETE

  👤 USER:       guest_4d569844675186d7
  📦 FIELDS:     2

  ⏱️ TOTAL TIME: 0ms  ░░░░░░░░░░░░░░░░


  ═══════════════════════════════════════════

✅ hero::getAttrs         OK     ────────────────────────────
  └ ret=0 394 chars (raw) 7ms

  ✅ SUCCESS  📏 data= 394 chars  📦 proto= RAW  ⏱️ time= 7ms

  └ ⏱️ handler: 7ms

  📤 userMsg::getMsgList    ──────────────────────────────────
  [ 1/ 1] 🔄 Get userMsg list  █
  [ 1/ 1] ✅ Get userMsg list  █  0 entries

  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  └ 🔒 _brief                   = Object{0}  L121134: setMessageFriendSimpleList iterates e[n].userInfo → UserSimpleInfo.deserialize
  ✅ CRITICAL AUDIT: 1/1 PASSED

✅ userMsg::getMsgList    OK     ────────────────────────────
  └ ret=0 13 chars (raw) 2ms

  ✅ SUCCESS  📏 data= 13 chars  📦 proto= RAW  ⏱️ time= 2ms

  └ ⏱️ handler: 3ms

  📤 user::registChat       ──────────────────────────────────
  [ 1/ 3] 🔄 Validate request  █░░
  [ 1/ 3] ✅ Validate request  █░░  userId=guest_4d56984467...
  [ 2/ 3] 🔄 Build response  ██░
  [ 2/ 3] ✅ Build response  ██░  6 fields prepared
  [ 3/ 3] 🔄 Return response  ███
  [ 3/ 3] ✅ Return response  ███  ret=0 1ms

  ⚠️ WARNINGS DETECTED
  ──────────────────────────────────────────────
  ⚠️  [W001] chat-server must be running on http://127.0.0.1:8002
       Impact:   Chat will never connect. Client stops retrying registChat after 15 attempts (45s).

  ⚠️  [W002] chat-server MUST implement TEA handshake (verifyEnable=true)
       Impact:   Client connection stalls — callback never fires, no chat, no error shown.

  ⚠️  [W003] guildRoomId, teamDungeonChatRoom, teamChatRoom = undefined (by design)
       Impact:   None — client correctly skips joining these rooms when undefined.
  ⚠️ TOTAL WARNINGS: 3


  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 _success                 = true  L114470: n._success ? connect chat : retry every 3s (max 15)
  ├ 🔒 _chatServerUrl           = http://127.0.0.1:8002  L114480→L82537: io.connect(url) — MUST be full URL
  ├ 🔒 _worldRoomId             = world_1  L114566: chatJoinRequest(worldRoomId) — ALWAYS joined after login
  ├ 🔒 _guildRoomId             = (undefined)  L114568: if(guildRoomId) join — undefined = skip (no guild)
  ├ 🔒 _teamDungeonChatRoom     = (undefined)  L114579: if(teamDungeonChatRoom) join — undefined = skip
  └ 🔒 _teamChatRoom            = (undefined)  L114590: if(teamChatRoomId) join — undefined = skip (no team)
  ✅ CRITICAL AUDIT: 6/6 PASSED


  ═══════════════════════════════════════════

  ✅ REGIST CHAT COMPLETE

  👤 USER:       guest_4d569844675186d7
  📦 FIELDS:     6

  ⏱️ TOTAL TIME: 1ms  ░░░░░░░░░░░░░░░░


  ═══════════════════════════════════════════

✅ user::registChat       OK     ────────────────────────────
  └ ret=0 83 chars (raw) 8ms

  ✅ SUCCESS  📏 data= 83 chars  📦 proto= RAW  ⏱️ time= 8ms

  └ ⏱️ handler: 9ms

  📤 guide::saveGuide       ──────────────────────────────────
  [ 1/ 2] 🔄 Save guide progress  █░
  [ 1/ 2] ✅ Save guide progress  █░  type=2 step=2102
  [ 2/ 2] 🔄 Persist guide data  ██
[DB] saveUser("guest_4d5698..."): 100 keys, 10065 bytes
  [ 2/ 2] ✅ Persist guide data  ██  saved guide._steps[2]=2102
✅ guide::saveGuide       OK     ────────────────────────────
  └ ret=0 2 chars (raw) 8ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 8ms

  └ ⏱️ handler: 9ms

  📤 guide::saveGuide       ──────────────────────────────────
  [ 1/ 2] 🔄 Save guide progress  █░
  [ 1/ 2] ✅ Save guide progress  █░  type=2 step=2107
  [ 2/ 2] 🔄 Persist guide data  ██
[DB] saveUser("guest_4d5698..."): 100 keys, 10065 bytes
  [ 2/ 2] ✅ Persist guide data  ██  saved guide._steps[2]=2107
✅ guide::saveGuide       OK     ────────────────────────────
  └ ret=0 2 chars (raw) 6ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 6ms

  └ ⏱️ handler: 6ms

  📤 hangup::saveGuideTeam  ──────────────────────────────────
  [ 1/ 2] 🔄 Save guide team  █░
  [ 1/ 2] ✅ Save guide team  █░  team=5 heroes
  [ 2/ 2] 🔄 Persist team data  ██
[DB] saveUser("guest_4d5698..."): 101 keys, 10180 bytes
  [ 2/ 2] ✅ Persist team data  ██  saved to DB
✅ hangup::saveGuideTeam  OK     ────────────────────────────
  └ ret=0 2 chars (raw) 5ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 5ms

  └ ⏱️ handler: 6ms

  📤 hangup::checkBattleResult ──────────────────────────────────
  [ 1/ 5] 🔄 Validate request  █░░░░
  [ 1/ 5] ✅ Validate request  █░░░░
  [ 2/ 5] 🔄 Load data  ██░░░
🟢 13:18:10.972 INFO  📋 CONFIG   ▸ Resource loaded: lesson.json
  [ 2/ 5] ✅ Load data  ██░░░  lesson.json=611 entries
  [ 3/ 5] 🔄 Read progress  ███░░
  [ 3/ 5] ✅ Read progress  ███░░  lesson=10101
  [ 4/ 5] 🔄 Determine outcome  ████░
  [ 4/ 5] ✅ Determine outcome  ████░  WIN (0)
  [ 5/ 5] 🔄 Build response  █████
[DB] saveUser("guest_4d5698..."): 101 keys, 10254 bytes
  [ 5/ 5] ✅ Build response  █████  WIN rewards=5 lesson=10102

  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 _battleResult            = 0  L104882: 0 == e._battleResult -> true (tutorial forced win)
  ├ 🔒 _changeInfo._items       = 5 items  L97686: getBattleAwardItems iterates _changeInfo._items for {_id, _num}
  ├ 🔒 _curLess                 = 10102  L104892/L97751: OnHookSingleton.lastSection = e._curLess
  └ 🔒 _maxPassLesson           = 10101  L104893/L97751: OnHookSingleton.maxPassLesson = e._maxPassLesson
  ✅ CRITICAL AUDIT: 4/4 PASSED


  ═══════════════════════════════════════════

  ✅ CHECK BATTLE RESULT

  👤 USER:       guest_4d569844675186d7
  📦 FIELDS:     4



  ═══════════════════════════════════════════


  ┌ 📸 CHECK BATTLE RESULT ret=0 ─────────────────────────────┐
  ├   _battleResult                0
  ├   _curLess                     10102
  ├   _maxPassLesson               10101
  └   _changeInfo                  Object{1}
  └──────────────────────────────────────────────────────────┘

✅ hangup::checkBattleResult OK     ────────────────────────────
  └ ret=0 218 chars (raw) 28ms

  ✅ SUCCESS  📏 data= 218 chars  📦 proto= RAW  ⏱️ time= 28ms

  └ ⏱️ handler: 29ms

  📤 buryPoint::guideBattle ──────────────────────────────────
🟢 13:18:12.624 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received
✅ buryPoint::guideBattle OK     ────────────────────────────
  └ ret=0 2 chars (raw) 1ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 1ms

  └ ⏱️ handler: 2ms

  📤 buryPoint::guideBattle ──────────────────────────────────
🟢 13:18:23.483 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received
✅ buryPoint::guideBattle OK     ────────────────────────────
  └ ret=0 2 chars (raw) 2ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 2ms

  └ ⏱️ handler: 2ms

  📤 buryPoint::guideBattle ──────────────────────────────────
🟢 13:18:24.977 INFO  ⚪ BURYPOINT ▸ Guide battle analytics received
✅ buryPoint::guideBattle OK     ────────────────────────────
  └ ret=0 2 chars (raw) 1ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 1ms

  └ ⏱️ handler: 1ms

  📤 activity::getActivityBrief ──────────────────────────────────
🟡 13:18:25.170 WARN  ⚙️ HANDLER  ▸ Unknown type "activity" — no handlers registered for this type

  📤 guide::saveGuide       ──────────────────────────────────
  [ 1/ 2] 🔄 Save guide progress  █░
  [ 1/ 2] ✅ Save guide progress  █░  type=2 step=2206
  [ 2/ 2] 🔄 Persist guide data  ██
[DB] saveUser("guest_4d5698..."): 101 keys, 10254 bytes
  [ 2/ 2] ✅ Persist guide data  ██  saved guide._steps[2]=2206
✅ guide::saveGuide       OK     ────────────────────────────
  └ ret=0 2 chars (raw) 5ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 5ms

  └ ⏱️ handler: 6ms

  📤 summon::summonOneFree  ──────────────────────────────────
🟢 13:18:31.066 INFO  ⚪ SUMMON-FREE ▸ summonOneFree REQUEST RECEIVED
🟢 13:18:31.069 INFO  📋 CONFIG   ▸ Resource loaded: summonPool.json
🟢 13:18:31.071 INFO  📋 CONFIG   ▸ Resource loaded: summonRandom.json
🟢 13:18:31.071 INFO  ⚪ SUMMON-FREE ▸ Free timer OK — proceeding with summon
🟢 13:18:31.072 INFO  ⚪ SUMMON-FREE ▸ [GUIDE] Predetermined hero: displayId=1309 quality=purple

  ⚠️  HERO OBJECT TYPE: heroObj._fragment wrong type

[DB] saveUser("guest_4d5698..."): 101 keys, 10944 bytes
🟢 13:18:31.077 INFO  ⚪ SUMMON-FREE ▸ User data SAVED
🟢 13:18:31.077 INFO  ⚪ SUMMON-FREE ▸ summonOneFree SUCCESS

  ┌ 📸 SUMMON-FREE ret=0 ─────────────────────────────────────┐
  ├   _addTotal                    Array[1]
  ├   _changeInfo                  Object{1}
  └   _energy                      0
  └──────────────────────────────────────────────────────────┘


  ═══════════════════════════════════════════

  ✅ SUMMON FREE COMPLETE

  👤 USER:       guest_4d569844675186d7



  ═══════════════════════════════════════════

✅ summon::summonOneFree  OK     ────────────────────────────
  └ ret=0 737 chars (raw) 15ms

  ✅ SUCCESS  📏 data= 737 chars  📦 proto= RAW  ⏱️ time= 15ms

  └ ⏱️ handler: 15ms

  📤 hero::getAttrs         ──────────────────────────────────
  [ 1/ 2] 🔄 Get hero attrs  █░
  [ 1/ 2] ✅ Get hero attrs  █░  1 hero(es) requested
  [ 2/ 2] 🔄 Calculate hero attributes  ██
  [ 2/ 2] ✅ Calculate hero attributes  ██  1 heroes calculated

  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 _attrs                   = Object{1}  L133726: for(var o in t._attrs) — keyed by hero index, each has _items with calculated attrs
  ├ 🔒 _baseAttrs               = Object{1}  L133731: t._baseAttrs[o] — keyed by hero index, each has _items with base attrs (before talent)
  └ 🔒 POWER (attr 21)          = calculated per hero  L133821: 21==p._id → heroBaseAttr.power = floor(num)
  ✅ CRITICAL AUDIT: 3/3 PASSED


  ═══════════════════════════════════════════

  ✅ HERO GET ATTRS COMPLETE

  👤 USER:       guest_4d569844675186d7
  📦 FIELDS:     2

  ⏱️ TOTAL TIME: 0ms  ░░░░░░░░░░░░░░░░


  ═══════════════════════════════════════════

✅ hero::getAttrs         OK     ────────────────────────────
  └ ret=0 392 chars (raw) 3ms

  ✅ SUCCESS  📏 data= 392 chars  📦 proto= RAW  ⏱️ time= 3ms

  └ ⏱️ handler: 3ms

  📤 guide::saveGuide       ──────────────────────────────────
  [ 1/ 2] 🔄 Save guide progress  █░
  [ 1/ 2] ✅ Save guide progress  █░  type=2 step=2210
  [ 2/ 2] 🔄 Persist guide data  ██
[DB] saveUser("guest_4d5698..."): 101 keys, 10944 bytes
  [ 2/ 2] ✅ Persist guide data  ██  saved guide._steps[2]=2210
✅ guide::saveGuide       OK     ────────────────────────────
  └ ret=0 2 chars (raw) 6ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 6ms

  └ ⏱️ handler: 6ms

  📤 summon::summonOneFree  ──────────────────────────────────
🟢 13:18:35.082 INFO  ⚪ SUMMON-FREE ▸ summonOneFree REQUEST RECEIVED
🟢 13:18:35.084 INFO  ⚪ SUMMON-FREE ▸ Free timer OK — proceeding with summon
🟢 13:18:35.084 INFO  ⚪ SUMMON-FREE ▸ [GUIDE] Predetermined hero: displayId=1206 quality=blue

  ⚠️  HERO OBJECT TYPE: heroObj._fragment wrong type

[DB] saveUser("guest_4d5698..."): 101 keys, 11634 bytes
🟢 13:18:35.088 INFO  ⚪ SUMMON-FREE ▸ User data SAVED
🟢 13:18:35.089 INFO  ⚪ SUMMON-FREE ▸ summonOneFree SUCCESS

  ┌ 📸 SUMMON-FREE ret=0 ─────────────────────────────────────┐
  ├   _addTotal                    Array[1]
  ├   _changeInfo                  Object{1}
  └   _energy                      0
  └──────────────────────────────────────────────────────────┘


  ═══════════════════════════════════════════

  ✅ SUMMON FREE COMPLETE

  👤 USER:       guest_4d569844675186d7



  ═══════════════════════════════════════════

✅ summon::summonOneFree  OK     ────────────────────────────
  └ ret=0 737 chars (raw) 7ms

  ✅ SUCCESS  📏 data= 737 chars  📦 proto= RAW  ⏱️ time= 7ms

  └ ⏱️ handler: 8ms

  📤 hero::getAttrs         ──────────────────────────────────
  [ 1/ 2] 🔄 Get hero attrs  █░
  [ 1/ 2] ✅ Get hero attrs  █░  1 hero(es) requested
  [ 2/ 2] 🔄 Calculate hero attributes  ██
  [ 2/ 2] ✅ Calculate hero attributes  ██  1 heroes calculated

  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  ├ 🔒 _attrs                   = Object{1}  L133726: for(var o in t._attrs) — keyed by hero index, each has _items with calculated attrs
  ├ 🔒 _baseAttrs               = Object{1}  L133731: t._baseAttrs[o] — keyed by hero index, each has _items with base attrs (before talent)
  └ 🔒 POWER (attr 21)          = calculated per hero  L133821: 21==p._id → heroBaseAttr.power = floor(num)
  ✅ CRITICAL AUDIT: 3/3 PASSED


  ═══════════════════════════════════════════

  ✅ HERO GET ATTRS COMPLETE

  👤 USER:       guest_4d569844675186d7
  📦 FIELDS:     2

  ⏱️ TOTAL TIME: 0ms  ░░░░░░░░░░░░░░░░


  ═══════════════════════════════════════════

✅ hero::getAttrs         OK     ────────────────────────────
  └ ret=0 396 chars (raw) 3ms

  ✅ SUCCESS  📏 data= 396 chars  📦 proto= RAW  ⏱️ time= 3ms

  └ ⏱️ handler: 4ms

  📤 activity::getActivityBrief ──────────────────────────────────
🟡 13:18:38.938 WARN  ⚙️ HANDLER  ▸ Unknown type "activity" — no handlers registered for this type

  📤 guide::saveGuide       ──────────────────────────────────
  [ 1/ 2] 🔄 Save guide progress  █░
  [ 1/ 2] ✅ Save guide progress  █░  type=2 step=2304
  [ 2/ 2] 🔄 Persist guide data  ██
[DB] saveUser("guest_4d5698..."): 101 keys, 11634 bytes
  [ 2/ 2] ✅ Persist guide data  ██  saved guide._steps[2]=2304
✅ guide::saveGuide       OK     ────────────────────────────
  └ ret=0 2 chars (raw) 4ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 4ms

  └ ⏱️ handler: 4ms

  ➖ DISCONNECT ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
  └ 🔗 reason: reason=ping timeout  sid= F1q3PP-u...

  ➕ NEW CONNECTION ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
🟢 13:19:36.536 INFO  🔐 TEA      ▸ Sending verify challenge
🟢 13:19:36.571 INFO  🔐 TEA      ▸ TEA verification SUCCESS

  ➖ DISCONNECT ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
  └ 🔗 reason: reason=ping timeout  sid= mghKJ7AR...

  ➕ NEW CONNECTION ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
🟢 13:20:21.605 INFO  🔐 TEA      ▸ Sending verify challenge
🟢 13:20:21.636 INFO  🔐 TEA      ▸ TEA verification SUCCESS
```