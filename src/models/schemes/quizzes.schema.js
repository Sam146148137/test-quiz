// NPM Modules
import mongoose from 'mongoose';
import mongooseHidden from 'mongoose-hidden';
import mongooseToJson from '@meanie/mongoose-to-json';
import mongooseIdValidator from 'mongoose-id-validator';

import status from '../../enum/status.enum';

const defaultHidden = {
  index: true,
  __v: true,
  createdAt: true,
  updatedAt: true
};

const hiddenSchema = mongooseHidden({ defaultHidden });
const { ObjectId } = mongoose.Schema.Types;

const QuizzesScema = new mongoose.Schema({
  userId: { type: ObjectId, ref: 'Users', required: true },
  title: { type: String, required: true },
  questions: { type: Array, ref: 'Questions', required: true },
  description: { type: String },
  status: { type: String, enum: Object.values(status), default: status.passive }

});

// QuizzesScema.virtual('user', user);

QuizzesScema.plugin(hiddenSchema);
QuizzesScema.plugin(mongooseToJson);
QuizzesScema.plugin(mongooseIdValidator);

export default QuizzesScema;
