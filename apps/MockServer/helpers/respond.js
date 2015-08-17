module.exports = function(res, obj) {
  setHeaders(res, obj.headers);
  setType(res, obj.type);
  send(res, obj);
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

function send(res, obj) {
  if (!obj.status) {
    obj.status = 200;
  }
  res.send(obj.body);
}
