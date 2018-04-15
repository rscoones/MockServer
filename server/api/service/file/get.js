const path = require('path');
const walk = require('rs-filewalk');

const parseWalk = require('../../helpers/parseWalk');
const sortAlpha = require('../../helpers/sortAlpha');
const {response, convert, config} = require('../../helpers/MockServer');

module.exports = function(req) {
  try {
    if (req.query.url) {
      return get(req.query.url)
    }

    const {verbs, services} = config
    return {routes: getAll(req), verbs, services}
  } catch (e) {
    console.log(e)
    return {error: "Not Found"}
  }
}

function get(url) {
  url = convert.toFolder(url)
  const files = parseWalk(walk(path.join(config.base.location, url)))

  const obj = {}
  config.verbs.forEach((verb) => {
    obj[verb] = []
  })

  files.forEach((file) => {
    file.folder = url
    obj[file.method].push(file)
  });

  Object.keys(obj).forEach((key) => {
    sortAlpha(obj[key], "filename")
  });

  return obj
}

function getAll(req) {
  const available = response.routes();

  const files = [];
  Object.keys(available).forEach((url) => {
    const file = {
      url: url.replace(config.base.pathname, ""),
      fullURL: url
    };

    const methods = available[url];
    Object.keys(methods).forEach((method) => {
      const fakeReq = {path: url, method: method, params: {}, session: req.session};
      file[method] = response.get(fakeReq, config);
    });
    files.push(file);
  });

  sortAlpha(files, "url");

  return files;
}
