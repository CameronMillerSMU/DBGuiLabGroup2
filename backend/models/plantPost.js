const knex = require('../database/knex');

const POST_TABLE = 'flora.plantPost';

// Create (POST)

// Create Owned Plant With All Provided Information, Do Checks
const createNewPlantPost = async (topic, poster, title, post, privateTag) => {

    // Need Topic
    if (!topic) {
        return {
            success: false,
            message: 'Topic Required'
        }
    }

    // Need Poster
    if (!poster) {
        return {
            success: false,
            message: 'Poster Required'
        }
    }

    // Need Title
    if (!title) {
        return {
            success: false,
            message: 'Title Required'
        }
    }

    // Need Post
    if (!post) {
        return {
            success: false,
            message: 'Post Required'
        }
    }

    const query = knex(POST_TABLE).insert({topic: topic, poster: poster, title: title, post: post, privateTag: privateTag, likeCount: 0});
    const result = await query;
    result['success'] = true;
    return result;

};

// Requests (GET)

// Get All Posts
const getAllPlantPosts = async () => {
    const query = knex(POST_TABLE);
    const result = await query;
    return result;
};

// Get Posts By Id
const findPlantPostByPostId = async (postId) => {
    const query = knex(POST_TABLE).where({postId});
    const result = await query;
    return result;
};

// Get Posts By Topic
const findPlantPostsByTopic = async (topic) => {
    const query = knex(POST_TABLE).where({topic});
    const result = await query;
    return result;
};

// Get Posts By Poster
const findPlantPostsByPoster = async (poster) => {
    const query = knex(POST_TABLE).where({poster});
    const result = await query;
    return result;
};

// Get Public Posts
const findPublicPlantPosts = async () => {
    const query = knex(POST_TABLE).where({privateTag: 0});
    const result = await query;
    return result;
};

// Get Public Posts With Poster
const findPublicPlantPostsByPoster = async (poster) => {
    const query = knex(POST_TABLE).where({poster, privateTag: 0});
    const result = await query;
    return result;
};

// Get Public Posts With Topic
const findPublicPlantPostsByTopic = async (topic) => {
    const query = knex(POST_TABLE).where({topic, privateTag: 0});
    const result = await query;
    return result;
};

// Updates (PUT)

// Update Post
const updatePost = async (postId, new_post) => {
    const query = knex(POST_TABLE).where({postId}).update({post: new_post});
    const result = await query;
    return result;
};

// Update Title
const updateTitle = async (postId, new_title) => {
    const query = knex(POST_TABLE).where({postId}).update({title: new_title});
    const result = await query;
    return result;
};

// Update Privacy
const updatePrivacy = async (postId, new_privacy) => {
    const query = knex(POST_TABLE).where({postId}).update({privateTag: new_privacy});
    const result = await query;
    return result;
};

// Update Like (Increment)
const updateLike = async (postId) => {
    const query = knex(POST_TABLE).where({postId}).update({likeCount: knex.raw('likeCount + 1')})
    const result = await query;
    return result;
};

// Update Like (Decrement)
const downdateLike = async (postId) => {
    const query = knex(POST_TABLE).where({postId}).update({likeCount: knex.raw('likeCount - 1')})
    const result = await query;
    return result;
}

// Delete (DELETE)

// Delete Any Post With Id
const deletePlantPost = async (postId) => {
    const query = knex(POST_TABLE).where({postId}).del();
    const result = await query;
    return result;
};

module.exports = {
    createNewPlantPost,
    getAllPlantPosts,
    findPlantPostByPostId,
    findPlantPostsByTopic,
    findPlantPostsByPoster,
    findPublicPlantPosts,
    findPublicPlantPostsByPoster,
    findPublicPlantPostsByTopic,
    updatePost,
    updateTitle,
    updatePrivacy,
    updateLike,
    downdateLike,
    deletePlantPost
};
