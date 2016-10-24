const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

const config = require('./webpack.base.config');

config.entry.unshift(
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/dev-server'
);

config.output.publicPath = 'http://localhost:3000/dist/';

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new BundleTracker({ filename: 'webpack-stats-dev.json' }),
]);

// Loader with react-hot here?

module.exports = config;
