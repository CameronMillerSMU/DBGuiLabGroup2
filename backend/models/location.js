const knex = require('knex');

const LOCATION_TABLE = 'location';

// Create (POST)

// Create Plant With All Provided Information, Do Checks
const createNewLocation = async (cityName, tempLow, tempHigh, lastUpdate, weatherType, nearestStore) => {

    // Need City Name
    if (!cityName) {
        return {
            success: false,
            message: 'City Name Required'
        }
    }

    const query = knex(PLANT_TABLE).insert({cityName, tempLow: tempLow, tempHigh: tempHigh, lastUpdate: lastUpdate, weatherType: weatherType, nearestStore: nearestStore});
    result = await query;
    result['success'] = true;
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