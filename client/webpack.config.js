var path = require("path");
var webpack = require("webpack");

var excludes = /(node_modules)/;

module.exports = {
  cache: true,
  entry: {
    MockServerUI: path.join(__dirname, "./src/index.jsx")
  },
  output: {
    path: path.join(__dirname, "../server/public"),
    publicPath: "",
    filename: 'index.js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: excludes, loader: "babel" },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  },
  resolve: {
    alias: {
      // generics
      MockServerUI: path.join(__dirname, "src"),
      AppDispatcher: path.join(__dirname, "src/dispatcher/AppDispatcher.js")
    }
  }
};
