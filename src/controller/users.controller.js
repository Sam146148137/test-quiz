// Local Modules
import UsersServices from '../services/users.services';
import { CryptoUtil, SuccessHandlerUtil } from '../utils';
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

      update.email = update.email.toLowerCase();
      update.password = CryptoUtil.createHash(update.password);

      const question = await UsersServices.updateById(id, update);
      SuccessHandlerUtil.handleUpdate(res, next, question);
    } catch (error) {
      next(error);
    }
  }

  static async list(req, res, next) {
    try {
      const { limit, offset } = req.query;
      const questions = await UsersServices.list(limit, offset);
      SuccessHandlerUtil.handleList(res, next, questions);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;

      const question = await UsersServices.getById(id);

      SuccessHandlerUtil.handleGet(res, next, question);
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
}
