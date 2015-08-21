var fs = require('fs');
var path = require('path');
var config = require('../../MockServer/config');
var readdirp = require('readdirp');

var _data = {};
module.exports = {
  get: get
};

function get(func) {
  readdirp({ root: config.base.location, fileFilter: '*GET*.js' })
  .on('data', function (entry) {
    _data[entry.parentDir] = [];
  })
  .on('end', function() {
    func(_data);
  });
}
