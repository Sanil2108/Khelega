const postgresDriver = require("../../drivers/postgresDriver");

const {
  hashPassword,
  signJWT,
  verifyJWT
} = require("../../utils/authenticationUtils");

const { getRegisterUserQuery, getPasswordHashQuery } = require("./sqlQueries");

const registerUser = async ({ body, headers }) => {
  const query = getRegisterUserQuery();

  const hashedPassword = await hashPassword(body.password);

  const result = await postgresDriver.query(query, [
    body.username,
    body.email,
    hashedPassword,
    body.description ? body.description : null,
  ]);

  return result;
};

const loginUser = async ({ user, body, headers }, res) => {
  const jwt = signJWT({
    email: user.email
  });
  return {
    jwt
  }
};

const forgotPassword = async ({ body, headers }) => {};

const isAuthentic = async ({ user, body, headers }, res) => {
  if (user) {
    res.json({
      successful: true,
      user
    });
    return;
  }
  else {
    res.status(401).send("Authentication Failed.");
  }
};

const changePassword = async ({ body, headers }) => {};

const follow = async ({ body, headers }) => {};

module.exports = {
  registerUserApi: registerUser,
  loginUserApi: loginUser,
  forgotPasswordApi: forgotPassword,
  isAuthenticApi: isAuthentic,
  changePasswordApi: changePassword,
  followApi: follow,
};
