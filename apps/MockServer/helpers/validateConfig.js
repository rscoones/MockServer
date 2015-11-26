module.exports = function(config) {
  if (!config.base) {
    throw "Config Error: 'base' property required";
  }
  if (!config.base.location) {
    throw "Config Error: 'base.location' property required";
  }
  if (!config.port) {
    throw "Config Error: 'port' property required";
  }
}
