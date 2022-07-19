import express from 'express';

import auth from './auth.api';
import users from './users.api';
import questions from './questions.api';

const app = express();

// API
app.use('/auth', auth);
app.use('/users', users);
app.use('/questions', questions);

export default app;
