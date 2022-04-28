const knex = require('../database/knex');

const COMMENT_TABLE = 'comment';

const createNewComment = async (postId, commentAuthor, post) => {

    const query = knex(COMMENT_TABLE).insert({ postId, poster:commentAuthor, post, privateTag: 0 });
    console.log('Raw query for createNewComment:', query.toString());
    const result = await query;

    return result;
};



const getAllComments = async () => {
    const query = knex(COMMENT_TABLE);
    const result = await query;
    return result;
};

const getAllCommentsExcludePrivate = async () => {
    const query = knex(COMMENT_TABLE).where({privateTag: 0});
    const result = await query;
    return result;
};

const findCommentsByPostId = async (postId) => {
    const query = knex(COMMENT_TABLE).where({ postId });
    const result = await query;
    return result;
};

const findCommentsByPostIdExcludePrivate = async (postId) => {
    const query = knex(COMMENT_TABLE).where({ postId, privateTag: 0 });
    const result = await query;
    return result;
};

const findCommentsByAuthor = async (poster) => {
    const query = knex(COMMENT_TABLE).where({ poster });
    const result = await query;
    return result;
};

const findCommentsByAuthorExcludePrivate = async (poster) => {
    const query = knex(COMMENT_TABLE).where({ poster, privateTag: 0 });
    const result = await query;
    return result;
};

const findCommentsOnPost = async (postId) => {
    const query = knex(COMMENT_TABLE).where({ postId });
    const result = await query;
    return result;
};

const findCommentsOnPostExcludePrivate = async (postId) => {
    const query = knex(COMMENT_TABLE).where({ postId, privateTag: 0 });
    const result = await query;
    return result;
};

const updateCommentPost = async (commentId, post) => {
    const query = knex(COMMENT_TABLE).where({ commentId:commentId }).update({ post:post });
    const result = await query;
    return result;
};

const updateCommentPrivacy = async (commentId, privacy) => {
    const query = knex(COMMENT_TABLE).where({ commentId:commentId }).update({ privateTag: privacy });
    const result = await query;
    return result;
};

const deleteComment = async (commentId) => {
    const query = knex(COMMENT_TABLE).where({ commentId }).del();
    const result = await query;
    return result;
};

const deleteCommentsByAuthor = async (commentAuthor) => {
    const query = knex(COMMENT_TABLE).where({ poster:commentAuthor }).del();
    const result = await query;
    return result;
};

const deleteCommentsOnPost = async (postId) => {
    const query = knex(COMMENT_TABLE).where({ postId}).del();
    const result = await query;
    return result;
};

module.exports = {
    createNewComment,
    findCommentsByPostId,
    findCommentsByAuthor,
    findCommentsOnPost,
    findCommentsByPostIdExcludePrivate,
    findCommentsByAuthorExcludePrivate,
    findCommentsOnPostExcludePrivate,
    getAllComments,
    getAllCommentsExcludePrivate,
    updateCommentPost,
    updateCommentPrivacy,
    deleteComment,
    deleteCommentsByAuthor,
    deleteCommentsOnPost
};