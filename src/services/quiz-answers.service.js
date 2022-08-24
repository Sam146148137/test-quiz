// NPM Modules
import _ from 'lodash';

import { QuizzesModel, QuizAnswersModel } from '../models';
import { ErrorsUtil } from '../utils';

const { ResourceNotFoundError } = ErrorsUtil;

class QuizAnswersServices {
  static async add(payload) {
    const { quizId, answers } = payload;

    await QuizzesModel.getOneOrFaile(quizId);

    const { questions } = await QuizzesModel.getDetailedById(quizId);

    if (answers.length !== questions.length) {
      throw new ResourceNotFoundError('Answers count is not correct');
    }

    let score = 0;
    const questionIds = [];

    answers.forEach((a) => {
      _.find(questions, (q) => {
        if (a.questionId === q.id) {
          a.right = false;
          _.find(q.answers, (ans) => {
            if (a.answer === ans.id && ans.right === true) {
              score += q.grade;
              a.right = true;
            }
          });
        }
      });
      questionIds.push(a.questionId);
    });

    payload.answers = answers;
    payload.questionIds = questionIds;
    payload.score = score;

    return QuizAnswersModel.create(payload);
  }
}

export default QuizAnswersServices;
