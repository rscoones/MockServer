var session = require('./context');

var _data = {};
var _available = {};

module.exports = {
  get: get,
  urls: urls,
  isSet: isSet,
  set: set,
  data: _data
};

function get(req, config) {

  var page = getData(req)[req.method];

  if (typeof page === "function") {
    page = page(req, config);
  }

  return page;
}

function urls() {
  return _available;
}

function isSet(req, method) {
  if (!getData(req)[method]) {
    return false;
  }
  return true;
}

function set(req, method, data) {
  getData(req)[method] = data;
  getAvailable(req)[method] = true;
}

function getData(req) {
  var url = req.route ? req.route.path : req.path;
  var context = "base";
  if (!_data[url]) {
    _data[url] = {};
    _data[url][context] = {};
  }

  if (session(req)) {
    context = session(req);
    if (!_data[url][context]) {
      _data[url][context] = copyFromBase(url);
    }
  }

  return _data[url][context];
}

function getAvailable(req) {
  var url = req.route ? req.route.path : req.path;
  if (!_available[url]) {
    _available[url] = {};
  }
  return _available[url];
}

function copyFromBase(url) {
  var base = getData({path: url});

  var copy = {};
  for (var i in base) {
    copy[i] = base[i];
  }
  return copy;
}
