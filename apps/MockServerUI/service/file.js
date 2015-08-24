var fs = require('fs');
var path = require('path');
var config = require('../../MockServer/config');

var _data = {};
module.exports = {
  get: get
};

function get(url) {
  try {
    if (url) {
      return {files: getFiles(url)};
    } else {
      return {urls: getDirectories()};
    }
  } catch (e) {
    return {error: "Not Found"};
  }
}

function getFiles(url) {
  var files = walk(path.join(config.base.location, url));
  var arr = [];

  for (var i in files) {
    var file = files[i];
    if (file.folder === "/") {
      file.folder = url;
      arr.push(file);
    }
  }

  return arr;
}

function getDirectories() {
  var files = walk(config.base.location);
  var directories = {};

  for (var i in files) {
    var file = files[i];
    directory(directories, file);
  }

  return directories;
}

function walk(dir, files_, base) {
  var base = base || dir;
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files){
    var name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()){
      walk(name, files_, base);
    } else {
      files_.push(file(name, base));
    }
  }
  return files_;
}

function directory(arr, file) {
  if (!arr[file.folder]) {
    arr[file.folder] = {};
  }
  arr[file.folder][file.method] = true;
}

function file(filename, base) {
  var method = "GET";
  if (filename.indexOf("POST") > -1) {
    method = "POST";
  }
  filename = filename.replace(".js", "");

  return {
    url: filename.replace(base, ""),
    method: method,
    folder: filename.replace(base, "").replace(/GET.*/, "")
  }
}
