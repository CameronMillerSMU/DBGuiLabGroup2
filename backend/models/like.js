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
};

const findLikesOnComment = async (commentId) => {
    const query = knex(LIKE_TABLE).where({ commentId });
    const result = await query;
    return result;
};

const findLikesOnPost = async (postId) => {
    const query = knex(LIKE_TABLE).where({ postId });
    const result = await query;
    return result;
};

const findLikesByUser = async (username) => {
    const query = knex(LIKE_TABLE).where({ username });
    const result = await query;
    return result;
};

const deleteLike = async (commentId, postId, user) => {
    const query = knex(LIKE_TABLE).where({ commentId, postId, user }).del();
    const result = await query;
    return result;
};

const deleteLikesOnComment = async (commentId) => {
    const query = knex(LIKE_TABLE).where({ commentId }).del();
    const result = await query;
    return result;
};

const deleteLikesOnPost = async (postId) => {
    const query = knex(LIKE_TABLE).where({ postId }).del();
    const result = await query;
    return result;
};

module.exports = {
    createNewCommentLike,
    createNewPostLike,
    getAllLikes,
    findLikesOnComment,
    findLikesOnPost,
    findLikesByUser,
    deleteLike,
    deleteLikesOnComment,
    deleteLikesOnPost
};