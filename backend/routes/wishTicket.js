const wishTicket = require('../models/wishTicket');

const { authenticateJWT, authenticateWithClaims } = require('../middleware/auth');

/*
    createNewWishTicket,
    getAllWishTickets,
    findWishTicketsByUser,
    findWishTicketsByPlant,
    findWishTicketByTicketId,
    deleteWishTicket
*/

module.exports = function routes(app, logger) {

    app.post('/wishticket/newticket', authenticateJWT, async (req, res) => {
        const body = req.body;
        try {
            const result = await wishTicket.createNewWishTicket(body.username, body.plant);
            return res.status(201).json(result); 
            } catch (err) {
                console.log("ERROR HERE IDIOT: " + err);
              return res.status(400).json({ message: "Failed to make a new wish ticket." });
            }
        
    })

    app.get('/wishticket/alltickets', authenticateJWT, async (req, res) => {
        try {
            const result = await wishTicket.getAllWishTickets();
            res.status(200).json(result);
          } catch (err) {
            res.status(400).json({ message: 'Could Not Get All Wish Tickets'});
          }
        })

        app.get('/wishticket/byuser', authenticateJWT, async (req, res, next) => {
            try {
                var stadio = req.body.user;
                if (req.body.user == undefined){
                    stadio = req.query.user;
                }
                const result = await wishTicket.findWishTicketsByUser(stadio);
                console.log("HERE RESULT: " + result);
                res.status(200).json(result);
                
            } catch (err) {
                console.error("Failed to get this user's wishes: ", err);
                res.sendStatus(400).json({ message: err.toString() });
            }
    
    })

    app.get('/wishticket/byplant', authenticateJWT, async (req, res, next) => {
        try {
            var stadio = req.body.plant;
            if (req.body.plant == undefined){
                stadio = req.query.plant;
            }
            const result = await wishTicket.findWishTicketsByPlant(stadio);
            console.log("HERE RESULT: " + result);
            res.status(200).json(result);
            
        } catch (err) {
            console.error("Failed to get this plant's wishes: ", err);
            res.sendStatus(400).json({ message: err.toString() });
        }

})

app.get('/wishticket/byid', authenticateJWT, async (req, res, next) => {
    try {
        var stadio = req.body.id;
        if (req.body.id == undefined){
            stadio = req.query.id;
        }
        const result = await wishTicket.findWishTicketsByTicketId(stadio);
        console.log("HERE RESULT: " + result);
        res.status(200).json(result);
        
    } catch (err) {
        console.error("Failed to get this id's wishes: ", err);
        res.sendStatus(400).json({ message: err.toString() });
    }

})

app.delete('/wishticket/delete', authenticateJWT, async (req, res, next) => {
    try {
        var stadio = req.body.id;
        if (req.body.id == undefined){
            stadio = req.query.id;
        }
        const result = await wishTicket.deleteWishTicket(stadio);
        console.log("HERE RESULT: " + result);
        res.status(200).json(result);
        
    } catch (err) {
        console.error("Failed to delete this wish ticket: ", err);
        res.sendStatus(400).json({ message: err.toString() });
    }

})
    



}