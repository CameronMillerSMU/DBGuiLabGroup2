const WishTicket = require('../models/wishTicket');

const { authenticateJWT, authenticateWithClaims } = require('../middleware/auth');

module.exports = function routes(app, logger) {

    // Create (POSTS)

    // Create New Ticket: Username, Plant (FKS)
    app.post('/wishticket/newticket', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            result = await WishTicket.createNewWishTicket(body.username, body.plant);
            if (result.success) {
                result = await WishTicket.findWishTicketsByBoth(body.username, body.plant);
                return res.status(201).json(result); } 
            else { return res.status(400).json(result); } 
        } catch (err) {
            result = await WishTicket.findWishTicketsByBoth(body.username, body.plant);
            return res.status(201).json(result);
        }
    });

    // Requests (GETS)

    // Get All Tickets
    app.get('/wishticket/alltickets', authenticateJWT, async (req, res) => {
        try {
            const result = await WishTicket.getAllWishTickets();
            if (result.length === 0) { return res.status(401).json({ message: 'No Tickets Exist' }); }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Query Tickets' });
        }
    });

    // Get All Tickets By Id
    app.get('/wishticket/byid/:id?', authenticateJWT, async (req, res) => {
        try {
            const params = req.params;
            const result = await WishTicket.findWishTicketByTicketId(params.id);
            if (result.length === 0) { return res.status(401).json({ message: 'No Tickets With Id Exist' }); }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Query Tickets' });
        }
    });

    // Get All Tickets By Username
    app.get('/wishticket/byusername', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const result = await WishTicket.findWishTicketsByUser(body.username);
            if (result.length === 0) { return res.status(401).json({ message: 'User Has No Tickets' }); }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Query Tickets' });
        }
    });

    // Get All Tickets By User And Plant
    app.get('/wishticket/byplant', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const result = await WishTicket.findWishTicketsByBoth(body.username, body.plant);
            if (result.length === 0) { return res.status(401).json({ message: 'No User Tickets With Plant Name Exist' }); }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Query Tickets' });
        }
    });
    
    // Delete (DELETE)

    // Delete Owned Plant
    app.delete('/wishticket/deleteticket/:id?', authenticateJWT, async (req, res) => {
        try {
            const params = req.params;
            result = await WishTicket.findWishTicketByTicketId(params.id);
            if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find Ticket' }); }
            result = await WishTicket.deleteWishTicket(params.id);
            return res.status(204).json({ message: 'Successfully Deleted Ticket' });
        } catch (err) {
            return res.status(401).json({ message: 'Could Not Delete Ticket' });
        }
    });

}
