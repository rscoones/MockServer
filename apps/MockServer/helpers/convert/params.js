module.exports = {
  toURL: function(str) {
    return str.replace(/_([a-z]*)_/g, ":$1");
  },
  toFolder: function(str) {
    return str.replace(/:[a-z]*/g, "_$1_");
  }
}
