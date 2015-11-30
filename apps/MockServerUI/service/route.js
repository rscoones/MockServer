var fs = require('fs');
var path = require('path');

module.exports = {
  get: get
}

function get(req, config) {

  return {
    headers: {},
    status: 200,
    type: getExtention(req),
    body: getResponse(req, config)
  }
}

function getResponse(req, config) {
  return getFile(req, config);
}

function getFile(req, config) {
  var url = req.path;
  if (url === "/") {
    url = "/index.html";
  }
  var filename = path.join(__dirname, "..", url);

  if (url === "/api") {
    return require(path.join(filename, req.method))(req, config);
  } else {
    return fs.readFileSync(filename);
  }
}

function getExtention(req) {
  var url = req.path;
  var extension = url.split(".")[1];
  if (extension && extension.length > 0) {
    return extension;
  } else {
    return "html";
  }
}
