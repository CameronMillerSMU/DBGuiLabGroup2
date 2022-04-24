const ownedPlant = require('../models/ownedPlants');

const createNewOwnedPlant = async (owner, name, privateTag, insideTag) => {
    const query = ownedPlant.createNewOwnedPlant(owner, name, privateTag, insideTag);
    console.log('Raw query for createNewOwnedPlant:', query.toString());
    const result = await query;
    return result;
};

const getAllOwnedPlants = async () => {
    const query = ownedPlant.getAllOwnedPlants();
    console.log('Raw query for getAllOwnedPlant:', query.toString());
    const result = await query;
    return result;
}

const findOwnedPlantsByOwner = async (owner) => {
    const query = ownedPlant.findOwnedPlantsByOwner(owner);
    console.log('Raw query for findOwnedPlantsByOwner: ', query.toString());
    const result = await query;
    return result;
}

const findOwnedPlantByName = async (name) => {
    const query = ownedPlant.findOwnedPlantByName(name);
    console.log('Raw query for findOwnedPlantsByName: ', query.toString());
    const result = await query;
    return result;
}


const findOwnedPlantById = async (id) => {
    const query = ownedPlant.findOwnedPlantById(id);
    console.log('Raw query for findOwnedPlantById: ', query.toString());
    const result = await query;
    return result;
}

const getAllOwnedPlantsExcludePrivate = async () => {
    const query = ownedPlant.getAllOwnedPlantsExcludePrivate();
    console.log('Raw query for getAllOwnedPlantsExcludePrivate: ', query.toString());
    const result = await query;
    return result;
}

const findOwnedPlantsByOwnerExcludePrivate = async (owner) => {
    const query = ownedPlant.findOwnedPlantsByOwnerExcludePrivate(owner);
    console.log('Raw query for findOwnedPlantsByOwnerExcludePrivate: ', query.toString());
    const result = await query;
    return result;
}

const findOwnedPlantByNameExcludePrivate = async (name) => {
    const query = ownedPlant.findOwnedPlantByNameExcludePrivate(name);
    console.log('Raw query for findOwnedPlantsByNameExcludePrivate: ', query.toString());
    const result = await query;
    return result;
}

const findOwnedPlantByIdExcludePrivate = async (id) => {
    const query = ownedPlant.findOwnedPlantByIdExcludePrivate(id);
    console.log('Raw query for findOwnedPlantsByIdExcludePrivate: ', query.toString());
    const result = await query;
    return result;
}


module.exports = {
    createNewOwnedPlant,
    findOwnedPlantsByOwner,
    findOwnedPlantById,
    findOwnedPlantByName,
    findOwnedPlantsByOwnerExcludePrivate,
    findOwnedPlantByIdExcludePrivate,
    findOwnedPlantByNameExcludePrivate,
    getAllOwnedPlants,
    getAllOwnedPlantsExcludePrivate

}