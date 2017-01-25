var isPromise = require('./isPromise');

module.exports = function(mock, req) {
  var type = "object";
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
