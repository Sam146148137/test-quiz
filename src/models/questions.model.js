// NPM Models
import mongoose from 'mongoose';

// Local Models
import { QuestionsSchema } from './schemes';
import BaseModel from './base.model';

class QuestionsModel extends BaseModel {

}

const model = mongoose.model('Questions', QuestionsSchema);

export default new QuestionsModel(model);
