var response = require('../../MockServer/service/response');

module.exports = function(req, config) {
  var mockServerReq = {path: config.base.url + req.body.url, session: req.session};
  var method = req.body.method;
  var data = JSON.parse(req.body.data);

  response.set(mockServerReq, method, data);

  return {success: true};
}
