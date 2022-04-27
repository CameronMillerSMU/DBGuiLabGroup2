const express = require('express');
const pool = require('../db');

const User = require('../models/users');
const ownedPlant = require('../models/ownedPlants');

const { authenticateJWT, authenticateWithClaims } = require('../middleware/auth');

module.exports = function routes(app, logger){
    app.get('/ownedplants/allowned', authenticateJWT, async (req, res) => {
        try {
            console.log("ERROR 1");
            const result = await ownedPlant.getAllOwnedPlants();
            res.status(200).json(result);
          } catch (err) {
            res.status(400).json({ message: 'Could Not Get All Plants'});
          }
        })

    app.post('/ownedplants/newowned', authenticateJWT, async (req, res) => {
        const body = req.body;
        try {
            const result = await ownedPlant.createNewOwnedPlant(body.owner, body.name, body.privateTag, body.insideTag);
            return res.status(201).json(result); 
            } catch (err) {
                console.log("ERROR HERE IDIOT: " + err);
              return res.status(400).json({ message: "Failed to make a new owned plant." });
            }
        
    })

    app.get('/ownedplants/byowner', authenticateJWT, async (req, res, next) => {
        try {
            var stadio = req.body.owner;
            if (req.body.owner == undefined){
                stadio = req.query.owner;
            }
            const result = await ownedPlant.findOwnedPlantsByOwner(stadio);
            console.log("HERE RESULT: " + result);
            res.status(200).json(result);
            
        } catch (err) {
            console.error("Failed to get this user's plants: ", err);
            res.sendStatus(400).json({ message: err.toString() });
        }

})

app.get('/ownedplants/byname', authenticateJWT, async (req, res, next) => {
    try {
        var stadio = req.body.name;
        if (req.body.name == undefined){
            stadio = req.query.name;
        }
        const result = await ownedPlant.findOwnedPlantsByName(stadio);
        console.log("HERE RESULT: " + result);
        res.status(200).json(result);
        
    } catch (err) {
        console.error("Failed to get these owned plants: ", err);
        res.sendStatus(400).json({ message: err.toString() });
    }

})


app.get('/ownedplants/byid', authenticateJWT, async (req, res, next) => {
    try {
        var stadio = req.body.id;
        if (req.body.id == undefined){
            stadio = req.query.id;
        }
        else{
        const result = await ownedPlant.findOwnedPlantsById(stadio);
        console.log("HERE RESULT: " + result);
        res.status(200).json(result);}
        
    } catch (err) {
        console.error("Failed to get these owned plants: ", err);
        res.sendStatus(400).json({ message: err.toString() });
    }

})

app.get('/ownedplants/publicowned', authenticateJWT, async (req, res) => {
    try {
        
        result = await ownedPlant.getAllOwnedPlantsExcludePrivate();
        if (result.success) {
          return res.status(201).json(result); } 
        else { return res.status(400).json(result); }
      } catch (err) {
        return res.status(400).json({ message: "Can't get all public owned plants." });
      }
    
})

app.get('/ownedplants/byownerpublic', authenticateJWT, async (req, res, next) => {
    try {
        var stadio = req.body.owner;
        if (req.body.owner == undefined){
            stadio = req.query.owner;
        }
        const result = await ownedPlant.findOwnedPlantsByOwnerExcludePrivate(stadio);
        console.log("HERE RESULT: " + result);
        res.status(200).json(result);
        
    } catch (err) {
        console.error("Failed to get this user's plants: ", err);
        res.sendStatus(400).json({ message: err.toString() });
    }

})

app.get('/ownedplants/bynamepublic', authenticateJWT, async (req, res, next) => {
    try {
        var stadio = req.body.name;
        if (req.body.name == undefined){
            stadio = req.query.name;
        }
        const result = await ownedPlant.findOwnedPlantsByNameExceptPrivate(stadio);
        console.log("HERE RESULT: " + result);
        res.status(200).json(result);
        
    } catch (err) {
        console.error("Failed to get these owned plants: ", err);
        res.sendStatus(400).json({ message: err.toString() });
    }

})

app.get('/ownedplants/byidpublic', authenticateJWT, async (req, res, next) => {
    try {
        var stadio = req.body.id;
        if (req.body.id == undefined){
            stadio = req.query.id;
        }
        else{
        const result = await ownedPlant.findOwnedPlantsByIdExcludingPrivate(stadio);
        console.log("HERE RESULT: " + result);
        res.status(200).json(result);}
        
    } catch (err) {
        console.error("Failed to get these owned plants: ", err);
        res.sendStatus(400).json({ message: err.toString() });
    }

})




}