var path = require('path');
var response = require('../service/response');
var respond = require('./respond');
var walk = require('./walk');
var NotFound = require('../responses/NotFound');

module.exports = function(app, config) {
  var files = walk(config.base.location);

  files.forEach(function(file) {
    var method = getMethod(file);

    if (method) {
      var route = "/" + file.folder.replace(file.base, "").replace(/\\/g, "/");
      route = route.replace(/_([a-z]*)_/g, ":$1");
      var data = require(path.join(file.folder, file.file.replace(".js", "")));

      app[method.toLowerCase()](route, function(req, res) {
        respond(req, res, response.get(req, config, route));
      });

      response.set(route, method, data);
    }
  });

  app.use("/", function(req, res) {
    respond(req, res, NotFound(req));
  });
}

function getMethod(file) {
  var method = file.file.replace(".js", "");
  switch (method) {
    case "GET":
      return "GET";
    case "POST":
      return "POST";
    default:
      return null;
  }
}
