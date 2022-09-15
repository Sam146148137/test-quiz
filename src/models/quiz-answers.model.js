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

  getByIdAndUserId(quizId, userId) {
    return this.model.findOne({ quizId, userId });
  }

  getById(_id) {
    return this.model.find({ userId: _id });
  }

  getByUserId(userId) {
    return this.model.find({ userId })
      .populate('user')
      .populate('quiz');
  }

  updateByQuizIdUserId(quizId, userId, payload) {
    const query = {
      quizId,
      userId
    };
    const options = {
      runValidators: true,
      new: true,
      upsert: true
    };
    return this.model.findOneAndUpdate(query, payload, options);
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

  list(quizId, params) {
    const {
      gender,
      score
    } = params;

    // Filter
    const query = {
      $expr: { $eq: ['$quizId', { $toObjectId: quizId }] }
    };

    if (gender?.length) {
      query.$or = gender.map((g) => ({ 'answerUsers.gender': g }));
    }

    // Sort
    const sort = {};
    if (score) {
      sort.score = score;
    } else {
      sort.score = 1;
    }

    return this.model
      .aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'answerUsers'
          }
        },
        {
          $unwind: {
            path: '$answerUsers'
          }
        },
        {
          $sort: sort
        },
        {
          $project: {
            _id: 0,
            createdAt: 1,
            quizId: 1,
            userId: 1,
            score: 1,
            createdAtMonth: {
              $month: '$createdAt'
            },
            'answerUsers.firstName': 1,
            'answerUsers.lastName': 1,
            'answerUsers.age': 1,
            'answerUsers.gender': 1,
            'answerUsers.email': 1
          }
        },
        {
          $match: {
            $and: [
              query
            ]
          }
        }
      ]);
  }
}

const model = mongoose.model('QuizAnswers', QuizAnswersSchema);

export default new QuizAnswersModel(model);
