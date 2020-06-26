'use Strict';

/** 
 * API Router Module
 * @module router
 */

const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const superagent = require('superagent');

const routeModel = require('../middleware/routeModel.js');
const User = require('../middleware/auth/users/users-model');
const authMiddleware = require('../middleware/auth/authmodel');
const bearer = require('../middleware/auth/bearerMiddleware');
const acl = require('../middleware/auth/aclMiddleware');


// defines the route parameters to be used 'model.js'
// router.param('model', routeModel);

router.get('/users',bearer, acl('read'), handleGetUsers);
router.post('/signup', handleCreateUser);
router.post('/signin', authMiddleware, handleSignIn);


// router.get('/oauth', handleOauth);

/**
 * HandleGetUser - gets all users
 * @function handleGetUsers
 * @param {*} request 
 * @param {*} response 
 * @returns {object}
 */
async function handleGetUsers(req, res){
  let tempUser = new User({username: "HI Mom", password: "test" });
  res.send( await tempUser.get());
  // res.send(new User());
}


/**
 * handleCreateUser - creates a user based on the body
 * @function handleCreateUser
 * @param {*} request 
 * @param {*} response 
 * @returns {object}
 */
async function handleCreateUser(req, res){
  req.body.password = await User.hashPass(req.body.password);
  let newUser = new User(req.body);
  await newUser.create(newUser);
  let token = await newUser.generateToken(req.body.username);
  res.cookie('token', token);
  res.header('token', token);
  res.send(`New user Generated! ${token} `);
}


/**
 * handleSignIn - authorizes and signs in a user
 * @function handleSignIn
 * @param {*} request 
 * @param {*} response 
 * @returns {object}
 */
async function handleSignIn(req, res){
  if (req.user) {
    let token = await User.generateToken({ username: req.user.username });
    res.cookie('token', token);
    res.header('token', token);
    res.send(`${token} signed in!`);
  } else {
    res.status(403).send('Invalid');
  }
}

module.exports = router;
