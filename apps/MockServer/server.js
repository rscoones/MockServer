'use strict';
var express = require('express');

var config = require('./config');
var response = require('./service/response');
var respond = require('./helpers/respond');

var bodyParser = require('body-parser');

module.exports = {
  start: function(conf) {
    for (var i in conf) {
      config[i] = conf[i];
    }

    var app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(function(req, res) {
      respond(req, res, response.get(req, config));
    });


    var server = app.listen(config.port, function () {
      console.log("");
      console.log("==============================================");
      console.log('Mock server running at: http://localhost:%s', config.port);
      console.log("==============================================");
    });
  }
};
