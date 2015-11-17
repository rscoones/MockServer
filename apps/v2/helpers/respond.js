var found = require('./found');

module.exports = function(req, res, obj) {
  setHeaders(res, obj.headers);
  setType(res, obj.type);
  send(req, res, obj);
}

function setType(res, type) {
  if (!type) {
    type = "json";
  }
  res.type(type);
}

function setHeaders(res, headers) {
  res.set(headers);
}

function send(req, res, obj) {
  if (!obj.status) {
    obj.status = 200;
  }
  res.status(obj.status);
  res.send(obj.body);

  if (found(obj)) {
    console.log(req.method, req.path);
  } else {
    console.log("NOT FOUND: " + req.method, req.path);
  }
}
