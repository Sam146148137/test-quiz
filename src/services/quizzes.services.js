// Local Modules
import { QuizzesModel } from '../models';

class QuizzesServices {
  static add(payload) {
    return QuizzesModel.create(payload);
  }

  static list(limit, offset) {
    return QuizzesModel.list(limit, offset);
  }

  static getById(id) {
    return QuizzesModel.getById(id);
  }
}

export default QuizzesServices;
