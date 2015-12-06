module.exports = function(config) {
  if (!config.base) {
    throw "Config Error: 'base' property required";
  }
  if (!config.base.location) {
    throw "Config Error: 'base.location' property required";
  }
  if (!config.port) {
    config.port = 8080
    console.warn("Config warning: Port not set, defaulting to 8080")
  }
}
