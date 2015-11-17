var _data = {};

module.exports = {
  get: get,
  isSet: isSet,
  set: set,
  data: _data
};

function get(req, config, url) {
  if (!url) {
    url = req.path;
  }

  var page = getUrl(url)[req.method];

  if (typeof page === "function") {
    page = page(req, config);
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
  if (url[url.length-1] !== "/") {
    url += "/";
  }

  if (!_data[url]) {
    _data[url] = {};
  }
  return _data[url];
}
