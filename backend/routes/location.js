const express = require('express');
const pool = require('../db');

const locationController = require('../controllers/location');
const location = require('../models/location');

const { authenticateJWT, authenticateWithClaims } = require('../middleware/auth');

module.exports = function routes(app, logger){


    app.post('/newLocation', authenticateJWT, async (req, res) => {
        const body = req.body;
        try {
            const result = await locationController.createNewLocation(body.cityName, body.tempLow, body.tempHigh, body.lastUpdate, body.weatherType, body.nearestStore);
            return res.status(200).json(result); 
            } catch (err) {
                console.log("ERROR HERE IDIOT: " + err);
              return res.status(401).json({ message: "Failed to make a new location." });
            }
        
    });


    app.get('/allLocations', authenticateJWT, async (req, res) => {
        try {
            console.log("ERROR 1");
            const result = await locationController.getAllLocations();
            res.status(200).json(result);
          } catch (err) {
            res.status(401).json({ message: 'Could Not Get All Locations'});
          }
        });


    app.get('/locationByCityName', authenticateJWT, async (req, res, next) => {
        try {
            var stadio = req.query.owner;
            if (req.query.owner == undefined){
                stadio = null;
            }
            const result = await locationController.findLocationByName(stadio);
            console.log("HERE RESULT: " + result);
            res.status(200).json(result);
            
        } catch (err) {
            console.error("Failed to get this location: ", err);
            res.sendStatus(500).json({ message: err.toString() });
        }

});

app.get('/locationByWeather', authenticateJWT, async (req, res, next) => {
    try {
        var stadio = req.query.owner;
        if (req.query.owner == undefined){
            stadio = null;
        }
        const result = await locationController.findLocationByWeather(stadio);
        console.log("HERE RESULT: " + result);
        res.status(200).json(result);
        
    } catch (err) {
        console.error("Failed to get this location: ", err);
        res.sendStatus(500).json({ message: err.toString() });
    }

});

app.put('/updateLocationTemps', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await locationController.updateLocationTemps(body.cityName, body.tempLow, body.tempHigh);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Update temperatures' });
    }
  });

  app.put('/updateLocationWeather', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await locationController.updateLocationWeather(body.cityName, body.weatherType);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Update weather' });
    }
  });

  app.put('/updateLocationStore', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await locationController.updateLocationStore(body.cityName, body.nearestStore);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Update store' });
    }
  });

  app.delete('/deleteLocation', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await User.findLocationByName(body.cityName);
      if (Object.keys(result).length == 0) {
        return res.status(401).json({ message: 'Location Does Not Exist' }); }
      result = await locationController.deleteLocation(body.cityName);
      return res.status(204).json(result);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Delete location' });
    }
  });





}