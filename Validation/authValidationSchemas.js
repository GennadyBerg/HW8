const Joi = require("joi");

const signupSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const signinSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {signupSchema, signinSchema}