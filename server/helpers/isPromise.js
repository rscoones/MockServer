module.exports = function(test) {
  // fluffy check if is promise
  return typeof test.then === "function";
}
