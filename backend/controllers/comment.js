const jwt = require('jsonwebtoken');
const comment = require('../models/comment');

const accessTokenSecret = 'mysupercoolsecret';

const createNewCommentRoot = async (postId, commentAuthor, post) => {
    const query = comment.createNewCommentRoot(postId, commentAuthor, post);
    console.log('Raw query for createNewCommentRoot:', query.toString());
    const result = await query;
    return result;
};

const createNewCommentReply = async (postId, commentAuthor, post, replyTo) => {
    const query = comment.createNewCommentRoot(postId, commentAuthor, post, replyTo);
    console.log('Raw query for createNewCommentReply:', query.toString());
    const result = await query;
    return result;
};

const getAllComments = async () => {
    const query = comment.getAllComments();
    const result = await query;
    return result;
};

const getAllCommentsExcludePrivate = async () => {
    const query = comment.getAllCommentsExcludePrivate();
    const result = await query;
    return result;
};

const findCommentsByPostId  = async (postId) => {
    const query = comment.findCommentsByPostId(postId);
    const result = await query;
    return result;
};

const findCommentsByPostIdExcludePrivate  = async (postId) => {
    const query = comment.findCommentsByPostIdExcludePrivate(postId);
    const result = await query;
    return result;
};

const findCommentsByAuthor  = async (commentAuthor) => {
    const query = comment.findCommentsByAuthor(commentAuthor);
    const result = await query;
    return result;
};

const findCommentsByAuthorExcludePrivate  = async (commentAuthor) => {
    const query = comment.findCommentsByAuthorExcludePrivate(commentAuthor);
    const result = await query;
    return result;
};

const findCommentsOnPost  = async (postId) => {
    const query = comment.findCommentsOnPost(postId);
    const result = await query;
    return result;
};

const findCommentsOnPostExcludePrivate  = async (postId) => {
    const query = comment.findCommentsOnPostExcludePrivate(postId);
    const result = await query;
    return result;
};

const findCommentsOnComment  = async (commentId) => {
    const query = comment.findCommentsOnPost(commentId);
    const result = await query;
    return result;
};

const findCommentsOnCommentExcludePrivate  = async (commentId) => {
    const query = comment.findCommentsOnPostExcludePrivate(commentId);
    const result = await query;
    return result;
};

const updateCommentPost = async (commentId, new_post) => {
    const query = comment.updateCommentPost(commentId, new_post);
    const result = await query;
    return result;
};

const updateCommentPrivacy = async (commentId, privacy) => {
    const query = comment.updateCommentPrivacy(commentId, privacy);
    const result = await query;
    return result;
};

const deleteComment = async (commentId) => {
    const query = comment.deleteComment(commentId);
    const result = await query;
    return result;
};

const deleteCommentsByAuthor = async (commentAuthor) => {
    const query = comment.deleteCommentsByAuthor(commentAuthor);
    const result = await query;
    return result;
};

const deleteCommentsOnPost = async (postId) => {
    const query = comment.deleteCommmentsOnPost(postId);
    const result = await query;
    return result;
};

module.exports = {
    createNewCommentRoot,
    createNewCommentReply,
    findCommentsByPostId,
    findCommentsByAuthor,
    findCommentsOnPost,
    findCommentsOnComment,
    findCommentsByPostIdExcludePrivate,
    findCommentsByAuthorExcludePrivate,
    findCommentsOnPostExcludePrivate,
    findCommentsOnCommentExcludePrivate,
    getAllComments,
    getAllCommentsExcludePrivate,
    updateCommentPost,
    updateCommentPrivacy,
    deleteComment,
    deleteCommentsByAuthor,
    deleteCommentsOnPost
};