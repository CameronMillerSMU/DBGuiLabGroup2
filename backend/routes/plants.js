const express = require('express');

const Plant = require('../models/plants');

const { authenticateJWT, authenticateWithClaims } = require('../middleware/auth');

module.exports = function routes(app, logger) {

    // Create (POSTS)

    // Create New Plant: Name, Description, Category, Climate, ImagePath (Picture), Water, Sunlight, Soil
    app.post('/plants/newplant', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            result = await Plant.createNewPlant(body.name, body.description, body.category, body.climate, body.picture, body.water, body.sunlight, body.soil);
            if (result.success) {
                result = await Plant.findPlantByName(body.name);
                return res.status(201).json(result); } 
            else { return res.status(400).json(result); }
        } catch (err) {
            return res.status(400).json({ message: 'Duplicate Entry' });
        }
    });

    // Requests (GETS)

    // Get All Plants
    app.get('/plants/allplants', authenticateJWT, async (req, res) => {
        try {
            const result = await Plant.getAllPlants();
            if (result.length === 0) { return res.status(401).json({ message: 'No Plants Exist' }); }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(400).json({ message: 'Could Not Query Plants'});
        }
    });

    // Get Plant With Name
    app.get('/plants/plantbyname', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const result = await Plant.findPlantByName(body.name);
            if (result.length === 0) { return res.status(401).json({ message: 'No Plants With Name Exist' }); }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(400).json({ message: 'Could Not Query Plants With Name'});
        }
    });

    // Get Plant With Category
    app.get('/plants/plantbycategory', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const result = await Plant.findPlantByCategory(body.category);
            if (result.length === 0) { return res.status(401).json({ message: 'No Plants With Category Exist' }); }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(400).json({ message: 'Could Not Query Plants With Category'});
        }
    });

    // Get Plant With Climate
    app.get('/plants/plantbyclimate', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const result = await Plant.findPlantByClimate(body.climate);
            if (result.length === 0) { return res.status(401).json({ message: 'No Plants With Climate Exist' }); }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(400).json({ message: 'Could Not Query Plants With Climate'});
        }
    });

    // Updates (PUT)

    // Update Description
    app.put('/plants/updatedescription', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            result = await Plant.updateDescription(body.name, body.description);
            if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Plant' }); }
            result = await Plant.findPlantByName(body.name);
            return res.status(200).json(result); 
        } catch (err) {
            return res.status(400).json({ message: 'Could Not Update Description' });
        }
    });

    // Update Category
    app.put('/plants/updatecategory', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            result = await Plant.updateCategory(body.name, body.category);
            if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Plant' }); }
            result = await Plant.findPlantByName(body.name);
            return res.status(202).json(result); 
        } catch (err) {
            return res.status(400).json({ message: 'Could Not Update Category' });
        }
    });

    // Update Climate
    app.put('/plants/updateclimate', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            result = await Plant.updateClimate(body.name, body.climate);
            if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Plant' }); }
            result = await Plant.findPlantByName(body.name);
            return res.status(202).json(result); 
        } catch (err) {
            return res.status(400).json({ message: 'Could Not Update Climate' });
        }
    });

    // Update Picture
    app.put('/plants/updatepicture', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            result = await Plant.updatePicture(body.name, body.picture);
            if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Plant' }); }
            result = await Plant.findPlantByName(body.name);
            return res.status(202).json(result); 
        } catch (err) {
            return res.status(400).json({ message: 'Could Not Update Picture' });
        }
    });

    // Update Water
    app.put('/plants/updatewater', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            result = await Plant.updateWater(body.name, body.water);
            if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Plant' }); }
            result = await Plant.findPlantByName(body.name);
            return res.status(202).json(result); 
        } catch (err) {
            return res.status(400).json({ message: 'Could Not Update Water Levels' });
        }
    });

    // Update Sunlight
    app.put('/plants/updatesunlight', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            result = await Plant.updateSunlight(body.name, body.sunlight);
            if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Plant' }); }
            result = await Plant.findPlantByName(body.name);
            return res.status(202).json(result); 
        } catch (err) {
            return res.status(400).json({ message: 'Could Not Update Sunlight Levels' });
        }
    });

    // Update Soil
    app.put('/plants/updatesoil', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            result = await Plant.updateSoil(body.name, body.soil);
            if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Plant' }); }
            result = await Plant.findPlantByName(body.name);
            return res.status(202).json(result); 
        } catch (err) {
            return res.status(400).json({ message: 'Could Not Update Optimal Soil' });
        }
    });

    // Delete (DELETE)

    // Delete Plant
    app.delete('/plants/deleteplant', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            result = await Plant.findPlantByName(body.name);
            if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Plant' }); }
            result = await Plant.deletePlant(body.name);
            return res.status(204).json({ message: 'Successfully Deleted Plant' });
        } catch (err) {
            return res.status(400).json({ message: 'Could Not Delete Plant' });
        }
    });

}
