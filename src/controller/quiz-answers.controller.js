import { QuizAnswersServices } from '../services';
import { SuccessHandlerUtil } from '../utils';

class QuizAnswersController {
  static async add(req, res, next) {
    try {
      const payload = req.body;

      const { user } = res.locals.auth;
      payload.userId = user.userId;
      const question = await QuizAnswersServices.add(payload);
      SuccessHandlerUtil.handleAdd(res, next, question);
    } catch (error) {
      next(error);
    }
  }
}

export default QuizAnswersController;
