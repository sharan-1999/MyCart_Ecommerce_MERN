const bcrypt = require('bcrypt');
const { createNewToken } = require('../utils/token.js');

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

const comparePassword = async (plainPassword, hashedPassword) => {
    return bcrypt.compare(plainPassword, hashedPassword);
};

const generateToken = (userId) => {
    return createNewToken(userId);
};

module.exports = {
    hashPassword,
    comparePassword,
    generateToken
}