// NPM Modules
import express from 'express';

// Local Modules
import { UsersValidationMiddleware } from '../middlewares/validation';
import UsersController from '../controller/users.controller';

const router = express.Router();

router.post('/',
  UsersValidationMiddleware.validateSignupArgs,
  UsersController.signup);

export default router;
