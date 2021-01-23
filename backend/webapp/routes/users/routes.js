const {
    registerUserApi
} = require('./api');

const {
    registerUserSchema
} = require('./schema');

const {
    schemaValidationMiddleware
} = require('../../middleware/validationMiddlewares');

const {
    apiForwardMiddleware
} = require('../../middleware/apiForwardMiddleware');

const userRouter = require('express').Router();

userRouter.post('/register', schemaValidationMiddleware(registerUserSchema), apiForwardMiddleware(registerUserApi));

module.exports = userRouter;
