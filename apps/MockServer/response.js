var path = require('path');
var fs = require('fs');

var respond = require('./respond');

module.exports = function(req, res, config) {
  var folder = path.join(config.base, req.originalUrl);

  respond(res, getFile(req, folder));
  console.log(req.method, req.originalUrl);
}

function getFile(req, path) {
  var filename = path;
  switch (req.method) {
    case "POST":
      filename += "/POST";
      break;
    default:
      filename += "/GET";
  }

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

function notFound(req) {
  console.log("Not Found");
  return require('./NotFound')(req);
}
