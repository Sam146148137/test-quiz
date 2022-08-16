// NPM Models
import mongoose from 'mongoose';

// Local Models
import { QuizAnswersSchema } from './schemes';
import BaseModel from './base.model';

class QuizAnswersModel extends BaseModel {
  getDetailedById(id) {
    return this.model
      .find({ quizId: id })
      .populate('user');
  }

  bestAnswersById(id, top) {
    return this.model
      .aggregate()
      .match({ $expr: { $eq: ['$quizId', { $toObjectId: id }] } })
      .sort({ score: -1 })
      .lookup({
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'answerUsers'
      })
      .unwind('$answerUsers')
      .group({
        _id: {
          score: '$score'
        },
        groupUsers: { $push: '$answerUsers' },
        count: { $sum: 1 }
      })
      .limit(top);
  }
}

const model = mongoose.model('QuizAnswers', QuizAnswersSchema);

export default new QuizAnswersModel(model);
