var path = require('path');
var config = require('../config');

module.exports = getFile;

function getFile(req) {
  var url = req.path;
  var folder = path.join(config.base.location, url);
  var filename = getFilename(req, config, folder);

  try {
    return require(filename);
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
    url = url.replace(/\//g, path.sep);
    filename = filename.replace(url, "");
    filename += "/" + req.method;
  }

  return filename;
}

function checkOverrides(config, folder) {
  for (var i in config.overrides) {
    var override = config.overrides[i];
    var url = override.url.replace(/\//g, path.sep);
    if (folder.indexOf(url) > -1) {
      return override.location;
    }
  }

  return false;
}

function notFound(req) {
  return require('../responses/NotFound')(req);
}
