// Local Modules
import { StatisticsServices } from '../services';
import { SuccessHandlerUtil } from '../utils';

class StatisticsController {
  static async bestAnswers(req, res, next) {
    try {
      const { id } = req.params;

      const statistic = await StatisticsServices.bestAnswers(id, 5);
      SuccessHandlerUtil.handleGet(res, next, statistic);
    } catch (error) {
      next(error);
    }
  }
}

export default StatisticsController;
