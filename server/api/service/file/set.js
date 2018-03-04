var path = require('path');
var response = require('../../helpers/MockServer').response;
var config = require('../../helpers/MockServer').config;
var convertParams = require("../../../helpers/convert/params")

module.exports = function(req) {
  console.log("SET", req.body.url);
  if (req.body.data) {
    return setData(req);
  } else if (req.body.filename) {
    return setFile(req);
  }

  return {success: false};
}

function setData(req) {
  var method = req.body.method;
  var data = JSON.parse(req.body.data);

  response.set(fakeReq(req), method, data);

  return {success: true};
}

function setFile(req) {
  var method = req.body.method;
  var file = path.join(config.base.location, convertParams.toFolder(req.body.url), req.body.filename);

  response.set(fakeReq(req), method, require(file));

  return {success: true};
}

function fakeReq(req) {
  return {path: config.base.url + req.body.url, session: req.session};
}
