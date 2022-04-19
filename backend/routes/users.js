const express = require('express');
const UserController = require('../controllers/users');

const { authenticateJWT, authenticateWithClaims } = require('../middleware/auth');

module.exports = function routes(app, logger) {

}

// router.get('/current', async (req, res, next) => {
//     try {
//         const user = req.user;
//         const result = await UserController.findUserByUsername(user.username);
//         res.status(201).json(result);
//     } catch (err) {
//         console.error('Failed to load current user:', err);
//         res.sendStatus(500).json({ message: err.toString() });
//     }
// });

// router.get('/', async (req, res, next) => {
//     try {
//         const body = req.body;
//         console.log(body);
//         const result = await UserController.getAllUsers();
//         res.status(201).json(result);
//     } catch (err) {
//         console.error('Failed to get all users:', err);
//         res.status(500).json({ message: err.toString() });
//     }
// })

// router.post('/', async (req, res, next) => {
//     try {
//         const body = req.body;
//         console.log(body);
//         const result = await UserController.createNewUser(body.username, body.password);
//         res.status(201).json(result);
//     } catch (err) {
//         console.error('Failed to create new user:', err);
//         res.status(500).json({ message: err.toString() });
//     }

//     next();
// })

// module.exports = router;
