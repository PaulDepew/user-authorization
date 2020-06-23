'use strict';


/**
 * Mongo Interface class
 * @module MongoInterface
 */

class MongoInterface {
  constructor(schema){
    this.schema = schema;
  }

  get(_id) {

    let searchParam = _id ? {_id} : {};
    return this.schema.find(searchParam);
  }
  
  create(data) {
    let newObject = new this.schema(data);
    return newObject.save(newObject);
  }

}

module.exports = MongoInterface;