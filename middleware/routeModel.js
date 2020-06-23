'use strict';

/**
 * A function to get the model request
 * @module getModel
 * @param {*} req
 * @param {*} res
 * @returns {object}
 */

// Require a User Model
const UserModel = require('./auth/users/users-model');

function getModel(req, res, next){
  let model = req.params.model;
  let path = req.path;
  // this switch is not working?
  switch(model){
  case 'signup':
    req.model = new UserModel(req);
    next();
    break;
  case 'signin':
    req.model = new UserModel(req);
    next();
    break;
  case 'users':
    req.model = new UserModel(req);
    next();
    break;
  default : 
    next('Invalid Model');
    break;
  }
}

module.exports = getModel;