var path = require('path');

module.exports = {
  base: {
    url: "",
    location: path.join(__dirname, "../example/api/")
  },
  port: 8080,
  plugins: [
    {
      url: "/portal/",
      location: path.join(__dirname, "../apps/MockServerUI/GET")
    }
  ]
}
