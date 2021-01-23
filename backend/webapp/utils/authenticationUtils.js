const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    return await new Promise((resolve, reject) => {
        bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS), (error, hash) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(hash);
            }
        });
    });
}

const validatePassword = async (password, hash) => {
    await new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        })
    });
}

module.exports = {
    hashPassword,
    validatePassword,
}