// var gulp = require("gulp");
// var gutil = require("gulp-util");
// var webpack = require("webpack");
// var WebpackDevServer = require("webpack-dev-server");
// var webpackConfig = require("../../../webpack.config.js");
// var serverConfig = require("../config.js");
//
// // Build and watch cycle (another option for development)
// // Advantage: No server required, can run app from filesystem
// // Disadvantage: Requests are not blocked until bundle is available,
// //               can serve an old app on refresh
// gulp.task("build-dev", ["webpack:build-dev"], function() {
//   gulp.watch(["app/**/*"], ["webpack:build-dev"]);
// });
//
// gulp.task("webpack-dev-server", function(callback) {
//   // modify some webpack config options
//   var myConfig = Object.create(webpackConfig);
//   myConfig.devtool = "eval";
//   myConfig.debug = true;
//
//   // Start a webpack-dev-server
//   new WebpackDevServer(webpack(myConfig), {
//     publicPath: "http://localhost:8080/" + myConfig.output.publicPath,
//     stats: false
//   }).listen(serverConfig.server.settings.port, serverConfig.server.settings.host, function(err) {
//     if(err) throw new gutil.PluginError("webpack-dev-server", err);
//     gutil.log("[webpack-dev-server]", "http://"+serverConfig.server.settings.host+":"+serverConfig.server.settings.port+"/");
//   });
// });
