var response = require('../../MockServer/service/response');

module.exports = function(req) {
  var obj = req.body;
  response.set(obj.url, obj.method, obj.data);

  return {success: true};
}
