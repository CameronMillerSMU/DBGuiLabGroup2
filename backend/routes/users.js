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

  // Create (POSTS)

  // Post NewUser -> JSON Object To New User
  app.post('/register', async (req, res) => {
    try {
      const body = req.body;
      result = await User.createNewUser(body[0], body[1]);
      if (result.success) {
        const token = await UserController.authenticateUser(body[0], body[1]);
        return res.status(201).json({ data: token }); } 
      else { return res.status(400).json(result); }
    } catch (err) {
      return res.status(400).json({ message: 'Duplicate Entry' });
    }
  });

  // Post Token -> JSON Object To New User (Login)
  app.post('/login', async (req, res) => {
    try {
      const body = req.body;
      const result = await UserController.authenticateUser(body.username, body.password);
      if (result == null) {
        return res.status(401).json({ message: 'Body Does Not Match Existing Credentials' }); }
      return res.status(200).send({ data: { jwt: result, username }});
    } catch (err) {
      return res.status(401).json({ message: 'Body Does Not Match Existing Credentials' });
    }
  });

  // Requests (GETS)

  // If Token, Get Username (User = Token) (Get Login)
  app.get('/session', authenticateJWT, async (req, res)  => {
    try {
      const user = req.user;
      const result = await User.findByUserName(user.username);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(401).json({ message: 'Bad Token' });
    }
  });

  // Get All Users
  app.get('/users', authenticateJWT, async (req, res) => {
    try {
      const result = await User.getUsers();
      res.status(200).json(result);
    } catch (err) {
      res.status(401).json({ message: 'Could Not Query Users' });
    }
  });

   // Find All Public Users 
   app.get('/publicusers', authenticateJWT, async (req, res) => {
    try {
      const result = await User.getUsersPublic();
      res.status(200).json(result);
    } catch (err) {
      res.status(401).json({ message: 'Could Not Query Public Users' });
    }
  });

  // Find All Registered Users
  app.get('/registeredusers', authenticateJWT, async (req, res) => {
    try {
      const result = await User.getUsersRegistered();
      res.status(200).json(result);
    } catch (err) {
      res.status(401).json({ message: 'Could Not Query Registered Users' });
    }
  });

  // Find Specified User
  app.get('/user', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await User.findByUserName(body.username);
      res.status(200).json(result[0]);
    } catch (err) {
      res.status(401).json({ message: 'Could Not Find User' });
    }
  });

  // User Updates

  // Update Password
  app.put('/updatepassword', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await User.updatePassword(body.username, body.password);
      result = await User.findByUserName(body.username);
      return res.status(200).json(result); 
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Update Password' });
    }
  });

  // Update Birthday (Can Be Called With Time As Well)
  app.put('/updatebirthday', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await User.updateBirthday(body.username, body.birthday);
      result = await User.findByUserName(body.username);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Update Birthday' });
    }
  });

  // Update Location
  app.put('/updatelocation', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await User.updateLocation(body.username, body.location);
      result = await User.findByUserName(body.username);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Update Location' });
    }
  });

  // Update Registration (0 = False, 1 = True, TINYINT)
  app.put('/updateregistration', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await User.updateRegistration(body.username, body.registration);
      result = await User.findByUserName(body.username);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Register User' });
    }
  });

  // Update Privacy (0 = False, 1 = True, TINYINT)
  app.put('/updateprivacy', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await User.updatePrivacy(body.username, body.privacy);
      result = await User.findByUserName(body.username);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Update Privacy' });
    }
  });

  // Update Picture
  app.put('/updatepicture', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await User.updatePicture(body.username, body.picture);
      result = await User.findByUserName(body.username);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Update Picture' });
    }
  });

  // Update Background
  app.put('/updatebackground', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await User.updateBackground(body.username, body.background);
      result = await User.findByUserName(body.username);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Update Background' });
    }
  });

  // Delete

  // Delete User
  app.delete('/deleteuser', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await User.findByUserName(body.username);
      if (Object.keys(result).length == 0) {
        return res.status(401).json({ message: 'User Does Not Exist' }); }
      result = await User.deleteUserName(body.username);
      return res.status(204).json(result);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Delete User' });
    }
  });

}
