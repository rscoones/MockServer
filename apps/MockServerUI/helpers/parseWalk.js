var path = require('path');
var verbs = require('./verbs');

module.exports = function(files) {
  var arr = [];
  files.forEach(function(file) {
    arr.push(addFile(file.name, file.base));
  });

  return arr;
}

function addFile(filename, base) {
  var method;
  for (var i = 0; verbs.length; i++) {
    if (filename.indexOf(verbs[i]) > -1) {
      method = verbs[i];
      break;
    }
  }

  filename = filename.replace(".js", "");

  return {
    filename: filename.replace(base, ""),
    folder: path.dirname(filename.replace(base, "")),
    method: method,
    data: require(path.join(filename))
  };
}
