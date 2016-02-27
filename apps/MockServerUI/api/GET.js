var file = require('../service/file');
var verbs = require('../helpers/verbs');

module.exports = function (req) {
  return file.get(req);
}
