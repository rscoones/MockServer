const data = {}

module.exports = {
  set,
  get,
  shouldMock
}

function set(url, toUrl) {
  data[url] = toUrl
}

function get(url) {
  return data[url]
}

function shouldMock(url) {
  return !!data[url]
}
