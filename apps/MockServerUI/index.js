var fs = require('fs');
var path = require('path');

module.exports = function(req, config) {
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
  var filename = path.join(__dirname, "public", url);

  if (url === "/api") {
    return require(path.join(filename, "../../api", req.method))(req, config);
  } else {
    return fs.readFileSync(filename);
  }
}

function getExtention(req) {
  var url = req.path;
  return path.extname(url).substring(1) || "html";
}
