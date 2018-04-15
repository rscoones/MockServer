const path = require('path');
const response = require('../../helpers/MockServer').response;
const config = require('../../helpers/MockServer').config;
const convertParams = require("../../../helpers/convert/params")

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
  const method = req.body.method;
  const data = JSON.parse(req.body.data);

  response.set(fakeReq(req), method, data);

  return {success: true};
}

function setFile(req) {
  const method = req.body.method;
  const file = path.join(config.base.location, convertParams.toFolder(req.body.url), req.body.filename);

  response.set(fakeReq(req), method, require(file));

  return {success: true};
}

function fakeReq(req) {
  return {path: config.base.pathname + req.body.url, session: req.session};
}
