const getRegisterUserQuery = () => {
  return `INSERT INTO user_master(username, email, password_hash, description) VALUES ($1, $2, $3, $4)`;
};

const getPasswordHashQuery = () => {
  return `SELECT password_hash FROM user_master WHERE email = $1`;
};

module.exports = {
  getRegisterUserQuery,
  getPasswordHashQuery,
};
