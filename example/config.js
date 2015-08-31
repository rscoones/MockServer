var path = require('path');

module.exports = {
  port: 7070,
  base: {
    url: "",
    location: path.join(__dirname, "../api/")
  },
  overrides: [
    {
      url: "/portal/",
      location: path.join(__dirname, "../apps/MockServerUI/GET")
    }
  ]
}
