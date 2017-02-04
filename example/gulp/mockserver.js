var gulp = require('gulp');
var config = require('../config');
require('es6-promise').polyfill();

gulp.task('mock', function() {
  var mockserver = require('../../server');
  mockserver.start(config);
});
