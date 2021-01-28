const {} = require("./api");

const {
  hostGameSchema,
  joinGameSchema,
  deleteGameSchema,
} = require("./schema");

const { isAuthenticSchema } = require("../users/schema");

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

const gameRouter = require("express").Router();

gameRouter.post(
  URLS.ROUTES.GAMES.HOST_GAME,
  headerValidationMiddleware(isAuthenticSchema),
  schemaValidationMiddleware(hostGameSchema),
  jwtAuthorizationMiddleware,
  apiForwardMiddleware()
);

gameRouter.post(
  URLS.ROUTES.GAMES.JOIN_GAME,
  headerValidationMiddleware(isAuthenticSchema),
  schemaValidationMiddleware(joinGameSchema),
  jwtAuthorizationMiddleware,
  apiForwardMiddleware()
);

userRouter.post(
  URLS.ROUTES.GAMES.DELETE_GAME,
  headerValidationMiddleware(isAuthenticSchema),
  schemaValidationMiddleware(deleteGameSchema),
  jwtAuthorizationMiddleware,
  apiForwardMiddleware(registerUserApi)
);

module.exports = gameRouter;
