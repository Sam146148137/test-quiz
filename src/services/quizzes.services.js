// Local Modules
import { QuizAnswersModel, QuizzesModel } from '../models';
import { ErrorsUtil } from '../utils';

// const { ResourceNotFoundError } = ErrorsUtil;

class QuizzesServices {
  static add(payload) {
    return QuizzesModel.create(payload);
  }

  static async updateById(id, update) {
    await QuizzesModel.getOneOrFaile(id);

    return QuizzesModel.updateById(id, update);
  }

  static async getById(id, userId) {
    const quizAnswer = await QuizAnswersModel.getByIdAndUserId(id, userId);
    if (quizAnswer.count === 2) {
      throw new ErrorsUtil.PermissionError('You have already answered the quiz twice this month');
    }
    return QuizzesModel.getDetailedById(id);
  }

  static list(limit, offset) {
    return QuizzesModel.list(limit, offset);
  }
}

export default QuizzesServices;
