const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Location = require('../models/location');

const accessTokenSecret = 'mysupercoolsecret';

const createNewLocation = async (cityName, tempLow, tempHigh, lastUpdate, weatherType, nearestStore) => {
    const query = Location.createNewLocation(cityName, tempLow, tempHigh, lastUpdate, weatherType, nearestStore);
    console.log('Raw query for createNewLocation:', query.toString());
    const result = await query;
    return result;
};

const getAllLocations = async () => {
    const query = Location.getAllLocations();
    const result = await query;
    return result;
}

const findLocationByName  = async (name) => {
    const query = Location.findLocationByName(name);
    const result = await query;
    return result;
}

const findLocationByWeather  = async (weather) => {
    const query = Location.findLocationByWeather(weather);
    const result = await query;
    return result;
}

module.exports = {
    getAllLocations,
    findLocationByName,
    findLocationByWeather
};