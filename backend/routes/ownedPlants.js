const express = require('express');

const ownedPlantController = require('../controllers/ownedPlants');
const User = require('../models/users');
const ownedPlant = require('../models/ownedPlants');
const router = express.Router();

const { authenticateJWT, authenticateWithClaims } = require('../middleware/auth');




module.exports = function routes(app, logger){
    app.get('/', authenticateJWT, async (req, res) => {
        try {
            
        }
        catch(err){
            return res.status(400).json({ message: 'Failed to get all Owned Plants' });
        }
    })
};