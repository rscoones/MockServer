module.exports = function() {
  var context = 0;
  this.set = function(value) {
    context = value;
  }
  return context;
}
