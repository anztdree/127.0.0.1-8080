# Analisa Struktur Server — Super Warrior Z

> Berdasarkan reverse engineering `main.min(unminfy).js` (244,761 baris)

---

## 1. Arsitektur 4 Server

Client membuat **4 koneksi Socket.IO** terpisah, masing-masing dengan event `handler.process`:

| Server | TEA Verify | Socket Method | Handler Count |
|--------|-----------|---------------|---------------|
| **login-server** | TIDAK | `processHandlerWithLogin()` | **5** |
| **main-server** | YA | `processHandler()` | **250+** |
| **chat-server** | YA | `processHandlerWithChat()` | **5** |
| **dungeon-server** | YA + HTTP | `processHandlerWithDungeon()` | **9** |

### Protocol Semua Server

**Event name:** `socket.emit('handler.process', data, callback)`

**Request format:**
```json
{
  "type": "string",
  "action": "string",
  "...": "parameter lainnya",
  "version": "1.0"
}
```

**Response format:**
```json
{
  "ret": 0,
  "data": "...",          // JSON string, LZString compressed jika compress=true
  "compress": true,
  "serverTime": 12345,
  "server0Time": 12345
}
```

**Chat server beda sedikit:** `ret` pakai string `"SUCCESS"` bukan angka `0`.

**Server→Client push:** `socket.emit('Notify', data)`

---

## 2. Login Server (5 Handlers, TANPA TEA)

### Koneksi
- URL dari `serversetting.json` → field `loginserver`
- `verifyEnable = false` → langsung connect tanpa TEA handshake
- Socket di-destroy setelah `SaveUserEnterInfo`

### Handlers

| Action | Fungsi | Request Utama |
|--------|--------|---------------|
| `loginGame` | Auth user | userId, password, fromChannel, subChannel |
| `GetServerList` | Daftar server | userId, subChannel, channel |
| `SaveHistory` | Pilih server, dapat token | accountToken, channelCode, serverId, securityCode |
| `SaveUserEnterInfo` | Report masuk game | accountToken, channelCode, subChannel, createTime, userLevel |
| `SaveLanguage` | Simpan bahasa | userid, sdk, appid, language |

### Response `loginGame` → client pakai:
- `userId`, `channelCode`, `loginToken`, `nickName`, `securityCode`, `createTime`

### Response `GetServerList` → client pakai:
- `serverList[]` → masing2 punya: `url`, `serverId`, `serverName`, `chaturl`, `dungeonurl`, `worldRoomId`, `guildRoomId`, `teamDungeonChatRoom`, `teamChatRoomId`
- `history[]` → server terakhir dimain
- `offlineReason`

### Alur:
```
loginGame → GetServerList → user pilih server → SaveHistory (dapat loginToken)
→ connect main-server (TEA verify) → enterGame
→ SaveUserEnterInfo → destroy login socket
```

---

## 3. Main Server (250+ Handlers, PAKAI TEA)

### Koneksi
- URL dari `serverItem.url` (dapat dari GetServerList)
- `verifyEnable = true` → TEA verify handshake dulu
- Persistent selama bermain

### TEA Verify Handshake
```
Client connect → Server emit 'verify' challenge string
→ Client encrypt dengan TEA(key="verification") → Client emit 'verify', encrypted
→ Server cek, kirim {ret: 0} → Client lanjut ke handler
```

### Handler Kategori

#### user (12 actions)
`enterGame`, `exitGame`, `registChat`, `changeHeadImage`, `changeHeadBox`,
`changeNickName`, `queryPlayerHeadIcon`, `saveFastTeam`, `setFastTeamName`,
`suggest`, `clickSystem`, `getBulletinBrief`, `readBulletin`

#### hero (19+ actions)
`getAttrs`, `qigong`, `saveQigong`, `cancelQigong`, `evolve`, `resolve`,
`reborn`, `inherit`, `splitHero`, `activeSkill`, `useSkin`, `activeSkin`,
`wakeUp`, `autoLevelUp`, `autoHeroBreak`, `activeHeroBreak`, `heroBreak`,
`rebornSelfBreak`, `queryHeroEquipInfo`, `queryArenaHeroEquipInfo`

#### summon (5 actions)
`summonOneFree`, `summonOne`, `summonTen`, `summonEnergy`, `setWishList`

#### dungeon — solo (5 actions)
`startBattle`, `checkBattleResult`, `sweep`, `buyCount`

#### arena (8 actions)
`join`, `startBattle`, `getBattleRecord`, `setTeam`, `getRank`, `getRecord`,
`select`, `getDailyReward`, `topAward`

#### guild (30+ actions)
`getGuildDetail`, `getGuildList`, `getGuildByIdOrName`, `createGuild`,
`requestGuild`, `handleRequest`, `quitGuild`, `kickOut`, `transferCaptain`,
`impeachCaptain`, `appointmentViceCaptain`, `relieveViceCaptain`, `getMembers`,
`getGuildLog`, `getRequestMembers`, `updateGuildIcon`, `updateBulletin`,
`updateDes`, `changeGuildName`, `checkPropaganda`, `updateRequestCondition`,
`readBulletin`, `getTreasureInfo`, `treasureStartBattle`, `startBoss`,
`checkBossResult`, `getGuildBossInfo`, `buyBossTimes`, `getSatanGift`,
`guildSign`, `getTreasurePoint`, `upgradeTech`, `resetTech`

#### friend (15 actions)
`applyFriend`, `getFriends`, `getApplyList`, `recommendFriend`,
`handleApply`, `delFriend`, `addToBlacklist`, `removeBalcklist`,
`friendBattle`, `getFriendArenaDefenceTeam`, `findUserBrief`,
`giveHeart`, `getHeart`, `autoGiveGetHeart`, `friendServerAction`

#### war / Global War (16 actions)
`getSignUpInfo`, `signUp`, `getAuditionInfo`, `getAuditionRank`,
`getAuditionReward`, `getTeamInfo`, `getUserTeam`, `getChampionRank`,
`getBattleRecord`, `bet`, `like`, `getBetReward`

#### topBattle (18 actions)
`getTeamInfo`, `setTeam`, `queryRank`, `queryHistoryList`, `queryHistory`,
`getBattleRecord`, `getTopBattleRecord`, `startBattle`, `tryMatch`,
`startSeason`, `like`, `bet`, `getBetReward`, `getRankReward`, `buyTimes`

#### ballWar / Dragon Ball (12 actions)
`getBriefInfo`, `getAreaInfo`, `getPointRank`, `getGuildMemberHonours`,
`getFinishInfo`, `getRecord`, `getFlagOwnerInfo`, `checkHaveDefence`,
`setDefence`, `removeDefence`, `startBattle`, `signUpBallWar`, `buyTimes`

#### activity (70+ actions)
`getActivityBrief`, `getActivityDetail`, `normalLuck`, `luxuryLuck`,
`newHeroChallenge`, `rechargeGiftReward`, `buySuperGift`, `dailyBigGiftReward`,
`cumulativeRechargeReward`, `turnTableGetReward`, `luckyWheelGetReward`,
`blindBoxOpen`, `fund`, `gleaning`, + banyak lagi...

#### hangup (5 actions)
`startGeneral`, `checkBattleResult`, `saveGuideTeam`, `gain`, `nextChapter`

#### Lainnya (per module)
- `tower` (10): Karin Tower
- `snake` (7): Snake Dungeon
- `expedition` (10): Expedition
- `trial` (5): Space Trial
- `gravity` (3): Gravity Test
- `maha` (4): Maha Adventure
- `mine` (6): Mine
- `cellGame` (8): Cell Game
- `bossCompetition` (6): Boss Competition
- `training` (6): Training
- `entrust` (10): Entrust
- `imprint` (8): Imprint
- `genki` (3): Genki
- `gift` (9): Gift/Welfare
- `timeBonus` (2): Time Bonus
- `littleGame` (3): Mini Game
- `heroImage` (5): Hero Image
- `userMsg` (6): User Message
- `market` (1): Market
- `rank` (2): Rank
- `task` (2): Task
- `shop` (4): Shop
- `battle` (1): getRandom
- `timeMachine` (3): Time Machine
- `timeTrial` (5): Time Trial
- `strongEnemy` (5): Strong Enemy

#### teamDungeonGame (18 actions)
`createTeam`, `apply`, `queryTeamById`, `queryTeamByDisplayId`, `queryTeam`,
`queryMyApplyList`, `queryMyRecord`, `queryTeamMembers`, `queryTeamsMember`,
`queryUserTeam`, `queryKillRank`, `quitTeam`, `getAllReward`, `getReward`,
`getAchReward`, `getDailyTaskReward`, `setTeamDungeonTeam`, `autoApply`, `addRobot`

### Notify (Server → Client Push, 35+ actions)
`Kickout`, `guildAgree`, `beKickedOutGuild`, `redDotDataChange`, `payFinish`,
`timeBonus`, `heroBackpackFull`, `onlineBulletin`, `scheduleModelRefresh`,
`monthCard`, `vipLevel`, `notifySummon`, `warStageChange`, `warRankChange`,
`broadcast`, `itemChange`, `joinTeamSuccess`, `teamDungeonFinish`,
`teamDungeonTaskChange`, `teamDungeonExpire`, `teamDungeonBroadcast`,
`userMessage`, `mainTaskChange`, `areanRecord`, `battleMedalRefresh`,
`topBattleBeAttack`, `topBattleStageChange`, `updateForbiddenChat`, + lagi...

### enterGame Response (57+ fields)
Data yang WAJIB dikirim server saat enterGame:
- `newUser` (boolean)
- `broadcastRecord` (chat history replay)
- `user` data (level, exp, vip, currency, dll)
- `heros` (daftar hero player)
- `totalProps` (inventory)
- `hangup` (idle/hangup state)
- `summon` (summon state)
- `equip` (equipment data)
- `dungeon` (dungeon progress)
- `guild` (guild info)
- `checkin` (checkin state)
- `guide` (tutorial progress)
- `task` (task/quest progress)
- `teamDungeon` (team dungeon login info)
- `teamServerHttpUrl` (HTTP URL dungeon server)
- `teamDungeonOpenTime`, `teamDungeonTask`, `teamDungeonSplBcst`,
  `teamDungeonNormBcst`, `teamDungeonHideInfo`, `teamDungeonInvitedFriends`
- `myTeamServerSocketUrl` (dungeon socket URL)
- + banyak field lainnya...

---

## 4. Chat Server (5 Handlers, PAKAI TEA)

### Koneksi
- URL dari main-server response `registChat` → `_chatServerUrl`
- `verifyEnable = true` → TEA verify handshake

### Handlers

| Action | Fungsi | Request Utama |
|--------|--------|---------------|
| `login` | Auth chat | userId, serverId |
| `sendMsg` | Kirim pesan | userId, kind (MESSAGE_KIND), content, roomId |
| `joinRoom` | Join room | userId, roomId |
| `leaveRoom` | Leave room | userId, roomId |
| `getRecord` | Riwayat chat | userId, roomId, startTime |

### Room Types (MESSAGE_KIND)
| Kind | Value | Room ID Source |
|------|-------|---------------|
| SYSTEM | 1 | - |
| WORLD | 2 | `worldRoomId` (dari GetServerList) |
| GUILD | 3 | `guildRoomId` (dari GetServerList) |
| PRIVATE | 4 | - |
| WORLD_TEAM | 5 | `teamDungeonChatRoom` |
| TEAM | 6 | `teamChatRoomId` (dynamic, per-team) |

### Notify
Chat server push pesan via `Notify` event, format:
```json
{ "ret": "SUCCESS", "compress": true, "data": "..." }
```
Data berisi serialized chat message dengan field: `_msg`, `_kind`, `_userId`, dll.
Client simpan max 60 pesan per kind.

### Alur:
```
Main: registChat → dapat chatServerUrl + semua roomId
→ connect chat-server → TEA verify → chat login
→ joinRoom(worldRoomId) → joinRoom(guildRoomId)
→ joinRoom(teamDungeonChatRoom) → joinRoom(teamChatRoomId)
```

---

## 5. Dungeon Server (7 Socket + 2 HTTP, PAKAI TEA)

### Koneksi
- URL dari `serverItem.dungeonurl` (dari GetServerList/enterGame/joinTeam)
- `verifyEnable = true` → TEA verify handshake
- **DYNAMIC URL** — berubah saat join/create team dungeon
- Juga serve **HTTP endpoint** untuk query

### Socket Handlers (type: `teamDungeonTeam`)

| Action | Fungsi |
|--------|--------|
| `clientConnect` | Konfirmasi connect ke dungeon |
| `refreshApplyList` | Refresh daftar applicant |
| `changePos` | Ubah posisi member di grid |
| `startBattle` | Mulai battle |
| `agree` | Terima applicant |
| `queryUserTeam` | Lihat lineup user |
| `changeAutoJoinCondition` | Set auto-join criteria |

### HTTP Handlers (type: `teamDungeonTeam`)

| Action | Fungsi |
|--------|--------|
| `queryTodayMap` | Daftar dungeon available hari ini |
| `queryRobot` | Daftar robot yang bisa diajak |

### Notify (Server → Client Push)
`TDMemberJoin`, `TDMemberQuit`, `TDStartBattle`, `TDNewApply`, `TDChangePos`

### Alur Multiplayer:
```
Main: createTeam/apply → dapat socketUrl + chatRoomId
→ disconnect dungeon lama → connect dungeon baru (URL baru)
→ dungeon: clientConnect → chat: joinRoom(teamChatRoomId)
→ dungeon: changePos → dungeon: startBattle → push TDStartBattle
→ Main push: teamDungeonFinish → rewards
→ dungeon disconnect → chat: leaveRoom
```

---

## 6. Kode yang HARUS Shared

Semua server butuh:

| Kode | Dipakai Oleh | Fungsi |
|------|-------------|--------|
| LZString compress | 4 server | Compress response data |
| Response format | 4 server | `{ret, data, compress, serverTime}` |
| Database pool | 4 server | Koneksi DB |
| Config | 4 server | Port, DB config, dll |
| TEA encrypt/decrypt | 3 server (bukan login) | Verify handshake |
| Game data loader | main + dungeon | Load JSON config dari resource/json/ |

---

## 7. Struktur Folder Final

```
game-project/                          # (htdocs)
│
│── index.html                         # Client asli
│── main.min(unminfy).js               # Client asli
│── main.min.js.zp                     # Client asli
│── jszip.min.js                       # Client asli
│── jszip-utils.min.js                 # Client asli
│── animate.gif                        # Client asli
│── background.jpg                     # Client asli
│
│── resource/                          # Client asli
│   ├── assets/
│   ├── json/
│   ├── json.zp
│   ├── language/
│   └── properties/
│
└── server/
    │
    ├── index.js                       # Entry point — start semua server
    ├── package.json                   # Dependencies
    ├── config.js                      # Port, DB, dll
    ├── database.js                    # MySQL connection pool
    ├── tea.js                         # TEA encrypt/decrypt (port dari client)
    ├── compress.js                    # LZString UTF-16 compress
    ├── response.js                    # Helper: {ret, data, compress, serverTime}
    ├── gameData.js                    # Loader JSON config dari ../resource/json/
    ├── schema.sql                     # Seluruh DB schema dalam 1 file
    │
    ├── login-server/
    │   ├── index.js                   # Socket.IO server, TANPA TEA verify
    │   └── handlers.js               # 5 handler: loginGame, GetServerList, SaveHistory, SaveUserEnterInfo, SaveLanguage
    │
    ├── main-server/
    │   ├── index.js                   # Socket.IO server + TEA verify + router
    │   ├── notify.js                  # Dispatcher 35+ Notify push ke client
    │   │
    │   ├── user/                     # type: "user" — 12 actions
    │   │   ├── enterGame.js
    │   │   ├── exitGame.js
    │   │   ├── registChat.js
    │   │   ├── changeHeadImage.js
    │   │   ├── changeHeadBox.js
    │   │   ├── changeNickName.js
    │   │   ├── queryPlayerHeadIcon.js
    │   │   ├── saveFastTeam.js
    │   │   ├── setFastTeamName.js
    │   │   ├── suggest.js
    │   │   ├── clickSystem.js
    │   │   ├── getBulletinBrief.js
    │   │   └── readBulletin.js
    │   │
    │   ├── hero/                     # type: "hero" — 19+ actions
    │   │   ├── getAttrs.js
    │   │   ├── qigong.js
    │   │   ├── saveQigong.js
    │   │   ├── cancelQigong.js
    │   │   ├── evolve.js
    │   │   ├── resolve.js
    │   │   ├── reborn.js
    │   │   ├── inherit.js
    │   │   ├── splitHero.js
    │   │   ├── activeSkill.js
    │   │   ├── useSkin.js
    │   │   ├── activeSkin.js
    │   │   ├── wakeUp.js
    │   │   ├── autoLevelUp.js
    │   │   ├── autoHeroBreak.js
    │   │   ├── activeHeroBreak.js
    │   │   ├── heroBreak.js
    │   │   ├── rebornSelfBreak.js
    │   │   ├── queryHeroEquipInfo.js
    │   │   └── queryArenaHeroEquipInfo.js
    │   │
    │   ├── equip/                    # type: "equip"
    │   │   └── ...
    │   │
    │   ├── battle/                   # type: "battle" — getRandom
    │   │   └── getRandom.js
    │   │
    │   ├── dungeon/                  # type: "dungeon" — solo dungeon
    │   │   ├── startBattle.js
    │   │   ├── checkBattleResult.js
    │   │   ├── sweep.js
    │   │   └── buyCount.js
    │   │
    │   ├── hangup/                   # type: "hangup" — 5 actions
    │   │   ├── startGeneral.js
    │   │   ├── checkBattleResult.js
    │   │   ├── saveGuideTeam.js
    │   │   ├── gain.js
    │   │   └── nextChapter.js
    │   │
    │   ├── shop/                     # type: "shop" — 4 actions
    │   │   ├── getInfo.js
    │   │   ├── buy.js
    │   │   ├── readNew.js
    │   │   └── refresh.js
    │   │
    │   ├── arena/                    # type: "arena" — 8 actions
    │   │   ├── join.js
    │   │   ├── startBattle.js
    │   │   ├── getBattleRecord.js
    │   │   ├── setTeam.js
    │   │   ├── getRank.js
    │   │   ├── getRecord.js
    │   │   ├── select.js
    │   │   ├── getDailyReward.js
    │   │   └── topAward.js
    │   │
    │   ├── summon/                   # type: "summon" — 5 actions
    │   │   ├── summonOneFree.js
    │   │   ├── summonOne.js
    │   │   ├── summonTen.js
    │   │   ├── summonEnergy.js
    │   │   └── setWishList.js
    │   │
    │   ├── guild/                    # type: "guild" — 30+ actions
    │   │   ├── getGuildDetail.js
    │   │   ├── getGuildList.js
    │   │   ├── getGuildByIdOrName.js
    │   │   ├── createGuild.js
    │   │   ├── requestGuild.js
    │   │   ├── handleRequest.js
    │   │   ├── quitGuild.js
    │   │   ├── kickOut.js
    │   │   ├── transferCaptain.js
    │   │   ├── impeachCaptain.js
    │   │   ├── appointmentViceCaptain.js
    │   │   ├── relieveViceCaptain.js
    │   │   ├── getMembers.js
    │   │   ├── getGuildLog.js
    │   │   ├── getRequestMembers.js
    │   │   ├── updateGuildIcon.js
    │   │   ├── updateBulletin.js
    │   │   ├── updateDes.js
    │   │   ├── changeGuildName.js
    │   │   ├── checkPropaganda.js
    │   │   ├── updateRequestCondition.js
    │   │   ├── readBulletin.js
    │   │   ├── getTreasureInfo.js
    │   │   ├── treasureStartBattle.js
    │   │   ├── updateTreasureDefenceTeam.js
    │   │   ├── startBoss.js
    │   │   ├── checkBossResult.js
    │   │   ├── getGuildBossInfo.js
    │   │   ├── buyBossTimes.js
    │   │   ├── getSatanGift.js
    │   │   ├── guildSign.js
    │   │   ├── getTreasurePoint.js
    │   │   ├── upgradeTech.js
    │   │   └── resetTech.js
    │   │
    │   ├── friend/                   # type: "friend" — 15 actions
    │   │   ├── applyFriend.js
    │   │   ├── getFriends.js
    │   │   ├── getApplyList.js
    │   │   ├── recommendFriend.js
    │   │   ├── handleApply.js
    │   │   ├── delFriend.js
    │   │   ├── addToBlacklist.js
    │   │   ├── removeBalcklist.js
    │   │   ├── friendBattle.js
    │   │   ├── getFriendArenaDefenceTeam.js
    │   │   ├── findUserBrief.js
    │   │   ├── giveHeart.js
    │   │   ├── getHeart.js
    │   │   ├── autoGiveGetHeart.js
    │   │   └── friendServerAction.js
    │   │
    │   ├── war/                      # type: "war" — Global War, 16 actions
    │   │   ├── getSignUpInfo.js
    │   │   ├── signUp.js
    │   │   ├── getAuditionInfo.js
    │   │   ├── getAuditionRank.js
    │   │   ├── getAuditionReward.js
    │   │   ├── getTeamInfo.js
    │   │   ├── getUserTeam.js
    │   │   ├── getChampionRank.js
    │   │   ├── getBattleRecord.js
    │   │   ├── bet.js
    │   │   ├── like.js
    │   │   └── getBetReward.js
    │   │
    │   ├── topBattle/                # type: "topBattle" — 18 actions
    │   │   ├── getTeamInfo.js
    │   │   ├── setTeam.js
    │   │   ├── queryRank.js
    │   │   ├── queryHistoryList.js
    │   │   ├── queryHistory.js
    │   │   ├── getBattleRecord.js
    │   │   ├── getTopBattleRecord.js
    │   │   ├── startBattle.js
    │   │   ├── tryMatch.js
    │   │   ├── startSeason.js
    │   │   ├── like.js
    │   │   ├── bet.js
    │   │   ├── getBetReward.js
    │   │   ├── getRankReward.js
    │   │   ├── buyTimes.js
    │   │   ├── queryBackupTeam.js
    │   │   └── queryUserHistory.js
    │   │
    │   ├── ballWar/                  # type: "ballWar" — Dragon Ball War, 12 actions
    │   │   ├── getBriefInfo.js
    │   │   ├── getAreaInfo.js
    │   │   ├── getPointRank.js
    │   │   ├── getGuildMemberHonours.js
    │   │   ├── getFinishInfo.js
    │   │   ├── getRecord.js
    │   │   ├── getFlagOwnerInfo.js
    │   │   ├── checkHaveDefence.js
    │   │   ├── setDefence.js
    │   │   ├── removeDefence.js
    │   │   ├── startBattle.js
    │   │   ├── signUpBallWar.js
    │   │   └── buyTimes.js
    │   │
    │   ├── activity/                 # type: "activity" — 70+ actions
    │   │   ├── getActivityBrief.js
    │   │   ├── getActivityDetail.js
    │   │   ├── normalLuck.js
    │   │   ├── luxuryLuck.js
    │   │   ├── newHeroChallenge.js
    │   │   ├── rechargeGiftReward.js
    │   │   ├── buySuperGift.js
    │   │   ├── dailyBigGiftReward.js
    │   │   ├── cumulativeRechargeReward.js
    │   │   ├── turnTableGetReward.js
    │   │   ├── luckyWheelGetReward.js
    │   │   ├── blindBoxOpen.js
    │   │   ├── fund.js
    │   │   └── ... (60+ file lainnya)
    │   │
    │   ├── teamDungeon/              # type: "teamDungeonGame" — 18 actions
    │   │   ├── createTeam.js
    │   │   ├── apply.js
    │   │   ├── queryTeamById.js
    │   │   ├── queryTeamByDisplayId.js
    │   │   ├── queryTeam.js
    │   │   ├── queryMyApplyList.js
    │   │   ├── queryMyRecord.js
    │   │   ├── queryTeamMembers.js
    │   │   ├── queryTeamsMember.js
    │   │   ├── queryUserTeam.js
    │   │   ├── queryKillRank.js
    │   │   ├── quitTeam.js
    │   │   ├── getAllReward.js
    │   │   ├── getReward.js
    │   │   ├── getAchReward.js
    │   │   ├── getDailyTaskReward.js
    │   │   ├── setTeamDungeonTeam.js
    │   │   ├── autoApply.js
    │   │   └── addRobot.js
    │   │
    │   ├── tower/                    # type: "tower" — 10 actions
    │   │   ├── startBattle.js
    │   │   ├── climb.js
    │   │   ├── openBox.js
    │   │   ├── openKarin.js
    │   │   ├── openTimesEvent.js
    │   │   ├── autoGetEventsReward.js
    │   │   ├── buyClimbTimes.js
    │   │   ├── buyBattleTimes.js
    │   │   ├── getLocalRank.js
    │   │   ├── getAllRank.js
    │   │   └── getFeetInfo.js
    │   │
    │   ├── snake/                    # type: "snake" — 7 actions
    │   │   ├── startBattle.js
    │   │   ├── recoverHero.js
    │   │   ├── getSnakeInfo.js
    │   │   ├── getEnemyInfo.js
    │   │   ├── reset.js
    │   │   ├── sweep.js
    │   │   ├── awardBox.js
    │   │   └── getAllBoxReward.js
    │   │
    │   ├── expedition/               # type: "expedition" — 10 actions
    │   │   ├── clickExpedition.js
    │   │   ├── investigation.js
    │   │   ├── startEvent.js
    │   │   ├── finishEvent.js
    │   │   ├── quickFinishEvent.js
    │   │   ├── startBattle.js
    │   │   ├── checkBattleResult.js
    │   │   ├── saveTeam.js
    │   │   ├── delTeam.js
    │   │   ├── collection.js
    │   │   └── ...
    │   │
    │   ├── trial/                    # type: "trial" — 5 actions
    │   ├── gravity/                  # type: "gravity" — 3 actions
    │   ├── maha/                     # type: "maha" — 4 actions
    │   ├── mine/                     # type: "mine" — 6 actions
    │   ├── cellGame/                 # type: "cellGame" — 8 actions
    │   ├── bossCompetition/          # type: "bossCompetition" — 6 actions
    │   ├── training/                 # type: "training" — 6 actions
    │   ├── entrust/                  # type: "entrust" — 10 actions
    │   ├── imprint/                  # type: "imprint" — 8 actions
    │   ├── genki/                    # type: "genki" — 3 actions
    │   ├── gift/                     # type: "gift" — 9 actions
    │   ├── timeBonus/                # type: "timeBonus" — 2 actions
    │   ├── littleGame/               # type: "littleGame" — 3 actions
    │   ├── heroImage/                # type: "heroImage" — 5 actions
    │   ├── userMsg/                  # type: "userMsg" — 6 actions
    │   ├── market/                   # type: "market" — 1 action
    │   ├── rank/                     # type: "rank" — 2 actions
    │   ├── task/                     # type: "task" — 2 actions
    │   ├── strongEnemy/              # type: "strongEnemy" — 5 actions
    │   ├── timeMachine/              # type: "timeMachine" — 3 actions
    │   ├── timeTrial/                # type: "timeTrial" — 5 actions
    │   │
    │   └── currency.js               # Helper: operasi mata uang player
    │
    ├── chat-server/
    │   ├── index.js                   # Socket.IO server + TEA verify
    │   ├── handlers.js               # 5 handler: login, sendMsg, joinRoom, leaveRoom, getRecord
    │   └── rooms.js                   # Room management (6 kind, 4 default room)
    │
    └── dungeon-server/
        ├── index.js                   # Socket.IO + TEA verify + HTTP server
        └── handlers.js               # 7 socket + 2 HTTP handler
```

---

## 8. Penjelasan File di Root server/

| File | Fungsi | Dipakai Oleh |
|------|--------|-------------|
| `index.js` | Start semua 4 server sekaligus | - |
| `package.json` | Dependencies: socket.io, express, mysql2, lz-string | - |
| `config.js` | Port per server, DB credential, secret key | 4 server |
| `database.js` | MySQL pool createPool, helper query | 4 server |
| `tea.js` | TEA encrypt/decrypt (port dari kode client) | main, chat, dungeon |
| `compress.js` | LZString.compressToUTF16 (server side compress) | 4 server |
| `response.js` | Wrapper: `res.success(data)` → `{ret:0, data, compress:true, serverTime}` | 4 server |
| `gameData.js` | Load semua JSON dari `../resource/json/`, export getter | main, dungeon |
| `schema.sql` | CREATE TABLE untuk semua tabel (users, heros, equips, dll) | - |

---

## 9. Router Logic di main-server/index.js

Tiap request dari client punya `type` dan `action`. Router di `main-server/index.js`:
```js
// Pseudocode router
socket.on('handler.process', async (data, callback) => {
    const { type, action } = data;
    const handlerPath = `./${type}/${action}.js`;
    const handler = require(handlerPath);
    const result = await handler.execute(data);
    callback(Response.success(result));
});
```
Contoh: client kirim `{type:"hero", action:"evolve", ...}` → load `./hero/evolve.js`

Jika file belum dibuat → return error. Jadi kita bisa develop incrementally:
buat folder + file action yang dikerjakan saja, sisanya nanti.
