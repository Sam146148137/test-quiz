// Npm Modules
import mongoose from 'mongoose';

// Local Modules
import { UsersSchema } from './schemes';
import BaseModel from './base.model';

class UsersModel extends BaseModel {
  findByEmail(email) {
    return this.model.findOne({ email });
  }

  findByActivationCode(activationCode) {
    return this.model.findOne({ activationCode });
  }

  list(limit, offset) {
    return this.model.find({}).skip(offset).limit(limit);
  }

  changePassword(email, password) {
    return this.model.findOneAndUpdate({ email },
      {
        password
      },
      {
        new: true
      });
  }
}

const model = mongoose.model('Users', UsersSchema);

export default new UsersModel(model);
