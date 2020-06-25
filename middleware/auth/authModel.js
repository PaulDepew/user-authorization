'use Strict';

/**
 * Authorization Middleware
 * @module authMiddleware
 * @param req
 * @param res
 * @param next
 * @return Boolean
 * */

let base64 = require('base-64');
let bcrypt = require('bcrypt');
let userModel = require('./users/users-model');

async function authMiddleware(req, res, next){
  // this creates strings out of our Auth Header
  let [authtype, authString] = req.headers.authorization.split(' ');
  // this defines 2 variables based on the return, decoded from base64
  let [username, password] = base64.decode(authString).split(':');

  let user = await userModel.authenticateUser(username, password);
  

  if (user) {
    req.user = this.username;
    next();
  } else {
    next('Invalid Login, try again');
  }

}

module.exports = authMiddleware;