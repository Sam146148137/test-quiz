// Local Modules
import { QuizzesServices } from '../services';
import { SuccessHandlerUtil, ErrorsUtil } from '../utils';
import config from '../config/variables.config';

class QuizzesController {
  static async add(req, res, next) {
    try {
      const payload = req.body;
      const { user } = res.locals.auth;
      payload.userId = user.userId;

      const { file } = req;
      if (file === undefined) throw new ErrorsUtil.InputValidationError('No Images Found...');
      payload.image = `${config.UPLOAD_IMAGES}/${file.filename}`;

      const quiz = await QuizzesServices.add(payload);
      SuccessHandlerUtil.handleAdd(res, next, quiz);
    } catch (error) {
      next(error);
    }
  }

  static async updateById(req, res, next) {
    try {
      const update = req.body;
      const { id } = req.params;
      const { userId } = res.locals.auth.user;
      update.userId = userId;

      const quiz = await QuizzesServices.updateById(id, update);
      SuccessHandlerUtil.handleUpdate(res, next, quiz);
    } catch (error) {
      next(error);
    }
  }

  static async list(req, res, next) {
    try {
      const { limit, offset } = req.query;

      const quizzes = await QuizzesServices.list(limit, offset);
      SuccessHandlerUtil.handleList(res, next, quizzes);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const { userId } = res.locals.auth.user;

      const quiz = await QuizzesServices.getById(id, userId);
      if (quiz?.success === false) {
        SuccessHandlerUtil._sendResponse(res, 400, {
          message: 'You have already answered the quiz twice this month'
        });
      } else {
        SuccessHandlerUtil.handleGet(res, next, quiz);
      }
    } catch (error) {
      next(error);
    }
  }
}

export default QuizzesController;
