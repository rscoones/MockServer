var path = require('path');
var verbs = require('./verbs');

module.exports = function(files) {
  var arr = [];
  files.forEach(function(file) {
    addFile(arr, file);
  });

  return arr;
}

function addFile(arr, file) {
  var method;
  for (var i = 0; i < verbs.length; i++) {
    if (file.file.indexOf(verbs[i]) > -1) {
      method = verbs[i];
      break;
    }
  }

  if (method && file.folder.replace(file.base, "") === "") {
    var filename = file.file.replace(".js", "");

    arr.push({
      filename: filename,
      folder: file.folder,
      method: method,
      data: require(path.join(file.folder, filename))
    });
  }
}
