var path = require('path');

module.exports = getFile;

function getFile(req, config) {
  var url = req.path;
  var folder = path.join(config.base.location, url);
  var filename = getFilename(req, config, folder);

  try {
    var file = require(filename);
    if (typeof file === "function") {
      return file(req);
    } else {
      return file;
    }
  } catch(e) {
    return notFound(req);
  }
}

function getFilename(req, config, folder) {
  var filename = folder;
  var override = checkOverrides(config, folder);
  if (override) {
    filename = override;
  } else {
    var url = config.base.url;
    url = url.replace(/\//g, "\\");
    filename = filename.replace(url, "");
    filename += "/" + req.method;
  }

  return filename;
}

function checkOverrides(config, folder) {
  for (var i in config.overrides) {
    var override = config.overrides[i];
    var url = override.url.replace(/\//g, "\\");
    if (folder.indexOf(url) > -1) {
      return override.location;
    }
  }

  return false;
}

function notFound(req) {
  return require('../responses/NotFound')(req);
}
