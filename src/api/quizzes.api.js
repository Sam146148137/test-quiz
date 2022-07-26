// NPM Modules
import express from 'express';

// Local Modules
import AuthMiddlaware from '../auth/auth.middlware';
import role from '../enum/role.enum';
import { QuizzesvalidationMiddleware } from '../middlewares/validation';
import { QuizzesController } from '../controller';
import { ImageUploadMiddleware } from '../middlewares/image-upload.middleware';

const router = express.Router();

router.post('/',
  AuthMiddlaware.authenticateFor([role.admin]),
  ImageUploadMiddleware.upload(),
  QuizzesvalidationMiddleware.validateAddArgs,
  QuizzesController.add);

router.put('/:id',
  AuthMiddlaware.authenticateFor([role.admin]),
  QuizzesvalidationMiddleware.validateUpdateArgs,
  QuizzesController.updateById);

router.get('/:id',
  AuthMiddlaware.authenticateFor([role.admin, role.member]),
  QuizzesvalidationMiddleware.validateGetArgs,
  QuizzesController.getById);

router.get('/',
  QuizzesvalidationMiddleware.validateListArgs,
  QuizzesController.list);

export default router;
