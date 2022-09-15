// NPM  Modules
import Joi from 'joi';

import { ID } from './type';
import gender from '../../../enum/gender.enum';

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
      gender: Joi.array().items(Joi.string().valid(...Object.values(gender))),
      score: Joi.number()
    })
  }
};

export default QuizAnswersSchema;
