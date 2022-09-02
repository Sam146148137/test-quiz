import { UsersSchema } from './schemes';
import ValidatorUtil from './util/validator.util';

class UsersValidation {
  static validateSignupArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, UsersSchema.signupSchema, next);
  }

  static validateArg(req, res, next) {
    ValidatorUtil.validateArgs(req, UsersSchema.emailSchema, next);
  }

  static validatePasswordArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, UsersSchema.passwordsSchema, next);
  }

  static validatePasswordArg(req, res, next) {
    ValidatorUtil.validateArgs(req, UsersSchema.changePassSchema, next);
  }

  static validateActivationCodeArg(req, res, next) {
    ValidatorUtil.validateArgs(req, UsersSchema.activationCodeSchema, next);
  }

  static validateAddArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, UsersSchema.addSchema, next);
  }

  static validateUpdateArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, UsersSchema.updateSchema, next);
  }

  static validateUpdateMyProfileArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, UsersSchema.updateMyProfileSchema, next);
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
