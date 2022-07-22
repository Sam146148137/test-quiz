// NPM Modules
import Joi from 'joi';

import { ID, limit, offset } from './type';
import status from '../../../enum/status.enum';

const QuizzesScema = {
  addSchema: {
    body: Joi.object({
      title: Joi.string().min(1).max(255).required(),
      questions: Joi.array().items(ID.required())
        .unique()
        .min(1)
        .required(),
      description: Joi.string().min(1).max(255),
      status: Joi.string().valid(...Object.values(status)).default(status.passive)
    })
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
