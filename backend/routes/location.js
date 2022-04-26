const express = require('express');

const Location = require('../models/location');

const { authenticateJWT, authenticateWithClaims } = require('../middleware/auth');

module.exports = function routes(app, logger){

  // Create (POSTS)

  // Create New Location: Cityname, tempLow, tempHigh, lastUpdate, ImagePath (Picture), Water, Sunlight, Soil
  app.post('/location/newlocation', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await Plant.createNewPlant(body.name, body.description, body.category, body.climate, body.picture, body.water, body.sunlight, body.soil);
      if (result.success) {
        result = await Plant.findPlantByName(body.name);
        return res.status(201).json(result[0]); } 
      else { return res.status(400).json(result); }
    } catch (err) {
      return res.status(400).json({ message: 'Duplicate Entry' });
    }
  });


  // Requests (GETS)

  // Get All Locations
  app.get('/alllocations', authenticateJWT, async (req, res) => {
    try {
      const result = await Location.getAllLocations();
      res.status(200).json(result);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Get All Locations'});
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
      result = await location.findLocationByName(body.cityName);
      if (Object.keys(result).length == 0) {
        return res.status(401).json({ message: 'Location Does Not Exist' }); }
      result = await locationController.deleteLocation(body.cityName);
      return res.status(204).json(result);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Delete location' });
    }
  });





}