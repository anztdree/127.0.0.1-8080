/**
 * registChat.js — Handler: user/registChat
 * Deep-traced from main.min.js TSUIController.registChat
 *
 * Client expects response with:
 *   n._success      — boolean
 *   n._chatServerUrl — string (chat server Socket.IO URL)
 *   n._worldRoomId   — string (world chat room ID)
 *   n._guildRoomId   — string (guild chat room ID)
 *   n._teamDungeonChatRoom — string (team dungeon chat room)
 *   n._teamChatRoom  — string (team chat room ID)
 *
 * If _success is false, client increments chatConnectCount and retries up to 15 times.
 */

function handleRegistChat(request, ctx) {
    const { userId } = request;

    ctx.logger.log('INFO', 'CHAT', 'registChat request');
    ctx.logger.details('request',
        ['userId', userId ? userId.substring(0, 12) : 'MISSING'],
        ['version', request.version || '']
    );

    // Build chat registration response
    // Traced: registChat callback reads n._success, n._chatServerUrl, n._worldRoomId, n._guildRoomId,
    //   n._teamDungeonChatRoom, n._teamChatRoom
    const chatServerUrl = ctx.config.chatUrl || 'http://127.0.0.1:8002';

    const responseData = {
        _success: true,
        _chatServerUrl: chatServerUrl,
        _worldRoomId: 'world_room_1',
        _guildRoomId: 'guild_room_' + (userId || 'default'),
        _teamDungeonChatRoom: 'team_dungeon_room',
        _teamChatRoom: 'team_room_' + (userId || 'default')
    };

    ctx.logger.log('INFO', 'CHAT', 'registChat SUCCESS');
    ctx.logger.details('response',
        ['chatServerUrl', chatServerUrl],
        ['worldRoomId', responseData._worldRoomId],
        ['guildRoomId', responseData._guildRoomId.substring(0, 20)]
    );

    return ctx.buildDataResponse(0, responseData);
}

module.exports = handleRegistChat;
