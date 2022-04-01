const knex = require('knex');

const LOCATION_TABLE = 'location';

const createNewLocation = async (cityName, tempLow, tempHigh, lastUpdate, weatherType, nearestStore) => {
    const query = knex(LOCATION_TABLE).insert({ cityName, tempLow, tempHigh, lastUpdate, weatherType, nearestStore });
    console.log('Raw query for createNewCity:', query.toString());
    const result = await query;

    return result;
};

const getAllLocations = async () => {
    const query = knex(LOCATION_TABLE);
    const result = await query;
    return result;
}

const findLocationByName = async (name) => {
    const query = knex(LOCATION_TABLE).where({ name });
    const result = await query;
    return result;
}

const findLocationByWeather = async (weather) => {
    const query = knex(LOCATION_TABLE).where({ weather });
    const result = await query;
    return result;
}

module.exports = {
    createNewLocation,
    findLocationByName,
    findLocationByWeather,
    getAllLocations
};