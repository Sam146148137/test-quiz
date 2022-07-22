import { QuestionsSchema } from './schemes';
import ValidatorUtil from './util/validator.util';

class QuestionsValidation {
  static validateAddArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, QuestionsSchema.addSchema, next);
  }

  static validateUpdateArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, QuestionsSchema.updateSchema, next);
  }

  static validateDeleteArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, QuestionsSchema.deleteSchema, next);
  }

  static validateListArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, QuestionsSchema.listSchema, next);
  }

  static validateGetArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, QuestionsSchema.getSchema, next);
  }
}

export default QuestionsValidation;
