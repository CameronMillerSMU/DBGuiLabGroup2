const knex = require('knex');

const FORUM_TABLE = 'forum';

const createNewForum = async (owner, name, privateTag, insideTag) => {

    const query = knex(FORUM_TABLE).insert({ owner, name, privateTag, insideTag});
    console.log('Raw query for createNewForum:', query.toString());
    const result = await query;

    return result;
};

const getAllForums = async () => {
    const query = knex(FORUM_TABLE);
    const result = await query;
    return result;
};

const getAllForumsExcludePrivate = async () => {
    const query = knex(FORUM_TABLE).where({ privateTag: 0 });
    const result = await query;
    return result;
};

const findForumByTopic = async (topic) => {
    const query = knex(FORUM_TABLE).where({ topic });
    const result = await query;
    return result;
};

const findForumByTopicExcludePrivate = async (topic) => {
    const query = knex(FORUM_TABLE).where({ topic, privateTag: 0 });
    const result = await query;
    return result;
};

const updateForumDescription = async (topic, new_description) => {
    const query = knex(FORUM_TABLE).where({topic}).update({description: new_description});
    const result = await query;
    return result;
};

const deleteForum = async (topic) => {
    const query = knex(FORUM_TABLE).where({ topic }).del();
    const result = await query;
    return result;
};

module.exports = {
    createNewForum,
    findForumByTopic,
    getAllForums,
    findForumByTopicExcludePrivate,
    getAllForumsExcludePrivate,
    updateForumDescription,
    deleteForum
};