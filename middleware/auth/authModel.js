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

async function authMiddleware(req, res, next){
  // this creates strings out of our Auth Header
  let [authtype, authString] = req.headers.authorization.split(' ');
  // this defines 2 variables based on the return, decoded from base64
  let [username, password] = base64.decode(authString).split(':');

  let verified = this.username ? await bcrypt.compare(password, this.username.password) : false;

  if (verified) {
    req.user = this.username;
    next();
  } else {
    next('Invalid Login, try again');
  }

}

module.exports = authMiddleware;