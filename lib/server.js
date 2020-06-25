'use strict';

/**
 * Simple Server connection
 * @module server
 * @function start
 */

const express = require('express');
const app = express();
const v1 = require('../routes/v1');
const extraRoutes = require('../routes/extra-routes');

app.use(express.json());
app.use('/api', v1);
app.use('/', extraRoutes);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, ()=> {
      console.log(`Server is running on port: ${port}`);
    });
  },

};

