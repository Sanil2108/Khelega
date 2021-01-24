const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  return await new Promise((resolve, reject) => {
    bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS), (error, hash) => {
      if (error) {
        reject(error);
      } else {
        resolve(hash);
      }
    });
  });
};

const validatePassword = async (password, hash) => {
  return await new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const signJWT = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: parseInt(process.env.JWT_EXPIRATION),
  });
};

const verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

module.exports = {
  hashPassword,
  validatePassword,
  signJWT,
  verifyJWT
};
