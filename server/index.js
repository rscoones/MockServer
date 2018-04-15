const path = require("path");
// vendor
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
// helpers
const initConfig = require("./helpers/config");
const makeRoutes = require("./helpers/makeRoutes");
const config = require("./config");

module.exports = {
  start: function(conf) {
    initConfig(conf);

    const app = createServer();

    if (config.session) {
      sessionfy(app);
    }
    if (config.cors) {
      app.use(cors());
    }

    makeRoutes(app);
    startServer(app);
  }
};

function createServer() {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(config.ui.pathname, express.static(path.join(__dirname, 'public')));

  return app;
}

function sessionfy(app) {
  setValue(config.session, 'secret', "keyboard cat");
  setValue(config.session, 'name', "MockServer");
  setValue(config.session, 'cookie', {secure: false});
  setValue(config.session, 'resave', false);
  setValue(config.session, 'saveUninitialized', true);

  app.use(session(config.session));

  function setValue(obj, key, defaultValue) {
    if (typeof obj[key] === "undefined") {
      obj[key] = defaultValue;
    }
  }
}

function startServer(app) {
  app.listen(config.port, () => {
    console.log("");
    console.log("==============================================");
    console.log('Mock server running at: http://localhost:%s', config.port);
    console.log("==============================================");
  });
}
