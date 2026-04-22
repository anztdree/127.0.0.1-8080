/**
 * ============================================================================
 * Login Server — loginGame Handler
 * ============================================================================
 *
 * Client request (main.min.js line 77304-77314):
 * { type:"User", action:"loginGame", userId, password, fromChannel,
 *   channelName, headImageUrl, nickName, subChannel, version:"1.0" }
 *
 * NATURAL IMPLEMENTATION:
 * - Auto-register if user not found
 * - Rate limiting
 * - Clean response building
 *
 * ============================================================================
 */

const { success, error, ErrorCode } = require('../utils/responseHelper');
const logger = require('../utils/logger');
const UserManager = require('../services/userManager');
const TokenManager = require('../services/tokenManager');
const RateLimiter = require('../middleware/rateLimiter');
const CONSTANTS = require('../config/constants');

/**
 * Handle loginGame action
 * 
 * @param {Object} socket - Socket.IO socket
 * @param {Object} payload - Request payload
 * @param {Function} callback - Socket.IO callback
 * @param {string} clientIp - Client IP address
 */
async function loginGame(socket, payload, callback, clientIp) {
    // Extract parameters
    const {
        userId,
        password,
        fromChannel,
        nickName,
        headImageUrl,
        channelName,
        subChannel
    } = payload;

    // =============================================
    // VALIDATION
    // =============================================

    if (!userId) {
        logger.warn('loginGame', 'Missing userId');
        return callback(error(ErrorCode.LACK_PARAM));
    }

    // =============================================
    // RATE LIMIT CHECK
    // =============================================

    if (!RateLimiter.check(clientIp)) {
        logger.warn('loginGame', `Rate limited: ${clientIp}`);
        return callback(error(ErrorCode.FORBIDDEN_LOGIN));
    }

    try {
        // =============================================
        // FIND OR CREATE USER
        // =============================================

        let userData = await UserManager.findByUserId(userId);
        let isNewUser = false;

        if (!userData) {
            // AUTO-REGISTER: Create new user
            isNewUser = true;
            userData = await UserManager.create({
                userId,
                password: password || CONSTANTS.DEFAULT_PASSWORD,
                nickName,
                headImageUrl,
                fromChannel,
                channelName,
                subChannel
            });
            logger.info('loginGame', `Auto-registered: ${userId}`);
        } else {
            // EXISTING USER: Verify password
            const expectedPassword = password || CONSTANTS.DEFAULT_PASSWORD;
            
            if (userData.password !== expectedPassword) {
                RateLimiter.recordFail(clientIp);
                logger.warn('loginGame', `Invalid password: ${userId}`);
                return callback(error(ErrorCode.LOGIN_CHECK_FAILED));
            }

            // Update login time and check new flag
            await UserManager.updateLoginTime(userId);
            isNewUser = await UserManager.consumeNewFlag(userId);
        }

        // Success - reset rate limit
        RateLimiter.recordSuccess(clientIp);

        // =============================================
        // GENERATE TOKEN
        // =============================================

        const loginToken = TokenManager.generate(userId);
        await TokenManager.save(userId, loginToken);

        // =============================================
        // BUILD RESPONSE
        // =============================================
        // Client reads: response.sdk for channelCode
        // Client reads: response.security for securityCode

        const responseData = {
            loginToken: loginToken,
            userId: userId,
            nickName: userData.nick_name || nickName || userId,
            newUser: isNewUser,
            sdk: fromChannel || CONSTANTS.DEFAULT_SDK_CHANNEL,
            security: ''
        };

        logger.info('loginGame', `Login OK: ${userId}, newUser=${isNewUser}`);

        if (callback) {
            callback(success(responseData));
        }

    } catch (err) {
        logger.error('loginGame', `Error: ${err.message}`);
        if (callback) {
            callback(error(ErrorCode.UNKNOWN));
        }
    }
}

module.exports = { loginGame };