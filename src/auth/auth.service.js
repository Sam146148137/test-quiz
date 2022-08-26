import jwt from 'jsonwebtoken';
import parse from 'parse-duration';
import { UsersModel } from '../models';
import { ErrorsUtil, CryptoUtil } from '../utils';

import config from '../config/variables.config';

const { AUTH } = config;

const {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  REFRESH_TOKEN_ACTIVE_TIME,
  ACCESS_TOKEN_ACTIVE_TIME
} = AUTH;

const { Forbidden, UnauthorizedError } = ErrorsUtil;

export default class AuthService {
  static generateTokens(payload) {
    const atSignOption = { expiresIn: ACCESS_TOKEN_ACTIVE_TIME };
    const rtSignOptions = { expiresIn: REFRESH_TOKEN_ACTIVE_TIME };

    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, atSignOption);
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, rtSignOptions);

    return { accessToken, refreshToken };
  }

  static validateAccessToken(accessToken) {
    try {
      return jwt.verify(accessToken, JWT_ACCESS_SECRET);
    } catch (error) {
      throw new UnauthorizedError();
    }
  }

  static validateRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    } catch (error) {
      throw new UnauthorizedError();
    }
  }

  // TODO Logout function

  static async refresh(token) {
    const user = AuthService.validateRefreshToken(token);
    const { email, userId, role } = user;

    const tokens = AuthService.generateTokens({ email, userId, role });
    const { accessToken, refreshToken } = tokens;

    const accessTokenExpiresAt = new Date().getTime() + parse(ACCESS_TOKEN_ACTIVE_TIME);
    const refreshTokenExpiresAt = new Date().getTime() + parse(REFRESH_TOKEN_ACTIVE_TIME);
    const scope = `access:${role}`;
    const payload = {
      accessToken, refreshToken, email, userId, scope, accessTokenExpiresAt, refreshTokenExpiresAt
    };

    // TODO save in redis
    return payload;
  }

  static async login(email, password) {
    const user = await UsersModel.findByEmail(email);

    if (!user) throw new Forbidden(`User not exists with email: ${email}`);
    if (!CryptoUtil.isValidPassword(password, user.password)) {
      throw new UnauthorizedError('Invalid password');
    }

    const { id: userId, role } = user;
    const { accessToken, refreshToken } = AuthService.generateTokens({ email, userId, role });

    const accessTokenExpiresAt = new Date().getTime() + parse(ACCESS_TOKEN_ACTIVE_TIME);
    const refreshTokenExpiresAt = new Date().getTime() + parse(REFRESH_TOKEN_ACTIVE_TIME);
    const scope = `access:${role}`;

    const payload = {
      accessToken,
      refreshToken,
      email,
      userId,
      scope,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
      type: (role === 'member') ? 'website' : role
    };

    // TODO save in redis
    return payload;
  }
}
