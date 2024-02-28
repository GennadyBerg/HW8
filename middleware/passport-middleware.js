const { Strategy, ExtractJwt } = require('passport-jwt');
//import { jwtConfig } from '../config/jwt-config.js'
const config = require('../config.json');
const { findUser } = require('../controllers/authController.js');
const passport = require('passport');

const option = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.env.JWT_SECRET,
}

passport.use(
      new Strategy(option, async (payload, done) => {
            const { id, name } = payload
            try {
                  const user = findUser(id, name);
                  if (user) {
                        done(null, user)
                  } else {
                        done(null, false)
                  }
            } catch (e) {
                  console.log(e)
            }
      })
)

module.exports = { passport }