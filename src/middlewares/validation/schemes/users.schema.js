// NPM Modules
import Joi from 'joi';
import { ID, limit, offset } from './type';
import role from '../../../enum/role.enum';

const UsersSchema = {
  signupSchema: {
    body: Joi.object({
      firstName: Joi.string().min(1).required(),
      lastName: Joi.string().min(1).required(),
      gender: Joi.string().valid('male', 'female', 'other').required(),
      age: Joi.number().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(7).required(),
      activationCode: Joi.string().min(6).max(6),
      phone: Joi.string().trim().min(12).max(12)
        .pattern(/^\+374\d+$/)
    })
  },

  emailSchema: {
    body: Joi.object({
      email: Joi.string().email().required()
    })
  },

  changePassSchema: {
    body: Joi.object({
      password: Joi.string().min(7).required()
    })
  },

  activationCodeSchema: {
    body: Joi.object({
      activationCode: Joi.string().min(6).max(6)
    })
  },

  addSchema: {
    body: Joi.object({
      firstName: Joi.string().min(1).required(),
      lastName: Joi.string().min(1).required(),
      age: Joi.number().min(2).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(7).required(),
      role: Joi.string().valid(...Object.values(role)).required()
    })
  },

  updateSchema: {
    params: Joi.object({ id: ID.required() }),
    body: Joi.object({
      firstName: Joi.string().min(1),
      lastName: Joi.string().min(1),
      age: Joi.number().min(2),
      email: Joi.string().email(),
      password: Joi.string().min(7),
      role: Joi.string().valid(...Object.values(role))
    }).or('firstName',
      'lastName',
      'age',
      'email',
      'password',
      'role')
  },

  updateMyProfileSchema: {
    body: Joi.object({
      firstName: Joi.string().min(1),
      lastName: Joi.string().min(1),
      age: Joi.number().min(2),
      email: Joi.string().email(),
      password: Joi.string().min(7)
    }).or('firstName',
      'lastName',
      'age',
      'email',
      'password')
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
