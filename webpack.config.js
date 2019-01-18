const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: './src/App.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  module: {
    rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new htmlWebpackPlugin({
      template: './src/template.html'
    })
  ],

  devServer: {
    port: 9000,
    open: true
  }

};