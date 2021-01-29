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
  const token = getRandomUUID();

  const deleteOldTokensForUserQuery = getDeleteForgotPasswordTokensForUserQuery();
  const forgotPasswordQuery = getAddResetPasswordTokenQuery();

  await postgresDriver.doInTransaction(async (client, rollback) => {
    await client.query(deleteOldTokensForUserQuery, [userId]);

    const {rowCount} = await client.query(forgotPasswordQuery, [userId, token]);
    if (!rowCount) {
      rollback();
    }
  });

  return {
    successful: true,
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
  const deleteOldTokensForUserQuery = getDeleteForgotPasswordTokensForUserQuery();

  const {successful} = await postgresDriver.doInTransaction(async (client, rollback) => {
    const {rowCount: changePasswordRowCount} = await client.query(changePasswordQuery, [password, userId]);
    if (changePasswordRowCount < 1) {
      rollback();
      return;
    }

    await client.query(deleteOldTokensForUserQuery, [userId]);
  });

  return {
    successful
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
  getUserIdFromEmail,
  addResetPasswordToken,
  doesEmailExist,
  doesUsernameExist,
  getUserIdFromForgotPasswordToken,
  changePasswordWithUserId,
}