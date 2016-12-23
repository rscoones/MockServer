var path = require('path');
var response = require('../service/response');
var respond = require('./respond');
var walk = require('rs-filewalk');
var config = require('../config');
var NotFound = require('./responses/NotFound');
var convert = require('./convert/params');

module.exports = function(app) {
  makeFromPlugins(app);
  makeFromFiles(app);

  app.use("/", function(req, res) {
    respond(req, res, NotFound(req));
  });
}

function makeFromPlugins(app) {
  config.plugins.forEach(function(plugin) {
    var route = plugin.url;

    app.use(route, function(req, res) {
      require(plugin.location)(req, res);
    });
  });
}

function makeFromFiles(app) {
  var files = walk(config.base.location);

  files.forEach(function(file) {
    var method = getMethod(file);

    if (method) {
      var route = "/" + file.folder.replace(file.base, "").replace(/\\/g, "/");
      route = convert.toURL(route)
      route = config.base.url.replace(/\/$/, "") + route;
      var data = require(path.join(file.folder, file.file.replace(".js", "")));
      response.set({path: route}, method, data);

      app[method.toLowerCase()](route, function(req, res) {
        respond(req, res, response.get(req));
      });
    }
  });
}

function getMethod(file) {
  var method = file.file.replace(".js", "");
  if (config.verbs.indexOf(method) > -1) {
    return method;
  } else {
    return null;
  }
}
