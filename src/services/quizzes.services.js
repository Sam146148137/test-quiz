// Local Modules
import { QuizAnswersModel, QuizzesModel } from '../models';

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

  static list(limit, offset) {
    return QuizzesModel.list(limit, offset);
  }
}

export default QuizzesServices;
