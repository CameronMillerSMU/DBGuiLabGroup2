const express = require('express');
const pool = require('../db');

const ownedPlantController = require('../controllers/ownedPlants');
const User = require('../models/users');
const ownedPlant = require('../models/ownedPlants');

const { authenticateJWT, authenticateWithClaims } = require('../middleware/auth');

module.exports = function routes(app, logger){
    app.get('/allOwned', authenticateJWT, async (req, res) => {
        try {
            console.log("ERROR 1");
            const result = await ownedPlantController.getAllOwnedPlants();
            res.status(200).json(result);
          } catch (err) {
            res.status(401).json({ message: 'Could Not Get All Plants'});
          }
        })

    app.post('/newOwned', authenticateJWT, async (req, res) => {
        const body = req.body;
        try {
            const result = await ownedPlantController.createNewOwnedPlant(body.owner, body.name, body.privateTag, body.insideTag);
            return res.status(200).json(result); 
            } catch (err) {
                console.log("ERROR HERE IDIOT: " + err);
              return res.status(401).json({ message: "Failed to make a new owned plant." });
            }
        
    })

    app.get('/byOwner', authenticateJWT, async (req, res, next) => {
        try {
            var stadio = req.query.owner;
            if (req.query.owner == undefined){
                stadio = null;
            }
            const result = await ownedPlantController.findOwnedPlantsByOwner(stadio);
            console.log("HERE RESULT: " + result);
            res.status(200).json(result);
            
        } catch (err) {
            console.error("Failed to get this user's plants: ", err);
            res.sendStatus(500).json({ message: err.toString() });
        }

})

app.get('/byName', authenticateJWT, async (req, res, next) => {
    try {
        var stadio = req.query.name;
        if (req.query.name == undefined){
            stadio = null;
        }
        const result = await ownedPlantController.findOwnedPlantsByName(stadio);
        console.log("HERE RESULT: " + result);
        res.status(200).json(result);
        
    } catch (err) {
        console.error("Failed to get these owned plants: ", err);
        res.sendStatus(500).json({ message: err.toString() });
    }

})


app.get('/byId', authenticateJWT, async (req, res, next) => {
    try {
        var stadio = req.query.id;
        if (req.query.id == undefined){
            stadio = null;
        }
        else{
        const result = await ownedPlantController.findOwnedPlantsById(stadio);
        console.log("HERE RESULT: " + result);
        res.status(200).json(result);}
        
    } catch (err) {
        console.error("Failed to get these owned plants: ", err);
        res.sendStatus(500).json({ message: err.toString() });
    }

})

app.get('/publicOwned', authenticateJWT, async (req, res) => {
    try {
        
        result = await ownedPlantController.getAllOwnedPlantsExcludePrivate();
        if (result.success) {
          return res.status(201).json(result); } 
        else { return res.status(400).json(result); }
      } catch (err) {
        return res.status(400).json({ message: "Can't get all public owned plants." });
      }
    
})

app.get('/byOwnerPublic', authenticateJWT, async (req, res, next) => {
    try {
        var stadio = req.query.owner;
        if (req.query.owner == undefined){
            stadio = null;
        }
        const result = await ownedPlantController.findOwnedPlantsByOwnerExcludePrivate(stadio);
        console.log("HERE RESULT: " + result);
        res.status(200).json(result);
        
    } catch (err) {
        console.error("Failed to get this user's plants: ", err);
        res.sendStatus(500).json({ message: err.toString() });
    }

})

app.get('/byNamePublic', authenticateJWT, async (req, res, next) => {
    try {
        var stadio = req.query.name;
        if (req.query.name == undefined){
            stadio = null;
        }
        const result = await ownedPlantController.findOwnedPlantsByNameExceptPrivate(stadio);
        console.log("HERE RESULT: " + result);
        res.status(200).json(result);
        
    } catch (err) {
        console.error("Failed to get these owned plants: ", err);
        res.sendStatus(500).json({ message: err.toString() });
    }

})

app.get('/byIdPublic', authenticateJWT, async (req, res, next) => {
    try {
        var stadio = req.query.id;
        if (req.query.id == undefined){
            stadio = null;
        }
        else{
        const result = await ownedPlantController.findOwnedPlantsByIdExcludingPrivate(stadio);
        console.log("HERE RESULT: " + result);
        res.status(200).json(result);}
        
    } catch (err) {
        console.error("Failed to get these owned plants: ", err);
        res.sendStatus(500).json({ message: err.toString() });
    }

})




}