// Local Modules
import generator from 'generate-password';
import { UsersServices } from '../services';
import { SuccessHandlerUtil, EmailUtil } from '../utils';
import { UsersDto } from '../dto';

export default class UsersController {
  static async signup(req, res, next) {
    try {
      const payload = req.body;
      const user = await UsersServices.signup(payload);
      SuccessHandlerUtil.handleAdd(res, next, UsersDto.formatUserToJson(user));
    } catch (error) {
      next(error);
    }
  }

  static async facebookSignup(req, res, next) {
    try {
      console.log(req.user._json, 11111111111111);
      const payload = {
        firstName: req.user._json.first_name,
        lastName: req.user._json.last_name,
        age: 18,
        email: req.user._json.email,
        password: generator.generate({
          length: 10,
          numbers: true
        })
      };
      const user = await UsersServices.signup(payload);
      await EmailUtil.sendSuccessSignup(payload.email, payload.password);
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
        age: 20,
        email: req.user.email,
        password: generator.generate({
          length: 10,
          numbers: true
        })
      };
      const user = await UsersServices.signup(payload);
      await EmailUtil.sendSuccessSignup(payload.email, payload.password);
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

      const userInfo = await UsersServices.getById(user.userId);
      SuccessHandlerUtil.handleGet(res, next, UsersDto.formatUserToJson(userInfo));
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
