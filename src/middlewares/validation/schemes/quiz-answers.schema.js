// NPM  Modules
import Joi from 'joi';

import {
  ID, Index
} from './type';

const QuizAnswersSchema = {
  addSchema: {
    body: Joi.object({
      quizId: ID.required(),
      answers: Joi.array().items(Joi.object({
        questionId: ID.required(), answer: Index.required()
      }).required())
        .unique()
        .min(1)
        .required()
    })
  }
};

export default QuizAnswersSchema;
