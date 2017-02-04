'use strict';
var path = require('path');
// vendor
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
// helpers
var initConfig = require('./helpers/config');
var makeRoutes = require('./helpers/makeRoutes');
var config = require('./config');

module.exports = {
  start: function(conf) {
    initConfig(conf);

    var app = createServer();

    if (config.session) {
      sessionfy(app);
    }
    if (config.cors) {
      app.use(cors());
    }

    makeRoutes(app);
    startServer(app);
  }
};

function createServer() {
  var app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(config.ui, express.static(path.join(__dirname, 'public')));

  return app;
}

function sessionfy(app) {
  var session = require('express-session');

  setValue(config.session, 'secret', "keyboard cat");
  setValue(config.session, 'name', "MockServer");
  setValue(config.session, 'cookie', {secure: false});
  setValue(config.session, 'resave', false);
  setValue(config.session, 'saveUninitialized', true);

  app.use(session(config.session));

  function setValue(obj, key, defaultValue) {
    if(typeof obj[key] === "undefined") {
      obj[key] = defaultValue;
    }
  }
}

function startServer(app) {
  var server = app.listen(config.port, function () {
    console.log("");
    console.log("==============================================");
    console.log('Mock server running at: http://localhost:%s', config.port);
    console.log("==============================================");
  });
}
