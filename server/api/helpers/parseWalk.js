const path = require('path');
const {config} = require('../helpers/MockServer');
const parseMock = require('./parseMock');

module.exports = function(files) {
  const arr = [];
  files.forEach((file) => {
    addFile(arr, file);
  });

  return arr;
}

function addFile(arr, file) {
  let method
  for (let i = 0; i < config.verbs.length; i++) {
    if (file.file.indexOf(config.verbs[i]) > -1) {
      method = config.verbs[i];
      break;
    }
  }

  if (method && file.folder.replace(file.base, "") === "") {
    const filename = file.file.replace(".js", "");

    let data = require(path.join(file.folder, filename));
    data = parseMock(data);

    arr.push({
      filename: filename,
      folder: file.folder,
      method: method,
      data: data
    });
  }
}
