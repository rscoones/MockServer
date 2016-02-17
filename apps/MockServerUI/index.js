var path = require('path');

module.exports = function(req, res, config) {
  if (req.path.indexOf("/api") === 0) {
    sendAPI(req, res, config);
  } else {
    sendFile(req, res);
  }
}

function sendAPI(req, res, config) {
  var response = require(path.join(__dirname, "api", req.method))(req, config);
  res.json(response);
}

function sendFile(req, res) {
  var options = {
    root: path.join(__dirname + '/public/')
  };
  res.sendFile(req.path, options);
}
