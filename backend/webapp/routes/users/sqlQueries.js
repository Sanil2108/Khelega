const getRegisterUserQuery = () => {
  return `INSERT INTO user_master(username, email, password_hash, description) VALUES ($1, $2, $3, $4)`;
};

const getPasswordHashQuery = () => {
  return `SELECT password_hash FROM user_master WHERE email = $1`;
};

const getUserIdFromEmailQuery = () => {
  return `SELECT user_id FROM user_master WHERE email = $1`;
}

const getAddResetPasswordTokenQuery = () => {
  return `INSERT INTO forgot_password_token(user_id, token) VALUES ($1, $2)`;
}

const getDeleteForgotPasswordTokensForUserQuery = () => {
  return `UPDATE forgot_password_token SET user_id = NULL where user_id = $1`;
}

const getUserIdFromUsername = () => {
  return `SELECT user_id FROM user_master WHERE username = $1`;
}

const getUserIdFromForgotPasswordTokenQuery = () => {
  return `SELECT user_id FROM forgot_password_token WHERE token = $1 AND user_id IS NOT NULL`;
}

const getChangePasswordWithUserIdQuery = () => {
  return `UPDATE user_master SET password_hash = $1 WHERE user_id = $2`;
}

module.exports = {
  getRegisterUserQuery,
  getPasswordHashQuery,
  getUserIdFromEmailQuery,
  getAddResetPasswordTokenQuery,
  getDeleteForgotPasswordTokensForUserQuery,
  getUserIdFromUsername,
  getUserIdFromForgotPasswordTokenQuery,
  getChangePasswordWithUserIdQuery
};
