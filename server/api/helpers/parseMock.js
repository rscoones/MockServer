module.exports = function(mock) {
  let type = "object";
  if (typeof mock === "function") {
    const fakeReq = {params: {}, query: {}};
    mock = mock(fakeReq);
    type = "function"
  }
  mock.mockServerType = type;

  return mock;
}
