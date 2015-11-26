var file = require('../service/file');

module.exports = function (req, config) {
  return file.get(req.query.url, config);
}
