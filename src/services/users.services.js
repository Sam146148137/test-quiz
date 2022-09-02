// Local Modules
import generator from 'generate-password';
import { CryptoUtil, ErrorsUtil } from '../utils';
import { QuizAnswersModel, UsersModel } from '../models';
import { FilterQuizDto, UsersDto } from '../dto';

const { ResourceNotFoundError, Forbidden, InputValidationError } = ErrorsUtil;

export default class UsersServices {
  static emailExist(email) {
    return UsersModel.findByEmail(email);
  }

  static async editPasswordInProfile(password, newPassword, email) {
    const existUser = await UsersModel.findByEmail(email);
    if (!existUser) throw new ResourceNotFoundError();

    const validPassword = CryptoUtil.isValidPassword(password, existUser.password);

    if (!validPassword) throw new InputValidationError('Invalid Password');

    const hashPassword = CryptoUtil.createHash(newPassword);

    return UsersModel.changePasswordByEmail(email, hashPassword);
  }

  static async activationCode(activCode) {
    const userInfo = await UsersModel.findByActivationCode(activCode);
    if (!userInfo) {
      throw new InputValidationError('Activation code failed');
    }
    return userInfo;
  }

  static async forgotPassword(email) {
    const user = await UsersModel.findByEmail(email);
    if (!user) {
      throw new Forbidden('Activation code sent');
    }
    user.activationCode = generator.generate({
      length: 6,
      numbers: true
    });
    await user.save();
    return user.activationCode;
  }

  static async changePassword(email, password) {
    password = CryptoUtil.createHash(password);
    return UsersModel.changePassword(email, password);
  }

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

  static async getByUserId(id) {
    const userInfo = await UsersModel.getOneOrFaile(id);
    const existQuizData = await QuizAnswersModel.getByUserId(id);

    if (!existQuizData) throw new Forbidden('Quiz is not found');

    if (existQuizData.length === 0) return userInfo;

    const userData = UsersDto.formatUserToJson(userInfo);

    userData.quizData = FilterQuizDto.filterQuizArray(existQuizData);
    return userData;
  }

  static async deleteById(id) {
    await UsersModel.getOneOrFaile(id);

    return UsersModel.deleteById(id);
  }
}
