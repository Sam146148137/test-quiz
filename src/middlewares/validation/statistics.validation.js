import { StatisticsSchema } from './schemes';
import ValidatorUtil from './util/validator.util';

class StatisticsValidation {
  static validateGetArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, StatisticsSchema.getSchema, next);
  }
}

export default StatisticsValidation;
