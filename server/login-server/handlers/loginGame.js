/**
 * ============================================================================
 * Login Server — loginGame Handler  [FIXED v2.1]
 * ============================================================================
 *
 * Client request (main.min.js):
 *   {
 *     type:         "User",
 *     action:       "loginGame",
 *     userId:       string,
 *     password:     string,
 *     fromChannel:  string,   // e.g. "BSNative"
 *     channelName:  string,
 *     headImageUrl: string,
 *     nickName:     string,
 *     subChannel:   string,
 *     version:      "1.0"
 *   }
 *
 * HAR-verified response:
 *   Client reads:
 *     e.loginToken  → stored as ts.loginInfo.userInfo.loginToken
 *     e.userId      → ts.loginInfo.userInfo.userId
 *     e.nickName    → display name
 *     e.newUser     → boolean (triggers new-player events)
 *     e.sdk         → channelCode stored as ts.loginInfo.userInfo.channelCode
 *     e.security    → securityCode (can be empty string)
 *     e.errorCode   → 0 = success (added for consistency)
 *
 * Flow:
 *   1. Validate userId present
 *   2. Rate-limit check
 *   3. Find user in DB (auto-register if not found)
 *   4. If existing user: verify password
 *   5. Generate login token, save to DB
 *   6. Return success response
 *
 * ============================================================================
 */

const { success, error, ErrorCode } = require('../utils/responseHelper');
const logger       = require('../utils/logger');
const UserManager  = require('../services/userManager');
const TokenManager = require('../services/tokenManager');
const RateLimiter  = require('../middleware/rateLimiter');
const CONSTANTS    = require('../config/constants');

/**
 * Handle loginGame action
 *
 * @param {Object}   socket    - Socket.IO socket
 * @param {Object}   payload   - Request payload
 * @param {Function} callback  - Socket.IO callback
 * @param {string}   clientIp  - Client IP address
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

    let userData  = await UserManager.findByUserId(userId);
    let isNewUser = false;

    if (!userData) {
      // AUTO-REGISTER: Create new user
      isNewUser = true;
      userData  = await UserManager.create({
        userId,
        password:     password     || CONSTANTS.DEFAULT_PASSWORD,
        nickName:     nickName     || '',
        headImageUrl: headImageUrl || '',
        fromChannel:  fromChannel  || CONSTANTS.DEFAULT_SDK_CHANNEL,
        channelName:  channelName  || '',
        subChannel:   subChannel   || ''
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

    // Login succeeded — reset fail counter
    RateLimiter.recordSuccess(clientIp);

    // =============================================
    // GENERATE TOKEN
    // =============================================

    const loginToken = TokenManager.generate(userId);
    await TokenManager.save(userId, loginToken);

    // =============================================
    // BUILD RESPONSE
    // =============================================

    const responseData = {
      errorCode:  0,
      loginToken: loginToken,
      userId:     userId,
      nickName:   userData.nick_name || nickName || userId,
      newUser:    isNewUser,
      sdk:        fromChannel || CONSTANTS.DEFAULT_SDK_CHANNEL,  // → channelCode
      security:   ''                                              // → securityCode
    };

    logger.info('loginGame', `Login OK: ${userId}, newUser=${isNewUser}`);

    if (callback) {
      // loginGame response can be larger → auto compression decides
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
