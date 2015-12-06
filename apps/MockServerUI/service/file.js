var path = require('path');
var response = require('../../MockServer/service/response');

var walk = require('../helpers/walk');
var parseWalk = require('../helpers/parseWalk');
var sortAlpha = require('../helpers/sortAlpha');
var verbs = require('../helpers/verbs');

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
  url = url.replace(/:([a-zA-Z]*)/g, "_$1_");
  var files = parseWalk(walk(path.join(config.base.location, url)));
  var obj = {};
  verbs.forEach(function(verb) {
    obj[verb] = [];
  })

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
  file.folder = file.folder.replace(/_([a-zA-Z]*)_/g, ":$1");
  file.folder = file.folder.replace(/\/$/, "");
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
