'use Strict';

/** 
 * API Router Module
 * @module router
 */

const express = require('express');
const router = express.Router();
const cors = require('cors');
// const basew64 = require('base-64');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const routeModel = require('../middleware/routeModel.js');
const User = require('../middleware/auth/users/users-model');
const authMiddleware = require('../middleware/auth/authmodel');
const usersSchema = require('../middleware/auth/users/users-schema.js');

// defines the route parameters to be used 'model.js'
// router.param('model', routeModel);

router.get('/users', handleGetUsers);
router.post('/signup', handleCreateUser);
router.post('/signin', handleSignIn);

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
  // await newUser.create(req.body);
  await newUser.create(newUser);
  let token = await newUser.generateToken();
  res.send(`New user Generated! ${token} with ${newUser.password} `);
  // await res.send(new User(req.body).generateToken());
}


/**
 * handleSignIn - authorizes and signs in a user
 * @function handleSignIn
 * @param {*} request 
 * @param {*} response 
 * @returns {object}
 */
async function handleSignIn(req, res){
 await res.json('Working on signing in');
}

module.exports = router;