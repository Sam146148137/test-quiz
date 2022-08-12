// NPM Modules
import Joi from 'joi';
import { ID } from './type';

const StatisticsSchema = {
  getSchema: {
    params: Joi.object({ id: ID.required() })
  }
};

export default StatisticsSchema;
