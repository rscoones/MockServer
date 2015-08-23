var fs = require('fs');
var path = require('path');
var config = require('../../MockServer/config');

var _data = {};
module.exports = {
  get: get
};

function get() {
  var arr = [];

  getFiles(config.base.location, arr);

  return arr;
}


function getFiles(dir, files_, base) {
  var base = base || dir;
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files){
    var name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()){
      getFiles(name, files_, base);
    } else {
      files_.push(file(name, base));
    }
  }
  return files_;
}

function file(filename, base) {
  var method = "GET";
  if (filename.indexOf("POST") > -1) {
    method = "POST";
  }
  filename = filename.replace(".js", "");

  return {
    url: filename.replace(base, ""),
    method: method
  }
}
