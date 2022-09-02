// Local Modules
import generator from 'generate-password';
import { UsersServices } from '../services';
import { SuccessHandlerUtil, EmailUtil } from '../utils';
import { UsersDto } from '../dto';
import AuthService from '../auth/auth.service';

export default class UsersController {
  static async signup(req, res, next) {
    try {
      const { password } = req.body;
      const payload = req.body;
      const user = await UsersServices.signup(payload);
      await EmailUtil.sendSuccessSignup(payload.email, password);
      SuccessHandlerUtil.handleAdd(res, next, UsersDto.formatUserToJson(user));
    } catch (error) {
      next(error);
    }
  }

  static async editPasswordInProfile(req, res, next) {
    try {
      const { user } = res.locals.auth;
      const { password, newPassword } = req.body;

      await UsersServices.editPasswordInProfile(password, newPassword, user.email);
      SuccessHandlerUtil.handleAdd(res, next, { success: true });
    } catch (error) {
      next(error);
    }
  }

  static async activationCode(req, res, next) {
    try {
      const { activationCode } = req.body;
      const { email, _id, role } = await UsersServices.activationCode(activationCode);
      const { accessToken } = AuthService.generateTokens({ email, userId: _id, role });
      SuccessHandlerUtil.handleAdd(res, next, { accessToken });
    } catch (error) {
      next(error);
    }
  }

  static async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      const activationCode = await UsersServices.forgotPassword(email);
      await EmailUtil.sendActivationCode(email, activationCode);
      SuccessHandlerUtil.handleGet(res, next, { success: true });
    } catch (error) {
      next(error);
    }
  }

  static async changePassword(req, res, next) {
    try {
      const { password } = req.body;
      const { user } = res.locals.auth;
      await UsersServices.changePassword(user.email, password);
      SuccessHandlerUtil.handleUpdate(res, next, { success: true, message: 'Password is updated' });
    } catch (error) {
      next(error);
    }
  }

  static async emailExist(req, res, next) {
    try {
      const { email } = req.body;
      const user = await UsersServices.emailExist(email);
      let exist = false;
      if (user) {
        exist = true;
      }
      SuccessHandlerUtil.handleGet(res, next, { exist });
    } catch (error) {
      next(error);
    }
  }

  static async facebookSignup(req, res, next) {
    try {
      const payload = {
        firstName: req.user._json.first_name,
        lastName: req.user._json.last_name,
        email: req.user._json.email,
        password: generator.generate({
          length: 10,
          numbers: true
        })
      };

      const { password } = payload;

      const user = await UsersServices.signup(payload);
      await EmailUtil.sendSuccessSignup(payload.email, password);
      SuccessHandlerUtil.handleAdd(res, next, UsersDto.formatUserToJson(user));
    } catch (error) {
      next(error);
    }
  }

  static async signupGoogle(req, res, next) {
    try {
      const payload = {
        firstName: req.user.given_name,
        lastName: req.user.family_name,
        email: req.user.email,
        password: generator.generate({
          length: 10,
          numbers: true
        })
      };

      const { password } = payload;

      const user = await UsersServices.signup(payload);
      await EmailUtil.sendSuccessSignup(payload.email, password);
      SuccessHandlerUtil.handleAdd(res, next, UsersDto.formatUserToJson(user));
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    try {
      const payload = req.body;
      const user = await UsersServices.signup(payload);
      SuccessHandlerUtil.handleAdd(res, next, UsersDto.formatUserToJson(user));
    } catch (error) {
      next(error);
    }
  }

  static async updateById(req, res, next) {
    try {
      const { id } = req.params;
      const update = req.body;

      const user = await UsersServices.updateById(id, update);
      SuccessHandlerUtil.handleUpdate(res, next, user);
    } catch (error) {
      next(error);
    }
  }

  static async list(req, res, next) {
    try {
      const { limit, offset } = req.query;
      const users = await UsersServices.list(limit, offset);
      SuccessHandlerUtil.handleList(res, next, users);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;

      const user = await UsersServices.getById(id);

      SuccessHandlerUtil.handleGet(res, next, user);
    } catch (error) {
      next(error);
    }
  }

  static async deleteById(req, res, next) {
    try {
      const { id } = req.params;
      await UsersServices.deleteById(id);

      SuccessHandlerUtil.handleUpdate(res, next, { success: true });
    } catch (error) {
      next(error);
    }
  }

  static async myProfile(req, res, next) {
    try {
      const { user } = res.locals.auth;
      const userInfo = await UsersServices.getByUserId(user.userId);

      SuccessHandlerUtil.handleGet(res, next, userInfo);
    } catch (error) {
      next(error);
    }
  }

  static async editMyProfile(req, res, next) {
    try {
      const { user } = res.locals.auth;
      const update = req.body;

      const userInfo = await UsersServices.updateById(user.userId, update);
      // res.clearCookie('userCookie');
      SuccessHandlerUtil.handleGet(res, next, UsersDto.formatUserToJson(userInfo));
    } catch (error) {
      next(error);
    }
  }
}
