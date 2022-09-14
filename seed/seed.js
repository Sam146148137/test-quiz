// NPM Modules
import mongoose from 'mongoose';
import 'regenerator-runtime';

// Locals
import user from './data/users';
import questions from './data/questions';
import config from '../src/config/variables.config';
import { UsersModel, QuestionsModel, QuizzesModel } from '../src/models';

const { MONGODB, UPLOAD_IMAGES } = config;

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

const insertQuizzes = async () => {
  const { id } = await UsersModel.findByEmail(user.email);

  const firstQuizQuestionIds = await QuestionsModel.getQuestions({ title: 'firstQuiz' });
  const questionIds = firstQuizQuestionIds.map((q) => q.id);
  const firstQuizData = {
    userId: id,
    image: `${UPLOAD_IMAGES}/9e79c181-f93a-4b17-9790-5d4d7f115ab2.png`,
    title: 'ՀՀ ԱԺ ներկայիս շենքը',
    description: 'Ազգանին ժողով առաջին հարցաշար',
    status: 'active',
    questionIds
  };
  await QuizzesModel.create(firstQuizData);

  const secondQuizQuestionIds = await QuestionsModel.getQuestions({ title: 'secondQuiz' });
  const secondQuestionIds = secondQuizQuestionIds.map((q) => q.id);
  const secondQuizData = {
    userId: id,
    image: `${UPLOAD_IMAGES}/484292cd-8404-47c8-823a-ac06b129780b.png`,
    title: 'Պառլամենտ եվ պառլամենտարիզմ',
    description: 'Ազգանին ժողով երկրորդ հարցաշար',
    status: 'active',
    questionIds: secondQuestionIds
  };
  await QuizzesModel.create(secondQuizData);
};

const seed = async () => {
  console.log('Successfully connected!');

  try {
    await insertUsers();
    await insertQuestions();
    await insertQuizzes();
    console.log('Data is inserted ...');
  } catch (error) {
    console.log('error =>', error);
  }
};

mongoose.connect(MONGODB.URL, options).then(seed);
