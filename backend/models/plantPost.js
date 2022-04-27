const knex = require('../database/knex');

const POST_TABLE = 'plantPost';

const createNewPlantPost = async (topic, poster, title, post, privateTag) => {

    const query = knex(POST_TABLE).insert({ topic, poster, title, post, privateTag, likeCounter: 0});
    console.log('Raw query for createNewPlantPost:', query.toString());
    const result = await query;

    return result;
};

const getAllPlantPosts = async () => {
    const query = knex(POST_TABLE);
    const result = await query;
    return result;
};

const getAllPlantPostsExcludePrivate = async () => {
    const query = knex(POST_TABLE).where({privateTag: 0});
    const result = await query;
    return result;
};

const findPlantPostByPostId = async (postId) => {
    const query = knex(POST_TABLE).where({ postId});
    const result = await query;
    return result;
};

const findPlantPostByPostIdExcludePrivate = async (postId) => {
    const query = knex(POST_TABLE).where({ postId, privateTag: 0 });
    const result = await query;
    return result;
};

const findPlantPostsByPoster = async (poster) => {
    const query = knex(POST_TABLE).where({ poster});
    const result = await query;
    return result;
};

const findPlantPostsByPosterExcludePrivate = async (poster) => {
    const query = knex(POST_TABLE).where({ poster, privateTag: 0 });
    const result = await query;
    return result;
};

const findPlantPostsByTopic = async (topic) => {
    const query = knex(POST_TABLE).where({ topic});
    const result = await query;
    return result;
};

const findPlantPostsByTopicExcludePrivate = async (topic) => {
    const query = knex(POST_TABLE).where({ topic, privateTag: 0 });
    const result = await query;
    return result;
};

const updatePost = async (postId, new_post) => {
    const query = knex(POST_TABLE).where({postId}).update({post: new_post});
    const result = await query;
    return result;
};

const updatePrivacy = async (postId, new_privacy) => {
    const query = knex(POST_TABLE).where({postId}).update({privateTag: new_privacy});
    const result = await query;
    return result;
};

const deletePlantPost = async (postId) => {
    const query = knex(POST_TABLE).where({postId}).del();
    const result = await query;
    return result;
};

module.exports = {
    createNewPlantPost,
    findPlantPostByPostId,
    findPlantPostsByPoster,
    findPlantPostsByTopic,
    findPlantPostByPostIdExcludePrivate,
    findPlantPostsByPosterExcludePrivate,
    findPlantPostsByTopicExcludePrivate,
    getAllPlantPosts,
    getAllPlantPostsExcludePrivate,
    updatePost,
    updatePrivacy,
    deletePlantPost
};