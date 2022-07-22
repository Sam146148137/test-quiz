import { UsersSchema } from './schemes';
import ValidatorUtil from './util/validator.util';

class UsersValidation {
  static validateSignupArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, UsersSchema.signupSchema, next);
  }

  static validateAddArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, UsersSchema.addSchema, next);
  }

  static validateUpdateArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, UsersSchema.addSchema, next);
  }

  static validateListArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, UsersSchema.listSchema, next);
  }

  static validateGetArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, UsersSchema.getSchema, next);
  }

  static validateDeleteArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, UsersSchema.deleteSchema, next);
  }
}

export default UsersValidation;
