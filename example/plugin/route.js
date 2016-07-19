var path = require('path');

module.exports = function(req, res, config) {
  var options = {
    root: path.join(__dirname + '/public/')
  };
  res.sendFile(req.path, options);
}
