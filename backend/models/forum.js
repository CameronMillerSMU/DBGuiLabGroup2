const knex = require('../database/knex');

const FORUM_TABLE = 'flora.forum';

// Create (POST)

// Create Plant With All Provided Information, Do Checks
const createNewForum = async (topic, description) => {

    // Need Topic
    if (!topic) {
        return {
            success: false,
            message: 'Topic Required'
        }
    }

    const query = knex(FORUM_TABLE).insert({topic, description: description});
    result = await query;
    result['success'] = true;
    return result;
    
};

// Requests (GET)

// Find All Forums
const getAllForums = async () => {
    const query = knex(FORUM_TABLE);
    const result = await query;
    return result;
};

// Get Plant With Topic
const findForumByTopic = async (topic) => {
    const query = knex(FORUM_TABLE).where({topic});
    const result = await query;
    return result;
};

// Updates (PUT)

// Update Description
const updateForumDescription = async (topic, new_description) => {
    const query = knex(FORUM_TABLE).where({topic}).update({description: new_description});
    const result = await query;
    return result;
};

// Delete (DELETE)

// Delete Forum
const deleteForum = async (topic) => {
    const query = knex(FORUM_TABLE).where({topic}).del();
    const result = await query;
    return result;
};

module.exports = {
    createNewForum,
    findForumByTopic,
    getAllForums,
    updateForumDescription,
    deleteForum
};