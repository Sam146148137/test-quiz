// NPM  Modules
import Joi from 'joi';

import { ID } from './type';
import QuizAnswersSort from '../../../enum/quiz-answers.sort';

const QuizAnswersSchema = {
  addSchema: {
    body: Joi.object({
      quizId: ID.required(),
      answers: Joi.array().items(Joi.object({
        questionId: ID.required(), answer: ID.required()
      }).required())
        .unique()
        .min(1)
        .required()
    })
  },

  listScema: {
    params: Joi.object({ quizId: ID.required() }),
    query: Joi.object({
      search: Joi.string().min(1).max(20),
      sortBy: Joi.string()
        .valid(...Object.values(QuizAnswersSort))
        .default(QuizAnswersSort.DEFAULT),
      sortType: Joi.string().valid('1', '-1').default('1')
      // gender: Joi.array().items(Joi.string().valid(...Object.values(gender))),
      // score: Joi.number()
    })
  }
};

export default QuizAnswersSchema;
