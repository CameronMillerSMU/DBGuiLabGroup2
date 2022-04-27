const knex = require('../database/knex');

const LOCATION_TABLE = 'flora.location';

// Create (POST)

// Create Location With All Provided Information, Do Checks
const createNewLocation = async (cityName, tempLow, tempHigh, weatherType, nearestStore) => {

    // Need City Name
    if (!cityName) {
        return {
            success: false,
            message: 'City Name Required'
        }
    }

    const query = knex(LOCATION_TABLE).insert({cityName, tempLow: tempLow, tempHigh: tempHigh, lastUpdate: new Date(), weatherType: weatherType, nearestStore: nearestStore});
    result = await query;
    result['success'] = true;
    return result;

};

// Requests (GET)

// Find All Locations
const getAllLocations = async () => {
    const query = knex(LOCATION_TABLE);
    const result = await query;
    return result;
};

// Get Location With Name
const findLocationByName = async (cityName) => {
    const query = knex(LOCATION_TABLE).where({cityName});
    const result = await query;
    return result;
};

// Get Location With Weather
const findLocationByWeather = async (weatherType) => {
    const query = knex(LOCATION_TABLE).where({weatherType});
    const result = await query;
    return result;
};

// Updates (PUT)

// Update Low and High (Temperature)
const updateLocationTemps = async (cityName, tempLow, tempHigh) => {
    const query = knex(LOCATION_TABLE).where({cityName}).update({tempLow: tempLow, tempHigh: tempHigh, lastUpdate: new Date()});
    const result = await query;
    return result;
};

// Update Weather Type
const updateLocationWeather = async (cityName, weatherType) => {
    const query = knex(LOCATION_TABLE).where({cityName}).update({weatherType: weatherType, lastUpdate: new Date()});
    const result = await query;
    return result;
};

// Update Nearest Store
const updateLocationStore = async (cityName, nearestStore) => {
    const query = knex(LOCATION_TABLE).where({cityName}).update({nearestStore: nearestStore, lastUpdate: new Date()});
    const result = await query;
    return result;
};

// Delete (DELETE)

// Delete Location
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
