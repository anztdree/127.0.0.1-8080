```

🟢 19:58:16.448 INFO  📋 CONFIG   ▸ serverOpenDate auto-initialized: 1778702296447      
  ┌─ LOADING RESOURCES ───────────────────────────────────┐

🟢 19:58:16.455 INFO  📋 CONFIG   ▸ Resource loaded: constant.json     🟢 19:58:16.499 INFO  📋 CONFIG   ▸ Resource loaded: hero.json
🟢 19:58:16.501 INFO  📋 CONFIG   ▸ Resource loaded: summon.json
🟢 19:58:16.503 INFO  📋 CONFIG   ▸ Resource loaded: heroLevelAttr.json
🟢 19:58:16.504 INFO  📋 CONFIG   ▸ Resource loaded: heroTypeParam.json
🟢 19:58:16.505 INFO  📋 CONFIG   ▸ Resource loaded: heroQualityParam.json
🟢 19:58:16.507 INFO  📋 CONFIG   ▸ Resource loaded: heroPower.json
🟢 19:58:16.508 INFO  📋 CONFIG   ▸ Resource loaded: zPowerQualityPara.json

  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─


  ╔════════════════════════════════════════════════════════════╗
  ║  SUPER WARRIOR Z — MAIN SERVER                             ║
  ╚════════════════════════════════════════════════════════════╝


  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─

🟢 19:58:16.580 INFO  📋 CONFIG   ▸ Resource JSON status:
  ══════════════════════════════════════════════════════════

🟢 19:58:16.581 INFO  ⚙️ HANDLER  ▸ Registered action handlers:

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
  └ >> hangup::checkBattleResult  handlers/hangup/checkBattleResult.js


  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─


🟢 19:58:16.582 INFO  🚀 SERVER   ▸ Ready — listening on http://127.0.0.1:8001
🟢 19:58:16.582 INFO  🚀 SERVER   ▸ Waiting for Socket.IO connections...


  ➕ NEW CONNECTION ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
🟢 19:58:29.315 INFO  🔐 TEA      ▸ Sending verify challenge
🟢 19:58:29.350 INFO  🔐 TEA      ▸ TEA verification SUCCESS

  📤 user::enterGame        ──────────────────────────────────
🟢 19:58:29.381 INFO  ⚔️ ENTER    ▸ enterGame REQUEST RECEIVED
  [ 1/10] 🔄 Required fields check  █░░░░░░░░░
  [ 1/10] ✅ Required fields check  █░░░░░░░░░  All present
  [ 2/10] 🔄 Token auth via SDK-Server  ██░░░░░░░░
🟢 19:58:29.405 INFO  📡 SDKAPI   ▸ User verified via SDK-Server
  [ 2/10] ✅ Token auth via SDK-Server  ██░░░░░░░░  25ms ✅
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
  [ 8/10] ✅ JSON serialization test  ████████░░  OK (10,058 bytes)
  [ 9/10] 🔄 Database save  █████████░
[DB] saveUser("guest_874155..."): 100 keys, 10058 bytes
  [ 9/10] ✅ Database save  █████████░  4ms 💾
  [10/10] 🔄 Response build  ██████████
  [10/10] ✅ Response build  ██████████  OK 📤

  ═══════════════════════════════════════════

  ✅ ENTER GAME COMPLETE

  👤 USER:       guest_8741551d064d1410 (New User)
  📦 FIELDS:     100
  🦸 HEROES:     1 hero(es)
  💎 DIAMOND:    0
  🏆 LEVEL:      1

  📏 JSON SIZE:  10,058 chars
  📦 RESP SIZE:  2,382 chars
  🔐 PROTOCOL:   LZ-STRING
  ⏱️ TOTAL TIME: 107ms  ███████████████░

  🔒 CRITICAL:   6/6 PASSED
  ⚠️ WARNINGS:   0
  ❌ ERRORS:     0

  ═══════════════════════════════════════════

✅ user::enterGame        OK     ────────────────────────────
  └ ret=0 2382 chars (LZ) 110ms

  ✅ SUCCESS  📏 data= 2382 chars  📦 proto= LZ-STRING  ⏱️ time= 110ms

  └ ⏱️ handler: 111ms █

  📤 user::getBulletinBrief ──────────────────────────────────
  [ 1/ 1] 🔄 Get bulletin brief  █
  [ 1/ 1] ✅ Get bulletin brief  █  0 bulletins

  🔒 CRITICAL FIELDS AUDIT — game will crash/stuck if wrong
  ──────────────────────────────────────────────
  └ 🔒 _brief                   = Object{0}  L121094: for(var o in n._brief) iterates each bulletin
  ✅ CRITICAL AUDIT: 1/1 PASSED

✅ user::getBulletinBrief OK     ────────────────────────────
  └ ret=0 13 chars (raw) 2ms

  ✅ SUCCESS  📏 data= 13 chars  📦 proto= RAW  ⏱️ time= 2ms

  └ ⏱️ handler: 2ms

  📤 friend::friendServerAction ──────────────────────────────────
  [ 1/ 2] 🔄 Route relay action  █░
  [ 1/ 2] ✅ Route relay action  █░  relayAction="${relayAction}"
  [ 2/ 2] 🔄 Handle queryFriends  ██
  [ 2/ 2] ✅ Handle queryFriends  ██  0 friends
✅ friend::friendServerAction OK     ────────────────────────────
  └ ret=0 12 chars (raw) 7ms

  ✅ SUCCESS  📏 data= 12 chars  📦 proto= RAW  ⏱️ time= 7ms

  └ ⏱️ handler: 7ms

  📤 friend::friendServerAction ──────────────────────────────────
  [ 1/ 2] 🔄 Route relay action  █░
  [ 1/ 2] ✅ Route relay action  █░  relayAction="${relayAction}"
  [ 2/ 2] 🔄 Handle queryBlackList  ██
  [ 2/ 2] ✅ Handle queryBlackList  ██  0 entries
✅ friend::friendServerAction OK     ────────────────────────────
  └ ret=0 12 chars (raw) 1ms

  ✅ SUCCESS  📏 data= 12 chars  📦 proto= RAW  ⏱️ time= 1ms

  └ ⏱️ handler: 2ms

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

  👤 USER:       guest_8741551d064d1410
  📦 FIELDS:     1

  ⏱️ TOTAL TIME: 0ms  ░░░░░░░░░░░░░░░░


  ═══════════════════════════════════════════

✅ heroImage::getAll      OK     ────────────────────────────
  └ ret=0 97 chars (raw) 3ms

  ✅ SUCCESS  📏 data= 97 chars  📦 proto= RAW  ⏱️ time= 3ms

  └ ⏱️ handler: 3ms

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

  👤 USER:       guest_8741551d064d1410
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
  └ ret=0 13 chars (raw) 3ms

  ✅ SUCCESS  📏 data= 13 chars  📦 proto= RAW  ⏱️ time= 3ms

  └ ⏱️ handler: 4ms

  📤 user::registChat       ──────────────────────────────────
  [ 1/ 3] 🔄 Validate request  █░░
  [ 1/ 3] ✅ Validate request  █░░  userId=guest_8741551d06...
  [ 2/ 3] 🔄 Build response  ██░
  [ 2/ 3] ✅ Build response  ██░  6 fields prepared
  [ 3/ 3] 🔄 Return response  ███
  [ 3/ 3] ✅ Return response  ███  ret=0 0ms

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

  👤 USER:       guest_8741551d064d1410
  📦 FIELDS:     6

  ⏱️ TOTAL TIME: 0ms  ░░░░░░░░░░░░░░░░


  ═══════════════════════════════════════════

✅ user::registChat       OK     ────────────────────────────
  └ ret=0 83 chars (raw) 6ms

  ✅ SUCCESS  📏 data= 83 chars  📦 proto= RAW  ⏱️ time= 6ms

  └ ⏱️ handler: 7ms

  📤 guide::saveGuide       ──────────────────────────────────
  [ 1/ 2] 🔄 Save guide progress  █░
  [ 1/ 2] ✅ Save guide progress  █░  type=2 step=2102
  [ 2/ 2] 🔄 Persist guide data  ██
[DB] saveUser("guest_874155..."): 100 keys, 10066 bytes
  [ 2/ 2] ✅ Persist guide data  ██  saved guide._steps[2]=2102
✅ guide::saveGuide       OK     ────────────────────────────
  └ ret=0 2 chars (raw) 8ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 8ms

  └ ⏱️ handler: 9ms

  📤 guide::saveGuide       ──────────────────────────────────
  [ 1/ 2] 🔄 Save guide progress  █░
  [ 1/ 2] ✅ Save guide progress  █░  type=2 step=2107
  [ 2/ 2] 🔄 Persist guide data  ██
[DB] saveUser("guest_874155..."): 100 keys, 10066 bytes
  [ 2/ 2] ✅ Persist guide data  ██  saved guide._steps[2]=2107
✅ guide::saveGuide       OK     ────────────────────────────
  └ ret=0 2 chars (raw) 3ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 3ms

  └ ⏱️ handler: 4ms

  📤 hangup::saveGuideTeam  ──────────────────────────────────
  [ 1/ 2] 🔄 Save guide team  █░
  [ 1/ 2] ✅ Save guide team  █░  team=5 heroes
  [ 2/ 2] 🔄 Persist team data  ██
[DB] saveUser("guest_874155..."): 101 keys, 10181 bytes
  [ 2/ 2] ✅ Persist team data  ██  saved to DB
✅ hangup::saveGuideTeam  OK     ────────────────────────────
  └ ret=0 2 chars (raw) 5ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 5ms

  └ ⏱️ handler: 5ms

  📤 hangup::checkBattleResult ──────────────────────────────────
  [ 1/ 5] 🔄 Validate request  █░░░░
  [ 1/ 5] ✅ Validate request  █░░░░
  [ 2/ 5] 🔄 Load data  ██░░░
🟢 19:58:40.452 INFO  📋 CONFIG   ▸ Resource loaded: lesson.json
  [ 2/ 5] ✅ Load data  ██░░░  lesson.json=611 entries
  [ 3/ 5] 🔄 Read progress  ███░░
  [ 3/ 5] ✅ Read progress  ███░░  lesson=10101
  [ 4/ 5] 🔄 Determine outcome  ████░
  [ 4/ 5] ✅ Determine outcome  ████░  WIN (0)
  [ 5/ 5] 🔄 Build response  █████
[DB] saveUser("guest_874155..."): 101 keys, 10255 bytes
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

  👤 USER:       guest_8741551d064d1410
  📦 FIELDS:     4



  ═══════════════════════════════════════════

✅ hangup::checkBattleResult OK     ────────────────────────────
  └ ret=0 218 chars (raw) 27ms

  ✅ SUCCESS  📏 data= 218 chars  📦 proto= RAW  ⏱️ time= 27ms

  └ ⏱️ handler: 27ms

  📤 buryPoint::guideBattle ──────────────────────────────────
🟡 19:58:42.023 WARN  ⚙️ HANDLER  ▸ Unknown type "buryPoint" — no handlers registered for this type

  📤 buryPoint::guideBattle ──────────────────────────────────
🟡 19:58:55.749 WARN  ⚙️ HANDLER  ▸ Unknown type "buryPoint" — no handlers registered for this type

  📤 buryPoint::guideBattle ──────────────────────────────────
🟡 19:58:57.432 WARN  ⚙️ HANDLER  ▸ Unknown type "buryPoint" — no handlers registered for this type

  📤 activity::getActivityBrief ──────────────────────────────────
🟡 19:58:57.628 WARN  ⚙️ HANDLER  ▸ Unknown type "activity" — no handlers registered for this type

  📤 guide::saveGuide       ──────────────────────────────────
  [ 1/ 2] 🔄 Save guide progress  █░
  [ 1/ 2] ✅ Save guide progress  █░  type=2 step=2206
  [ 2/ 2] 🔄 Persist guide data  ██
[DB] saveUser("guest_874155..."): 101 keys, 10255 bytes
  [ 2/ 2] ✅ Persist guide data  ██  saved guide._steps[2]=2206
✅ guide::saveGuide       OK     ────────────────────────────
  └ ret=0 2 chars (raw) 4ms

  ✅ SUCCESS  📏 data= 2 chars  📦 proto= RAW  ⏱️ time= 4ms

  └ ⏱️ handler: 5ms

  📤 summon::summonOneFree  ──────────────────────────────────
🟡 19:59:01.552 WARN  ⚙️ HANDLER  ▸ Unknown type "summon" — no handlers registered for this type
```