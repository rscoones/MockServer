var gulp = require('gulp');
var config = require('../config');

gulp.task('mock', function() {
  var mockserver = require('../../apps/MockServer/server.js');
  mockserver.start(config);
});
