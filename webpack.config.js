var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");
module.exports = {
  entry: [
    'whatwg-fetch',
    "./app/index.js"
  ],
  devtool: 'source-map',
  output: {
    path: __dirname + '/static',
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.scss', '.css', '.js', '.json', '.jsx'],
      modulesDirectories: [
          'node_modules',
          path.resolve(__dirname, './node_modules')
      ]
  },
  module: {
    loaders: [
      {
        test: /(\.js|\.jsx)$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-runtime', 'transform-decorators-legacy']
        },
        exclude: /node_modules/
      },
      { test: /\.scss$/, loaders:["style", "css", "sass"] },
      { test: /\.css$/, loader: "style-loader!css-loader" },
    ]
  },

  plugins: [
      new ExtractTextPlugin('theme.css', { allChunks: true }),
  ]
};
