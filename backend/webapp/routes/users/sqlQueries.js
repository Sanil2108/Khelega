const getRegisterUserQuery = () => {
    return `INSERT INTO user_master(username, email, password_hash, description) VALUES ($1, $2, $3, $4)`;
}

module.exports = {
    getRegisterUserQuery
}