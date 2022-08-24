// NPM Modules
import _ from 'lodash';

import { QuizzesModel, QuizAnswersModel } from '../models';
import { ErrorsUtil } from '../utils';

const { ResourceNotFoundError } = ErrorsUtil;

class QuizAnswersServices {
  static async add(payload) {
    const { quizId, userId, answers } = payload;

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
            if (ans.right === true) {
              a.rightAnswer = ans.id;
              if (a.answer === ans.id) {
                score += q.grade;
                a.right = true;
              }
            }
          });
        }
      });
      questionIds.push(a.questionId);
    });

    payload.answers = answers;
    payload.questionIds = questionIds;
    payload.score = score;

    // if user already answered in this quiz, it will not save in db, but return response to user
    const existAnswer = await QuizAnswersModel.getByIdAndUserId(quizId, userId);
    if (existAnswer) return payload;

    return QuizAnswersModel.create(payload);
  }
}

export default QuizAnswersServices;
