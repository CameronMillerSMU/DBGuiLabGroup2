const pool = require('../db');
const express = require('express');
const UserController = require('../controllers/users');
const User = require('../models/users');

module.exports = function routes(app, logger) {

    // Get Statement (TEST STATEMENT)
    app.get('/', (req, res) => {
        res.status(200).send('Go to 0.0.0.0:3000.');
    });

    // Post NewUser -> JSON Object To New User
    app.post('/newuser', async (req, res) => {
        const body = req.body;
        try {
            console.log('Attempting To Create New User');
            result = await User.createNewUser(body.username, body.password);
            console.log('Successfully Created New User');
            return res.status(201).json(result);
        } catch (err) {
            result = await User.getAllUsers(body.username, body.password);
            return res.status(500).json(result);
        }
    });

    // // Post Token ->
    // app.post('/token', async (req, res) => {
    //     try {
    //         console.log('Attempting To Generate User Token');
    //         const body = req.body;
    //         const result = await EmployeeController.authenticateEmployee(body.username, body.password);
    //         if (result == null) {
    //             return res.status(401).json({ message: 'Body Does Not Match Existing Credentials' }); }
    //         return res.status(201).json(result);
    //     } catch (err) {
    //         return res.status(401).json({ message: 'Body Does Not Match Existing Credentials' });
    //     }
    // })

//   router.post('/', async (req, res, next) => {
//     try {
//         const body = req.body;
        
//         const result = await UserController.authenticateUser(body.email, body.password);
//         res.status(201).json(result);
//     } catch (err) {
//         console.error('Failed to create new user:', err);
//         res.status(500).json({ message: err.toString() });
//     }

//     next();
// })

  // POST /reset
  app.post('/reset', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if (err){
        console.log(connection);
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection', err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query
        connection.query('drop table if exists test_table', function (err, rows, fields) {
          if (err) { 
            // if there is an error with the query, release the connection instance and log the error
            connection.release()
            logger.error("Problem dropping the table test_table: ", err); 
            res.status(400).send('Problem dropping the table'); 
          } else {
            // if there is no error with the query, execute the next query and do not release the connection yet
            connection.query('CREATE TABLE `db`.`test_table` (`id` INT NOT NULL AUTO_INCREMENT, `value` VARCHAR(45), PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);', function (err, rows, fields) {
              if (err) { 
                // if there is an error with the query, release the connection instance and log the error
                connection.release()
                logger.error("Problem creating the table test_table: ", err);
                res.status(400).send('Problem creating the table'); 
              } else { 
                // if there is no error with the query, release the connection instance
                connection.release()
                res.status(200).send('created the table'); 
              }
            });
          }
        });
      }
    });
  });

  // POST /createuser
  app.post('/createuser', (req, res) => {
    console.log(req.body.product);
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('INSERT INTO `db`.`test_table` (`value`) VALUES(\'' + req.body.product + '\')', function (err, rows, fields) {
          connection.release();
          if (err) {
            // if there is an error with the query, log the error
            logger.error("Problem inserting into test table: \n", err);
            res.status(400).send('Problem inserting into table'); 
          } else {
            res.status(200).send(`added ${req.body.product} to the table!`);
          }
        });
      }
    });
  });

  // GET /checkdb
  app.get('/values', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        connection.query('SELECT value FROM `db`.`test_table`', function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
            res.status(200).json({
              "data": rows
            });
          }
        });
      }
    });
  });
}