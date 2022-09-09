import { QuizAnswersServices } from '../services';
import { SuccessHandlerUtil } from '../utils';

class QuizAnswersController {
  static async add(req, res, next) {
    try {
      const payload = req.body;

      const { user } = res.locals.auth;
      payload.userId = user.userId;
      const question = await QuizAnswersServices.add(payload);
      if (question.success === false) {
        SuccessHandlerUtil._sendResponse(res, 400, {
          message: 'You have already answered the quiz twice this month'
        });
      } else {
        SuccessHandlerUtil.handleGet(res, next, question);
      }
    } catch (error) {
      next(error);
    }
  }
}

export default QuizAnswersController;
