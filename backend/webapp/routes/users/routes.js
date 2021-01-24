const {
  registerUserApi,
  loginUserApi,
  forgotPasswordApi,
  isAuthenticApi,
  changePasswordApi,
  followApi,
} = require("./api");

const {
  registerUserSchema,
  loginUserSchema,
  forgotPasswordSchema,
  isAuthenticSchema,
  changePasswordSchema,
  followSchema,
} = require("./schema");

const {
  schemaValidationMiddleware,
  headerValidationMiddleware,
  basicAuthorizationMiddleware,
  jwtAuthorizationMiddleware,
} = require("../../middleware/validationMiddlewares");

const {
  apiForwardMiddleware,
} = require("../../middleware/apiForwardMiddleware");

const userRouter = require("express").Router();

userRouter.post(
  "/register",
  schemaValidationMiddleware(registerUserSchema),
  apiForwardMiddleware(registerUserApi)
);

userRouter.post(
  "/login",
  headerValidationMiddleware(loginUserSchema),
  basicAuthorizationMiddleware,
  apiForwardMiddleware(loginUserApi)
);

userRouter.post(
  "/forgotPassword",
  schemaValidationMiddleware(forgotPasswordSchema),
  apiForwardMiddleware(forgotPasswordApi)
);

userRouter.post(
  "/isAuthentic",
  headerValidationMiddleware(isAuthenticSchema),
  jwtAuthorizationMiddleware,
  apiForwardMiddleware(isAuthenticApi)
);

userRouter.post(
  "/changePassword",
  schemaValidationMiddleware(changePasswordSchema),
  apiForwardMiddleware(changePasswordApi)
);

userRouter.post(
  "/follow",
  schemaValidationMiddleware(followSchema),
  apiForwardMiddleware(followApi)
);

module.exports = userRouter;
