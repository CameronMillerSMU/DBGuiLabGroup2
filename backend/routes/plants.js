const express = require('express');
const PlantController = require('../controllers/plants');

module.exports = function routes(app, logger) {

}

// router.post('/', async (req, res, next) => {
//     try {
//         const body = req.body;
//         console.log(body);
//         //name, description, category, climate, imagePath
//         const result = await PlantController.createNewPlant(body.name, body.description, body.category, body.climate, body.imagePath);
//         res.status(201).json(result);
//     } catch (err) {
//         console.error('Failed to create new Plant:', err);
//         res.status(500).json({ message: err.toString() });
//     }

//     next();
// })

// module.exports = router;
