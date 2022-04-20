const ownedPlant = require('../models/ownedPlants');

const createNewOwnedPlant = async (owner, name, privateTag, insideTag) => {

    const query = ownedPlant.createNewOwnedPlant(owner, name, privateTag, insideTag);
    console.log('Raw query for createNewOwnedPlant:', query.toString());
    const result = await query;
    return result;
};



module.exports = {
    createNewOwnedPlant
}