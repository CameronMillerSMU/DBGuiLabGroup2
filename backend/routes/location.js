const express = require('express');

const Location = require('../models/location');

const { authenticateJWT, authenticateWithClaims } = require('../middleware/auth');

module.exports = function routes(app, logger){

  // Create (POSTS)

  // Create New Location: Cityname, tempLow, tempHigh, ImagePath (Picture), Water, Sunlight, Soil
  app.post('/location/newlocation', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await Location.createNewLocation(body.city, body.low, body.high, body.weathertype, body.neareststore);
      if (result.success) {
        result = await Location.findLocationByName(body.city);
        return res.status(201).json(result); } 
      else { return res.status(400).json(result); }
    } catch (err) {
      return res.status(400).json({ message: 'Duplicate Entry' });
    }
  });

  // Requests (GETS)

  // Get All Locations
  app.get('/location/alllocations', async (req, res) => {
    try {
      const result = await Location.getAllLocations();
      if (result.length === 0) { return res.status(401).json({ message: 'No Locations Exist' }); }
      return res.status(200).json(result);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Query Locations' });
    }
  });

  // Get Location With Name
  app.get('/location/locationbyname', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      const result = await Location.findLocationByName(body.city);
      if (result.length === 0) { return res.status(401).json({ message: 'No Locations With Name Exist' }); }
      return res.status(200).json(result);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Query Location With Name' });
    }
  });

  // Get Location With Weather
  app.get('/location/locationbyweather', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      const result = await Location.findLocationByWeather(body.weathertype);
      if (result.length === 0) { return res.status(401).json({ message: 'No Locations With Weather Exist' }); }
      return res.status(200).json(result);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Query Location With Weather' });
    } 
  });

  // Updates (PUT) (Each Update Latest Update)

  // Update Temperature
  app.put('/location/updatetemperature', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await Location.updateLocationTemps(body.city, body.low, body.high);
      if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Location' }); }
      result = await Location.findLocationByName(body.city);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Update Temperatures' });
    }
  });

  // Update Weather
  app.put('/location/updateweather', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await Location.updateLocationWeather(body.city, body.weather);
      if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Location' }); }
      result = await Location.findLocationByName(body.city);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Update Weather' });
    }
  });

  // Update Nearest Store
  app.put('/location/updatestore', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await Location.updateLocationStore(body.city, body.neareststore);
      if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Location' }); }
      result = await Location.findLocationByName(body.city);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Update store' });
    }
  });

  // Delete (DELETE)

  // Delete Location
  app.delete('/location/deletelocation', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await Location.findLocationByName(body.city);
      if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Location' }); }
      result = await Location.deleteLocation(body.city);
      return res.status(204).json({ message: 'Successfully Deleted Plant' });
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Delete Location' });
    }
  });

}
