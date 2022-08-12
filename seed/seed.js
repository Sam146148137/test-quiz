// NPM Modules
import mongoose from 'mongoose';
import 'regenerator-runtime';

// Locals
import user from './data/users';
import questions from './data/questions';
import config from '../src/config/variables.config';
import { UsersModel, QuestionsModel } from '../src/models';

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

const seed = async () => {
  console.log('Successfully connected!');

  try {
    await insertUsers();
    await insertQuestions();
    console.log('Data is inserted ...');
  } catch (error) {
    console.log('error =>', error);
  }
};

mongoose.connect(MONGODB.URL, options).then(seed);
