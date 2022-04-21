const jwt = require('jsonwebtoken');
const User = require('../models/users');

const accessTokenSecret = 'mysupercoolsecret';

// Return Token (Tokenizer)
const authenticateUser = async (username, password) => {
    const users = await User.authenticateUser(username, password);
    if (users === null) {
        return users; }
    const user = await User.findByUserName(username);
    const accessToken = jwt.sign({ ...user[0], claims: ['user'] }, accessTokenSecret);
    return accessToken;
}

module.exports = {
    authenticateUser
};
