// NPM Modules
import mongoose from 'mongoose';
import 'regenerator-runtime';

// Locals
import user from '../data/users';
import questions from '../data/questions';
import config from '../../src/config/variables.config';
import { UsersModel, QuestionsModel } from '../../src/models';

const { MONGODB } = config;

const options = {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const insertUsers = async () => {
  await UsersModel.create(user);
};

const insertQuestions = async () => {
  const { id } = await UsersModel.findByEmail(user.email);

  const questionsUserId = questions.map((q) => ({
    ...q,
    userId: id
  }));

  await QuestionsModel.create(questionsUserId);
};

const seed = async (db) => {
  console.log('Successfully connected!');

  try {
    // Clear all collections
    Object.values(db.models).forEach(async (model) => {
      await model.deleteMany({});
    });

    // Insert data
    await insertUsers();
    await insertQuestions();
  } catch (error) {
    console.log('error =>', error);
  }
};

mongoose.connect(MONGODB.URL, options).then(async (db) => {
  await seed(db);
});
