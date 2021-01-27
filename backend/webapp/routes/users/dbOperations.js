const postgresDriver = require("../../drivers/postgresDriver");
const {
  getRegisterUserQuery,
  getDeleteForgotPasswordTokensForUserQuery,
  getUserIdFromEmailQuery,
  getUserIdFromUsername,
  getAddResetPasswordTokenQuery,
  getChangePasswordWithUserIdQuery,
  getUserIdFromForgotPasswordTokenQuery
} = require('./sqlQueries');
const {
  getRandomUUID
} = require('../../utils/utils');

const doesEmailExist = async ({email}) => {
  const userIdQuery = getUserIdFromEmailQuery();
  const {rows} = await postgresDriver.query(userIdQuery, [email]);
  return {
    successful: true,
    data: {
      exists: rows.length > 0
    }
  }
}

const doesUsernameExist = async ({username}) => {
  const userIdQuery = getUserIdFromUsername();
  const {rows} = await postgresDriver.query(userIdQuery, [username]);
  return {
    successful: true,
    data: {
      exists: rows.length > 0
    }
  }
}

const deleteOldTokensForUser = async ({user_id}) => {
  const query = getDeleteForgotPasswordTokensForUserQuery();
  await postgresDriver.query(query, [user_id]);
  return {
    successful: true,
  };
}

const getUserIdFromEmail = async ({email}) => {
  const userIdQuery = getUserIdFromEmailQuery();
  const {rows} = await postgresDriver.query(userIdQuery, [email]);
  if (rows.length === 0) {
    return {
      successful: false
    }
  }
  return {
    successful: true,
    data: {
      user_id: rows[0].user_id
    }
  };
}

const addResetPasswordToken = async ({userId}) => {
  const forgotPasswordQuery = getAddResetPasswordTokenQuery();

  const token = getRandomUUID();

  const {rowCount} = await postgresDriver.query(forgotPasswordQuery, [userId, token]);

  return {
    successful: rowCount !== 0,
    data: {
      token
    }
  }
}

const getUserIdFromForgotPasswordToken = async ({token}) => {
  const query = getUserIdFromForgotPasswordTokenQuery();

  const {rowCount, rows} = await postgresDriver.query(query, [token]);

  return {
    successful: rowCount > 0,
    data: {
      userId: rows && rows.length > 0 ? rows[0].user_id : null,
    }
  }
}

const changePasswordWithUserId = async ({password, userId}) => {
  const changePasswordQuery = getChangePasswordWithUserIdQuery();

  const {rowCount} = await postgresDriver.query(changePasswordQuery, [password, userId]);

  return {
    successful: rowCount > 0
  }
}

const addUser = async ({username, email, hashedPassword, description = null}) => {
  const query = getRegisterUserQuery();

  const result = await postgresDriver.query(query, [
    username,
    email,
    hashedPassword,
    description ? description : null,
  ]);

  return {
    successful: result.rowCount !== 0
  }
}

module.exports = {
  addUser,
  deleteOldTokensForUser,
  getUserIdFromEmail,
  addResetPasswordToken,
  doesEmailExist,
  doesUsernameExist,
  getUserIdFromForgotPasswordToken,
  changePasswordWithUserId,
}