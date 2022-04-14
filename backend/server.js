// Some Other Config Statements
require('dotenv').config()
const cors = require('cors');

// Standard Require Statements
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const mysqlConnect = require('./db');

// Actual Routes
const sessionRoutes = require('./routes/session');
// const userRoutes = require('./routes/users');

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

// Calls Routes (App.Use)
sessionRoutes(app, logger);
// userRoutes(app, logger);

// Connecting Express To Listen To Config Port
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
