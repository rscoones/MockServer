var file = require('./service/file');

module.exports = function (req) {
  return file.get(req);
}
