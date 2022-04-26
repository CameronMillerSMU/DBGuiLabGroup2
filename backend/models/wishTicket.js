const knex = require('../database/knex');

const WISH_TABLE = 'wishTicket';

const createNewWishTicket = async (username, plant) => {

    const query = knex(WISH_TABLE).insert({ username, plant });
    console.log('Raw query for createNewWishTicket:', query.toString());
    const result = await query;

    return result;
};

const getAllWishTickets = async () => {
    const query = knex(WISH_TABLE);
    const result = await query;
    return result;
};

const findWishTicketsByUser = async (username) => {
    const query = knex(WISH_TABLE).where({ username });
    const result = await query;
    return result;
};

const findWishTicketsByPlant = async (plant) => {
    const query = knex(WISH_TABLE).where({ plant });
    const result = await query;
    return result;
};

const findWishTicketByTicketId = async (ticketId) => {
    const query = knex(WISH_TABLE).where({ ticketId });
    const result = await query;
    return result;
};

const deleteWishTicket = async (ticketId) => {
    const query = knex(WISH_TABLE).where({ ticketId }).del();
    const result = await query;
    return result;
};

module.exports = {
    createNewWishTicket,
    getAllWishTickets,
    findWishTicketsByUser,
    findWishTicketsByPlant,
    findWishTicketByTicketId,
    deleteWishTicket
};