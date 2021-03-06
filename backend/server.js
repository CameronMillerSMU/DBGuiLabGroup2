// Some Other Config Statements (Env Stuff)
require('dotenv').config()

// Standard Require Statements
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Actual Routes /session
const usersRoutes = require('./routes/users');
const plantsRoutes = require('./routes/plants');
const ownedPlantRoutes = require('./routes/ownedPlants');
const locationRoutes = require('./routes/location');
const forumRoutes = require('./routes/forum');
const commentRoutes = require('./routes/comment');
const wishRoutes = require('./routes/wishTicket');
const plantPostRoutes = require('./routes/plantpost');

// Middleware Require
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');

// Express Configuration
const config = {
  name: 'plants-app',
  port: 8000,
  host: '0.0.0.0',
};

// Create Express Object
const app = express();

// Logger Object: Instead of Outputting Stuff to Console!
const logger = log({ console: true, file: false, label: config.name });

// Middleware Specifications
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));
app.use(ExpressAPILogMiddleware(logger, { request: true }));

// Add Health Route (Testing)
app.get('/health', (req, res) => {
  const body = { status: 'up', config };
  return res.json(body);
});

// Calls Routes (App.Use)
usersRoutes(app, logger);
plantsRoutes(app, logger);
ownedPlantRoutes(app, logger);
locationRoutes(app, logger);
forumRoutes(app, logger);
commentRoutes(app, logger);
wishRoutes(app, logger);
plantPostRoutes(app, logger);

// Connecting Express To Listen To Config Port
app.listen(config.port, config.host, (e) => {
  if (e) { throw new Error('Internal Server Error'); }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
