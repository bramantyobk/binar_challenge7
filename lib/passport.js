const passport = require('passport')
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const {User} = require('../models')

const options = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: "psst jangan bilang ke orang lain"
}

/* Authentication Function */
const authenticate = async (payload, done) => {
  try {
    const user = await User.findByPk(payload.id);
    return done(null, user)
  } catch (err) {
    return done(null, false, {message: err.message})
  }
}

passport.use(new JwtStrategy(options, authenticate));

module.exports = passport;