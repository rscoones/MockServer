var file = require('./service/file');

module.exports = function (req, res) {
  res.json(file.set(req));
}
