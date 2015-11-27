var path = require('path');
var response = require('../service/response');
var respond = require('./respond');
var walk = require('./walk');
var NotFound = require('../responses/NotFound');

module.exports = function(app, config) {

  makeFromPlugins(app, config);
  makeFromFiles(app, config);

  app.use("/", function(req, res) {
    respond(req, res, NotFound(req));
  });
}

function makeFromPlugins(app, config) {
  config.plugins.forEach(function(plugin) {
    var route = plugin.url;

    app.use(route, function(req, res) {
      respond(req, res, require(plugin.location)(req, config));
    });
  });
}

function makeFromFiles(app, config) {
  var files = walk(config.base.location);

  files.forEach(function(file) {
    var method = getMethod(file);

    if (method) {
      var route = "/" + file.folder.replace(file.base, "").replace(/\\/g, "/");
      route = route.replace(/_([a-z]*)_/g, ":$1");
      route = config.base.url.replace(/\/$/, "") + route;
      var data = require(path.join(file.folder, file.file.replace(".js", "")));
      response.set(route, method, data);

      app[method.toLowerCase()](route, function(req, res) {
        respond(req, res, response.get(req, config, route));
      });
    }
  });
}

function getMethod(file) {
  var method = file.file.replace(".js", "");
  switch (method) {
    case "GET":
      return "GET";
    case "POST":
      return "POST";
    case "PUT":
      return "PUT";
    case "DELETE":
      return "DELETE";
    default:
      return null;
  }
}
