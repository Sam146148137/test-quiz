// Local Modules
import { StatisticsServices } from '../services';
import { SuccessHandlerUtil } from '../utils';

class StatisticsController {
  static async getById(req, res, next) {
    try {
      const { id } = req.params;

      const statistic = await StatisticsServices.getById(id);

      SuccessHandlerUtil.handleGet(res, next, statistic);
    } catch (error) {
      next(error);
    }
  }
}

export default StatisticsController;
