var gulp = require("gulp");
// The development server (the recommended option for development)
gulp.task("default", ["proxy", "mock", "webpack-dev-server"]);
gulp.task("no-mock", ["proxy", "webpack-dev-server"]);
gulp.task("no-proxy", ["webpack-dev-server"]);
