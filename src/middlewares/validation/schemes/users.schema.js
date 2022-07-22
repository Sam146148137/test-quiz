// NPM Modules
import Joi from 'joi';
import { ID, limit, offset } from './type';

const UsersSchema = {
  signupSchema: {
    body: Joi.object({
      firstName: Joi.string().min(1).required(),
      lastName: Joi.string().min(1).required(),
      age: Joi.number().min(2).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(7).required()
    })
  },

  addSchema: {
    body: Joi.object({
      firstName: Joi.string().min(1).required(),
      lastName: Joi.string().min(1).required(),
      age: Joi.number().min(2).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(7).required(),
      role: Joi.string().valid('member', 'admin').required()
    })
  },

  listSchema: {
    query: Joi.object({
      limit,
      offset
    })
  },

  getSchema: {
    params: Joi.object({ id: ID.required() })
  },

  deleteSchema: {
    params: Joi.object({ id: ID.required() })
  }
};

export default UsersSchema;
