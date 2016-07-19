var path = require('path');

module.exports = {
  base: {
    url: "/api",
    location: path.join(__dirname, "../example/api/")
  },
  port: 8080,
  session: {
    secret: "bob"
  },
  plugins: [
    {
      url: "/plugin/",
      location: path.join(__dirname, "plugin/route")
    }
  ]
}
