var config = require('../../config');

module.exports = function(conf) {
  if (!conf) {
    throw "Config Error: No config given";
  }
  Object.keys(conf).forEach(function(key) {
    config[key] = conf[key];
  });

  if (!Array.isArray(config.plugins)) {
    config.plugins = [];
  }

  if (!config.base) {
    throw "Config Error: 'base' property required";
  }

  if (!config.base.location) {
    throw "Config Error: 'base.location' property required";
  }

  if (!config.ui) {
    config.ui = "/portal/";
    console.warn("Config warning: ui prefix not set, defaulting to /portal/")
  }

  if (!config.port) {
    config.port = require('./_defaultPort');
    console.warn("Config warning: Port not set, defaulting to 8080")
  }

  if (!config.verbs || !Array.isArray(config.verbs)) {
    config.verbs = require('./_defaultVerbs');
    console.warn("Config warning: HTTP verbs not set. Default to:", config.verbs.join(", "));
  }
};
