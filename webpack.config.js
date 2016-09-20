var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");
module.exports = {
  entry: [
    'whatwg-fetch',
    "./app/index.js"
  ],
  output: {
    path: __dirname + '/static',
    filename: "bundle.js"
  },
  resolve: {
      extensions: ['', '.scss', '.css', '.js', '.json'],
      modulesDirectories: [
          'node_modules',
          path.resolve(__dirname, './node_modules')
      ]
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-runtime', 'transform-decorators-legacy']
        },
        exclude: /node_modules/
      },
      {
          test: /(\.scss|\.css)$/,
        //loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
        loaders:["style", "css", "sass"]
      }
    ]
  },
  // sassLoader: {
  //     data: '@import "' + path.resolve(__dirname, './theme/theme.scss') + '";'
  // },

  plugins: [
      new ExtractTextPlugin('theme.css', { allChunks: true }),
  ]
};
