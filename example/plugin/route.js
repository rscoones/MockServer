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
  var url = req.path;
  if (url === "/") {
    url = "/index.html";
  }
  var filename = path.join(__dirname, "public", url);

  return fs.readFileSync(filename);
}

function getExtention(req) {
  var url = req.path;
  return path.extname(url).substring(1);
}
