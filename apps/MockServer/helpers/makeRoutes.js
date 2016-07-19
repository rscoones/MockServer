var path = require('path');
var response = require('../service/response');
var respond = require('./respond');
var walk = require('./walk');
var NotFound = require('../responses/NotFound');
var convert = require('./convert/params');

module.exports = function(app, config) {
  if (!Array.isArray(config.plugins)) {
    config.plugins = [];
  }
  config.plugins.unshift({
    url: "/portal/",
    location: path.join(__dirname, "../ui/")
  });

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
      require(plugin.location)(req, res, config);
    });
  });
}

function makeFromFiles(app, config) {
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
        respond(req, res, response.get(req, config, route));
      });
    }
  });
}

function getMethod(file) {
  var method = file.file.replace(".js", "");
  var verbs = require('./verbs');
  if (verbs.indexOf(method) > -1) {
    return method;
  } else {
    return null;
  }
}
