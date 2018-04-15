const isPromise = require('./isPromise');

module.exports = function(mock, req) {
  let type = "object";
  if (typeof mock === "function") {
    mock = mock(req);
    type = "function";
    if (isPromise(mock)) {
      type = "promise";
    }
  }
  mock.mockServerType = type;

  return mock;
}
