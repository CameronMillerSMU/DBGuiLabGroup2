const knex = require('../database/knex');

const PLANT_TABLE = 'flora.plants';

// Create (POST)

// Create Plant With All Provided Information, Do Checks
const createNewPlant = async (name, description, category, climate, picture, water, sunlight, soil) => {

    // Need Name
    if (!name) {
        return {
            success: false,
            message: 'Name Required'
        }
    }

    const query = knex(PLANT_TABLE).insert({name, description: description, category: category, climate: climate, imagePath: picture, water: water, sunlight: sunlight, soil: soil});
    result = await query;
    result['success'] = true;
    return result;

};

// Requests (GET)

// Find All Plants
const getAllPlants = async () => {
    const query = knex(PLANT_TABLE);
    const result = await query;
    return result;
};

// Get Plant With Name
const findPlantByName = async (name) => {
    const query = knex(PLANT_TABLE).where({name});
    const result = await query;
    return result;
};

// Get Plant With Category
const findPlantByCategory = async (category) => {
    const query = knex(PLANT_TABLE).where({category});
    const result = await query;
    return result;
};

// Get Plant With Climate
const findPlantByClimate = async (climate) => {
    const query = knex(PLANT_TABLE).where({climate});
    const result = await query;
    return result;
};

// Updates (PUT)

// Update Description
const updateDescription = async (name, new_description) => {
    const query = knex(PLANT_TABLE).where({name}).update({description: new_description});
    const result = await query;
    return result;
};

// Update Category
const updateCategory = async (name, new_category) => {
    const query = knex(PLANT_TABLE).where({name}).update({category: new_category});
    const result = await query;
    return result;
};

// Update Climate
const updateClimate = async (name, new_climate) => {
    const query = knex(PLANT_TABLE).where({name}).update({climate: new_climate});
    const result = await query;
    return result;
};

// Update Picture
const updatePicture = async (name, new_picture) => {
    const query = knex(PLANT_TABLE).where({name}).update({imagePath: new_picture});
    const result = await query;
    return result;
};

// Update Water
const updateWater = async (name, new_water) => {
    const query = knex(PLANT_TABLE).where({name}).update({water: new_water});
    const result = await query;
    return result;
};

// Update Sunlight
const updateSunlight = async (name, new_sunlight) => {
    const query = knex(PLANT_TABLE).where({name}).update({sunlight: new_sunlight});
    const result = await query;
    return result;
};

// Update Soil
const updateSoil = async (name, new_soil) => {
    const query = knex(PLANT_TABLE).where({name}).update({soil: new_soil});
    const result = await query;
    return result;
};

// Delete (DELETE)

// Delete Plant
const deletePlant = async (name) => {
    const query = knex(PLANT_TABLE).where({name}).del();
    const result = await query;
    return result;
};

module.exports = {
    createNewPlant,
    getAllPlants,
    findPlantByName,
    findPlantByCategory,
    findPlantByClimate,
    updateDescription,
    updateCategory,
    updateClimate,
    updatePicture,
    updateWater,
    updateSunlight,
    updateSoil,
    deletePlant
};
