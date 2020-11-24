const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const Pro = require('../models/Pro')
require('dotenv').config();


const jwtPublicSecret = process.env.JWT_PUBLIC_SECRET

const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  
  return token;
};

const options = {
  secretOrKey: jwtPublicSecret,
  algorithms: ['RS256'],
  passReqToCallback: true,
};

options.jwtFromRequest = ExtractJwt.fromExtractors([
  ExtractJwt.fromAuthHeaderAsBearerToken(),
  req => cookieExtractor(req),
]);

passport.use(
  new Strategy(options, (req, jwtPayload, done) => {
    Pro.findOne({ _id: jwtPayload.id })
      .then(user => {
        if (user) {
          delete user._doc.password;
          done(null, user);
        } else {
          done(null, false);
        }
      })
      .catch(err => {
        if (err) {
          return done(err, false);
        }
      });
  }),
);

module.exports = passport;