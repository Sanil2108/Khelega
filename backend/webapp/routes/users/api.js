const postgresDriver = require('../../drivers/postgresDriver');

const {
    hashPassword
} = require('../../utils/authenticationUtils');

const {
    getRegisterUserQuery
} = require('./sqlQueries');

const registerUser = async ({ body, headers }) => {
    const query = getRegisterUserQuery();

    const hashedPassword = await hashPassword(body.password);

    const result = await postgresDriver.query(query, [body.username, body.email, hashedPassword, body.description ? body.description : null]);

    return result;
}

module.exports = {
    registerUserApi: registerUser
}