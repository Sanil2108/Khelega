const postgresDriver = require("../../drivers/postgresDriver");
const {
  getRegisterUserQuery,
  getDeleteForgotPasswordTokensForUserQuery,
  getUserIdFromEmailQuery,
  getAddResetPasswordTokenQuery
} = require('./sqlQueries');
const {
  getRandomUUID
} = require('../../utils/utils');


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

const addResetPasswordToken = async ({user_id}) => {
  const forgotPasswordQuery = getAddResetPasswordTokenQuery();
  const {rowCount} = await postgresDriver.query(forgotPasswordQuery, [user_id, getRandomUUID()]);

  return {
    successful: rowCount !== 0,
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
}