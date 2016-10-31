const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const config = require('./webpack.base.config');

config.entry.unshift(
  'react-hot-loader/patch',
  'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
);

config.output.publicPath = 'http://localhost:3000/dist/';

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new BundleTracker({ filename: 'webpack-stats-dev.json' }),
]);

module.exports = config;
