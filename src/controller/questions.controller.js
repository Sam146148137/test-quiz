import { QuestionsServices } from '../services';
import { SuccessHandlerUtil } from '../utils';

class QuestionsController {
  static async add(req, res, next) {
    try {
      const payload = req.body;

      const { user } = res.locals.auth;
      payload.userId = user.userId;
      const question = await QuestionsServices.add(payload);
      SuccessHandlerUtil.handleAdd(res, next, question);
    } catch (error) {
      next(error);
    }
  }

  static async updateById(req, res, next) {
    try {
      const { id } = req.params;
      const { userId } = res.locals.auth.user;
      const update = req.body;
      update.userId = userId;

      const question = await QuestionsServices.updateById(id, update);
      SuccessHandlerUtil.handleUpdate(res, next, question);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;

      const question = await QuestionsServices.getById(id);

      SuccessHandlerUtil.handleGet(res, next, question);
    } catch (error) {
      next(error);
    }
  }

  static async deleteById(req, res, next) {
    try {
      const { id } = req.params;
      await QuestionsServices.deleteById(id);

      SuccessHandlerUtil.handleUpdate(res, next, { success: true });
    } catch (error) {
      next(error);
    }
  }
}

export default QuestionsController;
