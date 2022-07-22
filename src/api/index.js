import express from 'express';

import auth from './auth.api';
import users from './users.api';
import questions from './questions.api';
import quizzes from './quizzes.api';

const app = express();

// API
app.use('/auth', auth);
app.use('/users', users);
app.use('/questions', questions);
app.use('/quizzes', quizzes);

export default app;
