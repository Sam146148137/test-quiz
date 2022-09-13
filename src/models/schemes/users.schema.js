// NPM Modules
import mongoose from 'mongoose';
import mongooseHidden from 'mongoose-hidden';
import mongooseToJson from '@meanie/mongoose-to-json';
import mongooseIdValidator from 'mongoose-id-validator';

// Local Modules
import role from '../../enum/role.enum';
import gender from '../../enum/gender.enum';

const defaultHidden = {
  index: true,
  __v: true,
  password: true,
  activationCode: true,
  // createdAt: true,
  updatedAt: true
};

const hiddenSchema = mongooseHidden({ defaultHidden });

const UsersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: {
    type: Number, required: true, min: 12, max: 99, default: 12
  },
  gender: { type: String, enum: Object.values(gender), default: gender.notSelected },
  role: { type: String, enum: Object.values(role), default: role.member },
  phone: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  activationCode: { type: String, min: 6, max: 6 }
}, { timestamps: true, toObject: true, toJSON: true });

UsersSchema.plugin(hiddenSchema);
UsersSchema.plugin(mongooseToJson);
UsersSchema.plugin(mongooseIdValidator);

export default UsersSchema;
