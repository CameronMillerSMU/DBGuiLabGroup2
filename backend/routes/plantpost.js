const PlantPost = require('../models/plantPost');

const { authenticateJWT, authenticateWithClaims } = require('../middleware/auth');

module.exports = function routes(app, logger) {

    // Create (POSTS)

    // Create New Post: Topic, Poster, Title, Post, Privacy
    app.post('/plantpost/newpost', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            result = await PlantPost.createNewPlantPost(body.topic, body.poster, body.title, body.post, body.privateTag);
            if (result.success) {
                result = await PlantPost.findPlantPostsByTopic(body.topic);
                return res.status(201).json(result); } 
            else { return res.status(201).json(result); }
        } catch (err) {
            result = await PlantPost.findPlantPostsByTopic(body.topic);
            return res.status(201).json(result);
        }
    });
    
    // Requests (GETS)

    // Get All Posts
    app.get('/plantpost/allposts', authenticateJWT, async (req, res) => {
        try {
            const result = await PlantPost.getAllPlantPosts();
            if (result.length === 0) { return res.status(401).json({ message: 'No Plant Posts Exist' }); }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Query Plant Posts' });
        }
    });

    // Get Posts By Id
    app.get('/plantpost/postbyid/:id?', authenticateJWT, async (req, res) => {
        try {
            const params = req.params;
            const result = await PlantPost.findPlantPostByPostId(params.id);
            if (result.length === 0) { return res.status(400).json({ message: 'No Posts Exist With Id' }); }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Query Plant Posts' });
        }
    });

    // Get Posts By Topic
    app.get('/plantpost/postsbytopic', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const result = await PlantPost.findPlantPostsByTopic(body.topic);
            if (result.length === 0) { return res.status(400).json({ message: 'No Posts Exist With Topic' }); }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Query Plant Posts' });
        }
    });

    // Get Posts By Poster
    app.get('/plantpost/postsbyposter', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const result = await PlantPost.findPlantPostsByPoster(body.poster);
            if (result.length === 0) { return res.status(400).json({ message: 'No Posts Exist By Poster' }); }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Query Plant Posts' });
        }
    });

    // Get Public Posts
    app.get('/plantpost/publicposts', authenticateJWT, async (req, res) => {
        try {
            const result = await PlantPost.findPublicPlantPosts();
            if (result.length === 0) { return res.status(401).json({ message: 'No Public Plant Posts Exist' }); }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Query Plant Posts' });
        }
    });

    // Get Public Posts With Poster
    app.get('/plantpost/publicpostsbyposter', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const result = await PlantPost.findPublicPlantPostsByPoster(body.poster);
            if (result.length === 0) { return res.status(400).json({ message: 'No Public Plant Posts With Poster Exist' }); }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Query Plant Posts' });
        }
    });

    // Get Public Posts With Topic
    app.get('/plantpost/publicpostsbytopic', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const result = await PlantPost.findPublicPlantPostsByTopic(body.topic);
            if (result.length === 0) { return res.status(400).json({ message: 'No Public Plant Posts With Topic Exist' }); }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Query Plant Posts' });
        }
    });

    // Updates (PUTS)

    // Update Title
    app.put('/plantpost/updatetitle/:id?', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const params = req.params;
            result = await PlantPost.updateTitle(params.id, body.title);
            if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Post' }); }
            result = await PlantPost.findPlantPostByPostId(params.id);
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Update Title' });
        }
    });

    // Update Post
    app.put('/plantpost/updatepost/:id?', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const params = req.params;
            result = await PlantPost.updatePost(params.id, body.post);
            if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Post' }); }
            result = await PlantPost.findPlantPostByPostId(params.id);
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Update Post' });
        }
    });

    // Update Privacy
    app.put('/plantpost/updateprivacy/:id?', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const params = req.params;
            result = await PlantPost.updatePrivacy(params.id, body.privacy);
            if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Post' }); }
            result = await PlantPost.findPlantPostByPostId(params.id);
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Update Privacy' });
        }
    });

    // Update Like (Increment)
    app.put('/plantpost/updatelikeincrement/:id?', authenticateJWT, async (req, res) => {
        try {
            const params = req.params;
            result = await PlantPost.updateLike(params.id);
            if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Post' }); }
            result = await PlantPost.findPlantPostByPostId(params.id); 
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Update Like Counter (Increment)' });
        }
    });

    // Update Like (Decrement)
    app.put('/plantpost/updatelikedecrement/:id?', authenticateJWT, async (req, res) => {
        try {
            const params = req.params;
            result = await PlantPost.downdateLike(params.id);
            if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Post' }); }
            result = await PlantPost.findPlantPostByPostId(params.id); 
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Update Like Counter (Decrement)' });
        }
    });

    // Delete (DELETE)

    // Delete Plant Post
    app.delete('/plantpost/deletepost/:id?', authenticateJWT, async (req, res) => {
        try {
            const params = req.params;
            result = await PlantPost.findPlantPostByPostId(params.id);
            if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Post' }); }
            result = await PlantPost.deletePlantPost(params.id);
            return res.status(204).json({ message: 'Successfully Deleted Plant Post' });
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Delete Plant Post' });
        }
    });

}
