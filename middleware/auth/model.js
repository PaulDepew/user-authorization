'use strict';

/**
 * A function to get the model request
 * @module getModel
 * @param {*} req
 * @param {*} res
 * @returns {object}
 */

// Require a User Model
const UserModel = require('../auth/users/users-model');

function getModel(req, res, next){
  let model = req.params.model;

  switch(model){
  case 'signup':
    req.model = new UserModel();
    break;
  case 'signin':
    req.model = new UserModel();
    break;
  case 'users':
    res.model = new UserModel();
    break;
  default : 
    next('Invalid Model');
    break;
  }
}

module.exports = getModel;