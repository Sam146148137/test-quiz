// NPM modules
import Joi from 'joi';

const AuthSchema = {
  loginSchema: {
    body: Joi.object({
      password: Joi.string().min(7).required(),
      email: Joi.string().email().required()
    })
  }
};

export default AuthSchema;
