// NPM Modules
import mongoose from 'mongoose';
import mongooseHidden from 'mongoose-hidden';
import mongooseToJson from '@meanie/mongoose-to-json';

const defaultHidden = {
  index: true,
  __v: true,
  createdAt: true,
  updatedAt: true
};

const hiddenSchema = mongooseHidden({ defaultHidden });

const AnswersSchema = new mongoose.Schema({
  title: { type: String, required: true },
  right: { type: Boolean, required: true, default: false }
}, { timestamps: true, toObject: true, toJSON: true });

AnswersSchema.plugin(hiddenSchema);
AnswersSchema.plugin(mongooseToJson);

export default AnswersSchema;
