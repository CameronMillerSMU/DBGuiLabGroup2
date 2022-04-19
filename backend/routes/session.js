const pool = require('../db');
const express = require('express');

const UserController = require('../controllers/users');
const User = require('../models/users');

const { authenticateJWT, authenticateWithClaims } = require('../middleware/auth');

module.exports = function routes(app, logger) {

  // Get Statement (TEST STATEMENT)
  app.get('/', (req, res) => {
    res.status(200).send('Go to 0.0.0.0:3000.');
  });

  // Post NewUser -> JSON Object To New User
  app.post('/newuser', async (req, res) => {
    try {
      const body = req.body;
      result = await User.createNewUser(body.username, body.password);
      if (result.success) {
        result = await User.findByUserName(body.username);
        return res.status(201).json(result[0]); } 
      else { return res.status(400).json(result); }
    } catch (err) {
      return res.status(400).json({ message: 'Duplicate Entry' });
    }
  });

  // Post Token -> JSON Object To New User
  app.post('/token', async (req, res) => {
    try {
      const body = req.body;
      const result = await UserController.authenticateUser(body.username, body.password);
      if (result == null) {
        return res.status(401).json({ message: 'Body Does Not Match Existing Credentials' }); }
      return res.status(201).json(result);
    } catch (err) {
      return res.status(401).json({ message: 'Body Does Not Match Existing Credentials' });
    }
  });

  // If Token, Get Username (User = Token)
  app.get('/session', authenticateJWT, async (req, res)  => {
    try {
      const user = req.user;
      const result = await User.findByUserName(user.username);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(401).json({ message: 'Bad Token' });
    }
  })
}
