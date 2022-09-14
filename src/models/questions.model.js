// NPM Models
import mongoose from 'mongoose';

// Local Models
import { QuestionsSchema } from './schemes';
import BaseModel from './base.model';

class QuestionsModel extends BaseModel {
  list(limit, offset) {
    return this.model.find({}).skip(offset).limit(limit);
  }

  getQuestions(query) {
    return this.model.find(query);
  }
}

const model = mongoose.model('Questions', QuestionsSchema);

export default new QuestionsModel(model);
