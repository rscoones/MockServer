const session = require('./context');
const parseMock = require('../helpers/parseMock');

const _data = {};
const _available = {};

module.exports = {
  get: get,
  routes: routes,
  isSet: isSet,
  set: set
};

function get(req) {
  const page = getData(req)[req.method];

  return parseMock(page, req);
}

function routes() {
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
  const url = req.route ? req.route.path : req.path;
  let context = "base";
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
  const url = req.route ? req.route.path : req.path;
  if (!_available[url]) {
    _available[url] = {};
  }
  return _available[url];
}

function copyFromBase(url) {
  const base = getData({path: url});

  const copy = {};
  Object.keys(base).forEach((key) => {
    copy[key] = base[key];
  })
  return copy;
}
