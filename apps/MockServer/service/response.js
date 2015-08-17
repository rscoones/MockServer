var path = require('path');
var fs = require('fs');

var getFile = require('../helpers/getFile');

var _data = {};
module.exports = {
  get: get,
  isSet: isSet,
  set: set
};

function get(req, res, config) {
  var url = req.path;
  var folder = path.join(config.base.location, url);

  if (!isSet(folder)) {
    set(folder, getFile(req, config, folder));
  }

  console.log((_data[folder].found) ? req.method : "NOT FOUND: " + req.method, url.replace(config.base.url, "..."));
  return _data[folder].data;
}

function isSet(key) {
  if (_data[key] === null || typeof _data[key] === "undefined") {
    return false;
  }
  return true;
}

function set(key, data) {
  _data[key] = {
    data: data,
    found: require('../helpers/found')(data)
  };
}
