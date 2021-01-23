const Joi = require('joi');

const registerUserSchema = Joi.object({
    username: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(2).max(100).required(),
    description: Joi.string().max(400)
});

module.exports = {
    registerUserSchema
}