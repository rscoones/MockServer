'use strict';
// vendor
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
// helpers
var validateConfig = require('./helpers/validateConfig');
var makeRoutes = require('./helpers/makeRoutes');

module.exports = {
  start: function(config) {
    validateConfig(config)

    var app = createServer();
    if (config.session) {
      sessionfy(app, config.session);
    }
    if (config.cors) {
      app.use(cors());
    }
    makeRoutes(app, config);
    startServer(app, config);
  }
};

function createServer() {
  var app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  return app;
}

function sessionfy(app, config) {
  var session = require('express-session');

  var secret = config.secret || 'keyboard cat';
  var name = config.name || "MockServer";
  var secure = config.cookie ? config.cookie.secure : false;

  app.use(session({
    secret: secret,
    name: name,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: secure }
  }));
}

function startServer(app, config) {
  var server = app.listen(config.port, function () {
    console.log("");
    console.log("==============================================");
    console.log('Mock server running at: http://localhost:%s', config.port);
    console.log("==============================================");
  });
}
