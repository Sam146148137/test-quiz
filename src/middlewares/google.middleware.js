import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth2';

import config from '../config/variables.config';

const { GOOGLE } = config;

passport.use(new GoogleStrategy.Strategy({
  clientID: GOOGLE.GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE.GOOGLE_CLIENT_SECRET,
  // callbackURL: 'http://localhost:3030/api/v1/auth/google/callback'
  callbackURL: 'https://azgayinjoxov.herokuapp.com/api/v1/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => done(null, profile)));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
