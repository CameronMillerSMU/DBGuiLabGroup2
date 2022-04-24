const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Location = require('../models/location');

const accessTokenSecret = 'mysupercoolsecret';

const createNewLocation = async (cityName, tempLow, tempHigh, lastUpdate, weatherType, nearestStore) => {
    const query = location.createNewLocation(cityName, tempLow, tempHigh, lastUpdate, weatherType, nearestStore);
    console.log('Raw query for createNewLocation:', query.toString());
    const result = await query;
    return result;
};

const getAllLocations = async () => {
    const query = location.getAllLocations();
    const result = await query;
    return result;
};

const findLocationByName  = async (name) => {
    const query = location.findLocationByName(name);
    const result = await query;
    return result;
};

const findLocationByWeather  = async (weatherType) => {
    const query = location.findLocationByWeather(weatherType);
    const result = await query;
    return result;
};

const updateLocationTemps = async (cityName, tempLow, tempHigh) => {
    const query = location.updateLocationTemps(cityName, tempLow, tempHigh);
    const result = await query;
    return result;
};

const updateLocationWeather = async (cityName, weatherType) => {
    const query = location.updateLocationWeather(cityName, weatherType);
    const result = await query;
    return result;
};

const updateLocationStore = async (cityName, nearestStore) => {
    const query = location.updateLocationTemps(cityName, nearestStore);
    const result = await query;
    return result;
};

const deleteLocation = async (cityName) => {
    const query = loction.deleteLocation();
    const result = await query;
    return result;
};

module.exports = {
    createNewLocation,
    getAllLocations,
    findLocationByName,
    findLocationByWeather,
    updateLocationTemps,
    updateLocationWeather,
    updateLocationStore,
    deleteLocation
};