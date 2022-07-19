// Local Modules
import UsersServices from '../services/users.services';
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
}
