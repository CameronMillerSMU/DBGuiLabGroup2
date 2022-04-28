const knex = require('../database/knex');

const WISH_TABLE = 'flora.wishTicket';

// Create (POST)

// Create Wish Ticket With All Provided Information, Do Checks
const createNewWishTicket = async (username, plant) => {

    // Need Username
    if (!username) {
        return {
            success: false,
            message: 'Username Required'
        }
    }

    // Need Plant Name
    if (!plant) {
        return {
            success: false,
            message: 'Plant Name Required'
        }
    }

    const query = knex(WISH_TABLE).insert({username: username, plant: plant});
    const result = await query;
    result['success'] = true;
    return result;

};

// Requests (GET)

// Get All Tickets
const getAllWishTickets = async () => {
    const query = knex(WISH_TABLE);
    const result = await query;
    return result;
};

const findWishTicketByTicketId = async (ticketId) => {
    const query = knex(WISH_TABLE).where({ticketId});
    const result = await query;
    return result;
};

// Find Tickets By Username
const findWishTicketsByUser = async (username) => {
    const query = knex(WISH_TABLE).where({username});
    const result = await query;
    return result;
};

// Find Tickets By Username and Plant Name
const findWishTicketsByBoth = async (username, plant) => {
    const query = knex(WISH_TABLE).where({username, plant});
    const result = await query;
    return result;
};

// Delete (DELETE)

// Delete Any Ticket With Id
const deleteWishTicket = async (ticketId) => {
    const query = knex(WISH_TABLE).where({ticketId}).del();
    const result = await query;
    return result;
};

module.exports = {
    createNewWishTicket,
    getAllWishTickets,
    findWishTicketByTicketId,
    findWishTicketsByUser,
    findWishTicketsByBoth,
    deleteWishTicket
};
