// NPM Modules
import express from 'express';

import passportGoogle from '../middlewares/google.middleware';
import passportFacebook from '../middlewares/facebook.middleware';
import AuthController from '../auth/auth.controller';
import { AuthValidationMiddleware } from '../middlewares/validation';

const router = express.Router();

router.post('/login',
  AuthValidationMiddleware.validateLoginArgs,
  AuthController.login);

router.post('/refresh', AuthController.refresh);

router.get('/facebook', passportFacebook.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

router.get('/facebook/callback',
  passportFacebook.authenticate('facebook', {
    successRedirect: '/api/v1/users/facebook',
    failureRedirect: '/error'
  }));

router.get('/google',
  passportGoogle.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/error', successRedirect: '/api/v1/users/facebook' }));

export default router;
