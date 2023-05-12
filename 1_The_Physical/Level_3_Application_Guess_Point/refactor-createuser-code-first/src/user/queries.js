const getAllUsers = 'SELECT * FROM users';
const getUserByEmail = 'SELECT * FROM users WHERE email = $1';
const checkExistingEmail = 'SELECT u FROM users u WHERE u.email = $1';
const createUser = 'INSERT INTO users (name, lastname, email, password) VALUES ($1, $2, $3, $4)';

module.exports = {
    getAllUsers,
    getUserByEmail,
    checkExistingEmail,
    createUser,
}