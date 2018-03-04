var config = require('./config');
require('es6-promise').polyfill();

var mockserver = require('../server');
mockserver.start(config);
