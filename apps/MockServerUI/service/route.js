var fs = require('fs');
var path = require('path');

module.exports = {
  get: get
}

function get(req) {

  return {
    headers: {},
    status: 200,
    type: getExtention(req),
    body: getResponse(req)
  }
}

function getResponse(req) {
  var filename = getFilename(req);

  if (filename.indexOf("api") > -1) {
    return require(filename)(req);
  } else {
    return fs.readFileSync(filename);
  }
}

function getFilename(req) {
  var url = req.path;
  var filename = url.split("/portal/")[1];

  if (filename.indexOf("api") > -1) {
    return  path.join(__dirname, "../api/", req.method);
  } else if (filename && filename.length > 0) {
    return path.join(__dirname, "../" + filename);
  } else {
    return path.join(__dirname, "../index.html");
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
