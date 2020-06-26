'use strict';

/**
 * Creates a Schema and hashed password for the User
 * @module User
 * @param UserSchema
 * @returns {object}
 */

const userSchema = require('./users-schema.js');
const Mongo = require('../../mongo-model.js');
const roles = require('../roles/roles.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('../roles/roles.js');


class User extends Mongo {
  constructor(schema){
    super(userSchema);
    this.username = schema.username;
    this.password = schema.password;
    this.role = schema.role;
  }

  static hashPass(value){
    return bcrypt.hash(value, 10);
  }
  

  async generateToken(username){
    // add the role to the token generator as an object
    let tokenData = {
      username: username,
      capabilties: roles[user.rol],
    };
    let token = jwt.sign(tokenData, process.env.SECRET);
    return token;
  }

  static async authenticateUser(username, password){
    try {
      let user = await userSchema.find({username});
      let authorized = await bcrypt.compare(password, user[0].password);
      if (authorized) {
        return user[0];
      } else {
        return false;
      }
    } catch (e){
      console.error('Error::', e);
      return e;
    }
  }

  static async validateToken(token){
    try{
      let user = await jwt.verify(token, process.env.SECRET);
      return user;
    } catch(e){
      return false;
    }
  }
}

module.exports = User;