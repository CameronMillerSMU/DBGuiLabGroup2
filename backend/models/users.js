const knex = require('../database/knex');
const bcrypt = require('bcryptjs');

const USER_TABLE = 'flora.users';

// Create (POST)

// Create User, Do Checks
const createNewUser = async (username, password) => {
    console.log("A");
    // Need Username
    if (!username) {
        return {
            success: false,
            message: 'Username Required'
        }
    }

    // Need Password
    if (!password) {
        return {
            success: false,
            message: 'Password Required'
        }
    }
    console.log("B");
    // Hash Password with Bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("C");
    const query = knex(USER_TABLE).insert({username, password: hashedPassword, registerTag: false, privateTag: false});
    result = await query;
    result['success'] = true;
    return result;

};

// Authenticate User
const authenticateUser = async (username, password) => {
    const users = await findByUserName(username);
    if (users.length === 0) {
        return null; }
    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
        delete user.password;
        return user; }
    return null;
};

// Requests (GET)

// Find All Users 
const getUsers = async () => {
    const query = knex(USER_TABLE);
    const result = await query;
    return result;
};

// Find All Public Users 
const getUsersPublic = async () => {
    const query = knex(USER_TABLE).where({privateTag: 0});
    const result = await query;
    return result;
};

// Find All Registered Users
const getUsersRegistered = async () => {
    const query = knex(USER_TABLE).where({registerTag: 1});
    const result = await query;
    return result;
};

// Find Specified User
const findByUserName = async (username) => {
    const query = knex(USER_TABLE).where({username});
    const result = await query;
    return result;
};

// Updates (PUT)

// Update Password
const updatePassword = async (username, new_password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(new_password, salt);
    const query = knex(USER_TABLE).where({username}).update({password: hashedPassword});
    result = await query;
    return result;
};

// Update Birthday
const updateBirthday = async (username, new_birthday) => {
    const query = knex(USER_TABLE).where({username}).update({birthday: new_birthday});
    const result = await query;
    return result;
};

// Update Location
const updateLocation = async (username, new_location) => {
    const query = knex(USER_TABLE).where({username}).update({location: new_location});
    const result = await query;
    return result;
};

// Update Registration
const updateRegistration = async (username, new_registration) => {
    const query = knex(USER_TABLE).where({username}).update({registerTag: new_registration});
    const result = await query;
    return result;
};

// Update Privacy
const updatePrivacy = async (username, new_privacy) => {
    const query = knex(USER_TABLE).where({username}).update({privateTag: new_privacy});
    const result = await query;
    return result;
};

// Update Admin
const updateAdmin = async (username, new_admin) => {
    const query = knex(USER_TABLE).where({username}).update({adminTag: new_admin});
    const result = await query;
    return result;
};

// Update Picture
const updatePicture = async (username, new_picture) => {
    const query = knex(USER_TABLE).where({username}).update({imagePath: new_picture});
    const result = await query;
    return result;
};

// Update Background
const updateBackground = async (username, new_background) => {
    const query = knex(USER_TABLE).where({username}).update({backgroundPath: new_background});
    const result = await query;
    return result;
};

// Delete (DELETE)

// Delete User With Username
const deleteUserName = async (username) => {
    const query = knex(USER_TABLE).where({username}).del();
    const result = await query;
    return result;
};

module.exports = {
    createNewUser,
    authenticateUser,
    getUsers,
    getUsersPublic,
    getUsersRegistered,
    findByUserName,
    updatePassword,
    updateBirthday,
    updateLocation,
    updateRegistration,
    updatePrivacy,
    updateAdmin,
    updatePicture,
    updateBackground,
    deleteUserName
};
