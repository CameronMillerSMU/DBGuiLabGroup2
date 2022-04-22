const express = require('express');
const PlantController = require('../controllers/plants');

const { authenticateJWT, authenticateWithClaims } = require('../middleware/auth');

module.exports = function routes(app, logger) {

app.post('/newPlant', async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        //name, description, category, climate, imagePath
        const result = await PlantController.createNewPlant(body.name, body.description, body.category, body.climate, body.imagePath);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to create new Plant:', err);
        res.status(500).json({ message: err.toString() });
    }

})

app.get('/allPlant', authenticateJWT, async (req, res) => {
    try {
        console.log("ERROR 1");
        const result = await PlantController.getAllPlants();
        res.status(200).json(result);
      } catch (err) {
        res.status(401).json({ message: 'Could Not Get All Plants'});
      }
    })

    app.get('/plantByName', authenticateJWT, async (req, res) => {
        try {
            const body = req.body;
            const result = await PlantController.findPlantByName(body.name);
            res.status(200).json(result);
          } catch (err) {
            res.status(401).json({ message: 'Could Not Get Plant by Name'});
          }
        })

        app.get('/plantByCategory', authenticateJWT, async (req, res) => {
            try {
                const body = req.body;
                const result = await PlantController.findPlantByCategory(body.category);
                res.status(200).json(result);
              } catch (err) {
                res.status(401).json({ message: 'Could Not Get Plant by Category'});
              }
            })

            app.get('/plantByClimate', authenticateJWT, async (req, res) => {
                try {
                    const body = req.body;
                    const result = await PlantController.findPlantByClimate(body.climate);
                    res.status(200).json(result);
                  } catch (err) {
                    res.status(401).json({ message: 'Could Not Get Plant by Climate'});
                  }
                })


//     next();
// })
            }
