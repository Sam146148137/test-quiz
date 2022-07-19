// import parse from 'parse-duration';
import AuthService from './auth.service';
import { SuccessHandlerUtil } from '../utils';
// import config from '../config/variables.config';
import redis from '../storage/redis.storage';

// const { AUTH } = config;
// const { REFRESH_TOKEN_ACTIVE_TIME } = AUTH;

export default class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const loginResult = await AuthService.login(email, password);

      // const userCookie = JSON.stringify({
      //   refreshToken: loginResult.refreshToken,
      //   scope: loginResult.scope
      // });
      // res.cookie('userCookie', userCookie, {
      //   maxAge: parse(REFRESH_TOKEN_ACTIVE_TIME),
      //   httpOnly: true
      // });

      const data = await redis.get(loginResult.userId);
      if (!data) {
        await redis.set(loginResult.userId, JSON.stringify(loginResult));
        console.log('received from mongo db');
        SuccessHandlerUtil.handleAdd(res, next, loginResult);
      } else {
        console.log('received from redis');
        SuccessHandlerUtil.handleAdd(res, next, JSON.parse(data));
      }
    } catch (error) {
      next(error);
    }
  }
}
