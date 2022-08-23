import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import config from '../config/variables.config';

const { FACEBOOK } = config;

passport.use(new FacebookStrategy.Strategy({
  clientID: FACEBOOK.FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK.FACEBOOK_CLIENT_SECRET,
  callbackURL: 'https://azgayinjoxov.herokuapp.com/api/v1/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'email', 'name', 'birthday', 'gender']
},
((accessToken, refreshToken, profile, done) => {
  done(null, profile);
})));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
