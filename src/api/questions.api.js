// NPM Modules
import express from 'express';

// Local Modles
import { QuestionsValidationMiddleware } from '../middlewares/validation';
import { QuestionsController } from '../controller';
import AuthMiddlaware from '../auth/auth.middlware';
import role from '../enum/role.enum';

const router = express.Router();

router.post('/',
  AuthMiddlaware.authenticateFor([role.admin]),
  QuestionsValidationMiddleware.validateAddArgs,
  QuestionsController.add);

router.put('/:id',
  AuthMiddlaware.authenticateFor([role.admin]),
  QuestionsValidationMiddleware.validateUpdateArgs,
  QuestionsController.updateById);

router.get('/:id',
  AuthMiddlaware.authenticateFor([role.admin]),
  QuestionsValidationMiddleware.validateGetArgs,
  QuestionsController.getById);

router.delete('/:id',
  AuthMiddlaware.authenticateFor([role.admin]),
  QuestionsValidationMiddleware.validateDeleteArgs,
  QuestionsController.deleteById);

export default router;
