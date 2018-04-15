const path = require("path")
const walk = require('rs-filewalk')

const UIAPI = require("../api/index")
const response = require('../service/response')
const respond = require('./respond')
const config = require('../config')
const NotFound = require('./responses/NotFound')
const convert = require('./convert/params')

// Complex loading of config files require these 2 rules to be disabled.
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

module.exports = function(app) {
  makeUIApi(app)
  makeFromPlugins(app)
  makeFromFiles(app)

  app.use("/", (req, res) => {
    respond(req, res, NotFound(req))
  });
}

function makeUIApi(app) {
  app.get(`${config.ui.pathname}/api`, UIAPI.get)
  app.post(`${config.ui.pathname}/api`, UIAPI.post)
}

function makeFromPlugins(app) {
  config.plugins.forEach((plugin) => {
    const route = plugin.pathname;

    app.use(route, (req, res) => {
      require(plugin.location)(req, res)
    })
  })
}

function makeFromFiles(app) {
  config.services.forEach((service) => {
    makeService(app, service)
  })
}

function makeService(app, service) {
  const files = walk(service.location);

  files.forEach((file) => {
    const method = getMethod(file);

    if (method) {
      const route = folderToUrl(file, service)
      const data = require(path.join(file.folder, file.file.replace(".js", "")));
      response.set({path: route}, method, data);

      app[method.toLowerCase()](route, (req, res) => {
        respond(req, res, response.get(req));
      });
    }
  });
}

function getMethod(file) {
  const method = file.file.replace(".js", "")
  if (config.verbs.indexOf(method) > -1) {
    return method
  }
  return null
}

function folderToUrl(file, service) {
  const {folder, base} = file
  // remove base folder
  const route = path.join(
    config.base.pathname,
    service.pathname,
    folder.replace(base, "")
  ).replace(new RegExp("\\" + path.sep, "g"), "/")
  console.log(route);

  return convert.toURL(route);
}
