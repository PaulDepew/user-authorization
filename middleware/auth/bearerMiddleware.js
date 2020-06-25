'use strict';

const users = require('./users/users-model');

// middleware, so we need the 'next' function
async function bearer(req, res, next) {

  // check auth headers
  if (!req.headers.authorization) {
    res.status(401).send('No Auth headers present');
  }



  let [authType, token] = req.headers.authorization.split(' ');

  let validUser = await users.validateToken(token);

  if (validUser) {
    req.user = validUser;
    next();
  } else {
    next('Invalid Token');
  }
}

module.exports = {
  bearer,
};
