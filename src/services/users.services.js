// Local Modules
import { CryptoUtil, ErrorsUtil } from '../utils';
import { UsersModel } from '../models';

const { ResourceNotFoundError } = ErrorsUtil;

export default class UsersServices {
  static async signup(payload) {
    const { password, email } = payload;

    payload.email = email.toLowerCase();
    payload.password = CryptoUtil.createHash(password);
    payload.role = 'member';
    return UsersModel.create(payload);
  }

  static async updateById(id, update) {
    await UsersModel.getOneOrFaile(id);

    if (update.email) update.email = update.email.toLowerCase();

    if (update.password) update.password = CryptoUtil.createHash(update.password);

    return UsersModel.updateById(id, update);
  }

  static async list(limit, offset) {
    return UsersModel.list(limit, offset);
  }

  static async getById(id) {
    const user = await UsersModel.getById(id);
    if (!user) throw new ResourceNotFoundError();

    return user;
  }

  static async deleteById(id) {
    await UsersModel.getOneOrFaile(id);

    return UsersModel.deleteById(id);
  }
}
