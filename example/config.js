var path = require('path');

module.exports = {
  base: {
    pathname: "/api"
  },
  services: [
    {
      name: "Identity",
      pathname: "/identity",
      location: path.join(__dirname, "api/identity"),
      alts: ["https://identity.staging.perkbox.services"]
    },
    {
      name: "Deals",
      pathname: "/deals",
      location: path.join(__dirname, "api/deals"),
      alts: ["https://deal.staging.perkbox.services"]
    }
  ],
  ui: {
    pathname: "/portal"
  },
  port: 8080,
  session: {
    secret: "bob"
  },
  plugins: [
    {
      pathname: "/plugin",
      location: path.join(__dirname, "plugin")
    }
  ]
}
