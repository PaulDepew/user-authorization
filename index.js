'use strict';

/**
 * Entry Index to Server
 * @module Index
 */

const server = require('./lib/server.js');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_ATLAS_URI, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('open', ()=> {
  console.log('Mongo Connected!');
});

server.start(PORT);
