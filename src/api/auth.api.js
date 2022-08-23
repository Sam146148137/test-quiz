// NPM Modules
import express from 'express';

import AuthController from '../auth/auth.controller';
import { AuthValidationMiddleware } from '../middlewares/validation';
import passport from '../middlewares/facebook.middleware';

const router = express.Router();

router.post('/login',
  AuthValidationMiddleware.validateLoginArgs,
  AuthController.login);

router.get('/facebook', passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/api/v1/users/facebook',
    failureRedirect: '/error'
  }));

export default router;
