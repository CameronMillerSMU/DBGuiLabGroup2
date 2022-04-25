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
  app.post('/users/register', async (req, res) => {
    try {
      const body = req.body;
      result = await User.createNewUser(body.username, body.password);
      if (result.success) {
        result = await UserController.authenticateUser(body.username, body.password);
        return res.status(201).json(result); } 
      else { return res.status(400).json(result); }
    } catch (err) {
      return res.status(400).json({ message: 'Duplicate Entry' });
    }

  });

  // Post Token -> JSON Object To New User (Login)
  app.post('/users/login', async (req, res) => {
    try {
      const body = req.body;
      const result = await UserController.authenticateUser(body.username, body.password);
      if (result == null) {
        return res.status(400).json({ message: 'Body Does Not Match Existing Credentials' }); }
      return res.status(201).json(result);
    } catch (err) {
      return res.status(400).json({ message: 'Body Does Not Match Existing Credentials' });
    }
  });

  // Requests (GETS)

  // If Token, Get Username (User = Token) (Get Login)
  app.get('/users/session', authenticateJWT, async (req, res)  => {
    try {
      const user = req.user;
      const result = await User.findByUserName(user.username);
      if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find User' }); }
      return res.status(200).json(result[0]);
    } catch (err) {
      return res.status(401).json({ message: 'Bad Token' });
    }
  });

  // Get All Users
  app.get('/users/allusers', authenticateJWT, async (req, res) => {
    try {
      const result = await User.getUsers();
      if (result.length === 0) { return res.status(401).json({ message: 'No Users Exist' }); }
      res.status(200).json(result[0]);
    } catch (err) {
      res.status(401).json({ message: 'Could Not Query Users' });
    }
  });

   // Find All Public Users 
   app.get('/users/publicusers', authenticateJWT, async (req, res) => {
    try {
      const result = await User.getUsersPublic();
      if (result.length === 0) { return res.status(401).json({ message: 'No Public Users Exist' }); }
      res.status(200).json(result[0]);
    } catch (err) {
      res.status(401).json({ message: 'Could Not Query Public Users' });
    }
  });

  // Find All Registered Users
  app.get('/users/registeredusers', authenticateJWT, async (req, res) => {
    try {
      const result = await User.getUsersRegistered();
      if (result.length === 0) { return res.status(401).json({ message: 'No Registered Users Exist' }); }
      res.status(200).json(result[0]);
    } catch (err) {
      res.status(401).json({ message: 'Could Not Query Registered Users' });
    }
  });

  // Find Specified User
  app.get('/users/specificuser', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await User.findByUserName(body.username);
      if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find User' }); }
      res.status(200).json(result[0]);
    } catch (err) {
      res.status(401).json({ message: 'Could Not Find User' });
    }
  });

  // Updates (PUTS)

  // Update Password
  app.put('/users/updatepassword', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await User.updatePassword(body.username, body.password);
      if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find User' }); }
      result = await User.findByUserName(body.username);
      return res.status(200).json(result[0]); 
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Update Password' });
    }
  });

  // Update Birthday (Can Be Called With Time As Well)
  app.put('/users/updatebirthday', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await User.updateBirthday(body.username, body.birthday);
      if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find User' }); }
      result = await User.findByUserName(body.username);
      return res.status(200).json(result[0]);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Update Birthday' });
    }
  });

  // Update Location
  app.put('/users/updatelocation', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await User.updateLocation(body.username, body.location);
      if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find User' }); }
      result = await User.findByUserName(body.username);
      return res.status(200).json(result[0]);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Update Location (Location May Not Exist)' });
    }
  });

  // Update Registration (0 = False, 1 = True, TINYINT)
  app.put('/users/updateregistration', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await User.updateRegistration(body.username, body.registration);
      if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find User' }); }
      result = await User.findByUserName(body.username);
      return res.status(200).json(result[0]);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Register User' });
    }
  });

  // Update Privacy (0 = False, 1 = True, TINYINT)
  app.put('/users/updateprivacy', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await User.updatePrivacy(body.username, body.privacy);
      if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find User' }); }
      result = await User.findByUserName(body.username);
      return res.status(200).json(result[0]);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Update Privacy Tag' });
    }
  });

  // Update Admin (0 = False, 1 = True, TINYINT)
  app.put('/users/updateadmin', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await User.updateAdmin(body.username, body.admin);
      if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find User' }); }
      result = await User.findByUserName(body.username);
      return res.status(200).json(result[0]);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Update Admin Tag' });
    }
  });

  // Update Picture
  app.put('/users/updatepicture', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await User.updatePicture(body.username, body.picture);
      if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find User' }); }
      result = await User.findByUserName(body.username);
      return res.status(200).json(result[0]);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Update Picture' });
    }
  });

  // Update Background
  app.put('/users/updatebackground', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await User.updateBackground(body.username, body.background);
      if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find User' }); }
      result = await User.findByUserName(body.username);
      return res.status(200).json(result[0]);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Update Background' });
    }
  });

  // Delete (DELETE)

  // Delete User
  app.delete('/users/deleteuser', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await User.findByUserName(body.username);
      if (result.length === 0) { return res.status(401).json({ message: 'Could Not Find User' }); }
      result = await User.deleteUserName(body.username);
      return res.status(204).json({ message: 'Successfully Deleted User' });
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Delete User' });
    }
  });

}
