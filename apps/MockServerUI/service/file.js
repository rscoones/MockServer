var path = require('path');
var response = require('../../MockServer/service/response');
var config = require('../../MockServer/config');

var walk = require('../helpers/walk');
var parseWalk = require('../helpers/parseWalk');
var sortAlpha = require('../helpers/sortAlpha');
var verbs = require('../helpers/verbs');

module.exports = {
  get: get
};

function get(req) {
  if (req.query.url) {
    return getURL(req.query.url);
  } else {
    return {urls: getAll(req), verbs: verbs};
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

function getAll(req) {
  var available = response.urls();

  var files = [];
  Object.keys(available).forEach(function(url) {
    var file = {
      url: url.replace(config.base.url, ""),
      fullURL: url
    };

    var methods = available[url];
    Object.keys(methods).forEach(function(method) {
      var fakeReq = {path: url, method: method, params: {}, session: req.session};
      file[method] = response.get(fakeReq, config);
    });
    files.push(file);
  });

  sortAlpha(files, "url");

  return files;
}
