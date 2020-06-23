'use Strict';

/** 
 * API Router Module
 * @module router
 */

const express = require('express');
const router = express.Router();
const cors = require('cors');
const basew64 = require('base-64');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Model = require('../middleware/auth/model.js');

const User = require('../middleware/auth/users/users-model');

router.get('/:model', handleGetUsers);
router.post('/:model', handleCreateUser);
router.post('/:model', handleAuthorizeUser);

/**
 * getOne - gets the requested thing from the database
 * @function handleGetUsers
 * @param {*} request 
 * @param {*} response 
 * @returns {object}
 */
async function handleGetUsers(req, res){
  res.json(new User);
}


/**
 * getOne - gets the requested thing from the database
 * @function handleCreateUser
 * @param {*} request 
 * @param {*} response 
 * @returns {object}
 */
async function handleCreateUser(req, res){
  res.send('Working on Creating');
}


/**
 * getOne - gets the requested thing from the database
 * @function handleAuthorizeUser
 * @param {*} request 
 * @param {*} response 
 * @returns {object}
 */
async function handleAuthorizeUser(req, res){
  res.send('Working on Authorizing');
}

module.exports = router;