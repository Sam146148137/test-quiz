import { StatisticsSchema } from './schemes';
import ValidatorUtil from './util/validator.util';

class StatisticsValidation {
  static bestAnswersArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, StatisticsSchema.bestAnswersSchema, next);
  }
}

export default StatisticsValidation;
