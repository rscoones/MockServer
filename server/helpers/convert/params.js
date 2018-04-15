module.exports = {
  toURL: function toURL(str) {
    return str.replace(/_([a-zA-Z]*)_/g, ":$1");
  },
  toFolder: function toFolder(str) {
    return str.replace(/:([a-zA-Z]*)/g, "_$1_");
  }
}
