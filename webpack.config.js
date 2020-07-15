const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const nodeModules = {};

fs.readdirSync(path.resolve(__dirname, 'node_modules'))
  .filter((x) => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

var APP_DIR = path.resolve(__dirname, '/');

module.exports = {
  name: 'server',
  target: 'node',
  entry: path.join(__dirname, 'server.js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
  externals: nodeModules,
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js',
  },
};
