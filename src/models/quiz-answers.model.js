// NPM Models
import mongoose from 'mongoose';

// Local Models
import { QuizAnswersSchema } from './schemes';
import BaseModel from './base.model';

class QuizAnswersModel extends BaseModel {

}

const model = mongoose.model('QuizAnswers', QuizAnswersSchema);

export default new QuizAnswersModel(model);
