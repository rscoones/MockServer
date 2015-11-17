'use strict';
var express = require('express');
var bodyParser = require('body-parser');

var config = require('./config');
var makeRoutes = require('./helpers/makeRoutes');

module.exports = {
  start: function(conf) {
    for (var i in conf) {
      config[i] = conf[i];
    }

    var app = createServer();

    makeRoutes(app, config);

    startServer(app);
  }
};

function createServer() {
  var app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  return app;
}

function startServer(app) {
  var server = app.listen(config.port, function () {
    console.log("");
    console.log("==============================================");
    console.log('Mock server running at: http://localhost:%s', config.port);
    console.log("==============================================");
  });
}
