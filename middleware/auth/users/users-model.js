'use strict';

/**
 * Creates a Schema and hashed password for the User
 * @module User
 * @param UserSchema
 * @returns {object}
 */

const userSchema = require('./users-schema.js');
const Mongo = require('../../mongo-model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { response } = require('express');


class User extends Mongo {
  constructor(schema){
    super(userSchema);
    this.username = schema.username;
    this.password = schema.password;
  }

  static hashPass(value){
    return bcrypt.hash(value, 10);
  }
  

  async generateToken(username){
    let token = jwt.sign(username, process.env.SECRET);
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