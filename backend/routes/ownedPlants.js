const express = require('express');

const OwnedPlant = require('../models/ownedPlants');

const { authenticateJWT, authenticateWithClaims } = require('../middleware/auth');

module.exports = function routes(app, logger) {

    // Create (POSTS)

    // Create New Owned Plant: Owner, Plant Name, Privacy, Last Watered, InsideTag, FavoriteTag, Current Tasks, Picture
    app.post('/ownedplants/newowned', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            result = await OwnedPlant.createNewOwnedPlant(body.owner, body.name, body.privacy, body.lastwatered, body.inside, body.favorite, body.tasks, body.picture);
            if (result.success) {
                result = await OwnedPlant.findOwnedPlantByName(body.owner, body.name);
                return res.status(201).json(result); } 
            else { return res.status(400).json(result); }
        } catch (err) {
            return res.status(400).json({ message: 'Duplicate Entry' });
        }
    });

    // Requests (GETS)

    // Get Owned Plants By Id
    app.get('/ownedplants/byid/:id?', authenticateJWT, async (req, res) => {
        try {
            const params = req.params;
            const result = await OwnedPlant.findOwnedPlantById(params.id);
            if (result.length === 0) { return res.status(401).json({ message: 'No Owned Plants With Id Exist' }); }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Query Owned Plants' });
        }
    });

    // Get All Owner Owned Plants
    app.get('/ownedplants/byowner', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const result = await OwnedPlant.findOwnedPlantsByOwner(body.owner);
            if (result.length === 0) { return res.status(401).json({ message: 'Owner Does Not Own Any Plants' }); }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Get Owned Plants' });
        }
    });

    // Get Owned Plants By Name
    app.get('/ownedplants/byname', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const result = await OwnedPlant.findOwnedPlantByName(body.owner, body.name);
            if (result.length === 0) { return res.status(401).json({ message: 'Owner Does Not Own Any Plants With Name' }); }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Get Owned Plants With Name' });
        }
    });

    // Get Owned Plants By Privacy (Public)
    app.get('/ownedplants/publiclyowned', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const result = await OwnedPlant.findOwnerPublicOwnedPlants(body.owner);
            if (result.length === 0) { return res.status(401).json({ message: 'Owner Does Not Own Any Public Plants' }); }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Get All Publicly Owned Plants' });
        } 
    });

    // Get Owned Plants By If Inside
    app.get('/ownedplants/insideowned', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const result = await OwnedPlant.findOwnerInsideOwnedPlants(body.owner);
            if (result.length === 0) { return res.status(401).json({ message: 'Owner Does Not Own Any Indoors Plants' }); }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Get All Indoors Owned Plants' });
        } 
    });

    // Get Owned Plants By Favorite
    app.get('/ownedplants/favoriteowned', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const result = await OwnedPlant.findOwnerFavoriteOwnedPlants(body.owner);
            if (result.length === 0) { return res.status(401).json({ message: 'Owner Does Not Own Any Favorited Plants' }); }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Get All Favorited Owned Plants' });
        } 
    });

    // Updates (PUT)

    // Update Privacy 
    app.put('/ownedplants/updateprivacy/:id?', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const params = req.params;
            result = await OwnedPlant.updatePrivacy(params.id, body.privacy);
            if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Owned Plant' }); }
            result = await OwnedPlant.findOwnedPlantById(params.id);
            return res.status(200).json(result); 
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Update Privacy' });
        }
    });

    // Update Last Watered
    app.put('/ownedplants/updatewatered/:id?', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const params = req.params;
            result = await OwnedPlant.updateLastWatered(params.id, body.lastwatered);
            if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Owned Plant' }); }
            result = await OwnedPlant.findOwnedPlantById(params.id);
            return res.status(200).json(result); 
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Update Last Watered' });
        }
    });

    // Update Inside
    app.put('/ownedplants/updateinside/:id?', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const params = req.params;
            result = await OwnedPlant.updateInside(params.id, body.inside);
            if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Owned Plant' }); }
            result = await OwnedPlant.findOwnedPlantById(params.id);
            return res.status(200).json(result); 
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Update Indoors Status' });
        }
    });

    // Update Favorite 
    app.put('/ownedplants/updatefavorite/:id?', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const params = req.params;
            result = await OwnedPlant.updateFavorite(params.id, body.favorite);
            if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Owned Plant' }); }
            result = await OwnedPlant.findOwnedPlantById(params.id);
            return res.status(200).json(result); 
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Update Favorite' });
        }
    });

    // Update Tasks
    app.put('/ownedplants/updatetasks/:id?', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const params = req.params;
            result = await OwnedPlant.updateCurrentTasks(params.id, body.tasks);
            if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Owned Plant' }); }
            result = await OwnedPlant.findOwnedPlantById(params.id);
            return res.status(200).json(result); 
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Update Tasks' });
        }
    });

    // Update Picture 
    app.put('/ownedplants/updatepicture/:id?', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const params = req.params;
            result = await OwnedPlant.updateSpecificPhoto(params.id, body.picture);
            if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Owned Plant' }); }
            result = await OwnedPlant.findOwnedPlantById(params.id);
            return res.status(200).json(result); 
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Update Picture' });
        }
    });

    // Delete (DELETE)

    // Delete Owned Plant
    app.delete('/ownedplants/deleteplant/:id?', authenticateJWT, async (req, res) => {
        try {
            const params = req.params;
            result = await OwnedPlant.findOwnedPlantById(params.id);
            if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Owned Plant' }); }
            result = await OwnedPlant.deleteOwnedPlant(params.id);
            return res.status(204).json({ message: 'Successfully Deleted Owned Plant' });
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Delete Owned Plant' });
        }
    });

}
