// NPM Modules
import Joi from 'joi';
import { ID } from './type';

const StatisticsSchema = {
  bestAnswersSchema: {
    params: Joi.object({ id: ID.required() })
  }
};

export default StatisticsSchema;
