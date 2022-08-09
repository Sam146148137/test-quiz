// NPM Modules
import _ from 'lodash';

import { QuizzesModel, QuizAnswersModel } from '../models';
import { ErrorsUtil } from '../utils';

const { ResourceNotFoundError } = ErrorsUtil;

class QuizAnswersServices {
  static async add(payload) {
    const { quizId, answers } = payload;

    const { questions } = await QuizzesModel.getDetailedById(quizId);

    if (answers.length !== questions.length) {
      throw new ResourceNotFoundError('Answers count is not correct');
    }

    let score = 0;
    const questionIds = [];

    answers.forEach((a) => {
      _.find(questions, (q) => {
        if (a.questionId === q.id && a.answer === q.rightAnswer) {
          score += q.grade;
          questionIds.push(q.id);
        }
        return a.questionId;
      });
    });

    payload.questionIds = questionIds;
    payload.score = score;

    return QuizAnswersModel.create(payload);
  }
}

export default QuizAnswersServices;
