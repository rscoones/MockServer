var path = require('path');

module.exports = function(req, res) {
  if (req.path.indexOf("/api") === 0) {
    sendAPI(req, res);
  } else {
    sendFile(req, res);
  }
}

function sendAPI(req, res) {
  var response = require(path.join(__dirname, "api", req.method))(req);
  res.json(response);
}

function sendFile(req, res) {
  var options = {
    root: path.join(__dirname + '/public/')
  };
  res.sendFile(req.path, options);
}
