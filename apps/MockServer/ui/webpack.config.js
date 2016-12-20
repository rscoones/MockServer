var path = require("path");
var webpack = require("webpack");

var excludes = /(node_modules)/;

module.exports = {
  cache: true,
  entry: {
    MockServerUI: path.join(__dirname, "./src/index.jsx")
  },
  output: {
    path: path.join(__dirname, "public"),
    publicPath: "",
    filename: 'index.js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: excludes, loader: "babel" },
      { test: /\.css&/, loader: "style-loader!css-loader!" }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"[name].js")
  ],
  resolve: {
    alias: {
      // generics
      MockServerUI: path.join(__dirname, "src"),
      AppDispatcher: path.join(__dirname, "src/dispatcher/AppDispatcher.js")
    }
  }
};
