module.exports = function(mock, req) {
  var type = "object";
  if (typeof mock === "function") {
    mock = mock(req);
    type = "function"
  }
  mock.mockServerType = type;

  return mock;
}
