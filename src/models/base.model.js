import { Error } from 'mongoose';

const { DocumentNotFoundError } = Error;

class BaseModel {
  constructor(model) {
    this.model = model;
  }

  get() {
    return this.model.find({});
  }

  create(payload) {
    return this.model.create(payload);
  }

  updateById(_id, update) {
    const query = { _id };
    const options = { runValidators: true, useFindAndModify: false, new: true };
    return this.model.findOneAndUpdate(query, update, options);
  }

  updateByQuizIdUserId(_id, update) {
    const query = { _id };
    const options = { runValidators: true, new: true, upsert: true }; // upsert: true
    return this.model.findOneAndUpdate(query, update, options);
  }

  getById(_id) {
    return this.model.findOne({ _id });
  }

  getOneOrFaile(_id) {
    return this.getById(_id).then((doc) => {
      if (!doc) throw new DocumentNotFoundError();
      return doc;
    });
  }

  deleteById(_id) {
    return this.model.deleteOne({ _id });
  }
}

export default BaseModel;
