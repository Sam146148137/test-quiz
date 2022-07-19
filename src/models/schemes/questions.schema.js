// NPM Modules
import mongoose from 'mongoose';
import mongooseHidden from 'mongoose-hidden';
import mongooseToJson from '@meanie/mongoose-to-json';
import mongooseIdValidator from 'mongoose-id-validator';

const defaultHidden = {
  index: true,
  __v: true,
  createdAt: true,
  updatedAt: true
};

const hiddenSchema = mongooseHidden({ defaultHidden });
const { ObjectId } = mongoose.Schema.Types;

const QuestionsSchema = new mongoose.Schema({
  userId: { type: ObjectId, ref: 'Users', required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  answers: { type: Array, required: true },
  rightAnswer: { type: Number, required: true },
  grade: { type: Number, required: true }
}, { timestamps: true, toObject: true, toJSON: true });

QuestionsSchema.plugin(hiddenSchema);
QuestionsSchema.plugin(mongooseToJson);
QuestionsSchema.plugin(mongooseIdValidator);

export default QuestionsSchema;
