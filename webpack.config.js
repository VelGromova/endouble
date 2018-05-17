const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    './src/app.js',
    './src/styles/scss/main.scss'
  ],
  output: {
    path: __dirname + '/dist',
    filename: './bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader?importLoaders=1',
        })
      },
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!resolve-url-loader!sass-loader'
        })
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'base64-inline-loader?limit=10000&name=[name].[ext]'

      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: './[name].css',
      allChunks: true,
    }),

    new HtmlWebpackPlugin({template: './src/index.html'}),

    new CopyWebpackPlugin([
      {
        from: './src/images',
        to: './images'
      }
    ])
  ],
};
