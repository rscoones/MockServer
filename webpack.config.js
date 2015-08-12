var path = require("path");
var webpack = require("webpack");

var excludes = /(node_modules)/;

var cssLoaders = [
  "style-loader",
  "css-loader"
];

console.log("");
console.log("===================================");
console.log("Environment: ", process.env.NODE_ENV || "dev");
console.log("===================================");
console.log("");

function getEntry(app) {
  switch(process.env.NODE_ENV) {
    case "production":
      return ['./src/'+app+'/profiles/production.js'];
    default:
      return ['./src/'+app+'/profiles/dev.js'];
  }
}

module.exports = {
  cache: true,
  entry: {
    MockServer: getEntry('MockServer'),
    MockServerUI: getEntry('MockServerUI'),
    MockServerExample: getEntry('MockServerExample'),
  },
  output: {
    path: path.join(__dirname, "dist/assets/js"),
    publicPath: "dist/assets/js/",
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: excludes, loader: "babel" },
      { test: /\.jsx$/, exclude: excludes, loader: "jsx" },
      { test: /\.css&/, loader: "style-loader!css-loader!" }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"[name].js")
  ],
  resolve: {
    alias: {
      // generics
      MockServer: path.join(__dirname, "apps/MockServer"),
      MockServerUI: path.join(__dirname, "apps/MockServerUI"),
      MockServerExample: path.join(__dirname, "apps/MockServerExample")
    }
  }
};
