// NPM Modules
import express from 'express';

import AuthController from '../auth/auth.controller';
import { AuthValidationMiddleware } from '../middlewares/validation';

const router = express.Router();

router.post('/login',
  AuthValidationMiddleware.validateLoginArgs,
  AuthController.login);

export default router;
