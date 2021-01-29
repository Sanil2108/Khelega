const postgresDriver = require("../../drivers/postgresDriver");

const {
  hashPassword,
  signJWT,
} = require("../../utils/authenticationUtils");

const {
  getRandomUUID,
  sendEmail
} = require("../../utils/utils");

const {
  addUser,
  getUserIdFromEmail,
  addResetPasswordToken,
  doesUsernameExist,
  doesEmailExist,
  getUserIdFromForgotPasswordToken,
  changePasswordWithUserId
} = require("./dbOperations");

const registerUser = async ({ body, headers }, res) => {
  const doesUsernameExistResponse = await doesUsernameExist({username: body.username});
  if (!doesUsernameExistResponse.successful) {
    res.status(500).send('Something went wrong');
    return;
  }

  if (doesUsernameExistResponse.data.exists) {
    res.status(400).send('A user with this username already exists');
    return;
  }

  const doesEmailExistResponse = await doesEmailExist({email: body.email});
  if (!doesEmailExistResponse.successful) {
    res.status(500).send('Something went wrong');
    return;
  }

  if (doesEmailExistResponse.data.exists) {
    res.status(400).send('A user with this email already exists');
    return;
  }

  const hashedPassword = await hashPassword(body.password);

  const {successful} = await addUser({
    hashedPassword,
    email: body.email,
    username: body.username,
    description: body.description
  });

  if (!successful) {
    res.status(500).send('Something went wrong.');
  }

  return {
    successful: true,
    data: {}
  };
};

const loginUser = async ({ user, body, headers }, res) => {
  const jwt = signJWT({
    email: user.email
  });
  return {
    successful: true,
    data: {
      jwt
    }
  }
};

const forgotPassword = async ({ body, headers }, res) => {
  const {email} = body;
  
  // TODO: This all needs to be done in a transaction
  const {successful: userIdRetrieved, data} = await getUserIdFromEmail({email});
  if (!userIdRetrieved) {
    res.status(404).send('Failed to retrieve user for this email');
    return;
  }
  const {user_id: userId} = data;
  
  const {successful: successfullyAddedTokenForUser, data: resetPasswordTokenData} = await addResetPasswordToken({userId});
  if (!successfullyAddedTokenForUser) {
    res.status(500).send('Failed to add reset password token');
    return;
  }

  // TODO:
  // sendEmail({
  //   receiver: email,
  //   subject: 'Hello',
  //   message: 'hello'
  // });

  return {
    successful: true,
    data: {
      token: resetPasswordTokenData.token
    }
  }
};

const isAuthentic = async ({ user, body, headers }, res) => {
  if (user) {
    return {
      successful: true,
      data: {user}
    }
  }
  else {
    res.status(401).send("Authentication Failed.");
  }
};

const changePassword = async({ body, headers }, res) => {
  const {token, password} = body;

  const {data, successful: successfullyRetrievedUserId} = await getUserIdFromForgotPasswordToken({token});
  if (!successfullyRetrievedUserId) {
    res.status(400).send('Incorrect token supplied');
    return;
  }

  const hashedPassword = await hashPassword(password);

  const {successful: successfullyChangedPasswords} = await changePasswordWithUserId({password: hashedPassword, userId: data.userId});
  if (!successfullyChangedPasswords) {
    res.status(500).send('Could not change your password');
    return;
  }

  return {
    successful: true
  }
};

const follow = async ({ body, headers }) => {};

module.exports = {
  registerUserApi: registerUser,
  loginUserApi: loginUser,
  forgotPasswordApi: forgotPassword,
  isAuthenticApi: isAuthentic,
  changePasswordApi: changePassword,
  followApi: follow,
};
