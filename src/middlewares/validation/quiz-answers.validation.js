import { QuizAnswersSchema } from './schemes';
import ValidatorUtil from './util/validator.util';

class QuizAnswersValidation {
  static validateAddArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, QuizAnswersSchema.addSchema, next);
  }
}

export default QuizAnswersValidation;
