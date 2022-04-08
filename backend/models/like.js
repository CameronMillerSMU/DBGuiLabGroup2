const knex = require('knex');

const LIKE_TABLE = 'like';

const createNewCommentLike = async (user, commentId) => {

    const query = knex(LIKE_TABLE).insert({ user, commentId, postId: -1 });
    console.log('Raw query for createNewCommentLike:', query.toString());
    const result = await query;

    return result;
};

const createNewPostLike = async (user, postId) => {

    const query = knex(LIKE_TABLE).insert({ user, commentId: -1, postId });
    console.log('Raw query for createNewPostLike:', query.toString());
    const result = await query;

    return result;
};

const getAllLikes = async () => {
    const query = knex(LIKE_TABLE);
    const result = await query;
    return result;
}

const findLikesByUser = async (username) => {
    const query = knex(LIKE_TABLE).where({ username });
    const result = await query;
    return result;
}

module.exports = {
    createNewCommentLike,
    createNewPostLike,
    getAllLikes,
    findLikesByUser
};