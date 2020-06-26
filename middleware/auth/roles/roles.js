'use strict';

// DEFINE USER ROLES!



 

module.exports = { 
  user: ['read'],
  admin: ['read', 'create', 'update', 'delete'],
  editor: ['read', 'update', 'delete'],
  writer: ['read', 'create'],
};