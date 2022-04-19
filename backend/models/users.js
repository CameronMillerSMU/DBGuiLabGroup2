const knex = require('../database/knex');
const bcrypt = require('bcrypt');

const USER_TABLE = 'flora.users';

const createNewUser = async (username, password) => {
    console.log('Raw password:', password);
    const salt = await bcrypt.genSalt(10);
    console.log('Password salt', salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Hashed password', hashedPassword);

    const query = knex(USER_TABLE).insert({ username, password });
    console.log('Raw query for createNewUser:', query.toString());
    const result = await query;

    return result;
};

const getAllUsers = async () => {
    const query = knex(USER_TABLE);
    const result = await query;
    return result;
};

const findUserByUsername = async (username) => {
    const query = knex(USER_TABLE).where({ username });
    const result = await query;
    return result;
};

const getAllUsersExcludePrivate = async () => {
    const query = knex(USER_TABLE).where({ privateTag: 0 });
    const result = await query;
    return result;
};

const findUserByUsernameExcludePrivate = async (username) => {
    const query = knex(USER_TABLE).where({ username, privateTag: 0 });
    const result = await query;
    return result;
};

const authenticateUser = async (username, password) => {
    const users = await findUserByUsername(username);
    console.log('Results of users query', users);
    if (users.length === 0) {
        console.error(`No users matched the username: ${username}`);
        return null;
    }
    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
        delete user.password;
        return user;
    }
    return null;
};

const updateUserPassword = async (username, new_password) => {
    console.log('Raw password:', new_password);
    const salt = await bcrypt.genSalt(10);
    console.log('Password salt', salt);
    const hashedPassword = await bcrypt.hash(new_password, salt);
    console.log('Hashed password', hashedPassword);
    
    const query = knex('users').where({username}).update({password: hashedpassword});
    const result = await query;
    return result;
};

const updateUserUsername = async (username, new_username) => {
    const query = knex('users').where({username}).update({username: new_username});
    const result = await query;
    return result;
};

const deleteUser = async (username) => {
    const query = knex('users').where({username}).del();
    const result = await query;
    return result;
};

module.exports = {
    createNewUser,
    getAllUsers,
    findUserByUsername,
    getAllUsersExcludePrivate,
    findUserByUsernameExcludePrivate,
    authenticateUser,
    updateUserPassword,
    updateUserUsername,
    deleteUser
};