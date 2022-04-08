const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Plant = require('../models/plants');

const accessTokenSecret = 'mysupercoolsecret';

const authenticateUser = async (username, password) => {
    const user = await User.authenticateUser(username, password);
    if (user === null) {
        return user;
    }
    const students = await Plant.findUserByUsername(username);
    console.log('Users', students);
    const accessToken = jwt.sign({ ...students[0], claims: ['user'] }, accessTokenSecret);

    return accessToken;
    
}

module.exports = {
    authenticateUser
};