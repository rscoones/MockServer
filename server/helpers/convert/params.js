module.exports = {
  toURL: function(str) {
    return str.replace(/_([a-zA-Z]*)_/g, ":$1");
  },
  toFolder: function(str) {
    return str.replace(/:([a-zA-Z]*)/g, "_$1_");
  }
}
