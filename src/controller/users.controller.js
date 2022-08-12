// Local Modules
import { UsersServices } from '../services';
import { SuccessHandlerUtil } from '../utils';
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
}
