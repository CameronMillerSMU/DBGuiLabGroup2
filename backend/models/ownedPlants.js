const knex = require('../database/knex');

const PLANT_TABLE = 'ownedPlants';

const createNewOwnedPlant = async (owner, name, privateTag, insideTag) => {
    const query = knex(PLANT_TABLE).insert({ owner:owner, name:name, privateTag:privateTag, insideTag:insideTag});
    console.log('Raw query for createNewOwnedPlant:', query.toString());
    const result = await query;
    console.log("HERE IDIOT: ");
    return result;
};

const getAllOwnedPlants = async () => {
    //console.log('0 HERE');
    const query = knex(PLANT_TABLE);
    //console.log('1 HERE');
    const result = await query;
    //console.log('2 HERE');
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