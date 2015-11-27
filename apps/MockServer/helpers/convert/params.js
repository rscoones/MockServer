module.exports = function(str) {
  return str.replace(/_([a-z]*)_/g, ":$1");
}
