const Joi = require("joi");

const registerUserSchema = Joi.object({
  username: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(2).max(100).required(),
  description: Joi.string().max(400),
});

const loginUserSchema = Joi.object({
  authorization: Joi.string().required().min(1).max(100),
}).unknown(true);

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const isAuthenticSchema = Joi.object({
  authorization: Joi.string().required().min(1),
}).unknown(true);

const changePasswordSchema = Joi.object({
  token: Joi.string().required().min(1).max(100),
  password: Joi.string().required().min(1).max(100),
});

const followSchema = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = {
  registerUserSchema,
  loginUserSchema,
  forgotPasswordSchema,
  isAuthenticSchema,
  changePasswordSchema,
  followSchema,
};
