import parse from 'parse-duration';
import AuthService from './auth.service';
import { SuccessHandlerUtil } from '../utils';
import config from '../config/variables.config';

const { AUTH } = config;
const { REFRESH_TOKEN_ACTIVE_TIME } = AUTH;

export default class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const loginResult = await AuthService.login(email, password);

      const userCookie = JSON.stringify({
        refreshToken: loginResult.refreshToken,
        scope: loginResult.scope
      });
      res.cookie('userCookie', userCookie, {
        maxAge: parse(REFRESH_TOKEN_ACTIVE_TIME),
        httpOnly: true
      });

      SuccessHandlerUtil.handleAdd(res, next, loginResult);
    } catch (error) {
      next(error);
    }
  }

  static async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;

      console.log(777);
      const refreshResult = await AuthService.refresh(refreshToken);

      SuccessHandlerUtil.handleAdd(res, next, refreshResult);
    } catch (error) {
      next(error);
    }
  }
}
