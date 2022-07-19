// NPM Modules
import Joi from 'joi';

const UsersSchema = {
  signupSchema: {
    body: Joi.object({
      firstName: Joi.string().min(1).required(),
      lastName: Joi.string().min(1).required(),
      age: Joi.number().min(2).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(7).required()
    })
  }
};

export default UsersSchema;
