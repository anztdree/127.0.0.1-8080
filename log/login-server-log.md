```
🟢 02:08:18.577 INFO  💾 DB       ▸ Database initialized
  ├ 📋 tables: login_history, user_servers, user_enter_info, user_language
  ├ 📋 mode: WAL
  └ 📋 path: /var/www/html/server/login-server/data/login_server.db
🚀 ════════════════════════════════════════════════════════════
   SUPER WARRIOR Z — LOGIN SERVER
  └ 📍 Port: 8000 · Socket.IO: 2.5.1 · TEA: OFF · DB: /var/www/html/server/login-server/data/login_server.db · SDK API: http://127.0.0.1:9999 · server0Time: 25200000
🚀 ════════════════════════════════════════════════════════════

🟢 02:08:19.258 INFO  ⚙️ HANDLER  ▸ Actions registered
  ├ ⚙️ handler.process → GetServerList
  ├ ⚙️ handler.process → SaveHistory
  ├ ⚙️ handler.process → SaveUserEnterInfo
  ├ ⚙️ handler.process → SaveLanguage
  └ ⚙️ handler.process → LoginAnnounce

🟢 02:08:19.258 INFO  🚀 SERVER   ▸ Ready — listening on http://127.0.0.1:8000
🟢 02:08:19.258 INFO  🚀 SERVER   ▸ Waiting for Socket.IO connections...
🟢 02:08:43.334 INFO  🔌 SOCKET   ▸ Client connected
  🟢 02:08:43.335 SOCKET exRJCFhu connect      🌐 ::ffff:127.0.0.1 📡 polling
🟢 02:08:43.433 INFO  ⚙️ HANDLER  ▸ [1] handler.process → GetServerList
  📤 GetServerList      ⏳ REQ    ⏱️  ─────  uid=guest_e8fcd7
🟢 02:08:43.434 INFO  🌐 GSL      ▸ GetServerList request
  ├ 📤 userId: guest_e8fcd70f9e91ce9e
  ├ 📤 channel: ppgame
  └ 📤 subChannel:
🟢 02:08:43.470 INFO  📡 SDKAPI   ▸ SDK-Server user verified
  ├ 📋 userId: guest_e8fcd70f9e91ce9e
  └ 📋 duration: 35ms
🟢 02:08:43.476 INFO  🌐 GSL      ▸ GetServerList success
  ├ 📋 servers: 1
  ├ 📋 history: []
  └ 📋 duration: 42ms
  📥 GetServerList      ✅ OK     ⏱️  ─────  ret=0 ✅
🟢 02:08:43.543 INFO  ⚙️ HANDLER  ▸ [2] handler.process → SaveHistory
  📤 SaveHistory        ⏳ REQ    ⏱️  ─────  uid=guest_e8fcd7
🟢 02:08:43.545 INFO  📝 SAVEHIST ▸ SaveHistory request
  ├ 📤 userId: guest_e8fcd70f9e91ce9e
  ├ 📤 serverId: 1
  ├ 📤 channelCode: ppgame
  └ 📤 securityCode: e80f6e7c...
🟢 02:08:43.560 INFO  📡 SDKAPI   ▸ SDK-Server user verified
  ├ 📋 userId: guest_e8fcd70f9e91ce9e
  └ 📋 duration: 14ms
🟢 02:08:43.567 INFO  📝 SAVEHIST ▸ SaveHistory success
  ├ 📋 userId: guest_e8fcd70f9e91ce9e
  ├ 📋 serverId: 1
  ├ 📋 todayLoginCount: 1
  ├ 📋 loginToken: 1f83f604...
  └ 📋 duration: 22ms
  📥 SaveHistory        ✅ OK     ⏱️  ─────  ret=0 ✅
  └ 📋 socketId: exRJCFhu · transport: websocket
🟢 02:08:43.610 INFO  ⚙️ HANDLER  ▸ [3] handler.process → LoginAnnounce
  📤 LoginAnnounce      ⏳ REQ    ⏱️  ─────  uid=?
🟢 02:08:43.610 INFO  📢 ANNOUNCE ▸ LoginAnnounce request
🟢 02:08:43.610 INFO  📢 ANNOUNCE ▸ LoginAnnounce response sent
  ├ 📋 notices: 1
  └ 📋 duration: 0ms
  📥 LoginAnnounce      ✅ OK     ⏱️  ─────  ret=0 ✅
🟢 02:08:46.073 INFO  ⚙️ HANDLER  ▸ [4] handler.process → SaveUserEnterInfo
  📤 SaveUserEnterInfo  ⏳ REQ    ⏱️  ─────  uid=guest_e8fcd7
🟢 02:08:46.074 INFO  📊 SAVEINFO ▸ SaveUserEnterInfo request
  ├ 📤 userId: guest_e8fcd70f9e91ce9e
  ├ 📤 channelCode: ppgame
  └ 📤 userLevel: 1
🟢 02:08:46.078 INFO  📊 SAVEINFO ▸ SaveUserEnterInfo success
  ├ 📋 userId: guest_e8fcd70f9e91ce9e
  └ 📋 duration: 4ms
  📥 SaveUserEnterInfo  ✅ OK     ⏱️  ─────  ret=0 ✅
🟢 02:08:46.159 INFO  🔌 SOCKET   ▸ Client disconnected
  🔴 02:08:46.160 SOCKET exRJCFhu disconnect   🌐 ::ffff:127.0.0.1 📡 websocket  uid=guest_e8fcd7 alive=2825ms reason=transport close
```
