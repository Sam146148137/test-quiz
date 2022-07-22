// NPM Modules
import mongoose from 'mongoose';

// Local Models
import { QuizzesScema } from './schemes';
import BaseModel from './base.model';

class QuizzesModel extends BaseModel {
  list(limit, offset) {
    return this.model
      .find({})
      .populate('user')
    //   .lean()
      .skip(offset)
      .limit(limit);
  }
}

const model = mongoose.model('Quizzes', QuizzesScema);

export default new QuizzesModel(model);
