var fs = require('fs');
var path = require('path');

module.exports = {
  get: get
}

function get(req) {
  var filename = getFilename(req);
  
  return {
    headers: {},
    status: 200,
    type: getExtention(req),
    body: fs.readFileSync(getFilename(req))
  }
}

function getFilename(req) {
  var url = req.path;
  var filename = url.split("/portal/")[1];

  if (filename && filename.length > 0) {
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
