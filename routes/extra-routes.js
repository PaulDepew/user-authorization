'use strict';


const express = require('express');
const router = express.Router();
const User = require('../middleware/auth/users/users-model');
const bearerAuth = require('../middleware/auth/bearerMiddleware');
const acl = require('../middleware/auth/aclMiddleware');


router.get('/secret', bearerAuth, acl('read'),(req, res) => {
  res.send(User.get(req.user.username));
});

module.exports = router;
