const Plant = require('../models/plants');


const createNewPlant = async (name, description, category, climate, imagePath) => {

    const query = Plant.createNewPlant(name, description, category, climate, imagePath);
    console.log('Raw query for createNewPlant:', query.toString());
    const result = await query;

    return result;
};

const getAllPlants = async () => {
    const query = Plant.getAllPlants();
    const result = await query;
    return result;
}

const findPlantByName = async (name) => {
    const query = Plant.findPlantByName(name);
    const result = await query;
    return result;
}

const findPlantByCategory = async (category) => {
    const query = Plant.findPlantByCategory(category);
    const result = await query;
    return result;
}

const findPlantByClimate = async (climate) => {
    const query = Plant.findPlantByClimate(climate);
    const result = await query;
    return result;
}

module.exports = {
    createNewPlant,
    findPlantByName,
    findPlantByCategory,
    findPlantByClimate,
    getAllPlants
};