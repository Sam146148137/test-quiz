// Local Modules
import { QuizAnswersModel } from '../models';

class StatisticsServices {
  static async bestAnswers(id, top) {
    const bestAnswers = await QuizAnswersModel.bestAnswersById(id, top);

    return bestAnswers;
  }
}

export default StatisticsServices;
