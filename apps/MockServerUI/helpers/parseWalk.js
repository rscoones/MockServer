var path = require('path');

module.exports = function(files) {
  var arr = [];
  files.forEach(function(file) {
    arr.push(addFile(file.name, file.base));
  });

  return arr;
}

function addFile(filename, base) {
  var method = "GET";
  if (filename.indexOf("POST") > -1) {
    method = "POST";
  }
  filename = filename.replace(".js", "");

  return {
    filename: filename.replace(base, ""),
    folder: filename.replace(base, "").replace(/GET.*/, "").replace(/POST.*/, ""),
    method: method,
    data: require(path.join(filename))
  };
}
