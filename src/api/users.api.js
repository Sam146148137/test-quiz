// NPM Modules
import express from 'express';

// Local Modules
import { UsersValidationMiddleware } from '../middlewares/validation';
import { UsersController } from '../controller';
import AuthMiddleware from '../auth/auth.middlware';
import role from '../enum/role.enum';

const router = express.Router();

router.post('/',
  UsersValidationMiddleware.validateSignupArgs,
  UsersController.signup);

router.get('/facebook', UsersController.facebookSignup);

router.post('/add',
  AuthMiddleware.authenticateFor([role.admin]),
  UsersValidationMiddleware.validateAddArgs,
  UsersController.add);

router.put('/editMyProfile',
  AuthMiddleware.authenticateFor([role.member]),
  UsersValidationMiddleware.validateUpdateMyProfileArgs,
  UsersController.editMyProfile);

router.put('/:id',
  AuthMiddleware.authenticateFor([role.admin]),
  UsersValidationMiddleware.validateUpdateArgs,
  UsersController.updateById);

router.get('/',
  AuthMiddleware.authenticateFor([role.admin]),
  UsersValidationMiddleware.validateListArgs,
  UsersController.list);

router.get('/myProfile',
  AuthMiddleware.authenticateFor([role.member]),
  UsersController.myProfile);

router.get('/:id',
  AuthMiddleware.authenticateFor([role.admin]),
  UsersValidationMiddleware.validateGetArgs,
  UsersController.getById);

router.delete('/:id',
  AuthMiddleware.authenticateFor([role.admin]),
  UsersValidationMiddleware.validateDeleteArgs,
  UsersController.deleteById);

export default router;
