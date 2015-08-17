module.exports = getFile;

function getFile(req, config, folder) {
  var filename = getFilename(req, config, folder);

  try {
    var file = require(filename);
    if (typeof file === "function") {
      return file(req);
    } else {
      return file;
    }
  } catch(e) {
    return notFound(req)
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
    switch (req.method) {
      case "POST":
        filename += "/POST";
        break;
      default:
        filename += "/GET";
    }
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
