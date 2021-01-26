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
const { URLS } = require("../../constants");

const userRouter = require("express").Router();

userRouter.post(
  URLS.ROUTES.USERS.REGISTER,
  schemaValidationMiddleware(registerUserSchema),
  apiForwardMiddleware(registerUserApi)
);

userRouter.post(
  URLS.ROUTES.USERS.LOGIN,
  headerValidationMiddleware(loginUserSchema),
  basicAuthorizationMiddleware,
  apiForwardMiddleware(loginUserApi)
);

userRouter.post(
  URLS.ROUTES.USERS.FORGOT_PASSWORD,
  schemaValidationMiddleware(forgotPasswordSchema),
  apiForwardMiddleware(forgotPasswordApi)
);

userRouter.post(
  URLS.ROUTES.USERS.IS_AUTHENTIC,
  headerValidationMiddleware(isAuthenticSchema),
  jwtAuthorizationMiddleware,
  apiForwardMiddleware(isAuthenticApi)
);

userRouter.post(
  URLS.ROUTES.USERS.CHANGE_PASSWORD,
  schemaValidationMiddleware(changePasswordSchema),
  apiForwardMiddleware(changePasswordApi)
);

userRouter.post(
  URLS.ROUTES.USERS.FOLLOW,
  schemaValidationMiddleware(followSchema),
  apiForwardMiddleware(followApi)
);

module.exports = userRouter;
