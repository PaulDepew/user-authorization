'use strict';


const express = require('express');
const router = express.Router();
const User = require('../middleware/auth/users/users-model');
const bearerAuth = require('../middleware/auth/bearerMiddleware');

router.get('/secret', bearerAuth.bearer, (req, res)=> {
  res.send(User.get(req.user.username));
});

module.exports = router;
