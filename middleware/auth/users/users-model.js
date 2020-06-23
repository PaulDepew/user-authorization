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
const base64 = require('base-64');

class User extends Mongo {
  constructor(schema){
    super(userSchema);
    this.username = schema.username;
    this.password = schema.password;
  }

  static hashPass(value){
    return bcrypt.hash(value, 10);
  }
  

  async generateToken(){
    let payload = `${this.username}:${this.password}`;
    let encodedPayload = await base64.encode(payload);
    return encodedPayload;
  }
}

module.exports = User;