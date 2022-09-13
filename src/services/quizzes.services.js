// Local Modules
import { QuizAnswersModel, QuizzesModel } from '../models';
import { FilterQuizDto } from '../dto';
import { ErrorsUtil } from '../utils';

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
    if (quizAnswer?.count === 2) {
      if (quizAnswer.updatedAt.getFullYear() === new Date().getFullYear()
        && quizAnswer.updatedAt.getMonth() === new Date().getMonth()) {
        quizAnswer.success = false;
        return quizAnswer;
      }
    }
    return QuizzesModel.getDetailedById(id);
  }

  static async list(limit, offset) {
    const quizzes = await QuizzesModel.list(limit, offset);

    if (!quizzes) throw new ErrorsUtil.Forbidden('Quizzes is not found');

    if (quizzes.length === 0) return quizzes;

    return FilterQuizDto.filterQuizList(quizzes);
  }
}

export default QuizzesServices;
