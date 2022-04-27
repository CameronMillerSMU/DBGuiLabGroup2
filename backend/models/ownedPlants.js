const knex = require('../database/knex');

const PLANT_TABLE = 'flora.ownedPlants';

// Create (POST)

// Create Owned Plant With All Provided Information, Do Checks
const createNewOwnedPlant = async (owner, name, privateTag, watered, insideTag, favoriteTag, tasks, picture) => {

    // Need Owner (User)
    if (!owner) {
        return {
            success: false,
            message: 'Owner Required'
        }
    }

    // Need Plant Name
    if (!name) {
        return {
            success: false,
            message: 'Plant Name Required'
        }
    }

    const query = knex(PLANT_TABLE).insert({owner: owner, name: name, privateTag: privateTag, lastWatered: watered, insideTag: insideTag, favoriteTag: favoriteTag, currentTasks: tasks, specificPhoto: picture});
    const result = await query;
    result['success'] = true;
    return result;
    
};

// Requests (GET)

// Get All Owned Plants
const getAllOwnedPlants = async () => {
    const query = knex(PLANT_TABLE);
    const result = await query;
    return result;
};

// Find Owned Plants By Id
const findOwnedPlantById = async (id) => {
    const query = knex(PLANT_TABLE).where({id});
    const result = await query;
    return result;
};

// Find All Owner Owned Plants
const findOwnedPlantsByOwner = async (owner) => {
    const query = knex(PLANT_TABLE).where({owner});
    const result = await query;
    return result;
};

// Find All Owner Owned Plants By Name
const findOwnedPlantByName = async (owner, name) => {
    const query = knex(PLANT_TABLE).where({owner, name});
    const result = await query;
    return result;
};

// Find All Owner Publicly Owned Plants
const findOwnerPublicOwnedPlants = async (owner) => {
    const query = knex(PLANT_TABLE).where({owner, privateTag: 0});
    const result = await query;
    return result;
};

// Find All Owner Inside Owned Plants
const findOwnerInsideOwnedPlants = async (owner) => {
    const query = knex(PLANT_TABLE).where({owner, insideTag: 1});
    const result = await query;
    return result;
};

// Find All Owner Favorited Owned Plants
const findOwnerFavoriteOwnedPlants = async (owner) => {
    const query = knex(PLANT_TABLE).where({owner, favoriteTag: 1});
    const result = await query;
    return result;
};

// Updates (PUT)

// Update Privacy For Owner's Plant (Id)
const updatePrivacy = async (id, new_privacy) => {
    const query = knex(PLANT_TABLE).where({id}).update({privateTag: new_privacy});
    const result = await query;
    return result;
};

// Update Last Watered For Owner's Plant (Id)
const updateLastWatered = async (id, new_last) => {
    const query = knex(PLANT_TABLE).where({id}).update({lastWatered: new_last});
    const result = await query;
    return result;
};

// Update Inside For Owner's Plant (Id)
const updateInside = async (id, new_inside) => {
    const query = knex(PLANT_TABLE).where({id}).update({insideTag: new_inside});
    const result = await query;
    return result;
};

// Update Favorite For Owner's Plant (Id)
const updateFavorite = async (id, new_favorite) => {
    const query = knex(PLANT_TABLE).where({id}).update({favoriteTag: new_favorite});
    const result = await query;
    return result;
};

// Update Tasks For Owner's Plant (Id)
const updateCurrentTasks = async (id, new_tasks) => {
    const query = knex(PLANT_TABLE).where({id}).update({currentTasks: new_tasks});
    const result = await query;
    return result;
};

// Update Picture For Owner's Plant (Id)
const updateSpecificPhoto = async (id, new_picture) => {
    const query = knex(PLANT_TABLE).where({id}).update({specificPhoto: new_picture});
    const result = await query;
    return result;
};

// Delete (DELETE)

// Delete Any Owned Plant With Id
const deleteOwnedPlant = async (id) => {
    const query = knex(PLANT_TABLE).where({id}).del();
    const result = await query;
    return result;
};

module.exports = {
    createNewOwnedPlant,
    getAllOwnedPlants,
    findOwnedPlantsByOwner,
    findOwnedPlantByName,
    findOwnedPlantById,
    findOwnerPublicOwnedPlants,
    findOwnerInsideOwnedPlants,
    findOwnerFavoriteOwnedPlants,
    updatePrivacy,
    updateLastWatered,
    updateInside,
    updateFavorite,
    updateCurrentTasks,
    updateSpecificPhoto,
    deleteOwnedPlant
};
