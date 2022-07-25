// Npm Modules
import mongoose from 'mongoose';

// Local Modules
import { UsersSchema } from './schemes';
import BaseModel from './base.model';

class UsersModel extends BaseModel {
  findByEmail(email) {
    return this.model.findOne({ email });
  }

  list(limit, offset) {
    return this.model.find({}).skip(offset).limit(limit);
  }
}

const model = mongoose.model('Users', UsersSchema);

export default new UsersModel(model);
