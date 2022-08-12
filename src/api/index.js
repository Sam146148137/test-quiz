import express from 'express';

import auth from './auth.api';
import users from './users.api';
import questions from './questions.api';
import quizzes from './quizzes.api';
import quizAnswers from './quiz-answers.api';
import statistics from './statistics.api';

const app = express();

// API
app.use('/auth', auth);
app.use('/users', users);
app.use('/questions', questions);
app.use('/quizzes', quizzes);
app.use('/quiz-answers', quizAnswers);
app.use('/statistics', statistics);

export default app;
