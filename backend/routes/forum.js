const express = require('express');

const Forum = require('../models/forum');

const { authenticateJWT, authenticateWithClaims } = require('../middleware/auth');

module.exports = function routes(app, logger) {

    // Create (POSTS)

    // Create New Forum: Topic, Description
    app.post('/forum/newforum', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            result = await Forum.createNewForum(body.topic, body.description);
            if (result.success) {
                result = await Forum.findForumByTopic(body.topic);
                return res.status(201).json(result); } 
            else { return res.status(400).json(result); }
        } catch (err) {
            return res.status(400).json({ message: 'Duplicate Entry' });
        }
    });

    // Requests (GETS)

    // Get All Forums
    app.get('/forum/allforums', authenticateJWT, async (req, res) => {
        try {
            const result = await Forum.getAllForums();
            if (result.length === 0) { return res.status(401).json({ message: 'No Forums Exist' }); }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Query Forums'});
        }
    });

    // Get Forum With Topic
    app.get('/forum/forumbytopic', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const result = await Forum.findForumByTopic(body.topic);
            if (result.length === 0) { return res.status(401).json({ message: 'No Forums With Topic Exist' }); }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Query Forums With Topic'});
        }
    });
    
    // Updates (PUT)

    // Update Description
    app.put('/forum/updatedescription', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            result = await Forum.updateForumDescription(body.topic, body.description);
            if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Topic' }); }
            result = await Forum.findForumByTopic(body.topic);
            return res.status(200).json(result); 
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Update Description' });
        }
    });

    // Delete (DELETE)

    // Delete Forum
    app.delete('/forum/deleteforum', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            result = await Forum.findForumByTopic(body.topic);
            if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Forum' }); }
            result = await Forum.deleteForum(body.topic);
            return res.status(204).json({ message: 'Successfully Deleted Forum' });
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Delete Forum' });
        }
    });

}
