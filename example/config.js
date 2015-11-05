var path = require('path');

module.exports = {
  port: 7070,
  base: {
    url: "/api",
    location: path.join(__dirname, "./api/")
  },
  overrides: [
    {
      url: "/portal/",
      location: path.join(__dirname, "../apps/MockServerUI/GET")
    }
  ]
}