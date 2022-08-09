// NPM Modules
import mongoose from 'mongoose';
import mongooseHidden from 'mongoose-hidden';
import mongooseToJson from '@meanie/mongoose-to-json';
import mongooseIdValidator from 'mongoose-id-validator';

import { user, questions, quiz } from './virtuals';

const defaultHidden = {
  index: true,
  __v: true,
  createdAt: true,
  updatedAt: true
};

const hiddenSchema = mongooseHidden({ defaultHidden });
const { ObjectId, Mixed } = mongoose.Schema.Types;

const QuizAnswersSchema = new mongoose.Schema({
  userId: { type: ObjectId, ref: 'Users', required: true },
  quizId: { type: ObjectId, ref: 'Quizzes', required: true },
  questionIds: { type: Array, ref: 'Questions', required: true },
  answers: { type: Mixed, required: true },
  score: { type: Number, required: true }
});

QuizAnswersSchema.virtual('user', user);
QuizAnswersSchema.virtual('questions', questions);
QuizAnswersSchema.virtual('quiz', quiz);

QuizAnswersSchema.plugin(hiddenSchema);
QuizAnswersSchema.plugin(mongooseToJson);
QuizAnswersSchema.plugin(mongooseIdValidator);

export default QuizAnswersSchema;
