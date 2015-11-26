var response = require('../../MockServer/service/response');
var config = require('../../MockServer/config');

module.exports = function(req) {
  var obj = req.body;
  obj.url = config.base.url + obj.url;
  response.set(obj.url, obj.method, JSON.parse(obj.data));

  return {success: true};
}
