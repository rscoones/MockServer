module.exports = function(mock) {
  var type = "object";
  if (typeof mock === "function") {
    var fakeReq = {params: {}, query: {}};
    mock = mock(fakeReq);
    type = "function"
  }
  mock.mockServerType = type;

  return mock;
}
