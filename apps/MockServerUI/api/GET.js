var file = require('../service/file');

module.exports = function (req) {
  return {urls: file.get()};
}
