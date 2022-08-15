// Local Modules
import { QuizAnswersModel } from '../models';

class StatisticsServices {
  static async bestAnswers(id) {
    const bestAnswers = await QuizAnswersModel.bestAnswersById(id);

    return bestAnswers;
  }
}

export default StatisticsServices;
