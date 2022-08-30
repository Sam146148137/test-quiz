// NPM Modules
import express from 'express';

// Local Modules
import { UsersValidationMiddleware } from '../middlewares/validation';
import { UsersController } from '../controller';
import AuthMiddleware from '../auth/auth.middlware';
import role from '../enum/role.enum';

const router = express.Router();

router.post('/forgotPassword',
  UsersValidationMiddleware.validateArg,
  UsersController.forgotPassword);

router.post('/activationCode',
  UsersValidationMiddleware.validateActivationCodeArg,
  UsersController.activationCode);

router.post('/newPassword',
  AuthMiddleware.authenticateFor([role.admin, role.member]),
  UsersValidationMiddleware.validatePasswordArg,
  UsersController.changePassword);

router.post('/email',
  UsersValidationMiddleware.validateArg,
  UsersController.emailExist);

router.get('/facebook', UsersController.facebookSignup);

router.get('/google', UsersController.signupGoogle);

router.post('/',
  UsersValidationMiddleware.validateSignupArgs,
  UsersController.signup);

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
