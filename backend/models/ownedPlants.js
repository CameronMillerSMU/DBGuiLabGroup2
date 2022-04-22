const knex = require('knex');

const PLANT_TABLE = 'ownedPlants';

const createNewOwnedPlant = async (owner, name, privateTag, insideTag) => {
    const query = knex(PLANT_TABLE).insert({ owner, name, privateTag, insideTag});
    console.log('Raw query for createNewOwnedPlant:', query.toString());
    const result = await query;
    return result;
};

const getAllOwnedPlants = async () => {
    const query = knex(PLANT_TABLE);
    const result = await query;
    return result;
}

const findOwnedPlantsByOwner = async (owner) => {
    const query = knex(PLANT_TABLE).where({ owner });
    const result = await query;
    return result;
}

const findOwnedPlantByName = async (name) => {
    const query = knex(PLANT_TABLE).where({ name });
    const result = await query;
    return result;
}

const findOwnedPlantById = async (id) => {
    const query = knex(PLANT_TABLE).where({ id });
    const result = await query;
    return result;
}

const getAllOwnedPlantsExcludePrivate = async () => {
    const query = knex(PLANT_TABLE).where({ privateTag: 0 });
    const result = await query;
    return result;
}

const findOwnedPlantsByOwnerExcludePrivate = async (owner) => {
    const query = knex(PLANT_TABLE).where({ owner, privateTag: 0 });
    const result = await query;
    return result;
}

const findOwnedPlantByNameExcludePrivate = async (name) => {
    const query = knex(PLANT_TABLE).where({ name, privateTag: 0 });
    const result = await query;
    return result;
}

const findOwnedPlantByIdExcludePrivate = async (id) => {
    const query = knex(PLANT_TABLE).where({ id, privateTag: 0 });
    const result = await query;
    return result;
}

module.exports = {
    createNewOwnedPlant,
    findOwnedPlantsByOwner,
    findOwnedPlantByName,
    findOwnedPlantById,
    getAllOwnedPlants,
    findOwnedPlantsByOwnerExcludePrivate,
    findOwnedPlantByNameExcludePrivate,
    findOwnedPlantByIdExcludePrivate,
    getAllOwnedPlantsExcludePrivate
};