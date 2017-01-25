var gulp = require('gulp');
var config = require('../config');
require('es6-promise').polyfill();

gulp.task('mock', function() {
  var mockserver = require('../../apps/MockServer');
  mockserver.start(config);
});
