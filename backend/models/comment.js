const knex = require('knex');

const COMMENT_TABLE = 'comment';

const createNewCommentRoot = async (postId, commentAuthor, post) => {

    const query = knex(COMMENT_TABLE).insert({ postId, commentAuthor, post, replyTo: -1, rootTag: 1, privateTag: 0 });
    console.log('Raw query for createNewCommentRoot:', query.toString());
    const result = await query;

    return result;
};

const createNewCommentReply = async (postId, commentAuthor, post, replyTo) => {

    const query = knex(COMMENT_TABLE).insert({ postId, commentAuthor, post, replyTo, rootTag: 0, privateTag: 0 });
    console.log('Raw query for createNewCommentRoot:', query.toString());
    const result = await query;

    return result;
};

const getAllComments = async () => {
    const query = knex(COMMENT_TABLE);
    const result = await query;
    return result;
}

const getAllCommentsExcludePrivate = async () => {
    const query = knex(COMMENT_TABLE).where({privateTag: 0});
    const result = await query;
    return result;
}

const findCommentsByPostId = async (postId) => {
    const query = knex(COMMENT_TABLE).where({ postId });
    const result = await query;
    return result;
}

const findCommentsByPostIdExcludePrivate = async (postId) => {
    const query = knex(COMMENT_TABLE).where({ postId, privateTag: 0 });
    const result = await query;
    return result;
}

const findCommentsByAuthor = async (commentAuthor) => {
    const query = knex(COMMENT_TABLE).where({ commentAuthor });
    const result = await query;
    return result;
}

const findCommentsByAuthorExcludePrivate = async (commentAuthor) => {
    const query = knex(COMMENT_TABLE).where({ commentAuthor, privateTag: 0 });
    const result = await query;
    return result;
}

const findCommentsOnPost = async (postId) => {
    const query = knex(COMMENT_TABLE).where({ postId, root: 1 });
    const result = await query;
    return result;
}

const findCommentsOnPostExcludePrivate = async (postId) => {
    const query = knex(COMMENT_TABLE).where({ postId, root: 1, privateTag: 0 });
    const result = await query;
    return result;
}

const findCommentsOnComment = async (commmentId) => {
    const query = knex(COMMENT_TABLE).where({ commentId, root: 0 });
    const result = await query;
    return result;
}

const findCommentsOnCommentExcludePrivate = async (commentId) => {
    const query = knex(COMMENT_TABLE).where({ commentId, root: 0, privateTag: 0 });
    const result = await query;
    return result;
}

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
    getAllCommentsExcludePrivate
};