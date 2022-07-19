import { QuestionsModel } from '../models';

import { ErrorsUtil } from '../utils';

const { ResourceNotFoundError } = ErrorsUtil;

class QuestionsServices {
  static add(documentPayload) {
    return QuestionsModel.create(documentPayload);
  }

  static async updateById(id, update) {
    await QuestionsModel.getOneOrFaile(id);

    return QuestionsModel.updateById(id, update);
  }

  static async getById(id) {
    const question = await QuestionsModel.getById(id);
    if (!question) throw new ResourceNotFoundError();

    return question;
  }

  static async deleteById(id) {
    await QuestionsModel.getOneOrFaile(id);

    return QuestionsModel.deleteById(id);
  }
}

export default QuestionsServices;
