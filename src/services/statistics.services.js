// Local Modules
import { QuizAnswersModel } from '../models';

class StatisticsServices {
  static async getById(id) {
    const statistics = await QuizAnswersModel.getDetailedById(id);

    const statisticResult = [];
    statistics.forEach((statistic) => {
      statisticResult.push({
        firstname: statistic.user.firstName,
        lastname: statistic.user.lastName,
        score: statistic.score
      });
    });

    return statisticResult;
  }
}

export default StatisticsServices;
