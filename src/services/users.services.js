// Local Modules
import { CryptoUtil } from '../utils';
import { UsersModel } from '../models';

export default class UsersServices {
  static signup(payload) {
    const { password, email } = payload;

    payload.email = email.toLowerCase();
    payload.password = CryptoUtil.createHash(password);

    return UsersModel.create(payload);
  }
}
