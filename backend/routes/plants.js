const express = require('express');
const PlantController = require('../controllers/plants');

const { authenticateJWT, authenticateWithClaims } = require('../middleware/auth');

module.exports = function routes(app, logger) {

    // Create (POSTS)

    // Create New Plant: Name, Description, Category, Climate, ImagePath
    app.post('/newplant', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const result = await PlantController.createNewPlant(body.name, body.description, body.category, body.climate, body.imagePath);
            res.status(201).json(result);
        } catch (err) {
            res.status(400).json({ message: 'Failed To Create New Plant' });
        }
    });

    // Requests (GETS)

    // Get All Plants
    app.get('/allplants', authenticateJWT, async (req, res) => {
        try {
            const result = await PlantController.getAllPlants();
            res.status(200).json(result);
        } catch (err) {
            res.status(401).json({ message: 'Could Not Get All Plants'});
        }
    });

    // Get Plant With Name
    app.get('/plantbyname', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const result = await PlantController.findPlantByName(body.name);
            res.status(200).json(result);
        } catch (err) {
            res.status(401).json({ message: 'Could Not Get Plant By Name'});
        }
    });

    // Get Plant With Category
    app.get('/plantbycategory', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const result = await PlantController.findPlantByCategory(body.category);
            res.status(200).json(result);
        } catch (err) {
            res.status(401).json({ message: 'Could Not Get Plant By Category'});
        }
    });

    // Get Plant With Climate
    app.get('/plantbyclimate', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const result = await PlantController.findPlantByClimate(body.climate);
            res.status(200).json(result);
        } catch (err) {
            res.status(401).json({ message: 'Could Not Get Plant By Climate'});
        }
    });

}
