// NPM Modules
import express from 'express';

// Local Modules
import AuthMiddlaware from '../auth/auth.middlware';
import role from '../enum/role.enum';
import { QuizAnswersValidation } from '../middlewares/validation';
import { QuizAnswersController } from '../controller';

const router = express.Router();

router.post('/',
  AuthMiddlaware.authenticateFor([role.admin, role.member]),
  QuizAnswersValidation.validateAddArgs,
  QuizAnswersController.add);

router.get('/:quizId',
  AuthMiddlaware.authenticateFor([role.admin]),
  QuizAnswersValidation.validateListArgs,
  QuizAnswersController.list);
export default router;
