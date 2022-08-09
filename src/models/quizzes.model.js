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
      .populate('questions')
      .skip(offset)
      .limit(limit);
  }

  getDetailedById(_id) {
    return this.model
      .findOne({ _id })
      .populate('questions');
  }
}

const model = mongoose.model('Quizzes', QuizzesScema);

export default new QuizzesModel(model);
