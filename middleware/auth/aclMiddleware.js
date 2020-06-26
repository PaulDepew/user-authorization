'use strict';


// Curried Functions!

module.exports = capability => (req,res,next) => {
  if (req.user.capabilities.includes(capability)){
    next();
  } else {
    next('PERMISSION DENIED');
  }
};
 