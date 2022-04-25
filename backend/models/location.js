const knex = require('knex');

const LOCATION_TABLE = 'location';

const createNewLocation = async (cityName, tempLow, tempHigh, lastUpdate, weatherType, nearestStore) => {
    const query = knex(LOCATION_TABLE).insert({ cityName, tempLow, tempHigh, lastUpdate, weatherType, nearestStore });
    console.log('Raw query for createNewLocation:', query.toString());
    const result = await query;
    return result;
};

const getAllLocations = async () => {
    const query = knex(LOCATION_TABLE);
    const result = await query;
    return result;
};

const findLocationByName = async (cityName) => {
    const query = knex(LOCATION_TABLE).where({ cityName });
    const result = await query;
    return result;
};

const findLocationByWeather = async (weatherType) => {
    const query = knex(LOCATION_TABLE).where({ weatherType });
    const result = await query;
    return result;
};

const updateLocationTemps = async (cityName, tempLow, tempHigh) => {
    const query = knex(LOCATION_TABLE).where({cityName}).update({tempLow, tempHigh});
    const result = await query;
    return result;
};

const updateLocationWeather = async (cityName, weatherType) => {
    const query = knex(LOCATION_TABLE).where({cityName}).update({weatherType});
    const result = await query;
    return result;
};

const updateLocationStore = async (cityName, nearestStore) => {
    const query = knex(LOCATION_TABLE).where({cityName}).update({nearestStore});
    const result = await query;
    return result;
};

const deleteLocation = async (cityName) => {
    const query = knex(LOCATION_TABLE).where({cityName}).del();
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