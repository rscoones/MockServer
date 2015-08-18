var getFile = require('../helpers/getFile');
var context = require('./context');

var _data = {};
module.exports = {
  get: get,
  isSet: isSet,
  set: set
};

function get(req, config) {
  var url = req.path;

  if (!isSet(url, req.method)) {
    // if not set, attempt to find file and set it
    set(url, req.method, getFile(req, config));
  }

  var page = getUrl(url)[req.method];
  if (typeof page === "function") {
    page = page(req);
  }
  return page;
}

function isSet(url, method) {
  if (!getUrl(url)[method]) {
    return false;
  }
  return true;
}

function set(url, method, data) {
  getUrl(url)[method] = data;
}

function getUrl(url) {
  if (!_data[context()]) {
    _data[context()] = {};
  }
  if (!_data[context()][url]) {
    _data[context()][url] = {};
  }
  return _data[context()][url];
}
