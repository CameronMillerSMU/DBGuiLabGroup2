const jwt = require('jsonwebtoken');
const User = require('../models/users');

const accessTokenSecret = 'mysupercoolsecret';

const authenticateUser = async (username, password) => {
    const user = await User.authenticateUser(username, password);
    if (user === null) {
        return user;
    }
    const students = await User.findUserByUsername(username);
    console.log('Users', students);
    const accessToken = jwt.sign({ ...students[0], claims: ['user'] }, accessTokenSecret);

    return accessToken;
    
}

const getAllUsers = async () => {
    const query = User.getAllUsers();
    const result = await query;
    return result;
}

const findUserByUsername = async (username) => {
    const query = User.findUserByUsername(username);
    const result = await query;
    return result;
}

const createNewUser = async (username, password, birthday, location, privateTag, backgroundPath) => {
    const query = User.createNewUser(username, password, birthday, location, privateTag, backgroundPath);
    const result = await query;
    return result;
}

module.exports = {
    findUserByUsername,
    authenticateUser, 
    getAllUsers,
    createNewUser
};