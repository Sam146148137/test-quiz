// Local Modules
import { QuizzesScema } from './schemes';
import ValidatorUtil from './util/validator.util';

class QuizzesValidation {
  static validateAddArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, QuizzesScema.addSchema, next);
  }

  static validateUpdateArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, QuizzesScema.updateSchema, next);
  }

  static validateListArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, QuizzesScema.listScema, next);
  }

  static validateGetArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, QuizzesScema.getSchema, next);
  }
}

export default QuizzesValidation;
