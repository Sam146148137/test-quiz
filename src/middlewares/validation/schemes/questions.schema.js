// NPM Modules
import Joi from 'joi';

import {
  ID, Index, limit, offset
} from './type';

const QuestionsSchema = {
  addSchema: {
    body: Joi.object({
      title: Joi.string().min(1).max(255).required(),
      text: Joi.string().min(1).max(255).required(),
      answers: Joi.array().items(Joi.string().min(1).required())
        .unique()
        .min(2)
        .required(),
      rightAnswer: Index.max(Joi.ref('answers.length')).required(),
      grade: Joi.number().min(1).required()
    })
  },

  updateSchema: {
    params: Joi.object({ id: ID.required() }),
    body: Joi.object({
      title: Joi.string().min(1).max(255),
      text: Joi.string().min(1).max(255),
      answers: Joi.array().items(Joi.string().min(1).required())
        .unique()
        .min(2),
      rightAnswer: Index.max(Joi.ref('answers.length')),
      grade: Joi.number().min(1)
    }).or('title',
      'text',
      'answers',
      'rightAnswer',
      'grade')
  },

  getSchema: {
    params: Joi.object({ id: ID.required() })
  },

  listSchema: {
    query: Joi.object({
      limit,
      offset
    })
  },

  deleteSchema: {
    params: Joi.object({ id: ID.required() })
  }
};

export default QuestionsSchema;
