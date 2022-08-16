// NPM Modules
import express from 'express';

// Local Modules
import AuthMiddlaware from '../auth/auth.middlware';
import role from '../enum/role.enum';
import { StatisticsValidationMiddleware } from '../middlewares/validation';
import { StatisticsController } from '../controller';

const router = express.Router();

router.get('/:id',
  AuthMiddlaware.authenticateFor([role.admin]),
  StatisticsValidationMiddleware.bestAnswersArgs,
  StatisticsController.bestAnswers);

export default router;
