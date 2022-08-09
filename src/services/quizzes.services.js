// Local Modules
import { QuizzesModel } from '../models';

class QuizzesServices {
  static add(payload) {
    return QuizzesModel.create(payload);
  }

  static async updateById(id, update) {
    await QuizzesModel.getOneOrFaile(id);

    return QuizzesModel.updateById(id, update);
  }

  static getById(id) {
    return QuizzesModel.getDetailedById(id);
  }

  static list(limit, offset) {
    return QuizzesModel.list(limit, offset);
  }
}

export default QuizzesServices;
