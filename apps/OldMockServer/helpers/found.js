module.exports = function(data) {
  return !(data.body && data.body.error && data.body.error === "Not found");
}
