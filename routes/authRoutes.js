const express = require('express');
const authRoutes = express.Router();
const authController = require('../controllers/authController');
const validator = require('../Validation/unifyValidator');
const { signupSchema, signinSchema } = require('../Validation/authValidationSchemas');
const { passport } = require('../middleware/passport-middleware');


authRoutes.post('/signup', validator(signupSchema), authController.signup);
authRoutes.post('/signin', validator(signinSchema), authController.signin);
authRoutes.post('/refresh-token', authController.refreshToken);

authRoutes.get('/me', passport.authenticate('jwt', { session: false }), authController.getMe);

module.exports = authRoutes;
