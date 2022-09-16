// NPM Modules
import express from 'express';
import generator from 'generate-password';

import passportGoogle from '../middlewares/google.middleware';
import passportFacebook from '../middlewares/facebook.middleware';
import AuthController from '../auth/auth.controller';
import { AuthValidationMiddleware } from '../middlewares/validation';
import { UsersServices } from '../services';
import { EmailUtil } from '../utils';
import AuthService from '../auth/auth.service';

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
  passportGoogle.authenticate('google', { failureRedirect: '/error' }),
  async (req, res) => {
  // Successful authentication, redirect success.

    const payload = {
      firstName: req.user.given_name,
      lastName: req.user.family_name,
      email: req.user.email,
      phone: '+37455055055',
      password: generator.generate({
        length: 10,
        numbers: true
      })
    };
    const { password } = payload;

    const alreadyRegisteredUser = await UsersServices.findByEmail(payload.email);
    if (!alreadyRegisteredUser) {
      await UsersServices.signup(payload);
      await EmailUtil.sendSuccessSignup(payload.email, password);
    }

    const loginUser = await AuthService.loginGoogle(payload.email);
    // res.redirect(`https://national-assembly-app.herokuapp.com/signup/${JSON.stringify(loginUser)}`);
    res.redirect(`http://localhost:8080/signup/${JSON.stringify(loginUser)}`);
  });

export default router;
