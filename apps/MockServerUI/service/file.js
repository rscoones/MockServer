var path = require('path');
var response = require('../../MockServer/service/response');

var walk = require('../helpers/walk');
var parseWalk = require('../helpers/parseWalk');
var sortAlpha = require('../helpers/sortAlpha');

var config = {};
var _data = {};
module.exports = {
  get: get
};

function get(url, conf) {
  config = conf;
  try {
    if (url) {
      return getURL(url);
    } else {
      return {urls: getAll()};
    }
  } catch (e) {
    console.log(e);
    return {error: "Not Found"};
  }
}

function getURL(url) {
  url = url.replace(/:([a-z]*)/g, "_$1_");
  console.log(url);
  var files = parseWalk(walk(path.join(config.base.location, url)));
  var obj = {
    GET: [],
    POST: []
  };

  for (var i in files) {
    var file = files[i];
    if (file.folder === "/") {
      file.folder = url;
      obj[file.method].push(file);
    }
  }

  Object.keys(obj).forEach(function(key) {
    sortAlpha(obj[key], "filename");
  });

  return obj;
}

function getAll() {
  var files = parseWalk(walk(config.base.location));
  var directories = [];

  for (var i in files) {
    var file = files[i];
    directory(directories, file);
  }

  sortAlpha(directories, "url");

  return directories;
}

function directory(arr, file) {
  file.folder = file.folder.replace(/_([a-z]*)_/g, ":$1");
  var found = null;
  for (var i in arr) {
    if (arr[i].url === file.folder) {
      found = arr[i];
    }
  }
  if (!found) {
    found = {url: file.folder, fullURL: config.base.url + file.folder};
    arr.push(found);
  }
  var req = {path: config.base.url + file.folder, method: file.method, params: {}};
  found[file.method] = response.get(req, config);
}
