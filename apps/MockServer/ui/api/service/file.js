var path = require('path');
var MockServer = require('../helpers/MockServer');
var response = MockServer.response;
var verbs = MockServer.verbs;
var convert = MockServer.convert;

var walk = require('rs-filewalk');
var config = require('../../../config');

var parseWalk = require('../helpers/parseWalk');
var sortAlpha = require('../helpers/sortAlpha');

module.exports = {
  get: get
};

function get(req) {
  try {
    if (req.query.url) {
      return getURL(req.query.url);
    } else {
      return {urls: getAll(req), verbs: verbs};
    }
  } catch (e) {
    console.log(e);
    return {error: "Not Found"};
  }
}

function getURL(url) {
  url = convert.toFolder(url);
  var files = parseWalk(walk(path.join(config.base.location, url)));

  var obj = {};
  verbs.forEach(function(verb) {
    obj[verb] = [];
  })

  files.forEach(function(file) {
    file.folder = url;
    obj[file.method].push(file);
  });

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
