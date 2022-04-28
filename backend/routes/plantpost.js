const plantPost = require('../models/plantPost');

const {
    authenticateJWT,
    authenticateWithClaims
} = require('../middleware/auth');

module.exports = function routes(app, logger) {

    /* createNewPlantPost,
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
        */

        app.post('/plantpost/newpost', authenticateJWT, async (req, res) => {
            try {
                const body = req.body;
                result = await plantPost.createNewPlantPost(body.topic, body.poster, body.title, body.post, body.privateTag);
                if (result.success) {
                    result = await plantPost.findPlantPostsByTopic(body.topic);
                    return res.status(201).json(result); } 
                else { return res.status(201).json(result); }
            } catch (err) {
                return res.status(400).json({ message: 'Duplicate Entry'  });
            }
        });
    

    app.get('/plantpost/allposts', authenticateJWT, async (req, res) => {
        try {
            const result = await plantPost.getAllPlantPosts();
            if (result.length === 0) {
                return res.status(401).json({
                    message: 'No Plant Posts Exist'
                });
            }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({
                message: 'Could Not Query Plant Posts'
            });
        }
    });

    app.get('/plantpost/allpublicposts', authenticateJWT, async (req, res) => {
        try {
            const result = await plantPost.getAllPlantPostsExcludePrivate();
            if (result.length === 0) {
                return res.status(401).json({
                    message: 'No Public Plant Posts Exist'
                });
            }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({
                message: 'Could Not Query Plant Posts'
            });
        }
    });



    app.get('/plantpost/postbyid', authenticateJWT, async (req, res) => {
        try {
            const result = await plantPost.findPlantPostByPostId(req.body.id);
            if (result.length === 0) {
                return res.status(400).json({
                    message: 'No posts exist with that ID'
                });
            }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({
                message: 'Could Not Query Posts'
            });
        }
    });

    app.get('/plantpost/postbyposter', authenticateJWT, async (req, res) => {
        try {
            const result = await plantPost.findPlantPostByPoster(req.body.poster);
            if (result.length === 0) {
                return res.status(400).json({
                    message: 'No posts exist by that poster'
                });
            }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({
                message: 'Could Not Query Posts'
            });
        }
    });

    app.get('/plantpost/postbytopic', authenticateJWT, async (req, res) => {
        try {
            const result = await plantPost.findPlantPostsByTopic(req.body.topic);
            if (result.length === 0) {
                return res.status(400).json({
                    message: 'No posts exist with that topic'
                });
            }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({
                message: 'Could Not Query Posts'
            });
        }
    });

    app.get('/plantpost/publicpostbyid', authenticateJWT, async (req, res) => {
        try {
            const result = await plantPost.findPlantPostsByIdExcludePrivate(req.body.id);
            if (result.length === 0) {
                return res.status(400).json({
                    message: 'No public posts exist with that ID'
                });
            }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({
                message: 'Could Not Query Posts'
            });
        }
    });

    app.get('/plantpost/publicpostbyposter', authenticateJWT, async (req, res) => {
        try {
            const result = await plantPost.findPlantPostsByPosterExcludePrivate(req.body.poster);
            if (result.length === 0) {
                return res.status(400).json({
                    message: 'No public posts exist with that poster'
                });
            }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({
                message: 'Could Not Query Posts'
            });
        }
    });

    app.get('/plantpost/publicpostbytopic', authenticateJWT, async (req, res) => {
        try {
            const result = await plantPost.findPlantPostsByTopicExcludePrivate(req.body.topic);
            if (result.length === 0) {
                return res.status(400).json({
                    message: 'No public posts exist with that topic'
                });
            }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({
                message: 'Could Not Query Posts'
            });
        }
    });

    app.put('/plantpost/updatepost', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const params = req.params;
            result = await plantPost.updatePost(params.id, body.post);
            if (result.length === 0) {
                return res.status(401).json({
                    message: 'Could Not Find Post'
                });
            }
            result = await plantPost.findPlantPostByPostId(params.id);
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({
                message: 'Could Not Update Post'
            });
        }
    });

    app.put('/plantpost/updateprivacy', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const params = req.params;
            result = await plantPost.updatePrivacy(params.id, body.new_privacy);
            if (result.length === 0) {
                return res.status(401).json({
                    message: 'Could Not Find Post'
                });
            }
            result = await plantPost.findPlantPostByPostId(params.id);
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({
                message: 'Could Not Update Post Privacy'
            });
        }
    });

    app.delete('/plantpost/deletepost/:id?', authenticateJWT, async (req, res) => {
        try {
            const params = req.params;
            result = await plantPost.findPlantPostByPostId(params.id);
            if (result.length === 0) {
                return res.status(401).json({
                    message: 'Could Not Find Post'
                });
            }
            result = await plantPost.deletePlantPost(params.id);
            return res.status(204).json({
                message: 'Successfully Deleted Plant Post'
            });
        } catch (err) {
            return res.status(401).json({
                message: 'Could Not Delete Plant Post'
            });
        }
    });



}