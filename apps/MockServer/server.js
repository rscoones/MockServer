'use strict';
var express = require('express');
var path = require('path');
var fs = require('fs');

var config = require('./config');
var response = require('./response');

var app = express();

app.use(function(req, res) {
  response(req, res, config);
});

var server = app.listen(config.port, function () {
  console.log("");
  console.log("==============================================");
  console.log('Mock server running at: http://localhost:%s', config.port);
  console.log("==============================================");
});
