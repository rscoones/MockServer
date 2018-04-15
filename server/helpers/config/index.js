const config = require('../../config');

module.exports = function(conf) {
  if (!conf) {
    throw new Error("Config Error: No config given");
  }
  Object.keys(conf).forEach((key) => {
    config[key] = conf[key];
  });

  if (!Array.isArray(config.plugins)) {
    config.plugins = [];
  }

  if (!config.base) {
    throw new Error("Config Error: 'base' property required");
  }

  if (!config.ui) {
    config.ui = {pathname: "/portal/"};
    console.warn("Config warning: ui prefix not set, defaulting to /portal/")
  }

  if (typeof config.ui === "string") {
    config.ui = {pathname: config.ui}
    // @TODO: Remove post v1.1, People should update their config.
    console.warn("Config warning: UI property is now an object. Future versions will break.")
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
