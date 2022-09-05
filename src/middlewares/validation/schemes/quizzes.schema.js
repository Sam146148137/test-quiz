// NPM Modules
import Joi from 'joi';

import { ID, limit, offset } from './type';
import status from '../../../enum/status.enum';

const QuizzesScema = {
  addSchema: {
    body: Joi.object({
      title: Joi.string().min(1).max(255).required(),
      questionIds: Joi.array().items(ID.required())
        .unique()
        .min(1)
        .required(),
      description: Joi.string().min(1).max(255),
      status: Joi.string().valid(...Object.values(status)).default(status.passive),
      image: Joi.string()
    })
  },

  updateSchema: {
    body: Joi.object({
      title: Joi.string().min(1).max(255),
      questionIds: Joi.array().items(ID.required())
        .unique()
        .min(1),
      description: Joi.string().min(1).max(255),
      status: Joi.string().valid(...Object.values(status)).default(status.passive)
    }).or('title',
      'questionIds',
      'description',
      'status')
  },

  getSchema: {
    params: Joi.object({ id: ID.required() })
  },

  listScema: {
    query: Joi.object({
      limit,
      offset
    })
  }
};

export default QuizzesScema;
